import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const assert=(v,m)=>{if(!v)throw new Error(`English poetry QA: ${m}`)};
const count=(s,n)=>(s.match(new RegExp(n.replace(/[.*+?^${}()|[\\]\\]/g,'\\$&'),'g'))||[]).length;

const poem=read('src/english/EnglishPanoramaPoem1.jsx');
const nav=read('src/english/EnglishSubjectSection.jsx');
const shell=read('src/AppWithChapter5.jsx');
const engine=read('src/english/PanoramaTimedQuiz.jsx');

assert(fs.existsSync(path.join(root,'src/english/EnglishPanoramaPoem1.jsx')),'poetry component missing');
assert(poem.includes("title:'The Grandmother'"),'poem title missing');
assert(poem.includes("poet:'Ray Young Bear'"),'poet missing');
assert(poem.includes('The Panorama • Poetry Chapter 1'),'book/chapter marker missing');
assert(poem.includes('const lines:['),'complete poem line array missing');
assert(count(poem,"['")>=26,'expected the complete poem line mappings');
assert(poem.includes('const stanzas:['),'stanza map missing');
assert(count(poem,"{title:'Stanza ")===3,'expected 3 stanza cards');
for(const required of [
  'COMPLETE POEM','Every line with the simplest explanation','POETRY TOOLKIT','POETIC DEVICES','WORDS TO KNOW','THEMES','TEXTBOOK QUICK ANSWERS',
  'sensory','sight','touch','smell','hearing','Simile','Imagery','Symbolism','damp','ashes','purple scarf','plastic shopping bag',
  "const practice=[","const challenge=[","const finalTest=[...practice.slice(0,10),...challenge.slice(0,10)]",
  "function Learn({onMode})","<PanoramaTimedQuiz mode={mode} title={poem.title}","← Exit Poetry"
])assert(poem.includes(required),`missing required poetry feature/content: ${required}`);

function checkBank(segment,name,expected){
  const n=count(segment,'q(');
  assert(n===expected,`${name}: expected ${expected} questions, got ${n}`);
  const arrays=segment.match(/\['[^\n]+\]/g)||[];
  assert(arrays.length>=expected,`${name}: option arrays appear incomplete`);
  for(const [i,a] of arrays.entries()){
    const items=[...a.matchAll(/'([^']*)'/g)].map(x=>x[1]);
    assert(items.length===4,`${name}: question ${i+1} must have exactly 4 options`);
    assert(new Set(items).size===4,`${name}: question ${i+1} has duplicate options`);
  }
  assert((segment.match(/,\d+,'.*?','[^']*','[^']*'\)/g)||[]).length>=expected,`${name}: answer/explanation records appear incomplete`);
}

const practice=poem.match(/const practice=\[(.*?)\];/s)?.[1]||'';
const challenge=poem.match(/const challenge=\[(.*?)\];/s)?.[1]||'';
checkBank(practice,'Practice',15);
checkBank(challenge,'Challenge',23);
assert(poem.includes("const finalTest=[...practice.slice(0,10),...challenge.slice(0,10)];"),'Final Test must contain 20 questions from the verified banks');

assert(nav.includes("const panoramaPoetry=['The Grandmother'"),'Grandmother poetry entry missing');
assert(nav.includes("const poetryMatch=chapter.match(/^Panorama • Poetry"),'poetry navigation parser missing');
assert(nav.includes("if(poetry===1)"),'Poetry Chapter 1 route missing');
assert(nav.includes("params.set('panoramaPoetry1','1')"),'Poetry Chapter 1 runtime flag missing');
assert(shell.includes("import {EnglishPanoramaPoem1} from './english/EnglishPanoramaPoem1.jsx';"),'Poetry component import missing');
assert(shell.includes("if(p.get('panoramaPoetry1')==='1')return 17;"),'Poetry Chapter 1 flag route missing');
assert(shell.includes("if(Number.isInteger(n)&&n===17)return 17"),'Poetry Chapter 1 chapter route missing');
assert(shell.includes("if(chapter===17)return <EnglishPanoramaPoem1"),'Poetry Chapter 1 render route missing');

for(const marker of ['function shuffleQuestion','sourceIndex','allAnswered=','disabled={!allAnswered}','setSubmitted(true)','Your answer','Correct answer','score','pct'])assert(engine.includes(marker),`shared timed engine marker missing: ${marker}`);

console.log('English poetry QA passed: The Grandmother source structure, 26 line entries with explanations, 3-stanza teaching map, poetry-specific toolkit, textbook quick answers, timed banks, option integrity, shared quiz engine, navigation and App routing are covered.');
