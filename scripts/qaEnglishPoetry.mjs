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
 const p=read(cfg.path);
 assert(fs.existsSync(path.join(root,cfg.path)),`${cfg.title}: component missing`);
 assert(p.includes(`title:'${cfg.title}'`),`${cfg.title}: title missing`);
 assert(p.includes(`poet:'${cfg.poet}'`),`${cfg.title}: poet missing`);
 assert(p.includes(`The Panorama • Poetry Chapter ${cfg.chapter}`),`${cfg.title}: chapter marker missing`);
 assert(p.includes('stanzas:['),`${cfg.title}: stanza data missing`);
 assert(count(p,/poemLines:\[/g)===cfg.blocks,`${cfg.title}: expected ${cfg.blocks} poem blocks`);
 if(cfg.totalLines){
  const blocks=[...p.matchAll(/poemLines:\[(.*?)\]/gs)];
  const lineCount=blocks.reduce((n,m)=>n+[...m[1].matchAll(optionLiteral)].length,0);
  assert(lineCount===cfg.totalLines,`${cfg.title}: expected ${cfg.totalLines} total poem lines, got ${lineCount}`);
 }
 for(const x of cfg.lines)assert(p.includes(x),`${cfg.title}: missing complete source line ${x}`);
 for(const x of cfg.features)assert(p.includes(x),`${cfg.title}: missing required feature ${x}`);
 const practice=p.match(/const practice=\[(.*?)\];/s)?.[1]||'';
 const challenge=p.match(/const challenge=\[(.*?)\];/s)?.[1]||'';
 checkBank(practice,`${cfg.title} Practice`,15);
 checkBank(challenge,`${cfg.title} Challenge`,25);
 assert(p.includes('const finalTest=[...practice.slice(0,10),...challenge.slice(0,10)];'),`${cfg.title}: derived Final Test missing`);
}

checkPoem({path:'src/english/EnglishPanoramaPoem1.jsx',title:'The Grandmother',poet:'Ray Young Bear',chapter:1,blocks:3,lines:["poemLines:['If I were to see her shape'","poemLines:['If I felt'","poemLines:['If I heard'"],features:['STANZA-BY-STANZA','POETRY TOOLKIT','POETIC DEVICES','WORDS TO KNOW','THEMES','TEXTBOOK QUICK ANSWERS','SIMPLE EXPLANATION','VOCABULARY','function Learn({onMode})','<PanoramaTimedQuiz mode={mode} title={poem.title}','← Exit Poetry']});
checkPoem({path:'src/english/EnglishPanoramaPoem2.jsx',title:'On His Blindness',poet:'John Milton',chapter:2,blocks:2,lines:["poemLines:['When I consider how my light is spent'","'They also serve who only stand and wait.”'"],features:['Petrarchan sonnet','Octave','Sestet','Volta / turn','POETRY TOOLKIT','POETIC DEVICES','WORDS TO KNOW','THEMES','TEXTBOOK QUICK ANSWERS','Conditional Clauses','Translation Focus','function Learn({onMode})','<PanoramaTimedQuiz mode={mode} title={poem.title}','← Exit Poetry']});
checkPoem({path:'src/english/EnglishPanoramaPoem3.jsx',title:'Blow, Blow, Thou Winter Wind',poet:'William Shakespeare',chapter:3,blocks:4,lines:["poemLines:['Blow, blow, thou winter wind,'","poemLines:['Heigh-ho! sing, heigh-ho! unto the green holly:'","poemLines:['Freeze, freeze, thou bitter sky,'"],features:['Chorus (Refrain)','Chorus • Repeated','Personification','Comparison / contrast','Repetition','Refrain','WORDS TO KNOW','THEMES','TEXTBOOK QUICK ANSWERS','WORD STUDY','WORD FORMATION','GRAMMAR','ACTIVITY','TRANSLATION','function Learn({onMode})','<PanoramaTimedQuiz mode={mode} title={poem.title}','← Exit Poetry']});
checkPoem({path:'src/english/EnglishPanoramaPoem4.jsx',title:'To Daffodils',poet:'Robert Herrick',chapter:4,blocks:2,lines:["poemLines:['Fair Daffodils, we weep to see'","poemLines:['We have short time to stay, as you,'"],features:['STANZA-BY-STANZA','POETRY TOOLKIT','POETIC DEVICES','WORDS TO KNOW','THEMES','TEXTBOOK QUICK ANSWERS','WORD STUDY','Sub + Verb + Infinitive','“as” as a conjunction','Prepositions','ACTIVITIES','TRANSLATION','function Learn({onMode})','<PanoramaTimedQuiz mode={mode} title={poem.title}','← Exit Poetry']});
checkPoem({path:'src/english/EnglishPanoramaPoem5.jsx',title:'Sound',poet:'Rajani Parulekar',chapter:5,blocks:4,totalLines:25,lines:["poemLines:['A tree in the woods is hacked'","'Its branch breaking away'","'what do the halves'","'whisper to each other?'","'Do they moan and groan'","'In the heart of their hearts?'","'And do these logs driven from each other'","'Reminisce?'","'Do they remember how the wind tossed them?'","'How they got drenched in the rain?'","'And the blossoms in the spring'","'And the fall in autumn?'","'Oh! But the wind knows.'","'The wind blowing with a din'","'In places forlorn'","'Sings such songs'","'Those songs not all could praise'","'Many a man is blunt'","'He doesn’t even sense'","'The agonies caught'","'Even in simple words!'","'What then of these songs'","'They are just sounds'","'Such sounds as would be choked to death'","'If confined in the strokes and coils of script.'"],features:['Complete 25-line source poem','Opening movement — The tree is cut','Memory movement — Memory of the living tree','Movement 3 — The wind knows','Movement 4 — Sounds beyond ordinary words','WORDS TO KNOW','THEMES','TEXTBOOK PREPARATION','Long Answers','Composition','Word Study','Dictionary Use','Word Formation','Verb forms','Passive to active','Direct to indirect narration','ACTIVITIES','TRANSLATION','Personification','Rhetorical questions','Symbolism','Contrast','function Learn({onMode})','<PanoramaTimedQuiz mode={mode} title={poem.title}','← Exit Poetry']});
checkPoem({path:'src/english/EnglishPanoramaPoem6.jsx',title:'Self-Introduction',poet:'Neerada Suresh',chapter:6,blocks:3,totalLines:18,lines:["poemLines:['I am'","'an ordinary woman'","'with a creativity confined'","'To home and children.'","'To juxtaposing of carpets and curios,'","'Labelling books, tying up shoe laces.'","'My sensitivity'","'suffering silent blows'","'through a decade of togetherness'","'hardening to a tortoise shell.'","'My soul entrapped,'","'Flaps itself into silence.'","'My ordinariness'","'A tag to bind me conveniently'","'To a home and children'","'To be made extraordinary perhaps'","'At the cost of a few sad tears'","'That might dare to crack through!'"],features:['Three six-line source blocks','STANZA-BY-STANZA','POETRY TOOLKIT','POETIC DEVICES','WORDS TO KNOW','THEMES','TEXTBOOK QUESTIONS','GROUP DISCUSSION','COMPOSITION','WORD STUDY','Dictionary Use','Word Formation','Word Meaning','GRAMMAR','Forms of “bind”','“with” as a preposition','Prepositions','ACTIVITIES','TRANSLATION','Metaphor','Simile','Personification','Contrast','Symbolism','function Learn({onMode})','<PanoramaTimedQuiz mode={mode} title={poem.title}','← Exit Poetry']});

for(const [title,num] of [['The Grandmother',1],['On His Blindness',2],['Blow, Blow, Thou Winter Wind',3],['To Daffodils',4],['Sound',5],['Self-Introduction',6]])assert(nav.includes(`'${title}'`),`Poetry Chapter ${num} registry entry missing`);
assert(nav.includes('if(poetry>=1&&poetry<=6)'), 'Poetry Chapters 1–6 route handler missing');
assert(nav.includes("params.set(`panoramaPoetry${poetry}`,'1')"),'Poetry runtime flag missing');
for(const n of [1,2,3,4,5,6])assert(shell.includes(`import {EnglishPanoramaPoem${n}} from './english/EnglishPanoramaPoem${n}.jsx';`),`Poetry ${n} import missing`);
for(const [n,ch] of [[1,17],[2,18],[3,19],[4,20],[5,21],[6,22]]){
 assert(shell.includes(`if(p.get('panoramaPoetry${n}')==='1')return ${ch};`),`Poetry ${n} flag route missing`);
 assert(shell.includes(`if(Number.isInteger(n)&&n===${ch})return ${ch}`),`Poetry ${n} numeric route missing`);
 assert(shell.includes(`if(chapter===${ch})`),`Poetry ${n} render route missing`);
}
for(const marker of ['function shuffleQuestion','sourceIndex','allAnswered=','disabled={!allAnswered}','setSubmitted(true)','Your answer','Correct answer','score','pct','function returnPoetryLearn'])assert(engine.includes(marker),`shared timed engine marker missing: ${marker}`);
assert(engine.includes('[1,2,3,4,5,6].some'), 'shared poetry back-navigation must cover Chapters 1–6');

console.log('English poetry QA passed: Chapters 1–6 include complete source poem blocks, 15 Practice + 25 Challenge + derived 20 Final Test banks, option integrity, shared timed engine, navigation and App routing.');
console.log('Sound: all 25 source poem lines are present and validated.');
console.log('Self-Introduction: all 18 source poem lines are present and validated.');
