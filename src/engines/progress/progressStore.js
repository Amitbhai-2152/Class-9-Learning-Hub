import {resolveSubject,resolveTopic,STAGES} from '../../subjectProgressRegistry';

const KEY = 'class9-learning-progress';
const APP_KEY = 'class9-progress';
const CANONICAL_KEY='class9-progress-canonical-v1';
const ANON_ID_KEY='class9-anonymous-student-id';
const safeObject=value=>value&&typeof value==='object'&&!Array.isArray(value)?value:{};
const safeNumber=value=>Number.isFinite(Number(value))?Number(value):0;

function getStudentId(){
 try{const existing=localStorage.getItem(ANON_ID_KEY);if(existing)return existing;const id=globalThis.crypto?.randomUUID?.()||`anon-${Date.now()}-${Math.random().toString(36).slice(2,10)}`;localStorage.setItem(ANON_ID_KEY,id);return id;}catch{return 'anonymous';}
}
function readCanonical(){try{const raw=JSON.parse(localStorage.getItem(CANONICAL_KEY)||'null');if(raw?.schemaVersion===1&&raw?.topics&&typeof raw.topics==='object')return raw;}catch{}return{schemaVersion:1,studentId:getStudentId(),updatedAt:null,topics:{}};}
function writeCanonical(value){try{localStorage.setItem(CANONICAL_KEY,JSON.stringify(value));return true;}catch{return false;}}
export function recordCanonicalStage({subject,chapter,stage,attempts=0,correct=0,at=null}={}){
 if(!STAGES.includes(stage))return null;
 const subjectRecord=resolveSubject(subject);const topic=resolveTopic(subjectRecord,chapter);if(!subjectRecord||!topic)return null;
 const now=at||new Date().toISOString();const state=readCanonical();const key=`${subjectRecord.id}::${topic.id}`;const previous=safeObject(state.topics[key]);
 const next={subjectId:subjectRecord.id,topicId:topic.id,title:topic.title,stages:{...safeObject(previous.stages),[stage]:true},attempts:Math.max(safeNumber(previous.attempts),safeNumber(attempts)),correct:Math.max(safeNumber(previous.correct),safeNumber(correct)),lastActivityAt:now};
 writeCanonical({schemaVersion:1,studentId:state.studentId||getStudentId(),updatedAt:now,topics:{...safeObject(state.topics),[key]:next}});
 try{window.dispatchEvent(new CustomEvent('class9-progress-updated'))}catch{}return next;
}
function migrateAppProgress(){try{const raw=JSON.parse(localStorage.getItem(APP_KEY));const source=safeObject(raw);const repaired={xp:Number.isFinite(source.xp)?source.xp:0,streak:Number.isFinite(source.streak)?source.streak:1,dailyXp:Number.isFinite(source.dailyXp)?source.dailyXp:0,goal:Number.isFinite(source.goal)&&source.goal>0?source.goal:100,sessions:Array.isArray(source.sessions)?source.sessions:[]};localStorage.setItem(APP_KEY,JSON.stringify({...source,...repaired}));}catch{}}
migrateAppProgress();
export function loadProgress(){try{return safeObject(JSON.parse(localStorage.getItem(KEY))||{});}catch{return {};}}
export function saveProgress(progress){try{localStorage.setItem(KEY,JSON.stringify(safeObject(progress)));return true}catch{return false;}}
export function markStageComplete(chapterId,stage){const progress=loadProgress();progress[chapterId]={...safeObject(progress[chapterId]),[stage]:true};saveProgress(progress);const parts=String(chapterId||'').split('::');const subject=parts.shift()||'';const chapter=parts.join('::');recordCanonicalStage({subject,chapter,stage,at:new Date().toISOString()});return progress;}
export function getChapterProgress(chapterId){const progress=loadProgress();const completed=STAGES.filter(stage=>progress[chapterId]?.[stage]).length;return Math.round((completed/STAGES.length)*100);}
export function getCanonicalProgress(){return readCanonical();}
export {CANONICAL_KEY};
