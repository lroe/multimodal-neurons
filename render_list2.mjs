import {bundle} from '@remotion/bundler';
import {selectComposition, renderStill, openBrowser} from '@remotion/renderer';
import path from 'node:path'; import fs from 'node:fs';
const frames=[4320,4860,5070,2070,2160,1620,1800,8070,10320,12900,13140,15330,16260,16530,18360,20880,23100,23700,24000,24990];
const outDir='/tmp/check3'; fs.mkdirSync(outDir,{recursive:true});
const bundled=await bundle({entryPoint:path.resolve('src/index.ts'),publicDir:path.resolve('public')});
const browser=await openBrowser('chrome',{browserExecutable:'/usr/bin/google-chrome',chromiumOptions:{headless:true}});
const composition=await selectComposition({serveUrl:bundled,id:'CLIP',puppeteerInstance:browser});
let i=0;
for(const f of frames){const out=path.join(outDir,`${String(i).padStart(2,'0')}_${f}.png`); await renderStill({composition,serveUrl:bundled,output:out,frame:f,imageFormat:'png',puppeteerInstance:browser,overwrite:true}); console.log(out); i++;}
await browser.close({silent:true});
