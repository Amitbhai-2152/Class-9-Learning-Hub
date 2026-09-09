import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const assert=(v,m)=>{if(!v)throw new Error(`English poetry QA: ${m}`)};
const count=(s,re)=>[...s.matchAll(re)].length;
const bankCount=(text,bankName)=>{
 const body=text.match(new RegExp(`const ${bankName}=\\[(.*?)\\];`,'s'))?.[1]||'';
 return count(body,/\bq\s*\(/g);
};
const optionObjects=(text,bankName)=>{
 const body=text.match(new RegExp(`const ${bankName}=\\[(.*?)\\];`,'s'))?.[1]||'';
 return [...body.matchAll(/q\((['"])(.*?)\1,\[(.*?)\],(\d+),/gs)];
};

const chapters=[
 {n:1,title:'The Grandmother',poet:'Ray Young Bear',path:'src/english/EnglishPanoramaPoem1.jsx'},
 {n:2,title:'On His Blindness',poet:'John Milton',path:'src/english/EnglishPanoramaPoem2.jsx'},
 {n:3,title:'Blow, Blow, Thou Winter Wind',poet:'William Shakespeare',path:'src/english/EnglishPanoramaPoem3.jsx'},
 {n:4,title:'To Daffodils',poet:'Robert Herrick',path:'src/english/EnglishPanoramaPoem4.jsx'},
 {n:5,title:'Sound',poet:'Rajani Parulekar',path:'src/english/EnglishPanoramaPoem5.jsx'},
 {n:6,title:'Self-Introduction',poet:'Neerada Suresh',path:'src/english/EnglishPanoramaPoem6.jsx'},
 {n:7,title:'I Am Like Grass',poet:'Pash',path:'src/english/EnglishPanoramaPoem7.jsx'}
];

for(const c of chapters){
 assert(fs.existsSync(path.join(root,c.path)),`Chapter ${c.n} component missing`);
 const p=read(c.path);
 assert(p.includes(`title:'${c.title}'`),`Chapter ${c.n} title missing`);
 assert(p.includes(`poet:'${c.poet}'`),`Chapter ${c.n} poet missing`);
 assert(p.includes(`The Panorama • Poetry Chapter ${c.n}`),`Chapter ${c.n} marker missing`);
 assert(p.includes('stanzas:['),`Chapter ${c.n} stanza data missing`);
 assert(p.includes('function Learn'),`Chapter ${c.n} Learn mode missing`);
 assert(p.includes('PanoramaTimedQuiz'),`Chapter ${c.n} timed quiz missing`);
 assert(bankCount(p,'practice')===15,`Chapter ${c.n} expected 15 Practice questions`);
 assert(bankCount(p,'challenge')===25,`Chapter ${c.n} expected 25 Challenge questions`);
 assert(p.includes('const finalTest=[...practice.slice(0,10),...challenge.slice(0,10)]'),`Chapter ${c.n} derived Final Test missing`);
 for(const [name,expected] of [['practice',15],['challenge',25]]){
  for(const [i,m] of optionObjects(p,name).entries()){
   const opts=[...m[3].matchAll(/(['"])((?:\\.|(?!\1).)*)\1/gs)].map(x=>x[2]);
   assert(opts.length===4,`Chapter ${c.n} ${name} question ${i+1} must have 4 options`);
   assert(new Set(opts).size===4,`Chapter ${c.n} ${name} question ${i+1} has duplicate options`);
   const answer=Number(m[4]);
   assert(Number.isInteger(answer)&&answer>=0&&answer<4,`Chapter ${c.n} ${name} question ${i+1} has invalid answer index`);
  }
 }
}

const guide=read('src/english/EnglishPanoramaPoem7LineGuide.jsx');
assert(count(guide,/\['Line \d+'/g)===29,'Chapter 7 line guide must contain exactly 29 ordered line meanings');
for(let i=1;i<=29;i++)assert(guide.includes(`['Line ${i}'`),`Chapter 7 line guide missing Line ${i}`);

const nav=read('src/english/EnglishSubjectSection.jsx');
const shell=read('src/AppWithChapter5.jsx');
for(const c of chapters){
 assert(nav.includes(`'${c.title}'`),`Poetry Chapter ${c.n} registry entry missing`);
 assert(nav.includes('if(poetry>=1&&poetry<=7)'), 'Poetry 1–7 route handler missing');
 assert(nav.includes("params.set(`panoramaPoetry${poetry}`,'1')"),'Poetry runtime flag routing missing');
 assert(shell.includes(`if(p.get('panoramaPoetry${c.n}')==='1')return ${16+c.n};`),`Poetry ${c.n} flag route missing`);
 assert(shell.includes(`if(Number.isInteger(n)&&n===${16+c.n})return ${16+c.n}`),`Poetry ${c.n} numeric route missing`);
 assert(shell.includes(`if(chapter===${16+c.n})`),`Poetry ${c.n} render route missing`);
}

const engine=read('src/english/PanoramaTimedQuiz.jsx');
for(const marker of ['function shuffleQuestion','sourceIndex','allAnswered=','disabled={!allAnswered}','setSubmitted(true)','Your answer','Correct answer','score','pct'])assert(engine.includes(marker),`shared timed engine marker missing: ${marker}`);

console.log('English poetry QA passed: Chapters 1–7 structure, Learn/timed flow, 15 Practice + 25 Challenge banks with four-option integrity, derived 20-question Final Test, Chapter 7 29-line guide, navigation and runtime routing.');
