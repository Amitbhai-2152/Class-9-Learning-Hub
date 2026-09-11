import React,{useEffect,useRef} from 'react';
import {awardSmartXP} from './engines/xp/xpRules.js';
import {getXPState} from './engines/xp/xpStore.js';
import {recordActivityAndRewards} from './engines/xp/xpRewards.js';
import {XPAchievementOverlay} from './XPBadges.jsx';
import {cbtConfig} from './cbtConfig';

const STAGES=new Set(['learn','practice','challenge','test']);
const textOf=node=>String(node?.textContent||'').replace(/\s+/g,' ').trim();
const hash=raw=>{let h=2166136261;for(let i=0;i<raw.length;i++){h^=raw.charCodeAt(i);h=Math.imul(h,16777619)}return (h>>>0).toString(16)};
const newAttemptId=()=>{try{if(globalThis.crypto?.randomUUID)return globalThis.crypto.randomUUID()}catch{}return `attempt-${Date.now()}-${Math.random().toString(36).slice(2,10)}`};
const resolveContext=()=>{
 if(typeof window==='undefined')return null;
 const params=new URLSearchParams(window.location.search);
 const stageCandidate=params.get('mode')||params.get('reasoningMode')||'';
 const stage=STAGES.has(stageCandidate)?stageCandidate:null;
 const subjectId=String(params.get('subject')||'').trim();
 if(!stage||!subjectId)return null;
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
const awardCompleted=({stage,activityId,attemptId,subjectId,topicId,result})=>{
 const before=getXPState().totalXp;
 const awarded=awardSmartXP({stage,activityId,attemptId,subjectId,topicId,result});
 const after=getXPState().totalXp;
 const rewards=recordActivityAndRewards({previousXp:before,currentXp:after,subjectId});
 return {awarded,rewards,totalXp:after};
};

export function XPCompletionBoundary({children}){
 const rootRef=useRef(null),serials=useRef({}),wasComplete=useRef(false);
 useEffect(()=>{
  const root=rootRef.current;if(!root)return undefined;
  const settle=()=>{
   const context=resolveContext();
   const complete=!!root.querySelector('.result-card,.completion-hero,.completion-grid .result-score');
   if(!context||!complete){wasComplete.current=false;return;}
   if(wasComplete.current)return;
   wasComplete.current=true;
   serials.current[context.activityId]=(serials.current[context.activityId]||0)+1;
   const result=context.stage==='learn'?{completed:true}:{...scoreFromRoot(root),completed:true};
   const outcome=awardCompleted({stage:context.stage,activityId:context.activityId,attemptId:newAttemptId(),subjectId:context.subjectId,topicId:context.topicId,result});
   try{window.dispatchEvent(new CustomEvent('class9-xp-completion',{detail:{...context,result,...outcome}}));}catch{}
  };
  settle();
  const observer=new MutationObserver(settle);observer.observe(root,{childList:true,subtree:true,characterData:true});
  const routePoll=setInterval(settle,250);
  const onCbtMessage=event=>{
   if(event.origin!==new URL(cbtConfig.url).origin)return;
   const data=event.data;
   if(!data||data.type!=='class9-cbt-result')return;
   const correctAnswers=Number(data.correctAnswers),questionsTotal=Number(data.questionsTotal);
   if(!Number.isSafeInteger(correctAnswers)||!Number.isSafeInteger(questionsTotal)||correctAnswers<0||questionsTotal<1||correctAnswers>questionsTotal)return;
   const activityId=String(data.activityId||'cbt-bseb').replace(/[^A-Za-z0-9._:-]+/g,'-').slice(0,120);
   const attemptId=String(data.attemptId||newAttemptId()).replace(/[^A-Za-z0-9._:-]+/g,'-').slice(0,80);
   const subjectId=String(data.subjectId||'class9').slice(0,160);
   const topicId=String(data.topicId||'test-centre').slice(0,160);
   const outcome=awardCompleted({stage:'test',activityId,attemptId,subjectId,topicId,result:{completed:true,correctAnswers,questionsTotal,scorePercent:Math.round(correctAnswers/questionsTotal*100)}});
   try{window.dispatchEvent(new CustomEvent('class9-xp-completion',{detail:{stage:'test',activityId,attemptId,subjectId,topicId,result:{completed:true,correctAnswers,questionsTotal},...outcome}}));}catch{}
  };
  window.addEventListener('message',onCbtMessage);
  return()=>{observer.disconnect();clearInterval(routePoll);window.removeEventListener('message',onCbtMessage)};
 },[]);
 return <div ref={rootRef}>{children}<XPAchievementOverlay/></div>;
}
