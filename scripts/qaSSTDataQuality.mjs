import assert from 'node:assert/strict';
import fs from 'node:fs';

const files=['history/historyChapter1Data.js','history/historyChapter2Data.js','history/historyChapter3Data.js','history/historyChapter4Data.js','history/historyChapter5Data.js','history/historyChapter6Data.js','history/historyChapter7Data.js','history/historyChapter8Data.js',...Array.from({length:13},(_,i)=>`geographyChapter${i+1}Data.js`)];
const root=new URL('../src/sst/',import.meta.url);
for(const p of files){const text=fs.readFileSync(new URL(p,root),'utf8'); assert.ok(text.length>1000,`${p}: suspiciously small data file`); assert.ok(/practice|finalTest|challenge|lessons|sections/.test(text),`${p}: no recognizable learning/question structure`);}
console.log('SST data-file QA passed: all 21 History/Geography data files are present, non-empty, and contain expected learning/question structure markers.');
