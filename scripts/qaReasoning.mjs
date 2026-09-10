import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const hub=fs.readFileSync(path.join(root,'src','ReasoningHub.jsx'),'utf8');
const router=fs.readFileSync(path.join(root,'src','AppWithChapter5.jsx'),'utf8');
const css=fs.readFileSync(path.join(root,'src','reasoning-section.css'),'utf8');

const requiredIds=['number-series','alphabet-series','analogy','classification','coding-decoding','direction-blood'];
for(const id of requiredIds){if(!hub.includes(`id:'${id}'`))throw new Error(`Missing reasoning chapter: ${id}`)}
if((hub.match(/id:'/g)||[]).length<6)throw new Error('Reasoning chapter registry is incomplete.');
if(!hub.includes("import'./reasoning-section.css'"))throw new Error('Reasoning stylesheet is not imported.');
if(!router.includes("import ReasoningHub from'./ReasoningHub.jsx'"))throw new Error('ReasoningHub import is missing from router.');
if(!router.includes("get('subject')==='reasoning'"))throw new Error('Reasoning route guard is missing.');
if(!hub.includes("['practice','challenge','test'].includes(mode)"))throw new Error('Reasoning quiz mode guard is missing.');
if(!hub.includes('const shift=(seed+i)%q.options.length'))throw new Error('Reasoning option randomization is not deterministic.');
if(hub.includes('Math.random('))throw new Error('Reasoning must not use Math.random().');
if(!hub.includes('setScore(s=>s+1)'))throw new Error('Reasoning scoring hook is missing.');
if(!hub.includes('finishSession?.'))throw new Error('Reasoning session tracking hook is missing.');
if(!hub.includes('const finalScore=score+(finalCorrect?1:0)'))throw new Error('Final-question scoring guard is missing.');
for(const label of ['Practice','Challenge','Final Test'])if(!hub.includes(`<b>${label}</b>`))throw new Error(`Missing mode label: ${label}`);
if((hub.match(/make\(/g)||[]).length<64)throw new Error('Reasoning bank has fewer than 64 curated base questions.');
if(!hub.includes("const practice=base.slice(0,8);const challenge=base.slice(8,16)"))throw new Error('Chapter 1 practice/challenge split is missing.');
if(!hub.includes("[0,2,4,6,8,10,12,14,16,18,20,22]"))throw new Error('Chapter 1 final-test coverage is incomplete.');
if(!hub.includes('संख्या श्रृंखला कैसे हल करें'))throw new Error('Chapter 1 Learn lesson is missing.');
if(!hub.includes('1³, 2³, 3³, 4³'))throw new Error('Chapter 1 cube-pattern lesson content is missing.');
if(!css.includes('.reasoning-grid')||!css.includes('.quiz-card'))throw new Error('Reasoning UI styles are incomplete.');
console.log('Reasoning QA passed: six core topics, 64 curated base questions, completed Chapter 1 Learn/Practice/Challenge/Test flow, deterministic quiz logic, scoring guard, routing, progress hooks, and responsive styling are present.');
