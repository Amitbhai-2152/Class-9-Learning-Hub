import React,{useEffect,useState}from'react';
import './mobileHomeNav.css';

const navigate=(path)=>{
  if(typeof window==='undefined')return;
  const url=new URL(window.location.href);
  url.search=path;
  url.hash='';
  window.history.pushState({},'',url);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

export default function MobileHomeNav(){
  const[open,setOpen]=useState(false);
  const[isHome,setIsHome]=useState(false);
  useEffect(()=>{
    const sync=()=>setIsHome(!(new URLSearchParams(window.location.search).get('page'))||new URLSearchParams(window.location.search).get('page')==='home');
    sync();
    window.addEventListener('popstate',sync);
    return()=>window.removeEventListener('popstate',sync);
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
        <button onClick={()=>go('?page=classes')}><span>▣</span><strong>सभी कक्षाएँ</strong><small>सभी विषय और अध्याय</small></button>
        <button onClick={()=>go('?page=cbt')}><span>✎</span><strong>Test Centre</strong><small>CBT अभ्यास और परीक्षा</small></button>
        <button onClick={()=>go('?page=meter')}><span>◔</span><strong>तैयारी मीटर</strong><small>आपकी सीखने की प्रगति</small></button>
        <button onClick={()=>go('?page=account')}><span>◉</span><strong>Account</strong><small>लॉग इन और learner account</small></button>
      </div>
    </>}
  </div>;
}
