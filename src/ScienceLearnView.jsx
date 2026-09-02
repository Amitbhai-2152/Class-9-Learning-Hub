import React,{useEffect,useState} from 'react';
import './science3-learn.css';

const typeLabel={intro:'परिचय',concept:'अवधारणा',example:'उदाहरण',check:'त्वरित जाँच',compare:'तुलना'};

function DefaultVisual({visual,title}){
  if(!visual)return null;
  const items=Array.isArray(visual.items)?visual.items:[];
  if(!items.length)return null;
  return <div className="sc3-safe-visual" aria-label={`दृश्य: ${title}`}>
    <div className="sc3-visual-grid">
      <span className="sc3-visual-kicker">अध्याय दृश्य</span>
      <strong>{visual.title||title}</strong>
      <div className="sc3-visual-items">{items.map((item,index)=><div className="sc3-visual-item" key={`${item}-${index}`}><b>{index+1}</b><span>{item}</span></div>)}</div>
    </div>
  </div>;
}

export function ScienceLearnView({chapter,chapterNumber,title,lessons,onBack,addXp,finishSession,renderVisual,completeIcon='🧪'}){
  const safeLessons=Array.isArray(lessons)?lessons:[];
  const [index,setIndex]=useState(0);
  const [answers,setAnswers]=useState({});
  const [completed,setCompleted]=useState(false);
  const item=safeLessons[index];
  const selected=answers[index];
  const percent=safeLessons.length?Math.round(((index+1)/safeLessons.length)*100):0;
  const choose=value=>{if(selected===undefined)setAnswers(prev=>({...prev,[index]:value}));};
  const goTo=nextIndex=>{
    if(!safeLessons.length)return;
    const bounded=Math.max(0,Math.min(safeLessons.length-1,nextIndex));
    setIndex(bounded);
    window.scrollTo({top:0,left:0,behavior:'auto'});
  };
  const next=()=>{
    if(!item)return;
    if(item.question&&selected===undefined)return;
    if(index<safeLessons.length-1){goTo(index+1);return;}
    if(completed)return;
    setCompleted(true);
    const correct=safeLessons.reduce((n,x,i)=>n+(x.question&&Number(answers[i])===Number(x.answer)?1:0),0);
    addXp?.(20);
    finishSession?.({subject:'विज्ञान',chapter,mode:'learn',attempted:safeLessons.filter(x=>x.question).length,correct,completed:true,at:Date.now()});
    window.scrollTo({top:0,left:0,behavior:'auto'});
  };
  useEffect(()=>{window.scrollTo({top:0,left:0,behavior:'auto'});},[]);

  if(!safeLessons.length)return <main className="page sc3-learn-page"><nav className="sc3-learn-nav"><button className="pressable" onClick={onBack}>← अध्याय</button><div className="sc3-nav-title"><strong>{chapter}</strong><span>📖 सीखें</span></div></nav><section className="sc3-learn-layout"><article className="sc3-lesson"><div className="sc3-lesson-meta"><span className="sc3-lesson-type">सामग्री</span></div><h2>इस अध्याय की सामग्री उपलब्ध नहीं है</h2><p className="sc3-lesson-body">अध्याय डेटा में कोई सीखने का चरण नहीं मिला।</p><div className="sc3-lesson-actions"><button className="primary-btn pressable" onClick={onBack}>अध्याय पर लौटें →</button></div></article></section></main>;
  if(completed)return <main className="page sc3-learn-page"><nav className="sc3-learn-nav"><button className="pressable" onClick={onBack}>← अध्याय</button><div className="sc3-nav-title"><strong>{chapter}</strong><span>सीखना पूरा</span></div></nav><section className="sc3-learn-hero"><span className="eyebrow">विज्ञान • अध्याय {chapterNumber}</span><h1>अध्याय पूरा हुआ 🎉</h1><p>आपने सभी {safeLessons.length} सीखने के चरण पूरे किए।</p></section><section className="sc3-learn-layout"><div className="sc3-learn-main-only"><div className="sc3-learn-complete"><div className="icon">{completeIcon}</div><h2>बहुत बढ़िया!</h2><p>अब अभ्यास में अपनी समझ को और मजबूत करें।</p><button className="primary-btn pressable" onClick={onBack}>अध्याय पर लौटें →</button></div></div></section></main>;

  return <main className="page sc3-learn-page">
    <nav className="sc3-learn-nav">
      <button className="pressable" onClick={onBack}>← अध्याय</button>
      <div className="sc3-nav-title"><strong>{chapter}</strong><span>📖 सीखें</span></div>
      <div className="sc3-nav-progress"><div><span>चरण {index+1}/{safeLessons.length}</span><span>{percent}%</span></div><i style={{width:`${percent}%`,display:'block',height:'100%',borderRadius:'inherit',background:'linear-gradient(90deg,#4f9e96,#82c5bd)'}}/></div>
    </nav>
    <section className="sc3-learn-hero"><span className="eyebrow">विज्ञान • अध्याय {chapterNumber}</span><h1>{title||chapter}</h1><p>अध्याय सूची से विषय चुनें, अवधारणा समझें, दृश्य देखें और त्वरित जाँच करें।</p></section>
    <section className="sc3-learn-layout">
      <aside className="sc3-contents" aria-label="अध्याय सूची">
        <div className="sc3-contents-head"><strong>अध्याय सूची</strong><span>{safeLessons.length} सीखने के चरण</span></div>
        <div className="sc3-contents-list">
          {safeLessons.map((lesson,i)=><button type="button" className={`pressable ${i===index?'is-active':''}`} key={`${lesson.title}-${i}`} onClick={()=>goTo(i)} aria-current={i===index?'page':undefined}><span className="sc3-num">{i+1}</span><span className="sc3-copy"><strong>{lesson.title}</strong><small>{typeLabel[lesson.type]||'पाठ'}</small></span></button>)}
        </div>
      </aside>
      <article className="sc3-lesson">
        <div className="sc3-lesson-meta"><span className="sc3-lesson-type">{typeLabel[item.type]||'पाठ'}</span><span>चरण {index+1} / {safeLessons.length}</span></div>
        <h2>{item.title}</h2>
        <p className="sc3-lesson-body">{item.body}</p>
        {renderVisual?renderVisual(item):<DefaultVisual visual={item.visual} title={item.title}/>} 
        {item.points&&<ul className="sc3-points">{item.points.map(point=><li key={point}>{point}</li>)}</ul>}
        {item.question&&<div className="sc3-check"><strong>🎯 त्वरित जाँच</strong><p>{item.question}</p>{Array.isArray(item.options)&&item.options.map((option,i)=><button type="button" disabled={selected!==undefined} className={`pressable ${selected!==undefined&&i===item.answer?'correct':''} ${selected===i&&i!==item.answer?'wrong':''}`} key={option} onClick={()=>choose(i)}><span>{String.fromCharCode(65+i)}</span>{option}</button>)}{selected!==undefined&&<div className={`sc3-feedback ${selected===item.answer?'good':'bad'}`}><strong>{selected===item.answer?'✓ बिल्कुल सही':'✗ उत्तर समझें'}</strong><p>{item.explain||'उत्तर की व्याख्या उपलब्ध नहीं है।'}</p></div>}</div>}
        <div className="sc3-lesson-actions"><button className="secondary-btn pressable" onClick={onBack}>बाद में</button><div className="sc3-next-group"><button className="secondary-btn pressable" disabled={index===0} onClick={()=>goTo(index-1)}>← पिछला</button><button className="primary-btn pressable" disabled={Boolean(item.question&&selected===undefined)} onClick={next}>{index===safeLessons.length-1?'अध्याय पूरा करें':'अगला →'}</button></div></div>
      </article>
    </section>
  </main>;
}

export default ScienceLearnView;