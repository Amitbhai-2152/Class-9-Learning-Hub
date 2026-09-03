import React from 'react';
import {hindiChapter11Lesson} from './hindiChapter11Engine';

export function HindiChapter11Learn({onBack,onModeComplete}){
  const lesson=hindiChapter11Lesson;
  return <div className="hindi-learn hindi-chapter1-learn">
    <div className="hindi-learn-banner"><span>{lesson.eyebrow}</span><h2>{lesson.title}</h2><p>{lesson.intro}</p><div className="hindi-topic-author">✦ {lesson.author}</div></div>
    <div className="hindi-ch1-callout"><strong>केंद्रीय बात</strong><p>{lesson.overview}</p></div>
    <div className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>👤 लेखक परिचय</h3><span>कहानी की दृष्टि समझें</span></div><p>{lesson.authorNote}</p></div>
    <div className="hindi-learn-grid">{lesson.sections.map(item=><section key={item.title}><h3>{item.title}</h3><p>{item.body}</p></section>)}</div>
    <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>⚖️ परिवर्तन की तुलना</h3><span>पुराना गाँव · बदला गाँव · लीलावती की दृष्टि</span></div><div className="hindi-ch1-two-col">{lesson.comparison.map(([title,nature,origin,style])=><article key={title}><strong>{title}</strong><p><b>दृष्टि:</b> {nature}</p><p><b>आधार:</b> {origin}</p><p><b>प्रभाव:</b> {style}</p></article>)}</div></section>
    <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>🎯 मुख्य themes</h3><span>दीर्घ उत्तरों में जोड़ें</span></div><div className="hindi-ch1-chip-grid">{lesson.themes.map(x=><span key={x}>{x}</span>)}</div></section>
    <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>🖊️ साहित्यिक उपकरण</h3><span>कहानी की शैली समझें</span></div><div className="hindi-ch1-two-col">{lesson.literaryTools.map(([title,body])=><article key={title}><strong>{title}</strong><p>{body}</p></article>)}</div></section>
    <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>📚 शब्द-संग्रह</h3><span>मुख्य शब्द पहले पक्के करें</span></div><div className="hindi-ch1-glossary">{lesson.glossary.map(([word,meaning])=><article key={word}><strong>{word}</strong><p>{meaning}</p></article>)}</div></section>
    <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>✍️ उत्तर बनाने के templates</h3><span>लघु और दीर्घ उत्तर की दिशा</span></div><div className="hindi-ch1-frameworks">{lesson.answerFrameworks.map(([question,template])=><article key={question}><strong>{question}</strong><p>{template}</p></article>)}</div></section>
    <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>✅ परीक्षा checklist</h3><span>Final test से पहले</span></div><ul>{lesson.examChecklist.map(x=><li key={x}>{x}</li>)}</ul></section>
    <div className="hindi-actions"><button type="button" className="secondary-btn pressable" onClick={onBack}>← पीछे</button><button type="button" className="primary-btn pressable" onClick={()=>onModeComplete?.('learn')}>✓ सीखना पूरा करें • +20 XP</button></div>
  </div>;
}
