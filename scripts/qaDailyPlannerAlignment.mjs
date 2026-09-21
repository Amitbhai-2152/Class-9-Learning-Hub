import assert from 'node:assert/strict';
import {SUBJECT_REGISTRY} from '../src/subjectProgressRegistry.js';
import {testCatalog} from '../src/dailyExamPlanner.js';

const byId=Object.fromEntries(SUBJECT_REGISTRY.map(s=>[s.id,new Set(s.topics.map(t=>t.id))]));
const test=n=>testCatalog.find(t=>String(t.number)===String(n));
const ids=(subject,...topicIds)=>({subject,topicIds});

const expected={
  3:[ids('math','math-05','math-06'),ids('science','science-05'),ids('hindi','g5','k4','h-grammar-02'),ids('sanskrit','sanskrit-05'),ids('sst','sst-h5','sst-g4','sst-g5'),ids('english','english-reader-05','english-prose-03','english-poetry-03','english-skill-03','english-skill-04'),ids('reasoning','reasoning-03')],
  5:[ids('math','math-07','math-08'),ids('science','science-06','science-07'),ids('hindi','g6','k5','v3','h-grammar-03'),ids('sanskrit','sanskrit-06','sanskrit-07'),ids('sst','sst-h6','sst-g6','sst-g7'),ids('english','english-reader-06','english-prose-04','english-prose-05','english-skill-05'),ids('reasoning','reasoning-04')],
  6:[ids('math','math-09'),ids('science','science-08','science-09'),ids('hindi','g7','k6','k7','v4','h-grammar-04'),ids('sanskrit','sanskrit-08'),ids('sst','sst-h7','sst-h8','sst-g8'),ids('english','english-reader-07','english-reader-08','english-prose-06','english-poetry-04','english-poetry-05'),ids('reasoning','reasoning-05')],
  7:[ids('math','math-10'),ids('science','science-10'),ids('hindi','g8','g9','k8','v5','h-grammar-05'),ids('sanskrit','sanskrit-09'),ids('sst','sst-g9','sst-g10','sst-g11'),ids('english','english-skill-06','english-skill-07','english-skill-08','english-skill-09'),ids('reasoning','reasoning-06')],
  8:[ids('math','math-11'),ids('science','science-11'),ids('hindi','g10','k9','h-grammar-07','h-grammar-06','h-grammar-08'),ids('sanskrit','sanskrit-10'),ids('sst','sst-g12','sst-g13','sst-c2'),ids('english','english-prose-07','english-prose-08','english-poetry-06','english-skill-10','english-skill-11'),ids('reasoning','reasoning-01','reasoning-02','reasoning-03','reasoning-04','reasoning-05','reasoning-06')],
  9:[ids('math','math-12'),ids('science','science-12','science-13'),ids('hindi','g11','k10','v6','h-grammar-09'),ids('sanskrit','sanskrit-11','sanskrit-12'),ids('sst','sst-c3','sst-c4','sst-e1'),ids('english','english-prose-09','english-poetry-07','english-skill-12','english-skill-13'),ids('reasoning')],
  10:[ids('math','math-13','math-14'),ids('science','science-14'),ids('hindi','g12','k11','v7','h-grammar-10'),ids('sanskrit','sanskrit-13','sanskrit-14'),ids('sst','sst-c5','sst-e2','sst-e3'),ids('english','english-poetry-08','english-skill-14','english-skill-15','english-skill-16'),ids('reasoning')],
  11:[ids('math','math-15'),ids('science','science-15'),ids('hindi','k12','h-grammar-11','h-grammar-12','h-grammar-13'),ids('sanskrit','sanskrit-15'),ids('sst','sst-c6','sst-e4','sst-e5','sst-e6'),ids('english','english-skill-17','english-skill-18','english-skill-19','english-skill-20','english-skill-21'),ids('reasoning')]
};

for(const [num,subjectSpecs] of Object.entries(expected)){
  const current=test(num);
  assert.ok(current,'Missing daily planner Test '+num);
  for(const {subject,topicIds} of subjectSpecs){
    assert.deepEqual(current.groups?.[subject]||[],topicIds,'Test '+num+' '+subject+' syllabus mismatch');
    for(const topicId of topicIds) assert.ok(byId[subject]?.has(topicId),'Unknown '+subject+' topic '+topicId+' in Test '+num);
  }
}

const t3=test(3),t4=test(4);
assert.equal(t3.date,'2026-10-11');
assert.equal(t4.date,'2026-10-25');
for(const subject of Object.keys(t4.groups)){
  assert.deepEqual(t4.groups[subject],[...(test(1).groups?.[subject]||[]),...(test(2).groups?.[subject]||[]),...(t3.groups?.[subject]||[])],'Test 04 must be cumulative Test 01 + Test 02 + Test 03 for '+subject);
}
assert.match(t4.description,/No new chapters are introduced/i);

for(const n of [12,'Final']){
  const current=test(n);
  assert.ok(current?.phase,'Final-phase Test '+n+' must be phase-based');
  assert.equal(current.groups,undefined,'Final-phase Test '+n+' must not create a new chapter block');
}

const dates=testCatalog.map(t=>t.date);
assert.deepEqual(dates,[...dates].sort(),'Daily planner test dates must be chronological');
assert.equal(new Set(testCatalog.map(t=>String(t.number))).size,testCatalog.length,'Duplicate daily planner test numbers found');

console.log('Daily planner alignment QA passed: Test 03–11 match the current Test Centre syllabus, Test 04 is cumulative 01–03, all topic IDs resolve to the canonical registry, and Tests 12/Final remain full-syllabus phase entries.');