import React,{useEffect,useState} from 'react';
import { createRoot } from 'react-dom/client';
import AppWithChapter5 from './AppWithChapter5.jsx';
import { AppErrorBoundary } from './AppErrorBoundary.jsx';
import SSTRoot from './sst/SSTRoot.jsx';
import './scienceModeRouter.js';
import './subject-overrides.css';
import './science-navigation.css';
import './science-learn-navigator-fix.css';
import './sst/sst-section.css';

const APP_BUILD_VERSION=import.meta.env.VITE_BUILD_VERSION||'';
const BASE_URL=import.meta.env.BASE_URL||'/';

function BuildVersionRefresh(){
  useEffect(()=>{
    if(!APP_BUILD_VERSION)return;
    let stopped=false;
    let checking=false;
    const check=async()=>{
      if(stopped||checking)return;
      checking=true;
      try{
        const base=BASE_URL.endsWith('/')?BASE_URL:`${BASE_URL}/`;
        const url=`${base}build-version.json?check=${Date.now()}`;
        const response=await fetch(url,{cache:'no-store',headers:{'Cache-Control':'no-cache'}});
        if(!response.ok)return;
        const data=await response.json();
        if(!stopped&&data.version&&data.version!==APP_BUILD_VERSION){
          const next=new URL(window.location.href);
          next.searchParams.set('__hub_refresh',data.version);
          window.location.replace(next.toString());
        }
      }catch{}finally{checking=false}
    };
    check();
    const timer=setInterval(check,5000);
    const onVisible=()=>{if(document.visibilityState==='visible')check()};
    document.addEventListener('visibilitychange',onVisible);
    window.addEventListener('focus',check);
    return()=>{stopped=true;clearInterval(timer);document.removeEventListener('visibilitychange',onVisible);window.removeEventListener('focus',check)};
  },[]);
  return null;
}

function FreshTopicNavigation(){
  useEffect(()=>{
    const isLanguageSkillsHub=()=>{
      const p=new URLSearchParams(window.location.search);
      return p.get('languageSkills')==='1'&&!p.get('topic');
    };
    const handler=()=>{
      if(!isLanguageSkillsHub())return;
      const before=window.location.href;
      setTimeout(()=>{
        if(window.location.href===before)return;
        const p=new URLSearchParams(window.location.search);
        if(p.get('languageSkills')!=='1'||!p.get('topic'))return;
        if(p.get('__hub_topic_reload')==='1')return;
        p.set('__hub_topic_reload','1');
        window.location.replace(`${window.location.pathname}?${p.toString()}${window.location.hash||''}`);
      },0);
    };
    document.addEventListener('click',handler,true);
    return()=>document.removeEventListener('click',handler,true);
  },[]);
  return null;
}

function RootRouter(){
  const [isSST,setIsSST]=useState(()=>new URLSearchParams(window.location.search).get('subject')==='sst'||new URLSearchParams(window.location.search).get('page')?.startsWith('sst-'));
  useEffect(()=>{const sync=()=>setIsSST(new URLSearchParams(window.location.search).get('subject')==='sst'||new URLSearchParams(window.location.search).get('page')?.startsWith('sst-'));window.addEventListener('popstate',sync);const timer=setInterval(sync,250);return()=>{window.removeEventListener('popstate',sync);clearInterval(timer)}},[]);
  return isSST?<SSTRoot/>:<AppWithChapter5/>;
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <BuildVersionRefresh />
      <FreshTopicNavigation />
      <RootRouter />
    </AppErrorBoundary>
  </React.StrictMode>
);