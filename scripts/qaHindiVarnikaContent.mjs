import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const source=fs.readFileSync(path.join(root,'src','HindiSupportChapterView.jsx'),'utf8');
const section=fs.readFileSync(path.join(root,'src','HindiSubjectSection.jsx'),'utf8');
const chapter3=fs.readFileSync(path.join(root,'src','HindiVarnikaChapter3View.jsx'),'utf8');
const chapters=['बिहार का लोकगायन','बिहार की संगीत साधना','बिहार में नृत्यकला','बिहार की चित्रकला','मधुबनी की चित्रकला','बिहार में नाट्यकला','बिहार का सिनेमा संसार'];
const failures=[];
for(const title of chapters)if(!source.includes(`'${title}':`))failures.push(`missing chapter data: ${title}`);
for(const marker of ["mode==='practice'","mode==='challenge'","mode==='test'",'HINDI_MODE_TIMING','initialMode','onNavigate','VARNIKA_ORDER'])if(!source.includes(marker))failures.push(`missing Varnika implementation marker: ${marker}`);
if(!source.includes("practice:{label:'अभ्यास',count:15}"))failures.push('practice count must be 15');
if(!source.includes("challenge:{label:'चुनौती',count:12}"))failures.push('challenge count must be 12');
if(!source.includes("test:{label:'अंतिम टेस्ट',count:20}"))failures.push('test count must be 20');
if(source.includes('const correct=item[1]'))failures.push('generic question generator still present');
if(!section.includes("import {HindiVarnikaChapter3View} from './HindiVarnikaChapter3View';"))failures.push('chapter 3 learner import missing');
if(!section.includes("topic.title==='बिहार में नृत्यकला'"))failures.push('chapter 3 route missing');
if(!section.includes('initialMode={localChapter.mode}'))failures.push('selected mode is not passed from chapter cards');
if(!section.includes('onNavigate={handleSupportNavigate}'))failures.push('previous/next chapter navigation is not wired');
for(const marker of ['जट-जटिन','झिझिया','करिया-झूमर','डोमकच','पँवरिया','गुँडिया','हरि उप्पल','नगेन्द्र मोहिनी','भिखारी ठाकुर','ज्योतिरीश्वर ठाकुर'])if(!chapter3.includes(marker))failures.push(`chapter 3 content marker missing: ${marker}`);
const questionMatches=chapter3.match(/^ \['/gm)||[];
if(questionMatches.length<20)failures.push(`chapter 3 must contain at least 20 questions; found ${questionMatches.length}`);
if(!chapter3.includes("const MODES={practice:{label:'अभ्यास',count:15},challenge:{label:'चुनौती',count:12},test:{label:'अंतिम टेस्ट',count:20}};"))failures.push('chapter 3 mode counts missing');
if(failures.length){console.error('Varnika QA failed:');for(const failure of failures)console.error(`- ${failure}`);process.exit(1);}
console.log('Varnika QA passed: all 7 chapter maps, Chapter 3 textbook-aligned assessment, mode counts, routing and navigation markers are present.');
