import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const v2=fs.readFileSync(path.join(root,'src','ReasoningLabV2.jsx'),'utf8');
const router=fs.readFileSync(path.join(root,'src','AppWithChapter5.jsx'),'utf8');
const css=fs.readFileSync(path.join(root,'src','reasoning-lab-v2.css'),'utf8');
const ids=['number-series','alphabet-series','analogy','classification','coding-decoding','direction-blood'];
for(const id of ids){if(!v2.includes(`id:'${id}'`))throw new Error(`Missing V2 chapter: ${id}`)}
if(!router.includes("import ReasoningHub from'./ReasoningLabV2.jsx'"))throw new Error('V2 Reasoning import is missing from router.');
if(!router.includes("get('subject')==='reasoning'"))throw new Error('Reasoning route guard is missing.');
if(!v2.includes("const banks={'number-series':numberBank,'alphabet-series':alphabetBank,'analogy':analogyBank,'classification':classificationBank,'coding-decoding':codingBank,'direction-blood':directionBank};"))throw new Error('Reasoning bank registry is invalid.');
if(!v2.includes('const prepare=(bank,count)'))throw new Error('Reasoning quiz preparation is missing.');
if(!v2.includes('shuffle(q.options.map'))throw new Error('Randomized options are missing.');
if(!v2.includes('setTimeLeft(15*60)'))throw new Error('15-minute timer is missing.');
if(!v2.includes('prepare(bank,25)'))throw new Error('25-question final test is missing.');
if(!v2.includes('setCompleted(true)'))throw new Error('Test result completion state is missing.');
if(!css.includes('.rlab-tabs')||!css.includes('.countdown'))throw new Error('Reasoning V2 styles are incomplete.');
console.log('Reasoning V2 QA passed.');
