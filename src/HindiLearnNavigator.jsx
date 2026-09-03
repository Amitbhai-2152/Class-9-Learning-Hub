import React,{useEffect,useMemo,useState} from 'react';
import {ChapterContents} from './ChapterContents';
import './hindi-learn-navigator.css';

function normalizeTitle(value){return String(value||'').replace(/^\d+\.\s*/,'').trim();}

export function HindiLearnNavigator({lesson,children}){
  const items=useMemo(()=>Array.isArray(lesson?.sections)?lesson.sections.filter(Boolean):[],[lesson]);
  const [activeIndex,setActiveIndex]=useState(0);
  const [readCount,setReadCount]=useState(0);

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
    },{root:null,rootMargin:'-16% 0px -62% 0px',threshold:[0,0.2,0.5]});
    targets.forEach(target=>observer.observe(target));
    return()=>observer.disconnect();
  },[items]);

  useEffect(()=>{
    const root=document.querySelector('.hindi-learn-shell-content');
    if(!root||!items.length)return undefined;
    const targets=items.map((_,index)=>root.querySelector(`#hindi-gadhya-section-${index}`)).filter(Boolean);
    if(!targets.length)return undefined;
    const update=()=>{
      const count=targets.filter(target=>target.getBoundingClientRect().top<window.innerHeight*.78).length;
      setReadCount(Math.min(count,targets.length));
    };
    update();
    window.addEventListener('scroll',update,{passive:true});
    return()=>window.removeEventListener('scroll',update);
  },[items]);

  const selectSection=index=>{
    setActiveIndex(index);
    const direct=document.getElementById(`hindi-gadhya-section-${index}`);
    if(direct){direct.scrollIntoView({behavior:'smooth',block:'start'});return;}
    const target=normalizeTitle(items[index]?.title);
    if(!target)return;
    requestAnimationFrame(()=>{
      const root=document.querySelector('.hindi-learn-shell-content');
      const match=root&&[...root.querySelectorAll('h3')].find(node=>normalizeTitle(node.textContent)===target);
      match?.scrollIntoView({behavior:'smooth',block:'start'});
    });
  };

  return <div className="hindi-learn-shell">
    <aside className="hindi-learn-shell-nav">
      <div className="hindi-gadhya-nav-head"><div><span>गद्य खंड • LEARN</span><strong>अध्याय मार्ग</strong><small>{readCount}/{items.length} पड़ाव देखे</small></div><b>{activeIndex+1}/{items.length}</b></div>
      <div className="hindi-gadhya-nav-progress"><span style={{width:`${items.length?Math.round((readCount/items.length)*100):0}%`}}/></div>
      <ChapterContents lessons={items} title={lesson?.title||'अध्याय सूची'} activeIndex={activeIndex} onSelect={selectSection}/>
    </aside>
    <div className="hindi-learn-shell-content">{children}</div>
  </div>;
}

export default HindiLearnNavigator;
