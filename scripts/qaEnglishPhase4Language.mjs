// Phase 4 regression gate: blocks the audited legacy language/provenance forms from returning.
import fs from 'node:fs';

const paths=[
 'src/english/EnglishPanoramaChapter1.jsx',
 'src/english/EnglishPanoramaChapter2.jsx',
 'src/english/EnglishPanoramaChapter3.jsx',
 'src/english/EnglishPanoramaChapter4.jsx',
 'src/english/EnglishPanoramaChapter5.jsx',
 'src/english/EnglishPanoramaChapter6Final.jsx',
 'src/english/EnglishPanoramaChapter7Final.jsx',
 'src/english/EnglishPanoramaChapter8.jsx',
 'src/english/EnglishPanoramaChapter9.jsx',
 'src/english/EnglishPanoramaProseRevision.jsx',
];
const bad=[
 ['legacy Ch5 gerund example','I know swimming.'],
 ['legacy Ch7 malformed relative clause','This is the man who he is talking about.'],
 ['legacy Ch5 malformed Hindi translation','मैं एक प्यासे हुए आदमी को कहीं देखा।'],
 ['legacy Ch2 spelling','pityful'],
 ['legacy Ch9 wrong provenance phrase','supplied Chapter 9 PDF'],
];
const required=[
 ['Ch5 natural gerund example','I know how to swim.'],
 ['Ch5 natural Hindi translation','मैंने कहीं एक प्यासे आदमी को देखा।'],
 ['Ch7 valid relative-clause teaching example','Which relative pronoun best completes: “This is the pen ___ I bought yesterday.”'],
];
const all=paths.map(p=>[p,fs.readFileSync(p,'utf8')]);
const errors=[];
for(const [label,needle] of bad){
  const hits=all.filter(([,text])=>text.includes(needle)).map(([p])=>p);
  if(hits.length) errors.push(`${label} remains in ${hits.join(', ')}`);
}
for(const [label,needle] of required){
  const hits=all.filter(([,text])=>text.includes(needle));
  if(!hits.length) errors.push(`${label} not found: ${needle}`);
}
if(errors.length){
 console.error('English Phase 4 language QA failed:');
 errors.forEach(e=>console.error(`- ${e}`));
 process.exit(1);
}
console.log('English Phase 4 language QA passed.');
console.log('Checked prose files:',paths.length);
console.log('Legacy Phase 4 defects blocked:',bad.length);
console.log('Corrected/validated Phase 4 forms present:',required.length);
