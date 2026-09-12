import React,{useEffect,useRef}from'react';
import {awardSmartXP}from'./engines/xp/xpRules.js';
import {getXPState}from'./engines/xp/xpStore.js';
import {getCanonicalProgress}from'./engines/progress/progressStore.js';
import {recordActivityAndRewards}from'./engines/xp/xpRewards.js';
import {XPAchievementOverlay}from'./XPBadges.jsx';
import {cbtConfig}from'./cbtConfig';

const STAGES=new Set(['learn','practice','challenge','test']);
const textOf=node=>String(node?.textContent||'').replace(/\s+/g,' ').trim();
const hash=raw=>{let h=2166136261;for(let i=0;i<raw.length;i++){h^=raw.charCodeAt(i);h=Math.imul(h,16777619)}return (h>>>0).toString(16)};
const newAttemptId=()=>{try{if(globalThis.crypto?.randomUUID)return globalThis.crypto.randomUUID()}catch{}return `attempt-${Date.now()}-${Math.random().toString(36).slice(2,10)}`};
const resolveContext=()=>{if(typeof window==='undefined')return null;const params=new URLSearchParams(window.location.search);const stageCandidate=params.get('mode')||params.get('reasoningMode')||'';const stage=STAGES.has(stageCandidate)?stageCandidate:null;const subjectId=String(params.get('subject')||'').trim();if(!stage||!subjectId)return null;const contextEntries=[...params.entries()].filter(([k])=>k!=='page'&&k!=='mode'&&k!=='reasoningMode').sort(([a],[b])=>a.localeCompare(b));const context=contextEntries.map(([k,v])=>`${k}=${v}`).join('&');const contextHash=hash(context||subjectId);return{stage,subjectId,activityId:`hub:${subjectId}:context:${contextHash}:stage:${stage}`,topicId:`context:${contextHash}`}};
const scoreFromRoot=root=>{const raw=textOf(root?.querySelector('.result-score'))||textOf([...root.querySelectorAll('[class]')].find(node=>/\b\d+\s*\/\s*\d+\b/.test(textOf(node))&&/result|score|quiz/i.test(String(node.className||''))));const match=raw.match(/(\d+)\s*\/\s*(\d+)/);if(match){const correct=Number(match[1]),total=Math.max(0,Number(match[2]));return{correctAnswers:correct,questionsTotal:total,scorePercent:total?Math.round(correct/total*100):0}}const pm=textOf(root?.querySelector('.result-percent')).match(/(\d+(?:\.\d+)?)\s*%/);return pm?{correctAnswers:0,questionsTotal:0,scorePercent:Number(pm[1])}:{correctAnswers:0,questionsTotal:0,scorePercent:0}};
const hasCompletion=({root,stage})=>{if(!root)return false;if(root.querySelector('.result-card,.completion-hero,.completion-grid .result-score,.etq-result,.etq-result-card,[class*="result-card"],[class*="result-panel"],[class*="quiz-result"],[class*="score-card"]'))return true;const candidates=[...root.querySelectorAll('[class]')].filter(node=>/(result|completion|score)/i.test(String(node.className||'')));return candidates.some(node=>{const text=textOf(node);if(!text)return false;const score=/\b\d+\s*\/\s*\d+\b/.test(text)||/\b\d+(?:\.\d+)?\s*%/.test(text);const complete=/(?:completed|complete|chapter\s+finished|final\s+test|result|परिणाम|पूरा\s+हुआ|अध्याय\s+पूरा|सीखना\s+पूरा)/i.test(text);return score||(stage==='learn'&&complete)})};
const latestCanonicalResult=({subjectId,stage})=>{try{const topics=getCanonicalProgress()?.topics||{};const rows=Object.values(topics).filter(row=>row?.subjectId===subjectId&&row?.lastStage===stage).sort((a,b)=>String(b?.lastActivityAt||'').localeCompare(String(a?.lastActivityAt||'')));const row=rows[0];const analytics=row?.analytics||{};if(!row)return null;return{completed:true,correctAnswers:Number(analytics.correctAnswers||0),questionsTotal:Number(analytics.questionsTotal||0),scorePercent:Number(analytics.lastPercent||0)}}catch{return null}};
const awardCompleted=({stage,activityId,attemptId,subjectId,topicId,result})=>{const before=getXPState().totalXp;const awarded=awardSmartXP({stage,activityId,attemptId,subjectId,topicId,result});const after=getXPState().totalXp;const rewards=recordActivityAndRewards({previousXp:before,currentXp:after,subjectId});return{awarded,rewards,totalXp:after}};

export function XPCompletionBoundary({children}){
 const rootRef=useRef(null),wasComplete=useRef(false),lastCanonicalEvent=useRef('');
 useEffect(()=>{
  const root=rootRef.current;if(!root)return undefined;
  const awardForContext=(context,resultOverride=null)=>{if(!context||wasComplete.current)return;wasComplete.current=true;const result=resultOverride||latestCanonicalResult(context)||(context.stage==='learn'?{completed:true}:{...scoreFromRoot(root),completed:true});const outcome=awardCompleted({stage:context.stage,activityId:context.activityId,attemptId:newAttemptId(),subjectId:context.subjectId,topicId:context.topicId,result});try{window.dispatchEvent(new CustomEvent('class9-xp-completion',{detail:{...context,result,...outcome}}))}catch{}};
  const settle=()=>{const context=resolveContext();const complete=hasCompletion({root,stage:context?.stage});if(!context){wasComplete.current=false;return}if(complete)awardForContext(context)};
  const onCanonicalProgress=()=>{const context=resolveContext();if(!context||wasComplete.current)return;const marker=`${context.activityId}:${getCanonicalProgress()?.updatedAt||''}`;if(marker===lastCanonicalEvent.current)return;lastCanonicalEvent.current=marker;window.setTimeout(()=>{const result=latestCanonicalResult(context);if(result?.completed)awardForContext(context,result);else settle()},0)};
  settle();
  const observer=new MutationObserver(settle);observer.observe(root,{childList:true,subtree:true,characterData:true});
  const routePoll=setInterval(settle,250);
  window.addEventListener('class9-progress-updated',onCanonicalProgress);
  const onCbtMessage=event=>{if(event.origin!==new URL(cbtConfig.url).origin)return;const data=event.data;if(!data||data.type!=='class9-cbt-result')return;const correctAnswers=Number(data.correctAnswers),questionsTotal=Number(data.questionsTotal);if(!Number.isSafeInteger(correctAnswers)||!Number.isSafeInteger(questionsTotal)||correctAnswers<0||questionsTotal<1||correctAnswers>questionsTotal)return;const activityId=String(data.activityId||'cbt-bseb').replace(/[^A-Za-z0-9._:-]+/g,'-').slice(0,120);const attemptId=String(data.attemptId||newAttemptId()).replace(/[^A-Za-z0-9._:-]+/g,'-').slice(0,80);const subjectId=String(data.subjectId||'class9').slice(0,160);const topicId=String(data.topicId||'test-centre').slice(0,160);const outcome=awardCompleted({stage:'test',activityId,attemptId,subjectId,topicId,result:{completed:true,correctAnswers,questionsTotal,scorePercent:Math.round(correctAnswers/questionsTotal*100)}});try{window.dispatchEvent(new CustomEvent('class9-xp-completion',{detail:{stage:'test',activityId,attemptId,subjectId,topicId,result:{completed:true,correctAnswers,questionsTotal},...outcome}}))}catch{}};
  window.addEventListener('message',onCbtMessage);
  return()=>{observer.disconnect();clearInterval(routePoll);window.removeEventListener('class9-progress-updated',onCanonicalProgress);window.removeEventListener('message',onCbtMessage)};
 },[]);
 return <div ref={rootRef}>{children}<XPAchievementOverlay/></div>;
}
