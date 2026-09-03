import React from 'react';
import {hindiChapter8Lesson} from './hindiChapter8Engine';

export function HindiChapter8Learn({onBack,onModeComplete}){
  const lesson=hindiChapter8Lesson;
  return <div className="hindi-learn hindi-chapter1-learn">
    <div className="hindi-learn-banner"><span>{lesson.eyebrow}</span><h2>{lesson.title}</h2><p>{lesson.intro}</p><div className="hindi-topic-author">✦ {lesson.author}</div></div>
    <div className="hindi-ch1-callout"><strong>केंद्रीय बात</strong><p>{lesson.overview}</p></div>
    <div className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>👤 लेखक परिचय</h3><span>पाठ की दृष्टि समझें</span></div><p>{lesson.authorNote}</p></div>
    <div className="hindi-learn-grid">{lesson.sections.map(item=><section key={item.title}><h3>{item.title}</h3><p>{item.body}</p></section>)}</div>
    <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>💧 जल-बुद्धि का नक्शा</h3><span>समस्या → उपाय → सीख</span></div><div className="hindi-ch1-story-map">{lesson.waterWisdom.map(([title,body],i)=><article key={title}><b>{i+1}</b><div><strong>{title}</strong><p>{body}</p></div></article>)}</div></section>
    <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>🎯 मुख्य themes</h3><span>दीर्घ उत्तरों में जोड़ें</span></div><div className="hindi-ch1-chip-grid">{lesson.themes.map(x=><span key={x}>{x}</span>)}</div></section>
    <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>🖊️ भाषा और साहित्यिक उपकरण</h3><span>फीचर की शैली पकड़ें</span></div><div className="hindi-ch1-two-col">{lesson.literaryTools.map(([title,body])=><article key={title}><strong>{title}</strong><p>{body}</p></article>)}</div></section>
    <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>📚 शब्द-संग्रह</h3><span>मुख्य शब्द पहले पक्के करें</span></div><div className="hindi-ch1-glossary">{lesson.glossary.map(([word,meaning])=><article key={word}><strong>{word}</strong><p>{meaning}</p></article>)}</div></section>
    <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>✍️ उत्तर बनाने के templates</h3><span>लघु, दीर्घ और आशय-प्रश्न</span></div><div className="hindi-ch1-frameworks">{lesson.answerFrameworks.map(([question,template])=><article key={question}><strong>{question}</strong><p>{template}</p></article>)}</div></section>
    <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>✅ परीक्षा checklist</h3><span>Final test से पहले</span></div><ul>{lesson.examChecklist.map(x=><li key={x}>{x}</li>)}</ul></section>
    <div className="hindi-actions"><button type="button" className="secondary-btn pressable" onClick={onBack}>← पीछे</button><button type="button" className="primary-btn pressable" onClick={()=>onModeComplete?.('learn')}>✓ सीखना पूरा करें • +20 XP</button></div>
  </div>;
}
