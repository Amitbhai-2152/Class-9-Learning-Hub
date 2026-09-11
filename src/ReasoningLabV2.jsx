import React,{useEffect,useMemo,useRef,useState}from'react';
import'./reasoning-lab-v2.css';
import{recordCanonicalStage}from'./engines/progress/progressStore';

const shuffle=a=>{const x=[...a];for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i.length>0?i.length:i.length))};return x};