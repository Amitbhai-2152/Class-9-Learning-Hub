import React,{useEffect,useMemo,useState} from 'react';
import {hindiAllTopics} from './hindiChapterData';
import {isHindiChapterCompleted,isHindiModeCompleted} from './hindiChapterProgress';
import './hindi-click-fix.css';

const primaryGroups=[['गद्य','गोधूली · गद्य','📚'],['काव्य','गोधूली · काव्य','🎵']];
const supportGroups=[['वर्णिका भाग 1','वर्णिका · पूरक','📘'],['व्याकरण एवं रचना','व्याकरण एवं रचना','✍️']];
const modes=[['learn','📖','सीखें','पाठ को समझें'],['practice','📝','अभ्यास','सीखी बात पक्की करें'],['challenge','🔥','चुनौती','अपनी तैयारी परखें'],['test','🎯','टेस्ट','समयबद्ध टेस्ट दें']];

const getMainTopics=()=>hindiAllTopics.filter(x=>x.book==='गोधूली · गद्य'||x.book==='गोधूली · काव्य');

function isTopicUnlocked(topic,previousTopic){
  // Chapters currently being developed stay directly accessible.
  // This keeps local progress state from blocking the active chapter.
  if(topic?.id==='g1'||topic?.id==='g2'||topic?.id==='g3'||topic?.id==='g4'||topic?.id==='g5'||topic?.id==='g6'||topic?.id==='g7'||topic?.id==='g8'||topic?.id==='g9'||topic?.id==='g10'||topic?.id==='g11'||topic?.id==='g12'||topic?.id==='p1'||topic?.id==='p2'||topic?.id==='p3'||topic?.id==='p4'||topic?.id==='p5'||topic?.id==='p6'||!previousTopic)return true;
  return isHindiChapterCompleted(previousTopic.id)||(isHindiModeCompleted(previousTopic.id,'learn')&&isHindiModeCompleted(previousTopic.id,'test'));
}

function TopicCard({topic,index,previousTopic,open,kind}){
  const completed=isHindiChapterCompleted(topic.id);
  const unlocked=isTopicUnlocked(topic,previousTopic);
  const launch=mode=>{if(unlocked)open(topic.title,mode);};
  const status=completed?'✓ अध्याय पूरा':unlocked?'अभी उपलब्ध':'🔒 पिछला अध्याय पूरा करें';
  return <article className={`hindi-topic-card ${kind==='poetry'?'is-poetry':''} ${topic.id==='g1'?'is-chapter-one':''} ${!unlocked?'is-locked':''}`} aria-disabled={!unlocked}>
    <div className="hindi-topic-top"><span className="hindi-topic-number">{String(index+1).padStart(2,'0')}</span>{topic.id==='g1'?<span className="hindi-start-badge">🚀 शुरुआत यहीं से</span>:<span className={completed?'hindi-start-badge':'hindi-topic-type'}>{status}</span>}</div>
    <div className="hindi-topic-title-row"><h4>{topic.title}</h4><span className="hindi-topic-arrow" aria-hidden="true">↗</span></div>
    {topic.author&&<div className="hindi-topic-author">✦ {topic.author}</div>}
    <p>{topic.theme||topic.summary}</p>
    <div className="hindi-topic-tags">{(topic.focus||topic.skills||[]).slice(0,3).map(x=><span key={x}>{x}</span>)}</div>
    <div className="hindi-topic-status-line"><span>{completed?'✅ पूरा हो चुका है':unlocked?'✅ आप इस अध्याय से शुरू कर सकते हैं':'🔐 यह अध्याय अभी lock है'}</span></div>
    <div className="hindi-topic-actions" aria-label={`${topic.title} अध्ययन विकल्प`}>
      {modes.map(([mode,icon,label,help])=><button key={mode} type="button" aria-label={`${topic.title}: ${label}`} disabled={!unlocked} className={`hindi-topic-action hindi-mode-${mode} pressable`} onClick={()=>launch(mode)} title={unlocked?help:'पहले पिछला अध्याय पूरा करें'}><span aria-hidden="true">{unlocked?icon:'🔒'}</span><b>{unlocked?label:'Locked'}</b></button>)}
    </div>
  </article>;
}

function TopicGroup({title,book,icon,open,indexOffset=0}){
  const items=hindiAllTopics.filter(x=>x.book===book);
  const allMain=getMainTopics();
  return <section className="hindi-topic-group"><div className="hindi-group-heading"><div className="hindi-group-title"><span className="hindi-group-icon" aria-hidden="true">{icon}</span><div><span>गोधूली भाग 1</span><h3>{title}</h3></div></div><b>{items.length} पाठ</b></div><div className="hindi-topic-grid">{items.map((topic,index)=>{const globalIndex=indexOffset+index;return <TopicCard key={topic.id||topic.title} topic={topic} index={globalIndex} previousTopic={allMain[globalIndex-1]} open={open} kind={title==='काव्य'?'poetry':'prose'}/>})}</div></section>;
}

function SupportGroup({title,book,icon,open}){
  const items=hindiAllTopics.filter(x=>x.book===book);
  return <section className="hindi-topic-group hindi-support-group"><div className="hindi-group-heading"><div className="hindi-group-title"><span className="hindi-group-icon" aria-hidden="true">{icon}</span><div><span>सहायक तैयारी</span><h3>{title}</h3></div></div><b>{items.length} विषय</b></div><div className="hindi-topic-grid">{items.map((topic,index)=><TopicCard key={topic.id||topic.title} topic={topic} index={index} open={open} kind="support"/> )}</div></section>;
}

export function HindiSubjectSection({open}){
  const [,setProgressVersion]=useState(0);
  useEffect(()=>{
    const refresh=()=>setProgressVersion(v=>v+1);
    window.addEventListener('hindi-progress-updated',refresh);
    window.addEventListener('storage',refresh);
    return()=>{
      window.removeEventListener('hindi-progress-updated',refresh);
      window.removeEventListener('storage',refresh);
    };
  },[]);
  const mainTopics=useMemo(()=>getMainTopics(),[]);
  const completedCount=mainTopics.filter(x=>isHindiChapterCompleted(x.id)).length;
  const nextTopic=mainTopics.find(x=>!isHindiChapterCompleted(x.id));
  const proseCount=hindiAllTopics.filter(x=>x.book==='गोधूली · गद्य').length;
  const poetryCount=hindiAllTopics.filter(x=>x.book==='गोधूली · काव्य').length;
  return <div className="hindi-subject-section">
    <div className="hindi-section-intro">
      <div className="hindi-intro-badge">कक्षा 9 • बिहार बोर्ड हिन्दी</div>
      <div className="hindi-intro-layout"><div className="hindi-intro-copy"><div className="hindi-book-kicker">📕 मुख्य पाठ्यपुस्तक</div><h2>गोधूली भाग 1</h2><p>एक अध्याय पूरा कीजिए, फिर अगला अध्याय unlock होगा। सीखें और अंतिम टेस्ट पूरा करने के बाद <b>अध्याय समाप्त करें</b> दबाएँ।</p></div><div className="hindi-intro-stats"><div><strong>{completedCount}</strong><span>पूरा</span></div><div><strong>{mainTopics.length}</strong><span>कुल पाठ</span></div><div><strong>{Math.max(mainTopics.length-completedCount,0)}</strong><span>बाकी</span></div></div></div>
      <div className="hindi-study-flow" aria-label="अध्ययन क्रम"><span><i>1</i> पढ़ें</span><em>→</em><span><i>2</i> अभ्यास</span><em>→</em><span><i>3</i> टेस्ट</span><em>→</em><span><i>4</i> अध्याय समाप्त</span></div>
      <button type="button" className="hindi-start-chapter pressable" onClick={()=>open('कहानी का प्लॉट','learn')}>🚀 अध्याय 1 से शुरू करें <span>{nextTopic?.title||'सभी अध्याय पूरे हैं'}</span></button>
    </div>
    <div className="hindi-book-section-head"><div><span>मुख्य पुस्तक</span><h3>गोधूली भाग 1 के पाठ</h3></div><p>{proseCount} गद्य + {poetryCount} काव्य • क्रम से पढ़ें</p></div>
    {primaryGroups.map(([title,book,icon],i)=><TopicGroup key={book} title={title} book={book} icon={icon} open={open} indexOffset={i?proseCount:0}/>)}
    <div className="hindi-support-divider"><div><span>सहायक तैयारी</span><h3>अतिरिक्त भाषा और पुनरावृत्ति</h3></div><p>ये विषय मुख्य अध्याय क्रम को प्रभावित नहीं करते।</p></div>
    {supportGroups.map(([title,book,icon])=><SupportGroup key={book} title={title} book={book} icon={icon} open={open}/>)}
  </div>;
}
