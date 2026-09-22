import fs from 'node:fs';
import assert from 'node:assert/strict';

const source=fs.readFileSync(new URL('../src/TestCentreSafe.jsx',import.meta.url),'utf8');
const required=[
  "count:15","count:44","count:33","count:46","count:6",
  "n:'01',date:'2026-09-13',stage:'Foundation',purpose:'हल्का प्रारंभ'",
  "n:'02',date:'2026-09-27',stage:'Core Coverage',purpose:'मुख्य शुरुआती coverage'",
  "n:'03',date:'2026-10-11',stage:'October Unit Test',purpose:'Term Pre Half Yearly Phase 1'",
  "n:'04',date:'2026-10-25',stage:'October Term Half Yearly Examination',purpose:'Test 01–03 तक पढ़ाए गए सभी chapters का comprehensive mid-year baseline; कोई नया chapter नहीं'",
  "n:'05',date:'2026-11-08',stage:'November Term Unit Test',purpose:'Term Onward Syllabus Phase 2'",
  "n:'06',date:'2026-11-22',stage:'November Term Unit Test',purpose:'Term Onward Syllabus Phase 2'",
  "n:'07',date:'2026-12-06',stage:'December Term Unit Test',purpose:'Term Onward Syllabus Phase 2'",
  "n:'08',date:'2026-12-20',stage:'December Term Unit Test',purpose:'Term Onward Syllabus Phase 2'",
  "n:'09',date:'2027-01-03',stage:'January Term Unit Test',purpose:'Term Onward Syllabus Phase 2'",
  "n:'10',date:'2027-01-17',stage:'January Term Unit Test',purpose:'Term Onward Syllabus Phase 2'",
  "n:'11',date:'2027-01-31',stage:'January Term Syllabus Completion Test',purpose:'Term Onward Syllabus Phase 2 • completion'",
  "n:'12',date:'2027-02-14',stage:'February Final Examination',purpose:'100% Eligible Components'",
  "n:'Final',date:'2027-02-28',stage:'February Final Examination',purpose:'100% Eligible Components'",
  '100% Eligible Components',
  'Previous performance chapter weighting तय करती है: weak > average > strong.',
  'Full syllabus + difficult mixed questions + weak-area targeting.',
  'Complete eligible website-built syllabus.'
];
for(const value of required)assert.ok(source.includes(value),`Missing Test Centre planner contract: ${value}`);
const countValues=[...source.matchAll(/count:(\d+)/g)].map(match=>Number(match[1]));
assert.equal(countValues.reduce((sum,value)=>sum+value,0),174,'Test Centre subject scope must total exactly 174 eligible components');
const testCount=(source.match(/\{n:'/g)||[]).length;
assert.equal(testCount,13,'Test Centre must define exactly 13 scheduled assessments including Final');
assert.match(source,/const SUBJECTS=\[/,'Subject scope registry missing');
assert.match(source,/const TESTS=\[/,'Final SuperTest calendar missing');
assert.match(source,/Tests 03–11 follow the assigned first-pass syllabus sequence/,'Current first-pass phase description missing');
console.log('Test Centre planner QA passed.');
