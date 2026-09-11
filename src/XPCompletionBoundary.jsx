import React,{useEffect,useRef} from 'react';
import {awardSmartXP} from './engines/xp/xpRules.js';
import {getXPState} from './engines/xp/xpStore.js';
import {recordActivityAndRewards} from './engines/xp/xpRewards.js';

const textOf=node=>String(node?.textContent||'').replace(/\s+/g,' ').trim();
const scoreFromRoot=root=>{
 const raw=textOf(root?.querySelector('.result-score'));
 const match=raw.match(/(\d+)\s*\/\s*(\d+)/);
 if(match){const correct=Number(match[1]),total=Math.max(0,Number(match[2]));return {correctAnswers:correct,questionsTotal:total,scorePercent:total?Math.round(correct/total*100):0};}
 const pm=textOf(root?.querySelector('.result-percent')).match(/(\d+(?:\.\d+)?)\s*%/);
 return pm?{correctAnswers:0,questionsTotal:0,scorePercent:Number(pm[1])}:{correctAnswers:0,questionsTotal:0,scorePercent:0};
};

export function XPCompletionBoundary({stage,activityId,subjectId=null,topicId=null,children,onAwarded}){
 const rootRef=useRef(null),completionSerial=useRef(0),wasComplete=useRef(false),previousXp=useRef(getXPState().totalXp);
 useEffect(()=>{
  const root=rootRef.current;if(!root)return undefined;
  const settle=()=>{
   const complete=!!root.querySelector('.result-card,.completion-hero,.completion-grid .result-score');
   if(!complete){wasComplete.current=false;return;}
   if(wasComplete.current)return;
   wasComplete.current=true;completionSerial.current+=1;
   const attemptId=`attempt-${completionSerial.current}`;
   const result=stage==='learn'?{completed:true}:{...scoreFromRoot(root),completed:true};
   const before=previousXp.current;
   const awarded=awardSmartXP({stage,activityId,attemptId,subjectId,topicId,result});
   const after=getXPState().totalXp;previousXp.current=after;
   const rewards=recordActivityAndRewards({previousXp:before,currentXp:after,subjectId});
   const payload={stage,activityId,attemptId,result,awarded,rewards,totalXp:after};
   onAwarded?.(payload);
   try{root.dispatchEvent(new CustomEvent('class9-xp-completion',{detail:payload,bubbles:true}));}catch{}
  };
  settle();
  const observer=new MutationObserver(settle);observer.observe(root,{childList:true,subtree:true,characterData:true});
  return()=>observer.disconnect();
 },[stage,activityId,subjectId,topicId,onAwarded]);
 return <div ref={rootRef} data-xp-activity={activityId} data-xp-stage={stage}>{children}</div>;
}
