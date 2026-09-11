import React,{useMemo,useState}from'react';
import{hindiAllTopics}from'./hindiChapterData';
import{SANSKRIT_PRIMARY_CHAPTERS}from'./sanskrit/sanskritChapterRegistry';
import{SST_TRACKS}from'./sst/sstChapterRegistry';

const maths=['संख्या पद्धति','बहुपद','निर्देशांक ज्यामिति','दो चरों वाले रैखिक समीकरण','यूक्लिड की ज्यामिति का परिचय','रेखाएँ और कोण','त्रिभुज','चतुर्भुज','समान्तर चतुर्भुजों और त्रिभुजों का क्षेत्रफल','वृत्त','रचनाएँ','हीरोन का सूत्र','पृष्ठीय क्षेत्रफल एवं आयतन','सांख्यिकी','प्रायिकता'];
const science=['हमारे आसपास के पदार्थ','क्या हमारे आसपास के पदार्थ शुद्ध हैं?','परमाणु एवं अणु','परमाणु की संरचना','जीवन की मौलिक इकाई — कोशिका','ऊतक','गति','बल तथा गति के नियम','गुरुत्वाकर्षण','कार्य तथा ऊर्जा','ध्वनि','खाद्य संसाधनों में सुधार','हम बीमार क्यों होते हैं','प्राकृतिक संसाधन','हमारा पर्यावरण'];
const hindi=hindiAllTopics.map(x=>x.title);
const sanskrit=SANSKRIT_PRIMARY_CHAPTERS.map(x=>x.title);
const sst=SST_TRACKS.flatMap(t=>t.chapters.map(c=>`${t.name} — ${c}`));
const english=['I’m going to dance again','Scaling Great Heights','Saint Kabir','The eyes are not here','Ismat Chughtai: A woman with a difference','The accidental tourist','Saint Ravidas','Bharathipura','Dharam Juddha','Yayati','A Silent Revolution','Too Many People, Too Few Trees','Echo and Narcissus','The Shehnai of Bismillah Khan','Kathmandu','My Childhood','The Gift of the Magi','The Grandmother','On His Blindness','Blow, Blow, Thou Winter Wind','To Daffodils','Sound','Self Introduction','I Am Like Grass','Abraham Lincoln’s Letter to His Son’s Teacher','Tenses','Modals','Voice','Subject-Verb Agreement','Narration','Clauses','Determiners','Prepositions','Idioms','Translation','Paragraph / Essay','Composition','Formal Letter','Informal Letter','Notice Writing','Report Writing','Speech Writing','Message Writing','Factual Reading','Literary Reading','Poetry Reading'];
const reasoning=['Number Series','Alphabet Series','Analogy','Classification','Coding-Decoding','Direction & Blood Relations'];
const subjects=[['Maths','गणित','📐',maths],['Science','विज्ञान','🔬',science],['Hindi','हिन्दी','📚',hindi],['Sanskrit','संस्कृत','🪷',sanskrit],['SST','सामाजिक विज्ञान','🌍',sst],['English','English','🔤',english],['Reasoning','तर्कशक्ति','🧠',reasoning]];
const tests=[
['01','13 Sep 2026','Foundation Test'],['02','27 Sep 2026','Core Coverage Test'],['03','11 Oct 2026','Mid-Syllabus Test'],['04','25 Oct 2026','Mid-Syllabus Test II'],['05','08 Nov 2026','Late-Syllabus Test'],['06','22 Nov 2026','Advanced Coverage Test'],['07','06 Dec 2026','Completion Push Test'],['08','20 Dec 2026','First-Pass Completion Test'],['09','03 Jan 2027','Full Syllabus Revision I'],['10','17 Jan 2027','Weak-Area + Mixed Revision'],['11','31 Jan 2027','Full BSEB-Style Mock Examination'],['12','14 Feb 2027','Final Readiness Test'],['Final','28 Feb 2027','Final Examination']
].map(([n,date,title],i)=>({n,date,title,i}));
const dateValue=s=>new Date(`${s.split(' ')[1]} ${s.split(' ')[0]}, ${s.split(' ')[2]} 00:00:00`);
const daysLeft=s=>Math.max(0,Math.ceil((dateValue(s)-new Date())/86400000));
const subjectPlan=(data,testIndex)=>{
 if(testIndex>=7)return data;
 const size=Math.max(1,Math.ceil(data.length/8));
 const start=testIndex*size;
 return data.slice(start,Math.min(data.length,start+Math.max(1,size)));
};

export default function TestCentreSafe(){
 const[nextTest,setNextTest]=useState(0);const[view,setView]=useState('upcoming');const[testIndex,setTestIndex]=useState(0);
 const selected=tests[nextTest]||tests[0];
 const current=tests[testIndex]||tests[0];
 const plan=useMemo(()=>subjects.map(([id,label,icon,data])=>({id,label,icon,data:subjectPlan(data,current.i)})),[current.i]);
 const page={minHeight:'100vh',boxSizing:'border-box',padding:'24px 16px 56px',background:'linear-gradient(180deg,#eef4ff 0%,#f8fafc 42%,#ffffff 100%)',color:'#172033',fontFamily:'Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif'};
 const wrap={maxWidth:1180,margin:'0 auto'};
 const panel={background:'#fff',border:'1px solid #e5e9f2',borderRadius:22,padding:20,boxShadow:'0 10px 30px rgba(15,23,42,.06)'};
 const button=(active=false)=>({border:active?'1px solid #172033':'1px solid #d8deea',background:active?'#172033':'#fff',color:active?'#fff':'#263248',borderRadius:12,padding:'10px 14px',fontWeight:800,cursor:'pointer'});
 return <div style={page}><div style={wrap}>
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,marginBottom:16,flexWrap:'wrap'}}>
   <button onClick={()=>window.history.back()} style={{...button(false),background:'transparent'}}>← Learning Hub</button>
   <div style={{fontSize:12,fontWeight:900,letterSpacing:1.2,color:'#5d6a80'}}>CLASS 9 • TEST CENTRE</div>
  </div>
  <section style={{...panel,background:'linear-gradient(135deg,#111b32,#2b4f7c 62%,#3f6d9d)',color:'#fff',border:'none',padding:28}}>
   <div style={{fontSize:12,fontWeight:900,letterSpacing:1.8,opacity:.75}}>UPCOMING TEST FIRST</div>
   <h1 style={{fontSize:'clamp(34px,6vw,58px)',lineHeight:1.02,margin:'8px 0'}}>Test Centre</h1>
   <p style={{margin:0,maxWidth:850,lineHeight:1.6,opacity:.9}}>Built-content based chapter planner for Maths, Science, Hindi, Sanskrit, SST, English and Reasoning. Varnika is included; Sanskrit supplementary and Read, Think & Enjoy are excluded.</p>
   <div style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:10,marginTop:20}}>
    <div style={{padding:14,borderRadius:16,background:'rgba(255,255,255,.09)'}}><div style={{fontSize:28,fontWeight:900}}>{selected.date}</div><div style={{opacity:.75,fontSize:12}}>next scheduled test</div></div>
    <div style={{padding:14,borderRadius:16,background:'rgba(255,255,255,.09)'}}><div style={{fontSize:28,fontWeight:900}}>{daysLeft(selected.date)}</div><div style={{opacity:.75,fontSize:12}}>days remaining</div></div>
    <div style={{padding:14,borderRadius:16,background:'rgba(255,255,255,.09)'}}><div style={{fontSize:28,fontWeight:900}}>7</div><div style={{opacity:.75,fontSize:12}}>subjects</div></div>
   </div>
   <div style={{marginTop:18,fontSize:22,fontWeight:900}}>{selected.title}</div>
  </section>
  <div style={{display:'flex',gap:8,flexWrap:'wrap',margin:'18px 0'}}>
   <button onClick={()=>setView('upcoming')} style={button(view==='upcoming')}>Upcoming Test</button>
   <button onClick={()=>setView('planner')} style={button(view==='planner')}>Full Test Planner</button>
  </div>
  {view==='upcoming'&&<section style={panel}>
   <div style={{fontSize:11,fontWeight:900,letterSpacing:1.3,color:'#6b7486'}}>TEST {selected.n}</div><h2 style={{margin:'6px 0 4px',fontSize:26}}>{selected.title}</h2><div style={{color:'#667085',marginBottom:15}}>{selected.date} • {daysLeft(selected.date)} days remaining</div>
   <div style={{display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:12}}>
    {subjects.map(([id,label,icon,data])=><div key={id} style={{border:'1px solid #e5e9f1',borderRadius:16,padding:15}}><div style={{fontSize:18,fontWeight:900}}>{icon} {label}</div><div style={{fontSize:13,color:'#667085',marginTop:7}}>{subjectPlan(data,selected.i).slice(0,4).join(' • ')}{subjectPlan(data,selected.i).length>4?' • …':''}</div></div>)}
   </div>
  </section>}
  {view==='planner'&&<section><div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:14}}>{tests.map((t,i)=><button key={t.n} onClick={()=>setTestIndex(i)} style={button(testIndex===i)}>Test {t.n}<span style={{display:'block',fontSize:10,opacity:.75,marginTop:2}}>{t.date.slice(0,6)}</span></button>)}</div>
   <div style={panel}><div style={{fontSize:12,fontWeight:900,color:'#667085'}}>{current.date}</div><h2 style={{margin:'5px 0'}}>{current.title}</h2><p style={{margin:'0 0 16px',color:'#667085'}}>Chapter-wise plan from eligible website-built content.</p>
    <div style={{display:'grid',gap:12}}>{plan.map(s=><div key={s.id} style={{border:'1px solid #e5e9f1',borderRadius:16,padding:15}}><div style={{display:'flex',justifyContent:'space-between',gap:10}}><strong>{s.icon} {s.label}</strong><span style={{fontSize:12,color:'#667085'}}>{s.data.length} topics</span></div><div style={{marginTop:7,fontSize:13,lineHeight:1.55,color:'#4b5565'}}>{s.data.length?s.data.join(' • '):'Revision / mock coverage'}</div></div>)}</div>
   </div>
  </section>}
  <footer style={{marginTop:18,color:'#718096',fontSize:12,lineHeight:1.6}}>13 scheduled assessments • First-pass completion by Test 08 • Tests 09–12 are revision/mock phase • Final Examination: 28 Feb 2027</footer>
 </div></div>;
}
