import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const assert=(v,m)=>{if(!v)throw new Error(`English poetry QA: ${m}`)};
const count=(s,re)=>[...s.matchAll(re)].length;
const optionLiteral=/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g;
const decodeLiteral=raw=>{const q=raw[0];const b=raw.slice(1,-1);return b.replace(new RegExp(`\\\\${q}`,'g'),q).replace(/\\(.)/g,'$1')};
const nav=read('src/english/EnglishSubjectSection.jsx');
const shell=read('src/AppWithChapter5.jsx');
const engine=read('src/english/PanoramaTimedQuiz.jsx');
const guide7=read('src/english/EnglishPanoramaPoem7LineGuide.jsx');

function checkBank(segment,name,expected){
 assert(count(segment,/q\s*\(/g)===expected,`${name}: expected ${expected} questions`);
 const records=[...segment.matchAll(/q\((['"])(.*?)\1,\[(.*?)\],(\d+),(['"])(.*?)\5\)/gs)];
 assert(records.length===expected,`${name}: expected ${expected} complete question records, got ${records.length}`);
 for(const [i,m] of records.entries()){
  const options=[...m[3].matchAll(optionLiteral)].map(x=>decodeLiteral(x[0]));
  assert(options.length===4,`${name}: question ${i+1} must have exactly 4 options`);
  assert(new Set(options).size===4,`${name}: question ${i+1} has duplicate options`);
  const answer=Number(m[4]);
  assert(Number.isInteger(answer)&&answer>=0&&answer<4,`${name}: question ${i+1} has invalid answer index`);
 }
}

function checkPoem(cfg){
 assert(fs.existsSync(path.join(root,cfg.path)),`${cfg.title}: component missing`);
 const p=read(cfg.path);
 assert(p.includes(`title:'${cfg.title}'`),`${cfg.title}: title missing`);
 assert(p.includes(`poet:'${cfg.poet}'`),`${cfg.title}: poet missing`);
 assert(p.includes(`The Panorama • Poetry Chapter ${cfg.chapter}`),`${cfg.title}: chapter marker missing`);
 assert(p.includes('stanzas:['),`${cfg.title}: stanza data missing`);
 for(const x of cfg.excerpts)assert(p.includes(x),`${cfg.title}: required source excerpt missing: ${x}`);
 for(const x of cfg.features)assert(p.includes(x),`${cfg.title}: missing required feature ${x}`);
 const practice=p.match(/const practice=\[(.*?)\];/s)?.[1]||'';
 const challenge=p.match(/const challenge=\[(.*?)\];/s)?.[1]||'';
 checkBank(practice,`${cfg.title} Practice`,15);
 checkBank(challenge,`${cfg.title} Challenge`,25);
 assert(p.includes('const finalTest=[...practice.slice(0,10),...challenge.slice(0,10)];'),`${cfg.title}: derived Final Test missing`);
}

checkPoem({path:'src/english/EnglishPanoramaPoem1.jsx',title:'The Grandmother',poet:'Ray Young Bear',chapter:1,excerpts:["poemLines:['If I were to see her shape'","poemLines:['If I felt'","poemLines:['If I heard'"],features:['STANZA-BY-STANZA','POETRY TOOLKIT','POETIC DEVICES','WORDS TO KNOW','THEMES','TEXTBOOK QUICK ANSWERS','SIMPLE EXPLANATION','VOCABULARY','function Learn({onMode})','<PanoramaTimedQuiz mode={mode} title={poem.title}','← Exit Poetry']});
checkPoem({path:'src/english/EnglishPanoramaPoem2.jsx',title:'On His Blindness',poet:'John Milton',chapter:2,excerpts:["poemLines:['When I consider how my light is spent'","'They also serve who only stand and wait.”'"],features:['Petrarchan sonnet','Octave','Sestet','Volta / turn','POETRY TOOLKIT','POETIC DEVICES','WORDS TO KNOW','THEMES','TEXTBOOK QUICK ANSWERS','Conditional Clauses','Translation Focus','function Learn({onMode})','<PanoramaTimedQuiz mode={mode} title={poem.title}','← Exit Poetry']});
checkPoem({path:'src/english/EnglishPanoramaPoem3.jsx',title:'Blow, Blow, Thou Winter Wind',poet:'William Shakespeare',chapter:3,excerpts:["poemLines:['Blow, blow, thou winter wind,'","poemLines:['Heigh-ho! sing, heigh-ho! unto the green holly:'","poemLines:['Freeze, freeze, thou bitter sky,'"],features:['Chorus (Refrain)','Chorus • Repeated','Personification','Comparison / contrast','Repetition','Refrain','WORDS TO KNOW','THEMES','TEXTBOOK QUICK ANSWERS','WORD STUDY','WORD FORMATION','GRAMMAR','ACTIVITY','TRANSLATION','function Learn({onMode})','<PanoramaTimedQuiz mode={mode} title={poem.title}','← Exit Poetry']});
checkPoem({path:'src/english/EnglishPanoramaPoem4.jsx',title:'To Daffodils',poet:'Robert Herrick',chapter:4,excerpts:["poemLines:['Fair Daffodils, we weep to see'","poemLines:['We have short time to stay, as you,'"],features:['STANZA-BY-STANZA','POETRY TOOLKIT','POETIC DEVICES','WORDS TO KNOW','THEMES','TEXTBOOK QUICK ANSWERS','WORD STUDY','Sub + Verb + Infinitive','“as” as a conjunction','Prepositions','ACTIVITIES','TRANSLATION','function Learn({onMode})','<PanoramaTimedQuiz mode={mode} title={poem.title}','← Exit Poetry']});
checkPoem({path:'src/english/EnglishPanoramaPoem5.jsx',title:'Sound',poet:'Rajani Parulekar',chapter:5,excerpts:["poemLines:['A tree in the woods is hacked'","'If confined in the strokes and coils of script.'"],features:['Complete 25-line source poem','WORDS TO KNOW','THEMES','TEXTBOOK PREPARATION','Long Answers','Composition','Word Study','Dictionary Use','Word Formation','Verb forms','Passive to active','Direct to indirect narration','ACTIVITIES','TRANSLATION','Personification','Rhetorical questions','Symbolism','Contrast','function Learn({onMode})','<PanoramaTimedQuiz mode={mode} title={poem.title}','← Exit Poetry']});
checkPoem({path:'src/english/EnglishPanoramaPoem6.jsx',title:'Self-Introduction',poet:'Neerada Suresh',chapter:6,excerpts:["poemLines:['I am'","'My ordinariness'"],features:['Three six-line source blocks','STANZA-BY-STANZA','POETRY TOOLKIT','POETIC DEVICES','WORDS TO KNOW','THEMES','TEXTBOOK QUESTIONS','GROUP DISCUSSION','COMPOSITION','WORD STUDY','Dictionary Use','Word Formation','Word Meaning','GRAMMAR','Forms of “bind”','“with” as a preposition','Prepositions','ACTIVITIES','TRANSLATION','Metaphor','Simile','Personification','Contrast','Symbolism','function Learn({onMode})','<PanoramaTimedQuiz mode={mode} title={poem.title}','← Exit Poetry']});
checkPoem({path:'src/english/EnglishPanoramaPoem7.jsx',title:'I Am Like Grass',poet:'Pash',chapter:7,excerpts:['I am like grass','but I shall sprout again','you cannot erase my identity','it will be only a matter of time','my green mantle covers everything again','I shall become a vast green jungle'],features:['Five short movements','SOURCE EXCERPTS','STANZA-BY-STANZA','POETRY TOOLKIT','POETIC DEVICES','WORDS TO KNOW','THEMES','TEXTBOOK PREPARATION','Long Answers','GROUP DISCUSSION','COMPOSITION','WORD STUDY','Spelling practice','Meaning matching','Adjective formation with -y','GRAMMAR • FIGURE OF SPEECH','Simile','Metaphor','ACTIVITY','TRANSLATION','function Learn({onMode})','<PanoramaTimedQuiz mode={mode} title={poem.title}','← Exit Poetry']});

const guideLabels=[...Array(29)].map((_,i)=>`['Line ${i+1}'`);
assert(fs.existsSync(path.join(root,'src/english/EnglishPanoramaPoem7LineGuide.jsx')),'Chapter 7 line guide missing');
assert(count(guide7,/\['Line \d+'/g)===29,'Chapter 7 line guide must contain exactly 29 line meanings');
for(const label of guideLabels)assert(guide7.includes(label),`Chapter 7 line guide missing ${label.slice(2,-1)}`);
assert(guide7.includes('Every source line, in order'),'Chapter 7 complete-line guide heading missing');

for(const [title,num] of [['The Grandmother',1],['On His Blindness',2],['Blow, Blow, Thou Winter Wind',3],['To Daffodils',4],['Sound',5],['Self-Introduction',6],['I Am Like Grass',7]])assert(nav.includes(`'${title}'`),`Poetry Chapter ${num} registry entry missing`);
assert(nav.includes('if(poetry>=1&&poetry<=7)'), 'Poetry Chapters 1–7 route handler missing');
assert(nav.includes("params.set(`panoramaPoetry${poetry}`,'1')"),'Poetry runtime flag missing');
for(const n of [1,2,3,4,5,6])assert(shell.includes(`import {EnglishPanoramaPoem${n}} from './english/EnglishPanoramaPoem${n}.jsx';`),`Poetry ${n} import missing`);
assert(shell.includes("import {EnglishPanoramaPoem7WithGuide} from './english/EnglishPanoramaPoem7WithGuide.jsx';"),'Poetry 7 guide wrapper import missing');
for(const [n,ch] of [[1,17],[2,18],[3,19],[4,20],[5,21],[6,22],[7,23]]){
 assert(shell.includes(`if(p.get('panoramaPoetry${n}')==='1')return ${ch};`),`Poetry ${n} flag route missing`);
 assert(shell.includes(`if(Number.isInteger(n)&&n===${ch})return ${ch}`),`Poetry ${n} numeric route missing`);
 assert(shell.includes(`if(chapter===${ch})`),`Poetry ${n} render route missing`);
}
for(const marker of ['function shuffleQuestion','sourceIndex','allAnswered=','disabled={!allAnswered}','setSubmitted(true)','Your answer','Correct answer','score','pct','function returnPoetryLearn'])assert(engine.includes(marker),`shared timed engine marker missing: ${marker}`);
assert(engine.includes('[1,2,3,4,5,6,7].some'), 'shared poetry back-navigation must cover Chapters 1–7');

console.log('English poetry QA passed: Chapters 1–7 include source-supported learning sections, Chapter 7 has 29 ordered line meanings, 15 Practice + 25 Challenge + derived 20 Final Test banks, option integrity, shared timed engine, navigation and App routing.');
