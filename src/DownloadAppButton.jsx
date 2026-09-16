import React,{useEffect,useState}from'react';

const APP_ICON_URL=`${import.meta.env.BASE_URL||'/'}app-icon.png`;

function isStandalone(){
  return window.matchMedia?.('(display-mode: standalone)')?.matches||window.navigator.standalone===true;
}

export default function DownloadAppButton(){
  const[visible,setVisible]=useState(false);
  const[deferredPrompt,setDeferredPrompt]=useState(null);
  const[showHelp,setShowHelp]=useState(false);

  useEffect(()=>{
    const sync=()=>{
      const page=new URLSearchParams(window.location.search).get('page')||'home';
      setVisible(page!=='account'&&!isStandalone());
    };
    const beforeInstall=event=>{event.preventDefault();setDeferredPrompt(event);sync();};
    const installed=()=>{setDeferredPrompt(null);setShowHelp(false);sync();};
    sync();
    window.addEventListener('beforeinstallprompt',beforeInstall);
    window.addEventListener('appinstalled',installed);
    window.addEventListener('popstate',sync);
    window.addEventListener('hashchange',sync);
    return()=>{
      window.removeEventListener('beforeinstallprompt',beforeInstall);
      window.removeEventListener('appinstalled',installed);
      window.removeEventListener('popstate',sync);
      window.removeEventListener('hashchange',sync);
    };
  },[]);

  if(!visible)return null;

  const handleInstall=async()=>{
    if(deferredPrompt){
      deferredPrompt.prompt();
      await deferredPrompt.userChoice.catch(()=>{});
      setDeferredPrompt(null);
      return;
    }
    setShowHelp(true);
  };

  const isIOS=/iphone|ipad|ipod/i.test(navigator.userAgent||'');
  const helpText=isIOS
    ? 'iPhone/iPad: Safari में Share दबाएँ → Add to Home Screen चुनें।'
    : 'Chrome/Edge: browser menu (⋮) खोलें → Install app या Add to Home screen चुनें।';

  return <>
    <button type="button" className="download-app-button" onClick={handleInstall} aria-label="Install Class 9 Learning Hub as an app" style={{position:'fixed',right:'18px',bottom:'18px',zIndex:9999,display:'inline-flex',alignItems:'center',gap:'9px',padding:'10px 15px',borderRadius:'999px',fontWeight:800,fontSize:'14px',background:'#111827',color:'#fff',boxShadow:'0 8px 24px rgba(0,0,0,.22)',border:'1px solid rgba(255,255,255,.16)',cursor:'pointer'}}>
      <img src={APP_ICON_URL} alt="" width="24" height="24" style={{borderRadius:'7px',display:'block'}} />
      <span>Install Learning Hub</span>
    </button>
    {showHelp&&<div role="dialog" aria-live="polite" aria-label="Install Class 9 Learning Hub" style={{position:'fixed',right:'18px',bottom:'72px',zIndex:10000,maxWidth:'320px',padding:'16px 18px',borderRadius:'16px',background:'#fff',color:'#111827',boxShadow:'0 16px 40px rgba(0,0,0,.25)',border:'1px solid #e5e7eb',fontSize:'14px',lineHeight:1.45}}>
      <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'8px'}}>
        <img src={APP_ICON_URL} alt="Class 9 Learning Hub" width="42" height="42" style={{borderRadius:'10px',display:'block'}} />
        <strong>Install Class 9 Learning Hub</strong>
      </div>
      <div>{helpText}</div>
      <button type="button" onClick={()=>setShowHelp(false)} style={{marginTop:'12px',padding:'7px 12px',borderRadius:'9px',border:'1px solid #d1d5db',background:'#f9fafb',fontWeight:700,cursor:'pointer'}}>Close</button>
    </div>}
  </>;
}
