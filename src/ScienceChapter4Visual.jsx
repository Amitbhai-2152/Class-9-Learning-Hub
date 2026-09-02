import React from 'react';

const sceneData={
  atomStructure:{title:'परमाणु के मुख्य भाग',label:'नाभिक केंद्र में है; ऊर्जा स्तरों को योजनात्मक रूप से दिखाया गया है',kind:'atom',items:['प्रोटॉन (p⁺)','न्यूट्रॉन (n⁰)','इलेक्ट्रॉन (e⁻)']},
  electron:{title:'इलेक्ट्रॉन',label:'ऋणावेशित कण — नाभिक के बाहर के क्षेत्र में पाया जाता है',kind:'particle',symbol:'e⁻',items:['ऋण आवेश','बहुत कम द्रव्यमान','नाभिक के बाहर के क्षेत्र में']},
  proton:{title:'प्रोटॉन',label:'धनावेशित कण जो नाभिक में पाया जाता है',kind:'particle',symbol:'p⁺',items:['धन आवेश','नाभिक में','परमाणु क्रमांक से जुड़ा']},
  neutron:{title:'न्यूट्रॉन',label:'विद्युत रूप से उदासीन कण जो नाभिक में पाया जाता है',kind:'particle',symbol:'n⁰',items:['कोई विद्युत आवेश नहीं','नाभिक में','द्रव्यमान में योगदान']},
  thomson:{title:'थॉमसन का परमाणु मॉडल',label:'धनावेशित क्षेत्र में इलेक्ट्रॉनों की उपस्थिति',kind:'thomson',items:['धनावेशित पृष्ठभूमि','इलेक्ट्रॉन भीतर','कुल परमाणु उदासीन']},
  scattering:{title:'रदरफोर्ड का प्रकीर्णन प्रयोग',label:'सोने की पतली पन्नी पर अल्फा-कणों के अलग-अलग विचलन का योजनात्मक संकेत',kind:'scatter',items:['अधिकांश कण सीधे','कुछ कण मुड़े','बहुत कम कण पीछे लौटे']},
  problem:{title:'रदरफोर्ड मॉडल की सीमा',label:'स्थिरता की समस्या ने नए परमाणु मॉडल की आवश्यकता दिखाई',kind:'problem',items:['नाभिक का विचार','स्थिरता की समस्या','आगे के मॉडल की आवश्यकता']},
  bohr:{title:'बोर का परमाणु मॉडल',label:'निश्चित ऊर्जा स्तरों का योजनात्मक मॉडल',kind:'shells',items:['निम्न ऊर्जा स्तर','उच्च ऊर्जा स्तर','अनुमत ऊर्जा अवस्था']},
  jump:{title:'ऊर्जा का अवशोषण और उत्सर्जन',label:'ऊर्जा स्तर बदलते समय ऊर्जा का आदान-प्रदान होता है',kind:'jump',items:['ऊपर जाने के लिए ऊर्जा अवशोषित','ऊर्जा का उच्च स्तर','नीचे आने पर ऊर्जा उत्सर्जित हो सकती है']},
  shells:{title:'मुख्य कोश',label:'K, L, M, N मुख्य ऊर्जा स्तरों के नाम हैं',kind:'shells',items:['K कोश','L कोश','M कोश','N कोश']},
  configuration:{title:'इलेक्ट्रॉनिक विन्यास',label:'इलेक्ट्रॉनों का वितरण मुख्य कोशों में लिखा जाता है',kind:'config',items:['पहला कोश','दूसरा कोश','बाहरी कोश']},
  atomicNumber:{title:'परमाणु क्रमांक',label:'Z नाभिक में उपस्थित प्रोटॉनों की संख्या है',kind:'formula',items:['Z = p','उदासीन परमाणु में e⁻ = Z','Z तत्व की पहचान करता है']},
  massNumber:{title:'द्रव्यमान संख्या',label:'A नाभिक में प्रोटॉन और न्यूट्रॉन की कुल संख्या है',kind:'formula',items:['A = p + n','Z = p','n = A − Z']},
  calculation:{title:'न्यूट्रॉन निकालें',label:'उदाहरण: A = 23 और Z = 11',kind:'formula',items:['A = 23','Z = 11','n = 23 − 11 = 12']},
  isotopes:{title:'समस्थानिक',label:'एक ही तत्व के लिए Z समान, लेकिन A अलग',kind:'isotopes',items:['Z समान','A अलग','न्यूट्रॉन अलग']},
};

function AtomDiagram(){
  return <div className="science4-diagram science4-atom-diagram" aria-label="नाभिक और ऊर्जा स्तरों का योजनात्मक चित्र">
    <div className="science4-shell shell-k"><span>K</span></div>
    <div className="science4-shell shell-l"><span>L</span></div>
    <div className="science4-nucleus"><b>नाभिक</b><small>p⁺ + n⁰</small></div>
    <div className="science4-diagram-note">यह योजनात्मक चित्र है; इलेक्ट्रॉन के लिए कोई निश्चित गोल पथ नहीं दिखाया गया है।</div>
  </div>;
}

function ShellDiagram(){
  return <div className="science4-diagram science4-shell-diagram" aria-label="ऊर्जा स्तरों का योजनात्मक चित्र">
    <div className="science4-level level-1"><span>ऊर्जा स्तर 1</span></div>
    <div className="science4-level level-2"><span>ऊर्जा स्तर 2</span></div>
    <div className="science4-level level-3"><span>ऊर्जा स्तर 3</span></div>
    <div className="science4-level-core">नाभिक</div>
  </div>;
}

function JumpDiagram(){
  return <div className="science4-diagram science4-jump-diagram" aria-label="ऊर्जा स्तर परिवर्तन का योजनात्मक चित्र">
    <div className="science4-energy-column">
      <div className="science4-energy-box"><span>निम्न स्तर</span><b>आरंभिक अवस्था</b></div>
      <div className="science4-energy-arrow">↑</div>
      <div className="science4-energy-box accent"><span>उच्च स्तर</span><b>ऊर्जा अवशोषित</b></div>
    </div>
    <div className="science4-jump-divider">या</div>
    <div className="science4-energy-column reverse">
      <div className="science4-energy-box accent"><span>उच्च स्तर</span><b>आरंभिक अवस्था</b></div>
      <div className="science4-energy-arrow">↓</div>
      <div className="science4-energy-box"><span>निम्न स्तर</span><b>ऊर्जा उत्सर्जित हो सकती है</b></div>
    </div>
  </div>;
}

function ParticleDiagram({symbol,kind}){
  return <div className={`science4-diagram science4-particle-diagram ${kind==='thomson'?'thomson':''}`}>
    <div className="science4-particle"><strong>{symbol}</strong></div>
    <div className="science4-particle-caption">प्रत्येक कण की पहचान उसके आवेश, स्थान और परमाणु की संरचना में भूमिका से की जाती है।</div>
  </div>;
}

function ConfigDiagram(){
  return <div className="science4-diagram science4-config-diagram" aria-label="मुख्य कोशों में इलेक्ट्रॉनिक विन्यास का योजनात्मक चित्र">
    <div><b>K</b><span>पहला कोश</span></div>
    <div><b>L</b><span>दूसरा कोश</span></div>
    <div><b>M</b><span>बाहरी कोश</span></div>
  </div>;
}

function FormulaDiagram({kind}){
  const formulas={
    atomicNumber:<><b>Z = p</b><span>उदासीन परमाणु में</span><b>e⁻ = Z</b></>,
    massNumber:<><b>A = p + n</b><span>अर्थात द्रव्यमान संख्या</span><b>n = A − Z</b></>,
    calculation:<><b>23 = 11 + n</b><span>इसलिए</span><b>n = 12</b></>,
  };
  return <div className="science4-diagram science4-formula-diagram" aria-label="परमाणु गणना का योजनात्मक चित्र">{formulas[kind]||formulas.atomicNumber}</div>;
}

function ScatterDiagram(){
  return <div className="science4-diagram science4-scatter-diagram" aria-label="रदरफोर्ड प्रकीर्णन का स्थिर योजनात्मक चित्र">
    <div className="science4-target"><span>पतली पन्नी</span><i>नाभिक का क्षेत्र</i></div>
    <div className="science4-ray ray-straight">→</div>
    <div className="science4-ray ray-bend">↗</div>
    <div className="science4-ray ray-back">←</div>
    <small>तीर केवल प्रकीर्णन के अलग परिणामों का प्रतीक हैं; वे वास्तविक समय की गति नहीं दिखाते।</small>
  </div>;
}

function IsotopeDiagram(){
  return <div className="science4-diagram science4-isotope-diagram" aria-label="समस्थानिकों की तुलना">
    <div><b>एक ही Z</b><span>तत्व समान</span></div>
    <div><b>A₁ ≠ A₂</b><span>द्रव्यमान संख्या अलग</span></div>
    <div><b>n₁ ≠ n₂</b><span>न्यूट्रॉन संख्या अलग</span></div>
  </div>;
}

export function ScienceChapter4Visual({kind='atomStructure'}){
  const scene=sceneData[kind]||sceneData.atomStructure;
  let diagram=<AtomDiagram/>;
  if(scene.kind==='particle')diagram=<ParticleDiagram symbol={scene.symbol} kind={scene.kind}/>;
  if(scene.kind==='thomson')diagram=<ParticleDiagram symbol="e⁻" kind="thomson"/>;
  if(scene.kind==='scatter')diagram=<ScatterDiagram/>;
  if(scene.kind==='problem')diagram=<ShellDiagram/>;
  if(scene.kind==='shells')diagram=<ShellDiagram/>;
  if(scene.kind==='jump')diagram=<JumpDiagram/>;
  if(scene.kind==='config')diagram=<ConfigDiagram/>;
  if(scene.kind==='formula')diagram=<FormulaDiagram kind={kind}/>;
  if(scene.kind==='isotopes')diagram=<IsotopeDiagram/>;

  return <div className="science4-visual" aria-label={`अवधारणा का दृश्य: ${scene.title}`}>
    <div className="science4-visual-head"><span>अध्याय दृश्य</span><strong>{scene.title}</strong><p>{scene.label}</p></div>
    {diagram}
    <div className="science4-meaning"><b>मुख्य बातें</b><div>{scene.items.map((item,i)=><span key={`${item}-${i}`}><i>{i+1}</i>{item}</span>)}</div></div>
  </div>;
}

export default ScienceChapter4Visual;
