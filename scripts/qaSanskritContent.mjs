import {readFileSync} from 'node:fs';

const registry=readFileSync(new URL('../src/sanskrit/sanskritChapterRegistry.js',import.meta.url),'utf8');
const hub=readFileSync(new URL('../src/sanskrit/SanskritSubjectHub.jsx',import.meta.url),'utf8');
const wrapper=readFileSync(new URL('../src/sanskrit/SanskritSubjectSection.jsx',import.meta.url),'utf8');
const supplementarySource=readFileSync(new URL('../src/sanskrit/sanskritSupplementaryContent.js',import.meta.url),'utf8');
const deepSource=readFileSync(new URL('../src/sanskrit/sanskritSupplementaryDeepContent.js',import.meta.url),'utf8');
const studySource=readFileSync(new URL('../src/sanskrit/sanskritSupplementaryStudyModules.js',import.meta.url),'utf8');
const runtimeSource=readFileSync(new URL('../src/sanskrit/sanskritSupplementaryRuntime.js',import.meta.url),'utf8');
const primaryDetailed1to4Source=readFileSync(new URL('../src/sanskrit/sanskritPrimaryDetailedStudy.js',import.meta.url),'utf8');
const primaryDetailed5to15Source=readFileSync(new URL('../src/sanskrit/sanskritPrimaryDetailedStudy5to8.js',import.meta.url),'utf8');
const primaryTitles=['ईशस्तुति:','लोभविष्टः चक्रधरः','यक्ष-युधिष्ठिर संवाद','चत्वारो वेदाः','संस्कृतस्य महिमा','संस्कृतसाहित्ये पर्यावरणम्','ज्ञानं भारः क्रियां विना','नीतिपधानिः','बिहारस्य संस्कृतिकं वैभवम्','ईद-महोत्सवः','ग्राम्यजीवनम्','वीर कूँवर सिंहः','किशोराणां मनोविज्ञानम्','राष्ट्रबोधः','विश्ववन्दिता वैशाली'];
const supplementaryTitles=['सरस्वती-वन्दना','संस्कृत-भाषा','प्रार्थना','यत्नं विना न रत्नम्','विदुला-पुत्र संवादः','सम्पूर्णविश्वरत्नम्','लोकगीतम्','अमृतं बालभाषितम्','प्रभात-वर्णनम्','नायं छागः','प्रयाणगीतम्','महात्मा गाँधी','भारतीयप्रजातन्त्रम्','संस्मरणम्','धर्मेषु भावः समानः समेषाम्','बिहारो विहारे सदा रोचताम् वः','लौहस्य तुला','ज्ञानेन शोभते किल','कुरुक्षेत्रम्','प्रहेलिका','ग्रन्थकाराः'];
const failures=[];
const normalizeTitle=x=>String(x??'').replace(/[:：]\s*$/,'').trim();
const checkBanks=(label,chapter,number)=>{
  for(const [name,items,expected] of [['practice',chapter.practice,15],['challenge',chapter.challenge,12],['finalTest',chapter.finalTest,20]]){
    if(!Array.isArray(items)||items.length!==expected){failures.push(`${label} Ch${number}: ${name} expected ${expected}, got ${Array.isArray(items)?items.length:0}`);continue;}
    const texts=items.map(x=>x?.q||'');
    if(new Set(texts).size!==texts.length)failures.push(`${label} Ch${number}: duplicate ${name} questions`);
    const bad=items.filter(x=>!x||typeof x.q!=='string'||x.q.length<12||!Array.isArray(x.options)||x.options.length!==4||new Set(x.options).size!==4||![0,1,2,3].includes(x.answer)||typeof x.explain!=='string').length;
    if(bad)failures.push(`${label} Ch${number}: ${name} has ${bad} invalid MCQs`);
    const dist=items.reduce((a,x)=>(a[x.answer]++,a),[0,0,0,0]);
    if(dist.some(n=>n===0))failures.push(`${label} Ch${number}: ${name} answer positions not balanced: ${dist.join('/')}`);
  }
};

const checkDetailedStudySource=(source,label,expectedNumbers,getterToken)=>{
  if(!source.includes(`export const ${getterToken}`))failures.push(`${label}: expected getter export ${getterToken} missing`);
  for(const n of expectedNumbers){
    const keyStart=`${n}:{title:`;
    if(!source.includes(keyStart))failures.push(`${label}: missing detailed Ch${n}`);
  }
};

for(const title of primaryTitles)if(!registry.includes(`title:'${title}'`))failures.push(`Primary registry missing: ${title}`);
for(const title of supplementaryTitles)if(!registry.includes(`title:'${title}'`))failures.push(`Supplementary registry missing: ${title}`);
if(!hub.includes('getSanskritPrimaryDetailedStudyContent'))failures.push('Detailed primary study not wired');
if(!hub.includes('getSanskritPrimaryDetailedStudyContent5to8'))failures.push('Extended primary detailed-study fallback not wired');
if(!hub.includes('DeepContentView'))failures.push('Supplementary deep content view missing');
if(!wrapper.includes('sanskritPrimaryQuestionPatch'))failures.push('Primary question patch not wired');
if(!runtimeSource.includes('getSanskritSupplementaryDeepContent'))failures.push('Supplementary deep runtime missing');
if(!runtimeSource.includes('getSanskritSupplementaryStudyModule'))failures.push('Supplementary study-module runtime missing');
if(!studySource.includes('SANSKRIT_SUPPLEMENTARY_STUDY_MODULES'))failures.push('Supplementary study export missing');
if(!deepSource.includes('SANSKRIT_SUPPLEMENTARY_DEEP_CONTENT'))failures.push('Supplementary deep export missing');
if(!supplementarySource.includes('SANSKRIT_SUPPLEMENTARY_CONTENT'))failures.push('Supplementary content export missing');
checkDetailedStudySource(primaryDetailed1to4Source,'Primary detailed 1–4',[1,2,3,4],'getSanskritPrimaryDetailedStudyContent');
checkDetailedStudySource(primaryDetailed5to15Source,'Primary detailed 5–15',[5,6,7,8,9,10,11,12,13,14,15],'getSanskritPrimaryDetailedStudyContent5to8');
if(/sanskritPrimaryDetailedStudyCh9to12/i.test(hub+primaryDetailed1to4Source+primaryDetailed5to15Source))failures.push('Redundant Ch9–12 detailed-study module is still referenced');

try{
  await import('../src/sanskrit/sanskritPrimaryQuestionPatch.js');
  const {SANSKRIT_PRIMARY_CONTENT}=await import('../src/sanskrit/sanskritPrimaryContent.js');
  if(!SANSKRIT_PRIMARY_CONTENT||Object.keys(SANSKRIT_PRIMARY_CONTENT).length!==15)failures.push('Primary runtime must expose exactly 15 chapters');
  for(let n=1;n<=15;n++){
    const chapter=SANSKRIT_PRIMARY_CONTENT[n];
    if(!chapter){failures.push(`Primary Ch${n} missing`);continue;}
    if(chapter.title!==primaryTitles[n-1])failures.push(`Primary title mismatch Ch${n}`);
    checkBanks('Primary',chapter,n);
  }
  const specialChecks=[
    [1,['यतो वाचो निवर्तन्ते','असतो मा सद्गमय','सर्वभूतान्तरात्मा']],
    [2,['सिद्धवर्तिचतुष्टयम्','ताम्रम्','रजतम्','स्वर्णम्']],
    [3,['सर्वभूतहितेरतः','तत्त्वार्थसम्बोधनम्','स्वधर्मम्','क्रोधः']],
    [4,['ऋग्वेद','यजुर्वेद','सामवेद','अथर्ववेद','वेदाङ्ग']]
  ];
  for(const [n,tokens] of specialChecks){
    const all=[...SANSKRIT_PRIMARY_CONTENT[n].practice,...SANSKRIT_PRIMARY_CONTENT[n].challenge,...SANSKRIT_PRIMARY_CONTENT[n].finalTest].map(x=>x.q).join(' | ');
    const missing=tokens.filter(t=>!all.includes(t));
    if(missing.length)failures.push(`Primary Ch${n}: missing chapter-specific question markers: ${missing.join(', ')}`);
  }
}catch(error){failures.push(`Primary runtime import failed: ${error.message}`)}

try{
  const {SANSKRIT_SUPPLEMENTARY_RUNTIME_CONTENT}=await import('../src/sanskrit/sanskritSupplementaryRuntime.js');
  if(!SANSKRIT_SUPPLEMENTARY_RUNTIME_CONTENT||Object.keys(SANSKRIT_SUPPLEMENTARY_RUNTIME_CONTENT).length!==21)failures.push('Supplementary runtime must expose exactly 21 chapters');
  for(let n=1;n<=21;n++){
    const c=SANSKRIT_SUPPLEMENTARY_RUNTIME_CONTENT[n];
    if(!c){failures.push(`Supplementary Ch${n} missing`);continue;}
    if(c.title!==supplementaryTitles[n-1])failures.push(`Supplementary title mismatch Ch${n}`);
    if(!Array.isArray(c.lessons)||c.lessons.length!==4)failures.push(`Supplementary Ch${n}: expected 4 lessons`);
    if(!Array.isArray(c.concepts)||c.concepts.length!==4)failures.push(`Supplementary Ch${n}: expected 4 concepts`);
    if(!Array.isArray(c.vocabulary)||c.vocabulary.length!==5)failures.push(`Supplementary Ch${n}: expected 5 vocabulary items`);
    const d=c.deepContent,s=c.studyModule;
    if(!d||!Array.isArray(d.sequence)||d.sequence.length<4||!Array.isArray(d.examFocus)||d.examFocus.length<4)failures.push(`Supplementary Ch${n}: deep study incomplete`);
    if(!s||!Array.isArray(s.mustKnow)||s.mustKnow.length<2||!Array.isArray(s.examTraps)||s.examTraps.length<2||!Array.isArray(s.highScore)||s.highScore.length<2)failures.push(`Supplementary Ch${n}: high-score study incomplete`);
    checkBanks('Supplementary',c,n);
    if(Object.prototype.hasOwnProperty.call(c,'subjective'))failures.push(`Supplementary Ch${n}: subjective layer must be absent`);
  }
}catch(error){failures.push(`Supplementary runtime import failed: ${error.message}`)}

try{
  const {SANSKRIT_PRIMARY_DETAILED_STUDY}=await import('../src/sanskrit/sanskritPrimaryDetailedStudy.js');
  const {SANSKRIT_PRIMARY_DETAILED_STUDY_5_8}=await import('../src/sanskrit/sanskritPrimaryDetailedStudy5to8.js');
  for(let n=1;n<=4;n++){
    const d=SANSKRIT_PRIMARY_DETAILED_STUDY?.[n];
    if(!d){failures.push(`Detailed Ch${n}: missing runtime study object`);continue;}
    if(normalizeTitle(d.title)!==normalizeTitle(primaryTitles[n-1]))failures.push(`Detailed study title mismatch Ch${n}`);
    if(typeof d.intro!=='string'||d.intro.length<30)failures.push(`Detailed Ch${n}: intro incomplete`);
    if(typeof d.centralIdea!=='string'||d.centralIdea.length<20)failures.push(`Detailed Ch${n}: central idea incomplete`);
    if(!Array.isArray(d.examFocus)||d.examFocus.length<4)failures.push(`Detailed Ch${n}: exam focus incomplete`);
    if(!Array.isArray(d.sections)||d.sections.length<4)failures.push(`Detailed Ch${n}: expected at least 4 sections`);
    for(const [i,s] of (d.sections||[]).entries()){
      if(!s?.anchor||!s?.explanation||!Array.isArray(s?.vocabulary)||s.vocabulary.length<3)failures.push(`Detailed Ch${n} section ${i+1}: incomplete`);
    }
  }
  for(let n=5;n<=13;n++){
    const d=SANSKRIT_PRIMARY_DETAILED_STUDY_5_8?.[n];
    if(!d){failures.push(`Detailed Ch${n}: missing runtime study object`);continue;}
    if(normalizeTitle(d.title)!==normalizeTitle(primaryTitles[n-1]))failures.push(`Detailed study title mismatch Ch${n}`);
    if(typeof d.intro!=='string'||d.intro.length<30)failures.push(`Detailed Ch${n}: intro incomplete`);
    if(typeof d.centralIdea!=='string'||d.centralIdea.length<20)failures.push(`Detailed Ch${n}: central idea incomplete`);
    if(!Array.isArray(d.examFocus)||d.examFocus.length<4)failures.push(`Detailed Ch${n}: exam focus incomplete`);
    if(!Array.isArray(d.sections)||d.sections.length<4)failures.push(`Detailed Ch${n}: expected at least 4 sections`);
    for(const [i,s] of (d.sections||[]).entries()){
      if(!s?.anchor||!s?.explanation||!Array.isArray(s?.vocabulary)||s.vocabulary.length<3)failures.push(`Detailed Ch${n} section ${i+1}: incomplete`);
    }
  }
}catch(error){failures.push(`Primary detailed-study runtime import failed: ${error.message}`)}

if(failures.length){console.error('SANSKRIT QA FAILED');for(const f of failures)console.error(`- ${f}`);process.exit(1);}
console.log('SANSKRIT QA PASSED: 15 primary + 21 supplementary chapters have valid assessment banks, detailed-study coverage through Ch13, balanced answers, and required study/UI wiring.');