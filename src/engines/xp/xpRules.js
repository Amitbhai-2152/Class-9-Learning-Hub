import {awardXP,getXPLedger,makeXPEventId} from './xpStore.js';

export const XP_RULES_VERSION=1;
export const XP_REPEAT_MULTIPLIERS=Object.freeze([1,0.5,0.25,0]);
export const XP_RULE_BASE=Object.freeze({learn:10,practice:5,challenge:10,test:10,milestone:20});

const STAGES=Object.freeze(['learn','practice','challenge','test']);
const int=v=>Number.isSafeInteger(Number(v))?Number(v):0;
const pct=v=>Math.max(0,Math.min(100,Number.isFinite(Number(v))?Number(v):0));
const bool=v=>v===true;
const scoreOf=r=>r?.scorePercent==null?(int(r?.questionsTotal)>0?pct(int(r.correctAnswers)/int(r.questionsTotal)*100):0):pct(r.scorePercent);
const multiplierFor=n=>XP_REPEAT_MULTIPLIERS[Math.min(Math.max(0,int(n)),XP_REPEAT_MULTIPLIERS.length-1)];
const attemptsFor=(ledger,activityId,stage)=>ledger.filter(e=>e?.metadata?.activityId===activityId&&e.source===stage&&e.stage===stage).length;

export function calculateStageXP(stage,result={},attemptNumber=0){
 const r=result||{};
 if(!STAGES.includes(stage))return {eligible:false,amount:0,base:0,multiplier:0,scorePercent:0,reason:'unsupported stage'};
 const completed=bool(r.completed);
 if(!completed)return {eligible:false,amount:0,base:0,multiplier:0,scorePercent:scoreOf(r),reason:'activity not completed'};
 const scorePercent=scoreOf(r);
 let base=0;
 if(stage==='learn')base=XP_RULE_BASE.learn;
 if(stage==='practice')base=XP_RULE_BASE.practice+Math.min(20,Math.max(0,int(r.correctAnswers))*2);
 if(stage==='challenge')base=XP_RULE_BASE.challenge+Math.min(20,Math.max(0,int(r.correctAnswers))*2)+(scorePercent>=90?15:scorePercent>=80?10:scorePercent>=70?5:0);
 if(stage==='test')base=XP_RULE_BASE.test+Math.min(20,Math.max(0,int(r.correctAnswers)))+(scorePercent>=100?20:scorePercent>=90?15:scorePercent>=80?10:scorePercent>=70?5:0);
 const multiplier=stage==='learn'?(attemptNumber===0?1:0):multiplierFor(attemptNumber);
 const amount=Math.min(100,Math.floor(base*multiplier));
 return {eligible:amount>0,amount,base,multiplier,scorePercent,reason:amount>0?'eligible':'repeat limit reached'};
}

export function calculateMilestoneXP({completed=false,milestoneId='' }={}){
 const valid=bool(completed)&&String(milestoneId||'').trim().length>0;
 return {eligible:valid,amount:valid?XP_RULE_BASE.milestone:0,reason:valid?'milestone completed':'milestone not completed or missing id'};
}

const eventIdFor=({stage,activityId,attemptId=null,subjectId=null,topicId=null,attemptNumber=0}={})=>{
 const activity=String(activityId??'').trim();
 const attempt=String(attemptId??'').trim();
 const eventActivity=attempt?`${activity}:attempt:${attempt}`:activity;
 return makeXPEventId({activityId:eventActivity,subjectId,topicId,stage});
};

export function buildSmartXPRequest({stage,activityId,attemptId=null,subjectId=null,topicId=null,result={},attemptNumber=0}={}){
 const activity=String(activityId??'').trim();
 if(!activity)return {eligible:false,amount:0,reason:'activityId is required'};
 const attempt=String(attemptId??'').trim()||null;
 const rule=calculateStageXP(stage,result,attemptNumber);
 const eventId=eventIdFor({stage,activityId:activity,attemptId:attempt,subjectId,topicId,attemptNumber});
 if(!rule.eligible)return {...rule,eventId};
 return {...rule,eventId,source:stage,stage,subjectId,topicId,metadata:{activityId:activity,attemptId,attemptNumber,ruleVersion:XP_RULES_VERSION,scorePercent:rule.scorePercent}};
}

export function awardSmartXP({stage,activityId,attemptId=null,subjectId=null,topicId=null,result={},at=null}={}){
 const activity=String(activityId??'').trim();
 if(!activity)return {awarded:0,rejected:true,reason:'activityId is required'};
 const attempt=String(attemptId??'').trim()||null;
 const ledger=getXPLedger();
 const attemptNumber=attempt?attemptsFor(ledger,activity,stage):0;
 const request=buildSmartXPRequest({stage,activityId:activity,attemptId:attempt,subjectId,topicId,result,attemptNumber});
 if(!request.eligible)return {awarded:0,rejected:false,duplicate:false,reason:request.reason,rule:request};
 return awardXP({amount:request.amount,eventId:request.eventId,source:request.source,subjectId:request.subjectId,topicId:request.topicId,stage:request.stage,at,metadata:request.metadata});
}

export function awardMilestoneXP({milestoneId,subjectId=null,topicId=null,completed=false,at=null}={}){
 const id=String(milestoneId??'').trim();
 const rule=calculateMilestoneXP({completed,milestoneId:id});
 if(!rule.eligible)return {awarded:0,rejected:false,duplicate:false,reason:rule.reason};
 const eventId=`xp:milestone:${id}`.slice(0,160);
 return awardXP({amount:rule.amount,eventId,source:'bonus',subjectId,topicId,stage:null,at,metadata:{milestoneId:id,ruleVersion:XP_RULES_VERSION}});
}
