import React,{useState} from 'react';
import {ChapterContents} from './ChapterContents';
import {hindiPoetry2Lesson} from './hindiPoetry2Engine';

export function HindiPoetry2Learn({onBack,onModeComplete}){
 const [activeIndex,setActiveIndex]=useState(0);
 const active=hindiPoetry2Lesson.sections[activeIndex];
 return <div className="hindi-learn hindi-chapter1-learn">
  <div className="hindi-learn-banner"><span>{hindiPoetry2Lesson.eyebrow}</span><h2>{hindiPoetry2Lesson.title}</h2><p>{hindiPoetry2Lesson.intro}</p><div className="hindi-topic-author">✦ {hindiPoetry2Lesson.author}</div></div>
  <div className="hindi-ch1-callout"><strong>केंद्रीय बात</strong><p>{hindiPoetry2Lesson.overview}</p></div>
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>👤 कवि परिचय</h3><span>पाठ की पृष्ठभूमि</span></div><p>{hindiPoetry2Lesson.authorNote}</p></section>
  <div style={{display:'grid',gridTemplateColumns:'minmax(210px,.34fr) minmax(0,1fr)',gap:'1rem',alignItems:'start'}}>
   <div style={{position:'sticky',top:'1rem'}}><ChapterContents lessons={hindiPoetry2Lesson.sections} title="मंझन के पद · अध्ययन क्रम" compact activeIndex={activeIndex} onSelect={setActiveIndex}/></div>
   <div className="hindi-learn-grid">
    <section><h3>{active.title}</h3><p>{active.body}</p></section>
    <section><h3>🧠 सोचकर समझें</h3><p>इस विचार को अगले चरण से जोड़ें: कवि ने प्रेम को केवल भावना न मानकर त्याग, धैर्य और आत्म-विजय से क्यों जोड़ा है?</p></section>
   </div>
  </div>
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>⚖️ प्रमुख बिंब और अर्थ</h3><span>चित्र → विचार → संदेश</span></div><div className="hindi-ch1-two-col">{hindiPoetry2Lesson.comparison.map(([title,nature,origin,style])=><article key={title}><strong>{title}</strong><p><b>चित्र:</b> {nature}</p><p><b>अर्थ:</b> {origin}</p><p><b>भाव:</b> {style}</p></article>)}</div></section>
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>🎯 मुख्य भाव</h3><span>दीर्घ उत्तरों में उपयोगी विचार</span></div><div className="hindi-ch1-chip-grid">{hindiPoetry2Lesson.themes.map(x=><span key={x}>{x}</span>)}</div></section>
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>🖊️ काव्य-शिल्प</h3><span>कवि विचारों को प्रभावी कैसे बनाते हैं?</span></div><div className="hindi-ch1-two-col">{hindiPoetry2Lesson.literaryTools.map(([title,body])=><article key={title}><strong>{title}</strong><p>{body}</p></article>)}</div></section>
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>📚 शब्द-संग्रह</h3><span>कठिन शब्दों का सरल अर्थ</span></div><div className="hindi-ch1-glossary">{hindiPoetry2Lesson.glossary.map(([word,meaning])=><article key={word}><strong>{word}</strong><p>{meaning}</p></article>)}</div></section>
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>✍️ उत्तर बनाने के ढाँचे</h3><span>भावार्थ और दीर्घ उत्तर</span></div><div className="hindi-ch1-frameworks">{hindiPoetry2Lesson.answerFrameworks.map(([q,template])=><article key={q}><strong>{q}</strong><p>{template}</p></article>)}</div></section>
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>✅ परीक्षा checklist</h3><span>Final test से पहले</span></div><ul>{hindiPoetry2Lesson.examChecklist.map(x=><li key={x}>{x}</li>)}</ul></section>
  <div className="hindi-actions"><button type="button" className="secondary-btn pressable" onClick={onBack}>← पीछे</button><button type="button" className="primary-btn pressable" onClick={()=>onModeComplete?.('learn')}>✓ सीखना पूरा करें • +20 XP</button></div>
 </div>;
}
