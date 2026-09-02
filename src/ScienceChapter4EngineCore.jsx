import React,{useMemo,useState} from 'react';
import {scienceChapter4Learning} from './scienceChapter4Learning';
import {ScienceChapter4Visual} from './ScienceChapter4Visual';
import {markStageComplete} from './engines/progress/progressStore';
import './scienceChapter4.css';

const bank=[
['इलेक्ट्रॉन का आवेश कैसा होता है?',['धनात्मक','ऋणात्मक','उदासीन','दोनों'],1,'इलेक्ट्रॉन ऋणावेशित कण है।'],
['प्रोटॉन कहाँ पाया जाता है?',['नाभिक में','केवल बाहरी कोश में','पात्र के बाहर','कहीं नहीं'],0,'प्रोटॉन नाभिक में पाया जाता है।'],
['न्यूट्रॉन का विद्युत आवेश क्या है?',['धनात्मक','ऋणात्मक','उदासीन','दोगुना'],2,'न्यूट्रॉन विद्युत रूप से उदासीन होता है।'],
['रदरफोर्ड के प्रयोग से क्या निष्कर्ष निकला?',['परमाणु पूरी तरह भरा है','अधिकांश परमाणु खाली स्थान है','इलेक्ट्रॉन नाभिक में हैं','न्यूट्रॉन नहीं होते'],1,'अधिकांश अल्फा-कण सीधे निकल गए, जिससे परमाणु के बड़े हिस्से के खाली होने का संकेत मिला।'],
['थॉमसन मॉडल में इलेक्ट्रॉन कैसे माने गए?',['धनावेशित क्षेत्र में अंतर्निहित','नाभिक में बंद','केवल गैस में','अनुपस्थित'],0,'थॉमसन ने धनावेशित पृष्ठभूमि में इलेक्ट्रॉनों की कल्पना की थी।'],
['बोर मॉडल में इलेक्ट्रॉन किन अवस्थाओं में रह सकते हैं?',['किसी भी ऊर्जा पर','कुछ निश्चित ऊर्जा स्तरों में','केवल नाभिक में','केवल बाहर'],1,'बोर ने निश्चित ऊर्जा स्तरों की धारणा दी।'],
['उच्च ऊर्जा स्तर पर जाने के लिए इलेक्ट्रॉन क्या करता है?',['ऊर्जा अवशोषित करता है','ऊर्जा खोता है','द्रव्यमान खोता है','न्यूट्रॉन बनाता है'],0,'ऊर्जा मिलने पर इलेक्ट्रॉन उच्च ऊर्जा अवस्था में जा सकता है।'],
['उच्च स्तर से निम्न स्तर पर आने पर क्या हो सकता है?',['ऊर्जा उत्सर्जित हो सकती है','प्रोटॉन गायब हो जाता है','द्रव्यमान दोगुना होता है','नाभिक टूटता है'],0,'ऊर्जा अंतर के अनुसार ऊर्जा का उत्सर्जन हो सकता है।'],
['K कोश में सरल मॉडल के अनुसार अधिकतम कितने इलेक्ट्रॉन रखे जाते हैं?',['2','8','18','32'],0,'K कोश में अधिकतम 2 इलेक्ट्रॉन रखे जाते हैं।'],
['L कोश में सरल मॉडल के अनुसार अधिकतम कितने इलेक्ट्रॉन?',['2','8','18','32'],1,'L कोश में अधिकतम 8 इलेक्ट्रॉन का नियम उपयोगी है।'],
['उदासीन परमाणु में प्रोटॉन और इलेक्ट्रॉन की संख्या कैसी होती है?',['समान','हमेशा अलग','शून्य','केवल गैस में समान'],0,'उदासीन परमाणु में धन और ऋण आवेश संतुलित होते हैं।'],
['परमाणु क्रमांक किसकी संख्या है?',['प्रोटॉन','न्यूट्रॉन','कुल कण','ऊर्जा स्तर'],0,'परमाणु क्रमांक Z नाभिक में प्रोटॉनों की संख्या है।'],
['यदि Z=11, उदासीन परमाणु में इलेक्ट्रॉनों की संख्या कितनी होगी?',['10','11','12','22'],1,'उदासीन परमाणु में इलेक्ट्रॉन संख्या = प्रोटॉन संख्या = 11।'],
['द्रव्यमान संख्या A किसके बराबर होती है?',['p+n','p−n','e+n','p+e'],0,'द्रव्यमान संख्या A = प्रोटॉन + न्यूट्रॉन।'],
['A=23 और Z=11 हो तो न्यूट्रॉन कितने?',['10','11','12','34'],2,'n=A−Z=23−11=12।'],
['एक ही तत्व के समस्थानिकों में क्या समान रहता है?',['परमाणु क्रमांक','द्रव्यमान संख्या','न्यूट्रॉन','सभी कण'],0,'समस्थानिकों का परमाणु क्रमांक समान होता है।'],
['समस्थानिकों में क्या अलग हो सकता है?',['प्रोटॉन','न्यूट्रॉन','परमाणु क्रमांक','तत्व की पहचान'],1,'न्यूट्रॉन संख्या अलग होने से द्रव्यमान संख्या अलग हो सकती है।'],
['समभारिकों की द्रव्यमान संख्या कैसी होती है?',['समान','हमेशा अलग','शून्य','केवल 1'],0,'समभारिक अलग तत्वों के परमाणु होते हैं जिनकी द्रव्यमान संख्या समान होती है।'],
['सोडियम के Z=11 के लिए सरल इलेक्ट्रॉनिक विन्यास क्या है?',['2,8,1','2,7,2','8,3','1,10'],0,'11 इलेक्ट्रॉन का वितरण K=2, L=8, M=1 होता है।'],
['ऑक्सीजन के Z=8 के लिए सरल विन्यास क्या है?',['2,6','2,8','8,0','4,4'],0,'8 इलेक्ट्रॉनों का सरल वितरण 2,6 है।'],
['परमाणु की पहचान बदलने वाला मूल परिवर्तन कौन-सा है?',['प्रोटॉन संख्या बदलना','न्यूट्रॉन संख्या बदलना','केवल रंग बदलना','कक्षा का नाम बदलना'],0,'प्रोटॉन संख्या बदलने पर तत्व की पहचान बदलती है।'],
['आयन कैसे बन सकता है?',['इलेक्ट्रॉन खोने या पाने से','प्रोटॉन रंग बदलने से','न्यूट्रॉन गायब होने से हमेशा','केवल तापमान से'],0,'इलेक्ट्रॉन खोने या पाने पर परमाणु आवेशित कण बन सकता है।'],
['रदरफोर्ड के प्रयोग में अधिकांश कणों का सीधे निकलना किस बात का संकेत था?',['अधिकांश स्थान खाली है','नाभिक बहुत बड़ा है','सभी कण रुक गए','प्रोटॉन नहीं हैं'],0,'अधिकांश सीधे निकलने से परमाणु के अधिकांश भाग के खाली होने का संकेत मिला।'],
['किसी परमाणु का Z=17 और A=35 है। न्यूट्रॉन संख्या क्या होगी?',['17','18','35','52'],1,'n=35−17=18।'],
['यदि किसी उदासीन परमाणु में 13 इलेक्ट्रॉन हैं, तो उसका Z कितना होगा?',['12','13','26','0'],1,'उदासीन परमाणु में इलेक्ट्रॉन = प्रोटॉन = Z।'],
['किस मॉडल में निश्चित ऊर्जा स्तर की धारणा प्रमुख है?',['थॉमसन','रदरफोर्ड','बोर','कोई नहीं'],2,'बोर मॉडल ने निश्चित ऊर्जा स्तरों की धारणा दी।'],
['नाभिक के बारे में सही कथन कौन-सा है?',['बहुत छोटा और धनावेशित क्षेत्र','पूरे परमाणु के बराबर बड़ा','केवल इलेक्ट्रॉन से बना','उदासीन गैस है'],0,'नाभिक छोटा, सघन और धनावेशित होता है।'],
['परमाणु का लगभग पूरा द्रव्यमान मुख्यतः कहाँ केंद्रित होता है?',['नाभिक में','बाहरी कोश में','इलेक्ट्रॉनों में','खाली स्थान में'],0,'प्रोटॉन और न्यूट्रॉन नाभिक में होते हैं और अधिकांश द्रव्यमान देते हैं।'],
['किस कथन से समस्थानिकों की पहचान सही होती है?',['समान Z, अलग A','अलग Z, समान A हमेशा नहीं','समान न्यूट्रॉन','समान सभी कण'],0,'समस्थानिकों में Z समान और A अलग होती है।']
];

const visualKind=type=>({atomStructure:'atomStructure',electron:'electron',proton:'proton',neutron:'neutron',thomson:'thomson',scattering:'scattering',problem:'problem',bohr:'bohr',jump:'jump',shells:'shells',configuration:'configuration',atomicNumber:'atomicNumber',massNumber:'massNumber',calculation:'calculation',isotopes:'isotopes'}[type]||'atomStructure');
const questions=(mode)=>mode==='test'?[...bank].sort(()=>Math.random()-.5).slice(0,20):mode==='challenge'?[...bank].sort(()=>Math.random()-.5).slice(0,12):bank.slice(0,15);

export function ScienceChapter4Engine({chapter,onBack,addXp,finishSession}){
 const [mode,setMode]=useState(null),[items,setItems]=useState([]),[index,setIndex]=useState(0),[selected,setSelected]=useState(null),[score,setScore]=useState(0),[done,setDone]=useState(false);
 const start=m=>{setMode(m);setItems(questions(m));setIndex(0);setSelected(null);setScore(0);setDone(false)};
 const current=items[index];
 const choose=i=>{if(selected!==null)return;setSelected(i)};
 const next=()=>{if(selected===null)return;const finalScore=score+(selected===current?.[2]?1:0);if(index===items.length-1){setScore(finalScore);setDone(true);const xp=mode==='challenge'?25:mode==='test'?30:15;addXp?.(xp);markStageComplete(`विज्ञान::${chapter}`,mode);finishSession?.({subject:'विज्ञान',chapter,mode,attempted:items.length,correct:finalScore,completed:true,at:Date.now()})}else{setScore(finalScore);setIndex(i=>i+1);setSelected(null)}};
 const goToMenu=()=>{setMode(null);setDone(false);setSelected(null)};

 if(!mode)return <main className="page"><header className="page-header"><button className="pressable" onClick={onBack}>← अध्याय</button><div className="badge">विज्ञान • अध्याय 4</div><h1>{chapter}</h1><p>पहले पढ़ें, फिर दृश्य सहायता के साथ अवधारणा को मजबूत करें।</p></header><section className="page-content"><ScienceChapter4Visual kind="atomStructure"/><div className="mode-grid"><button className="mode-card pressable" onClick={()=>start('learn')}><span className="mode-icon">📖</span><strong>सीखें</strong><span>{scienceChapter4Learning.lessons.length} learning steps</span><b>शुरू करें →</b></button><button className="mode-card pressable" onClick={()=>start('practice')}><span className="mode-icon">📝</span><strong>अभ्यास</strong><span>15 प्रश्न</span><b>अभ्यास करें →</b></button><button className="mode-card pressable" onClick={()=>start('challenge')}><span className="mode-icon">🔥</span><strong>चुनौती</strong><span>12 कठिन प्रश्न</span><b>चुनौती लें →</b></button><button className="mode-card pressable" onClick={()=>start('test')}><span className="mode-icon">🎯</span><strong>टेस्ट</strong><span>20 प्रश्न</span><b>टेस्ट दें →</b></button></div></section></main>;

 if(mode==='learn')return <main className="page"><header className="page-header"><button className="pressable" onClick={goToMenu}>← अध्याय</button><div className="lesson-top"><span className="badge">विज्ञान • {chapter}</span><span>सीखना</span></div><h1>📖 सीखें</h1><p>अवधारणा → दृश्य → उदाहरण → त्वरित जाँच</p></header><section className="page-content"><div className="lesson-list">{scienceChapter4Learning.lessons.map((lesson,i)=><article className="lesson-card" key={`${lesson.title}-${i}`}><span className="lesson-type">{i+1}</span><h2>{lesson.title}</h2><p>{lesson.body}</p>{lesson.points&&<div className="points">{lesson.points.map(point=><p key={point}>✓ {point}</p>)}</div>}{lesson.visual&&<ScienceChapter4Visual kind={visualKind(lesson.visual.type)}/>} {lesson.question&&<div className="science-check"><strong>🎯 त्वरित जाँच</strong><p>{lesson.question}</p>{lesson.options.map((option,j)=><span className="answer-option" key={option}><span>{String.fromCharCode(65+j)}</span>{option}</span>)}</div>}</article>)}</div><div className="lesson-actions"><button className="secondary-btn pressable" onClick={goToMenu}>अध्याय मेनू</button><button className="primary-btn pressable" onClick={()=>start('practice')}>अभ्यास शुरू करें →</button></div></section></main>;

 if(done){const pct=items.length?Math.round(score/items.length*100):0;return <main className="page"><header className="page-header"><button className="pressable" onClick={goToMenu}>← अध्याय</button><div className="badge">परिणाम</div><h1>{score} / {items.length}</h1><p>{pct}% उत्तर सही</p></header><section className="page-content"><div className="result-card"><div className="result-score">{score}<small>/ {items.length}</small></div><div className="result-stats"><span>✅ {score} सही</span><span>❌ {items.length-score} गलत</span></div><div className="result-actions"><button className="secondary-btn pressable" onClick={()=>start(mode)}>फिर से करें</button><button className="primary-btn pressable" onClick={onBack}>अध्याय पर जाएँ →</button></div></div></section></main>}

 const pct=items.length?Math.round(((index+1)/items.length)*100):0;
 return <main className="page"><header className="page-header"><button className="pressable" onClick={goToMenu}>← अध्याय</button><div className="lesson-top"><span className="badge">{mode==='test'?'टेस्ट':mode==='challenge'?'चुनौती':'अभ्यास'}</span><span>{index+1} / {items.length}</span></div><h1>{mode==='test'?'🎯 अध्याय परीक्षण':mode==='challenge'?'🔥 चुनौती प्रश्न':'📝 अभ्यास'}</h1><div className="lesson-progress"><span style={{width:`${pct}%`}}/></div></header><section className="page-content"><ScienceChapter4Visual kind={mode==='test'||mode==='challenge'?(current?.[0]?.includes('रदरफोर्ड')?'scattering':current?.[0]?.includes('कोश')?'shells':current?.[0]?.includes('न्यूट्रॉन')?'neutron':current?.[0]?.includes('प्रोटॉन')?'proton':'atomStructure'):'atomStructure'}/><div className="question-card"><span className="lesson-type">प्रश्न {index+1}</span><h2>{current?.[0]}</h2><div className="options-grid">{current?.[1].map((option,j)=><button type="button" key={option} className={`answer-option pressable ${selected!==null?(j===current[2]?'correct':j===selected?'wrong':'muted'):''}`} disabled={selected!==null} onClick={()=>choose(j)}>{String.fromCharCode(65+j)}. {option}</button>)}</div>{selected!==null&&<div className={`answer-feedback ${selected===current[2]?'good':'bad'}`}><strong>{selected===current[2]?'✓ सही उत्तर':'✗ उत्तर समझें'}</strong><p>{current?.[3]}</p></div>}<div className="question-actions"><span>{selected===null?'उत्तर चुनें':'उत्तर दर्ज हो गया'}</span><button className="primary-btn pressable" disabled={selected===null} onClick={next}>{index===items.length-1?'परिणाम देखें':'अगला →'}</button></div></div></section></main>;
}
