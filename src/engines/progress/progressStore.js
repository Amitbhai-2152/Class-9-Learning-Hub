import {resolveSubject,resolveTopic,STAGES} from '../../subjectProgressRegistry.js';

const KEY = 'class9-learning-progress';
const APP_KEY = 'class9-progress';
const CANONICAL_KEY='class9-progress-canonical-v1';
const ANON_ID_KEY='class9-anonymous-student-id';
const LEGACY_MIGRATION_KEY='class9-progress-legacy-migration-v1';
const safeObject=value=>value&&typeof value==='object'&&!Array.isArray(value)?value:{};
const safeNumber=value=>Number.isFinite(Number(value))?Number(value):0;
const safePercent=value=>Math.max(0,Math.min(100,safeNumber(value)));

function getStudentId(){
 try{const existing=localStorage.getItem(ANON_ID_KEY);if(existing)return existing;const id=globalThis.crypto?.randomUUID?.()||`anon-${Date.now()}-${Math.random().toString(36).slice(2,10)}`;localStorage.setItem(ANON_ID_KEY,id);return id;}catch{return 'anonymous';}
}
function readCanonical(){try{const raw=JSON.parse(localStorage.getItem(CANONICAL_KEY)||'null');if(raw?.schemaVersion===1&&raw?.topics&&typeof raw.topics==='object')return raw;}catch{}return{schemaVersion:1,studentId:getStudentId(),updatedAt:null,topics:{},migrations:{}};}
function writeCanonical(value){try{localStorage.setItem(CANONICAL_KEY,JSON.stringify(value));return true;}catch{return false;}}
function resolveCanonicalTopic(subject,chapter){const subjectRecord=resolveSubject(subject);const topic=resolveTopic(subjectRecord,chapter);return subjectRecord&&topic?{subjectRecord,topic}:null;}
function touchTopic({subjectRecord,topic,stage,at,attempts=0,correct=0,quiz=null}){
 const now=at||new Date().toISOString();const state=readCanonical();const key=`${subjectRecord.id}::${topic.id}`;const previous=safeObject(state.topics[key]);
 const previousAnalytics=safeObject(previous.analytics);const previousAttemptIds=Array.isArray(previousAnalytics.attemptIds)?previousAnalytics.attemptIds:[];
 let analytics={quizAttempts:safeNumber(previousAnalytics.quizAttempts),questionsAnswered:safeNumber(previousAnalytics.questionsAnswered),questionsTotal:safeNumber(previousAnalytics.questionsTotal),correctAnswers:safeNumber(previousAnalytics.correctAnswers),bestPercent:safePercent(previousAnalytics.bestPercent),lastPercent:safePercent(previousAnalytics.lastPercent),lastAttemptAt:previousAnalytics.lastAttemptAt||null,attemptIds:previousAttemptIds};
 if(quiz&&quiz.attemptId){
  const attemptId=String(quiz.attemptId);
  if(!previousAttemptIds.includes(attemptId)){
   const questionsAnswered=Math.max(0,safeNumber(quiz.questionsAnswered));
   const questionsTotal=Math.max(questionsAnswered,safeNumber(quiz.questionsTotal));
   const correctAnswers=Math.max(0,Math.min(questionsAnswered,safeNumber(quiz.correctAnswers)));
   const percent=questionsAnswered?Math.round((correctAnswers/questionsAnswered)*100):safePercent(quiz.percent);
   analytics={...analytics,quizAttempts:analytics.quizAttempts+1,questionsAnswered:analytics.questionsAnswered+questionsAnswered,questionsTotal:analytics.questionsTotal+questionsTotal,correctAnswers:analytics.correctAnswers+correctAnswers,bestPercent:Math.max(analytics.bestPercent,percent),lastPercent:percent,lastAttemptAt:quiz.at||now,attemptIds:[...previousAttemptIds,attemptId].slice(-100)};
  }
 }
 const next={subjectId:subjectRecord.id,topicId:topic.id,title:topic.title,stages:{...safeObject(previous.stages),[stage]:true},attempts:Math.max(safeNumber(previous.attempts),safeNumber(attempts)),correct:Math.max(safeNumber(previous.correct),safeNumber(correct)),analytics,lastActivityAt:now};
 const nextState={schemaVersion:1,studentId:state.studentId||getStudentId(),updatedAt:now,topics:{...safeObject(state.topics),[key]:next},migrations:safeObject(state.migrations)};writeCanonical(nextState);try{window.dispatchEvent(new CustomEvent('class9-progress-updated'))}catch{}return next;
}
export function recordCanonicalStage({subject,chapter,stage,attempts=0,correct=0,at=null}={}){if(!STAGES.includes(stage))return null;const resolved=resolveCanonicalTopic(subject,chapter);if(!resolved)return null;return touchTopic({...resolved,stage,at,attempts,correct});}
export function recordCanonicalQuizAttempt({subject,chapter,stage,attemptId,questionsAnswered=0,questionsTotal=0,correctAnswers=0,percent=0,at=null}={}){if(!STAGES.includes(stage)||!attemptId)return null;const resolved=resolveCanonicalTopic(subject,chapter);if(!resolved)return null;return touchTopic({...resolved,stage,at,attempts:1,correct:correctAnswers,quiz:{attemptId,questionsAnswered,questionsTotal,correctAnswers,percent,at}});}
function sessionIdentity(session,index,source){
 const explicit=session?.attemptId||session?.id||session?.sessionId;
 if(explicit)return String(explicit);
 return [source,index,session?.at??'',session?.subject??'',session?.chapter??'',session?.mode??'',session?.score??session?.correct??'',session?.total??'',session?.percent??'',session?.attempted??''].join('|');
}
function readLegacy(key,fallback){try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw):fallback}catch{return fallback;}}
function migrateLegacyProgress(){
 const state=readCanonical();
 const migration=safeObject(state.migrations);
 if(migration.legacyV1===true)return state;
 const generic=safeObject(readLegacy(KEY,{}));
 Object.entries(generic).forEach(([key,value])=>{
  const parts=String(key).split('::');const subject=parts.shift()||'';const chapter=parts.join('::');const row=safeObject(value);
  STAGES.forEach(stage=>{if(row[stage])recordCanonicalStage({subject,chapter,stage,attempts:safeNumber(row.attempts),correct:safeNumber(row.correct),at:row.lastActivityAt||new Date().toISOString()});});
 });
 const sessions=[];
 const app=readLegacy(APP_KEY,{});if(Array.isArray(app?.sessions))sessions.push(['app',app.sessions]);
 const engine=readLegacy('class9-sessions',[]);if(Array.isArray(engine))sessions.push(['engine',engine]);
 sessions.forEach(([source,items])=>items.forEach((session,index)=>{
  if(!session?.completed)return;const stage=STAGES.includes(session.mode)?session.mode:null;if(!stage||!session.subject||session.chapter==null)return;
  const correctAnswers=safeNumber(session.correct??session.score);const questionsTotal=Math.max(safeNumber(session.total),correctAnswers);const questionsAnswered=Math.max(0,Math.min(questionsTotal,safeNumber(session.attempted??session.total)));const percent=questionsAnswered?Math.round((correctAnswers/questionsAnswered)*100):safePercent(session.percent);
  recordCanonicalQuizAttempt({subject:session.subject,chapter:session.chapter,stage,attemptId:sessionIdentity(session,index,source),questionsAnswered,questionsTotal,correctAnswers,percent,at:session.at?new Date(session.at).toISOString():new Date().toISOString()});
 }));
 const hindi=safeObject(readLegacy('class9-hindi-chapter-progress-v1',{}));
 Object.entries(safeObject(hindi.modes)).forEach(([id,modes])=>Object.entries(safeObject(modes)).forEach(([stage,done])=>{if(done)recordCanonicalStage({subject:'हिन्दी',chapter:id,stage,at:new Date().toISOString()});}));
 const migrated=readCanonical();const now=new Date().toISOString();const finalState={schemaVersion:1,studentId:migrated.studentId||getStudentId(),updatedAt:migrated.updatedAt||now,topics:safeObject(migrated.topics),migrations:{...safeObject(migrated.migrations),legacyV1:true,legacyV1At:now}};writeCanonical(finalState);return finalState;
}
function migrateAppProgress(){try{const raw=JSON.parse(localStorage.getItem(APP_KEY));const source=safeObject(raw);const repaired={xp:Number.isFinite(source.xp)?source.xp:0,streak:Number.isFinite(source.streak)?source.streak:1,dailyXp:Number.isFinite(source.dailyXp)?source.dailyXp:0,goal:Number.isFinite(source.goal)&&source.goal>0?source.goal:100,sessions:Array.isArray(source.sessions)?source.sessions:[]};localStorage.setItem(APP_KEY,JSON.stringify({...source,...repaired}));}catch{}}
migrateAppProgress();
migrateLegacyProgress();
export function loadProgress(){try{return safeObject(JSON.parse(localStorage.getItem(KEY))||{});}catch{return {};}}
export function saveProgress(progress){try{localStorage.setItem(KEY,JSON.stringify(safeObject(progress)));return true}catch{return false;}}
export function markStageComplete(chapterId,stage){const progress=loadProgress();progress[chapterId]={...safeObject(progress[chapterId]),[stage]:true};saveProgress(progress);const parts=String(chapterId||'').split('::');const subject=parts.shift()||'';const chapter=parts.join('::');recordCanonicalStage({subject,chapter,stage,at:new Date().toISOString()});return progress;}
export function getChapterProgress(chapterId){const progress=loadProgress();const completed=STAGES.filter(stage=>progress[chapterId]?.[stage]).length;return Math.round((completed/STAGES.length)*100);}
export function getCanonicalProgress(){return readCanonical();}
export function migrateLegacyProgressNow(){return migrateLegacyProgress();}
export {CANONICAL_KEY,LEGACY_MIGRATION_KEY};
