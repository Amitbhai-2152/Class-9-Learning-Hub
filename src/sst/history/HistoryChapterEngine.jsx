import React,{useEffect,useMemo,useState} from 'react';
import {HISTORY_CHAPTER_1} from './historyChapter1Data';
import {HISTORY_CHAPTER_2} from './historyChapter2Data';
import './historyChapter.css';

const STAGES=[['learn','Learn','अध्याय समझें'],['practice','Practice','मूल अभ्यास'],['challenge','Challenge','सोचकर हल करें'],['test','Final Test','अंतिम परीक्षा']];
const DATA={1:HISTORY_CHAPTER_1,2:HISTORY_CHAPTER_2};
const progressKey=(chapter)=>`sst-history-ch${chapter}-progress`;
const completedKey='sst-completed-chapters';
const readProgress=(chapter)=>{try{return JSON.parse(localStorage.getItem(progressKey(chapter))||'{}')}catch{return {}}};
const saveProgress=(chapter,data)=>localStorage.setItem(progressKey(chapter),JSON.stringify(data));

export function HistoryChapterEngine({onBack,chapterNumber=1}){
 const data=DATA[chapterNumber]||HISTORY_CHAPTER_1;
 const [stage,setStage]=useState('learn');
 const [lessonIndex,setLessonIndex]=useState(0);
 const [qIndex,setQIndex]=useState(0);
 const [score,setScore]=useState(0);
 const [answered,setAnswered]=useState(false);
 const [selected,setSelected]=useState(null);
 const [progress,setProgress]=useState(()=>readProgress(chapterNumber));
 const questions=stage==='practice'?data.practice:stage==='challenge'?data.challenge:stage==='test'?data.finalTest:[];
 const total=questions.length;
 const activeQuestion=questions[qIndex];
 const finalScore=useMemo(()=>score+(answered&&activeQuestion&&selected===activeQuestion[2]?1:0),[score,answered,activeQuestion,selected]);
 useEffect(()=>{const p=readProgress(chapterNumber);setProgress(p);},[chapterNumber]);
 const markStage=(id,value)=>{const next={...progress,[id]:value};setProgress(next);saveProgress(chapterNumber,next)};
 const markChapterComplete=()=>{const current=JSON.parse(localStorage.getItem(completedKey)||'[]');const next=[...new Set([...current,`history-ch-${chapterNumber}`])];localStorage.setItem(completedKey,JSON.stringify(next));const nextProgress={...progress,chapterCompleted:true,testScore:finalScore,testTotal:total};saveProgress(chapterNumber,nextProgress);setProgress(nextProgress);window.dispatchEvent(new Event('sst-progress-updated'));};
 const choose=(i)=>{if(!answered){setSelected(i);setAnswered(true);if(i===activeQuestion[2])setScore(s=>s+1)}};
 const nextQuestion=()=>{if(qIndex<total-1){setQIndex(i=>i+1);setAnswered(false);setSelected(null)}else{markStage(stage,{score:finalScore,total});if(stage==='test')markChapterComplete();setStage(stage==='practice'?'challenge':stage==='challenge'?'test':'learn');setQIndex(0);setScore(0);setAnswered(false);setSelected(null)}};
 const startStage=(id)=>{setStage(id);setQIndex(0);setScore(0);setAnswered(false);setSelected(null)};
 const currentLesson=data.lessons[lessonIndex];
 return <main className="history-engine page">
  <header className="page-header history-header"><button type="button" onClick={onBack}>← सामाजिक विज्ञान</button><span>इतिहास • अध्याय {data.chapterNumber}</span><h1>{data.title}</h1><p>{data.subtitle}</p>{progress.chapterCompleted&&<div className="chapter-complete-badge">✓ CHAPTER COMPLETED</div>}</header>
  <section className="page-content">
   <div className="history-stage-nav">{STAGES.map(([id,label,sub])=><button key={id} type="button" className={stage===id?'active':''} onClick={()=>startStage(id)}><strong>{label}</strong><small>{sub}</small></button>)}</div>
   {stage==='learn'&&<div className="history-learn">
    <div className="history-overview"><h2>अध्याय का सार</h2><p>{data.overview}</p></div>
    <div className="history-lesson-grid">{data.lessons.map((lesson,i)=><button key={lesson.id} type="button" className={`history-lesson-card ${i===lessonIndex?'active':''}`} onClick={()=>setLessonIndex(i)}><span>पाठ {i+1}</span><strong>{lesson.title}</strong>{progress.learned?.includes(lesson.id)&&<em>✓ पढ़ा</em>}</button>)}</div>
    <article className="history-lesson"><span>पाठ {lessonIndex+1} / {data.lessons.length}</span><h2>{currentLesson.title}</h2><p>{currentLesson.content}</p><ul>{currentLesson.points.map(point=><li key={point}>{point}</li>)}</ul><div className="history-lesson-actions"><button type="button" onClick={()=>{const learned=new Set(progress.learned||[]);learned.add(currentLesson.id);markStage('learned',[...learned]);if(lessonIndex<data.lessons.length-1)setLessonIndex(i=>i+1)}}>✓ Learn पूरा करें</button>{lessonIndex<data.lessons.length-1?<button type="button" onClick={()=>setLessonIndex(i=>i+1)}>अगला पाठ →</button>:<button type="button" onClick={()=>startStage('practice')}>Practice शुरू करें →</button>}</div></article>
    <div className="history-reference-grid"><div><h3>समयरेखा</h3>{data.timeline.map(([year,event])=><div key={year}><b>{year}</b><span>{event}</span></div>)}</div><div><h3>मुख्य शब्द</h3>{data.keyTerms.map(([term,meaning])=><div key={term}><b>{term}</b><span>{meaning}</span></div>)}</div></div>
   </div>}
   {stage!=='learn'&&activeQuestion&&<div className="history-quiz"><div className="quiz-meta"><span>{stage==='practice'?'Practice':stage==='challenge'?'Challenge':'Final Test'}</span><b>प्रश्न {qIndex+1} / {total}</b><strong>स्कोर: {finalScore}</strong></div><article className="history-question"><h2>{activeQuestion[0]}</h2><div className="history-options">{activeQuestion[1].map((option,i)=><button key={option} type="button" disabled={answered} className={answered?(i===activeQuestion[2]?'correct':i===selected?'wrong':''):''} onClick={()=>choose(i)}><span>{String.fromCharCode(65+i)}</span>{option}</button>)}</div>{answered&&<div className="history-explanation"><strong>{selected===activeQuestion[2]?'✓ सही उत्तर':'✗ सही उत्तर: '+activeQuestion[1][activeQuestion[2]]}</strong><p>{activeQuestion[3]}</p></div>}<button className="history-next" type="button" disabled={!answered} onClick={nextQuestion}>{qIndex<total-1?'अगला प्रश्न →':stage==='test'?'परीक्षा समाप्त करें':'अगला चरण →'}</button></article></div>}
  </section>
 </main>;
}
