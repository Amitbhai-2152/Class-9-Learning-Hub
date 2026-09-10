import fs from 'node:fs';

const data=fs.readFileSync('src/numberSystemData.js','utf8');
const engine=fs.readFileSync('src/NumberSystemEngine.jsx','utf8');
const css=fs.readFileSync('src/number-system.css','utf8');
const router=fs.readFileSync('src/AppWithChapter5.jsx','utf8');

const fail=[];
const assert=(ok,msg)=>{if(!ok)fail.push(msg)};

const lessonCount=(data.match(/\{id:'[^']+',title:/g)||[]).length;
const rows=[...data.matchAll(/q\('([^']+)','(easy|medium|hard)','([^']+)',\[(.*?)\],([0-3]),'([^']*)'\)/gs)];
const questions=rows.map(m=>({topic:m[1],level:m[2],text:m[3],options:m[4].split(/',\s*'/).map(x=>x.replace(/^'|'$/g,'')),answer:Number(m[5]),explain:m[6]}));
const texts=questions.map(x=>x.text);

assert(lessonCount===7,'Expected 7 guided lesson cards (6 core topics + mixed revision).');
assert(questions.length===60,'Expected exactly 60 curated Number System questions.');
assert(new Set(texts).size===texts.length,'Question wording must not contain duplicates.');
assert(questions.every(q=>q.options.length===4),'Every question must have exactly four options.');
assert(questions.every(q=>q.answer>=0&&q.answer<4),'Every question must have a valid answer index.');
assert(questions.every(q=>q.explain.trim().length>=12),'Every question must have a meaningful explanation.');
assert(new Set(questions.map(q=>q.topic)).size===7,'Question bank should cover all six core areas plus mixed revision.');
assert(engine.includes("NUMBER_SYSTEM_LESSONS,NUMBER_SYSTEM_QUESTIONS,NUMBER_SYSTEM_CHALLENGES"),'Engine must consume the curated data module.');
assert(engine.includes('prepareQuestion'),'Option randomisation helper must exist.');
assert(engine.includes('shuffle(pairs'),'Correct answer must move together with shuffled options.');
assert(engine.includes("mode==='test'?20"),'Final test should contain 20 questions.');
assert(engine.includes("mode==='challenge'?12"),'Challenge should contain 12 questions.');
assert(engine.includes('12*60'),'Test timer should be finite and explicit.');
assert(engine.includes("localStorage.setItem('class9-mistakes'"),'Wrong answers should be persisted to the existing mistake review store.');
assert(engine.includes('markStageComplete(`गणित::${chapter}`,stage)'),'Completion must integrate with the learning progress system.');
assert(css.includes('@media(max-width:760px)'),'Responsive mobile layout must be present.');
assert(css.includes('.ns-option.correct')&&css.includes('.ns-option.wrong'),'Answer-state UI must distinguish correct/wrong choices.');
assert(css.includes('.ns-feedback'),'Explanation feedback styling must be present.');
assert(router.includes("import {NumberSystemEngine} from './NumberSystemEngine.jsx'"),'Dedicated engine import must be wired.');
assert(router.includes("get('subject')==='math'&&mathParams?.get('chapter')==='0'"),'Math Chapter 1 route must be intercepted.');
assert(router.includes('<NumberSystemEngine chapter="संख्या पद्धति"'),'Router must render the dedicated Number System engine.');

if(fail.length){console.error('Number System QA FAILED');fail.forEach(x=>console.error(`- ${x}`));process.exit(1)}
console.log('Number System QA PASSED');
console.log(`Lessons: ${lessonCount} | Questions: ${questions.length} | Unique question texts: ${new Set(texts).size} | Four-option integrity: yes | Randomised options: yes | Responsive UI: yes | Dedicated route: yes`);
