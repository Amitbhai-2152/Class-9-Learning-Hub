import React,{useEffect,useMemo,useState} from 'react';
import './panorama-timed-quiz.css';

const MODE_CONFIG={
  practice:{label:'PRACTICE',difficulty:'Easy → Moderate',secondsPerQuestion:45},
  challenge:{label:'CHALLENGE',difficulty:'Moderate → Hard',secondsPerQuestion:60},
  test:{label:'FINAL TEST',difficulty:'Exam Level',secondsPerQuestion:75}
};

function shuffleQuestion(q){
  const indexed=q.o.map((text,sourceIndex)=>({text,sourceIndex}));
  for(let i=indexed.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [indexed[i],indexed[j]]=[indexed[j],indexed[i]];
  }
  if(indexed.length>1&&indexed.every((item,index)=>item.sourceIndex===index)){
    [indexed[0],indexed[1]]=[indexed[1],indexed[0]];
  }
  return {...q,o:indexed.map(item=>item.text),a:indexed.findIndex(item=>item.sourceIndex===q.a),sourceAnswer:q.o[q.a]};
}

function formatTime(total){
  const seconds=Math.max(0,total);
  const m=Math.floor(seconds/60).toString().padStart(2,'0');
  const s=(seconds%60).toString().padStart(2,'0');
  return `${m}:${s}`;
}

export function PanoramaTimedQuiz({mode,title,bank,onBack,addXp,finishSession}){
  const config=MODE_CONFIG[mode]||MODE_CONFIG.practice;
  const [runId,setRunId]=useState(0);
  const randomizedBank=useMemo(()=>bank.map(shuffleQuestion),[bank,runId]);
  const [idx,setIdx]=useState(0);
  const [answers,setAnswers]=useState([]);
  const [secondsLeft,setSecondsLeft]=useState(0);
  const [startedAt,setStartedAt]=useState(null);
  const [submitted,setSubmitted]=useState(false);

  const totalSeconds=Math.max(60,Math.round(bank.length*config.secondsPerQuestion));
  const current=randomizedBank[idx]||null;
  const answeredCount=answers.filter(v=>v!==null&&v!==undefined).length;
  const allAnswered=answeredCount===bank.length;

  const begin=()=>{
    setRunId(r=>r+1);
    setIdx(0);
    setAnswers(Array(bank.length).fill(null));
    setSecondsLeft(totalSeconds);
    setStartedAt(Date.now());
    setSubmitted(false);
  };

  useEffect(()=>{begin();},[mode]);

  useEffect(()=>{
    if(submitted||startedAt===null)return undefined;
    const timer=window.setInterval(()=>{
      setSecondsLeft(prev=>{
        if(prev<=1){
          window.clearInterval(timer);
          setSubmitted(true);
          return 0;
        }
        return prev-1;
      });
    },1000);
    return ()=>window.clearInterval(timer);
  },[submitted,startedAt]);

  const choose=value=>{
    if(submitted)return;
    setAnswers(prev=>{
      const next=[...prev];
      next[idx]=value;
      return next;
    });
  };

  const submitNow=()=>setSubmitted(true);
  const moveTo=i=>setIdx(Math.max(0,Math.min(bank.length-1,i)));
  const restart=()=>begin();

  const result=useMemo(()=>{
    if(!submitted)return null;
    let score=0;
    randomizedBank.forEach((q,i)=>{if(answers[i]===q.a)score+=1;});
    const pct=Math.round(score/bank.length*100);
    const timeTaken=Math.max(0,totalSeconds-secondsLeft);
    return {score,total:bank.length,pct,timeTaken};
  },[submitted,randomizedBank,answers,bank.length,totalSeconds,secondsLeft]);

  useEffect(()=>{
    if(!result||!finishSession)return;
    finishSession({chapter:title,mode,score:result.score,total:result.total,percent:result.pct,completed:allAnswered,timedOut:secondsLeft===0,completedAt:new Date().toISOString()});
    if(addXp)addXp(result.score*2+(mode==='challenge'?4:2));
  },[result]);

  if(result){
    return <div className="pg-shell"><div className="pg-quiz-wrap">
      <button className="pg-back" onClick={onBack}>← Back to Learn</button>
      <div className="ptq-result-head"><span>{config.label}</span><h2>{title}</h2><p>{config.difficulty} • {bank.length} questions • Total time {formatTime(totalSeconds)}</p></div>
      <div className="ptq-score-card"><div className="ptq-score">{result.score}<small>/ {result.total}</small></div><div className="ptq-percent">{result.pct}%</div><div className="ptq-time">Time used: {formatTime(result.timeTaken)} {secondsLeft===0?'• Time expired':''}</div><p>{allAnswered?'All questions answered.':'Time expired before every question was answered.'}</p></div>
      <div className="ptq-review">
        <div className="ptq-review-title"><span>FULL REVIEW</span><b>{answeredCount}/{bank.length} answered</b></div>
        {randomizedBank.map((q,i)=>{
          const selected=answers[i];
          const correct=selected===q.a;
          return <article className={`ptq-review-item ${correct?'is-correct':selected==null?'is-unanswered':'is-wrong'}`} key={`${i}-${q.q}`}>
            <div className="ptq-review-top"><strong>Q{i+1}</strong><span>{correct?'✓ Correct':selected==null?'— Unanswered':'✗ Wrong'}</span></div>
            <h3>{q.q}</h3>
            <div className="ptq-review-answer"><b>Your answer:</b><span>{selected==null?'Not answered':`${String.fromCharCode(65+selected)}. ${q.o[selected]}`}</span></div>
            <div className="ptq-review-answer"><b>Correct answer:</b><span>{String.fromCharCode(65+q.a)}. {q.o[q.a]}</span></div>
            <p>{q.e}</p>
          </article>;
        })}
      </div>
      <div className="ptq-result-actions"><button onClick={restart}>Try Again</button><button className="primary" onClick={onBack}>Back to English</button></div>
    </div></div>;
  }

  return <div className="pg-shell"><div className="pg-quiz-wrap">
    <button className="pg-back" onClick={onBack}>← Back to Learn</button>
    <div className="pg-quiz-head"><div><span>{config.label}</span><h2>{title}</h2></div><div className="ptq-head-meta"><b>{idx+1}/{bank.length}</b><strong className={secondsLeft<=60?'urgent':''}>⏱ {formatTime(secondsLeft)}</strong></div></div>
    <div className="ptq-meta-row"><span>{config.difficulty}</span><span>{bank.length} questions</span><span>Total test time: {formatTime(totalSeconds)}</span><span>{answeredCount}/{bank.length} answered</span></div>
    <div className="pg-progress"><i style={{width:`${Math.round(answeredCount/bank.length*100)}%`}}/></div>
    <div className="ptq-question-nav">{randomizedBank.map((_,i)=><button key={i} className={`${i===idx?'active ':''}${answers[i]!==null&&answers[i]!==undefined?'answered':''}`} onClick={()=>moveTo(i)}>Q{i+1}</button>)}</div>
    {current&&<div className="pg-question-card">
      <span className="pg-qtag">Question {idx+1}</span>
      <h3>{current.q}</h3>
      <div className="pg-options">{current.o.map((o,i)=>{
        const selected=answers[idx]===i;
        return <button key={`${o}-${i}`} className={`pg-option ${selected?'selected':''}`} onClick={()=>choose(i)}><span>{String.fromCharCode(65+i)}</span><b>{o}</b></button>;
      })}</div>
      <div className="ptq-bottom-actions"><button disabled={idx===0} onClick={()=>moveTo(idx-1)}>← Previous</button><button disabled={idx===bank.length-1} onClick={()=>moveTo(idx+1)}>Next →</button></div>
    </div>}
    <div className="ptq-submitbar"><span>{allAnswered?'All questions answered — test can be submitted.':'Answer every question before submitting.'}</span><button className="primary" disabled={!allAnswered} onClick={submitNow}>Submit Test</button>{secondsLeft===0&&<em>Time expired — submitting automatically.</em>}</div>
  </div></div>;
}

export default PanoramaTimedQuiz;
