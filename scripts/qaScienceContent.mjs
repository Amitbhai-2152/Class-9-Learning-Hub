import fs from 'node:fs';
import path from 'node:path';

const SRC=path.resolve('src');
const files=fs.readdirSync(SRC).filter(name=>/^scienceChapter\d+Learning\.js$/.test(name)).sort((a,b)=>Number(a.match(/\d+/)[0])-Number(b.match(/\d+/)[0]));
const failures=[];
const report=[];

function extractQuestionObjects(source){
  const objects=[];
  let cursor=0;
  while(true){
    const hit=source.indexOf('question:',cursor);
    if(hit<0)break;
    let start=source.lastIndexOf('{',hit);
    while(start>0&&source[start-1]==='\\')start--;
    let depth=0,inString=false,quote='',escaped=false,end=-1;
    for(let i=start;i<source.length;i++){
      const ch=source[i];
      if(inString){
        if(escaped)escaped=false;
        else if(ch==='\\')escaped=true;
        else if(ch===quote)inString=false;
        continue;
      }
      if(ch==='"'||ch==="'"){inString=true;quote=ch;continue;}
      if(ch==='{')depth++;
      if(ch==='}'){
        depth--;
        if(depth===0){end=i+1;break;}
      }
    }
    if(end>start)objects.push(source.slice(start,end));
    cursor=Math.max(hit+9,end);
  }
  return objects;
}

function countArrayItems(text){
  const items=[];
  let start=0,depth=0,inString=false,quote='',escaped=false;
  for(let i=0;i<text.length;i++){
    const ch=text[i];
    if(inString){
      if(escaped)escaped=false;
      else if(ch==='\\')escaped=true;
      else if(ch===quote)inString=false;
      continue;
    }
    if(ch==='"'||ch==="'"){inString=true;quote=ch;continue;}
    if(ch==='[')depth++;
    else if(ch===']')depth--;
    else if(ch===','&&depth===0)items.push(text.slice(start,i).trim());
  }
  if(text.trim())items.push(text.slice(start).trim());
  return items.filter(Boolean);
}

for(const file of files){
  const full=path.join(SRC,file);
  const source=fs.readFileSync(full,'utf8');
  const chapter=Number(file.match(/\d+/)[0]);
  const lessonMatches=[...source.matchAll(/\{type:\s*['\"][^'\"]+['\"],title:\s*['\"][^'\"]+['\"]/g)];
  const bodyCount=(source.match(/body:\s*['\"]/g)||[]).length;
  const visuals=(source.match(/visual:\s*\{/g)||[]).length;
  if(!source.includes('lessons:['))failures.push(`${file}: missing lessons array`);
  if(lessonMatches.length<8)failures.push(`${file}: suspiciously few lesson objects (${lessonMatches.length})`);
  if(bodyCount<8)failures.push(`${file}: suspiciously few lesson bodies (${bodyCount})`);

  const questions=extractQuestionObjects(source);
  let badQuestions=0;
  for(const object of questions){
    const optionMatch=object.match(/options:\s*\[((?:.|\n)*?)\]\s*,?\s*answer:\s*(-?\d+)/);
    const answerMatch=object.match(/answer:\s*(-?\d+)/);
    if(!answerMatch)continue;
    if(!optionMatch){badQuestions++;failures.push(`${file}: question object missing options before answer`);continue;}
    const options=countArrayItems(optionMatch[1]);
    const answer=Number(answerMatch[1]);
    if(options.length<2||answer<0||answer>=options.length){
      badQuestions++;
      failures.push(`${file}: invalid answer index ${answer} for ${options.length} options`);
    }
  }
  report.push(`Ch${chapter}: lessons=${lessonMatches.length}, bodies=${bodyCount}, visuals=${visuals}, questionObjects=${questions.length}, badQuestions=${badQuestions}`);
}

if(files.length!==15)failures.push(`expected 15 science learning files, found ${files.length}`);

console.log(report.join('\n'));
if(failures.length){
  console.error('\nScience content QA failures:');
  for(const failure of failures)console.error(`- ${failure}`);
  process.exit(1);
}
console.log('\nScience content QA passed.');
