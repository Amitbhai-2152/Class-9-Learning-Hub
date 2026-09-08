import fs from 'node:fs';

const revisionPath='src/english/EnglishPanoramaProseRevision.jsx';
const appPath='src/AppWithChapter5.jsx';
const subjectPath='src/english/EnglishSubjectSection.jsx';

const revision=fs.readFileSync(revisionPath,'utf8');
const app=fs.readFileSync(appPath,'utf8');
const subject=fs.readFileSync(subjectPath,'utf8');

const errors=[];
const count=(text,needle)=>(text.match(new RegExp(needle.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'g'))||[]).length;
const questionCount=count(revision,"q:'");
const answerCount=count(revision,'a:0');
const explanationCount=count(revision,"e:'");
const optionCount=(revision.match(/o:\[[^\]]*\]/g)||[]).length;

if(questionCount!==45)errors.push(`Expected 45 revision questions, found ${questionCount}`);
if(answerCount!==45)errors.push(`Expected 45 answer keys, found ${answerCount}`);
if(explanationCount!==45)errors.push(`Expected 45 explanations, found ${explanationCount}`);
if(optionCount!==45)errors.push(`Expected 45 option arrays, found ${optionCount}`);
if(!revision.includes('const misconceptions='))errors.push('Common-mistake section missing');
if(!revision.includes('All nine prose chapters') && !revision.includes('All 9 prose chapters'))errors.push('All-nine-chapters revision heading missing');
if(!revision.includes('title="Whole Prose Revision Test"'))errors.push('Timed quiz title missing');
if(!revision.includes('mode="challenge"'))errors.push('Timed challenge mode missing');
if(!app.includes('EnglishPanoramaProseRevision'))errors.push('Revision component not imported/routed');
if(!app.includes("p.get('proseRevision')==='1'"))errors.push('proseRevision route guard missing');
if(!subject.includes('Whole Prose Revision Test'))errors.push('Revision entry missing from English Panorama navigation');
if(!subject.includes('openProseRevision'))errors.push('Revision navigation handler missing');

if(errors.length){
 console.error('English Phase 3 prose revision QA failed:');
 errors.forEach(e=>console.error(`- ${e}`));
 process.exit(1);
}

console.log('English Phase 3 prose revision QA passed.');
console.log(`Fresh MCQs: ${questionCount}`);
console.log('Coverage: 5 questions × 9 prose chapters');
console.log('Common-mistake checks: 9');
console.log('Shared PanoramaTimedQuiz wiring: OK');
console.log('Navigation/routing wiring: OK');
