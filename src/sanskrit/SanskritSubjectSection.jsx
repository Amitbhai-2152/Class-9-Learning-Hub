import React,{useMemo,useState} from 'react';
import {SANSKRIT_PRIMARY_CHAPTERS,SANSKRIT_SUPPLEMENTARY_CHAPTERS} from './sanskritChapterRegistry';
import './sanskrit-section.css';

const modes=[
 {id:'learn',icon:'📖',title:'सीखें',desc:'भावार्थ, शब्दार्थ और मुख्य बिंदु'},
 {id:'practice',icon:'📝',title:'अभ्यास',desc:'बुनियादी समझ की जाँच'},
 {id:'challenge',icon:'🔥',title:'चुनौती',desc:'कठिन और सोच-वाले प्रश्न'},
 {id:'test',icon:'🎯',title:'फाइनल टेस्ट',desc:'समयबद्ध objective assessment'},
];

const practice=[
 {q:'“वाणी” और “मन” के वापस लौटने का संकेत किसकी महत्ता बताता है?',options:['ब्रह्म-तत्त्व की असीमता','वन का सौन्दर्य','ऋतु-परिवर्तन','युद्ध-कौशल'],answer:0,explain:'पाठ का केंद्रीय विचार यह है कि परम तत्त्व सामान्य वाणी और मन की पहुँच से परे है।'},
 {q:'“ईशस्तुति” का मुख्य उद्देश्य क्या है?',options:['ऐतिहासिक घटना बताना','ईश्वर/परम तत्त्व की महिमा पर चिंतन कराना','व्यापार सिखाना','यात्रा-वर्णन करना'],answer:1,explain:'यह पाठ स्तुति के माध्यम से परम सत्ता के स्वरूप पर विचार कराता है।'},
 {q:'पाठ में “मन” किस क्षमता का प्रतिनिधि है?',options:['विचार करने की क्षमता','कृषि करने की क्षमता','गायन की क्षमता','दौड़ने की क्षमता'],answer:0,explain:'मन विचार और बोध का माध्यम माना गया है।'},
 {q:'पाठ की भाषा का सबसे उपयुक्त वर्णन क्या है?',options:['दार्शनिक और काव्यात्मक','केवल वैज्ञानिक','केवल हास्यात्मक','व्यावसायिक'],answer:0,explain:'पाठ में दार्शनिक भाव और काव्यात्मक अभिव्यक्ति साथ मिलती है।'},
 {q:'अध्ययन के लिए इस पाठ का सबसे उपयोगी निष्कर्ष क्या है?',options:['हर बात केवल याद करनी चाहिए','सीमा और असीमता के अंतर को समझना चाहिए','व्याकरण की आवश्यकता नहीं है','कविता में अर्थ नहीं होता'],answer:1,explain:'पाठ विद्यार्थी को अपनी ज्ञान-सीमा और गहरे तत्त्व-चिंतन के संबंध पर सोचने के लिए प्रेरित करता है।'},
];

const challenge=[
 {q:'यदि किसी प्रश्न का उत्तर “ब्रह्म” के रूप में दिया जा रहा है, तो पाठ के संदर्भ में सबसे सटीक कारण क्या होगा?',options:['क्योंकि ब्रह्म केवल दिखाई देने वाली वस्तु है','क्योंकि पाठ परम तत्त्व की ऐसी सत्ता पर चिंतन करता है जिसे सामान्य इन्द्रिय-बोध पूरी तरह नहीं पकड़ सकता','क्योंकि ब्रह्म एक स्थान का नाम है','क्योंकि वह केवल व्याकरणिक शब्द है'],answer:1,explain:'पाठ का दार्शनिक केंद्र प्रत्यक्ष सीमाओं से परे परम तत्त्व की चर्चा है।'},
 {q:'“वाणी लौट आती है” जैसी धारणा किस दार्शनिक संकेत को मजबूत करती है?',options:['भाषा की निरर्थकता','वाणी की सीमा और परम तत्त्व की व्यापकता','केवल मौन का महत्व','कविता का अभाव'],answer:1,explain:'यहाँ उद्देश्य भाषा को निरर्थक बताना नहीं, बल्कि उसकी सीमा को दिखाना है।'},
 {q:'एक विद्यार्थी कहता है—“जो शब्दों में पूरी तरह न आए, वह ज्ञान नहीं हो सकता।” पाठ से कौन-सा निष्कर्ष उसके तर्क को सबसे बेहतर चुनौती देता है?',options:['हर बात कठिन होती है','कुछ तत्त्व सामान्य वर्णन से परे हो सकते हैं और फिर भी चिंतन के योग्य होते हैं','शब्द हमेशा गलत होते हैं','मन कुछ भी नहीं समझता'],answer:1,explain:'पाठ अनुभव, चिंतन और परम तत्त्व की सीमा के बीच अंतर दिखाता है।'},
 {q:'पाठ के अध्ययन में “शब्दार्थ + भावार्थ + व्याकरण” तीनों को साथ रखने का लाभ क्या है?',options:['सिर्फ उत्तर याद होते हैं','भाषा, अर्थ और संरचना की संयुक्त समझ बनती है','पढ़ाई लंबी हो जाती है','केवल परीक्षा आसान होती है'],answer:1,explain:'संस्कृत पठन में अर्थ और व्याकरण को अलग करने के बजाय जोड़ना अधिक प्रभावी है।'},
];

const subjective=[
 'ईशस्तुति पाठ के केंद्रीय भाव को अपनी भाषा में स्पष्ट कीजिए।',
 'पाठ में वाणी और मन की सीमा का जो संकेत मिलता है, उसे समझाइए।',
 'ईशस्तुति के अध्ययन से विद्यार्थी के व्यक्तित्व में कौन-से बौद्धिक गुण विकसित हो सकते हैं?'
];

function Quiz({questions,addXp,finishSession,label}){
 const [selected,setSelected]=useState({});
 const [submitted,setSubmitted]=useState(false);
 const score=questions.reduce((n,item,i)=>n+(selected[i]===item.answer?1:0),0);
 const submit=()=>{if(submitted)return;setSubmitted(true);addXp?.(Math.max(5,score*5));finishSession?.({subject:'संस्कृत',chapter:'ईशस्तुति:',mode:label,attempted:questions.length,correct:score,completed:true,at:new Date().toISOString()});};
 return <section className="sanskrit-quiz"><div className="sanskrit-section-head"><div><span className="sanskrit-kicker">{label}</span><h2>{label==='फाइनल टेस्ट'?'अध्याय 1 • Final Assessment':'अभ्यास सेट'}</h2></div><span className="sanskrit-score">{submitted?`${score}/${questions.length}`:'अभी प्रयास करें'}</span></div>{questions.map((item,i)=><article className="sanskrit-question" key={item.q}><h3>{i+1}. {item.q}</h3><div className="sanskrit-options">{item.options.map((opt,j)=><button key={opt} disabled={submitted} className={`sanskrit-option ${selected[i]===j?'is-selected':''} ${submitted&&j===item.answer?'is-correct':''} ${submitted&&selected[i]===j&&j!==item.answer?'is-wrong':''}`} onClick={()=>setSelected(s=>({...s,[i]:j}))}>{String.fromCharCode(65+j)}. {opt}</button>)}</div>{submitted&&<p className="sanskrit-explain">{item.explain}</p>}</article>)}<button className="primary-btn pressable" disabled={Object.keys(selected).length!==questions.length||submitted} onClick={submit}>{submitted?'प्रयास जमा हो चुका है ✓':'उत्तर जाँचें →'}</button></section>;
}

export function SanskritSubjectSection({open}){
 const [tab,setTab]=useState('primary');
 const chapters=tab==='primary'?SANSKRIT_PRIMARY_CHAPTERS:SANSKRIT_SUPPLEMENTARY_CHAPTERS;
 return <div className="sanskrit-subject">
  <div className="sanskrit-hero-card"><div><span className="sanskrit-kicker">कक्षा 9 • BSEB</span><h2>संस्कृत — पीयूषम् भाग-1</h2><p>पाठ + व्याकरण + परीक्षा अभ्यास को एक ही learning flow में पढ़ें।</p></div><div className="sanskrit-hero-mark">ॐ</div></div>
  <div className="sanskrit-book-tabs"><button className={tab==='primary'?'active':''} onClick={()=>setTab('primary')}>मुख्य पुस्तक · 15 अध्याय</button><button className={tab==='supplementary'?'active':''} onClick={()=>setTab('supplementary')}>पूरक · 21 अध्याय</button></div>
  <div className="sanskrit-chapter-grid">{chapters.map((c,i)=><button className={`sanskrit-chapter-card pressable ${c.status==='pilot'?'pilot':''}`} key={`${tab}-${c.number}`} onClick={()=>tab==='primary'&&c.number===1?open(c):null}><span className="sanskrit-chapter-number">{c.status==='pilot'?'PILOT':`अध्याय ${c.number}`}</span><strong>{c.title}</strong><small>{c.category==='पद्य'?'पद्य पाठ':'गद्य पाठ'} {c.status==='pilot'?'• इंटरैक्टिव':''}</small><div className="sanskrit-card-actions"><span>📖 सीखें</span><span>📝 अभ्यास</span><span>🔥 चुनौती</span><span>🎯 टेस्ट</span></div>{tab==='primary'&&c.number===1?<b>अभी खोलें →</b>:<em>जल्द उपलब्ध</em>}</button>)}</div>
  <div className="sanskrit-note"><strong>Content roadmap</strong><span>पहले अध्याय 1 को पूरी तरह interactive बनाया गया है; बाकी अध्याय इसी engine पर जोड़े जाएँगे।</span></div>
 </div>;
}

export function SanskritChapterEngine({chapter,initialMode,onModeChange,back,addXp,finishSession}){
 const [mode,setMode]=useState(initialMode||null);
 const [showAnswers,setShowAnswers]=useState(false);
 const change=m=>{setMode(m);onModeChange?.(m);};
 if(mode==='practice') return <div className="sanskrit-engine"><button className="secondary-btn pressable" onClick={()=>change(null)}>← अध्याय मेनू</button><Quiz questions={practice} label="अभ्यास" addXp={addXp} finishSession={finishSession}/></div>;
 if(mode==='challenge') return <div className="sanskrit-engine"><button className="secondary-btn pressable" onClick={()=>change(null)}>← अध्याय मेनू</button><Quiz questions={challenge} label="चुनौती" addXp={addXp} finishSession={finishSession}/></div>;
 if(mode==='test') return <div className="sanskrit-engine"><button className="secondary-btn pressable" onClick={()=>change(null)}>← अध्याय मेनू</button><Quiz questions={[...practice,...challenge].slice(0,8)} label="फाइनल टेस्ट" addXp={addXp} finishSession={finishSession}/></div>;
 if(mode==='learn') return <div className="sanskrit-engine"><button className="secondary-btn pressable" onClick={()=>change(null)}>← अध्याय मेनू</button><section className="sanskrit-learning-card"><span className="sanskrit-kicker">अध्याय 1 • पद्य</span><h2>ईशस्तुति:</h2><p className="sanskrit-lead">यह पाठ परम तत्त्व की महत्ता, उसकी व्यापकता और सामान्य वाणी-मन की सीमाओं पर दार्शनिक चिंतन कराता है।</p><div className="sanskrit-learning-grid"><div><h3>मुख्य भाव</h3><p>जो सत्ता साधारण वर्णन से पूरी तरह व्यक्त नहीं हो सकती, उसके प्रति विनम्रता और जिज्ञासा विकसित करना इस पाठ का प्रमुख अध्ययन-बिंदु है।</p></div><div><h3>शब्दार्थ संकेत</h3><p>वाणी = बोलने की शक्ति · मन = विचार करने का साधन · ब्रह्म = परम तत्त्व · निवर्तन्ते = वापस लौटते हैं।</p></div><div><h3>परीक्षा फोकस</h3><p>भावार्थ, संदर्भ-आधारित प्रश्न, शब्दार्थ, व्याकरणिक पहचान और दार्शनिक आशय पर प्रश्न तैयार रखें।</p></div><div><h3>उत्तर लिखने की रणनीति</h3><p>पहले सीधा उत्तर, फिर एक कारण/व्याख्या और अंत में पाठ के भाव से जोड़ना—यह subjective उत्तर को अधिक प्रभावी बनाता है।</p></div></div><button className="primary-btn pressable" onClick={()=>setShowAnswers(v=>!v)}>{showAnswers?'Subjective छिपाएँ':'Subjective अभ्यास दिखाएँ'}</button>{showAnswers&&<div className="sanskrit-subjective-list">{subjective.map((q,i)=><article key={q}><span>स-प्रश्न {i+1}</span><p>{q}</p><div className="sanskrit-writing-lines">उत्तर लिखने का स्थान …</div></article>)}</div>}</section></div>;
 return <div className="sanskrit-engine"><button className="secondary-btn pressable" onClick={back}>← संस्कृत अध्यायों पर लौटें</button><section className="sanskrit-chapter-hero"><div className="sanskrit-round">1</div><div><span className="sanskrit-kicker">मुख्य पुस्तक • पीयूषम् भाग-1</span><h2>{chapter}</h2><p>दार्शनिक पद्य • शब्दार्थ • भावार्थ • अभ्यास</p></div></section><div className="sanskrit-mode-grid">{modes.map(m=><button key={m.id} className="sanskrit-mode-card pressable" onClick={()=>change(m.id)}><span>{m.icon}</span><strong>{m.title}</strong><small>{m.desc}</small><b>शुरू करें →</b></button>)}</div><section className="sanskrit-subjective-panel"><div><span className="sanskrit-kicker">लेखन कौशल</span><h3>3 महत्वपूर्ण Subjective प्रश्न</h3></div>{subjective.map(q=><p key={q}>✦ {q}</p>)}</section></div>;
}
