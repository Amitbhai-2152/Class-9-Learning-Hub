import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const count=(text,needle)=>(text.match(new RegExp(needle.replace(/[.*+?^${}()|[\\]\\]/g,'\\$&'),'g'))||[]).length;
const assert=(ok,msg)=>{if(!ok)throw new Error(`English QA: ${msg}`)};
const chapters=[
 ['Ch1','src/english/EnglishPanoramaChapter1.jsx','Dharam Juddha','Arjun Dev Charan'],
 ['Ch2','src/english/EnglishPanoramaChapter2.jsx','Yayati','C. Rajagopalachari'],
 ['Ch3','src/english/EnglishPanoramaChapter3.jsx','A Silent Revolution','Kunal Varma'],
 ['Ch4','src/english/EnglishPanoramaChapter4.jsx','Too Many People, Too Few Trees','Moti Nisani'],
 ['Ch5','src/english/EnglishPanoramaChapter5.jsx','Echo and Narcissus','Moira Kerr and John Bennett'],
 ['Ch6','src/english/EnglishPanoramaChapter6Final.jsx','The Shehnai of Bismillah Khan',''],
 ['Ch7','src/english/EnglishPanoramaChapter7Final.jsx','Kathmandu','Vikram Seth'],
 ['Ch8','src/english/EnglishPanoramaChapter8.jsx','My Childhood','A. P. J. Abdul Kalam'],
 ['Ch9','src/english/EnglishPanoramaChapter9.jsx','The Gift of the Magi','O. Henry']
];
const reader=read('src/english/EnglishReaderChapter1.jsx');
const engine=read('src/english/PanoramaTimedQuiz.jsx');
const nav=read('src/english/EnglishSubjectSection.jsx');
const app=read('src/App.jsx');
const shell=read('src/AppWithChapter5.jsx');
const main2=read('src/main2.jsx');

function bankChecks(t,name){
 assert(t.includes('const practice=['),`${name}: practice bank missing`);
 assert(t.includes('const challenge=['),`${name}: challenge bank missing`);
 assert(t.includes('const finalTest='),`${name}: final test bank missing`);
 const p=t.match(/const practice=\[(.*?)\];\s*const challenge/s)?.[1]||'';
 const c=t.match(/const challenge=\[(.*?)\];\s*const finalTest/s)?.[1]||'';
 const pq=count(p,'{q:'),cq=count(c,'{q:'),total=pq+cq;
 assert(pq===15,`${name}: expected 15 practice questions, got ${pq}`);
 const exact23=['Ch5','Ch6','Ch7','Ch8','Ch9'].includes(name);
 if(exact23)assert(cq===23,`${name}: expected 23 challenge questions, got ${cq}`);
 else assert(cq>=12,`${name}: expected at least 12 challenge questions, got ${cq}`);
 if(['Ch3','Ch4','Ch5','Ch6','Ch7','Ch8','Ch9'].includes(name))assert(/const finalTest=\[\.\.\.practice\.slice\(0,10\),\.\.\.challenge\.slice\(0,10\)\]/.test(t),`${name}: final test must be 10 practice + 10 challenge`);
 const all=p+'\n'+c;
 const opts=all.match(/o:\[[^\]]+\]/g)||[];
 assert(opts.length===total,`${name}: expected ${total} option arrays, got ${opts.length}`);
 for(const [i,opt] of opts.entries()){
  const items=[...opt.matchAll(/'([^']*)'/g)].map(m=>m[1]);
  assert(items.length===4,`${name}: question ${i+1} must have exactly 4 options`);
  assert(new Set(items).size===4,`${name}: question ${i+1} has duplicate options`);
 }
 assert((all.match(/a:\d+/g)||[]).length===total,`${name}: explicit answer keys missing`);
 assert((all.match(/e:'[^']+'/g)||[]).length===total,`${name}: explanations missing`);
}

for(const [name,p,title,author] of chapters){
 const t=read(p);bankChecks(t,name);
 assert(t.includes("PanoramaTimedQuiz from './PanoramaTimedQuiz.jsx'"),`${name}: shared timed engine not wired`);
 assert(!t.includes('const [selected,setSelected]'),`${name}: legacy selected state remains`);
 assert(!t.includes('function shuffleQuestion'),`${name}: chapter-local shuffle remains`);
 assert(t.includes(`title:'${title}'`),`${name}: title mismatch`);
 if(author)assert(t.includes(`author:'${author}'`),`${name}: author missing`);
 assert(/sections:\[/.test(t),`${name}: guided sections missing`);
 assert(count(t,"{title:'Part ")>=8,`${name}: guided reading depth too low`);
 assert(t.includes('wordStudy:'),`${name}: word study missing`);
 assert(t.includes('grammar:'),`${name}: grammar missing`);
 if(['Ch3','Ch4','Ch5','Ch6','Ch7','Ch8','Ch9'].includes(name)){
  assert(t.includes('composition:'),`${name}: composition missing`);
  assert(t.includes('activities:'),`${name}: activities missing`);
  assert(t.includes('translationPractice:'),`${name}: translation practice missing`);
 }
}

assert(/function shuffleQuestion/.test(reader),'English Reader Ch1: shuffle missing');
assert(/function shuffleQuestion/.test(engine),'Panorama engine: runtime shuffle missing');
assert(/sourceIndex/.test(engine),'Panorama engine: source-answer remapping missing');
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
assert(nav.includes('if(n===5||n===6||n===7||n===8||n===9)'),'Panorama Ch5–Ch9 navigation routing missing');
assert(shell.includes('EnglishPanoramaChapter5'),'Panorama Ch5 shell import missing');
assert(shell.includes('EnglishPanoramaChapter6Final'),'Panorama Ch6 shell import missing');
assert(shell.includes('EnglishPanoramaChapter7Final'),'Panorama Ch7 shell import missing');
assert(shell.includes('EnglishPanoramaChapter8'),'Panorama Ch8 shell import missing');
assert(shell.includes('EnglishPanoramaChapter9'),'Panorama Ch9 shell import missing');
assert(shell.includes('n===12')&&shell.includes('n===13')&&shell.includes('n===14')&&shell.includes('n===15')&&shell.includes('n===16'),'Panorama Ch5–Ch9 chapter-index routes missing');
assert(shell.includes('if(chapter===9)'),'Panorama Ch9 render route missing');
assert(main2.includes('AppWithChapter5'),'main2 route shell missing');

for(const n of ['Dharam Juddha','Yayati','A Silent Revolution','Too Many People, Too Few Trees','Echo and Narcissus','The Shehnai of Bismillah Khan','Kathmandu','My Childhood','The Gift of the Magi'])assert(nav.includes(n),`navigation missing chapter: ${n}`);
for(const n of ['I’m going to dance again','Scaling Great Heights','Saint Kabir','The eyes are not here','Ismat Chughtai: A woman with a difference','The accidental tourist','Saint Ravidas','Bharathipura'])assert(nav.includes(n),`navigation missing reader chapter: ${n}`);
for(const n of ['The Grandmother','On His Blindness','Blow, Blow, Thou Winter Wind','To Daffodils','Sound','Self Introduction','I Am Like Grass','Abraham Lincoln’s Letter to His Son’s Teacher','The Secret of Work','Gandhiji’s Passion for Nursing','With the Photographer'])assert(nav.includes(n),`navigation missing Panorama item: ${n}`);

const ch8=read('src/english/EnglishPanoramaChapter8.jsx');
const ch9=read('src/english/EnglishPanoramaChapter9.jsx');
const uiMarkers=['className="pg-shell"','className="pg-wrap"','className="pg-hero"','className="pg-stage-grid"','className="pg-about"','className="pg-about-facts"','className="pg-study-section"','className="pg-study-grid"','className="pg-explain"','className="pg-vocab"','className="pg-exam"','className="pg-think"','className="pg-vocab-wide"','className="pg-language-point"','EXAM BOOSTER','WRITING / COMPOSITION','TRANSLATION PRACTICE','ACTIVITIES','QUICK REVISION','className="pg-revision"','className="pg-mode-cta"'];
for(const m of uiMarkers){assert(ch8.includes(m),`Chapter 8 canonical UI marker missing: ${m}`);assert(ch9.includes(m),`Chapter 9 UI marker missing: ${m}`)}
assert(ch8.includes('THE PANORAMA • PROSE 8')&&ch9.includes('THE PANORAMA • PROSE 9'),'Panorama chapter hero numbering mismatch');
assert(ch8.includes("[['learn','Learn','Guided study'],['practice','Practice','15 questions • 11:15'],['challenge','Challenge','23 questions • 23:00'],['test','Final Test','20 questions • 25:00']]"),'Chapter 8 stage selector pattern missing');
assert(ch9.includes("[['learn','Learn','Guided study'],['practice','Practice','15 questions • 11:15'],['challenge','Challenge','23 questions • 23:00'],['test','Final Test','20 questions • 25:00']]"),'Chapter 9 stage selector does not match Chapter 8');
assert(ch9.includes('function StudyBlock({s})'),'Chapter 9 StudyBlock missing');
assert(ch9.includes('StudyBlock key={s.title} s={s}'),'Chapter 9 guided reading is not using the Chapter 8 StudyBlock pattern');
for(const bad of ['pg-section-head','pg-reading-grid','pg-reading-card','pg-list-grid','pg-rule-grid','pg-example-grid','pg-quick-grid','function TestButton','function ChapterShell','function StudyView'])assert(!ch9.includes(bad),`Chapter 9 contains non-canonical UI element: ${bad}`);
assert(!ch9.includes('window.dispatchEvent(new CustomEvent(\'panorama-test\''),'Chapter 9 should use the Chapter 8 direct mode-state UI, not the older event bridge');

assert(ch9.includes('O. Henry')&&ch9.includes('Active and Passive Voice')&&ch9.includes('parsimony')&&ch9.includes('platinum fob chain'),'Chapter 9 core content coverage missing');
console.log('English content QA passed: Chapters 1–9 banks, shared timed engine, runtime option randomization/source remapping, timing/completion/full review, study depth, navigation/routing, and Chapter 9 UI parity with Chapter 8 verified.');