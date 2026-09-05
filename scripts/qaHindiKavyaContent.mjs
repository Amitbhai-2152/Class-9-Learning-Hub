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

  if(n===9){
    const semanticAnchors=[
      ['सड़क पार करने से पहले','road-crossing opening is missing'],
      ['तेज रफ्तार से जाती गाड़ियाँ','fast-traffic context is missing'],
      ['न्याय व्यवस्था','judiciary theme is missing'],
      ['पुलिस अफसर','police theme is missing'],
      ['मंत्री की कार','ministerial-car theme is missing'],
      ['साइरन','siren detail is missing'],
      ['भारत के भविष्य','children-as-future message is missing']
    ];
    for(const [anchor,message] of semanticAnchors)if(!source.includes(anchor))failures.push(`p9: ${message}`);
  }
}

const registry=fs.readFileSync(path.join(root,'src','hindiStudyRegistry.js'),'utf8');
for(const n of ids)if(!registry.includes(`p${n}:{lesson:hindiPoetry${n}Lesson`))failures.push(`p${n}: missing registry entry`);

const section=fs.readFileSync(path.join(root,'src','HindiSubjectSection.jsx'),'utf8');
for(const n of ids){
  if(n<=8&&!section.includes(`p${n}:HindiPoetry${n}Learn`))failures.push(`p${n}: dedicated learner mapping missing`);
  if(n>=9&&!section.includes(`p${n}:HindiPoetryGenericLearn`))failures.push(`p${n}: generic learner mapping missing`);
}

if(failures.length){
  console.error('Kavya QA failed:');
  for(const failure of failures)console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Kavya QA passed: p1–p12 have engine files, lesson exports, assessment exports, registry wiring, learner mappings, and p9 semantic anchors.');
