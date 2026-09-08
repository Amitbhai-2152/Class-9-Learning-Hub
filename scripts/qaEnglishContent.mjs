import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const count=(s,n)=>(s.match(new RegExp(n.replace(/[.*+?^${}()|[\\]\\]/g,'\\$&'),'g'))||[]).length;
const assert=(v,m)=>{if(!v)throw new Error(`English QA: ${m}`)};

const ch8=read('src/english/EnglishPanoramaChapter8.jsx');
const ch7=read('src/english/EnglishPanoramaChapter7Final.jsx');
const engine=read('src/english/PanoramaTimedQuiz.jsx');
const nav=read('src/english/EnglishSubjectSection.jsx');
const shell=read('src/AppWithChapter5.jsx');
const main=read('src/main2.jsx');

function bank(text,name){
  assert(text.includes('const practice=['),`${name}: practice bank missing`);
  assert(text.includes('const challenge=['),`${name}: challenge bank missing`);
  assert(text.includes('const finalTest='),`${name}: final test missing`);
  const p=text.match(/const practice=\[(.*?)\];\s*const challenge/s)?.[1]||'';
  const c=text.match(/const challenge=\[(.*?)\];\s*const finalTest/s)?.[1]||'';
  const pq=count(p,'{q:'),cq=count(c,'{q:'),total=pq+cq;
  assert(pq===15,`${name}: expected 15 practice questions, got ${pq}`);
  assert(cq===23,`${name}: expected 23 challenge questions, got ${cq}`);
  assert(/const finalTest=\[\.\.\.practice\.slice\(0,10\),\.\.\.challenge\.slice\(0,10\)\]/.test(text),`${name}: final test must be 10 practice + 10 challenge questions`);
  const all=p+'\n'+c;
  const arrays=all.match(/o:\[[^\]]+\]/g)||[];
  assert(arrays.length===total,`${name}: expected ${total} option arrays, got ${arrays.length}`);
  for(const [i,a] of arrays.entries()){
    const items=[...a.matchAll(/'([^']*)'/g)].map(x=>x[1]);
    assert(items.length===4,`${name}: question ${i+1} must have exactly 4 options`);
    assert(new Set(items).size===4,`${name}: question ${i+1} has duplicate options`);
  }
  assert((all.match(/a:\d+/g)||[]).length===total,`${name}: explicit answer keys missing`);
  assert((all.match(/e:'[^']+'/g)||[]).length===total,`${name}: explanations missing`);
}

bank(ch8,'Panorama Ch8');

assert(ch8.includes("title:'My Childhood'"),'Chapter 8 title mismatch');
assert(ch8.includes("author:'A. P. J. Abdul Kalam'"),'Chapter 8 author missing');
assert(ch8.includes("sourceNote:'Class 9 English • The Panorama • Prose Chapter 8'"),'Chapter 8 source note missing');
assert(ch8.includes('sections:['),'Chapter 8 guided sections missing');
assert(count(ch8,"{title:'Part ")===10,'Chapter 8 must contain exactly 10 guided parts');
assert(ch8.includes('wordStudy:'),'Chapter 8 word study missing');
assert(ch8.includes('grammar:'),'Chapter 8 language focus missing');
assert(ch8.includes('composition:'),'Chapter 8 composition missing');
assert(ch8.includes('activities:'),'Chapter 8 activities missing');
assert(ch8.includes('translationPractice:'),'Chapter 8 translation practice missing');
assert(ch8.includes('examPrep:'),'Chapter 8 exam preparation missing');

// Chapter 8 UI must follow the established Chapter 7 layout vocabulary.
const uiMarkers=['pg-shell','pg-hero','pg-kicker','pg-hero-stats','pg-modebar','pg-panel','pg-panel-title','pg-author','pg-anchorbar','pg-section-heading','pg-reading-stack','pg-reading-card','pg-card-top','pg-num','pg-flow','pg-flow-label','pg-hindi','pg-vocab-head','pg-vocab-grid','pg-bottom-grid','pg-exam','pg-think','pg-tool-grid','pg-spelling','pg-pillgrid','pg-two-col','pg-match','pg-phrasegrid','pg-grammar-grid','pg-rulebox','pg-exam-grid','pg-activitygrid','pg-translation','pg-revision','pg-revision-grid'];
for(const marker of uiMarkers){assert(ch7.includes(marker),`Chapter 7 canonical UI marker missing: ${marker}`);assert(ch8.includes(marker),`Chapter 8 UI marker missing: ${marker}`)}
assert(ch8.includes('function Learn({onMode})'),'Chapter 8 Learn view missing');
assert(ch8.includes("const [mode,setMode]=useState(initialMode||'learn');"),'Chapter 8 mode state missing');
assert(ch8.includes("const bank=mode==='practice'?practice:mode==='challenge'?challenge:mode==='test'?finalTest:null;"),'Chapter 8 bank selector missing');
assert(ch8.includes('<PanoramaTimedQuiz mode={mode} title={study.title} bank={bank} onBack={()=>setMode(\'learn\')}'),'Chapter 8 timed quiz integration missing');
assert(!ch8.includes('function StudyView'),'Chapter 8 legacy StudyView remains');
assert(!ch8.includes('function TestButton'),'Chapter 8 legacy TestButton remains');
assert(!ch8.includes("window.dispatchEvent(new CustomEvent('panorama-test'"),'Chapter 8 event-dispatch quiz workaround remains');
assert(!ch8.includes('pg-section-head'),'Chapter 8 non-canonical section-head UI remains');
assert(!ch8.includes('pg-reading-grid'),'Chapter 8 non-canonical reading-grid UI remains');

// Shared timed engine rules.
for(const marker of ['function shuffleQuestion','sourceIndex','MODE_CONFIG','bank.length','allAnswered=','disabled={!allAnswered}','setSubmitted(true)','Your answer','Correct answer','score','pct'])assert(engine.includes(marker),`Panorama timed engine missing: ${marker}`);
assert(/practice:[\s\S]*?45/.test(engine),'Practice timing config missing');
assert(/challenge:[\s\S]*?60/.test(engine),'Challenge timing config missing');
assert(/test:[\s\S]*?75/.test(engine),'Final-test timing config missing');

// Navigation/routing: Chapter 8 remains available; Chapter 9 is completely removed.
assert(nav.includes('My Childhood'),'Chapter 8 navigation entry missing');
assert(nav.includes('const panoramaProse='),'Panorama prose registry missing');
assert(nav.includes('if(n===5||n===6||n===7||n===8)'),'Panorama routing handler must stop at Chapter 8');
assert(!nav.includes('The Gift of the Magi'),'Chapter 9 title still present in navigation');
assert(!nav.includes('panorama9'),'Chapter 9 navigation flag still present');
assert(shell.includes('EnglishPanoramaChapter8'),'Chapter 8 shell import missing');
assert(shell.includes('n===15'),'Chapter 8 chapter-index route missing');
assert(shell.includes('if(chapter===8)'),'Chapter 8 render route missing');
assert(!shell.includes('EnglishPanoramaChapter9'),'Chapter 9 shell import still present');
assert(!shell.includes('n===16'),'Chapter 9 chapter-index route still present');
assert(!shell.includes('chapter===9'),'Chapter 9 render route still present');
assert(main.includes('AppWithChapter5'),'main2 route shell missing');

// The unapproved Chapter 9 component must be absent from the active tree.
assert(!fs.existsSync(path.join(root,'src/english/EnglishPanoramaChapter9.jsx')),'Chapter 9 component file still exists');

console.log('English content QA passed: Chapter 8 banks, explanations, UI parity with Chapter 7, shared timed engine, routing, and complete Chapter 9 removal verified.');
