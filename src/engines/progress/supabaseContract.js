import {SUBJECT_REGISTRY,STAGES,TOTAL_TOPICS} from '../../subjectProgressRegistry.js';

export const SUPABASE_SCHEMA_VERSION=1;
export const SUPABASE_TABLES=Object.freeze({students:'students',subjectTopics:'subject_topics',topicProgress:'topic_progress',quizAttempts:'quiz_attempts'});

const safeObject=value=>value&&typeof value==='object'&&!Array.isArray(value)?value:{};
const safeNum=value=>Number.isFinite(Number(value))?Number(value):0;
const safePercent=value=>Math.max(0,Math.min(100,safeNum(value)));

export function getSupabaseCatalogRows(){
 return SUBJECT_REGISTRY.flatMap(subject=>subject.topics.map(topic=>({subject_id:subject.id,topic_id:topic.id,title:topic.title,topic_order:topic.order})));
}

export function canonicalToSupabaseSnapshot(canonical,anonymousStudentId){
 const state=safeObject(canonical);
 const studentId=String(anonymousStudentId||state.studentId||'anonymous');
 const topicRows=[];const attemptIndex=[];
 Object.entries(safeObject(state.topics)).forEach(([key,row])=>{
  const [subjectId,topicId]=key.split('::');
  if(!subjectId||!topicId)return;
  const stages=safeObject(row?.stages);const analytics=safeObject(row?.analytics);
  topicRows.push({
   anonymous_student_id:studentId,subject_id:subjectId,topic_id:topicId,
   learn_complete:Boolean(stages.learn),practice_complete:Boolean(stages.practice),challenge_complete:Boolean(stages.challenge),test_complete:Boolean(stages.test),
   attempts:Math.max(0,safeNum(row?.attempts)),correct:Math.max(0,safeNum(row?.correct)),
   quiz_attempts:Math.max(0,safeNum(analytics.quizAttempts)),questions_answered:Math.max(0,safeNum(analytics.questionsAnswered)),
   questions_total:Math.max(0,safeNum(analytics.questionsTotal)),correct_answers:Math.max(0,safeNum(analytics.correctAnswers)),
   best_percent:safePercent(analytics.bestPercent),last_percent:safePercent(analytics.lastPercent),
   last_attempt_at:analytics.lastAttemptAt||null,last_activity_at:row?.lastActivityAt||null
  });
  (Array.isArray(analytics.attemptIds)?analytics.attemptIds:[]).forEach(attemptId=>attemptIndex.push({anonymous_student_id:studentId,subject_id:subjectId,topic_id:topicId,attempt_key:String(attemptId)}));
 });
 return {schemaVersion:SUPABASE_SCHEMA_VERSION,student:{anonymous_student_id:studentId,schema_version:SUPABASE_SCHEMA_VERSION},catalogRows:getSupabaseCatalogRows(),topicProgressRows:topicRows,quizAttemptIndex:attemptIndex};
}

export function validateSupabaseContract(){
 const catalog=getSupabaseCatalogRows();
 const keys=new Set(catalog.map(row=>`${row.subject_id}::${row.topic_id}`));
 return {schemaVersion:SUPABASE_SCHEMA_VERSION,totalTopics:TOTAL_TOPICS,stageCount:STAGES.length,catalogRows:catalog.length,uniqueCatalogKeys:keys.size,valid:catalog.length===TOTAL_TOPICS&&keys.size===TOTAL_TOPICS};
}
