import {getCanonicalProgress} from '../progress/progressStore.js';

export const XP_SCHEMA_VERSION=1;
export const XP_KEY='class9-xp-v1';
export const XP_LEDGER_KEY='class9-xp-ledger-v1';
export const XP_MAX_EVENT=100;
export const XP_MAX_LEDGER_EVENTS=1000;
export const XP_SOURCES=Object.freeze(['learn','practice','challenge','test','bonus','system','migration']);
export const XP_STAGES=Object.freeze(['learn','practice','challenge','test']);
export const XP_LEVEL_BASE=250;

const safeObject=v=>v&&typeof v==='object'&&!Array.isArray(v)?v:{};
const safeInt=v=>Number.isSafeInteger(Number(v))?Number(v):0;
const storage=()=>typeof localStorage!=='undefined'?localStorage:null;
const readJson=(key,fallback)=>{try{const raw=storage()?.getItem(key);return raw?JSON.parse(raw):fallback}catch{return fallback}};
const writeJson=(key,value)=>{try{storage()?.setItem(key,JSON.stringify(value));return true}catch{return false}};
const today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
const normalizeDate=v=>/^\d{4}-\d{2}-\d{2}$/.test(String(v||''))?String(v):today();
const normalizeId=v=>String(v??'').trim();

export function getXPState(){
 const raw=safeObject(readJson(XP_KEY,null));
 const legacy=safeObject(readJson('class9-progress',{}));
 const currentDay=today();
 const state={schemaVersion:XP_SCHEMA_VERSION,studentId:String(raw.studentId||getCanonicalProgress()?.studentId||'anonymous'),totalXp:Math.max(0,safeInt(raw.totalXp)),lifetimeXp:Math.max(0,safeInt(raw.lifetimeXp)),dailyXp:Math.max(0,safeInt(raw.dailyXp)),dailyGoal:Math.max(1,safeInt(raw.dailyGoal)||100),day:normalizeDate(raw.day),streak:Math.max(1,safeInt(raw.streak)||1),updatedAt:raw.updatedAt||null,openingBalance:Math.max(0,safeInt(raw.openingBalance))};
 if(!raw.schemaVersion){
  const legacyXp=Math.max(0,safeInt(legacy.xp));
  const legacyDaily=Math.max(0,safeInt(legacy.dailyXp));
  state.totalXp=legacyXp;state.lifetimeXp=legacyXp;state.dailyXp=Math.min(state.dailyGoal,legacyDaily);state.streak=Math.max(1,safeInt(legacy.streak)||1);state.openingBalance=legacyXp;state.updatedAt=new Date().toISOString();
  writeJson(XP_KEY,state);
 } else if(state.day!==currentDay){state.dailyXp=0;state.day=currentDay;state.updatedAt=new Date().toISOString();writeJson(XP_KEY,state)}
 return state;
}
export function getXPLedger(){const rows=readJson(XP_LEDGER_KEY,[]);return Array.isArray(rows)?rows.filter(row=>row&&typeof row==='object'):[]}
export function validateXPRequest({amount,eventId,source,subjectId=null,topicId=null,stage=null}={}){
 const n=Number(amount);const id=normalizeId(eventId);const src=normalizeId(source);
 if(!Number.isSafeInteger(n)||n<1||n>XP_MAX_EVENT)return {valid:false,error:'XP amount must be an integer between 1 and 100'};
 if(id.length<8||id.length>160)return {valid:false,error:'eventId must be 8-160 characters'};
 if(!/^[A-Za-z0-9._:-]+$/.test(id))return {valid:false,error:'eventId contains unsupported characters'};
 if(!XP_SOURCES.includes(src))return {valid:false,error:'unsupported XP source'};
 if(stage!==null&&!XP_STAGES.includes(stage))return {valid:false,error:'invalid XP stage'};
 for(const value of [subjectId,topicId])if(value!==null&&String(value).length>160)return {valid:false,error:'XP context value is too long'};
 return {valid:true,amount:n,eventId:id,source:src,subjectId:subjectId===null?null:String(subjectId),topicId:topicId===null?null:String(topicId),stage};
}
export function awardXP({amount,eventId,source='system',subjectId=null,topicId=null,stage=null,at=null,metadata={}}={}){
 const check=validateXPRequest({amount,eventId,source,subjectId,topicId,stage});
 if(!check.valid)return {awarded:0,duplicate:false,rejected:true,error:check.error,state:getXPState()};
 const state=getXPState();const ledger=getXPLedger();
 const existing=ledger.find(row=>String(row.eventId)===check.eventId);
 if(existing){
  const conflict=Number(existing.amount)!==check.amount||String(existing.source)!==check.source||String(existing.subjectId||'')!==String(check.subjectId||'')||String(existing.topicId||'')!==String(check.topicId||'')||String(existing.stage||'')!==String(check.stage||'');
  return {awarded:0,duplicate:true,conflict,state,event:existing};
 }
 if(state.totalXp>Number.MAX_SAFE_INTEGER-check.amount||state.lifetimeXp>Number.MAX_SAFE_INTEGER-check.amount)return {awarded:0,duplicate:false,rejected:true,error:'XP balance overflow',state};
 const timestamp=at&&Number.isFinite(Date.parse(at))?new Date(at).toISOString():new Date().toISOString();
 const event={eventId:check.eventId,amount:check.amount,source:check.source,subjectId:check.subjectId,topicId:check.topicId,stage:check.stage,awardedAt:timestamp,metadata:safeObject(metadata)};
 const next={...state,totalXp:state.totalXp+check.amount,lifetimeXp:state.lifetimeXp+check.amount,dailyXp:state.dailyXp+check.amount,updatedAt:timestamp};
 if(!writeJson(XP_KEY,next))return {awarded:0,duplicate:false,rejected:true,error:'Unable to persist XP state',state};
 const nextLedger=[...ledger,event].slice(-XP_MAX_LEDGER_EVENTS);if(!writeJson(XP_LEDGER_KEY,nextLedger)){writeJson(XP_KEY,state);return {awarded:0,duplicate:false,rejected:true,error:'Unable to persist XP ledger',state}};
 try{window.dispatchEvent(new CustomEvent('class9-xp-updated',{detail:{event,nextState:next}}));}catch{}
 return {awarded:check.amount,duplicate:false,rejected:false,state:next,event};
}
export function makeXPEventId({activityId,subjectId=null,topicId=null,stage=null}={}){
 const a=normalizeId(activityId);if(a.length<1)return '';
 return ['xp',subjectId,topicId,stage,a].filter(v=>v!==null&&v!==undefined&&String(v)!=='').join(':').slice(0,160);
}
export function calculateXPLevel(totalXp){const xp=Math.max(0,safeInt(totalXp));const level=Math.floor(xp/XP_LEVEL_BASE)+1;const inLevel=xp%XP_LEVEL_BASE;return {level,inLevel,nextLevelXp:XP_LEVEL_BASE,percent:Math.round((inLevel/XP_LEVEL_BASE)*100)}}
export function xpStateToSupabaseSnapshot(state=getXPState(),studentId=null){const safe=safeObject(state);return {schemaVersion:XP_SCHEMA_VERSION,studentId:String(studentId||safe.studentId||'anonymous'),wallet:{total_xp:Math.max(0,safeInt(safe.totalXp)),lifetime_xp:Math.max(0,safeInt(safe.lifetimeXp)),daily_xp:Math.max(0,safeInt(safe.dailyXp)),daily_goal:Math.max(1,safeInt(safe.dailyGoal)||100),day:normalizeDate(safe.day),streak:Math.max(1,safeInt(safe.streak)||1)},events:getXPLedger().map(row=>({...row}))}};
