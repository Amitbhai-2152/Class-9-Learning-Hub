import React,{useMemo,useState} from 'react';
import {HINDI_GRAMMAR_CONTENT} from './hindiGrammarContent';
import {HINDI_GRAMMAR_ENRICHMENT} from './hindiGrammarEnrichment';
import {HINDI_GRAMMAR_TOPIC_META,HINDI_GRAMMAR_TOPIC_EXAMPLES} from './hindiGrammarTopicData';
import {HINDI_UNSEEN_PASSAGES} from './hindiUnseenPassages';
import './hindi-grammar-topic.css';

const topicOrder=Object.keys(HINDI_GRAMMAR_TOPIC_META);

function QuestionCard({item,index}){
 const [show,setShow]=useState(false);
 return <article className="hgt-question"><div className="hgt-question-head"><span>प्रश्न {index+1}</span><b>{item.q}</b></div><div className="hgt-options">{item.options.map((option,i)=><button key={`${index}-${i}`} type="button" className={show&&i===item.answer?'hgt-correct':''} onClick={()=>show||setShow(true)}><span>{String.fromCharCode(65+i)}</span>{option}</button>)}</div>{show&&<div className="hgt-answer"><strong>उत्तर:</strong> {item.options[item.answer]}<p>{item.explain}</p></div>}<div className="hgt-question-foot">{show?'उत्तर देख लिया — अब कारण समझकर दोबारा सोचें।':'विकल्प चुनें; उत्तर नीचे खुलेगा।'}</div></article>
}

function Passage({data,startIndex}){
 const [revealed,setRevealed]=useState({});
 return <section className="hgt-passage"><div className="hgt-passage-title"><span>पठन-अभ्यास</span><h3>{data.title}</h3></div><p className="hgt-passage-text">{data.passage}</p><div className="hgt-passage-tip"><b>कैसे हल करें:</b> पहले पूरा गद्यांश पढ़ें, फिर प्रश्न के संकेत-शब्द को संबंधित पंक्ति/विचार से मिलाएँ। उत्तर passage से ही प्रमाणित होना चाहिए।</div><div className="hgt-passage-questions">{data.questions.map((q,i)=>{const key=`${startIndex+i}`;return <article className="hgt-question" key={key}><div className="hgt-question-head"><span>प्रश्न {startIndex+i+1}</span><b>{q.q}</b></div><div className="hgt-options">{q.options.map((option,j)=><button key={`${key}-${j}`} type="button" className={revealed[key]&&j===q.answer?'hgt-correct':''} onClick={()=>setRevealed(s=>({...s,[key]:true}))}><span>{String.fromCharCode(65+j)}</span>{option}</button>)}</div>{revealed[key]&&<div className="hgt-answer"><strong>उत्तर:</strong> {q.options[q.answer]}<p>{q.explain}</p></div>}<div className="hgt-question-foot">{revealed[key]?'उत्तर जाँचें और देखें कि गद्यांश की कौन-सी पंक्ति/बात प्रमाण देती है।':'एक विकल्प चुनकर स्वयं जाँचें।'}</div></article>})}</div></section>
}

export function HindiGrammarTopicPage({topic,onBack}){
 const content=HINDI_GRAMMAR_CONTENT[topic.id];
 const meta=HINDI_GRAMMAR_TOPIC_META[topic.id];
 const enrichment=HINDI_GRAMMAR_ENRICHMENT[topic.id];
 const extraExamples=HINDI_GRAMMAR_TOPIC_EXAMPLES[topic.id]||[];
 const isPassage=topic.id==='grammar-gr1';
 const testQuestions=useMemo(()=>content?.questions?.slice(27,47)||[],[content]);
 const [section,setSection]=useState('learn');
 if(!content||!meta)return null;
 const steps=meta.steps||[];
 return <main className="hgt-page"><header className="hgt-hero"><div className="hgt-hero-inner"><button type="button" className="hgt-back" onClick={onBack}>← वापस Byakaran</button><span className="hgt-kicker">कक्षा 9 • व्याकरण एवं रचना</span><h1>{meta.title}</h1><p>{content.summary}</p><div className="hgt-stat-row"><span>📚 5+ उदाहरण</span><span>{isPassage?'📝 10 गद्यांश • 50 प्रश्न':'📝 20 प्रश्न'}</span><span>🎯 परीक्षा-केंद्रित तैयारी</span></div></div></header>
 <div className="hgt-tabs" role="tablist" aria-label="विषय सामग्री"><button className={section==='learn'?'active':''} onClick={()=>setSection('learn')}>📖 समझें</button><button className={section==='questions'?'active':''} onClick={()=>setSection('questions')}>📝 20 प्रश्न</button></div>
 <div className="hgt-content">
 {section==='learn'?<>
   <section className="hgt-panel hgt-strategy"><div className="hgt-section-label">STEP-BY-STEP</div><h2>{meta.subtitle}</h2><div className="hgt-step-grid">{steps.map((step,i)=><div key={step}><span>{i+1}</span><p>{step}</p></div>)}</div></section>
   <section className="hgt-panel"><div className="hgt-section-label">CONCEPT NOTES</div><h2>मुख्य बातें</h2><div className="hgt-points">{content.points.map((point,i)=><article key={`${point[0]}-${i}`}><b>{point[0]}</b><p>{point[1]}</p></article>)}</div></section>
   {isPassage?<section className="hgt-panel"><div className="hgt-section-label">10 PASSAGE EXAMPLES</div><h2>10 अलग-अलग अपठित गद्यांश</h2><p className="hgt-muted">हर गद्यांश नया है। प्रत्येक के साथ 5 प्रश्न हैं, यानी कुल 50 passage-based questions। सही उत्तर passage की जानकारी और उसके तार्किक निष्कर्ष से तय होते हैं।</p>{HINDI_UNSEEN_PASSAGES.map((p,i)=><Passage key={p.title} data={p} startIndex={i*5}/>)}</section>:<section className="hgt-panel"><div className="hgt-section-label">EXAMPLES</div><h2>उदाहरणों से समझें</h2><div className="hgt-example-grid">{(extraExamples.length?extraExamples:enrichment?.examples||[]).map(([label,text])=><article key={label}><span>{label}</span><p>{text}</p></article>)}</div></section>}
   {!isPassage&&<section className="hgt-panel"><div className="hgt-section-label">COMMON ERRORS</div><h2>कहाँ गलती होती है?</h2><div className="hgt-error-grid">{(enrichment?.mistakes||[]).map(item=><article key={item}><span>⚠️</span><p>{item}</p></article>)}</div><div className="hgt-tip-box"><b>Exam strategy</b><ul>{(enrichment?.tips||[]).map(t=><li key={t}>{t}</li>)}</ul></div></section>}
   {isPassage&&<section className="hgt-panel"><div className="hgt-section-label">COMMON ERRORS</div><h2>गद्यांश में ये गलतियाँ न करें</h2><div className="hgt-error-grid">{(enrichment?.mistakes||[]).map(item=><article key={item}><span>⚠️</span><p>{item}</p></article>)}</div></section>}
   <section className="hgt-panel hgt-question-cta"><h2>अब अपनी समझ जाँचें</h2><p>ऊपर की तैयारी के बाद 20 प्रश्न हल करें और हर उत्तर के पीछे का कारण भी देखें।</p><button type="button" onClick={()=>setSection('questions')}>20 प्रश्न शुरू करें →</button></section>
 </>:<section className="hgt-panel"><div className="hgt-section-label">EXAM PRACTICE</div><h2>20 प्रश्न — {meta.title}</h2><p className="hgt-muted">ये प्रश्न मौजूदा व्याकरण अभ्यास बैंक के अंतिम 20 प्रश्नों से लिए गए हैं और इस dedicated page पर अलग से अभ्यास के लिए दिखाए जा रहे हैं।</p><div className="hgt-question-list">{testQuestions.map((item,i)=><QuestionCard key={`${i}-${item.q}`} item={item} index={i}/>)}</div></section>}
 </div>
 <footer className="hgt-footer"><span>विषय पेज</span><div>{topicOrder.map(id=>{const m=HINDI_GRAMMAR_TOPIC_META[id];return <span key={id} className={id===topic.id?'current':''}>{m.title}</span>})}</div></footer>
 </main>
}
