import React from 'react';

const sceneData={
  atomStructure:{title:'परमाणु के मुख्य भाग',label:'नाभिक केंद्र में, इलेक्ट्रॉन ऊर्जा स्तरों में',kind:'atom',items:['प्रोटॉन (p⁺)','न्यूट्रॉन (n⁰)','इलेक्ट्रॉन (e⁻)']},
  electron:{title:'इलेक्ट्रॉन',label:'ऋणावेशित कण — नाभिक के बाहर ऊर्जा स्तरों में',kind:'particle',symbol:'e⁻',items:['ऋण आवेश','बहुत कम द्रव्यमान','ऊर्जा स्तर में']},
  proton:{title:'प्रोटॉन',label:'धनावेशित कण जो नाभिक में पाया जाता है',kind:'particle',symbol:'p⁺',items:['धन आवेश','नाभिक में','परमाणु क्रमांक से जुड़ा']},
  neutron:{title:'न्यूट्रॉन',label:'विद्युत रूप से उदासीन कण जो नाभिक में पाया जाता है',kind:'particle',symbol:'n⁰',items:['कोई विद्युत आवेश नहीं','नाभिक में','द्रव्यमान में योगदान']},
  thomson:{title:'थॉमसन का परमाणु मॉडल',label:'धनावेशित क्षेत्र में इलेक्ट्रॉनों की उपस्थिति',kind:'thomson',items:['धनावेशित पृष्ठभूमि','इलेक्ट्रॉन भीतर','कुल परमाणु उदासीन']},
  scattering:{title:'रदरफोर्ड का प्रकीर्णन प्रयोग',label:'सोने की पतली पन्नी से कणों के अलग-अलग विचलन',kind:'scatter',items:['अधिकांश कण सीधे','कुछ कण मुड़े','बहुत कम कण वापस']},
  problem:{title:'रदरफोर्ड मॉडल की सीमा',label:'स्थिरता की समस्या — पुराना मॉडल पर्याप्त नहीं था',kind:'problem',items:['इलेक्ट्रॉन की ऊर्जा का प्रश्न','परमाणु की स्थिरता','बोर मॉडल की आवश्यकता']},
  bohr:{title:'बोर का परमाणु मॉडल',label:'अनुमत ऊर्जा स्तर — इलेक्ट्रॉन प्रत्येक स्तर पर एक निश्चित ऊर्जा अवस्था में',kind:'shells',items:['पहला ऊर्जा स्तर','दूसरा ऊर्जा स्तर','तीसरा ऊर्जा स्तर']},
  jump:{title:'ऊर्जा का अवशोषण और उत्सर्जन',label:'इलेक्ट्रॉन का परिवर्तन ऊर्जा स्तरों के बीच होता है',kind:'jump',items:['ऊर्जा अवशोषित → ऊँचा स्तर','ऊँचा स्तर','ऊर्जा उत्सर्जित → निचला स्तर']},
  shells:{title:'मुख्य कोश',label:'K, L, M, N को मुख्य ऊर्जा स्तरों के रूप में समझें',kind:'shells',items:['K कोश','L कोश','M कोश','N कोश']},
  configuration:{title:'इलेक्ट्रॉनिक विन्यास',label:'इलेक्ट्रॉनों का वितरण मुख्य कोशों में लिखा जाता है',kind:'config',items:['पहला कोश','दूसरा कोश','बाहरी कोश']},
  atomicNumber:{title:'परमाणु क्रमांक',label:'Z = प्रोटॉनों की संख्या',kind:'formula',items:['Z = p','उदासीन परमाणु में e⁻ = Z','Z तत्व की पहचान करता है']},
  massNumber:{title:'द्रव्यमान संख्या',label:'A = प्रोटॉन + न्यूट्रॉन',kind:'formula',items:['A = p + n','Z = p','n = A − Z']},
  calculation:{title:'न्यूट्रॉन निकालें',label:'उदाहरण: A = 23 और Z = 11',kind:'formula',items:['A = 23','Z = 11','n = 23 − 11 = 12']},
  isotopes:{title:'समस्थानिक',label:'एक ही तत्व: समान परमाणु क्रमांक, अलग द्रव्यमान संख्या',kind:'isotopes',items:['Z समान','A अलग','न्यूट्रॉन की संख्या अलग']},
};

function AtomDiagram(){
  return <div className="science4-diagram science4-atom-diagram" aria-label="नाभिक और ऊर्जा स्तरों का स्थिर आरेख">
    <div className="science4-shell shell-k"><span>K</span><i className="science4-dot d1">e⁻</i><i className="science4-dot d2">e⁻</i></div>
    <div className="science4-shell shell-l"><span>L</span><i className="science4-dot d3">e⁻</i></div>
    <div className="science4-nucleus"><b>नाभिक</b><small>p⁺ + n⁰</small></div>
  </div>;
}

function ShellDiagram(){
  return <div className="science4-diagram science4-shell-diagram" aria-label="ऊर्जा स्तरों का स्थिर आरेख">
    <div className="science4-level level-1"><span>ऊर्जा स्तर 1</span></div>
    <div className="science4-level level-2"><span>ऊर्जा स्तर 2</span></div>
    <div className="science4-level level-3"><span>ऊर्जा स्तर 3</span></div>
    <div className="science4-level-core">नाभिक</div>
  </div>;
}

function JumpDiagram(){
  return <div className="science4-diagram science4-jump-diagram" aria-label="ऊर्जा स्तर परिवर्तन का स्थिर आरेख">
    <div className="science4-energy-box"><span>ऊँचा स्तर</span><b>ऊर्जा अवशोषित</b></div>
    <div className="science4-energy-arrow" aria-hidden="true">↑</div>
    <div className="science4-energy-box"><span>निचला स्तर</span><b>ऊर्जा उत्सर्जित</b></div>
  </div>;
}

function ParticleDiagram({symbol,kind}){
  return <div className={`science4-diagram science4-particle-diagram ${kind==='thomson'?'thomson':''}`}>
    <div className="science4-particle"><strong>{symbol}</strong></div>
    <div className="science4-particle-caption">यह कण नाभिक/ऊर्जा स्तरों की संरचना में अपनी निश्चित भूमिका रखता है।</div>
  </div>;
}

function FormulaDiagram({kind}){
  const formulas={
    atomicNumber:<><b>Z = p</b><span>उदासीन परमाणु में</span><b>e⁻ = Z</b></>,
    massNumber:<><b>A = p + n</b><span>अर्थात द्रव्यमान संख्या</span><b>n = A − Z</b></>,
    calculation:<><b>23 = 11 + n</b><span>इसलिए</span><b>n = 12</b></>,
  };
  return <div className="science4-diagram science4-formula-diagram">{formulas[kind]||formulas.atomicNumber}</div>;
}

function ScatterDiagram(){
  return <div className="science4-diagram science4-scatter-diagram" aria-label="रदरफोर्ड प्रकीर्णन का स्थिर आरेख">
    <div className="science4-target"><span>पतली पन्नी</span><i>नाभिक</i></div>
    <div className="science4-ray ray-straight">→</div>
    <div className="science4-ray ray-bend">↗</div>
    <div className="science4-ray ray-back">←</div>
    <small>तीर कणों के देखे गए मार्ग का प्रतीकात्मक संकेत हैं; यह एनिमेटेड गति नहीं है।</small>
  </div>;
}

function IsotopeDiagram(){
  return <div className="science4-diagram science4-isotope-diagram">
    <div><b>एक ही Z</b><span>तत्व समान</span></div>
    <div><b>A₁ ≠ A₂</b><span>द्रव्यमान संख्या अलग</span></div>
    <div><b>n₁ ≠ n₂</b><span>न्यूट्रॉन अलग</span></div>
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
  if(scene.kind==='config')diagram=<AtomDiagram/>;
  if(scene.kind==='formula')diagram=<FormulaDiagram kind={kind}/>;
  if(scene.kind==='isotopes')diagram=<IsotopeDiagram/>;

  return <div className="science4-visual" aria-label={`अवधारणा का दृश्य: ${scene.title}`}>
    <div className="science4-visual-head"><span>अध्याय दृश्य</span><strong>{scene.title}</strong><p>{scene.label}</p></div>
    {diagram}
    <div className="science4-meaning"><b>मुख्य बातें</b><div>{scene.items.map((item,i)=><span key={`${item}-${i}`}><i>{i+1}</i>{item}</span>)}</div></div>
  </div>;
}

export default ScienceChapter4Visual;
