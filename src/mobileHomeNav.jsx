import React,{useEffect,useState}from'react';
import './mobileHomeNav.css';
import {getXPState}from'./engines/xp/xpStore.js';
import {getRewardSummary}from'./engines/xp/xpRewards.js';

const navigate=(path)=>{
  if(typeof window==='undefined')return;
  const url=new URL(window.location.href);
  url.search=path;
  url.hash='';
  window.history.pushState({},'',url);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

const readStats=()=>{
  const xp=getXPState();
  const rewards=getRewardSummary();
  const level=Math.floor(xp.totalXp/250)+1;
  return {xp:xp.totalXp,level,streak:rewards.streak.current};
};

export default function MobileHomeNav(){
  const[open,setOpen]=useState(false);
  const[isHome,setIsHome]=useState(false);
  const[stats,setStats]=useState(()=>readStats());
  useEffect(()=>{
    const sync=()=>setIsHome(!(new URLSearchParams(window.location.search).get('page'))||new URLSearchParams(window.location.search).get('page')==='home');
    sync();
    window.addEventListener('popstate',sync);
    return()=>window.removeEventListener('popstate',sync);
  },[]);
  useEffect(()=>{
    const refresh=()=>setStats(readStats());
    refresh();
    window.addEventListener('class9-xp-updated',refresh);
    window.addEventListener('storage',refresh);
    return()=>{
      window.removeEventListener('class9-xp-updated',refresh);
      window.removeEventListener('storage',refresh);
    };
  },[]);
  useEffect(()=>{if(!isHome)setOpen(false)},[isHome]);
  if(!isHome)return null;
  const go=(search)=>{setOpen(false);navigate(search)};
  return <div className="mobile-home-nav">
    <button className="mobile-home-nav-toggle" type="button" aria-label={open?'नेविगेशन बंद करें':'नेविगेशन खोलें'} aria-expanded={open} onClick={()=>setOpen(v=>!v)}>
      <span/><span/><span/>
    </button>
    {open&&<>
      <button className="mobile-home-nav-backdrop" aria-label="मेनू बंद करें" onClick={()=>setOpen(false)}/>
      <div className="mobile-home-nav-panel">
        <div className="mobile-home-nav-title"><strong>कक्षा 9</strong><small>नेविगेशन</small></div>
        <div className="mobile-home-nav-stats" aria-label="आपकी प्रगति">
          <span><b>🔥</b><strong>{stats.streak}</strong><small>Streak</small></span>
          <span><b>⚡</b><strong>{stats.xp}</strong><small>XP</small></span>
          <span><b>LVL</b><strong>{stats.level}</strong><small>Level</small></span>
        </div>
        <button onClick={()=>go('?page=classes')}><span>▣</span><strong>सभी कक्षाएँ</strong><small>सभी विषय और अध्याय</small></button>
        <button onClick={()=>go('?page=cbt')}><span>✎</span><strong>Test Centre</strong><small>CBT अभ्यास और परीक्षा</small></button>
        <button onClick={()=>go('?page=meter')}><span>◔</span><strong>तैयारी मीटर</strong><small>आपकी सीखने की प्रगति</small></button>
        <button onClick={()=>go('?page=account')}><span>◉</span><strong>Account</strong><small>लॉग इन और learner account</small></button>
      </div>
    </>}
  </div>;
}
