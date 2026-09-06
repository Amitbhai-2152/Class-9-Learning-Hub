import fs from 'node:fs';
import path from 'node:path';

const file=fs.readFileSync(path.join(process.cwd(),'src','HindiVarnikaChapter4View.jsx'),'utf8');
const failures=[];
const points=(file.match(/\['[^']+','[^']*'\]/g)||[]).length;
const questions=(file.match(/\{q:'[^']+',options:/g)||[]).length;

if(!file.includes("const TITLE='बिहार की चित्रकला'"))failures.push('wrong Chapter 4 title');
if(points<30)failures.push(`Chapter 4 should have at least 30 learning points; found ${points}`);
if(questions<47)failures.push(`Chapter 4 should have 47 assessment questions; found ${questions}`);
for(const marker of ["practice:{label:'अभ्यास',count:15,start:0,end:15}","challenge:{label:'चुनौती',count:12,start:15,end:27}","test:{label:'अंतिम टेस्ट',count:20,start:27,end:47}"]){if(!file.includes(marker))failures.push(`missing dedicated mode range: ${marker}`)}
if(!file.includes('QUESTIONS.slice(cfg.start,Math.min(cfg.end,QUESTIONS.length))'))failures.push('assessment bank is not sliced by dedicated ranges');
if(!file.includes("mode==='learn'"))failures.push('learn mode missing');
if(!file.includes('HINDI_MODE_TIMING'))failures.push('shared Hindi timing missing');
if(!file.includes('markHindiModeCompleted'))failures.push('progress tracking missing');
if(!file.includes('वर्णिका सूची'))failures.push('Varnika navigation missing');
if(failures.length){console.error('Chapter 4 QA failed:');for(const f of failures)console.error(`- ${f}`);process.exit(1)}
console.log(`Chapter 4 QA passed: ${points} learning points, ${questions} assessment questions, dedicated 15/12/20 ranges, timing, progress and navigation are present.`);
