import React,{useMemo,useState}from'react';

const SUBJECTS=['Maths','Science','Hindi','Sanskrit','SST','English','Reasoning'];
const META={Maths:'गणित',Science:'विज्ञान',Hindi:'हिन्दी',Sanskrit:'संस्कृत',SST:'सामाजिक विज्ञान',English:'अंग्रेज़ी',Reasoning:'तर्कशक्ति'};

const MATHS=['संख्या पद्धति','बहुपद','निर्देशांक ज्यामिति','दो चरों वाले रैखिक समीकरण','यूक्लिड की ज्यामिति का परिचय','रेखाएँ और कोण','त्रिभुज','चतुर्भुज','समान्तर चतुर्भुजों और त्रिभुजों का क्षेत्रफल','वृत्त','रचनाएँ','हीरोन का सूत्र','पृष्ठीय क्षेत्रफल एवं आयतन','सांख्यिकी','प्रायिकता'];
const SCIENCE=['हमारे आसपास के पदार्थ','क्या हमारे आसपास के पदार्थ शुद्ध हैं?','परमाणु एवं अणु','परमाणु की संरचना','जीवन की मौलिक इकाई — कोशिका','ऊतक','गति','बल तथा गति के नियम','गुरुत्वाकर्षण','कार्य तथा ऊर्जा','ध्वनि','खाद्य संसाधनों में सुधार','हम बीमार क्यों होते हैं','प्राकृतिक संसाधन','हमारा पर्यावरण'];
const HINDI_GADHYA=['कहानी का प्लॉट','भारत का पुरातन विद्यापीठ : नालंदा','ग्राम-गीत का मर्म','लाल पान की बेगम','भारतीय चित्रपट : मूक फिल्मों से सवाक फिल्मों तक','अष्टावक्र','टॉलस्टाय के घर में','पधारो म्हारे देश','रेल-यात्रा','निबंध','सूखी नदी का पुल','शिक्षा में हेर-फेर'];
const HINDI_KAVYA=['रैदास के पद','मंझन के पद','गुरु गोविंद सिंह के पद','पलक पाँवड़े','मैं नीर भरी दुःख की बदली','आ रही रवि के सवारी','पूरा हिन्दुस्तान मिलेगा','मेरा ईश्वर','रुको बच्चों','निम्मो की मौत','समुद्र','कुछ सवाल'];
const HINDI_VARNIKA=['बिहार का लोकगायन','बिहार की संगीत साधना','बिहार में नृत्यकला','बिहार की चित्रकला','मधुबनी की चित्रकला','बिहार में नाट्यकला','बिहार का सिनेमा संसार'];
const HINDI_GRAMMAR=['अपठित गद्यांश','निबंध लेखन','पत्र लेखन','संवाद लेखन','अनुच्छेद लेखन','लिंग','वचन','काल','वाच्य','संधि','समास','पर्यायवाची, विलोम और श्रुतिसमभिन्नार्थक','मुहावरे और अनेक शब्दों के लिए एक शब्द'];
const HINDI=[...HINDI_GADHYA,...HINDI_KAVYA,...HINDI_VARNIKA,...HINDI_GRAMMAR];
const SANSKRIT=['ईशस्तुति:','लोभविष्टः चक्रधरः','यक्ष-युधिष्ठिर संवाद','चत्वारो वेदाः','संस्कृतस्य महिमा','संस्कृतसाहित्ये पर्यावरणम्','ज्ञानं भारः क्रियां विना','नीतिपधानिः','बिहारस्य संस्कृतिकं वैभवम्','ईद-महोत्सवः','ग्राम्यजीवनम्','वीर कूँवर सिंहः','किशोराणां मनोविज्ञानम्','राष्ट्रबोधः','विश्ववन्दिता वैशाली'];
const SST=[
 ...['भौगोलिक खोजें','अमेरिकी स्वतंत्रता संग्राम','फ्रांस की क्रांति','विश्व युद्धों का इतिहास','नाजीवाद','वन्य समाज और उपनिवेशवाद','शांति के प्रयास','कृषि और खेतीहर और समाज'].map(x=>`इतिहास — ${x}`),
 ...['स्थिति एवं विस्तार','भौतिक स्वरूप : संरचना एवं उच्चावच','अपवाह स्वरूप','जलवायु','प्राकृतिक वनस्पति एवं वन्य प्राणी','जनसंख्या','भारत के पड़ोसी देश','मानचित्र अध्ययन','क्षेत्रीय अध्ययन','आपदा प्रबंधन : एक परिचय','मानवी गलतियों के कारण घटित आपदाएं : नाभिकीय, जैविक और रासायनिक','सामान्य आपदाएँ : निवारण एवं नियंत्रण','समुदाय आधारित आपदा प्रबंधन'].map(x=>`भूगोल — ${x}`),
 ...['लोकतंत्र का क्रमिक विकास','लोकतंत्र क्या और क्यों?','संविधान निर्माण','चुनावी राजनीति','संसदीय लोकतंत्र की संस्थाएं','लोकतांत्रिक अधिकार'].map(x=>`नागरिक शास्त्र — ${x}`),
 ...['बिहार के एक गाँव की कहानी','मानव एक संसाधन','गरीबी','बेकारी','कृषि, खाद्यान्न सुरक्षा एवं गुणवत्ता','कृषक मजदूर'].map(x=>`अर्थशास्त्र — ${x}`)
];
const ENGLISH_READER=["Reader 1 — I’m going to dance again","Reader 2 — Scaling Great Heights","Reader 3 — Saint Kabir","Reader 4 — The eyes are not here","Reader 5 — Ismat Chughtai: A woman with a difference","Reader 6 — The accidental tourist","Reader 7 — Saint Ravidas","Reader 8 — Bharathipura"];
const ENGLISH_PROSE=['Prose 1 — Dharam Juddha','Prose 2 — Yayati','Prose 3 — A Silent Revolution','Prose 4 — Too Many People, Too Few Trees','Prose 5 — Echo and Narcissus','Prose 6 — The Shehnai of Bismillah Khan','Prose 7 — Kathmandu','Prose 8 — My Childhood','Prose 9 — The Gift of the Magi'];
const ENGLISH_POETRY=['Poetry 10 — The Grandmother','Poetry 11 — On His Blindness','Poetry 12 — Blow, Blow, Thou Winter Wind','Poetry 13 — To Daffodils','Poetry 14 — Sound','Poetry 15 — Self Introduction','Poetry 16 — I Am Like Grass','Poetry 17 — Abraham Lincoln’s Letter to His Son’s Teacher'];
const ENGLISH_LANGUAGE=['Tenses','Modals','Voice','Subject-Verb Agreement','Narration','Clauses','Determiners','Prepositions','Idioms','Translation','Paragraph / Essay','Composition','Formal Letter','Informal Letter','Notice Writing','Report Writing','Speech Writing','Message Writing','Factual Reading','Literary Reading','Poetry Reading'];
const ENGLISH=[...ENGLISH_READER,...ENGLISH_PROSE,...ENGLISH_POETRY,...ENGLISH_LANGUAGE];
const REASONING=['Number Series','Alphabet Series','Analogy','Classification','Coding-Decoding','Direction & Blood Relations'];

const FULL={Maths:MATHS,Science:SCIENCE,Hindi:HINDI,Sanskrit:SANSKRIT,SST,English,Reasoning};
const range=(arr,a,b)=>arr.slice(a,b);
const TESTS=[
 {n:'01',date:'13 Sep 2026',title:'Foundation Test',label:'पहला chapter block',sets:{Maths:range(MATHS,0,2),Science:range(SCIENCE,0,2),Hindi:[...range(HINDI_GADHYA,0,3),HINDI_KAVYA[0]],Sanskrit:range(SANSKRIT,0,2),SST:range(SST,0,5),English:[...range(ENGLISH_READER,0,2),ENGLISH_PROSE[0]],Reasoning:[REASONING[0]]}},
 {n:'02',date:'27 Sep 2026',title:'Core Coverage Test',label:'अगला chapter block',sets:{Maths:range(MATHS,2,4),Science:range(SCIENCE,2,4),Hindi:[...range(HINDI_GADHYA,3,6),HINDI_KAVYA[1]],Sanskrit:range(SANSKRIT,2,4),SST:range(SST,5,10),English:[...range(ENGLISH_READER,2,4),ENGLISH_PROSE[1],ENGLISH_LANGUAGE[0]],Reasoning:[REASONING[1]]}},
 {n:'03',date:'11 Oct 2026',title:'Early-Mid Syllabus Test',label:'मध्य की ओर बढ़ता coverage',sets:{Maths:range(MATHS,4,6),Science:range(SCIENCE,4,6),Hindi:[...range(HINDI_GADHYA,6,9),...range(HINDI_KAVYA,2,4)],Sanskrit:range(SANSKRIT,4,6),SST:range(SST,10,15),English:[...range(ENGLISH_READER,4,6),ENGLISH_PROSE[2],ENGLISH_POETRY[0]],Reasoning:[REASONING[2]]}},
 {n:'04',date:'25 Oct 2026',title:'Mid-Syllabus Test',label:'middle chapters + Varnika शुरू',sets:{Maths:range(MATHS,6,8),Science:range(SCIENCE,6,8),Hindi:[...range(HINDI_GADHYA,9,12),...range(HINDI_KAVYA,4,6),HINDI_VARNIKA[0]],Sanskrit:range(SANSKRIT,6,8),SST:range(SST,15,20),English:[...range(ENGLISH_PROSE,3,5),...range(ENGLISH_POETRY,1,2),ENGLISH_READER[6]],Reasoning:[REASONING[3]]}},
 {n:'05',date:'08 Nov 2026',title:'Late-Syllabus Test',label:'late chapters + Varnika expansion',sets:{Maths:range(MATHS,8,10),Science:range(SCIENCE,8,10),Hindi:[...range(HINDI_KAVYA,6,9),...range(HINDI_VARNIKA,1,4)],Sanskrit:range(SANSKRIT,8,10),SST:range(SST,20,25),English:[...range(ENGLISH_PROSE,5,7),...range(ENGLISH_POETRY,2,4),ENGLISH_LANGUAGE[1]],Reasoning:[REASONING[4]]}},
 {n:'06',date:'22 Nov 2026',title:'Advanced Coverage Test',label:'remaining literature + grammar + final core chapters',sets:{Maths:range(MATHS,10,12),Science:range(SCIENCE,10,12),Hindi:[...range(HINDI_KAVYA,9,12),...range(HINDI_VARNIKA,4,7),...range(HINDI_GRAMMAR,0,4)],Sanskrit:range(SANSKRIT,10,12),SST:range(SST,25,33),English:[...range(ENGLISH_PROSE,7,9),...range(ENGLISH_POETRY,4,6),...range(ENGLISH_LANGUAGE,2,6)],Reasoning:[REASONING[5]]}},
 {n:'07',date:'06 Dec 2026',title:'Completion Push Test',label:'नए chapters समाप्त + language skills',sets:{Maths:range(MATHS,12,15),Science:range(SCIENCE,12,15),Hindi:[...range(HINDI_GRAMMAR,4,13)],Sanskrit:range(SANSKRIT,12,15),SST:range(SST,0,12),English:[...range(ENGLISH_POETRY,6,8),...range(ENGLISH_LANGUAGE,6,15)],Reasoning:REASONING}},
 {n:'08',date:'20 Dec 2026',title:'First-Pass Completion Test',label:'100% eligible website-built syllabus',sets:FULL,mode:'completion'},
 {n:'09',date:'03 Jan 2027',title:'Full Syllabus Revision I',label:'सभी chapters की balanced revision',sets:FULL,mode:'revision'},
 {n:'10',date:'17 Jan 2027',title:'Weak-Area + Mixed Revision',label:'performance-based weighted revision',sets:null,mode:'adaptive'},
 {n:'11',date:'31 Jan 2027',title:'BSEB-Style Full Mock',label:'पूरा eligible syllabus',sets:null,mode:'mock'},
 {n:'12',date:'14 Feb 2027',title:'Final Readiness Test',label:'final mixed readiness',sets:null,mode:'mock'},
 {n:'Final',date:'28 Feb 2027',title:'Final Examination',label:'पूरा eligible website-built syllabus',sets:null,mode:'final'}
];

const parseDate=s=>{const [d,m,y]=s.split(' ');return new Date(`${m} ${d}, ${y} 00:00:00`)};
const daysUntil=d=>Math.max(0,Math.ceil((parseDate(d)-new Date())/86400000));
const total=n=>Object.values(FULL).reduce((a,x)=>a+x.length,0);

const styles={page:{minHeight:'100vh',padding:'24px 16px 60px',background:'linear-gradient(180deg,#f6f8fc,#eef2f8)',fontFamily:'Inter,system-ui,-apple-system,"Segoe UI",sans-serif',color:'#172033'},wrap:{maxWidth:1240,margin:'0 auto'},hero:{background:'linear-gradient(135deg,#111b31,#294c79)',color:'#fff',borderRadius:28,padding:'28px',boxShadow:'0 20px 60px rgba(15,23,42,.18)'},eyebrow:{fontSize:11,fontWeight:900,letterSpacing:2,opacity:.75},h1:{fontSize:'clamp(34px,6vw,58px)',lineHeight:1,margin:'8px 0'},lead:{maxWidth:850,lineHeight:1.6,opacity:.9},stats:{display:'grid',gridTemplateColumns:'repeat(4,minmax(0,1fr))',gap:10,marginTop:22},stat:{background:'rgba(255,255,255,.08)',border:'1px solid rgba(255,255,255,.14)',borderRadius:16,padding:13},statN:{display:'block',fontWeight:950,fontSize:22},statL:{fontSize:11,opacity:.75},section:{marginTop:20},panel:{background:'#fff',border:'1px solid #e1e7f0',borderRadius:22,padding:18,boxShadow:'0 8px 30px rgba(15,23,42,.05)'},controls:{display:'flex',gap:8,flexWrap:'wrap',margin:'14px 0'},chip:{border:'1px solid #d8dfeb',background:'#fff',borderRadius:999,padding:'9px 13px',fontWeight:850,cursor:'pointer'},chipOn:{background:'#172033',borderColor:'#172033',color:'#fff'},grid:{display:'grid',gap:14},card:{background:'#fff',border:'1px solid #e1e7f0',borderRadius:20,padding:18,boxShadow:'0 7px 24px rgba(15,23,42,.045)'},top:{display:'flex',justifyContent:'space-between',gap:12,alignItems:'flex-start'},num:{fontSize:11,fontWeight:950,letterSpacing:1.2},date:{fontSize:12,color:'#667085',fontWeight:800},title:{margin:'4px 0 5px',fontSize:20},label:{margin:0,color:'#667085',fontSize:13,lineHeight:1.45},subjectGrid:{display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:10,marginTop:13},subject:{border:'1px solid #e7ebf2',borderRadius:15,padding:12},subjectName:{fontWeight:900,fontSize:13,marginBottom:6},chapterList:{margin:0,paddingLeft:18,color:'#4a5568',fontSize:12,lineHeight:1.55},tag:{display:'inline-block',marginTop:10,padding:'5px 8px',borderRadius:999,background:'#eef2ff',fontSize:11,fontWeight:900},note:{fontSize:12,color:'#667085',lineHeight:1.55},@mediaDummy:''};

export default function TestCentrePlannerSuper(){
 const[subject,setSubject]=useState('All');
 const[expanded,setExpanded]=useState('01');
 const[showFull,setShowFull]=useState(false);
 const visible=useMemo(()=>TESTS.filter(t=>subject==='All'||!t.sets||Object.prototype.hasOwnProperty.call(t.sets,subject)),[subject]);
 return <div style={styles.page}><div style={styles.wrap}>
  <header style={styles.hero}>
   <div style={styles.eyebrow}>CLASS 9 BIHAR BOARD • TEST CENTRE</div>
   <h1 style={styles.h1}>SUPERTEST PLANNER</h1>
   <p style={styles.lead}>Exact chapter-based testing plan built from the website syllabus. Hindi में गोधूली गद्य + काव्य + वर्णिका + व्याकरण एवं रचना शामिल हैं; Sanskrit में केवल Primary; English में Read, Think & Enjoy बाहर; Reasoning पूर्ण रूप से शामिल है।</p>
   <div style={styles.stats}>
    <div style={styles.stat}><span style={styles.statN}>{total()}</span><span style={styles.statL}>eligible components</span></div>
    <div style={styles.stat}><span style={styles.statN}>7</span><span style={styles.statL}>subjects</span></div>
    <div style={styles.stat}><span style={styles.statN}>8</span><span style={styles.statL}>first-pass tests</span></div>
    <div style={styles.stat}><span style={styles.statN}>5</span><span style={styles.statL}>revision/mock tests</span></div>
   </div>
  </header>
  <section style={styles.section}>
   <div style={styles.panel}>
    <strong>Chapter planner filters</strong>
    <div style={styles.controls}>
     {['All',...SUBJECTS].map(s=><button key={s} style={subject===s?{...styles.chip,...styles.chipOn}:styles.chip} onClick={()=>setSubject(s)}>{s==='All'?'All Subjects':META[s]}</button>)}
    </div>
    <p style={styles.note}><b>Planner rule:</b> Test 08 तक सभी eligible chapters/components का first pass पूरा होगा। Test 09 onward नया chapter नहीं जोड़ा जाएगा; केवल revision, weak-area, mock और final readiness होगा।</p>
   </div>
  </section>
  <section style={styles.section}><div style={styles.grid}>
   {visible.map(t=> <article key={t.n} style={styles.card}>
    <div style={styles.top}><div><div style={styles.num}>TEST {t.n}</div><h2 style={styles.title}>{t.title}</h2><p style={styles.label}>{t.label}</p></div><div style={styles.date}>{t.date}<br/>{daysUntil(t.date)} days</div></div>
    {t.sets?<>
     <div style={styles.subjectGrid}>{(subject==='All'?SUBJECTS:[subject]).map(s=><div key={s} style={styles.subject}><div style={styles.subjectName}>{META[s]} <span style={{fontWeight:700,color:'#98a2b3'}}>({t.sets[s]?.length||0})</span></div><ol style={styles.chapterList}>{(t.sets[s]||[]).map((x,i)=><li key={`${s}-${i}`}>{x}</li>)}</ol></div>)}</div>
    </>:<div style={{marginTop:14,padding:14,borderRadius:15,background:'#f7f8fb'}}><b>{t.mode==='adaptive'?'Adaptive Revision':t.mode==='mock'?'Full-syllabus Mock':t.mode==='final'?'Final Examination':'Full-syllabus Revision'}</b><p style={{...styles.note,margin:'6px 0 0'}}>Exact eligible pool: {total()} components across 7 subjects. Question selection should be balanced by subject, chapter and difficulty rather than treating every component as a fixed question count.</p></div>}
    {t.n==='08'&&<span style={styles.tag}>✓ FIRST-PASS COMPLETE</span>}
   </article>)}
  </div></section>
  <section style={styles.section}><div style={styles.panel}><div style={styles.top}><div><h2 style={{margin:0}}>Full eligible syllabus</h2><p style={styles.note}>The master chapter inventory used by the SuperTest planner.</p></div><button style={styles.chip} onClick={()=>setShowFull(v=>!v)}>{showFull?'Hide':'Show'} full list</button></div>{showFull&&<div style={styles.subjectGrid}>{SUBJECTS.map(s=><div key={s} style={styles.subject}><div style={styles.subjectName}>{META[s]} — {FULL[s].length}</div><ol style={styles.chapterList}>{FULL[s].map((x,i)=><li key={`${s}-full-${i}`}>{x}</li>)}</ol></div>)}</div>}</div></section>
 </div></div>;
}
