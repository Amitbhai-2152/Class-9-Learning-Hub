import React,{useMemo,useState} from 'react';
import {chapter3Practice} from './chapter3Practice';

const challenge=[
 {q:'बिंदु A(−3,4), B(5,4) और C(5,−2) दिए हैं। AB और BC की लंबाई क्रमशः क्या हैं?',options:['8 और 6','6 और 8','8 और 7','7 और 6'],answer:0,explain:'AB में y समान है: |5−(−3)|=8। BC में x समान है: |−2−4|=6।'},
 {q:'A(2,3) और B(8,9) का midpoint क्या है?',options:['(5,6)','(6,5)','(10,12)','(3,5)'],answer:0,explain:'M=((2+8)/2,(3+9)/2)=(5,6)।'},
 {q:'यदि M(4,5) और A(1,2) हैं, तो B का coordinate क्या होगा?',options:['(7,8)','(8,7)','(6,9)','(5,6)'],answer:0,explain:'M midpoint है: (1+x)/2=4 ⇒ x=7 और (2+y)/2=5 ⇒ y=8।'},
 {q:'कौन-सा point उसी vertical line पर है जिस पर (−2,7) है?',options:['(5,−2)','(−2,−4)','(7,−2)','(0,7)'],answer:1,explain:'Vertical alignment के लिए x-coordinate समान चाहिए; केवल (−2,−4) का x = −2 है।'},
 {q:'(−1,−4) और (5,−4) के बीच distance क्या है?',options:['5','6','7','8'],answer:1,explain:'y समान है, इसलिए distance = |5−(−1)| = 6।'},
 {q:'(−2,3) और (2,−1) के बीच distance क्या है?',options:['4','4√2','5','6'],answer:1,explain:'Δx=4, Δy=−4, इसलिए distance=√(16+16)=4√2।'},
 {q:'यदि किसी point का x और y दोनों negative हैं, तो वह किस quadrant में होगा?',options:['I','II','III','IV'],answer:2,explain:'(−,−) sign pattern III quadrant का है।'},
 {q:'तीन points (0,0), (4,0), (4,3) से बने triangle की सबसे बड़ी side की लंबाई क्या है?',options:['3','4','5','7'],answer:2,explain:'पहली दो sides 4 और 3 हैं; third side √(4²+3²)=5।'},
 {q:'यदि points A(1,2), B(3,4), C(5,6) हों तो कौन-सी observation सही है?',options:['A,B,C एक straight-line pattern पर हैं','सभी origin पर हैं','सभी एक quadrant में नहीं हो सकते','B और C का x समान है'],answer:0,explain:'हर बार x और y दोनों 2 बढ़ते हैं; तीनों points एक ही straight-line pattern पर हैं।'},
 {q:'किस pair का midpoint origin (0,0) होगा?',options:['(2,3) और (−2,−3)','(2,3) और (2,−3)','(−2,3) और (2,3)','(4,0) और (0,4)'],answer:0,explain:'दोनों coordinates के sums 0 हैं, इसलिए midpoint ((2−2)/2,(3−3)/2)=(0,0)।'}
];

function shuffle(list){const a=[...list];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}

export function CoordinateEngine({mode,onBack,addXp}){
 const isTest=mode==='test';
 const bank=mode==='challenge'?challenge.map(q=>({...q,q:`🔥 चुनौती: ${q.q}`})):chapter3Practice;
 const questions=useMemo(()=>isTest?shuffle(chapter3Practice).slice(0,15):bank,[mode,isTest]);
 const [index,setIndex]=useState(0),[selected,setSelected]=useState(null),[score,setScore]=useState(0),[done,setDone]=useState(false),[earned,setEarned]=useState(0);
 const current=questions[index],points=mode==='challenge'?25:15;
 const choose=i=>{if(selected!==null||!current)return;setSelected(i);if(i===current.answer){setScore(s=>s+1);if(!isTest){setEarned(e=>e+points);addXp?.(points)}}};
 const next=()=>{if(selected===null)return;if(index===questions.length-1)setDone(true);else{setIndex(i=>i+1);setSelected(null)}};
 if(done)return <main className="page"><header className="page-header"><button className="pressable" onClick={onBack}>← अध्याय</button><div className="badge">निर्देशांक ज्यामिति • परिणाम</div><h1>{isTest?'🎯 टेस्ट परिणाम':mode==='challenge'?'🔥 चुनौती पूरी':'📝 अभ्यास पूरा'}</h1></header><section className="page-content"><div className="result-card"><div className="result-score">{score}<small> / {questions.length}</small></div><div className="result-percent">{Math.round(score/questions.length*100)}% सही</div><h2>{score===questions.length?'शानदार! 🎉':score>=questions.length*.7?'बहुत अच्छा! 💪':'अभी और अभ्यास करें 📚'}</h2><p>{isTest?'टेस्ट पूरा हुआ।':'आपने '+earned+' XP कमाए।'}</p><div className="result-actions"><button className="secondary-btn pressable" onClick={()=>{setIndex(0);setSelected(null);setScore(0);setDone(false);setEarned(0)}}>फिर से करें</button><button className="primary-btn pressable" onClick={onBack}>अध्याय पर जाएँ →</button></div></div></section></main>;
 return <main className="page"><header className="page-header"><button className="pressable" onClick={onBack}>← अध्याय</button><div className="lesson-top"><span className="badge">गणित • निर्देशांक ज्यामिति</span><span>{index+1} / {questions.length}</span></div><h1>{isTest?'🎯 समयबद्ध टेस्ट':mode==='challenge'?'🔥 चुनौती':'📝 अभ्यास'}</h1><div className="lesson-progress"><span style={{width:`${((index+1)/questions.length)*100}%`}}/></div></header><section className="page-content"><div className="question-card"><span className="lesson-type">प्रश्न {index+1} / {questions.length}{!isTest&&` • +${points} XP`}</span><h2>{current.q}</h2><div className="options-grid">{current.options.map((option,i)=><button key={`${option}-${i}`} disabled={selected!==null} className={`answer-option pressable ${selected!==null?(i===current.answer?'correct':i===selected?'wrong':'muted'):''}`} onClick={()=>choose(i)}>{String.fromCharCode(65+i)}. {option}</button>)}</div>{selected!==null&&<div className={`answer-feedback ${selected===current.answer?'good':'bad'}`}><strong>{selected===current.answer?'✓ सही उत्तर':'✗ गलत उत्तर'}</strong><p>{current.explain}</p></div>}<div className="question-actions"><span>{selected===null?'उत्तर चुनें':`स्कोर: ${score}/${index+1}`}</span><button className="primary-btn pressable" onClick={next}>{index===questions.length-1?'परिणाम देखें':'अगला प्रश्न →'}</button></div></div></section></main>
}
