import React,{useEffect,useMemo,useState} from 'react';
import {HindiGenericLearn} from './HindiGenericLearn';
import {HindiLearnNavigator} from './HindiLearnNavigator';
import {markHindiModeCompleted} from './hindiChapterProgress';

const modeNames={learn:'सीखें',practice:'अभ्यास',challenge:'चुनौती',test:'टेस्ट'};

function normalizeQuestions(source,mode){
  const count=mode==='practice'?15:mode==='challenge'?12:20;
  return (Array.isArray(source)?source:[]).slice(0,count).map(item=>({...item,options:[...(item.options||[])],answer:Number.isInteger(Number(item.answer))?Number(item.answer):0})).filter(item=>item.options.length>0&&item.answer>=0&&item.answer<item.options.length);
}

function Assessment({lesson,id,questions,mode,onBack,onComplete}){
  const list=useMemo(()=>normalizeQuestions(questions,mode),[questions,mode]);
  const [index,setIndex]=useState(0);
  const [answers,setAnswers]=useState({});
  const [submitted,setSubmitted]=useState(false);
  const [seconds,setSeconds]=useState(mode==='test'?180:null);
  useEffect(()=>{if(mode!=='test'||submitted)return;const timer=setInterval(()=>setSeconds(v=>Math.max(0,v-1)),1000);return()=>clearInterval(timer)},[mode,submitted]);
  useEffect(()=>{if(mode==='test'&&seconds===0&&!submitted)setSubmitted(true)},[seconds,mode,submitted]);
  useEffect(()=>{if(submitted&&id)markHindiModeCompleted(id,mode)},[submitted,id,mode]);
  if(!list.length)return <div className="hindi-empty"><h3>इस मोड में सामग्री उपलब्ध नहीं है।</h3><button type="button" className="primary-btn pressable" onClick={onBack}>← वापस</button></div>;
  const q=list[index];
  const score=list.reduce((sum,item,i)=>sum+(answers[i]===item.answer?1:0),0);
  if(submitted)return <div className="hindi-assessment hindi-result"><div className="hindi-score"><span>{mode==='test'?'🎯':'✅'}</span><strong>{score}/{list.length}</strong><small>सही उत्तर</small><p>{score===list.length?'बहुत बढ़िया!':score>=Math.ceil(list.length*.7)?'अच्छी तैयारी है—अब कठिन प्रश्न दोहराएँ।':'समीक्षा पढ़ें और फिर से अभ्यास करें।'}</p></div><div className="hindi-review"><h3>हर प्रश्न की समीक्षा</h3>{list.map((item,i)=><article className={`hindi-review-item ${answers[i]===item.answer?'ok':'wrong'}`} key={`${item.q}-${i}`}><div className="hindi-review-num">{i+1}</div><div><strong>{item.q}</strong><p><b>आपका उत्तर:</b> {answers[i]!=null?item.options[answers[i]]:'उत्तर नहीं दिया'}</p><p><b>सही उत्तर:</b> {item.options[item.answer]}</p><span>{item.explain||'सही उत्तर पाठ की मुख्य अवधारणा से जुड़ा है।'}</span></div></article>)}</div><div className="hindi-actions"><button type="button" className="secondary-btn pressable" onClick={onBack}>← अध्याय पर लौटें</button><button type="button" className="primary-btn pressable" onClick={()=>{setSubmitted(false);setIndex(0);setAnswers({});if(mode==='test')setSeconds(180)}}>↻ फिर से दें</button></div></div>;
  return <div className="hindi-assessment"><div className="hindi-assessment-top"><button type="button" className="secondary-btn pressable" onClick={onBack}>← छोड़ें</button><span>{modeNames[mode]}</span>{mode==='test'&&<strong>⏱ {Math.floor(seconds/60)}:{String(seconds%60).padStart(2,'0')}</strong>}</div><div className="hindi-q-progress"><span style={{width:`${Math.round(((index+1)/list.length)*100)}%`}}/></div><small>प्रश्न {index+1} / {list.length}</small><section className="hindi-question"><h2>{q.q}</h2><div>{q.options.map((option,i)=><button type="button" key={`${option}-${i}`} className={`hindi-option pressable ${answers[index]===i?'selected':''}`} onClick={()=>setAnswers(state=>({...state,[index]:i}))}><b>{String.fromCharCode(65+i)}</b><span>{option}</span></button>)}</div><button type="button" className="primary-btn pressable" disabled={answers[index]==null} onClick={()=>index===list.length-1?setSubmitted(true):setIndex(v=>v+1)}>{index===list.length-1?'परिणाम देखें':'अगला →'}</button></section></div>;
}

export function HindiChapterStudyView({lesson,id,practice,challenge,test,onBack,onComplete}){
  const [mode,setMode]=useState('learn');
  const data=mode==='practice'?practice:mode==='challenge'?challenge:test;
  const complete=completedMode=>{onComplete?.(completedMode);markHindiModeCompleted(id,completedMode)};
  if(mode==='learn')return <HindiLearnNavigator lesson={lesson}><HindiGenericLearn lesson={lesson} onBack={onBack} onModeComplete={()=>complete('learn')}/></HindiLearnNavigator>;
  return <div className="hindi-learn hindi-chapter1-learn"><div className="hindi-learn-banner"><span>{lesson.eyebrow||'गोधूली भाग 1 · काव्य'}</span><h2>{lesson.title}</h2><p>{lesson.intro||lesson.overview}</p>{lesson.author&&<div className="hindi-topic-author">✦ {lesson.author}</div>}</div><div className="hindi-mode-switch"><button type="button" className={mode==='practice'?'active':''} onClick={()=>setMode('practice')}>📝 अभ्यास</button><button type="button" className={mode==='challenge'?'active':''} onClick={()=>setMode('challenge')}>🔥 चुनौती</button><button type="button" className={mode==='test'?'active':''} onClick={()=>setMode('test')}>🎯 टेस्ट</button></div><Assessment lesson={lesson} id={id} questions={data} mode={mode} onBack={()=>setMode('learn')} onComplete={onComplete}/></div>;
}
