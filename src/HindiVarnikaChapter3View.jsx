import React,{useEffect,useMemo,useState} from 'react';
import {markHindiModeCompleted} from './hindiChapterProgress';
import {HINDI_MODE_TIMING} from './hindi-mode-timing';

const TITLE='बिहार में नृत्यकला';
const CHAPTER_NO=3;
const MODES={practice:{label:'अभ्यास',count:15},challenge:{label:'चुनौती',count:12},test:{label:'अंतिम टेस्ट',count:20}};

const SUMMARY='बिहार की नृत्यपरंपरा लोकजीवन, पर्व, ऋतु, सामाजिक अवसर और सामुदायिक अभिव्यक्ति से जुड़ी है। पाठ जट-जटिन, झिझिया, करिया-झूमर, डोमकच, पँवरिया और गुँडिया जैसे लोकनृत्य रूपों के साथ हरि उप्पल, नगेन्द्र मोहिनी और भिखारी ठाकुर जैसे प्रमुख नामों का परिचय देता है।';

const POINTS=[
 ['जट-जटिन','जट-जटिन विशेषकर मिथिला में प्रचलित संवादमूलक लोकनृत्य है। इसमें स्त्रियाँ पुरुष और स्त्री दोनों भूमिकाएँ निभा सकती हैं।'],
 ['जट-जटिन और वर्षा','जट-जटिन को वर्षा की कामना से जुड़े लोकनृत्य के रूप में प्रस्तुत किया गया है।'],
 ['जट-जटिन का दर्शक-वर्ग','जट-जटिन के प्रदर्शन में स्त्रियों की प्रमुख भागीदारी और स्त्री-दर्शक परंपरा का उल्लेख मिलता है।'],
 ['झिझिया','झिझिया में महिलाएँ एक घेरे में नृत्य करती हैं; इसे पाठ एक विशिष्ट लोकनृत्य रूप के रूप में पहचानता है।'],
 ['करिया-झूमर','करिया-झूमर में लड़कियाँ हाथ पकड़कर सामूहिक रूप से वृत्ताकार ढंग से नृत्य करती हैं।'],
 ['डोमकच और जलुआ','डोमकच का एक अन्य नाम जलुआ बताया गया है; पाठ में इसका संबंध नवादा क्षेत्र से जोड़ा गया है।'],
 ['पँवरिया','मल्लाह समुदाय के नृत्य-रूप के रूप में पँवरिया का उल्लेख मिलता है।'],
 ['गुँडिया का मुखौटा-नृत्य','गुँडिया एक कठिन लोकनृत्य है जिसमें एक ही नर्तक दो-मुखी मुखौटे और पुरुष-स्त्री वेशभूषा के माध्यम से दोनों भूमिकाएँ प्रस्तुत करता है।'],
 ['मगध का खेलाडिन नृत्य','गया-मगध क्षेत्र में पेशेवर नृत्य-परंपरा के प्रसंग में खेलाडिनों का उल्लेख है, जो विवाह और शुभ अवसरों पर समूह में नृत्य-गायन करती थीं।'],
 ['ज्योतिरीश्वर ठाकुर','ज्योतिरीश्वर ठाकुर मिथिला की संगीतशास्त्रीय परंपरा के महत्त्वपूर्ण नाम हैं।'],
 ['हरि उप्पल','हरि उप्पल ने कथकली की कोमलता और मणिपुरी की वीरता को साधते हुए बिहार में शास्त्रीय नृत्य की मजबूत मंचीय परंपरा विकसित करने में योगदान दिया।'],
 ['नगेन्द्र मोहिनी','नगेन्द्र मोहिनी कथक और भरतनाट्यम दोनों की साधना, शिक्षण और प्रस्तुति से जुड़ी प्रमुख नृत्यांगना थीं।'],
 ['नगेन्द्र मोहिनी की गुरु-परंपरा','पाठ-संबंधी प्रश्नोत्तरों में नगेन्द्र मोहिनी के कथक-गुरु के रूप में गांगुली का नाम दिया गया है।'],
 ['शोभना','शोभना नामक नृत्य कलाकार के बारे में पाठ-संबंधी सामग्री में सरकारी अधिकारी होने का उल्लेख मिलता है।'],
 ['बिरजू महाराज','पाठ-संबंधी सामग्री में विश्वविद्यालय की नृत्य-संस्था से जुड़े संदर्भ में बिरजू महाराज का उल्लेख मिलता है।'],
 ['भिखारी ठाकुर','भिखारी ठाकुर भोजपुरी क्षेत्र की लोकनाट्य और लोक-अभिव्यक्ति की परंपरा से जुड़े महत्त्वपूर्ण कलाकार हैं।'],
 ['लोकनृत्य और समाज','लोकनृत्य केवल मनोरंजन नहीं; वे सामाजिक स्मृति, सामूहिक भागीदारी और सांस्कृतिक पहचान के माध्यम हैं।'],
 ['नृत्य में गीत और लय','लोकनृत्य की प्रस्तुति में गीत, ताल, लय, अभिनय और वेशभूषा मिलकर प्रभाव पैदा करते हैं।'],
 ['बिहार की विविधता','मिथिला, मगध, गया और भोजपुर जैसे सांस्कृतिक क्षेत्रों की अलग-अलग परंपराएँ बिहार की नृत्य-विविधता दिखाती हैं।'],
 ['संरक्षण','लोकनृत्य परंपराओं को बचाने के लिए प्रशिक्षण, दस्तावेजीकरण, मंच और नई पीढ़ी की भागीदारी आवश्यक है।']
];

const QUESTIONS=[
 ['जट-जटिन किस क्षेत्र में विशेष रूप से प्रचलित है?',['मिथिला','मालवा','पंजाब','राजस्थान'],0,'पाठ के अनुसार जट-जटिन विशेषकर मिथिला में प्रचलित है।'],
 ['जट-जटिन किस उद्देश्य से जुड़ा है?',['वर्षा की कामना','फसल की बिक्री','दरबारी मनोरंजन','चित्र प्रदर्शनी'],0,'जट-जटिन को वर्षा की कामना से जोड़ा गया है।'],
 ['जट-जटिन की प्रमुख प्रकृति क्या है?',['संवादमूलक लोकनृत्य','केवल वाद्य-वादन','केवल चित्रकला','केवल नाट्यपाठ'],0,'जट-जटिन संवाद और अभिनय से जुड़ा लोकनृत्य है।'],
 ['जट-जटिन में पुरुष की भूमिका कौन निभा सकता है?',['स्त्री नर्तक','केवल पुरुष दर्शक','केवल वादक','कोई नहीं'],0,'पाठ में स्त्रियों द्वारा पुरुष और स्त्री दोनों भूमिकाएँ निभाने का उल्लेख है।'],
 ['जट-जटिन के प्रदर्शन से जुड़ा दर्शक-वर्ग किसे बताया गया है?',['स्त्रियाँ','केवल सैनिक','केवल बच्चे','केवल राजदरबार'],0,'पाठ-संबंधी सामग्री में स्त्री-दर्शक परंपरा का उल्लेख मिलता है।'],
 ['झिझिया में नर्तकियाँ किस प्रकार नृत्य करती हैं?',['एक घेरे में','केवल मंच के पीछे','सिर्फ अकेले','पंक्ति में बैठकर'],0,'झिझिया के वर्णन में महिलाओं के घेरे में नृत्य करने का उल्लेख है।'],
 ['करिया-झूमर में लड़कियाँ क्या करती हैं?',['हाथ पकड़कर वृत्ताकार नृत्य करती हैं','वाद्य बजाती हैं','चित्र बनाती हैं','नाटक लिखती हैं'],0,'करिया-झूमर सामूहिक, वृत्ताकार लोकनृत्य है।'],
 ['डोमकच का दूसरा नाम क्या है?',['जलुआ','झिझिया','पँवरिया','गुँडिया'],0,'पाठ-संबंधी प्रश्नों में डोमकच का दूसरा नाम जलुआ दिया गया है।'],
 ['डोमकच के आरंभ का संबंध किस स्थान से बताया गया है?',['नवादा','मुजफ्फरपुर','भागलपुर','दरभंगा'],0,'पाठ-संबंधी प्रश्नोत्तरों में नवादा का उल्लेख है।'],
 ['मल्लाह समुदाय से जुड़ा नृत्य कौन-सा है?',['पँवरिया','करिया-झूमर','झिझिया','गुँडिया'],0,'पाठ-संबंधी सामग्री में मल्लाह से पँवरिया को जोड़ा गया है।'],
 ['गुँडिया नृत्य की अनूठी विशेषता क्या है?',['एक नर्तक द्वारा पुरुष-स्त्री रूप प्रस्तुत करना','केवल ढोलक बजाना','केवल बैठे-बैठे नृत्य करना','केवल मुखर गायन'],0,'गुँडिया में एक नर्तक दो भूमिकाएँ प्रस्तुत करता है।'],
 ['गुँडिया में किस प्रकार का मुखौटा वर्णित है?',['दो-मुखी मुखौटा','केवल पशु-मुखौटा','धातु का मुकुट','बिना मुखौटे का रूप'],0,'पाठ-संबंधी विवरण में दो-मुखी मुखौटे का उल्लेख मिलता है।'],
 ['गया-मगध की पेशेवर नृत्य-परंपरा में किस नाम का उल्लेख है?',['खेलाडिन','पँवरिया','झिझिया','सोहर'],0,'पाठ में विवाह और शुभ अवसरों पर नृत्य-गायन करने वाली खेलाडिनों का उल्लेख है।'],
 ['खेलाडिन किस अवसर पर नृत्य-गायन करती थीं?',['विवाह और शुभ अवसर','केवल फसल कटाई','केवल विद्यालय उत्सव','केवल राजकीय समारोह'],0,'पाठ-संबंधी सामग्री में विवाह और शुभ अवसरों का उल्लेख है।'],
 ['ज्योतिरीश्वर ठाकुर किस परंपरा से जुड़े हैं?',['मिथिला की संगीतशास्त्रीय परंपरा','भोजपुरी सिनेमा','पटना कलम','कृषि लोकगीत'],0,'ज्योतिरीश्वर ठाकुर को मिथिला की संगीतशास्त्रीय परंपरा से जोड़ा गया है।'],
 ['हरि उप्पल ने किन दो नृत्यपरंपराओं की विशेषताओं को साधा?',['कथकली और मणिपुरी','कथक और गरबा','भरतनाट्यम और कथक','छऊ और गरबा'],0,'हरि उप्पल के संदर्भ में कथकली की कोमलता और मणिपुरी की वीरता का उल्लेख है।'],
 ['नगेन्द्र मोहिनी किन दोनों शास्त्रीय नृत्यरूपों से जुड़ी थीं?',['कथक और भरतनाट्यम','कथकली और मणिपुरी','गरबा और घूमर','ओडिसी और कुचिपुड़ी'],0,'नगेन्द्र मोहिनी का संबंध कथक और भरतनाट्यम से बताया गया है।'],
 ['नगेन्द्र मोहिनी के कथक-गुरु के रूप में किसका नाम मिलता है?',['गांगुली','भिखारी ठाकुर','हरि उप्पल','ज्योतिरीश्वर ठाकुर'],0,'पाठ-संबंधी प्रश्नोत्तरों में गांगुली का नाम दिया गया है।'],
 ['शोभना के बारे में कौन-सा कथन मिलता है?',['वे सरकारी अधिकारी थीं','वे चित्रकार थीं','वे फिल्म निर्देशक थीं','वे लोकगायिका थीं'],0,'पाठ-संबंधी सामग्री में शोभना के सरकारी अधिकारी होने का उल्लेख है।'],
 ['भिखारी ठाकुर का संबंध किस सांस्कृतिक क्षेत्र से जोड़ा जाता है?',['भोजपुर','मिथिला','मगध','नेपाल'],0,'भिखारी ठाकुर भोजपुरी/भोजपुर की लोक-अभिव्यक्ति परंपरा से जुड़े महत्त्वपूर्ण नाम हैं।']
];

function getQuestions(mode){return QUESTIONS.slice(0,MODES[mode]?.count||20).map((item,index)=>({...item,key:`v3-${mode}-${index}`}));}

function formatTime(seconds){return `${Math.floor((seconds||0)/60)}:${String((seconds||0)%60).padStart(2,'0')}`;}

export function HindiVarnikaChapter3View({topic,onBack,onComplete,onNavigate,initialMode='learn'}){
 const [mode,setMode]=useState(initialMode||'learn');
 const [index,setIndex]=useState(0);
 const [answers,setAnswers]=useState({});
 const [submitted,setSubmitted]=useState(false);
 const timing=HINDI_MODE_TIMING[mode];
 const duration=timing?.minutes*60||null;
 const questions=useMemo(()=>getQuestions(mode),[mode]);
 const [seconds,setSeconds]=useState(duration);
 useEffect(()=>{setMode(initialMode||'learn')},[initialMode]);
 useEffect(()=>{setIndex(0);setAnswers({});setSubmitted(false);setSeconds(duration)},[topic?.id,mode,duration]);
 useEffect(()=>{if(mode==='learn'||submitted)return;const timer=setInterval(()=>setSeconds(v=>Math.max(0,v-1)),1000);return()=>clearInterval(timer)},[mode,submitted]);
 useEffect(()=>{if(mode!=='learn'&&timing&&seconds===0&&!submitted)setSubmitted(true)},[mode,timing,seconds,submitted]);
 useEffect(()=>{if(submitted&&topic?.id){markHindiModeCompleted(topic.id,mode);onComplete?.(mode)}},[submitted,topic?.id,mode,onComplete]);
 const changeMode=next=>{setMode(next);setIndex(0);setAnswers({});setSubmitted(false);setSeconds(HINDI_MODE_TIMING[next]?.minutes*60||null)};
 if(!topic)return null;
 if(mode==='learn')return <div className="hindi-learn hindi-chapter1-learn hindi-varnika-learn"><div className="hindi-learn-banner"><span>हिन्दी • वर्णिका भाग 1 • पाठ {CHAPTER_NO}</span><h2>{TITLE}</h2><p>{SUMMARY}</p></div><section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>📖 पाठ को समझें</h3><span>{POINTS.length} मुख्य बिंदु</span></div><div className="hindi-learn-grid">{POINTS.map(([title,body],i)=><section key={title}><h3>{i+1}. {title}</h3><p>{body}</p></section>)}</div></section><div className="hindi-ch1-callout"><strong>बोर्ड परीक्षा फोकस</strong><p>जट-जटिन, झिझिया, करिया-झूमर, डोमकच/जलुआ, पँवरिया, गुँडिया तथा हरि उप्पल और नगेन्द्र मोहिनी जैसे प्रमुख तथ्य अलग से दोहराएँ।</p></div><div className="hindi-actions"><button type="button" className="secondary-btn pressable" onClick={onBack}>← वर्णिका सूची</button><div><button type="button" className="secondary-btn pressable" onClick={()=>changeMode('practice')}>📝 अभ्यास शुरू करें</button><button type="button" className="primary-btn pressable" onClick={()=>{markHindiModeCompleted(topic.id,'learn');onComplete?.('learn')}}>✓ सीखना पूरा करें</button></div></div></div>;
 if(submitted){const score=questions.reduce((s,q,i)=>s+(answers[i]===q[2]?1:0),0);return <div className="hindi-learn hindi-chapter1-learn hindi-varnika-learn"><div className="hindi-ch1-panel"><div className="hindi-score"><span>🎯</span><strong>{score}/{questions.length}</strong><small>सही उत्तर</small><p>{score>=Math.ceil(questions.length*.7)?'अच्छी तैयारी है।':'गलतियों की समीक्षा करके फिर प्रयास करें।'}</p></div><div className="hindi-review"><div className="hindi-review-head"><h3>हर प्रश्न की समीक्षा</h3><span>{MODES[mode].label}</span></div>{questions.map((q,i)=><article className={`hindi-review-item ${answers[i]===q[2]?'ok':'wrong'}`} key={q.key}><div className="hindi-review-num">{i+1}</div><div><strong>{q[0]}</strong><p><b>आपका उत्तर:</b> {answers[i]!=null?q[1][answers[i]]:'उत्तर नहीं दिया'}</p><p><b>सही उत्तर:</b> {q[1][q[2]]}</p><span>{q[3]}</span></div></article>)}</div><div className="hindi-actions"><button type="button" className="secondary-btn pressable" onClick={()=>{setSubmitted(false);setIndex(0);setAnswers({});setSeconds(duration)}}>↻ फिर से दें</button><button type="button" className="secondary-btn pressable" onClick={onBack}>वर्णिका सूची</button><button type="button" className="primary-btn pressable" onClick={()=>{const next=questions.length<20?MODES.test.count:null; if(next)changeMode('test');}}>अंतिम टेस्ट पर जाएँ →</button>{onNavigate&&<button type="button" className="secondary-btn pressable" onClick={()=>onNavigate('बिहार की चित्रकला')}>अगला पाठ →</button>}</div></div></div>}
 const q=questions[index];
 return <div className="hindi-learn hindi-chapter1-learn hindi-varnika-learn"><div className="hindi-learn-banner"><span>वर्णिका भाग 1 • {MODES[mode].label}</span><h2>{TITLE}</h2><p>{MODES[mode].count} प्रश्न · {timing?.label||''} · प्रश्न {index+1} / {questions.length}</p></div><div className="hindi-mode-switch"><button type="button" className={mode==='practice'?'active':''} onClick={()=>changeMode('practice')}>📝 अभ्यास</button><button type="button" className={mode==='challenge'?'active':''} onClick={()=>changeMode('challenge')}>🔥 चुनौती</button><button type="button" className={mode==='test'?'active':''} onClick={()=>changeMode('test')}>🎯 टेस्ट</button></div><section className="hindi-assessment"><div className="hindi-assessment-header"><div><span>{MODES[mode].label}</span><strong>{index+1} / {questions.length}</strong></div><div className="hindi-exam-clock">⏱ {formatTime(seconds)}</div></div><div className="hindi-q-progress"><span style={{width:`${Math.round(((index+1)/questions.length)*100)}%`}}/></div><div className="hindi-question"><small>问题 {index+1}</small><h2>{q[0]}</h2><div className="hindi-options">{q[1].map((option,i)=><button type="button" key={option} className={`hindi-option pressable ${answers[index]===i?'selected':''}`} onClick={()=>setAnswers(a=>({...a,[index]:i}))}><b>{String.fromCharCode(65+i)}</b><span>{option}</span></button>)}</div><div className="hindi-question-actions"><button type="button" className="secondary-btn pressable" disabled={index===0} onClick={()=>setIndex(v=>Math.max(0,v-1))}>← पिछला</button>{index<questions.length-1?<button type="button" className="primary-btn pressable" disabled={answers[index]==null} onClick={()=>setIndex(v=>v+1)}>अगला →</button>:<button type="button" className="primary-btn pressable" disabled={answers[index]==null} onClick={()=>setSubmitted(true)}>जमा करें ✓</button>}</div></div></section></div>;
}

export default HindiVarnikaChapter3View;
