import fs from 'node:fs';

const files=[
  ['src/english/EnglishPanoramaChapter2.jsx','Chapter 2 • Yayati'],
  ['src/english/EnglishPanoramaChapter3.jsx','Chapter 3 • A Silent Revolution'],
  ['src/english/EnglishPanoramaChapter4.jsx','Chapter 4 • Too Many People, Too Few Trees']
];

for(const [file,name] of files){
  const text=fs.readFileSync(file,'utf8');
  const m=text.match(/sections:\[([\s\S]*?)\n  \],\n  glossary:/);
  if(!m) throw new Error(`Phase 2 QA: ${name}: sections block missing`);
  const block=m[1];
  const parts=block.match(/\{title:'Part \d+ — /g)||[];
  if(parts.length!==10) throw new Error(`Phase 2 QA: ${name}: expected 10 guided parts, found ${parts.length}`);
  for(let i=1;i<=10;i++){
    if(!block.includes(`Part ${i} — `)) throw new Error(`Phase 2 QA: ${name}: Part ${i} missing`);
  }
  const fields=['flow:','explanation:','vocabulary:','exam:','think:'];
  const objects=[...block.matchAll(/\{title:'Part \d+ — ([^']+)',flow:/g)].length;
  if(objects!==10) throw new Error(`Phase 2 QA: ${name}: guided-part object structure incomplete`);
  for(const field of fields){
    const n=(block.match(new RegExp(field.replace(':','\\:'),'g'))||[]).length;
    if(n<10) throw new Error(`Phase 2 QA: ${name}: field ${field} missing from guided parts`);
  }
  const voc=(block.match(/vocabulary:\[\[/g)||[]).length;
  if(voc!==10) throw new Error(`Phase 2 QA: ${name}: each guided part must expose vocabulary`);
  if(!/practice=\[/s.test(text)||!/challenge=\[/s.test(text)||!/finalTest=\[/s.test(text)){
    throw new Error(`Phase 2 QA: ${name}: assessment bank missing`);
  }
  if(!text.includes('PanoramaTimedQuiz')) throw new Error(`Phase 2 QA: ${name}: shared timed quiz engine missing`);
}

console.log('English Phase 2 pedagogy QA passed: Chapters 2–4 each expose 10 structured guided-reading parts with English flow, Hindi explanation, vocabulary, exam focus and think prompts; existing assessment engine wiring remains present.');
