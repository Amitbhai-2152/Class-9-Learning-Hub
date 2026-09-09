import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const assert=(v,m)=>{if(!v)throw new Error(`English poetry feature QA: ${m}`)};
const ch5=read('src/english/EnglishPanoramaPoem5.jsx');
for(const marker of ['Complete 25-line source poem','WORDS TO KNOW','THEMES','TEXTBOOK PREPARATION','Long Answers','Composition','Word Study','Dictionary Use','Word Formation','Verb forms','Passive to active','Direct to indirect narration','ACTIVITIES','TRANSLATION','Personification','Rhetorical questions','Symbolism','Contrast','function Learn({onMode})','<PanoramaTimedQuiz mode={mode} title={poem.title}','← Exit Poetry'])assert(ch5.includes(marker),`Sound: missing required feature ${marker}`);
console.log('English poetry feature QA passed: Chapter 5 retained its full strict feature contract.');
