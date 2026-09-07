import React,{useEffect,useMemo,useState} from 'react';
import {SANSKRIT_PRIMARY_CHAPTERS,SANSKRIT_SUPPLEMENTARY_CHAPTERS} from './sanskritChapterRegistry';
import {getSanskritPrimaryContent} from './sanskritPrimaryContent';
import './sanskrit-section.css';

const MODES=[
 {id:'learn',icon:'📖',title:'सीखें',desc:'अर्थ, मुख्य विचार और अध्ययन बिंदु',xp:10},
 {id:'practice',icon:'📝',title:'अभ्यास',desc:'समझ की जाँच और feedback',xp:15},
 {id:'challenge',icon:'🔥',title:'चुनौती',desc:'उच्च-स्तरीय सोच और तर्क',xp:25},
 {id:'test',icon:'🎯',title:'फाइनल टेस्ट',desc:'समयबद्ध objective assessment',xp:30},
];

function QuestionSet({questions,mode,addXp,finishSession,chapter,back}){
 const [selected,setSelected]=useState({});
 const [submitted,setSubmitted]=useState(false);
 const score=useMemo(()=>questions.reduce((n,item,i)=>n+(selected[i]===item.answer?1:0),0),[questions,selected]);
 const submit=()=>{if(submitted||Object.keys(selected).length!==questions.length)return;setSubmitted(true);addXp?.(Math.max(5,score*5));finishSession?.({subject:'संस्कृत',chapter,mode,attempted:questions.length,correct:score,completed:true,at:new Date().toISOString()})};
 return <section className="sanskrit-quiz">
  <div className="sanskrit-section-head"><div><span className="sanskrit-kicker">{mode==='practice'?'अभ्यास':'चुनौती'}</span><h2>अध्याय अभ्यास</h2></div><span className="sanskrit-score">{submitted?`${score}/${questions.length}`:'पूरा सेट हल करें'}</span></div>
  {questions.map((item,i)=><article className="sanskrit-question" key={`${item.q}-${i}`}><h3>{i+1}. {item.q}</h3><div className="sanskrit-options">{item.options.map((opt,j)=><button type="button" key={opt} disabled={submitted} className={`sanskrit-option ${selected[i]===j?'is-selected':''} ${submitted&&j===item.answer?'is-correct':''} ${submitted&&selected[i]===j&&j!==item.answer?'is-wrong':''}`} onClick={()=>setSelected(s=>({...s,[i]:j}))}>{String.fromCharCode(65+j)}. {opt}</button>)}</div>{submitted&&<p className="sanskrit-explain">{item.explain}</p>}</article>)}
  <div className="sanskrit-action-row"><button type="button" className="primary-btn pressable" disabled={Object.keys(selected).length!==questions.length||submitted} onClick={submit}>{submitted?'प्रयास जमा हो चुका है ✓':'उत्तर जाँचें →'}</button><button type="button" className="secondary-btn pressable" onClick={back}>← modes पर जाएँ</button></div>
 </section>;
}

export function SanskritSubjectSection({open}){
 const [tab,setTab]=useState('primary');
 const chapters=tab==='primary'?SANSKRIT_PRIMARY_CHAPTERS:SANSKRIT_SUPPLEMENTARY_CHAPTERS;
 return <div className="sanskrit-subject">
  <div className="sanskrit-hero-card"><div><span className="sanskrit-kicker">कक्षा 9 • BSEB • SCERT</span><h2>संस्कृत — पीयूषम् भाग-1</h2><p>मुख्य पुस्तक के 15 अध्याय अब एक scalable learning engine में हैं: सीखें, अभ्यास, चुनौती, फाइनल टेस्ट और लिखित अभ्यास।</p></div><div className="sanskrit-hero-mark">ॐ</div></div>
  <div className="sanskrit-book-tabs"><button type="button" className={tab==='primary'?'active':''} onClick={()=>setTab('primary')}>मुख्य पुस्तक · 15 अध्याय</button><button type="button" className={tab==='supplementary'?'active':''} onClick={()=>setTab('supplementary')}>पूरक · 21 अध्याय</button></div>
  <div className="sanskrit-chapter-grid">{chapters.map(c=><button type="button" className={`sanskrit-chapter-card pressable ${c.status==='pilot'?'pilot':''}`} key={`${tab}-${c.number}`} onClick={()=>tab==='primary'&&open(c)}><span className="sanskrit-chapter-number">{tab==='primary'?'अध्याय '+c.number:'पूरक '+c.number}</span><strong>{c.title}</strong><small>{c.category==='पद्य'?'पद्य पाठ':'गद्य पाठ'} {tab==='primary'?'• learning engine':'• supplementary track'}</small><div className="sanskrit-card-actions"><span>📖 सीखें</span><span>📝 अभ्यास</span><span>🔥 चुनौती</span><span>🎯 टेस्ट</span></div>{tab==='primary'?<b>अध्याय खोलें →</b>:<em>पूरक content queue</em>}</button>)}</div>
  <div className="sanskrit-note"><strong>Build status</strong><span>मुख्य पुस्तक के सभी 15 chapters engine से जुड़े हैं; supplementary book को अलग track में रखा गया है ताकि syllabus mix न हो।</span></div>
 </div>;
}

function LearnView({content}){
 return <section className="sanskrit-learning-card"><div className="sanskrit-section-head"><div><span className="sanskrit-kicker">सीखें</span><h2>Concept Builder</h2></div><span className="sanskrit-score">3 core blocks</span></div><p className="sanskrit-lead">{content.intro}</p><div className="sanskrit-learning-grid">{content.concepts.map(([title,text])=><div key={title}><h3>{title}</h3><p>{text}</p></div>)}</div></section>;
}
function SubjectiveView({items}){
 return <section className="sanskrit-subjective-panel"><div className="sanskrit-section-head"><div><span className="sanskrit-kicker">Subjective</span><h2>लिखित अभ्यास</h2></div><span className="sanskrit-score">{items.length} प्रश्न</span></div><div className="sanskrit-subjective-list">{items.map((q,i)=><article key={q}><span>प्रश्न {i+1}</span><p>{q}</p><div className="sanskrit-writing-lines">उत्तर लिखने के लिए स्थान</div></article>)}</div></section>;
}

export function SanskritChapterEngine({chapter,initialMode,onBack,addXp,finishSession}){
 const chapterNumber=SANSKRIT_PRIMARY_CHAPTERS.find(c=>c.title===chapter)?.number||1;
 const content=getSanskritPrimaryContent(chapterNumber);
 const [mode,setMode]=useState(initialMode||null);
 useEffect(()=>setMode(initialMode||null),[initialMode]);
 if(!content)return <div className="sanskrit-engine"><button type="button" className="secondary-btn pressable" onClick={onBack}>← वापस</button><section className="sanskrit-learning-card"><h2>Content unavailable</h2><p>इस अध्याय का structured content अभी तैयार किया जा रहा है।</p></section></div>;
 const practice=content.practice||[];
 const challenge=content.challenge||[];
 const questions=[...practice,...challenge].slice(0,5);
 return <div className="sanskrit-engine">
  <div className="sanskrit-chapter-hero"><div className="sanskrit-round">{chapterNumber}</div><div><span className="sanskrit-kicker">पीयूषम् भाग-1 • अध्याय {chapterNumber}</span><h2>{chapter}</h2><p>{content.intro}</p></div></div>
  {!mode&&<div className="sanskrit-mode-grid">{MODES.map(m=><button type="button" key={m.id} className="sanskrit-mode-card pressable" onClick={()=>setMode(m.id)}><span>{m.icon}</span><strong>{m.title}</strong><small>{m.desc}</small><b>+{m.xp} XP →</b></button>)}</div>}
  {mode==='learn'&&<LearnView content={content}/>}
  {mode==='practice'&&<QuestionSet questions={practice} mode="practice" addXp={addXp} finishSession={finishSession} chapter={chapter} back={()=>setMode(null)}/>} 
  {mode==='challenge'&&<QuestionSet questions={challenge} mode="challenge" addXp={addXp} finishSession={finishSession} chapter={chapter} back={()=>setMode(null)}/>} 
  {mode==='test'&&<TimedTest questions={questions} addXp={addXp} finishSession={finishSession} chapter={chapter} back={()=>setMode(null)}/>} 
  {!mode&&<SubjectiveView items={content.subjective||[]}/>} 
  {mode==='learn'&&<button type="button" className="secondary-btn pressable" onClick={()=>setMode(null)}>← modes</button>}
  <button type="button" className="secondary-btn pressable" onClick={onBack}>← अध्याय सूची</button>
 </div>;
}

function TimedTest({questions,addXp,finishSession,chapter,back}){
 const totalSeconds=8*60;
 const [seconds,setSeconds]=useState(totalSeconds);
 const [selected,setSelected]=useState({});
 const [submitted,setSubmitted]=useState(false);
 const score=questions.reduce((n,item,i)=>n+(selected[i]===item.answer?1:0),0);
 useEffect(()=>{if(submitted)return;const id=setInterval(()=>setSeconds(s=>Math.max(0,s-1)),1000);return()=>clearInterval(id)},[submitted]);
 useEffect(()=>{if(seconds===0&&!submitted&&Object.keys(selected).length===questions.length)submit()},[seconds,selected,submitted]);
 const submit=()=>{if(submitted||Object.keys(selected).length!==questions.length)return;setSubmitted(true);addXp?.(Math.max(10,score*6));finishSession?.({subject:'संस्कृत',chapter,mode:'फाइनल टेस्ट',attempted:questions.length,correct:score,completed:true,at:new Date().toISOString()})};
 const mm=String(Math.floor(seconds/60)).padStart(2,'0'); const ss=String(seconds%60).padStart(2,'0');
 return <section className="sanskrit-quiz"><div className="sanskrit-section-head"><div><span className="sanskrit-kicker">Final Test</span><h2>अध्याय टेस्ट</h2></div><span className="sanskrit-score">{submitted?`${score}/${questions.length}`:`${mm}:${ss}`}</span></div>{questions.map((item,i)=><article className="sanskrit-question" key={i}><h3>{i+1}. {item.q}</h3><div className="sanskrit-options">{item.options.map((opt,j)=><button type="button" key={opt} disabled={submitted||seconds===0} className={`sanskrit-option ${selected[i]===j?'is-selected':''} ${submitted&&j===item.answer?'is-correct':''} ${submitted&&selected[i]===j&&j!==item.answer?'is-wrong':''}`} onClick={()=>setSelected(s=>({...s,[i]:j}))}>{String.fromCharCode(65+j)}. {opt}</button>)}</div>{submitted&&<p className="sanskrit-explain">{item.explain}</p>}</article>)}<div className="sanskrit-action-row"><button type="button" className="primary-btn pressable" disabled={Object.keys(selected).length!==questions.length||submitted||seconds===0} onClick={submit}>{submitted?'टेस्ट जमा ✓':seconds===0?'समय समाप्त':'टेस्ट जमा करें →'}</button><button type="button" className="secondary-btn pressable" onClick={back}>← modes पर जाएँ</button></div></section>;
}
