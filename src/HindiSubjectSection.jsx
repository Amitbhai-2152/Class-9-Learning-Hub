import React from 'react';
import {hindiAllTopics} from './hindiChapterData';

const groups=[
  ['गद्य खंड','गोधूली · गद्य'],
  ['काव्य खंड','गोधूली · काव्य'],
  ['वर्णिका भाग 1','वर्णिका · पूरक'],
  ['व्याकरण एवं रचना','व्याकरण एवं रचना']
];

const modes=[
  ['learn','📖 सीखें'],['practice','📝 अभ्यास'],['challenge','🔥 चुनौती'],['test','🎯 टेस्ट']
];

export function HindiSubjectSection({open}){
  return <div className="hindi-subject-section">
    <div className="hindi-section-intro">
      <span>कक्षा 9 • बिहार बोर्ड हिन्दी</span>
      <h2>हिन्दी को समझें, सिर्फ याद न करें।</h2>
      <p>गद्य, काव्य, वर्णिका और व्याकरण को एक ही study flow में पढ़ें। हर पाठ के लिए सीखें, अभ्यास करें, चुनौती लें और समयबद्ध टेस्ट दें।</p>
      <div className="hindi-section-stats"><b>{hindiAllTopics.filter(x=>x.book?.startsWith('गोधूली')).length} गोधूली पाठ</b><b>{hindiAllTopics.filter(x=>x.book==='वर्णिका · पूरक').length} वर्णिका पाठ</b><b>{hindiAllTopics.filter(x=>x.book==='व्याकरण एवं रचना').length} भाषा विषय</b></div>
    </div>
    {groups.map(([title,book])=>{
      const items=hindiAllTopics.filter(x=>x.book===book);
      return <section className="hindi-topic-group" key={book}>
        <div className="hindi-group-heading"><div><span>अध्ययन खंड</span><h3>{title}</h3></div><b>{items.length} विषय</b></div>
        <div className="hindi-topic-grid">{items.map((topic,index)=><article className="hindi-topic-card" key={topic.id||topic.title}>
          <div className="hindi-topic-top"><span>{String(index+1).padStart(2,'0')}</span><em>{topic.type||'पाठ'}</em></div>
          <h4>{topic.title}</h4>
          <p>{topic.theme||topic.summary}</p>
          <div className="hindi-topic-tags">{(topic.focus||topic.skills||[]).slice(0,3).map(x=><span key={x}>{x}</span>)}</div>
          <div className="hindi-topic-actions">{modes.map(([mode,label])=><button key={mode} className="hindi-topic-action pressable" onClick={()=>open(topic.title,mode)}>{label}</button>)}</div>
        </article>)}</div>
      </section>
    })}
  </div>;
}
