import assert from 'node:assert/strict';
import {HISTORY_SUBJECTIVE} from '../src/sst/history/historySubjectiveData.js';
import {HISTORY_SUBJECTIVE_SUPPLEMENT_1_4} from '../src/sst/history/historySubjectiveChapter1to4Supplement.js';
import fs from 'node:fs';

for(const n of [1,2,3,4]){
  const base=HISTORY_SUBJECTIVE[n];
  const extra=HISTORY_SUBJECTIVE_SUPPLEMENT_1_4[n];
  assert.ok(base,`History Ch${n}: base subjective data missing`);
  assert.ok(extra,`History Ch${n}: subjective supplement missing`);
  const questions={
    easy:[...base.questions.easy,...extra.questions.easy],
    hard:[...base.questions.hard,...extra.questions.hard],
    challenger:[...base.questions.challenger,...extra.questions.challenger]
  };
  assert.equal(questions.easy.length,5,`History Ch${n}: Easy subjective must be 5`);
  assert.equal(questions.hard.length,5,`History Ch${n}: Hard subjective must be 5`);
  assert.equal(questions.challenger.length,5,`History Ch${n}: Challenger subjective must be 5`);
  const all=[...questions.easy,...questions.hard,...questions.challenger];
  assert.equal(all.length,15,`History Ch${n}: total subjective must be 15`);
  assert.equal(new Set(all.map(x=>x.q)).size,15,`History Ch${n}: duplicate subjective question`);
  all.forEach((x,i)=>{assert.ok(x.q&&x.q.trim().length>=20,`History Ch${n}: weak subjective question ${i+1}`);assert.ok(Number.isInteger(x.marks)&&x.marks>0,`History Ch${n}: invalid marks ${i+1}`)});
}
const engine=fs.readFileSync(new URL('../src/sst/history/HistoryChapterEngine.jsx',import.meta.url),'utf8');
assert.match(engine,/SubjectiveQuestionsCard/,'History Ch1-4 engine missing SubjectiveQuestionsCard');
assert.match(engine,/HISTORY_SUBJECTIVE_SUPPLEMENT_1_4/,'History Ch1-4 engine missing subjective supplement merge');
assert.match(engine,/id:'subjective'/,'History Ch1-4 engine missing Subjective mode');
console.log('History subjective QA passed: Chapters 1-4 each expose 15 unique subjective questions (5/5/5) and the shared engine renders the Subjective mode.');
