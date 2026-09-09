import fs from 'node:fs';

const skills=fs.readFileSync('src/english/EnglishPanoramaLanguageSkills.jsx','utf8');
const timedQuiz=fs.readFileSync('src/english/EnglishTimedQuiz.jsx','utf8');
const clauses=fs.readFileSync('src/english/EnglishClausesTopic.jsx','utf8');
const app=fs.readFileSync('src/AppWithChapter5.jsx','utf8');
const subject=fs.readFileSync('src/english/EnglishSubjectSection.jsx','utf8');
const revision=fs.readFileSync('src/english/EnglishPanoramaProseRevision.jsx','utf8');
const errors=[];

const req=['tenses','modals','voice','agreement','narration','clauses','determiners','prepositions','idioms','translation','formal-letter','informal-letter','notice','report','speech','message','paragraph-essay','composition','factual-reading','literary-reading','poetry-reading'];
for(const id of req)if(!skills.includes(`id:'${id}'`))errors.push(`Topic missing from registry: ${id}`);

const lessonMarkers=(skills.match(/\['\d{2}','/g)||[]).length;
if(lessonMarkers<70)errors.push(`Expected a substantial Language & Skills lesson library, found ${lessonMarkers} lesson markers`);

if(!skills.includes('const TOPICS=['))errors.push('Canonical TOPICS registry missing');
if(!skills.includes('modeNames'))errors.push('Shared mode registry missing');
if(!skills.includes("mode==='learn'"))errors.push('Learn mode missing');
if(!skills.includes("mode==='practice'"))errors.push('Practice mode missing');
if(!skills.includes("mode==='challenge'"))errors.push('Challenge mode missing');
if(!skills.includes("mode==='test'"))errors.push('Final Test mode missing');

if(!timedQuiz.includes('getBank')||!timedQuiz.includes('questions'))errors.push('Timed quiz does not expose a shared bank API');
if(!timedQuiz.includes('setSubmitted')||!timedQuiz.includes('Review answers'))errors.push('Timed quiz submission/review flow missing');
if(!timedQuiz.includes('Retry')||!timedQuiz.includes('Next level'))errors.push('Timed quiz retry/next-level flow missing');
if(!timedQuiz.includes('answered')||!timedQuiz.includes('percent'))errors.push('Timed quiz score/percentage review missing');

if(!clauses.includes('<EnglishTimedQuiz')||!clauses.includes('questions={selected}'))errors.push('Clauses is not wired to the shared timed quiz question-bank API');
if(!clauses.includes("['learn','Learn']")||!clauses.includes("['practice','Practice']")||!clauses.includes("['challenge','Challenge']")||!clauses.includes("['test','Final Test']"))errors.push('Clauses assessment levels are incomplete');

if(!app.includes('EnglishPanoramaLanguageSkills')||!app.includes("p.get('languageSkills')==='1'"))errors.push('Language Skills app routing missing');
if(!subject.includes('openLanguageSkills')||!subject.includes('English Language &amp; Skills Hub'))errors.push('Language Skills navigation missing');
if(!revision.includes('Whole Prose Revision Test'))errors.push('Existing prose revision missing');

if(errors.length){console.error('English Phase 5 language-skills QA failed:');errors.forEach(e=>console.error(`- ${e}`));process.exit(1)}
console.log('English Phase 5 language-skills QA passed.');
console.log(`Registry topics: ${req.length}`);
console.log(`Lesson markers: ${lessonMarkers}`);
console.log('Canonical timed assessment engine: OK');
console.log('Clauses shared question-bank wiring: OK');
console.log('Learn / Practice / Challenge / Final Test modes: OK');
console.log('Navigation/routing: OK');
