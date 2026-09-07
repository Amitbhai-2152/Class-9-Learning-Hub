import {readFileSync} from 'node:fs';

const registry=readFileSync(new URL('../src/sanskrit/sanskritChapterRegistry.js',import.meta.url),'utf8');
const content=readFileSync(new URL('../src/sanskrit/sanskritPrimaryContent.js',import.meta.url),'utf8');
const supplementarySource=readFileSync(new URL('../src/sanskrit/sanskritSupplementaryContent.js',import.meta.url),'utf8');
const deepSource=readFileSync(new URL('../src/sanskrit/sanskritSupplementaryDeepContent.js',import.meta.url),'utf8');
const studySource=readFileSync(new URL('../src/sanskrit/sanskritSupplementaryStudyModules.js',import.meta.url),'utf8');
const runtimeSource=readFileSync(new URL('../src/sanskrit/sanskritSupplementaryRuntime.js',import.meta.url),'utf8');
const wrapper=readFileSync(new URL('../src/sanskrit/SanskritSubjectSection.jsx',import.meta.url),'utf8');
const hub=readFileSync(new URL('../src/sanskrit/SanskritSubjectHub.jsx',import.meta.url),'utf8');
const engine=`${wrapper}\n${hub}`;

const primaryTitles=['ईशस्तुति:','लोभविष्टः चक्रधरः','यक्ष-युधिष्ठिर संवाद','चत्वारो वेदाः','संस्कृतस्य महिमा','संस्कृतसाहित्ये पर्यावरणम्','ज्ञानं भारः क्रियां विना','नीतिपधानिः','बिहारस्य संस्कृतिकं वैभवम्','ईद-महोत्सवः','ग्राम्यजीवनम्','वीर कूँवर सिंहः','किशोराणां मनोविज्ञानम्','राष्ट्रबोधः','विश्ववन्दिता वैशाली'];
const supplementaryTitles=['सरस्वती-वन्दना','संस्कृत-भाषा','प्रार्थना','यत्नं विना न रत्नम्','विदुला-पुत्र संवादः','सम्पूर्णविश्वरत्नम्','लोकगीतम्','अमृतं बालभाषितम्','प्रभात-वर्णनम्','नायं छागः','प्रयाणगीतम्','महात्मा गाँधी','भारतीयप्रजातन्त्रम्','संस्मरणम्','धर्मेषु भावः समानः समेषाम्','बिहारो विहारे सदा रोचताम् वः','लौहस्य तुला','ज्ञानेन शोभते किल','कुरुक्षेत्रम्','प्रहेलिका','ग्रन्थकाराः'];
const failures=[];
const count=(text,needle)=>text.split(needle).length-1;

if(!registry.includes('SANSKRIT_PRIMARY_CHAPTERS'))failures.push('Primary registry export missing');
if(!registry.includes('SANSKRIT_SUPPLEMENTARY_CHAPTERS'))failures.push('Supplementary registry export missing');
if(count(registry,"status:'planned'")<14)failures.push('Expected 14 planned primary chapter markers');
for(const title of primaryTitles)if(!registry.includes(`title:'${title}'`))failures.push(`Primary registry chapter missing: ${title}`);
for(const title of supplementaryTitles)if(!registry.includes(`title:'${title}'`))failures.push(`Supplementary registry chapter missing: ${title}`);
for(let i=1;i<=15;i++)if(!content.includes(`  ${i}:{`))failures.push(`Structured primary content missing for chapter ${i}`);

if(!supplementarySource.includes('export const SANSKRIT_SUPPLEMENTARY_CONTENT'))failures.push('Supplementary content export missing');
if(supplementarySource.includes('subjective'))failures.push('Supplementary source still contains subjective layer');
if(!deepSource.includes('SANSKRIT_SUPPLEMENTARY_DEEP_CONTENT'))failures.push('Deep supplementary content export missing');
for(const title of ['सरस्वती-वन्दना','प्रार्थना','लोकगीतम्','विदुला-पुत्र संवादः','प्रयाणगीतम्','प्रहेलिका'])if(!deepSource.includes(title))failures.push(`Deep content special chapter missing: ${title}`);
if(!studySource.includes('SANSKRIT_SUPPLEMENTARY_STUDY_MODULES'))failures.push('Supplementary study-module export missing');
if(!studySource.includes('SANSKRIT_SUPPLEMENTARY_TYPE_TOOLKIT'))failures.push('Supplementary chapter-type toolkit missing');
if(!runtimeSource.includes('SANSKRIT_SUPPLEMENTARY_RUNTIME_CONTENT'))failures.push('Supplementary runtime export missing');
if(!runtimeSource.includes('getSanskritSupplementaryContent'))failures.push('Supplementary getter missing');
if(!runtimeSource.includes('balanceQuestions'))failures.push('Balanced answer-key runtime missing');
if(!runtimeSource.includes('lessons:chapter.concepts.map'))failures.push('Supplementary lesson enrichment missing');
if(!runtimeSource.includes('getSanskritSupplementaryDeepContent'))failures.push('Deep content not wired into runtime');
if(!runtimeSource.includes('getSanskritSupplementaryStudyModule'))failures.push('Study modules not wired into runtime');
if(!/getSanskritSupplementaryContent\}?\s+from\s+['"]\.\/sanskritSupplementaryRuntime(?:\.js)?['"]/.test(hub))failures.push('Supplementary runtime not wired to engine');
if(!hub.includes('book="supplementary"'))failures.push('Supplementary chapter route missing');
if(!hub.includes('sanskritChapter'))failures.push('Supplementary direct URL state missing');
if(!hub.includes('DeepContentView'))failures.push('Deep content view missing from chapter UI');
if(!hub.includes('पाठ-विशेष'))failures.push('Chapter-specific content section missing from UI');
if(engine.includes('SubjectiveView')||engine.includes('>Subjective<'))failures.push('Subjective UI still present');
if(!engine.includes('SanskritSubjectSection'))failures.push('Subject section symbol missing');
if(!engine.includes('SanskritChapterEngine'))failures.push('Chapter engine symbol missing');
for(const token of ['सीखें','अभ्यास','चुनौती','फाइनल टेस्ट'])if(!engine.includes(token))failures.push(`Engine mode missing: ${token}`);
if(!wrapper.includes("from './SanskritSubjectHub'"))failures.push('Subject wrapper path missing');

try{
 const mod=await import('../src/sanskrit/sanskritSupplementaryRuntime.js');
 const chapters=mod.SANSKRIT_SUPPLEMENTARY_RUNTIME_CONTENT;
 if(!chapters||typeof chapters!=='object')failures.push('Supplementary runtime content object missing');
 const keys=Object.keys(chapters).sort((a,b)=>Number(a)-Number(b));
 if(keys.length!==21||keys.some((key,index)=>Number(key)!==index+1))failures.push(`Supplementary runtime chapter count/keys invalid: ${keys.join(',')}`);

 for(let number=1;number<=21;number++){
   const chapter=chapters[number];
   if(!chapter){continue;}
   const expectedTitle=supplementaryTitles[number-1];
   if(!chapter.title||chapter.title!==expectedTitle)failures.push(`Runtime title mismatch at supplementary chapter ${number}`);
   const lessonCount=Array.isArray(chapter.lessons)?chapter.lessons.length:0;
   const conceptCount=Array.isArray(chapter.concepts)?chapter.concepts.length:0;
   if(lessonCount!==4||conceptCount!==4)failures.push(`Supplementary Ch${number}: expected 4 learning blocks, got lessons=${lessonCount}, concepts=${conceptCount}`);
   if(!Array.isArray(chapter.vocabulary)||chapter.vocabulary.length!==5)failures.push(`Supplementary Ch${number}: expected 5 chapter keywords`);
   if(typeof chapter.grammarFocus!=='string'||chapter.grammarFocus.length<8)failures.push(`Supplementary Ch${number}: grammar focus missing`);
   const deep=chapter.deepContent;
   if(!deep||typeof deep!=='object')failures.push(`Supplementary Ch${number}: deep content missing`);
   else{
     if(typeof deep.type!=='string'||typeof deep.label!=='string'||typeof deep.overview!=='string')failures.push(`Supplementary Ch${number}: deep content header incomplete`);
     if(!Array.isArray(deep.sequence)||deep.sequence.length<4)failures.push(`Supplementary Ch${number}: deep sequence incomplete`);
     if(!Array.isArray(deep.examFocus)||deep.examFocus.length<4)failures.push(`Supplementary Ch${number}: deep exam focus incomplete`);
     if(deep.anchor&&deep.anchor.split(/\s+/).filter(Boolean).length>25)failures.push(`Supplementary Ch${number}: quoted anchor is too long`);
   }
   const study=chapter.studyModule;
   if(!study||typeof study!=='object')failures.push(`Supplementary Ch${number}: high-score study module missing`);
   else{
     for(const field of ['mustKnow','quickCheck','examTraps','language','highScore']){
       if(!Array.isArray(study[field])||study[field].length<2)failures.push(`Supplementary Ch${number}: study module ${field} is incomplete`);
     }
     if(typeof study.revision!=='string'||study.revision.length<12)failures.push(`Supplementary Ch${number}: revision plan missing`);
     if(typeof study.answerMethod!=='string'||study.answerMethod.length<12)failures.push(`Supplementary Ch${number}: answer method missing`);
     if(typeof study.typeReading!=='string'||study.typeReading.length<12)failures.push(`Supplementary Ch${number}: type reading strategy missing`);
   }

   for(const [label,items,expected] of [['practice',chapter.practice,15],['challenge',chapter.challenge,12],['finalTest',chapter.finalTest,20]]){
     if(!Array.isArray(items)||items.length!==expected){failures.push(`Supplementary Ch${number}: ${label} expected ${expected}, got ${Array.isArray(items)?items.length:0}`);continue;}
     const texts=items.map(item=>item?.q||'');
     if(new Set(texts).size!==texts.length)failures.push(`Supplementary Ch${number}: duplicate ${label} questions`);
     const bad=items.filter(item=>!item||typeof item.q!=='string'||item.q.length<12||!Array.isArray(item.options)||item.options.length!==4||new Set(item.options).size!==4||![0,1,2,3].includes(item.answer)||typeof item.explain!=='string').length;
     if(bad)failures.push(`Supplementary Ch${number}: ${label} has ${bad} invalid MCQ objects`);
     const distribution=items.reduce((acc,item)=>{acc[item.answer]=(acc[item.answer]||0)+1;return acc},[0,0,0,0]);
     if(distribution.some(c=>c===0))failures.push(`Supplementary Ch${number}: ${label} answer positions are not balanced: ${distribution.join('/')}`);
     const relevantTokens=[expectedTitle,chapter.theme,chapter.focus,chapter.intro,chapter.grammarFocus,...chapter.vocabulary,...(chapter.concepts||[]).flat(),...(chapter.lessons||[]).flatMap(lesson=>lesson?.points||[]),...(Array.isArray(chapter.points)?chapter.points:[])].filter(Boolean);
     const relevant=items.filter(item=>relevantTokens.some(token=>item.q.includes(token))).length;
     const required=label==='practice'?8:label==='challenge'?6:10;
     if(relevant<required)failures.push(`Supplementary Ch${number}: ${label} is not sufficiently chapter-specific (${relevant}/${required} relevant prompts)`);
   }
   if(Object.prototype.hasOwnProperty.call(chapter,'subjective'))failures.push(`Supplementary Ch${number}: subjective property must be removed`);
 }
}catch(error){failures.push(`Supplementary runtime import failed: ${error.message}`)}

if(failures.length){
 console.error('SANSKRIT QA FAILED');
 for(const failure of failures)console.error(`- ${failure}`);
 process.exit(1);
}

console.log('SANSKRIT QA PASSED: 15 primary + 21 supplementary chapters; every supplementary chapter has deep chapter-specific study content, high-score module, 4 learning blocks, 15 practice, 12 challenge, 20 final-test MCQs, valid 4-option banks, balanced answer positions, no subjective layer, and working supplementary navigation.');
