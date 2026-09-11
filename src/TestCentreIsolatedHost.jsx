import React,{useEffect,useRef}from'react';
import{createRoot}from'react-dom/client';
import TestCentrePlannerFinal from'./TestCentrePlannerFinal.jsx';

export default function TestCentreIsolatedHost(){
 const hostRef=useRef(null);
 useEffect(()=>{
  if(!hostRef.current)return;
  const shadow=hostRef.current.attachShadow({mode:'open'});
  const mount=document.createElement('div');
  shadow.appendChild(mount);
  const root=createRoot(mount);
  root.render(<TestCentrePlannerFinal/>);
  return()=>root.unmount();
 },[]);
 return <div ref={hostRef} style={{display:'block',width:'100%',minHeight:'100vh'}}/>;
}
