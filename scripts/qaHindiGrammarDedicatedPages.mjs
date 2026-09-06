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

const read=file=>fs.readFileSync(path.join(src,file),'utf8');
const grammarView=read('HindiGrammarChapterView.jsx');
const chapterData=read('hindiChapterData.js');
const subjectSection=read('HindiSubjectSection.jsx');

for(let i=1;i<=13;i++){
 const sourceId=`id:'gr${i}'`;
 const publicId=`grammar-gr${i}`;
 if(!chapterData.includes(sourceId)) throw new Error(`Missing grammar source topic: ${publicId}`);
 if(i>=5 && !grammarView.includes(publicId)) throw new Error(`Missing dedicated grammar route: ${publicId}`);
}
if(!grammarView.includes('HindiGrammarTopicPage')) throw new Error('Shared grammar topic page route missing');
if(!grammarView.includes('HindiIdiomsOneWordTopicPage')) throw new Error('gr13 dedicated page import/route missing');

const wordPage=read('HindiSynonymAntonymTopicPage.jsx');
if(!wordPage.includes('const SYNONYM_EXAMPLES=['))throw new Error('Synonym example data missing');
if(!wordPage.includes('const ANTONYM_EXAMPLES=['))throw new Error('Antonym example data missing');
if(!wordPage.includes('const SHRUTI_EXAMPLES=['))throw new Error('Shrutisam example data missing');
if(!wordPage.includes('const MIXED_QUESTIONS=['))throw new Error('gr12 question bank missing');
if(!wordPage.includes('“सूर्य” के चार पर्यायवाची लिखिए।'))throw new Error('gr12 synonym question content missing');
if(!wordPage.includes('“अंश” और “अंस” के अर्थ लिखकर अंतर स्पष्ट कीजिए।'))throw new Error('gr12 shrutisam question content missing');

const idiomPage=read('HindiIdiomsOneWordTopicPage.jsx');
if(!idiomPage.includes('const IDIOM_EXAMPLES=['))throw new Error('Idiom example data missing');
if(!idiomPage.includes('const ONE_WORD_EXAMPLES=['))throw new Error('One-word example data missing');
if(!idiomPage.includes('const QUESTIONS=['))throw new Error('gr13 question bank missing');
if(!idiomPage.includes('60'))throw new Error('gr13 expected large practice bank missing');

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
console.log(`Hindi grammar dedicated QA passed: ${routes} page files, generic fallback routes 1–4, dedicated routes 5–13, gr12 structured banks present, gr13 structured banks present.`);
