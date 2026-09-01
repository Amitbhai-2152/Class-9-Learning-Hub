import React from 'react';

const scenes={
  'त्रिभुज':{title:'त्रिभुज का क्षेत्रफल',caption:'आधार और ऊँचाई को देखकर संबंध समझें',type:'triangle'},
  'निर्देशांक ज्यामिति':{title:'निर्देशांक तल',caption:'बिंदु का स्थान बदलते हुए देखें',type:'coordinate'},
  'वृत्त':{title:'वृत्त और त्रिज्या',caption:'त्रिज्या के साथ आकार का बदलना देखें',type:'circle'},
  'सांख्यिकी':{title:'आँकड़ों का आलेख',caption:'मान बदलते ही स्तम्भों की ऊँचाई बदलती है',type:'bars'},
  'प्रायिकता':{title:'प्रायिकता के परिणाम',caption:'संभावित परिणामों को गिनकर संभावना समझें',type:'probability'},
  'चतुर्भुज':{title:'चतुर्भुज के भाग',caption:'भुजाएँ और विकर्ण पहचानें',type:'quad'},
  'रेखाएँ और कोण':{title:'कोणों का संबंध',caption:'रेखाओं के मिलने पर कोणों को देखें',type:'angles'},
  'समान्तर चतुर्भुजों और त्रिभुजों का क्षेत्रफल':{title:'क्षेत्रफल की तुलना',caption:'समान आधार और ऊँचाई का संबंध देखें',type:'area'},
  'हीरोन का सूत्र':{title:'हीरोन का सूत्र',caption:'तीन भुजाओं से क्षेत्रफल तक जाएँ',type:'heron'},
  'पृष्ठीय क्षेत्रफल एवं आयतन':{title:'ठोस आकृति',caption:'बाहरी सतह और भीतर की जगह समझें',type:'solid'},
  'बहुपद':{title:'बहुपद के पद',caption:'पद, गुणांक और घात को दृश्य रूप में देखें',type:'polynomial'},
  'दो चरों वाले रैखिक समीकरण':{title:'रैखिक आलेख',caption:'दो चरों वाले संबंध को रेखा के रूप में देखें',type:'line'},
  'यूक्लिड की ज्यामिति का परिचय':{title:'ज्यामिति की आधारभूत बातें',caption:'बिंदु, रेखा और अभिगृहीत से विचार बनाएँ',type:'euclid'},
  'रचनाएँ':{title:'ज्यामितीय रचना',caption:'कदम-दर-कदम निर्माण को देखें',type:'construction'},
  'संख्या पद्धति':{title:'संख्या रेखा',caption:'संख्याओं का स्थान और दूरी देखें',type:'numberline'}
};

function Scene({type}){
  if(type==='triangle'||type==='area'||type==='heron')return <svg viewBox="0 0 420 220" className="chapter-scene-svg" aria-hidden="true"><polygon points="90,180 330,180 250,48" className="scene-fill"/><line x1="250" y1="48" x2="250" y2="180" className="scene-height"/><line x1="90" y1="180" x2="330" y2="180" className="scene-base"/><circle cx="250" cy="48" r="6" className="scene-point pulse"/><text x="176" y="207" className="scene-label">आधार</text><text x="258" y="120" className="scene-label">ऊँचाई</text><g className="scene-measure"><rect x="112" y="154" width="42" height="7" rx="3"/><rect x="112" y="143" width="28" height="7" rx="3"/></g></svg>;
  if(type==='coordinate'||type==='line'||type==='euclid'||type==='numberline')return <svg viewBox="0 0 420 220" className="chapter-scene-svg" aria-hidden="true"><line x1="55" y1="180" x2="365" y2="180" className="scene-axis"/><line x1="210" y1="200" x2="210" y2="25" className="scene-axis"/><line x1="80" y1="160" x2="340" y2="70" className="scene-graph"/><circle cx="120" cy="146" r="7" className="scene-point moving"/><circle cx="275" cy="112" r="7" className="scene-point point2"/><text x="350" y="174" className="scene-label">x</text><text x="220" y="38" className="scene-label">y</text><text x="96" y="138" className="scene-label">(x, y)</text></svg>;
  if(type==='circle')return <svg viewBox="0 0 420 220" className="chapter-scene-svg" aria-hidden="true"><circle cx="210" cy="110" r="74" className="scene-circle"/><line x1="210" y1="110" x2="284" y2="110" className="scene-radius"/><circle cx="210" cy="110" r="6" className="scene-point"/><text x="242" y="102" className="scene-label">r</text><circle cx="210" cy="110" r="42" className="scene-circle inner"/><text x="168" y="202" className="scene-label">त्रिज्या बदलने पर आकार का प्रभाव</text></svg>;
  if(type==='bars'||type==='statistics')return <svg viewBox="0 0 420 220" className="chapter-scene-svg" aria-hidden="true"><line x1="55" y1="185" x2="370" y2="185" className="scene-axis"/><g className="scene-bars"><rect x="78" y="126" width="42" height="59" rx="6"/><rect x="138" y="92" width="42" height="93" rx="6"/><rect x="198" y="48" width="42" height="137" rx="6"/><rect x="258" y="108" width="42" height="77" rx="6"/></g><text x="70" y="207" className="scene-label">मान</text><text x="310" y="202" className="scene-label">बारम्बारता</text></svg>;
  if(type==='probability')return <svg viewBox="0 0 420 220" className="chapter-scene-svg" aria-hidden="true"><g className="scene-coins"><circle cx="112" cy="108" r="32"/><circle cx="188" cy="108" r="32"/><circle cx="264" cy="108" r="32"/></g><text x="99" y="115" className="scene-label">चित</text><text x="175" y="115" className="scene-label">पट</text><text x="244" y="115" className="scene-label">चित</text><text x="104" y="182" className="scene-label">संभावित परिणाम → अनुकूल परिणाम → प्रायिकता</text></svg>;
  if(type==='quad')return <svg viewBox="0 0 420 220" className="chapter-scene-svg" aria-hidden="true"><polygon points="105,62 314,62 350,170 72,170" className="scene-fill quad"/><line x1="105" y1="62" x2="350" y2="170" className="scene-diagonal"/><line x1="314" y1="62" x2="72" y2="170" className="scene-diagonal second"/><circle cx="105" cy="62" r="6" className="scene-point"/><circle cx="314" cy="62" r="6" className="scene-point"/></svg>;
  if(type==='angles')return <svg viewBox="0 0 420 220" className="chapter-scene-svg" aria-hidden="true"><line x1="70" y1="170" x2="350" y2="55" className="scene-axis"/><line x1="70" y1="55" x2="350" y2="170" className="scene-axis second"/><path d="M120 150 Q160 110 200 130" fill="none" className="scene-angle"/><path d="M220 130 Q260 110 300 150" fill="none" className="scene-angle second"/><circle cx="210" cy="112" r="7" className="scene-point"/></svg>;
  if(type==='solid')return <svg viewBox="0 0 420 220" className="chapter-scene-svg" aria-hidden="true"><rect x="100" y="70" width="150" height="100" rx="8" className="scene-solid"/><ellipse cx="250" cy="120" rx="36" ry="50" className="scene-cylinder"/><path d="M300 70 L360 110 L360 180 L300 140 Z" className="scene-solid side"/><text x="96" y="198" className="scene-label">बाहरी सतह</text><text x="270" y="198" className="scene-label">भीतर की जगह</text></svg>;
  if(type==='polynomial')return <svg viewBox="0 0 420 220" className="chapter-scene-svg" aria-hidden="true"><g className="scene-terms"><rect x="60" y="72" width="80" height="48" rx="12"/><rect x="158" y="72" width="80" height="48" rx="12"/><rect x="256" y="72" width="80" height="48" rx="12"/></g><text x="84" y="103" className="scene-label">x²</text><text x="180" y="103" className="scene-label">2x</text><text x="280" y="103" className="scene-label">5</text><text x="125" y="158" className="scene-label">पद + पद + अचर पद</text></svg>;
  if(type==='construction')return <svg viewBox="0 0 420 220" className="chapter-scene-svg" aria-hidden="true"><circle cx="205" cy="112" r="68" className="scene-circle construction"/><circle cx="205" cy="112" r="30" className="scene-circle inner"/><line x1="135" y1="112" x2="275" y2="112" className="scene-radius"/><line x1="205" y1="42" x2="205" y2="182" className="scene-radius second"/></svg>;
  return <svg viewBox="0 0 420 220" className="chapter-scene-svg" aria-hidden="true"><circle cx="210" cy="110" r="65" className="scene-circle"/><path d="M160 160 L210 60 L260 160 Z" className="scene-graph"/></svg>;
}

export function MathChapterVisual({chapter}){
  const scene=scenes[chapter]||scenes['संख्या पद्धति'];
  return <div className={`math-chapter-visual visual-${scene.type}`}><div className="math-chapter-visual-head"><div><span>दृश्य समझ</span><strong>{scene.title}</strong></div><span>● एनिमेशन</span></div><Scene type={scene.type}/><p>{scene.caption}</p></div>;
}
