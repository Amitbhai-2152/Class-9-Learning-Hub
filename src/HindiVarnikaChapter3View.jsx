import React,{useEffect,useMemo,useState} from 'react';
import {HINDI_MODE_TIMING} from './hindi-mode-timing';
import {markHindiModeCompleted} from './hindiChapterProgress';

const TITLE='बिहार में नृत्यकला';
const CHAPTER_NO=3;
const ORDER=['बिहार का लोकगायन','बिहार की संगीत साधना','बिहार में नृत्यकला','बिहार की चित्रकला','मधुबनी की चित्रकला','बिहार में नाट्यकला','बिहार का सिनेमा संसार'];
const MODES={practice:{label:'अभ्यास',count:15},challenge:{label:'चुनौती',count:12},test:{label:'अंतिम टेस्ट',count:20}};
const POINTS=[
['पाठ का केंद्र','बिहार की नृत्यपरंपरा लोकजीवन, पर्व, ऋतु, सामाजिक अवसर और सामुदायिक अभिव्यक्ति से जुड़ी है।'],
['जट-जटिन','जट-जटिन विशेषकर मिथिला में प्रचलित संवादमूलक लोकनृत्य है।'],
['वर्षा की कामना','जट-जटिन को वर्षा की कामना से जुड़े लोकनृत्य के रूप में प्रस्तुत किया गया है।'],
['स्त्री भागीदारी','जट-जटिन में स्त्रियाँ पुरुष और स्त्री दोनों भूमिकाएँ निभा सकती हैं।'],
['झिझिया','झिझिया में महिलाएँ सामूहिक रूप से घेरे में नृत्य करती हैं।'],
['करिया-झूमर','करिया-झूमर में लड़कियाँ हाथ पकड़कर वृत्ताकार ढंग से नृत्य करती हैं।'],
['डोमकच','डोमकच का एक अन्य नाम जलुआ बताया गया है और इसका संबंध नवादा क्षेत्र से जोड़ा जाता है।'],
['पँवरिया','पँवरिया को मल्लाह समुदाय की नृत्यपरंपरा से जोड़ा जाता है।'],
['गुँडिया','गुँडिया कठिन मुखौटा-नृत्य है जिसमें एक नर्तक पुरुष और स्त्री दोनों भूमिकाएँ प्रस्तुत कर सकता है।'],
['खेलाडिन','गया-मगध क्षेत्र की पेशेवर नृत्यपरंपरा में खेलाडिनों का उल्लेख विवाह और शुभ अवसरों के संदर्भ में मिलता है।'],
['ज्योतिरीश्वर ठाकुर','ज्योतिरीश्वर ठाकुर मिथिला की साहित्यिक-संगीतशास्त्रीय परंपरा के महत्त्वपूर्ण नाम हैं।'],
['हरि उप्पल','हरि उप्पल ने कथकली और मणिपुरी की विशेषताओं को साधकर बिहार में शास्त्रीय नृत्य-परंपरा को मजबूत किया।'],
['नगेन्द्र मोहिनी','नगेन्द्र मोहिनी कथक और भरतनाट्यम दोनों की साधना, शिक्षण और प्रस्तुति से जुड़ी प्रमुख नृत्यांगना थीं।'],
['गुरु-परंपरा','पाठ-संबंधी सामग्री में नगेन्द्र मोहिनी के कथक-गुरु के रूप में गांगुली का नाम मिलता है।'],
['शोभना','पाठ-संबंधी सामग्री में शोभना नामक नृत्य कलाकार का उल्लेख मिलता है।'],
['बिरजू महाराज','विश्वविद्यालय की नृत्य-संस्था के प्रसंग में बिरजू महाराज का उल्लेख मिलता है।'],
['भिखारी ठाकुर','भिखारी ठाकुर भोजपुरी लोक-अभिव्यक्ति और लोकनाट्य परंपरा के महत्त्वपूर्ण कलाकार हैं।'],
['गीत और अभिनय','लोकनृत्य में गीत, ताल, लय, अभिनय, वेशभूषा और सामूहिक प्रस्तुति मिलकर प्रभाव पैदा करते हैं।'],
['क्षेत्रीय विविधता','मिथिला, मगध, गया और भोजपुर जैसे क्षेत्रों की अलग परंपराएँ बिहार की नृत्य-विविधता दिखाती हैं।'],
['संरक्षण','लोकनृत्य को जीवित रखने के लिए सीखना, दस्तावेजीकरण, मंच और नई पीढ़ी की भागीदारी महत्त्वपूर्ण है।']
];

const QUESTIONS=[
['जट-जटिन किस क्षेत्र में विशेष रूप से प्रचलित है?',['मिथिला','मालवा','पंजाब','राजस्थान'],0,'जट-जटिन विशेषकर मिथिला से जुड़ा है।'],
['जट-जटिन किससे संबंधित लोकनृत्य है?',['वर्षा की कामना','चित्रकला','शिकार','दरबारी संगीत'],0,'इसे वर्षा की कामना से जोड़ा जाता है।'],
['जट-जटिन की प्रमुख प्रकृति क्या है?',['संवादमूलक लोकनृत्य','केवल वाद्य-वादन','केवल चित्रण','केवल पाठ-वाचन'],0,'इसमें संवाद और अभिनय का तत्व है।'],
['जट-जटिन में पुरुष की भूमिका कौन निभा सकता है?',['स्त्री नर्तक','केवल वादक','केवल बच्चा','कोई दर्शक नहीं'],0,'स्त्रियाँ दोनों भूमिकाएँ निभा सकती हैं।'],
['जट-जटिन की प्रस्तुति में किसकी प्रमुख भागीदारी का उल्लेख है?',['स्त्रियों की','सैनिकों की','राजाओं की','व्यापारियों की'],0,'पाठ-संबंधी सामग्री में स्त्री भागीदारी का उल्लेख है।'],
['झिझिया में नर्तकियाँ किस प्रकार नृत्य करती हैं?',['घेरे में','अकेले','बैठकर','सीढ़ियों पर'],0,'झिझिया में सामूहिक वृत्ताकार प्रस्तुति का वर्णन है।'],
['करिया-झूमर में लड़कियाँ क्या करती हैं?',['हाथ पकड़कर वृत्ताकार नृत्य','चित्र बनाती हैं','गीत लिखती हैं','वाद्य बेचती हैं'],0,'करिया-झूमर सामूहिक वृत्ताकार नृत्य है।'],
['डोमकच का दूसरा नाम क्या है?',['जलुआ','झिझिया','जट-जटिन','पँवरिया'],0,'डोमकच का एक अन्य नाम जलुआ बताया गया है।'],
['डोमकच को किस क्षेत्र से जोड़ा गया है?',['नवादा','सारण','चंपारण','पूर्णिया'],0,'पाठ-संबंधी सामग्री में नवादा का उल्लेख है।'],
['पँवरिया किस समुदाय से जुड़ा है?',['मल्लाह','कुम्हार','लोहार','नाई'],0,'पँवरिया को मल्लाह समुदाय से जोड़ा जाता है।'],
['गुँडिया नृत्य की विशेष पहचान क्या है?',['मुखौटे का प्रयोग','केवल बाँसुरी','केवल लिखित संवाद','केवल चित्र प्रदर्शन'],0,'गुँडिया मुखौटा-नृत्य के रूप में वर्णित है।'],
['गुँडिया की प्रस्तुति में एक नर्तक क्या कर सकता है?',['पुरुष और स्त्री दोनों भूमिकाएँ','दो अलग वाद्य बजाना','चार भाषाएँ बोलना','चित्र बनाना'],0,'एक नर्तक दोनों भूमिकाएँ प्रस्तुत कर सकता है।'],
['खेलाडिनों का संबंध किस क्षेत्र से बताया जाता है?',['गया-मगध','मिथिला','भोजपुर','सीमांचल'],0,'खेलाडिनों का उल्लेख गया-मगध प्रसंग में मिलता है।'],
['खेलाडिनें किन अवसरों पर नृत्य-गायन करती थीं?',['विवाह और शुभ अवसर','केवल परीक्षा','केवल खेती','केवल बाजार'],0,'विवाह और अन्य शुभ अवसरों का उल्लेख है।'],
['ज्योतिरीश्वर ठाकुर किस क्षेत्र से जुड़े हैं?',['मिथिला','मालवा','कश्मीर','गुजरात'],0,'ज्योतिरीश्वर ठाकुर का संबंध मिथिला से है।'],
['हरि उप्पल का योगदान किससे संबंधित है?',['शास्त्रीय नृत्य','चित्रकला','लोकगीत संग्रह','कृषि शिक्षा'],0,'हरि उप्पल को शास्त्रीय नृत्य-परंपरा के संदर्भ में रखा गया है।'],
['हरि उप्पल ने किन परंपराओं की विशेषताओं को साधा?',['कथकली और मणिपुरी','कथक और ओडिसी','भरतनाट्यम और कुचिपुड़ी','छऊ और कथक'],0,'पाठ-संबंधी सामग्री में कथकली और मणिपुरी का उल्लेख है।'],
['नगेन्द्र मोहिनी किन नृत्यरूपों से जुड़ी थीं?',['कथक और भरतनाट्यम','कथकली और मणिपुरी','ओडिसी और छऊ','कुचिपुड़ी और कथकली'],0,'नगेन्द्र मोहिनी कथक और भरतनाट्यम से जुड़ी थीं।'],
['नगेन्द्र मोहिनी के कथक-गुरु के रूप में किस नाम का उल्लेख है?',['गांगुली','भिखारी ठाकुर','हरि उप्पल','बिरजू महाराज'],0,'पाठ-संबंधी प्रश्नोत्तर में गांगुली का नाम मिलता है।'],
['भिखारी ठाकुर किस व्यापक लोकपरंपरा से जुड़े हैं?',['भोजपुरी लोक-अभिव्यक्ति और लोकनाट्य','मधुबनी चित्रकला','शास्त्रीय गायन','पटना कलम'],0,'भिखारी ठाकुर भोजपुरी लोक-अभिव्यक्ति और लोकनाट्य के महत्त्वपूर्ण नाम हैं।'],
['लोकनृत्य में कौन-से तत्व साथ काम करते हैं?',['गीत, ताल, लय और अभिनय','केवल चित्र','केवल गणित','केवल लिखित पाठ'],0,'लोकनृत्य बहु-तत्वीय सामूहिक प्रस्तुति है।'],
['बिहार की नृत्य-विविधता किन क्षेत्रों से समझी जा सकती है?',['मिथिला, मगध, गया और भोजपुर','केवल दिल्ली','केवल पंजाब','केवल राजस्थान'],0,'इन क्षेत्रों की अलग परंपराएँ विविधता दिखाती हैं।'],
['लोकनृत्य का सामाजिक महत्त्व क्या है?',['सामुदायिक स्मृति और पहचान','केवल प्रतियोगिता','केवल व्यापार','केवल सजावट'],0,'लोकनृत्य सामाजिक स्मृति और सांस्कृतिक पहचान को मजबूत करते हैं।'],
['लोकनृत्य की प्रस्तुति में वेशभूषा का क्या योगदान है?',['अभिनय और चरित्र को स्पष्ट करना','सिर्फ मंच छिपाना','केवल संगीत बजाना','केवल लेखन करना'],0,'वेशभूषा चरित्र और अभिनय को प्रभावी बनाती है।'],
['जट-जटिन किस प्रकार का लोकनृत्य है?',['संवादमूलक','केवल वाद्यात्मक','केवल चित्रात्मक','केवल एकल पाठ'],0,'जट-जटिन संवाद और भूमिका-अभिनय वाला लोकनृत्य है।'],
['झिझिया की सामूहिक शैली में कौन-सी आकृति प्रमुख है?',['वृत्त','त्रिभुज','सीधी रेखा','चौकोर मेज'],0,'झिझिया के वर्णन में घेरे का उल्लेख है।'],
['करिया-झूमर की प्रस्तुति क्या दिखाती है?',['सामूहिक समन्वय','एकांत अध्ययन','चित्रांकन','लेखन'],0,'हाथ पकड़कर वृत्त में नृत्य सामूहिक समन्वय दिखाता है।'],
['पँवरिया का अध्ययन क्या समझने में मदद करता है?',['समुदाय-विशिष्ट नृत्यपरंपरा','चित्रकला का इतिहास','सिनेमा तकनीक','व्याकरण'],0,'यह नृत्य और समुदाय के संबंध का उदाहरण है।'],
['भिखारी ठाकुर का संदर्भ किस विशेषता को स्पष्ट करता है?',['लोक-अभिव्यक्ति की विविधता','केवल शास्त्रीयता','केवल चित्रकला','केवल स्थापत्य'],0,'उनका संदर्भ भोजपुरी लोक-अभिव्यक्ति की विविधता दिखाता है।'],
['लोकनृत्य संरक्षण का उपयोगी माध्यम कौन-सा है?',['प्रशिक्षण और दस्तावेजीकरण','केवल परीक्षा','केवल विज्ञापन','केवल मंच-सज्जा'],0,'प्रशिक्षण, दस्तावेजीकरण और नई पीढ़ी की भागीदारी संरक्षण में मदद करती है।']
];

function pickQuestions(mode){return QUESTIONS.slice(0,MODES[mode].count)}

export function HindiVarnikaChapter3View({topic,onBack,onComplete,onNavigate,initialMode='learn'}){
 const [mode,setMode]=useState(initialMode==='learn'?'learn':initialMode);
 const [index,setIndex]=useState(0);const [answers,setAnswers]=useState({});const [submitted,setSubmitted]=useState(false);const [seconds,setSeconds]=useState(null);
 const questions=useMemo(()=>mode==='learn'?[]:pickQuestions(mode),[mode]);const duration=HINDI_MODE_TIMING[mode]?.minutes*60||null;
 useEffect(()=>{setSeconds(duration);if(mode==='learn')return;const timer=setInterval(()=>setSeconds(v=>v==null?null:Math.max(0,v-1)),1000);return()=>clearInterval(timer)},[mode,duration]);
 const changeMode=m=>{setMode(m);setIndex(0);setAnswers({});setSubmitted(false)};
 const currentIndex=ORDER.indexOf(TITLE);const prev=currentIndex>0?ORDER[currentIndex-1]:null;const next=currentIndex<ORDER.length-1?ORDER[currentIndex+1]:null;
 if(mode==='learn')return <div className="hindi-learn hindi-varnika-learn"><div className="hindi-learn-banner"><span>वर्णिका भाग 1 • पाठ {CHAPTER_NO}</span><h2>{TITLE}</h2><p>बिहार की लोक और शास्त्रीय नृत्यपरंपराओं को प्रमुख उदाहरणों, कलाकारों और परीक्षा-योग्य तथ्यों के साथ समझें।</p></div><section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>📖 गहराई से सीखें</h3><span>{POINTS.length} मुख्य बिंदु</span></div><div className="hindi-learn-grid">{POINTS.map(([h,b],i)=><section key={`${h}-${i}`}><h3>{i+1}. {h}</h3><p>{b}</p></section>)}</div></section><div className="hindi-ch1-callout"><strong>🎯 परीक्षा फोकस</strong><p>जट-जटिन, झिझिया, करिया-झूमर, डोमकच, पँवरिया, गुँडिया और प्रमुख कलाकारों को उनके मुख्य तथ्य के साथ दोहराएँ।</p></div><div className="hindi-actions"><button type="button" className="secondary-btn pressable" onClick={onBack}>← वर्णिका सूची</button><div><button type="button" className="secondary-btn pressable" onClick={()=>changeMode('practice')}>📝 अभ्यास</button><button type="button" className="primary-btn pressable" onClick={()=>{markHindiModeCompleted(topic?.id||'varnika-3','learn');onComplete?.('learn')}}>✓ सीखना पूरा करें</button></div></div></div>;
 if(submitted){const score=questions.reduce((s,q,i)=>s+(answers[i]===q[2]?1:0),0);return <div className="hindi-learn hindi-varnika-learn"><section className="hindi-ch1-panel"><div className="hindi-score"><span>🎯</span><strong>{score}/{questions.length}</strong><small>सही उत्तर</small><p>{score>=Math.ceil(questions.length*.7)?'अच्छी तैयारी है।':'गलतियों की समीक्षा करके फिर प्रयास करें।'}</p></div><div className="hindi-review">{questions.map((q,i)=><article className={`hindi-review-item ${answers[i]===q[2]?'ok':'wrong'}`} key={`${q[0]}-${i}`}><div className="hindi-review-num">{i+1}</div><div><strong>{q[0]}</strong><p><b>आपका उत्तर:</b> {answers[i]!=null?q[1][answers[i]]:'उत्तर नहीं दिया'}</p><p><b>सही उत्तर:</b> {q[1][q[2]]}</p><span>{q[3]}</span></div></article>)}</div><div className="hindi-actions"><button type="button" className="secondary-btn pressable" onClick={()=>{setSubmitted(false);setIndex(0);setAnswers({})}}>↻ फिर से दें</button>{prev&&<button type="button" className="secondary-btn pressable" onClick={()=>onNavigate?.(prev)}>← पिछला पाठ</button>}{next&&<button type="button" className="primary-btn pressable" onClick={()=>onNavigate?.(next)}>अगला पाठ →</button>}<button type="button" className="secondary-btn pressable" onClick={onBack}>वर्णिका सूची</button></div></section></div>}
 const q=questions[index];
 return <div className="hindi-learn hindi-varnika-learn"><div className="hindi-learn-banner"><span>वर्णिका भाग 1 • {MODES[mode].label}</span><h2>{TITLE}</h2><p>{MODES[mode].count} प्रश्न · {HINDI_MODE_TIMING[mode]?.label||''}</p></div><div className="hindi-mode-switch"><button type="button" className={mode==='practice'?'active':''} onClick={()=>changeMode('practice')}>📝 अभ्यास</button><button type="button" className={mode==='challenge'?'active':''} onClick={()=>changeMode('challenge')}>🔥 चुनौती</button><button type="button" className={mode==='test'?'active':''} onClick={()=>changeMode('test')}>🎯 टेस्ट</button></div><section className="hindi-assessment"><div className="hindi-assessment-header"><div><span>{MODES[mode].label}</span><strong>{index+1} / {questions.length}</strong></div><div className="hindi-exam-clock">⏱ {Math.floor((seconds||0)/60)}:{String((seconds||0)%60).padStart(2,'0')}</div></div><div className="hindi-q-progress"><span style={{width:`${Math.round(((index+1)/questions.length)*100)}%`}}/></div><div className="hindi-question"><small>प्रश्न {index+1}</small><h2>{q[0]}</h2><div className="hindi-options">{q[1].map((option,i)=><button type="button" key={`${option}-${i}`} className={`hindi-option pressable ${answers[index]===i?'selected':''}`} onClick={()=>setAnswers(a=>({...a,[index]:i}))}><b>{String.fromCharCode(65+i)}</b><span>{option}</span></button>)}</div><div className="hindi-question-actions"><button type="button" className="secondary-btn pressable" disabled={index===0} onClick={()=>setIndex(v=>v-1)}>← पिछला</button>{index<questions.length-1?<button type="button" className="primary-btn pressable" disabled={answers[index]==null} onClick={()=>setIndex(v=>v+1)}>अगला →</button>:<button type="button" className="primary-btn pressable" disabled={answers[index]==null} onClick={()=>{markHindiModeCompleted(topic?.id||'varnika-3',mode);onComplete?.(mode);setSubmitted(true)}}>जमा करें ✓</button>}</div></div></section></div>;
}

export default HindiVarnikaChapter3View;
