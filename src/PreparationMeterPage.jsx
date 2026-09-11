import React,{useEffect,useMemo,useState} from 'react';
import {getCanonicalProgress} from './engines/progress/progressStore.js';
import {calculatePreparationMeter} from './preparationMeter.js';
import {SUBJECT_REGISTRY} from './subjectProgressRegistry.js';

const ICONS={math:'∑',science:'⚗',hindi:'अ',sanskrit:'ॐ',sst:'◎',english:'A',reasoning:'?'};
const readProgress=()=>getCanonicalProgress();

export default function PreparationMeterPage(){
 const [canonical,setCanonical]=useState(readProgress);

 useEffect(()=>{
  const refresh=()=>setCanonical(readProgress());
  refresh();
  window.addEventListener('class9-progress-updated',refresh);
  window.addEventListener('storage',refresh);
  return()=>{
   window.removeEventListener('class9-progress-updated',refresh);
   window.removeEventListener('storage',refresh);
  };
 },[]);

 const metrics=useMemo(()=>calculatePreparationMeter(canonical),[canonical]);
 const rows=useMemo(()=>new Map(metrics.subjectBreakdown.map(row=>[row.subjectId,row])),[metrics.subjectBreakdown]);
 const weakest=useMemo(()=>SUBJECT_REGISTRY
  .map(subject=>({subject,...(rows.get(subject.id)||{})}))
  .sort((a,b)=>(a.readiness||0)-(b.readiness||0))
  .slice(0,2),[rows]);

 const action=metrics.readiness<25
  ?'पहले कुछ chapters में Learn और Practice पूरा करें।'
  :metrics.performancePercent<60&&metrics.hasPerformanceData
  ?'कमज़ोर topics दोहराएँ और quiz accuracy बढ़ाएँ।'
  :metrics.coveragePercent<60
  ?'अधूरे stages पूरे करें और अधिक topics के tests दें।'
  :'Revision बनाए रखें और Test performance मजबूत करें।';

 return <main style={styles.page}>
  <header style={styles.hero}>
   <button style={styles.back} onClick={()=>window.history.back()}>← वापस</button>
   <div style={styles.eyebrow}>CLASS 9 • PREPARATION</div>
   <h1 style={styles.h1}>तैयारी मीटर</h1>
   <p style={styles.sub}>आपकी वास्तविक learning progress और quiz performance के आधार पर readiness score.</p>
  </header>

  <section style={styles.content}>
   <div style={styles.heroCard}>
    <div style={styles.ringWrap}>
     <div style={{...styles.ring,background:`conic-gradient(#6572ea ${metrics.readiness}%,#e7eaf0 0)`}}>
      <div style={styles.ringInner}>
       <strong style={styles.score}>{metrics.readiness}%</strong>
       <span style={styles.scoreLabel}>READINESS</span>
      </div>
     </div>
    </div>
    <div>
     <div style={styles.status}>{metrics.label}</div>
     <h2 style={styles.title}>आपकी तैयारी की स्थिति</h2>
     <p style={styles.body}>Coverage और quiz performance दोनों को मिलाकर readiness score बनता है। XP इसमें शामिल नहीं है।</p>
     <div style={styles.pills}>
      <span style={styles.pill}>📚 {metrics.coveragePercent}% कवरेज</span>
      <span style={styles.pill}>🎯 {metrics.hasPerformanceData?`${metrics.performancePercent}% accuracy`:'Quiz data नहीं'}</span>
      <span style={styles.pill}>🧩 {metrics.completedStages}/{metrics.totalStages} stages</span>
     </div>
    </div>
   </div>

   <div style={styles.grid}>
    <section style={styles.card}>
     <div style={styles.cardHead}>
      <div>
       <div style={styles.kicker}>SUBJECT READINESS</div>
       <h2 style={styles.cardTitle}>सातों विषयों की स्थिति</h2>
      </div>
      <span style={styles.live}>● LIVE</span>
     </div>
     <div style={styles.subjectList}>
      {SUBJECT_REGISTRY.map(subject=>{
       const row=rows.get(subject.id)||{};
       const readiness=Number(row.readiness)||0;
       const coverage=Number(row.coveragePercent)||0;
       const started=Number(row.topicsStarted)||0;
       const totalTopics=Number(row.totalTopics)||subject.topics.length;
       return <div key={subject.id} style={styles.subjectRow}>
        <div style={styles.subjectIcon}>{ICONS[subject.id]||'•'}</div>
        <div style={styles.subjectMain}>
         <div style={styles.rowTop}><strong>{subject.name}</strong><b>{readiness}%</b></div>
         <div style={styles.bar}><span style={{width:`${readiness}%`}}/></div>
         <div style={styles.meta}>
          <span>{coverage}% coverage</span>
          <span>{row.hasPerformanceData?`${row.performancePercent}% quiz accuracy`:`${started}/${totalTopics} topics started`}</span>
         </div>
        </div>
       </div>;
      })}
     </div>
    </section>

    <aside style={styles.cardDark}>
     <div style={styles.kickerDark}>NEXT BEST ACTION</div>
     <h2 style={styles.cardDarkTitle}>{action}</h2>
     <p style={styles.bodyDark}>सबसे कम readiness वाले subjects को पहले सुधारने से overall preparation तेजी से मजबूत होगी।</p>
     <div style={styles.divider}/>
     <div style={styles.kickerDark}>FOCUS AREAS</div>
     <div style={styles.weakList}>
      {weakest.map(item=><div key={item.id} style={styles.weakRow}>
       <span>{ICONS[item.id]||'•'}</span>
       <strong>{item.name}</strong>
       <b>{Number(item.readiness)||0}%</b>
      </div>)}
     </div>
    </aside>
   </div>

   <div style={styles.statGrid}>
    <div style={styles.stat}><span>Topics started</span><strong>{metrics.topicsStarted}/{metrics.totalTopics}</strong></div>
    <div style={styles.stat}><span>Stages complete</span><strong>{metrics.completedStages}/{metrics.totalStages}</strong></div>
    <div style={styles.stat}><span>Quiz attempts</span><strong>{metrics.quizAttempts}</strong></div>
    <div style={styles.stat}><span>Correct answers</span><strong>{metrics.correctAnswers}</strong></div>
   </div>
  </section>
 </main>;
}

const styles={
 page:{minHeight:'100vh',background:'#f5f6f8',color:'#182235',fontFamily:'Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif'},
 hero:{background:'#292e33',color:'#fff',padding:'24px clamp(18px,5vw,68px) 38px'},
 back:{border:0,background:'rgba(255,255,255,.1)',color:'#fff',borderRadius:10,padding:'9px 13px',cursor:'pointer',marginBottom:22},
 eyebrow:{fontSize:'.7rem',letterSpacing:'.14em',fontWeight:900,opacity:.72},
 h1:{fontSize:'clamp(2rem,5vw,3rem)',margin:'8px 0 6px',letterSpacing:'-.03em'},
 sub:{margin:0,color:'#d7dbe0',maxWidth:700,lineHeight:1.5},
 content:{maxWidth:1180,margin:'0 auto',padding:'28px clamp(16px,5vw,64px) 70px'},
 heroCard:{background:'#fff',border:'1px solid #e6e9ef',borderRadius:24,padding:28,display:'grid',gridTemplateColumns:'210px 1fr',gap:28,alignItems:'center',boxShadow:'0 10px 28px rgba(20,30,45,.07)'},
 ringWrap:{display:'grid',placeItems:'center'},
 ring:{width:178,height:178,borderRadius:'50%',padding:12,display:'grid',placeItems:'center'},
 ringInner:{width:'100%',height:'100%',borderRadius:'50%',background:'#fff',display:'grid',placeItems:'center',alignContent:'center',boxShadow:'inset 0 0 0 1px #eef0f3'},
 score:{fontSize:'2.3rem',lineHeight:1},scoreLabel:{fontSize:'.62rem',letterSpacing:'.12em',color:'#7b8493',fontWeight:900,marginTop:7},
 status:{display:'inline-block',padding:'7px 10px',borderRadius:999,background:'#eef0ff',color:'#5967e8',fontSize:'.75rem',fontWeight:850},
 title:{margin:'12px 0 7px',fontSize:'1.5rem'},body:{margin:0,color:'#697383',lineHeight:1.6},
 pills:{display:'flex',gap:8,flexWrap:'wrap',marginTop:18},pill:{padding:'8px 11px',borderRadius:999,background:'#f1f3f7',fontSize:'.75rem',fontWeight:750},
 grid:{display:'grid',gridTemplateColumns:'minmax(0,1.35fr) minmax(300px,.65fr)',gap:18,marginTop:18},
 card:{background:'#fff',border:'1px solid #e6e9ef',borderRadius:20,padding:22,boxShadow:'0 6px 20px rgba(20,30,45,.055)'},
 cardHead:{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:15,marginBottom:18},
 kicker:{fontSize:'.66rem',letterSpacing:'.13em',fontWeight:900,color:'#7a8496'},
 cardTitle:{margin:'5px 0 0',fontSize:'1.25rem'},live:{padding:'6px 9px',borderRadius:999,background:'#ecf9f4',color:'#208666',fontSize:'.63rem',fontWeight:900},
 subjectList:{display:'grid',gap:12},subjectRow:{display:'flex',gap:12,alignItems:'center'},
 subjectIcon:{width:42,height:42,borderRadius:13,display:'grid',placeItems:'center',background:'#eef0ff',color:'#5967e8',fontWeight:900,flex:'0 0 auto'},
 subjectMain:{flex:1,minWidth:0},rowTop:{display:'flex',justifyContent:'space-between',gap:10,fontSize:'.9rem'},
 bar:{height:7,background:'#edf0f5',borderRadius:999,overflow:'hidden',margin:'7px 0 6px'},barFill:{height:'100%'},
 meta:{display:'flex',justifyContent:'space-between',gap:10,color:'#7b8698',fontSize:'.64rem'},
 cardDark:{background:'#222833',color:'#fff',borderRadius:20,padding:22,boxShadow:'0 6px 20px rgba(20,30,45,.08)'},
 kickerDark:{fontSize:'.66rem',letterSpacing:'.13em',fontWeight:900,opacity:.65},cardDarkTitle:{margin:'9px 0 9px',fontSize:'1.22rem',lineHeight:1.35},bodyDark:{margin:0,color:'#cbd1da',lineHeight:1.55,fontSize:'.82rem'},divider:{height:1,background:'rgba(255,255,255,.12)',margin:'20px 0 15px'},
 weakList:{display:'grid',gap:8,marginTop:8},weakRow:{display:'grid',gridTemplateColumns:'28px 1fr auto',gap:8,alignItems:'center',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,.08)',fontSize:'.84rem'},
 statGrid:{display:'grid',gridTemplateColumns:'repeat(4,minmax(0,1fr))',gap:12,marginTop:18},stat:{background:'#fff',border:'1px solid #e6e9ef',borderRadius:16,padding:15},statGridItem:{},
};

styles.bar.span={display:'block',height:'100%',background:'linear-gradient(90deg,#6674ee,#9a8cff)',borderRadius:'inherit'};
styles.stat={...styles.stat};
