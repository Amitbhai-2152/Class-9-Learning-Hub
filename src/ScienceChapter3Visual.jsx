import React from 'react';
import './science-chapter-visual.css';

const scenes={
  परमाणु:{title:'परमाणु की रचना',content:<div className="sc3-atom" aria-hidden="true"><span className="sc3-ring ring-1"/><span className="sc3-ring ring-2"/><span className="sc3-nucleus">नाभिक</span><i className="sc3-electron e1">e⁻</i><i className="sc3-electron e2">e⁻</i></div>},
  अणु:{title:'परमाणु मिलकर अणु',content:<div className="sc3-molecule"><span>H</span><b>—</b><span>H</span><b>—</b><span>O</span></div>},
  सूत्र:{title:'रासायनिक सूत्र पढ़ें',content:<div className="sc3-formula-box"><strong>H₂O</strong><small>2 H + 1 O</small></div>},
  द्रव्यमान:{title:'द्रव्यमान का योग',content:<div className="sc3-balance"><span>4 g</span><b>+</b><span>6 g</span><b>=</b><strong>10 g</strong></div>},
  संकेत:{title:'तत्वों के संकेत',content:<div className="sc3-symbols"><span>Na</span><span>O</span><span>Fe</span></div>},
  संयोजन:{title:'संयोजकता से संयोजन',content:<div className="sc3-combination"><span>Mg²⁺</span><b>→</b><span>O²⁻</span><strong>MgO</strong></div>},
  संरक्षण:{title:'द्रव्यमान संरक्षण',content:<div className="sc3-conservation"><span>अभिकारक<br/><b>10 g</b></span><b>→</b><span>उत्पाद<br/><b>10 g</b></span></div>},
  गिनती:{title:'परमाणुओं की संख्या',content:<div className="sc3-count">{[1,2,3,4,5].map(n=><i key={n}>{n}</i>)}</div>}
};

export function ScienceChapter3Visual({kind='परमाणु'}){
  const scene=scenes[kind]||scenes.परमाणु;
  return <div className="science-chapter3-visual" role="img" aria-label={`परमाणु एवं अणु: ${scene.title}`}>
    <div className="sc3-head"><span>अध्याय दृश्य</span><strong>{scene.title}</strong></div>
    <div className="sc3-stage">{scene.content}</div>
    <p>देखें → समझें → फिर उदाहरण आज़माएँ</p>
  </div>;
}

export default ScienceChapter3Visual;
