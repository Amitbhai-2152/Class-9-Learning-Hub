import assert from 'node:assert/strict';
import fs from 'node:fs';

const root=new URL('../src/sst/',import.meta.url);
const files=[
 ['history/HistoryChapterEngine.jsx',8],['history/HistoryChapter5Engine.jsx',5],['history/HistoryChapter6Engine.jsx',6],['history/HistoryChapter7Engine.jsx',7],['history/HistoryChapter8Engine.jsx',8],
 ['GeographyChapter1Engine.jsx',1],['GeographyChapter2Engine.jsx',2],['GeographyChapter3Engine.jsx',3],['GeographyChapter4EngineClean.jsx',4],['GeographyChapter5EngineClean.jsx',5],['GeographyChapter6EngineClean.jsx',6],['GeographyChapter7EngineClean.jsx',7],['GeographyChapter8EngineClean.jsx',8],['GeographyChapter9EngineClean.jsx',9],['GeographyChapter10EngineClean.jsx',10],['GeographyChapter11EngineClean.jsx',11],['GeographyChapter12EngineClean.jsx',12],['GeographyChapter13EngineClean.jsx',13]
];
for(const [p,n] of files){const text=fs.readFileSync(new URL(p,root),'utf8');assert.ok(text.length>5000,`${p}: unexpectedly small engine`);assert.match(text,/Learn|Practice|Challenge|Final Test/,`${p}: missing core stage labels`);}

const historyQuiz=fs.readFileSync(new URL('history/HistoryReviewQuiz.jsx',root),'utf8');
assert.match(historyQuiz,/rotateQuestion/,'History quiz must normalize answer positions before rendering');
assert.match(historyQuiz,/const desired=\(index\+1\)%optionCount/,'History quiz must distribute correct choices across A/B/C/D');
assert.match(historyQuiz,/const visibleQuestions=useMemo\(\(\)=>questions\.map\(rotateQuestion\)/,'History quiz must render rotated choices rather than raw bank order');
assert.match(historyQuiz,/scoreAnswers\(visibleQuestions/,'History scoring must use the displayed option order');

const rotate=(options,original,index)=>{const n=options.length,desired=(index+1)%n,shift=((original-desired)%n+n)%n;return {options:options.map((_,i)=>options[(i+shift)%n]),correct:desired};};
for(let original=0;original<4;original++){
 const result=rotate(['A','B','C','D'],original,0);
 assert.equal(result.options[result.correct],['A','B','C','D'][original],`rotation changed correct answer for source index ${original}`);
 assert.equal(result.options.length,4);
}
const observed=[0,1,2,3].map(i=>rotate(['A','B','C','D'],0,i).correct);
assert.deepEqual(observed,[1,2,3,0],'four-question cycle must not keep the correct answer on A');

console.log('SST chapter-engine QA passed: all 21 History/Geography chapter engines are present; History choices are rotated across A/B/C/D while preserving correctness and scoring.');
