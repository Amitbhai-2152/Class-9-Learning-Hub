import fs from 'node:fs';

const file='src/sanskrit/SanskritGrammarLab.jsx';
const source=fs.readFileSync(file,'utf8');
const required=[
  'वचन एवं धातुरूप',
  'कारक-विभक्ति',
  'उपसर्ग',
  'प्रत्यय',
  'संधि',
  'समास',
  'अव्यय',
  'शब्द-रूप पहचान'
];
const missing=required.filter(topic=>!source.includes(topic));
const questionCount=(source.match(/\{level:'/g)||[]).length;
if(missing.length) throw new Error(`Missing grammar topics: ${missing.join(', ')}`);
if(questionCount<64) throw new Error(`Expected at least 64 grammar questions, found ${questionCount}`);
for(const token of ['SanskritGrammarLab','TopicQuiz','उत्तर जाँचें']) {
  if(!source.includes(token)) throw new Error(`Missing grammar UI token: ${token}`);
}
const questionBlocks=[...source.matchAll(/\{level:'([^']+)',q:'([^']+)',options:\[([^\]]+)\],answer:(\d+),explain:'([^']+)'\}/g)];
if(questionBlocks.length<64) throw new Error(`Expected 64 parseable grammar question blocks, found ${questionBlocks.length}`);
for(const [,level,q,options,answer,explain] of questionBlocks) {
  const optionCount=(options.match(/'[^']*'/g)||[]).length;
  const answerIndex=Number(answer);
  if(!['आसान','मध्यम','कठिन','चुनौती'].includes(level)) throw new Error(`Invalid question level for: ${q}`);
  if(optionCount!==4) throw new Error(`Question must have 4 options: ${q}`);
  if(answerIndex<0 || answerIndex>3) throw new Error(`Invalid answer index for: ${q}`);
  if(explain.trim().length<12) throw new Error(`Explanation too short for: ${q}`);
}
console.log(`Sanskrit Grammar QA passed: ${required.length} topics, ${questionBlocks.length} structured questions`);
