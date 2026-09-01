import React,{useEffect,useState} from 'react';
import './science-chapter-visual.css';

const scenes={
  'stateJourney':{title:'अवस्था परिवर्तन',caption:'तापमान बदलने पर पदार्थ की अवस्था बदल सकती है।',type:'states'},
  'particle':{title:'पदार्थ के कण',caption:'कण बहुत छोटे होते हैं और लगातार गति करते रहते हैं।',type:'particles'},
  'diffusion':{title:'विसरण',caption:'कणों की गति से एक पदार्थ दूसरे में फैलता है।',type:'diffusion'},
  'particlesGap':{title:'कणों के बीच रिक्त स्थान',caption:'कणों के बीच खाली स्थान भी होता है।',type:'gaps'},
  'motion':{title:'कणों की गति',caption:'तापमान बढ़ने पर कणों की गति बढ़ती है।',type:'motion'},
  'solid':{title:'ठोस के कण',caption:'ठोस में कण पास-पास रहते हैं और अपने स्थान पर कंपन करते हैं।',type:'solid'},
  'liquid':{title:'द्रव के कण',caption:'द्रव में कण सरक सकते हैं, इसलिए द्रव पात्र का आकार लेता है।',type:'liquid'},
  'gas':{title:'गैस का फैलाव',caption:'गैस के कण दूर-दूर रहकर उपलब्ध स्थान में फैलते हैं।',type:'gas'},
  'compression':{title:'गैस का संपीड़न',caption:'दबाव देने पर कणों के बीच की दूरी घटती है।',type:'compression'},
  'stateChange':{title:'ठोस → द्रव → गैस',caption:'ऊष्मा देने पर अवस्था क्रमशः बदल सकती है।',type:'states'},
  'melt':{title:'गलन',caption:'ऊष्मा मिलने पर ठोस के कण अधिक गतिशील होकर द्रव बनाते हैं।',type:'melt'},
  'evaporation':{title:'वाष्पीकरण',caption:'सतह के कुछ ऊर्जावान कण द्रव से बाहर निकलते हैं।',type:'evaporation'},
  'factors':{title:'वाष्पीकरण की दर',caption:'तापमान और सतह का क्षेत्रफल बढ़ने पर वाष्पीकरण तेज हो सकता है।',type:'factors'},
  'boilVsEvap':{title:'वाष्पीकरण और उबलना',caption:'वाष्पीकरण सतह पर होता है, उबलना पूरे द्रव में।',type:'boil'},
  'sublimation':{title:'ऊर्ध्वपातन',caption:'कुछ ठोस पदार्थ सीधे गैस में बदल सकते हैं।',type:'sublimation'},
  'motionCompare':{title:'तापमान और गति',caption:'तापमान बढ़ने पर कणों की औसत गतिज ऊर्जा बढ़ती है।',type:'motion'},
  'cooling':{title:'वाष्पीकरण से शीतलन',caption:'वाष्पीकरण के लिए ऊष्मा लेने से ठंडक का प्रभाव मिलता है।',type:'cooling'}
};

function Particles({count=18,className=''}){return <div className={`particle-field ${className}`}>{Array.from({length:count},(_,i)=><span key={i}/>)}</div>}

function Scene({type}){
  if(type==='states')return <div className="science-scene states-scene"><div className="state-box solid-box"><Particles count={14}/></div><div className="state-arrow">→</div><div className="state-box liquid-box"><Particles count={13}/></div><div className="state-arrow">→</div><div className="state-box gas-box"><Particles count={11}/></div><div className="state-labels"><span>ठोस</span><span>द्रव</span><span>गैस</span></div></div>;
  if(type==='particles')return <div className="science-scene particle-scene"><Particles count={20} className="slow-particles"/><div className="scene-ring"/><div className="scene-center-label">कण</div></div>;
  if(type==='diffusion')return <div className="science-scene diffusion-scene"><div className="diffusion-left"><Particles count={18} className="ink-particles"/></div><div className="diffusion-right"><Particles count={18}/></div><span className="diffusion-spread">→</span></div>;
  if(type==='gaps')return <div className="science-scene gap-scene"><div><Particles count={9}/></div><div><Particles count={9}/></div><span className="gap-arrow">↔</span></div>;
  if(type==='motion')return <div className="science-scene motion-scene"><div className="motion-low"><Particles count={8}/></div><span className="motion-arrow">→</span><div className="motion-high"><Particles count={8}/></div><div className="motion-heat">ऊष्मा ↑</div></div>;
  if(type==='solid')return <div className="science-scene box-scene solid-scene"><Particles count={22}/><div className="scene-border-label">कण पास-पास</div></div>;
  if(type==='liquid')return <div className="science-scene box-scene liquid-scene"><div className="liquid-shape"><Particles count={18}/></div><div className="scene-waterline"/></div>;
  if(type==='gas')return <div className="science-scene box-scene gas-scene"><Particles count={15}/></div>;
  if(type==='compression')return <div className="science-scene compression-scene"><div className="compression-box"><Particles count={8}/></div><span className="compress-arrow">→ दबाएँ →</span><div className="compression-box compressed"><Particles count={8}/></div></div>;
  if(type==='melt')return <div className="science-scene melt-scene"><div className="melt-solid"><Particles count={15}/></div><span>ऊष्मा</span><div className="melt-liquid"><Particles count={13}/></div></div>;
  if(type==='evaporation')return <div className="science-scene evaporation-scene"><div className="evap-liquid"><Particles count={16}/></div><span className="vapour-particles">↑ ↑ ↑</span><div className="evap-label">सतह से कण बाहर</div></div>;
  if(type==='factors')return <div className="science-scene factors-scene"><div className="factor-track"><span>कम</span><i/><span>अधिक</span></div><div className="factor-sun">तापमान ↑</div><div className="factor-wind">हवा ↑</div></div>;
  if(type==='boil')return <div className="science-scene boil-scene"><div><Particles count={14}/><span>सतह</span></div><div className="boil-pot"><Particles count={16}/><i/><i/><i/></div></div>;
  if(type==='sublimation')return <div className="science-scene sublimation-scene"><div>ठोस</div><span>↗</span><div>गैस</div><small>द्रव अवस्था के बिना</small></div>;
  if(type==='cooling')return <div className="science-scene cooling-scene"><div className="pot"><Particles count={15}/></div><span className="cool-arrow">↑ ऊष्मा बाहर ↑</span><strong>ठंडक</strong></div>;
  return <div className="science-scene generic-scene"><Particles count={16}/></div>;
}

export function ScienceChapterVisual({visual}){
  if(!visual)return null;
  const scene=visual.type?visual:scenes[visual.type]||scenes.particle;
  const normalized=scenes[scene.type]||scene;
  const [index,setIndex]=useState(0);
  const items=Array.isArray(visual.items)&&visual.items.length?visual.items:[];
  useEffect(()=>{if(items.length>1){const id=setInterval(()=>setIndex(i=>(i+1)%items.length),1800);return()=>clearInterval(id)}},[items.length]);
  return <div className={`science-chapter-visual visual-${normalized.type}`}>
    <div className="science-visual-head"><div><span>दृश्य समझ</span><strong>{visual.title||normalized.title}</strong></div><span>● एनिमेशन</span></div>
    <Scene type={normalized.type}/>
    {items.length>0&&<div className="science-sequence"><span className="science-sequence-dot">{index+1}</span><strong>{items[index]}</strong><div className="science-sequence-track"><i style={{width:`${((index+1)/items.length)*100}%`}}/></div></div>}
    <p>{visual.caption||normalized.caption}</p>
  </div>;
}
