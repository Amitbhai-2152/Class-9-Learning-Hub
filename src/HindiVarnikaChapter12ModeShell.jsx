import React,{useState} from 'react';
import {HindiVarnikaChapter12View} from './HindiVarnikaChapter12View';

const MODE_BUTTONS=[
  ['learn','📖','सीखें','पूरा पाठ समझें'],
  ['practice','📝','अभ्यास','15 प्रश्न'],
  ['challenge','🔥','चुनौती','12 कठिन प्रश्न'],
  ['test','🎯','अंतिम टेस्ट','20 प्रश्न · समयबद्ध']
];

export function HindiVarnikaChapter12ModeShell(props){
  const {initialMode='learn',topic}=props;
  const [mode,setMode]=useState(initialMode);
  const activeMode=MODE_BUTTONS.some(([id])=>id===mode)?mode:'learn';

  return <div style={{maxWidth:980,margin:'0 auto',padding:'12px 12px 28px'}}>
    <section style={{padding:16,borderRadius:18,background:'linear-gradient(135deg,#fff7ed,#eef2ff)',border:'1px solid #e5e7eb',marginBottom:14}}>
      <div style={{fontSize:12,fontWeight:800,color:'#6b7280',letterSpacing:.4}}>वर्णिका भाग 1</div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,flexWrap:'wrap',marginTop:4}}>
        <h1 style={{margin:0,fontSize:'clamp(22px,4vw,32px)'}}>{topic?.title||'अध्याय'}</h1>
        <span style={{fontWeight:800}}>{activeMode==='learn'?'अध्ययन':MODE_BUTTONS.find(([id])=>id===activeMode)?.[2]}</span>
      </div>
      <p style={{margin:'8px 0 0',color:'#4b5563'}}>एक ही जगह से सीखें, अभ्यास करें, चुनौती दें और अंतिम टेस्ट दें।</p>
      <div role="tablist" aria-label="अध्याय अध्ययन मोड" style={{display:'grid',gridTemplateColumns:'repeat(4,minmax(0,1fr))',gap:8,marginTop:14}}>
        {MODE_BUTTONS.map(([id,icon,label,help])=><button key={id} type="button" role="tab" aria-selected={activeMode===id} title={help} onClick={()=>setMode(id)} style={{padding:'11px 9px',borderRadius:12,border:activeMode===id?'2px solid #111827':'1px solid #d1d5db',background:activeMode===id?'#111827':'#fff',color:activeMode===id?'#fff':'#111827',fontWeight:800,cursor:'pointer',minHeight:52}}><span aria-hidden="true">{icon}</span><span style={{display:'block',marginTop:2}}>{label}</span></button>)}
      </div>
    </section>
    <HindiVarnikaChapter12View key={`${topic?.id||topic?.title||'chapter'}-${activeMode}`} {...props} initialMode={activeMode}/>
  </div>;
}

export default HindiVarnikaChapter12ModeShell;
