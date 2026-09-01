import React,{useEffect,useState} from 'react';
import {markStageComplete} from './engines/progress/progressStore';

const typeLabel={intro:'शुरुआत',concept:'अवधारणा',example:'उदाहरण',check:'त्वरित जाँच'};

export function LearningEngine({subject,chapter,data,onBack,addXp,finishSession}){
  const lessons=data?.lessons||[];
  const chapterId=`${subject?.name||'विषय'}::${chapter||'अध्याय'}`;
  const [index,setIndex]=useState(0);
  const [answers,setAnswers]=useState({});
  const [completed,setCompleted]=useState(false);
  const [saved,setSaved]=useState(false);

  useEffect(()=>{
    try{
      const raw=localStorage.getItem(`class9-learning:${chapterId}`);
      if(raw){const state=JSON.parse(raw);if(Number.isInteger(state.index))setIndex(Math.min(Math.max(state.index,0),Math.max(lessons.length-1,0)));if(state.answers)setAnswers(state.answers);}
    }catch{}
  },[chapterId,lessons.length]);

  useEffect(()=>{
    try{localStorage.setItem(`class9-learning:${chapterId}`,JSON.stringify({index,answers}))}catch{}
  },[chapterId,index,answers]);

  const item=lessons[index];
  const percent=lessons.length?Math.round(((index+1)/lessons.length)*100):0;
  const checkAnswer=value=>setAnswers(a=>({...a,[index]:value}));
  const goNext=()=>{
    if(index<lessons.length-1){setIndex(i=>i+1);return;}
    if(!completed){
      setCompleted(true);
      markStageComplete(chapterId,'learn');
      addXp?.(20);
      finishSession?.({
        subject:subject?.name,
        chapter,
        mode:'learn',
        completed:true,
        attempted:lessons.length,
        correct:Object.entries(answers).reduce((n,[i,v])=>n+(String(v)===String(lessons[i]?.answer)?1:0),0),
        at:Date.now()
      });
      return;
    }
    onBack();
  };

  const selected=answers[index];
  if(!item)return <main className="page"><header className="page-header"><button className="pressable" onClick={onBack}>← अध्याय</button><h1>📖 सीखें</h1></header><section className="page-content"><div className="empty-review"><span>📚</span><h2>अभी सामग्री उपलब्ध नहीं है</h2><p>इस अध्याय की पुस्तक-आधारित learning सामग्री जुड़ने पर यहाँ दिखाई देगी।</p></div></section></main>;

  if(completed)return <main className="page"><header className="page-header"><button className="pressable" onClick={onBack}>← अध्याय</button><div className="badge">सीखना पूरा</div><h1>🎉 अध्याय पूरा हुआ</h1><p>आपने इस learning session को पूरा कर लिया।</p></header><section className="page-content"><div className="result-card"><div className="result-score">100<small>%</small></div><h2>बहुत बढ़िया! 📖</h2><p>आपको <strong>+20 XP</strong> मिले। अब अभ्यास या चुनौती में अपनी समझ जाँच सकते हैं।</p><button className="primary-btn pressable" onClick={onBack}>अध्याय पर जाएँ →</button></div></section></main>;

  return <main className="page lesson-page"><header className="page-header"><button className="pressable" onClick={onBack}>← अध्याय</button><div className="lesson-top"><span className="badge">{subject?.name} • {chapter}</span><span>{index+1} / {lessons.length}</span></div><h1>📖 सीखें</h1><div className="lesson-progress"><span style={{width:`${percent}%`}}/></div></header><section className="page-content"><div className="lesson-layout"><aside className="lesson-outline"><strong>इस अध्याय में</strong>{lessons.map((l,i)=><button className={`outline-item pressable ${i===index?'active':''}`} key={`${l.title}-${i}`} onClick={()=>setIndex(i)}><span>{i+1}</span><small>{l.title}</small></button>)}</aside><article className="lesson-card"><span className="lesson-type">{typeLabel[item.type]||'पाठ'}</span><h2>{item.title}</h2><p className="lesson-body">{item.body}</p>{item.points&&<ul className="lesson-points">{item.points.map((p,i)=><li key={`${p}-${i}`}>{p}</li>)}</ul>}{item.example&&<div className="lesson-example"><strong>💡 उदाहरण</strong><p>{item.example}</p></div>}{item.question&&<div className="quick-check"><strong>{item.question}</strong><div className="check-options-grid">{item.options.map((option,i)=><button className={`check-option pressable ${selected!==undefined?(String(selected)===String(i)?'selected':''):''} ${selected!==undefined&&item.answer!==undefined&&String(selected)===String(item.answer)&&String(i)===String(item.answer)?'correct':''}`} key={option} onClick={()=>checkAnswer(i)}>{String.fromCharCode(65+i)}. {option}</button>)}</div>{selected!==undefined&&<p className={`check-feedback ${String(selected)===String(item.answer)?'good':''}`}>{String(selected)===String(item.answer)?'✓ सही उत्तर — बहुत अच्छा!':'✓ उत्तर दर्ज हुआ।'}</p>}</div>}<div className="lesson-actions"><button className="secondary-btn pressable" onClick={onBack}>बाद में पढ़ूँगा</button><button className="primary-btn pressable" onClick={goNext}>{index===lessons.length-1?(item.question&&selected===undefined?'उत्तर चुनें':'अध्याय पूरा करें'):'आगे बढ़ें →'}</button></div></article></div></section></main>;
}
