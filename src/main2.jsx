import React,{useEffect,useState} from 'react';
import { createRoot } from 'react-dom/client';
import AppWithChapter5 from './AppWithChapter5.jsx';
import EnglishGenericLanguageSkillsQuiz from './english/EnglishGenericLanguageSkillsQuiz.jsx';
import { AppErrorBoundary } from './AppErrorBoundary.jsx';
import SSTRoot from './sst/SSTRoot.jsx';
import './scienceModeRouter.js';
import './subject-overrides.css';
import './science-navigation.css';
import './science-learn-navigator-fix.css';
import './sst/sst-section.css';

const APP_BUILD_VERSION=import.meta.env.VITE_BUILD_VERSION||'';
const BASE_URL=import.meta.env.BASE_URL||'/';
const ASSESSMENT_TOPICS=new Set(['agreement','narration','clauses','determiners','prepositions','idioms','translation','formal-letter','informal-letter','notice','report','speech','message','paragraph-essay','composition','factual-reading','literary-reading','poetry-reading']);
const KEEP_DEDICATED=new Set(['tenses','modals','voice']);

function BuildVersionRefresh(){
  useEffect(()=>{
    if(!APP_BUILD_VERSION)return;
    let stopped=false,checking=false;
    const check=async()=>{
      if(stopped||checking)return;
      checking=true;
      try{
        const base=BASE_URL.endsWith('/')?BASE_URL:`${BASE_URL}/`;
        const response=await fetch(`${base}build-version.json?hub_check=${Date.now()}`,{cache:'no-store',headers:{'Cache-Control':'no-cache','Pragma':'no-cache'}});
        if(!response.ok)return;
        const data=await response.json();
        const remoteVersion=String(data?.version||'');
        if(!stopped&&remoteVersion&&remoteVersion!==APP_BUILD_VERSION){
          const next=new URL(window.location.href);
          next.searchParams.set('__hub_refresh',remoteVersion);
          window.location.replace(next.toString());
        }
      }catch{}
      finally{checking=false}
    };
    check();
    const timer=setInterval(check,2000);
    const onVisible=()=>{if(document.visibilityState==='visible')check()};
    document.addEventListener('visibilitychange',onVisible);
    window.addEventListener('focus',check);
    return()=>{stopped=true;clearInterval(timer);document.removeEventListener('visibilitychange',onVisible);window.removeEventListener('focus',check)};
  },[]);
  return null;
}

function FreshLanguageSkillsNavigation(){
  useEffect(()=>{
    const handler=event=>{
      const target=event.target?.closest?.('button,a');
      if(!target)return;
      const p=new URLSearchParams(window.location.search);
      if(p.get('subject')!=='english'||p.get('languageSkills')!=='1')return;
      const topic=p.get('topic');
      if(!topic||KEEP_DEDICATED.has(topic)||!ASSESSMENT_TOPICS.has(topic))return;
      const text=(target.textContent||'').replace(/\s+/g,' ').trim().toLowerCase();
      let mode=null;
      if(text==='practice'||/^practice\b/.test(text))mode='practice';
      else if(text==='challenge'||/^challenge\b/.test(text))mode='challenge';
      else if(text==='final test'||/^final test\b/.test(text)||text.includes('final test'))mode='test';
      if(!mode)return;
      event.preventDefault();
      event.stopPropagation();
      const next=new URLSearchParams(p);
      next.set('topic',topic);next.set('mode',mode);next.set('languageSkills','1');next.set('subject','english');
      window.history.pushState({},'',`${window.location.pathname}?${next.toString()}${window.location.hash||''}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    };
    document.addEventListener('click',handler,true);
    return()=>document.removeEventListener('click',handler,true);
  },[]);
  return null;
}

function readRoute(){
  const params=new URLSearchParams(window.location.search);
  return {subject:params.get('subject')||'',page:params.get('page')||'',topic:params.get('topic')||'',mode:params.get('mode')||'learn',languageSkills:params.get('languageSkills')==='1'};
}

function RootRouter(){
  const [route,setRoute]=useState(readRoute);
  useEffect(()=>{
    const sync=()=>setRoute(readRoute());
    window.addEventListener('popstate',sync);
    window.addEventListener('hashchange',sync);
    const timer=setInterval(sync,250);
    sync();
    return()=>{window.removeEventListener('popstate',sync);window.removeEventListener('hashchange',sync);clearInterval(timer)};
  },[]);

  const isSST=route.subject==='sst'||route.page.startsWith('sst-');
  const englishAssessment=route.languageSkills&&!KEEP_DEDICATED.has(route.topic)&&ASSESSMENT_TOPICS.has(route.topic)&&route.mode!=='learn';
  if(isSST)return <SSTRoot/>;
  if(englishAssessment)return <EnglishGenericLanguageSkillsQuiz key={`${route.topic}:${route.mode}`} topicId={route.topic}/>;
  return <AppWithChapter5 key={`${route.subject}:${route.page}:${route.topic}:${route.mode}:${route.languageSkills?'1':'0'}`}/>;
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <BuildVersionRefresh />
      <FreshLanguageSkillsNavigation />
      <RootRouter />
    </AppErrorBoundary>
  </React.StrictMode>
);