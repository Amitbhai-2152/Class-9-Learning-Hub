import React,{useEffect,useState} from 'react';
import {ScienceChapter1Engine2 as ScienceChapter1Core} from './ScienceChapter1EngineCore';
import {scienceChapter1Learning} from './scienceChapter1Learning';
import {ScienceLearnView} from './ScienceLearnView';
import './science-engine.css';

function CoreAssessment({mode,chapter,onBack,addXp,finishSession}){
  const [ready,setReady]=useState(false);
  useEffect(()=>{
    const timer=setTimeout(()=>{
      const root=document.querySelector('[data-science-ch1-core]');
      const labels={practice:'अभ्यास',challenge:'चुनौती',test:'टेस्ट'};
      const button=root&&[...root.querySelectorAll('button')].find(node=>node.textContent.trim().includes(labels[mode]));
      if(button)button.click();
      setReady(true);
    },40);
    return()=>clearTimeout(timer);
  },[mode]);
  return <div className={`sc3-core-assessment ${ready?'is-ready':''}`} data-science-ch1-core><ScienceChapter1Core chapter={chapter} onBack={onBack} addXp={addXp} finishSession={finishSession}/></div>;
}

export function ScienceChapter1Engine2({chapter='हमारे आसपास के पदार्थ',onBack,addXp,finishSession}){
  const [mode,setMode]=useState(null);
  if(mode==='learn')return <ScienceLearnView chapter={chapter} chapterNumber="1" title="हमारे आसपास के पदार्थ" lessons={scienceChapter1Learning.lessons} onBack={()=>setMode(null)} addXp={addXp} finishSession={finishSession} completeIcon="🔬"/>;
  if(mode)return <CoreAssessment mode={mode} chapter={chapter} onBack={()=>setMode(null)} addXp={addXp} finishSession={finishSession}/>;
  return <main className="page science-chapter-page"><header className="page-header science-header"><button className="pressable" onClick={onBack}>← विषय</button><div className="badge">विज्ञान • अध्याय 1</div><h1>{chapter}</h1><p>पहले सीखें, फिर अभ्यास, चुनौती और टेस्ट से अपनी समझ मजबूत करें।</p></header><section className="page-content"><div className="science-launch"><div className="science-launch-art"><div className="science-orbit"/><div className="science-flask">⚗</div><span className="science-bubble b1"/><span className="science-bubble b2"/><span className="science-bubble b3"/></div><div><span className="science-kicker">अध्याय यात्रा</span><h2>देखकर समझें, फिर स्वयं समझाएँ</h2><p>पदार्थ के कण, उनकी गति, अवस्थाएँ और अवस्था परिवर्तन को कदम-दर-कदम समझें।</p></div></div><div className="science-mode-grid"><button className="mode-card pressable" onClick={()=>setMode('learn')}><span>📖</span><strong>सीखें</strong><small>{scienceChapter1Learning.lessons.length} सीखने के चरण</small><b>शुरू करें →</b></button><button className="mode-card pressable" onClick={()=>setMode('practice')}><span>📝</span><strong>अभ्यास</strong><small>अध्याय के प्रश्न</small><b>अभ्यास करें →</b></button><button className="mode-card pressable" onClick={()=>setMode('challenge')}><span>🔥</span><strong>चुनौती</strong><small>कठिन प्रश्न</small><b>चुनौती लें →</b></button><button className="mode-card pressable" onClick={()=>setMode('test')}><span>🎯</span><strong>टेस्ट</strong><small>परीक्षण मोड</small><b>टेस्ट दें →</b></button></div></section></main>;
}

export default ScienceChapter1Engine2;
