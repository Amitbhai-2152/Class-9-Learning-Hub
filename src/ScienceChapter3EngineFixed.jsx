import React,{useMemo,useState} from 'react';
import {scienceChapter3Learning} from './scienceChapter3Learning';
import {markStageComplete} from './engines/progress/progressStore';
import {ScienceChapter3Visual} from './ScienceChapter3Visual';

const bank=[
['परमाणु किसे कहते हैं?',['तत्व का अत्यंत छोटा कण','केवल गैस का कण','केवल यौगिक का कण','दृश्य कण'],0,'परमाणु किसी तत्व का अत्यंत छोटा कण है।'],
['अणु किससे बन सकता है?',['दो या अधिक परमाणुओं से','केवल एक इलेक्ट्रॉन से','केवल न्यूट्रॉन से','केवल मिश्रण से'],0,'दो या अधिक परमाणु निश्चित संयोजन में अणु बना सकते हैं।'],
['H₂O में हाइड्रोजन के कितने परमाणु हैं?',['1','2','3','0'],1,'H के नीचे 2 दो हाइड्रोजन परमाणु बताता है।'],
['H₂O में ऑक्सीजन के कितने परमाणु हैं?',['1','2','3','4'],0,'O के साथ कोई उपसर्ग नहीं है, इसलिए 1 ऑक्सीजन परमाणु है।'],
['CO₂ का आणविक द्रव्यमान, C=12 u और O=16 u, क्या होगा?',['28 u','32 u','44 u','48 u'],2,'12 + 2×16 = 44 u।'],
['सोडियम का संकेत क्या है?',['S','So','Na','N'],2,'सोडियम का रासायनिक संकेत Na है।'],
['लोहे का संकेत क्या है?',['Ir','Fe','F','I'],1,'लोहे का संकेत Fe है।'],
['रासायनिक सूत्र मुख्यतः क्या बताता है?',['तत्वों और उनके परमाणुओं की संख्या/अनुपात','रंग','तापमान','केवल द्रव्यमान'],0,'सूत्र से तत्वों और उनके परमाणुओं की संख्या समझी जाती है।'],
['द्रव्यमान संरक्षण के नियम के अनुसार क्या संरक्षित रहता है?',['कुल द्रव्यमान','केवल आयतन','केवल तापमान','केवल रंग'],0,'बंद तंत्र में कुल द्रव्यमान संरक्षित रहता है।'],
['निश्चित अनुपात का नियम किससे संबंधित है?',['यौगिक में तत्वों के निश्चित अनुपात से','गैस के रंग से','केवल मिश्रण से','केवल तापमान से'],0,'शुद्ध यौगिक में तत्व निश्चित अनुपात में उपस्थित होते हैं।'],
['किसी सूत्र में ₃ का अर्थ क्या है?',['तीन परमाणु/इकाइयाँ','तीन तत्व हमेशा','तीन मिश्रण','तीन ग्राम'],0,'नीचे लिखी संख्या संबंधित तत्व के परमाणुओं की संख्या बताती है।'],
['आणविक द्रव्यमान कैसे निकाला जाता है?',['सभी परमाणु द्रव्यमानों का योग करके','सिर्फ सबसे बड़े द्रव्यमान से','केवल संकेत गिनकर','द्रव्यमान घटाकर'],0,'सभी परमाणुओं के सापेक्ष द्रव्यमान जोड़े जाते हैं।'],
['H₂ का अर्थ क्या है?',['दो हाइड्रोजन परमाणु','दो हाइड्रोजन तत्व','दो जल अणु','एक हाइड्रोजन परमाणु'],0,'H₂ में 2 दो हाइड्रोजन परमाणु दर्शाता है।'],
['O₃ में ऑक्सीजन के कितने परमाणु होते हैं?',['1','2','3','4'],2,'O₃ में 3 ऑक्सीजन परमाणु होते हैं।'],
['डाल्टन के अनुसार रासायनिक अभिक्रिया में क्या होता है?',['परमाणुओं का पुनर्व्यवस्थापन','परमाणु गायब हो जाते हैं','तत्व हमेशा प्रकाश बन जाते हैं','द्रव्यमान शून्य हो जाता है'],0,'रासायनिक अभिक्रिया में परमाणुओं का पुनर्व्यवस्थापन होता है।'],
['u किसके लिए प्रयोग होती है?',['परमाणु और अणु के सापेक्ष द्रव्यमान के लिए','तापमान के लिए','समय के लिए','आयतन के लिए'],0,'u छोटे कणों के सापेक्ष द्रव्यमान के लिए उपयोगी इकाई है।'],
['Mg की सामान्य संयोजकता क्या मानी जाती है?',['1','2','3','4'],1,'Mg की सामान्य संयोजकता 2 मानी जाती है।'],
['Al की सामान्य संयोजकता क्या मानी जाती है?',['1','2','3','4'],2,'Al की सामान्य संयोजकता 3 मानी जाती है।'],
['O की सामान्य संयोजकता क्या मानी जाती है?',['1','2','3','0'],1,'O की सामान्य संयोजकता 2 मानी जाती है।'],
['रासायनिक सूत्र लिखते समय सबसे पहले क्या पहचानना उपयोगी है?',['तत्वों के संकेत और संयोजकताएँ','रंग','पात्र का आकार','घनत्व का रंग'],0,'संकेत और संयोजकता पहचानना पहला उपयोगी कदम है।'],
['NaCl में कितने अलग-अलग तत्व हैं?',['1','2','3','4'],1,'Na और Cl दो अलग-अलग तत्व हैं।'],
['CaCl₂ में क्लोरीन के कितने परमाणु हैं?',['1','2','3','4'],1,'Cl के नीचे 2 होने से दो क्लोरीन परमाणु हैं।'],
['NH₃ में कुल परमाणुओं की संख्या कितनी है?',['3','4','5','6'],1,'1 N + 3 H = 4 परमाणु।'],
['CO₂ में कुल परमाणुओं की संख्या कितनी है?',['2','3','4','5'],1,'1 C + 2 O = 3 परमाणु।'],
['यदि 4 g A और 6 g B पूरी तरह अभिक्रिया करें, तो उत्पादों का कुल द्रव्यमान कितना होगा?',['2 g','10 g','24 g','46 g'],1,'4 + 6 = 10 g, द्रव्यमान संरक्षण के अनुसार।'],
['H₂O का द्रव्यमान 18 u क्यों माना जाता है?',['2×1 + 16','1 + 2','2×16 + 1','18×18'],0,'2 H = 2 u और O = 16 u, इसलिए 18 u।'],
['CO₂ में C:O परमाणु अनुपात क्या है?',['1:1','1:2','2:1','2:2'],1,'एक C और दो O होने से अनुपात 1:2 है।'],
['किसका उदाहरण तत्व के अणु का है?',['O₂','H₂O','NaCl','CO₂'],0,'O₂ में एक ही तत्व के दो परमाणु हैं।'],
['किसका उदाहरण यौगिक का अणु है?',['O₂','N₂','H₂O','He'],2,'H₂O में अलग-अलग तत्व निश्चित अनुपात में जुड़े हैं।']
];

const challenge=[
['X₂Y₃ में X=10 u और Y=5 u हो तो आणविक द्रव्यमान?',['25 u','35 u','45 u','50 u'],1,'2×10 + 3×5 = 35 u।'],
['2 H और 1 O वाले यौगिक का सही सूत्र?',['HO','H₂O','H₂O₂','H₃O'],1,'दो H और एक O को H₂O से लिखा जाता है।'],
['मिश्रण और यौगिक में सही अंतर क्या है?',['मिश्रण में घटक किसी भी अनुपात में हो सकते हैं','दोनों हमेशा समान होते हैं','यौगिक में घटक कभी नहीं जुड़ते','मिश्रण में केवल एक तत्व होता है'],0,'मिश्रण का अनुपात बदल सकता है, जबकि शुद्ध यौगिक का संयोजन निश्चित होता है।'],
['A:B का सरल अनुपात 1:1 है। उचित सूत्र क्या होगा?',['A₂B','AB','AB₂','A₂B₂'],1,'सरलतम पूर्णांक अनुपात 1:1 होने पर AB लिखा जाता है।'],
['3 C और 8 H वाले अणु का सूत्र क्या होगा?',['CH₄','C₂H₆','C₃H₈','C₃H₆'],2,'तीन C और आठ H को C₃H₈ से लिखा जाता है।'],
['18 u जल में H और O का सही योगदान कौन-सा है?',['H=16 u,O=2 u','H₂=2 u,O=16 u','H=1 u,O=17 u','केवल O=18 u'],1,'H₂ का कुल 2 u और O का 16 u है।'],
['द्रव्यमान संरक्षण की जाँच कैसे करेंगे?',['अभिकारकों और उत्पादों के कुल द्रव्यमान की तुलना','केवल रंग देखना','केवल तापमान देखना','केवल अक्षर गिनना'],0,'कुल द्रव्यमान की तुलना करना सही जाँच है।'],
['CO₂ में उपसर्ग 2 किस तत्व से संबंधित है?',['C','O','दोनों बराबर','किसी से नहीं'],1,'2 केवल O के साथ जुड़ा है।'],
['12 कुल परमाणुओं में 4 C हैं। बाकी कितने परमाणु हैं?',['4','6','8','16'],2,'12 − 4 = 8।'],
['कौन-सा तत्व का अणु है?',['O₂','H₂O','CO₂','NaCl'],0,'O₂ में एक ही तत्व के परमाणु होते हैं।']
];

function pick(mode){return mode==='test'?[...bank].sort(()=>Math.random()-.5).slice(0,20):mode==='challenge'?[...challenge].sort(()=>Math.random()-.5):bank.slice(0,15)}

export function ScienceChapter3Engine({chapter='परमाणु एवं अणु',onBack,addXp,finishSession}){
 const [mode,setMode]=useState(null),[items,setItems]=useState([]),[index,setIndex]=useState(0),[selected,setSelected]=useState(null),[score,setScore]=useState(0),[done,setDone]=useState(false);
 const start=m=>{setMode(m);setItems(pick(m));setIndex(0);setSelected(null);setScore(0);setDone(false)};
 const item=items[index];
 const choose=i=>{if(selected!==null)return;setSelected(i);if(i===item[2]){setScore(s=>s+1);addXp?.(mode==='challenge'?25:10)}};
 const next=()=>{const finalScore=score+(selected===item[2]?1:0);if(index===items.length-1){setScore(finalScore);setDone(true);markStageComplete(`विज्ञान::${chapter}`,mode);finishSession?.({subject:'विज्ञान',chapter,mode,attempted:items.length,correct:finalScore,completed:true,at:Date.now()})}else{setIndex(i=>i+1);setSelected(null)}};
 if(!mode)return <main className="page"><header className="page-header"><button className="pressable" onClick={onBack}>← अध्याय</button><div className="badge">विज्ञान • अध्याय 3</div><h1>{chapter}</h1><p>पहले अध्याय पढ़ें, फिर अपनी समझ जाँचें।</p></header><section className="page-content"><ScienceChapter3Visual kind="परमाणु"/><div className="content-list-card"><span>इस अध्याय में</span><ol>{scienceChapter3Learning.lessons.map((x,i)=><li key={i}>{x.title}</li>)}</ol></div><div className="mode-grid"><button className="mode-card pressable" onClick={()=>start('learn')}>📖 <strong>सीखें</strong><span>{scienceChapter3Learning.lessons.length} learning steps</span></button><button className="mode-card pressable" onClick={()=>start('practice')}>📝 <strong>अभ्यास</strong><span>15 प्रश्न</span></button><button className="mode-card pressable" onClick={()=>start('challenge')}>🔥 <strong>चुनौती</strong><span>10 कठिन प्रश्न</span></button><button className="mode-card pressable" onClick={()=>start('test')}>🎯 <strong>टेस्ट</strong><span>20 प्रश्न</span></button></div></section></main>;
 if(mode==='learn')return <main className="page"><header className="page-header"><button className="pressable" onClick={()=>setMode(null)}>← अध्याय</button><div className="badge">विज्ञान • अध्याय 3</div><h1>{chapter}</h1></header><section className="page-content"><div className="lesson-list">{scienceChapter3Learning.lessons.map((x,i)=><article className="lesson-card" key={i}><span className="lesson-type">{i+1}</span><h2>{x.title}</h2><p>{x.body}</p>{x.points&&<div className="points">{x.points.map(p=><p key={p}>✓ {p}</p>)}</div>}{x.visual&&<ScienceChapter3Visual kind={x.visual.type==='molecule'?'अणु':x.visual.type==='formulaBuild'||x.visual.type==='formulaRead'||x.visual.type==='sum'?'सूत्र':x.visual.type==='balance'||x.visual.type==='balanceNumbers'?'द्रव्यमान':x.visual.type==='symbols'?'संकेत':x.visual.type==='valency'?'संयोजन':x.visual.type==='count'?'गिनती':'परमाणु'}/>}</article>)}</div><button className="primary-btn pressable" onClick={()=>start('practice')}>अभ्यास शुरू करें →</button></section></main>;
 if(done)return <main className="page"><header className="page-header"><button className="pressable" onClick={()=>setMode(null)}>← फिर चुनें</button><div className="badge">परिणाम</div><h1>{score>=items.length*.8?'बहुत बढ़िया!':'अच्छी कोशिश!'}</h1><p>{score} / {items.length} सही • {Math.round(score/items.length*100)}%</p></header><section className="page-content"><div className="result-card"><div className="result-score">{score}<small>/ {items.length}</small></div><div className="result-stats"><span>✅ {score} सही</span><span>❌ {items.length-score} गलत</span></div><div className="result-actions"><button className="secondary-btn pressable" onClick={()=>start(mode)}>फिर से करें</button><button className="primary-btn pressable" onClick={onBack}>अध्याय पर जाएँ →</button></div></div></section></main>;
 return <main className="page"><header className="page-header"><button className="pressable" onClick={()=>setMode(null)}>← अध्याय</button><div className="lesson-top"><span className="badge">विज्ञान • {chapter}</span><span>{index+1} / {items.length}</span></div><h1>{mode==='test'?'🎯 टेस्ट':mode==='challenge'?'🔥 चुनौती':'📝 अभ्यास'}</h1><div className="lesson-progress"><span style={{width:`${((index+1)/items.length)*100}%`}}/></div></header><section className="page-content"><ScienceChapter3Visual kind={item[0].includes('द्रव्यमान')||item[0].includes('आणविक')?'द्रव्यमान':item[0].includes('सूत्र')||item[0].includes('H₂O')||item[0].includes('CO₂')?'सूत्र':'परमाणु'}/><div className="question-card"><span className="lesson-type">प्रश्न {index+1}</span><h2>{item[0]}</h2><div className="options-grid">{item[1].map((o,i)=><button key={i} className={`answer-option pressable ${selected!==null?(i===item[2]?'correct':i===selected?'wrong':'muted'):''}`} disabled={selected!==null} onClick={()=>choose(i)}>{String.fromCharCode(65+i)}. {o}</button>)}</div>{selected!==null&&<div className={`answer-feedback ${selected===item[2]?'good':'bad'}`}><strong>{selected===item[2]?'✓ सही उत्तर':'✗ गलत उत्तर'}</strong><p>{item[3]}</p></div>}<div className="question-actions"><span>{selected===null?'उत्तर चुनें':'उत्तर दर्ज हो गया'}</span><button className="primary-btn pressable" disabled={selected===null} onClick={next}>{index===items.length-1?'परिणाम देखें':'अगला →'}</button></div></div></section></main>;
}
