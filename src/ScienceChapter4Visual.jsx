import React,{useEffect,useState} from 'react';

export function ScienceChapter4Visual({kind='atomStructure'}){
  const [step,setStep]=useState(0);
  useEffect(()=>{const id=setInterval(()=>setStep(s=>(s+1)%4),1400);return()=>clearInterval(id)},[]);
  const scenes={
    atomStructure:['नाभिक','प्रोटॉन','न्यूट्रॉन','इलेक्ट्रॉन'],
    electron:['इलेक्ट्रॉन','नाभिक','ऊर्जा स्तर','गति'],
    proton:['प्रोटॉन','धन आवेश','नाभिक','तत्व की पहचान'],
    neutron:['न्यूट्रॉन','उदासीन','नाभिक','द्रव्यमान'],
    thomson:['धनावेशित क्षेत्र','इलेक्ट्रॉन','समान वितरण','उदासीन परमाणु'],
    scattering:['कण निकलते हैं','अधिकांश सीधे','कुछ मुड़ते','बहुत कम लौटते'],
    problem:['इलेक्ट्रॉन घूमते','ऊर्जा का प्रश्न','स्थिरता की समस्या','नया मॉडल'],
    bohr:['पहला स्तर','दूसरा स्तर','तीसरा स्तर','निश्चित ऊर्जा'],
    jump:['ऊर्जा अवशोषित','ऊँचा स्तर','ऊर्जा उत्सर्जित','निचला स्तर'],
    shells:['K = 2','L = 8','M = 18','N = 32'],
    configuration:['K = 2','L = 8','M = 1','सोडियम = 11'],
    atomicNumber:['Z = प्रोटॉन','उदासीन में e⁻ = Z','तत्व की पहचान','परमाणु क्रमांक'],
    massNumber:['A = p + n','Z = p','n = A − Z','द्रव्यमान संख्या'],
    calculation:['A = 23','Z = 11','23 − 11 = 12','न्यूट्रॉन = 12'],
    isotopes:['समान Z','A अलग','न्यूट्रॉन अलग','समस्थानिक'],
  };
  const items=scenes[kind]||scenes.atomStructure;
  return <div className="science4-visual" aria-label="अवधारणा का दृश्य"><div className="science4-orbit"><div className="science4-nucleus"><span>p⁺</span><span>n⁰</span></div><i className="science4-electron e1"/><i className="science4-electron e2"/><i className="science4-electron e3"/></div><div className="science4-timeline">{items.map((x,i)=><div key={`${x}-${i}`} className={`science4-step ${i===step?'active':''}`}><span>{i+1}</span><strong>{x}</strong></div>)}</div></div>;
}
