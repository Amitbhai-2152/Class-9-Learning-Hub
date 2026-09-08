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
assert(poem.includes('stanzas:['),'stanza data missing');
assert(count(poem,"{title:'Stanza 1")===1,'Stanza 1 data missing');
assert(count(poem,"{title:'Stanza 2")===1,'Stanza 2 data missing');
assert(count(poem,"{title:'Stanza 3")===1,'Stanza 3 data missing');
assert(poem.includes("range:'Stanza 1'"),'Stanza 1 label missing');
assert(poem.includes("range:'Stanza 2'"),'Stanza 2 label missing');
assert(poem.includes("range:'Stanza 3'"),'Stanza 3 label missing');
assert(count(poem,'poemLines:[')===3,'expected exactly 3 actual poem stanza blocks');
assert(poem.includes("poemLines:['If I were to see her shape'"),'Stanza 1 opening line must be preserved');
assert(poem.includes("poemLines:['If I felt'"),'Stanza 2 opening line must be preserved');
assert(poem.includes("poemLines:['If I heard'"),'Stanza 3 opening line must be preserved');
assert(poem.includes("'and the plastic shopping bag'"),'Stanza 1 final line must be preserved');
assert(poem.includes("'with the smell of roots.'"),'Stanza 2 final line must be preserved');
assert(poem.includes("'from a sleeping fire at night'"),'Stanza 3 final line must be preserved');
assert(poem.includes('poem-actual-stanza'),'actual stanza block rendering missing');
assert(poem.includes('SIMPLE EXPLANATION'),'simple stanza explanation missing');
assert(poem.includes('VOCABULARY'),'stanza vocabulary heading missing');
assert(poem.includes('stanza.vocab'),'stanza-level vocabulary rendering missing');
for(const required of ['STANZA-BY-STANZA','Actual stanza → simple explanation → vocabulary','POETRY TOOLKIT','POETIC DEVICES','WORDS TO KNOW','THEMES','TEXTBOOK QUICK ANSWERS','sight','touch','smell','hearing','Simile','Imagery','damp','ashes','purple scarf','plastic shopping bag',"const practice=[","const challenge=[","const finalTest=[...practice.slice(0,10),...challenge.slice(0,10)]","function Learn({onMode})","<PanoramaTimedQuiz mode={mode} title={poem.title}","← Exit Poetry"])assert(poem.includes(required),`missing required poetry feature/content: ${required}`);

function checkBank(segment,name,expected){
  const n=count(segment,'q(');
  assert(n===expected,`${name}: expected ${expected} questions, got ${n}`);
  const records=[...segment.matchAll(/q\([^,]+,\[(.*?)\],\d+,'[^']*','[^']*'\)/g)];
  assert(records.length===expected,`${name}: expected ${expected} complete question records, got ${records.length}`);
  for(const [i,m] of records.entries()){
    const items=[...m[1].matchAll(/'([^']*)'/g)].map(x=>x[1]);
    assert(items.length===4,`${name}: question ${i+1} must have exactly 4 options`);
    assert(new Set(items).size===4,`${name}: question ${i+1} has duplicate options`);
  }
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

console.log('English poetry QA passed: The Grandmother has 3 explicit actual stanza blocks, stanza explanations, stanza vocabulary, poetry learning tools, timed banks, option integrity, shared timed engine, navigation and App routing.');
