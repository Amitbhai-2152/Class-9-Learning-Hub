import React,{useMemo,useState,useEffect} from 'react';
import {hindiChapters,hindiGrammar} from './hindiChapterData';

const MODES={learn:'सीखें',practice:'अभ्यास',challenge:'चुनौती',test:'टेस्ट'};
const MODE_META={
  learn:{icon:'📖',desc:'पाठ का सार, मुख्य विचार और परीक्षा-फोकस',xp:20},
  practice:{icon:'📝',desc:'बुनियादी समझ जाँचें और तुरंत feedback पाएँ',xp:15},
  challenge:{icon:'🔥',desc:'थोड़े कठिन, सोचने वाले प्रश्न',xp:25},
  test:{icon:'🎯',desc:'समयबद्ध assessment और हर प्रश्न की review',xp:15}
};

const grammarQuestions={
  'अपठित गद्यांश':[
    ['अपठित गद्यांश हल करते समय सबसे पहले क्या करना उपयोगी है?',['मुख्य विचार समझना','केवल कठिन शब्द गिनना','उत्तर याद करना','शीर्षक छोड़ देना'],0,'पहले पूरे गद्यांश का अर्थ और मुख्य विचार समझने से प्रश्नों के उत्तर अधिक सटीक होते हैं।'],
    ['किस उत्तर के लिए गद्यांश के प्रमाण को देखना चाहिए?',['तथ्य आधारित प्रश्न','हर प्रश्न में अनुमान','सिर्फ शीर्षक','किसी भी प्रश्न में नहीं'],0,'तथ्य आधारित उत्तर उसी गद्यांश में दिए संकेतों या प्रमाण से पुष्ट होते हैं।'],
    ['“निष्कर्ष” प्रश्न में क्या करना होता है?',['दिए गए विचारों से उचित बात निकालना','शब्दशः पंक्ति कॉपी करना','विषय बदल देना','केवल एक शब्द लिखना'],0,'निष्कर्ष सीधे लिखी पंक्ति की नकल नहीं, बल्कि दिए गए विचारों से निकली उचित बात है।']
  ],
  'निबंध लेखन':[
    ['अच्छे निबंध की शुरुआत सामान्यतः किससे होती है?',['भूमिका','अचानक निष्कर्ष','केवल सूची','हस्ताक्षर'],0,'भूमिका विषय का संदर्भ और लेख की दिशा स्पष्ट करती है।'],
    ['निबंध में विचारों को किस तरह रखना बेहतर है?',['क्रमबद्ध','बिना संबंध','केवल प्रश्नों में','यादृच्छिक'],0,'क्रमबद्ध विचार पाठक को विषय समझने और तर्क का अनुसरण करने में मदद करते हैं।'],
    ['निबंध का अंतिम भाग क्या कहलाता है?',['उपसंहार','संवाद','शीर्षक','सूची'],0,'उपसंहार में मुख्य विचारों को समेटकर प्रभावी समापन किया जाता है।']
  ],
  'पत्र लेखन':[
    ['औपचारिक पत्र में भाषा कैसी होनी चाहिए?',['स्पष्ट और विनम्र','बहुत बोलचाल की','अस्पष्ट','केवल एक शब्द की'],0,'औपचारिक पत्र में सम्मानजनक, स्पष्ट और उद्देश्यपूर्ण भाषा उपयुक्त होती है।'],
    ['पत्र का विषय लिखने का मुख्य लाभ क्या है?',['उद्देश्य स्पष्ट होता है','पत्र लंबा होता है','हस्ताक्षर हट जाते हैं','पता छिप जाता है'],0,'विषय से पत्र पढ़ने वाले को तुरंत पता चलता है कि पत्र किस बारे में है।'],
    ['अनौपचारिक पत्र किसे लिखा जा सकता है?',['मित्र या परिवार के सदस्य को','केवल कार्यालय को','केवल प्रधानाचार्य को','केवल संपादक को'],0,'मित्र और परिवार जैसे निकट संबंधों के लिए अनौपचारिक पत्र का प्रयोग होता है।']
  ],
  'संवाद लेखन':[
    ['संवाद कैसा होना चाहिए?',['स्वाभाविक और उद्देश्यपूर्ण','बहुत लंबा और असंबद्ध','केवल वर्णनात्मक','बिना पात्रों के'],0,'संवाद में पात्रों की बात स्वाभाविक हो और बातचीत किसी उद्देश्य की ओर बढ़े।'],
    ['संवाद में किस बात का ध्यान रखना चाहिए?',['पात्र के अनुसार भाषा','हर पात्र की भाषा बिल्कुल समान','विषय बदलते रहना','वाक्य अधूरे छोड़ना'],0,'पात्र, परिस्थिति और संबंध के अनुसार भाषा बदल सकती है।'],
    ['संवाद लेखन में सबसे जरूरी क्या है?',['बातचीत का क्रम','केवल कठिन शब्द','बहुत बड़ा शीर्षक','केवल एक वक्ता'],0,'क्रमबद्ध बातचीत से संवाद समझने योग्य और प्रभावी बनता है।']
  ],
  'अनुच्छेद लेखन':[
    ['अनुच्छेद में मुख्यतः कितने केंद्रीय विचार पर ध्यान देना चाहिए?',['एक','दस','कोई नहीं','केवल प्रश्न'],0,'एक केंद्रीय विचार के आसपास जुड़े वाक्य अनुच्छेद को सुसंगत बनाते हैं।'],
    ['अनुच्छेद में वाक्यों के बीच क्या होना चाहिए?',['संगति','अचानक विषय परिवर्तन','असंबंध','केवल तुक'],0,'संगति से पाठक विचारों को आसानी से जोड़ पाता है।']
  ],
  'लिंग':[
    ['“लड़की” का लिंग क्या है?',['स्त्रीलिंग','पुल्लिंग','नपुंसक','अव्यय'],0,'“लड़की” स्त्रीलिंग शब्द है।'],
    ['“राजा” का सामान्य स्त्रीलिंग रूप क्या है?',['रानी','राजी','राजिका','राजन'],0,'राजा का प्रचलित स्त्रीलिंग रूप “रानी” है।'],
    ['लिंग किससे संबंधित व्याकरणिक भेद है?',['पुल्लिंग और स्त्रीलिंग','वर्तमान और भूत','एक और अनेक','कर्ता और कर्म'],0,'लिंग में सामान्यतः पुल्लिंग और स्त्रीलिंग के भेद को देखा जाता है।']
  ],
  'वचन':[
    ['“पुस्तकें” किस वचन में है?',['बहुवचन','एकवचन','द्विवचन','अव्यय'],0,'“पुस्तकें” एक से अधिक पुस्तकों को बताता है, इसलिए बहुवचन है।'],
    ['“लड़का” का बहुवचन क्या है?',['लड़के','लड़कियाँ','लड़कों','लड़का'],0,'सामान्य रूप में “लड़का” का बहुवचन “लड़के” होता है।'],
    ['वचन किस संख्या-भेद को बताता है?',['एक या अनेक','भूत या भविष्य','कर्ता या कर्म','स्त्री या पुरुष'],0,'वचन से एकवचन और बहुवचन का बोध होता है।']
  ],
  'काल':[
    ['“राम पढ़ रहा है।” कौन-सा काल है?',['वर्तमान','भूत','भविष्य','किसी भी नहीं'],0,'“रहा है” वर्तमान समय में चल रही क्रिया का संकेत देता है।'],
    ['“सीमा कल गई थी।” कौन-सा काल है?',['भूत','वर्तमान','भविष्य','संदेह'],0,'“गई थी” बीते समय की क्रिया बताता है।'],
    ['“मैं कल परीक्षा दूँगा।” कौन-सा काल है?',['भविष्य','वर्तमान','भूत','अपूर्ण'],0,'“दूँगा” आने वाले समय की क्रिया बताता है।']
  ],
  'वाच्य':[
    ['“मोहन ने पत्र लिखा।” किस वाच्य का उदाहरण है?',['कर्तृवाच्य','कर्मवाच्य','भाववाच्य','अव्यय'],0,'यहाँ कर्ता “मोहन” प्रमुख है, इसलिए कर्तृवाच्य है।'],
    ['वाच्य का संबंध मुख्यतः किससे है?',['कर्ता, कर्म और क्रिया के संबंध से','केवल लिंग से','केवल वचन से','केवल विराम-चिह्न से'],0,'वाच्य से वाक्य में कर्ता, कर्म और क्रिया के संबंध का स्वरूप स्पष्ट होता है।']
  ],
  'संधि':[
    ['संधि का सामान्य अर्थ क्या है?',['मेल','वियोग','विलोम','अनुवाद'],0,'दो वर्णों या ध्वनियों के मेल से होने वाले परिवर्तन को संधि कहते हैं।'],
    ['संधि-विच्छेद में क्या किया जाता है?',['संधियुक्त शब्द को मूल शब्दों में अलग करना','वाक्य का अनुवाद','शब्द का लिंग बदलना','वाक्य छोटा करना'],0,'संधि-विच्छेद में संयुक्त रूप को उसके मूल घटकों में अलग किया जाता है।']
  ],
  'समास':[
    ['समास का प्रमुख उद्देश्य क्या है?',['अर्थ को संक्षेप में व्यक्त करना','वाक्य को प्रश्न बनाना','शब्द का उच्चारण बदलना','केवल लिंग बदलना'],0,'समास में दो या अधिक पदों का संक्षिप्त रूप में संयुक्त प्रयोग होता है।'],
    ['समस्त पद का विस्तृत अर्थ बताने को क्या कहते हैं?',['विग्रह','संधि','लिंग','काल'],0,'समस्त पद के घटकों और संबंध को स्पष्ट करने वाले रूप को विग्रह कहते हैं।']
  ],
  'पर्यायवाची, विलोम और श्रुतिसमभिन्नार्थक':[
    ['“सूर्य” का पर्यायवाची कौन-सा है?',['रवि','रात्रि','पवन','धरती'],0,'“रवि” सूर्य का पर्यायवाची शब्द है।'],
    ['“लाभ” का विलोम क्या है?',['हानि','धन','उपकार','वृद्धि'],0,'लाभ के विपरीत अर्थ वाला शब्द “हानि” है।'],
    ['श्रुतिसमभिन्नार्थक शब्दों की विशेषता क्या है?',['उच्चारण समान या मिलते-जुलते, अर्थ अलग','अर्थ और रूप दोनों समान','केवल विलोम होना','केवल बहुवचन होना'],0,'इन शब्दों का उच्चारण समान/समान-सा हो सकता है, पर अर्थ अलग होते हैं।']
  ],
  'मुहावरे और अनेक शब्दों के लिए एक शब्द':[
    ['“नाक में दम करना” का अर्थ क्या है?',['बहुत परेशान करना','शांत बैठना','जल्दी सोना','भोजन करना'],0,'इस मुहावरे का अर्थ किसी को बहुत परेशान करना है।'],
    ['“जो कभी न मरे” के लिए एक शब्द क्या होगा?',['अमर','अल्पायु','नश्वर','क्षणिक'],0,'“अमर” का अर्थ है जो कभी न मरे या मृत्यु से परे माना जाए।'],
    ['मुहावरे का अर्थ किस आधार पर समझना चाहिए?',['संदर्भ और प्रचलित अर्थ','हर शब्द का शाब्दिक अर्थ ही','केवल तुक','केवल पहला शब्द'],0,'मुहावरे का अर्थ प्रचलित और संदर्भानुकूल होता है, केवल शब्दशः अर्थ नहीं।']
  ]
};

const fallbackPool=['साहित्यिक संवेदना','भाषा की स्पष्टता','मानवीय अनुभव','सामाजिक दृष्टि','रचनात्मक अभिव्यक्ति','मुख्य विचार'];

function makeLiteratureQuestions(data,difficulty='practice'){
  const q=[];
  q.push({q:`“${data.title}” के लेखक/रचनाकार कौन हैं?`,options:[data.author,...hindiChapters.filter(x=>x.author!==data.author).slice(0,3).map(x=>x.author)],answer:0,explain:`इस पाठ के रचनाकार के रूप में ${data.author} दिए गए हैं।`});
  const themeOptions=[data.theme,...hindiChapters.filter(x=>x.theme!==data.theme).slice(0,3).map(x=>x.theme)];
  q.push({q:`“${data.title}” का प्रमुख विषय कौन-सा है?`,options:themeOptions,answer:0,explain:data.theme});
  const focusOptions=[data.focus[0],...(hindiChapters.flatMap(x=>x.focus).filter(x=>x!==data.focus[0]).slice(0,3))];
  q.push({q:`इस पाठ को पढ़ते समय किस बिंदु पर विशेष ध्यान देना चाहिए?`,options:focusOptions,answer:0,explain:`इस पाठ के लिए प्रमुख अध्ययन-बिंदु: ${data.focus.join(', ')}।`});
  const key=data.keywords[0];
  const keyOptions=[key,...fallbackPool.filter(x=>x!==key).slice(0,3)];
  q.push({q:`निम्न में से कौन-सा शब्द “${data.title}” के अध्ययन से सीधे जुड़ा है?`,options:keyOptions,answer:0,explain:`“${key}” इस पाठ के प्रमुख keywords में शामिल है।`});
  if(difficulty==='challenge')q.push({q:`पाठ के केंद्रीय विचार को समझने का सबसे अच्छा तरीका क्या है?`,options:['सार, पात्र/भाव और लेखक की दृष्टि को जोड़कर देखना','केवल कठिन शब्द याद करना','सिर्फ शीर्षक देखना','सिर्फ अंतिम वाक्य पढ़ना'],answer:0,explain:'साहित्यिक पाठ का अर्थ बेहतर समझने के लिए सार, भाव/पात्र और लेखक की दृष्टि को साथ में पढ़ना उपयोगी है।'});
  return q;
}

function buildQuestions(data,mode){
  if(data.type==='व्याकरण'||data.book==='व्याकरण एवं रचना')return (grammarQuestions[data.title]||[]).map(([q,options,answer,explain])=>({q,options,answer,explain}));
  return makeLiteratureQuestions(data,mode==='challenge'?'challenge':'practice');
}

function Review({items,onDone}){
  return <div className="hindi-review"><div className="hindi-review-head"><div><span className="hindi-kicker">परीक्षा समीक्षा</span><h2>हर प्रश्न का परिणाम</h2><p>आपने क्या चुना, सही उत्तर क्या था और क्यों—सब एक जगह।</p></div><button className="primary-btn pressable" onClick={onDone}>अध्याय पर लौटें</button></div>{items.map((item,i)=><article className={`hindi-review-item ${item.correct?'is-correct':'is-wrong'}`} key={`${item.q}-${i}`}><div className="review-index">{i+1}</div><div className="review-body"><strong>{item.q}</strong><div className="review-answer"><span>आपका उत्तर</span><b>{item.options[item.selected]??'उत्तर नहीं दिया'}</b></div><div className="review-answer"><span>सही उत्तर</span><b>{item.options[item.answer]}</b></div><p>{item.explain}</p></div></article>)}</div>;
}

function ModeMenu({data,setMode,onBack}){
  return <div className="hindi-menu"><div className="hindi-menu-hero"><span className="hindi-book-mark">अ</span><div><span className="hindi-kicker">{data.book}</span><h2>{data.title}</h2><p>{data.type}{data.author?` · ${data.author}`:''}</p></div></div><div className="hindi-mode-grid">{Object.entries(MODES).map(([id,label])=><button className="hindi-mode-card pressable" key={id} onClick={()=>setMode(id)}><span>{MODE_META[id].icon}</span><strong>{label}</strong><small>{MODE_META[id].desc}</small><em>+{MODE_META[id].xp} XP</em></button>)}</div><button className="secondary-btn pressable hindi-back-btn" onClick={onBack}>← अध्याय सूची</button></div>;
}

function LearnMode({data,onBack,addXp}){
  const[claimed,setClaimed]=useState(false);
  const claim=()=>{if(!claimed){addXp?.(MODE_META.learn.xp);setClaimed(true)}};
  return <div className="hindi-learn"><div className="hindi-learn-hero"><span className="hindi-kicker">LEARN MODE</span><h2>{data.title}</h2><p>{data.summary}</p></div><div className="hindi-learning-grid"><section className="hindi-note-card"><h3>🎯 मुख्य विचार</h3><p>{data.theme}</p></section><section className="hindi-note-card"><h3>🧠 क्या समझें?</h3><div className="hindi-chip-list">{data.focus.map(x=><span key={x}>{x}</span>)}</div></section><section className="hindi-note-card"><h3>🔑 याद रखने वाले शब्द</h3><div className="hindi-chip-list">{data.keywords.map(x=><span key={x}>{x}</span>)}</div></section><section className="hindi-note-card hindi-example-card"><h3>💡 परीक्षा रणनीति</h3><p>पहले मुख्य विचार पहचानें, फिर लेखक/रचनाकार की दृष्टि, पात्र या भाव और पाठ से मिलने वाली सीख को अपने शब्दों में जोड़ें। उत्तर लिखते समय अनावश्यक लंबाई के बजाय स्पष्ट बिंदु और उचित उदाहरण रखें।</p></section></div><div className="hindi-learn-actions"><button className="secondary-btn pressable" onClick={onBack}>← पीछे</button><button className="primary-btn pressable" onClick={claim}>{claimed?'✓ XP प्राप्त':'अध्याय पूरा करें +20 XP'}</button></div></div>;
}

function AssessmentMode({data,mode,onBack,addXp,finishSession}){
  const questions=useMemo(()=>buildQuestions(data,mode),[data,mode]);
  const[answers,setAnswers]=useState({});
  const[current,setCurrent]=useState(0);
  const[remaining,setRemaining]=useState(mode==='test'?180:null);
  const[result,setResult]=useState(null);
  useEffect(()=>{if(mode!=='test'||result)return;const timer=window.setInterval(()=>setRemaining(v=>{if(v<=1){window.clearInterval(timer);return 0}return v-1}),1000);return()=>window.clearInterval(timer)},[mode,result]);
  const selected=answers[current];
  const submit=()=>{if(selected==null)return;const next={...answers,[current]:selected};setAnswers(next);if(current<questions.length-1)setCurrent(v=>v+1);else finish(next)};
  const finish=(finalAnswers)=>{const review=questions.map((q,i)=>({q:q.q,options:q.options,answer:q.answer,selected:finalAnswers[i],correct:finalAnswers[i]===q.answer,explain:q.explain}));const correct=review.filter(x=>x.correct).length;const attempted=review.filter(x=>x.selected!=null).length;const earned=correct*(mode==='challenge'?5:3);addXp?.(earned);finishSession?.({subject:data.book,chapter:data.title,mode,attempted,correct,completed:true,earned,date:new Date().toISOString()});setResult({review,correct,attempted,earned});};
  useEffect(()=>{if(mode==='test'&&remaining===0&&!result){const finalAnswers={...answers};finish(finalAnswers)}},[remaining]);
  if(result)return <div className="hindi-result"><div className="hindi-result-score"><span>{mode==='test'?'🎯':'✅'}</span><strong>{result.correct}/{questions.length}</strong><small>सही उत्तर</small><p>{result.attempted<questions.length?`${questions.length-result.attempted} प्रश्न छोड़ दिए गए।`:result.correct===questions.length?'बहुत बढ़िया!':'अच्छा प्रयास—review से गलतियाँ मजबूत करें।'}</p></div><button className="primary-btn pressable" onClick={()=>setResult({...result,showReview:true})}>हर प्रश्न की समीक्षा →</button>{result.showReview&&<Review items={result.review} onDone={onBack}/>}</div>;
  const q=questions[current];
  const progress=Math.round((current/questions.length)*100);
  return <div className="hindi-assessment"><div className="hindi-assessment-top"><button className="secondary-btn pressable" onClick={onBack}>← छोड़ें</button><span>{mode==='test'?'टेस्ट मोड':mode==='challenge'?'चुनौती मोड':'अभ्यास मोड'}</span>{mode==='test'&&<strong>⏱ {Math.floor(remaining/60)}:{String(remaining%60).padStart(2,'0')}</strong>}</div><div className="hindi-progress-track"><span style={{width:`${progress}%`}}/></div><div className="hindi-question-count">प्रश्न {current+1} / {questions.length}</div><section className="hindi-question-card"><h2>{q.q}</h2><div className="hindi-option-list">{q.options.map((option,i)=><button key={option} className={`hindi-option pressable ${selected===i?'selected':''}`} onClick={()=>setAnswers(a=>({...a,[current]:i}))}><span>{String.fromCharCode(65+i)}</span>{option}</button>)}</div><div className="hindi-answer-actions"><span>{selected==null?'एक विकल्प चुनें':'उत्तर चुना गया ✓'}</span><button className="primary-btn pressable" disabled={selected==null} onClick={submit}>{current===questions.length-1?'जमा करें':'अगला →'}</button></div></section></div>;
}

export function HindiChapterEngine({chapter,onBack,addXp,finishSession,initialMode=null}){
  const data=hindiChapters.find(x=>x.title===chapter)||hindiGrammar.find(x=>x.title===chapter);
  const[mode,setMode]=useState(initialMode);
  if(!data)return <div className="mode-workspace"><span className="workspace-icon">अ</span><h2>Hindi content not found</h2><p>{chapter}</p><button className="secondary-btn" onClick={onBack}>← वापस</button></div>;
  if(mode==='learn')return <LearnMode data={data} onBack={()=>setMode(null)} addXp={addXp}/>;
  if(mode==='practice'||mode==='challenge'||mode==='test')return <AssessmentMode data={data} mode={mode} onBack={()=>setMode(null)} addXp={addXp} finishSession={finishSession}/>;
  return <ModeMenu data={data} setMode={setMode} onBack={onBack}/>;
}
