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
  return <a href={APK_URL} className="download-app-button" download aria-label="Download Class 9 Learning Hub Android app">
    <span aria-hidden="true">⬇</span>
    <span>Download Android App</span>
  </a>;
}
