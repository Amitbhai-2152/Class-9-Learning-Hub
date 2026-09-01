import React,{useMemo,useState} from 'react';
import './chapter-contents.css';

const typeLabel={intro:'परिचय',concept:'अवधारणा',example:'उदाहरण',check:'त्वरित जाँच',compare:'तुलना'};

export function ChapterContents({lessons=[],title='इस अध्याय में क्या पढ़ेंगे?',compact=false}){
 const [open,setOpen]=useState(!compact);
 const items=useMemo(()=>lessons.filter(Boolean).map((lesson,index)=>({
   index,
   title:lesson.title||`चरण ${index+1}`,
   type:typeLabel[lesson.type]||'पाठ'
 })),[lessons]);
 if(!items.length)return null;
 return <section className={`chapter-contents ${compact?'is-compact':''}`} aria-label="अध्याय विषय सूची">
   <div className="chapter-contents-head">
     <div><span className="chapter-contents-kicker">विषय सूची</span><h2>{title}</h2><p>{items.length} सीखने के चरण</p></div>
     {compact&&<button className="pressable chapter-contents-toggle" onClick={()=>setOpen(v=>!v)} aria-expanded={open}>{open?'छिपाएँ':'दिखाएँ'} ↓</button>}
   </div>
   {open&&<div className="chapter-contents-grid">
     {items.map(item=><div className="chapter-contents-item" key={`${item.title}-${item.index}`}>
       <span className="chapter-contents-number">{item.index+1}</span>
       <div><strong>{item.title}</strong><small>{item.type}</small></div>
     </div>)}
   </div>}
 </section>;
}

export default ChapterContents;
