import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const count=(s,n)=>(s.match(new RegExp(n.replace(/[.*+?^${}()|[\\]\\]/g,'\\$&'),'g'))||[]).length;
const assert=(v,m)=>{if(!v)throw new Error(`English QA: ${m}`)};
const specs=[
 ['Ch1','src/english/EnglishPanoramaChapter1.jsx','Dharam Juddha','Arjun Dev Charan',false],
 ['Ch2','src/english/EnglishPanoramaChapter2.jsx','Yayati','C. Rajagopalachari',false],
 ['Ch3','src/english/EnglishPanoramaChapter3.jsx','A Silent Revolution','Kunal Varma',false],
 ['Ch4','src/english/EnglishPanoramaChapter4.jsx','Too Many People, Too Few Trees','Moti Nisani',false],
 ['Ch5','src/english/EnglishPanoramaChapter5.jsx','Echo and Narcissus','Moira Kerr and John Bennett',false],
 ['Ch6','src/english/EnglishPanoramaChapter6Final.jsx','The Shehnai of Bismillah Khan','',true],
 ['Ch7','src/english/EnglishPanoramaChapter7Final.jsx','Kathmandu','Vikram Seth',true],
 ['Ch8','src/english/EnglishPanoramaChapter8.jsx','My Childhood','A. P. J. Abdul Kalam',true],
 ['Ch9','src/english/EnglishPanoramaChapter9.jsx','The Gift of the Magi','O. Henry',true]
];
function bank(t,name,exact23){
 assert(t.includes('const practice=['),`${name}: practice bank missing`);
 assert(t.includes('const challenge=['),`${name}: challenge bank missing`);
 assert(t.includes('const finalTest='),`${name}: final test missing`);
 const p=t.match(/const practice=\[(.*?)\];\s*const challenge/s)?.[1]||'';
 const c=t.match(/const challenge=\[(.*?)\];\s*const finalTest/s)?.[1]||'';
 const pq=count(p,'{q:'),cq=count(c,'{q:'),total=pq+cq;
 assert(pq===15,`${name}: expected 15 practice, got ${pq}`);
 assert(exact23?cq===23:cq>=12,`${name}: challenge count invalid (${cq})`);
 if(['Ch3','Ch4','Ch5','Ch6','Ch7','Ch8','Ch9'].includes(name))assert(/const finalTest=\[\.\.\.practice\.slice\(0,10\),\.\.\.challenge\.slice\(0,10\)\]/.test(t),`${name}: final test composition invalid`);
 const all=p+'\n'+c;const arrays=all.match(/o:\[[^\]]+\]/g)||[];
 assert(arrays.length===total,`${name}: expected ${total} option arrays, got ${arrays.length}`);
 for(const [i,a] of arrays.entries()){
  const items=[...a.matchAll(/'([^']*)'/g)].map(x=>x[1]);
  assert(items.length===4,`${name}: question ${i+1} must have exactly 4 options`);
  assert(new Set(items).size===4,`${name}: question ${i+1} has duplicate options`);
 }
 assert((all.match(/a:\d+/g)||[]).length===total,`${name}: answer keys missing`);
}
const reader=read('src/english/EnglishReaderChapter1.jsx');
const engine=read('src/english/PanoramaTimedQuiz.jsx');
const nav=read('src/english/EnglishSubjectSection.jsx');
const app=read('src/App.jsx');
const shell=read('src/AppWithChapter5.jsx');
const main=read('src/main2.jsx');
for(const [name,p,title,author,exact23] of specs){const t=read(p);bank(t,name,exact23);assert(t.includes("PanoramaTimedQuiz from './PanoramaTimedQuiz.jsx'"),`${name}: shared timed engine not wired`);assert(!t.includes('const [selected,setSelected]'),`${name}: legacy selected state remains`);assert(!t.includes('function shuffleQuestion'),`${name}: chapter-local shuffle remains`);assert(t.includes(`title:'${title}'`),`${name}: title mismatch`);if(author)assert(t.includes(`author:'${author}'`),`${name}: author missing`);assert(t.includes('sections:['),`${name}: guided sections missing`);assert(count(t,"{title:'Part ")>=8,`${name}: insufficient guided reading`);assert(t.includes('wordStudy:'),`${name}: wordStudy missing`);assert(t.includes('grammar:'),`${name}: grammar missing`);}
for(const m of ['function shuffleQuestion','sourceIndex','MODE_CONFIG','bank.length','allAnswered=','disabled={!allAnswered}','setSubmitted(true)','Your answer','Correct answer','score','pct'])assert(engine.includes(m),`Panorama engine missing: ${m}`);
assert(/practice:[\s\S]*?45/.test(engine),'practice timing missing');assert(/challenge:[\s\S]*?60/.test(engine),'challenge timing missing');assert(/test:[\s\S]*?75/.test(engine),'final timing missing');
assert(nav.includes('The Gift of the Magi'),'Chapter 9 navigation title missing');assert(nav.includes('const panoramaProse=['),'Panorama registry missing');assert(nav.includes('if(n===5||n===6||n===7||n===8||n===9)'),'Ch5–Ch9 navigation handler missing');
assert(app.includes('EnglishPanoramaChapter1')&&app.includes('EnglishPanoramaChapter4'),'Ch1–Ch4 routes missing');
for(const m of ['EnglishPanoramaChapter5','EnglishPanoramaChapter6Final','EnglishPanoramaChapter7Final','EnglishPanoramaChapter8','EnglishPanoramaChapter9','n===12','n===13','n===14','n===15','n===16','if(chapter===9)'])assert(shell.includes(m),`shell routing missing: ${m}`);assert(main.includes('AppWithChapter5'),'main2 route shell missing');
for(const n of ['Dharam Juddha','Yayati','A Silent Revolution','Too Many People, Too Few Trees','Echo and Narcissus','The Shehnai of Bismillah Khan','Kathmandu','My Childhood','The Gift of the Magi'])assert(nav.includes(n),`navigation missing chapter: ${n}`);
const ch8=read('src/english/EnglishPanoramaChapter8.jsx');const ch9=read('src/english/EnglishPanoramaChapter9.jsx');
const ui=['className="pg-shell"','className="pg-wrap"','className="pg-hero"','className="pg-stage-grid"','className="pg-about"','className="pg-about-facts"','className="pg-study-section"','className="pg-study-grid"','className="pg-explain"','className="pg-vocab"','className="pg-exam"','className="pg-think"','pg-vocab-wide','className="pg-language-point"','EXAM BOOSTER','WRITING / COMPOSITION','TRANSLATION PRACTICE','ACTIVITIES','QUICK REVISION','className="pg-revision"','className="pg-mode-cta"'];
for(const m of ui){assert(ch8.includes(m),`Chapter 8 canonical UI marker missing: ${m}`);assert(ch9.includes(m),`Chapter 9 UI marker missing: ${m}`)}
assert(ch8.includes('THE PANORAMA • PROSE 8'),'Chapter 8 hero missing');assert(ch9.includes('THE PANORAMA • PROSE 9'),'Chapter 9 hero missing');
assert(ch9.includes("const [mode,setMode]=useState(initialMode);const [quizOpen,setQuizOpen]=useState(initialMode!=='learn');"),'Chapter 9 mode state differs from Chapter 8');assert(ch9.includes("const openMode=m=>{setMode(m);setQuizOpen(m!=='learn')};"),'Chapter 9 openMode differs from Chapter 8');assert(ch9.includes("const bank=mode==='practice'?practice:mode==='challenge'?challenge:finalTest;"),'Chapter 9 bank selector differs from Chapter 8');assert(ch9.includes("<PanoramaTimedQuiz mode={mode} title={study.title} bank={bank} onBack={()=>setQuizOpen(false)}"),'Chapter 9 quiz integration differs from Chapter 8');assert(ch9.includes("[['learn','Learn','Guided study'],['practice','Practice','15 questions • 11:15'],['challenge','Challenge','23 questions • 23:00'],['test','Final Test','20 questions • 25:00']]"),'Chapter 9 stage selector differs from Chapter 8');assert(ch9.includes('function StudyBlock({s})')&&ch9.includes('StudyBlock key={s.title} s={s}'),'Chapter 9 StudyBlock pattern differs from Chapter 8');
for(const bad of ['pg-section-head','pg-reading-grid','pg-reading-card','pg-list-grid','pg-rule-grid','pg-example-grid','pg-quick-grid','function TestButton','function ChapterShell','function StudyView',"window.dispatchEvent(new CustomEvent('panorama-test'"]){assert(!ch9.includes(bad),`Chapter 9 contains non-canonical UI: ${bad}`)}
assert(ch9.includes('O. Henry')&&ch9.includes('Active and Passive Voice')&&ch9.includes('parsimony')&&ch9.includes('platinum fob chain'),'Chapter 9 content coverage missing');assert(ch9.includes('composition:')&&ch9.includes('activities:')&&ch9.includes('translationPractice:'),'Chapter 9 supporting study sections missing');
console.log('English content QA passed: Chapters 1–9 banks, shared timed engine, runtime shuffle/remapping, timing, completion gate, auto-submit, full review, study depth, navigation/routing, and exact Chapter 8 UI parity for Chapter 9.');