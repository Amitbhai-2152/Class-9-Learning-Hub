import React from 'react';

const scenes={
  परमाणु: <g><circle className="sc3-core" cx="150" cy="105" r="32"/><circle className="sc3-orbit" cx="150" cy="105" r="72"/><circle className="sc3-orbit" cx="150" cy="105" r="105"/><circle className="sc3-electron sc3-e1" cx="222" cy="105" r="7"/><circle className="sc3-electron sc3-e2" cx="45" cy="105" r="7"/><text className="sc3-label" x="128" y="110">नाभिक</text></g>,
  अणु: <g><circle className="sc3-particle p1" cx="85" cy="110" r="28"/><circle className="sc3-particle p2" cx="150" cy="80" r="28"/><circle className="sc3-particle p3" cx="215" cy="110" r="28"/><line className="sc3-bond b1" x1="108" y1="97" x2="127" y2="89"/><line className="sc3-bond b2" x1="173" y1="89" x2="192" y2="97"/><text className="sc3-label" x="107" y="165">परमाणु मिलकर अणु बनाते हैं</text></g>,
  सूत्र: <g><rect className="sc3-formula-box" x="75" y="70" width="150" height="80" rx="18"/><text className="sc3-formula" x="150" y="120">H₂O</text><circle className="sc3-hot" cx="105" cy="150" r="5"/><circle className="sc3-hot" cx="195" cy="150" r="5"/></g>,
  द्रव्यमान: <g><line className="sc3-beam" x1="70" y1="75" x2="230" y2="75"/><line className="sc3-stand" x1="150" y1="75" x2="150" y2="150"/><line className="sc3-pan" x1="65" y1="95" x2="110" y2="95"/><line className="sc3-pan" x1="190" y1="95" x2="235" y2="95"/><circle className="sc3-weight w1" cx="87" cy="82" r="12"/><circle className="sc3-weight w2" cx="212" cy="82" r="12"/></g>,
  संकेत: <g><text className="sc3-symbol s1" x="75" y="115">Na</text><text className="sc3-symbol s2" x="150" y="115">O</text><text className="sc3-symbol s3" x="225" y="115">Fe</text></g>,
  संयोजन: <g><circle className="sc3-ion i1" cx="100" cy="105" r="30"/><circle className="sc3-ion i2" cx="200" cy="105" r="45"/><line className="sc3-link" x1="130" y1="105" x2="155" y2="105"/><text className="sc3-label" x="75" y="165">1 : 2 अनुपात</text></g>,
  संरक्षण: <g><rect className="sc3-box" x="55" y="60" width="190" height="105" rx="14"/><g className="sc3-atoms-before"><circle cx="95" cy="105" r="12"/><circle cx="130" cy="90" r="12"/><circle cx="130" cy="125" r="12"/></g><path className="sc3-arrow" d="M120 185 C140 165 160 165 180 185"/><g className="sc3-atoms-after"><circle cx="150" cy="100" r="12"/><circle cx="120" cy="115" r="12"/><circle cx="180" cy="115" r="12"/></g></g>,
  गिनती: <g>{[0,1,2,3,4].map(i=><circle key={i} className="sc3-count" cx={80+i*38} cy="105" r="14"/>)}<text className="sc3-label" x="112" y="150">परमाणुओं की संख्या गिनें</text></g>
};

export function ScienceChapter3Visual({kind='परमाणु'}){
  return <div className={`science-chapter3-visual visual-sc3-${kind}`}>
    <div className="sc3-head"><span>अध्याय दृश्य</span><strong>{kind}</strong></div>
    <svg viewBox="0 0 300 210" className="sc3-svg" role="img" aria-label={`परमाणु एवं अणु: ${kind}`}>
      {scenes[kind]||scenes.परमाणु}
    </svg>
    <p>देखें → समझें → फिर सूत्र और उदाहरण आज़माएँ</p>
  </div>;
}