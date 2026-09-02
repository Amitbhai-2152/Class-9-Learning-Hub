import React,{useEffect,useState} from 'react';
import {ScienceChapter4Engine as ScienceChapter4Core} from './ScienceChapter4EngineCore';
import {scienceChapter4Learning} from './scienceChapter4Learning';
import {ScienceChapter4Visual} from './ScienceChapter4Visual';
import {ScienceLearnView} from './ScienceLearnView';
import './scienceChapter4.css';

const visualKind=type=>({atomStructure:'atomStructure',electron:'electron',proton:'proton',neutron:'neutron',thomson:'thomson',scattering:'scattering',problem:'problem',bohr:'bohr',jump:'jump',shells:'shells',configuration:'configuration',atomicNumber:'atomicNumber',massNumber:'massNumber',calculation:'calculation',isotopes:'isotopes'}[type]||'atomStructure');

function CoreAssessment({mode,onBack,addXp,finishSession,chapter}){
  const [ready,setReady]=useState(false);
  useEffect(()=>{
    const id=setTimeout(()=>{
      const root=document.querySelector('[data-science-ch4-core]');
      const labels={practice:'अभ्यास',challenge:'चुनौती',test:'टेस्ट'};
      const button=root&&[...root.querySelectorAll('button')].find(el=>el.textContent.trim().includes(labels[mode]));
      if(button)button.click();
      setReady(true);
    },40);
    return()=>clearTimeout(id);
  },[mode]);
  return <div className={`sc3-core-assessment ${ready?'is-ready':''}`} data-science-ch4-core><ScienceChapter4Core chapter={chapter} onBack={onBack} addXp={addXp} finishSession={finishSession}/></div>;
}

export function ScienceChapter4Engine({chapter='परमाणु की संरचना',onBack,addXp,finishSession}){
  const [mode,setMode]=useState(null);
  const renderVisual=item=>item.visual?<ScienceChapter4Visual kind={visualKind(item.visual.type)}/>:null;
  if(mode==='learn')return <ScienceLearnView chapter={chapter} chapterNumber="4" title="परमाणु की संरचना" lessons={scienceChapter4Learning.lessons} onBack={()=>setMode(null)} addXp={addXp} finishSession={finishSession} renderVisual={renderVisual} completeIcon="⚛️"/>;
  if(mode)return <CoreAssessment mode={mode} chapter={chapter} onBack={()=>setMode(null)} addXp={addXp} finishSession={finishSession}/>;
  return <main className="page science-chapter-page"><header className="page-header science-header"><button className="pressable" onClick={onBack}>← विषय</button><div className="badge">कक्षा 9 • विज्ञान • अध्याय 4</div><h1>{chapter}</h1><p>पहले पढ़ें, फिर अभ्यास करके परमाणु की संरचना को मजबूत करें।</p></header><section className="page-content"><div className="science-launch"><div className="science-launch-art"><div className="science-orbit"/><div className="science-flask">⚛</div><span className="science-bubble b1"/><span className="science-bubble b2"/><span className="science-bubble b3"/></div><div><span className="science-kicker">अध्याय यात्रा</span><h2>परमाणु को अंदर से समझें</h2><p>उप-परमाण्विक कण, परमाणु मॉडल, कोश, इलेक्ट्रॉनिक विन्यास और Z-A संबंध कदम-दर-कदम सीखें।</p></div></div><div className="science-mode-grid"><button className="mode-card pressable" onClick={()=>setMode('learn')}><span>📖</span><strong>सीखें</strong><small>{scienceChapter4Learning.lessons.length} सीखने के चरण</small><b>शुरू करें →</b></button><button className="mode-card pressable" onClick={()=>setMode('practice')}><span>📝</span><strong>अभ्यास</strong><small>15 प्रश्न</small><b>अभ्यास करें →</b></button><button className="mode-card pressable" onClick={()=>setMode('challenge')}><span>🔥</span><strong>चुनौती</strong><small>12 कठिन प्रश्न</small><b>चुनौती लें →</b></button><button className="mode-card pressable" onClick={()=>setMode('test')}><span>🎯</span><strong>टेस्ट</strong><small>20 प्रश्न</small><b>टेस्ट दें →</b></button></div></section></main>;
}

export default ScienceChapter4Engine;
