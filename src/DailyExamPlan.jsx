import React,{useEffect,useMemo,useState} from 'react';
import {getDailyExamPlan,getDailyPlannerTopicStatus,getPlannerSubjectMeta,openExamPlannerTopic} from './dailyExamPlanner.js';
import './daily-exam-plan.css';

const pad=v=>String(v).padStart(2,'0');
const todayKey=()=>{const d=new Date();return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`};
const groupItems=items=>{const groups=new Map();items.forEach(item=>{if(!groups.has(item.subjectId))groups.set(item.subjectId,[]);groups.get(item.subjectId).push(item)});return [...groups.entries()];};

export function DailyExamPlan(){
 const[date,setDate]=useState(todayKey);
 const[progressTick,setProgressTick]=useState(0);
 useEffect(()=>{
  let last=todayKey();
  const timer=window.setInterval(()=>{const next=todayKey();if(next!==last){last=next;setDate(next)}},60000);
  const refresh=()=>setProgressTick(v=>v+1);
  window.addEventListener('class9-progress-updated',refresh);
  window.addEventListener('storage',refresh);
  return()=>{window.clearInterval(timer);window.removeEventListener('class9-progress-updated',refresh);window.removeEventListener('storage',refresh)};
 },[]);
 const plan=useMemo(()=>getDailyExamPlan(date),[date,progressTick]);
 const grouped=useMemo(()=>groupItems(plan.items),[plan.items]);
 const completedCount=plan.items.filter(item=>getDailyPlannerTopicStatus(item.subjectId,item.topicId).key==='test').length;
 const totalCount=plan.items.length;
 const nextLabel=plan.test?.number==='Final'?'Final Examination':plan.test?`SuperTest ${String(plan.test.number).padStart(2,'0')}`:'';
 const examDate=plan.test?.date||'';
 const openTopic=item=>openExamPlannerTopic(item.subjectId,item.topicId);
 return <section className="daily-exam-plan" aria-labelledby="daily-exam-plan-title">
  <div className="daily-plan-head">
   <div><span className="daily-plan-eyebrow">EXAM-ORIENTED • DAILY WORK</span><h2 id="daily-exam-plan-title">आज क्या पढ़ें?</h2><p>{plan.subtitle}</p></div>
   {plan.test&&<div className="exam-countdown" aria-label="Exam countdown"><span>{plan.daysLeft===0?'आज':`${plan.daysLeft} दिन`}</span><small>{plan.daysLeft===0?'EXAM DAY':'बचे हैं'}</small></div>}
  </div>

  {plan.test&&<div className="daily-plan-target"><div className="daily-target-copy"><span className="daily-target-label">🎯 NEXT EXAM TARGET</span><strong>{nextLabel}</strong><small>{plan.test.stage} • {plan.test.purpose}</small></div><div className="daily-target-date">📅 {examDate}</div>{plan.mode==='exam-day'&&<button type="button" className="daily-plan-primary" onClick={()=>{const p=new URLSearchParams();p.set('page','cbt');window.history.pushState({},'',`${window.location.pathname}?${p.toString()}`);window.dispatchEvent(new PopStateEvent('popstate'))}}>Test Centre खोलें →</button>}</div>}

  {plan.recommendations?.length>0&&<div className="daily-recommendations"><div className="daily-recommendations-head"><div><span>🧠 ADAPTIVE PRIORITY</span><strong>आज के लिए मेरी top recommendations</strong></div><small>आपकी progress + performance + exam urgency के आधार पर</small></div><div className="daily-recommendations-grid">{plan.recommendations.map((item,index)=>{const meta=getPlannerSubjectMeta(item.subjectId);return <button type="button" className="daily-recommendation" key={`${item.subjectId}:${item.topicId}`} onClick={()=>openTopic(item)}><span className="daily-recommendation-rank">{index+1}</span><span className="daily-recommendation-icon">{meta.icon}</span><span className="daily-recommendation-copy"><strong>{item.topic.title}</strong><small>{meta.name} • {item.reason}</small></span><span className="daily-recommendation-arrow">→</span></button>})}</div></div>}

  {plan.mode==='first-pass'&&<><div className="daily-plan-progress"><div><strong>{totalCount?`${completedCount}/${totalCount}`:'0/0'}</strong><span>आज के target topics complete</span></div><div className="daily-plan-progress-track"><span style={{width:`${totalCount?Math.round((completedCount/totalCount)*100):0}%`}}/></div></div><div className="daily-plan-grid">{grouped.map(([subjectId,items])=>{const meta=getPlannerSubjectMeta(subjectId);return <div className="daily-subject-card" key={subjectId}><div className="daily-subject-head"><span className="daily-subject-icon">{meta.icon}</span><strong>{meta.name}</strong><span>{items.length} target</span></div><div className="daily-topic-list">{items.map(item=>{const status=getDailyPlannerTopicStatus(item.subjectId,item.topicId);return <button type="button" className={`daily-topic ${status.key==='test'?'is-done':''}`} key={`${item.subjectId}:${item.topicId}`} onClick={()=>openTopic(item)}><span className="daily-topic-status">{status.key==='test'?'✓':'→'}</span><span className="daily-topic-copy"><strong>{item.topic.title}</strong><small>{status.label}</small></span></button>})}</div></div>})}</div></>}

  {plan.mode==='phase'&&<div className="daily-phase-box"><div className="daily-phase-badge">📘 {plan.test.stage}</div><h3>{plan.test.purpose}</h3><div className="daily-phase-steps">{plan.execution.steps.map((step,index)=><div key={step}><span>{index+1}</span><strong>{step}</strong></div>)}</div><p className="daily-phase-note">इस phase में planner chapter-by-chapter नया syllabus नहीं जोड़ता; ऊपर दिए गए exam purpose के अनुसार revision/mock work चलता है।</p></div>}

  {plan.mode==='exam-day'&&<div className="daily-exam-day"><div className="exam-day-icon">🎯</div><div><span className="daily-plan-eyebrow">TODAY'S PRIORITY</span><h3>{plan.test.stage}</h3><p>{plan.test.purpose}</p></div></div>}

  {plan.execution&&plan.mode!=='exam-day'&&<div className="daily-execution"><div className="daily-execution-head"><span>🧭 TODAY'S EXECUTION</span><strong>{plan.execution.label}</strong></div><div className="daily-execution-steps">{plan.execution.steps.map((step,index)=><span key={step}><b>{index+1}</b>{step}</span>)}</div></div>}

  {plan.mode==='complete'&&<div className="daily-phase-box"><div className="daily-phase-badge">✅ Planner complete</div><h3>Final Examination cycle पूरा हो चुका है</h3><p>28 Feb 2027 के Final Examination के बाद इस planner का scheduled exam cycle समाप्त हो गया है।</p></div>}
 </section>;
}
