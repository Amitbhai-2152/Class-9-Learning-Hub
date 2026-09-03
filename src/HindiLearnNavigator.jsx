import React,{useState} from 'react';
import {ChapterContents} from './ChapterContents';
import './hindi-learn-navigator.css';

function normalizeTitle(value){return String(value||'').replace(/^\d+\.\s*/,'').trim();}

export function HindiLearnNavigator({lesson,children}){
  const [activeIndex,setActiveIndex]=useState(0);
  const selectSection=index=>{
    setActiveIndex(index);
    const target=normalizeTitle(lesson?.sections?.[index]?.title);
    if(!target)return;
    requestAnimationFrame(()=>{
      const root=document.querySelector('.hindi-learn-shell-content');
      if(!root)return;
      const headings=[...root.querySelectorAll('h3')];
      const match=headings.find(node=>normalizeTitle(node.textContent)===target);
      match?.scrollIntoView({behavior:'smooth',block:'start'});
    });
  };
  return <div className="hindi-learn-shell">
    <aside className="hindi-learn-shell-nav">
      <ChapterContents lessons={lesson?.sections||[]} title={lesson?.title||'अध्याय सूची'} activeIndex={activeIndex} onSelect={selectSection}/>
    </aside>
    <div className="hindi-learn-shell-content">{children}</div>
  </div>;
}

export default HindiLearnNavigator;
