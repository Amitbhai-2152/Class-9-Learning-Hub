import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const count=(text,needle)=>{const escaped=needle.replace(/[.*+?^${}()|[\\]\\]/g,'\\$&');return (text.match(new RegExp(escaped,'g'))||[]).length};
const files=[
 ['src/english/EnglishPanoramaChapter1.jsx','Panorama Ch1','Dharam Juddha','Arjun Dev Charan'],
 ['src/english/EnglishPanoramaChapter2.jsx','Panorama Ch2','Yayati','C. Rajagopalachari'],
 ['src/english/EnglishPanoramaChapter3.jsx','Panorama Ch3','A Silent Revolution','Kunal Varma'],
 ['src/english/EnglishPanoramaChapter4.jsx','Panorama Ch4','Too Many People, Too Few Trees','Moti Nisani'],
 ['src/english/EnglishPanoramaChapter5.jsx','Panorama Ch5','Echo and Narcissus','Moira Kerr and John Bennett'],
 ['src/english/EnglishPanoramaChapter6Final.jsx','Panorama Ch6','The Shehnai of Bismillah Khan',''],
 ['src/english/EnglishPanoramaChapter7Final.jsx','Panorama Ch7','Kathmandu','Vikram Seth'],
 ['src/english/EnglishPanoramaChapter8.jsx','Panorama Ch8','My Childhood','A. P. J. Abdul Kalam'],
 ['src/english/EnglishPanoramaChapter9.jsx','Panorama Ch9','The Gift of the Magi','O. Henry']
];
const reader=read('src/english/EnglishReaderChapter1.jsx');
const engine=read('src/english/PanoramaTimedQuiz.jsx');
const nav=read('src/english/EnglishSubjectSection.jsx');
const app=read('src/App.jsx');
const shell=read('src/AppWithChapter5.jsx');
const main2=read('src/main2.jsx');
function assert(ok,msg){if(!ok)throw new Error(`English QA: ${msg}`)}
function bankChecks(text,name){
 assert(text.includes('const practice=['),`${name}: missing practice bank`);
 assert(text.includes('const challenge=['),`${name}: missing challenge bank`);
 assert(text.includes('const finalTest='),`${name}: missing final test bank`);
 const pb=text.match(/const practice=\[(.*?)\];\s*const challenge/s)?.[1]||'';
 const cb=text.match(/const challenge=\[(.*?)\];\s*const finalTest/s)?.[1]||'';
 const pq=count(pb,'{q:'), cq=count(cb,'{q:');
 assert(pq===15,`${name}: expected 15 practice questions, got ${pq}`);
 assert(cq===23,`${name}: expected 23 challenge questions, got ${cq}`);
 if(name!=='Panorama Ch1'&&name!=='Panorama Ch2'&&name!=='Panorama Ch3'&&name!=='Panorama Ch4'){
  assert(/const finalTest=\[\.\.\.practice\.slice\(0,10\),\.\.\.challenge\.slice\(0,10\)\]/.test(text),`${name}: final test must be 10 practice + 10 challenge questions`);
 }
 const all=pb+'\n'+cb,total=pq+cq,options=all.match(/o:\[[^\]]+\]/g)||[];
 assert(options.length===total,`${name}: expected ${total} option arrays, got ${options.length}`);
 for(const [i,opt] of options.entries()){
  const items=[...opt.matchAll(/'([^']*)'/g)].map(m=>m[1]);
  assert(items.length===4,`${name}: question ${i+1} must have exactly 4 options`);
  assert(new Set(items).size===4,`${name}: question ${i+1} has duplicate options`);
 }
 assert((all.match(/a:\d+/g)||[]).length===total,`${name}: explicit answer keys missing`);
}

for(const [p,name,title,author] of files){
 const t=read(p); bankChecks(t,name);
 assert(t.includes("PanoramaTimedQuiz from './PanoramaTimedQuiz.jsx'"),`${name}: shared timed engine not wired`);
 assert(!t.includes('const [selected,setSelected]'),`${name}: legacy selected-answer state remains`);
 assert(!t.includes('pg-feedback'),`${name}: legacy quiz feedback UI remains`);
 assert(!t.includes('function shuffleQuestion'),`${name}: chapter-local quiz shuffle remains`);
 assert(t.includes(`title:'${title}'`),`${name}: title mismatch`);
 if(author)assert(t.includes(`author:'${author}'`),`${name}: author missing`);
 assert(/sections:\[/.test(t),`${name}: guided sections missing`);
 assert(count(t,"{title:'Part ")>=8,`${name}: guided reading depth is below minimum`);
 assert(t.includes('wordStudy:'),`${name}: word study missing`);
 assert(t.includes('grammar:'),`${name}: grammar missing`);
 assert(t.includes('composition:'),`${name}: composition missing`);
 assert(t.includes('activities:'),`${name}: activities missing`);
 assert(t.includes('translationPractice:'),`${name}: translation practice missing`);
}

assert(/function shuffleQuestion/.test(reader),'English Reader Ch1: shuffle missing');
assert(/function shuffleQuestion/.test(engine),'Panorama engine: runtime shuffle missing');
assert(/sourceIndex/.test(engine),'Panorama engine: answer remapping missing');
assert(/MODE_CONFIG/.test(engine),'Panorama engine: timing config missing');
assert(/practice:[\s\S]*?45/.test(engine),'Panorama engine: practice timing missing');
assert(/challenge:[\s\S]*?60/.test(engine),'Panorama engine: challenge timing missing');
assert(/test:[\s\S]*?75/.test(engine),'Panorama engine: final timing missing');
assert(/bank\.length\s*\*/.test(engine),'Panorama engine: question-count timing missing');
assert(/allAnswered=/.test(engine)&&/disabled=\{!allAnswered\}/.test(engine),'Panorama engine: completion gate missing');
assert(/prev<=1/.test(engine)&&/setSubmitted\(true\)/.test(engine),'Panorama engine: auto-submit missing');
assert(/Your answer/.test(engine)&&/Correct answer/.test(engine),'Panorama engine: full review missing');
assert(/score/.test(engine)&&/pct/.test(engine),'Panorama engine: score/percentage missing');

assert(nav.includes('const panoramaProse=['),'Panorama prose registry missing');
assert(nav.includes('The Gift of the Magi'),'Panorama Ch9 navigation title missing');
assert(nav.includes('if(n===5||n===6||n===7||n===8||n===9)'),'Panorama Ch5–Ch9 routing handler missing');
assert(app.includes('EnglishPanoramaChapter1'),'Panorama Ch1 route missing');
assert(app.includes('EnglishPanoramaChapter4'),'Panorama Ch4 route missing');
assert(shell.includes('EnglishPanoramaChapter5'),'Panorama Ch5 shell import missing');
assert(shell.includes('EnglishPanoramaChapter6Final'),'Panorama Ch6 shell import missing');
assert(shell.includes('EnglishPanoramaChapter7Final'),'Panorama Ch7 shell import missing');
assert(shell.includes('EnglishPanoramaChapter8'),'Panorama Ch8 shell import missing');
assert(shell.includes('EnglishPanoramaChapter9'),'Panorama Ch9 shell import missing');
assert(shell.includes('n===12'),'Panorama Ch5 chapter-index route missing');
assert(shell.includes('n===13'),'Panorama Ch6 chapter-index route missing');
assert(shell.includes('n===14'),'Panorama Ch7 chapter-index route missing');
assert(shell.includes('n===15'),'Panorama Ch8 chapter-index route missing');
assert(shell.includes('n===16'),'Panorama Ch9 chapter-index route missing');
assert(shell.includes('if(chapter===9)'),'Panorama Ch9 render route missing');
assert(main2.includes('AppWithChapter5'),'main2 route shell missing');

const readerNames=['I’m going to dance again','Scaling Great Heights','Saint Kabir','The eyes are not here','Ismat Chughtai: A woman with a difference','The accidental tourist','Saint Ravidas','Bharathipura'];
const prose=['Dharam Juddha','Yayati','A Silent Revolution','Too Many People, Too Few Trees','Echo and Narcissus','The Shehnai of Bismillah Khan','Kathmandu','My Childhood','The Gift of the Magi'];
const poetry=['The Grandmother','On His Blindness','Blow, Blow, Thou Winter Wind','To Daffodils','Sound','Self Introduction','I Am Like Grass','Abraham Lincoln’s Letter to His Son’s Teacher'];
const rte=['The Secret of Work','Gandhiji’s Passion for Nursing','With the Photographer'];
for(const n of [...readerNames,...prose,...poetry,...rte])assert(nav.includes(n),`navigation missing chapter: ${n}`);

const ch9=read('src/english/EnglishPanoramaChapter9.jsx');
assert(ch9.includes('O. Henry'), 'Panorama Ch9 author coverage missing');
assert(ch9.includes('Active and Passive Voice'),'Panorama Ch9 grammar topic missing');
assert(ch9.includes('parsimony'),'Panorama Ch9 word-study coverage missing');
assert(ch9.includes('platinum fob chain'),'Panorama Ch9 content coverage missing');
assert(ch9.includes('Christmas, Eid, Diwali and New Year'),'Panorama Ch9 discussion coverage missing');
assert(ch9.includes('love and sacrifice'),'Panorama Ch9 theme coverage missing');
console.log('English content QA passed: Chapters 1–9 assessment banks, shared timed engine, runtime option randomization, source-answer remapping, timing by mode/question count, completion gate, auto-submit, full review, study depth, Chapter 9 coverage, navigation, and routing verified.');
