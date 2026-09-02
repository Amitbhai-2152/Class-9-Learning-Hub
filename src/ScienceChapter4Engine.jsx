import React,{useEffect,useState} from 'react';
import {ScienceChapter4Engine as ScienceChapter4Core} from './ScienceChapter4EngineCore';
import {scienceChapter4Learning} from './scienceChapter4Learning';
import {ScienceChapter4Visual} from './ScienceChapter4Visual';
import {ScienceChapterShell} from './ScienceChapterShell';
import './scienceChapter4.css';
import './science-chapter-sidebar.css';

const visualKind=type=>({atomStructure:'atomStructure',electron:'electron',proton:'proton',neutron:'neutron',thomson:'thomson',scattering:'scattering',problem:'problem',bohr:'bohr',jump:'jump',shells:'shells',configuration:'configuration',atomicNumber:'atomicNumber',massNumber:'massNumber',calculation:'calculation',isotopes:'isotopes'}[type]||'atomStructure');

function LearnView({chapter,onBack,addXp,finishSession}){
  const [index,setIndex]=useState(0);
  const [answers,setAnswers]=useState({});
  const [completed,setCompleted]=useState(false);
  const lessons=scienceChapter4Learning.lessons;
  const item=lessons[index];
  const selected=answers[index];
  const percent=Math.round(((index+1)/lessons.length)*100);
  const choose=value=>{if(selected===undefined)setAnswers(prev=>({...prev,[index]:value}));};
  const next=()=>{
    if(item.question&&selected===undefined)return;
    if(index<lessons.length-1){setIndex(i=>i+1);return;}
    if(completed)return;
    setCompleted(true);
    const correct=lessons.reduce((n,x,i)=>n+(x.question&&Number(answers[i])===Number(x.answer)?1:0),0);
    addXp?.(20);
    finishSession?.({subject:'विज्ञान',chapter,mode:'learn',attempted:lessons.filter(x=>x.question).length,correct,completed:true,at:Date.now()});
  };
  if(completed)return <main className="page science-learn-page"><header className="page-header"><button className="pressable" onClick={onBack}>← अध्याय</button><div className="badge">सीखना पूरा</div><h1>अध्याय पूरा हुआ 🎉</h1><p>अब अभ्यास से अपनी समझ और मजबूत करें।</p></header><section className="page-content"><div className="science-complete"><div className="science-complete-icon">⚛️</div><h2>बहुत बढ़िया!</h2><p>{lessons.length} सीखने के चरण पूरे हुए।</p><button className="primary-btn pressable" onClick={onBack}>अध्याय पर लौटें →</button></div></section></main>;
  return <main className="page science-learn-page">
    <header className="page-header"><button className="pressable" onClick={onBack}>← अध्याय</button><div className="lesson-top"><span className="badge">विज्ञान • {chapter}</span><span>{index+1} / {lessons.length}</span></div><h1>📖 सीखें</h1><p>अवधारणा → दृश्य → उदाहरण → त्वरित जाँच</p><div className="quiz-progress"><span style={{width:`${percent}%`}}/></div></header>
    <section className="page-content"><article className="lesson-card"><span className="lesson-type">{item.type==='intro'?'अध्याय की शुरुआत':item.type==='concept'?'अवधारणा':item.type==='example'?'उदाहरण':'त्वरित जाँच'}</span><h2>{item.title}</h2><p className="lesson-body">{item.body}</p>{item.visual&&<ScienceChapter4Visual kind={visualKind(item.visual.type)}/>} {item.points&&<ul className="science-points">{item.points.map(point=><li key={point}>{point}</li>)}</ul>}{item.question&&<div className="science-check"><strong>🎯 त्वरित जाँच</strong><p>{item.question}</p>{item.options.map((option,i)=><button key={option} type="button" disabled={selected!==undefined} className={`answer-option pressable ${selected!==undefined&&i===item.answer?'correct':''} ${selected===i&&i!==item.answer?'wrong':''}`} onClick={()=>choose(i)}><span>{String.fromCharCode(65+i)}</span>{option}</button>)}{selected!==undefined&&<div className={`science-feedback ${selected===item.answer?'good':'bad'}`}><strong>{selected===item.answer?'✓ बिल्कुल सही':'✗ उत्तर समझें'}</strong><p>{item.explain}</p></div>}</div>}<div className="lesson-actions"><button className="secondary-btn pressable" onClick={onBack}>बाद में</button><button className="primary-btn pressable" disabled={Boolean(item.question&&selected===undefined)} onClick={next}>{index===lessons.length-1?'अध्याय पूरा करें':'आगे बढ़ें →'}</button></div></article></section>
  </main>;
}

function CoreAssessment({mode,onBack,addXp,finishSession,chapter}){
  const [ready,setReady]=useState(false);
  useEffect(()=>{
    const id=setTimeout(()=>{
      const root=document.querySelector('[data-science-core-assessment]');
      const labels={practice:'अभ्यास',challenge:'चुनौती',test:'टेस्ट'};
      const button=root&&[...root.querySelectorAll('button')].find(el=>el.textContent.trim().includes(labels[mode]));
      if(button){button.click();setReady(true);} else setReady(true);
    },80);
    return()=>clearTimeout(id);
  },[mode]);
  return <div className={`science-core-assessment ${ready?'is-ready':''}`} data-science-core-assessment><ScienceChapter4Core chapter={chapter} onBack={onBack} addXp={addXp} finishSession={finishSession}/></div>;
}

export function ScienceChapter4Engine({chapter='परमाणु की संरचना',onBack,addXp,finishSession}){
  const [mode,setMode]=useState(null);
  if(mode==='learn')return <ScienceChapterShell lessons={scienceChapter4Learning.lessons} title="अध्याय सूची"><LearnView chapter={chapter} onBack={()=>setMode(null)} addXp={addXp} finishSession={finishSession}/></ScienceChapterShell>;
  if(mode)return <CoreAssessment mode={mode} chapter={chapter} onBack={onBack} addXp={addXp} finishSession={finishSession}/>;
  return <main className="page science-chapter-page"><header className="page-header science-header"><button className="pressable" onClick={onBack}>← विषय</button><div className="badge">कक्षा 9 • विज्ञान • अध्याय 4</div><h1>{chapter}</h1><p>पहले पढ़ें, फिर अभ्यास करके परमाणु की संरचना को मजबूत करें।</p></header><section className="page-content"><div className="science-launch"><div className="science-launch-art"><div className="science-orbit"/><div className="science-flask">⚛</div><span className="science-bubble b1"/><span className="science-bubble b2"/><span className="science-bubble b3"/></div><div><span className="science-kicker">अध्याय यात्रा</span><h2>परमाणु को अंदर से समझें</h2><p>उप-परमाण्विक कण, परमाणु मॉडल, कोश, इलेक्ट्रॉनिक विन्यास और Z-A संबंध कदम-दर-कदम सीखें।</p></div></div><div className="science-mode-grid"><button className="mode-card pressable" onClick={()=>setMode('learn')}><span>📖</span><strong>सीखें</strong><small>{scienceChapter4Learning.lessons.length} सीखने के चरण</small><b>शुरू करें →</b></button><button className="mode-card pressable" onClick={()=>setMode('practice')}><span>📝</span><strong>अभ्यास</strong><small>15 प्रश्न</small><b>अभ्यास करें →</b></button><button className="mode-card pressable" onClick={()=>setMode('challenge')}><span>🔥</span><strong>चुनौती</strong><small>12 कठिन प्रश्न</small><b>चुनौती लें →</b></button><button className="mode-card pressable" onClick={()=>setMode('test')}><span>🎯</span><strong>टेस्ट</strong><small>20 प्रश्न</small><b>टेस्ट दें →</b></button></div></section></main>;
}

export default ScienceChapter4Engine;
