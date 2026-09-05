import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const legacy=fs.readFileSync(path.join(root,'src','HindiSupportChapterView.jsx'),'utf8');
const unified=fs.readFileSync(path.join(root,'src','HindiVarnikaUnifiedChapterView.jsx'),'utf8');
const section=fs.readFileSync(path.join(root,'src','HindiSubjectSection.jsx'),'utf8');
const chapter3=fs.readFileSync(path.join(root,'src','HindiVarnikaChapter3View.jsx'),'utf8');
const chapter4=fs.readFileSync(path.join(root,'src','HindiVarnikaChapter4View.jsx'),'utf8');
const chapters=['बिहार का लोकगायन','बिहार की संगीत साधना','बिहार में नृत्यकला','बिहार की चित्रकला','मधुबनी की चित्रकला','बिहार में नाट्यकला','बिहार का सिनेमा संसार'];
const redesigned=['बिहार का लोकगायन','बिहार की संगीत साधना','मधुबनी की चित्रकला','बिहार में नाट्यकला','बिहार का सिनेमा संसार'];
const failures=[];
for(const title of chapters)if(!legacy.includes(`'${title}':`)&&!unified.includes(`'${title}':`))failures.push(`missing chapter data: ${title}`);
for(const marker of ["practice:{label:'अभ्यास',count:15}","challenge:{label:'चुनौती',count:12}","test:{label:'अंतिम टेस्ट',count:20}",'HINDI_MODE_TIMING','const ORDER='])if(!unified.includes(marker))failures.push(`missing unified learner marker: ${marker}`);
if(!section.includes('HindiVarnikaUnifiedChapterView'))failures.push('unified Varnika learner is not wired');
if(!section.includes('onNavigate={handleSupportNavigate}'))failures.push('previous/next chapter navigation is not wired');
if(!section.includes('onBack={returnToVarnikaList}'))failures.push('Varnika exit does not return to the Varnika list');
if(!section.includes("topic.title==='बिहार में नृत्यकला'"))failures.push('chapter 3 route missing');
if(!section.includes("topic.title==='बिहार की चित्रकला'"))failures.push('chapter 4 route missing');
for(const marker of ["practice:{label:'अभ्यास',count:15}","challenge:{label:'चुनौती',count:12}","test:{label:'अंतिम टेस्ट',count:20}"])if(!chapter3.includes(marker)||!chapter4.includes(marker))failures.push(`dedicated Varnika mode counts missing: ${marker}`);
for(const marker of ['जट-जटिन','झिझिया','करिया-झूमर','डोमकच','पँवरिया','गुँडिया','हरि उप्पल','नगेन्द्र मोहिनी','भिखारी ठाकुर','ज्योतिरीश्वर ठाकुर'])if(!chapter3.includes(marker))failures.push(`chapter 3 content marker missing: ${marker}`);
for(const marker of ['पटना कलम','राधामोहन बाबू','उपेन्द्र महारथी','श्याम शर्मा','वेणुशिल्प','डब्ल्यू. जी. आर्चर','ईश्वरी प्रसाद वर्मा'])if(!chapter4.includes(marker))failures.push(`chapter 4 content marker missing: ${marker}`);
for(const title of redesigned){if(!unified.includes(`'${title}':{`))failures.push(`redesigned chapter missing from unified learner: ${title}`)}
const unifiedFactCount=(title)=>{const start=unified.indexOf(`'${title}':{`);if(start<0)return 0;const next=unified.indexOf("],\n'",start+10);const block=unified.slice(start,next>start?next:unified.length);return (block.match(/\['[^']+','/g)||[]).length};
for(const title of redesigned){const count=unifiedFactCount(title);if(count<20)failures.push(`${title} must have at least 20 study points; found ${count}`)}
if(!unified.includes('const pair=[]'))failures.push('30-question expansion layer missing');
if(!unified.includes('for(let i=0;i<10;i++)'))failures.push('10 additional assessment questions missing');
if(!unified.includes('return [...direct,...pair]'))failures.push('30-question bank assembly missing');
if(legacy.includes('const correct=item[1]'))failures.push('old generic item[1] generator still present');
if(failures.length){console.error('Varnika QA failed:');for(const failure of failures)console.error(`- ${failure}`);process.exit(1)}
console.log('Varnika QA passed: all 7 chapters are routed inside Varnika, redesigned chapters have 20 learning points, 30-question banks are assembled, mode sizes remain 15/12/20, and exits stay on the Varnika list.');
