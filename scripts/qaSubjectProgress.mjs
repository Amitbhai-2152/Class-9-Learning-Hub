import assert from 'node:assert/strict';
import {SUBJECT_REGISTRY,TOTAL_TOPICS,STAGES,resolveSubject,resolveTopic} from '../src/subjectProgressRegistry.js';

const expected={math:15,science:15,hindi:44,sanskrit:15,sst:33,english:46,reasoning:6};
assert.equal(SUBJECT_REGISTRY.length,7,'Subject count must remain 7');
assert.equal(TOTAL_TOPICS,174,'Total canonical syllabus topics must be 174');
assert.deepEqual(STAGES,['learn','practice','challenge','test']);
for(const subject of SUBJECT_REGISTRY){
  assert.equal(subject.topics.length,expected[subject.id],`${subject.id} topic count mismatch`);
  assert.equal(new Set(subject.topics.map(t=>t.id)).size,subject.topics.length,`${subject.id} topic ids are not unique`);
  assert.equal(new Set(subject.topics.map(t=>t.title)).size,subject.topics.length,`${subject.id} topic titles are not unique`);
  subject.topics.forEach((topic,index)=>assert.equal(topic.order,index+1,`${subject.id} topic order is broken`));
}
assert.equal(resolveSubject('गणित')?.id,'math');
assert.equal(resolveSubject('Mathematics')?.id,'math');
assert.equal(resolveSubject('Social Science')?.id,'sst');
assert.equal(resolveSubject('English')?.id,'english');
assert.equal(resolveSubject('Reasoning')?.id,'reasoning');
assert.equal(resolveTopic('हिन्दी','g1')?.id,'g1');
assert.equal(resolveTopic('हिन्दी','कहानी का प्लॉट')?.id,'g1');
assert.equal(resolveTopic('English','Chapter 1')?.id,'english-reader-01');
assert.equal(resolveTopic('Maths','15')?.id,'math-15');
assert.equal(resolveTopic('Reasoning','6')?.id,'reasoning-06');
const sanskritTitles=SUBJECT_REGISTRY.find(s=>s.id==='sanskrit').topics.map(t=>t.title).join('|');
assert.equal(sanskritTitles.includes('पीयूषम् द्रुतपाठय भाग-1'),false,'Sanskrit supplementary must stay excluded');
const englishTitles=SUBJECT_REGISTRY.find(s=>s.id==='english').topics.map(t=>t.title).join('|');
assert.equal(englishTitles.includes('The Secret of Work'),false,'Read, Think & Enjoy must stay excluded');
console.log(`Subject progress QA passed: 7 subjects / ${TOTAL_TOPICS} canonical topics / ${STAGES.length} stages.`);
