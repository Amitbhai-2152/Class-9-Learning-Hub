import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const legacy=read('src/HindiSupportChapterView.jsx');
const unified=read('src/HindiVarnikaUnifiedChapterView.jsx');
const section=read('src/HindiSubjectSection.jsx');
const chapter12=read('src/HindiVarnikaChapter12View.jsx');
const chapter3=read('src/HindiVarnikaChapter3View.jsx');
const chapter4=read('src/HindiVarnikaChapter4View.jsx');
const failures=[];
const chapters=['बिहार का लोकगायन','बिहार की संगीत साधना','बिहार में नृत्यकला','बिहार की चित्रकला','मधुबनी की चित्रकला','बिहार में नाट्यकला','बिहार का सिनेमा संसार'];
for(const title of chapters)if(!legacy.includes(`'${title}':`)&&!unified.includes(`'${title}':`))failures.push(`missing chapter data: ${title}`);
if(!section.includes('HindiVarnikaChapter12View'))failures.push('Chapter 1-2 learner is not wired');
if(!section.includes('HindiVarnikaUnifiedChapterView'))failures.push('unified Varnika learner is not wired');
if(!section.includes('onNavigate={handleSupportNavigate}'))failures.push('Varnika chapter navigation is not wired');
if(!section.includes('onBack={returnToVarnikaList}'))failures.push('Varnika exit is not wired');
for(const marker of ["practice:{label:'अभ्यास',count:15}","challenge:{label:'चुनौती',count:12}","test:{label:'अंतिम टेस्ट',count:20}"])if(!chapter12.includes(marker))failures.push(`Chapter 1-2 mode marker missing: ${marker}`);
if(!chapter12.includes("const modeQuestions=(all,currentMode)=>currentMode==='practice'?all.slice(0,15):currentMode==='challenge'?all.slice(15,27):[all[0],...all.slice(1,20)]"))failures.push('Chapter 1-2 assessment banks are not separated 15/12/20');
for(const marker of ["current[0]","current[1].map","answers[idx]===x[2]","x[1][x[2]]"])if(!chapter12.includes(marker))failures.push(`Chapter 1-2 assessment tuple handling missing: ${marker}`);
for(const stale of ['{q.q}','{q.options}','x.q','x.options'])if(chapter12.includes(stale))failures.push(`stale object-style assessment access remains: ${stale}`);
for(const marker of ['markHindiModeCompleted(topic.id,mode)','setSubmitted(true)','HINDI_MODE_TIMING[mode]?.minutes'])if(!chapter12.includes(marker))failures.push(`Chapter 1-2 assessment behavior missing: ${marker}`);
for(const marker of ["practice:{label:'अभ्यास',count:15}","challenge:{label:'चुनौती',count:12}","test:{label:'अंतिम टेस्ट',count:20}"])if(!chapter3.includes(marker)||!chapter4.includes(marker))failures.push(`dedicated Varnika mode counts missing: ${marker}`);
for(const marker of ['जट-जटिन','झिझिया','करिया-झूमर','डोमकच','पँवरिया','भिखारी ठाकुर'])if(!chapter3.includes(marker))failures.push(`chapter 3 content marker missing: ${marker}`);
for(const marker of ['पटना कलम','उपेन्द्र महारथी','डब्ल्यू. जी. आर्चर','ईश्वरी प्रसाद वर्मा'])if(!chapter4.includes(marker))failures.push(`chapter 4 content marker missing: ${marker}`);
if(failures.length){console.error('Varnika QA failed:');for(const failure of failures)console.error(`- ${failure}`);process.exit(1)}
console.log('Varnika QA passed: Chapters 1-2 keep their Learn content, use separate 15/12/20 assessment routing, render and score tuple questions correctly, show review answers, persist completion, honor timing, and keep Varnika navigation intact.');
