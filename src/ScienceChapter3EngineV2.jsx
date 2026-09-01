import React,{useMemo,useState} from 'react';
import {scienceChapter3Learning} from './scienceChapter3Learning';
import {markStageComplete} from './engines/progress/progressStore';
import {ScienceChapter3Visual2} from './ScienceChapter3Visual2';

const bank=[
['परमाणु किसे कहते हैं?',['तत्व का अत्यंत छोटा कण','केवल गैस का कण','केवल यौगिक का कण','दृश्य कण'],0,'परमाणु किसी तत्व का अत्यंत छोटा कण है जो उसके रासायनिक गुणों को बनाए रखता है।'],
['अणु किससे बन सकता है?',['दो या अधिक परमाणुओं से','केवल एक इलेक्ट्रॉन से','केवल न्यूट्रॉन से','केवल मिश्रण से'],0,'दो या अधिक परमाणु निश्चित संयोजन में जुड़कर अणु बना सकते हैं।'],
['H₂O में हाइड्रोजन के कितने परमाणु हैं?',['1','2','3','0'],1,'H के नीचे 2 है, इसलिए दो हाइड्रोजन परमाणु हैं।'],
['H₂O में ऑक्सीजन के कितने परमाणु हैं?',['1','2','3','4'],0,'O के आगे कोई संख्या नहीं है, इसलिए एक ऑक्सीजन परमाणु है।'],
['CO₂ का आणविक द्रव्यमान, C=12 u और O=16 u, क्या होगा?',['28 u','32 u','44 u','48 u'],2,'12 + 2×16 = 44 u।'],
['सोडियम का संकेत क्या है?',['S','So','Na','N'],2,'सोडियम का संकेत Na है।'],
['लोहे का संकेत क्या है?',['Ir','Fe','F','I'],1,'लोहे का संकेत Fe है।'],
['रासायनिक सूत्र क्या बताता है?',['तत्वों और उनके परमाणुओं का अनुपात/संख्या','रंग','तापमान','केवल द्रव्यमान'],0,'सूत्र में तत्वों के संकेत और नीचे लिखी संख्याएँ परमाणुओं की संख्या/अनुपात बताते हैं।'],
['द्रव्यमान संरक्षण के नियम के अनुसार क्या संरक्षित रहता है?',['कुल द्रव्यमान','केवल आयतन','केवल तापमान','केवल रंग'],0,'बंद तंत्र में रासायनिक अभिक्रिया के दौरान कुल द्रव्यमान संरक्षित रहता है।'],
['निश्चित अनुपात का नियम किससे संबंधित है?',['यौगिक में तत्वों के निश्चित अनुपात से','गैस के रंग से','केवल मिश्रण से','केवल तापमान से'],0,'शुद्ध यौगिक में उसके तत्व निश्चित अनुपात में उपस्थित होते हैं।'],
['किसी सूत्र में ₃ सामान्यतः क्या बताता है?',['संबंधित तत्व के तीन परमाणु','तीन ग्राम','तीन तत्व हमेशा','तीन मिश्रण'],0,'नीचे लिखी छोटी संख्या संबंधित तत्व के परमाणुओं की संख्या बताती है।'],
['आणविक द्रव्यमान कैसे निकाला जाता है?',['सभी परमाणु द्रव्यमानों का योग करके','सिर्फ सबसे बड़े द्रव्यमान से','केवल संकेत गिनकर','द्रव्यमान घटाकर'],0,'अणु में उपस्थित सभी परमाणुओं के सापेक्ष परमाणु द्रव्यमानों का योग किया जाता है।'],
['H₂ का अर्थ क्या है?',['दो हाइड्रोजन परमाणु','दो हाइड्रोजन तत्व','दो जल अणु','एक हाइड्रोजन परमाणु'],0,'H₂ में 2 हाइड्रोजन परमाणुओं को दर्शाता है।'],
['O₃ में ऑक्सीजन के कितने परमाणु होते हैं?',['1','2','3','4'],2,'O₃ में ऑक्सीजन के तीन परमाणु हैं।'],
['डाल्टन के अनुसार रासायनिक अभिक्रिया में क्या होता है?',['परमाणुओं का पुनर्व्यवस्थापन','परमाणु गायब हो जाते हैं','द्रव्यमान शून्य हो जाता है','सभी तत्व गैस बन जाते हैं'],0,'अभिक्रिया में परमाणु नए संयोजन में पुनर्व्यवस्थित होते हैं।'],
['u का उपयोग किसके लिए किया जाता है?',['परमाणु और अणु के सापेक्ष द्रव्यमान','समय','तापमान','आयतन'],0,'u बहुत छोटे कणों के सापेक्ष द्रव्यमान को व्यक्त करने की इकाई है।'],
['Mg की सामान्य संयोजकता क्या है?',['1','2','3','4'],1,'मैग्नीशियम की सामान्य संयोजकता 2 मानी जाती है।'],
['Al की सामान्य संयोजकता क्या है?',['1','2','3','4'],2,'एल्युमिनियम की सामान्य संयोजकता 3 मानी जाती है।'],
['O की सामान्य संयोजकता क्या है?',['1','2','3','0'],1,'ऑक्सीजन की सामान्य संयोजकता 2 मानी जाती है।'],
['NaCl में कितने अलग-अलग तत्व हैं?',['1','2','3','4'],1,'Na और Cl दो अलग-अलग तत्वों के संकेत हैं।'],
['CaCl₂ में क्लोरीन के कितने परमाणु हैं?',['1','2','3','4'],1,'Cl के नीचे 2 है, इसलिए दो क्लोरीन परमाणु हैं।'],
['NH₃ में कुल परमाणुओं की संख्या कितनी है?',['3','4','5','6'],1,'1 N + 3 H = 4 परमाणु।'],
['CO₂ में कुल परमाणुओं की संख्या कितनी है?',['2','3','4','5'],1,'1 C + 2 O = 3 परमाणु।'],
['यदि 4 g A और 6 g B पूरी तरह अभिक्रिया करें, तो बंद तंत्र में उत्पादों का कुल द्रव्यमान?',['2 g','10 g','24 g','46 g'],1,'4 g + 6 g = 10 g; द्रव्यमान संरक्षित रहता है।'],
['H₂O का आणविक द्रव्यमान 18 u क्यों है?',['2×1 + 16','1 + 2','2×16 + 1','18×18'],0,'दो H का 2 u और एक O का 16 u, इसलिए 18 u।'],
['CO₂ में C:O परमाणु अनुपात क्या है?',['1:1','1:2','2:1','2:2'],1,'एक C और दो O हैं, इसलिए अनुपात 1:2 है।'],
['एक ही तत्व से बने अणु का उदाहरण कौन-सा है?',['O₂','H₂O','NaCl','CO₂'],0,'O₂ में केवल ऑक्सीजन के परमाणु हैं।'],
['यौगिक के अणु का उदाहरण कौन-सा है?',['O₂','N₂','H₂O','He'],2,'H₂O में दो अलग-अलग तत्व निश्चित अनुपात में जुड़े हैं।']
];
const challenge=[
['यदि X₂Y₃ में X=10 u और Y=5 u, तो आणविक द्रव्यमान?',['25 u','35 u','45 u','50 u'],1,'2×10 + 3×5 = 35 u।'],
['एक यौगिक में A:B परमाणु अनुपात 2:3 है। सरल सूत्र क्या होगा?',['A₂B₃','A₃B₂','AB','A₄B₆'],0,'अनुपात 2:3 पहले से सरल है, इसलिए A₂B₃।'],
['यदि कुल 12 परमाणुओं में 4 C हैं, तो अन्य परमाणु कितने हैं?',['4','6','8','16'],2,'12 − 4 = 8।'],
['एक सूत्र में H₂ और O दोनों हैं। कुल H:O परमाणु अनुपात क्या है?',['1:1','2:1','1:2','2:2'],1,'H₂O में H के 2 और O का 1 परमाणु है, इसलिए 2:1।'],
['किस स्थिति में द्रव्यमान संरक्षण की जाँच सबसे विश्वसनीय है?',['बंद तंत्र में अभिकारक और उत्पाद दोनों का कुल द्रव्यमान मापकर','केवल रंग देखकर','केवल गंध देखकर','केवल तापमान देखकर'],0,'बंद तंत्र में मापे गए कुल द्रव्यमान की तुलना नियम की सीधी जाँच है।'],
['एक छात्र CO₂ में दो C बताता है। सही सुधार क्या है?',['2 केवल O के लिए है; C की संख्या 1 है','C की संख्या हमेशा 2 होती है','CO₂ में C नहीं है','2 पूरे सूत्र पर लागू होता है'],0,'CO₂ में उपसर्ग 2 O के साथ जुड़ा है, C के साथ नहीं।'],
['यदि किसी अणु का आणविक द्रव्यमान 30 u है और उसमें दो समान परमाणु 12 u के हैं, तो तीसरे परमाणु का द्रव्यमान?',['6 u','12 u','18 u','24 u'],0,'30 − 2×12 = 6 u।'],
['सरलतम पूर्णांक अनुपात 1:1 होने पर A₂B₂ को सामान्यतः कैसे लिखा जाएगा?',['AB','A₂B₂ ही','A₃B₃','A₄B₂'],0,'सरलतम अनुपात 1:1 है, इसलिए AB।'],
['किस विकल्प में सूत्र और परमाणुओं की कुल संख्या सही है?',['H₂O → 3','CO₂ → 3','NH₃ → 4','तीनों सही'],3,'H₂O में 3, CO₂ में 3 और NH₃ में 4; इसलिए तीनों सही हैं।'],
['रासायनिक सूत्र लिखने में संयोजकता का मुख्य उपयोग क्या है?',['तत्वों के संयोजन का अनुपात तय करना','रंग तय करना','तापमान तय करना','आयतन सीधे मापना'],0,'संयोजकता से परमाणुओं के संयोजन का उचित अनुपात तय करने में सहायता मिलती है।']
];

export function ScienceChapter3EngineV2({chapter='परमाणु एवं अणु',onBack,addXp}){
 const [mode,setMode]=useState('learn'); const [index,setIndex]=useState(0); const [selected,setSelected]=useState(null); const [score,setScore]=useState(0); const [done,setDone]=useState(false);
 const questions=useMemo(()=>mode==='challenge'?challenge:mode==='test'?bank.slice(0,20):bank,[mode]);
 const item=questions[index];
 const choose=i=>{if(selected!==null)return;setSelected(i);if(i===item[2]){setScore(s=>s+1);addXp?.(mode==='challenge'?25:mode==='test'?15:10)}};
 const next=()=>{if(index>=questions.length-1){setDone(true);markStageComplete(`विज्ञान::${chapter}`,mode)}else{setIndex(i=>i+1);setSelected(null)}};
 const restart=()=>{setIndex(0);setSelected(null);setScore(0);setDone(false)};
 const start=m=>{setMode(m);setIndex(0);setSelected(null);setScore(0);setDone(false)};
 if(mode==='learn')return <main className="page"><header className="page-header"><button className="pressable" onClick={onBack}>← अध्याय</button><div className="badge">विज्ञान • अध्याय 3</div><h1>{chapter}</h1></header><section className="page-content"><ScienceChapter3Visual2 kind="परमाणु"/><div className="lesson-list">{scienceChapter3Learning.lessons.map((x,i)=><article className="lesson-card" key={i}><span className="lesson-type">{i+1}</span><h2>{x.title}</h2><p>{x.body}</p>{x.points&&<div className="points">{x.points.map(p=><p key={p}>✓ {p}</p>)}</div>}{x.visual&&<ScienceChapter3Visual2 kind={x.visual.type==='molecule'?'अणु':x.visual.type==='formulaBuild'||x.visual.type==='formulaRead'||x.visual.type==='sum'?'सूत्र':x.visual.type==='balance'||x.visual.type==='balanceNumbers'?'द्रव्यमान':x.visual.type==='symbols'?'संकेत':x.visual.type==='valency'?'संयोजन':x.visual.type==='count'?'गिनती':'परमाणु'}/>}</article>)}</div><div className="mode-grid"><button className="primary-btn pressable" onClick={()=>start('practice')}>अभ्यास शुरू करें →</button><button className="secondary-btn pressable" onClick={()=>start('challenge')}>चुनौती आज़माएँ →</button><button className="secondary-btn pressable" onClick={()=>start('test')}>टेस्ट दें →</button></div></section></main>;
 if(done)return <main className="page"><header className="page-header"><button className="pressable" onClick={onBack}>← अध्याय</button><div className="badge">परिणाम</div><h1>{mode==='challenge'?'चुनौती पूरी':mode==='test'?'टेस्ट पूरा':'अभ्यास पूरा'}</h1></header><section className="page-content"><div className="result-card"><div className="result-score">{score}<small>/ {questions.length}</small></div><div className="result-percent">{Math.round(score/questions.length*100)}% सही</div><h2>{score>=questions.length*.8?'बहुत बढ़िया! 🎉':'अच्छी कोशिश — कमजोर प्रश्न फिर से पढ़ें।'}</h2><div className="result-actions"><button className="secondary-btn pressable" onClick={restart}>फिर से करें</button><button className="primary-btn pressable" onClick={onBack}>अध्याय पर जाएँ →</button></div></div></section></main>;
 return <main className="page"><header className="page-header"><button className="pressable" onClick={onBack}>← अध्याय</button><div className="lesson-top"><span className="badge">विज्ञान • {chapter}</span><span>{index+1} / {questions.length}</span></div><h1>{mode==='challenge'?'🔥 चुनौती':mode==='test'?'🎯 टेस्ट':'📝 अभ्यास'}</h1></header><section className="page-content"><div className="question-card"><h2>{item[0]}</h2><div className="options-grid">{item[1].map((o,i)=><button key={o} className={`answer-option pressable ${selected!==null?(i===item[2]?'correct':i===selected?'wrong':'muted'):''}`} disabled={selected!==null} onClick={()=>choose(i)}>{String.fromCharCode(65+i)}. {o}</button>)}</div>{selected!==null&&<div className={`answer-feedback ${selected===item[2]?'good':'bad'}`}><strong>{selected===item[2]?'✓ सही उत्तर':'✗ गलत उत्तर'}</strong><p>{item[3]}</p></div>}<button className="primary-btn pressable" disabled={selected===null} onClick={next}>अगला →</button></div></section></main>;
}