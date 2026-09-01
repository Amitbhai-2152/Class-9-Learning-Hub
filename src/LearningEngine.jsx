import React,{useEffect,useState} from 'react';
import {markStageComplete} from './engines/progress/progressStore';
import {chapterEnhancements} from './chapterEnhancements';

const typeLabel={intro:'शुरुआत',concept:'अवधारणा',example:'उदाहरण',check:'त्वरित जाँच'};

function LessonVisual({visual}){
  if(!visual)return null;
  const kind=visual.type||'flow';
  return <div className={`lesson-visual visual-${kind}`} aria-label={visual.title}>
    <div className="visual-title"><span>✨</span><strong>{visual.title}</strong></div>
    <div className="visual-items">{(visual.items||[]).map((x,i)=><div className="visual-item" key={`${x}-${i}`}><span className="visual-step">{i+1}</span><span>{x}</span></div>)}</div>
  </div>;
}

export function LearningEngine({subject,chapter,data,onBack,addXp,finishSession}){
  const lessons=data?.lessons||[];
  const chapterId=`${subject?.name||'विषय'}::${chapter||'अध्याय'}`;
  const enhancement=chapterEnhancements[`${subject?.name}|${chapter}`]||{};
  const [index,setIndex]=useState(0),[answers,setAnswers]=useState({}),[completed,setCompleted]=useState(false),[startedAt]=useState(Date.now());

  useEffect(()=>{try{const raw=localStorage.getItem(`class9-learning:${chapterId}`);if(raw){const state=JSON.parse(raw);if(Number.isInteger(state.index))setIndex(Math.min(Math.max(state.index,0),Math.max(lessons.length-1,0)));if(state.answers)setAnswers(state.answers)}}catch{}},[chapterId,lessons.length]);
  useEffect(()=>{try{localStorage.setItem(`class9-learning:${chapterId}`,JSON.stringify({index,answers}))}catch{}},[chapterId,index,answers]);

  const item=lessons[index];
  const percent=lessons.length?Math.round(((index+1)/lessons.length)*100):0;
  const selected=answers[index];
  const checkAnswer=value=>{if(selected!==undefined)return;setAnswers(a=>({...a,[index]:value}))};
  const correctCount=Object.entries(answers).reduce((n,[i,v])=>n+(String(v)===String(lessons[i]?.answer)?1:0),0);
  const goNext=()=>{if(index<lessons.length-1){setIndex(i=>i+1);return}if(item.question&&selected===undefined)return;if(!completed){setCompleted(true);markStageComplete(chapterId,'learn');addXp?.(20);finishSession?.({subject:subject?.name,chapter,mode:'learn',completed:true,attempted:lessons.filter(x=>x.question).length,correct:correctCount,at:Date.now(),durationSeconds:Math.round((Date.now()-startedAt)/1000)});return}onBack()};

  if(!item)return <main className="page"><header className="page-header"><button className="pressable" onClick={onBack}>← अध्याय</button><h1>📖 सीखें</h1></header><section className="page-content"><div className="empty-review"><span>📚</span><h2>अभी सामग्री उपलब्ध नहीं है</h2><p>इस अध्याय की पुस्तक-आधारित learning सामग्री जुड़ने पर यहाँ दिखाई देगी।</p></div></section></main>;

  if(completed)return <main className="page"><header className="page-header"><button className="pressable" onClick={onBack}>← अध्याय</button><div className="badge">सीखना पूरा</div><h1>🎉 अध्याय पूरा हुआ</h1><p>आपने इस learning session को पूरा कर लिया।</p></header><section className="page-content"><div className="completion-grid"><div className="result-card"><div className="result-score">100<small>%</small></div><h2>बहुत बढ़िया! 📖</h2><p>आपको <strong>+20 XP</strong> मिले। त्वरित जाँच में <strong>{correctCount}</strong> उत्तर सही रहे।</p><button className="primary-btn pressable" onClick={onBack}>अध्याय पर जाएँ →</button></div>{(enhancement.summary?.length||enhancement.mistakes?.length||enhancement.takeaway)&&<div className="summary-card"><span className="lesson-type">अध्याय पुनरावलोकन</span><h2>याद रखने योग्य बातें</h2>{enhancement.summary?.length>0&&<><h3>मुख्य बिंदु</h3><ul>{enhancement.summary.map((x,i)=><li key={`${x}-${i}`}>{x}</li>)}</ul></>}{enhancement.mistakes?.length>0&&<><h3>इन गलतियों से बचें</h3><ul>{enhancement.mistakes.map((x,i)=><li key={`${x}-${i}`}>{x}</li>)}</ul></>}{enhancement.takeaway&&<div className="takeaway"><strong>🎯 आज का takeaway</strong><p>{enhancement.takeaway}</p></div>}</div>}</div></section></main>;

  return <main className="page lesson-page"><header className="page-header"><button className="pressable" onClick={onBack}>← अध्याय</button><div className="lesson-top"><span className="badge">{subject?.name} • {chapter}</span><span>{index+1} / {lessons.length}</span></div><h1>📖 सीखें</h1><div className="lesson-progress"><span style={{width:`${percent}%`}}/></div></header><section className="page-content"><div className="lesson-layout"><aside className="lesson-outline"><strong>इस अध्याय में</strong>{lessons.map((l,i)=><button className={`outline-item pressable ${i===index?'active':''}`} key={`${l.title}-${i}`} onClick={()=>setIndex(i)}><span>{i+1}</span><small>{l.title}</small></button>)}</aside><article className="lesson-card"><span className="lesson-type">{typeLabel[item.type]||'पाठ'}</span><h2>{item.title}</h2><p className="lesson-body">{item.body}</p><LessonVisual visual={item.visual}/>{item.points&&<ul className="lesson-points">{item.points.map((p,i)=><li key={`${p}-${i}`}>{p}</li>)}</ul>}{item.example&&<div className="lesson-example"><strong>💡 उदाहरण</strong><p>{item.example}</p></div>}{enhancement.examples?.[index]&&<div className="worked-example"><strong>🧩 चरणबद्ध उदाहरण</strong><h3>{enhancement.examples[index].title}</h3><ol>{enhancement.examples[index].steps.map((s,i)=><li key={`${s}-${i}`}>{s}</li>)}</ol></div>}{item.question&&<div className="quick-check"><strong>{item.question}</strong><div className="check-options-grid">{item.options.map((option,i)=>{const isSelected=selected!==undefined&&String(selected)===String(i);const isCorrect=selected!==undefined&&String(item.answer)===String(i);return <button disabled={selected!==undefined} className={`check-option pressable ${isSelected?'selected':''} ${isCorrect?'correct':''}`} key={option} onClick={()=>checkAnswer(i)}>{String.fromCharCode(65+i)}. {option}</button>})}</div>{selected!==undefined&&<div className={`check-feedback ${String(selected)===String(item.answer)?'good':'bad'}`}><strong>{String(selected)===String(item.answer)?'✓ सही उत्तर':'✗ सही उत्तर नहीं'}</strong><p>{item.explain||`सही उत्तर: ${item.options[item.answer]}`}</p></div>}</div>}<div className="lesson-actions"><button className="secondary-btn pressable" onClick={onBack}>बाद में पढ़ूँगा</button><button className="primary-btn pressable" onClick={goNext}>{index===lessons.length-1?(item.question&&selected===undefined?'उत्तर चुनें':'अध्याय पूरा करें'):'आगे बढ़ें →'}</button></div></article></div></section></main>;
}
