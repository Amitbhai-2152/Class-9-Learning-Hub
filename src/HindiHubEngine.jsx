import React,{useEffect,useMemo,useState} from 'react';
import {hindiChapters,hindiGrammar} from './hindiChapterData';
import {hindiChapter1Lesson,hindiChapter1Questions,hindiChapter1Challenge} from './hindiChapter1Engine';

const modes={learn:'सीखें',practice:'अभ्यास',challenge:'चुनौती',test:'टेस्ट'};
const modeMeta={learn:['📖','पाठ को समझें और मुख्य विचार पकड़ें',20],practice:['📝','समझ जाँचें और तुरंत feedback पाएँ',15],challenge:['🔥','थोड़े कठिन सोच-वाले प्रश्न',25],test:['🎯','समयबद्ध test और पूरी review',15]};

const grammarBank={
  'अपठित गद्यांश':[['मुख्य विचार',0,'गद्यांश हल करते समय पहले पूरे पाठ का मुख्य विचार और संदर्भ समझना चाहिए।'],['तथ्य आधारित उत्तर',0,'उत्तर के लिए गद्यांश में दिए प्रमाण या संकेत देखें।'],['निष्कर्ष',0,'निष्कर्ष दिए गए विचारों से निकला उचित अर्थ होता है।']],
  'निबंध लेखन':[['भूमिका',0,'भूमिका विषय का संदर्भ और लेख की दिशा स्पष्ट करती है।'],['क्रमबद्ध विचार',0,'विचारों का क्रम निबंध को सुसंगत और प्रभावी बनाता है।'],['उपसंहार',0,'उपसंहार मुख्य विचारों को समेटकर लेख का प्रभावी समापन करता है।']],
  'पत्र लेखन':[['स्पष्ट और विनम्र भाषा',0,'पत्र के उद्देश्य और संबंध के अनुसार स्पष्ट तथा सम्मानजनक भाषा उपयुक्त है।'],['विषय',0,'विषय से पत्र का उद्देश्य जल्दी समझ में आता है।'],['अनौपचारिक पत्र',0,'मित्र या परिवार के सदस्य को अनौपचारिक पत्र लिखा जा सकता है।']],
  'संवाद लेखन':[['स्वाभाविक और उद्देश्यपूर्ण',0,'संवाद पात्रों और परिस्थिति के अनुसार स्वाभाविक होना चाहिए।'],['पात्र के अनुसार भाषा',0,'भाषा पात्र, संबंध और परिस्थिति के अनुकूल होनी चाहिए।'],['क्रम',0,'बातचीत का क्रम संवाद को समझने योग्य बनाता है।']],
  'अनुच्छेद लेखन':[['एक केंद्रीय विचार',0,'एक मुख्य विचार के आसपास जुड़े वाक्य अच्छा अनुच्छेद बनाते हैं।'],['संगति',0,'वाक्यों के बीच विचार-संबंध होना चाहिए।']],
  'लिंग':[['स्त्रीलिंग',0,'“लड़की” स्त्रीलिंग शब्द है।'],['रानी',0,'“राजा” का प्रचलित स्त्रीलिंग रूप “रानी” है।'],['पुल्लिंग और स्त्रीलिंग',0,'लिंग में सामान्यतः पुल्लिंग और स्त्रीलिंग के भेद को देखा जाता है।']],
  'वचन':[['बहुवचन',0,'“पुस्तकें” एक से अधिक पुस्तकों को बताता है।'],['लड़के',0,'“लड़का” का सामान्य बहुवचन “लड़के” है।'],['एक या अनेक',0,'वचन एकवचन और बहुवचन का बोध कराता है।']],
  'काल':[['वर्तमान',0,'“राम पढ़ रहा है” में चल रही क्रिया वर्तमान समय दिखाती है।'],['भूत',0,'“सीमा गई थी” बीते समय की क्रिया दिखाता है।'],['भविष्य',0,'“मैं परीक्षा दूँगा” आने वाले समय की क्रिया दिखाता है।']],
  'वाच्य':[['कर्तृवाच्य',0,'“मोहन ने पत्र लिखा” में कर्ता प्रमुख है।'],['कर्ता, कर्म और क्रिया',0,'वाच्य इन तीनों के संबंध के स्वरूप से जुड़ा है।']],
  'संधि':[['मेल',0,'संधि में दो वर्णों/ध्वनियों के मेल से परिवर्तन होता है।'],['मूल शब्दों में अलग करना',0,'संधि-विच्छेद में संयुक्त रूप को उसके घटकों में अलग करते हैं।']],
  'समास':[['अर्थ को संक्षेप में व्यक्त करना',0,'समास दो या अधिक पदों के संक्षिप्त संयुक्त रूप से अर्थ व्यक्त करता है।'],['विग्रह',0,'समस्त पद का विस्तृत अर्थ बताने वाले रूप को विग्रह कहते हैं।']],
  'पर्यायवाची, विलोम और श्रुतिसमभिन्नार्थक':[['रवि',0,'“रवि” सूर्य का पर्यायवाची है।'],['हानि',0,'“हानि” लाभ का विलोम है।'],['उच्चारण समान, अर्थ अलग',0,'श्रुतिसमभिन्नार्थक शब्दों का उच्चारण समान/समान-सा हो सकता है, अर्थ अलग होता है।']],
  'मुहावरे और अनेक शब्दों के लिए एक शब्द':[['बहुत परेशान करना',0,'“नाक में दम करना” का अर्थ बहुत परेशान करना है।'],['अमर',0,'“जो कभी न मरे” के लिए “अमर” उपयुक्त एक शब्द है।'],['संदर्भ और प्रचलित अर्थ',0,'मुहावरे का अर्थ संदर्भ और प्रचलित प्रयोग से समझा जाता है।']]
};

const genericGrammarDistractors=['वाक्य परिवर्तन','केवल शीर्षक','अर्थ बदलना','अनावश्यक विस्तार','यादृच्छिक क्रम'];
function makeGrammarQuestions(data){
  return (grammarBank[data.title]||[]).map(([answer,_,explain],i)=>({
    q:i===0?`“${data.title}” में सही अवधारणा/उत्तर क्या है?`:`“${data.title}” से जुड़ा सही बिंदु कौन-सा है?`,
    options:[answer,...genericGrammarDistractors.filter(x=>x!==answer).slice(0,3)],answer:0,explain
  }));
}
function makeLiteratureQuestions(data,challenge){
  const authors=[data.author,...hindiChapters.filter(x=>x.author&&x.author!==data.author).slice(0,3).map(x=>x.author)];
  const focus=[data.focus[0],...hindiChapters.flatMap(x=>x.focus).filter(x=>x!==data.focus[0]).slice(0,3)];
  const keywords=[data.keywords[0],'परीक्षा रणनीति','सामान्य भाषा','अलग विषय'];
  const questions=[
    {q:`“${data.title}” के लेखक/रचनाकार कौन हैं?`,options:authors,answer:0,explain:`इस पाठ के रचनाकार के रूप में ${data.author} दिए गए हैं।`},
    {q:`“${data.title}” का केंद्रीय विषय क्या है?`,options:[data.theme,...hindiChapters.filter(x=>x.theme!==data.theme).slice(0,3).map(x=>x.theme)],answer:0,explain:data.theme},
    {q:`इस पाठ में किस बिंदु पर विशेष ध्यान दें?`,options:focus,answer:0,explain:`अध्ययन-फोकस: ${data.focus.join(', ')}।`},
    {q:`निम्न में से कौन-सा शब्द “${data.title}” से सीधे जुड़ा है?`,options:keywords,answer:0,explain:`“${data.keywords[0]}” इस पाठ के मुख्य keywords में है।`}
  ];
  if(challenge)questions.push({q:'साहित्यिक पाठ को गहराई से समझने की सबसे अच्छी रणनीति क्या है?',options:['सार, भाव/पात्र और लेखक की दृष्टि को साथ जोड़ना','केवल कठिन शब्द रटना','केवल शीर्षक पढ़ना','सिर्फ अंतिम वाक्य याद करना'],answer:0,explain:'साहित्यिक समझ के लिए पाठ के विचार, भाव/पात्र और लेखक की दृष्टि को साथ पढ़ना अधिक उपयोगी है।'});
  return questions;
}

function QuestionAssessment({questions,mode,onBack,addXp,finishSession,data}){
  const[answers,setAnswers]=useState({});const[index,setIndex]=useState(0);const[result,setResult]=useState(null);const[time,setTime]=useState(mode==='test'?180:null);
  useEffect(()=>{if(mode!=='test'||result)return;const t=setInterval(()=>setTime(v=>Math.max(0,v-1)),1000);return()=>clearInterval(t)},[mode,result]);
  useEffect(()=>{if(mode==='test'&&time===0&&!result)finish(answers)},[time,result]);
  const finish=(finalAnswers)=>{const review=questions.map((q,i)=>({question:q.q,options:q.options,selected:finalAnswers[i],answer:q.answer,correct:finalAnswers[i]===q.answer,explain:q.explain}));const correct=review.filter(x=>x.correct).length;const attempted=review.filter(x=>x.selected!=null).length;const earned=correct*(mode==='challenge'?5:3);addXp?.(earned);finishSession?.({subject:data.book||'गोधूली भाग 1',chapter:data.title,mode,attempted,correct,completed:true,earned,date:new Date().toISOString()});setResult({review,correct,attempted,earned});};
  if(result)return <div className="hindi-assessment hindi-result"><div className="hindi-score"><span>{mode==='test'?'🎯':'✅'}</span><strong>{result.correct}/{questions.length}</strong><small>सही उत्तर</small><p>{result.correct===questions.length?'शानदार!':result.correct?'अच्छा प्रयास—review से और मजबूत करें।':'कोई बात नहीं—review करके फिर कोशिश करें।'}</p></div><div className="hindi-review"><h3>हर प्रश्न की समीक्षा</h3>{result.review.map((r,i)=><article className={`hindi-review-item ${r.correct?'ok':'wrong'}`} key={`${r.question}-${i}`}><div className="hindi-review-num">{i+1}</div><div><strong>{r.question}</strong><p><b>आपका उत्तर:</b> {r.options[r.selected]??'उत्तर नहीं दिया'}</p><p><b>सही उत्तर:</b> {r.options[r.answer]}</p><span>{r.explain}</span></div></article>)}</div><button type="button" className="primary-btn pressable" onClick={onBack}>← अध्याय पर लौटें</button></div>;
  const q=questions[index];return <div className="hindi-assessment"><div className="hindi-assessment-top"><button type="button" className="secondary-btn pressable" onClick={onBack}>← छोड़ें</button><span>{mode==='test'?'टेस्ट':mode==='challenge'?'चुनौती':'अभ्यास'}</span>{mode==='test'&&<strong>⏱ {Math.floor(time/60)}:{String(time%60).padStart(2,'0')}</strong>}</div><div className="hindi-q-progress"><span style={{width:`${Math.round(index/questions.length*100)}%`}}/></div><small>प्रश्न {index+1} / {questions.length}</small><section className="hindi-question"><h2>{q.q}</h2><div>{q.options.map((x,i)=><button type="button" key={`${x}-${i}`} className={`hindi-option pressable ${answers[index]===i?'selected':''}`} onClick={()=>setAnswers(a=>({...a,[index]:i}))}><b>{String.fromCharCode(65+i)}</b><span>{x}</span></button>)}</div><button type="button" className="primary-btn pressable" disabled={answers[index]==null} onClick={()=>{const nextIndex=index+1;if(nextIndex<questions.length)setIndex(nextIndex);else finish(answers)}}>{index===questions.length-1?'जमा करें':'अगला →'}</button></section></div>;
}

function Chapter1Learn({onBack,addXp}){
  const[done,setDone]=useState(false);
  return <div className="hindi-learn hindi-chapter1-learn"><div className="hindi-learn-banner"><span>📖 GÓDHULI BHAG 1 · CHAPTER 1</span><h2>{hindiChapter1Lesson.title}</h2><p>{hindiChapter1Lesson.intro}</p><div className="hindi-topic-author">✦ {hindiChapter1Lesson.author}</div></div><div className="hindi-learn-grid"><section><h3>🎯 क्या सीखेंगे?</h3><div className="hindi-chips">{hindiChapter1Lesson.focus.map(x=><span key={x}>{x}</span>)}</div></section><section><h3>🔑 मुख्य शब्द</h3><div className="hindi-chips">{hindiChapter1Lesson.keywords.map(x=><span key={x}>{x}</span>)}</div></section>{hindiChapter1Lesson.sections.map((item)=><section key={item.title}><h3>{item.title}</h3><p>{item.body}</p></section>)}<section><h3>🧩 उत्तर का ढाँचा</h3><p><b>पहचानें → कारण समझाएँ → प्रभाव बताएँ → निष्कर्ष लिखें।</b> छोटे प्रश्न में भी उत्तर को प्रश्न के शब्दों से जोड़कर सीधे लिखें।</p></section></div><div className="hindi-actions"><button type="button" className="secondary-btn pressable" onClick={onBack}>← पीछे</button><button type="button" className="primary-btn pressable" onClick={()=>{if(!done){addXp?.(20);setDone(true)}}}>{done?'✓ +20 XP प्राप्त':'+20 XP के साथ अध्याय पूरा करें'}</button></div></div>;
}

function Learn({data,onBack,addXp}){
  const[done,setDone]=useState(false);return <div className="hindi-learn"><div className="hindi-learn-banner"><span>📖 LEARN</span><h2>{data.title}</h2><p>{data.summary}</p>{data.author&&<div className="hindi-topic-author">✦ {data.author}</div>}</div><div className="hindi-learn-grid"><section><h3>🎯 मुख्य विचार</h3><p>{data.theme||data.summary}</p></section><section><h3>🧠 फोकस</h3><div className="hindi-chips">{(data.focus||data.skills||[]).map(x=><span key={x}>{x}</span>)}</div></section><section><h3>🔑 कीवर्ड</h3><div className="hindi-chips">{(data.keywords||[]).map(x=><span key={x}>{x}</span>)}</div></section><section><h3>✍️ उत्तर लिखने की रणनीति</h3><p>पहले मुख्य विचार लिखें, फिर 2–3 स्पष्ट बिंदुओं में पाठ/भाव समझाएँ और अंत में उचित निष्कर्ष या सीख दें।</p></section></div><div className="hindi-actions"><button type="button" className="secondary-btn pressable" onClick={onBack}>← पीछे</button><button type="button" className="primary-btn pressable" onClick={()=>{if(!done){addXp?.(20);setDone(true)}}}>{done?'✓ +20 XP प्राप्त':'+20 XP के साथ अध्याय पूरा करें'}</button></div></div>;
}

function Menu({data,setMode,onBack}){return <div className="hindi-engine-menu"><div className="hindi-engine-hero"><div className="hindi-letter">अ</div><div><span>{data.book||'व्याकरण एवं रचना'}</span><h2>{data.title}</h2><small>{data.type}{data.author?` · ${data.author}`:''}</small></div></div><div className="hindi-engine-modes">{Object.entries(modes).map(([id,label])=><button type="button" className="hindi-engine-mode pressable" key={id} onClick={()=>setMode(id)}><span>{modeMeta[id][0]}</span><strong>{label}</strong><small>{modeMeta[id][1]}</small><em>+{modeMeta[id][2]} XP</em></button>)}</div><button type="button" className="secondary-btn pressable" onClick={onBack}>← हिन्दी अध्याय</button></div>}

export function HindiHubEngine({chapter,onBack,addXp,finishSession,initialMode=null}){
  const data=hindiChapters.find(x=>x.title===chapter)||hindiGrammar.find(x=>x.title===chapter);
  const[mode,setMode]=useState(initialMode);
  const isChapter1=data?.id==='g1';
  const questions=useMemo(()=>{if(isChapter1)return mode==='challenge'?hindiChapter1Challenge:hindiChapter1Questions;return grammarBank[data?.title]?makeGrammarQuestions(data):makeLiteratureQuestions(data,mode==='challenge')},[data,mode,isChapter1]);
  if(!data)return <div className="hindi-engine-menu"><h2>पाठ उपलब्ध नहीं</h2><button type="button" className="secondary-btn pressable" onClick={onBack}>← वापस</button></div>;
  if(mode==='learn')return isChapter1?<Chapter1Learn onBack={()=>setMode(null)} addXp={addXp}/>:<Learn data={data} onBack={()=>setMode(null)} addXp={addXp}/>;
  if(['practice','challenge','test'].includes(mode))return <QuestionAssessment questions={questions} data={data} mode={mode} onBack={()=>setMode(null)} addXp={addXp} finishSession={finishSession}/>;
  return <Menu data={data} setMode={setMode} onBack={onBack}/>;
}
