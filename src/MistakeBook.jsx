import React,{useMemo,useState} from 'react';

function loadMistakes(){try{return JSON.parse(localStorage.getItem('class9-mistakes'))||[]}catch{return[]}}

export function saveMistake(item){const old=loadMistakes();const key=`${item.subject}|${item.chapter}|${item.question}`;const next=[item,...old.filter(x=>`${x.subject}|${x.chapter}|${x.question}`!==key)].slice(0,100);localStorage.setItem('class9-mistakes',JSON.stringify(next))}

export default function MistakeBook({onBack,addXp}){
 const [items,setItems]=useState(loadMistakes);
 const [selected,setSelected]=useState(null);
 const grouped=useMemo(()=>items.reduce((a,x)=>{const k=x.subject||'अन्य';(a[k]??=[]).push(x);return a},{}),[items]);
 const clear=()=>{localStorage.removeItem('class9-mistakes');setItems([]);setSelected(null)};
 if(selected)return <main className="page"><header className="page-header"><button className="pressable" onClick={()=>setSelected(null)}>← गलत प्रश्न</button><div className="badge">गलती समीक्षा</div><h1>उत्तर समझें</h1></header><section className="page-content"><div className="review-card"><span className="lesson-type">गलत उत्तर • {selected.subject}</span><h2>{selected.question}</h2><div className="review-row wrong-row"><strong>आपका उत्तर</strong><span>{selected.selected}</span></div><div className="review-row correct-row"><strong>सही उत्तर</strong><span>{selected.correct}</span></div><div className="review-explain"><strong>क्यों?</strong><p>{selected.explain}</p></div><button className="primary-btn pressable" onClick={()=>{addXp(5);setSelected(null)}}>समझ लिया • +5 XP</button></div></section></main>;
 return <main className="page"><header className="page-header"><button className="pressable" onClick={onBack}>← वापस</button><div className="badge">कक्षा 9 • पुनरावलोकन</div><h1>📕 मेरी गलती कॉपी</h1><p>गलत हुए प्रश्न दोबारा पढ़ें और समझकर अपनी पकड़ मजबूत करें।</p></header><section className="page-content"><div className="review-toolbar"><div><strong>{items.length}</strong><span>सहेजे गए गलत प्रश्न</span></div>{items.length>0&&<button className="secondary-btn pressable" onClick={clear}>सब साफ करें</button>}</div>{items.length===0?<div className="empty-review"><span>🎉</span><h2>अभी कोई गलती सहेजी नहीं गई</h2><p>Practice या Test में गलत उत्तर देने पर प्रश्न यहाँ अपने-आप दिखाई देंगे।</p></div>:Object.entries(grouped).map(([subject,list])=><section className="review-group" key={subject}><h2>{subject}</h2>{list.map((x,i)=><button className="review-item pressable" key={x.id||i} onClick={()=>setSelected(x)}><span className="review-no">{i+1}</span><div><strong>{x.question}</strong><small>आपका उत्तर: {x.selected} • सही: {x.correct}</small></div><b>देखें →</b></button>)}</section>)}</section></main>;
}
