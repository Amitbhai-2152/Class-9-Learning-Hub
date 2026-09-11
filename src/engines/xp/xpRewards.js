import {awardXP,calculateXPLevel,getXPState,getXPLedger,XP_LEVEL_BASE} from './xpStore.js';

export const XP_REWARDS_SCHEMA_VERSION=2;
export const XP_ROUTINE_KEY='class9-xp-routine-v1';
export const XP_LEVEL_REWARD_STEP=5;
export const XP_LEVEL_REWARD_XP=25;
export const XP_STREAK_REWARDS=Object.freeze({3:10,7:25,14:50,30:100});
export const XP_STREAK_MILESTONES=Object.freeze([3,7,14,30]);
export const XP_STREAK_HISTORY_DAYS=180;

const storage=()=>typeof localStorage!=='undefined'?localStorage:null;
const safeObject=v=>v&&typeof v==='object'&&!Array.isArray(v)?v:{};
const readJson=(key,fallback)=>{try{const raw=storage()?.getItem(key);return raw?JSON.parse(raw):fallback}catch{return fallback}};
const writeJson=(key,value)=>{try{storage()?.setItem(key,JSON.stringify(value));return true}catch{return false}};
const int=v=>Number.isSafeInteger(Number(v))?Number(v):0;
const dayFrom=value=>{const d=value?new Date(value):new Date();return Number.isNaN(d.getTime())?null:`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
const parseDay=s=>{const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s||''));if(!m)return null;const d=new Date(Number(m[1]),Number(m[2])-1,Number(m[3]));return d.getFullYear()===Number(m[1])&&d.getMonth()===Number(m[2])-1&&d.getDate()===Number(m[3])?d:null};
const diffDays=(from,to)=>{const a=parseDay(from),b=parseDay(to);if(!a||!b)return null;return Math.round((Date.UTC(b.getFullYear(),b.getMonth(),b.getDate())-Date.UTC(a.getFullYear(),a.getMonth(),a.getDate()))/86400000)};
const validHistory=value=>Array.isArray(value)?Array.from(new Set(value.map(v=>parseDay(v)?String(v):null).filter(Boolean))).sort().slice(-XP_STREAK_HISTORY_DAYS):[];
const defaultRoutine=()=>({schemaVersion:XP_REWARDS_SCHEMA_VERSION,currentStreak:0,bestStreak:0,lastActiveDay:null,activeDays:0,activeDayHistory:[],claimedLevelRewards:[],claimedStreakRewards:[],updatedAt:null});

export function getXPRoutine(){
 const raw=safeObject(readJson(XP_ROUTINE_KEY,null));
 const base=defaultRoutine();
 const history=validHistory(raw.activeDayHistory);
 const last=history.length?history[history.length-1]:(parseDay(raw.lastActiveDay)?raw.lastActiveDay:null);
 return {
  ...base,
  ...raw,
  schemaVersion:XP_REWARDS_SCHEMA_VERSION,
  currentStreak:Math.max(0,int(raw.currentStreak)),
  bestStreak:Math.max(0,int(raw.bestStreak)),
  activeDays:Math.max(Math.max(0,int(raw.activeDays)),history.length),
  activeDayHistory:history,
  claimedLevelRewards:Array.isArray(raw.claimedLevelRewards)?raw.claimedLevelRewards.map(int).filter(v=>v>0):[],
  claimedStreakRewards:Array.isArray(raw.claimedStreakRewards)?raw.claimedStreakRewards.map(int).filter(v=>v>0):[],
  lastActiveDay:last,
  updatedAt:raw.updatedAt||null,
 };
}

export function recordXPActivity({at=null}={}){
 const today=dayFrom(at);
 if(!today)return {updated:false,error:'invalid activity date',routine:getXPRoutine()};
 const routine=getXPRoutine();
 if(routine.lastActiveDay===today)return {updated:false,duplicate:true,reason:'already active today',routine};
 if(routine.lastActiveDay){const gap=diffDays(routine.lastActiveDay,today);if(gap!==null&&gap<0)return {updated:false,rejected:true,reason:'activity date is before last active day',routine};}
 const gap=routine.lastActiveDay?diffDays(routine.lastActiveDay,today):null;
 const nextStreak=routine.lastActiveDay===null?1:(gap===1?routine.currentStreak+1:1);
 const history=validHistory([...routine.activeDayHistory,today]);
 const next={...routine,currentStreak:nextStreak,bestStreak:Math.max(routine.bestStreak,nextStreak),lastActiveDay:today,activeDays:Math.max(routine.activeDays+1,history.length),activeDayHistory:history,updatedAt:new Date().toISOString()};
 if(!writeJson(XP_ROUTINE_KEY,next))return {updated:false,rejected:true,error:'unable to persist streak state',routine};
 return {updated:true,duplicate:false,routine:next};
}

export function calculateStreakCalendar({days=7,at=null}={}){
 const count=Math.min(31,Math.max(1,int(days)||7));
 const today=dayFrom(at);
 if(!today)return {today:null,days:[]};
 const active=new Set(getXPRoutine().activeDayHistory);
 const base=parseDay(today);
 const items=[];
 for(let i=count-1;i>=0;i--){const d=new Date(base);d.setDate(d.getDate()-i);const key=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;items.push({date:key,active:active.has(key),isToday:key===today});}
 return {today,days:items};
}

export function getStreakSummary({at=null}={}){
 const routine=getXPRoutine();
 const today=dayFrom(at);
 const activeToday=today?routine.lastActiveDay===today:false;
 const next=XP_STREAK_MILESTONES.find(n=>n>routine.currentStreak)||null;
 const previous=XP_STREAK_MILESTONES.filter(n=>n<=routine.currentStreak).pop()||0;
 return {current:routine.currentStreak,best:routine.bestStreak,activeDays:routine.activeDays,lastActiveDay:routine.lastActiveDay,activeToday,nextMilestone:next,nextMilestoneIn:next?next-routine.currentStreak:0,previousMilestone:previous,calendar7:calculateStreakCalendar({days:7,at}),calendar30:calculateStreakCalendar({days:30,at})};
}

export function calculateLevelProgress(totalXp=0){
 const xp=Math.max(0,int(totalXp));
 const level=calculateXPLevel(xp);
 const currentFloor=level.level<=1?0:(level.level-1)*XP_LEVEL_BASE;
 const nextThreshold=level.level*XP_LEVEL_BASE;
 return {totalXp:xp,level:level.level,currentLevelXp:xp-currentFloor,nextLevelXp:XP_LEVEL_BASE,percent:Math.min(100,Math.round(((xp-currentFloor)/XP_LEVEL_BASE)*100)),nextThreshold};
}

export function calculateLevelRewards(fromLevel,toLevel){
 const from=Math.max(1,int(fromLevel));
 const to=Math.max(from,int(toLevel));
 const levels=[];
 for(let level=from+1;level<=to;level++)if(level%XP_LEVEL_REWARD_STEP===0)levels.push({level,amount:XP_LEVEL_REWARD_XP});
 return levels;
}

export function calculateStreakReward(streak){
 const n=Math.max(0,int(streak));
 const amount=XP_STREAK_REWARDS[n]||0;
 return {eligible:amount>0,streak:n,amount,reason:amount>0?'streak milestone':'no reward at this streak'};
}

export function awardLevelRewards({previousXp=0,currentXp=null,subjectId=null}={}){
 const before=calculateXPLevel(Math.max(0,int(previousXp))).level;
 const after=calculateXPLevel(currentXp===null?getXPState().totalXp:Math.max(0,int(currentXp))).level;
 const routine=getXPRoutine();
 const pending=calculateLevelRewards(before,after).filter(item=>!routine.claimedLevelRewards.includes(item.level));
 const awarded=[];
 let nextRoutine=routine;
 for(const item of pending){
  const result=awardXP({amount:item.amount,eventId:`xp:reward:level:${item.level}`,source:'bonus',subjectId,stage:null,metadata:{rewardType:'level',level:item.level,rewardVersion:XP_REWARDS_SCHEMA_VERSION}});
  if(result.awarded>0||result.duplicate){
   const claimed=Array.from(new Set([...nextRoutine.claimedLevelRewards,item.level])).sort((a,b)=>a-b);
   nextRoutine={...nextRoutine,claimedLevelRewards:claimed,updatedAt:new Date().toISOString()};
   awarded.push({level:item.level,amount:result.awarded,duplicate:!!result.duplicate});
  }
 }
 if(nextRoutine!==routine)writeJson(XP_ROUTINE_KEY,nextRoutine);
 return {fromLevel:before,toLevel:after,rewards:awarded};
}

export function recordActivityAndRewards({at=null,previousXp=0,currentXp=null,subjectId=null}={}){
 const activity=recordXPActivity({at});
 const rewards=awardLevelRewards({previousXp,currentXp,subjectId});
 const streakReward=calculateStreakReward(activity.routine.currentStreak);
 if(activity.updated&&streakReward.eligible&&!activity.routine.claimedStreakRewards.includes(streakReward.streak)){
  const result=awardXP({amount:streakReward.amount,eventId:`xp:reward:streak:${streakReward.streak}`,source:'bonus',subjectId,stage:null,metadata:{rewardType:'streak',streak:streakReward.streak,rewardVersion:XP_REWARDS_SCHEMA_VERSION}});
  const routine=getXPRoutine();
  const claimed=Array.from(new Set([...routine.claimedStreakRewards,streakReward.streak])).sort((a,b)=>a-b);
  writeJson(XP_ROUTINE_KEY,{...routine,claimedStreakRewards:claimed,updatedAt:new Date().toISOString()});
  return {activity,rewards,streakReward:{...streakReward,awarded:result.awarded,duplicate:!!result.duplicate}};
 }
 return {activity,rewards,streakReward:{...streakReward,awarded:0,duplicate:false}};
}

export function getRewardSummary(){
 const state=getXPState();
 const routine=getXPRoutine();
 return {schemaVersion:XP_REWARDS_SCHEMA_VERSION,xp:state.totalXp,levelProgress:calculateLevelProgress(state.totalXp),streak:getStreakSummary(),claimedLevelRewards:routine.claimedLevelRewards.slice(),claimedStreakRewards:routine.claimedStreakRewards.slice(),ledgerRewards:getXPLedger().filter(e=>e.source==='bonus').length};
}
