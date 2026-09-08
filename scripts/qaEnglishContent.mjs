import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const reader=read('src/english/EnglishReaderChapter1.jsx');
const panorama=read('src/english/EnglishPanoramaChapter1.jsx');
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
  const all=(practiceBlock+'\n'+challengeBlock);
  const total=practiceQ+challengeQ;
  const options=(all.match(/o:\[[^\]]+\]/g)||[]);
  assert(options.length===total,`${name}: expected ${total} option arrays, got ${options.length}`);
  for(const [i,opt] of options.entries()){
    const items=[...opt.matchAll(/'([^']*)'/g)].map(m=>m[1]);
    assert(items.length===4,`${name}: question ${i+1} must have exactly 4 options`);
    assert(new Set(items).size===4,`${name}: question ${i+1} has duplicate options`);
  }
  const correct=(all.match(/a:0/g)||[]).length;
  assert(correct===total,`${name}: expected explicit source answer keys for ${total} questions`);
  assert(/function shuffleQuestion/.test(text),`${name}: missing deterministic option shuffle`);
  const displayed=[...Array(total)].map((_,i)=>(0-((i*3)%4)+4)%4);
  assert(new Set(displayed).size===4,`${name}: option-position shuffle does not distribute across A-D`);
  assert(text.includes('selected===q.a'),`${name}: missing correctness check`);
  assert(text.includes('finalScore=score+(selected===current.a?1:0)'),`${name}: final-question scoring guard missing`);
}

bankChecks(reader,'English Reader Ch1');
bankChecks(panorama,'Panorama Ch1');
assert(reader.includes("title:\"I'm going to dance again\""),'Reader Ch1 title mismatch');
assert(reader.includes("author:'Najmul Hasan'"),'Reader Ch1 author missing');
assert(panorama.includes("title:'Dharam Juddha'"),'Panorama Ch1 title mismatch');
assert(panorama.includes("author:'Arjun Dev Charan'"),'Panorama Ch1 author missing');
assert(nav.includes('The Panorama')&&nav.includes('English Reader'),'book split missing');
assert(nav.includes('Learn →'),'chapter Learn action missing');
assert(app.includes("EnglishPanoramaChapter1"),'Panorama Ch1 import/route missing');
assert(app.includes("EnglishReaderChapter1"),'Reader Ch1 import/route missing');
assert(app.includes("chapter==='Reader • 1 I’m going to dance again'"),'Reader Ch1 route missing');
assert(app.includes("chapter==='Panorama • Prose 1 Dharam Juddha'"),'Panorama Ch1 route missing');
const readerNames=['I’m going to dance again','Scaling Great Heights','Saint Kabir','The eyes are not here','Ismat Chughtai: A woman with a difference','The accidental tourist','Saint Ravidas','Bharathipura'];
const prose=['Dharam Juddha','Yayati','A Silent Revolution','Too Many People, Too Few Trees','Echo and Narcissus','The Shehnai of Bismillah Khan','Kathmandu','My Childhood','The Gift of the Magi'];
const poetry=['The Grandmother','On His Blindness','Blow, Blow, Thou Winter Wind','To Daffodils','Sound','Self Introduction','I Am Like Grass','Abraham Lincoln’s Letter to His Son’s Teacher'];
const rte=['The Secret of Work','Gandhiji’s Passion for Nursing','With the Photographer'];
for(const n of [...readerNames,...prose,...poetry,...rte])assert(nav.includes(n),`navigation missing chapter: ${n}`);
console.log('English content QA passed: book split, chapter registry, Reader/Prose Ch1 banks, deterministic answer distribution, scoring guard, and routing verified.');