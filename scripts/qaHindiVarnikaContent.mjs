import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const source=fs.readFileSync(path.join(root,'src','HindiSupportChapterView.jsx'),'utf8');
const section=fs.readFileSync(path.join(root,'src','HindiSubjectSection.jsx'),'utf8');
const chapters=['बिहार का लोकगायन','बिहार की संगीत साधना','बिहार में नृत्यकला','बिहार की चित्रकला','मधुबनी की चित्रकला','बिहार में नाट्यकला','बिहार का सिनेमा संसार'];
const failures=[];
for(const title of chapters)if(!source.includes(`'${title}':`))failures.push(`missing chapter data: ${title}`);
for(const marker of ["mode==='practice'","mode==='challenge'","mode==='test",'HINDI_MODE_TIMING','initialMode','onNavigate','VARNIKA_ORDER'])if(!source.includes(marker))failures.push(`missing Varnika implementation marker: ${marker}`);
if(!source.includes("practice:{label:'अभ्यास',count:15}"))failures.push('practice count must be 15');
if(!source.includes("challenge:{label:'चुनौती',count:12}"))failures.push('challenge count must be 12');
if(!source.includes("test:{label:'अंतिम टेस्ट',count:20}"))failures.push('test count must be 20');
if(source.includes('const correct=item[1]'))failures.push('generic question generator still present');
if(!section.includes('initialMode={localChapter.mode}'))failures.push('selected mode is not passed from chapter cards');
if(!section.includes('onNavigate={handleSupportNavigate}'))failures.push('previous/next chapter navigation is not wired');
if(failures.length){console.error('Varnika QA failed:');for(const failure of failures)console.error(`- ${failure}`);process.exit(1);}
console.log('Varnika QA passed: 7 chapter-specific data maps, assessment modes/counts, direct mode entry, and chapter navigation wiring are present.');
