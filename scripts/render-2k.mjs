#!/usr/bin/env node
/**
 * Chunked 2K renderer for the CLIP explainer.
 *
 * Emits machine-readable progress lines to stdout:
 *   @@RENDER@@ {"type":"progress",...}
 *
 * The Colab notebook parses those lines and drives the tqdm bar.
 */
import {bundle} from '@remotion/bundler';
import {openBrowser, renderMedia, selectComposition} from '@remotion/renderer';
import {spawn, spawnSync} from 'node:child_process';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const argv = process.argv.slice(2);
const value = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && i + 1 < argv.length ? argv[i + 1] : fallback;
};
const flag = (name) => argv.includes(`--${name}`);

const entry = path.resolve(value('entry', 'src/index.ts'));
const compositionId = value('composition', 'CLIP');
const outputDir = path.resolve(value('output-dir', './out-2k'));
const workDir = path.resolve(value('work-dir', './render-work'));
const outputName = value('output-name', 'clip-multimodal-neurons-2560x1440.mp4');
const audioPath = path.resolve(value('audio', 'public/audio.wav'));
const chunkFrames = Math.max(1, Number.parseInt(value('chunk', '600'), 10));
const concurrency = Number.parseInt(value('concurrency', '0'), 10) || Math.max(1, Math.min(4, os.cpus().length));
const crf = Number.parseInt(value('crf', '18'), 10);
const scale = Number.parseFloat(value('scale', '1.3333333333333333'));
const maxChunks = Math.max(0, Number.parseInt(value('max-chunks', '0'), 10) || 0);
const posterTime = Math.max(0, Number.parseFloat(value('poster-time', '69')));
const browserExecutable = value('browser-executable', '') || null;
const force = flag('force');

const chunksDir = path.join(outputDir, 'chunks');
const statePath = path.join(outputDir, 'render_state.json');
const finalPath = path.join(outputDir, outputName);
const posterPath = path.join(outputDir, `poster_${Math.round(scale * 1920)}x${Math.round(scale * 1080)}.jpg`);
const startedAt = Date.now();

fs.mkdirSync(outputDir, {recursive: true});
fs.mkdirSync(chunksDir, {recursive: true});
fs.mkdirSync(workDir, {recursive: true});

const emit = (obj) => process.stdout.write(`@@RENDER@@ ${JSON.stringify(obj)}\n`);
const log = (...args) => console.log(...args);
const human = (seconds) => {
  const s = Math.max(0, Math.round(seconds));
  return `${Math.floor(s / 3600)}h ${Math.floor((s % 3600) / 60)}m ${s % 60}s`;
};

const fail = (error) => {
  emit({type: 'error', message: error instanceof Error ? error.message : String(error)});
  console.error(error);
  process.exit(1);
};

const loadState = () => {
  try {
    return JSON.parse(fs.readFileSync(statePath, 'utf8'));
  } catch {
    return {};
  }
};

const saveState = (state) => {
  const tmp = `${statePath}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(state, null, 2));
  fs.renameSync(tmp, statePath);
};

const copyWithProgress = async (src, dest, label) => {
  const total = fs.statSync(src).size;
  const tmp = `${dest}.part`;
  emit({type: 'copy_start', label, bytes: total});
  await new Promise((resolve, reject) => {
    const read = fs.createReadStream(src);
    const write = fs.createWriteStream(tmp);
    let copied = 0;
    let last = 0;
    read.on('data', (chunk) => {
      copied += chunk.length;
      const now = Date.now();
      if (now - last >= 400 || copied === total) {
        last = now;
        emit({
          type: 'copy_progress',
          label,
          percent: Math.min(99, (copied / Math.max(1, total)) * 100),
          bytes: copied,
          totalBytes: total,
        });
      }
    });
    read.on('error', reject);
    write.on('error', reject);
    write.on('finish', () => {
      fs.renameSync(tmp, dest);
      resolve();
    });
    read.pipe(write);
  });
  emit({type: 'copy_done', label, bytes: total});
};

const stitch = async ({listPath, totalSeconds}) => {
  const args = [
    '-y',
    '-f', 'concat',
    '-safe', '0',
    '-i', listPath,
    '-i', audioPath,
    '-map', '0:v:0',
    '-map', '1:a:0',
    '-c:v', 'copy',
    '-c:a', 'aac',
    '-b:a', '192k',
    '-shortest',
    '-movflags', '+faststart',
    '-progress', 'pipe:1',
    '-nostats',
    finalPath,
  ];
  emit({type: 'stitch_start', chunks: fs.readFileSync(listPath, 'utf8').trim().split('\n').length});
  await new Promise((resolve, reject) => {
    const proc = spawn('ffmpeg', args, {stdio: ['ignore', 'pipe', 'pipe']});
    let stderr = '';
    proc.stdout.setEncoding('utf8');
    proc.stdout.on('data', (data) => {
      for (const line of data.split('\n')) {
        const match = line.match(/^out_time_(?:us|ms)=(\d+)/);
        if (match) {
          const seconds = Number(match[1]) / 1e6;
          emit({type: 'stitch_progress', percent: Math.min(99, (seconds / Math.max(1, totalSeconds)) * 100)});
        }
      }
    });
    proc.stderr.on('data', (data) => {
      stderr += data.toString();
      if (stderr.length > 24000) stderr = stderr.slice(-24000);
    });
    proc.on('error', reject);
    proc.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg failed (${code})\n${stderr}`));
    });
  });
  emit({type: 'stitch_done'});
};

const probe = (file) => {
  const result = spawnSync('ffprobe', [
    '-v', 'error',
    '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height,r_frame_rate,duration',
    '-show_entries', 'format=duration,size',
    '-of', 'json',
    file,
  ], {encoding: 'utf8'});
  if (result.status !== 0) return null;
  try {
    const data = JSON.parse(result.stdout);
    const stream = data.streams?.[0] ?? {};
    const format = data.format ?? {};
    return {
      width: stream.width,
      height: stream.height,
      durationSeconds: Number(format.duration ?? stream.duration ?? 0),
      bytes: Number(format.size ?? 0),
    };
  } catch {
    return null;
  }
};

let browser = null;

try {
  if (!fs.existsSync(entry)) throw new Error(`Entry point not found: ${entry}`);
  if (!fs.existsSync(audioPath)) throw new Error(`Audio not found: ${audioPath}`);

  log(`Entry       : ${entry}`);
  log(`Composition : ${compositionId}`);
  log(`Output      : ${finalPath}`);
  log(`Chunks      : ${chunkFrames} frames each`);
  log(`Scale       : ${scale}`);
  log(`Concurrency : ${concurrency}`);
  log(`CRF         : ${crf}`);

  emit({type: 'bundle_start'});
  const bundleDir = path.join(workDir, 'bundle');
  await fsp.rm(bundleDir, {recursive: true, force: true});
  const serveUrl = await bundle({
    entryPoint: entry,
    outDir: bundleDir,
    publicDir: path.resolve('public'),
    rootDir: process.cwd(),
    onProgress: (percent) => emit({type: 'bundle_progress', percent}),
  });
  emit({type: 'bundle_done'});

  browser = await openBrowser('chrome', {
    browserExecutable,
    chromeMode: 'headless-shell',
    chromiumOptions: {gl: 'swangle'},
  });
  emit({type: 'browser_ready'});

  const composition = await selectComposition({
    serveUrl,
    id: compositionId,
    puppeteerInstance: browser,
    chromiumOptions: {gl: 'swangle'},
    logLevel: 'error',
  });

  const totalFrames = composition.durationInFrames;
  const outputWidth = Math.round(composition.width * scale);
  const outputHeight = Math.round(composition.height * scale);
  const chunkCount = Math.ceil(totalFrames / chunkFrames);
  const plannedChunks = maxChunks > 0 ? Math.min(maxChunks, chunkCount) : chunkCount;

  emit({
    type: 'composition_ready',
    totalFrames,
    outputWidth,
    outputHeight,
    fps: composition.fps,
    durationSeconds: totalFrames / composition.fps,
  });
  emit({type: 'plan', totalChunks: plannedChunks, chunkFrames});

  const state = loadState();
  state.video = 'CLIP — Multimodal Neurons';
  state.compositionId = compositionId;
  state.width = outputWidth;
  state.height = outputHeight;
  state.fps = composition.fps;
  state.totalFrames = totalFrames;
  state.chunkFrames = chunkFrames;
  state.scale = scale;
  state.crf = crf;
  state.chunks = state.chunks ?? {};

  let completedFrames = 0;
  const chunkPaths = [];

  for (let index = 0; index < plannedChunks; index += 1) {
    const start = index * chunkFrames;
    const end = Math.min(totalFrames - 1, start + chunkFrames - 1);
    const frames = end - start + 1;
    const label = `${start}-${end}`;
    const fileName = `chunk_${String(index).padStart(3, '0')}_${String(start).padStart(5, '0')}-${String(end).padStart(5, '0')}.mp4`;
    const drivePath = path.join(chunksDir, fileName);
    chunkPaths.push(drivePath);

    const alreadyThere = !force && fs.existsSync(drivePath) && fs.statSync(drivePath).size > 0;
    if (alreadyThere) {
      completedFrames += frames;
      state.chunks[index] = {
        index,
        start,
        end,
        frames,
        file: fileName,
        bytes: fs.statSync(drivePath).size,
        skipped: true,
      };
      emit({type: 'chunk_skip', index, chunkCount: plannedChunks, label, frames, completedFrames});
      continue;
    }

    emit({type: 'chunk_start', index, chunkCount: plannedChunks, label, frames, start, end});
    const localPath = path.join(workDir, fileName);
    const chunkStarted = Date.now();
    let lastProgress = 0;

    await renderMedia({
      composition,
      serveUrl,
      codec: 'h264',
      outputLocation: localPath,
      frameRange: [start, end],
      scale,
      crf,
      concurrency,
      imageFormat: 'png',
      pixelFormat: 'yuv420p',
      muted: true,
      overwrite: true,
      puppeteerInstance: browser,
      chromiumOptions: {gl: 'swangle'},
      logLevel: 'error',
      onProgress: (progress) => {
        const now = Date.now();
        if (now - lastProgress < 400 && progress.renderedFrames < frames) return;
        lastProgress = now;
        const elapsed = (now - chunkStarted) / 1000;
        emit({
          type: 'progress',
          index,
          chunkCount: plannedChunks,
          label,
          chunkFrames: frames,
          chunkRendered: progress.renderedFrames,
          completedFrames,
          globalRendered: completedFrames + progress.renderedFrames,
          fps: elapsed > 0 ? progress.renderedFrames / elapsed : 0,
          percent: progress.progress * 100,
          stage: progress.stitchStage,
        });
      },
    });

    await copyWithProgress(localPath, drivePath, fileName);
    const bytes = fs.statSync(drivePath).size;
    const seconds = (Date.now() - chunkStarted) / 1000;
    completedFrames += frames;
    state.chunks[index] = {
      index,
      start,
      end,
      frames,
      file: fileName,
      bytes,
      seconds,
      completedAt: new Date().toISOString(),
    };
    saveState(state);
    emit({type: 'chunk_done', index, chunkCount: plannedChunks, label, frames, completedFrames, seconds, bytes});
    await fsp.rm(localPath, {force: true});
  }

  saveState(state);
  emit({type: 'render_done', completedFrames});

  for (const file of chunkPaths) {
    if (!fs.existsSync(file) || fs.statSync(file).size === 0) {
      throw new Error(`Missing chunk before stitch: ${file}`);
    }
  }

  const listPath = path.join(workDir, 'concat.txt');
  fs.writeFileSync(listPath, chunkPaths.map((file) => `file '${file.replaceAll("'", "'\\''")}'`).join('\n') + '\n');
  await stitch({listPath, totalSeconds: completedFrames / composition.fps});

  const metadata = probe(finalPath);
  if (!metadata) throw new Error('The final MP4 was not created or ffprobe failed.');
  emit({type: 'metadata', ...metadata});

  try {
    const posterArgs = [
      '-y',
      '-ss', String(posterTime),
      '-i', finalPath,
      '-frames:v', '1',
      '-q:v', '2',
      posterPath,
    ];
    const poster = spawnSync('ffmpeg', posterArgs, {encoding: 'utf8'});
    if (poster.status === 0 && fs.existsSync(posterPath)) emit({type: 'poster', path: posterPath});
  } catch {
    // A poster is a convenience; do not fail the render over it.
  }

  emit({
    type: 'done',
    output: finalPath,
    width: metadata.width,
    height: metadata.height,
    durationSeconds: metadata.durationSeconds,
    bytes: metadata.bytes,
    humanTime: human((Date.now() - startedAt) / 1000),
  });
} catch (error) {
  fail(error);
} finally {
  if (browser) {
    try {
      await browser.close();
    } catch {
      // ignore
    }
  }
}

// Remotion/bundler can keep watcher handles alive. Flush stdout, then exit.
await new Promise((resolve) => setTimeout(resolve, 250));
process.exit(0);
