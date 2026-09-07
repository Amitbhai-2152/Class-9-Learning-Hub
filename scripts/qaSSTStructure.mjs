import assert from 'node:assert/strict';
import {SST_TRACKS} from '../src/sst/sstChapterRegistry.js';
import {getCivicsChapter,getCivicsSubjective} from '../src/sst/civicsChapterModel.js';
import {getEconomicsChapter} from '../src/sst/economicsData.js';
import {normalizeEconomicsChapter} from '../src/sst/economicsContentQuality.js';

const expected={history:8,geography:13,civics:6,economics:6};
for(const [id,count] of Object.entries(expected)){
 const track=SST_TRACKS.find(x=>x.id===id);
 assert.ok(track,`Missing SST track: ${id}`);
 assert.equal(track.chapters.length,count,`${id}: expected ${count} chapters`);
 assert.equal(new Set(track.chapters).size,count,`${id}: duplicate chapter titles`);
}

for(let n=1;n<=6;n++){
 const d=getCivicsChapter(n),s=getCivicsSubjective(n);
 assert.ok(d&&s,`Civics chapter ${n} missing`);
 assert.equal(d.lessons.length,15); assert.equal(d.practice.length,15); assert.equal(d.challenge.length,12); assert.equal(d.finalTest.length,20);
 assert.equal(s.questions.easy.length,5); assert.equal(s.questions.hard.length,5); assert.equal(s.questions.challenger.length,5);
}

for(let n=1;n<=6;n++){
 const d=normalizeEconomicsChapter(getEconomicsChapter(n));
 assert.ok(d,`Economics chapter ${n} missing`);
 assert.equal(d.lessons.length,15); assert.equal(d.practice.length,15); assert.equal(d.challenge.length,12); assert.equal(d.finalTest.length,20);
 assert.equal(d.subjective.easy.length,5); assert.equal(d.subjective.hard.length,5); assert.equal(d.subjective.challenger.length,5);
}

console.log('SST structure QA passed: 33 chapters registered; all Civics and Economics chapter counts verified.');
