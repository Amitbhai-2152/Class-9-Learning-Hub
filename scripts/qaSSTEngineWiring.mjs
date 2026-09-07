import assert from 'node:assert/strict';
import fs from 'node:fs';

const root=new URL('../src/sst/',import.meta.url).pathname;
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8');
const rootFile=new URL('../src/sst/SSTRoot.jsx',import.meta.url).pathname;
const rootText=fs.readFileSync(rootFile,'utf8');

for(const n of Array.from({length:8},(_,i)=>i+1)){
 if(n<=4) assert.match(rootText,new RegExp(`track==='history'.*chapter\)===${n}`),`History ${n} routing missing`);
 else assert.match(rootText,new RegExp(`track==='history'.*chapter\)===${n}`),`History ${n} routing missing`);
}
for(const n of Array.from({length:13},(_,i)=>i+1)) assert.match(rootText,new RegExp(`track==='geography'.*Number\(route.chapter\)===${n}`),`Geography ${n} routing missing`);
for(const n of [1,2,3,4,5,6]){
 assert.match(rootText,new RegExp(`track==='civics'.*\[1,2,3,4,5,6\]`),`Civics routing missing`);
 assert.match(rootText,new RegExp(`track==='economics'.*\[1,2,3,4,5,6\]`),`Economics routing missing`);
}
const required=[
 'CivicsEngine.jsx','EconomicsEngine.jsx',
 ...Array.from({length:13},(_,i)=>`GeographyChapter${i+1}${i+1<=3?'':'Clean'}Engine.jsx`).map((x,i)=>i===0?'GeographyChapter1Engine.jsx':i===1?'GeographyChapter2Engine.jsx':i===2?'GeographyChapter3Engine.jsx':x),
 'history/HistoryChapterEngine.jsx','history/HistoryChapter5Engine.jsx','history/HistoryChapter6Engine.jsx','history/HistoryChapter7Engine.jsx','history/HistoryChapter8Engine.jsx'
];
for(const p of required) assert.ok(fs.existsSync(new URL(p,new URL('../src/sst/',import.meta.url))),`Missing SST engine file: ${p}`);
console.log('SST engine/wiring QA passed: History 8/8, Geography 13/13, Civics 6/6 and Economics 6/6 routing verified; required engines present.');
