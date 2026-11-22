import {bundle} from '@remotion/bundler';
import {selectComposition, renderStill, openBrowser} from '@remotion/renderer';
import path from 'node:path'; import fs from 'node:fs';
const frames=[1170,1350,1620,1800,2070,2160,2280,4170,4320,4650,4860,5070,5160,8070,10320,10500,10710,12900,13140,13980,14490,14910,15330,15540,15930,16110,16260,16530,18300,20880,21450,22500,22800,23100,23700,24000,24600,24990];
const outDir='/tmp/check2'; fs.mkdirSync(outDir,{recursive:true});
const bundled=await bundle({entryPoint:path.resolve('src/index.ts'),publicDir:path.resolve('public')});
const browser=await openBrowser('chrome',{browserExecutable:'/usr/bin/google-chrome',chromiumOptions:{headless:true}});
const composition=await selectComposition({serveUrl:bundled,id:'CLIP',puppeteerInstance:browser});
let i=0;
for(const f of frames){const out=path.join(outDir,`${String(i).padStart(2,'0')}_${f}.png`); await renderStill({composition,serveUrl:bundled,output:out,frame:f,imageFormat:'png',puppeteerInstance:browser,overwrite:true}); console.log(out); i++;}
await browser.close({silent:true});
