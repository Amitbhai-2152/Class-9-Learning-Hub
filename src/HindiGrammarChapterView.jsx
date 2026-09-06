import React,{useEffect,useMemo,useState} from 'react';
import {hindiAllTopics} from './hindiChapterData';
import {HINDI_MODE_TIMING} from './hindi-mode-timing';
import {HINDI_GRAMMAR_CONTENT,HINDI_GRAMMAR_MODES} from './hindiGrammarContent';
import {HINDI_GRAMMAR_ENRICHMENT} from './hindiGrammarEnrichment';
import {HINDI_GRAMMAR_LESSON_POINTS} from './hindiGrammarLessonPoints';
import {HindiGrammarTopicPage} from './HindiGrammarTopicPage';
import {HindiParagraphTopicPage} from './HindiParagraphTopicPage';
import {HindiGenderTopicPage} from './HindiGenderTopicPage';
import {HindiNumberTopicPage} from './HindiNumberTopicPage';
import {HindiTenseTopicPage} from './HindiTenseTopicPage';
import {HindiVoiceTopicPage} from './HindiVoiceTopicPage';
import {HindiSandhiTopicPage} from './HindiSandhiTopicPage';
import {HindiSamasTopicPage} from './HindiSamasTopicPage';
import {HindiSynonymAntonymTopicPage} from './HindiSynonymAntonymTopicPage';
import {HindiIdiomsOneWordTopicPage} from './HindiIdiomsOneWordTopicPage';

const MODES=['practice','challenge','test'];
const grammarTopics=hindiAllTopics.filter(x=>x.book==='व्याकरण एवं रचना');

export function HindiGrammarChapterView({topic,initialMode='learn',onBack,onComplete,onNavigate}){
  const data=HINDI_GRAMMAR_CONTENT[topic?.id];
  const enrichment=HINDI_GRAMMAR_ENRICHMENT[topic?.id];
  const lessonPoints=HINDI_GRAMMAR_LESSON_POINTS[topic?.id]||data?.points||[];
  const [mode,setMode]=useState(initialMode);
  const [index,setIndex]=useState(0);
  const [answers,setAnswers]=useState({});
  const [submitted,setSubmitted]=useState(false);
  const [showTopicPage,setShowTopicPage]=useState(false);
  const timing=mode==='learn'?null:HINDI_MODE_TIMING[mode];
  const [seconds,setSeconds]=useState(timing?.minutes*60||null);

  useEffect(()=>{
    if(mode==='learn'||!timing)return;
    setSeconds(timing.minutes*60);
    setIndex(0);setAnswers({});setSubmitted(false);
  },[mode]);
  useEffect(()=>{if(!submitted||mode==='learn')return;onComplete?.(mode)},[submitted,mode,onComplete]);
  useEffect(()=>{
    if(!timing||submitted||seconds==null)return;
    const id=window.setInterval(()=>setSeconds(v=>Math.max((v??0)-1,0)),1000);
    return()=>window.clearInterval(id);
  },[timing,submitted]);
  useEffect(()=>{if(timing&&seconds===0&&!submitted)setSubmitted(true)},[timing,seconds,submitted]);

  const questions=useMemo(()=>{
    if(!data||mode==='learn')return [];
    const meta=HINDI_GRAMMAR_MODES[mode];
    return data.questions.slice(meta.start,meta.end);
  },[data,mode]);
  const topicIndex=grammarTopics.findIndex(x=>x.id===topic?.id);
  const prevTopic=topicIndex>0?grammarTopics[topicIndex-1]:null;
  const nextTopic=topicIndex>=0&&topicIndex<grammarTopics.length-1?grammarTopics[topicIndex+1]:null;

  if(!topic||!data)return null;
  if(showTopicPage)return topic?.id==='grammar-gr5'?<HindiParagraphTopicPage onBack={()=>setShowTopicPage(false)}/>:topic?.id==='grammar-gr6'?<HindiGenderTopicPage onBack={()=>setShowTopicPage(false)}/>:topic?.id==='grammar-gr7'?<HindiNumberTopicPage onBack={()=>setShowTopicPage(false)}/>:topic?.id==='grammar-gr8'?<HindiTenseTopicPage onBack={()=>setShowTopicPage(false)}/>:topic?.id==='grammar-gr9'?<HindiVoiceTopicPage onBack={()=>setShowTopicPage(false)}/>:topic?.id==='grammar-gr10'?<HindiSandhiTopicPage onBack={()=>setShowTopicPage(false)}/>:topic?.id==='grammar-gr11'?<HindiSamasTopicPage onBack={()=>setShowTopicPage(false)}/>:topic?.id==='grammar-gr12'?<HindiSynonymAntonymTopicPage onBack={()=>setShowTopicPage(false)}/>:topic?.id==='grammar-gr13'?<HindiIdiomsOneWordTopicPage onBack={()=>setShowTopicPage(false)}/>:<HindiGrammarTopicPage topic={topic} onBack={()=>setShowTopicPage(false)}/>;
  if(mode==='learn')return <div className="hindi-learn hindi-chapter1-learn hindi-varnika-learn"><div className="hindi-learn-banner"><span>हिन्दी • व्याकरण एवं रचना • विषय {Math.max(topicIndex+1,1)}</span><h2>{data.title}</h2><p>{data.summary}</p></div><section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>📖 विषय को समझें</h3><span>{lessonPoints.length} मुख्य बिंदु</span></div><div className="hindi-learn-grid">{lessonPoints.map(([title,body],i)=><section key={`${title}-${i}`}><h3>{i+1}. {title}</h3><p>{body}</p></section>)}</div></section><section className="hindi-ch1-panel hindi-grammar-detail-panel"><div className="hindi-ch1-panel-head"><h3>💡 उदाहरणों से समझें</h3><span>{enrichment?.examples?.length||0} उदाहरण</span></div><div className="hindi-learn-grid">{(enrichment?.examples||[]).map(([title,body],i)=><section key={`${title}-${i}`}><h3>{i+1}. {title}</h3><p>{body}</p></section>)}</div></section><section className="hindi-ch1-panel hindi-grammar-detail-panel"><div className="hindi-ch1-panel-head"><h3>⚠️ सामान्य गलतियाँ</h3><span>इनसे बचें</span></div><div className="hindi-learn-grid">{(enrichment?.mistakes||[]).map((item,i)=><section key={`${item}-${i}`}><h3>{i+1}. गलती</h3><p>{item}</p></section>)}</div></section><section className="hindi-ch1-panel hindi-grammar-detail-panel"><div className="hindi-ch1-panel-head"><h3>🎯 परीक्षा रणनीति</h3><span>Quick checklist</span></div><div className="hindi-learn-grid">{(enrichment?.tips||[]).map((item,i)=><section key={`${item}-${i}`}><h3>{i+1}. ध्यान रखें</h3><p>{item}</p></section>)}</div></section><div className="hindi-ch1-callout"><strong>📝 परीक्षा फोकस</strong><p>परिभाषा केवल याद न करें—नियम, उदाहरण और सही प्रयोग को साथ समझें। अभ्यास में पहचान, प्रयोग और भ्रमित करने वाले विकल्पों पर विशेष ध्यान दें।</p></div><div className="hindi-actions"><button type="button" className="secondary-btn pressable" onClick={onBack}>← व्याकरण सूची</button><div><button type="button" className="secondary-btn pressable" onClick={()=>setShowTopicPage(true)}>📘 विस्तृत विषय पेज</button><button type="button" className="secondary-btn pressable" onClick={()=>setMode('practice')}>📝 अभ्यास शुरू करें</button><button type="button" className="primary-btn pressable" onClick={()=>onComplete?.('learn')}>✓ सीखना पूरा करें</button></div></div></div>;

  if(submitted){
    const score=questions.reduce((s,q,i)=>s+(answers[i]===q.answer?1:0),0);
    return <div className="hindi-learn hindi-chapter1-learn hindi-varnika-learn"><div className="hindi-ch1-panel"><div className="hindi-score"><span>🎯</span><strong>{score}/{questions.length}</strong><small>सही उत्तर</small><p>{score>=Math.ceil(questions.length*.7)?'अच्छी तैयारी है।':'गलतियों की समीक्षा करके फिर प्रयास करें।'}</p></div><div className="hindi-review"><div className="hindi-review-head"><h3>हर प्रश्न की समीक्षा</h3><span>{HINDI_GRAMMAR_MODES[mode].label}</span></div>{questions.map((q,i)=><article className={`hindi-review-item ${answers[i]===q.answer?'ok':'wrong'}`} key={`${q.q}-${i}`}><div className="hindi-review-num">{i+1}</div><div><strong>{q.q}</strong><p><b>आपका उत्तर:</b> {answers[i]!=null?q.options[answers[i]]:'उत्तर नहीं दिया'}</p><p><b>सही उत्तर:</b> {q.options[q.answer]}</p><span>{q.explain}</span></div></article>)}</div><div className="hindi-actions"><button type="button" className="secondary-btn pressable" onClick={()=>{setSubmitted(false);setIndex(0);setAnswers({});setSeconds(timing.minutes*60)}}>↻ फिर से दें</button>{prevTopic&&<button type="button" className="secondary-btn pressable" onClick={()=>onNavigate?.(prevTopic.id)}>← पिछला विषय</button>}{nextTopic&&<button type="button" className="primary-btn pressable" onClick={()=>onNavigate?.(nextTopic.id)}>अगला विषय →</button>}<button type="button" className="secondary-btn pressable" onClick={onBack}>व्याकरण सूची</button></div></div></div>;
  }

  const q=questions[index];
  return <div className="hindi-learn hindi-chapter1-learn hindi-varnika-learn"><div className="hindi-learn-banner"><span>व्याकरण एवं रचना • {HINDI_GRAMMAR_MODES[mode].label}</span><h2>{data.title}</h2><p>{HINDI_GRAMMAR_MODES[mode].count} अलग प्रश्न · {timing.label} · हर mode की अपनी question range है।</p></div><div className="hindi-mode-switch">{MODES.map(m=><button key={m} type="button" className={mode===m?'active':''} onClick={()=>setMode(m)}>{m==='practice'?'📝 अभ्यास':m==='challenge'?'🔥 चुनौती':'🎯 टेस्ट'}</button>)}</div><section className="hindi-assessment"><div className="hindi-assessment-header"><div><span>{HINDI_GRAMMAR_MODES[mode].label}</span><strong>{index+1} / {questions.length}</strong></div><div className="hindi-exam-clock">⏱ {Math.floor((seconds||0)/60)}:{String((seconds||0)%60).padStart(2,'0')}</div></div><div className="hindi-q-progress"><span style={{width:`${Math.round(((index+1)/questions.length)*100)}%`}}/></div><div className="hindi-question"><small>प्रश्न {index+1}</small><h2>{q.q}</h2><div className="hindi-options">{q.options.map((option,i)=><button type="button" key={`${option}-${i}`} className={`hindi-option pressable ${answers[index]===i?'selected':''}`} onClick={()=>setAnswers(a=>({...a,[index]:i}))}><b>{String.fromCharCode(65+i)}</b><span>{option}</span></button>)}</div><div className="hindi-question-actions"><button type="button" className="secondary-btn pressable" disabled={index===0} onClick={()=>setIndex(v=>Math.max(v-1,0))}>← पिछला</button>{index<questions.length-1?<button type="button" className="primary-btn pressable" disabled={answers[index]==null} onClick={()=>setIndex(v=>v+1)}>अगला →</button>:<button type="button" className="primary-btn pressable" disabled={answers[index]==null} onClick={()=>setSubmitted(true)}>जमा करें ✓</button>}</div></div></section></div>;
}

export default HindiGrammarChapterView;
