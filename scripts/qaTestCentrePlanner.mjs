import fs from 'node:fs';
import assert from 'node:assert/strict';

const source=fs.readFileSync(new URL('../src/TestCentreSafe.jsx',import.meta.url),'utf8');
const required=[
  "count:15","count:44","count:33","count:46","count:6",
  "n:'01',date:'2026-09-13',stage:'Foundation',purpose:'हल्का प्रारंभ'",
  "n:'02',date:'2026-09-27',stage:'Core Coverage',purpose:'मुख्य शुरुआती coverage'",
  "n:'03',date:'2026-10-11',stage:'Mid I',purpose:'मध्य syllabus'",
  "n:'04',date:'2026-10-25',stage:'Mid II',purpose:'मध्य coverage + balance'",
  "n:'05',date:'2026-11-08',stage:'Late Syllabus',purpose:'late core support'",
  "n:'06',date:'2026-11-22',stage:'Advanced Coverage',purpose:'advanced/core completion'",
  "n:'07',date:'2026-12-06',stage:'Completion Push',purpose:'remaining chapters'",
  "n:'08',date:'2026-12-20',stage:'Full Syllabus',purpose:'100% first-pass check'",
  "n:'09',date:'2027-01-03',stage:'Revision I',purpose:'mixed full syllabus'",
  "n:'10',date:'2027-01-17',stage:'Weak Area',purpose:'performance weighted'",
  "n:'11',date:'2027-01-31',stage:'BSEB Style Full Mock',purpose:'complete examination simulation'",
  "n:'12',date:'2027-02-14',stage:'Final Readiness',purpose:'final readiness'",
  "n:'Final',date:'2027-02-28',stage:'Final Examination',purpose:'complete eligible website-built syllabus'",
  'सभी 174 eligible components',
  'All 174 eligible components from the master inventory',
  'Previous performance chapter weighting तय करती है: weak > average > strong.',
  'Full syllabus + difficult mixed questions + weak-area targeting.',
  'Complete eligible website-built syllabus.'
];
for(const value of required)assert.ok(source.includes(value),`Missing Test Centre planner contract: ${value}`);
const testCount=(source.match(/\{n:'/g)||[]).length;
assert.equal(testCount,13,'Test Centre must define exactly 13 scheduled assessments including Final');
assert.match(source,/const SUBJECTS=\[/,'Subject scope registry missing');
assert.match(source,/const TESTS=\[/,'Final SuperTest calendar missing');
assert.match(source,/First-pass chapter sequence runs through Test 07/,'First-pass phase boundary missing');
console.log('Test Centre planner QA passed.');
