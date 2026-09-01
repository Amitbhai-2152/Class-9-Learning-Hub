import React, {useMemo, useState} from 'react';
import {getPracticeQuestions} from './practiceData';

export default function StudyEngine({subject, chapter, mode, onBack, addXp}) {
  const base = getPracticeQuestions(subject?.name, chapter);
  const questions = useMemo(() => mode === 'challenge'
    ? [...base].reverse().map(q => ({...q, q:`🔥 चुनौती: ${q.q}`}))
    : base, [base, mode]);
  const [index,setIndex]=useState(0);
  const [selected,setSelected]=useState(null);
  const [score,setScore]=useState(0);
  const [done,setDone]=useState(false);
  const [mistakes,setMistakes]=useState([]);
  const [earned,setEarned]=useState(0);
  const current=questions[index];
  const points=mode==='challenge'?25:15;

  const choose=(i)=>{
    if(selected!==null)return;
    setSelected(i);
    if(i===current.answer){setScore(s=>s+1);setEarned(e=>e+points);addXp(points)}
    else setMistakes(m=>[...m,index]);
  };
  const next=()=>{
    if(selected===null)return;
    if(index===questions.length-1)setDone(true);
    else {setIndex(i=>i+1);setSelected(null)}
  };
  if(done) return <main className="page"><header className="page-header"><button className="pressable" onClick={onBack}>← अध्याय</button><div className="badge">कक्षा 9 • {mode==='challenge'?'चुनौती':'अभ्यास'}</div><h1>{mode==='challenge'?'🔥 चुनौती पूरी':'📝 अभ्यास पूरा'}</h1></header><section className="page-content"><div className="result-card"><div className="result-score">{score}<small>/ {questions.length}</small></div><h2>{score===questions.length?'शानदार! 🎉':'अच्छा प्रयास! 💪'}</h2><p>आपने <strong>{earned} XP</strong> कमाए। {mistakes.length ? `${mistakes.length} प्रश्नों को दोबारा देखें।` : 'सभी प्रश्न सही किए!'}</p><div className="result-actions"><button className="secondary-btn pressable" onClick={()=>{setIndex(0);setSelected(null);setScore(0);setDone(false);setMistakes([]);setEarned(0)}}>फिर से करें</button><button className="primary-btn pressable" onClick={onBack}>अध्याय पर जाएँ →</button></div></div></section></main>;
  return <main className="page"><header className="page-header"><button className="pressable" onClick={onBack}>← अध्याय</button><div className="lesson-top"><span className="badge">{subject?.name} • {chapter}</span><span>{index+1} / {questions.length}</span></div><h1>{mode==='challenge'?'🔥 चुनौती':'📝 अभ्यास'}</h1><div className="lesson-progress"><span style={{width:`${((index+1)/questions.length)*100}%`}}/></div></header><section className="page-content"><div className="question-card"><span className="lesson-type">प्रश्न {index+1}</span><h2>{current.q}</h2><div className="options-grid">{current.options.map((option,i)=><button key={option} className={`answer-option pressable ${selected!==null?(i===current.answer?'correct':i===selected?'wrong':'muted'):''}`} onClick={()=>choose(i)}>{String.fromCharCode(65+i)}. {option}</button>)}</div>{selected!==null&&<div className={`answer-feedback ${selected===current.answer?'good':'bad'}`}><strong>{selected===current.answer?'✓ सही उत्तर':'✗ अभी सही नहीं'}</strong><p>{current.explain}</p></div>}<div className="question-actions"><span>{selected===null?`+${points} XP • उत्तर चुनें`:`スコア: ${score}/${index+1}`}</span><button className="primary-btn pressable" onClick={next}>{index===questions.length-1?'परिणाम देखें':'अगला प्रश्न →'}</button></div></div></section></main>;
}

export function TestEngine({subject,chapter,onBack,addXp}){return <StudyEngine subject={subject} chapter={chapter} mode="test" onBack={onBack} addXp={addXp}/>}
