import {readFileSync} from 'node:fs';

const registry=readFileSync(new URL('../src/sanskrit/sanskritChapterRegistry.js',import.meta.url),'utf8');
const content=readFileSync(new URL('../src/sanskrit/sanskritPrimaryContent.js',import.meta.url),'utf8');
const wrapper=readFileSync(new URL('../src/sanskrit/SanskritSubjectSection.jsx',import.meta.url),'utf8');
const hub=readFileSync(new URL('../src/sanskrit/SanskritSubjectHub.jsx',import.meta.url),'utf8');
const engine=`${wrapper}\n${hub}`;

const primaryTitles=[
'ईशस्तुति:','लोभविष्टः चक्रधरः','यक्ष-युधिष्ठिर संवाद','चत्वारो वेदाः','संस्कृतस्य महिमा','संस्कृतसाहित्ये पर्यावरणम्','ज्ञानं भारः क्रियां विना','नीतिपधानिः','बिहारस्य संस्कृतिकं वैभवम्','ईद-महोत्सवः','ग्राम्यजीवनम्','वीर कूँवर सिंहः','किशोराणां मनोविज्ञानम्','राष्ट्रबोधः','विश्ववन्दिता वैशाली'
];

const failures=[];
const count=(text,needle)=>text.split(needle).length-1;
if(!registry.includes('SANSKRIT_PRIMARY_CHAPTERS'))failures.push('Primary registry export missing');
if(!registry.includes('SANSKRIT_SUPPLEMENTARY_CHAPTERS'))failures.push('Supplementary registry export missing');
if(count(registry,"status:'planned'")<14)failures.push('Expected 14 planned primary chapter markers');
for(const title of primaryTitles)if(!registry.includes(`title:'${title}'`))failures.push(`Registry chapter missing: ${title}`);
for(let i=1;i<=15;i++){
 if(!content.includes(`  ${i}:{`))failures.push(`Structured content missing for chapter ${i}`);
}
if(!engine.includes('export function SanskritSubjectSection') && !engine.includes('export {SanskritSubjectSection'))failures.push('Subject section export missing');
if(!engine.includes('export function SanskritChapterEngine') && !engine.includes('export {SanskritSubjectSection,SanskritChapterEngine}'))failures.push('Chapter engine export missing');
for(const token of ['सीखें','अभ्यास','चुनौती','फाइनल टेस्ट','Subjective'])if(!engine.includes(token))failures.push(`Engine mode missing: ${token}`);
if(!hub.includes('SanskritGrammarLab'))failures.push('Grammar Lab integration missing');
if(failures.length){console.error('SANSKRIT QA FAILED');for(const failure of failures)console.error(`- ${failure}`);process.exit(1)}
console.log('SANSKRIT QA PASSED: 15 primary chapters, canonical engine exports/modes, and Grammar Lab integration verified.');
