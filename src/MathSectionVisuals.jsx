import React from 'react';
import './math-learning.css';

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

function MathAnimatedScene(){
  return <div className="math-animated-scene" aria-hidden="true">
    <style>{`\n      .math-animated-scene{color:#9ad9ff;position:relative;margin:8px auto 2px;max-width:360px}\n      .math-animated-scene svg{display:block;width:100%;height:auto;overflow:visible;filter:drop-shadow(0 10px 28px rgba(69,109,255,.12))}\n      .scene-orbit{transform-origin:274px 90px;animation:sceneOrbit 9s linear infinite}\n      .scene-axis{animation:sceneAxisPulse 4s ease-in-out infinite}\n      .scene-curve{animation:sceneCurveGlow 3.6s ease-in-out infinite}\n      .scene-triangle{transform-origin:274px 136px;animation:sceneTriangleFloat 4.6s ease-in-out infinite}\n      .scene-moving-dot{animation:sceneDotTravel 4.2s ease-in-out infinite}\n      .scene-caption{display:flex;justify-content:center;align-items:center;gap:8px;margin-top:-3px;font-size:.72rem;color:rgba(255,255,255,.72)}\n      .scene-caption span{padding:4px 8px;border-radius:999px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);font-weight:800}\n      .scene-caption strong{font-weight:700;opacity:.88}\n      @keyframes sceneOrbit{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}\n      @keyframes sceneAxisPulse{0%,100%{opacity:.72}50%{opacity:1}}\n      @keyframes sceneCurveGlow{0%,100%{opacity:.76}50%{opacity:1;filter:drop-shadow(0 0 8px rgba(154,217,255,.35))}}\n      @keyframes sceneTriangleFloat{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-5px) scale(1.02)}}\n      @keyframes sceneDotTravel{0%{transform:translate(0,0)}35%{transform:translate(25px,-22px)}68%{transform:translate(49px,-47px)}100%{transform:translate(0,0)}}\n      @media (prefers-reduced-motion:reduce){.math-animated-scene *{animation:none!important}}\n    `}</style>
    <svg viewBox="0 0 360 210" role="presentation">
      <defs>
        <linearGradient id="mathGlow" x1="0" x2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity=".1"/>
          <stop offset="1" stopColor="currentColor" stopOpacity=".42"/>
        </linearGradient>
      </defs>
      <g className="scene-orbit">
        <circle cx="274" cy="90" r="54" fill="none" stroke="currentColor" strokeOpacity=".18"/>
        <circle cx="274" cy="90" r="7" fill="currentColor" opacity=".9"/>
        <circle cx="274" cy="36" r="6" fill="currentColor" opacity=".75"/>
      </g>
      <g className="scene-axis">
        <line x1="42" y1="168" x2="164" y2="168" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <line x1="78" y1="190" x2="78" y2="48" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <polyline points="164,168 153,162 153,174" fill="none" stroke="currentColor" strokeWidth="3"/>
        <polyline points="78,48 72,59 84,59" fill="none" stroke="currentColor" strokeWidth="3"/>
      </g>
      <g className="scene-curve">
        <path d="M78 155 C105 125 118 103 148 80" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
        <circle className="scene-moving-dot" cx="78" cy="155" r="6" fill="currentColor"/>
      </g>
      <g className="scene-triangle">
        <polygon points="228,169 318,169 284,102" fill="url(#mathGlow)" stroke="currentColor" strokeWidth="3"/>
        <line x1="284" y1="102" x2="284" y2="169" stroke="currentColor" strokeDasharray="6 6" strokeWidth="2" opacity=".7"/>
      </g>
      <text x="106" y="194" fill="currentColor" opacity=".65" fontSize="14">x</text>
      <text x="58" y="63" fill="currentColor" opacity=".65" fontSize="14">y</text>
      <text x="220" y="42" fill="currentColor" opacity=".55" fontSize="16">π</text>
      <text x="305" y="124" fill="currentColor" opacity=".55" fontSize="15">r</text>
    </svg>
    <div className="scene-caption"><span>देखो</span><strong>सूत्र • आकृति • आलेख</strong></div>
  </div>;
}

export function MathSectionHero({chapters=[]}){
  return <section className="math-section-hero">
    <div className="math-hero-grid" aria-hidden="true"/>
    <FloatingGeometry/>
    <div className="math-hero-copy">
      <div className="math-kicker">कक्षा 9 • MATHEMATICS SPACE</div>
      <h2>गणित को केवल पढ़ो नहीं — <span>देखो, समझो और आज़माओ।</span></h2>
      <p>हर अध्याय में सरल समझ, दृश्य उदाहरण, अभ्यास, चुनौती और टेस्ट — ताकि कठिन विचार भी कदम-कदम पर साफ़ हो जाएँ।</p>
      <div className="math-hero-pills">
        <span>📖 सीखें</span><span>🧩 समझें</span><span>🔥 चुनौती</span><span>🎯 टेस्ट</span><span>⚡ XP</span>
      </div>
    </div>
    <div className="math-hero-board" aria-hidden="true">
      <div className="board-top"><span>आज का लक्ष्य</span><strong>गणित में एक कदम आगे</strong></div>
      <MathAnimatedScene/>
      <div className="board-equation">(a+b)² = a² + 2ab + b²</div>
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
