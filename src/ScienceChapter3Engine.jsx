import React,{useEffect,useState} from 'react';
import {scienceChapter3Learning} from './scienceChapter3Learning';
import {ScienceChapter3Engine as ScienceChapter3Core} from './ScienceChapter3EngineFixed';
import './science3-learn.css';

const typeLabel={intro:'परिचय',concept:'अवधारणा',example:'उदाहरण',check:'त्वरित जाँच',compare:'तुलना'};

function SafeLessonVisual({visual,title}){
  if(!visual)return null;
  const items=Array.isArray(visual.items)?visual.items:[];
  return <div className="sc3-safe-visual" aria-label={`दृश्य: ${title}`}>
    <div className="sc3-visual-grid">
      <span className="sc3-visual-kicker">अध्याय दृश्य</span>
      <strong>{visual.title||title}</strong>
      <div className="sc3-visual-items">{items.map((item,index)=><div className="sc3-visual-item" key={`${item}-${index}`}><b>{index+1}</b><span>{item}</span></div>)}</div>
    </div>
  </div>;
}

function LearnView({chapter,onBack,addXp,finishSession}){
  const lessons=scienceChapter3Learning.lessons;
  const [index,setIndex]=useState(0);
  const [answers,setAnswers]=useState({});
  const [completed,setCompleted]=useState(false);
  const item=lessons[index];
  const selected=answers[index];
  const percent=Math.round(((index+1)/lessons.length)*100);
  const choose=value=>{if(selected===undefined)setAnswers(prev=>({...prev,[index]:value}));};
  const goTo=nextIndex=>{
    const bounded=Math.max(0,Math.min(lessons.length-1,nextIndex));
    setIndex(bounded);
    window.scrollTo({top:0,left:0,behavior:'auto'});
  };
  const next=()=>{
    if(item.question&&selected===undefined)return;
    if(index<lessons.length-1){goTo(index+1);return;}
    if(completed)return;
    setCompleted(true);
    const correct=lessons.reduce((n,x,i)=>n+(x.question&&Number(answers[i])===Number(x.answer)?1:0),0);
    addXp?.(20);
    finishSession?.({subject:'विज्ञान',chapter,mode:'learn',attempted:lessons.filter(x=>x.question).length,correct,completed:true,at:Date.now()});
    window.scrollTo({top:0,left:0,behavior:'auto'});
  };
  useEffect(()=>{window.scrollTo({top:0,left:0,behavior:'auto'});},[]);

  if(completed)return <main className="page sc3-learn-page"><nav className="sc3-learn-nav"><button className="pressable" onClick={onBack}>← अध्याय</button><div className="sc3-nav-title"><strong>{chapter}</strong><span>सीखना पूरा</span></div></nav><section className="sc3-learn-hero"><span className="eyebrow">विज्ञान • अध्याय 3</span><h1>अध्याय पूरा हुआ 🎉</h1><p>आपने सभी {lessons.length} सीखने के चरण पूरे किए।</p></section><section className="sc3-learn-layout"><div className="sc3-learn-main-only"><div className="sc3-learn-complete"><div className="icon">⚛️</div><h2>बहुत बढ़िया!</h2><p>अब अभ्यास में अपनी समझ को और मजबूत करें।</p><button className="primary-btn pressable" onClick={onBack}>अध्याय पर लौटें →</button></div></div></section></main>;

  return <main className="page sc3-learn-page">
    <nav className="sc3-learn-nav">
      <button className="pressable" onClick={onBack}>← अध्याय</button>
      <div className="sc3-nav-title"><strong>{chapter}</strong><span>📖 सीखें</span></div>
      <div className="sc3-nav-progress" style={{'--sc3-progress':`${percent}%`}}><div><span>चरण {index+1}/{lessons.length}</span><span>{percent}%</span></div><i/></div>
    </nav>
    <section className="sc3-learn-hero"><span className="eyebrow">विज्ञान • अध्याय 3</span><h1>परमाणु एवं अणु</h1><p>चयनित विषय को पढ़ें, दृश्य देखें और समझ जाँचें।</p></section>
    <section className="sc3-learn-layout">
      <aside className="sc3-contents" aria-label="अध्याय सूची">
        <div className="sc3-contents-head"><strong>अध्याय सूची</strong><span>{lessons.length} सीखने के चरण</span></div>
        <div className="sc3-contents-list">
          {lessons.map((lesson,i)=><button type="button" className={`pressable ${i===index?'is-active':''}`} key={`${lesson.title}-${i}`} onClick={()=>goTo(i)} aria-current={i===index?'page':undefined}><span className="sc3-num">{i+1}</span><span className="sc3-copy"><strong>{lesson.title}</strong><small>{typeLabel[lesson.type]||'पाठ'}</small></span></button>)}
        </div>
      </aside>
      <article className="sc3-lesson">
        <div className="sc3-lesson-meta"><span className="sc3-lesson-type">{typeLabel[item.type]||'पाठ'}</span><span>चरण {index+1} / {lessons.length}</span></div>
        <h2>{item.title}</h2>
        <p className="sc3-lesson-body">{item.body}</p>
        <SafeLessonVisual visual={item.visual} title={item.title}/>
        {item.points&&<ul className="sc3-points">{item.points.map(point=><li key={point}>{point}</li>)}</ul>}
        {item.question&&<div className="sc3-check"><strong>🎯 त्वरित जाँच</strong><p>{item.question}</p>{item.options.map((option,i)=><button type="button" disabled={selected!==undefined} className={`pressable ${selected!==undefined&&i===item.answer?'correct':''} ${selected===i&&i!==item.answer?'wrong':''}`} key={option} onClick={()=>choose(i)}><span>{String.fromCharCode(65+i)}</span>{option}</button>)}{selected!==undefined&&<div className={`sc3-feedback ${selected===item.answer?'good':'bad'}`}><strong>{selected===item.answer?'✓ बिल्कुल सही':'✗ उत्तर समझें'}</strong><p>{item.explain}</p></div>}</div>}
        <div className="sc3-lesson-actions"><button className="secondary-btn pressable" onClick={onBack}>बाद में</button><div className="sc3-next-group"><button className="secondary-btn pressable" disabled={index===0} onClick={()=>goTo(index-1)}>← पिछला</button><button className="primary-btn pressable" disabled={Boolean(item.question&&selected===undefined)} onClick={next}>{index===lessons.length-1?'अध्याय पूरा करें':'अगला →'}</button></div></div>
      </article>
    </section>
  </main>;
}

function CoreAssessment({mode,chapter,onBack,addXp,finishSession}){
  const [ready,setReady]=useState(false);
  useEffect(()=>{
    const timer=setTimeout(()=>{
      const root=document.querySelector('[data-sc3-core]');
      const labels={practice:'अभ्यास',challenge:'चुनौती',test:'टेस्ट'};
      const button=root&&[...root.querySelectorAll('button')].find(node=>node.textContent.trim().includes(labels[mode]));
      if(button)button.click();
      setReady(true);
    },40);
    return()=>clearTimeout(timer);
  },[mode]);
  return <div className={`sc3-core-assessment ${ready?'is-ready':''}`} data-sc3-core><ScienceChapter3Core chapter={chapter} onBack={onBack} addXp={addXp} finishSession={finishSession}/></div>;
}

export function ScienceChapter3Engine({chapter='परमाणु एवं अणु',onBack,addXp,finishSession}){
  const [mode,setMode]=useState(null);
  if(mode==='learn')return <LearnView chapter={chapter} onBack={()=>setMode(null)} addXp={addXp} finishSession={finishSession}/>;
  if(mode)return <CoreAssessment mode={mode} chapter={chapter} onBack={()=>setMode(null)} addXp={addXp} finishSession={finishSession}/>;
  return <main className="page science-chapter-page"><header className="page-header"><button className="pressable" onClick={onBack}>← विषय</button><div className="badge">विज्ञान • अध्याय 3</div><h1>{chapter}</h1><p>पहले अध्याय को सीखें, फिर अभ्यास, चुनौती और टेस्ट से अपनी समझ परखें।</p></header><section className="page-content"><div className="chapter-hero-card"><span>⚛️</span><div><strong>परमाणु और अणु की यात्रा</strong><small>कण → संकेत → सूत्र → नियम → अनुपात</small></div></div><div className="mode-grid"><button className="mode-card pressable" onClick={()=>setMode('learn')}><span className="mode-icon">📖</span><strong>सीखें</strong><span>{scienceChapter3Learning.lessons.length} सीखने के चरण</span><em>अवधारणाएँ समझें →</em></button><button className="mode-card pressable" onClick={()=>setMode('practice')}><span className="mode-icon">📝</span><strong>अभ्यास</strong><span>15 प्रश्न</span><em>अभ्यास शुरू करें →</em></button><button className="mode-card pressable" onClick={()=>setMode('challenge')}><span className="mode-icon">🔥</span><strong>चुनौती</strong><span>10 कठिन प्रश्न</span><em>चुनौती लें →</em></button><button className="mode-card pressable" onClick={()=>setMode('test')}><span className="mode-icon">🎯</span><strong>टेस्ट</strong><span>20 प्रश्न</span><em>टेस्ट दें →</em></button></div></section></main>;
}

export default ScienceChapter3Engine;
