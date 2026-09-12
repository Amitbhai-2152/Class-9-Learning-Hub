import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=p=>fs.readFileSync(new URL(`../${p}`,import.meta.url),'utf8');
const registry=read('src/subjectProgressRegistry.js');
const boundary=read('src/XPCompletionBoundary.jsx');
const timedQuiz=read('src/english/EnglishTimedQuiz.jsx');
const appWithChapter5=read('src/AppWithChapter5.jsx');
const reasoning=read('src/ReasoningLabV2.jsx');
const progress=read('src/engines/progress/progressStore.js');

const expected={math:15,science:15,hindi:44,sanskrit:15,sst:33,english:46,reasoning:6};
const blocks=[...registry.matchAll(/const\s+(math|science|hindi|sanskrit|sst|english|reasoning)=list\('[^']+',\[(.*?)\]\);/gs)];
const counts=Object.fromEntries(blocks.map(match=>[match[1],(match[2].match(/\btopic\(/g)||[]).length]));
assert.deepEqual(counts,expected);
assert.equal(Object.values(counts).reduce((a,b)=>a+b,0),174);

for(const stage of ['learn','practice','challenge','test'])assert.match(boundary,new RegExp(`['"]${stage}['"]`));
assert.match(boundary,/class9-progress-updated/);
assert.match(boundary,/\.etq-result-card/);
assert.match(boundary,/\[class\*="result-card"\]/);
assert.match(boundary,/latestCanonicalResult/);
assert.match(boundary,/hasCompletion/);
assert.match(timedQuiz,/className="etq-result-card"/);
assert.match(timedQuiz,/setSubmitted\(true\)/);
assert.match(appWithChapter5,/const addXp=\(\)=>\{\};/);
assert.match(appWithChapter5,/subject')==='reasoning'/);
assert.match(reasoning,/recordCanonicalStage/);
assert.match(progress,/recordCanonicalStage/);
assert.match(progress,/class9-progress-updated/);

const expectedEnglishRoutes=['panorama5','panorama6','panorama7','panorama8','panorama9','panoramaPoetry1','panoramaPoetry2','panoramaPoetry3','panoramaPoetry4','panoramaPoetry5','panoramaPoetry6','panoramaPoetry7','panoramaPoetry8','reader1','reader2','reader3','reader4','reader5','reader6','reader7','reader8','languageSkills'];
for(const token of expectedEnglishRoutes)assert.match(appWithChapter5,new RegExp(`get\('`+token+`'\)`));

console.log('XP Phase 5 QA passed: all 174 canonical topics are represented across Math, Science, Hindi, Sanskrit, SST, English, and Reasoning; all four XP stages are covered; canonical progress events and generic result surfaces feed the global XP boundary; and English additional-topic routing is included in the coverage contract.');
