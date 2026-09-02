import React,{useEffect,useState} from 'react';
import {ScienceChapter4Engine as ScienceChapter4Core} from './ScienceChapter4EngineCore';
import {scienceChapter4Learning} from './scienceChapter4Learning';
import {ScienceChapter4Visual} from './ScienceChapter4Visual';
import {ScienceLearnView} from './ScienceLearnView';
import './scienceChapter4.css';

const visualKind=type=>({atomStructure:'atomStructure',electron:'electron',proton:'proton',neutron:'neutron',thomson:'thomson',scattering:'scattering',problem:'problem',bohr:'bohr',jump:'jump',shells:'shells',configuration:'configuration',atomicNumber:'atomicNumber',massNumber:'massNumber',calculation:'calculation',isotopes:'isotopes'}[type]||'atomStructure');

function CoreAssessment({mode,onBack,addXp,finishSession,chapter}){
  return <div className="sc3-core-assessment is-ready" data-science-ch4-core><ScienceChapter4Core chapter={chapter} onBack={onBack} addXp={addXp} finishSession={finishSession} initialMode={mode}/></div>;
}

export function ScienceChapter4Engine({chapter='परमाणु की संरचना',onBack,addXp,finishSession}){
  const [mode,setMode]=useState(null);
  const renderVisual=item=>item.visual?<ScienceChapter4Visual kind={visualKind(item.visual.type)}/>:null;
  if(mode==='learn')return <ScienceLearnView chapter={chapter} chapterNumber="4" title="परमाणु की संरचना" lessons={scienceChapter4Learning.lessons} onBack={()=>setMode(null)} addXp={addXp} finishSession={finishSession} renderVisual={renderVisual} completeIcon="⚛️"/>;
  if(mode)return <CoreAssessment mode={mode} chapter={chapter} onBack={()=>setMode(null)} addXp={addXp} finishSession={finishSession}/>;
  return <main className="page science-chapter-page">
    <header className="page-header science-header">
      <button className="pressable" onClick={onBack}>← विषय</button>
      <div className="badge">कक्षा 9 • विज्ञान • अध्याय 4</div>
      <h1>{chapter}</h1>
      <p>पहले समझें, फिर अभ्यास और परीक्षण से अपनी समझ पक्की करें।</p>
    </header>
    <section className="page-content">
      <div className="science-launch">
        <div className="science-launch-art" aria-hidden="true"><div className="science-orbit"/><div className="science-flask">⚛</div><span className="science-bubble b1"/><span className="science-bubble b2"/><span className="science-bubble b3"/></div>
        <div>
          <span className="science-kicker">अध्याय 4 • अध्ययन मानचित्र</span>
          <h2>परमाणु को अंदर से समझें</h2>
          <p>इस अध्याय में कणों की पहचान से शुरू करके परमाणु मॉडल, ऊर्जा स्तर, इलेक्ट्रॉनिक विन्यास और Z तथा A के संबंध तक क्रमबद्ध समझ विकसित करें।</p>
          <div className="science4-focus-grid" aria-label="अध्याय के मुख्य अध्ययन क्षेत्र">
            <span>उप-परमाण्विक कण</span><span>परमाणु मॉडल</span><span>ऊर्जा स्तर</span><span>इलेक्ट्रॉनिक विन्यास</span><span>परमाणु क्रमांक</span><span>समस्थानिक</span>
          </div>
        </div>
      </div>
      <div className="science-mode-grid">
        <button className="mode-card pressable" onClick={()=>setMode('learn')}><span>📖</span><strong>सीखें</strong><small>{scienceChapter4Learning.lessons.length} सीखने के चरण</small><b>शुरू करें →</b></button>
        <button className="mode-card pressable" onClick={()=>setMode('practice')}><span>📝</span><strong>अभ्यास</strong><small>15 प्रश्न</small><b>अभ्यास करें →</b></button>
        <button className="mode-card pressable" onClick={()=>setMode('challenge')}><span>🔥</span><strong>चुनौती</strong><small>12 कठिन प्रश्न</small><b>चुनौती लें →</b></button>
        <button className="mode-card pressable" onClick={()=>setMode('test')}><span>🎯</span><strong>टेस्ट</strong><small>20 प्रश्न</small><b>टेस्ट दें →</b></button>
      </div>
    </section>
  </main>;
}

export default ScienceChapter4Engine;
