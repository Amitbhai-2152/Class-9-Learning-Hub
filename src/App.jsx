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
import {MathSectionHero,MathChapterDecor} from './MathSectionVisuals';
import {cbtConfig} from './cbtConfig';
import './styles.css';
import './math-section.css';

const subjects=[
{id:'math',name:'गणित',icon:'∑',desc:'संख्या, बीजगणित, ज्यामिति और तर्क',chapters:['संख्या पद्धति','बहुपद','निर्देशांक ज्यामिति','दो चरों वाले रैखिक समीकरण','यूक्लिड की ज्यामिति का परिचय','रेखाएँ और कोण','त्रिभुज','चतुर्भुज','समान्तर चतुर्भुजों और त्रिभुजों का क्षेत्रफल','वृत्त','रचनाएँ','हीरोन का सूत्र','पृष्ठीय क्षेत्रफल एवं आयतन','सांख्यिकी','प्रायिकता']},
{id:'science',name:'विज्ञान',icon:'⚗',desc:'भौतिकी, रसायन और जीव विज्ञान',chapters:['हमारे आसपास के पदार्थ','क्या हमारे आसपास के पदार्थ शुद्ध हैं?','परमाणु एवं अणु','परमाणु की संरचना','जीवन की मौलिक इकाई — कोशिका','ऊतक','गति','बल तथा गति के नियम','गुरुत्वाकर्षण','कार्य तथा ऊर्जा','ध्वनि','खाद्य संसाधनों में सुधार','हम बीमार क्यों होते हैं','प्राकृतिक संसाधन']},
{id:'hindi',name:'हिन्दी',icon:'अ',desc:'गद्य, पद्य, भाषा और लेखन',chapters:['कहानी के प्लॉट–1']},
{id:'sst',name:'सामाजिक विज्ञान',icon:'◎',desc:'इतिहास, भूगोल, नागरिक शास्त्र और अर्थशास्त्र',chapters:['भौगोलिक खोजें–भाग 1']},
{id:'sanskrit',name:'संस्कृत',icon:'ॐ',desc:'पाठ, व्याकरण और संस्कृत अभ्यास',chapters:['ईशस्तुति']},
{id:'english',name:'अंग्रेज़ी',icon:'A',desc:'पाठ, व्याकरण, शब्दावली और लेखन',chapters:['व्याकरण, काल और शब्दावली']},
{id:'reasoning',name:'तर्कशक्ति',icon:'?',desc:'तर्क, पैटर्न और समस्या समाधान',chapters:['उन्नत तर्कशक्ति']}
];

const initial={xp:0,streak:1,dailyXp:0,goal:100,sessions:[]};
const LEVEL_XP=250;
const safeProgress=value=>{const source=value&&typeof value==='object'&&!Array.isArray(value)?value:{};return {...initial,...source,xp:Number.isFinite(source.xp)?source.xp:0,streak:Number.isFinite(source.streak)?source.streak:1,dailyXp:Number.isFinite(source.dailyXp)?source.dailyXp:0,goal:Number.isFinite(source.goal)&&source.goal>0?source.goal:100,sessions:Array.isArray(source.sessions)?source.sessions:[]}};
const load=(key,fallback)=>{try{return safeProgress(JSON.parse(localStorage.getItem(key))??fallback)}catch{return safeProgress(fallback)}};
function App(){const[page,setPage]=useState('home');const[subject,setSubject]=useState(null);const[chapter,setChapter]=useState(null);const[progress,setProgress]=useState(()=>load('class9-progress',initial));const[tutor,setTutor]=useState(false);const[toast,setToast]=useState('');useEffect(()=>{try{localStorage.setItem('class9-progress',JSON.stringify(safeProgress(progress)))}catch{}},[progress]);const addXp=n=>{const amount=Number.isFinite(n)?n:0;setProgress(p=>{const safe=safeProgress(p);return {...safe,xp:safe.xp+amount,dailyXp:Math.min(safe.goal,safe.dailyXp+amount)}});if(amount){setToast(`+${amount} XP`);setTimeout(()=>setToast(''),1100)}};const finishSession=meta=>setProgress(p=>{const safe=safeProgress(p);return {...safe,sessions:[...safe.sessions,meta].slice(-100)}});const startSubject=s=>{setSubject(s);setPage('subject')};const startChapter=c=>{setChapter(c);setPage('chapter')};if(page==='classes')return <Classes back={()=>setPage('home')} open={startSubject}/>;if(page==='subject')return <SubjectPage subject={subject} back={()=>setPage('classes')} open={startChapter}/>;if(page==='chapter')return <ChapterPage subject={subject} chapter={chapter} back={()=>setPage('subject')} addXp={addXp} finishSession={finishSession}/>;if(page==='meter')return <Meter progress={progress} back={()=>setPage('home')}/>;if(page==='cbt')return <CBTPage back={()=>setPage('home')}/>;return <Home progress={progress} setPage={setPage} tutor={tutor} setTutor={setTutor} toast={toast}/>;}
function Home({progress,setPage,tutor,setTutor,toast}){const level=Math.floor(progress.xp/LEVEL_XP)+1,pct=Math.round((progress.xp%LEVEL_XP)/LEVEL_XP*100);return <main className="app-shell"><nav className="topbar"><strong className="brand">पढ़ाई</strong><span className="nav-class">कक्षा 9</span><div className="top-stats"><span>🔥 {progress.streak} दिन</span><span>⚡ {progress.xp} XP</span><span>LVL {level}</span></div><button className="tutor-mini pressable" onClick={()=>setTutor(true)}>✦ Smart Tutor</button></nav><header className="hero"><div className="hero-inner"><div className="badge">कक्षा 9 • STUDY SPACE</div><h1>आज की पढ़ाई शुरू करें।</h1><p>ध्यान से पढ़ें, अभ्यास करें और हर कदम पर XP कमाएँ।</p></div></header><section className="dashboard"><div className="progress-strip"><div className="level-badge"><span>LVL</span><strong>{level}</strong></div><div className="level-copy"><div className="level-title"><strong>आपकी सीखने की ऊर्जा</strong><span>{progress.xp%LEVEL_XP} / {LEVEL_XP} XP</span></div><div className="progress-track"><span style={{width:`${pct}%`}}/></div><small>अगले लेवल तक आपकी प्रगति</small></div><div className="daily-goal"><strong>{progress.dailyXp} XP</strong><span>आज का लक्ष्य {progress.goal}</span></div></div><div className="section-heading"><div><span className="eyebrow">कक्षा 9</span><h2>अध्ययन सुविधाएँ</h2></div><span className="focus-label">🎯 Focus Mode</span></div><div className="offering-grid"><button className="offering-card pressable" onClick={()=>setPage('classes')}><span className="offering-icon">▣</span><span className="offering-copy"><strong>सभी कक्षाएँ</strong><small>सभी विषय और अध्याय देखें</small></span><span>›</span></button><button className="offering-card pressable" onClick={()=>setPage('cbt')}><span className="offering-icon">✎</span><span className="offering-copy"><strong>सभी टेस्ट</strong><small>अभ्यास + BSEB CBT परीक्षा</small></span><span>›</span></button><button className="offering-card pressable" onClick={()=>setPage('meter')}><span className="offering-icon">◔</span><span className="offering-copy"><strong>तैयारी मीटर</strong><small>अभ्यास और सीखने की प्रगति देखें</small></span><span>›</span></button></div><button className="tutor-banner pressable" onClick={()=>setTutor(true)}><span>🤖</span><div><strong>स्मार्ट ट्यूटर AI</strong><small>सवाल पूछें, concepts समझें और study plan बनाएँ।</small></div><b>पूछें →</b></button></section>{toast&&<div className="xp-toast">⚡ {toast}</div>}{tutor&&<Tutor close={()=>setTutor(false)}/>}</main>}
function Classes({back,open}){return <Simple title="सभी कक्षाएँ" back={back}><div className="subject-grid">{subjects.map((s,i)=><button className="subject-tile pressable" key={s.id} onClick={()=>open(s)}><span className="subject-icon">{s.icon}</span><span className="subject-index">{String(i+1).padStart(2,'0')}</span><strong>{s.name}</strong><small>{s.desc}</small><b>अध्याय देखें →</b></button>)}</div></Simple>}
function SubjectPage({subject,back,open}){const isMath=subject?.id==='math';const scienceData={'हमारे आसपास के पदार्थ':scienceChapter1Learning,'क्या हमारे आसपास के पदार्थ शुद्ध हैं?':scienceChapter2Learning,'परमाणु एवं अणु':scienceChapter3Learning,'परमाणु की संरचना':scienceChapter4Learning,'जीवन की मौलिक इकाई — कोशिका':scienceChapter5Learning,'ऊतक':scienceChapter6Learning,'गति':scienceChapter7Learning,'बल तथा गति के नियम':scienceChapter8Learning,'गुरुत्वाकर्षण':scienceChapter9Learning,'कार्य तथा ऊर्जा':scienceChapter10Learning,'ध्वनि':scienceChapter11Learning,'खाद्य संसाधनों में सुधार':scienceChapter12Learning,'हम बीमार क्यों होते हैं':scienceChapter13Learning,'प्राकृतिक संसाधन':scienceChapter14Learning};return <Simple title={subject.name} back={back}>{isMath&&<MathSectionHero chapters={subject.chapters}/>}<div className={isMath?'math-section-wrap':'subject-section'}><p className="page-lead">{subject.desc}</p><div className="chapter-grid">{subject.chapters.map((c,i)=>{const data=getChapterContent(subject.name,c);const effectiveData=subject.id==='science'?(scienceData[c]||data):data;return <button className="chapter-card pressable" key={c} onClick={()=>open(c)}>{isMath&&<MathChapterDecor chapter={c} index={i}/>}<span className="chapter-no">अध्याय {i+1}</span><strong>{c}</strong><small>{effectiveData?.goal||'अध्याय अध्ययन सामग्री'}</small><div className="chapter-actions"><span>📖 सीखें</span><span>📝 अभ्यास</span><span>🔥 चुनौती</span><span>🎯 टेस्ट</span></div><b>खोलें →</b></button>})}</div></div></Simple>}
