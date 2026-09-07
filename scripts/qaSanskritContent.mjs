import {readFileSync} from 'node:fs';

const registry=readFileSync(new URL('../src/sanskrit/sanskritChapterRegistry.js',import.meta.url),'utf8');
const content=readFileSync(new URL('../src/sanskrit/sanskritPrimaryContent.js',import.meta.url),'utf8');
const supplementary=readFileSync(new URL('../src/sanskrit/sanskritSupplementaryContent.js',import.meta.url),'utf8');
const runtime=readFileSync(new URL('../src/sanskrit/sanskritSupplementaryRuntime.js',import.meta.url),'utf8');
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
if(!supplementary.includes('export const SANSKRIT_SUPPLEMENTARY_CONTENT'))failures.push('Supplementary content export missing');
if(count(supplementary,"q(`")<21*15)failures.push('Supplementary practice/question source coverage unexpectedly small');
if(!runtime.includes('SANSKRIT_SUPPLEMENTARY_RUNTIME_CONTENT'))failures.push('Supplementary runtime export missing');
if(!runtime.includes('getSanskritSupplementaryContent'))failures.push('Supplementary getter missing');
if(!runtime.includes('balanceQuestions'))failures.push('Balanced answer-key runtime missing');
if(!runtime.includes('lessons:chapter.concepts.map'))failures.push('Supplementary lesson enrichment missing');
if(!hub.includes("getSanskritSupplementaryContent from './sanskritSupplementaryRuntime'"))failures.push('Supplementary runtime not wired to engine');
if(!hub.includes('book="supplementary"'))failures.push('Supplementary chapter route missing');
if(!engine.includes('SanskritSubjectSection'))failures.push('Subject section symbol missing');
if(!engine.includes('SanskritChapterEngine'))failures.push('Chapter engine symbol missing');
for(const token of ['सीखें','अभ्यास','चुनौती','फाइनल टेस्ट','Subjective'])if(!engine.includes(token))failures.push(`Engine mode missing: ${token}`);
if(!wrapper.includes("from './SanskritSubjectHub'"))failures.push('Subject wrapper path missing');
if(failures.length){console.error('SANSKRIT QA FAILED');for(const failure of failures)console.error(`- ${failure}`);process.exit(1)}
console.log('SANSKRIT QA PASSED: 15 primary + 21 supplementary chapters are registered; supplementary track has full learning and assessment banks and is wired to the shared engine.');
