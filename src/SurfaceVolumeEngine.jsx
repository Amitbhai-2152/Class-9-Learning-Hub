import React,{useMemo,useState} from 'react';
import {chapter13Practice} from './chapter13Practice';

const challenge=[
 {q:'एक घन की किनारी 6 cm से बढ़ाकर 12 cm कर दी गई। नया आयतन पुराने आयतन का कितने गुना होगा?',options:['2 गुना','4 गुना','6 गुना','8 गुना'],answer:3,explain:'आयतन a³ पर निर्भर करता है। (12/6)³=2³=8, इसलिए नया आयतन 8 गुना है।'},
 {q:'एक बेलन और एक शंकु की त्रिज्या तथा ऊँचाई समान हैं। यदि बेलन का आयतन 150π cm³ है, तो शंकु का आयतन कितना होगा?',options:['25π cm³','50π cm³','75π cm³','150π cm³'],answer:1,explain:'समान आधार और ऊँचाई पर शंकु का आयतन बेलन के आयतन का एक-तिहाई होता है। 150π÷3=50π cm³।'},
 {q:'एक बेलन का व्यास 14 cm और ऊँचाई 10 cm है। π=22/7 लेने पर उसका वक्र पृष्ठीय क्षेत्रफल कितना होगा?',options:['220 cm²','440 cm²','616 cm²','748 cm²'],answer:1,explain:'r=7 cm। 2πrh=2×22/7×7×10=440 cm²।'},
 {q:'किसी ठोस को पिघलाकर 8 समान छोटे घनों में बाँटा गया। यदि छोटे प्रत्येक घन की किनारी 3 cm है, तो मूल ठोस का कुल आयतन कितना था?',options:['27 cm³','72 cm³','216 cm³','512 cm³'],answer:2,explain:'एक छोटे घन का आयतन 3³=27 cm³। आठ घनों का कुल आयतन 8×27=216 cm³ होगा।'},
 {q:'एक शंकु में r=5 cm और h=12 cm है। उसकी तिर्यक ऊँचाई और वक्र पृष्ठीय क्षेत्रफल का सही युग्म क्या है?',options:['13 cm और 65π cm²','12 cm और 60π cm²','17 cm और 85π cm²','13 cm और 30π cm²'],answer:0,explain:'l=√(5²+12²)=13 cm। वक्र पृष्ठीय क्षेत्रफल=πrl=5×13π=65π cm²।'}
];

function shuffle(list){const a=[...list];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}

export function SurfaceVolumeEngine({chapter,mode,onBack,addXp}){
 const isTest=mode==='test';
 const questions=useMemo(()=>isTest?shuffle(chapter13Practice).slice(0,15):mode==='challenge'?challenge:chapter13Practice,[mode,isTest]);
 const [index,setIndex]=useState(0),[selected,setSelected]=useState(null),[score,setScore]=useState(0),[done,setDone]=useState(false),[earned,setEarned]=useState(0);
 const current=questions[index];
 const points=mode==='challenge'?25:15;
 const choose=i=>{if(selected!==null||!current)return;setSelected(i);if(i===current.answer){setScore(s=>s+1);if(!isTest){setEarned(e=>e+points);addXp?.(points)}}};
 const next=()=>{if(selected===null||!current)return;if(index===questions.length-1)setDone(true);else{setIndex(i=>i+1);setSelected(null)}};
 if(done)return <main className="page"><header className="page-header"><button className="pressable" onClick={onBack}>← अध्याय</button><div className="badge">पृष्ठीय क्षेत्रफल एवं आयतन • परिणाम</div><h1>{isTest?'🎯 टेस्ट परिणाम':mode==='challenge'?'🔥 चुनौती पूरी':'📝 अभ्यास पूरा'}</h1></header><section className="page-content"><div className="result-card"><div className="result-score">{score}<small> / {questions.length}</small></div><div className="result-percent">{Math.round(score/questions.length*100)}% सही</div><h2>{score===questions.length?'शानदार! 🎉':score>=questions.length*.7?'बहुत अच्छा! 💪':'अभी और अभ्यास करें 📚'}</h2><p>{isTest?'टेस्ट पूरा हुआ।':'आपने '+earned+' XP कमाए।'}</p><div className="result-actions"><button className="secondary-btn pressable" onClick={()=>{setIndex(0);setSelected(null);setScore(0);setDone(false);setEarned(0)}}>फिर से करें</button><button className="primary-btn pressable" onClick={onBack}>अध्याय पर जाएँ →</button></div></div></section></main>;
 return <main className="page"><header className="page-header"><button className="pressable" onClick={onBack}>← अध्याय</button><div className="lesson-top"><span className="badge">गणित • पृष्ठीय क्षेत्रफल एवं आयतन</span><span>{index+1} / {questions.length}</span></div><h1>{isTest?'🎯 समयबद्ध टेस्ट':mode==='challenge'?'🔥 चुनौती':'📝 अभ्यास'}</h1><div className="lesson-progress"><span style={{width:`${((index+1)/questions.length)*100}%`}}/></div></header><section className="page-content"><div className="question-card"><span className="lesson-type">प्रश्न {index+1} / {questions.length}{!isTest&&` • +${points} XP`}</span><h2>{current.q}</h2><div className="options-grid">{current.options.map((option,i)=><button key={`${option}-${i}`} disabled={selected!==null} className={`answer-option pressable ${selected!==null?(i===current.answer?'correct':i===selected?'wrong':'muted'):''}`} onClick={()=>choose(i)}>{String.fromCharCode(65+i)}. {option}</button>)}</div>{selected!==null&&<div className={`answer-feedback ${selected===current.answer?'good':'bad'}`}><strong>{selected===current.answer?'✓ सही उत्तर':'✗ गलत उत्तर'}</strong><p>{current.explain}</p></div>}<div className="question-actions"><span>{selected===null?'उत्तर चुनें':`स्कोर: ${score}/${index+1}`}</span><button className="primary-btn pressable" onClick={next}>{index===questions.length-1?'परिणाम देखें':'अगला प्रश्न →'}</button></div></div></section></main>;
}
