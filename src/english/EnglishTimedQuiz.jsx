import React,{useEffect,useMemo,useRef,useState}from'react';
import './EnglishTimedQuiz.css';

const normalize=q=>Array.isArray(q)?{q:q[0],o:q[1],a:q[2],e:q[3]||''}:q;
const labels=['A','B','C','D'];
const defaultTimeFor=mode=>mode==='practice'?45:mode==='challenge'?60:50;

export default function EnglishTimedQuiz({title='English Quiz',mode='test',getBank,questions,onModeChange=()=>{},onBack=()=>{},addXp=()=>{},finishSession=()=>{},onRetry,onNextLevel,secondsPerQuestion}){
 const timeFor=typeof secondsPerQuestion==='number'&&secondsPerQuestion>0?()=>secondsPerQuestion:defaultTimeFor;
 const bank=useMemo(()=>{const source=getBank?getBank(mode):questions||[];return (source||[]).map(normalize)},[getBank,questions,mode]);
 const[timeLeft,setTimeLeft]=useState(()=>Math.max(10,bank.length*timeFor(mode)));
 const[index,setIndex]=useState(0),[answers,setAnswers]=useState([]),[submitted,setSubmitted]=useState(false),[started,setStarted]=useState(false);
 const finalized=useRef(false);
 useEffect(()=>{setTimeLeft(Math.max(10,bank.length*timeFor(mode)));setIndex(0);setAnswers([]);setSubmitted(false);setStarted(false);finalized.current=false},[mode,bank.length,secondsPerQuestion]);
 useEffect(()=>{if(!started||submitted)return; if(timeLeft<=0){setSubmitted(true);return}const id=setInterval(()=>setTimeLeft(t=>t-1),1000);return()=>clearInterval(id)},[started,submitted,timeLeft]);
 useEffect(()=>{if(!submitted||finalized.current)return;finalized.current=true;const finalScore=bank.reduce((s,item,i)=>s+(answers[i]===item.a?1:0),0);addXp(Math.max(5,finalScore*2));finishSession({kind:'language-skills',topic:title.toLowerCase().replace(/[^a-z]+/g,'-'),mode,score:finalScore,total:bank.length,at:Date.now()})},[submitted,bank,answers,addXp,finishSession,title,mode]);
 const score=bank.reduce((s,item,i)=>s+(answers[i]===item.a?1:0),0);
 const answered=answers.filter(v=>v!==undefined&&v!==null).length;
 const percent=bank.length?Math.round(score*100/bank.length):0;
 const select=i=>{if(submitted)return;setAnswers(a=>{const n=[...a];n[index]=i;return n})};
 const start=()=>setStarted(true);
 const submit=()=>setSubmitted(true);
 const next=()=>setIndex(i=>Math.min(bank.length-1,i+1));
 const prev=()=>setIndex(i=>Math.max(0,i-1));
 const retry=()=>{if(onRetry){onRetry();return}setTimeLeft(Math.max(10,bank.length*timeFor(mode)));setIndex(0);setAnswers([]);setSubmitted(false);setStarted(false);finalized.current=false};
 const nextLevel=()=>{if(onNextLevel){onNextLevel();return}onModeChange(mode==='practice'?'challenge':mode==='challenge'?'test':'practice')};
 if(!bank.length)return <section className="etq-shell"><button onClick={onBack} className="etq-back">← Language & Skills</button><div className="etq-empty">No questions are configured for this quiz.</div></section>;
 const totalSeconds=bank.length*timeFor(mode);const totalMinutes=Math.floor(totalSeconds/60),totalRemainingSeconds=totalSeconds%60;
 return <section className="etq-shell">
  <header className="etq-head"><div><button onClick={onBack} className="etq-back">← Language & Skills</button><div className="etq-kicker">ENGLISH • {title.toUpperCase()}</div><h1>{mode==='practice'?'Practice':mode==='challenge'?'Challenge':'Final Test'}</h1><p>Timed assessment • answer every question • marks and review appear after submission.</p></div><div className={'etq-timer '+(timeLeft<=30?'danger':'')}><small>TIME LEFT</small><strong>{String(Math.floor(timeLeft/60)).padStart(2,'0')}:{String(timeLeft%60).padStart(2,'0')}</strong></div></header>
  <nav className="etq-modes"><button className={mode==='practice'?'active':''} onClick={()=>onModeChange('practice')}>Practice</button><button className={mode==='challenge'?'active':''} onClick={()=>onModeChange('challenge')}>Challenge</button><button className={mode==='test'?'active':''} onClick={()=>onModeChange('test')}>Final Test</button></nav>
  {!started&&!submitted?<div className="etq-start"><div><span>READY?</span><h2>{bank.length} questions · {totalMinutes}m {String(totalRemainingSeconds).padStart(2,'0')}s · {timeFor(mode)}s/question</h2><p>You can move between questions. The timer runs continuously and the quiz submits automatically when time reaches zero.</p></div><button onClick={start}>Start Quiz →</button></div>:submitted?<div className="etq-result"><div className="etq-result-card"><span>RESULT</span><strong>{score} / {bank.length}</strong><b>{percent}%</b><p>{percent>=80?'Excellent command.':percent>=60?'Good work. Review the missed items once more.':'Keep practising. Use the review below to target mistakes.'}</p></div><div className="etq-review"><div className="etq-review-head"><h2>Review answers</h2><span>{answered} answered · {bank.length-answered} unanswered</span></div>{bank.map((item,i)=>{const mine=answers[i];const ok=mine===item.a;return <article className={'etq-review-item '+(ok?'correct':'wrong')} key={i}><div className="etq-qline"><b>Q{i+1}</b><span>{ok?'Correct':'Needs review'}</span></div><h3>{item.q}</h3><div className="etq-options">{item.o.map((opt,j)=><div className={'etq-review-option '+(j===item.a?'answer':'')+(j===mine&&j!==item.a?' chosen-wrong':'')} key={j}><b>{labels[j]}</b><span>{opt}</span>{j===item.a&&<em>Correct answer</em>}{j===mine&&j!==item.a&&<em>Your answer</em>}</div>)}</div>{item.e&&<p className="etq-explain"><strong>Why:</strong> {item.e}</p>}</article>})}</div><div className="etq-result-actions"><button onClick={retry}>Retry</button><button onClick={nextLevel}>Next level →</button></div></div>:<div className="etq-quiz"><div className="etq-progress"><span>Question {index+1} of {bank.length}</span><b>{answered} answered</b><div><i style={{width:`${((index+1)/bank.length)*100}%`}}/></div></div><article className="etq-card"><div className="etq-label">QUESTION {index+1}</div><h2>{bank[index].q}</h2><div className="etq-choices">{bank[index].o.map((opt,j)=><button className={answers[index]===j?'selected':''} onClick={()=>select(j)} key={j}><b>{labels[j]}</b><span>{opt}</span></button>)}</div></article><div className="etq-nav"><button onClick={prev} disabled={index===0}>← Previous</button>{index<bank.length-1?<button onClick={next} disabled={answers[index]===undefined}>Next →</button>:<button className="submit" onClick={submit} disabled={answers[index]===undefined}>Submit & See Result</button>}</div></div>}
 </section>
}
