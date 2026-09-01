import React from 'react';
import './science-chapter2-visual.css';

export function ScienceChapter2Visual({type='mixture'}){
  const scenes={
    mixture:{title:'मिश्रण की पहचान',caption:'अलग घटक मिलकर भी अपनी कई विशेषताएँ बनाए रखते हैं.'},
    solution:{title:'विलयन बनना',caption:'विलेय के कण विलायक में समान रूप से फैलते हैं.'},
    suspension:{title:'निलंबन',caption:'बड़े कण कुछ समय बाद नीचे बैठ सकते हैं.'},
    colloid:{title:'कोलॉइड',caption:'सूक्ष्म कण माध्यम में फैले रहते हैं और प्रकाश को प्रकीर्णित कर सकते हैं.'},
    light:{title:'टिंडल प्रभाव',caption:'कोलॉइडल कण प्रकाश का पथ दिखाई देने में मदद कर सकते हैं.'},
    filtration:{title:'छनन',caption:'फिल्टर ठोस कणों को रोकता है और द्रव को आगे जाने देता है.'},
    evaporation:{title:'वाष्पीकरण से पृथक्करण',caption:'विलायक उड़ जाता है और घुला ठोस बच सकता है.'},
    distillation:{title:'आसवन',caption:'गरम करना और फिर संघनन करके द्रव को अलग किया जाता है.'},
    chromatography:{title:'क्रोमैटोग्राफी',caption:'घटक अलग-अलग गति से चलते हैं, इसलिए अलग स्थानों पर दिखाई देते हैं.'},
    separation:{title:'पृथक्करण की रणनीति',caption:'पहले गुण पहचानें, फिर उपयुक्त विधि चुनें.'},
    compare:{title:'तीन तंत्रों की तुलना',caption:'कणों के आकार और व्यवहार से अंतर समझें.'},
    decision:{title:'गुण से विधि चुनें',caption:'मिश्रण के गुण देखकर पृथक्करण की विधि तय करें.'}
  };
  const s=scenes[type]||scenes.mixture;
  return <div className={`science2-visual visual2-${type}`}>
    <div className="science2-head"><div><span>दृश्य प्रयोग</span><strong>{s.title}</strong></div><span>● एनिमेशन</span></div>
    <div className="science2-stage" aria-hidden="true">
      {(type==='mixture'||type==='solution'||type==='suspension'||type==='colloid')&&<div className="beaker"><div className="liquid"/><div className="particles">{Array.from({length:10},(_,i)=><i key={i} style={{'--i':i}}/>)}</div><div className="beaker-rim"/></div>}
      {type==='filtration'&&<><div className="filter-stand"/><div className="filter-paper"/><div className="filter-liquid"/></>}
      {type==='evaporation'&&<div className="evaporation-dish"><div className="salt-water"/><div className="vapor">{[1,2,3].map(i=><i key={i}/>)}</div><div className="salt-crystals">✦ ✦ ✦</div></div>}
      {type==='distillation'&&<><div className="distill-flask"><div/></div><div className="distill-tube"/><div className="distill-receiver"><div/></div><div className="heat-wave"/></>}
      {type==='chromatography'&&<div className="paper-strip"><div className="ink-dot"/><div className="color-band one"/><div className="color-band two"/><div className="color-band three"/></div>}
      {type==='light'&&<><div className="light-beam"/><div className="light-particles">{[1,2,3,4,5].map(i=><i key={i}/>)}</div></>}
      {type==='separation'&&<div className="separation-flow"><span>मिश्रण</span><b>→</b><span>गुण पहचानें</span><b>→</b><span>विधि चुनें</span></div>}
      {type==='compare'&&<div className="compare-panels"><span>विलयन</span><span>कोलॉइड</span><span>निलंबन</span></div>}
      {type==='decision'&&<div className="decision-cards"><span>अघुलनशील ठोस → <b>छनन</b></span><span>घुला ठोस → <b>वाष्पीकरण</b></span><span>अलग क्वथनांक → <b>आसवन</b></span></div>}
    </div>
    <p>{s.caption}</p>
  </div>;
}
