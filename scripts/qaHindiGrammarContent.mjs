import fs from 'node:fs';

const source=fs.readFileSync(new URL('../src/hindiGrammarContent.js',import.meta.url),'utf8');
const normalized=source.replace(/^export\s+/gm,'');
const moduleUrl=`data:text/javascript;charset=utf-8,${encodeURIComponent(normalized)}`;
const loaded=await import(moduleUrl);
const {HINDI_GRAMMAR_CONTENT:content,HINDI_GRAMMAR_MODES:modes}=loaded;

const expected=[
 ['grammar-gr1','अपठित गद्यांश'],['grammar-gr2','निबंध लेखन'],['grammar-gr3','पत्र लेखन'],['grammar-gr4','संवाद लेखन'],['grammar-gr5','अनुच्छेद लेखन'],
 ['grammar-gr6','लिंग'],['grammar-gr7','वचन'],['grammar-gr8','काल'],['grammar-gr9','वाच्य'],['grammar-gr10','संधि'],['grammar-gr11','समास'],
 ['grammar-gr12','पर्यायवाची, विलोम और श्रुतिसमभिन्नार्थक'],['grammar-gr13','मुहावरे और अनेक शब्दों के लिए एक शब्द']
];
const fail=(m)=>{throw new Error(`Hindi Grammar QA failed: ${m}`)};
if(Object.keys(content).length!==13)fail(`expected 13 topics, got ${Object.keys(content).length}`);
if(modes.practice.count!==15||modes.challenge.count!==12||modes.test.count!==20)fail('mode counts must be 15/12/20');
for(const [id,title] of expected){
 const data=content[id];
 if(!data)fail(`missing topic ${id}`);
 if(data.title!==title)fail(`${id} title mismatch`);
 if(!data.summary?.trim())fail(`${id} missing summary`);
 if(!Array.isArray(data.points)||data.points.length<6)fail(`${id} needs lesson points`);
 if(!Array.isArray(data.questions)||data.questions.length!==47)fail(`${id} needs exactly 47 questions`);
 const texts=data.questions.map(q=>q.q);
 if(new Set(texts).size!==texts.length)fail(`${id} has duplicate question text`);
 for(const [i,q] of data.questions.entries()){
  if(!q.q?.trim())fail(`${id} question ${i+1} missing text`);
  if(!Array.isArray(q.options)||q.options.length!==4)fail(`${id} question ${i+1} needs 4 options`);
  if(!Number.isInteger(q.answer)||q.answer<0||q.answer>3)fail(`${id} question ${i+1} invalid answer index`);
  if(!q.explain?.trim())fail(`${id} question ${i+1} missing explanation`);
 }
 const p=data.questions.slice(0,15),c=data.questions.slice(15,27),t=data.questions.slice(27,47);
 if(p.length!==15||c.length!==12||t.length!==20)fail(`${id} mode slicing mismatch`);
 const pSet=new Set(p.map(q=>q.q)),cSet=new Set(c.map(q=>q.q)),tSet=new Set(t.map(q=>q.q));
 if([...pSet].some(q=>cSet.has(q)||tSet.has(q))||[...cSet].some(q=>tSet.has(q)))fail(`${id} mode banks overlap`);
}
console.log('✅ Hindi Grammar QA passed');
console.log('   Topics: 13');
console.log('   Questions/topic: 47 (15 practice + 12 challenge + 20 test)');
console.log('   Total dedicated questions: 611');
console.log('   Letter writing: ✅ included as grammar-gr3');
