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
const panorama5=read('src/english/EnglishPanoramaChapter5.jsx');
const panorama6=read('src/english/EnglishPanoramaChapter6Final.jsx');
const panorama7=read('src/english/EnglishPanoramaChapter7Final.jsx');
const panorama8=read('src/english/EnglishPanoramaChapter8Final.jsx');
const nav=read('src/english/EnglishSubjectSection.jsx');
const app=read('src/App.jsx');
const appShell=read('src/AppWithChapter5.jsx');
const main2=read('src/main2.jsx');

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
  if(['Panorama Ch6','Panorama Ch7','Panorama Ch8'].includes(name))assert(challengeQ===23,`${name}: expected 23 challenge questions, got ${challengeQ}`);
  else assert(challengeQ>=12,`${name}: expected at least 12 challenge questions, got ${challengeQ}`);
  if(['Panorama Ch3','Panorama Ch4','Panorama Ch5','Panorama Ch6','Panorama Ch7','Panorama Ch8'].includes(name))assert(/const finalTest=\[\.\.\.practice\.slice\(0,10\),\.\.\.challenge\.slice\(0,10\)\]/.test(text),`${name}: final test must be 10 practice + 10 challenge questions`);
  const all=(practiceBlock+'\n'+challengeBlock), total=practiceQ+challengeQ;
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
bankChecks(panorama5,'Panorama Ch5');
bankChecks(panorama6,'Panorama Ch6');
bankChecks(panorama7,'Panorama Ch7');
bankChecks(panorama8,'Panorama Ch8');

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

for(const [text,name] of [[panorama,'Panorama Ch1'],[panorama2,'Panorama Ch2'],[panorama3,'Panorama Ch3'],[panorama4,'Panorama Ch4'],[panorama5,'Panorama Ch5'],[panorama6,'Panorama Ch6'],[panorama7,'Panorama Ch7'],[panorama8,'Panorama Ch8']]){
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
assert(panorama5.includes("title:'Echo and Narcissus'"),'Panorama Ch5 title mismatch');
assert(panorama5.includes("author:'Moira Kerr and John Bennett'"),'Panorama Ch5 author missing');
assert(panorama6.includes("title:'The Shehnai of Bismillah Khan'"),'Panorama Ch6 title mismatch');
assert(panorama6.includes('sourceNote:\'Class 9 English • The Panorama • Prose Chapter 6\''),'Panorama Ch6 source note missing');
assert(panorama7.includes("title:'Kathmandu'"),'Panorama Ch7 title mismatch');
assert(panorama7.includes("author:'Vikram Seth'"),'Panorama Ch7 author missing');
assert(panorama7.includes('sourceNote:\'Class 9 English • The Panorama • Prose Chapter 7\''),'Panorama Ch7 source note missing');
assert(panorama8.includes("title:'My Childhood'"),'Panorama Ch8 title mismatch');
assert(panorama8.includes("author:'A. P. J. Abdul Kalam'"),'Panorama Ch8 author missing');
assert(panorama8.includes('sourceNote:\'Class 9 English • The Panorama • Prose Chapter 8\''),'Panorama Ch8 source note missing');
assert(nav.includes('The Panorama')&&nav.includes('English Reader'),'book split missing');
assert(nav.includes('Learn →'),'chapter Learn action missing');
assert(nav.includes('const panoramaProse=['),'Panorama prose chapter registry missing');
assert(nav.includes('prefix="Panorama • Prose"'),'Panorama prose card prefix missing');
assert(nav.includes('const chapter=`${prefix} ${n} ${name}`'),'Panorama chapter-card IDs are constructed consistently');
assert(nav.includes('if(n===5||n===6||n===7||n===8)'),'Panorama Ch5–Ch8 routing handler missing');
assert(app.includes("EnglishPanoramaChapter1"),'Panorama Ch1 import/route missing');
assert(app.includes("EnglishPanoramaChapter2"),'Panorama Ch2 import/route missing');
assert(app.includes("EnglishPanoramaChapter3"),'Panorama Ch3 import/route missing');
assert(app.includes("EnglishPanoramaChapter4"),'Panorama Ch4 import/route missing');
assert(appShell.includes("EnglishPanoramaChapter5"),'Panorama Ch5 shell import missing');
assert(appShell.includes("EnglishPanoramaChapter6Final"),'Panorama Ch6 shell import missing');
assert(appShell.includes("EnglishPanoramaChapter7Final"),'Panorama Ch7 shell import missing');
assert(appShell.includes("EnglishPanoramaChapter8Final"),'Panorama Ch8 shell import missing');
assert(appShell.includes("n===12"),'Panorama Ch5 chapter-index route missing');
assert(appShell.includes("n===13"),'Panorama Ch6 chapter-index route missing');
assert(appShell.includes("n===14"),'Panorama Ch7 chapter-index route missing');
assert(appShell.includes("n===15"),'Panorama Ch8 chapter-index route missing');
assert(main2.includes("AppWithChapter5"),'main2 is not wired to the English chapter route shell');

const readerNames=['I’m going to dance again','Scaling Great Heights','Saint Kabir','The eyes are not here','Ismat Chughtai: A woman with a difference','The accidental tourist','Saint Ravidas','Bharathipura'];
const prose=['Dharam Juddha','Yayati','A Silent Revolution','Too Many People, Too Few Trees','Echo and Narcissus','The Shehnai of Bismillah Khan','Kathmandu','My Childhood','The Gift of the Magi'];
const poetry=['The Grandmother','On His Blindness','Blow, Blow, Thou Winter Wind','To Daffodils','Sound','Self Introduction','I Am Like Grass','Abraham Lincoln’s Letter to His Son’s Teacher'];
const rte=['The Secret of Work','Gandhiji’s Passion for Nursing','With the Photographer'];
for(const n of [...readerNames,...prose,...poetry,...rte])assert(nav.includes(n),`navigation missing chapter: ${n}`);
for(const [text,name] of [[panorama,'Panorama Ch1'],[panorama2,'Panorama Ch2'],[panorama3,'Panorama Ch3'],[panorama4,'Panorama Ch4'],[panorama5,'Panorama Ch5'],[panorama6,'Panorama Ch6'],[panorama7,'Panorama Ch7'],[panorama8,'Panorama Ch8']]){
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
assert(panorama5.includes('composition:'),'Panorama Ch5 composition section missing');
assert(panorama5.includes('activities:'),'Panorama Ch5 activities section missing');
assert(panorama5.includes('translationPractice:'),'Panorama Ch5 translation section missing');
assert(panorama5.includes('Gerund and Participle'),'Panorama Ch5 gerund/participle grammar missing');
assert(panorama5.includes('ness:[')&&panorama5.includes('less:[')&&panorama5.includes('adverbs:['),'Panorama Ch5 word-formation study missing');
assert(panorama6.includes('composition:'),'Panorama Ch6 composition section missing');
assert(panorama6.includes('activities:'),'Panorama Ch6 activities section missing');
assert(panorama6.includes('translationPractice:'),'Panorama Ch6 translation section missing');
assert(panorama6.includes('Punctuation Marks'),'Panorama Ch6 punctuation grammar missing');
assert(panorama6.includes('formation:'),'Panorama Ch6 word-formation study missing');
assert(/const finalTest=\[\.\.\.practice\.slice\(0,10\),\.\.\.challenge\.slice\(0,10\)\]/.test(panorama6),'Panorama Ch6 final test composition missing');
assert(panorama7.includes('composition:'),'Panorama Ch7 composition section missing');
assert(panorama7.includes('activities:'),'Panorama Ch7 activities section missing');
assert(panorama7.includes('translationPractice:'),'Panorama Ch7 translation section missing');
assert(panorama7.includes('Relative Clauses'),'Panorama Ch7 relative-clause grammar missing');
assert(panorama7.includes('wordStudy:'),'Panorama Ch7 word-study section missing');
assert(/const finalTest=\[\.\.\.practice\.slice\(0,10\),\.\.\.challenge\.slice\(0,10\)\]/.test(panorama7),'Panorama Ch7 final test composition missing');
assert(panorama8.includes('composition:'),'Panorama Ch8 composition section missing');
assert(panorama8.includes('activities:'),'Panorama Ch8 activities section missing');
assert(panorama8.includes('translationPractice:'),'Panorama Ch8 translation section missing');
assert(panorama8.includes('Synthesis & Conjunctions'),'Panorama Ch8 synthesis/conjunction grammar missing');
assert(panorama8.includes('Simple sentence')&&panorama8.includes('Compound sentence')&&panorama8.includes('Complex sentence'),'Panorama Ch8 sentence-type grammar missing');
assert(panorama8.includes('wordStudy:'),'Panorama Ch8 word-study section missing');
assert(/const finalTest=\[\.\.\.practice\.slice\(0,10\),\.\.\.challenge\.slice\(0,10\)\]/.test(panorama8),'Panorama Ch8 final test composition missing');
console.log('English content QA passed: Reader/Prose banks, shared timed Panorama engine, runtime option randomization, source-answer remapping, timing by mode/question count, completion gating, full review, Chapters 1–8 study depth, Chapter 8 source coverage, and routing shell verified.');
