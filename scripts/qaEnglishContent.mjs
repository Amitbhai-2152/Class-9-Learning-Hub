import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const reader=read('src/english/EnglishReaderChapter1.jsx');
const panorama=read('src/english/EnglishPanoramaChapter1.jsx');
const panoramaEngine=read('src/english/PanoramaTimedQuiz.jsx');
const panorama2=read('src/english/EnglishPanoramaChapter2.jsx');
const panorama3=read('src/english/EnglishPanoramaChapter3.jsx');
const panorama4=read('src/english/EnglishPanoramaChapter4.jsx');
const nav=read('src/english/EnglishSubjectSection.jsx');
const app=read('src/App.jsx');

function assert(ok,msg){if(!ok)throw new Error(`English QA: ${msg}`)}
function count(text,needle){return (text.match(new RegExp(needle.replace(/[.*+?^${}()|[\\]\\]/g,'\\$&'),'g'))||[]).length}
function bankChecks(text,name){
  assert(text.includes('const practice=['),`${name}: missing practice bank`);
  assert(text.includes('const challenge=['),`${name}: missing challenge bank`);
  assert(text.includes('const finalTest='),`${name}: missing final test bank`);
  const practiceBlock=text.match(/const practice=\[(.*?)\];\s*const challenge/s)?.[1]||'';
  const challengeBlock=text.match(/const challenge=\[(.*?)\];\s*const finalTest/s)?.[1]||'';
  const practiceQ=count(practiceBlock,"{q:");
  const challengeQ=count(challengeBlock,"{q:");
  assert(practiceQ===15,`${name}: expected 15 practice questions, got ${practiceQ}`);
  assert(challengeQ>=12,`${name}: expected at least 12 challenge questions, got ${challengeQ}`);
  if(name==='Panorama Ch3'||name==='Panorama Ch4'){
    assert(/const finalTest=\[\.\.\.practice\.slice\(0,10\),\.\.\.challenge\.slice\(0,10\)\]/.test(text),`${name}: final test must be 10 practice + 10 challenge questions`);
  }
  const all=(practiceBlock+'\n'+challengeBlock);
  const total=practiceQ+challengeQ;
  const options=(all.match(/o:\[[^\]]+\]/g)||[]);
  assert(options.length===total,`${name}: expected ${total} option arrays, got ${options.length}`);
  for(const [i,opt] of options.entries()){
    const items=[...opt.matchAll(/'([^']*)'/g)].map(m=>m[1]);
    assert(items.length===4,`${name}: question ${i+1} must have exactly 4 options`);
    assert(new Set(items).size===4,`${name}: question ${i+1} has duplicate options`);
  }
  const answers=(all.match(/a:\d+/g)||[]).length;
  assert(answers===total,`${name}: expected explicit source answer keys for ${total} questions`);
}

bankChecks(reader,'English Reader Ch1');
bankChecks(panorama,'Panorama Ch1');
bankChecks(panorama2,'Panorama Ch2');
bankChecks(panorama3,'Panorama Ch3');
bankChecks(panorama4,'Panorama Ch4');

assert(/function shuffleQuestion/.test(reader),'English Reader Ch1: missing option shuffle');
assert(/function shuffleQuestion/.test(panoramaEngine),'Panorama timed engine: missing runtime option shuffle');
assert(/sourceIndex/.test(panoramaEngine),'Panorama timed engine: source-index answer remapping missing');
assert(/MODE_CONFIG/.test(panoramaEngine),'Panorama timed engine: mode timing config missing');
assert(/practice:[\s\S]*?45/.test(panoramaEngine),'Panorama timed engine: practice timing config missing');
assert(/challenge:[\s\S]*?60/.test(panoramaEngine),'Panorama timed engine: challenge timing config missing');
assert(/test:[\s\S]*?75/.test(panoramaEngine),'Panorama timed engine: test timing config missing');
assert(/bank\.length\s*\*/.test(panoramaEngine),'Panorama timed engine: question-count-based timing missing');
assert(/allAnswered=/.test(panoramaEngine)&&/disabled=\{!allAnswered\}/.test(panoramaEngine),'Panorama timed engine: all-question completion gate missing');
assert(/prev<=1/.test(panoramaEngine)&&/setSubmitted\(true\)/.test(panoramaEngine),'Panorama timed engine: auto-submit timeout missing');
assert(/Your answer/.test(panoramaEngine)&&/Correct answer/.test(panoramaEngine),'Panorama timed engine: full answer review missing');
assert(/score/.test(panoramaEngine)&&/pct/.test(panoramaEngine),'Panorama timed engine: score/percentage result missing');

for(const [text,name] of [[panorama,'Panorama Ch1'],[panorama2,'Panorama Ch2'],[panorama3,'Panorama Ch3'],[panorama4,'Panorama Ch4']]){
  assert(text.includes("PanoramaTimedQuiz from './PanoramaTimedQuiz.jsx'"),`${name}: shared timed engine not wired`);
  assert(!text.includes('const [selected,setSelected]'),`${name}: legacy selected-answer state remains`);
  assert(!text.includes('pg-feedback'),`${name}: legacy quiz feedback UI remains`);
  assert(!text.includes('function shuffleQuestion'),`${name}: chapter-local quiz shuffle remains`);
}

assert(reader.includes("title:\"I'm going to dance again\""),'Reader Ch1 title mismatch');
assert(reader.includes("author:'Najmul Hasan'"),'Reader Ch1 author missing');
assert(panorama.includes("title:'Dharam Juddha'"),'Panorama Ch1 title mismatch');
assert(panorama.includes("author:'Arjun Dev Charan'"),'Panorama Ch1 author missing');
assert(panorama2.includes("title:'Yayati'"),'Panorama Ch2 title mismatch');
assert(panorama2.includes("author:'C. Rajagopalachari'"),'Panorama Ch2 author missing');
assert(panorama3.includes("title:'A Silent Revolution'"),'Panorama Ch3 title mismatch');
assert(panorama3.includes("author:'Kunal Varma'"),'Panorama Ch3 author missing');
assert(panorama4.includes("title:'Too Many People, Too Few Trees'"),'Panorama Ch4 title mismatch');
assert(panorama4.includes("author:'Moti Nisani'"),'Panorama Ch4 author missing');
assert(nav.includes('The Panorama')&&nav.includes('English Reader'),'book split missing');
assert(nav.includes('Learn →'),'chapter Learn action missing');
assert(app.includes("EnglishPanoramaChapter1"),'Panorama Ch1 import/route missing');
assert(app.includes("EnglishPanoramaChapter2"),'Panorama Ch2 import/route missing');
assert(app.includes("EnglishPanoramaChapter3"),'Panorama Ch3 import/route missing');
assert(app.includes("EnglishPanoramaChapter4"),'Panorama Ch4 import/route missing');
assert(app.includes("chapter==='Reader • 1 I’m going to dance again'"),'Reader Ch1 route missing');
assert(app.includes("chapter==='Panorama • Prose 1 Dharam Juddha'"),'Panorama Ch1 route missing');
assert(app.includes("chapter==='Panorama • Prose 2 Yayati'"),'Panorama Ch2 route missing');
assert(app.includes("chapter==='Panorama • Prose 3 A Silent Revolution'"),'Panorama Ch3 route missing');
assert(app.includes("chapter==='Panorama • Prose 4 Too Many People, Too Few Trees'"),'Panorama Ch4 route missing');
const readerNames=['I’m going to dance again','Scaling Great Heights','Saint Kabir','The eyes are not here','Ismat Chughtai: A woman with a difference','The accidental tourist','Saint Ravidas','Bharathipura'];
const prose=['Dharam Juddha','Yayati','A Silent Revolution','Too Many People, Too Few Trees','Echo and Narcissus','The Shehnai of Bismillah Khan','Kathmandu','My Childhood','The Gift of the Magi'];
const poetry=['The Grandmother','On His Blindness','Blow, Blow, Thou Winter Wind','To Daffodils','Sound','Self Introduction','I Am Like Grass','Abraham Lincoln’s Letter to His Son’s Teacher'];
const rte=['The Secret of Work','Gandhiji’s Passion for Nursing','With the Photographer'];
for(const n of [...readerNames,...prose,...poetry,...rte])assert(nav.includes(n),`navigation missing chapter: ${n}`);
for(const [text,name] of [[panorama,'Panorama Ch1'],[panorama2,'Panorama Ch2'],[panorama3,'Panorama Ch3'],[panorama4,'Panorama Ch4']]){
  assert(/sections:\[/.test(text),`${name} guided sections missing`);
  assert(count(text,"{title:'Part ")>=8,`${name} expected at least 8 guided reading parts`);
  assert(text.includes('wordStudy:'),'word study missing');
  assert(text.includes('grammar:'),'grammar lab missing');
  assert(text.includes('examPrep:')||count(text,"exam:'")>=8,`${name} exam prep missing`);
}
assert(panorama3.includes('composition:'),'Panorama Ch3 composition section missing');
assert(panorama3.includes('activities:'),'Panorama Ch3 activities section missing');
assert(panorama3.includes("suffix:["),'Panorama Ch3 -ity word formation missing');
assert(panorama4.includes('composition:'),'Panorama Ch4 composition section missing');
assert(panorama4.includes('activities:'),'Panorama Ch4 activities section missing');
assert(panorama4.includes('translationPractice:'),'Panorama Ch4 translation section missing');
assert(panorama4.includes('Modal Auxiliaries'),'Panorama Ch4 modal grammar missing');
console.log('English content QA passed: Reader/Prose banks, shared timed Panorama engine, runtime option randomization, source-answer remapping, timing by mode/question count, completion gating, full review, Chapters 1–4 study depth, Chapter 4 source coverage, and routing verified.');