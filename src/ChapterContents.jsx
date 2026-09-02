import React,{useMemo,useState} from 'react';
import './chapter-contents.css';

const typeLabel={intro:'परिचय',concept:'अवधारणा',example:'उदाहरण',check:'त्वरित जाँच',compare:'तुलना'};

export function ChapterContents({lessons=[],title='इस अध्याय में क्या पढ़ेंगे?',compact=false,activeIndex=0,onSelect}){
 const [open,setOpen]=useState(!compact);
 const items=useMemo(()=>lessons.filter(Boolean).map((lesson,index)=>({index,title:lesson.title||`चरण ${index+1}`,type:typeLabel[lesson.type]||'पाठ'})),[lessons]);
 if(!items.length)return null;
 const clickable=typeof onSelect==='function';
 return <section className={`chapter-contents ${compact?'is-compact':''}`} aria-label="अध्याय विषय सूची">
   <div className="chapter-contents-head">
     <div><span className="chapter-contents-kicker">विषय सूची</span><h2>{title}</h2><p>{items.length} सीखने के चरण</p></div>
     {compact&&<button type="button" className="pressable chapter-contents-toggle" onClick={()=>setOpen(v=>!v)} aria-expanded={open}>{open?'छिपाएँ':'दिखाएँ'} ↓</button>}
   </div>
   {open&&<div className="chapter-contents-grid">
     {items.map(item=>{
       const active=item.index===activeIndex;
       return clickable
         ? <button type="button" className={`chapter-contents-item ${active?'is-active':''}`} key={`${item.title}-${item.index}`} onClick={()=>onSelect(item.index)} aria-current={active?'step':undefined}><span className="chapter-contents-number">{item.index+1}</span><span className="chapter-contents-copy"><strong>{item.title}</strong><small>{item.type}</small></span><span className="chapter-contents-arrow">›</span></button>
         : <div className="chapter-contents-item" key={`${item.title}-${item.index}`}><span className="chapter-contents-number">{item.index+1}</span><div><strong>{item.title}</strong><small>{item.type}</small></div></div>;
     })}
   </div>}
 </section>;
}

export default ChapterContents;
