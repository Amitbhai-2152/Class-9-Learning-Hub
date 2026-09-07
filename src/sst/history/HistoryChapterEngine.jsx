import React,{useEffect,useMemo,useState} from 'react';
import {historyChapter1} from './historyChapter1Data';
import './historyChapter.css';

const MODES=[
  {id:'learn',icon:'📖',title:'Learn',desc:'Concepts, causes, explorers और timeline समझें।'},
  {id:'practice',icon:'📝',title:'Practice',desc:'20 MCQs से recall और core facts मजबूत करें।'},
  {id:'challenge',icon:'🔥',title:'Challenge',desc:'15 application और higher-order questions।'},
  {id:'test',icon:'🎯',title:'Final Test',desc:'25 mixed exam-style questions।'}
];
function loadProgress(){try{return JSON.parse(localStorage.getItem('sst-history-ch1-progress')||'{}')||{}}catch{return {}}}
function saveProgress(value){try{localStorage.setItem('sst-history-ch1-progress',JSON.stringify(value))}catch{}}

function LearnView(){
 const [lesson,setLesson]=useState(0),[showTerms,setShowTerms]=useState(false); const current=historyChapter1.lessons[lesson];
 return <div className="history-learn">
  <div className="history-learn-nav" role="tablist" aria-label="पाठ">{historyChapter1.lessons.map((item,index)=><button key={item.title} className={index===lesson?'is-active':''} onClick={()=>setLesson(index)}>{String(index+1).padStart(2,'0')}<span>{item.title}</span></button>)}</div>
  <article className="history-lesson-card"><div className="history-lesson-kicker">LESSON {lesson+1} / {historyChapter1.lessons.length} • {current.type.toUpperCase()}</div><h2>{current.title}</h2><p className="history-lesson-summary">{current.summary}</p><div className="history-point-grid">{current.points.map(point=><div key={point} className="history-point"><span>✓</span><p>{point}</p></div>)}</div><div className="history-progress-bar"><span style={{width:`${((lesson+1)/historyChapter1.lessons.length)*100}%`}}/></div><div className="history-lesson-actions"><button className="history-secondary" disabled={lesson===0} onClick={()=>setLesson(Math.max(0,lesson-1))}>← पिछला</button><button className="history-primary" onClick={()=>setLesson(Math.min(historyChapter1.lessons.length-1,lesson+1))}>{lesson===historyChapter1.lessons.length-1?'पूरा हुआ':'अगला →'}</button></div></article>
  <section className="history-timeline-card"><div className="history-section-head"><div><span>QUICK TIMELINE</span><h3>मुख्य यात्राएँ एक नज़र में</h3></div><small>कालक्रम याद रखें</small></div><div className="history-timeline">{historyChapter1.timeline.map((item,index)=><div className="history-timeline-item" key={item.year}><div className="history-timeline-dot">{index+1}</div><div><strong>{item.year} · {item.title}</strong><p>{item.detail}</p></div></div>)}</div></section>
  <section className="history-terms-card"><button onClick={()=>setShowTerms(value=>!value)}><span>KEY TERMS</span><strong>मुख्य शब्दावली</strong><b>{showTerms?'−':'+'}</b></button>{showTerms&&<div className="history-term-grid">{historyChapter1.keyTerms.map(([term,meaning])=><div key={term}><strong>{term}</strong><p>{meaning}</p></div>)}</div>}</section>
 </div>
}
function QuizView({mode,onComplete}){
 const questions=historyChapter1[mode]; const [index,setIndex]=useState(0),[picked,setPicked]=useState(null),[score,setScore]=useState(0),[done,setDone]=useState(false); const q=questions[index];
 const choose=choice=>{if(picked!==null)return;setPicked(choice);if(choice===q[2])setScore(value=>value+1)};
 const next=()=>{if(index<questions.length-1){setIndex(value=>value+1);setPicked(null)}else{setDone(true);onComplete(mode,score,questions.length)}};
 const restart=()=>{setIndex(0);setPicked(null);setScore(0);setDone(false)};
 if(done){return <div className="history-result-card"><div className="history-result-ring">{score}<small>/{questions.length}</small></div><span className="history-result-label">{mode==='practice'?'PRACTICE COMPLETE':mode==='challenge'?'CHALLENGE COMPLETE':'FINAL TEST COMPLETE'}</span><h2>{score/questions.length>=.8?'बहुत बढ़िया!':score/questions.length>=.6?'अच्छी तैयारी!':'एक बार फिर दोहराएँ।'}</h2><p>आपका स्कोर {score} / {questions.length} है। गलत प्रश्नों की explanation पढ़कर दोबारा प्रयास करें।</p><button className="history-primary" onClick={restart}>फिर से प्रयास करें</button></div>}
 const answered=picked!==null;
 return <div className="history-quiz-card"><div className="history-quiz-top"><span>{mode==='practice'?'PRACTICE':mode==='challenge'?'CHALLENGE':'FINAL TEST'}</span><strong>{index+1} / {questions.length}</strong></div><div className="history-quiz-track"><span style={{width:`${((index+1)/questions.length)*100}%`}}/></div><h2>{q[0]}</h2><div className="history-options">{q[1].map((option,choice)=><button key={option} className={answered?(choice===q[2]?'correct':choice===picked?'wrong':''):(choice===picked?'selected':'')} disabled={answered} onClick={()=>choose(choice)}><span>{String.fromCharCode(65+choice)}</span>{option}</button>)}</div>{answered&&<div className={`history-explain ${picked===q[2]?'ok':'no'}`}><strong>{picked===q[2]?'✓ सही उत्तर':'✕ ध्यान दें'}</strong><p>{q[3]}</p></div>}<div className="history-quiz-footer"><small>{answered?'उत्तर lock हो गया है':'एक विकल्प चुनें'}</small><button className="history-primary" disabled={!answered} onClick={next}>{index===questions.length-1?'परिणाम देखें':'अगला प्रश्न →'}</button></div></div>
}
export function HistoryChapterEngine({onBack}){
 const [mode,setMode]=useState(null),[progress,setProgress]=useState(loadProgress); useEffect(()=>saveProgress(progress),[progress]); const completion=useMemo(()=>Object.keys(progress).length,[progress]);
 const complete=(id,score,total)=>setProgress(value=>({...value,[id]:{score,total,completedAt:new Date().toISOString()}}));
 return <main className="history-chapter"><header className="history-chapter-header"><button type="button" className="history-back" onClick={onBack}>← सामाजिक विज्ञान</button><div className="history-header-copy"><span>इतिहास • अध्याय 1 • बिहार बोर्ड</span><h1>{historyChapter1.title}</h1><p>{historyChapter1.subtitle}</p></div><div className="history-stat-card"><strong>{completion}/3</strong><span>stages complete</span></div></header><section className="history-content"><div className="history-chapter-intro"><div><span>अध्याय का लक्ष्य</span><p>{historyChapter1.goal}</p></div><div className="history-chip-row"><span>8 lessons</span><span>20 practice</span><span>15 challenge</span><span>25 test</span></div></div>{!mode?<div className="history-mode-grid">{MODES.map(item=><button key={item.id} className={`history-mode-card ${progress[item.id]?'completed':''}`} onClick={()=>setMode(item.id)}><span className="history-mode-icon">{item.icon}</span><strong>{item.title}</strong><p>{item.desc}</p><em>{progress[item.id]?`✓ ${progress[item.id].score}/${progress[item.id].total}`:'शुरू करें →'}</em></button>)}</div>:<div className="history-workspace"><button className="history-mode-back" onClick={()=>setMode(null)}>← stages पर वापस</button>{mode==='learn'?<LearnView/>:<QuizView mode={mode} onComplete={complete}/>}</div>}</section></main>
}
