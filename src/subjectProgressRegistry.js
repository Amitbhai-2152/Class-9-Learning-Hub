export const STAGES=['learn','practice','challenge','test'];

const topic=(id,title,aliases=[])=>({id,title,aliases});
const list=(subjectId,topics)=>topics.map((item,index)=>({...item,subjectId,order:index+1}));

const math=list('math',[
 topic('math-01','संख्या पद्धति',['Number System']),topic('math-02','बहुपद',['Polynomials']),topic('math-03','निर्देशांक ज्यामिति',['Coordinate Geometry']),topic('math-04','दो चरों वाले रैखिक समीकरण',['Linear Equations in Two Variables']),topic('math-05','यूक्लिड की ज्यामिति का परिचय',['Introduction to Euclid’s Geometry','Introduction to Euclids Geometry']),topic('math-06','रेखाएँ और कोण',['Lines and Angles']),topic('math-07','त्रिभुज',['Triangles']),topic('math-08','चतुर्भुज',['Quadrilaterals']),topic('math-09','समान्तर चतुर्भुजों और त्रिभुजों के क्षेत्रफल',['Areas of Parallelograms and Triangles']),topic('math-10','वृत्त',['Circles']),topic('math-11','रचनाएँ',['Constructions']),topic('math-12','हीरोन का सूत्र',['Heron’s Formula','Herons Formula']),topic('math-13','पृष्ठीय क्षेत्रफल एवं आयतन',['Surface Areas and Volumes']),topic('math-14','सांख्यिकी',['Statistics']),topic('math-15','प्रायिकता',['Probability'])
]);
const science=list('science',[
 topic('science-01','हमारे आसपास के पदार्थ',['Matter in Our Surroundings']),topic('science-02','क्या हमारे आसपास के पदार्थ शुद्ध हैं?',['Is Matter Around Us Pure?']),topic('science-03','परमाणु एवं अणु',['Atoms and Molecules']),topic('science-04','परमाणु की संरचना',['Structure of the Atom']),topic('science-05','जीवन की मौलिक इकाई — कोशिका',['The Fundamental Unit of Life','Cell']),topic('science-06','ऊतक',['Tissues']),topic('science-07','गति',['Motion']),topic('science-08','बल तथा गति के नियम',['Force and Laws of Motion']),topic('science-09','गुरुत्वाकर्षण',['Gravitation']),topic('science-10','कार्य तथा ऊर्जा',['Work and Energy']),topic('science-11','ध्वनि',['Sound']),topic('science-12','खाद्य संसाधनों में सुधार',['Improvement in Food Resources']),topic('science-13','हम बीमार क्यों होते हैं',['Why Do We Fall Ill']),topic('science-14','प्राकृतिक संसाधन',['Natural Resources']),topic('science-15','हमारा पर्यावरण',['Our Environment'])
]);
const hindi=list('hindi',[
 topic('g1','कहानी का प्लॉट'),topic('g2','भारत का पुरातन विद्यापीठ : नालंदा'),topic('g3','ग्राम-गीत का मर्म',['ग्रीम-गीत का मर्म']),topic('g4','लाल पान की बेगम'),topic('g5','भारतीय चित्रपट : मूक फिल्मों से सवाक फिल्मों तक'),topic('g6','अष्टावक्र'),topic('g7','टॉलस्टाय के घर में'),topic('g8','पधारो म्हारे देश'),topic('g9','रेल-यात्रा'),topic('g10','निबंध'),topic('g11','सूखी नदी का पुल'),topic('g12','शिक्षा में हेर-फेर'),
 topic('k1','रैदास के पद'),topic('k2','मंझन के पद'),topic('k3','गुरु गोविंद सिंह के पद'),topic('k4','पलक पाँवड़े'),topic('k5','मैं नीर भरी दुःख की बदली'),topic('k6','आ रही रवि के सवारी'),topic('k7','पूरा हिन्दुस्तान मिलेगा'),topic('k8','मेरा ईश्वर'),topic('k9','रुको बच्चों'),topic('k10','निम्मो की मौत'),topic('k11','समुद्र'),topic('k12','कुछ सवाल'),
 topic('v1','बिहार का लोकगायन'),topic('v2','बिहार की संगीत साधना'),topic('v3','बिहार में नृत्यकला'),topic('v4','बिहार की चित्रकला'),topic('v5','मधुबनी की चित्रकला'),topic('v6','बिहार में नाट्यकला'),topic('v7','बिहार का सिनेमा संसार'),
 topic('h-grammar-01','अपठित गद्यांश'),topic('h-grammar-02','निबंध लेखन'),topic('h-grammar-03','पत्र लेखन'),topic('h-grammar-04','संवाद लेखन'),topic('h-grammar-05','अनुच्छेद लेखन'),topic('h-grammar-06','लिंग'),topic('h-grammar-07','वचन'),topic('h-grammar-08','काल'),topic('h-grammar-09','वाच्य'),topic('h-grammar-10','संधि'),topic('h-grammar-11','समास'),topic('h-grammar-12','पर्यायवाची/विलोम/श्रुतिसमभिन्नार्थक'),topic('h-grammar-13','मुहावरे और अनेक शब्दों के लिए एक शब्द')
]);
const sanskrit=list('sanskrit',[
 topic('sanskrit-01','ईशस्तुति:'),topic('sanskrit-02','लोभविष्टः चक्रधरः'),topic('sanskrit-03','यक्ष-युधिष्ठिर संवाद'),topic('sanskrit-04','चत्वारो वेदाः'),topic('sanskrit-05','संस्कृतस्य महिमा'),topic('sanskrit-06','संस्कृतसाहित्ये पर्यावरणम्'),topic('sanskrit-07','ज्ञानं भारः क्रियां विना'),topic('sanskrit-08','नीतिपधानिः'),topic('sanskrit-09','बिहारस्य सांस्कृतिकं वैभवम्'),topic('sanskrit-10','ईद-महोत्सवः'),topic('sanskrit-11','ग्राम्यजीवनम्'),topic('sanskrit-12','वीर कूँवर सिंहः'),topic('sanskrit-13','किशोराणां मनोविज्ञानम्'),topic('sanskrit-14','राष्ट्रबोधः'),topic('sanskrit-15','विश्ववन्दिता वैशाली')
]);
const sst=list('sst',[
 topic('sst-h1','भौगोलिक खोजें'),topic('sst-h2','अमेरिकी स्वतंत्रता संग्राम'),topic('sst-h3','फ्रांस की क्रांति'),topic('sst-h4','विश्व युद्धों का इतिहास'),topic('sst-h5','नाजीवाद'),topic('sst-h6','वन्य समाज और उपनिवेशवाद'),topic('sst-h7','शांति के प्रयास'),topic('sst-h8','कृषि और खेतीहर और समाज'),
 topic('sst-g1','स्थिति एवं विस्तार'),topic('sst-g2','भौतिक स्वरूप : संरचना एवं उच्चावच'),topic('sst-g3','अपवाह स्वरूप'),topic('sst-g4','जलवायु'),topic('sst-g5','प्राकृतिक वनस्पति एवं वन्य प्राणी'),topic('sst-g6','जनसंख्या'),topic('sst-g7','भारत के पड़ोसी देश'),topic('sst-g8','मानचित्र अध्ययन'),topic('sst-g9','क्षेत्रीय अध्ययन'),topic('sst-g10','आपदा प्रबंधन : एक परिचय'),topic('sst-g11','मानवी गलतियों के कारण घटित आपदाएं : नाभिकीय/जैविक/रासायनिक'),topic('sst-g12','सामान्य आपदाएँ : निवारण एवं नियंत्रण'),topic('sst-g13','समुदाय आधारित आपदा प्रबंधन'),
 topic('sst-c1','लोकतंत्र का क्रमिक विकास'),topic('sst-c2','लोकतंत्र क्या और क्यों?'),topic('sst-c3','संविधान निर्माण'),topic('sst-c4','चुनावी राजनीति'),topic('sst-c5','संसदीय लोकतंत्र की संस्थाएं'),topic('sst-c6','लोकतांत्रिक अधिकार'),
 topic('sst-e1','बिहार के एक गाँव की कहानी'),topic('sst-e2','मानव एक संसाधन'),topic('sst-e3','गरीबी'),topic('sst-e4','बेकारी'),topic('sst-e5','कृषि'),topic('sst-e6','खाद्यान्न सुरक्षा एवं गुणवत्ता'),topic('sst-e7','कृषक मजदूर')
]);
const english=list('english',[
 topic('english-reader-01','I’m going to dance again'),topic('english-reader-02','Scaling Great Heights'),topic('english-reader-03','Saint Kabir'),topic('english-reader-04','The eyes are not here'),topic('english-reader-05','Ismat Chughtai: A woman with a difference'),topic('english-reader-06','The accidental tourist'),topic('english-reader-07','Saint Ravidas'),topic('english-reader-08','Bharathipura'),
 topic('english-prose-01','Dharam Juddha'),topic('english-prose-02','Yayati'),topic('english-prose-03','A Silent Revolution'),topic('english-prose-04','Too Many People, Too Few Trees'),topic('english-prose-05','Echo and Narcissus'),topic('english-prose-06','The Shehnai of Bismillah Khan'),topic('english-prose-07','Kathmandu'),topic('english-prose-08','My Childhood'),topic('english-prose-09','The Gift of the Magi'),
 topic('english-poetry-01','The Grandmother'),topic('english-poetry-02','On His Blindness'),topic('english-poetry-03','Blow, Blow, Thou Winter Wind'),topic('english-poetry-04','To Daffodils'),topic('english-poetry-05','Sound'),topic('english-poetry-06','Self Introduction'),topic('english-poetry-07','I Am Like Grass'),topic('english-poetry-08','Abraham Lincoln’s Letter to His Son’s Teacher'),
 topic('english-skill-01','Tenses'),topic('english-skill-02','Modals'),topic('english-skill-03','Voice'),topic('english-skill-04','Subject-Verb Agreement'),topic('english-skill-05','Narration'),topic('english-skill-06','Clauses'),topic('english-skill-07','Determiners'),topic('english-skill-08','Prepositions'),topic('english-skill-09','Idioms'),topic('english-skill-10','Translation'),topic('english-skill-11','Paragraph / Essay'),topic('english-skill-12','Composition'),topic('english-skill-13','Formal Letter'),topic('english-skill-14','Informal Letter'),topic('english-skill-15','Notice Writing'),topic('english-skill-16','Report Writing'),topic('english-skill-17','Speech Writing'),topic('english-skill-18','Message Writing'),topic('english-skill-19','Factual Reading'),topic('english-skill-20','Literary Reading'),topic('english-skill-21','Poetry Reading')
]);
const reasoning=list('reasoning',[
 topic('reasoning-01','Number Series'),topic('reasoning-02','Alphabet Series'),topic('reasoning-03','Analogy'),topic('reasoning-04','Classification'),topic('reasoning-05','Coding-Decoding'),topic('reasoning-06','Direction & Blood Relations',['Direction and Blood Relations'])
]);

export const SUBJECT_REGISTRY=[
 {id:'math',name:'गणित',shortName:'Maths',topics:math},
 {id:'science',name:'विज्ञान',shortName:'Science',topics:science},
 {id:'hindi',name:'हिन्दी',shortName:'Hindi',topics:hindi},
 {id:'sanskrit',name:'संस्कृत',shortName:'Sanskrit',topics:sanskrit},
 {id:'sst',name:'सामाजिक विज्ञान',shortName:'SST',topics:sst},
 {id:'english',name:'अंग्रेज़ी',shortName:'English',topics:english},
 {id:'reasoning',name:'तर्कशक्ति',shortName:'Reasoning',topics:reasoning}
];

const fold=value=>String(value??'').normalize('NFKC').toLowerCase().replace(/[–—−]/g,'-').replace(/[’‘]/g,"'").replace(/[“”]/g,'"').replace(/[\u2000-\u200B]/g,' ').replace(/\s+/g,' ').trim().replace(/[.。,;:!?]+$/g,'');
const compact=value=>fold(value).replace(/[^\p{L}\p{N}]+/gu,'');
const subjectsById=new Map(SUBJECT_REGISTRY.map(s=>[s.id,s]));
const subjectsByName=new Map(SUBJECT_REGISTRY.flatMap(s=>[[fold(s.name),s],[fold(s.shortName),s],[fold(s.id),s]]));

export function resolveSubject(value){
 const key=fold(value);if(!key)return null;
 if(subjectsByName.has(key))return subjectsByName.get(key);
 const compactKey=compact(key);
 return SUBJECT_REGISTRY.find(s=>compact(s.name)===compactKey||compact(s.shortName)===compactKey||compact(s.id)===compactKey||
  (s.id==='sst'&&['socialscience','socialstudies','samaajikvigyan'].includes(compactKey))||
  (s.id==='reasoning'&&['reasoning','tarkshakti','aptitude'].includes(compactKey))||
  (s.id==='english'&&compactKey.includes('english'))||
  (s.id==='math'&&['math','mathematics','ganit'].includes(compactKey))||
  (s.id==='science'&&['science','vigyan'].includes(compactKey))||
  (s.id==='hindi'&&['hindi','hindii'].includes(compactKey))||
  (s.id==='sanskrit'&&['sanskrit','sanskritam'].includes(compactKey))
 )||null;
}

export function resolveTopic(subjectValue,chapterValue){
 const subject=typeof subjectValue==='string'?resolveSubject(subjectValue):subjectValue;
 if(!subject)return null;
 const key=fold(chapterValue);if(!key)return null;
 const exact=subject.topics.find(t=>[t.title,t.id,...t.aliases].some(x=>fold(x)===key||compact(x)===compact(key)));
 if(exact)return exact;
 const numeric=key.match(/^(?:chapter|ch|अध्याय)?\s*(\d{1,2})$/i);
 if(numeric){const index=Number(numeric[1]);return subject.topics[index-1]||null;}
 const ordinal=key.match(/(?:chapter|अध्याय)[\s_-]*(\d{1,2})/i);
 if(ordinal){const index=Number(ordinal[1]);return subject.topics[index-1]||null;}
 return subject.topics.find(t=>compact(t.title)===compact(key)||t.aliases.some(a=>compact(a)===compact(key)))||null;
}

export function registrySnapshot(){return Object.fromEntries(SUBJECT_REGISTRY.map(s=>[s.id,{id:s.id,name:s.name,total:s.topics.length,topics:s.topics.map(({id,title,order})=>({id,title,order}))}]));}
export const SUBJECT_IDS=SUBJECT_REGISTRY.map(s=>s.id);
export const TOTAL_TOPICS=SUBJECT_REGISTRY.reduce((n,s)=>n+s.topics.length,0);
export {fold};
