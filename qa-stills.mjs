import {bundle} from '@remotion/bundler';
import {selectComposition, renderStill, openBrowser} from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs';

const frames = [8,18.5,25,40,60.5,76,96,118,130,144,162,179.8,189,201.5,221,241.5,269,289,317.5,344,357,377,395,414,438,466,495,517.5,551,566,586,596,628,650,670,696,715,733,760,790,820,833];
const outDir = '/tmp/contact';
fs.mkdirSync(outDir, {recursive:true});
const bundled = await bundle({entryPoint: path.resolve('src/index.ts'), publicDir: path.resolve('public')});
const browser = await openBrowser('chrome', {browserExecutable: '/usr/bin/google-chrome', chromiumOptions: {headless: true}});
const composition = await selectComposition({serveUrl: bundled, id: 'CLIP', puppeteerInstance: browser});
let i=0;
for (const sec of frames) {
  const frame = Math.round(sec*30);
  const output = path.join(outDir, `${String(i).padStart(2,'0')}_${String(sec).replace('.','_')}.png`);
  await renderStill({composition, serveUrl: bundled, output, frame, imageFormat:'png', puppeteerInstance: browser, overwrite:true});
  console.log(output);
  i++;
}
await browser.close({silent:true});
