import {STAGES} from './subjectProgressRegistry.js';

const clampPercent=value=>Math.max(0,Math.min(100,Number.isFinite(Number(value))?Number(value):0));
const safeObject=value=>value&&typeof value==='object'&&!Array.isArray(value)?value:{};
const stageCount=stages=>STAGES.filter(stage=>Boolean(safeObject(stages)[stage])).length;

const metricForTopics=(topics)=>{
  const rows=Array.isArray(topics)?topics:[];
  const totalStages=rows.length*STAGES.length;
  const completedStages=rows.reduce((count,topic)=>count+stageCount(topic?.stages),0);
  const analytics=rows.map(topic=>safeObject(topic?.analytics));
  const quizAttempts=analytics.reduce((sum,item)=>sum+(Number.isFinite(Number(item.quizAttempts))?Number(item.quizAttempts):0),0);
  const questionsAnswered=analytics.reduce((sum,item)=>sum+(Number.isFinite(Number(item.questionsAnswered))?Number(item.questionsAnswered):0),0);
  const questionsTotal=analytics.reduce((sum,item)=>sum+(Number.isFinite(Number(item.questionsTotal))?Number(item.questionsTotal):0),0);
  const correctAnswers=analytics.reduce((sum,item)=>sum+(Number.isFinite(Number(item.correctAnswers))?Number(item.correctAnswers):0),0);
  const performancePercent=questionsAnswered?Math.round((correctAnswers/questionsAnswered)*100):0;
  const coveragePercent=totalStages?Math.round((completedStages/totalStages)*100):0;
  const readiness=clampPercent(Math.round(coveragePercent*0.65+performancePercent*0.35));
  return {coveragePercent,performancePercent,readiness,completedStages,totalStages,topicsStarted:rows.filter(topic=>stageCount(topic?.stages)>0).length,totalTopics:rows.length,quizAttempts,questionsAnswered,questionsTotal,correctAnswers,hasPerformanceData:quizAttempts>0||questionsAnswered>0};
};

export function calculateSubjectPreparation(canonical={}){
  const topics=Object.values(safeObject(canonical?.topics));
  const bySubject=new Map();
  topics.forEach(topic=>{
    const subjectId=String(topic?.subjectId||'').trim();
    if(!subjectId)return;
    if(!bySubject.has(subjectId))bySubject.set(subjectId,[]);
    bySubject.get(subjectId).push(topic);
  });
  return [...bySubject.entries()].map(([subjectId,rows])=>({subjectId,...metricForTopics(rows)}));
}

export function calculatePreparationMeter(canonical={}){
  const state=safeObject(canonical);
  const topics=Object.values(safeObject(state.topics));
  const metrics=metricForTopics(topics);
  const bestPercent=topics.map(topic=>safeObject(topic?.analytics)).reduce((best,item)=>Math.max(best,clampPercent(item.bestPercent)),0);
  let label='अभी तैयारी शुरू करें';
  if(metrics.readiness>=90)label='परीक्षा के लिए मजबूत तैयारी';
  else if(metrics.readiness>=75)label='बहुत अच्छी तैयारी';
  else if(metrics.readiness>=50)label='अच्छी प्रगति';
  else if(metrics.readiness>=25)label='तैयारी बन रही है';
  return {...metrics,bestPercent,label,subjectBreakdown:calculateSubjectPreparation(state)};
}
