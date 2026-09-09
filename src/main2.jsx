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

function BuildVersionRefresh(){
  useEffect(()=>{
    if(!APP_BUILD_VERSION)return;
    let stopped=false;
    const check=async()=>{
      try{
        const url=`/build-version.json?check=${Date.now()}`;
        const response=await fetch(url,{cache:'no-store',headers:{'Cache-Control':'no-cache'}});
        if(!response.ok)return;
        const data=await response.json();
        if(!stopped&&data.version&&data.version!==APP_BUILD_VERSION){
          const next=new URL(window.location.href);
          next.searchParams.set('__hub_refresh',data.version);
          window.location.replace(next.toString());
        }
      }catch{}
    };
    check();
    const timer=setInterval(check,30000);
    return()=>{stopped=true;clearInterval(timer)};
  },[]);
  return null;
}

function RootRouter(){
  const [isSST,setIsSST]=useState(()=>new URLSearchParams(window.location.search).get('subject')==='sst'||new URLSearchParams(window.location.search).get('page')?.startsWith('sst-'));
  useEffect(()=>{const sync=()=>setIsSST(new URLSearchParams(window.location.search).get('subject')==='sst'||new URLSearchParams(window.location.search).get('page')?.startsWith('sst-'));window.addEventListener('popstate',sync);const timer=setInterval(sync,250);return()=>{window.removeEventListener('popstate',sync);clearInterval(timer)}} ,[]);
  return isSST?<SSTRoot/>:<AppWithChapter5/>;
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <BuildVersionRefresh />
      <RootRouter />
    </AppErrorBoundary>
  </React.StrictMode>
);