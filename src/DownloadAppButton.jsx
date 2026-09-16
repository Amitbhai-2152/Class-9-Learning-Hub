import React,{useEffect,useState}from'react';

const APK_URL='https://github.com/Amitbhai-2152/Class-9-Learning-Hub/releases/download/android-latest/app-debug.apk';

export default function DownloadAppButton(){
  const[visible,setVisible]=useState(false);
  useEffect(()=>{
    const sync=()=>{
      const page=new URLSearchParams(window.location.search).get('page')||'home';
      setVisible(page!=='account');
    };
    sync();
    window.addEventListener('popstate',sync);
    window.addEventListener('hashchange',sync);
    return()=>{
      window.removeEventListener('popstate',sync);
      window.removeEventListener('hashchange',sync);
    };
  },[]);
  if(!visible)return null;
  return <a href={APK_URL} className="download-app-button" download aria-label="Download Class 9 Learning Hub Android app" style={{position:'fixed',right:'18px',bottom:'18px',zIndex:9999,display:'inline-flex',alignItems:'center',gap:'8px',padding:'11px 16px',borderRadius:'999px',textDecoration:'none',fontWeight:800,fontSize:'14px',background:'#111827',color:'#fff',boxShadow:'0 8px 24px rgba(0,0,0,.22)',border:'1px solid rgba(255,255,255,.16)'}}>
    <span aria-hidden="true" style={{fontSize:'16px'}}>⬇</span>
    <span>Download Android App</span>
  </a>;
}
