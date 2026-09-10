import fs from 'node:fs';

const data=fs.readFileSync('src/numberSystemData.js','utf8');
const engine=fs.readFileSync('src/NumberSystemEngine.jsx','utf8');
const css=fs.readFileSync('src/number-system.css','utf8');
const router=fs.readFileSync('src/AppWithChapter5.jsx','utf8');

const fail=[];
const assert=(ok,msg)=>{if(!ok)fail.push(msg)};

const lessonCount=(data.match(/\{id:'[^']+',title:/g)||[]).length;
const questionRows=[...data.matchAll(/q\('[^']+','(easy|medium|hard)','([^']+)',\[/g)];
const ids=[...data.matchAll(/\{id:`([^`]+)`/g)].map(m=>m[1]);

assert(lessonCount===7,'Expected 7 guided lesson cards (6 core topics + mixed revision).');
assert(questionRows.length===60,'Expected exactly 60 curated Number System questions.');
assert(ids.length===60,'Every question should have a stable id.');
assert(new Set(ids).size===ids.length,'Question IDs must be unique.');
assert((data.match(/\['[^']+','[^']+','[^']+','[^']+'\]/g)||[]).length>=60,'Each question must expose four options.');
assert((data.match(/,answer,[0-3],'[^']*'\)/g)||[]).length===60,'Every question must have a 0–3 answer index and explanation.');
assert(engine.includes("NUMBER_SYSTEM_LESSONS,NUMBER_SYSTEM_QUESTIONS,NUMBER_SYSTEM_CHALLENGES"),'Engine must consume the curated data module.');
assert(engine.includes('prepareQuestion'),'Option randomisation helper must exist.');
assert(engine.includes('shuffle(pairs'),'Correct answer must move together with shuffled options.');
assert(engine.includes("mode==='test'?20"),'Final test should contain 20 questions.');
assert(engine.includes("mode==='challenge'?12"),'Challenge should contain 12 questions.');
assert(engine.includes('12*60'),'Test timer should be finite and explicit.');
assert(engine.includes('localStorage.setItem(\'class9-mistakes\''),'Wrong answers should be persisted to the existing mistake review store.');
assert(engine.includes('markStageComplete(`गणित::${chapter}`,stage)'),'Completion must integrate with the learning progress system.');
assert(css.includes('@media(max-width:760px)'),'Responsive mobile layout must be present.');
assert(css.includes('.ns-option.correct')&&css.includes('.ns-option.wrong'),'Answer-state UI must distinguish correct/wrong choices.');
assert(css.includes('.ns-feedback'),'Explanation feedback styling must be present.');
assert(router.includes("import {NumberSystemEngine} from './NumberSystemEngine.jsx'"),'Dedicated engine import must be wired.');
assert(router.includes("get('subject')==='math'&&mathParams?.get('chapter')==='0'"),'Math Chapter 1 route must be intercepted.');
assert(router.includes('<NumberSystemEngine chapter="संख्या पद्धति"'),'Router must render the dedicated Number System engine.');

if(fail.length){console.error('Number System QA FAILED');fail.forEach(x=>console.error(`- ${x}`));process.exit(1)}
console.log('Number System QA PASSED');
console.log(`Lessons: ${lessonCount} | Questions: ${questionRows.length} | Unique IDs: ${new Set(ids).size} | Responsive UI: yes | Randomised options: yes | Dedicated route: yes`);
