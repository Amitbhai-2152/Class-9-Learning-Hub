import React from 'react';
import {hindiAllTopics} from './hindiChapterData';

const primaryGroups=[
  ['गद्य','गोधूली · गद्य','📚'],
  ['काव्य','गोधूली · काव्य','🎵']
];

const supportGroups=[
  ['वर्णिका भाग 1','वर्णिका · पूरक','📘'],
  ['व्याकरण एवं रचना','व्याकरण एवं रचना','✍️']
];

const modes=[
  ['learn','📖','सीखें','पाठ को समझें'],
  ['practice','📝','अभ्यास','सीखी बात पक्की करें'],
  ['challenge','🔥','चुनौती','अपनी तैयारी परखें'],
  ['test','🎯','टेस्ट','समयबद्ध टेस्ट दें']
];

function TopicCard({topic,index,open,kind}){
  return <article className={`hindi-topic-card ${kind==='poetry'?'is-poetry':''}`}>
    <div className="hindi-topic-top">
      <span className="hindi-topic-number">{String(index+1).padStart(2,'0')}</span>
      <span className="hindi-topic-type">{topic.type||'पाठ'}</span>
    </div>
    <div className="hindi-topic-title-row">
      <h4>{topic.title}</h4>
      <span className="hindi-topic-arrow">↗</span>
    </div>
    {topic.author && <div className="hindi-topic-author">✦ {topic.author}</div>}
    <p>{topic.theme||topic.summary}</p>
    <div className="hindi-topic-tags">
      {(topic.focus||topic.skills||[]).slice(0,3).map(x=><span key={x}>{x}</span>)}
    </div>
    <div className="hindi-topic-actions">
      {modes.map(([mode,icon,label,help])=><button key={mode} type="button" className={`hindi-topic-action hindi-mode-${mode} pressable`} onClick={()=>open(topic.title,mode)} title={help}>
        <span>{icon}</span><b>{label}</b>
      </button>)}
    </div>
  </article>;
}

function TopicGroup({title,book,icon,open,indexOffset=0,support=false}){
  const items=hindiAllTopics.filter(x=>x.book===book);
  return <section className={`hindi-topic-group ${support?'hindi-support-group':''}`}>
    <div className="hindi-group-heading">
      <div className="hindi-group-title">
        <span className="hindi-group-icon">{icon}</span>
        <div><span>{support?'अतिरिक्त अभ्यास':'गोधूली भाग 1'}</span><h3>{title}</h3></div>
      </div>
      <b>{items.length} {support?'विषय':'पाठ'}</b>
    </div>
    <div className="hindi-topic-grid">
      {items.map((topic,index)=><TopicCard key={topic.id||topic.title} topic={topic} index={index+indexOffset} open={open} kind={title==='काव्य'?'poetry':'prose'} />)}
    </div>
  </section>;
}

export function HindiSubjectSection({open}){
  const godhuliCount=hindiAllTopics.filter(x=>x.book?.startsWith('गोधूली')).length;
  const proseCount=hindiAllTopics.filter(x=>x.book==='गोधूली · गद्य').length;
  const poetryCount=hindiAllTopics.filter(x=>x.book==='गोधूली · काव्य').length;
  return <div className="hindi-subject-section">
    <div className="hindi-section-intro">
      <div className="hindi-intro-badge">कक्षा 9 • बिहार बोर्ड हिन्दी</div>
      <div className="hindi-intro-layout">
        <div className="hindi-intro-copy">
          <div className="hindi-book-kicker">📕 मुख्य पाठ्यपुस्तक</div>
          <h2>गोधूली भाग 1</h2>
          <p>गद्य और काव्य को एक साफ study flow में पढ़ें। हर पाठ के लिए सीखें, अभ्यास करें, चुनौती लें और अंत में टेस्ट देकर अपनी तैयारी जाँचें।</p>
        </div>
        <div className="hindi-intro-stats">
          <div><strong>{godhuliCount}</strong><span>कुल पाठ</span></div>
          <div><strong>{proseCount}</strong><span>गद्य</span></div>
          <div><strong>{poetryCount}</strong><span>काव्य</span></div>
        </div>
      </div>
      <div className="hindi-study-flow" aria-label="अध्ययन क्रम">
        <span><i>1</i> पढ़ें</span><em>→</em><span><i>2</i> समझें</span><em>→</em><span><i>3</i> अभ्यास</span><em>→</em><span><i>4</i> टेस्ट</span>
      </div>
    </div>

    <div className="hindi-book-section-head">
      <div><span>मुख्य पुस्तक</span><h3>गोधूली भाग 1 के पाठ</h3></div>
      <p>{godhuliCount} पाठ • सीखना → अभ्यास → चुनौती → टेस्ट</p>
    </div>

    {primaryGroups.map(([title,book,icon])=><TopicGroup key={book} title={title} book={book} icon={icon} open={open} />)}

    <div className="hindi-support-divider">
      <div><span>सहायक तैयारी</span><h3>अतिरिक्त भाषा और पुनरावृत्ति</h3></div>
      <p>मुख्य गोधूली भाग 1 के बाद अतिरिक्त अभ्यास के लिए।</p>
    </div>
    {supportGroups.map(([title,book,icon])=><TopicGroup key={book} title={title} book={book} icon={icon} open={open} support />)}
  </div>;
}
