import React,{useEffect,useMemo,useState} from 'react';

const MODE_CONFIG={
  practice:{label:'PRACTICE',level:'Easy → Moderate',durationSeconds:600},
  challenge:{label:'CHALLENGE',level:'Moderate → Hard',durationSeconds:1200},
  test:{label:'FINAL TEST',level:'Exam Level • Mixed',durationSeconds:1200}
};

function shuffleQuestion(question){
  const indexed=question.o.map((text,sourceIndex)=>({text,sourceIndex}));
  for(let i=indexed.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [indexed[i],indexed[j]]=[indexed[j],indexed[i]];
  }
  if(indexed.length>1&&indexed.every((item,index)=>item.sourceIndex===index)){
    [indexed[0],indexed[1]]=[indexed[1],indexed[0]];
  }
  return {
    ...question,
    o:indexed.map(item=>item.text),
    a:indexed.findIndex(item=>item.sourceIndex===question.a)
  };
}

function formatTime(totalSeconds){
  const safe=Math.max(0,totalSeconds);
  const minutes=Math.floor(safe/60);
  const seconds=safe%60;
  return `${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
}

export default function TimedPanoramaQuizEngine({chapterTitle,mode,questionBank,onBack,finishSession,addXp}){
  const config=MODE_CONFIG[mode]||MODE_CONFIG.practice;
  const [run,setRun]=useState(0);
  const randomized=useMemo(()=>questionBank.map(question=>shuffleQuestion(question)),[questionBank,run]);
  const [answers,setAnswers]=useState({});
  const [idx,setIdx]=useState(0);
  const [secondsLeft,setSecondsLeft]=useState(config.durationSeconds);
  const [submitted,setSubmitted]=useState(false);
  const [timedOut,setTimedOut]=useState(false);

  useEffect(()=>{
    setAnswers({});
    setIdx(0);
    setSecondsLeft(config.durationSeconds);
    setSubmitted(false);
    setTimedOut(false);
  },[mode,run,config.durationSeconds]);

  useEffect(()=>{
    if(submitted)return undefined;
    const timer=window.setInterval(()=>{
      setSecondsLeft(value=>{
        if(value<=1){
          setTimedOut(true);
          setSubmitted(true);
          return 0;
        }
        return value-1;
      });
    },1000);
    return ()=>window.clearInterval(timer);
  },[submitted]);

  const answeredCount=Object.keys(answers).length;
  const allAnswered=answeredCount===randomized.length;
  const current=randomized[idx]||null;

  const result=useMemo(()=>{
    if(!submitted)return null;
    let score=0;
    const review=randomized.map((question,questionIndex)=>{
      const selected=answers[questionIndex];
      const correct=selected===question.a;
      if(correct)score+=1;
      return {
        ...question,
        questionIndex,
        selected,
        correct
      };
    });
    return {
      score,
      total:randomized.length,
      pct:randomized.length?Math.round(score/randomized.length*100):0,
      review
    };
  },[submitted,randomized,answers]);

  useEffect(()=>{
    if(!result)return;
    addXp?.(result.score*2+(mode==='challenge'?4:2));
    finishSession?.({
      subject:'english',
      book:'The Panorama',
      chapter:chapterTitle,
      mode,
      score:result.score,
      total:result.total,
      pct:result.pct,
      completedAt:new Date().toISOString(),
      timedOut
    });
  },[result]);

  const answerQuestion=(optionIndex)=>{
    if(!current||submitted)return;
    setAnswers(previous=>({...previous,[idx]:optionIndex}));
  };

  const submit=()=>{
    if(!allAnswered||submitted)return;
    setSubmitted(true);
  };

  const retry=()=>{
    setRun(value=>value+1);
  };

  if(result){
    const timeUsed=config.durationSeconds-secondsLeft;
    return <div className="pg-shell">
      <div className="pg-quiz-wrap">
        <button className="pg-back" onClick={onBack}>← Back to Learn</button>
        <div className="pg-panel">
          <div className="pg-quiz-head"><div><span>{config.label}</span><h2>{chapterTitle}</h2></div><b>{timedOut?'TIME UP':'COMPLETE'}</b></div>
          <div className="result-score">{result.score}<small>/ {result.total}</small></div>
          <div className="result-percent">{result.pct}% marks</div>
          <p>{result.score} correct • {result.total-result.score} incorrect/unanswered • Time used {formatTime(timeUsed)}</p>
          <div className="pg-callout"><b>Test Summary</b><span>{result.total} questions • {config.level} • Overall time {formatTime(config.durationSeconds)}</span></div>
          <div className="result-actions"><button className="secondary-btn pressable" onClick={retry}>Try Again</button><button className="primary-btn pressable" onClick={onBack}>Back to English →</button></div>
        </div>
        <section className="pg-panel">
          <div className="pg-panel-title"><span>FULL REVIEW</span><h2>Complete Question Review</h2></div>
          <div className="pg-reading-stack">
            {result.review.map(item=><article className="pg-reading-card" key={`${item.questionIndex}-${item.q}`}>
              <div className="pg-card-top"><div className="pg-num">{String(item.questionIndex+1).padStart(2,'0')}</div><div><span>{item.correct?'✓ CORRECT':'✗ INCORRECT / UNANSWERED'}</span><h3>{item.q}</h3></div></div>
              <div className="pg-bottom-grid">
                <div className="pg-exam"><b>Your answer</b><span>{item.selected==null?'Not answered':`${String.fromCharCode(65+item.selected)}. ${item.o[item.selected]}`}</span></div>
                <div className="pg-think"><b>Correct answer</b><span>{String.fromCharCode(65+item.a)}. {item.o[item.a]}</span></div>
              </div>
              <div className="pg-feedback good"><p>{item.e}</p></div>
            </article>)}
          </div>
        </section>
      </div>
    </div>;
  }

  const progress=Math.round(answeredCount/randomized.length*100);
  return <div className="pg-shell">
    <div className="pg-quiz-wrap">
      <button className="pg-back" onClick={onBack}>← Back to Learn</button>
      <div className="pg-quiz-head">
        <div><span>{config.label}</span><h2>{chapterTitle}</h2><small>{randomized.length} questions • {config.level}</small></div>
        <b>{formatTime(secondsLeft)}</b>
      </div>
      <div className="pg-callout"><b>⏱ Overall Test Timer</b><span>{formatTime(config.durationSeconds)} for the complete {randomized.length}-question {mode} set. Answer every question before submitting.</span></div>
      <div className="pg-progress"><i style={{width:`${progress}%`}}/></div>
      <div className="pg-quiz-head"><div><span>ANSWERED</span><b>{answeredCount}/{randomized.length}</b></div><div><span>QUESTION</span><b>{idx+1}/{randomized.length}</b></div></div>
      <div className="pg-question-card">
        <span className="pg-qtag">Question {idx+1}</span>
        <h3>{current?.q}</h3>
        <div className="pg-options">{current?.o.map((option,optionIndex)=><button key={`${optionIndex}-${option}`} className={`pg-option ${answers[idx]===optionIndex?'selected':''}`} onClick={()=>answerQuestion(optionIndex)}><span>{String.fromCharCode(65+optionIndex)}</span><b>{option}</b></button>)}</div>
        <div className="result-actions">
          <button className="secondary-btn pressable" onClick={()=>setIdx(value=>Math.max(0,value-1))} disabled={idx===0}>← Previous</button>
          <button className="secondary-btn pressable" onClick={()=>setIdx(value=>Math.min(randomized.length-1,value+1))} disabled={idx===randomized.length-1}>Next →</button>
        </div>
      </div>
      <section className="pg-panel">
        <div className="pg-panel-title"><span>QUESTION MAP</span><h2>All Questions</h2></div>
        <div className="pg-pillgrid">{randomized.map((question,questionIndex)=><button key={`${questionIndex}-${question.q}`} className="pressable" onClick={()=>setIdx(questionIndex)}><b>{questionIndex+1}</b><span>{answers[questionIndex]==null?'Unanswered':'Answered'}</span></button>)}</div>
        <button className="pg-next" onClick={submit} disabled={!allAnswered}>{allAnswered?'Submit Test':'Answer all questions to submit'}</button>
      </section>
    </div>
  </div>;
}

export {MODE_CONFIG,shuffleQuestion,formatTime};
