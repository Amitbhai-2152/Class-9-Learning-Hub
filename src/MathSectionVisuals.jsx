import React from 'react';

const chapterArt={
  'संख्या पद्धति':'🔢','बहुपद':'𝑥²','निर्देशांक ज्यामिति':'⌖','दो चरों वाले रैखिक समीकरण':'📈','यूक्लिड की ज्यामिति का परिचय':'∠','रेखाएँ और कोण':'╱╲','त्रिभुज':'△','चतुर्भुज':'▱','समान्तर चतुर्भुजों और त्रिभुजों का क्षेत्रफल':'▰','वृत्त':'◯','रचनाएँ':'⚙','हीरोन का सूत्र':'△','पृष्ठीय क्षेत्रफल एवं आयतन':'◇','सांख्यिकी':'▥','प्रायिकता':'◌'
};

function FloatingGeometry(){
  return <div className="math-floating-geometry" aria-hidden="true">
    <span className="math-orbit orbit-a"/><span className="math-orbit orbit-b"/>
    <span className="math-shape shape-triangle">△</span>
    <span className="math-shape shape-circle">◯</span>
    <span className="math-shape shape-plus">＋</span>
    <span className="math-shape shape-root">√x</span>
    <span className="math-shape shape-pi">π</span>
    <span className="math-spark spark-1">✦</span><span className="math-spark spark-2">✧</span>
  </div>;
}

export function MathSectionHero({chapters=[]}){
  return <section className="math-section-hero">
    <div className="math-hero-grid" aria-hidden="true"/>
    <FloatingGeometry/>
    <div className="math-hero-copy">
      <div className="math-kicker">कक्षा 9 • MATHEMATICS SPACE</div>
      <h2>गणित को केवल पढ़ो नहीं — <span>देखो, समझो और आज़माओ।</span></h2>
      <p>हर अध्याय में सरल समझ, दृश्य उदाहरण, अभ्यास, चुनौती और टेस्ट — ताकि कठिन विचार भी कदम-दर-कदम साफ़ हो जाएँ।</p>
      <div className="math-hero-pills">
        <span>📖 सीखें</span><span>🧩 समझें</span><span>🔥 चुनौती</span><span>🎯 टेस्ट</span><span>⚡ XP</span>
      </div>
    </div>
    <div className="math-hero-board" aria-hidden="true">
      <div className="board-top"><span>आज का लक्ष्य</span><strong>गणित में एक कदम आगे</strong></div>
      <div className="board-equation">(a+b)² = a² + 2ab + b²</div>
      <div className="board-diagram"><div className="diagram-square"/><div className="diagram-line line-1"/><div className="diagram-line line-2"/><div className="diagram-dot dot-1"/><div className="diagram-dot dot-2"/></div>
      <div className="board-note">💡 सूत्र याद करने से पहले उसका अर्थ समझो।</div>
    </div>
    <div className="math-hero-progress"><span>15 अध्याय</span><i><b style={{width:`${Math.min(100,Math.max(12,(chapters.length/15)*100))}%`}}/></i><span>अध्याय यात्रा</span></div>
  </section>;
}

export function MathChapterDecor({chapter,index=0}){
  const art=chapterArt[chapter]||'∑';
  return <div className="math-chapter-decor" aria-hidden="true">
    <div className="math-chapter-glow"/>
    <span className="math-chapter-number">{String(index+1).padStart(2,'0')}</span>
    <span className="math-chapter-art">{art}</span>
    <span className="math-chapter-dot dot-a"/><span className="math-chapter-dot dot-b"/>
  </div>;
}
