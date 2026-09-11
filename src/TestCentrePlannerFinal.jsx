import React,{useMemo,useState}from'react';

const SUBJECTS=[
  {id:'Maths',label:'गणित',icon:'📐'},
  {id:'Science',label:'विज्ञान',icon:'🔬'},
  {id:'Hindi',label:'हिन्दी',icon:'📚'},
  {id:'Sanskrit',label:'संस्कृत',icon:'🪷'},
  {id:'SST',label:'सामाजिक विज्ञान',icon:'🌍'},
  {id:'English',label:'English',icon:'🔤'},
  {id:'Reasoning',label:'तर्कशक्ति',icon:'🧠'}
];

const MATHS=['संख्या पद्धति','बहुपद','निर्देशांक ज्यामिति','दो चरों वाले रैखिक समीकरण','यूक्लिड की ज्यामिति का परिचय','रेखाएँ और कोण','त्रिभुज','चतुर्भुज','समान्तर चतुर्भुजों और त्रिभुजों का क्षेत्रफल','वृत्त','रचनाएँ','हीरोन का सूत्र','पृष्ठीय क्षेत्रफल एवं आयतन','सांख्यिकी','प्रायिकता'];
const SCIENCE=['हमारे आसपास के पदार्थ','क्या हमारे आसपास के पदार्थ शुद्ध हैं?','परमाणु एवं अणु','परमाणु की संरचना','जीवन की मौलिक इकाई — कोशिका','ऊतक','गति','बल तथा गति के नियम','गुरुत्वाकर्षण','कार्य तथा ऊर्जा','ध्वनि','खाद्य संसाधनों में सुधार','हम बीमार क्यों होते हैं','प्राकृतिक संसाधन','हमारा पर्यावरण'];

const HINDI=[
  ...['कहानी का प्लॉट','भारत का पुरातन विद्यापीठ : नालंदा','ग्राम-गीत का मर्म','लाल पान की बेगम','भारतीय चित्रपट : मूक फिल्मों से सवाक फिल्मों तक','अष्टावक्र','टॉलस्टाय के घर में','पधारो म्हारे देश','रेल-यात्रा','निबंध','सूखी नदी का पुल','शिक्षा में हेर-फेर'].map(title=>({title,group:'गोधूली — गद्य'})),
  ...['रैदास के पद','मंझन के पद','गुरु गोविंद सिंह के पद','पलक पाँवड़े','मैं नीर भरी दुःख की बदली','आ रही रवि के सवारी','पूरा हिन्दुस्तान मिलेगा','मेरा ईश्वर','रुको बच्चों','निम्मो की मौत','समुद्र','कुछ सवाल'].map(title=>({title,group:'गोधूली — काव्य'})),
  ...['बिहार का लोकगायन','बिहार की संगीत साधना','बिहार में नृत्यकला','बिहार की चित्रकला','मधुबनी की चित्रकला','बिहार में नाट्यकला','बिहार का सिनेमा संसार'].map(title=>({title,group:'वर्णिका भाग 1'})),
  ...['अपठित गद्यांश','निबंध लेखन','पत्र लेखन','संवाद लेखन','अनुच्छेद लेखन','लिंग','वचन','काल','वाच्य','संधि','समास','पर्यायवाची, विलोम और श्रुतिसमभिन्नार्थक','मुहावरे और अनेक शब्दों के लिए एक शब्द'].map(title=>({title,group:'व्याकरण एवं रचना'}))
];

const SANSKRIT=['ईशस्तुति:','लोभविष्टः चक्रधरः','यक्ष-युधिष्ठिर संवाद','चत्वारो वेदाः','संस्कृतस्य महिमा','संस्कृतसाहित्ये पर्यावरणम्','ज्ञानं भारः क्रियां विना','नीतिपधानिः','बिहारस्य संस्कृतिकं वैभवम्','ईद-महोत्सवः','ग्राम्यजीवनम्','वीर कूँवर सिंहः','किशोराणां मनोविज्ञानम्','राष्ट्रबोधः','विश्ववन्दिता वैशाली'];
const SST=[
  ...['भौगोलिक खोजें','अमेरिकी स्वतंत्रता संग्राम','फ्रांस की क्रांति','विश्व युद्धों का इतिहास','नाजीवाद','वन्य समाज और उपनिवेशवाद','शांति के प्रयास','कृषि और खेतीहर और समाज'].map(title=>`इतिहास — ${title}`),
  ...['स्थिति एवं विस्तार','भौतिक स्वरूप : संरचना एवं उच्चावच','अपवाह स्वरूप','जलवायु','प्राकृतिक वनस्पति एवं वन्य प्राणी','जनसंख्या','भारत के पड़ोसी देश','मानचित्र अध्ययन','क्षेत्रीय अध्ययन','आपदा प्रबंधन : एक परिचय','मानवी गलतियों के कारण घटित आपदाएं : नाभिकीय, जैविक और रासायनिक','सामान्य आपदाएँ : निवारण एवं नियंत्रण','समुदाय आधारित आपदा प्रबंधन'].map(title=>`भूगोल — ${title}`),
  ...['लोकतंत्र का क्रमिक विकास','लोकतंत्र क्या और क्यों?','संविधान निर्माण','चुनावी राजनीति','संसदीय लोकतंत्र की संस्थाएं','लोकतांत्रिक अधिकार'].map(title=>`नागरिक शास्त्र — ${title}`),
  ...['बिहार के एक गाँव की कहानी','मानव एक संसाधन','गरीबी','बेकारी','कृषि, खाद्यान्न सुरक्षा एवं गुणवत्ता','कृषक मजदूर'].map(title=>`अर्थशास्त्र — ${title}`)
];
const ENGLISH=[
  ...['I’m going to dance again','Scaling Great Heights','Saint Kabir','The eyes are not here','Ismat Chughtai: A woman with a difference','The accidental tourist','Saint Ravidas','Bharathipura'].map(title=>`Reader — ${title}`),
  ...['Dharam Juddha','Yayati','A Silent Revolution','Too Many People, Too Few Trees','Echo and Narcissus','The Shehnai of Bismillah Khan','Kathmandu','My Childhood','The Gift of the Magi'].map(title=>`Panorama Prose — ${title}`),
  ...['The Grandmother','On His Blindness','Blow, Blow, Thou Winter Wind','To Daffodils','Sound','Self Introduction','I Am Like Grass','Abraham Lincoln’s Letter to His Son’s Teacher'].map(title=>`Panorama Poetry — ${title}`),
  ...['Tenses','Modals','Voice','Subject-Verb Agreement','Narration','Clauses','Determiners','Prepositions','Idioms','Translation','Paragraph / Essay','Composition','Formal Letter','Informal Letter','Notice Writing','Report Writing','Speech Writing','Message Writing','Factual Reading','Literary Reading','Poetry Reading'].map(title=>`Language & Skills — ${title}`)
];
const REASONING=['Number Series','Alphabet Series','Analogy','Classification','Coding-Decoding','Direction & Blood Relations'];

const TESTS=[
 {n:'01',date:'13 Sep 2026',title:'Foundation Test',subtitle:'हल्का प्रवेश • basics first',sets:{
  Maths:['संख्या पद्धति','बहुपद'],Science:['हमारे आसपास के पदार्थ','क्या हमारे आसपास के पदार्थ शुद्ध हैं?'],
  Hindi:['गोधूली — गद्य • कहानी का प्लॉट','गोधूली — गद्य • भारत का पुरातन विद्यापीठ : नालंदा','गोधूली — काव्य • रैदास के पद','वर्णिका • बिहार का लोकगायन'],
  Sanskrit:['ईशस्तुति:','लोभविष्टः चक्रधरः'],SST:['इतिहास — भौगोलिक खोजें','इतिहास — अमेरिकी स्वतंत्रता संग्राम','भूगोल — स्थिति एवं विस्तार'],
  English:['Reader — I’m going to dance again','Reader — Scaling Great Heights','Panorama Prose — Dharam Juddha','Panorama Poetry — The Grandmother'],Reasoning:['Number Series']
 }},
 {n:'02',date:'27 Sep 2026',title:'Core Coverage Test',subtitle:'अगला built block',sets:{
  Maths:['निर्देशांक ज्यामिति','दो चरों वाले रैखिक समीकरण'],Science:['परमाणु एवं अणु','परमाणु की संरचना'],
  Hindi:['गोधूली — गद्य • ग्राम-गीत का मर्म','गोधूली — गद्य • लाल पान की बेगम','गोधूली — काव्य • मंझन के पद','गोधूली — काव्य • गुरु गोविंद सिंह के पद','वर्णिका • बिहार की संगीत साधना','व्याकरण एवं रचना • अपठित गद्यांश'],
  Sanskrit:['यक्ष-युधिष्ठिर संवाद','चत्वारो वेदाः'],SST:['इतिहास — फ्रांस की क्रांति','इतिहास — विश्व युद्धों का इतिहास','भूगोल — भौतिक स्वरूप : संरचना एवं उच्चावच','भूगोल — अपवाह स्वरूप'],
  English:['Reader — Saint Kabir','Reader — The eyes are not here','Panorama Prose — Yayati','Panorama Poetry — On His Blindness','Language & Skills — Tenses','Language & Skills — Modals'],Reasoning:['Alphabet Series']
 }},
 {n:'03',date:'11 Oct 2026',title:'Mid-Syllabus Test I',subtitle:'मध्य भाग • core progression',sets:{
  Maths:['यूक्लिड की ज्यामिति का परिचय','रेखाएँ और कोण'],Science:['जीवन की मौलिक इकाई — कोशिका','ऊतक'],
  Hindi:['गोधूली — गद्य • भारतीय चित्रपट : मूक फिल्मों से सवाक फिल्मों तक','गोधूली — गद्य • अष्टावक्र','गोधूली — काव्य • पलक पाँवड़े','गोधूली — काव्य • मैं नीर भरी दुःख की बदली','वर्णिका • बिहार में नृत्यकला','व्याकरण एवं रचना • निबंध लेखन','व्याकरण एवं रचना • पत्र लेखन'],
  Sanskrit:['संस्कृतस्य महिमा','संस्कृतसाहित्ये पर्यावरणम्'],SST:['इतिहास — नाजीवाद','इतिहास — वन्य समाज और उपनिवेशवाद','भूगोल — जलवायु','भूगोल — प्राकृतिक वनस्पति एवं वन्य प्राणी','भूगोल — जनसंख्या'],
  English:['Reader — Ismat Chughtai: A woman with a difference','Reader — The accidental tourist','Panorama Prose — A Silent Revolution','Panorama Prose — Too Many People, Too Few Trees','Panorama Poetry — Blow, Blow, Thou Winter Wind','Language & Skills — Voice','Language & Skills — Subject-Verb Agreement'],Reasoning:['Analogy']
 }},
 {n:'04',date:'25 Oct 2026',title:'Mid-Syllabus Test II',subtitle:'middle coverage + support content',sets:{
  Maths:['त्रिभुज','चतुर्भुज'],Science:['गति','बल तथा गति के नियम'],
  Hindi:['गोधूली — गद्य • टॉलस्टाय के घर में','गोधूली — गद्य • पधारो म्हारे देश','गोधूली — काव्य • आ रही रवि के सवारी','गोधूली — काव्य • पूरा हिन्दुस्तान मिलेगा','वर्णिका • बिहार की चित्रकला','व्याकरण एवं रचना • संवाद लेखन','व्याकरण एवं रचना • अनुच्छेद लेखन'],
  Sanskrit:['ज्ञानं भारः क्रियां विना','नीतिपधानिः'],SST:['इतिहास — शांति के प्रयास','इतिहास — कृषि और खेतीहर और समाज','भूगोल — भारत के पड़ोसी देश','भूगोल — मानचित्र अध्ययन','नागरिक शास्त्र — लोकतंत्र का क्रमिक विकास'],
  English:['Reader — Saint Ravidas','Reader — Bharathipura','Panorama Prose — Echo and Narcissus','Panorama Prose — The Shehnai of Bismillah Khan','Panorama Poetry — To Daffodils','Panorama Poetry — Sound','Language & Skills — Narration','Language & Skills — Clauses'],Reasoning:['Classification']
 }},
 {n:'05',date:'08 Nov 2026',title:'Late-Syllabus Test',subtitle:'late core + reinforcement',sets:{
  Maths:['समान्तर चतुर्भुजों और त्रिभुजों का क्षेत्रफल','वृत्त'],Science:['गुरुत्वाकर्षण','कार्य तथा ऊर्जा'],
  Hindi:['गोधूली — गद्य • रेल-यात्रा','गोधूली — गद्य • निबंध','गोधूली — काव्य • मेरा ईश्वर','गोधूली — काव्य • रुको बच्चों','वर्णिका • मधुबनी की चित्रकला','व्याकरण एवं रचना • लिंग','व्याकरण एवं रचना • वचन'],
  Sanskrit:['बिहारस्य संस्कृतिकं वैभवम्','ईद-महोत्सवः'],SST:['भूगोल — क्षेत्रीय अध्ययन','भूगोल — आपदा प्रबंधन : एक परिचय','भूगोल — मानवी गलतियों के कारण घटित आपदाएं : नाभिकीय, जैविक और रासायनिक','भूगोल — सामान्य आपदाएँ : निवारण एवं नियंत्रण','भूगोल — समुदाय आधारित आपदा प्रबंधन','नागरिक शास्त्र — लोकतंत्र क्या और क्यों?','नागरिक शास्त्र — संविधान निर्माण','नागरिक शास्त्र — चुनावी राजनीति'],
  English:['Panorama Prose — Kathmandu','Panorama Prose — My Childhood','Panorama Poetry — Self Introduction','Language & Skills — Determiners','Language & Skills — Prepositions','Language & Skills — Idioms','Language & Skills — Translation','Language & Skills — Paragraph / Essay'],Reasoning:['Coding-Decoding']
 }},
 {n:'06',date:'22 Nov 2026',title:'Advanced Coverage Test',subtitle:'advanced coverage + completion',sets:{
  Maths:['रचनाएँ','हीरोन का सूत्र'],Science:['ध्वनि','खाद्य संसाधनों में सुधार'],
  Hindi:['गोधूली — गद्य • सूखी नदी का पुल','गोधूली — गद्य • शिक्षा में हेर-फेर','गोधूली — काव्य • निम्मो की मौत','गोधूली — काव्य • समुद्र','वर्णिका • बिहार में नाट्यकला','व्याकरण एवं रचना • काल','व्याकरण एवं रचना • वाच्य','व्याकरण एवं रचना • संधि'],
  Sanskrit:['ग्राम्यजीवनम्','वीर कूँवर सिंहः'],SST:['नागरिक शास्त्र — संसदीय लोकतंत्र की संस्थाएं','नागरिक शास्त्र — लोकतांत्रिक अधिकार','अर्थशास्त्र — बिहार के एक गाँव की कहानी','अर्थशास्त्र — मानव एक संसाधन','अर्थशास्त्र — गरीबी'],
  English:['Panorama Prose — The Gift of the Magi','Panorama Poetry — I Am Like Grass','Language & Skills — Composition','Language & Skills — Formal Letter','Language & Skills — Informal Letter','Language & Skills — Notice Writing'],Reasoning:['Direction & Blood Relations']
 }},
 {n:'07',date:'06 Dec 2026',title:'Completion Push Test',subtitle:'remaining chapters + final language skills',sets:{
  Maths:['पृष्ठीय क्षेत्रफल एवं आयतन','सांख्यिकी','प्रायिकता'],Science:['हम बीमार क्यों होते हैं','प्राकृतिक संसाधन','हमारा पर्यावरण'],
  Hindi:['गोधूली — काव्य • समुद्र','गोधूली — काव्य • कुछ सवाल','वर्णिका • बिहार का सिनेमा संसार','व्याकरण एवं रचना • समास','व्याकरण एवं रचना • पर्यायवाची, विलोम और श्रुतिसमभिन्नार्थक','व्याकरण एवं रचना • मुहावरे और अनेक शब्दों के लिए एक शब्द'],
  Sanskrit:['किशोराणां मनोविज्ञानम्','राष्ट्रबोधः','विश्ववन्दिता वैशाली'],SST:['अर्थशास्त्र — बेकारी','अर्थशास्त्र — कृषि, खाद्यान्न सुरक्षा एवं गुणवत्ता','अर्थशास्त्र — कृषक मजदूर'],
  English:['Reader — Saint Ravidas','Reader — Bharathipura','Panorama Poetry — Abraham Lincoln’s Letter to His Son’s Teacher','Language & Skills — Report Writing','Language & Skills — Speech Writing','Language & Skills — Message Writing','Language & Skills — Factual Reading','Language & Skills — Literary Reading','Language & Skills — Poetry Reading'],Reasoning:['Mixed revision — सभी 6 chapters']
 }},
 {n:'08',date:'20 Dec 2026',title:'Full Syllabus SuperTest',subtitle:'100% first-pass completion checkpoint',full:true},
 {n:'09',date:'03 Jan 2027',title:'Full Syllabus Revision I',subtitle:'balanced mixed revision',mode:'revision'},
 {n:'10',date:'17 Jan 2027',title:'Weak-Area SuperTest',subtitle:'performance-weighted revision',mode:'adaptive'},
 {n:'11',date:'31 Jan 2027',title:'BSEB-Style Full Mock',subtitle:'complete examination simulation',mode:'mock'},
 {n:'12',date:'14 Feb 2027',title:'Final Readiness SuperTest',subtitle:'full syllabus + difficult mixed questions',mode:'readiness'},
 {n:'Final',date:'28 Feb 2027',title:'Final Examination',subtitle:'complete eligible website-built syllabus',mode:'final'}
];

const FULL={
 Maths:MATHS,Science:SCIENCE,Hindi:HINDI.map(x=>`${x.group} • ${x.title}`),
 Sanskrit:SANSKRIT,SST,English,Reasoning:REASONING
};
const totalEligible=Object.values(FULL).reduce((n,a)=>n+a.length,0);

const css={
 page:{minHeight:'100vh',background:'linear-gradient(180deg,#f7f9fc 0%,#eef2f7 100%)',color:'#172033',fontFamily:'Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',padding:'22px 14px 60px'},
 wrap:{maxWidth:1240,margin:'0 auto'},
 header:{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,marginBottom:16},
 ghost:{border:0,background:'transparent',padding:'9px 3px',fontWeight:800,color:'#536176',cursor:'pointer'},
 hero:{position:'relative',overflow:'hidden',borderRadius:30,padding:'30px 28px',background:'linear-gradient(135deg,#10203d 0%,#1e3d69 58%,#315f88 100%)',color:'#fff',boxShadow:'0 25px 70px rgba(20,35,60,.18)'},
 orb:{position:'absolute',right:-110,top:-120,width:280,height:280,borderRadius:'50%',background:'rgba(255,255,255,.07)'},
 eyebrow:{fontSize:11,fontWeight:900,letterSpacing:1.8,opacity:.75},
 h1:{margin:'8px 0 8px',fontSize:'clamp(34px,6vw,58px)',lineHeight:1.02,letterSpacing:-1.7},
 lead:{margin:0,maxWidth:780,lineHeight:1.65,opacity:.92},
 statGrid:{display:'grid',gridTemplateColumns:'repeat(4,minmax(0,1fr))',gap:9,marginTop:22},
 stat:{padding:'11px 12px',borderRadius:15,background:'rgba(255,255,255,.09)',border:'1px solid rgba(255,255,255,.12)'},
 statNum:{display:'block',fontSize:21,fontWeight:950},statLabel:{fontSize:10.5,opacity:.72},
 section:{marginTop:20},sectionTitle:{margin:0,fontSize:24,letterSpacing:-.4},muted:{margin:'5px 0 12px',color:'#68768b',fontSize:13.5,lineHeight:1.55},
 entryGrid:{display:'grid',gridTemplateColumns:'minmax(0,1.5fr) minmax(280px,.8fr)',gap:14},
 card:{background:'#fff',border:'1px solid #e4e9f1',borderRadius:22,padding:19,boxShadow:'0 10px 30px rgba(19,34,58,.06)'},
 date:{fontSize:11,fontWeight:900,letterSpacing:1.2,color:'#647188'},nextDate:{marginTop:5,fontSize:29,fontWeight:950},nextTitle:{margin:'5px 0 3px',fontSize:22,fontWeight:900},nextSub:{margin:0,color:'#657188',fontSize:13.5,lineHeight:1.5},
 countdown:{display:'inline-flex',marginTop:13,padding:'8px 11px',borderRadius:999,background:'#edf2ff',color:'#273b66',fontWeight:900,fontSize:12},actions:{display:'flex',flexWrap:'wrap',gap:9,marginTop:16},
 primary:{border:0,borderRadius:13,padding:'12px 15px',background:'#182238',color:'#fff',fontWeight:900,cursor:'pointer'},secondary:{border:'1px solid #d8dfeb',borderRadius:13,padding:'12px 15px',background:'#fff',color:'#25324a',fontWeight:850,cursor:'pointer'},
 featureGrid:{display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:12},feature:{background:'#fff',border:'1px solid #e4e9f1',borderRadius:19,padding:16},featureIcon:{fontSize:20,marginBottom:8},featureTitle:{margin:0,fontSize:15.5,fontWeight:900},featureText:{margin:'5px 0 0',fontSize:12.5,color:'#68768b',lineHeight:1.5},
 controls:{display:'flex',flexWrap:'wrap',gap:8,margin:'12px 0 14px'},chip:{border:'1px solid #d7deea',borderRadius:999,padding:'8px 11px',background:'#fff',fontWeight:850,color:'#516078',cursor:'pointer'},chipOn:{background:'#182238',borderColor:'#182238',color:'#fff'},
 testCards:{display:'grid',gap:12},testCard:{background:'#fff',border:'1px solid #e1e7f0',borderRadius:21,padding:17,boxShadow:'0 8px 24px rgba(18,32,55,.05)'},testHead:{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:12},testNo:{fontSize:11,fontWeight:950,letterSpacing:1.3,color:'#718097'},testTitle:{margin:'3px 0',fontSize:19,fontWeight:900},testSub:{margin:0,color:'#68768b',fontSize:12.5,lineHeight:1.45},pill:{padding:'7px 9px',borderRadius:10,background:'#f0f4fa',color:'#516078',fontSize:11,fontWeight:900,whiteSpace:'nowrap'},
 subjectGrid:{display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:10,marginTop:14},subjectCard:{border:'1px solid #e5eaf2',borderRadius:16,padding:13,background:'#fbfcfe'},subjectHead:{display:'flex',justifyContent:'space-between',gap:8,alignItems:'center'},subjectName:{fontWeight:900,fontSize:13.5},countPill:{padding:'4px 7px',borderRadius:999,background:'#eef2f8',fontSize:10.5,fontWeight:900,color:'#59677d'},chapterList:{margin:'9px 0 0',paddingLeft:18},chapter:{fontSize:11.7,color:'#3e4b61',lineHeight:1.5,marginBottom:3},
 fullBox:{marginTop:14,padding:14,borderRadius:16,background:'linear-gradient(135deg,#f0f4ff,#f8faff)',border:'1px solid #dce4f6'},fullGrid:{display:'grid',gridTemplateColumns:'repeat(4,minmax(0,1fr))',gap:8,marginTop:10},fullStat:{background:'#fff',border:'1px solid #e2e7f0',borderRadius:13,padding:10},miniNum:{display:'block',fontSize:18,fontWeight:950},miniLabel:{fontSize:10,color:'#6a778c'},footerNote:{marginTop:16,padding:13,borderRadius:15,background:'#fff',border:'1px dashed #cbd4e2',fontSize:12.5,color:'#617087',lineHeight:1.55}
};

function daysUntil(date){const d=new Date(date),now=new Date();d.setHours(0,0,0,0);now.setHours(0,0,0,0);return Math.max(0,Math.ceil((d-now)/86400000));}
function formatScope(test){if(test.full)return 'पूरा eligible syllabus';if(['09','10','11','12','Final'].includes(test.n))return 'Full-syllabus phase';const total=Object.values(test.sets||{}).reduce((n,a)=>n+(Array.isArray(a)?a.length:0),0);return `${total} planned components`;}

function Entry({goPlanner}){const next=TESTS[0];return <div style={css.page}><div style={css.wrap}><div style={css.header}><div style={{fontWeight:950,letterSpacing:.3}}>CLASS 9 LEARNING HUB</div><button style={css.ghost} onClick={()=>window.history.back()}>← Home</button></div><div style={css.hero}><div style={css.orb}/><div style={css.eyebrow}>TEST CENTRE • 2026–27</div><h1 style={css.h1}>SuperTest Centre</h1><p style={css.lead}>Chapter-wise testing, one clean progression: light foundation → coverage → full-syllabus mastery → mocks → final examination.</p><div style={css.statGrid}><div style={css.stat}><span style={css.statNum}>{totalEligible}</span><span style={css.statLabel}>eligible components</span></div><div style={css.stat}><span style={css.statNum}>7</span><span style={css.statLabel}>subjects</span></div><div style={css.stat}><span style={css.statNum}>13</span><span style={css.statLabel}>test dates</span></div><div style={css.stat}><span style={css.statNum}>08</span><span style={css.statLabel}>full-syllabus checkpoint</span></div></div></div><section style={css.section}><div style={css.entryGrid}><div style={css.card}><div style={css.date}>NEXT TEST</div><div style={css.nextDate}>{next.date}</div><div style={css.nextTitle}>Test {next.n} • {next.title}</div><p style={css.nextSub}>{next.subtitle}</p><div style={css.countdown}>{daysUntil(next.date)} days to go</div><div style={css.actions}><button style={css.primary} onClick={()=>goPlanner('01')}>Open Test 01 plan →</button><button style={css.secondary} onClick={()=>goPlanner('01')}>View full test planner</button></div></div><div style={css.card}><div style={css.date}>PLANNER LOGIC</div><h2 style={{margin:'7px 0 8px',fontSize:18}}>One syllabus. One progression.</h2><p style={{margin:0,color:'#657188',fontSize:13,lineHeight:1.55}}>Test 01 is deliberately light. Tests 01–07 introduce the eligible syllabus in planned blocks. Test 08 checks the complete first pass. Tests 09–Final are revision and examination phase.</p></div></div></section><section style={css.section}><h2 style={css.sectionTitle}>What is inside?</h2><p style={css.muted}>Only the material defined as eligible for the Learning Hub.</p><div style={css.featureGrid}><div style={css.feature}><div style={css.featureIcon}>📚</div><h3 style={css.featureTitle}>Hindi is integrated</h3><p style={css.featureText}>गोधूली गद्य + काव्य + वर्णिका + व्याकरण एवं रचना.</p></div><div style={css.feature}><div style={css.featureIcon}>🪷</div><h3 style={css.featureTitle}>Sanskrit stays focused</h3><p style={css.featureText}>Only पीयूषम् भाग-1 Primary. द्रुतपाठय supplementary is excluded.</p></div><div style={css.feature}><div style={css.featureIcon}>🔤</div><h3 style={css.featureTitle}>English is scoped</h3><p style={css.featureText}>Reader + Panorama + Language & Skills. Read, Think & Enjoy is excluded.</p></div></div></section></div></div>}

function Planner({initialTest='01',goEntry}){const[filter,setFilter]=useState('All'),[open,setOpen]=useState(initialTest),[subject,setSubject]=useState('All');const tests=useMemo(()=>filter==='All'?TESTS:TESTS.filter(t=>t.n===filter),[filter]);return <div style={css.page}><div style={css.wrap}><div style={css.header}><div><div style={{fontWeight:950,letterSpacing:.3}}>SUPERTEST PLANNER</div><div style={{fontSize:11,color:'#738096',marginTop:2}}>Chapter-wise master schedule • 2026–27</div></div><button style={css.ghost} onClick={goEntry}>← Test Centre</button></div><div style={css.card}><div style={css.date}>MASTER SCHEDULE</div><h1 style={{margin:'6px 0 4px',fontSize:'clamp(28px,5vw,44px)',letterSpacing:-1}}>Every eligible chapter, placed deliberately.</h1><p style={css.muted}>First-pass coverage through Test 07 → full checkpoint at Test 08 → revision, mock and final phase.</p><div style={css.controls}>{['All',...TESTS.map(t=>t.n)].map(x=><button key={x} onClick={()=>{setFilter(x);if(x!=='All')setOpen(x)}} style={{...css.chip,...(filter===x?css.chipOn:{})}}>{x==='All'?'All Tests':`Test ${x}`}</button>)}</div><div style={css.controls}><button onClick={()=>setSubject('All')} style={{...css.chip,...(subject==='All'?css.chipOn:{})}}>All Subjects</button>{SUBJECTS.map(s=><button key={s.id} onClick={()=>setSubject(s.id)} style={{...css.chip,...(subject===s.id?css.chipOn:{})}}>{s.icon} {s.label}</button>)}</div></div><section style={css.section}><h2 style={css.sectionTitle}>Tests 01–07 • First-pass chapter sequence</h2><p style={css.muted}>The chapter lists below are the planned coverage. Test 08 is the complete checkpoint.</p><div style={css.testCards}>{tests.map(test=>{const expanded=open===test.n;const entries=test.sets?Object.entries(test.sets).filter(([k])=>subject==='All'||k===subject):[];return <div key={test.n} style={css.testCard}><div style={css.testHead}><button onClick={()=>setOpen(expanded?'':test.n)} style={{border:0,background:'transparent',padding:0,textAlign:'left',cursor:'pointer',flex:1}}><div style={css.testNo}>TEST {test.n} • {test.date}</div><div style={css.testTitle}>{test.title}</div><p style={css.testSub}>{test.subtitle} • {formatScope(test)}</p></button><div style={css.pill}>{expanded?'Hide':'View plan'}</div></div>{test.full?<div style={css.fullBox}><strong>🏁 Full Syllabus SuperTest</strong><div style={css.fullGrid}>{SUBJECTS.map(s=><div key={s.id} style={css.fullStat}><span style={css.miniNum}>{FULL[s.id].length}</span><span style={css.miniLabel}>{s.label}</span></div>)}</div><div style={{marginTop:9,fontSize:12,color:'#56667f'}}>All {totalEligible} eligible components. No new chapter after this checkpoint.</div></div>:test.mode?<div style={css.fullBox}><strong>{test.mode==='adaptive'?'Adaptive Weak-Area Revision':test.mode==='final'?'Final Examination':test.mode==='readiness'?'Final Readiness SuperTest':'Full-Syllabus Mock / Revision'}</strong><div style={{marginTop:6,fontSize:12,color:'#56667f'}}>{test.subtitle}. Full eligible syllabus is used from this phase onward.</div></div>:expanded&&<div style={css.subjectGrid}>{entries.map(([key,items])=><div key={key} style={css.subjectCard}><div style={css.subjectHead}><div style={css.subjectName}>{SUBJECTS.find(x=>x.id===key)?.icon} {SUBJECTS.find(x=>x.id===key)?.label||key}</div><div style={css.countPill}>{items.length}</div></div><ol style={css.chapterList}>{items.map((item,i)=><li key={`${item}-${i}`} style={css.chapter}>{item}</li>)}</ol></div>)}</div>}</div>})}</div><div style={css.footerNote}><strong>🔒 Scope lock:</strong> Hindi includes गोधूली + वर्णिका + व्याकरण एवं रचना. Sanskrit supplementary `द्रुतपाठय` is excluded. English `Read, Think & Enjoy` is excluded. Reasoning is included.</div></section></div></div>}

export default function TestCentrePlannerFinal(){const[view,setView]=useState('entry'),[startTest,setStartTest]=useState('01');const goPlanner=(test='01')=>{setStartTest(test);setView('planner');window.scrollTo({top:0,behavior:'smooth'})};return view==='planner'?<Planner initialTest={startTest} goEntry={()=>{setView('entry');window.scrollTo({top:0,behavior:'smooth'})}}/>:<Entry goPlanner={goPlanner}/>;}
