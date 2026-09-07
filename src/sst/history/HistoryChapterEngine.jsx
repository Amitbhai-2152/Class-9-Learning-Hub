import React,{useEffect,useMemo,useRef,useState} from 'react';
import {historyChapter1} from './historyChapter1Data';
import {HISTORY_CHAPTER_2} from './historyChapter2Data';
import './historyChapter.css';

const DATA={1:historyChapter1,2:HISTORY_CHAPTER_2};
const MODES=[
 {id:'learn',icon:'📖',title:'Learn',desc:'पाठ को क्रम से समझें और मुख्य बिंदु दोहराएँ.'},
 {id:'practice',icon:'📝',title:'Practice',desc:'अध्याय की मूल अवधारणाओं पर अभ्यास करें.'},
 {id:'challenge',icon:'🔥',title:'Challenge',desc:'कारण–परिणाम और समझ आधारित प्रश्न.'},
 {id:'test',icon:'🎯',title:'Final Test',desc:'पूरे अध्याय की अंतिम परीक्षा.'}
];
const key=(n)=>`sst-history-ch${n}-progress`;
const read=(n)=>{try{return JSON.parse(localStorage.getItem(key(n))||'{}')||{}}catch{return {}}};
const save=(n,v)=>{try{localStorage.setItem(key(n),JSON.stringify(v));window.dispatchEvent(new Event('sst-progress-updated'))}catch{}};
const markComplete=(n)=>{try{const ids=JSON.parse(localStorage.getItem('sst-completed-chapters')||'[]')||[];if(!ids.includes(`history-ch-${n}`))localStorage.setItem('sst-completed-chapters',JSON.stringify([...ids,`history-ch-${n}`]));window.dispatchEvent(new Event('sst-progress-updated'))}catch{}};
const secondsPerQuestion=(mode)=>mode==='practice'?40:60;
const formatTime=(s)=>`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

function LearnView({data,onComplete}){
 const [lesson,setLesson]=useState(0),[showTerms,setShowTerms]=useState(false);const current=data.lessons[lesson];
 return <div className="history-learn">
  <div className="history-learn-nav" role="tablist" aria-label="अध्याय के पाठ">{data.lessons.map((item,index)=><button key={item.id||item.title} className={index===lesson?'is-active':''} onClick={()=>setLesson(index)}>{String(index+1).padStart(2,'0')}<span>{item.title}</span></button>)}</div>
  <article className="history-lesson-card"><div className="history-lesson-kicker">LESSON {lesson+1} / {data.lessons.length}</div><h2>{current.title}</h2><p className="history-lesson-summary">{current.summary||current.content}</p><div className="history-point-grid">{(current.points||[]).map(point=><div key={point} className="history-point"><span>✓</span><p>{point}</p></div>)}</div><div className="history-progress-bar"><span style={{width:`${((lesson+1)/data.lessons.length)*100}%`}}/></div><div className="history-lesson-actions"><button className="history-secondary" disabled={lesson===0} onClick={()=>setLesson(Math.max(0,lesson-1))}>← पिछला</button>{lesson===data.lessons.length-1?<button className="history-primary" onClick={()=>onComplete('learn',data.lessons.length,data.lessons.length)}>✓ Learn पूरा करें</button>:<button className="history-primary" onClick={()=>setLesson(lesson+1)}>अगला →</button>}</div></article>
  {data.timeline&&<section className="history-timeline-card"><div className="history-section-head"><div><span>QUICK TIMELINE</span><h3>मुख्य घटनाएँ एक नज़र में</h3></div><small>कालक्रम याद रखें</small></div><div className="history-timeline">{data.timeline.map((item,index)=><div className="history-timeline-item" key={item[0]||item.year}><div className="history-timeline-dot">{index+1}</div><div><strong>{Array.isArray(item)?`${item[0]} · ${item[1]}`:`${item.year} · ${item.title}`}</strong>{!Array.isArray(item)&&item.detail&&<p>{item.detail}</p>}</div></div>)}</div></section>}
  {data.keyTerms&&<section className="history-terms-card"><button onClick={()=>setShowTerms(v=>!v)}><span>KEY TERMS</span><strong>मुख्य शब्दावली</strong><b>{showTerms?'−':'+'}</b></button>{showTerms&&<div className="history-term-grid">{data.keyTerms.map(([term,meaning])=><div key={term}><strong>{term}</strong><p>{meaning}</p></div>)}</div>}</section>}
 </div>;
}

function QuizView({data,mode,onComplete}){
 const questions=mode==='test'?(data.finalTest||[]):(data[mode]||[]);
 const totalSeconds=questions.length*secondsPerQuestion(mode);
 const [index,setIndex]=useState(0),[picked,setPicked]=useState(null),[score,setScore]=useState(0),[done,setDone]=useState(false),[timeLeft,setTimeLeft]=useState(totalSeconds);
 const scoreRef=useRef(0),pickedRef=useRef(null),doneRef=useRef(false),indexRef=useRef(0),completeRef=useRef(onComplete);
 useEffect(()=>{scoreRef.current=score},[score]);
 useEffect(()=>{pickedRef.current=picked},[picked]);
 useEffect(()=>{doneRef.current=done},[done]);
 useEffect(()=>{indexRef.current=index},[index]);
 useEffect(()=>{completeRef.current=onComplete},[onComplete]);
 useEffect(()=>{setIndex(0);setPicked(null);setScore(0);setDone(false);setTimeLeft(totalSeconds);scoreRef.current=0;pickedRef.current=null;doneRef.current=false;indexRef.current=0},[mode,totalSeconds]);
 const finish=()=>{if(doneRef.current)return;const currentQ=questions[indexRef.current];const finalScore=scoreRef.current+(pickedRef.current!==null&&pickedRef.current===currentQ?.[2]?1:0);doneRef.current=true;setScore(finalScore);setDone(true);setTimeLeft(0);completeRef.current(mode,finalScore,questions.length)};
 useEffect(()=>{if(done||!questions.length)return;const timer=setInterval(()=>setTimeLeft(v=>{if(v<=1){clearInterval(timer);finish();return 0}return v-1}),1000);return()=>clearInterval(timer)},[done,index,questions.length,mode]);
 if(!questions.length)return <div className="history-result-card"><h2>इस चरण का प्रश्न बैंक उपलब्ध नहीं है।</h2><p>इस अध्याय के लिए प्रश्न उपलब्ध नहीं हैं।</p></div>;
 if(done)return <div className="history-result-card"><div className="history-result-ring">{score}<small>/{questions.length}</small></div><span className="history-result-label">{mode==='practice'?'PRACTICE COMPLETE':mode==='challenge'?'CHALLENGE COMPLETE':'FINAL TEST COMPLETE'}</span><h2>{score/questions.length>=.8?'बहुत बढ़िया!':score/questions.length>=.6?'अच्छी तैयारी!':'एक बार फिर दोहराएँ।'}</h2><p>आपका स्कोर {score} / {questions.length} है। समय समाप्त होने पर बिना उत्तर दिए प्रश्नों को गलत माना जाता है।</p>{mode==='test'&&<div className="history-chapter-finish">✓ अध्याय पूरा हुआ — अब यह chapter completed के रूप में सेव है।</div>}<button className="history-primary" onClick={()=>{setIndex(0);setPicked(null);setScore(0);setDone(false);setTimeLeft(totalSeconds);scoreRef.current=0;pickedRef.current=null;doneRef.current=false;indexRef.current=0}}>फिर से प्रयास करें</button></div>;
 const q=questions[index];const answered=picked!==null;const timerClass=timeLeft<=Math.max(10,Math.floor(totalSeconds*.25))?'danger':timeLeft<=Math.floor(totalSeconds*.5)?'warning':'';
 const choose=(choice)=>{if(picked!==null||done)return;setPicked(choice)};
 const next=()=>{if(picked===null)return;const nextScore=score+(picked===q[2]?1:0);if(index<questions.length-1){setScore(nextScore);setIndex(v=>v+1);setPicked(null)}else{scoreRef.current=nextScore;doneRef.current=true;setScore(nextScore);setDone(true);setTimeLeft(0);completeRef.current(mode,nextScore,questions.length)}};
 return <div className="history-quiz-card"><div className="history-quiz-top"><span>{mode==='practice'?'PRACTICE':mode==='challenge'?'CHALLENGE':'FINAL TEST'}</span><div className="history-quiz-meta"><strong>{index+1} / {questions.length}</strong><span className={`history-timer ${timerClass}`} aria-live="polite">⏱ {formatTime(timeLeft)}</span></div></div><div className="history-quiz-track"><span style={{width:`${((index+1)/questions.length)*100}%`}}/></div><p className="history-timer-note">हर प्रश्न के लिए {secondsPerQuestion(mode)} सेकंड • कुल समय {formatTime(totalSeconds)}</p><h2>{q[0]}</h2><div className="history-options">{q[1].map((option,choice)=><button key={option} className={answered?(choice===q[2]?'correct':choice===picked?'wrong':''):''} disabled={answered} onClick={()=>choose(choice)}><span>{String.fromCharCode(65+choice)}</span>{option}</button>)}</div>{answered&&<div className={`history-explain ${picked===q[2]?'ok':'no'}`}><strong>{picked===q[2]?'✓ सही उत्तर':'✕ ध्यान दें'}</strong><p>{q[3]}</p></div>}<div className="history-quiz-footer"><small>{answered?'उत्तर lock हो गया है':'एक विकल्प चुनें'}</small><button className="history-primary" disabled={!answered} onClick={next}>{index===questions.length-1?'परिणाम देखें':'अगला प्रश्न →'}</button></div></div>;
}

export function HistoryChapterEngine({onBack,chapterNumber=1}){
 const data=DATA[chapterNumber]||historyChapter1;const [mode,setMode]=useState(null);const [progress,setProgress]=useState(()=>read(chapterNumber));
 useEffect(()=>setProgress(read(chapterNumber)),[chapterNumber]);
 const completion=useMemo(()=>['learn','practice','challenge','test'].filter(id=>progress[id]).length,[progress]);
 const complete=(id,score,total)=>{const next={...progress,[id]:{score,total,completedAt:new Date().toISOString()}};if(id==='test'){next.chapterCompleted={completedAt:new Date().toISOString(),score,total};markComplete(chapterNumber)}setProgress(next);save(chapterNumber,next)};
 const canOpen=()=>true;
 return <main className="history-chapter"><header className="history-chapter-header"><button type="button" className="history-back" onClick={onBack}>← सामाजिक विज्ञान</button><div className="history-header-copy"><span>इतिहास • अध्याय {chapterNumber} • बिहार बोर्ड</span><h1>{data.title}</h1><p>{data.subtitle}</p>{progress.chapterCompleted&&<div className="history-complete-badge">✓ CHAPTER COMPLETED</div>}</div><div className="history-stat-card"><strong>{completion}/4</strong><span>stages complete</span></div></header><section className="history-content"><div className="history-chapter-intro"><div><span>अध्याय का लक्ष्य</span><p>{data.goal||data.overview}</p></div><div className="history-chip-row"><span>{data.lessons?.length||0} lessons</span><span>{data.practice?.length||0} practice</span><span>{data.challenge?.length||0} challenge</span><span>{data.finalTest?.length||0} test</span></div></div>{!mode?<div className="history-mode-grid">{MODES.map(item=>{const locked=!canOpen(item.id);return <button key={item.id} disabled={locked} className={`history-mode-card ${progress[item.id]?'completed':''} ${locked?'locked':''}`} onClick={()=>setMode(item.id)}><span className="history-mode-icon">{item.icon}</span><strong>{item.title}</strong><p>{item.desc}</p><em>{progress[item.id]?`✓ ${progress[item.id].score}/${progress[item.id].total}`:'शुरू करें →'}</em></button>})}</div>:<div className="history-workspace"><button className="history-mode-back" onClick={()=>setMode(null)}>← stages पर वापस</button>{mode==='learn'?<LearnView data={data} onComplete={complete}/>:<QuizView data={data} mode={mode} onComplete={complete}/>}</div>}</section></main>;
}
