import {supabase,supabaseConfigured} from '../../lib/supabaseClient.js';
import {getCanonicalProgress,CANONICAL_KEY} from './progressStore.js';
import {XP_KEY,XP_LEDGER_KEY,getXPState,getXPLedger,xpStateToSupabaseSnapshot} from '../xp/xpStore.js';

const safeObject=v=>v&&typeof v==='object'&&!Array.isArray(v)?v:{};
const safeNum=v=>Number.isFinite(Number(v))?Number(v):0;
const safePercent=v=>Math.max(0,Math.min(100,safeNum(v)));
const iso=v=>v&&Number.isFinite(Date.parse(v))?new Date(v).toISOString():null;
const storage=()=>typeof localStorage!=='undefined'?localStorage:null;
const write=(key,value)=>{try{storage()?.setItem(key,JSON.stringify(value));return true}catch{return false}};
let syncPromise=null;

function mergeTopic(localRow,cloudRow){
 const l=safeObject(localRow),c=safeObject(cloudRow),la=safeObject(l.analytics);const latest=Date.parse(c.lastActivityAt||c.last_activity_at||'')>Date.parse(l.lastActivityAt||'')?c:l;
 return {subjectId:String(l.subjectId||c.subject_id||''),topicId:String(l.topicId||c.topic_id||''),title:String(l.title||c.title||''),stages:{learn:Boolean(l.stages?.learn||c.learn_complete),practice:Boolean(l.stages?.practice||c.practice_complete),challenge:Boolean(l.stages?.challenge||c.challenge_complete),test:Boolean(l.stages?.test||c.test_complete)},attempts:Math.max(safeNum(l.attempts),safeNum(c.attempts)),correct:Math.max(safeNum(l.correct),safeNum(c.correct)),analytics:{quizAttempts:Math.max(safeNum(la.quizAttempts),safeNum(c.quiz_attempts)),questionsAnswered:Math.max(safeNum(la.questionsAnswered),safeNum(c.questions_answered)),questionsTotal:Math.max(safeNum(la.questionsTotal),safeNum(c.questions_total)),correctAnswers:Math.max(safeNum(la.correctAnswers),safeNum(c.correct_answers)),bestPercent:Math.max(safePercent(la.bestPercent),safePercent(c.best_percent)),lastPercent:latest===c?safePercent(c.last_percent):safePercent(la.lastPercent),lastAttemptAt:latest===c?(iso(c.last_attempt_at)||la.lastAttemptAt||null):(la.lastAttemptAt||iso(c.last_attempt_at)||null),attemptIds:Array.from(new Set([...(Array.isArray(la.attemptIds)?la.attemptIds:[]),...(Array.isArray(c.attemptIds)?c.attemptIds:[])])).slice(-100)},lastActivityAt:latest.lastActivityAt||latest.last_activity_at||null};
}

function mergeCanonical(localState,cloudRows,cloudAttempts){
 const topics={...safeObject(localState?.topics)};const attemptsByTopic=new Map();
 for(const row of cloudAttempts||[]){const key=`${row.subject_id}::${row.topic_id}`;const arr=attemptsByTopic.get(key)||[];arr.push(row);attemptsByTopic.set(key,arr)}
 for(const row of cloudRows||[]){const key=`${row.subject_id}::${row.topic_id}`;const merged=mergeTopic(safeObject(topics[key]),row);const ids=new Set(merged.analytics.attemptIds||[]);for(const a of attemptsByTopic.get(key)||[])if(a.attempt_key)ids.add(String(a.attempt_key));merged.analytics.attemptIds=Array.from(ids).slice(-100);topics[key]=merged;}
 const updatedAt=[localState?.updatedAt,...(cloudRows||[]).map(r=>r.updated_at||r.last_activity_at)].filter(Boolean).sort((a,b)=>Date.parse(b)-Date.parse(a))[0]||new Date().toISOString();
 return {schemaVersion:1,studentId:String(localState?.studentId||'anonymous'),updatedAt,topics,migrations:safeObject(localState?.migrations)};
}

async function ensureStudent(user){
 const payload={auth_user_id:user.id,anonymous_student_id:`auth:${user.id}`,full_name:String(user.user_metadata?.full_name||'').trim()||null,email:String(user.email||'').trim()||null,class_label:'9',schema_version:1,updated_at:new Date().toISOString()};
 const {data,error}=await supabase.from('students').upsert(payload,{onConflict:'auth_user_id'}).select('id,auth_user_id,anonymous_student_id').single();if(error)throw error;return data;
}

async function pullCloud(studentId){
 const [progress,attempts,xpWallet,xpEvents]=await Promise.all([supabase.from('topic_progress').select('*').eq('student_id',studentId),supabase.from('quiz_attempts').select('*').eq('student_id',studentId).order('attempted_at',{ascending:false}),supabase.from('xp_wallet').select('*').eq('student_id',studentId).maybeSingle(),supabase.from('xp_events').select('*').eq('student_id',studentId).order('awarded_at',{ascending:false}).limit(1000)]);
 for(const result of [progress,attempts,xpWallet,xpEvents])if(result.error)throw result.error;return {progressRows:progress.data||[],attempts:attempts.data||[],xpWallet:xpWallet.data||null,xpEvents:xpEvents.data||[]};
}

async function pushProgress(studentId,state){
 const rows=Object.entries(safeObject(state?.topics)).map(([key,row])=>{const [subjectId,topicId]=key.split('::');const stages=safeObject(row?.stages),a=safeObject(row?.analytics);return {student_id:studentId,subject_id:subjectId,topic_id:topicId,learn_complete:Boolean(stages.learn),practice_complete:Boolean(stages.practice),challenge_complete:Boolean(stages.challenge),test_complete:Boolean(stages.test),attempts:Math.max(0,safeNum(row?.attempts)),correct:Math.max(0,safeNum(row?.correct)),quiz_attempts:Math.max(0,safeNum(a.quizAttempts)),questions_answered:Math.max(0,safeNum(a.questionsAnswered)),questions_total:Math.max(0,safeNum(a.questionsTotal)),correct_answers:Math.max(0,safeNum(a.correctAnswers)),best_percent:safePercent(a.bestPercent),last_percent:safePercent(a.lastPercent),last_attempt_at:iso(a.lastAttemptAt),last_activity_at:iso(row?.lastActivityAt),updated_at:new Date().toISOString()};}).filter(row=>row.subject_id&&row.topic_id);
 if(rows.length){const {error}=await supabase.from('topic_progress').upsert(rows,{onConflict:'student_id,subject_id,topic_id'});if(error)throw error;}
}

async function pushXP(studentId){
 const snapshot=xpStateToSupabaseSnapshot(getXPState(),studentId);const {error:walletError}=await supabase.from('xp_wallet').upsert({student_id:studentId,...snapshot.wallet,updated_at:new Date().toISOString()},{onConflict:'student_id'});if(walletError)throw walletError;const events=snapshot.events.map(e=>({student_id:studentId,...e}));if(events.length){const {error}=await supabase.from('xp_events').upsert(events,{onConflict:'student_id,event_id',ignoreDuplicates:true});if(error)throw error;}
}

function mergeLocalXP(cloudWallet,cloudEvents){
 const local=getXPState(),events=getXPLedger(),byId=new Map(events.map(e=>[String(e.eventId),e]));for(const e of cloudEvents||[])if(e.event_id)byId.set(String(e.event_id),{eventId:String(e.event_id),amount:safeNum(e.amount),source:String(e.source||'system'),subjectId:e.subject_id||null,topicId:e.topic_id||null,stage:e.stage||null,awardedAt:e.awarded_at||null,metadata:safeObject(e.metadata)});const c=safeObject(cloudWallet),sameDay=String(c.day||'')===local.day;const merged={...local,totalXp:Math.max(local.totalXp,safeNum(c.total_xp)),lifetimeXp:Math.max(local.lifetimeXp,safeNum(c.lifetime_xp)),dailyGoal:Math.max(1,safeNum(c.daily_goal)||local.dailyGoal),dailyXp:sameDay?Math.max(local.dailyXp,safeNum(c.daily_xp)):local.dailyXp,streak:Math.max(local.streak,safeNum(c.streak)),updatedAt:Date.parse(c.updated_at||'')>Date.parse(local.updatedAt||'')?c.updated_at:local.updatedAt};write(XP_KEY,merged);write(XP_LEDGER_KEY,Array.from(byId.values()).slice(-1000));try{window.dispatchEvent(new CustomEvent('class9-xp-updated',{detail:{cloudSync:true}}))}catch{}
}

export async function syncAuthenticatedUser(user){
 if(!supabaseConfigured||!supabase||!user?.id)return {ok:false,reason:'not-configured'};if(syncPromise)return syncPromise;
 syncPromise=(async()=>{const student=await ensureStudent(user);const cloud=await pullCloud(student.id);const local=getCanonicalProgress();const merged=mergeCanonical(local,cloud.progressRows,cloud.attempts);write(CANONICAL_KEY,merged);await pushProgress(student.id,merged);mergeLocalXP(cloud.xpWallet,cloud.xpEvents);await pushXP(student.id);try{window.dispatchEvent(new CustomEvent('class9-cloud-sync-complete',{detail:{studentId:student.id}}));window.dispatchEvent(new CustomEvent('class9-progress-updated',{detail:{cloudSync:true}}))}catch{}return {ok:true,studentId:student.id,topics:Object.keys(merged.topics||{}).length};})().catch(error=>{try{window.dispatchEvent(new CustomEvent('class9-cloud-sync-error',{detail:{message:String(error?.message||error)}}))}catch{};throw error}).finally(()=>{syncPromise=null});return syncPromise;
}

export function scheduleAuthenticatedSync(user,delay=900){if(!user?.id||!supabaseConfigured)return()=>{};const timer=setTimeout(()=>{syncAuthenticatedUser(user).catch(()=>{})},delay);return()=>clearTimeout(timer)}
