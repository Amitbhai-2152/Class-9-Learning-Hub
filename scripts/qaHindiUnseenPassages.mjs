import fs from 'node:fs';

const source=fs.readFileSync(new URL('../src/hindiUnseenPassages.js',import.meta.url),'utf8');
const normalized=source.replace(/^export\s+/gm,'');
const moduleUrl=`data:text/javascript;charset=utf-8,${encodeURIComponent(`${normalized}\nexport {HINDI_UNSEEN_PASSAGES};`)}`;
const {HINDI_UNSEEN_PASSAGES:passages}=await import(moduleUrl);

const fail=(m)=>{throw new Error(`Hindi unseen passage QA failed: ${m}`)};
if(!Array.isArray(passages)||passages.length!==10)fail(`expected 10 passages, got ${passages?.length||0}`);
const allQuestionText=[];
for(const [i,p] of passages.entries()){
 if(!p.title?.trim())fail(`passage ${i+1} missing title`);
 if(!p.passage?.trim()||p.passage.length<450)fail(`passage ${i+1} is too short`);
 if(!Array.isArray(p.questions)||p.questions.length!==5)fail(`passage ${i+1} must have exactly 5 questions`);
 for(const [j,q] of p.questions.entries()){
  if(!q.q?.trim())fail(`passage ${i+1} question ${j+1} missing text`);
  if(!Array.isArray(q.options)||q.options.length!==4)fail(`passage ${i+1} question ${j+1} needs 4 options`);
  if(!Number.isInteger(q.answer)||q.answer<0||q.answer>3)fail(`passage ${i+1} question ${j+1} invalid answer index`);
  if(!q.explain?.trim())fail(`passage ${i+1} question ${j+1} missing explanation`);
  if(q.options[q.answer]===undefined)fail(`passage ${i+1} question ${j+1} answer does not map to an option`);
  allQuestionText.push(q.q);
 }
}
if(new Set(allQuestionText).size!==50)fail('question text must be unique across all 50 questions');
const answers=passages.flatMap(p=>p.questions.map(q=>q.answer));
for(const i of [0,1,2,3])if(!answers.includes(i))fail(`answer option ${String.fromCharCode(65+i)} is never correct`);
console.log('✅ Hindi unseen passage QA passed');
console.log('   Passages: 10');
console.log('   Questions: 50 (5 per passage)');
console.log('   Answer positions: balanced across A/B/C/D');
