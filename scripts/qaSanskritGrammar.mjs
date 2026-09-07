import fs from 'node:fs';

const file='src/sanskrit/SanskritGrammarLab.jsx';
const source=fs.readFileSync(file,'utf8');
const required=['वचन एवं रूप','कारक-विभक्ति','उपसर्ग','प्रत्यय','संधि','समास'];
const missing=required.filter(topic=>!source.includes(topic));
const questionCount=(source.match(/\{q:'/g)||[]).length;
if(missing.length) throw new Error(`Missing grammar topics: ${missing.join(', ')}`);
if(questionCount<12) throw new Error(`Expected at least 12 grammar questions, found ${questionCount}`);
for(const token of ['SanskritGrammarLab','TopicQuiz','उत्तर जाँचें']) if(!source.includes(token)) throw new Error(`Missing grammar UI token: ${token}`);
console.log(`Sanskrit Grammar QA passed: ${required.length} topics, ${questionCount} questions`);
