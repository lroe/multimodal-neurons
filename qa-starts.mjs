import {bundle} from '@remotion/bundler';
import {selectComposition, renderStill, openBrowser} from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs';
const starts = [0,9.15,19.44,29.99,46.35,64.75,82.88,99.59,122.56,133.24,147.49,172.88,181.17,192.47,211.47,229.09,254.88,274.88,295.76,321,349.17,362.52,389.37,400.6,422.52,452.32,471.17,500.84,524.05,554.04,571.95,588.56,607.65,631.76,653.16,673.57,702.63,717.81,741.73,764.95,795.61];
const outDir='/tmp/starts'; fs.mkdirSync(outDir,{recursive:true});
const bundled=await bundle({entryPoint:path.resolve('src/index.ts'),publicDir:path.resolve('public')});
const browser=await openBrowser('chrome',{browserExecutable:'/usr/bin/google-chrome',chromiumOptions:{headless:true}});
const composition=await selectComposition({serveUrl:bundled,id:'CLIP',puppeteerInstance:browser});
let i=0;
for (const s of starts){const frame=Math.round((s+0.7)*30); const output=path.join(outDir,`${String(i).padStart(2,'0')}_${String(s).replace('.','_')}.png`); await renderStill({composition,serveUrl:bundled,output,frame,imageFormat:'png',puppeteerInstance:browser,overwrite:true}); console.log(output); i++;}
await browser.close({silent:true});
