import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const count=(s,n)=>(s.match(new RegExp(n.replace(/[.*+?^${}()|[\\]\\]/g,'\\$&'),'g'))||[]).length;
const assert=(v,m)=>{if(!v)throw new Error(`English QA: ${m}`)};

const ch2=read('src/english/EnglishPanoramaChapter2.jsx');
const ch8=read('src/english/EnglishPanoramaChapter8.jsx');
const ch9=read('src/english/EnglishPanoramaChapter9.jsx');
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
  assert(/const finalTest=\[\.\.\.practice\.slice\(0,10\),\.\.\.challenge\.slice\(0,10\)\]/.test(text)||/const finalTest=\[\.\.\.practice\.slice\(0,10\),\.\.\.challenge\.slice\(0,10\)\]\./.test(text),`${name}: final test must be 10 practice + 10 challenge questions`);
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

for(const [text,name,title,author,source] of [
  [ch8,'Panorama Ch8','My Childhood','A. P. J. Abdul Kalam','Class 9 English • The Panorama • Prose Chapter 8'],
  [ch9,'Panorama Ch9','The Gift of the Magi','O. Henry','Class 9 English • The Panorama • Prose Chapter 9']
]){
  bank(text,name);
  assert(text.includes(`title:'${title}'`),`${name} title mismatch`);
  assert(text.includes(`author:'${author}'`),`${name} author missing`);
  assert(text.includes(`sourceNote:'${source}'`),`${name} source note missing`);
  assert(text.includes('sections:['),`${name} guided sections missing`);
  assert(count(text,"{title:'Part ")===10,`${name} must contain exactly 10 guided parts`);
  for(const marker of ['pg-shell','pg-hero','pg-kicker','pg-hero-stats','pg-modebar','pg-panel','pg-panel-title','pg-author','pg-anchorbar','pg-section-heading','pg-reading-stack','pg-reading-card','pg-card-top','pg-num','pg-flow','pg-flow-label','pg-hindi','pg-vocab-head','pg-vocab-grid','pg-bottom-grid','pg-exam','pg-think','pg-tool-grid','pg-spelling','pg-pillgrid','pg-two-col','pg-match','pg-phrasegrid','pg-grammar-grid','pg-rulebox','pg-exam-grid','pg-activitygrid','pg-translation','pg-revision','pg-revision-grid'])assert(text.includes(marker),`${name} UI marker missing: ${marker}`);
  assert(text.includes('function Learn({onMode})'),`${name} Learn view missing`);
  assert(text.includes("const [mode,setMode]=useState(initialMode||'learn');"),`${name} mode state missing`);
  assert(text.includes("const bank=mode==='practice'?practice:mode==='challenge'?challenge:mode==='test'?finalTest:null;"),`${name} bank selector missing`);
  assert(text.includes('<PanoramaTimedQuiz mode={mode} title={study.title} bank={bank} onBack={()=>setMode(\'learn\')}'),`${name} timed quiz integration missing`);
  assert(!text.includes('function StudyView'),`${name} legacy StudyView remains`);
  assert(!text.includes('function TestButton'),`${name} legacy TestButton remains`);
  assert(!text.includes("window.dispatchEvent(new CustomEvent('panorama-test'"),`${name} event-dispatch quiz workaround remains`);
  assert(!/className=["']pg-section-head["']/.test(text),`${name} legacy pg-section-head class remains`);
  assert(!/className=["']pg-reading-grid["']/.test(text),`${name} legacy pg-reading-grid class remains`);
}

assert(ch2.includes("['pityful','pitiful']"),'Chapter 2 verified spelling pair must use pitiful');
assert(!ch2.includes("['pityful','pityful']"),'Chapter 2 retains incorrect pityful pair');
assert(ch9.includes('The user-supplied Chapter 8 PDF is not used as source material for this chapter.'),'Chapter 9 must explicitly exclude Chapter 8 PDF provenance');
assert(!ch9.includes('supplied Chapter 9 PDF'),'Chapter 9 must not claim a supplied Chapter 9 PDF');
assert(!ch9.includes('supplied Chapter 9 Panorama pages'),'Chapter 9 must not claim supplied Chapter 9 Panorama pages');
assert(ch9.includes("['yarned','yearned']"),'Chapter 9 verified spelling pair must use yearned');
assert(ch9.includes("['worshiped','worshipped']"),'Chapter 9 verified spelling pair must use worshipped');
assert(ch9.includes('Active and Passive Voice'),'Chapter 9 active/passive grammar coverage missing');
assert(ch9.includes('Magi'),'Chapter 9 Magi terminology missing');

for(const marker of ['function shuffleQuestion','sourceIndex','MODE_CONFIG','bank.length','allAnswered=','disabled={!allAnswered}','setSubmitted(true)','Your answer','Correct answer','score','pct'])assert(engine.includes(marker),`Panorama timed engine missing: ${marker}`);
assert(/practice:[\s\S]*?45/.test(engine),'Practice timing config missing');
assert(/challenge:[\s\S]*?60/.test(engine),'Challenge timing config missing');
assert(/test:[\s\S]*?75/.test(engine),'Final-test timing config missing');

assert(nav.includes('My Childhood'),'Chapter 8 navigation entry missing');
assert(nav.includes('The Gift of the Magi'),'Chapter 9 navigation entry missing');
assert(nav.includes('const panoramaProse='),'Panorama prose registry missing');
assert(nav.includes('if(n===5||n===6||n===7||n===8||n===9)'),'Panorama routing handler must include Chapters 5–9');
assert(nav.includes('panorama9'),'Chapter 9 navigation flag missing');
assert(shell.includes('EnglishPanoramaChapter8'),'Chapter 8 shell import missing');
assert(shell.includes('EnglishPanoramaChapter9'),'Chapter 9 shell import missing');
assert(shell.includes('n===15'),'Chapter 8 chapter-index route missing');
assert(shell.includes('n===16'),'Chapter 9 chapter-index route missing');
assert(shell.includes('if(chapter===8)'),'Chapter 8 render route missing');
assert(shell.includes('if(chapter===9)'),'Chapter 9 render route missing');
assert(main.includes('AppWithChapter5'),'main2 route shell missing');
assert(fs.existsSync(path.join(root,'src/english/EnglishPanoramaChapter9.jsx')),'Chapter 9 component file is missing');

console.log('English content QA passed: verified Chapter 2 spelling, Chapter 8 source alignment, Chapter 9 provenance/word-study corrections, chapter 8–9 banks, canonical UI parity, shared timed engine, routing, and activation.');
