import React,{useEffect,useMemo,useRef,useState} from 'react';
import {ChapterContents} from './ChapterContents';
import './science-chapter-sidebar.css';

const normalize=(value='')=>value.replace(/\s+/g,' ').trim();
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));

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
      if(hit&&root.querySelector('.science-learn-page'))hit.id=`science-lesson-${index+1}`;
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

  const getCurrentLessonIndex=()=>{
    const root=rootRef.current;
    if(!root)return null;
    const nodes=[...root.querySelectorAll('.lesson-top,.lesson-top span,.science-learn-page .lesson-top')];
    for(const node of nodes){
      const match=normalize(node.textContent).match(/(\d+)\s*\/\s*(\d+)/);
      if(match)return Number(match[1])-1;
    }
    return null;
  };

  const findButton=contains=>{
    const root=rootRef.current;
    return root?[...root.querySelectorAll('button')].find(button=>normalize(button.textContent).includes(contains)):null;
  };

  const enterLearnMode=async()=>{
    if(rootRef.current?.querySelector('.science-learn-page'))return true;
    const learnButton=findButton('सीखें');
    if(!learnButton)return false;
    learnButton.click();
    await wait(180);
    return Boolean(rootRef.current?.querySelector('.science-learn-page'));
  };

  const jumpStepByStep=async targetIndex=>{
    if(!(await enterLearnMode()))return false;
    let current=getCurrentLessonIndex();
    if(current===null)return false;
    if(current>targetIndex){
      const later=findButton('बाद में');
      if(later){later.click();await wait(120);}
      current=getCurrentLessonIndex();
      if(current===null)return false;
    }
    let guard=0;
    while(current!==null&&current<targetIndex&&guard++<50){
      const next=findButton('आगे बढ़ें');
      if(!next)break;
      const before=current;
      next.click();
      await wait(120);
      current=getCurrentLessonIndex();
      if(current===before)break;
    }
    return current===targetIndex;
  };

  const selectLesson=async index=>{
    setActiveIndex(index);
    const root=rootRef.current;
    const target=root?.querySelector(`#science-lesson-${index+1}`);
    if(target){target.scrollIntoView({behavior:'smooth',block:'start'});return;}
    const moved=await jumpStepByStep(index);
    if(moved){await wait(70);rootRef.current?.querySelector(`#science-lesson-${index+1}`)?.scrollIntoView({behavior:'smooth',block:'start'});}
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
