import assert from 'node:assert/strict';
import fs from 'node:fs';
import {SUBJECT_REGISTRY,TOTAL_TOPICS} from '../src/subjectProgressRegistry.js';
import {subjects} from '../src/subjectCatalog.js';

const app=fs.readFileSync(new URL('../src/App.jsx',import.meta.url),'utf8');
assert(app.includes("import {subjects} from './subjectCatalog';"),'App must consume the canonical subject catalog');
assert(!app.includes('const subjects=['),'App must not keep a duplicate subject/chapter catalog');
assert.equal(SUBJECT_REGISTRY.length,7,'Expected seven canonical subjects');
assert.equal(TOTAL_TOPICS,174,'Expected 174 canonical topics');
assert.equal(subjects.length,SUBJECT_REGISTRY.length,'UI subject count must match canonical registry');

for(const canonical of SUBJECT_REGISTRY){
 const ui=subjects.find(subject=>subject.id===canonical.id);
 assert(ui,`Missing UI subject: ${canonical.id}`);
 assert.equal(ui.name,canonical.name,`Subject name mismatch: ${canonical.id}`);
 assert.equal(ui.chapters.length,canonical.topics.length,`Chapter count mismatch: ${canonical.id}`);
 if(canonical.id!=='english'){
  assert.deepEqual(ui.chapters,canonical.topics.map(topic=>topic.title),`Chapter order/title mismatch: ${canonical.id}`);
 }
}

const english=subjects.find(subject=>subject.id==='english');
assert(english.chapters.every(chapter=>!chapter.includes('Read, Think & Enjoy')),'English catalog must exclude Read, Think & Enjoy');
assert.equal(english.chapters.slice(0,8).filter(chapter=>chapter.startsWith('Reader • ')).length,8,'English Reader route labels must remain wired');
assert.equal(english.chapters.slice(8,17).filter(chapter=>chapter.startsWith('Panorama • Prose ')).length,9,'English Panorama prose route labels must remain wired');
assert.equal(english.chapters.slice(17,25).filter(chapter=>chapter.startsWith('Panorama • Poetry ')).length,8,'English Panorama poetry route labels must remain wired');
assert.equal(english.chapters.length,46,'English canonical catalog must expose 46 topics including Language & Skills');

const sst=subjects.find(subject=>subject.id==='sst');
assert.equal(sst.chapters.length,33,'SST homepage/chapter catalog must expose all 33 canonical chapters');
const hindi=subjects.find(subject=>subject.id==='hindi');
assert.equal(hindi.chapters.length,44,'Hindi catalog must retain main, Varnika and grammar coverage');
const sanskrit=subjects.find(subject=>subject.id==='sanskrit');
assert.equal(sanskrit.chapters.length,15,'Sanskrit primary catalog must expose exactly 15 topics');

console.log(`Subject catalog QA passed: ${subjects.length} subjects / ${TOTAL_TOPICS} topics; App uses one canonical catalog with chapter order, counts, and English route-label exclusions verified.`);
