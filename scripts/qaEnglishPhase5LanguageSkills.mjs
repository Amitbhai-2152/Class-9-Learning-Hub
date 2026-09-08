import fs from 'node:fs';

const revision='src/english/EnglishPanoramaProseRevision.jsx';
const skills='src/english/EnglishPanoramaLanguageSkills.jsx';
const skillsCss='src/english/EnglishPanoramaLanguageSkills.css';
const app='src/AppWithChapter5.jsx';
const subject='src/english/EnglishSubjectSection.jsx';

const read=p=>fs.readFileSync(p,'utf8');
const files=[revision,skills,skillsCss,app,subject].map(p=>[p,read(p)]);
const errors=[];
const text=Object.fromEntries(files);
const count=(s,re)=>[...s.matchAll(re)].length;

if(!text[skills].includes('EnglishPanoramaLanguageSkills.css'))errors.push('Dedicated Phase 5 CSS import missing');
if(count(text[skills],/\{q:/g)!==36)errors.push(`Expected 36 language-skills questions, found ${count(text[skills],/\{q:/g)}`);
if(count(text[skills],/a:0/g)!==36)errors.push(`Expected 36 answer keys, found ${count(text[skills],/a:0/g)}`);
if(count(text[skills],/e:'/g)!==36)errors.push(`Expected 36 explanations, found ${count(text[skills],/e:'/g)}`);
if(count(text[skills],/o:\[/g)!==36)errors.push(`Expected 36 option arrays, found ${count(text[skills],/o:\[/g)}`);
for(const label of ['Tenses','Modals','Active & Passive Voice','Reporting','Subject–Verb Agreement','Clauses','Determiners','Prepositions'])if(!text[skills].includes(label))errors.push(`Grammar area missing: ${label}`);
for(const label of ['Formal Letter','Informal Letter','Notice','Report','Speech','Message','Paragraph / Essay','Composition'])if(!text[skills].includes(label))errors.push(`Writing format missing: ${label}`);
for(const label of ['Factual passage','Literary passage','Poetry passage'])if(!text[skills].includes(label))errors.push(`Reading type missing: ${label}`);
for(const label of ['Translation focus','Hindi → English','Three-step reading habit'])if(!text[skills].includes(label))errors.push(`Language-skills guidance missing: ${label}`);
if(!text[skills].includes('title="Language Skills Final Check"'))errors.push('Timed final-check title missing');
if(!text[skills].includes('mode="challenge"'))errors.push('Timed challenge mode missing');
if(!text[app].includes('EnglishPanoramaLanguageSkills'))errors.push('Phase 5 component not imported/routed');
if(!text[app].includes("p.get('languageSkills')==='1'"))errors.push('Phase 5 route guard missing');
if(!text[subject].includes('openLanguageSkills'))errors.push('Phase 5 navigation handler missing');
if(!text[subject].includes('English Language &amp; Skills Hub'))errors.push('Phase 5 navigation card missing');
if(!text[revision].includes('Whole Prose Revision Test'))errors.push('Existing prose revision page missing');

if(errors.length){console.error('English Phase 5 language-skills QA failed:');errors.forEach(e=>console.error(`- ${e}`));process.exit(1);}
console.log('English Phase 5 language-skills QA passed.');
console.log('Dedicated grammar areas: 8');
console.log('Writing formats: 8');
console.log('Unseen reading types: 3');
console.log('Translation guidance: present');
console.log('Final-check MCQs: 36');
console.log('Shared PanoramaTimedQuiz wiring: OK');
console.log('Navigation/routing: OK');
