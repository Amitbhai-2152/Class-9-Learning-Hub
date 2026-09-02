import React,{useEffect,useMemo,useRef,useState} from 'react';
import {ChapterContents} from './ChapterContents';
import './science-chapter-sidebar.css';

const normalize=(value='')=>value.replace(/\s+/g,' ').trim();

export function ScienceChapterShell({lessons=[],title='इस अध्याय में क्या पढ़ेंगे?',children}){
  const rootRef=useRef(null);
  const [activeIndex,setActiveIndex]=useState(0);
  const items=useMemo(()=>lessons.filter(Boolean),[lessons]);

  useEffect(()=>{
    const root=rootRef.current;
    if(!root||!items.length)return undefined;
    const headings=[...root.querySelectorAll('h1,h2,h3')];
    const targets=items.map((lesson,index)=>{
      const wanted=normalize(lesson.title||`चरण ${index+1}`);
      const hit=headings.find(el=>normalize(el.textContent).includes(wanted)||wanted.includes(normalize(el.textContent)));
      if(hit)hit.id=`science-lesson-${index+1}`;
      return hit||null;
    });
    const observerTargets=targets.filter(Boolean);
    if(!('IntersectionObserver' in window)||observerTargets.length===0)return undefined;
    const observer=new IntersectionObserver(entries=>{
      const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];
      if(!visible)return;
      const index=targets.indexOf(visible.target);
      if(index>=0)setActiveIndex(index);
    },{rootMargin:'-18% 0px -62% 0px',threshold:[0,0.25,0.6]});
    observerTargets.forEach(target=>observer.observe(target));
    return()=>observer.disconnect();
  },[items]);

  const selectLesson=index=>{
    setActiveIndex(index);
    const target=rootRef.current?.querySelector(`#science-lesson-${index+1}`);
    target?.scrollIntoView({behavior:'smooth',block:'start'});
  };

  if(!items.length)return <div className="science-chapter-shell-main">{children}</div>;
  return <div className="science-chapter-shell" ref={rootRef}>
    <aside className="science-chapter-shell-sidebar" aria-label="अध्याय विषय सूची">
      <ChapterContents lessons={items} title={title} compact={false} activeIndex={activeIndex} onSelect={selectLesson}/>
    </aside>
    <div className="science-chapter-shell-main">{children}</div>
  </div>;
}

export default ScienceChapterShell;
