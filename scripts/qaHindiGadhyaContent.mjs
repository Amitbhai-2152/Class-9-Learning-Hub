import {hindiStudyRegistry} from '../src/hindiStudyRegistry.js';

const chapters=['g1','g2','g3','g4','g5','g6'];
const requirements={practice:15,challenge:12,test:20};
const failures=[];

function checkQuestions(chapter,mode,questions){
  if(!Array.isArray(questions)||questions.length<requirements[mode]){
    failures.push(`${chapter}/${mode}: expected at least ${requirements[mode]} questions, found ${Array.isArray(questions)?questions.length:0}`);
    return;
  }
  questions.slice(0,requirements[mode]).forEach((item,index)=>{
    if(!item||typeof item.q!=='string'||item.q.trim().length<12) failures.push(`${chapter}/${mode} Q${index+1}: question text is too short`);
    if(!Array.isArray(item.options)||item.options.length<4) failures.push(`${chapter}/${mode} Q${index+1}: expected 4 options`);
    if(!Number.isInteger(Number(item.answer))||Number(item.answer)<0||Number(item.answer)>=item.options.length) failures.push(`${chapter}/${mode} Q${index+1}: invalid answer index`);
    if(typeof item.explain!=='string'||item.explain.trim().length<18) failures.push(`${chapter}/${mode} Q${index+1}: explanation is missing or too short`);
  });
}

for(const chapter of chapters){
  const pack=hindiStudyRegistry[chapter];
  if(!pack){failures.push(`${chapter}: missing study registry entry`);continue;}
  if(!pack.lesson||typeof pack.lesson.title!=='string') failures.push(`${chapter}/learn: missing lesson title`);
  if(!Array.isArray(pack.lesson?.sections)||pack.lesson.sections.length<10) failures.push(`${chapter}/learn: expected at least 10 structured sections`);
  for(const mode of Object.keys(requirements)) checkQuestions(chapter,mode,pack[mode]);
}

if(failures.length){
  console.error('Hindi gadhya content QA failed:');
  failures.forEach(item=>console.error(`- ${item}`));
  process.exit(1);
}

console.log('Hindi gadhya content QA passed: g1-g6 have structured Learn content and complete Practice/Challenge/Test banks.');
