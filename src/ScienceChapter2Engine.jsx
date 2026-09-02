import React,{useState} from 'react';
import {ScienceChapter2Engine as ScienceChapter2Core} from './ScienceChapter2EngineCore';
import {scienceChapter2Learning} from './scienceChapter2Learning';
import {ScienceLearnView} from './ScienceLearnView';
import './science-engine.css';

function CoreAssessment({mode,chapter,onBack,addXp,finishSession}){
  return <div className="sc3-core-assessment"><ScienceChapter2Core initialMode={mode} chapter={chapter} onBack={onBack} addXp={addXp} finishSession={finishSession}/></div>;
}

export function ScienceChapter2Engine({chapter='क्या हमारे आसपास के पदार्थ शुद्ध हैं?',onBack,addXp,finishSession}){
  const [mode,setMode]=useState(null);
  if(mode==='learn')return <ScienceLearnView chapter={chapter} chapterNumber="2" title="क्या हमारे आसपास के पदार्थ शुद्ध हैं?" lessons={scienceChapter2Learning.lessons} onBack={()=>setMode(null)} addXp={addXp} finishSession={finishSession} completeIcon="🧪"/>;
  if(mode)return <CoreAssessment mode={mode} chapter={chapter} onBack={()=>setMode(null)} addXp={addXp} finishSession={finishSession}/>;
  return <main className="page science-chapter-page"><header className="page-header science-header"><button className="pressable" onClick={onBack}>← विषय</button><div className="badge">विज्ञान • अध्याय 2</div><h1>{chapter}</h1><p>मिश्रण, शुद्ध पदार्थ, विलयन और पृथक्करण की विधियों को पहले सीखें, फिर अभ्यास करें।</p></header><section className="page-content"><div className="science-launch"><div className="science-launch-art"><div className="science-orbit"/><div className="science-flask">⚗</div><span className="science-bubble b1"/><span className="science-bubble b2"/><span className="science-bubble b3"/></div><div><span className="science-kicker">अध्याय यात्रा</span><h2>मिलाएँ, पहचानें और अलग करें</h2><p>शुद्ध पदार्थ और मिश्रण के अंतर से लेकर विलयन, निलंबन और पृथक्करण की विधियों तक चरण-दर-चरण सीखें।</p></div></div><div className="science-mode-grid"><button className="mode-card pressable" onClick={()=>setMode('learn')}><span>📖</span><strong>सीखें</strong><small>{scienceChapter2Learning.lessons.length} सीखने के चरण</small><b>शुरू करें →</b></button><button className="mode-card pressable" onClick={()=>setMode('practice')}><span>📝</span><strong>अभ्यास</strong><small>अध्याय के प्रश्न</small><b>अभ्यास करें →</b></button><button className="mode-card pressable" onClick={()=>setMode('challenge')}><span>🔥</span><strong>चुनौती</strong><small>कठिन प्रश्न</small><b>चुनौती लें →</b></button><button className="mode-card pressable" onClick={()=>setMode('test')}><span>🎯</span><strong>टेस्ट</strong><small>परीक्षण मोड</small><b>टेस्ट दें →</b></button></div></section></main>;
}

export default ScienceChapter2Engine;
