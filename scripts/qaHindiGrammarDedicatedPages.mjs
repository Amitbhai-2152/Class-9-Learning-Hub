import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const src=path.join(root,'src');

const mustExist=[
 'HindiGrammarTopicPage.jsx',
 'HindiParagraphTopicPage.jsx',
 'HindiGenderTopicPage.jsx',
 'HindiNumberTopicPage.jsx',
 'HindiTenseTopicPage.jsx',
 'HindiVoiceTopicPage.jsx',
 'HindiSandhiTopicPage.jsx',
 'HindiSamasTopicPage.jsx',
 'HindiSynonymAntonymTopicPage.jsx',
 'HindiIdiomsOneWordTopicPage.jsx',
 'hindi-grammar-topic.css',
];

for(const file of mustExist){
 const p=path.join(src,file);
 if(!fs.existsSync(p)) throw new Error(`Missing required grammar file: ${file}`);
}

const grammarView=fs.readFileSync(path.join(src,'HindiGrammarChapterView.jsx'),'utf8');
const chapterData=fs.readFileSync(path.join(src,'hindiChapterData.js'),'utf8');
const subjectSection=fs.readFileSync(path.join(src,'HindiSubjectSection.jsx'),'utf8');

for(let i=1;i<=13;i++){
 const sourceId=`id:'gr${i}'`;
 const publicId=`grammar-gr${i}`;
 if(!chapterData.includes(sourceId)) throw new Error(`Missing grammar source topic: ${publicId}`);
 if(i>=5 && !grammarView.includes(publicId)) throw new Error(`Missing dedicated grammar route: ${publicId}`);
}
if(!grammarView.includes('HindiGrammarTopicPage')) throw new Error('Shared grammar topic page route missing');
if(!grammarView.includes('HindiIdiomsOneWordTopicPage')) throw new Error('gr13 dedicated page import/route missing');

const read=file=>fs.readFileSync(path.join(src,file),'utf8');

// These source arrays are intentionally formatted one top-level entry per line.
// Use plain string operations so the QA script itself does not depend on fragile regex escaping.
const arrayBody=(text,name)=>{
 const openToken=`const ${name}=[`;
 let open=text.indexOf(openToken);
 if(open===-1){
  const spacedToken=`const ${name} = [`;
  open=text.indexOf(spacedToken);
  if(open===-1) return null;
  open+=spacedToken.length;
 }else{
  open+=openToken.length;
 }
 let depth=1;
 let quote=null;
 let escaped=false;
 for(let i=open;i<text.length;i++){
  const ch=text[i];
  if(quote!==null){
   if(escaped){escaped=false;continue;}
   if(ch.charCodeAt(0)===92){escaped=true;continue;}
   if(ch===quote) quote=null;
   continue;
  }
  if(ch==='\'' || ch==='"' || ch==='`'){quote=ch;continue;}
  if(ch==='['){depth++;continue;}
  if(ch===']'){
   depth--;
   if(depth===0) return text.slice(open,i);
  }
 }
 return null;
};

const topLevelLines=(body,predicate)=>{
 if(body===null) return -1;
 return body.split(/\r?\n/).filter(line=>predicate(line.trim())).length;
};
const countNestedArrayEntries=(text,name)=>topLevelLines(arrayBody(text,name),line=>line.startsWith('['));
const countStringEntries=(text,name)=>topLevelLines(arrayBody(text,name),line=>line.startsWith("'")||line.startsWith('"')||line.startsWith('`'));

const wordPage=read('HindiSynonymAntonymTopicPage.jsx');
const syn=countNestedArrayEntries(wordPage,'SYNONYM_EXAMPLES');
const ant=countNestedArrayEntries(wordPage,'ANTONYM_EXAMPLES');
const shr=countNestedArrayEntries(wordPage,'SHRUTI_EXAMPLES');
const mixed=countStringEntries(wordPage,'MIXED_QUESTIONS');
if(syn<30) throw new Error(`Synonym examples too few: ${syn}`);
if(ant<40) throw new Error(`Antonym examples too few: ${ant}`);
if(shr<20) throw new Error(`Shrutisam examples too few: ${shr}`);
if(mixed!==59) throw new Error(`Synonym/antonym gr12 question count changed unexpectedly; expected 59, got ${mixed}`);

const idiomPage=read('HindiIdiomsOneWordTopicPage.jsx');
const idioms=countNestedArrayEntries(idiomPage,'IDIOM_EXAMPLES');
const oneWord=countNestedArrayEntries(idiomPage,'ONE_WORD_EXAMPLES');
const questions=countStringEntries(idiomPage,'QUESTIONS');
if(idioms<40) throw new Error(`Idiom examples too few: ${idioms}`);
if(oneWord<60) throw new Error(`One-word examples too few: ${oneWord}`);
if(questions!==50) throw new Error(`Idioms/one-word question count must be 50; got ${questions}`);

const samas=read('HindiSamasTopicPage.jsx');
if(!samas.includes('const SAMAS_QUESTIONS=[')) throw new Error('Samas question data missing');
if(!samas.includes('60 प्रश्न')) throw new Error('Samas page no longer advertises 60 questions');
const sandhi=read('HindiSandhiTopicPage.jsx');
if(!sandhi.includes('const SANDHI_FORMAT=[')) throw new Error('Sandhi study structure missing');

if(!subjectSection.includes("book==='वर्णिका · पूरक'?'hindi-varnika-section':book==='व्याकरण एवं रचना'?'hindi-grammar-section'")) throw new Error('Support section anchors missing or incorrect');
if(!subjectSection.includes("const returnToVarnikaList=()=>scrollToList('hindi-varnika-section');const returnToGrammarList=()=>scrollToList('hindi-grammar-section')")) throw new Error('Support back-navigation handlers missing');
if(!subjectSection.includes("topic.book==='व्याकरण एवं रचना')return <HindiSupportChapterView topic={topic} initialMode={localChapter.mode} onBack={returnToGrammarList}")) throw new Error('Grammar topic still points back to Varnika section');

const css=read('hindi-grammar-topic.css');
if(!css.includes('.hindi-question-list{display:grid;gap:15px}')) throw new Error('Dedicated question spacing rule missing');
if(!css.includes('@media(max-width:560px)')) throw new Error('Mobile grammar styling missing');

const routes=mustExist.filter(f=>f.endsWith('TopicPage.jsx')).length;
console.log(`Hindi grammar dedicated QA passed: ${routes} page files, generic fallback routes 1–4, dedicated routes 5–13, synonyms ${syn}, antonyms ${ant}, shrutisam ${shr}, idioms ${idioms}, one-word ${oneWord}, questions gr12 ${mixed}, questions gr13 ${questions}.`);
