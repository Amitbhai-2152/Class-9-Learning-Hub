import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const file=path.join(root,'src','HindiSupportChapterView.jsx');
const source=fs.readFileSync(file,'utf8');
const chapters=['बिहार का लोकगायन','बिहार की संगीत साधना','बिहार में नृत्यकला','बिहार की चित्रकला','मधुबनी की चित्रकला','बिहार में नाट्यकला','बिहार का सिनेमा संसार'];
const failures=[];

for(const title of chapters){
  if(!source.includes(`'${title}':`)) failures.push(`missing chapter data: ${title}`);
}
for(const marker of ["mode==='practice'","mode==='challenge'","mode==='test'",'HINDI_MODE_TIMING','15','12','20']){
  if(!source.includes(marker)) failures.push(`missing Varnika assessment marker: ${marker}`);
}
if(source.includes('const correct=item[1]')) failures.push('generic question generator still present');
if(source.includes('answer:0')) failures.push('single answer-position generator still present');
if(!source.includes('onNavigate')) failures.push('chapter navigation callback missing');

if(failures.length){
  console.error('Varnika QA failed:');
  failures.forEach(x=>console.error(`- ${x}`));
  process.exit(1);
}
console.log('Varnika QA passed: 7 chapter-specific data maps, assessment modes, shared timing, and chapter navigation are present.');
