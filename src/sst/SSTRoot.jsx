import React,{useEffect,useState} from 'react';
import {SSTSection} from './SSTSection';
import {findSSTChapter} from './sstChapterRegistry';
import {HistoryChapterEngine} from './history/HistoryChapterEngine';
import './sst-section.css';

const go=(url)=>{window.history.pushState({},'',url);window.dispatchEvent(new PopStateEvent('popstate'))};

export default function SSTRoot(){
  const read=()=>{const p=new URLSearchParams(window.location.search);return {chapter:p.get('sstChapter'),track:p.get('track')}};
  const [route,setRoute]=useState(read);
  useEffect(()=>{const sync=()=>setRoute(read());window.addEventListener('popstate',sync);return()=>window.removeEventListener('popstate',sync)},[]);
  const openChapter=(track,index)=>go(`?page=subject&subject=sst&track=${encodeURIComponent(track.id)}&sstChapter=${index+1}`);
  const backToClasses=()=>go('?page=classes');
  const backToSST=()=>go('?page=subject&subject=sst');
  if(route.track==='history'&&(Number(route.chapter)===1||Number(route.chapter)===2)){return <HistoryChapterEngine chapterNumber={Number(route.chapter)} onBack={backToSST}/>}
  if(route.track&&route.chapter){const chapter=findSSTChapter(route.track,Number(route.chapter));if(chapter)return <main className="page"><header className="page-header sst-page-header"><button type="button" onClick={backToSST}>← सामाजिक विज्ञान</button><span>{chapter.trackName} • अध्याय {chapter.chapterNumber}</span><h1>{chapter.title}</h1><p>इस अध्याय का dedicated learning module अगले content phase में उपलब्ध होगा।</p></header><section className="page-content"><div className="sst-coming-shell"><strong>Module queued</strong><p>Foundation, routing और chapter registry तैयार हैं। यह chapter Learn → Practice → Challenge → Final Test engine से जोड़ा जाएगा।</p></div></section></main>}
  return <main className="page"><header className="page-header sst-page-header"><button type="button" onClick={backToClasses}>← सभी विषय</button><span>कक्षा 9 • बिहार बोर्ड</span><h1>सामाजिक विज्ञान</h1><p>इतिहास, भूगोल, नागरिक शास्त्र और अर्थशास्त्र — एक structured learning space.</p></header><section className="page-content"><SSTSection openChapter={openChapter}/></section></main>;
}
