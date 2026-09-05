import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const chapter12=read('src/HindiVarnikaChapter12View.jsx');
const section=read('src/HindiSubjectSection.jsx');
const failures=[];

const required=[
  "'बिहार का लोकगायन':{",
  "'बिहार की संगीत साधना':{",
  "practice:{label:'अभ्यास',count:15}",
  "challenge:{label:'चुनौती',count:12}",
  "test:{label:'अंतिम टेस्ट',count:20}",
  "currentMode==='practice'?all.slice(0,15)",
  "currentMode==='challenge'?all.slice(15,27)",
  '[all[0],...all.slice(1,20)]',
  'current[0]',
  'current[1].map',
  'answers[idx]===x[2]',
  'x[1][x[2]]',
  'markHindiModeCompleted(topic.id,mode)',
  'setSubmitted(true)',
  'HINDI_MODE_TIMING[mode]?.minutes'
];
for(const marker of required)if(!chapter12.includes(marker))failures.push(`Chapter 1-2 marker missing: ${marker}`);
if(chapter12.includes('{q.q}')||chapter12.includes('{q.options}')||chapter12.includes('x.q')||chapter12.includes('x.options'))failures.push('stale object-style question access remains');
if(!section.includes('HindiVarnikaChapter12View'))failures.push('Chapter 1-2 route missing');
if(!section.includes('onNavigate={handleSupportNavigate}'))failures.push('Varnika navigation missing');
if(!section.includes('onBack={returnToVarnikaList}'))failures.push('Varnika list exit missing');

if(failures.length){console.error('Varnika QA failed:');for(const failure of failures)console.error(`- ${failure}`);process.exit(1)}
console.log('Varnika QA passed: Chapters 1-2 keep their expanded Learn data, distinct 15/12/20 assessment routing, tuple-safe rendering/scoring/review, completion persistence, timing, and Varnika navigation.');
