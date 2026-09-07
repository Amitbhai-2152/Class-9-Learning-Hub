import React,{useEffect,useMemo,useRef,useState} from 'react';
import {GEOGRAPHY_CHAPTER_9} from './geographyChapter9Data';
import {GEOGRAPHY_CHAPTER_9_SUBJECTIVE} from './geographyChapter9SubjectiveData';

const QUIZ_TIMES={practice:15*60,challenge:20*60,test:30*60};
const MODE_LABEL={practice:'Practice',challenge:'Challenge',test:'Final Test'};
const shuffleForQuestion=(options,index)=>{const n=options.length;if(!n)return [];const shift=index%n;return options.map((_,i)=>options[(i+shift)%n]);};
const displayQuestion=(item,index)=>{const order=[...Array(item.o.length).keys()];const shift=index%order.length;const rotated=[...order.slice(shift),...order.slice(0,shift)];return {options:rotated.map(i=>item.o[i]),correct:rotated.indexOf(item.a)};};
const formatTime=(seconds)=>{const s=Math.max(0,seconds);return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;};

function QuizBlock({items,mode,onExit}){
 const [index,setIndex]=useState(0);
 const [answers,setAnswers]=useState(()=>Array(items.length).fill(null));
 const [done,setDone]=useState(false);
 const [remaining,setRemaining]=useState(QUIZ_TIMES[mode]);
 const completedRef=useRef(false);
 const current=items[index];
 const rendered=useMemo(()=>displayQuestion(current,index),[current,index]);
 const score=useMemo(()=>items.reduce((sum,item,i)=>{const a=answers[i];if(a===null)return sum;const d=displayQuestion(item,i);return sum+(a===d.correct?1:0);},0),[items,answers]);
 useEffect(()=>{
   const id=window.setInterval(()=>setRemaining(v=>v>0?v-1:0),1000);
   return()=>window.clearInterval(id);
 },[]);
 useEffect(()=>{
   if(remaining!==0||completedRef.current)return;
   completedRef.current=true;
   setDone(true);
 },[remaining]);
 const choose=(choice)=>{if(done)return;setAnswers(prev=>{const next=[...prev];next[index]=choice;return next;});};
 const finish=()=>{completedRef.current=true;setDone(true);};
 const next=()=>{if(index<items.length-1)setIndex(v=>v+1);else finish();};
 const prev=()=>{if(index>0)setIndex(v=>v-1);};
 if(done)return <section className="sst-card" style={{marginTop:20}}>
   <div style={{display:'flex',justifyContent:'space-between',gap:12,alignItems:'center',flexWrap:'wrap'}}>
    <div><span className="sst-kicker">{MODE_LABEL[mode]}</span><h2 style={{margin:'6px 0'}}>अंतिम समीक्षा</h2><p style={{margin:0}}>कुल अंक: <strong>{score}/{items.length}</strong> • अनुत्तरित: <strong>{answers.filter(v=>v===null).length}</strong></p></div>
    <button className="sst-btn secondary" type="button" onClick={onExit}>अध्याय पर लौटें</button>
   </div>
   <div style={{display:'grid',gap:14,marginTop:18}}>
    {items.map((item,i)=>{const d=displayQuestion(item,i);const ua=answers[i];return <article key={i} style={{border:'1px solid rgba(120,120,120,.22)',borderRadius:16,padding:16}}>
      <div style={{fontWeight:800,marginBottom:8}}>प्रश्न {i+1}. {item.q}</div>
      <div style={{fontSize:14,marginBottom:6}}>आपका उत्तर: <strong>{ua===null?'अनुत्तरित':d.options[ua]}</strong></div>
      <div style={{fontSize:14,marginBottom:6}}>सही उत्तर: <strong>{d.options[d.correct]}</strong></div>
      <div style={{fontSize:14,marginBottom:8}}>अंक: <strong>{ua===d.correct?1:0}/1</strong></div>
      <div style={{fontSize:14,opacity:.9}}>व्याख्या: {item.e}</div>
    </article>;})}
   </div>
 </section>;
 return <section className="sst-card" style={{marginTop:20}}>
   <div style={{display:'flex',justifyContent:'space-between',gap:14,alignItems:'center',flexWrap:'wrap'}}>
    <div><span className="sst-kicker">{MODE_LABEL[mode]}</span><h2 style={{margin:'6px 0'}}>प्रश्न {index+1} / {items.length}</h2><p style={{margin:0}}>हर प्रश्न का उत्तर रिकॉर्ड होगा और अंत में सभी प्रश्नों की समीक्षा होगी।</p></div>
    <div style={{fontVariantNumeric:'tabular-nums',fontWeight:900,fontSize:22}} aria-label="remaining time">⏱ {formatTime(remaining)}</div>
   </div>
   <div style={{height:8,borderRadius:99,background:'rgba(120,120,120,.16)',overflow:'hidden',marginTop:16}}><div style={{height:'100%',width:`${((index+1)/items.length)*100}%`,background:'currentColor',transition:'width .2s'}} /></div>
   <article style={{marginTop:22}}>
    <h3 style={{fontSize:20,lineHeight:1.45,marginBottom:16}}>{current.q}</h3>
    <div style={{display:'grid',gap:10}}>
      {rendered.options.map((option,i)=>{const selected=answers[index]===i;return <button key={i} type="button" onClick={()=>choose(i)} aria-pressed={selected} style={{textAlign:'left',padding:'14px 16px',borderRadius:14,border:selected?'2px solid currentColor':'1px solid rgba(120,120,120,.24)',background:selected?'rgba(120,120,120,.10)':'transparent',cursor:'pointer',fontWeight:selected?800:600}}>{String.fromCharCode(65+i)}. {option}</button>;})}
    </div>
   </article>
   <div style={{display:'flex',justifyContent:'space-between',gap:10,marginTop:20,flexWrap:'wrap'}}>
    <button className="sst-btn secondary" type="button" onClick={prev} disabled={index===0}>← पिछला</button>
    <button className="sst-btn" type="button" onClick={next}>{index===items.length-1?'समीक्षा देखें':'अगला →'}</button>
   </div>
 </section>;
}

export function GeographyChapter9EngineClean({onBack}){
 const [mode,setMode]=useState('learn');
 const [quizMode,setQuizMode]=useState(null);
 const startQuiz=(m)=>{setQuizMode(m);setMode('quiz');};
 const exitQuiz=()=>{setQuizMode(null);setMode('learn');};
 const activeItems=quizMode==='practice'?GEOGRAPHY_CHAPTER_9.practice:quizMode==='challenge'?GEOGRAPHY_CHAPTER_9.challenge:GEOGRAPHY_CHAPTER_9.finalTest;
 return <main className="page">
  <header className="page-header sst-page-header">
   <button type="button" onClick={onBack}>← सामाजिक विज्ञान</button>
   <span>कक्षा 9 • बिहार बोर्ड • भूगोल • अध्याय 9</span>
   <h1>{GEOGRAPHY_CHAPTER_9.title}</h1>
   <p>{GEOGRAPHY_CHAPTER_9.subtitle}</p>
  </header>
  <section className="page-content">
   <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:16}}>
    {['learn','quiz','subjective'].map(key=><button key={key} type="button" className={`sst-btn ${mode===key?'':'secondary'}`} onClick={()=>setMode(key)}>{key==='learn'?'📘 Learn':key==='quiz'?'🧠 Practice & Tests':'✍️ Subjective'}</button>)}
   </div>
   {mode==='learn'&&<>
    <section className="sst-card">
      <span className="sst-kicker">LEARNING GOAL</span>
      <h2>{GEOGRAPHY_CHAPTER_9.goal}</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))',gap:12,marginTop:18}}>
       {GEOGRAPHY_CHAPTER_9.timeline.map(item=><div key={item.label} style={{padding:16,borderRadius:16,border:'1px solid rgba(120,120,120,.2)'}}><strong>{item.label}</strong><div style={{fontSize:18,fontWeight:800,margin:'6px 0'}}>{item.value}</div><p style={{margin:0,fontSize:14}}>{item.detail}</p></div>)}
      </div>
    </section>
    <section className="sst-card" style={{marginTop:18}}>
      <span className="sst-kicker">12 LESSONS</span>
      <div style={{display:'grid',gap:12,marginTop:14}}>
       {GEOGRAPHY_CHAPTER_9.lessons.map((lesson,i)=><article key={lesson.title} style={{padding:18,borderRadius:18,border:'1px solid rgba(120,120,120,.2)'}}><div style={{fontSize:13,fontWeight:800,opacity:.72}}>पाठ {i+1}</div><h3 style={{margin:'5px 0 8px'}}>{lesson.title}</h3><p style={{margin:'0 0 10px',lineHeight:1.65}}>{lesson.summary}</p><ul style={{margin:0,paddingLeft:20}}>{lesson.points.map(point=><li key={point} style={{marginBottom:7,lineHeight:1.55}}>{point}</li>)}</ul></article>)}
      </div>
    </section>
    <section className="sst-card" style={{marginTop:18}}>
      <span className="sst-kicker">KEY TERMS</span>
      <div style={{display:'grid',gap:9,marginTop:14}}>{GEOGRAPHY_CHAPTER_9.keyTerms.map(([term,meaning])=><div key={term} style={{display:'grid',gridTemplateColumns:'minmax(120px,180px) 1fr',gap:12,padding:'10px 0',borderBottom:'1px solid rgba(120,120,120,.15)'}}><strong>{term}</strong><span>{meaning}</span></div>)}</div>
    </section>
   </>}
   {mode==='quiz'&&<section className="sst-card">
     <span className="sst-kicker">ASSESSMENT CENTER</span>
     <h2 style={{margin:'6px 0'}}>अभ्यास से Final Test तक</h2>
     <p>चयन के बाद सही/गलत तुरंत नहीं दिखेगा। उत्तर सुरक्षित होंगे और पूरा परिणाम केवल अंतिम समीक्षा में खुलेगा। Timer पूरे test/mode के लिए है।</p>
     {!quizMode&&<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:14,marginTop:18}}>
      <div style={{padding:18,borderRadius:18,border:'1px solid rgba(120,120,120,.2)'}}><h3>Practice</h3><p>15 प्रश्न • 15 मिनट • अवधारणा जाँच</p><button className="sst-btn" type="button" onClick={()=>startQuiz('practice')}>Practice शुरू करें</button></div>
      <div style={{padding:18,borderRadius:18,border:'1px solid rgba(120,120,120,.2)'}}><h3>Challenge</h3><p>12 प्रश्न • 20 मिनट • अनुप्रयोग और तर्क</p><button className="sst-btn" type="button" onClick={()=>startQuiz('challenge')}>Challenge शुरू करें</button></div>
      <div style={{padding:18,borderRadius:18,border:'1px solid rgba(120,120,120,.2)'}}><h3>Final Test</h3><p>20 प्रश्न • 30 मिनट • पूर्ण अध्याय मूल्यांकन</p><button className="sst-btn" type="button" onClick={()=>startQuiz('test')}>Final Test शुरू करें</button></div>
     </div>}
     {quizMode&&<QuizBlock key={quizMode} items={activeItems} mode={quizMode} onExit={exitQuiz}/>} 
   </section>}
   {mode==='subjective'&&<section className="sst-card">
    <span className="sst-kicker">SUBJECTIVE PRACTICE</span>
    <h2>उत्तर लिखकर तैयारी करें</h2>
    <p>प्रश्न क्रमशः Easy, Hard और Challenger स्तर में हैं। नीचे मॉडल उत्तर अध्ययन और self-check के लिए दिए गए हैं।</p>
    {[['Easy',GEOGRAPHY_CHAPTER_9_SUBJECTIVE.easy],['Hard',GEOGRAPHY_CHAPTER_9_SUBJECTIVE.hard],['Challenger',GEOGRAPHY_CHAPTER_9_SUBJECTIVE.challenger]].map(([level,items])=><div key={level} style={{marginTop:20}}><h3>{level}</h3><div style={{display:'grid',gap:10}}>{items.map((item,i)=><details key={i} style={{border:'1px solid rgba(120,120,120,.2)',borderRadius:14,padding:'12px 14px'}}><summary style={{cursor:'pointer',fontWeight:800}}>{i+1}. {item.q}</summary><p style={{margin:'12px 0 0',lineHeight:1.7}}><strong>मॉडल उत्तर:</strong> {item.a}</p></details>)}</div></div>)}
   </section>}
  </section>
 </main>;
}
