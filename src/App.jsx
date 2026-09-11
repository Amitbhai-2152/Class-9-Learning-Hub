import React,{useEffect,useState} from 'react';
import {getChapterContent} from './chapterContent';
import {StudyEngine} from './StudyEngine';
import {LearningEngine} from './LearningEngine';
import {PolynomialEngine} from './PolynomialEngine';
import {CoordinateEngine} from './CoordinateEngine';
import {LinearEquationEngine} from './LinearEquationEngine';
import {EuclidEngine} from './EuclidEngine';
import {LinesAnglesEngine} from './LinesAnglesEngine';
import {TrianglesEngine} from './TrianglesEngine';
import {QuadrilateralEngine} from './QuadrilateralEngine';
import {AreaEngine} from './AreaEngine';
import {CirclesEngine} from './CirclesEngine';
import {ConstructionsEngine} from './ConstructionsEngine';
import {HeronEngine} from './HeronEngine';
import {SurfaceVolumeEngine} from './SurfaceVolumeEngine';
import {StatisticsEngine} from './StatisticsEngine';
import {ProbabilityEngine} from './ProbabilityEngine';
import {ScienceChapter1Engine2} from './ScienceChapter1Engine2';
import {ScienceChapter2Engine} from './ScienceChapter2Engine';
import {ScienceChapter3Engine} from './ScienceChapter3Engine';
import {ScienceChapter4Engine} from './ScienceChapter4Engine';
import {ScienceChapter5Engine} from './ScienceChapter5Engine';
import {ScienceChapter6Engine} from './ScienceChapter6Engine';
import {ScienceChapter7Engine} from './ScienceChapter7Engine';
import {ScienceChapter8Engine} from './ScienceChapter8Engine';
import {ScienceChapter9Engine} from './ScienceChapter9Engine';
import {ScienceChapter10Engine} from './ScienceChapter10Engine';
import {ScienceChapter11Engine} from './ScienceChapter11Engine';
import {ScienceChapter12Engine} from './ScienceChapter12Engine';
import {ScienceChapter13Engine} from './ScienceChapter13Engine';
import {ScienceChapter14Engine} from './ScienceChapter14Engine';
import {ScienceChapter15Engine} from './ScienceChapter15Engine';
import {HindiHubEngine} from './HindiHubEngine';
import {HindiSubjectSection} from './HindiSubjectSection';
import {SanskritSubjectSection,SanskritChapterEngine} from './sanskrit/SanskritSubjectSection';
import {EnglishReaderChapter1} from './english/EnglishReaderChapter1';
import {EnglishPanoramaChapter1} from './english/EnglishPanoramaChapter1';
import {EnglishPanoramaChapter2} from './english/EnglishPanoramaChapter2';
import {EnglishPanoramaChapter3} from './english/EnglishPanoramaChapter3';
import {EnglishPanoramaChapter4} from './english/EnglishPanoramaChapter4';
import {EnglishSubjectSection} from './english/EnglishSubjectSection';
import {chapter2Learning} from './chapter2Learning';
import {chapter3Learning} from './chapter3Learning';
import {chapter4Learning} from './chapter4Learning';
import {chapter5Learning} from './chapter5Learning';
import {chapter6Learning} from './chapter6Learning';
import {chapter7Learning} from './chapter7Learning';
import {chapter8Learning} from './chapter8Learning';
import {chapter9Learning} from './chapter9Learning';
import {chapter10Learning} from './chapter10Learning';
import {chapter11Learning} from './chapter11Learning';
import {chapter12Learning} from './chapter12Learning';
import {chapter13Learning} from './chapter13Learning';
import {chapter14Learning} from './chapter14Learning';
import {chapter15Learning} from './chapter15Learning';
import {scienceChapter1Learning} from './scienceChapter1Learning';
import {scienceChapter2Learning} from './scienceChapter2Learning';
import {scienceChapter3Learning} from './scienceChapter3Learning';
import {scienceChapter4Learning} from './scienceChapter4Learning';
import {scienceChapter5Learning} from './scienceChapter5Learning';
import {scienceChapter6Learning} from './scienceChapter6Learning';
import {scienceChapter7Learning} from './scienceChapter7Learning';
import {scienceChapter8Learning} from './scienceChapter8Learning';
import {scienceChapter9Learning} from './scienceChapter9Learning';
import {scienceChapter10Learning} from './scienceChapter10Learning';
import {scienceChapter11Learning} from './scienceChapter11Learning';
import {scienceChapter12Learning} from './scienceChapter12Learning';
import {scienceChapter13Learning} from './scienceChapter13Learning';
import {scienceChapter14Learning} from './scienceChapter14Learning';
import {scienceChapter15Learning} from './scienceChapter15Learning';
import {MathSectionHero,MathChapterDecor} from './MathSectionVisuals';
import {cbtConfig} from './cbtConfig';
import {subjects} from './subjectCatalog';
import {getCanonicalProgress} from './engines/progress/progressStore.js';
import {getXPState} from './engines/xp/xpStore.js';
import {getRewardSummary} from './engines/xp/xpRewards.js';
import {calculatePreparationMeter} from './preparationMeter.js';
import {XPBadgeSection} from './XPBadges.jsx';
import './styles.css';
import './math-section.css';
import './hindi-section.css';

const LEVEL_XP=250;
const readXPView=()=>{const state=getXPState();const rewards=getRewardSummary();return {xp:state.totalXp,streak:rewards.streak.current,dailyXp:state.dailyXp,goal:state.dailyGoal,sessions:[]}};

const APP_PAGES=new Set(['home','classes','subject','chapter','meter','cbt']);
const APP_MODES=new Set(['learn','practice','challenge','test']);
const routeFromLocation=()=>{
  if(typeof window==='undefined')return {page:'home',subjectId:null,chapterIndex:null,mode:null};
  const params=new URLSearchParams(window.location.search);
  const requestedPage=params.get('page')||'home';
  const page=APP_PAGES.has(requestedPage)?requestedPage:'home';
  const subjectId=params.get('subject')||null;
  const rawChapter=params.get('chapter');
  const parsedChapter=rawChapter===null?'':Number(rawChapter);
  const chapterIndex=rawChapter!==null&&Number.isInteger(parsedChapter)&&parsedChapter>=0?parsedChapter:null;
  const requestedMode=params.get('mode');
  const mode=APP_MODES.has(requestedMode)?requestedMode:null;
  return {page,subjectId,chapterIndex,mode};
};
const writeRoute=(route,replace=false)=>{
  if(typeof window==='undefined')return;
  const params=new URLSearchParams();
  params.set('page',route.page||'home');
  if(route.subjectId)params.set('subject',route.subjectId);
  if(Number.isInteger(route.chapterIndex))params.set('chapter',String(route.chapterIndex));
  if(route.mode&&APP_MODES.has(route.mode))params.set('mode',route.mode);
  const url=`${window.location.pathname}?${params.toString()}${window.location.hash||''}`;
  if(replace)window.history.replaceState({},'',url);else window.history.pushState({},'',url);
};
const routeState=route=>{
  const subject=route.subjectId?subjects.find(s=>s.id===route.subjectId)||null:null;
  const chapter=subject&&Number.isInteger(route.chapterIndex)&&route.chapterIndex<subject.chapters.length?subject.chapters[route.chapterIndex]:null;
  if(route.page==='subject'&&!subject)return {page:'home',subject:null,chapter:null,initialMode:null};
  if(route.page==='chapter'&&(!subject||!chapter))return {page:'home',subject:null,chapter:null,initialMode:null};
  return {page:route.page,subject,chapter,initialMode:route.mode};
};

function App(){
  const initialRoute=routeState(routeFromLocation());
  const[page,setPage]=useState(initialRoute.page);
  const[subject,setSubject]=useState(initialRoute.subject);
  const[chapter,setChapter]=useState(initialRoute.chapter);
  const[initialMode,setInitialMode]=useState(initialRoute.initialMode);
  const[progress,setProgress]=useState(()=>readXPView());
  const[tutor,setTutor]=useState(false);
  const[toast,setToast]=useState('');
  useEffect(()=>{
    const syncXp=event=>{setProgress(readXPView());const amount=Number(event?.detail?.event?.amount||0);if(amount){setToast(`+${amount} XP`);window.setTimeout(()=>setToast(''),1100)}};
    syncXp();
    window.addEventListener('class9-xp-updated',syncXp);
    window.addEventListener('storage',syncXp);
    return()=>{window.removeEventListener('class9-xp-updated',syncXp);window.removeEventListener('storage',syncXp)};
  },[]);
  useEffect(()=>{
    const syncFromUrl=()=>{const next=routeState(routeFromLocation());setPage(next.page);setSubject(next.subject);setChapter(next.chapter);setInitialMode(next.initialMode)};
    window.addEventListener('popstate',syncFromUrl);return()=>window.removeEventListener('popstate',syncFromUrl);
  },[]);
  const addXp=()=>{};
  const finishSession=meta=>{try{const old=JSON.parse(localStorage.getItem('class9-sessions')||'[]');localStorage.setItem('class9-sessions',JSON.stringify([{...meta,at:Date.now()},...old].slice(0,100)))}catch{}};
  const navigatePage=nextPage=>{const next={page:nextPage,subjectId:null,chapterIndex:null,mode:null};setPage(nextPage);setSubject(null);setChapter(null);setInitialMode(null);writeRoute(next)};
  const startSubject=s=>{setSubject(s);setChapter(null);setInitialMode(null);setPage('subject');writeRoute({page:'subject',subjectId:s.id,chapterIndex:null,mode:null})};
  const startChapter=(c,mode=null)=>{const chapterIndex=subject?.chapters.indexOf(c)??-1;if(chapterIndex<0||!subject)return;setChapter(c);setInitialMode(mode);setPage('chapter');writeRoute({page:'chapter',subjectId:subject.id,chapterIndex,mode})};
  const backToSubject=()=>{if(!subject)return navigatePage('classes');setChapter(null);setInitialMode(null);setPage('subject');writeRoute({page:'subject',subjectId:subject.id,chapterIndex:null,mode:null})};
  const onChapterModeChange=mode=>{setInitialMode(mode);writeRoute({page:'chapter',subjectId:subject?.id||null,chapterIndex:subject&&chapter?subject.chapters.indexOf(chapter):null,mode})};
  if(page==='classes')return <Classes back={()=>navigatePage('home')} open={startSubject}/>;
  if(page==='subject')return <SubjectPage subject={subject} back={()=>navigatePage('classes')} open={startChapter}/>;
  if(page==='chapter')return <ChapterPage subject={subject} chapter={chapter} initialMode={initialMode} onModeChange={onChapterModeChange} back={backToSubject} addXp={addXp} finishSession={finishSession}/>;
  if(page==='meter')return <Meter progress={progress} back={()=>navigatePage('home')}/>;
  if(page==='cbt')return <CBTPage back={()=>navigatePage('home')}/>;
  return <Home progress={progress} setPage={navigatePage} tutor={tutor} setTutor={setTutor} toast={toast}/>;
}
function Home({progress,setPage,tutor,setTutor,toast}){const level=Math.floor(progress.xp/LEVEL_XP)+1,pct=Math.round((progress.xp%LEVEL_XP)/LEVEL_XP*100);return <main className="app-shell"><nav className="topbar"><strong className="brand">पढ़ाई</strong><span className="nav-class">कक्षा 9</span><div className="top-stats"><span>🔥 {progress.streak} दिन</span><span>⚡ {progress.xp} XP</span><span>LVL {level}</span></div><button className="tutor-mini pressable" onClick={()=>setTutor(true)}>✦ Smart Tutor</button></nav><header className="hero"><div className="hero-inner"><div className="badge">कक्षा 9 • STUDY SPACE</div><h1>आज की पढ़ाई शुरू करें।</h1><p>ध्यान से पढ़ें, अभ्यास करें और हर कदम पर XP कमाएँ।</p></div></header><section className="dashboard"><div className="progress-strip"><div className="level-badge"><span>LVL</span><strong>{level}</strong></div><div className="level-copy"><div className="level-title"><strong>आपकी सीखने की ऊर्जा</strong><span>{progress.xp%LEVEL_XP} / {LEVEL_XP} XP</span></div><div className="progress-track"><span style={{width:`${pct}%`}}/></div><small>अगले लेवल तक आपकी प्रगति</small></div><div className="daily-goal"><strong>{progress.dailyXp} XP</strong><span>आज का लक्ष्य {progress.goal}</span></div></div><div className="section-heading"><div><span className="eyebrow">कक्षा 9</span><h2>अध्ययन सुविधाएँ</h2></div><span className="focus-label">🎯 Focus Mode</span></div><div className="offering-grid"><button className="offering-card pressable" onClick={()=>setPage('classes')}><span className="offering-icon">▣</span><span className="offering-copy"><strong>सभी कक्षाएँ</strong><small>सभी विषय और अध्याय देखें</small></span><span>›</span></button><button className="offering-card pressable" onClick={()=>setPage('cbt')}><span className="offering-icon">✎</span><span className="offering-copy"><strong>Test Centre</strong><small>अभ्यास + BSEB CBT परीक्षा</small></span><span>›</span></button><button className="offering-card pressable" onClick={()=>setPage('meter')}><span className="offering-icon">◔</span><span className="offering-copy"><strong>तैयारी मीटर</strong><small>अभ्यास और सीखने की प्रगति देखें</small></span><span>›</span></button></div><button className="tutor-banner pressable" onClick={()=>setTutor(true)}><span>🤖</span><div><strong>स्मार्ट ट्यूटर AI</strong><small>सवाल पूछें, concepts समझें और study plan बनाएँ।</small></div><b>पूछें →</b></button></section>{toast&&<div className="xp-toast">⚡ {toast}</div>}{tutor&&<Tutor close={()=>setTutor(false)}/>}</main>}
function Classes({back,open}){return <Simple title="सभी कक्षाएँ" back={back}><div className="subject-grid">{subjects.map((s,i)=><button className="subject-tile pressable" key={s.id} onClick={()=>open(s)}><span className="subject-icon">{s.icon}</span><span className="subject-index">{String(i+1).padStart(2,'0')}</span><strong>{s.name}</strong><small>{s.desc}</small><b>अध्याय देखें →</b></button>)}</div></Simple>}
function SubjectPage({subject,back,open}){const isMath=subject?.id==='math';const isHindi=subject?.id==='hindi';const isSanskrit=subject?.id==='sanskrit';const isEnglish=subject?.id==='english';if(isHindi)return <Simple title={subject.name} back={back}><HindiSubjectSection open={open}/></Simple>;if(isSanskrit)return <Simple title={subject.name} back={back}><SanskritSubjectSection open={open}/></Simple>;if(isEnglish)return <Simple title={subject.name} back={back}><EnglishSubjectSection open={open}/></Simple>;const scienceData={'हमारे आसपास के पदार्थ':scienceChapter1Learning,'क्या हमारे आसपास के पदार्थ शुद्ध हैं?':scienceChapter2Learning,'परमाणु एवं अणु':scienceChapter3Learning,'परमाणु की संरचना':scienceChapter4Learning,'जीवन की मौलिक इकाई — कोशिका':scienceChapter5Learning,'ऊतक':scienceChapter6Learning,'गति':scienceChapter7Learning,'बल तथा गति के नियम':scienceChapter8Learning,'गुरुत्वाकर्षण':scienceChapter9Learning,'कार्य तथा ऊर्जा':scienceChapter10Learning,'ध्वनि':scienceChapter11Learning,'खाद्य संसाधनों में सुधार':scienceChapter12Learning,'हम बीमार क्यों होते हैं':scienceChapter13Learning,'प्राकृतिक संसाधन':scienceChapter14Learning,'हमारा पर्यावरण':scienceChapter15Learning};return <Simple title={subject.name} back={back}>{isMath&&<MathSectionHero chapters={subject.chapters}/>}<div className={isMath?'math-section-wrap':'subject-section'}><p className="page-lead">{subject.desc}</p><div className="chapter-grid">{subject.chapters.map((c,i)=>{const data=getChapterContent(subject.name,c);const effectiveData=subject.id==='science'?(scienceData[c]||data):data;return <button className="chapter-card pressable" key={c} onClick={()=>open(c)}>{isMath&&<MathChapterDecor chapter={c} index={i}/>}<span className="chapter-no">अध्याय {i+1}</span><strong>{c}</strong><small>{effectiveData?.goal||'अध्याय अध्ययन सामग्री'}</small><div className="chapter-actions"><span>📖 सीखें</span><span>📝 अभ्यास</span><span>🔥 चुनौती</span><span>🎯 टेस्ट</span></div><b>खोलें →</b></button>})}</div></div></Simple>}
function ChapterPage({subject,chapter,initialMode,onModeChange,back,addXp,finishSession}){const[mode,setMode]=useState(initialMode||null);const changeMode=next=>{setMode(next);onModeChange?.(next)};const baseData=getChapterContent(subject.name,chapter);if(subject?.id==='hindi')return <Simple title={chapter} back={back}><HindiHubEngine chapter={chapter} initialMode={mode} onBack={()=>{if(mode){changeMode(null);return}back()}} addXp={addXp} finishSession={finishSession}/></Simple>;if(subject?.id==='sanskrit')return <Simple title={chapter} back={back}><SanskritChapterEngine chapter={chapter} initialMode={mode} onModeChange={changeMode} back={back} addXp={addXp} finishSession={finishSession}/></Simple>;const isEnglishReader1=subject?.id==='english'&&chapter==='Reader • 1 I’m going to dance again';if(isEnglishReader1)return <Simple title={chapter} back={back}><EnglishReaderChapter1 initialMode={mode} onBack={back} addXp={addXp} finishSession={finishSession}/></Simple>;if(subject?.id==='english'&&chapter==='Panorama • Prose 1 Dharam Juddha')return <Simple title={chapter} back={back}><EnglishPanoramaChapter1 initialMode={mode} onBack={back} addXp={addXp} finishSession={finishSession}/></Simple>;if(subject?.id==='english'&&chapter==='Panorama • Prose 2 Yayati')return <Simple title={chapter} back={back}><EnglishPanoramaChapter2 initialMode={mode} onBack={back} addXp={addXp} finishSession={finishSession}/></Simple>;if(subject?.id==='english'&&chapter==='Panorama • Prose 3 A Silent Revolution')return <Simple title={chapter} back={back}><EnglishPanoramaChapter3 initialMode={mode} onBack={back} addXp={addXp} finishSession={finishSession}/></Simple>;if(subject?.id==='english'&&chapter==='Panorama • Prose 4 Too Many People, Too Few Trees')return <Simple title={chapter} back={back}><EnglishPanoramaChapter4 initialMode={mode} onBack={back} addXp={addXp} finishSession={finishSession}/></Simple>;const isScienceChapter1=subject.name==='विज्ञान'&&chapter==='हमारे आसपास के पदार्थ';const isScienceChapter2=subject.name==='विज्ञान'&&chapter==='क्या हमारे आसपास के पदार्थ शुद्ध हैं?';const isScienceChapter3=subject.name==='विज्ञान'&&chapter==='परमाणु एवं अणु';const isScienceChapter4=subject.name==='विज्ञान'&&chapter==='परमाणु की संरचना';const isScienceChapter5=subject.name==='विज्ञान'&&chapter==='जीवन की मौलिक इकाई — कोशिका';const isScienceChapter6=subject.name==='विज्ञान'&&chapter==='ऊतक';const isScienceChapter7=subject.name==='विज्ञान'&&chapter==='गति';const isScienceChapter8=subject.name==='विज्ञान'&&chapter==='बल तथा गति के नियम';const isScienceChapter9=subject.name==='विज्ञान'&&chapter==='गुरुत्वाकर्षण';const isScienceChapter10=subject.name==='विज्ञान'&&chapter==='कार्य तथा ऊर्जा';const isScienceChapter11=subject.name==='विज्ञान'&&chapter==='ध्वनि';const isScienceChapter12=subject.name==='विज्ञान'&&chapter==='खाद्य संसाधनों में सुधार';const isScienceChapter13=subject.name==='विज्ञान'&&chapter==='हम बीमार क्यों होते हैं';const isScienceChapter14=subject.name==='विज्ञान'&&chapter==='प्राकृतिक संसाधन';const isScienceChapter15=subject.name==='विज्ञान'&&chapter==='हमारा पर्यावरण';const isPolynomial=subject.name==='गणित'&&chapter==='बहुपद';const isCoordinate=subject.name==='गणित'&&chapter==='निर्देशांक ज्यामिति';const isLinear=subject.name==='गणित'&&chapter==='दो चरों वाले रैखिक समीकरण';const isEuclid=subject.name==='गणित'&&chapter==='यूक्लिड की ज्यामिति का परिचय';const isLinesAngles=subject.name==='गणित'&&chapter==='रेखाएँ और कोण';const isTriangles=subject.name==='गणित'&&chapter==='त्रिभुज';const isQuadrilateral=subject.name==='गणित'&&chapter==='चतुर्भुज';const isArea=subject.name==='गणित'&&chapter==='समान्तर चतुर्भुजों और त्रिभुजों का क्षेत्रफल';const isCircles=subject.name==='गणित'&&chapter==='वृत्त';const isConstructions=subject.name==='गणित'&&chapter==='रचनाएँ';const isHeron=subject.name==='गणित'&&chapter==='हीरोन का सूत्र';const isSurfaceVolume=subject.name==='गणित'&&chapter==='पृष्ठीय क्षेत्रफल एवं आयतन';const isStatistics=subject.name==='गणित'&&chapter==='सांख्यिकी';const isProbability=subject.name==='गणित'&&chapter==='प्रायिकता';const data=isPolynomial?{goal:chapter2Learning.goal,lessons:chapter2Learning.sections}:isCoordinate?{goal:chapter3Learning.goal,lessons:chapter3Learning.lessons}:isLinear?chapter4Learning:isEuclid?chapter5Learning:isLinesAngles?chapter6Learning:isTriangles?chapter7Learning:isQuadrilateral?chapter8Learning:isArea?chapter9Learning:isCircles?chapter10Learning:isConstructions?chapter11Learning:isHeron?chapter12Learning:isSurfaceVolume?chapter13Learning:isStatistics?chapter14Learning:isProbability?chapter15Learning:isScienceChapter1?scienceChapter1Learning:isScienceChapter2?scienceChapter2Learning:isScienceChapter3?scienceChapter3Learning:isScienceChapter4?scienceChapter4Learning:isScienceChapter5?scienceChapter5Learning:isScienceChapter6?scienceChapter6Learning:isScienceChapter7?scienceChapter7Learning:isScienceChapter8?scienceChapter8Learning:isScienceChapter9?scienceChapter9Learning:isScienceChapter10?scienceChapter10Learning:isScienceChapter11?scienceChapter11Learning:isScienceChapter12?scienceChapter12Learning:isScienceChapter13?scienceChapter13Learning:isScienceChapter14?scienceChapter14Learning:isScienceChapter15?scienceChapter15Learning:baseData;if(isScienceChapter1)return <ScienceChapter1Engine2 chapter={chapter} onBack={back} addXp={addXp} finishSession={finishSession}/>;if(isScienceChapter2)return <ScienceChapter2Engine chapter={chapter} onBack={back} addXp={addXp} finishSession={finishSession}/>;if(isScienceChapter3)return <ScienceChapter3Engine chapter={chapter} onBack={back} addXp={addXp} finishSession={finishSession}/>;if(isScienceChapter4)return <ScienceChapter4Engine chapter={chapter} onBack={back} addXp={addXp} finishSession={finishSession}/>;if(isScienceChapter5)return <ScienceChapter5Engine chapter={chapter} onBack={back} addXp={addXp} finishSession={finishSession}/>;if(isScienceChapter6)return <ScienceChapter6Engine chapter={chapter} onBack={back} addXp={addXp} finishSession={finishSession}/>;if(isScienceChapter7)return <ScienceChapter7Engine chapter={chapter} onBack={back} addXp={addXp} finishSession={finishSession}/>;if(isScienceChapter8)return <ScienceChapter8Engine chapter={chapter} onBack={back} addXp={addXp} finishSession={finishSession}/>;if(isScienceChapter9)return <ScienceChapter9Engine chapter={chapter} onBack={back} addXp={addXp} finishSession={finishSession}/>;if(isScienceChapter10)return <ScienceChapter10Engine chapter={chapter} onBack={back} addXp={addXp} finishSession={finishSession}/>;if(isScienceChapter11)return <ScienceChapter11Engine chapter={chapter} onBack={back} addXp={addXp} finishSession={finishSession}/>;if(isScienceChapter12)return <ScienceChapter12Engine chapter={chapter} onBack={back} addXp={addXp} finishSession={finishSession}/>;if(isScienceChapter13)return <ScienceChapter13Engine chapter={chapter} onBack={back} addXp={addXp} finishSession={finishSession}/>;if(isScienceChapter14)return <ScienceChapter14Engine chapter={chapter} onBack={back} addXp={addXp} finishSession={finishSession}/>;if(isScienceChapter15)return <ScienceChapter15Engine chapter={chapter} onBack={back} addXp={addXp} finishSession={finishSession}/>;if(mode==='learn')return <LearningEngine subject={subject} chapter={chapter} data={data} onBack={()=>changeMode(null)} addXp={addXp} finishSession={finishSession}/>;if(['practice','challenge','test'].includes(mode)){if(isPolynomial)return <PolynomialEngine subject={subject} chapter={chapter} mode={mode} onBack={()=>changeMode(null)} addXp={addXp}/>;if(isCoordinate)return <CoordinateEngine chapter={chapter} mode={mode} onBack={()=>changeMode(null)} addXp={addXp}/>;if(isLinear)return <LinearEquationEngine subject={subject} chapter={chapter} mode={mode} onBack={()=>changeMode(null)} addXp={addXp}/>;if(isEuclid)return <EuclidEngine chapter={chapter} mode={mode} onBack={()=>changeMode(null)} addXp={addXp}/>;if(isLinesAngles)return <LinesAnglesEngine chapter={chapter} mode={mode} onBack={()=>changeMode(null)} addXp={addXp}/>;if(isTriangles)return <TrianglesEngine chapter={chapter} mode={mode} onBack={()=>changeMode(null)} addXp={addXp}/>;if(isQuadrilateral)return <QuadrilateralEngine chapter={chapter} mode={mode} onBack={()=>changeMode(null)} addXp={addXp}/>;if(isArea)return <AreaEngine chapter={chapter} mode={mode} onBack={()=>changeMode(null)} addXp={addXp}/>;if(isCircles)return <CirclesEngine chapter={chapter} mode={mode} onBack={()=>changeMode(null)} addXp={addXp}/>;if(isConstructions)return <ConstructionsEngine chapter={chapter} mode={mode} onBack={()=>changeMode(null)} addXp={addXp}/>;if(isHeron)return <HeronEngine chapter={chapter} mode={mode} onBack={()=>changeMode(null)} addXp={addXp}/>;if(isSurfaceVolume)return <SurfaceVolumeEngine chapter={chapter} mode={mode} onBack={()=>changeMode(null)} addXp={addXp}/>;if(isStatistics)return <StatisticsEngine chapter={chapter} mode={mode} onBack={()=>changeMode(null)} addXp={addXp}/>;if(isProbability)return <ProbabilityEngine chapter={chapter} mode={mode} onBack={()=>changeMode(null)} addXp={addXp}/>;return <StudyEngine subject={subject} chapter={chapter} mode={mode} onBack={()=>changeMode(null)} addXp={addXp}/>}const modes=[['learn','📖','सीखें','सरल explanation + examples','10'],['practice','📝','अभ्यास','Concept समझने के बाद smart XP','smart'],['challenge','🔥','चुनौती','थोड़े कठिन प्रश्न','smart'],['test','🎯','टेस्ट','समयबद्ध self-assessment','smart']];return <Simple title={chapter} back={back}><div className="chapter-hero-card"><span>📚</span><div><strong>{subject.name}</strong><small>{data?.goal||'अध्याय अध्ययन'}</small></div></div><div className="mode-grid">{modes.map(([id,ic,t,d,x])=><button className="mode-card pressable" key={id} onClick={()=>changeMode(id)}><span className="mode-icon">{ic}</span><strong>{t}</strong><span>{d}</span><em>{x==='smart'?'Performance-based XP':`+${x} XP`}</em><b>→</b></button>)}</div></Simple>}
function Meter({progress,back}){const[canonical,setCanonical]=useState(()=>getCanonicalProgress());useEffect(()=>{const refresh=()=>setCanonical(getCanonicalProgress());refresh();window.addEventListener('class9-progress-updated',refresh);window.addEventListener('storage',refresh);return()=>{window.removeEventListener('class9-progress-updated',refresh);window.removeEventListener('storage',refresh)}},[]);const metrics=calculatePreparationMeter(canonical);const accuracy=metrics.hasPerformanceData?`${metrics.performancePercent}%`:'—';return <Simple title="तैयारी मीटर" back={back}><div className="meter-box"><div className="meter-ring"><span>{metrics.readiness}%</span></div><h2>{metrics.label}</h2><p>यह readiness score आपके canonical learning stages और वास्तविक quiz performance से बनता है। XP अकेले score को नहीं बढ़ाता।</p><div className="meter-stats"><span>📚 {metrics.coveragePercent}% कवरेज</span><span>🎯 {accuracy} quiz accuracy</span><span>🧩 {metrics.completedStages}/{metrics.totalStages} stages</span></div></div><XPBadgeSection xp={progress.xp}/></Simple>}
function CBTPage({back}){return <Simple title="BSEB CBT" back={back}><div className="cbt-launch-card"><div className="cbt-icon">🎯</div><span className="badge">EXAM MODE</span><h2>{cbtConfig.title}</h2><p>{cbtConfig.description}</p><div className="cbt-points"><span>⏱ समयबद्ध परीक्षा</span><span>📝 Objective + Exam Flow</span><span>📧 Submission</span></div><div className="cbt-actions"><a className="primary-btn pressable" href={cbtConfig.url} target="_blank" rel="noopener noreferrer">CBT खोलें ↗</a><button className="secondary-btn pressable" onClick={back}>बाद में</button></div><small className="cbt-note">CBT एक अलग Netlify app है; यह Learning Hub का connected exam entry point है।</small></div></Simple>}
function Simple({title,back,children}){return <main className="page"><header className="page-header"><button className="pressable" onClick={back}>← वापस</button><div className="badge">कक्षा 9 • लर्निंग हब</div><h1>{title}</h1></header><section className="page-content">{children}</section></main>}
function Tutor({close}){return <div className="modal-backdrop" onClick={close}><div className="tutor-modal" onClick={e=>e.stopPropagation()}><button className="modal-close pressable" onClick={close}>×</button><span className="tutor-avatar">🤖</span><h2>स्मार्ट ट्यूटर</h2><p>पूछें: “यह concept आसान भाषा में समझाओ”</p><button className="primary-btn pressable" onClick={close}>समझ गया ✓</button></div></div>}
export default App;
