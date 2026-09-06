import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const read=name=>fs.readFileSync(path.join(root,'src',name),'utf8');
const unified=read('HindiVarnikaUnifiedChapterView.jsx');
const modeShell=read('HindiVarnikaChapter12ModeShell.jsx');
const section=read('HindiSubjectSection.jsx');
const progress=read('hindiChapterProgress.js');
const chapter3=read('HindiVarnikaChapter3View.jsx');
const chapter4=read('HindiVarnikaChapter4View.jsx');
const chapter5=read('HindiVarnikaChapter5View.jsx');
const chapters=['बिहार का लोकगायन','बिहार की संगीत साधना','बिहार में नृत्यकला','बिहार की चित्रकला','मधुबनी की चित्रकला','बिहार में नाट्यकला','बिहार का सिनेमा संसार'];
const unifiedChapters=['बिहार का लोकगायन','बिहार की संगीत साधना','बिहार में नाट्यकला','बिहार का सिनेमा संसार'];
const failures=[];

for(const title of chapters){
  if(!section.includes(`'${title}'`)&&!unified.includes(`'${title}'`))failures.push(`missing Varnika chapter title: ${title}`);
}

for(const title of unifiedChapters){
  if(!unified.includes(`'${title}':{`))failures.push(`unified learner missing chapter data: ${title}`);
  const start=unified.indexOf(`'${title}':{`);
  const next=unified.indexOf("\n'",start+10);
  const block=unified.slice(start,next>start?next:unified.length);
  const facts=(block.match(/\['[^']+','/g)||[]).length;
  if(facts<20)failures.push(`${title}: expected at least 20 learning facts, found ${facts}`);
}

for(const marker of [
  "practice:{label:'अभ्यास',count:15,start:0,end:15}",
  "challenge:{label:'चुनौती',count:12,start:15,end:27}",
  "test:{label:'अंतिम टेस्ट',count:20,start:27,end:47}",
  'questions.slice(cfg.start,cfg.end)',
  'facts.forEach(([heading,explanation],i)=>',
  'for(let i=0;i<7;i++)'
])if(!unified.includes(marker))failures.push(`unified assessment marker missing: ${marker}`);

const assessmentExpansion=(unified.match(/facts\.forEach\(\(\[heading,explanation\],i\)=>/g)||[]).length;
if(assessmentExpansion!==2)failures.push(`expected two assessment passes, found ${assessmentExpansion}`);

if(!modeShell.includes("import {HindiVarnikaUnifiedChapterView}"))failures.push('Chapters 1/2 mode shell is not using the unified dedicated learner');
if(!modeShell.includes('initialMode={activeMode}'))failures.push('Chapters 1/2 mode shell does not forward active mode');
if(!section.includes("topic&&topic.book==='वर्णिका · पूरक')return <HindiVarnikaUnifiedChapterView"))failures.push('Varnika fallback learner routing is missing');
if(!section.includes("topic&&topic.book==='वर्णिका · पूरक'&&topic.title==='बिहार में नृत्यकला'"))failures.push('Chapter 3 dedicated routing missing');
if(!section.includes("topic&&topic.book==='वर्णिका · पूरक'&&topic.title==='बिहार की चित्रकला'"))failures.push('Chapter 4 dedicated routing missing');
if(!section.includes("topic&&topic.book==='वर्णिका · पूरक'&&topic.title==='मधुबनी की चित्रकला'"))failures.push('Chapter 5 dedicated routing missing');
if(!progress.includes("const REQUIRED_MODES=['learn','practice','challenge','test']"))failures.push('progress required-mode list missing');
if(!progress.includes('hasAllRequiredModes(p.modes[id])'))failures.push('chapter completion does not require all four modes');

for(const marker of ["practice:{label:'अभ्यास',count:15,start:0,end:15}","challenge:{label:'चुनौती',count:12,start:15,end:27}","test:{label:'अंतिम टेस्ट',count:20,start:27,end:47}"])if(!chapter4.includes(marker))failures.push(`Chapter 4 mode range missing: ${marker}`);
for(const marker of ["practice:{label:'अभ्यास',count:15,start:0,end:15}","challenge:{label:'चुनौती',count:12,start:15,end:27}","test:{label:'अंतिम टेस्ट',count:20,start:27,end:47}"])if(!chapter5.includes(marker))failures.push(`Chapter 5 mode range missing: ${marker}`);
for(const marker of ['जट-जटिन','झिझिया','करिया-झूमर','डोमकच','गुँडिया','हरि उप्पल','नगेन्द्र मोहिनी','भिखारी ठाकुर'])if(!chapter3.includes(marker))failures.push(`Chapter 3 content marker missing: ${marker}`);

if(failures.length){
  console.error('Varnika QA failed:');
  failures.forEach(f=>console.error(`- ${f}`));
  process.exit(1);
}
console.log('Varnika QA passed: 7 chapters identified; unified Chapters 1/2/6/7 provide at least 20 learning facts and a 47-slot 15/12/20 assessment architecture; Chapters 3/4/5 retain dedicated assessment ranges; completion requires Learn+Practice+Challenge+Test.');
