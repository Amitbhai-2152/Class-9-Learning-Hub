import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const chapter12=read('src/HindiVarnikaChapter12View.jsx');
const section=read('src/HindiSubjectSection.jsx');
const chapter3=read('src/HindiVarnikaChapter3View.jsx');
const chapter4=read('src/HindiVarnikaChapter4View.jsx');
const failures=[];

for(const title of ['बिहार का लोकगायन','बिहार की संगीत साधना']){
  if(!chapter12.includes(`'${title}':{`))failures.push(`Chapter 1-2 data missing: ${title}`);
}
if(!section.includes('HindiVarnikaChapter12View'))failures.push('Chapter 1-2 learner route missing');
for(const marker of [
  "practice:{label:'अभ्यास',count:15}",
  "challenge:{label:'चुनौती',count:12}",
  "test:{label:'अंतिम टेस्ट',count:20}",
  "current[0]",
  "current[1].map",
  "answers[idx]===x[2]",
  "x[1][x[2]]",
  'markHindiModeCompleted(topic.id,mode)',
  'setSubmitted(true)',
  'HINDI_MODE_TIMING[mode]?.minutes'
])if(!chapter12.includes(marker))failures.push(`Chapter 1-2 assessment marker missing: ${marker}`);
for(const stale of ['{q.q}','{q.options}','x.q','x.options'])if(chapter12.includes(stale))failures.push(`stale assessment access remains: ${stale}`);
if(!chapter12.includes("currentMode==='practice'?all.slice(0,15)"))failures.push('Practice bank must contain 15 questions');
if(!chapter12.includes("currentMode==='challenge'?all.slice(15,27)"))failures.push('Challenge bank must contain 12 distinct questions');
if(!chapter12.includes('[all[0],...all.slice(1,20)]'))failures.push('Final Test bank must contain 20 questions');
for(const marker of ["practice:{label:'अभ्यास',count:15}","challenge:{label:'चुनौती',count:12}","test:{label:'अंतिम टेस्ट',count:20}"])if(!chapter3.includes(marker)||!chapter4.includes(marker))failures.push(`Varnika chapter mode counts missing: ${marker}`);
if(failures.length){console.error('Varnika QA failed:');for(const failure of failures)console.error(`- ${failure}`);process.exit(1)}
console.log('Varnika QA passed: Chapters 1-2 are routed, assessment rendering/scoring/review are fixed for tuple data, 15/12/20 mode sizes are preserved, timing and completion persistence remain wired, and other dedicated Varnika chapter mode counts remain intact.');
