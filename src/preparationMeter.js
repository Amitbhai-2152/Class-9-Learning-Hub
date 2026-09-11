import {STAGES} from './subjectProgressRegistry.js';

const clampPercent=value=>Math.max(0,Math.min(100,Number.isFinite(Number(value))?Number(value):0));
const safeObject=value=>value&&typeof value==='object'&&!Array.isArray(value)?value:{};

export function calculatePreparationMeter(canonical={}){
  const state=safeObject(canonical);
  const topics=Object.values(safeObject(state.topics));
  const totalStages=topics.length*STAGES.length;
  const completedStages=topics.reduce((count,topic)=>count+STAGES.filter(stage=>Boolean(safeObject(topic?.stages)[stage])).length,0);
  const coveragePercent=totalStages?Math.round((completedStages/totalStages)*100):0;
  const analytics=topics.map(topic=>safeObject(topic?.analytics));
  const quizAttempts=analytics.reduce((sum,item)=>sum+(Number.isFinite(Number(item.quizAttempts))?Number(item.quizAttempts):0),0);
  const questionsAnswered=analytics.reduce((sum,item)=>sum+(Number.isFinite(Number(item.questionsAnswered))?Number(item.questionsAnswered):0),0);
  const questionsTotal=analytics.reduce((sum,item)=>sum+(Number.isFinite(Number(item.questionsTotal))?Number(item.questionsTotal):0),0);
  const correctAnswers=analytics.reduce((sum,item)=>sum+(Number.isFinite(Number(item.correctAnswers))?Number(item.correctAnswers):0),0);
  const performancePercent=questionsAnswered?Math.round((correctAnswers/questionsAnswered)*100):0;
  const bestPercent=analytics.reduce((best,item)=>Math.max(best,clampPercent(item.bestPercent)),0);
  const hasPerformanceData=quizAttempts>0||questionsAnswered>0;
  const readiness=clampPercent(Math.round(coveragePercent*0.65+performancePercent*0.35));
  let label='अभी तैयारी शुरू करें';
  if(readiness>=90)label='परीक्षा के लिए मजबूत तैयारी';
  else if(readiness>=75)label='बहुत अच्छी तैयारी';
  else if(readiness>=50)label='अच्छी प्रगति';
  else if(readiness>=25)label='तैयारी बन रही है';
  return {
    readiness,
    coveragePercent,
    performancePercent,
    bestPercent,
    completedStages,
    totalStages,
    topicsStarted:topics.filter(topic=>STAGES.some(stage=>Boolean(safeObject(topic?.stages)[stage]))).length,
    totalTopics:topics.length,
    quizAttempts,
    questionsAnswered,
    questionsTotal,
    correctAnswers,
    hasPerformanceData,
    label,
  };
}
