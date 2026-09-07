import {ECONOMICS_CHAPTERS,getEconomicsChapter} from '../src/sst/economicsData.js';
import {normalizeEconomicsChapter} from '../src/sst/economicsContentQuality.js';

const EXPECTED={
1:'बिहार के एक गाँव की कहानी',2:'मानव एक संसाधन',3:'गरीबी',4:'बेकारी',5:'कृषि, खाद्यान्न सुरक्षा एवं गुणवत्ता',6:'कृषक मजदूर'
};
const fail=[];
const assert=(ok,msg)=>{if(!ok)fail.push(msg)};
const qText=x=>x?.q||'';
for(const n of Object.keys(EXPECTED).map(Number)){
 const base=ECONOMICS_CHAPTERS[n],d=normalizeEconomicsChapter(getEconomicsChapter(n));
 assert(base?.title===EXPECTED[n],`Ch${n}: title mismatch`);
 assert(d?.lessons.length===15,`Ch${n}: lessons=${d?.lessons.length}`);
 assert(d?.practice.length===15,`Ch${n}: practice=${d?.practice.length}`);
 assert(d?.challenge.length===12,`Ch${n}: challenge=${d?.challenge.length}`);
 assert(d?.finalTest.length===20,`Ch${n}: final=${d?.finalTest.length}`);
 assert(d?.subjective.easy.length===5,`Ch${n}: easy subjective=${d?.subjective.easy.length}`);
 assert(d?.subjective.hard.length===5,`Ch${n}: hard subjective=${d?.subjective.hard.length}`);
 assert(d?.subjective.challenger.length===5,`Ch${n}: challenger subjective=${d?.subjective.challenger.length}`);
 assert(d?.topics.length===15,`Ch${n}: topics=${d?.topics.length}`);
 for(const [name,bank] of [['practice',d.practice],['challenge',d.challenge],['finalTest',d.finalTest]]){
   const qs=bank.map(qText);assert(new Set(qs).size===qs.length,`Ch${n} ${name}: duplicate questions`);
   bank.forEach((q,i)=>assert(Array.isArray(q.options)&&q.options.length===4,`Ch${n} ${name}[${i}]: options!=4`));
   bank.forEach((q,i)=>assert(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<q.options.length,`Ch${n} ${name}[${i}]: invalid answer index`));
   bank.forEach((q,i)=>assert((q.explanation||'').trim().length>=20,`Ch${n} ${name}[${i}]: explanation too short`));
 }
 const lessonTitles=d.lessons.map(x=>x.title);assert(new Set(lessonTitles).size===15,`Ch${n}: duplicate lesson titles`);
 d.lessons.forEach((x,i)=>assert(x.summary&&x.summary.length>45,`Ch${n} lesson ${i+1}: summary too short`));
 d.lessons.forEach((x,i)=>assert(Array.isArray(x.points)&&x.points.length===3,`Ch${n} lesson ${i+1}: points!=3`));
 for(const k of ['easy','hard','challenger'])d.subjective[k].forEach((x,i)=>assert(x.q&&x.answer&&x.q.length>35,`Ch${n} ${k}[${i+1}]: weak subjective entry`));
}
if(fail.length){console.error(fail.join('\n'));process.exit(1)}
console.log('Economics content QA passed: 6 chapters; each has 15 lessons, 15 practice, 12 challenge, 20 final-test, and 15 subjective questions (5/5/5).');
console.log('Checks passed: chapter scope, unique lesson titles, 4-option banks, valid answer keys, explanation depth, and substantive subjective guidance.');
