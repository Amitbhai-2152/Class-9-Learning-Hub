import {STAGES,SUBJECT_REGISTRY} from './subjectProgressRegistry.js';

const clampPercent=value=>Math.max(0,Math.min(100,Number.isFinite(Number(value))?Number(value):0));
const safeObject=value=>value&&typeof value==='object'&&!Array.isArray(value)?value:{};
const stageCount=stages=>STAGES.filter(stage=>Boolean(safeObject(stages)[stage])).length;
const topicKey=(subjectId,topicId)=>`${subjectId}::${topicId}`;
const isCanonicalAccuracyRecord=(subjectId,record)=>{const source=record?.source;if(source==='legacy')return false;if(source==='canonical')return true;const attemptId=String(record?.attemptId||'');return ['math','science','english'].some(id=>id===subjectId&&attemptId.startsWith(`${id}-`));};

const metricForTopics=(topics)=>{
  const rows=Array.isArray(topics)?topics:[];
  const totalStages=rows.length*STAGES.length;
  const completedStages=rows.reduce((count,topic)=>count+stageCount(topic?.stages),0);
  const analytics=rows.map(topic=>safeObject(topic?.analytics));
  const filteredRecords=analytics.flatMap(item=>Array.isArray(item.attemptRecords)?item.attemptRecords:[]).filter(record=>record?.source==='canonical'||['math','science','english'].some(id=>String(record?.attemptId||'').startsWith(`${id}-`)));
  const hasAttemptRecords=analytics.some(item=>Array.isArray(item.attemptRecords));
  const aggregateQuizAttempts=analytics.reduce((sum,item)=>sum+(Number.isFinite(Number(item.quizAttempts))?Number(item.quizAttempts):0),0);
  const aggregateQuestionsAnswered=analytics.reduce((sum,item)=>sum+(Number.isFinite(Number(item.questionsAnswered))?Number(item.questionsAnswered):0),0);
  const aggregateQuestionsTotal=analytics.reduce((sum,item)=>sum+(Number.isFinite(Number(item.questionsTotal))?Number(item.questionsTotal):0),0);
  const aggregateCorrectAnswers=analytics.reduce((sum,item)=>sum+(Number.isFinite(Number(item.correctAnswers))?Number(item.correctAnswers):0),0);
  const quizAttempts=hasAttemptRecords?filteredRecords.length:aggregateQuizAttempts;
  const questionsAnswered=hasAttemptRecords?filteredRecords.reduce((sum,item)=>sum+(Number.isFinite(Number(item.questionsAnswered))?Number(item.questionsAnswered):0),0):aggregateQuestionsAnswered;
  const questionsTotal=hasAttemptRecords?filteredRecords.reduce((sum,item)=>sum+(Number.isFinite(Number(item.questionsTotal))?Number(item.questionsTotal):0),0):aggregateQuestionsTotal;
  const correctAnswers=hasAttemptRecords?filteredRecords.reduce((sum,item)=>sum+(Number.isFinite(Number(item.correctAnswers))?Number(item.correctAnswers):0),0):aggregateCorrectAnswers;
  const performancePercent=questionsAnswered?Math.round((correctAnswers/questionsAnswered)*100):0;
  const coveragePercent=totalStages?Math.round((completedStages/totalStages)*100):0;
  const readiness=clampPercent(Math.floor((coveragePercent*65+performancePercent*35)/100));
  return {coveragePercent,performancePercent,readiness,completedStages,totalStages,topicsStarted:rows.filter(topic=>stageCount(topic?.stages)>0).length,totalTopics:rows.length,quizAttempts,questionsAnswered,questionsTotal,correctAnswers,hasPerformanceData:quizAttempts>0||questionsAnswered>0};
};

function registryTopicStates(canonical={}){
  const topics=safeObject(canonical?.topics);
  return SUBJECT_REGISTRY.flatMap(subject=>subject.topics.map(topic=>topics[topicKey(subject.id,topic.id)]||null));
}

export function calculateSubjectPreparation(canonical={}){
  const topics=safeObject(canonical?.topics);
  return SUBJECT_REGISTRY.map(subject=>{
    const rows=subject.topics.map(topic=>topics[topicKey(subject.id,topic.id)]||null);
    return {subjectId:subject.id,...metricForTopics(rows)};
  });
}

export function calculatePreparationMeter(canonical={}){
  const state=safeObject(canonical);
  const topics=registryTopicStates(state);
  const metrics=metricForTopics(topics);
  const storedTopics=Object.values(safeObject(state.topics));
  const allAttemptRecords=storedTopics.flatMap(topic=>Array.isArray(topic?.analytics?.attemptRecords)?topic.analytics.attemptRecords:[]);
  const bestPercent=allAttemptRecords.length?allAttemptRecords.filter(record=>record?.source==='canonical'||['math','science','english'].some(id=>String(record?.attemptId||'').startsWith(`${id}-`))).reduce((best,item)=>Math.max(best,clampPercent(item.percent)),0):storedTopics.map(topic=>safeObject(topic?.analytics)).reduce((best,item)=>Math.max(best,clampPercent(item.bestPercent)),0);
  let label='अभी तैयारी शुरू करें';
  if(metrics.readiness>=90)label='परीक्षा के लिए मजबूत तैयारी';
  else if(metrics.readiness>=75)label='बहुत अच्छी तैयारी';
  else if(metrics.readiness>=50)label='अच्छी प्रगति';
  else if(metrics.readiness>=25)label='तैयारी बन रही है';
  return {...metrics,bestPercent,label,subjectBreakdown:calculateSubjectPreparation(state)};
}

function installProgressChartRepair(){
  if(typeof window==='undefined'||typeof document==='undefined'||window.__class9ProgressChartRepair)return;
  window.__class9ProgressChartRepair=true;
  let raf=0;
  const refresh=()=>{
    const panel=document.getElementById('class9-subject-progress');
    if(!panel)return;
    const canonical=(()=>{try{return safeObject(JSON.parse(localStorage.getItem('class9-progress-canonical-v1')||'null'));}catch{return {};}})();
    const rows=new Map(calculateSubjectPreparation(canonical).map(row=>[row.subjectId,row]));
    panel.querySelectorAll('.spui-card[data-subject]').forEach(card=>{
      const row=rows.get(card.getAttribute('data-subject'));
      if(!row)return;
      const percent=Number(row.coveragePercent)||0;
      const readiness=Number(row.readiness)||0;
      const percentNode=card.querySelector('.spui-title b');
      const bar=card.querySelector('.spui-bar i');
      const meta=card.querySelector('.spui-meta');
      if(percentNode)percentNode.textContent=`${percent}%`;
      if(bar)bar.style.width=`${percent}%`;
      if(meta){
        const quizLabel=row.hasPerformanceData?`${row.quizAttempts} quiz • ${row.performancePercent}% accuracy`:`${row.topicsStarted}/${row.totalTopics} topics started`;
        meta.innerHTML=`<span>${quizLabel}</span><em>Readiness ${readiness}%</em>`;
      }
      card.setAttribute('aria-label',`${card.querySelector('.spui-title strong')?.textContent||'Subject'} learning progress ${percent}%, readiness ${readiness}%`);
    });
  };
  const schedule=()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;refresh()})};
  const observer=new MutationObserver(schedule);
  observer.observe(document.body,{childList:true,subtree:true});
  window.addEventListener('class9-progress-updated',schedule);
  window.addEventListener('hindi-progress-updated',schedule);
  window.addEventListener('storage',event=>{if(event.key==='class9-progress-canonical-v1'||event.key==='class9-progress'||event.key==='class9-sessions'||event.key==='class9-learning-progress'||event.key==='class9-hindi-chapter-progress-v1')schedule()});
  const boot=()=>schedule();
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
}

installProgressChartRepair();
