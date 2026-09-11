import React,{useEffect,useMemo,useState} from 'react';
import {getCanonicalProgress} from './engines/progress/progressStore.js';
import {calculatePreparationMeter} from './preparationMeter.js';
import {SUBJECT_REGISTRY} from './subjectProgressRegistry.js';

const ICONS={math:'∑',science:'⚗',hindi:'अ',sanskrit:'ॐ',sst:'◎',english:'A',reasoning:'?'};
const refreshCanonical=()=>getCanonicalProgress();

export default function PreparationMeterPage(){
 const[canonical,setCanonical]=useState(refreshCanonical);
 useEffect(()=>{
  const refresh=()=>setCanonical(refreshCanonical());
  refresh();
  window.addEventListener('class9-progress-updated',refresh);
  window.addEventListener('storage',refresh);
  return()=>{window.removeEventListener('class9-progress-updated',refresh);window.removeEventListener('storage',refresh)};
 },[]);
 const metrics=useMemo(()=>calculatePreparationMeter(canonical),[canonical]);
 const rows=new Map(metrics.subjectBreakdown.map(row=>[row.subjectId,row]));
 const weakest=[...metrics.subjectBreakdown].sort((a,b)=>a.readiness-b.readiness).slice(0,2);
 const action=metrics.readiness<25?'पहले कुछ अध्यायों में सीखें + अभ्यास पूरा करें':metrics.performancePercent<60&&metrics.hasPerformanceData?'Quiz accuracy बढ़ाने के लिए कमजोर topics दोहराएँ':metrics.coveragePercent<60?'अधूरे stages पूरे करें और हर topic का test दें':'Revision बनाए रखें और test performance को मजबूत करें';
 return <main style={styles.page}>
  <header style={styles.hero}>
   <button onClick={()=>window.history.back()} style={styles.back}>← वापस</button>
   <div style={styles.eyebrow}>CLASS 9 • PREPARATION</div>
   <h1 style={styles.h1}>तैयारी मीटर</h1>
   <p style={styles.sub}>आपकी वास्तविक learning progress और quiz performance के आधार पर readiness score.</p>
  </header>
  <section style={styles.content}>
   <div style={styles.heroCard}>
    <div style={styles.ringWrap}><div style={{...styles.ring,background:`conic-gradient(#6572ea ${metrics.readiness}%,#e8eaf0 0)`}}><div style={styles.ringInner}><strong style={styles.score}>{metrics.readiness}%</strong><span style={styles.scoreLabel}>READINESS</span></div></div></div>
    <div style={styles.overview}><div style={styles.status}>{metrics.label}</div><h2 style={styles.title}>आपकी तैयारी की स्थिति</h2><p style={styles.body}>Coverage और quiz performance दोनों को मिलाकर यह score बनता है। XP इसमें शामिल नहीं है।</p><div style={styles.pills}><span style={styles.pill}>📚 {metrics.coveragePercent}% कवरेज</span><span style={styles.pill}>🎯 {metrics.hasPerformanceData?`${metrics.performancePercent}% accuracy`:'Quiz data नहीं'}</span><span style={styles.pill}>🧩 {metrics.completedStages}/{metrics.totalStages} stages</span></div></div>
   </div>
   <div style={styles.grid}>
    <section style={styles.card}><div style={styles.cardHead}><div><span style={styles.kicker}>SUBJECT READINESS</span><h2 style={styles.cardTitle}>विषयवार तैयारी</h2></div><span style={styles.live}>● LIVE</span></div><div style={styles.subjectGrid}>
     {SUBJECT_REGISTRY.map(subject=>{const row=rows.get(subject.id)||{readiness:0,coveragePercent:0,performancePercent:0,topicsStarted:0,totalTopics:subject.topics.length,quizAttempts:0};return <div key={subject.id} style={styles.subjectRow}><div style={styles.subjectIcon}>{ICONS[subject.id]}</div><div style={styles.subjectMain}><div style={styles.rowTop}><strong>{subject.name}</strong><b>{row.readiness}%</b></div><div style={styles.bar}><span style={{width:`${row.readiness}%`}}/></div><div style={styles.meta}><span>{row.coveragePercent}% coverage</span><span>{row.quizAttempts?`${row.performancePercent}% quiz accuracy`:`${row.topicsStarted}/${row.totalTopics} topics started`}</span></div></div>})}
    </div></section>
    <section style={styles.card}><span style={styles.kicker}>NEXT BEST ACTION</span><h2 style={styles.cardTitle}>अब क्या करें?</h2><div style={styles.actionBox}>🎯 <strong>{action}</strong></div><h3 style={styles.miniTitle}>ध्यान देने वाले subjects</h3>{weakest.length?<div style={styles.weakList}>{weakest.map(row=>{const subject=SUBJECT_REGISTRY.find(s=>s.id===row.subjectId);return <div key={row.subjectId} style={styles.weakRow}><span>{ICONS[row.subjectId]}</span><div><strong>{subject?.name||row.subjectId}</strong><small>{row.readiness}% readiness • {row.coveragePercent}% coverage</small></div></div>})}</div>:<div style={styles.empty}>अभी subject-level activity उपलब्ध नहीं है।</div>}</section>
   </div>
  </section>
 </main>;
}

const styles={
 page:{minHeight:'100vh',background:'#f6f7f9',color:'#182235',fontFamily:'Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif'},
 hero:{background:'#292e33',color:'#fff',padding:'24px clamp(18px,5vw,68px) 38px'},
 back:{border:0,background:'rgba(255,255,255,.1)',color:'#fff',borderRadius:10,padding:'9px 13px',cursor:'pointer',marginBottom:22},
 eyebrow:{fontSize:'.7rem',letterSpacing:'.14em',fontWeight:900,opacity:.72},
 h1:{fontSize:'clamp(2rem,5vw,3rem)',margin:'8px 0 6px',letterSpacing:'-.03em'},
 sub:{margin:0,color:'#d7dbe0',maxWidth:700,lineHeight:1.5},
 content:{maxWidth:1180,margin:'auto',padding:'28px clamp(16px,5vw,64px) 70px'},
 heroCard:{background:'#fff',border:'1px solid #e6e9ef',borderRadius:24,padding:28,display:'grid',gridTemplateColumns:'210px 1fr',gap:28,alignItems:'center',boxShadow:'0 10px 28px rgba(20,30,45,.07)'},
 ringWrap:{display:'grid',placeItems:'center'},
 ring:{width:178,height:178,borderRadius:'50%',padding:12,display:'grid',placeItems:'center'},
 ringInner:{width:'100%',height:'100%',borderRadius:'50%',background:'#fff',display:'grid',placeItems:'center',alignContent:'center',boxShadow:'inset 0 0 0 1px #eef0f3'},
 score:{fontSize:'2.3rem',lineHeight:1},scoreLabel:{fontSize:'.62rem',letterSpacing:'.12em',color:'#7b8493',fontWeight:900,marginTop:7},
 overview:{minWidth:0},status:{display:'inline-block',padding:'7px 10px',borderRadius:999,background:'#eef0ff',color:'#5967e8',fontSize:'.75rem',fontWeight:850},
 title:{margin:'12px 0 7px',fontSize:'1.5rem'},body:{margin:0,color:'#697383',lineHeight:1.6,maxWidth:650},pills:{display:'flex',gap:8,flexWrap:'wrap',marginTop:18},pill:{padding:'8px 11px',borderRadius:999,background:'#f1f3f7',fontSize:'.75rem',fontWeight:750},
 grid:{display:'grid',gridTemplateColumns:'minmax(0,1.35fr) minmax(300px,.65fr)',gap:18,marginTop:18},card:{background:'#fff',border:'1px solid #e6e9ef',borderRadius:20,padding:22,boxShadow:'0 6px 20px rgba(20,30,45,.055)'},cardHead:{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:15,marginBottom:18},kicker:{fontSize:'.66rem',letterSpacing:'.13em',fontWeight:900,color:'#7a8496'},cardTitle:{margin:'5px 0 0',fontSize:'1.25rem'},live:{padding:'6px 9px',borderRadius:999,background:'#ecf9f4',color:'#208666',fontSize:'.63rem',fontWeight:900},subjectGrid:{display:'grid',gap:11},subjectRow:{display:'flex',gap:12,alignItems:'center'},subjectIcon:{width:42,height:42,borderRadius:13,display:'grid',placeItems:'center',background:'#eef0ff',color:'#5967e8',fontWeight:900},subjectMain:{flex:1,minWidth:0},rowTop:{display:'flex',justifyContent:'space-between',gap:10,fontSize:'.9rem'},bar:{height:7,background:'#edf0f5',borderRadius:999,overflow:'hidden',margin:'7px 0 6px'},meta:{display:'flex',justifyContent:'space-between',gap:10,color:'#7b8698',fontSize:'.64rem'},actionBox:{marginTop:16,padding:16,borderRadius:16,background:'#eef0ff',color:'#4f5ed8',lineHeight:1.5},miniTitle:{margin:'24px 0 12px',fontSize:'.9rem'},weakList:{display:'grid',gap:9},weakRow:{display:'flex',gap:10,alignItems:'center',padding:'10px 0',borderBottom:'1px solid #edf0f4'},empty:{color:'#7b8493',fontSize:'.82rem'}
};