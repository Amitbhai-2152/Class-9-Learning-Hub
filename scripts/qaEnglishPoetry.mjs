import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const assert=(v,m)=>{if(!v)throw new Error(`English poetry QA: ${m}`)};
const count=(s,re)=>[...s.matchAll(re)].length;

const nav=read('src/english/EnglishSubjectSection.jsx');
const shell=read('src/AppWithChapter5.jsx');
const engine=read('src/english/PanoramaTimedQuiz.jsx');

function checkBank(segment,name,expected){
  assert(count(segment,/q\('/g)===expected,`${name}: expected ${expected} questions`);
  const records=[...segment.matchAll(/q\('([^']*)',\[(.*?)\],(\d+),'([^']*)'\)/g)];
  assert(records.length===expected,`${name}: expected ${expected} complete question records, got ${records.length}`);
  for(const [i,m] of records.entries()){
    const options=[...m[2].matchAll(/'([^']*)'/g)].map(x=>x[1]);
    assert(options.length===4,`${name}: question ${i+1} must have exactly 4 options`);
    assert(new Set(options).size===4,`${name}: question ${i+1} has duplicate options`);
    const answer=Number(m[3]);
    assert(Number.isInteger(answer)&&answer>=0&&answer<4,`${name}: question ${i+1} has invalid answer index`);
  }
}

function checkPoem({path:titlePath,title,poet,chapter,stanzas,requiredLines=[],requiredFeatures=[]}){
  assert(fs.existsSync(path.join(root,titlePath)),`${title}: component missing`);
  const poem=read(titlePath);
  assert(poem.includes(`title:'${title}'`),`${title}: title missing`);
  assert(poem.includes(`poet:'${poet}'`),`${title}: poet missing`);
  assert(poem.includes(`The Panorama • Poetry Chapter ${chapter}`),`${title}: book/chapter marker missing`);
  assert(poem.includes('stanzas:['),`${title}: stanza data missing`);
  assert(count(poem,/poemLines:\[/g)===stanzas,`${title}: expected ${stanzas} actual poem stanza blocks`);
  requiredLines.forEach(line=>assert(poem.includes(line),`${title}: missing source line marker ${line}`));
  requiredFeatures.forEach(feature=>assert(poem.includes(feature),`${title}: missing required feature/content ${feature}`));
  const practice=poem.match(/const practice=\[(.*?)\];/s)?.[1]||'';
  const challenge=poem.match(/const challenge=\[(.*?)\];/s)?.[1]||'';
  checkBank(practice,`${title} Practice`,15);
  checkBank(challenge,`${title} Challenge`,25);
  assert(poem.includes('const finalTest=[...practice.slice(0,10),...challenge.slice(0,10)];'),`${title}: Final Test derivation missing`);
}

checkPoem({
  path:'src/english/EnglishPanoramaPoem1.jsx',title:'The Grandmother',poet:'Ray Young Bear',chapter:1,stanzas:3,
  requiredLines:["poemLines:['If I were to see her shape'","poemLines:['If I felt'","poemLines:['If I heard'","'and the plastic shopping bag'","'with the smell of roots.'","'from a sleeping fire at night'"],
  requiredFeatures:['poem-actual-stanza','SIMPLE EXPLANATION','VOCABULARY','stanza.vocab','STANZA-BY-STANZA','Actual stanza → simple explanation → vocabulary','POETRY TOOLKIT','POETIC DEVICES','WORDS TO KNOW','THEMES','TEXTBOOK QUICK ANSWERS','sight','touch','smell','hearing','Simile','Imagery','damp','ashes','purple scarf','plastic shopping bag','function Learn({onMode})','<PanoramaTimedQuiz mode={mode} title={poem.title}','← Exit Poetry']
});

checkPoem({
  path:'src/english/EnglishPanoramaPoem2.jsx',title:'On His Blindness',poet:'John Milton',chapter:2,stanzas:2,
  requiredLines:["poemLines:['When I consider how my light is spent'","'I fondly ask; but Patience to prevent'","poemLines:['That murmur, soon replies, “God doth not need'","'They also serve who only stand and wait.”'"],
  requiredFeatures:['Petrarchan sonnet','Octave','Sestet','Volta / turn','POETRY TOOLKIT','POETIC DEVICES','WORDS TO KNOW','THEMES','TEXTBOOK QUICK ANSWERS','Patience','rhetorical question','mild yoke','bidding','talent','Conditional Clauses','Translation Focus','function Learn({onMode})','<PanoramaTimedQuiz mode={mode} title={poem.title}','← Exit Poetry']
});

assert(nav.includes("const panoramaPoetry=['The Grandmother'"),'Poetry registry missing');
assert(nav.includes("'On His Blindness'"),'Poetry Chapter 2 entry missing');
assert(nav.includes("const poetryMatch=chapter.match(/^Panorama • Poetry"),'poetry navigation parser missing');
assert(nav.includes('if(poetry===1||poetry===2)'), 'Poetry Chapters 1–2 route handler missing');
assert(nav.includes("params.set(`panoramaPoetry${poetry}`,'1')"),'Poetry runtime flag template missing');
assert(shell.includes("import {EnglishPanoramaPoem1} from './english/EnglishPanoramaPoem1.jsx';"),'Poetry Chapter 1 component import missing');
assert(shell.includes("import {EnglishPanoramaPoem2} from './english/EnglishPanoramaPoem2.jsx';"),'Poetry Chapter 2 component import missing');
assert(shell.includes("if(p.get('panoramaPoetry1')==='1')return 17;"),'Poetry Chapter 1 flag route missing');
assert(shell.includes("if(p.get('panoramaPoetry2')==='1')return 18;"),'Poetry Chapter 2 flag route missing');
assert(shell.includes("if(Number.isInteger(n)&&n===17)return 17"),'Poetry Chapter 1 chapter route missing');
assert(shell.includes("if(Number.isInteger(n)&&n===18)return 18"),'Poetry Chapter 2 chapter route missing');
assert(shell.includes("if(chapter===17)return <EnglishPanoramaPoem1"),'Poetry Chapter 1 render route missing');
assert(shell.includes("if(chapter===18)return <EnglishPanoramaPoem2"),'Poetry Chapter 2 render route missing');

for(const marker of ['function shuffleQuestion','sourceIndex','allAnswered=','disabled={!allAnswered}','setSubmitted(true)','Your answer','Correct answer','score','pct'])assert(engine.includes(marker),`shared timed engine marker missing: ${marker}`);

console.log('English poetry QA passed: Chapters 1–2 have explicit actual stanza blocks, stanza explanations, stanza vocabulary, poetry learning tools, textbook extension, timed banks, option integrity, shared timed engine, navigation and App routing.');
console.log('Poetry Chapter 1: 15 Practice + 25 Challenge + derived 20 Final Test.');
console.log('Poetry Chapter 2: 15 Practice + 25 Challenge + derived 20 Final Test.');
