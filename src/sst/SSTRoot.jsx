import React,{useEffect,useState} from 'react';
import {SSTSection} from './SSTSection';
import {findSSTChapter} from './sstChapterRegistry';
import './sst-section.css';

const go=(url)=>{window.history.pushState({},'',url);window.dispatchEvent(new PopStateEvent('popstate'))};

function SSTChapter({chapter,onBack}){
  const [mode,setMode]=useState(null);
  const modes=[
    {id:'learn',icon:'📖',title:'Learn',desc:'Concepts, timeline, key terms और visual notes.',xp:'Concept mastery'},
    {id:'practice',icon:'📝',title:'Practice',desc:'Chapter-based questions से समझ पक्की करें।',xp:'Accuracy build'},
    {id:'challenge',icon:'🔥',title:'Challenge',desc:'Higher-order और application questions हल करें।',xp:'Deep thinking'},
    {id:'test',icon:'🎯',title:'Final Test',desc:'Exam-style mixed assessment के लिए तैयार हों।',xp:'Mastery check'}
  ];
  return <main className="page">
    <header className="sst-chapter-header">
      <button type="button" onClick={onBack}>← सामाजिक विज्ञान</button>
      <span>{chapter.trackName} • अध्याय {chapter.chapterNumber}</span>
      <h1>{chapter.title}</h1>
      <p>Chapter learning को चार stages में पूरा करें: Learn → Practice → Challenge → Test.</p>
    </header>
    <section className="page-content">
      <div className="sst-chapter-map"><span>◉</span><div><strong>अध्याय learning map</strong><small>Concept → Recall → Application → Exam readiness</small></div></div>
      {!mode?<div className="sst-mode-grid">{modes.map(item=><button type="button" key={item.id} className="sst-mode-card pressable" onClick={()=>setMode(item.id)}><span>{item.icon}</span><strong>{item.title}</strong><small>{item.desc}</small><em>{item.xp}</em><b>→</b></button>)}</div>:<div className="sst-mode-workspace"><button className="sst-back-link" type="button" onClick={()=>setMode(null)}>← modes पर वापस</button><span className="sst-work-icon">{modes.find(item=>item.id===mode)?.icon}</span><h2>{modes.find(item=>item.id===mode)?.title}</h2><p>यह chapter engine slot अब dedicated {chapter.trackName} content, questions और assessment bank से जुड़ेगा। Foundation तैयार है और mode routing सुरक्षित है।</p><div className="sst-coming-grid"><span>✓ Chapter data</span><span>✓ Mode routing</span><span>✓ Responsive UI</span><span>→ Content engine next</span></div></div>}
    </section>
  </main>;
}

export default function SSTRoot(){
  const read=()=>{const p=new URLSearchParams(window.location.search);return {page:p.get('page')||'home',chapter:p.get('chapter'),track:p.get('track')}};
  const [route,setRoute]=useState(read);
  useEffect(()=>{const sync=()=>setRoute(read());window.addEventListener('popstate',sync);return()=>window.removeEventListener('popstate',sync)},[]);
  const openChapter=(track,index)=>go(`?page=sst-chapter&track=${encodeURIComponent(track.id)}&chapter=${index+1}`);
  const backToClasses=()=>go('?page=classes');
  if(route.page==='sst-chapter'&&route.track&&route.chapter){const chapter=findSSTChapter(route.track,Number(route.chapter));if(chapter)return <SSTChapter chapter={chapter} onBack={backToClasses}/>}
  return <main className="page"><header className="page-header sst-page-header"><button type="button" onClick={()=>go('?page=classes')}>← सभी विषय</button><span>कक्षा 9 • बिहार बोर्ड</span><h1>सामाजिक विज्ञान</h1><p>इतिहास, भूगोल, नागरिक शास्त्र और अर्थशास्त्र — एक structured learning space.</p></header><section className="page-content"><SSTSection openChapter={openChapter}/></section></main>;
}
