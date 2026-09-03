import React,{useEffect,useMemo,useState} from 'react';
import {ChapterContents} from './ChapterContents';
import './hindi-learn-navigator.css';

function normalizeTitle(value){return String(value||'').replace(/^\d+\.\s*/,'').trim();}

export function HindiLearnNavigator({lesson,children}){
  const items=useMemo(()=>Array.isArray(lesson?.sections)?lesson.sections.filter(Boolean):[],[lesson]);
  const [activeIndex,setActiveIndex]=useState(0);

  useEffect(()=>{
    const root=document.querySelector('.hindi-learn-shell-content');
    if(!root||!items.length)return undefined;
    const targets=items.map((_,index)=>root.querySelector(`#hindi-gadhya-section-${index}`)).filter(Boolean);
    if(!targets.length)return undefined;
    const observer=new IntersectionObserver(entries=>{
      const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);
      if(!visible.length)return;
      const next=targets.indexOf(visible[0].target);
      if(next>=0)setActiveIndex(next);
    },{root:null,rootMargin:'-18% 0px -58% 0px',threshold:[0,0.25,0.6]});
    targets.forEach(target=>observer.observe(target));
    return()=>observer.disconnect();
  },[items]);

  const selectSection=index=>{
    setActiveIndex(index);
    const targetId=`hindi-gadhya-section-${index}`;
    const direct=document.getElementById(targetId);
    if(direct){direct.scrollIntoView({behavior:'smooth',block:'start'});return;}
    const target=normalizeTitle(items[index]?.title);
    if(!target)return;
    requestAnimationFrame(()=>{
      const root=document.querySelector('.hindi-learn-shell-content');
      if(!root)return;
      const match=[...root.querySelectorAll('h3')].find(node=>normalizeTitle(node.textContent)===target);
      match?.scrollIntoView({behavior:'smooth',block:'start'});
    });
  };

  return <div className="hindi-learn-shell">
    <aside className="hindi-learn-shell-nav">
      <ChapterContents lessons={items} title={lesson?.title||'अध्याय सूची'} activeIndex={activeIndex} onSelect={selectSection}/>
    </aside>
    <div className="hindi-learn-shell-content">{children}</div>
  </div>;
}

export default HindiLearnNavigator;
