import React,{lazy,Suspense,useEffect,useState}from'react';
import { createRoot } from 'react-dom/client';
import AppWithChapter5 from './AppWithChapter5.jsx';
import TestCentreSafe from './TestCentreSafe.jsx';
import PreparationMeterPage from './PreparationMeterPage.jsx';
import EnglishGenericLanguageSkillsQuiz from './english/EnglishGenericLanguageSkillsQuiz.jsx';
import EnglishLanguageSkillsPhase2Assessment from './english/EnglishLanguageSkillsPhase2Assessment.jsx';
import EnglishCompositionTopic from './english/EnglishCompositionTopic.jsx';
import EnglishTranslationTopicComplete from './english/EnglishTranslationTopicComplete.jsx';
import EnglishFormalLetterTopic from './english/EnglishFormalLetterTopic.jsx';
import EnglishInformalLetterTopic from './english/EnglishInformalLetterTopic.jsx';
import EnglishNoticeWritingTopic from './english/EnglishNoticeWritingTopic.jsx';
import EnglishReportWritingTopic from './english/EnglishReportWritingTopic.jsx';
import EnglishSpeechWritingTopic from './english/EnglishSpeechWritingTopic.jsx';
import EnglishSpeechWritingAssessment from './english/EnglishSpeechWritingAssessment.jsx';
import EnglishMessageWritingTopic from './english/EnglishMessageWritingTopic.jsx';
import EnglishMessageWritingAssessment from './english/EnglishMessageWritingAssessment.jsx';
import { AppErrorBoundary } from './AppErrorBoundary.jsx';
import SSTRoot from './sst/SSTRoot.jsx';
import {XPCompletionBoundary} from './XPCompletionBoundary.jsx';
import {XPAchievementOverlay,ChapterCompletionOverlay,DailyExamPlanMount,XPBadgeSection} from './XPBadges.jsx';
import {getXPState} from './engines/xp/xpStore.js';
import {recordCanonicalQuizAttempt} from './engines/progress/progressStore.js';
import {SUBJECT_REGISTRY} from './subjectProgressRegistry.js';
import {getChapterContent} from './chapterContent.js';
import {AuthProvider,useAuth} from './auth/AuthContext.jsx';
import AuthPage,{AccountNavControl} from './auth/AuthPage.jsx';
import MobileHomeNav from './mobileHomeNav.jsx';
import DownloadAppButton from './DownloadAppButton.jsx';
import './auth/auth-global.css';
import './auth/auth-navigation-fix.js';
import './scienceModeRouter.js';
import './subject-overrides.css';
import './home-premium.css';
import './mobileHomeNav.css';
import './science-navigation.css';
import './science-learn-navigator-fix.css';
import './sst/sst-section.css';
import './subject-progress-ui.js';

const APP_BUILD_VERSION=import.meta.env.VITE_BUILD_VERSION||'';
const BASE_URL=import.meta.env.BASE_URL||'/';
const ASSESSMENT_TOPICS=new Set(['agreement','narration','clauses','determiners','prepositions','idioms','translation','formal-letter','informal-letter','notice','report','speech','message','paragraph-essay','composition','factual-reading','literary-reading','poetry-reading']);
const KEEP_DEDICATED=new Set(['tenses','modals','voice','paragraph-essay','composition','translation','formal-letter','informal-letter','notice','report','speech','message']);
const PHASE2_LANGUAGE_BANK_TOPICS=new Set(['agreement','determiners','prepositions','idioms']);
function BuildVersionRefresh(){useEffect(()=>{if(!APP_BUILD_VERSION)return;let stopped=false;const checkOnce=async()=>{try{const base=BASE_URL.endsWith('/')?BASE_URL:`${BASE_URL}/`;const response=await fetch(`${base}build-version.json?hub_check=${Date.now()}`,{cache:'no-store',headers:{'Cache-Control':'no-cache','Pragma':'no-cache'}});if(!response.ok||stopped)return;const data=await response.json();const remoteVersion=String(data?.version||'');if(remoteVersion&&remoteVersion!==APP_BUILD_VERSION){const next=new URL(window.location.href);next.searchParams.set('__hub_refresh',remoteVersion);window.location.replace(next.toString())}}catch{}};checkOnce();return()=>{stopped=true}},[]);return null;}
function FreshLanguageSkillsNavigation(){useEffect(()=>{const handler=event=>{const target=event.target?.closest?.('button,a');if(!target)return;const p=new URLSearchParams(window.location.search);if(p.get('subject')!=='english'||p.get('languageSkills')!=='1')return;const topic=p.get('topic');if(!topic||KEEP_DEDICATED.has(topic)||!ASSESSMENT_TOPICS.has(topic))return;const text=(target.textContent||'').replace(/\s+/g,' ').trim().toLowerCase();let mode=null;if(text==='practice'||/^practice\b/.test(text))mode='practice';else if(text==='challenge'||/^challenge\b/.test(text))mode='challenge';else if(text==='final test'||/^final test\b/.test(text)||text.includes('final test'))mode='test';if(!mode)return;event.preventDefault();event.stopPropagation();const next=new URLSearchParams(p);next.set('topic',topic);next.set('mode',mode);next.set('languageSkills','1');next.set('subject','english');window.history.pushState({},'',`${window.location.pathname}?${next.toString()}${window.location.hash||''}`);window.dispatchEvent(new PopStateEvent('popstate'))};document.addEventListener('click',handler,true);return()=>document.removeEventListener('click',handler,true)},[]);useEffect(()=>{const hideReading=()=>{const p=new URLSearchParams(window.location.search);if(p.get('subject')!=='english'||p.get('languageSkills')!=='1'||!p.get('topic'))return;document.querySelectorAll('.english-ls-grid > section').forEach(section=>{const heading=section.querySelector('h2');if(heading?.textContent?.trim()==='Reading')section.hidden=true})};const observer=new MutationObserver(hideReading);observer.observe(document.body,{childList:true,subtree:true});hideReading();return()=>observer.disconnect()},[]);return null;}
function readRoute(){const params=new URLSearchParams(window.location.search);return{subject:params.get('subject')||'',page:params.get('page')||'',topic:params.get('topic')||'',mode:params.get('mode')||'learn',languageSkills:params.get('languageSkills')==='1'}}
function exitLanguageSkills(){const params=new URLSearchParams();params.set('page','language-skills');params.set('subject','english');params.set('languageSkills','1');window.history.pushState({},'',`${window.location.pathname}?${params}${window.location.hash||''}`);window.dispatchEvent(new PopStateEvent('popstate'))}
function ProductionMeter(){const [xp,setXp]=useState(()=>getXPState().totalXp);useEffect(()=>{const refresh=()=>setXp(getXPState().totalXp);window.addEventListener('class9-xp-updated',refresh);window.addEventListener('storage',refresh);return()=>{window.removeEventListener('class9-xp-updated',refresh);window.removeEventListener('storage',refresh)}},[]);return <><PreparationMeterPage/><div style={{maxWidth:1180,margin:'-18px auto 0',padding:'0 clamp(16px,5vw,64px) 70px'}}><XPBadgeSection xp={xp}/></div></>}
function GlobalAuthEntry(){const p=new URLSearchParams(window.location.search);if(p.get('page')==='account')return null;return <div className="auth-global-entry"><AccountNavControl/></div>}
function RootRouter(){const[route,setRoute]=useState(readRoute);useEffect(()=>{const sync=()=>setRoute(readRoute());window.addEventListener('popstate',sync);window.addEventListener('hashchange',sync);const timer=setInterval(sync,250);sync();return()=>{window.removeEventListener('popstate',sync);window.removeEventListener('hashchange',sync);clearInterval(timer)}},[]);const isSST=route.subject==='sst'||route.page.startsWith('sst-');if(route.page==='account')return <AuthPage/>;if(isSST)return <SSTRoot/>;if(route.page==='cbt')return <TestCentreSafe/>;if(route.page==='meter')return <ProductionMeter/>;const sharedProps={onBack:exitLanguageSkills,addXp:()=>{},finishSession:meta=>{const subject='अंग्रेज़ी';const stage=meta?.mode;const chapter=meta?.chapter||meta?.title||meta?.topic;if(!['learn','practice','challenge','test'].includes(stage)||!chapter)return;const total=Math.max(0,Number(meta?.total??meta?.questionsTotal??meta?.attempted??0));const correct=Math.max(0,Number(meta?.correct??meta?.score??meta?.correctAnswers??0));const answered=Math.max(0,Math.min(total,Number(meta?.attempted??total)));recordCanonicalQuizAttempt({subject,chapter,stage,attemptId:String(meta?.attemptId||`english-${chapter}-${stage}-${meta?.at||Date.now()}`),questionsAnswered:answered,questionsTotal:total,correctAnswers:correct,percent:meta?.percent??(total?Math.round(correct*100/total):0),at:meta?.at&&Number.isFinite(Date.parse(meta.at))?new Date(meta.at).toISOString():new Date().toISOString()});}};if(route.languageSkills&&route.topic==='composition')return <EnglishCompositionTopic {...sharedProps}/>;if(route.languageSkills&&route.topic==='paragraph-essay')return <EnglishCompositionTopic {...sharedProps}/>;if(route.languageSkills&&route.topic==='translation')return <EnglishTranslationTopicComplete {...sharedProps}/>;if(route.languageSkills&&route.topic==='formal-letter')return <EnglishFormalLetterTopic {...sharedProps}/>;if(route.languageSkills&&route.topic==='informal-letter')return <EnglishInformalLetterTopic {...sharedProps}/>;if(route.languageSkills&&route.topic==='notice')return <EnglishNoticeWritingTopic {...sharedProps}/>;if(route.languageSkills&&route.topic==='report')return <EnglishReportWritingTopic {...sharedProps}/>;if(route.languageSkills&&route.topic==='speech')return route.mode==='learn'?<EnglishSpeechWritingTopic {...sharedProps}/>:<EnglishSpeechWritingAssessment mode={route.mode} onBack={exitLanguageSkills} {...sharedProps}/>;if(route.languageSkills&&route.topic==='message')return route.mode==='learn'?<EnglishMessageWritingTopic {...sharedProps}/>:<EnglishMessageWritingAssessment mode={route.mode} onBack={exitLanguageSkills} {...sharedProps}/>;if(route.languageSkills&&PHASE2_LANGUAGE_BANK_TOPICS.has(route.topic)&&route.mode!=='learn')return <EnglishLanguageSkillsPhase2Assessment topicId={route.topic} onBack={exitLanguageSkills} {...sharedProps}/>;const englishAssessment=route.languageSkills&&!KEEP_DEDICATED.has(route.topic)&&ASSESSMENT_TOPICS.has(route.topic)&&route.mode!=='learn';if(englishAssessment)return <EnglishGenericLanguageSkillsQuiz key={`${route.topic}:${route.mode}`} topicId={route.topic}/>;return <AppWithChapter5 key={`${route.subject}:${route.page}:${route.topic}:${route.mode}:${route.languageSkills?'1':'0'}`}/>;}

const SEO_SITE_URL='https://amitbhai-2152.github.io/Class-9-Learning-Hub/';

function setPublicSeo({title,description,url}){
  document.title=title;
  const setMeta=(selector,attr,value)=>{
    let node=document.head.querySelector(selector);
    if(!node){node=document.createElement('meta');document.head.appendChild(node);}
    node.setAttribute(attr,value);
  };
  setMeta('meta[name="description"]','name','description');
  document.head.querySelector('meta[name="description"]').setAttribute('content',description);
  setMeta('meta[property="og:title"]','property','og:title');
  document.head.querySelector('meta[property="og:title"]').setAttribute('content',title);
  setMeta('meta[property="og:description"]','property','og:description');
  document.head.querySelector('meta[property="og:description"]').setAttribute('content',description);
  setMeta('meta[property="og:url"]','property','og:url');
  document.head.querySelector('meta[property="og:url"]').setAttribute('content',url);
  let canonical=document.head.querySelector('link[rel="canonical"]');
  if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.appendChild(canonical);}
  canonical.href=url;
}

function SeoLayout({eyebrow,title,description,children,actions=[]}){
  return <main style={{minHeight:'100vh',maxWidth:1120,margin:'0 auto',padding:'40px 20px 80px',fontFamily:'system-ui,sans-serif',color:'#111827'}}>
    <header style={{marginBottom:28}}>
      <p style={{margin:0,fontSize:13,fontWeight:800,letterSpacing:'.08em',textTransform:'uppercase'}}>Class 9 Learning Hub</p>
      <div style={{marginTop:14,fontSize:14,fontWeight:800,opacity:.72}}>{eyebrow}</div>
      <h1 style={{fontSize:'clamp(32px,7vw,58px)',lineHeight:1.08,margin:'10px 0 14px'}}>{title}</h1>
      <p style={{maxWidth:820,fontSize:'clamp(17px,2.5vw,21px)',lineHeight:1.75,margin:0}}>{description}</p>
      {actions.length>0&&<div style={{display:'flex',flexWrap:'wrap',gap:10,marginTop:22}}>
        {actions.map((action,i)=><a key={i} href={action.href} style={{display:'inline-block',padding:'11px 16px',borderRadius:10,background:i===0?'#111827':'#eef2ff',color:i===0?'#fff':'#1f2937',fontWeight:800,textDecoration:'none'}}>{action.label}</a>)}
      </div>}
    </header>
    {children}
  </main>;
}

function PublicSeoHome(){
  useEffect(()=>setPublicSeo({
    title:'कक्षा 9 लर्निंग हब | NCERT अध्ययन, अभ्यास और टेस्ट',
    description:'कक्षा 9 लर्निंग हब — NCERT आधारित Maths, Science, SST, English, Hindi, Sanskrit और Reasoning के लिए सीखें, अभ्यास करें, चुनौती लें और टेस्ट दें।',
    url:SEO_SITE_URL
  }),[]);
  return <SeoLayout eyebrow="कक्षा 9 • Online Learning Platform" title="कक्षा 9 लर्निंग हब" description="NCERT आधारित कक्षा 9 की पढ़ाई के लिए एक online learning hub — विषय चुनें, अध्याय देखें और structured learning, practice, challenge और tests तक पहुँचें." actions={[{label:'Login करके पढ़ाई शुरू करें',href:'?page=account'}]}>
    <section style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:14}}>
      {SUBJECT_REGISTRY.map(subject=><article key={subject.id} style={{border:'1px solid #e5e7eb',borderRadius:16,padding:18,background:'#fff'}}>
        <h2 style={{fontSize:21,margin:'0 0 8px'}}>{subject.name}</h2>
        <p style={{margin:'0 0 14px',lineHeight:1.6}}>{subject.shortName} • {subject.topics.length} topics</p>
        <a href={'?page=subject&subject='+encodeURIComponent(subject.id)} style={{fontWeight:800}}>विषय देखें →</a>
      </article>)}
    </section>
    <section style={{marginTop:34,borderTop:'1px solid #e5e7eb',paddingTop:28}}>
      <h2 style={{fontSize:28,margin:'0 0 10px'}}>अध्ययन सुविधाएँ</h2>
      <p style={{fontSize:17,lineHeight:1.8,margin:0}}>Chapter-wise learning, अभ्यास, चुनौती, final test, progress tracking और structured study support — एक ही कक्षा 9 learning platform में।</p>
    </section>
  </SeoLayout>;
}

function PublicSeoSubject({subject}){
  const url=SEO_SITE_URL+'?page=subject&subject='+encodeURIComponent(subject.id);
  const description='कक्षा 9 '+subject.name+' के लिए chapter-wise syllabus, learning, practice, challenge और test resources. इस पेज पर '+subject.topics.length+' topics उपलब्ध हैं.';
  useEffect(()=>setPublicSeo({title:'कक्षा 9 '+subject.name+' | अध्याय और अभ्यास | Learning Hub',description,url}),[subject.id,subject.name,url,description]);
  return <SeoLayout eyebrow={'कक्षा 9 • '+(subject.shortName||subject.name)} title={'कक्षा 9 '+subject.name} description={description} actions={[{label:'Login करके सीखना शुरू करें',href:'?page=account'},{label:'← मुख्य पेज',href:SEO_SITE_URL}]}>
    <section style={{border:'1px solid #e5e7eb',borderRadius:16,padding:20,background:'#fff'}}>
      <h2 style={{fontSize:27,margin:'0 0 8px'}}>इस विषय के अध्याय</h2>
      <p style={{margin:'0 0 20px',lineHeight:1.7}}>नीचे दिए गए अध्याय कक्षा 9 Learning Hub में topic-wise learning flow के साथ व्यवस्थित हैं। अध्याय पेज पर उपलब्ध learning pathway देखने के लिए उसे खोलें।</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:12}}>
        {subject.topics.map((topic,index)=><a key={topic.id} href={'?page=chapter&subject='+encodeURIComponent(subject.id)+'&chapter='+index} style={{display:'block',border:'1px solid #e5e7eb',borderRadius:12,padding:14,textDecoration:'none',color:'#111827'}}>
          <div style={{fontSize:12,fontWeight:800,opacity:.65}}>अध्याय {index+1}</div>
          <strong style={{display:'block',marginTop:5,lineHeight:1.45}}>{topic.title}</strong>
          <span style={{display:'block',marginTop:8,fontSize:13,fontWeight:800}}>अध्याय देखें →</span>
        </a>)}
      </div>
    </section>
  </SeoLayout>;
}

function PublicSeoChapter({subject,topic,index}){
  const content=getChapterContent(subject.name,topic.title);
  const url=SEO_SITE_URL+'?page=chapter&subject='+encodeURIComponent(subject.id)+'&chapter='+index;
  const description=content?.goal||('कक्षा 9 '+subject.name+' — '+topic.title+' के लिए learning, अभ्यास, challenge और test pathway.');
  useEffect(()=>setPublicSeo({title:'कक्षा 9 '+subject.name+': '+topic.title+' | Learning Hub',description,url}),[subject.id,subject.name,topic.id,topic.title,index,url,description]);
  return <SeoLayout eyebrow={'कक्षा 9 • '+subject.name+' • अध्याय '+(index+1)} title={topic.title} description={description} actions={[{label:'Login करके अध्याय पढ़ें',href:'?page=account'},{label:'← '+subject.name,href:'?page=subject&subject='+encodeURIComponent(subject.id)}]}>
    <section style={{display:'grid',gap:16}}>
      <article style={{border:'1px solid #e5e7eb',borderRadius:16,padding:20,background:'#fff'}}>
        <h2 style={{margin:'0 0 10px',fontSize:26}}>इस अध्याय में क्या मिलेगा?</h2>
        {content?.lessons?.length>0?<><p style={{lineHeight:1.75}}>इस अध्याय की सामग्री को concept-by-concept अध्ययन, examples और checks के साथ व्यवस्थित किया गया है।</p><ul style={{margin:'8px 0 0',paddingLeft:22,lineHeight:1.8}}>{content.lessons.slice(0,5).map((lesson,i)=><li key={i}>{lesson.title}</li>)}</ul></>:<p style={{lineHeight:1.75}}>इस अध्याय के लिए Learning Hub में chapter-wise learning flow, अभ्यास, चुनौती और test stages उपलब्ध हैं।</p>}
      </article>
      <article style={{border:'1px solid #e5e7eb',borderRadius:16,padding:20,background:'#f8fafc'}}>
        <h2 style={{margin:'0 0 12px',fontSize:24}}>Learning pathway</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:10}}>{[['📖','सीखें','Concepts और explanations'],['📝','अभ्यास','समझ की practice'],['🔥','चुनौती','थोड़े कठिन प्रश्न'],['🎯','टेस्ट','Self-assessment']].map(([icon,name,desc])=><div key={name} style={{padding:14,borderRadius:12,background:'#fff',border:'1px solid #e5e7eb'}}><div style={{fontSize:24}}>{icon}</div><strong style={{display:'block',marginTop:5}}>{name}</strong><small style={{display:'block',marginTop:5,lineHeight:1.5}}>{desc}</small></div>)}</div>
      </article>
    </section>
  </SeoLayout>;
}

function PublicSeoRouter(){
  const params=new URLSearchParams(window.location.search);
  const page=params.get('page')||'home';
  const subjectId=params.get('subject')||'';
  const subject=SUBJECT_REGISTRY.find(item=>item.id===subjectId)||null;
  if(page==='subject'&&subject)return <PublicSeoSubject subject={subject}/>;
  if(page==='chapter'&&subject){
    const raw=params.get('chapter');
    const index=raw===null?'':Number(raw);
    const topic=Number.isInteger(index)&&index>=0&&index<subject.topics.length?subject.topics[index]:null;
    if(topic)return <PublicSeoChapter subject={subject} topic={topic} index={index}/>;
  }
  return <PublicSeoHome/>;
}

function AuthGate({children}){const{user,loading}=useAuth();const page=typeof window!=='undefined'?new URLSearchParams(window.location.search).get('page'):'';if(loading)return <main className="auth-page auth-page-loading"><div className="auth-loader-orbit"><span/><span/><span/></div><strong>आपका secure account लोड हो रहा है…</strong></main>;if(!user)return page==='account'?<AuthPage/>:<PublicSeoRouter/>;return children;}
createRoot(document.getElementById('root')).render(<React.StrictMode><AuthProvider><AuthGate><AppErrorBoundary><BuildVersionRefresh/><FreshLanguageSkillsNavigation/><XPCompletionBoundary><RootRouter/></XPCompletionBoundary><ChapterCompletionOverlay/><DailyExamPlanMount/><XPAchievementOverlay/><GlobalAuthEntry/><MobileHomeNav/><DownloadAppButton/></AppErrorBoundary></AuthGate></AuthProvider></React.StrictMode>);
