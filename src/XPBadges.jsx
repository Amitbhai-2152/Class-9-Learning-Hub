import React,{useEffect,useMemo,useRef,useState} from 'react';
import {createPortal} from 'react-dom';
import {getXPState} from './engines/xp/xpStore.js';
import {DailyExamPlan} from './DailyExamPlan.jsx';
import './xp-badges.css';

export const XP_BADGE_MILESTONES=Object.freeze([
 {id:'xp-100',xp:100,icon:'🌱',name:'XP शुरुआत',label:'100 XP'},
 {id:'xp-250',xp:250,icon:'⭐',name:'कुशल विद्यार्थी',label:'250 XP'},
 {id:'xp-500',xp:500,icon:'🏅',name:'XP योद्धा',label:'500 XP'},
 {id:'xp-1000',xp:1000,icon:'🏆',name:'XP चैंपियन',label:'1,000 XP'},
 {id:'xp-2500',xp:2500,icon:'💎',name:'ज्ञान रत्न',label:'2,500 XP'},
 {id:'xp-5000',xp:5000,icon:'👑',name:'मास्टर लर्नर',label:'5,000 XP'},
 {id:'xp-10000',xp:10000,icon:'🚀',name:'लर्निंग लीजेंड',label:'10,000 XP'},
]);

const storageKey='class9-xp-badge-celebrated-v1';
const readCelebrated=()=>{
 try{const raw=localStorage.getItem(storageKey);const parsed=raw?JSON.parse(raw):[];return new Set(Array.isArray(parsed)?parsed.filter(Boolean):[])}catch{return new Set()}
};
const writeCelebrated=set=>{try{localStorage.setItem(storageKey,JSON.stringify([...set]));}catch{}};
const formatXP=value=>new Intl.NumberFormat('en-IN').format(Math.max(0,Number(value)||0));

export function getXPBadgeSummary(totalXp=0){
 const xp=Math.max(0,Number(totalXp)||0);
 const unlocked=XP_BADGE_MILESTONES.filter(item=>xp>=item.xp);
 const next=XP_BADGE_MILESTONES.find(item=>xp<item.xp)||null;
 return {total:XP_BADGE_MILESTONES.length,unlocked,unlockedCount:unlocked.length,next,percent:Math.round((unlocked.length/XP_BADGE_MILESTONES.length)*100)};
}

export function XPBadgeSection({xp=0}){
 const summary=useMemo(()=>getXPBadgeSummary(xp),[xp]);
 return <section className="xp-badges-panel" aria-labelledby="xp-badges-title">
  <div className="xp-badges-heading">
   <div><span className="eyebrow">XP ACHIEVEMENTS</span><h2 id="xp-badges-title">XP माइलस्टोन बैज</h2></div>
   <span className="xp-badges-count">{summary.unlockedCount}/{summary.total} अनलॉक</span>
  </div>
  {summary.next&&<div className="xp-badges-next"><span>🎯 अगला बैज</span><strong>{summary.next.name} · {summary.next.label}</strong><small>और {formatXP(summary.next.xp-xp)} XP चाहिए</small></div>}
  {!summary.next&&<div className="xp-badges-next completed"><span>🏆 सभी बैज अनलॉक</span><strong>आपने हर XP माइलस्टोन हासिल कर लिया!</strong><small>अब अपनी learning streak और preparation पर ध्यान दें।</small></div>}
  <div className="xp-badges-grid">
   {XP_BADGE_MILESTONES.map(item=>{const unlocked=xp>=item.xp;return <div className={`xp-badge-card${unlocked?' unlocked':' locked'}`} key={item.id}>
    <div className="xp-badge-medal" aria-hidden="true">{unlocked?item.icon:'🔒'}</div>
    <div className="xp-badge-copy"><strong>{item.name}</strong><span>{item.label}</span><small>{unlocked?'✓ हासिल':'लॉक्ड'}</small></div>
   </div>})}
  </div>
 </section>;
}

export function XPAchievementOverlay(){
 const[achievement,setAchievement]=useState(null);
 const[dailyPlanTarget,setDailyPlanTarget]=useState(null);
 const previousXp=useRef(getXPState().totalXp);
 const timer=useRef(null);
 useEffect(()=>{
  const findDailyPlanTarget=()=>{
   const dashboard=document.querySelector('.dashboard');
   if(!dashboard){setDailyPlanTarget(null);return;}
   let host=dashboard.querySelector('[data-daily-exam-plan-host]');
   if(!host){
    host=document.createElement('div');
    host.setAttribute('data-daily-exam-plan-host','true');
    const progressStrip=dashboard.querySelector('.progress-strip');
    if(progressStrip?.parentNode===dashboard)dashboard.insertBefore(host,progressStrip.nextSibling);
    else dashboard.insertBefore(host,dashboard.firstChild);
   }
   setDailyPlanTarget(host);
  };
  findDailyPlanTarget();
  const observer=new MutationObserver(findDailyPlanTarget);
  observer.observe(document.body,{childList:true,subtree:true});
  return()=>{observer.disconnect();setDailyPlanTarget(null)};
 },[]);
 useEffect(()=>{
  const onXp=event=>{
   const before=previousXp.current;
   const state=event?.detail?.nextState||getXPState();
   const after=Number(state.totalXp)||0;
   previousXp.current=after;
   if(after<=before)return;
   const crossed=XP_BADGE_MILESTONES.filter(item=>item.xp>before&&item.xp<=after);
   if(!crossed.length)return;
   const celebrated=readCelebrated();
   const fresh=crossed.find(item=>!celebrated.has(item.id));
   crossed.forEach(item=>celebrated.add(item.id));
   writeCelebrated(celebrated);
   if(!fresh)return;
   setAchievement({...fresh,displayXp:after});
   if(timer.current)window.clearTimeout(timer.current);
   timer.current=window.setTimeout(()=>setAchievement(null),3300);
  };
  window.addEventListener('class9-xp-updated',onXp);
  return()=>{window.removeEventListener('class9-xp-updated',onXp);if(timer.current)window.clearTimeout(timer.current)};
 },[]);
 return <>
  {dailyPlanTarget&&createPortal(<DailyExamPlan/>,dailyPlanTarget)}
  {achievement&&<div className="xp-achievement-layer" aria-live="polite"><div className="xp-achievement-card">
   <div className="xp-achievement-sparkles" aria-hidden="true">✦ ✧ ✦</div>
   <div className="xp-achievement-medal">{achievement.icon}</div>
   <div className="xp-achievement-kicker">BADGE UNLOCKED</div>
   <h2>{achievement.name}</h2>
   <p>{achievement.label} पूरा हुआ · कुल {formatXP(achievement.displayXp)} XP</p>
   <span>🎉 शानदार उपलब्धि!</span>
  </div></div>}
 </>;
}
