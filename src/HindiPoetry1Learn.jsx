import React,{useState} from 'react';
import {ChapterContents} from './ChapterContents';
import {hindiPoetry1Lesson} from './hindiPoetry1Engine';

export function HindiPoetry1Learn({onBack,onModeComplete}){
 const [activeIndex,setActiveIndex]=useState(0);
 const active=hindiPoetry1Lesson.sections[activeIndex];
 return <div className="hindi-learn hindi-chapter1-learn">
  <div className="hindi-learn-banner"><span>{hindiPoetry1Lesson.eyebrow}</span><h2>{hindiPoetry1Lesson.title}</h2><p>{hindiPoetry1Lesson.intro}</p><div className="hindi-topic-author">✦ {hindiPoetry1Lesson.author}</div></div>
  <div className="hindi-ch1-callout"><strong>केंद्रीय बात</strong><p>{hindiPoetry1Lesson.overview}</p></div>
  <div style={{display:'grid',gridTemplateColumns:'minmax(210px,.34fr) minmax(0,1fr)',gap:'1rem',alignItems:'start'}}>
   <div style={{position:'sticky',top:'1rem'}}><ChapterContents lessons={hindiPoetry1Lesson.sections} title="रैदास के पद · अध्ययन क्रम" compact activeIndex={activeIndex} onSelect={setActiveIndex}/></div>
   <div className="hindi-learn-grid">
    <section><h3>{active.title}</h3><p>{active.body}</p></section>
    <section><h3>🧠 अभी क्या समझा?</h3><p>इस चरण को अगले चरण से जोड़ते हुए सोचें: कवि ने जिस भाव को व्यक्त किया है, वह भक्त और ईश्वर के संबंध को कैसे स्पष्ट करता है?</p></section>
   </div>
  </div>
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>⚖️ प्रमुख उपमाएँ और भाव</h3><span>चित्र → संबंध → संदेश</span></div><div className="hindi-ch1-two-col">{hindiPoetry1Lesson.comparison.map(([title,nature,origin,style])=><article key={title}><strong>{title}</strong><p><b>चित्र:</b> {nature}</p><p><b>संबंध:</b> {origin}</p><p><b>भाव:</b> {style}</p></article>)}</div></section>
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>🎯 मुख्य भाव</h3><span>दीर्घ उत्तरों में काम आने वाले विचार</span></div><div className="hindi-ch1-chip-grid">{hindiPoetry1Lesson.themes.map(x=><span key={x}>{x}</span>)}</div></section>
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>🖊️ काव्य-शिल्प</h3><span>कवि भाव को प्रभावी कैसे बनाते हैं?</span></div><div className="hindi-ch1-two-col">{hindiPoetry1Lesson.literaryTools.map(([title,body])=><article key={title}><strong>{title}</strong><p>{body}</p></article>)}</div></section>
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>📚 शब्द-संग्रह</h3><span>महत्वपूर्ण शब्दों का सरल अर्थ</span></div><div className="hindi-ch1-glossary">{hindiPoetry1Lesson.glossary.map(([word,meaning])=><article key={word}><strong>{word}</strong><p>{meaning}</p></article>)}</div></section>
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>✍️ उत्तर बनाने के ढाँचे</h3><span>भावार्थ और दीर्घ उत्तर</span></div><div className="hindi-ch1-frameworks">{hindiPoetry1Lesson.answerFrameworks.map(([q,template])=><article key={q}><strong>{q}</strong><p>{template}</p></article>)}</div></section>
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>✅ परीक्षा checklist</h3><span>Final test से पहले</span></div><ul>{hindiPoetry1Lesson.examChecklist.map(x=><li key={x}>{x}</li>)}</ul></section>
  <div className="hindi-actions"><button type="button" className="secondary-btn pressable" onClick={onBack}>← पीछे</button><button type="button" className="primary-btn pressable" onClick={()=>onModeComplete?.('learn')}>✓ सीखना पूरा करें • +20 XP</button></div>
 </div>;
}
