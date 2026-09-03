import React,{useEffect,useMemo,useState} from 'react';
import {hindiAllTopics} from './hindiChapterData';
import {isHindiChapterCompleted,isHindiModeCompleted,markHindiChapterCompleted,markHindiModeCompleted} from './hindiChapterProgress';
import {HindiLearnNavigator} from './HindiLearnNavigator';
import {hindiLearnLessons} from './hindiLearnLessons';
import {HindiChapter6Learn} from './HindiChapter6Learn';
import {HindiChapter7Learn} from './HindiChapter7Learn';
import {HindiChapter8Learn} from './HindiChapter8Learn';
import {HindiChapter9Learn} from './HindiChapter9Learn';
import {HindiChapter10Learn} from './HindiChapter10Learn';
import {HindiChapter11Learn} from './HindiChapter11Learn';
import {HindiChapter12Learn} from './HindiChapter12Learn';
import {HindiPoetry1Learn} from './HindiPoetry1Learn';
import {HindiPoetry2Learn} from './HindiPoetry2Learn';
import {HindiPoetry3Learn} from './HindiPoetry3Learn';
import {HindiPoetry4Learn} from './HindiPoetry4Learn';
import {HindiPoetry5Learn} from './HindiPoetry5Learn';
import {HindiPoetry6Learn} from './HindiPoetry6Learn';
import {HindiPoetry7Learn} from './HindiPoetry7Learn';
import {HindiPoetry8Learn} from './HindiPoetry8Learn';
import './hindi-click-fix.css';

const primaryGroups=[['गद्य','गोधूली · गद्य','📚'],['काव्य','गोधूली · काव्य','🎵']];
const supportGroups=[['वर्णिका भाग 1','वर्णिका · पूरक','📘'],['व्याकरण एवं रचना','व्याकरण एवं रचना','✍️']];
const modes=[['learn','📖','सीखें','पाठ को समझें'],['practice','📝','अभ्यास','सीखी बात पक्की करें'],['challenge','🔥','चुनौती','अपनी तैयारी परखें'],['test','🎯','टेस्ट','समयबद्ध टेस्ट दें']];

const getMainTopics=()=>hindiAllTopics.filter(x=>x.book==='गोधूली · गद्य'||x.book==='गोधूली · काव्य');

const learnComponents={
  g6:HindiChapter6Learn,
  g7:HindiChapter7Learn,
  g8:HindiChapter8Learn,
  g9:HindiChapter9Learn,
  g10:HindiChapter10Learn,
  g11:HindiChapter11Learn,
  g12:HindiChapter12Learn,
  p1:HindiPoetry1Learn,
  p2:HindiPoetry2Learn,
  p3:HindiPoetry3Learn,
  p4:HindiPoetry4Learn,
  p5:HindiPoetry5Learn,
  p6:HindiPoetry6Learn,
  p7:HindiPoetry7Learn,
  p8:HindiPoetry8Learn
};

function isTopicUnlocked(topic,previousTopic){
  if(!previousTopic)return true;
  return isHindiChapterCompleted(previousTopic.id);
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
  const [localChapter,setLocalChapter]=useState(null);
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
  const handleOpen=(title,mode)=>{
    const topic=hindiAllTopics.find(x=>x.title===title);
    const Learner=topic&&mode==='learn'?learnComponents[topic.id]:null;
    if(Learner){
      setLocalChapter({topicId:topic.id,title,mode});
      return;
    }
    open(title,mode);
  };
  if(localChapter){
    const Learner=learnComponents[localChapter.topicId];
    const lesson=hindiLearnLessons[localChapter.topicId];
    const completeLocalMode=completedMode=>{
      markHindiModeCompleted(localChapter.topicId,completedMode);
      const modesDone=['learn','practice','challenge','test'].every(m=>isHindiModeCompleted(localChapter.topicId,m)||completedMode===m);
      if(modesDone)markHindiChapterCompleted(localChapter.topicId);
    };
    if(Learner)return <HindiLearnNavigator lesson={lesson}><Learner onBack={()=>setLocalChapter(null)} onModeComplete={completeLocalMode}/></HindiLearnNavigator>;
    return null;
  }
  return <div className="hindi-subject-section">
    <div className="hindi-section-intro">
      <div className="hindi-intro-badge">कक्षा 9 • बिहार बोर्ड हिन्दी</div>
      <div className="hindi-intro-layout"><div className="hindi-intro-copy"><div className="hindi-book-kicker">📕 मुख्य पाठ्यपुस्तक</div><h2>गोधूली भाग 1</h2><p>एक अध्याय पूरा कीजिए, फिर अगला अध्याय unlock होगा। सीखें और अंतिम टेस्ट पूरा करने के बाद <b>अध्याय समाप्त करें</b> दबाएँ।</p></div><div className="hindi-intro-stats"><div><strong>{completedCount}</strong><span>पूरा</span></div><div><strong>{mainTopics.length}</strong><span>कुल पाठ</span></div><div><strong>{Math.max(mainTopics.length-completedCount,0)}</strong><span>बाकी</span></div></div></div>
      <div className="hindi-study-flow" aria-label="अध्ययन क्रम"><span><i>1</i> पढ़ें</span><em>→</em><span><i>2</i> अभ्यास</span><em>→</em><span><i>3</i> टेस्ट</span><em>→</em><span><i>4</i> अध्याय समाप्त</span></div>
      <button type="button" className="hindi-start-chapter pressable" disabled={!nextTopic} onClick={()=>nextTopic&&handleOpen(nextTopic.title,'learn')}>🚀 {nextTopic?'अगला अध्याय खोलें':'सभी अध्याय पूरे हैं'} <span>{nextTopic?.title||'✓'}</span></button>
    </div>
    <div className="hindi-book-section-head"><div><span>मुख्य पुस्तक</span><h3>गोधूली भाग 1 के पाठ</h3></div><p>{proseCount} गद्य + {poetryCount} काव्य • क्रम से पढ़ें</p></div>
    {primaryGroups.map(([title,book,icon],i)=><TopicGroup key={book} title={title} book={book} icon={icon} open={handleOpen} indexOffset={i?proseCount:0}/>)}
    <div className="hindi-support-divider"><div><span>सहायक तैयारी</span><h3>अतिरिक्त भाषा और पुनरावृत्ति</h3></div><p>ये विषय मुख्य अध्याय क्रम को प्रभावित नहीं करते।</p></div>
    {supportGroups.map(([title,book,icon])=><SupportGroup key={book} title={title} book={book} icon={icon} open={handleOpen}/>)}
  </div>;
}
