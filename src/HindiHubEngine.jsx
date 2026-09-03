import React,{useEffect,useMemo,useState} from 'react';
import {hindiChapters,hindiGrammar} from './hindiChapterData';
import {hindiChapter1Lesson,hindiChapter1PracticeQuestions,hindiChapter1TestQuestions,hindiChapter1Challenge} from './hindiChapter1Engine';
import {hindiChapter2Lesson,hindiChapter2PracticeQuestions,hindiChapter2TestQuestions,hindiChapter2Challenge} from './hindiChapter2Engine';
import {hindiChapter3Lesson,hindiChapter3PracticeQuestions,hindiChapter3TestQuestions,hindiChapter3Challenge} from './hindiChapter3Engine';
import {hindiChapter4Lesson,hindiChapter4PracticeQuestions,hindiChapter4TestQuestions,hindiChapter4Challenge} from './hindiChapter4Engine';
import {hindiChapter5Lesson,hindiChapter5PracticeQuestions,hindiChapter5TestQuestions,hindiChapter5Challenge} from './hindiChapter5Engine';
import {hindiChapter6Lesson,hindiChapter6PracticeQuestions,hindiChapter6TestQuestions,hindiChapter6Challenge} from './hindiChapter6Engine';
import {hindiChapter7Lesson,hindiChapter7PracticeQuestions,hindiChapter7TestQuestions,hindiChapter7Challenge} from './hindiChapter7Engine';
import {hindiChapter8Lesson,hindiChapter8PracticeQuestions,hindiChapter8TestQuestions,hindiChapter8Challenge} from './hindiChapter8Engine';
import {hindiChapter9Lesson,hindiChapter9PracticeQuestions,hindiChapter9TestQuestions,hindiChapter9Challenge} from './hindiChapter9Engine';
import {hindiChapter10Lesson,hindiChapter10PracticeQuestions,hindiChapter10TestQuestions,hindiChapter10Challenge} from './hindiChapter10Engine';
import {hindiChapter11Lesson,hindiChapter11PracticeQuestions,hindiChapter11TestQuestions,hindiChapter11Challenge} from './hindiChapter11Engine';
import {hindiChapter12Lesson,hindiChapter12PracticeQuestions,hindiChapter12TestQuestions,hindiChapter12Challenge} from './hindiChapter12Engine';
import {hindiPoetry1Lesson,hindiPoetry1PracticeQuestions,hindiPoetry1TestQuestions,hindiPoetry1Challenge} from './hindiPoetry1Engine';
import {hindiPoetry2Lesson,hindiPoetry2PracticeQuestions,hindiPoetry2TestQuestions,hindiPoetry2Challenge} from './hindiPoetry2Engine';
import {hindiPoetry3Lesson,hindiPoetry3PracticeQuestions,hindiPoetry3TestQuestions,hindiPoetry3Challenge} from './hindiPoetry3Engine';
import {hindiPoetry4Lesson,hindiPoetry4PracticeQuestions,hindiPoetry4TestQuestions,hindiPoetry4Challenge} from './hindiPoetry4Engine';
import {hindiPoetry5Lesson,hindiPoetry5PracticeQuestions,hindiPoetry5TestQuestions,hindiPoetry5Challenge} from './hindiPoetry5Engine';
import {hindiPoetry6Lesson,hindiPoetry6PracticeQuestions,hindiPoetry6TestQuestions,hindiPoetry6Challenge} from './hindiPoetry6Engine';
import {hindiPoetry7Lesson,hindiPoetry7PracticeQuestions,hindiPoetry7TestQuestions,hindiPoetry7Challenge} from './hindiPoetry7Engine';
import {hindiPoetry8Lesson,hindiPoetry8PracticeQuestions,hindiPoetry8TestQuestions,hindiPoetry8ChallengeQuestions} from './hindiPoetry8Engine';
import {getHindiProgress,isHindiModeCompleted,markHindiChapterCompleted,markHindiModeCompleted} from './hindiChapterProgress';
import {HindiChapter6Learn} from './HindiChapter6Learn';
import {HindiChapter7Learn} from './HindiChapter7Learn';
import {HindiChapter8Learn} from './HindiChapter8Learn';
import {HindiChapter9Learn} from './HindiChapter9Learn';
import {HindiChapter10Learn} from './HindiChapter10Learn';
import {HindiChapter11Learn} from './HindiChapter11Learn';
import {HindiChapter12Learn} from './HindiChapter12Learn';
import {HindiPoetry1Learn} from './HindiPoetry1Learn';
import {HindiPoetry2Learn} from './HindiPoetry2Learn';
import {HindiPoetry3Learn} from './HindiPoetry3Learn';
import {HindiPoetry4Learn} from './HindiPoetry4Learn';
import {HindiPoetry5Learn} from './HindiPoetry5Learn';
import {HindiPoetry6Learn} from './HindiPoetry6Learn';
import {HindiPoetry7Learn} from './HindiPoetry7Learn';
import {HindiPoetry8Learn} from './HindiPoetry8Learn';
import {HindiLearnNavigator} from './HindiLearnNavigator';
import './hindi-chapter1.css';

const modes={learn:'सीखें',practice:'अभ्यास',challenge:'चुनौती',test:'टेस्ट'};
const modeMeta={learn:['📖','पाठ को समझें और मुख्य विचार पकड़ें',20],practice:['📝','सीखी बात पक्की करें',15],challenge:['🔥','सोच-वाले कठिन प्रश्न',25],test:['🎯','समयबद्ध final test',15]};
const genericGrammarDistractors=['वाक्य परिवर्तन','केवल शीर्षक','अर्थ बदलना','अनावश्यक विस्तार','यादृच्छिक क्रम'];
const grammarBank={'अपठित गद्यांश':[['मुख्य विचार',0,'गद्यांश हल करते समय पहले पूरे पाठ का मुख्य विचार और संदर्भ समझना चाहिए।'],['तथ्य आधारित उत्तर',0,'उत्तर के लिए गद्यांश में दिए प्रमाण या संकेत देखें।'],['निष्कर्ष',0,'निष्कर्ष दिए गए विचारों से निकला उचित अर्थ होता है।']], 'निबंध लेखन':[['भूमिका',0,'भूमिका विषय का संदर्भ और लेख की दिशा स्पष्ट करती है।'],['क्रमबद्ध विचार',0,'विचारों का क्रम निबंध को सुसंगत और प्रभावी बनाता है।'],['उपसंहार',0,'उपसंहार मुख्य विचारों को समेटकर लेख का प्रभावी समापन करता है।']], 'पत्र लेखन':[['स्पष्ट और विनम्र भाषा',0,'पत्र के उद्देश्य और संबंध के अनुसार स्पष्ट तथा सम्मानजनक भाषा उपयुक्त है।'],['विषय',0,'विषय से पत्र का उद्देश्य जल्दी समझ में आता है।'],['अनौपचारिक पत्र',0,'मित्र या परिवार के सदस्य को अनौपचारिक पत्र लिखा जा सकता है।']], 'संवाद लेखन':[['स्वाभाविक और उद्देश्यपूर्ण',0,'संवाद पात्रों और परिस्थिति के अनुसार स्वाभाविक होना चाहिए।'],['पात्र के अनुसार भाषा',0,'भाषा पात्र, संबंध और परिस्थिति के अनुकूल होनी चाहिए।'],['क्रम',0,'बातचीत का क्रम संवाद को समझने योग्य बनाता है।']], 'अनुच्छेद लेखन':[['एक केंद्रीय विचार',0,'एक मुख्य विचार के आसपास जुड़े वाक्य अच्छा अनुच्छेद बनाते हैं।'],['संगति',0,'वाक्यों के बीच विचार-संबंध होना चाहिए.']], 'लिंग':[['स्त्रीलिंग',0,'“लड़की” स्त्रीलिंग शब्द है।'],['रानी',0,'“राजा” का प्रचलित स्त्रीलिंग रूप “रानी” है।'],['पुल्लिंग और स्त्रीलिंग',0,'लिंग में सामान्यतः पुल्लिंग और स्त्रीलिंग के भेद को देखा जाता है।']], 'वचन':[['बहुवचन',0,'“पुस्तकें” एक से अधिक पुस्तकों को बताता है।'],['लड़के',0,'“लड़का” का सामान्य बहुवचन “लड़के” है।'],['एक या अनेक',0,'वचन एकवचन और बहुवचन का बोध कराता है।']], 'काल':[['वर्तमान',0,'“राम पढ़ रहा है” में चल रही क्रिया वर्तमान समय दिखाती है।'],['भूत',0,'“सीमा गई थी” बीते समय की क्रिया दिखाती है।'],['भविष्य',0,'“मैं परीक्षा दूँगा” आने वाले समय का बोध कराता है।']], 'वाच्य':[['कर्तृवाच्य',0,'“मोहन ने पत्र लिखा” में कर्ता प्रमुख है।'],['कर्ता, कर्म और क्रिया',0,'वाच्य इन तीनों के संबंध के स्वरूप से जुड़ा है।']], 'संधि':[['मेल',0,'संधि में दो वर्णों/ध्वनियों के मेल से परिवर्तन होता है।'],['मूल शब्दों में अलग करना',0,'संधि-विच्छेद में संयुक्त रूप को उसके घटकों में अलग करते हैं।']], 'समास':[['अर्थ को संक्षेप में व्यक्त करना',0,'समास दो या अधिक पदों के संक्षिप्त संयुक्त रूप से अर्थ व्यक्त करता है।'],['विग्रह',0,'समस्त पद का विस्तृत अर्थ बताने वाले रूप को विग्रह कहते हैं।']], 'पर्यायवाची, विलोम और श्रुतिसमभिन्नार्थक':[['रवि',0,'“रवि” सूर्य का पर्यायवाची है।'],['हानि',0,'“हानि” लाभ का विलोम है।'],['उच्चारण समान, अर्थ अलग',0,'श्रुतिसमभिन्नार्थक शब्दों का उच्चारण समान/समान-सा हो सकता है, अर्थ अलग होता है।']], 'मुहावरे और अनेक शब्दों के लिए एक शब्द':[['बहुत परेशान करना',0,'“नाक में दम करना” का अर्थ बहुत परेशान करना है।'],['अमर',0,'“जो कभी न मरे” के लिए “अमर” उपयुक्त एक शब्द है।'],['संदर्भ और प्रचलित अर्थ',0,'मुहावरे का अर्थ संदर्भ और प्रचलित प्रयोग से समझा जाता है.']]};
function makeGrammarQuestions(data){return(grammarBank[data.title]||[]).map(([answer,_,explain],i)=>({q:i===0?`“${data.title}” में सही अवधारणा/उत्तर क्या है?`:`“${data.title}” से जुड़ा सही बिंदु कौन-सा है?`,options:[answer,...genericGrammarDistractors.filter(x=>x!==answer).slice(0,3)],answer:0,explain}));}
function makeLiteratureQuestions(data,challenge){return (challenge?data.challengeQuestions:data.questions)||[];}
function shuffle(items){return [...items].sort(()=>Math.random()-.5)}
function normalizeQuestions(list,count){const out=[];for(let i=0;i<count&&i<list.length;i++)out.push({...list[i],options:[...(list[i].options||[])],answer:Number(list[i].answer)||0});return out;}
function getChapterData(title){
  const topic=hindiChapters.find(x=>x.title===title);
  const sources={
    g1:[hindiChapter1Lesson,hindiChapter1PracticeQuestions,hindiChapter1TestQuestions,hindiChapter1Challenge],
    g2:[hindiChapter2Lesson,hindiChapter2PracticeQuestions,hindiChapter2TestQuestions,hindiChapter2Challenge],
    g3:[hindiChapter3Lesson,hindiChapter3PracticeQuestions,hindiChapter3TestQuestions,hindiChapter3Challenge],
    g4:[hindiChapter4Lesson,hindiChapter4PracticeQuestions,hindiChapter4TestQuestions,hindiChapter4Challenge],
    g5:[hindiChapter5Lesson,hindiChapter5PracticeQuestions,hindiChapter5TestQuestions,hindiChapter5Challenge],
    g6:[hindiChapter6Lesson,hindiChapter6PracticeQuestions,hindiChapter6TestQuestions,hindiChapter6Challenge],
    g7:[hindiChapter7Lesson,hindiChapter7PracticeQuestions,hindiChapter7TestQuestions,hindiChapter7Challenge],
    g8:[hindiChapter8Lesson,hindiChapter8PracticeQuestions,hindiChapter8TestQuestions,hindiChapter8Challenge],
    g9:[hindiChapter9Lesson,hindiChapter9PracticeQuestions,hindiChapter9TestQuestions,hindiChapter9Challenge],
    g10:[hindiChapter10Lesson,hindiChapter10PracticeQuestions,hindiChapter10TestQuestions,hindiChapter10Challenge],
    g11:[hindiChapter11Lesson,hindiChapter11PracticeQuestions,hindiChapter11TestQuestions,hindiChapter11Challenge],
    g12:[hindiChapter12Lesson,hindiChapter12PracticeQuestions,hindiChapter12TestQuestions,hindiChapter12Challenge],
    p1:[hindiPoetry1Lesson,hindiPoetry1PracticeQuestions,hindiPoetry1TestQuestions,hindiPoetry1Challenge],
    p2:[hindiPoetry2Lesson,hindiPoetry2PracticeQuestions,hindiPoetry2TestQuestions,hindiPoetry2Challenge],
    p3:[hindiPoetry3Lesson,hindiPoetry3PracticeQuestions,hindiPoetry3TestQuestions,hindiPoetry3Challenge],
    p4:[hindiPoetry4Lesson,hindiPoetry4PracticeQuestions,hindiPoetry4TestQuestions,hindiPoetry4Challenge],
    p5:[hindiPoetry5Lesson,hindiPoetry5PracticeQuestions,hindiPoetry5TestQuestions,hindiPoetry5Challenge],
    p6:[hindiPoetry6Lesson,hindiPoetry6PracticeQuestions,hindiPoetry6TestQuestions,hindiPoetry6Challenge],
    p7:[hindiPoetry7Lesson,hindiPoetry7PracticeQuestions,hindiPoetry7TestQuestions,hindiPoetry7Challenge],
    p8:[hindiPoetry8Lesson,hindiPoetry8PracticeQuestions,hindiPoetry8TestQuestions,hindiPoetry8ChallengeQuestions]
  };
  const found=topic?sources[topic.id]:null;
  if(!found)return null;
  return {title:topic.title,lesson:found[0],practice:found[1],test:found[2],challenge:found[3]};
}

const dedicatedLearnComponents={g6:HindiChapter6Learn,g7:HindiChapter7Learn,g8:HindiChapter8Learn,g9:HindiChapter9Learn,g10:HindiChapter10Learn,g11:HindiChapter11Learn,g12:HindiChapter12Learn,p1:HindiPoetry1Learn,p2:HindiPoetry2Learn,p3:HindiPoetry3Learn,p4:HindiPoetry4Learn,p5:HindiPoetry5Learn,p6:HindiPoetry6Learn,p7:HindiPoetry7Learn,p8:HindiPoetry8Learn};

function LearnView({data,onBack,onModeComplete}){return <HindiLearnNavigator lesson={data}><div className="hindi-learn"><div className="hindi-learn-banner"><span>📖 LEARN</span><h2>{data.title}</h2><p>{data.intro||data.overview}</p>{data.author&&<div className="hindi-topic-author">✦ {data.author}</div>}</div><div className="hindi-learn-grid"><section><h3>केंद्रीय विचार</h3><p>{data.overview||data.intro}</p></section><section><h3>मुख्य बिंदु</h3><div className="hindi-learning-points">{(data.sections||[]).slice(0,6).map((x,i)=><article key={i}><b>{x.title}</b><p>{x.body}</p></article>)}</div></section><section><h3>याद रखने योग्य बातें</h3><p>{data.authorNote||'मुख्य विचार, पात्र/बिंब, भाषा-शैली और पाठ से मिलने वाली सीख को अपने शब्दों में दोहराएँ।'}</p></section></div><div className="hindi-actions"><button type="button" className="pressable" onClick={()=>{onModeComplete('learn');onBack();}}>✓ सीखना पूरा करें</button><button type="button" className="pressable" onClick={onBack}>← वापस</button></div></div></HindiLearnNavigator>}
function Menu({data,onBack,onSelect}){return <div className="hindi-mode-menu"><button className="hindi-back pressable" onClick={onBack}>← अध्याय सूची</button><div className="hindi-mode-head"><span className="hindi-kicker">गोधूली भाग 1 • कक्षा 9</span><h2>{data.title}</h2><p>{data.lesson?.overview||data.lesson?.intro||'अध्याय की तैयारी शुरू करें।'}</p></div><div className="hindi-mode-grid">{Object.entries(modes).map(([mode,label])=>{const [icon,help,mins]=modeMeta[mode];return <button key={mode} type="button" className={`hindi-mode-card hindi-mode-${mode} pressable`} onClick={()=>onSelect(mode)}><span>{icon}</span><b>{label}</b><small>{help}</small><em>{mins} मिनट</em></button>})}</div></div>}
function QuestionMode({data,mode,onBack,onComplete}){const source=mode==='practice'?data.practice:mode==='challenge'?data.challenge:data.test;const questions=useMemo(()=>normalizeQuestions(source||[],mode==='practice'?Math.min(15,(source||[]).length):mode==='challenge'?Math.min(12,(source||[]).length):Math.min(20,(source||[]).length)),[source,mode]);const [index,setIndex]=useState(0),[answers,setAnswers]=useState({}),[submitted,setSubmitted]=useState(false);const q=questions[index];const choose=i=>{if(!submitted)setAnswers(a=>({...a,[index]:i}))};const score=questions.reduce((s,x,i)=>s+(answers[i]===x.answer?1:0),0);if(!q)return <div className="hindi-empty"><h3>इस मोड में अभी सामग्री उपलब्ध नहीं है।</h3><button className="pressable" onClick={onBack}>← वापस</button></div>;if(submitted)return <div className="hindi-result"><span>🎯 परिणाम</span><h2>{score} / {questions.length}</h2><p>{score===questions.length?'बहुत बढ़िया!':score>=Math.ceil(questions.length*.7)?'अच्छी तैयारी है।':'गलतियों को समीक्षा करके फिर प्रयास करें।'}</p><div className="hindi-review-list">{questions.map((x,i)=><article key={i} className={answers[i]===x.answer?'is-correct':'is-wrong'}><b>प्रश्न {i+1}</b><p>{x.q}</p><small>सही उत्तर: {x.options[x.answer]}</small>{x.explain&&<em>{x.explain}</em>}</article>)}</div><div className="hindi-actions"><button className="pressable" onClick={()=>{onComplete(mode);onBack();}}>✓ मोड पूरा करें</button><button className="pressable" onClick={()=>{setSubmitted(false);setIndex(0);setAnswers({});}}>↻ फिर से दें</button></div></div>;return <div className="hindi-question-mode"><div className="hindi-question-head"><button className="hindi-back pressable" onClick={onBack}>← वापस</button><span>{modes[mode]} • {index+1}/{questions.length}</span></div><div className="hindi-progress"><span style={{width:`${((index+1)/questions.length)*100}%`}}/></div><article className="hindi-question-card"><h3>{q.q}</h3><div className="hindi-option-grid">{q.options.map((option,i)=><button key={i} type="button" className={`hindi-option ${answers[index]===i?'selected':''} pressable`} onClick={()=>choose(i)}>{option}</button>)}</div></article><div className="hindi-actions"><button className="pressable" disabled={answers[index]===undefined} onClick={()=>index+1<questions.length?setIndex(index+1):setSubmitted(true)}>{index+1<questions.length?'अगला प्रश्न →':'परिणाम देखें'}</button></div></div>}
export function HindiHubEngine({onBack,chapterTitle,chapter,mode='learn',initialMode,open}){const resolvedChapterTitle=chapterTitle??chapter;const resolvedMode=initialMode??mode;const initial=getChapterData(resolvedChapterTitle);const [data,setData]=useState(initial);useEffect(()=>setData(getChapterData(resolvedChapterTitle)),[resolvedChapterTitle]);if(!data)return <div className="hindi-empty"><p>अध्याय नहीं मिला।</p><button className="pressable" onClick={onBack}>← वापस</button></div>;const handleComplete=completedMode=>{markHindiModeCompleted(resolvedChapterTitle,completedMode);const modesDone=['learn','practice','challenge','test'].every(m=>completedMode===m||isHindiModeCompleted(resolvedChapterTitle,m));if(modesDone)markHindiChapterCompleted(resolvedChapterTitle);};const topicId=hindiChapters.find(x=>x.title===resolvedChapterTitle)?.id;const DedicatedLearn=dedicatedLearnComponents[topicId];if(resolvedMode==='learn'&&DedicatedLearn)return <DedicatedLearn onBack={onBack} onModeComplete={handleComplete}/>;if(['learn','practice','challenge','test'].includes(resolvedMode)&&resolvedChapterTitle)return resolvedMode==='learn'?<LearnView data={data.lesson} onBack={onBack} onModeComplete={handleComplete}/>:<QuestionMode data={data} mode={resolvedMode} onBack={onBack} onComplete={handleComplete}/>;return <Menu data={data} onBack={onBack} onSelect={m=>{if(open)open(resolvedChapterTitle,m);}}/>;}