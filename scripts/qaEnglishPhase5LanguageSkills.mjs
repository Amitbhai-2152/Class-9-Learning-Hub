import fs from 'node:fs';

const read=p=>fs.readFileSync(p,'utf8');
const skills=read('src/english/EnglishPanoramaLanguageSkills.jsx');
const timedQuiz=read('src/english/EnglishTimedQuiz.jsx');
const clauses=read('src/english/EnglishClausesTopic.jsx');
const app=read('src/AppWithChapter5.jsx');
const subject=read('src/english/EnglishSubjectSection.jsx');
const revision=read('src/english/EnglishPanoramaProseRevision.jsx');
const generic=read('src/english/EnglishGenericLanguageSkillsQuiz.jsx');
const genericBanks=read('src/english/EnglishGenericLanguageSkillsBanks.jsx');
const idioms=read('src/english/EnglishIdiomsPhrasesTopic.jsx');
const idiomBank=read('src/english/EnglishIdiomsPhrasesQuestionBank.jsx');
const errors=[];

const req=['tenses','modals','voice','agreement','narration','clauses','determiners','prepositions','idioms','translation','formal-letter','informal-letter','notice','report','speech','message','paragraph-essay','composition','factual-reading','literary-reading','poetry-reading'];
for(const id of req)if(!skills.includes(`id:'${id}'`))errors.push(`Topic missing from registry: ${id}`);

const lessonMarkers=(skills.match(/\['\d{2}','/g)||[]).length;
if(lessonMarkers<70)errors.push(`Expected a substantial Language & Skills lesson library, found ${lessonMarkers} lesson markers`);

if(!skills.includes('const TOPICS=['))errors.push('Canonical TOPICS registry missing');
if(!skills.includes('modeNames'))errors.push('Shared mode registry missing');
for(const mode of ['learn','practice','challenge','test'])if(!skills.includes(`mode==='${mode}'`))errors.push(`${mode} mode missing`);

if(!timedQuiz.includes('getBank')||!timedQuiz.includes('questions'))errors.push('Timed quiz does not expose a shared bank API');
if(!timedQuiz.includes('setSubmitted')||!timedQuiz.includes('Review answers'))errors.push('Timed quiz submission/review flow missing');
if(!timedQuiz.includes('Retry')||!timedQuiz.includes('Next level'))errors.push('Timed quiz retry/next-level flow missing');
if(!timedQuiz.includes('answered')||!timedQuiz.includes('percent'))errors.push('Timed quiz score/percentage review missing');
if(!timedQuiz.includes('onModeChange'))errors.push('Timed quiz mode-switch API missing');
if(!timedQuiz.includes('randomizeOptions')||!timedQuiz.includes('Math.random')||!timedQuiz.includes('pairs.findIndex'))errors.push('Timed quiz option randomization/remapped-answer logic missing');
if(!timedQuiz.includes("title==='Idioms & Phrases'"))errors.push('Idioms timing standard missing from shared timed quiz');

if(!clauses.includes('<EnglishTimedQuiz')||!clauses.includes('questions={selected}'))errors.push('Clauses is not wired to the shared timed quiz question-bank API');
if(!clauses.includes("['learn','Learn']")||!clauses.includes("['practice','Practice']")||!clauses.includes("['challenge','Challenge']")||!clauses.includes("['test','Final Test']"))errors.push('Clauses assessment levels are incomplete');

if(!generic.includes('PHASE4_BANKS')||!generic.includes('dedicatedBank'))errors.push('Generic quiz wrapper is not wired to dedicated Phase 4 banks');
for(const id of ['agreement','determiners','prepositions','idioms','translation']){
  if(!genericBanks.includes(`${id}:{`))errors.push(`Phase 4 bank missing: ${id}`);
}

if(!app.includes("const GENERIC_LANGUAGE_SKILLS=new Set"))errors.push('Generic timed-quiz routing registry missing');
if(!app.includes('EnglishGenericLanguageSkillsQuiz'))errors.push('Generic timed-quiz component missing from app routing');
if(!app.includes('EnglishIdiomsPhrasesTopic'))errors.push('Dedicated Idioms & Phrases component missing from app routing');
if(!app.includes("genericTopic==='idioms'"))errors.push('Dedicated Idioms & Phrases route missing');
if(app.includes("const GENERIC_LANGUAGE_SKILLS=new Set(['agreement','idioms'"))errors.push('Idioms remains incorrectly inside generic routing set');
if(!app.includes("p.get('languageSkills')==='1'"))errors.push('Language Skills app routing missing');
if(!subject.includes('openLanguageSkills')||!subject.includes('English Language &amp; Skills Hub'))errors.push('Language Skills navigation missing');
if(!revision.includes('Whole Prose Revision Test'))errors.push('Existing prose revision missing');

if(!idioms.includes('const LESSONS=['))errors.push('Dedicated Idioms LESSONS registry missing');
const idiomLessonCount=(idioms.match(/\{n:'\d{2}',group:/g)||[]).length;
if(idiomLessonCount!==20)errors.push(`Idioms Learn expected 20 lessons, found ${idiomLessonCount}`);
for(const mode of ['practice','challenge','test']){
  const blockStart=idiomBank.indexOf(`${mode}:[`);
  if(blockStart<0)errors.push(`Idioms ${mode} bank missing`);
  else {const blockEnd=mode==='test'?idiomBank.length:idiomBank.indexOf(`\n${mode==='practice'?'challenge':'test'}:[`,blockStart);const block=idiomBank.slice(blockStart,blockEnd<0?idiomBank.length:blockEnd);const count=(block.match(/^\[/gm)||[]).length;if(count!==(mode==='practice'?12:mode==='challenge'?15:20))errors.push(`Idioms ${mode} expected ${mode==='practice'?12:mode==='challenge'?15:20} questions, found ${count}`)}
}
if(!idioms.includes('questions={bank}'))errors.push('Dedicated Idioms assessments are not wired to shared timed quiz');
if(!idioms.includes("p.set('topic','idioms')"))errors.push('Idioms mode routing metadata missing');

if(errors.length){console.error('English Phase 5 language-skills QA failed:');errors.forEach(e=>console.error(`- ${e}`));process.exit(1)}
console.log('English Phase 5 language-skills QA passed.');
console.log(`Registry topics: ${req.length}`);
console.log(`Base lesson markers: ${lessonMarkers}`);
console.log(`Idioms lessons: ${idiomLessonCount}`);
console.log('Canonical timed assessment engine + randomized options: OK');
console.log('Dedicated Idioms Learn / Practice / Challenge / Final Test: OK');
console.log('Navigation/routing: OK');
