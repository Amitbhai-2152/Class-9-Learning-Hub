import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const source=fs.readFileSync(path.join(root,'src','HindiSupportChapterView.jsx'),'utf8');
const section=fs.readFileSync(path.join(root,'src','HindiSubjectSection.jsx'),'utf8');
const chapter3=fs.readFileSync(path.join(root,'src','HindiVarnikaChapter3View.jsx'),'utf8');
const chapter4=fs.readFileSync(path.join(root,'src','HindiVarnikaChapter4View.jsx'),'utf8');
const chapters=['बिहार का लोकगायन','बिहार की संगीत साधना','बिहार में नृत्यकला','बिहार की चित्रकला','मधुबनी की चित्रकला','बिहार में नाट्यकला','बिहार का सिनेमा संसार'];
const failures=[];
for(const title of chapters)if(!source.includes(`'${title}':`))failures.push(`missing chapter data: ${title}`);
for(const marker of ["mode==='practice'","mode==='challenge'","mode==='test'",'HINDI_MODE_TIMING','VARNIKA_ORDER'])if(!source.includes(marker))failures.push(`missing Varnika implementation marker: ${marker}`);
if(!section.includes('initialMode={localChapter.mode}'))failures.push('selected Varnika mode is not passed from chapter cards');
if(!section.includes('onNavigate={handleSupportNavigate}'))failures.push('previous/next chapter navigation is not wired');
if(!section.includes('onBack={returnToVarnikaList}'))failures.push('Varnika exit does not return to the Varnika list');
if(!section.includes("topic.title==='बिहार में नृत्यकला'"))failures.push('chapter 3 route missing');
if(!section.includes("topic.title==='बिहार की चित्रकला'"))failures.push('chapter 4 route missing');
for(const marker of ["practice:{label:'अभ्यास',count:15}","challenge:{label:'चुनौती',count:12}","test:{label:'अंतिम टेस्ट',count:20}"])if(!chapter3.includes(marker)||!chapter4.includes(marker))failures.push(`dedicated Varnika mode counts missing: ${marker}`);
if(source.includes('const correct=item[1]'))failures.push('generic question generator still present');
if(!section.includes("import {HindiVarnikaChapter3View} from './HindiVarnikaChapter3View';"))failures.push('chapter 3 learner import missing');
if(!section.includes("import {HindiVarnikaChapter4View} from './HindiVarnikaChapter4View';"))failures.push('chapter 4 learner import missing');
for(const marker of ['जट-जटिन','झिझिया','करिया-झूमर','डोमकच','पँवरिया','गुँडिया','हरि उप्पल','नगेन्द्र मोहिनी','भिखारी ठाकुर','ज्योतिरीश्वर ठाकुर'])if(!chapter3.includes(marker))failures.push(`chapter 3 content marker missing: ${marker}`);
for(const marker of ['पटना कलम','राधामोहन बाबू','उपेन्द्र महारथी','श्याम शर्मा','वेणुशिल्प','डब्ल्यू. जी. आर्चर','ईश्वरी प्रसाद वर्मा'])if(!chapter4.includes(marker))failures.push(`chapter 4 content marker missing: ${marker}`);
const questionMatches3=chapter3.match(/^ \['/gm)||[];
const questionMatches4=chapter4.match(/^\s*q\(/gm)||[];
if(questionMatches3.length<20)failures.push(`chapter 3 must contain at least 20 questions; found ${questionMatches3.length}`);
if(questionMatches4.length<30)failures.push(`chapter 4 must contain at least 30 question definitions; found ${questionMatches4.length}`);
if(failures.length){console.error('Varnika QA failed:');for(const failure of failures)console.error(`- ${failure}`);process.exit(1);}
console.log('Varnika QA passed: all 7 chapter maps, dedicated Chapter 3/4 assessments, mode counts, routing, navigation and Varnika-list exits are present.');
