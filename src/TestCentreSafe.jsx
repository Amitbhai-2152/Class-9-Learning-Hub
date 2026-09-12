import React,{useMemo,useState}from'react';

const SUBJECTS=[
  {id:'maths',label:'गणित',icon:'📐',count:15},
  {id:'science',label:'विज्ञान',icon:'🔬',count:15},
  {id:'hindi',label:'हिन्दी',icon:'📚',count:44},
  {id:'sanskrit',label:'संस्कृत',icon:'🪷',count:15},
  {id:'sst',label:'सामाजिक विज्ञान',icon:'🌍',count:33},
  {id:'english',label:'English',icon:'🔤',count:46},
  {id:'reasoning',label:'तर्कशक्ति',icon:'🧠',count:6}
];

const TESTS=[
 {n:'01',date:'2026-09-13',stage:'Foundation',purpose:'हल्का प्रारंभ',mode:'first-pass',subjects:{
  maths:['संख्या पद्धति','बहुपद'],
  science:['हमारे आसपास के पदार्थ','क्या हमारे आसपास के पदार्थ शुद्ध हैं?'],
  hindi:['गोधूली — गद्य कहानी का प्लॉट','गोधूली — गद्य भारत का पुरातन विद्यापीठ : नालंदा','गोधूली — काव्य रैदास के पद','वर्णिका — बिहार का लोकगायन'],
  sanskrit:['ईशस्तुति:','लोभविष्टः चक्रधरः'],
  sst:['इतिहास — भौगोलिक खोजें','इतिहास — अमेरिकी स्वतंत्रता संग्राम','भूगोल — स्थिति एवं विस्तार'],
  english:['Reader • I’m going to dance again','Reader • Scaling Great Heights','Panorama • Prose • Dharam Juddha','Panorama • Poetry • The Grandmother'],
  reasoning:['Number Series']
 }},
 {n:'02',date:'2026-09-27',stage:'Core Coverage',purpose:'मुख्य शुरुआती coverage',mode:'first-pass',subjects:{
  maths:['निर्देशांक ज्यामिति','दो चरों वाले रैखिक समीकरण'],
  science:['परमाणु एवं अणु','परमाणु की संरचना'],
  hindi:['गोधूली — गद्य ग्राम-गीत का मर्म','गोधूली — गद्य लाल पान की बेगम','गोधूली — काव्य मंझन के पद','गोधूली — काव्य गुरु गोविंद सिंह के पद','वर्णिका — बिहार की संगीत साधना','व्याकरण एवं रचना — अपठित गद्यांश'],
  sanskrit:['यक्ष-युधिष्ठिर संवाद','चत्वारो वेदाः'],
  sst:['इतिहास — फ्रांस की क्रांति','इतिहास — विश्व युद्धों का इतिहास','भूगोल — भौतिक स्वरूप : संरचना एवं उच्चावच','भूगोल — अपवाह स्वरूप'],
  english:['Reader • Saint Kabir','Reader • The eyes are not here','Panorama • Prose • Yayati','Panorama • Poetry • On His Blindness','Language & Skills • Tenses','Language & Skills • Modals'],
  reasoning:['Alphabet Series']
 }},
 {n:'03',date:'2026-10-11',stage:'Mid I',purpose:'मध्य syllabus',mode:'first-pass',subjects:{
  maths:['यूक्लिड की ज्यामिति का परिचय','रेखाएँ और कोण'],
  science:['जीवन — की मौलिक इकाई कोशिका','ऊतक'],
  hindi:['गोधूली — गद्य भारतीय चित्रपट : मूक फिल्मों से सवाक फिल्मों तक','गोधूली — गद्य अष्टावक्र','गोधूली — काव्य पलक पाँवड़े','गोधूली — काव्य मैं नीर भरी दुःख की बदली','वर्णिका — बिहार में नृत्यकला','व्याकरण एवं रचना — निबंध लेखन','व्याकरण एवं रचना — पत्र लेखन'],
  sanskrit:['संस्कृतस्य महिमा','संस्कृतसाहित्ये पर्यावरणम्'],
  sst:['इतिहास — नाजीवाद','इतिहास — वन्य समाज और उपनिवेशवाद','भूगोल — जलवायु','भूगोल — प्राकृतिक वनस्पति एवं वन्य प्राणी','भूगोल — जनसंख्या'],
  english:['Reader • Ismat Chughtai: A woman with a difference','Reader • The accidental tourist','Panorama • Prose • A Silent Revolution','Panorama • Prose • Too Many People, Too Few Trees','Panorama • Poetry • Blow, Blow, Thou Winter Wind','Language & Skills • Voice','Language & Skills • Subject-Verb Agreement'],
  reasoning:['Analogy']
 }},
 {n:'04',date:'2026-10-25',stage:'Mid II',purpose:'मध्य coverage + balance',mode:'first-pass',subjects:{
  maths:['त्रिभुज','चतुर्भुज'],
  science:['गति','बल तथा गति के नियम'],
  hindi:['गोधूली — गद्य टॉलस्टाय के घर में','गोधूली — गद्य पधारो म्हारे देश','गोधूली — काव्य आ रही रवि के सवारी','गोधूली — काव्य पूरा हिन्दुस्तान मिलेगा','वर्णिका — बिहार की चित्रकला','व्याकरण एवं रचना — संवाद लेखन','व्याकरण एवं रचना — अनुच्छेद लेखन'],
  sanskrit:['ज्ञानं भारः क्रियां विना','नीतिपधानिः'],
  sst:['इतिहास — शांति के प्रयास','इतिहास — कृषि और खेतीहर और समाज','भूगोल — भारत के पड़ोसी देश','भूगोल — मानचित्र अध्ययन','नागरिक शास्त्र — लोकतंत्र का क्रमिक विकास'],
  english:['Reader • Saint Ravidas','Reader • Bharathipura','Panorama • Prose • Echo and Narcissus','Panorama • Prose • The Shehnai of Bismillah Khan','Panorama • Poetry • To Daffodils','Panorama • Poetry • Sound','Language & Skills • Narration','Language & Skills • Clauses'],
  reasoning:['Classification']
 }},
 {n:'05',date:'2026-11-08',stage:'Late Syllabus',purpose:'late core support',mode:'first-pass',subjects:{
  maths:['समान्तर चतुर्भुजों और त्रिभुजों का क्षेत्रफल','वृत्त'],
  science:['गुरुत्वाकर्षण','कार्य तथा ऊर्जा'],
  hindi:['गोधूली — गद्य रेल-यात्रा','गोधूली — गद्य निबंध','गोधूली — काव्य मेरा ईश्वर','गोधूली — काव्य रुको बच्चों','वर्णिका — मधुबनी की चित्रकला','व्याकरण एवं रचना — लिंग','व्याकरण एवं रचना — वचन'],
  sanskrit:['बिहारस्य संस्कृतिकं वैभवम्','ईद-महोत्सवः'],
  sst:['भूगोल — क्षेत्रीय अध्ययन','भूगोल — आपदा प्रबंधन : एक परिचय','भूगोल — मानवी गलतियों के कारण घटित आपदाएं : नाभिकीय, जैविक और रासायनिक','भूगोल — सामान्य आपदाएँ: निवारण एवं नियंत्रण','भूगोल — समुदाय आधारित आपदा प्रबंधन','नागरिक शास्त्र — लोकतंत्र क्या और क्यों?','नागरिक शास्त्र — संविधान निर्माण','नागरिक शास्त्र — चुनावी राजनीति'],
  english:['Panorama • Prose • Kathmandu','Panorama • Prose • My Childhood','Panorama • Poetry • Self Introduction','Language & Skills • Determiners','Language & Skills • Prepositions','Language & Skills • Idioms','Language & Skills • Translation','Language & Skills • Paragraph / Essay'],
  reasoning:['Coding-Decoding']
 }},
 {n:'06',date:'2026-11-22',stage:'Advanced Coverage',purpose:'advanced/core completion',mode:'first-pass',subjects:{
  maths:['रचनाएँ','हीरोन का सूत्र'],
  science:['ध्वनि','खाद्य संसाधनों में सुधार'],
  hindi:['गोधूली — गद्य सूखी नदी का पुल','गोधूली — गद्य शिक्षा में हेर-फेर','गोधूली — काव्य निम्मो की मौत','गोधूली — काव्य समुद्र','वर्णिका — बिहार में नाट्यकला','व्याकरण एवं रचना — काल','व्याकरण एवं रचना — वाच्य','व्याकरण एवं रचना — संधि'],
  sanskrit:['ग्राम्यजीवनम्','वीर कूँवर सिंहः'],
  sst:['नागरिक शास्त्र — संसदीय लोकतंत्र की संस्थाएं','नागरिक शास्त्र — लोकतांत्रिक अधिकार','अर्थशास्त्र — बिहार के एक गाँव की कहानी','अर्थशास्त्र — मानव एक संसाधन','अर्थशास्त्र — गरीबी'],
  english:['Panorama • Prose • The Gift of the Magi','Panorama • Poetry • I Am Like Grass','Language & Skills • Composition','Language & Skills • Formal Letter','Language & Skills • Informal Letter','Language & Skills • Notice Writing'],
  reasoning:['Direction & Blood Relations']
 }},
 {n:'07',date:'2026-12-06',stage:'Completion Push',purpose:'remaining chapters',mode:'first-pass',subjects:{
  maths:['पृष्ठीय क्षेत्रफल एवं आयतन','सांख्यिकी','प्रायिकता'],
  science:['हम बीमार क्यों होते हैं','प्राकृतिक संसाधन','हमारा पर्यावरण'],
  hindi:['गोधूली — काव्य कुछ सवाल','वर्णिका — बिहार का सिनेमा संसार','व्याकरण एवं रचना — समास','व्याकरण एवं रचना — पर्यायवाची, विलोम और श्रुतिसमभिन्नार्थक','व्याकरण एवं रचना — मुहावरे और अनेक शब्दों के लिए एक शब्द'],
  sanskrit:['किशोराणां मनोविज्ञानम्','राष्ट्रबोधः','विश्ववन्दिता वैशाली'],
  sst:['अर्थशास्त्र — बेकारी','अर्थशास्त्र — कृषि, खाद्यान्न सुरक्षा एवं गुणवत्ता','अर्थशास्त्र — कृषक मजदूर'],
  english:['Panorama • Poetry • Abraham Lincoln’s Letter to His Son’s Teacher','Language & Skills • Report Writing','Language & Skills • Speech Writing','Language & Skills • Message Writing','Language & Skills • Factual Reading','Language & Skills • Literary Reading','Language & Skills • Poetry Reading'],
  reasoning:['Mixed revision • Number Series • Alphabet Series • Analogy • Classification • Coding-Decoding • Direction & Blood Relations']
 }},
 {n:'08',date:'2026-12-20',stage:'Full Syllabus',purpose:'100% first-pass check',mode:'full',description:'सभी 174 eligible components • इस बिंदु के बाद कोई नया chapter नहीं जोड़ा जाएगा।'},
 {n:'09',date:'2027-01-03',stage:'Revision I',purpose:'mixed full syllabus',mode:'full',description:'सभी 174 eligible components से balanced mixed questions.'},
 {n:'10',date:'2027-01-17',stage:'Weak Area',purpose:'performance weighted',mode:'full',description:'Previous performance chapter weighting तय करती है: weak > average > strong.'},
 {n:'11',date:'2027-01-31',stage:'BSEB Style Full Mock',purpose:'complete examination simulation',mode:'full',description:'Eligible website-built syllabus पर पूरा BSEB-style examination simulation.'},
 {n:'12',date:'2027-02-14',stage:'Final Readiness',purpose:'final readiness',mode:'full',description:'Full syllabus + difficult mixed questions + weak-area targeting.'},
 {n:'Final',date:'2027-02-28',stage:'Final Examination',purpose:'complete eligible website-built syllabus',mode:'full',description:'Complete eligible website-built syllabus.'}
];

const formatDate=date=>new Intl.DateTimeFormat('en-IN',{day:'2-digit',month:'short',year:'numeric'}).format(new Date(`${date}T00:00:00`));
const todayStart=()=>{const now=new Date();return new Date(now.getFullYear(),now.getMonth(),now.getDate());};
const targetDate=date=>{const [y,m,d]=date.split('-').map(Number);return new Date(y,m-1,d);};
const daysLeft=date=>Math.max(0,Math.ceil((targetDate(date)-todayStart())/86400000));
const todayKey=()=>{const now=new Date();return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`};
const subjectTotal=Object.fromEntries(SUBJECTS.map(s=>[s.id,s.count]));

export default function TestCentreSafe(){
 const nextIndex=useMemo(()=>{const today=todayKey();const index=TESTS.findIndex(t=>t.date>=today);return index<0?TESTS.length-1:index},[]);
 const[view,setView]=useState('upcoming');
 const[testIndex,setTestIndex]=useState(nextIndex);
 const selected=TESTS[testIndex]||TESTS[0];
 const isTestDay=selected?.date===todayKey();
 const firstPassCount=selected?.mode==='first-pass'?Object.values(selected.subjects||{}).reduce((sum,items)=>sum+items.length,0):null;
 const page={minHeight:'100vh',boxSizing:'border-box',padding:'24px 16px 56px',background:'linear-gradient(180deg,#eef4ff 0%,#f8fafc 42%,#fff 100%)',color:'#172033',fontFamily:'Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif'};
 const wrap={maxWidth:1180,margin:'0 auto'};
 const panel={background:'#fff',border:'1px solid #e5e9f2',borderRadius:22,padding:20,boxShadow:'0 10px 30px rgba(15,23,42,.06)'};
 const button=(active=false)=>({border:active?'1px solid #172033':'1px solid #d8deea',background:active?'#172033':'#fff',color:active?'#fff':'#263248',borderRadius:12,padding:'10px 14px',fontWeight:800,cursor:'pointer'});
 const testDescription=selected.description||`${firstPassCount} planned topic components in the first-pass sequence.`;
 return <div style={page}><div style={wrap}>
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,marginBottom:16,flexWrap:'wrap'}}>
   <button onClick={()=>window.history.back()} style={{...button(false),background:'transparent'}}>← Learning Hub</button>
   <div style={{fontSize:12,fontWeight:900,letterSpacing:1.2,color:'#5d6a80'}}>CLASS 9 • TEST CENTRE</div>
  </div>

  <section style={{...panel,background:'linear-gradient(135deg,#111b32,#2b4f7c 62%,#3f6d9d)',color:'#fff',border:'none',padding:28}}>
   <div style={{fontSize:12,fontWeight:900,letterSpacing:1.8,opacity:.75}}>FINAL SUPERTEST PLANNER • 2026–27</div>
   <h1 style={{fontSize:'clamp(34px,6vw,58px)',lineHeight:1.02,margin:'8px 0'}}>Test Centre</h1>
   <p style={{margin:0,maxWidth:900,lineHeight:1.6,opacity:.9}}>Master test calendar and chapter-wise testing plan based on the supplied Final SuperTest Planner. Scope: 174 eligible components across Maths, Science, Hindi, Sanskrit, SST, English and Reasoning.</p>
   <div style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:10,marginTop:20}}>
    <div style={{padding:14,borderRadius:16,background:'rgba(255,255,255,.09)'}}><div style={{fontSize:28,fontWeight:900}}>{formatDate(selected.date)}</div><div style={{opacity:.75,fontSize:12}}>{isTestDay?'today • scheduled test':'next selected test'}</div></div>
    <div style={{padding:14,borderRadius:16,background:'rgba(255,255,255,.09)'}}><div style={{fontSize:28,fontWeight:900}}>{daysLeft(selected.date)}</div><div style={{opacity:.75,fontSize:12}}>days remaining</div></div>
    <div style={{padding:14,borderRadius:16,background:'rgba(255,255,255,.09)'}}><div style={{fontSize:28,fontWeight:900}}>174</div><div style={{opacity:.75,fontSize:12}}>eligible components</div></div>
   </div>
   <div style={{marginTop:18,fontSize:22,fontWeight:900}}>Test {selected.n} • {selected.stage}</div>
   <div style={{marginTop:5,opacity:.86}}>{selected.purpose}</div>
  </section>

  <div style={{display:'flex',gap:8,flexWrap:'wrap',margin:'18px 0'}}>
   <button onClick={()=>setView('upcoming')} style={button(view==='upcoming')}>Upcoming Test</button>
   <button onClick={()=>setView('planner')} style={button(view==='planner')}>Full Test Planner</button>
  </div>

  {view==='upcoming'&&<section style={panel}>
   <div style={{display:'flex',justifyContent:'space-between',gap:10,alignItems:'flex-start',flexWrap:'wrap'}}>
    <div><div style={{fontSize:11,fontWeight:900,letterSpacing:1.3,color:'#6b7486'}}>TEST {selected.n}</div><h2 style={{margin:'6px 0 4px',fontSize:26}}>{selected.stage}</h2><div style={{color:'#667085'}}>{formatDate(selected.date)} • {daysLeft(selected.date)} days remaining</div></div>
    {selected.mode==='first-pass'&&<span style={{padding:'8px 11px',borderRadius:999,background:'#eef4ff',color:'#2b4f7c',fontSize:12,fontWeight:900}}>{firstPassCount} topic components planned</span>}
   </div>
   <p style={{color:'#4b5565',lineHeight:1.6,margin:'14px 0 18px'}}>{testDescription}</p>
   {selected.mode==='full'?
    <div style={{display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:12}}>
     {SUBJECTS.map(s=><div key={s.id} style={{border:'1px solid #e5e9f1',borderRadius:16,padding:15}}><div style={{fontSize:18,fontWeight:900}}>{s.icon} {s.label}</div><div style={{fontSize:13,color:'#667085',marginTop:7}}>{s.count} eligible components in scope</div><div style={{marginTop:8,fontSize:12,fontWeight:800,color:'#344054'}}>{selected.n==='10'?'Weighting follows previous performance.':'Included in full-syllabus phase.'}</div></div>)}
    </div>
   :
    <div style={{display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:12}}>
     {SUBJECTS.map(s=>{const items=selected.subjects?.[s.id]||[];return <div key={s.id} style={{border:'1px solid #e5e9f1',borderRadius:16,padding:15}}><div style={{fontSize:18,fontWeight:900}}>{s.icon} {s.label}</div><div style={{fontSize:13,color:'#667085',marginTop:7}}>{items.length?items.join(' • '):'No new first-pass item listed'}</div></div>})}
    </div>
   }
  </section>}

  {view==='planner'&&<section>
   <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:14}}>{TESTS.map((t,i)=><button key={t.n} onClick={()=>setTestIndex(i)} style={button(testIndex===i)}>Test {t.n}<span style={{display:'block',fontSize:10,opacity:.75,marginTop:2}}>{formatDate(t.date).slice(0,7)}</span></button>)}</div>
   <div style={panel}>
    <div style={{fontSize:12,fontWeight:900,color:'#667085'}}>{formatDate(selected.date)}</div>
    <h2 style={{margin:'5px 0'}}>{selected.stage} • {selected.purpose}</h2>
    <p style={{margin:'0 0 16px',color:'#667085',lineHeight:1.6}}>{testDescription}</p>
    {selected.mode==='full'?
      <div style={{display:'grid',gap:12}}>
       <div style={{padding:16,borderRadius:16,background:'#f7f9fc',border:'1px solid #e4e8f0'}}><strong>Scope</strong><div style={{marginTop:5,color:'#4b5565'}}>All {subjectTotal.maths+subjectTotal.science+subjectTotal.hindi+subjectTotal.sanskrit+subjectTotal.sst+subjectTotal.english+subjectTotal.reasoning} eligible components from the master inventory.</div></div>
       <div style={{display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:12}}>{SUBJECTS.map(s=><div key={s.id} style={{border:'1px solid #e5e9f1',borderRadius:16,padding:15}}><div style={{fontWeight:900}}>{s.icon} {s.label}</div><div style={{marginTop:5,fontSize:13,color:'#667085'}}>{s.count} eligible components</div></div>)}</div>
      </div>
    :
      <div style={{display:'grid',gap:12}}>{SUBJECTS.map(s=>{const items=selected.subjects?.[s.id]||[];return <div key={s.id} style={{border:'1px solid #e5e9f1',borderRadius:16,padding:15}}><div style={{display:'flex',justifyContent:'space-between',gap:10,alignItems:'center',flexWrap:'wrap'}}><strong>{s.icon} {s.label}</strong><span style={{fontSize:12,color:'#667085'}}>{items.length} planned items</span></div><div style={{marginTop:8,fontSize:13,lineHeight:1.65,color:'#4b5565'}}>{items.join(' • ')}</div></div>})}</div>
    }
   </div>
  </section>}

  <footer style={{marginTop:18,color:'#718096',fontSize:12,lineHeight:1.7}}>Source of truth: Final SuperTest Planner 2026–27. First-pass chapter sequence runs through Test 07; Test 08 checks 100% first-pass completion; Tests 09–12 switch to full-syllabus revision/mock/readiness mode; Final Examination is 28 Feb 2027.</footer>
 </div></div>;
}
