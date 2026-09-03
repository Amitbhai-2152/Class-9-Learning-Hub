import React,{useEffect,useMemo,useState} from 'react';
import {HindiGenericLearn} from './HindiGenericLearn';
import {HindiLearnNavigator} from './HindiLearnNavigator';
import {markHindiModeCompleted} from './hindiChapterProgress';

const modeMeta={
  learn:{icon:'📖',label:'सीखें',hint:'पाठ को समझें, विचार पकड़ें और परीक्षा के लिए तैयार हों',xp:20},
  practice:{icon:'📝',label:'अभ्यास',hint:'सीखी बातों को प्रश्नों में पक्का करें',xp:15},
  challenge:{icon:'🔥',label:'चुनौती',hint:'सोच-वाले कठिन प्रश्नों से अपनी समझ जाँचें',xp:25},
  test:{icon:'🎯',label:'टेस्ट',hint:'समयबद्ध अंतिम जाँच दें',xp:15}
};

function normalizeQuestions(source,mode){
  const count=mode==='practice'?15:mode==='challenge'?12:20;
  return (Array.isArray(source)?source:[]).slice(0,count).map(item=>({...item,options:[...(item.options||[])],answer:Number.isInteger(Number(item.answer))?Number(item.answer):0})).filter(item=>item.options.length>=2&&item.answer>=0&&item.answer<item.options.length);
}

function Assessment({id,questions,mode,onBack,onComplete}){
  const list=useMemo(()=>normalizeQuestions(questions,mode),[questions,mode]);
  const [index,setIndex]=useState(0);
  const [answers,setAnswers]=useState({});
  const [submitted,setSubmitted]=useState(false);
  const [seconds,setSeconds]=useState(mode==='test'?300:null);
  useEffect(()=>{setIndex(0);setAnswers({});setSubmitted(false);setSeconds(mode==='test'?300:null)},[mode,questions]);
  useEffect(()=>{if(mode!=='test'||submitted)return;const timer=setInterval(()=>setSeconds(v=>Math.max(0,v-1)),1000);return()=>clearInterval(timer)},[mode,submitted]);
  useEffect(()=>{if(mode==='test'&&seconds===0&&!submitted)setSubmitted(true)},[seconds,mode,submitted]);
  useEffect(()=>{if(submitted&&id){markHindiModeCompleted(id,mode);onComplete?.(mode)}},[submitted,id,mode,onComplete]);
  if(!list.length)return <div className="hindi-empty"><h3>इस मोड में सामग्री उपलब्ध नहीं है।</h3><button type="button" className="primary-btn pressable" onClick={onBack}>← वापस</button></div>;
  const q=list[index];
  const score=list.reduce((sum,item,i)=>sum+(answers[i]===item.answer?1:0),0);
  const answered=Object.keys(answers).length;
  if(submitted)return <div className="hindi-assessment hindi-result"><div className="hindi-result-hero"><span>{modeMeta[mode].icon}</span><div><small>{modeMeta[mode].label} पूरा</small><strong>{score}/{list.length}</strong><p>{score===list.length?'शानदार! पूरी तरह सही.':score>=Math.ceil(list.length*.7)?'अच्छी तैयारी है। जिन प्रश्नों में गलती हुई उन्हें दोहराएँ।':'समीक्षा पढ़ें, कमजोर बिंदु पहचानें और फिर प्रयास करें।'}</p></div></div><div className="hindi-review"><div className="hindi-review-head"><h3>हर प्रश्न की समीक्षा</h3><span>{answered}/{list.length} प्रश्न attempt</span></div>{list.map((item,i)=><article className={`hindi-review-item ${answers[i]===item.answer?'ok':'wrong'}`} key={`${item.q}-${i}`}><div className="hindi-review-num">{i+1}</div><div><strong>{item.q}</strong><p><b>आपका उत्तर:</b> {answers[i]!=null?item.options[answers[i]]:'उत्तर नहीं दिया'}</p><p><b>सही उत्तर:</b> {item.options[item.answer]}</p><span>{item.explain||'सही उत्तर पाठ की मुख्य अवधारणा से जुड़ा है।'}</span></div></article>)}</div><div className="hindi-actions"><button type="button" className="secondary-btn pressable" onClick={()=>{setSubmitted(false);setIndex(0);setAnswers({});if(mode==='test')setSeconds(300)}}>↻ फिर से दें</button><button type="button" className="primary-btn pressable" onClick={onBack}>← अध्याय पर लौटें</button></div></div>;
  return <div className="hindi-assessment"><div className="hindi-assessment-top"><button type="button" className="secondary-btn pressable" onClick={onBack}>← छोड़ें</button><div className="hindi-assessment-heading"><span>{modeMeta[mode].icon}</span><div><strong>{modeMeta[mode].label}</strong><small>{modeMeta[mode].hint}</small></div></div>{mode==='test'&&<strong className={`hindi-timer ${seconds<=60?'is-low':''}`}>⏱ {Math.floor(seconds/60)}:{String(seconds%60).padStart(2,'0')}</strong>}</div><div className="hindi-q-progress"><span style={{width:`${Math.round(((index+1)/list.length)*100)}%`}}/></div><div className="hindi-question-meta"><small>प्रश्न {index+1} / {list.length}</small><span>{mode==='practice'?'15 प्रश्न':mode==='challenge'?'12 कठिन प्रश्न':'20 अंतिम प्रश्न'}</span></div><section className="hindi-question"><h2>{q.q}</h2><p className="hindi-question-tip">एक विकल्प चुनें। फिर अगला प्रश्न खोलें।</p><div className="hindi-options">{q.options.map((option,i)=><button type="button" key={`${option}-${i}`} className={`hindi-option pressable ${answers[index]===i?'selected':''}`} onClick={()=>setAnswers(state=>({...state,[index]:i}))}><b>{String.fromCharCode(65+i)}</b><span>{option}</span><i>{answers[index]===i?'✓':''}</i></button>)}</div><div className="hindi-question-actions"><button type="button" className="secondary-btn pressable" disabled={index===0} onClick={()=>setIndex(v=>Math.max(0,v-1))}>← पिछला</button><button type="button" className="primary-btn pressable" disabled={answers[index]==null} onClick={()=>index===list.length-1?setSubmitted(true):setIndex(v=>v+1)}>{index===list.length-1?'परिणाम देखें':'अगला प्रश्न →'}</button></div></section></div>;
}

export function HindiChapterStudyView({lesson,id,practice,challenge,test,onBack,onComplete,learnComponent:LearnComponent=HindiGenericLearn,initialMode='learn',wrapLearnNavigator=true}){
  const safeInitial=['learn','practice','challenge','test'].includes(initialMode)?initialMode:'learn';
  const [mode,setMode]=useState(safeInitial);
  useEffect(()=>setMode(safeInitial),[id,safeInitial]);
  const tabs=['learn','practice','challenge','test'];
  const complete=completedMode=>{markHindiModeCompleted(id,completedMode);onComplete?.(completedMode)};
  return <div className="hindi-learn hindi-chapter1-learn hindi-unified-study"><div className="hindi-study-top"><div className="hindi-study-title"><span>कक्षा 9 • हिन्दी</span><h2>{lesson?.title}</h2><p>{lesson?.intro||lesson?.overview}</p>{lesson?.author&&<div className="hindi-topic-author">✦ {lesson.author}</div>}</div><button type="button" className="secondary-btn pressable hindi-study-back" onClick={onBack}>← अध्याय सूची</button></div><nav className="hindi-mode-switch" aria-label="अध्याय अध्ययन मोड">{tabs.map(name=><button key={name} type="button" className={mode===name?'active':''} onClick={()=>setMode(name)}><span>{modeMeta[name].icon}</span><strong>{modeMeta[name].label}</strong><small>{modeMeta[name].hint}</small></button>)}</nav>{mode==='learn'?(wrapLearnNavigator?<HindiLearnNavigator lesson={lesson}><LearnComponent lesson={lesson} onBack={onBack} onModeComplete={complete}/></HindiLearnNavigator>:<LearnComponent lesson={lesson} onBack={onBack} onModeComplete={complete}/>):<Assessment id={id} questions={mode==='practice'?practice:mode==='challenge'?challenge:test} mode={mode} onBack={()=>setMode('learn')} onComplete={onComplete}/>}</div>;
}
