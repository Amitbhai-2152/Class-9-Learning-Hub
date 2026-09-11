import React,{useEffect,useRef} from 'react';
import {awardSmartXP} from './engines/xp/xpRules.js';
import {getXPState} from './engines/xp/xpStore.js';
import {recordActivityAndRewards} from './engines/xp/xpRewards.js';

const STAGES=new Set(['learn','practice','challenge','test']);
const textOf=node=>String(node?.textContent||'').replace(/\s+/g,' ').trim();
const hash=raw=>{let h=2166136261;for(let i=0;i<raw.length;i++){h^=raw.charCodeAt(i);h=Math.imul(h,16777619)}return (h>>>0).toString(16)};
const resolveContext=()=>{
 if(typeof window==='undefined')return null;
 const params=new URLSearchParams(window.location.search);
 const page=params.get('page')||'';
 const stageCandidate=params.get('mode')||params.get('reasoningMode')||'';
 const stage=STAGES.has(stageCandidate)?stageCandidate:null;
 const subjectId=String(params.get('subject')||'').trim();
 if(!stage||!subjectId||page==='cbt'||page==='meter'||page==='home'||page==='classes'||page==='subject')return null;
 const contextEntries=[...params.entries()].filter(([k])=>k!=='page'&&k!=='mode'&&k!=='reasoningMode').sort(([a],[b])=>a.localeCompare(b));
 const context=contextEntries.map(([k,v])=>`${k}=${v}`).join('&');
 const contextHash=hash(context||subjectId);
 return {stage,subjectId,activityId:`hub:${subjectId}:context:${contextHash}:stage:${stage}`,topicId:`context:${contextHash}`};
};
const scoreFromRoot=root=>{
 const raw=textOf(root?.querySelector('.result-score'));
 const match=raw.match(/(\d+)\s*\/\s*(\d+)/);
 if(match){const correct=Number(match[1]),total=Math.max(0,Number(match[2]));return {correctAnswers:correct,questionsTotal:total,scorePercent:total?Math.round(correct/total*100):0};}
 const pm=textOf(root?.querySelector('.result-percent')).match(/(\d+(?:\.\d+)?)\s*%/);
 return pm?{correctAnswers:0,questionsTotal:0,scorePercent:Number(pm[1])}:{correctAnswers:0,questionsTotal:0,scorePercent:0};
};

export function XPCompletionBoundary({children}){
 const rootRef=useRef(null),serials=useRef({}),wasComplete=useRef(false),previousXp=useRef(getXPState().totalXp);
 useEffect(()=>{
  const root=rootRef.current;if(!root)return undefined;
  const settle=()=>{
   const context=resolveContext();
   const complete=!!root.querySelector('.result-card,.completion-hero,.completion-grid .result-score');
   if(!context||!complete){wasComplete.current=false;return;}
   if(wasComplete.current)return;
   wasComplete.current=true;
   serials.current[context.activityId]=(serials.current[context.activityId]||0)+1;
   const attemptId=`attempt-${serials.current[context.activityId]}`;
   const result=context.stage==='learn'?{completed:true}:{...scoreFromRoot(root),completed:true};
   const before=previousXp.current;
   const awarded=awardSmartXP({stage:context.stage,activityId:context.activityId,attemptId,subjectId:context.subjectId,topicId:context.topicId,result});
   const after=getXPState().totalXp;previousXp.current=after;
   const rewards=recordActivityAndRewards({previousXp:before,currentXp:after,subjectId:context.subjectId});
   const payload={...context,attemptId,result,awarded,rewards,totalXp:after};
   try{window.dispatchEvent(new CustomEvent('class9-xp-completion',{detail:payload}));}catch{}
  };
  settle();
  const observer=new MutationObserver(settle);observer.observe(root,{childList:true,subtree:true,characterData:true});
  const routePoll=setInterval(settle,250);
  return()=>{observer.disconnect();clearInterval(routePoll)};
 },[]);
 return <div ref={rootRef}>{children}</div>;
}
