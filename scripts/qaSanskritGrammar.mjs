import fs from 'node:fs';
import {SANSKRIT_GRAMMAR_UNITS} from '../src/sanskrit/sanskritGrammarRuntime.mjs';

const component='src/sanskrit/SanskritGrammarLab.jsx';
const source=fs.readFileSync(component,'utf8');
const expected=[
  'शब्दरूप','सर्वनामरूप','धातुरूप — लट्','लोट् एवं विधिलिङ्','कारक एवं उपपद-विभक्ति',
  'उपसर्ग','प्रत्यय','सन्धि','समास','अव्यय','संख्या, अनुवाद, रचना एवं अपठित-बोध'
];
if(SANSKRIT_GRAMMAR_UNITS.length!==11) throw new Error(`Expected 11 grammar syllabus units, found ${SANSKRIT_GRAMMAR_UNITS.length}`);
const titles=SANSKRIT_GRAMMAR_UNITS.map(u=>u.title);
const missing=expected.filter(x=>!titles.includes(x));
if(missing.length) throw new Error(`Missing syllabus units: ${missing.join(', ')}`);
const total=SANSKRIT_GRAMMAR_UNITS.reduce((n,u)=>n+u.questions.length,0);
if(total!==165) throw new Error(`Expected 165 grammar MCQs, found ${total}`);
for(const unit of SANSKRIT_GRAMMAR_UNITS){
  if(unit.questions.length!==15) throw new Error(`${unit.title} must have exactly 15 MCQs`);
  if(unit.subtopics.length<5||unit.method.length<3||unit.mistakes.length<3||unit.tips.length<3) throw new Error(`Study depth is too shallow for ${unit.title}`);
  for(const q of unit.questions){
    if(!['आसान','मध्यम','कठिन','चुनौती'].includes(q.level)) throw new Error(`Invalid level in ${unit.title}: ${q.q}`);
    if(!Array.isArray(q.options)||q.options.length!==4||new Set(q.options).size!==4) throw new Error(`Question must have 4 unique options: ${q.q}`);
    if(!Number.isInteger(q.answer)||q.answer<0||q.answer>3) throw new Error(`Invalid answer index: ${q.q}`);
    if(typeof q.explain!=='string'||q.explain.trim().length<12) throw new Error(`Explanation too short: ${q.q}`);
  }
}
const vachan= SANSKRIT_GRAMMAR_UNITS.find(u=>u.id==='sarvanama');
if(!vachan) throw new Error('Missing सर्वनामरूप unit for semantic guard');
const hasCorrectFeminineDual=vachan.questions.some(q=>q.options.includes('सा')&&q.options.includes('ते')&&q.options.includes('ताः'));
if(!hasCorrectFeminineDual) throw new Error('Missing semantic coverage for feminine dual सर्वनाम');
if(!source.includes("./sanskritGrammarRuntime.mjs")) throw new Error('Grammar Lab must use normalized runtime dataset');
for(const token of ['SanskritGrammarLab','Syllabus Map','15 उत्तर जाँचें','Board Exam Tips','Revision Route']){
  if(!source.includes(token)) throw new Error(`Missing Grammar Lab UI token: ${token}`);
}
console.log(`Sanskrit Grammar QA passed: ${SANSKRIT_GRAMMAR_UNITS.length} syllabus units, ${total} MCQs (15/unit), normalized options, deep-study metadata and semantic guards verified`);
