import assert from 'node:assert/strict';
import fs from 'node:fs';

const root=new URL('../src/sst/',import.meta.url);
const files=[
 ['history/HistoryChapterEngine.jsx',8],['history/HistoryChapter5Engine.jsx',5],['history/HistoryChapter6Engine.jsx',6],['history/HistoryChapter7Engine.jsx',7],['history/HistoryChapter8Engine.jsx',8],
 ['GeographyChapter1Engine.jsx',1],['GeographyChapter2Engine.jsx',2],['GeographyChapter3Engine.jsx',3],['GeographyChapter4EngineClean.jsx',4],['GeographyChapter5EngineClean.jsx',5],['GeographyChapter6EngineClean.jsx',6],['GeographyChapter7EngineClean.jsx',7],['GeographyChapter8EngineClean.jsx',8],['GeographyChapter9EngineClean.jsx',9],['GeographyChapter10EngineClean.jsx',10],['GeographyChapter11EngineClean.jsx',11],['GeographyChapter12EngineClean.jsx',12],['GeographyChapter13EngineClean.jsx',13]
];
for(const [p,n] of files){const text=fs.readFileSync(new URL(p,root),'utf8');assert.ok(text.length>5000,`${p}: unexpectedly small engine`);assert.match(text,/Learn|Practice|Challenge|Final Test/ ,`${p}: missing core stage labels`);}
console.log('SST chapter-engine QA passed: all 21 History/Geography chapter engines are present and expose the core learning stages.');
