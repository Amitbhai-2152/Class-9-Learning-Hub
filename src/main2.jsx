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

function RootRouter(){
  const [isSST,setIsSST]=useState(()=>new URLSearchParams(window.location.search).get('subject')==='sst'||new URLSearchParams(window.location.search).get('page')?.startsWith('sst-'));
  useEffect(()=>{const sync=()=>setIsSST(new URLSearchParams(window.location.search).get('subject')==='sst'||new URLSearchParams(window.location.search).get('page')?.startsWith('sst-'));window.addEventListener('popstate',sync);const timer=setInterval(sync,250);return()=>{window.removeEventListener('popstate',sync);clearInterval(timer)}} ,[]);
  return isSST?<SSTRoot/>:<AppWithChapter5/>;
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <RootRouter />
    </AppErrorBoundary>
  </React.StrictMode>
);