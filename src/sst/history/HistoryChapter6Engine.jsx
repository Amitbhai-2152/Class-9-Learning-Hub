import React,{useMemo,useState} from 'react';
import {HISTORY_CHAPTER_6} from './historyChapter6Data';
import {HISTORY_SUBJECTIVE_CHAPTER_6} from './historySubjectiveChapter6Data';
import './historyChapter.css';

const MODES=[
{id:'learn',icon:'📖',title:'Learn',desc:'पाठ को क्रम से समझें।'},
{id:'practice',icon:'📝',title:'Practice',desc:'अवधारणाओं पर अभ्यास करें।'},
{id:'challenge',icon:'🔥',title:'Challenge',desc:'कारण–परिणाम और विश्लेषण।'},
{id:'test',icon:'🎯',title:'Final Test',desc:'पूरे अध्याय की परीक्षा।'},
{id:'subjective',icon:'✍️',title:'Subjective',desc:'Easy, Hard और Challenger लिखित प्रश्न।'}
];

const progressKey='sst-history-ch6-progress';
const readProgress=()=>{try{return JSON.parse(localStorage.getItem(progressKey)||'{}')||{}}catch{return {}}};
const saveProgress=value=>{try{localStorage.setItem(progressKey,JSON.stringify(value));window.dispatchEvent(new Event('sst-progress-updated'))}catch{}};
const markComplete=()=>{try{const ids=JSON.parse(localStorage.getItem('sst-completed-chapters')||'[]')||[];if(!ids.includes('history-ch-6'))localStorage.setItem('sst-completed-chapters',JSON.stringify([...ids,'history-ch-6']));window.dispatchEvent(new Event('sst-progress-updated'))}catch{}};

function Quiz({questions,onComplete,label}){
 const [index,setIndex]=useState(0);const [selected,setSelected]=useState(null);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
 const current=questions[index];
 const choose=i=>{if(selected!==null)return;setSelected(i);if(i===current[2])setScore(v=>v+1)};
 const next=()=>{if(index===questions.length-1){setDone(true);onComplete(score+(selected===current[2]?0:0),questions.length)}else{setIndex(v=>v+1);setSelected(null)}};
 if(done)return <section className="history-lesson-card"><div className="history-lesson-kicker">{label.toUpperCase()} COMPLETE</div><h2>अभ्यास पूरा हुआ</h2><p className="history-lesson-summary">आपका स्कोर: <strong>{score} / {questions.length}</strong></p><button className="history-primary" onClick={()=>{setIndex(0);setSelected(null);setScore(0);setDone(false)}}>फिर से प्रयास करें</button></section>;
 return <section className="history-lesson-card"><div className="history-lesson-kicker">QUESTION {index+1} / {questions.length}</div><h2>{current[0]}</h2><div className="history-point-grid">{current[1].map((option,i)=><button key={option} className="history-point" style={{border:'1px solid #dfe4ea',background:selected===i?(i===current[2]?'#e8f7ee':'#fff0f0'):'#fff',cursor:selected===null?'pointer':'default',textAlign:'left',width:'100%'}} onClick={()=>choose(i)}><span>{String.fromCharCode(65+i)}</span><p>{option}</p></button>)}</div>{selected!==null&&<p className="history-lesson-summary">{selected===current[2]?'✓ सही उत्तर':'✗ सही उत्तर: '+current[1][current[2]]}<br/>{current[3]}</p>}<div className="history-lesson-actions"><button className="history-primary" disabled={selected===null} onClick={next}>{index===questions.length-1?'परिणाम देखें':'अगला प्रश्न →'}</button></div></section>;
}

function Subjective(){return <section className="history-lesson-card"><div className="history-lesson-kicker">SUBJECTIVE PRACTICE</div><h2>{HISTORY_SUBJECTIVE_CHAPTER_6.title}</h2><p className="history-lesson-summary">कुल 12 प्रश्न — उत्तर अपने शब्दों में लिखें।</p>{[['🌱 आसान','easy'],['🧠 कठिन','hard'],['🏆 चैलेंजर','challenger']].map(([label,key])=><div key={key} className="history-terms-card" style={{marginTop:16}}><div className="history-section-head"><div><span>{label}</span><h3>{HISTORY_SUBJECTIVE_CHAPTER_6.questions[key].length} प्रश्न</h3></div></div>{HISTORY_SUBJECTIVE_CHAPTER_6.questions[key].map((item,i)=><article key={item.q} style={{padding:'14px 0',borderBottom:'1px solid #e7ebef'}}><strong>{String(i+1).padStart(2,'0')}.</strong> {item.q}<div style={{marginTop:6,fontSize:13,opacity:.7}}>{item.marks} अंक</div></article>)}</div>)}</section>}

export function HistoryChapter6Engine({onBack}){
 const [mode,setMode]=useState('learn');const [lesson,setLesson]=useState(0);const [completed,setCompleted]=useState(readProgress());
 const lessons=HISTORY_CHAPTER_6.lessons;
 const current=lessons[lesson];
 const completeLearn=()=>{const next={...completed,learn:true};setCompleted(next);saveProgress(next);if(next.learn&&next.practice&&next.challenge&&next.test&&next.subjective){markComplete()}};
 const completeMode=key=>{const next={...completed,[key]:true};setCompleted(next);saveProgress(next);if(['learn','practice','challenge','test','subjective'].every(k=>next[k]))markComplete()};
 const quiz=useMemo(()=>mode==='practice'?HISTORY_CHAPTER_6.practice:mode==='challenge'?HISTORY_CHAPTER_6.challenge:HISTORY_CHAPTER_6.finalTest,[mode]);
 return <main className="history-chapter-shell"><header className="history-chapter-hero"><button type="button" className="history-back" onClick={onBack}>← सामाजिक विज्ञान</button><div className="history-hero-kicker">कक्षा 9 • बिहार बोर्ड • इतिहास</div><h1>{HISTORY_CHAPTER_6.title}</h1><p>{HISTORY_CHAPTER_6.subtitle}</p><div className="history-hero-stats"><span>{lessons.length} Lessons</span><span>{HISTORY_CHAPTER_6.practice.length} Practice</span><span>{HISTORY_CHAPTER_6.challenge.length} Challenge</span><span>12 Subjective</span></div></header>
 <nav className="history-mode-tabs" aria-label="अध्याय मोड">{MODES.map(item=><button key={item.id} className={mode===item.id?'is-active':''} onClick={()=>setMode(item.id)}><span>{item.icon}</span><strong>{item.title}</strong><small>{item.desc}</small>{completed[item.id]&&<em>✓</em>}</button>)}</nav>
 <section className="history-page-content">
 {mode==='learn'&&<><div className="history-learn"><div className="history-learn-nav">{lessons.map((item,i)=><button key={item.title} className={i===lesson?'is-active':''} onClick={()=>setLesson(i)}>{String(i+1).padStart(2,'0')}<span>{item.title}</span></button>)}</div><article className="history-lesson-card"><div className="history-lesson-kicker">LESSON {lesson+1} / {lessons.length}</div><h2>{current.title}</h2><p className="history-lesson-summary">{current.summary}</p><div className="history-point-grid">{current.points.map(point=><div className="history-point" key={point}><span>✓</span><p>{point}</p></div>)}</div><div className="history-progress-bar"><span style={{width:`${((lesson+1)/lessons.length)*100}%`}}/></div><div className="history-lesson-actions"><button className="history-secondary" disabled={lesson===0} onClick={()=>setLesson(v=>Math.max(0,v-1))}>← पिछला</button>{lesson===lessons.length-1?<button className="history-primary" onClick={completeLearn}>✓ Learn पूरा करें</button>:<button className="history-primary" onClick={()=>setLesson(v=>v+1)}>अगला →</button>}</div></article></div><section className="history-timeline-card"><div className="history-section-head"><div><span>QUICK TIMELINE</span><h3>मुख्य घटनाएँ एक नज़र में</h3></div></div><div className="history-timeline">{HISTORY_CHAPTER_6.timeline.map((item,i)=><div className="history-timeline-item" key={item[0]}><div className="history-timeline-dot">{i+1}</div><div><strong>{item[0]} · {item[1]}</strong><p>{item[2]}</p></div></div>)}</div></section><section className="history-terms-card"><div className="history-section-head"><div><span>KEY TERMS</span><h3>महत्वपूर्ण शब्द</h3></div></div>{HISTORY_CHAPTER_6.keyTerms.map(([term,meaning])=><div className="history-term-row" key={term}><strong>{term}</strong><span>{meaning}</span></div>)}</section></>}
 {['practice','challenge','test'].includes(mode)&&<Quiz questions={quiz} label={MODES.find(x=>x.id===mode)?.title} onComplete={()=>completeMode(mode)}/>} 
 {mode==='subjective'&&<><Subjective/><button className="history-primary" style={{marginTop:16}} onClick={()=>completeMode('subjective')}>✓ Subjective पूरा करें</button></>}
 </section></main>;
}
