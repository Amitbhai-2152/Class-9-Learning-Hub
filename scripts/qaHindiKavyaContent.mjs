import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

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
  if(sectionCount<8)failures.push(`p${n}: only ${sectionCount} lesson sections found`);

  try{
    const mod=await import(`${pathToFileURL(file).href}?qa=${n}`);
    const bankNames=[
      `hindiPoetry${n}PracticeQuestions`,
      n===8?'hindiPoetry8ChallengeQuestions':`hindiPoetry${n}Challenge`,
      `hindiPoetry${n}TestQuestions`
    ];
    for(const name of bankNames){
      const bank=mod[name];
      if(!Array.isArray(bank)){
        failures.push(`p${n}: ${name} is not an array`);
        continue;
      }
      if(bank.length<20)failures.push(`p${n}: ${name} has only ${bank.length} questions`);
      bank.forEach((item,index)=>{
        const q=Array.isArray(item)?item[0]:item?.q;
        const options=Array.isArray(item)?item[1]:item?.options;
        const answer=Array.isArray(item)?item[2]:item?.answer;
        if(typeof q!=='string'||!q.trim())failures.push(`p${n}: ${name}[${index}] has invalid question text`);
        if(!Array.isArray(options)||options.length<2)failures.push(`p${n}: ${name}[${index}] has invalid options`);
        if(!Number.isInteger(answer)||answer<0||answer>=options.length)failures.push(`p${n}: ${name}[${index}] has invalid answer index`);
      });
    }
  }catch(error){
    failures.push(`p${n}: engine import failed: ${error?.message||error}`);
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

console.log('Kavya QA passed: p1–p12 have valid lesson sections, runtime-valid Practice/Challenge/Test banks, registry wiring, and learner mappings.');
