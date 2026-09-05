import React,{useEffect,useMemo,useState} from 'react';
import {HindiGenericLearn} from './HindiGenericLearn';
import {HindiLearnNavigator} from './HindiLearnNavigator';
import {markHindiModeCompleted} from './hindiChapterProgress';
import './hindi-gadhya-study.css';

const modeMeta={
  learn:{icon:'📖',label:'सीखें',kicker:'पाठ को समझें',hint:'विचार, प्रसंग और भाषा को क्रम से समझें'},
  practice:{icon:'📝',label:'अभ्यास',kicker:'समझ को पक्का करें',hint:'हर प्रश्न पर सोचें और जरूरत हो तो वापस आएँ'},
  challenge:{icon:'🔥',label:'चुनौती',kicker:'गहरी सोच जाँचें',hint:'कारण, संबंध और लेखक की दृष्टि पर ध्यान दें'},
  test:{icon:'🎯',label:'टेस्ट',kicker:'अंतिम परीक्षा',hint:'समयबद्ध तरीके से अपनी तैयारी जाँचें'}
};

function normalizeQuestions(source,mode){
  const count=mode==='practice'?15:mode==='challenge'?12:20;
  return (Array.isArray(source)?source:[]).slice(0,count).map(item=>({...item,options:[...(item.options||[])],answer:Number.isInteger(Number(item.answer))?Number(item.answer):0})).filter(item=>item.options.length>=2&&item.answer>=0&&item.answer<item.options.length);
}

function QuestionPalette({list,index,answers,onSelect,mode}){
  const attempted=Object.keys(answers).length;
  return <section className={`hindi-question-palette hindi-question-palette-${mode}`} aria-label={`${modeMeta[mode].label} प्रश्न नेविगेशन`}>
    <div className="hindi-question-palette-head"><div><span className="hindi-palette-kicker">QUESTION MAP</span><strong>प्रश्न नेविगेशन</strong><small>किसी भी प्रश्न पर सीधे जाएँ · उत्तर दिए प्रश्न चिन्हित हैं</small></div><span>{attempted}/{list.length} हल</span></div>
    <div className="hindi-question-palette-grid">{list.map((_,i)=><button key={i} type="button" className={`hindi-question-jump ${i===index?'active':''} ${answers[i]!=null?'answered':''}`} onClick={()=>onSelect(i)} aria-label={`प्रश्न ${i+1}${answers[i]!=null?' हल किया हुआ':''}`}><span>{i+1}</span>{answers[i]!=null&&<i>✓</i>}</button>)}</div>
    <div className="hindi-palette-legend"><span><i className="current"/>वर्तमान</span><span><i className="done"/>हल किया</span><span><i className="pending"/>बाकी</span></div>
  </section>;
}

function AssessmentHeader({mode,index,total,answered,seconds}){
  const meta=modeMeta[mode];
  return <>
    <div className={`hindi-assessment-header hindi-assessment-header-${mode}`}>
      <div className="hindi-assessment-identity"><span className="hindi-assessment-icon">{meta.icon}</span><div><span className="hindi-assessment-kicker">{meta.kicker}</span><strong>{meta.label}</strong><small>{meta.hint}</small></div></div>
      <div className="hindi-assessment-metrics"><span><b>{index+1}</b> / {total}<small>प्रश्न</small></span><span><b>{answered}</b> / {total}<small>हल</small></span>{mode==='test'&&<span className="hindi-exam-clock">⏱ <b>{Math.floor(seconds/60)}:{String(seconds%60).padStart(2,'0')}</b><small>समय बाकी</small></span>}</div>
    </div>
    <div className="hindi-q-progress"><span style={{width:`${Math.round(((index+1)/total)*100)}%`}}/></div>
  </>;
}

function AssessmentIntro({mode,total}){
  const meta=modeMeta[mode];
  if(mode==='practice')return <div className="hindi-assessment-brief"><span>{meta.icon}</span><div><strong>अभ्यास रणनीति</strong><p>{total} प्रश्न हैं। प्रश्न-पैलेट से आगे-पीछे जा सकते हैं; उत्तर बदलकर दोबारा सोच सकते हैं।</p></div></div>;
  if(mode==='challenge')return <div className="hindi-assessment-brief hindi-assessment-brief-challenge"><span>{meta.icon}</span><div><strong>चुनौती नियम</strong><p>केवल याद करने के बजाय कारण, पात्र, प्रसंग और लेखक की दृष्टि जोड़कर उत्तर चुनें। पहले सोचें, फिर विकल्प देखें।</p></div></div>;
  return <div className="hindi-assessment-brief hindi-assessment-brief-test"><span>{meta.icon}</span><div><strong>टेस्ट निर्देश</strong><p>20 प्रश्न · 5 मिनट। जरूरत हो तो किसी प्रश्न को unanswered छोड़कर आगे बढ़ें; अंत में question map से वापस आ सकते हैं।</p></div></div>;
}

function ResultSummary({score,attempted,total,mode}){
  const accuracy=attempted?Math.round((score/attempted)*100):0;
  return <div className={`hindi-result-summary hindi-result-summary-${mode}`}><div><span>सही</span><strong>{score}</strong></div><div><span>Attempt</span><strong>{attempted}</strong></div><div><span>बाकी</span><strong>{total-attempted}</strong></div><div><span>Accuracy</span><strong>{accuracy}%</strong></div></div>;
}

function Assessment({id,questions,mode,onBack,onComplete}){
  const list=useMemo(()=>normalizeQuestions(questions,mode),[questions,mode]);
  const [index,setIndex]=useState(0);
  const [answers,setAnswers]=useState({});
  const [submitted,setSubmitted]=useState(false);
  const [confirmSubmit,setConfirmSubmit]=useState(false);
  const [seconds,setSeconds]=useState(mode==='test'?300:null);
  useEffect(()=>{setIndex(0);setAnswers({});setSubmitted(false);setConfirmSubmit(false);setSeconds(mode==='test'?300:null)},[mode,questions]);
  useEffect(()=>{if(mode!=='test'||submitted)return;const timer=setInterval(()=>setSeconds(v=>Math.max(0,v-1)),1000);return()=>clearInterval(timer)},[mode,submitted]);
  useEffect(()=>{if(mode==='test'&&seconds===0&&!submitted)setSubmitted(true)},[seconds,mode,submitted]);
  useEffect(()=>{if(submitted&&id){markHindiModeCompleted(id,mode);onComplete?.(mode)}},[submitted,id,mode,onComplete]);
  if(!list.length)return <div className="hindi-empty"><h3>इस मोड में सामग्री उपलब्ध नहीं है।</h3><button type="button" className="primary-btn pressable" onClick={onBack}>← वापस</button></div>;
  const q=list[index];
  const score=list.reduce((sum,item,i)=>sum+(answers[i]===item.answer?1:0),0);
  const attempted=Object.keys(answers).length;
  if(submitted)return <div className={`hindi-assessment hindi-result hindi-result-${mode}`}>
    <div className="hindi-result-hero"><span>{modeMeta[mode].icon}</span><div><small>{modeMeta[mode].label} पूरा</small><strong>{score}/{list.length}</strong><p>{mode==='test'?'यह आपका अंतिम टेस्ट परिणाम है। नीचे हर प्रश्न की समीक्षा और explanation देखें।':mode==='challenge'?'चुनौती पूरी हुई। गलतियों से पहचानिए कि कहाँ reasoning मजबूत करनी है।':'अभ्यास पूरा हुआ। गलत प्रश्नों के कारण को देखकर दोहराएँ।'}</p></div></div>
    <ResultSummary score={score} attempted={attempted} total={list.length} mode={mode}/>
    <div className="hindi-review"><div className="hindi-review-head"><div><span className="hindi-palette-kicker">DETAILED REVIEW</span><h3>हर प्रश्न की समीक्षा</h3></div><span>{attempted}/{list.length} प्रश्न attempt</span></div>{list.map((item,i)=><article className={`hindi-review-item ${answers[i]===item.answer?'ok':'wrong'}`} key={`${item.q}-${i}`}><div className="hindi-review-num">{i+1}</div><div><strong>{item.q}</strong><p><b>आपका उत्तर:</b> {answers[i]!=null?item.options[answers[i]]:'उत्तर नहीं दिया'}</p><p><b>सही उत्तर:</b> {item.options[item.answer]}</p><span>{item.explain||'सही उत्तर पाठ की मुख्य अवधारणा से जुड़ा है।'}</span></div></article>)}</div>
    <div className="hindi-actions"><button type="button" className="secondary-btn pressable" onClick={()=>{setSubmitted(false);setConfirmSubmit(false);setIndex(0);setAnswers({});if(mode==='test')setSeconds(300)}}>↻ फिर से दें</button><button type="button" className="primary-btn pressable" onClick={onBack}>← अध्याय पर लौटें</button></div>
  </div>;
  const canSubmit=mode==='test'||attempted>0;
  return <div className={`hindi-assessment hindi-assessment-${mode}`}>
    <AssessmentHeader mode={mode} index={index} total={list.length} answered={attempted} seconds={seconds}/>
    <AssessmentIntro mode={mode} total={list.length}/>
    <QuestionPalette list={list} index={index} answers={answers} onSelect={setIndex} mode={mode}/>
    <div className="hindi-question-meta"><small>वर्तमान · प्रश्न {index+1} / {list.length}</small><span>{mode==='practice'?'अभ्यास · 15 प्रश्न':mode==='challenge'?'चुनौती · 12 प्रश्न':'अंतिम टेस्ट · 20 प्रश्न'}</span></div>
    <section className="hindi-question">
      <div className="hindi-question-label"><span>{mode==='practice'?'अभ्यास प्रश्न':mode==='challenge'?'चुनौती प्रश्न':'परीक्षा प्रश्न'}</span><b>Q{String(index+1).padStart(2,'0')}</b></div>
      <h2>{q.q}</h2>
      <p className="hindi-question-tip">{mode==='practice'?'पहले अपना उत्तर चुनें। जरूरत हो तो ऊपर प्रश्न-मानचित्र से वापस आएँ।':mode==='challenge'?'संकेत: मुख्य विचार और कारण-परिणाम का संबंध खोजें।':'एक विकल्प चुनें। टेस्ट में बिना उत्तर दिए प्रश्न बाद में भी हल किए जा सकते हैं।'}</p>
      <div className="hindi-options">{q.options.map((option,i)=><button type="button" key={`${option}-${i}`} className={`hindi-option pressable ${answers[index]===i?'selected':''}`} onClick={()=>setAnswers(state=>({...state,[index]:i}))}><b>{String.fromCharCode(65+i)}</b><span>{option}</span><i>{answers[index]===i?'✓':''}</i></button>)}</div>
      <div className="hindi-question-actions"><button type="button" className="secondary-btn pressable" disabled={index===0} onClick={()=>setIndex(v=>Math.max(0,v-1))}>← पिछला</button><div className="hindi-question-action-right">{index<list.length-1&&<button type="button" className="primary-btn pressable" onClick={()=>setIndex(v=>v+1)}>{answers[index]==null?'आगे बढ़ें →':'अगला प्रश्न →'}</button>}{index===list.length-1&&<button type="button" className="primary-btn pressable" disabled={!canSubmit} onClick={()=>setConfirmSubmit(true)}>जमा करें ✓</button>}</div></div>
    </section>
    {confirmSubmit&&<div className="hindi-submit-confirm" role="dialog" aria-modal="true"><div><span>🎯</span><strong>{mode==='test'?'टेस्ट जमा करना है?':'अभ्यास समाप्त करना है?'}</strong><p>{attempted}/{list.length} प्रश्न attempt हैं। {list.length-attempted>0?`${list.length-attempted} प्रश्न अभी unanswered हैं।`:'सभी प्रश्न attempt हो चुके हैं।'}</p><div><button type="button" className="secondary-btn pressable" onClick={()=>setConfirmSubmit(false)}>वापस</button><button type="button" className="primary-btn pressable" onClick={()=>{setConfirmSubmit(false);setSubmitted(true)}}>हाँ, जमा करें</button></div></div></div>}
  </div>;
}

export function HindiChapterStudyView({lesson,id,practice,challenge,test,onBack,onComplete,learnComponent:LearnComponent=HindiGenericLearn,initialMode='learn',wrapLearnNavigator=true}){
  const safeInitial=['learn','practice','challenge','test'].includes(initialMode)?initialMode:'learn';
  const [mode,setMode]=useState(safeInitial);
  useEffect(()=>setMode(safeInitial),[id,safeInitial]);
  const tabs=['learn','practice','challenge','test'];
  const complete=completedMode=>{markHindiModeCompleted(id,completedMode);onComplete?.(completedMode)};
  const exitChapter=()=>{window.scrollTo({top:0,left:0,behavior:'auto'});onBack?.()};
  return <div className="hindi-learn hindi-chapter1-learn hindi-unified-study hindi-gadhya-study">
    <div className="hindi-study-top"><div className="hindi-study-title"><span>कक्षा 9 • हिन्दी • गद्य खंड</span><h2>{lesson?.title}</h2><p>{lesson?.intro||lesson?.overview}</p>{lesson?.author&&<div className="hindi-topic-author">✦ {lesson.author}</div>}</div><button type="button" className="secondary-btn pressable hindi-study-back" onClick={exitChapter} aria-label="गद्य अध्याय सूची पर वापस जाएँ">← गद्य अध्याय सूची</button></div>
    <nav className="hindi-mode-switch hindi-gadhya-mode-switch" aria-label="अध्याय अध्ययन मोड">{tabs.map(name=><button key={name} type="button" className={`hindi-mode-tab hindi-mode-tab-${name} ${mode===name?'active':''}`} onClick={()=>setMode(name)}><span>{modeMeta[name].icon}</span><div><strong>{modeMeta[name].label}</strong><small>{modeMeta[name].kicker}</small></div><em>{modeMeta[name].hint}</em></button>)}</nav>
    {mode==='learn'?(wrapLearnNavigator?<HindiLearnNavigator lesson={lesson}><LearnComponent lesson={lesson} onBack={exitChapter} onModeComplete={complete}/></HindiLearnNavigator>:<LearnComponent lesson={lesson} onBack={exitChapter} onModeComplete={complete}/>):<Assessment id={id} questions={mode==='practice'?practice:mode==='challenge'?challenge:test} mode={mode} onBack={()=>setMode('learn')} onComplete={complete}/>} 
  </div>;
}
