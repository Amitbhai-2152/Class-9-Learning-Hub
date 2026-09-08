import React,{useEffect,useState} from 'react';
import App from './App.jsx';
import {EnglishPanoramaChapter5} from './english/EnglishPanoramaChapter5.jsx';
import {EnglishPanoramaChapter6Final} from './english/EnglishPanoramaChapter6Final.jsx';
import {EnglishPanoramaChapter7Final} from './english/EnglishPanoramaChapter7Final.jsx';

const initial={xp:0,streak:1,dailyXp:0,goal:100,sessions:[]};
const safeProgress=value=>{const source=value&&typeof value==='object'&&!Array.isArray(value)?value:{};return {...initial,...source,xp:Number.isFinite(source.xp)?source.xp:0,streak:Number.isFinite(source.streak)?source.streak:1,dailyXp:Number.isFinite(source.dailyXp)?source.dailyXp:0,goal:Number.isFinite(source.goal)&&source.goal>0?source.goal:100,sessions:Array.isArray(source.sessions)?source.sessions:[]}};
const loadProgress=()=>{try{return safeProgress(JSON.parse(localStorage.getItem('class9-progress'))??initial)}catch{return safeProgress(initial)}};
const getChapter=()=>{if(typeof window==='undefined')return 0;const p=new URLSearchParams(window.location.search);if(p.get('subject')!=='english')return 0;if(p.get('panorama7')==='1')return 7;if(p.get('panorama6')==='1')return 6;if(p.get('panorama5')==='1')return 5;if(p.get('page')==='chapter'){const n=Number(p.get('chapter'));if(Number.isInteger(n)&&n===12)return 5;if(Number.isInteger(n)&&n===13)return 6;if(Number.isInteger(n)&&n===14)return 7}return 0};
const routeMode=()=>{if(typeof window==='undefined')return'learn';const mode=new URLSearchParams(window.location.search).get('mode');return ['learn','practice','challenge','test'].includes(mode)?mode:'learn'};

export default function AppWithChapter5(){
  const[chapter,setChapter]=useState(getChapter);
  const[progress,setProgress]=useState(loadProgress);
  useEffect(()=>{try{localStorage.setItem('class9-progress',JSON.stringify(safeProgress(progress)))}catch{}},[progress]);
  useEffect(()=>{const sync=()=>setChapter(getChapter());window.addEventListener('popstate',sync);const timer=setInterval(sync,250);return()=>{window.removeEventListener('popstate',sync);clearInterval(timer)}},[]);
  const addXp=n=>{const amount=Number.isFinite(n)?n:0;if(!amount)return;setProgress(p=>{const safe=safeProgress(p);return {...safe,xp:safe.xp+amount,dailyXp:Math.min(safe.goal,safe.dailyXp+amount)}})};
  const finishSession=meta=>setProgress(p=>{const safe=safeProgress(p);return {...safe,sessions:[...safe.sessions,meta].slice(-100)}});
  const back=()=>{const params=new URLSearchParams();params.set('page','subject');params.set('subject','english');window.history.pushState({},'',`${window.location.pathname}?${params.toString()}${window.location.hash||''}`);setChapter(0)};
  if(chapter===5)return <EnglishPanoramaChapter5 initialMode={routeMode()} onBack={back} addXp={addXp} finishSession={finishSession}/>;
  if(chapter===6)return <EnglishPanoramaChapter6Final initialMode={routeMode()} onBack={back} addXp={addXp} finishSession={finishSession}/>;
  if(chapter===7)return <EnglishPanoramaChapter7Final initialMode={routeMode()} onBack={back} addXp={addXp} finishSession={finishSession}/>;
  return <App/>;
}
