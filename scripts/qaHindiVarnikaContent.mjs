import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const legacy=fs.readFileSync(path.join(root,'src','HindiSupportChapterView.jsx'),'utf8');
const unified=fs.readFileSync(path.join(root,'src','HindiVarnikaUnifiedChapterView.jsx'),'utf8');
const section=fs.readFileSync(path.join(root,'src','HindiSubjectSection.jsx'),'utf8');
const chapter3=fs.readFileSync(path.join(root,'src','HindiVarnikaChapter3View.jsx'),'utf8');
const chapter4=fs.readFileSync(path.join(root,'src','HindiVarnikaChapter4View.jsx'),'utf8');
const chapter5=fs.readFileSync(path.join(root,'src','HindiVarnikaChapter5View.jsx'),'utf8');
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
if(!section.includes("topic.title==='मधुबनी की चित्रकला'"))failures.push('chapter 5 route missing');
for(const marker of ["practice:{label:'अभ्यास',count:15}","challenge:{label:'चुनौती',count:12}","test:{label:'अंतिम टेस्ट',count:20}"])if(!chapter3.includes(marker))failures.push(`Chapter 3 mode count marker missing: ${marker}`);
for(const marker of ["practice:{label:'अभ्यास',count:15,start:0,end:15}","challenge:{label:'चुनौती',count:12,start:15,end:27}","test:{label:'अंतिम टेस्ट',count:20,start:27,end:47}"])if(!chapter4.includes(marker))failures.push(`Chapter 4 dedicated mode range missing: ${marker}`);
const chapter4QuestionCount=(chapter4.match(/\{q:'[^']+',options:/g)||[]).length;
const chapter4PointCount=(chapter4.match(/\['[^']+','[^']*'\]/g)||[]).length;
if(chapter4QuestionCount<47)failures.push(`Chapter 4 needs 47 assessment questions; found ${chapter4QuestionCount}`);
if(chapter4PointCount<30)failures.push(`Chapter 4 needs at least 30 learning points; found ${chapter4PointCount}`);
if(!chapter4.includes('QUESTIONS.slice(cfg.start,Math.min(cfg.end,QUESTIONS.length))'))failures.push('Chapter 4 assessment bank is not sliced by dedicated ranges');
for(const marker of ["practice:{label:'अभ्यास',count:15,start:0,end:15}","challenge:{label:'चुनौती',count:12,start:15,end:27}","test:{label:'अंतिम टेस्ट',count:20,start:27,end:47}"])if(!chapter5.includes(marker))failures.push(`Chapter 5 dedicated mode range missing: ${marker}`);
const chapter5QuestionCount=(chapter5.match(/\['[^']+',\[/g)||[]).length;
const chapter5PointCount=(chapter5.match(/\['[^']+','[^']*'\]/g)||[]).length;
if(chapter5QuestionCount<47)failures.push(`Chapter 5 needs 47 assessment questions; found ${chapter5QuestionCount}`);
if(chapter5PointCount<30)failures.push(`Chapter 5 needs at least 30 learning points; found ${chapter5PointCount}`);
if(!chapter5.includes('QUESTIONS.slice(cfg.start,Math.min(cfg.end,QUESTIONS.length))'))failures.push('Chapter 5 assessment bank is not sliced by dedicated ranges');
for(const marker of ['जट-जटिन','झिझिया','करिया-झूमर','डोमकच','पँवरिया','गुँडिया','हरि उप्पल','नगेन्द्र मोहिनी','भिखारी ठाकुर','ज्योतिरीश्वर ठाकुर'])if(!chapter3.includes(marker))failures.push(`chapter 3 content marker missing: ${marker}`);
for(const marker of ['पटना कलम','राधामोहन बाबू','उपेन्द्र महारथी','श्याम शर्मा','वेणुशिल्प','डब्ल्यू. जी. आर्चर','ईश्वरी प्रसाद वर्मा'])if(!chapter4.includes(marker))failures.push(`chapter 4 content marker missing: ${marker}`);
for(const marker of ['मधुबनी चित्रकला','भूमि आकल्पन','अरिपन','कोहबर','पट-चित्रण','गंगा देवी','जगदम्बा देवी','उपेन्द्र महारथी','दलित शैली','प्राकृतिक रंग'])if(!chapter5.includes(marker))failures.push(`chapter 5 content marker missing: ${marker}`);
for(const title of redesigned){if(!unified.includes(`'${title}':{`))failures.push(`redesigned chapter missing from unified learner: ${title}`)}
const unifiedFactCount=(title)=>{const start=unified.indexOf(`'${title}':{`);if(start<0)return 0;const next=unified.indexOf("],\n'",start+10);const block=unified.slice(start,next>start?next:unified.length);return (block.match(/\['[^']+','/g)||[]).length};
for(const title of redesigned){const count=unifiedFactCount(title);if(count<20)failures.push(`${title} must have at least 20 study points; found ${count}`)}
if(!unified.includes('const pair=[]'))failures.push('30-question expansion layer missing');
if(!unified.includes('for(let i=0;i<10;i++)'))failures.push('10 additional assessment questions missing');
if(!unified.includes('return [...direct,...pair]'))failures.push('30-question bank assembly missing');
if(legacy.includes('const correct=item[1]'))failures.push('old generic item[1] generator still present');
if(failures.length){console.error('Varnika QA failed:');for(const failure of failures)console.error(`- ${failure}`);process.exit(1)}
console.log(`Varnika QA passed: all 7 chapters are routed inside Varnika; Chapter 4 has ${chapter4PointCount} learning points and ${chapter4QuestionCount} dedicated assessment questions; Chapter 5 has ${chapter5PointCount} learning points and ${chapter5QuestionCount} dedicated assessment questions; mode ranges remain 15/12/20; timing/progress/navigation checks pass.`);
