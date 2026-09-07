import assert from 'node:assert/strict';
import {getCivicsChapter,getCivicsSubjective} from '../src/sst/civicsChapterModel.js';
import {SST_TRACKS} from '../src/sst/sstChapterRegistry.js';

const civicsTrack=SST_TRACKS.find(x=>x.id==='civics');
assert.ok(civicsTrack,'Civics registry track missing');
assert.equal(civicsTrack.chapters.length,6,'Civics must contain exactly 6 chapters');

for(let n=1;n<=6;n++){
  const data=getCivicsChapter(n);
  const subjective=getCivicsSubjective(n);
  assert.ok(data,`Missing Civics chapter ${n} data`);
  assert.ok(subjective,`Missing Civics chapter ${n} subjective data`);
  assert.equal(data.title,civicsTrack.chapters[n-1],`Chapter ${n} title mismatch with registry`);
  assert.equal(data.lessons.length,15,`Chapter ${n}: expected 15 lessons`);
  assert.equal(data.practice.length,15,`Chapter ${n}: expected 15 practice questions`);
  assert.equal(data.challenge.length,12,`Chapter ${n}: expected 12 challenge questions`);
  assert.equal(data.finalTest.length,20,`Chapter ${n}: expected 20 final-test questions`);
  const subjectiveCount=Object.values(subjective.questions).reduce((sum,items)=>sum+items.length,0);
  assert.equal(subjectiveCount,15,`Chapter ${n}: expected 15 subjective questions`);
  assert.equal(subjective.questions.easy.length,5,`Chapter ${n}: expected 5 easy subjective questions`);
  assert.equal(subjective.questions.hard.length,5,`Chapter ${n}: expected 5 hard subjective questions`);
  assert.equal(subjective.questions.challenger.length,5,`Chapter ${n}: expected 5 challenger subjective questions`);
  for(const bankName of ['practice','challenge','finalTest']){
    for(const [i,item] of data[bankName].entries()){
      assert.equal(item.options.length,4,`Chapter ${n} ${bankName} Q${i+1}: expected 4 options`);
      assert.equal(item.answer,0,`Chapter ${n} ${bankName} Q${i+1}: source answer index should be 0`);
      assert.ok(item.options.every(Boolean),`Chapter ${n} ${bankName} Q${i+1}: blank option`);
      assert.ok(item.explanation,`Chapter ${n} ${bankName} Q${i+1}: missing explanation`);
    }
  }
}

assert.equal(new Set(civicsTrack.chapters).size,6,'Duplicate Civics chapter titles found');
console.log('Civics content QA passed: 6 chapters; each has 15 lessons, 15 practice, 12 challenge, 20 final-test, and 15 subjective questions (5/5/5).');
