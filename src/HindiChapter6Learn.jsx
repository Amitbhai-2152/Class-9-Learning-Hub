import React,{useState} from 'react';
import {ChapterContents} from './ChapterContents';
import {hindiChapter6Lesson} from './hindiChapter6Engine';
import './hindi-chapter6.css';

export function HindiChapter6Learn({onBack,onModeComplete}){
 const [activeIndex,setActiveIndex]=useState(0);
 const lesson=hindiChapter6Lesson;
 return <div className="hindi-learn hindi-chapter1-learn">
  <div className="hindi-learn-banner"><span>{lesson.eyebrow}</span><h2>{lesson.title}</h2><p>{lesson.intro}</p><div className="hindi-topic-author">✦ {lesson.author}</div></div>
  <div className="hindi-chapter6-layout">
   <aside className="hindi-chapter6-outline"><ChapterContents lessons={lesson.sections} title={lesson.title} compact={true} activeIndex={activeIndex} onSelect={setActiveIndex}/></aside>
   <main className="hindi-chapter6-main">
    <div className="hindi-ch1-callout"><strong>केंद्रीय बात</strong><p>{lesson.overview}</p></div>
    <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>👤 लेखक परिचय</h3><span>पाठ की दृष्टि समझें</span></div><p>{lesson.authorNote}</p></section>
    <div className="hindi-learn-grid">{lesson.sections.map((item,i)=><section id={`hindi-ch6-section-${i}`} key={item.title}><h3>{item.title}</h3><p>{item.body}</p></section>)}</div>
    <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>👥 पात्र समझें</h3><span>कौन · भूमिका · क्या सीखें</span></div><div className="hindi-ch1-characters">{lesson.characters.map(([name,role,note])=><article key={name}><strong>{name}</strong><span>{role}</span><p>{note}</p></article>)}</div></section>
    <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>🎯 मुख्य themes</h3><span>दीर्घ उत्तरों में जोड़ें</span></div><div className="hindi-ch1-chip-grid">{lesson.themes.map(x=><span key={x}>{x}</span>)}</div></section>
    <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>🖊️ भाषा और साहित्यिक उपकरण</h3><span>रेखाचित्र की शैली पकड़ें</span></div><div className="hindi-ch1-two-col">{lesson.literaryTools.map(([title,body])=><article key={title}><strong>{title}</strong><p>{body}</p></article>)}</div></section>
    <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>📚 शब्द-संग्रह</h3><span>महत्वपूर्ण शब्दों का अर्थ</span></div><div className="hindi-ch1-glossary">{lesson.glossary.map(([word,meaning])=><article key={word}><strong>{word}</strong><p>{meaning}</p></article>)}</div></section>
    <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>✍️ उत्तर बनाने के templates</h3><span>लघु और दीर्घ उत्तर की दिशा</span></div><div className="hindi-ch1-frameworks">{lesson.answerFrameworks.map(([question,template])=><article key={question}><strong>{question}</strong><p>{template}</p></article>)}</div></section>
    <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>✅ परीक्षा checklist</h3><span>Final test से पहले</span></div><ul>{lesson.examChecklist.map(x=><li key={x}>{x}</li>)}</ul></section>
    <div className="hindi-actions"><button type="button" className="secondary-btn pressable" onClick={onBack}>← पीछे</button><button type="button" className="primary-btn pressable" onClick={()=>onModeComplete?.('learn')}>✓ सीखना पूरा करें • +20 XP</button></div>
   </main>
  </div>
 </div>;
}
