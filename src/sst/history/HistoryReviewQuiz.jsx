import React,{useEffect,useMemo,useRef,useState} from 'react';

const formatTime=s=>`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
const timePerQuestion=mode=>mode==='practice'?40:60;
const rotateQuestion=(question,index)=>{
 const rawOptions=Array.isArray(question?.[1])?question[1]:[];
 const optionCount=rawOptions.length;
 if(!optionCount)return {question:question?.[0]||'',options:[],correct:0,explanation:question?.[3]||''};
 const original=Number.isInteger(question?.[2])?question[2]:0;
 const desired=(index+1)%optionCount;
 const shift=((original-desired)%optionCount+optionCount)%optionCount;
 const options=rawOptions.map((_,choice)=>rawOptions[(choice+shift)%optionCount]);
 return {question:question?.[0]||'',options,correct:desired,explanation:question?.[3]||''};
};
const scoreAnswers=(questions,answers)=>answers.reduce((total,choice,index)=>total+(choice!==null&&choice===questions[index]?.correct?1:0),0);

export function HistoryReviewQuiz({data,mode,onComplete}){
 const questions=mode==='test'?(data.finalTest||data.test||[]):(data[mode]||[]);
 const visibleQuestions=useMemo(()=>questions.map(rotateQuestion),[questions]);
 const [index,setIndex]=useState(0);
 const [answers,setAnswers]=useState(()=>Array(questions.length).fill(null));
 const [done,setDone]=useState(false);
 const [timeLeft,setTimeLeft]=useState(()=>questions.length*timePerQuestion(mode));
 const doneRef=useRef(false);
 const completeRef=useRef(onComplete);
 useEffect(()=>{completeRef.current=onComplete},[onComplete]);
 useEffect(()=>{
  setIndex(0);
  setAnswers(Array(questions.length).fill(null));
  setDone(false);
  doneRef.current=false;
  setTimeLeft(questions.length*timePerQuestion(mode));
 },[mode,questions.length]);
 const finish=(finalAnswers=answers)=>{
  if(doneRef.current)return;
  const frozen=finalAnswers.slice(0,questions.length);
  while(frozen.length<questions.length)frozen.push(null);
  doneRef.current=true;
  setAnswers(frozen);
  setDone(true);
  setTimeLeft(0);
  completeRef.current(mode,scoreAnswers(visibleQuestions,frozen),questions.length);
 };
 useEffect(()=>{
  if(done||!questions.length)return;
  const timer=setInterval(()=>setTimeLeft(value=>{
   if(value<=1){clearInterval(timer);finish();return 0}
   return value-1;
  }),1000);
  return()=>clearInterval(timer);
 },[done,questions.length,mode,answers,visibleQuestions]);
 if(!questions.length)return <div className="history-result-card"><h2>इस चरण का प्रश्न बैंक उपलब्ध नहीं है।</h2></div>;
 if(done){
  const score=scoreAnswers(visibleQuestions,answers);
  return <div className="history-result-card history-review-result">
   <div className="history-result-ring">{score}<small>/{questions.length}</small></div>
   <span className="history-result-label">{mode==='practice'?'PRACTICE COMPLETE':mode==='challenge'?'CHALLENGE COMPLETE':'FINAL TEST COMPLETE'}</span>
   <h2>{score/questions.length>=.8?'बहुत बढ़िया!':score/questions.length>=.6?'अच्छी तैयारी!':'एक बार फिर दोहराएँ।'}</h2>
   <p>अंतिम अंक: <strong>{score} / {questions.length}</strong> • प्रत्येक सही उत्तर = 1 अंक • गलत/छोड़ा हुआ = 0 अंक • नकारात्मक अंकन नहीं</p>
   {mode==='test'&&<div className="history-chapter-finish">✓ अध्याय पूरा हुआ — यह chapter completed के रूप में सेव है।</div>}
   <section className="history-review-panel" aria-labelledby="history-review-title">
    <div className="history-review-head"><div><span>END REVIEW</span><h3 id="history-review-title">उत्तर समीक्षा</h3></div><small>{questions.length} प्रश्न • निष्पक्ष मूल्यांकन</small></div>
    <div className="history-review-list">{visibleQuestions.map((question,questionIndex)=>{
      const selected=answers[questionIndex];
      const correct=selected!==null&&selected===question.correct;
      const unanswered=selected===null;
      return <article className={`history-review-item ${unanswered?'unanswered':correct?'correct':'wrong'}`} key={`review-${questionIndex}`}>
       <div className="history-review-qhead"><strong>प्रश्न {questionIndex+1}</strong><span>{unanswered?'0 अंक':correct?'+1 अंक':'0 अंक'}</span></div>
       <h4>{question.question}</h4>
       <p className="history-review-line"><b>आपका उत्तर:</b> {unanswered?'उत्तर नहीं दिया':`${String.fromCharCode(65+selected)}. ${question.options[selected]}`}</p>
       <p className="history-review-line"><b>सही उत्तर:</b> {String.fromCharCode(65+question.correct)}. {question.options[question.correct]}</p>
       {question.explanation&&<p className="history-review-explanation"><b>व्याख्या:</b> {question.explanation}</p>}
      </article>;
    })}</div>
   </section>
   <button type="button" className="history-primary" onClick={()=>{setIndex(0);setAnswers(Array(questions.length).fill(null));setDone(false);doneRef.current=false;setTimeLeft(questions.length*timePerQuestion(mode));}}>फिर से प्रयास करें</button>
  </div>;
 }
 const q=visibleQuestions[index];
 const selected=answers[index];
 const answered=selected!==null;
 const totalSeconds=questions.length*timePerQuestion(mode);
 const timerClass=timeLeft<=Math.max(10,Math.floor(totalSeconds*.25))?'danger':timeLeft<=Math.floor(totalSeconds*.5)?'warning':'';
 return <div className="history-quiz-card">
  <div className="history-quiz-top"><span>{mode==='practice'?'PRACTICE':mode==='challenge'?'CHALLENGE':'FINAL TEST'}</span><div className="history-quiz-meta"><strong>{index+1} / {questions.length}</strong><span className={`history-timer ${timerClass}`} aria-live="polite">⏱ {formatTime(timeLeft)}</span></div></div>
  <div className="history-quiz-track"><span style={{width:`${((index+1)/questions.length)*100}%`}}/></div>
  <p className="history-timer-note">कुल समय {formatTime(totalSeconds)} • सही/गलत उत्तर केवल अंत की समीक्षा में दिखेंगे</p>
  <h2>{q.question}</h2>
  <div className="history-options">{q.options.map((option,choice)=><button type="button" key={`${index}-${choice}-${option}`} className={selected===choice?'selected':''} aria-pressed={selected===choice} disabled={answered} onClick={()=>setAnswers(previous=>{const next=previous.slice();next[index]=choice;return next;})}><span>{String.fromCharCode(65+choice)}</span>{option}</button>)}</div>
  <div className="history-quiz-footer"><small>{answered?'उत्तर सेव हो गया • समीक्षा अंत में':'एक विकल्प चुनें'}</small><button type="button" className="history-primary" disabled={!answered} onClick={()=>index<questions.length-1?setIndex(value=>value+1):finish(answers)}>{index===questions.length-1?'उत्तर जमा करें':'अगला प्रश्न →'}</button></div>
 </div>;
}
