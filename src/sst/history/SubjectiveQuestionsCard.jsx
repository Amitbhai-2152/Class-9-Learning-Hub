import React,{useState} from 'react';
import {HISTORY_SUBJECTIVE} from './historySubjectiveData';
import './subjectiveQuestions.css';

const LEVELS=[
  {id:'easy',label:'Easy',hindi:'आसान',icon:'🌱',desc:'मूल अवधारणा और सीधे उत्तर वाले प्रश्न'},
  {id:'hard',label:'Hard',hindi:'कठिन',icon:'🧠',desc:'व्याख्या, तुलना और कारण–परिणाम आधारित प्रश्न'},
  {id:'challenger',label:'Challenger',hindi:'चैलेंजर',icon:'🏆',desc:'आलोचनात्मक सोच और तर्क आधारित प्रश्न'}
];

export function SubjectiveQuestionsCard({chapterNumber,data:providedData}){
  const data=providedData||HISTORY_SUBJECTIVE[chapterNumber];
  const [open,setOpen]=useState(true);
  if(!data)return null;
  const total=LEVELS.reduce((sum,l)=>sum+(data.questions[l.id]?.length||0),0);
  return <section className="sst-subjective-card" aria-labelledby="subjective-title">
    <div className="sst-subjective-head">
      <div>
        <span className="sst-subjective-kicker">✍ SUBJECTIVE PRACTICE</span>
        <h2 id="subjective-title">विषयपरक प्रश्न</h2>
        <p>{data.title} • {total} प्रश्न • उत्तर अपने शब्दों में लिखें</p>
      </div>
      <button type="button" className="sst-subjective-toggle" onClick={()=>setOpen(v=>!v)} aria-expanded={open}>{open?'− बंद करें':'＋ प्रश्न दिखाएँ'}</button>
    </div>
    {open&&<div className="sst-subjective-levels">
      {LEVELS.map(level=><div className={`sst-subjective-level level-${level.id}`} key={level.id}>
        <div className="sst-subjective-level-head"><div><span>{level.icon} {level.label}</span><strong>{level.hindi}</strong></div><small>{data.questions[level.id]?.length||0} प्रश्न</small></div>
        <p className="sst-subjective-desc">{level.desc}</p>
        <div className="sst-subjective-list">
          {(data.questions[level.id]||[]).map((item,index)=><article className="sst-subjective-item" key={`${level.id}-${index}`}>
            <div className="sst-subjective-number">{String(index+1).padStart(2,'0')}</div>
            <div className="sst-subjective-question"><p>{item.q}</p><span>{item.marks} अंक</span></div>
          </article>)}
        </div>
      </div>)}
    </div>}
  </section>;
}
