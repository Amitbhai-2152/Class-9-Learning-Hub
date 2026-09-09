import React,{useState} from 'react';
import PanoramaTimedQuiz from './PanoramaTimedQuiz.jsx';
import './english-reader.css';
import './english-panorama.css';

function StudyView({study,onMode}){
 return <div className="pg-learn">
  <div className="pg-callout pg-no-book"><b>📗 Complete Reader Study</b><span>Source-based guided reading, सरल हिन्दी explanation, vocabulary, textbook preparation, discussion और project work.</span></div>
  <section className="pg-panel"><div className="pg-panel-title"><span>ABOUT THE LESSON</span><h2>Chapter का basic idea</h2></div><p>{study.intro}</p><div className="pg-author"><b>पाठ / स्रोत</b><p>{study.sourceNote}</p></div></section>
  <div className="pg-anchorbar"><a href="#guided">Guided Reading</a><a href="#words">Word Study</a><a href="#exam">Exam Prep</a><a href="#activities">Activities</a></div>
  <section id="guided" className="pg-section-heading"><span>01</span><div><small>READ • UNDERSTAND • REMEMBER</small><h2>Guided Reading</h2><p>हर block कहानी के क्रम को आसान English में समझाता है और फिर हिन्दी में उसका अर्थ स्पष्ट करता है।</p></div></section>
  <div className="pg-reading-stack">{study.sections.map((s,i)=><article className="pg-reading-card" key={s.title}><div className="pg-card-top"><div className="pg-num">{String(i+1).padStart(2,'0')}</div><div><span>STORY FLOW</span><h3>{s.title}</h3></div></div><div className="pg-flow"><div className="pg-flow-label">Simple English</div><p>{s.flow}</p></div><div className="pg-hindi"><div className="pg-flow-label">हिन्दी में समझें</div><p>{s.explanation}</p></div><div className="pg-vocab-head">Vocabulary</div><div className="pg-vocab-grid">{s.vocabulary.map(([w,m])=><div className="pg-vocab" key={w}><b>{w}</b><span>{m}</span></div>)}</div><div className="pg-bottom-grid"><div className="pg-exam"><b>🎯 Exam Point</b><span>{s.exam}</span></div><div className="pg-think"><b>💡 Think</b><span>{s.think}</span></div></div></article>)}</div>
  <section id="words" className="pg-section-heading compact"><span>02</span><div><small>LANGUAGE BUILDING</small><h2>Word Study</h2><p>महत्वपूर्ण शब्द, meanings और chapter vocabulary revise करें।</p></div></section>
  <div className="pg-tool-grid"><section className="pg-panel"><h3>Glossary</h3><div className="pg-glossary">{study.glossary.map(([w,m])=><div key={w}><b>{w}</b><span>{m}</span></div>)}</div></section><section className="pg-panel"><h3>Word Forms / Meanings</h3><div className="pg-match">{study.wordStudy.map(([q,a])=><div key={q}><span>{q}</span><b>{a}</b></div>)}</div></section></div>
  <section id="exam" className="pg-section-heading compact"><span>03</span><div><small>TEXTBOOK • EXAM MODE</small><h2>Textbook Preparation</h2><p>Supplied chapter exercises को exam-ready answers और discussion prompts में व्यवस्थित किया गया है।</p></div></section>
  <section className="pg-tool-grid"><section className="pg-panel"><h3>Let’s Answer — Guided Answers</h3><div className="pg-answer-list">{study.textbookAnswers.map(([q,a])=><article key={q}><b>{q}</b><p>{a}</p></article>)}</div></section><section className="pg-panel"><h3>One-minute Revision</h3><div className="pg-revision-grid">{study.revision.map(([q,a])=><div key={q}><b>{q}</b><span>{a}</span></div>)}</div></section></section>
  <section id="activities" className="pg-section-heading compact"><span>04</span><div><small>DISCUSS • DO • CREATE</small><h2>Discussion & Activities</h2><p>PDF में दिए discussion points और project tasks को स्पष्ट learner actions में रखा गया है।</p></div></section>
  <section className="pg-tool-grid"><section className="pg-panel"><h3>Let’s Discuss</h3><div className="pg-activitygrid">{study.discussion.map((x,i)=><div key={x}><span>{i+1}</span><p>{x}</p></div>)}</div></section><section className="pg-panel"><h3>Let’s Do</h3><div className="pg-activitygrid">{study.activities.map((x,i)=><div key={x}><span>{i+1}</span><p>{x}</p></div>)}</div></section></section>
  {study.extra&&<section className="pg-panel"><h3>Source Note</h3><p>{study.extra}</p></section>}
  <div className="pg-modebar"><div><span className="poem-section-label">ASSESSMENT</span><h2>Test what you learned</h2><p>15 Practice • 25 Challenge • 20-question Final Test</p></div><div className="poem-mode-buttons"><button type="button" className="primary" onClick={()=>onMode('practice')}>Practice →</button><button type="button" onClick={()=>onMode('challenge')}>Challenge →</button><button type="button" onClick={()=>onMode('test')}>Final Test →</button></div></div>
 </div>;
}

export function EnglishReaderEngine({study,initialMode='learn',onBack,addXp,finishSession}){
 const[mode,setMode]=useState(initialMode||'learn');
 const begin=nextMode=>{if(nextMode==='learn'||nextMode==='practice'||nextMode==='challenge'||nextMode==='test')setMode(nextMode)};
 if(mode!=='learn'){
  const bank=mode==='practice'?study.practice:mode==='challenge'?study.challenge:study.finalTest;
  return <PanoramaTimedQuiz key={`${study.chapter}-${mode}`} mode={mode} title={study.title} bank={bank} onBack={()=>begin('learn')} addXp={addXp} finishSession={payload=>finishSession?.({subject:'english',book:'English Reader',...payload})}/>;
 }
 return <div className="pg-shell"><button type="button" className="pg-back" onClick={onBack}>← Back to English Reader</button><header className="pg-hero"><div className="pg-kicker">ENGLISH READER • CHAPTER {study.chapter}</div><h1>{study.title}</h1><p>{study.subtitle}</p><div className="pg-hero-stats"><span>{study.sections.length} guided parts</span><span>15 Practice questions</span><span>25 Challenge questions</span><span>20 Final Test questions</span></div></header><div className="pg-modebar"><button type="button" className="active" onClick={()=>begin('learn')}><b>LEARN</b><span>Guided study • vocabulary • textbook prep</span></button><button type="button" onClick={()=>begin('practice')}><b>15 Practice</b><span>11:15 min • Easy → Moderate</span></button><button type="button" onClick={()=>begin('challenge')}><b>25 Challenge</b><span>25:00 min • Moderate → Hard</span></button><button type="button" onClick={()=>begin('test')}><b>20 Final Test</b><span>25:00 min • Exam Level</span></button></div><StudyView study={study} onMode={begin}/></div>;
}
