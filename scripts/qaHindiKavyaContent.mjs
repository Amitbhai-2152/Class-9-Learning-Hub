import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const ids=Array.from({length:12},(_,i)=>i+1);
const failures=[];

for(const n of ids){
  const file=path.join(root,'src',`hindiPoetry${n}Engine.js`);
  if(!fs.existsSync(file)){
    failures.push(`p${n}: engine file missing`);
    continue;
  }
  const source=fs.readFileSync(file,'utf8');
  const required=[
    `hindiPoetry${n}Lesson`,
    `hindiPoetry${n}PracticeQuestions`,
    `hindiPoetry${n}TestQuestions`,
    n===8?'hindiPoetry8ChallengeQuestions':`hindiPoetry${n}Challenge`
  ];
  for(const name of required)if(!source.includes(`export const ${name}`))failures.push(`p${n}: missing export ${name}`);
  const sectionCount=(source.match(/\{title:/g)||[]).length;
  const questionCount=(source.match(/q\(/g)||[]).length;
  if(sectionCount<8)failures.push(`p${n}: only ${sectionCount} lesson sections found`);
  if(questionCount<20)failures.push(`p${n}: only ${questionCount} question definitions found`);
}

const registry=fs.readFileSync(path.join(root,'src','hindiStudyRegistry.js'),'utf8');
for(const n of ids)if(!registry.includes(`p${n}:{lesson:hindiPoetry${n}Lesson`))failures.push(`p${n}: missing registry entry`);

const section=fs.readFileSync(path.join(root,'src','HindiSubjectSection.jsx'),'utf8');
for(const n of ids)if(!section.includes(`p${n}:HindiPoetry${n}Learn`)&&n<=8)failures.push(`p${n}: dedicated learner mapping missing`);
if(!section.includes("const internalNavigatorTopics=new Set(['p1','p2','p3','p4','p5','p6','p7','p8'])"))failures.push('Kavya internal navigator baseline changed unexpectedly');

if(failures.length){
  console.error('Kavya QA failed:');
  for(const failure of failures)console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Kavya QA passed: p1–p12 have engine files, lesson exports, assessment exports, registry wiring, and baseline learner mappings.');
