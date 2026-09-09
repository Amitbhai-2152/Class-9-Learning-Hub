import fs from 'node:fs';

const skills=fs.readFileSync('src/english/EnglishPanoramaLanguageSkills.jsx','utf8');
const timedQuiz=fs.readFileSync('src/english/EnglishTimedQuiz.jsx','utf8');
const clauses=fs.readFileSync('src/english/EnglishClausesTopic.jsx','utf8');
const app=fs.readFileSync('src/AppWithChapter5.jsx','utf8');
const subject=fs.readFileSync('src/english/EnglishSubjectSection.jsx','utf8');
const revision=fs.readFileSync('src/english/EnglishPanoramaProseRevision.jsx','utf8');
const generic=fs.readFileSync('src/english/EnglishGenericLanguageSkillsQuiz.jsx','utf8');
const genericBanks=fs.readFileSync('src/english/EnglishGenericLanguageSkillsBanks.jsx','utf8');
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

if(!clauses.includes('<EnglishTimedQuiz')||!clauses.includes('questions={selected}'))errors.push('Clauses is not wired to the shared timed quiz question-bank API');
if(!clauses.includes("['learn','Learn']")||!clauses.includes("['practice','Practice']")||!clauses.includes("['challenge','Challenge']")||!clauses.includes("['test','Final Test']"))errors.push('Clauses assessment levels are incomplete');

if(!generic.includes('PHASE4_BANKS')||!generic.includes('dedicatedBank'))errors.push('Generic quiz wrapper is not wired to dedicated Phase 4 banks');
for(const id of ['agreement','determiners','prepositions','idioms','translation']){
  if(!genericBanks.includes(`${id}:{`))errors.push(`Phase 4 bank missing: ${id}`);
  const start=genericBanks.indexOf(`${id}:{`);
  const next=genericBanks.indexOf('\n},',start+1);
  const block=genericBanks.slice(start,next<0?genericBanks.length:next);
  for(const mode of ['practice','challenge','test']){
    if(!block.includes(`${mode}:[`))errors.push(`Phase 4 ${id}: ${mode} bank missing`);
    else {
      const modeStart=block.indexOf(`${mode}:[`); const modeTail=block.slice(modeStart, modeStart+10000);
      const count=(modeTail.match(/\['/g)||[]).length;
      if(count<6)errors.push(`Phase 4 ${id}: ${mode} has only ${count} questions`);
    }
  }
}

if(app.includes("const GENERIC_LANGUAGE_SKILLS=new Set")===false)errors.push('Generic timed-quiz routing registry missing');
if(!app.includes('EnglishGenericLanguageSkillsQuiz'))errors.push('Generic timed-quiz component missing from app routing');
if(!app.includes('p.get(\'languageSkills\')===\'1\''))errors.push('Language Skills app routing missing');
if(!subject.includes('openLanguageSkills')||!subject.includes('English Language &amp; Skills Hub'))errors.push('Language Skills navigation missing');
if(!revision.includes('Whole Prose Revision Test'))errors.push('Existing prose revision missing');

if(errors.length){console.error('English Phase 5 language-skills QA failed:');errors.forEach(e=>console.error(`- ${e}`));process.exit(1)}
console.log('English Phase 5 language-skills QA passed.');
console.log(`Registry topics: ${req.length}`);
console.log(`Lesson markers: ${lessonMarkers}`);
console.log('Canonical timed assessment engine: OK');
console.log('Clauses shared question-bank wiring: OK');
console.log('Phase 4 dedicated grammar banks: 5 topics × 3 levels × 6 questions');
console.log('Learn / Practice / Challenge / Final Test modes: OK');
console.log('Navigation/routing: OK');
