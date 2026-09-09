import fs from 'node:fs';
const assert=(v,m)=>{if(!v)throw new Error(`English Reader QA: ${m}`)};
const root='src/english';
const files={one:fs.readFileSync(`${root}/EnglishReaderChapter1Source.jsx`,'utf8'),two:fs.readFileSync(`${root}/EnglishReaderChapter2.jsx`,'utf8'),engine:fs.readFileSync(`${root}/EnglishReaderChapter.jsx`,'utf8'),subject:fs.readFileSync(`${root}/EnglishSubjectSection.jsx`,'utf8'),app:fs.readFileSync('src/AppWithChapter5.jsx','utf8')};
function bankChecks(s,label){
 const practice=s.match(/const practice=\[/)?.[0]; const challenge=s.match(/const challenge=\[/)?.[0];
 assert(practice,`${label}: Practice bank missing`); assert(challenge,`${label}: Challenge bank missing`);
 const p=s.match(/const practice=\[(.*?)\];\s*const challenge/s)?.[1]||'';
 const c=s.match(/const challenge=\[(.*?)\];\s*const finalTest/s)?.[1]||'';
 assert((p.match(/\bq\(/g)||[]).length===15,`${label}: Practice must contain exactly 15 questions`);
 assert((c.match(/\bq\(/g)||[]).length===25,`${label}: Challenge must contain exactly 25 questions`);
 assert(s.includes('const finalTest=[...practice.slice(0,10),...challenge.slice(0,10)]'),`${label}: derived 20-question Final Test contract missing`);
 for(const [name,body,expected] of [['Practice',p,15],['Challenge',c,25]]){
  const records=[...body.matchAll(/q\(\s*'([^']*)',\[(.*?)\],(\d),/gs)];
  assert(records.length===expected,`${label}: ${name} records incomplete`);
  for(let i=0;i<records.length;i++){
   const options=(records[i][2].match(/'[^']*'/g)||[]);
   assert(options.length===4,`${label}: ${name} question ${i+1} must have 4 options`);
   assert(new Set(options).size===4,`${label}: ${name} question ${i+1} has duplicate options`);
  }
 }
}
assert(files.one.includes("title:'I’m going to dance again'"),'Chapter 1 title mismatch');
assert(files.one.includes('Najmul Hasan'),'Chapter 1 author marker missing');
assert(files.one.includes('pages 3–7'),'Chapter 1 source-page marker missing');
assert(files.one.includes('The accident in Germany'),'Chapter 1 accident section missing');
assert(files.one.includes('Municipal Hospital'),'Chapter 1 hospital source marker missing');
assert(files.one.includes('Dr. Gravel'),'Chapter 1 medical turning point missing');
assert(files.one.includes('Rang Bhawan'),'Chapter 1 comeback marker missing');
assert(files.one.includes('Let’s Discuss'),'Chapter 1 discussion source marker missing');
assert(files.one.includes('dance forms of Bihar'),'Chapter 1 Bihar project marker missing');
assert(files.two.includes("title:'Scaling Great Heights'"),'Chapter 2 title mismatch');
assert(files.two.includes('pages 8–11'),'Chapter 2 source-page marker missing');
assert(files.two.includes('Joniyawas'),'Chapter 2 birthplace marker missing');
assert(files.two.includes('Maharani College'),'Chapter 2 education marker missing');
assert(files.two.includes('Nehru Institute of Mountaineering'),'Chapter 2 training marker missing');
assert(files.two.includes('Mohan Singh'),'Chapter 2 team-spirit marker missing');
assert(files.two.includes('Padmashri'),'Chapter 2 honour marker missing');
assert(files.two.includes('500 kilograms'),'Chapter 2 environmental marker missing');
assert(files.two.includes('Let’s Discuss'),'Chapter 2 discussion source marker missing');
assert(files.two.includes('leading mountaineers in India'),'Chapter 2 India-mountaineers project marker missing');
assert(files.engine.includes('PanoramaTimedQuiz'),'Shared Reader timed engine missing');
assert(files.engine.includes('English Reader'),'Shared Reader label missing');
assert(files.subject.includes('openReaderChapter'),'Reader route helper missing');
assert(files.subject.includes('reader1')&&files.subject.includes('reader2'),'Reader route flags missing');
assert(files.app.includes('EnglishReaderChapter1Source')&&files.app.includes('EnglishReaderChapter2'),'Reader component imports missing');
assert(files.app.includes("p.get('reader1')==='1'")&&files.app.includes("p.get('reader2')==='1'"),'Reader runtime activation flags missing');
assert(files.app.includes('chapter===25')&&files.app.includes('chapter===26'),'Reader numeric routes missing');
bankChecks(files.one,'Chapter 1'); bankChecks(files.two,'Chapter 2');
console.log('English Reader QA passed: Chapters 1–2 are source-aligned, routed, use the shared Reader engine, and expose complete 15 Practice + 25 Challenge + derived 20 Final Test banks.');
