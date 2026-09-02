import React,{useEffect,useMemo,useRef,useState} from 'react';
import {ChapterContents} from './ChapterContents';
import './science-chapter-sidebar.css';

const normalize=(value='')=>value.replace(/\s+/g,' ').trim();
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));

export function ScienceChapterShell({lessons=[],title='अध्याय सूची',children}){
  const rootRef=useRef(null);
  const [activeIndex,setActiveIndex]=useState(0);
  const items=useMemo(()=>lessons.filter(Boolean),[lessons]);

  useEffect(()=>{
    const root=rootRef.current;
    if(!root||!items.length)return undefined;
    const headings=[...root.querySelectorAll('.science-learn-page h1,.science-learn-page h2,.science-learn-page h3,.lesson-list h1,.lesson-list h2,.lesson-list h3')];
    const targets=items.map((lesson,index)=>{
      const wanted=normalize(lesson.title||`चरण ${index+1}`);
      const hit=headings.find(el=>normalize(el.textContent).includes(wanted)||wanted.includes(normalize(el.textContent)));
      if(hit)hit.id=`science-lesson-${index+1}`;
      return hit||null;
    });
    const observed=targets.filter(Boolean);
    if(!('IntersectionObserver' in window)||observed.length===0)return undefined;
    const observer=new IntersectionObserver(entries=>{
      const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];
      if(!visible)return;
      const index=targets.indexOf(visible.target);
      if(index>=0)setActiveIndex(index);
    },{rootMargin:'-16% 0px -62% 0px',threshold:[0,.25,.6]});
    observed.forEach(target=>observer.observe(target));
    return()=>observer.disconnect();
  },[items]);

  const getCurrentLessonIndex=()=>{
    const root=rootRef.current;
    if(!root)return null;
    const node=root.querySelector('.science-learn-page .lesson-top');
    const match=node&&normalize(node.textContent).match(/(\d+)\s*\/\s*(\d+)/);
    return match?Number(match[1])-1:null;
  };

  const findButton=text=>{
    const root=rootRef.current;
    return root?[...root.querySelectorAll('button')].find(button=>normalize(button.textContent).includes(text)):null;
  };

  const enterLearnMode=async()=>{
    if(rootRef.current?.querySelector('.science-learn-page,.lesson-list'))return true;
    const learn=findButton('सीखें');
    if(!learn)return false;
    learn.click();
    await wait(180);
    return Boolean(rootRef.current?.querySelector('.science-learn-page,.lesson-list'));
  };

  const jumpToSingleLesson=async targetIndex=>{
    if(!(await enterLearnMode()))return false;
    let current=getCurrentLessonIndex();
    if(current===null)return false;
    if(current>targetIndex)return false;
    let guard=0;
    while(current<targetIndex&&guard++<60){
      const next=findButton('आगे बढ़ें');
      if(!next)break;
      const before=current;
      next.click();
      await wait(80);
      current=getCurrentLessonIndex();
      if(current===before)break;
    }
    return current===targetIndex;
  };

  const selectLesson=async index=>{
    setActiveIndex(index);
    const root=rootRef.current;
    const target=root?.querySelector(`#science-lesson-${index+1}`)||root?.querySelector(`.lesson-list .lesson-card:nth-child(${index+1})`);
    if(target){
      target.scrollIntoView({behavior:'auto',block:'start'});
      return;
    }
    if(await jumpToSingleLesson(index)){
      await wait(30);
      const moved=rootRef.current?.querySelector(`#science-lesson-${index+1}`);
      if(moved){
        const top=Math.max(0,moved.getBoundingClientRect().top+window.scrollY-12);
        window.scrollTo({top,behavior:'auto'});
      }
    }
  };

  if(!items.length)return <div className="science-chapter-shell-main">{children}</div>;
  return <div className="science-chapter-shell" ref={rootRef}>
    <div className="science-learn-nav" aria-label="सीखने का नेविगेशन">
      <strong>पढ़ाई</strong><span>कक्षा 9</span><span>विज्ञान</span><b>📖 सीखें</b>
    </div>
    <aside className="science-chapter-shell-sidebar" aria-label="अध्याय सूची">
      <ChapterContents lessons={items} title={title} activeIndex={activeIndex} onSelect={selectLesson}/>
    </aside>
    <div className="science-chapter-shell-main">{children}</div>
  </div>;
}

export default ScienceChapterShell;
