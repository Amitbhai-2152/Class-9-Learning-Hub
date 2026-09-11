import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const read=name=>fs.readFileSync(path.join(root,'src',name),'utf8');
const v2=read('ReasoningLabV2.jsx');
const router=read('AppWithChapter5.jsx');
const css=read('reasoning-lab-v2.css');

const ids=['number-series','alphabet-series','analogy','classification','coding-decoding','direction-blood'];
for(const id of ids){
  if(!v2.includes(`id:'${id}'`)) throw new Error(`Missing canonical Reasoning chapter: ${id}`);
}
if(!router.includes("import ReasoningHub from'./ReasoningLabV2.jsx'")) throw new Error('Canonical Reasoning import is missing from router.');
if(!router.includes("get('subject')==='reasoning'")) throw new Error('Reasoning route guard is missing.');
if(!v2.includes("const banks={'number-series':numberBank,'alphabet-series':alphabetBank,'analogy':analogyBank,'classification':classificationBank,'coding-decoding':codingBank,'direction-blood':directionBank};")) throw new Error('Reasoning bank registry is invalid.');
if(!v2.includes("const prepare=(bank,count,mode='practice')=>")) throw new Error('Mode-aware quiz preparation is missing.');
if(!v2.includes('shuffle(q.options.map')) throw new Error('Randomized options are missing.');
if(!v2.includes('practice:{minutes:15,perQuestion:45}')) throw new Error('Practice timer is missing.');
if(!v2.includes('challenge:{minutes:20,perQuestion:60}')) throw new Error('Challenge timer is missing.');
if(!v2.includes('test:{minutes:30,perQuestion:60}')) throw new Error('Final-test timer is missing.');
if(!v2.includes("prepare(bank,30,'test')")) throw new Error('30-question final test is missing.');
if(!v2.includes('setCompleted(true)')) throw new Error('Test result completion state is missing.');
if(!css.includes('.rlab-tabs')||!css.includes('.countdown')) throw new Error('Reasoning V2 styles are incomplete.');

const retired=[
  'ReasoningSection.jsx',
  'reasoning-section.css'
];
for(const name of retired){
  if(fs.existsSync(path.join(root,'src',name))) throw new Error(`Retired duplicate Reasoning file still exists: ${name}`);
}
for(const file of [
  path.join(root,'reasoning-visible-upgrade.js'),
  path.join(root,'public','reasoning-visible-upgrade.js')
]){
  if(fs.existsSync(file)) throw new Error(`Retired Reasoning DOM patch still exists: ${path.relative(root,file)}`);
}

console.log('Canonical Reasoning V2 QA passed.');
