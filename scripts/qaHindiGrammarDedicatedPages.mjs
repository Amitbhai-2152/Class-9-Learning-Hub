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

// Extract a named const array without regex-based parsing. This stays robust
// against multiline strings and nested array entries used by the grammar pages.
const arrayBody=(text,name)=>{
 const tokens=[`const ${name}=[`,`const ${name} = [`];
 let open=-1;
 let token='';
 for(const candidate of tokens){
  const idx=text.indexOf(candidate);
  if(idx!==-1 && (open===-1||idx<open)){open=idx;token=candidate;}
 }
 if(open===-1)return null;
 open+=token.length;
 let depth=1;
 let quote=null;
 let escaped=false;
 for(let i=open;i<text.length;i++){
  const ch=text[i];
  if(quote!==null){
   if(escaped){escaped=false;continue;}
   if(ch.charCodeAt(0)===92){escaped=true;continue;}
   if(ch===quote)quote=null;
   continue;
  }
  if(ch==='\''||ch==='"'||ch==='`'){quote=ch;continue;}
  if(ch==='['){depth++;continue;}
  if(ch===']'){
   depth--;
   if(depth===0)return text.slice(open,i);
  }
 }
 return null;
};

// Count top-level comma-separated entries inside the extracted array body.
// This handles both one-entry-per-line arrays and compact one-line arrays.
const countTopLevelEntries=(body)=>{
 if(body===null)return -1;
 let depth=0;
 let quote=null;
 let escaped=false;
 let commas=0;
 let hasEntry=false;
 for(let i=0;i<body.length;i++){
  const ch=body[i];
  if(quote!==null){
   if(escaped){escaped=false;continue;}
   if(ch.charCodeAt(0)===92){escaped=true;continue;}
   if(ch===quote)quote=null;
   continue;
  }
  if(ch==='\''||ch==='"'||ch==='`'){quote=ch;hasEntry=true;continue;}
  if(ch==='['||ch==='{'){depth++;hasEntry=true;continue;}
  if(ch===']'||ch==='}'){
   depth=Math.max(0,depth-1);
   hasEntry=true;
   continue;
  }
  if(depth===0&&ch===','){commas++;continue;}
  if(!/\s/.test(ch))hasEntry=true;
 }
 return hasEntry?commas+1:0;
};
const countEntries=(text,name)=>countTopLevelEntries(arrayBody(text,name));

const wordPage=read('HindiSynonymAntonymTopicPage.jsx');
const syn=countEntries(wordPage,'SYNONYM_EXAMPLES');
const ant=countEntries(wordPage,'ANTONYM_EXAMPLES');
const shr=countEntries(wordPage,'SHRUTI_EXAMPLES');
const mixed=countEntries(wordPage,'MIXED_QUESTIONS');
if(syn<30)throw new Error(`Synonym examples too few: ${syn}`);
if(ant<40)throw new Error(`Antonym examples too few: ${ant}`);
if(shr<20)throw new Error(`Shrutisam examples too few: ${shr}`);
if(mixed!==60)throw new Error(`Synonym/antonym gr12 question count must be 60; got ${mixed}`);

const idiomPage=read('HindiIdiomsOneWordTopicPage.jsx');
const idioms=countEntries(idiomPage,'IDIOM_EXAMPLES');
const oneWord=countEntries(idiomPage,'ONE_WORD_EXAMPLES');
const questions=countEntries(idiomPage,'QUESTIONS');
if(idioms<40)throw new Error(`Idiom examples too few: ${idioms}`);
if(oneWord<60)throw new Error(`One-word examples too few: ${oneWord}`);
if(questions!==50)throw new Error(`Idioms/one-word question count must be 50; got ${questions}`);

const samas=read('HindiSamasTopicPage.jsx');
if(!samas.includes('const SAMAS_QUESTIONS=['))throw new Error('Samas question data missing');
if(!samas.includes('60 प्रश्न'))throw new Error('Samas page no longer advertises 60 questions');
const sandhi=read('HindiSandhiTopicPage.jsx');
if(!sandhi.includes('const SANDHI_FORMAT=['))throw new Error('Sandhi study structure missing');

if(!subjectSection.includes("book==='वर्णिका · पूरक'?'hindi-varnika-section':book==='व्याकरण एवं रचना'?'hindi-grammar-section'"))throw new Error('Support section anchors missing or incorrect');
if(!subjectSection.includes("const returnToVarnikaList=()=>scrollToList('hindi-varnika-section');const returnToGrammarList=()=>scrollToList('hindi-grammar-section')"))throw new Error('Support back-navigation handlers missing');
if(!subjectSection.includes("topic.book==='व्याकरण एवं रचना')return <HindiSupportChapterView topic={topic} initialMode={localChapter.mode} onBack={returnToGrammarList}"))throw new Error('Grammar topic still points back to Varnika section');

const css=read('hindi-grammar-topic.css');
if(!css.includes('.hindi-question-list{display:grid;gap:15px}'))throw new Error('Dedicated question spacing rule missing');
if(!css.includes('@media(max-width:560px)'))throw new Error('Mobile grammar styling missing');

const routes=mustExist.filter(f=>f.endsWith('TopicPage.jsx')).length;
console.log(`Hindi grammar dedicated QA passed: ${routes} page files, generic fallback routes 1–4, dedicated routes 5–13, synonyms ${syn}, antonyms ${ant}, shrutisam ${shr}, idioms ${idioms}, one-word ${oneWord}, questions gr12 ${mixed}, questions gr13 ${questions}.`);
