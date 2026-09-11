import {awardXP,getXPLedger,makeXPEventId} from './xpStore.js';

export const XP_RULES_VERSION=1;
export const XP_REPEAT_MULTIPLIERS=Object.freeze([1,0.5,0.25,0]);
export const XP_RULE_BASE=Object.freeze({learn:10,practice:5,challenge:10,test:10,milestone:20});

const int=v=>Number.isSafeInteger(Number(v))?Number(v):0;
const pct=v=>Math.max(0,Math.min(100,Number.isFinite(Number(v))?Number(v):0));
const bool=v=>v===true;
const scoreOf=r=>r?.scorePercent==null?(int(r?.questionsTotal)>0?pct(int(r.correctAnswers)/int(r.questionsTotal)*100):0):pct(r.scorePercent);
const multiplierFor=n=>XP_REPEAT_MULTIPLIERS[Math.min(Math.max(0,int(n)),XP_REPEAT_MULTIPLIERS.length-1)];
const attemptsFor=(ledger,activityId,source,stage)=>ledger.filter(e=>e?.metadata?.activityId===activityId&&e.source===source&&e.stage===stage).length;

export function calculateStageXP(stage,result={},attemptNumber=0){
 const r=result||{};
 if(!['learn','practice','challenge','test'].includes(stage))return {eligible:false,amount:0,base:0,multiplier:0,scorePercent:0,reason:'unsupported stage'};
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

export function buildSmartXPRequest({stage,activityId,subjectId=null,topicId=null,result={},attemptNumber=0}={}){
 const activity=String(activityId??'').trim();
 if(!activity)return {eligible:false,amount:0,reason:'activityId is required'};
 const rule=calculateStageXP(stage,result,attemptNumber);
 if(!rule.eligible)return {...rule,eventId:makeXPEventId({activityId:activity,subjectId,topicId,stage})};
 return {...rule,eventId:makeXPEventId({activityId:activity,subjectId,topicId,stage}),source:stage,stage,subjectId,topicId,metadata:{activityId:activity,ruleVersion:XP_RULES_VERSION,attemptNumber,scorePercent:rule.scorePercent}};
}

export function awardSmartXP({stage,activityId,subjectId=null,topicId=null,result={},at=null}={}){
 const activity=String(activityId??'').trim();
 if(!activity)return {awarded:0,rejected:true,reason:'activityId is required'};
 const ledger=getXPLedger();
 const attemptNumber=attemptsFor(ledger,activity,stage,stage);
 const request=buildSmartXPRequest({stage,activityId:activity,subjectId,topicId,result,attemptNumber});
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
