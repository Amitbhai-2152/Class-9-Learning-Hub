import React,{useEffect,useMemo,useRef,useState} from 'react';
import {getEconomicsChapter} from './economicsData.js';
import {normalizeEconomicsChapter} from './economicsContentQuality.js';
import './economicsChapter.css';

const TIMES={practice:15*60,challenge:20*60,test:30*60};
const MODES=[
 ['learn','📘','Learn','अध्याय को 15 क्रमबद्ध lessons में समझें।'],
 ['practice','📝','Practice','15 concept-check MCQs से अभ्यास करें।'],
 ['challenge','🔥','Challenge','12 application और situation-based MCQs।'],
 ['test','🎯','Final Test','20 प्रश्नों की समयबद्ध अंतिम परीक्षा।'],
 ['subjective','✍️','Subjective','15 लिखित प्रश्न: 5 आसान, 5 कठिन, 5 चैलेंजर।']
];
const LEVELS=[
 ['easy','🌱 आसान','मूल अवधारणाएँ'],
 ['hard','🧠 कठिन','कारण, अंतर और प्रभाव'],
 ['challenger','🏆 चैलेंजर','समेकित विश्लेषण और स्थिति-आधारित उत्तर']
];
const fmt=s=>`${String(Math.floor(Math.max(0,s)/60)).padStart(2,'0')}:${String(Math.max(0,s)%60).padStart(2,'0')}`;
const progressKey=n=>`sst-economics-ch${n}-progress`,completedKey='sst-completed-chapters';
const read=(n)=>{try{return JSON.parse(localStorage.getItem(progressKey(n))||'{}')||{}}catch{return {}}};
const save=(n,v)=>{try{localStorage.setItem(progressKey(n),JSON.stringify(v));window.dispatchEvent(new Event('sst-progress-updated'))}catch{}};
const markComplete=n=>{try{const ids=JSON.parse(localStorage.getItem(completedKey)||'[]')||[],id=`economics-ch-${n}`;if(!ids.includes(id))localStorage.setItem(completedKey,JSON.stringify([...ids,id]));window.dispatchEvent(new Event('sst-progress-updated'))}catch{}};
const rotate=(item,index)=>{const n=item.options.length||4,desired=index%n,orig=Number.isInteger(item.answer)?item.answer:0,shift=((orig-desired)%n+n)%n;return {q:item.q,o:item.options.map((_,j)=>item.options[(j+shift)%n]),a:desired,e:item.explanation||''}};

function Learn({data,finish}){
 const [i,setI]=useState(0),[terms,setTerms]=useState(false),c=data.lessons[i];
 return <div className="eco-learn">
  <div className="eco-lesson-nav">{data.lessons.map((x,n)=><button type="button" key={`${n}-${x.title}`} className={n===i?'is-active':''} onClick={()=>setI(n)}>{String(n+1).padStart(2,'0')}<span>{x.title}</span></button>)}</div>
  <article className="eco-lesson-card"><div className="eco-kicker">LESSON {i+1} / {data.lessons.length}</div><h2>{c.title}</h2><p className="eco-summary">{c.summary}</p><div className="eco-point-grid">{c.points.map((p,n)=><div className="eco-point" key={`${n}-${p}`}><span>✓</span><p>{p}</p></div>)}</div><div className="eco-progress"><span style={{width:`${((i+1)/data.lessons.length)*100}%`}}/></div><div className="eco-actions"><button type="button" className="eco-secondary" disabled={!i} onClick={()=>setI(v=>v-1)}>← पिछला</button>{i===data.lessons.length-1?<button type="button" className="eco-primary" onClick={()=>finish('learn',data.lessons.length,data.lessons.length)}>✓ Learn पूरा करें</button>:<button type="button" className="eco-primary" onClick={()=>setI(v=>v+1)}>अगला →</button>}</div></article>
  <section className="eco-roadmap-card"><div className="eco-section-head"><div><span>ECONOMICS ROADMAP</span><h3>अध्याय की मुख्य कड़ियाँ</h3></div><small>15 core lessons</small></div><div className="eco-roadmap">{data.topics.slice(0,8).map((x,n)=><div className="eco-roadmap-item" key={`${n}-${x.title}`}><div className="eco-dot">{n+1}</div><div><strong>{x.title}</strong><p>{x.summary}</p></div></div>)}</div></section>
  <section className="eco-terms-card"><button type="button" onClick={()=>setTerms(v=>!v)}><span>KEY TERMS</span><strong>मुख्य शब्दावली</strong><b>{terms?'−':'+'}</b></button>{terms&&<div className="eco-term-grid">{data.topics.slice(0,10).map((x,n)=><div key={`${n}-${x.title}`}><strong>{x.title.replace(/^\d+\.\s*/,'')}</strong><p>{x.points[0]}</p></div>)}</div>}</section>
 </div>
}

function Quiz({data,mode,finish,onBack}){
 const bank=mode==='test'?data.finalTest:data[mode]||[],duration=TIMES[mode];
 const [i,setI]=useState(0),[answers,setAnswers]=useState([]),[done,setDone]=useState(false),[expired,setExpired]=useState(false),[left,setLeft]=useState(duration);
 const saved=useRef(false);
 useEffect(()=>{setI(0);setAnswers([]);setDone(false);setExpired(false);setLeft(duration);saved.current=false},[mode,duration]);
 useEffect(()=>{if(done||expired||!bank.length)return;if(left<=0){setExpired(true);return}const id=setTimeout(()=>setLeft(v=>v-1),1000);return()=>clearTimeout(id)},[left,done,expired,bank.length]);
 const review=useMemo(()=>bank.map((item,n)=>{const x=rotate(item,n),s=answers[n];return {n,q:x.q,your:s==null?null:x.o[s],correct:x.o[x.a],marks:s===x.a?1:0,e:x.e}}),[bank,answers]);
 const score=review.reduce((a,x)=>a+x.marks,0);
 const store=()=>{if(saved.current)return;saved.current=true;finish(mode,score,bank.length)};
 useEffect(()=>{if(expired&&!done){setDone(true);store()}},[expired,done]);
 if(!bank.length)return <div className="eco-result-card"><h2>इस चरण का प्रश्न बैंक उपलब्ध नहीं है।</h2></div>;
 if(done)return <div className="eco-review-card"><div className="eco-review-summary"><div className="eco-result-ring">{score}<small>/{bank.length}</small></div><div><span className="eco-result-label">{mode==='practice'?'PRACTICE REVIEW':mode==='challenge'?'CHALLENGE REVIEW':'FINAL TEST REVIEW'}</span><h2>{expired?'⏰ समय समाप्त — परीक्षा समाप्त':'परीक्षा पूर्ण'}</h2><p>कुल अंक: <strong>{score} / {bank.length}</strong> • सही: <strong>{score}</strong> • गलत/अनुत्तरित: <strong>{bank.length-score}</strong></p></div></div><div className="eco-review-list">{review.map(r=><article className={'eco-review-item '+(r.your===null?'unanswered':r.marks?'right':'wrong')} key={r.n}><div className="eco-review-item-top"><strong>प्रश्न {r.n+1}</strong><span>{r.marks}/1 अंक</span></div><h3>{r.q}</h3><p><b>आपका उत्तर:</b> {r.your??'अनुत्तरित'}</p><p><b>सही उत्तर:</b> {r.correct}</p><p className="eco-review-explain">व्याख्या: {r.e}</p></article>)}</div><div className="eco-review-actions"><button type="button" className="eco-primary" onClick={()=>{setI(0);setAnswers([]);setDone(false);setExpired(false);setLeft(duration);saved.current=false}}>फिर से प्रयास करें</button><button type="button" className="eco-secondary" onClick={onBack}>चरण चयन</button></div></div>;
 const x=rotate(bank[i],i),selected=answers[i],locked=selected!==undefined&&selected!==null;
 const choose=n=>{if(!locked&&!expired)setAnswers(p=>{const a=[...p];a[i]=n;return a})};
 const next=()=>{if(i<bank.length-1)setI(v=>v+1);else{setDone(true);store()}};
 const tc=left<=60?'danger':left<=300?'warning':'';
 return <div className="eco-quiz-card"><div className="eco-quiz-top"><span>{mode==='practice'?'PRACTICE':mode==='challenge'?'CHALLENGE':'FINAL TEST'}</span><div><strong>{i+1} / {bank.length}</strong><span className={`eco-timer ${tc}`} role="timer" aria-live="polite">⏱ {fmt(left)}</span></div></div><div className="eco-quiz-track"><span style={{width:`${((i+1)/bank.length)*100}%`}}/></div><p className="eco-timer-note">पूरे चरण के लिए कुल समय: <strong>{fmt(duration)}</strong> • timer प्रश्न बदलने पर reset नहीं होगा • परिणाम अंत में दिखेगा।</p><h2>{x.q}</h2><div className="eco-options">{x.o.map((o,n)=><button type="button" key={`${n}-${o}`} disabled={locked||expired} className={selected===n?'selected':''} onClick={()=>choose(n)}><span>{String.fromCharCode(65+n)}</span>{o}</button>)}</div>{locked&&<div className="eco-selection-note">✓ उत्तर दर्ज हो गया है • सही/गलत परिणाम अंत में दिखेगा।</div>}<div className="eco-quiz-footer"><small>{locked?'उत्तर सुरक्षित है':'एक विकल्प चुनें'}</small><button type="button" className="eco-primary" onClick={next}>{i===bank.length-1?'परीक्षा समाप्त करें':'अगला प्रश्न →'}</button></div></div>
}

function Subjective({data}){
 const total=(data.subjective?.easy?.length||0)+(data.subjective?.hard?.length||0)+(data.subjective?.challenger?.length||0);
 return <section className="eco-subjective">
  <div className="eco-subjective-head"><span>✍ SUBJECTIVE PRACTICE</span><h2>विषयपरक प्रश्न</h2><p>{data.title} • {total}/15 प्रश्न प्रदर्शित • उत्तर अपने शब्दों में लिखें</p></div>
  <div className="eco-subjective-level-tabs" aria-label="Subjective difficulty summary"><div>{LEVELS.map(([k,label,desc])=><div className="eco-subjective-level-summary" key={k}><strong>{label}</strong><small>{desc} • {(data.subjective?.[k]||[]).length} प्रश्न</small></div>)}</div></div>
  <div className="eco-subjective-all-questions">
   {LEVELS.map(([level,label,desc])=>{
    const questions=data.subjective?.[level]||[];
    return <section className="eco-subjective-level-section" key={level} aria-labelledby={`eco-subjective-${level}`}>
     <div className="eco-subjective-level-heading"><div><span>{label}</span><h3 id={`eco-subjective-${level}`}>{desc}</h3></div><strong>{questions.length}/5 प्रश्न</strong></div>
     <div className="eco-subjective-question-grid">
      {questions.map((item,i)=><article className="eco-subjective-card" key={`${level}-${i}-${item.q}`}>
       <div className="eco-subjective-card-top"><span>{label} • प्रश्न {i+1} / {questions.length}</span><span>{item.marks} अंक</span></div>
       <div className="eco-subjective-question-number">प्रश्न {String(i+1).padStart(2,'0')}</div>
       <h3>{item.q}</h3>
       <p className="eco-write-hint">✍️ उत्तर अपने शब्दों में लिखें। मुख्य कारण, अवधारणा और उदाहरण शामिल करें।</p>
       <details className="eco-answer-hint"><summary>उत्तर संकेत देखें</summary><div>{item.answer}</div></details>
      </article>)}
     </div>
    </section>
   })}
  </div>
  {total!==15&&<div className="eco-empty-state">⚠️ Subjective प्रश्नों की संख्या {total}/15 है। QA में यह स्थिति fail होनी चाहिए।</div>}
 </section>
}

export function EconomicsEngine({chapterNumber,onBack}){
 const raw=getEconomicsChapter(chapterNumber),data=useMemo(()=>normalizeEconomicsChapter(raw),[raw]),[mode,setMode]=useState(null),[progress,setProgress]=useState(()=>read(chapterNumber));
 useEffect(()=>setProgress(read(chapterNumber)),[chapterNumber]);
 if(!data)return <main className="eco-chapter"><section className="eco-empty"><h1>अध्याय उपलब्ध नहीं है</h1><button type="button" className="eco-primary" onClick={onBack}>← सामाजिक विज्ञान</button></section></main>;
 const finish=(id,score,total)=>{const n={...progress,[id]:{score,total,completedAt:new Date().toISOString()}};if(id==='test'){n.chapterCompleted={completedAt:new Date().toISOString(),score,total};markComplete(chapterNumber)}setProgress(n);save(chapterNumber,n)};
 const completed=['learn','practice','challenge','test'].filter(x=>progress[x]).length;
 return <main className="eco-chapter">
  <header className="eco-header"><button type="button" className="eco-back" onClick={onBack}>← सामाजिक विज्ञान</button><div><span>अर्थशास्त्र • अध्याय {chapterNumber} • बिहार बोर्ड</span><h1>{data.title}</h1><p>{data.subtitle}</p>{progress.chapterCompleted&&<div className="eco-complete">✓ CHAPTER COMPLETED</div>}</div><div className="eco-stat"><strong>{completed}/4</strong><span>core stages</span></div></header>
  <div className="eco-content">
   {!mode?<><section className="eco-intro"><div><span>ECONOMICS LEARNING HUB</span><p>{data.goal}</p></div><div className="eco-chips"><span>15 Lessons</span><span>15 Practice</span><span>12 Challenge</span><span>20 Final</span><span>15 Subjective</span></div></section><section className="eco-mode-grid">{MODES.map(([id,icon,label,desc])=><button key={id} type="button" className={`eco-mode-card ${progress[id]?'is-complete':''}`} onClick={()=>setMode(id)}><span className="eco-mode-icon">{icon}</span><span className="eco-mode-label">{id==='subjective'?'WRITTEN PRACTICE':'STAGE'}</span><h2>{label}</h2><p>{desc}</p><small>{id==='learn'?'15 lessons':id==='practice'?'15 MCQs':id==='challenge'?'12 MCQs':id==='test'?'20 timed MCQs':'15 subjective questions'}</small></button>)}</section></>:<section className="eco-workspace"><button type="button" className="eco-mode-back" onClick={()=>setMode(null)}>← चरण चयन</button>{mode==='learn'?<Learn data={{...data,lessons:data.topics}} finish={finish}/>:mode==='subjective'?<Subjective data={data}/>:<Quiz data={data} mode={mode} finish={finish} onBack={()=>setMode(null)}/>}</section>}
  </div>
 </main>
}
