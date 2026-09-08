import './english-reader.css';
import React,{useState} from 'react';

const readerChapters=[
'I’m going to dance again','Scaling Great Heights','Saint Kabir','The eyes are not here',
'Ismat Chughtai: A woman with a difference','The accidental tourist','Saint Ravidas','Bharathipura'
];
const panoramaProse=['Dharam Juddha','Yayati','A Silent Revolution','Too Many People, Too Few Trees','Echo and Narcissus','The Shehnai of Bismillah Khan','Kathmandu','My Childhood','The Gift of the Magi'];
const panoramaPoetry=['The Grandmother','On His Blindness','Blow, Blow, Thou Winter Wind','To Daffodils','Sound','Self Introduction','I Am Like Grass','Abraham Lincoln’s Letter to His Son’s Teacher'];
const panoramaRte=['The Secret of Work','Gandhiji’s Passion for Nursing','With the Photographer'];

function openPanoramaChapter(chapter,open){
 const proseMatch=chapter.match(/^Panorama • Prose (\d+) /);
 const poetryMatch=chapter.match(/^Panorama • Poetry (\d+) /);
 const prose=proseMatch?Number(proseMatch[1]):null;
 const poetry=poetryMatch?Number(poetryMatch[1]):null;
 if([5,6,7,8,9].includes(prose)){
  const params=new URLSearchParams();
  params.set('page','chapter');params.set('subject','english');params.set('chapter',String(7+prose));params.set('mode','learn');params.set(`panorama${prose}`,'1');
  window.history.pushState({},'',`${window.location.pathname}?${params.toString()}${window.location.hash||''}`);
  window.dispatchEvent(new Event('popstate'));
  return;
 }
 if(poetry===1||poetry===2||poetry===3){
  const params=new URLSearchParams();
  params.set('page','chapter');params.set('subject','english');params.set('chapter',String(16+poetry));params.set('mode','learn');params.set(`panoramaPoetry${poetry}`,'1');
  window.history.pushState({},'',`${window.location.pathname}?${params.toString()}${window.location.hash||''}`);
  window.dispatchEvent(new Event('popstate'));
  return;
 }
 open(chapter);
}

function openRoute(params){
 window.history.pushState({},'',`${window.location.pathname}?${params.toString()}${window.location.hash||''}`);
 window.dispatchEvent(new Event('popstate'));
}

function openProseRevision(){
 const params=new URLSearchParams();
 params.set('page','prose-revision');params.set('subject','english');params.set('proseRevision','1');
 openRoute(params);
}

function openLanguageSkills(){
 const params=new URLSearchParams();
 params.set('page','language-skills');params.set('subject','english');params.set('languageSkills','1');
 openRoute(params);
}

export function EnglishSubjectSection({open}){
 const [book,setBook]=useState(null);
 if(!book) return <div className="english-book-shell">
  <div className="english-book-hero"><span className="badge">CLASS 9 • ENGLISH</span><h2>अंग्रेज़ी की किताब और skills चुनें</h2><p>Panorama और English Reader के साथ Grammar, Writing, Reading और Translation की तैयारी एक ही जगह से शुरू करें।</p></div>
  <div className="english-book-grid english-book-grid-three">
   <button className="english-book-card" onClick={()=>setBook('panorama')}><span>📘</span><strong>The Panorama</strong><small>Prose • Poetry • Read, Think &amp; Enjoy</small><b>Open Panorama →</b></button>
   <button className="english-book-card" onClick={()=>setBook('reader')}><span>📗</span><strong>English Reader</strong><small>Panorama English Reader • 8 chapters</small><b>Open English Reader →</b></button>
   <button className="english-book-card english-skills-card" onClick={openLanguageSkills}><span>✦</span><strong>English Language &amp; Skills Hub</strong><small>Grammar • Writing • Reading • Translation</small><b>Open Skills Hub →</b></button>
  </div>
 </div>;
 return <div className="english-book-shell">
  <button className="english-book-back" onClick={()=>setBook(null)}>← Back to English</button>
  <div className="english-book-hero"><span className="badge">CLASS 9 • {book==='reader'?'ENGLISH READER':'THE PANORAMA'}</span><h2>{book==='reader'?'English Reader':'The Panorama'}</h2><p>{book==='reader'?'8 chapter reader stream':'Prose, Poetry and Read, Think &amp; Enjoy sections'}</p></div>
  <div className="english-book-tabs">{book==='panorama'&&<><button className="english-book-tab" onClick={()=>document.getElementById('panorama-prose')?.scrollIntoView({behavior:'smooth'})}>Prose</button><button className="english-book-tab" onClick={()=>document.getElementById('panorama-poetry')?.scrollIntoView({behavior:'smooth'})}>Poetry</button><button className="english-book-tab" onClick={()=>document.getElementById('panorama-rte')?.scrollIntoView({behavior:'smooth'})}>Read, Think &amp; Enjoy</button></>}</div>
  <div className="english-book-list">
   {book==='reader'&&<Section id="reader" title="English Reader" items={readerChapters} offset={0} open={open} prefix="Reader •"/>}
   {book==='panorama'&&<><section className="english-book-section prose-revision-feature"><div className="english-section-head"><h3>Whole Prose Revision</h3><span>45 fresh questions</span></div><button className="english-book-chapter" onClick={openProseRevision}><span>★</span><div><strong>Whole Prose Revision Test</strong><small>All 9 Panorama prose chapters • timed cumulative test</small></div><b>Start →</b></button></section><Section id="panorama-prose" title="Prose" items={panoramaProse} offset={0} open={chapter=>openPanoramaChapter(chapter,open)} prefix="Panorama • Prose"/><Section id="panorama-poetry" title="Poetry" items={panoramaPoetry} offset={9} open={chapter=>openPanoramaChapter(chapter,open)} prefix="Panorama • Poetry"/><Section id="panorama-rte" title="Read, Think &amp; Enjoy" items={panoramaRte} offset={0} open={open} prefix="Panorama • Read, Think &amp; Enjoy"/></>}
  </div>
 </div>;
}
function Section({id,title,items,offset,open,prefix}){return <section id={id} className="english-book-section"><div className="english-section-head"><h3>{title}</h3><span>{items.length} chapters</span></div><div className="english-book-chapters">{items.map((name,i)=>{const n=offset+i+1;const chapter=`${prefix} ${n} ${name}`;return <button className="english-book-chapter" key={chapter} onClick={()=>open(chapter)}><span>{String(n).padStart(2,'0')}</span><div><strong>{name}</strong><small>{prefix}</small></div><b>Learn →</b></button>})}</div></section>}
