import React,{useEffect,useRef,useState} from 'react';
import {HISTORY_CHAPTER_8} from './historyChapter8Data';
import {HISTORY_SUBJECTIVE_CHAPTER_8} from './historyChapter8SubjectiveData';
import {HistoryReviewQuiz} from './HistoryReviewQuiz';
import './historyChapter.css';

const progressKey='sst-history-ch8-progress';
const completedKey='sst-completed-chapters';
const readProgress=()=>{try{return JSON.parse(localStorage.getItem(progressKey)||'{}')||{}}catch{return {}}};
const saveProgress=value=>{try{localStorage.setItem(progressKey,JSON.stringify(value));window.dispatchEvent(new Event('sst-progress-updated'))}catch{}};
const markComplete=()=>{try{const ids=JSON.parse(localStorage.getItem(completedKey)||'[]')||[];if(!ids.includes('history-ch-8'))localStorage.setItem(completedKey,JSON.stringify([...ids,'history-ch-8']));window.dispatchEvent(new Event('sst-progress-updated'))}catch{}};
const formatTime=s=>`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
const timePerQuestion=mode=>mode==='practice'?40:60;
const MODES=[
 {id:'learn',icon:'📖',title:'Learn',desc:'अध्याय को क्रम से पढ़ें और मुख्य अवधारणाएँ समझें।'},
 {id:'practice',icon:'📝',title:'Practice',desc:'मूल अवधारणाओं पर बोर्ड-उपयोगी प्रश्न।'},
 {id:'challenge',icon:'🔥',title:'Challenge',desc:'कारण–परिणाम और अनुप्रयोग आधारित कठिन प्रश्न।'},
 {id:'test',icon:'🎯',title:'Final Test',desc:'पूरे अध्याय की समयबद्ध अंतिम परीक्षा।'},
 {id:'subjective',icon:'✍️',title:'Subjective',desc:'लघु, दीर्घ और विश्लेषणात्मक लिखित अभ्यास।'}
];

function LearnView({onComplete}){
 const data=HISTORY_CHAPTER_8;
 const [lesson,setLesson]=useState(0);
 const [terms,setTerms]=useState(false);
 const current=data.lessons[lesson];
 return <div className="history-learn">
  <div className="history-learn-nav" role="tablist" aria-label="अध्याय पाठ">
   {data.lessons.map((item,i)=><button type="button" key={item.title} className={i===lesson?'is-active':''} onClick={()=>setLesson(i)}>{String(i+1).padStart(2,'0')}<span>{item.title}</span></button>)}
  </div>
  <article className="history-lesson-card">
   <div className="history-lesson-kicker">LESSON {lesson+1} / {data.lessons.length}</div>
   <h2>{current.title}</h2>
   <p className="history-lesson-summary">{current.summary}</p>
   <div className="history-point-grid">{current.points.map(point=><div className="history-point" key={point}><span>✓</span><p>{point}</p></div>)}</div>
   <div className="history-progress-bar"><span style={{width:`${((lesson+1)/data.lessons.length)*100}%`}}/></div>
   <div className="history-lesson-actions">
    <button type="button" className="history-secondary" disabled={lesson===0} onClick={()=>setLesson(v=>Math.max(0,v-1))}>← पिछला</button>
    {lesson===data.lessons.length-1?<button type="button" className="history-primary" onClick={()=>onComplete('learn',data.lessons.length,data.lessons.length)}>✓ Learn पूरा करें</button>:<button type="button" className="history-primary" onClick={()=>setLesson(v=>v+1)}>अगला →</button>}
   </div>
  </article>
  <section className="history-timeline-card">
   <div className="history-section-head"><div><span>QUICK TIMELINE</span><h3>कृषि-इतिहास की समयरेखा</h3></div><small>मुख्य पड़ाव</small></div>
   <div className="history-timeline">{data.timeline.map((item,i)=><div className="history-timeline-item" key={`${item[0]}-${i}`}><div className="history-timeline-dot">{i+1}</div><div><strong>{item[0]} · {item[1]}</strong><p>{item[2]}</p></div></div>)}</div>
  </section>
  <section className="history-terms-card">
   <button type="button" onClick={()=>setTerms(v=>!v)}><span>KEY TERMS</span><strong>मुख्य शब्दावली</strong><b>{terms?'−':'+'}</b></button>
   {terms&&<div className="history-term-grid">{data.keyTerms.map(([term,meaning])=><div key={term}><strong>{term}</strong><p>{meaning}</p></div>)}</div>}
  </section>
 </div>;
}

function QuizView({mode,onComplete}){
 const data=HISTORY_CHAPTER_8;
 const questions=mode==='test'?data.finalTest:data[mode]||[];
 const [index,setIndex]=useState(0);
 const [picked,setPicked]=useState(null);
 const [score,setScore]=useState(0);
 const [done,setDone]=useState(false);
 const [timeLeft,setTimeLeft]=useState(()=>questions.length*timePerQuestion(mode));
 const scoreRef=useRef(0);
 const pickedRef=useRef(null);
 const doneRef=useRef(false);
 useEffect(()=>{scoreRef.current=score},[score]);
 useEffect(()=>{pickedRef.current=picked},[picked]);
 useEffect(()=>{doneRef.current=done},[done]);
 useEffect(()=>{setIndex(0);setPicked(null);setScore(0);setDone(false);doneRef.current=false;setTimeLeft(questions.length*timePerQuestion(mode))},[mode,questions.length]);
 const finish=()=>{
  if(doneRef.current)return;
  const current=questions[index];
  const finalScore=scoreRef.current+(pickedRef.current===current?.[2]?1:0);
  doneRef.current=true;setScore(finalScore);setDone(true);setTimeLeft(0);onComplete(mode,finalScore,questions.length);
 };
 useEffect(()=>{
  if(done||!questions.length)return;
  const timer=setInterval(()=>setTimeLeft(value=>{if(value<=1){clearInterval(timer);finish();return 0}return value-1}),1000);
  return()=>clearInterval(timer);
 },[done,index,questions.length,mode]);
 const q=questions[index];
 if(!q)return <div className="history-result-card"><h2>इस चरण का प्रश्न बैंक उपलब्ध नहीं है।</h2></div>;
 if(done)return <div className="history-result-card">
  <div className="history-result-ring">{score}<small>/{questions.length}</small></div>
  <span className="history-result-label">{mode==='practice'?'PRACTICE COMPLETE':'CHALLENGE COMPLETE'}</span>
  <h2>{score/questions.length>=.8?'बहुत बढ़िया!':score/questions.length>=.6?'अच्छी तैयारी!':'एक बार फिर दोहराएँ।'}</h2>
  <p>आपका स्कोर {score} / {questions.length} है।</p>
  {mode==='test'&&<div className="history-chapter-finish">✓ अध्याय पूरा हुआ — यह chapter completed के रूप में सेव है।</div>}
  <button type="button" className="history-primary" onClick={()=>{setIndex(0);setPicked(null);setScore(0);setDone(false);doneRef.current=false;setTimeLeft(questions.length*timePerQuestion(mode))}}>फिर से प्रयास करें</button>
 </div>;
 const answered=picked!==null;
 const totalSeconds=questions.length*timePerQuestion(mode);
 const timerClass=timeLeft<=Math.max(10,Math.floor(totalSeconds*.25))?'danger':timeLeft<=Math.floor(totalSeconds*.5)?'warning':'';
 return <div className="history-quiz-card">
  <div className="history-quiz-top"><span>{mode==='practice'?'PRACTICE':'CHALLENGE'}</span><div className="history-quiz-meta"><strong>{index+1} / {questions.length}</strong><span className={`history-timer ${timerClass}`}>⏱ {formatTime(timeLeft)}</span></div></div>
  <div className="history-quiz-track"><span style={{width:`${((index+1)/questions.length)*100}%`}}/></div>
  <p className="history-timer-note">हर प्रश्न के लिए {timePerQuestion(mode)} सेकंड • कुल समय {formatTime(totalSeconds)}</p>
  <h2>{q[0]}</h2>
  <div className="history-options">{q[1].map((option,choice)=><button type="button" key={option} className={answered?(choice===q[2]?'correct':choice===picked?'wrong':''):''} disabled={answered} onClick={()=>setPicked(choice)}><span>{String.fromCharCode(65+choice)}</span>{option}</button>)}</div>
  {answered&&<div className={`history-explain ${picked===q[2]?'ok':'no'}`}><strong>{picked===q[2]?'✓ सही उत्तर':'✕ ध्यान दें'}</strong><p>{q[3]}</p></div>}
  <div className="history-quiz-footer"><small>{answered?'उत्तर lock हो गया है':'एक विकल्प चुनें'}</small><button type="button" className="history-primary" disabled={!answered} onClick={()=>{const nextScore=score+(picked===q[2]?1:0);if(index<questions.length-1){setScore(nextScore);setIndex(v=>v+1);setPicked(null)}else{setScore(nextScore);doneRef.current=true;setDone(true);onComplete(mode,nextScore,questions.length)}}}>{index===questions.length-1?'परिणाम देखें':'अगला प्रश्न →'}</button></div>
 </div>;
}

function SubjectiveView(){
 const data=HISTORY_SUBJECTIVE_CHAPTER_8;
 const levels=[['easy','🌱 आसान','मूल अवधारणा और सीधे उत्तर'],['hard','🧠 कठिन','व्याख्या, कारण और संरचना'],['challenger','🏆 चैलेंजर','तर्क, मूल्यांकन और अनुप्रयोग']];
 return <section className="sst-subjective-card" aria-labelledby="chapter8-subjective-title">
  <div className="sst-subjective-head"><div><span className="sst-subjective-kicker">✍ SUBJECTIVE PRACTICE</span><h2 id="chapter8-subjective-title">विषयपरक प्रश्न</h2><p>{data.title} • 12 प्रश्न • उत्तर अपने शब्दों में लिखें</p></div></div>
  <div className="sst-subjective-levels">{levels.map(([key,label,desc])=><div className={`sst-subjective-level level-${key}`} key={key}>
   <div className="sst-subjective-level-head"><div><span>{label}</span><strong>{key==='easy'?'आसान':key==='hard'?'कठिन':'चैलेंजर'}</strong></div><small>{data.questions[key].length} प्रश्न</small></div>
   <p className="sst-subjective-desc">{desc}</p>
   <div className="sst-subjective-list">{data.questions[key].map((item,i)=><article className="sst-subjective-item" key={`${key}-${i}`}><div className="sst-subjective-number">{String(i+1).padStart(2,'0')}</div><div className="sst-subjective-question"><p>{item.q}</p><span>{item.marks} अंक</span></div></article>)}</div>
  </div>)}</div>
 </section>;
}

export function HistoryChapter8Engine({onBack}){
 const data=HISTORY_CHAPTER_8;
 const [mode,setMode]=useState(null);
 const [progress,setProgress]=useState(readProgress);
 useEffect(()=>setProgress(readProgress()),[]);
 const completedStages=['learn','practice','challenge','test'].filter(id=>progress[id]).length;
 const complete=(id,score,total)=>{
  const next={...progress,[id]:{score,total,completedAt:new Date().toISOString()}};
  if(id==='test'){next.chapterCompleted={completedAt:new Date().toISOString(),score,total};markComplete();}
  setProgress(next);saveProgress(next);
 };
 return <main className="history-chapter">
  <header className="history-chapter-header">
   <button type="button" className="history-back" onClick={onBack}>← सामाजिक विज्ञान</button>
   <div className="history-header-copy"><span>इतिहास • अध्याय 8 • बिहार बोर्ड</span><h1>{data.title}</h1><p>{data.subtitle}</p>{progress.chapterCompleted&&<div className="history-complete-badge">✓ CHAPTER COMPLETED</div>}</div>
   <div className="history-stat-card"><strong>{completedStages}/4</strong><span>stages complete</span></div>
  </header>
  <section className="history-content">
   <div className="history-chapter-intro"><div><span>अध्याय का लक्ष्य</span><p>{data.goal}</p></div><div className="history-chip-row"><span>{data.lessons.length} lessons</span><span>{data.practice.length} practice</span><span>{data.challenge.length} challenge</span><span>{data.finalTest.length} test</span><span>12 subjective</span></div></div>
   {!mode?<div className="history-mode-grid">{MODES.map(item=><button type="button" key={item.id} className={`history-mode-card ${item.id!=='subjective'&&progress[item.id]?'completed':''}`} onClick={()=>setMode(item.id)}><span className="history-mode-icon">{item.icon}</span><strong>{item.title}</strong><p>{item.desc}</p><em>{item.id!=='subjective'&&progress[item.id]?`✓ ${progress[item.id].score}/${progress[item.id].total}`:'शुरू करें →'}</em></button>)}</div>:<div className="history-workspace"><button type="button" className="history-mode-back" onClick={()=>setMode(null)}>← stages पर वापस</button>{mode==='learn'?<LearnView onComplete={complete}/>:mode==='subjective'?<SubjectiveView/>:<HistoryReviewQuiz data={data} mode={mode} onComplete={complete}/>}</div>}
  </section>
 </main>;
}
