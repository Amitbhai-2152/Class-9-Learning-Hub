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

// hindiChapterData stores source ids as gr1–gr13 and prefixes them to
// grammar-gr1–grammar-gr13 in hindiAllTopics. The view only needs literal
// route branches for the dedicated pages (gr5–gr13); gr1–gr4 use the shared
// HindiGrammarTopicPage fallback.
for(let i=1;i<=13;i++){
 const sourceId=`id:'gr${i}'`;
 const publicId=`grammar-gr${i}`;
 if(!chapterData.includes(sourceId)) throw new Error(`Missing grammar source topic: ${publicId}`);
 if(i>=5 && !grammarView.includes(publicId)) throw new Error(`Missing dedicated grammar route: ${publicId}`);
}
if(!grammarView.includes('HindiGrammarTopicPage')) throw new Error('Shared grammar topic page route missing');
if(!grammarView.includes('HindiIdiomsOneWordTopicPage')) throw new Error('gr13 dedicated page import/route missing');

const read=file=>fs.readFileSync(path.join(src,file),'utf8');
const countArrayEntries=(text,name)=>{
 const declaration=new RegExp(`(?:const|let|var)\\s+${name}\\s*=\\s*\\[`);
 const match=declaration.exec(text);
 if(!match) return -1;
 const start=match.index+match[0].length-1;
 let depth=0;
 let quote=null;
 let escaped=false;
 let count=0;
 let sawEntry=false;
 for(let i=start;i<text.length;i++){
  const ch=text[i];
  if(quote){
   if(escaped){escaped=false;continue;}
   if(ch==='\\\\'){escaped=true;continue;}
   if(ch===quote) quote=null;
   continue;
  }
  if(ch==='\\''||ch==='"'||ch==='`'){quote=ch;continue;}
  if(ch==='['||ch==='{'||ch==='('){
   if(depth===1 && (ch==='['||ch==='{')) sawEntry=true;
   depth++;
   continue;
  }
  if(ch===']'||ch==='}'||ch===')'){
   depth--;
   if(ch===']'&&depth===0) break;
   continue;
  }
  if(ch===','&&depth===1){
   if(sawEntry){count++;sawEntry=false;}
  }
 }
 if(sawEntry) count++;
 return count;
};

const wordPage=read('HindiSynonymAntonymTopicPage.jsx');
const syn=countArrayEntries(wordPage,'SYNONYM_EXAMPLES');
const ant=countArrayEntries(wordPage,'ANTONYM_EXAMPLES');
const shr=countArrayEntries(wordPage,'SHRUTI_EXAMPLES');
const mixed=countArrayEntries(wordPage,'MIXED_QUESTIONS');
if(syn<30) throw new Error(`Synonym examples too few: ${syn}`);
if(ant<40) throw new Error(`Antonym examples too few: ${ant}`);
if(shr<20) throw new Error(`Shrutisam examples too few: ${shr}`);
if(mixed!==60) throw new Error(`Synonym/antonym question count must be 60; got ${mixed}`);

const idiomPage=read('HindiIdiomsOneWordTopicPage.jsx');
const idioms=countArrayEntries(idiomPage,'IDIOM_EXAMPLES');
const oneWord=countArrayEntries(idiomPage,'ONE_WORD_EXAMPLES');
const questions=countArrayEntries(idiomPage,'QUESTIONS');
if(idioms<40) throw new Error(`Idiom examples too few: ${idioms}`);
if(oneWord<60) throw new Error(`One-word examples too few: ${oneWord}`);
if(questions!==50) throw new Error(`Idioms/one-word question count must be 50; got ${questions}`);

const samas=read('HindiSamasTopicPage.jsx');
if(!samas.includes('const SAMAS_QUESTIONS=[')) throw new Error('Samas question data missing');
if(!samas.includes('60 प्रश्न')) throw new Error('Samas page no longer advertises 60 questions');
const sandhi=read('HindiSandhiTopicPage.jsx');
if(!sandhi.includes('const SANDHI_FORMAT=[')) throw new Error('Sandhi study structure missing');

// Back navigation must return to the correct support section.
if(!subjectSection.includes("book==='वर्णिका · पूरक'?'hindi-varnika-section':book==='व्याकरण एवं रचना'?'hindi-grammar-section'")) throw new Error('Support section anchors missing or incorrect');
if(!subjectSection.includes("const returnToVarnikaList=()=>scrollToList('hindi-varnika-section');const returnToGrammarList=()=>scrollToList('hindi-grammar-section')")) throw new Error('Support back-navigation handlers missing');
if(!subjectSection.includes("topic.book==='व्याकरण एवं रचना')return <HindiSupportChapterView topic={topic} initialMode={localChapter.mode} onBack={returnToGrammarList}")) throw new Error('Grammar topic still points back to Varnika section');

const css=read('hindi-grammar-topic.css');
if(!css.includes('.hindi-question-list{display:grid;gap:15px}')) throw new Error('Dedicated question spacing rule missing');
if(!css.includes('@media(max-width:560px)')) throw new Error('Mobile grammar styling missing');

const routes=mustExist.filter(f=>f.endsWith('TopicPage.jsx')).length;
console.log(`Hindi grammar dedicated QA passed: ${routes} page files, generic fallback routes 1–4, dedicated routes 5–13, synonyms ${syn}, antonyms ${ant}, shrutisam ${shr}, idioms ${idioms}, one-word ${oneWord}, questions gr12 ${mixed}, questions gr13 ${questions}.`);
