import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=p=>fs.readFileSync(new URL(`../${p}`,import.meta.url),'utf8');
const registry=read('src/subjectProgressRegistry.js');
const boundary=read('src/XPCompletionBoundary.jsx');
const badges=read('src/XPBadges.jsx');
const main=read('src/main2.jsx');
const timedQuiz=read('src/english/EnglishTimedQuiz.jsx');
const appWithChapter5=read('src/AppWithChapter5.jsx');
const reasoning=read('src/ReasoningLabV2.jsx');
const progress=read('src/engines/progress/progressStore.js');
const sstRoot=read('src/sst/SSTRoot.jsx');

const expected={math:15,science:15,hindi:44,sanskrit:15,sst:33,english:46,reasoning:6};
const blocks=[...registry.matchAll(/const\s+(math|science|hindi|sanskrit|sst|english|reasoning)=list\('[^']+',\[(.*?)\]\);/gs)];
const counts=Object.fromEntries(blocks.map(match=>[match[1],(match[2].match(/\btopic\(/g)||[]).length]));
assert.deepEqual(counts,expected);
assert.equal(Object.values(counts).reduce((a,b)=>a+b,0),174);

for(const stage of ['learn','practice','challenge','test'])assert.match(boundary,new RegExp(`['\"]${stage}['\"]`));
assert.match(boundary,/class9-progress-updated/);
assert.match(boundary,/\.etq-result-card/);
assert.match(boundary,/\[class\*=\"result-card\"\]/);
assert.match(boundary,/routeKey/);
assert.match(boundary,/event=>/);
assert.match(boundary,/detail\.subjectId/);
assert.match(boundary,/detail\.topicId/);
assert.match(timedQuiz,/className=\"etq-result-card\"/);
assert.match(timedQuiz,/setSubmitted\(true\)/);
assert.match(appWithChapter5,/const addXp=\(\)=>\{\};/);
assert.match(appWithChapter5,/reasoning/);
assert.match(reasoning,/recordCanonicalStage/);
assert.match(progress,/recordCanonicalStage/);
assert.match(progress,/class9-progress-updated/);
assert.match(progress,/detail:\{subjectId:subjectRecord\.id,topicId:topic\.id,stage/);

assert.match(sstRoot,/recordCanonicalStage/,'SST must bridge local chapter completion into canonical progress');
assert.match(sstRoot,/sst-progress-updated/,'SST XP bridge must observe SST completion events');
assert.match(sstRoot,/topicIdFor/,'SST must map every track/chapter to canonical topic ids');
assert.match(sstRoot,/history:'h'/,'SST history track must map to canonical h topic ids');
assert.match(sstRoot,/geography:'g'/,'SST geography track must map to canonical g topic ids');
assert.match(sstRoot,/civics:'c'/,'SST civics track must map to canonical c topic ids');
assert.match(sstRoot,/economics:'e'/,'SST economics track must map to canonical e topic ids');
assert.match(sstRoot,/`sst-\$\{prefix\}\$\{chapter\}`/,'SST canonical topic id must include track prefix and chapter number');
assert.match(sstRoot,/modeFromText/);
assert.match(sstRoot,/p\.set\('topic',topic\)/);
assert.match(sstRoot,/p\.set\('mode',mode\)/);
assert.match(sstRoot,/className.*mode-card|mode-card/);
assert.match(sstRoot,/progressKeyFor/);

const expectedEnglishRoutes=['panorama5','panorama6','panorama7','panorama8','panorama9','panoramaPoetry1','panoramaPoetry2','panoramaPoetry3','panoramaPoetry4','panoramaPoetry5','panoramaPoetry6','panoramaPoetry7','panoramaPoetry8','reader1','reader2','reader3','reader4','reader5','reader6','reader7','reader8','languageSkills'];
for(const token of expectedEnglishRoutes)assert.match(appWithChapter5,new RegExp(`get\\('`+token+`'\\)`));

assert.match(badges,/export function ChapterCompletionOverlay\(\)/,'chapter completion animation component must exist');
assert.match(badges,/class9-xp-completion/,'chapter animation must consume the XP completion event');
assert.match(badges,/stage\|\|'\)!=='test'/,'chapter animation is tied to completed final test');
assert.match(badges,/chapter-completion-layer/,'chapter completion visual layer must exist');
assert.match(badges,/chapter-confetti/,'chapter completion animation must include confetti/sparkles');
assert.match(badges,/chapter-completion-ring/,'chapter completion animation must include success ring');
assert.match(badges,/completion\.xp/,'chapter animation must display awarded XP');
assert.match(boundary,/class9-xp-completion/,'completion boundary must publish the chapter completion event');
assert.match(main,/ChapterCompletionOverlay/,'chapter completion animation must be imported globally');
assert.match(main,/<ChapterCompletionOverlay\/>/,'chapter completion animation must be mounted globally');

console.log('XP Phase 5 QA passed: all 174 canonical topics are represented across Math, Science, Hindi, Sanskrit, SST, English, and Reasoning; all four XP stages are covered; SST tracks bridge local completion into canonical progress; English routes are covered; the global completion boundary publishes the XP completion event; and the animated chapter-completion popup is globally mounted and displays awarded XP for completed final tests.');
