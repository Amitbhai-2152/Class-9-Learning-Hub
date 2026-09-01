import React,{useMemo,useState} from 'react';
import {chapter2Practice} from './chapter2Practice';

const challenge=[
  {q:'यदि p(x)=x²−5x+k और x=2 इसका zero है, तो k क्या होगा?',options:['4','6','8','10'],answer:1,explain:'p(2)=4−10+k=0 ⇒ k=6।'},
  {q:'यदि p(x)=x³−4x²+x+6 में x−2 factor है, तो p(2) कितना होगा?',options:['−2','0','2','4'],answer:1,explain:'Factor theorem के अनुसार x−2 factor होने पर p(2)=0।'},
  {q:'यदि p(x)=x²−9, तो x=−3 पर p(x) का मान क्या होगा?',options:['−18','0','6','18'],answer:1,explain:'(−3)²−9=9−9=0।'},
  {q:'एक linear pattern 5, 8, 11, 14,… का nth term क्या है?',options:['2n+3','3n+2','3n+5','n+4'],answer:1,explain:'पहला term 5 और common difference 3 है, इसलिए nth term = 5+(n−1)3 = 3n+2।'},
  {q:'यदि 2n−1=35, तो n क्या है?',options:['16','17','18','19'],answer:2,explain:'2n=36 ⇒ n=18।'},
  {q:'p(x)=(x−3)(x+4) के zeroes कौन हैं?',options:['3 और 4','−3 और 4','3 और −4','−3 और −4'],answer:2,explain:'x−3=0 से x=3 और x+4=0 से x=−4।'},
  {q:'यदि p(−5)=0, तो निम्न में से कौन-सा factor निश्चित है?',options:['x−5','x+5','x−1','x+1'],answer:1,explain:'p(a)=0 पर x−a factor होता है। a=−5 के लिए factor x+5 है।'},
  {q:'यदि p(x)=3x²−7x+2, तो p(2) का मान क्या है?',options:['0','2','4','8'],answer:0,explain:'12−14+2=0।'},
  {q:'एक polynomial में 4 terms हैं और highest power 3 है। उसकी degree क्या है?',options:['3','4','7','निर्धारित नहीं'],answer:0,explain:'Degree highest power से तय होती है, terms की संख्या से नहीं।'},
  {q:'कौन-सा statement गलत है?',options:['x का coefficient 1 है','−x का coefficient −1 है','constant 7 की degree 7 है','x² की degree 2 है'],answer:2,explain:'Non-zero constant polynomial की degree 0 होती है, 7 नहीं।'}
];

function shuffle(list){const a=[...list];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}

export function PolynomialEngine({chapter,mode,onBack,addXp}){
 const isTest=mode==='test';
 const bank=mode==='challenge'?[...challenge.map(q=>({...q,q:`🔥 चुनौती: ${q.q}`}))]:chapter2Practice;
 const questions=useMemo(()=>isTest?shuffle(chapter2Practice).slice(0,15):bank,[mode,isTest]);
 const [index,setIndex]=useState(0),[selected,setSelected]=useState(null),[score,setScore]=useState(0),[done,setDone]=useState(false),[earned,setEarned]=useState(0);
 const current=questions[index];
 const points=mode==='challenge'?25:15;
 const choose=i=>{if(selected!==null)return;setSelected(i);if(i===current.answer){setScore(s=>s+1);if(!isTest){setEarned(e=>e+points);addXp?.(points)}}};
 const next=()=>{if(selected===null)return;if(index===questions.length-1)setDone(true);else{setIndex(i=>i+1);setSelected(null)}};
 if(done)return <main className="page"><header className="page-header"><button className="pressable" onClick={onBack}>← अध्याय</button><div className="badge">बहुपद • परिणाम</div><h1>{isTest?'🎯 टेस्ट परिणाम':mode==='challenge'?'🔥 चुनौती पूरी':'📝 अभ्यास पूरा'}</h1></header><section className="page-content"><div className="result-card"><div className="result-score">{score}<small> / {questions.length}</small></div><div className="result-percent">{Math.round(score/questions.length*100)}% सही</div><h2>{score===questions.length?'शानदार! 🎉':score>=questions.length*.7?'बहुत अच्छा! 💪':'अभी और अभ्यास करें 📚'}</h2><p>{isTest?'टेस्ट पूरा हुआ।':'आपने '+earned+' XP कमाए।'}</p><div className="result-actions"><button className="secondary-btn pressable" onClick={()=>{setIndex(0);setSelected(null);setScore(0);setDone(false);setEarned(0)}}>फिर से करें</button><button className="primary-btn pressable" onClick={onBack}>अध्याय पर जाएँ →</button></div></div></section></main>;
 return <main className="page"><header className="page-header"><button className="pressable" onClick={onBack}>← अध्याय</button><div className="lesson-top"><span className="badge">गणित • {chapter}</span><span>{index+1} / {questions.length}</span></div><h1>{isTest?'🎯 समयबद्ध टेस्ट':mode==='challenge'?'🔥 चुनौती':'📝 अभ्यास'}</h1><div className="lesson-progress"><span style={{width:`${((index+1)/questions.length)*100}%`}}/></div></header><section className="page-content"><div className="question-card"><span className="lesson-type">प्रश्न {index+1} / {questions.length}{!isTest&&` • +${points} XP`}</span><h2>{current.q}</h2><div className="options-grid">{current.options.map((option,i)=><button key={`${option}-${i}`} disabled={selected!==null} className={`answer-option pressable ${selected!==null?(i===current.answer?'correct':i===selected?'wrong':'muted'):''}`} onClick={()=>choose(i)}>{String.fromCharCode(65+i)}. {option}</button>)}</div>{selected!==null&&<div className={`answer-feedback ${selected===current.answer?'good':'bad'}`}><strong>{selected===current.answer?'✓ सही उत्तर':'✗ गलत उत्तर'}</strong><p>{current.explain}</p></div>}<div className="question-actions"><span>{selected===null?'उत्तर चुनें':`स्कोर: ${score}/${index+1}`}</span><button className="primary-btn pressable" onClick={next}>{index===questions.length-1?'परिणाम देखें':'अगला प्रश्न →'}</button></div></div></section></main>
}
