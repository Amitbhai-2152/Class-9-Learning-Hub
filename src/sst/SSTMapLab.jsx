import React,{useEffect,useMemo,useRef,useState} from 'react';
import './sst-map-lab.css';

const MAP_LIBRARY='https://unpkg.com/leaflet@1.9.4/dist/';
const WORLD={label:'विश्व मानचित्र',center:[20,0],zoom:2};
const INDIA={label:'भारत मानचित्र',center:[22.5,79],zoom:5};

const WORLD_PLACES=[
 {name:'एशिया',position:[34,100],zoom:3,kind:'महाद्वीप',fact:'विश्व का सबसे बड़ा महाद्वीप।'},
 {name:'यूरोप',position:[52,15],zoom:4,kind:'महाद्वीप',fact:'एशिया के पश्चिम में स्थित महाद्वीप।'},
 {name:'अफ्रीका',position:[5,20],zoom:3,kind:'महाद्वीप',fact:'भूमध्य रेखा अफ्रीका से होकर गुजरती है।'},
 {name:'उत्तरी अमेरिका',position:[40,-100],zoom:3,kind:'महाद्वीप',fact:'उत्तर-पश्चिमी गोलार्ध का प्रमुख महाद्वीप।'},
 {name:'दक्षिणी अमेरिका',position:[-15,-60],zoom:3,kind:'महाद्वीप',fact:'अमेजन बेसिन और एंडीज यहाँ के प्रमुख भौगोलिक क्षेत्र हैं।'},
 {name:'ऑस्ट्रेलिया',position:[-25,135],zoom:4,kind:'महाद्वीप',fact:'सबसे छोटा महाद्वीप और एक देश के रूप में भी जाना जाता है।'},
 {name:'लंदन',position:[51.5074,-0.1278],zoom:6,kind:'शहर',fact:'यूरोप में, लगभग 0° देशांतर के निकट।'},
 {name:'काहिरा',position:[30.0444,31.2357],zoom:6,kind:'शहर',fact:'अफ्रीका में नील नदी के निकट स्थित प्रमुख शहर।'},
];

const INDIA_PLACES=[
 {name:'नई दिल्ली',position:[28.6139,77.209],zoom:6,kind:'राजधानी',fact:'भारत की राष्ट्रीय राजधानी।'},
 {name:'मुंबई',position:[19.076,72.8777],zoom:6,kind:'शहर',fact:'पश्चिमी तट पर अरब सागर के किनारे स्थित प्रमुख शहर।'},
 {name:'कोलकाता',position:[22.5726,88.3639],zoom:6,kind:'शहर',fact:'पूर्वी भारत में हुगली नदी के किनारे स्थित प्रमुख शहर।'},
 {name:'चेन्नई',position:[13.0827,80.2707],zoom:6,kind:'शहर',fact:'बंगाल की खाड़ी के तट पर स्थित प्रमुख शहर।'},
 {name:'पटना',position:[25.5941,85.1376],zoom:7,kind:'राजधानी',fact:'बिहार की राजधानी, गंगा के मैदान में स्थित।'},
 {name:'जयपुर',position:[26.9124,75.7873],zoom:7,kind:'राजधानी',fact:'राजस्थान की राजधानी।'},
 {name:'गुवाहाटी',position:[26.1445,91.7362],zoom:7,kind:'शहर',fact:'ब्रह्मपुत्र नदी के किनारे असम का प्रमुख शहर।'},
 {name:'कन्याकुमारी',position:[8.0883,77.5385],zoom:7,kind:'स्थान',fact:'भारत के मुख्य भूभाग के दक्षिणी छोर के निकट।'},
];

const WORLD_MISSIONS=[
 {target:'एशिया',prompt:'विश्व का सबसे बड़ा महाद्वीप खोजें।',hint:'भारत के पूर्व और यूरोप के पूर्व में स्थित विशाल भूभाग।'},
 {target:'अफ्रीका',prompt:'उस महाद्वीप पर जाएँ जिससे भूमध्य रेखा गुजरती है और जो यूरोप के दक्षिण में है।',hint:'भूमध्य सागर के ठीक दक्षिण की ओर देखें।'},
 {target:'उत्तरी अमेरिका',prompt:'उत्तरी गोलार्ध में प्रशांत और अटलांटिक के बीच स्थित महाद्वीप खोजें।',hint:'मानचित्र के बाएँ ऊपरी भाग की ओर देखें।'},
 {target:'लंदन',prompt:'लगभग 0° देशांतर के निकट स्थित यूरोपीय शहर खोजें।',hint:'यूरोप में Prime Meridian के पास।'},
 {target:'काहिरा',prompt:'नील नदी के क्षेत्र में स्थित अफ्रीकी शहर खोजें।',hint:'अफ्रीका के उत्तर-पूर्वी भाग की ओर देखें।'},
];

const INDIA_MISSIONS=[
 {target:'नई दिल्ली',prompt:'भारत की राष्ट्रीय राजधानी खोजें।',hint:'उत्तर भारत में, लगभग 28.6°N और 77.2°E।'},
 {target:'पटना',prompt:'बिहार की राजधानी खोजें।',hint:'गंगा के मैदान में, पूर्वी भारत की ओर।'},
 {target:'मुंबई',prompt:'अरब सागर के तट पर स्थित प्रमुख पश्चिमी शहर खोजें।',hint:'भारत के पश्चिमी तट की ओर देखें।'},
 {target:'चेन्नई',prompt:'बंगाल की खाड़ी के तट पर स्थित दक्षिण भारतीय शहर खोजें।',hint:'दक्षिण-पूर्वी तट की ओर देखें।'},
 {target:'गुवाहाटी',prompt:'ब्रह्मपुत्र नदी के किनारे स्थित असम के प्रमुख शहर को खोजें।',hint:'भारत के उत्तर-पूर्वी भाग में देखें।'},
 {target:'कन्याकुमारी',prompt:'भारत के मुख्य भूभाग के दक्षिणी छोर के निकट स्थान खोजें।',hint:'मानचित्र के सबसे दक्षिणी भाग की ओर जाएँ।'},
];

function loadLeaflet(){
 return new Promise((resolve,reject)=>{
  if(window.L)return resolve(window.L);
  const cssId='sst-leaflet-css';
  if(!document.getElementById(cssId)){
   const link=document.createElement('link');link.id=cssId;link.rel='stylesheet';link.href=MAP_LIBRARY+'leaflet.css';document.head.appendChild(link);
  }
  const existing=document.querySelector('script[data-sst-leaflet]');
  if(existing){existing.addEventListener('load',()=>resolve(window.L),{once:true});existing.addEventListener('error',reject,{once:true});return;}
  const script=document.createElement('script');script.src=MAP_LIBRARY+'leaflet.js';script.async=true;script.dataset.sstLeaflet='true';script.onload=()=>resolve(window.L);script.onerror=reject;document.body.appendChild(script);
 });
}

function formatCoord(value,positive,negative){return `${Math.abs(value).toFixed(2)}° ${value>=0?positive:negative}`}

export function SSTMapLab({onClose}){
 const mapRef=useRef(null);const mapInstance=useRef(null);const layerRef=useRef(null);const userLayerRef=useRef(null);const clickHandlerRef=useRef(null);
 const [view,setView]=useState('world');const [mode,setMode]=useState('explore');const [loading,setLoading]=useState(true);const [error,setError]=useState('');const [selected,setSelected]=useState(null);const [missionIndex,setMissionIndex]=useState(0);const [missionScore,setMissionScore]=useState(0);const [missionMessage,setMissionMessage]=useState('');const [showHints,setShowHints]=useState(false);
 const config=view==='india'?INDIA:WORLD;const places=view==='india'?INDIA_PLACES:WORLD_PLACES;const missions=view==='india'?INDIA_MISSIONS:WORLD_MISSIONS;
 const mission=missions[missionIndex%missions.length];const target=useMemo(()=>places.find(p=>p.name===mission.target),[places,mission.target]);

 const showView=(next)=>{setView(next);setSelected(null);setMissionIndex(0);setMissionScore(0);setMissionMessage('');setShowHints(false);setError('');setLoading(true)};
 const showMode=(next)=>{setMode(next);setMissionMessage('');setShowHints(false);if(next==='mission'&&mapInstance.current&&target)mapInstance.current.setView(target.position,Math.max(config.zoom,5),{animate:true})};

 useEffect(()=>{
  let active=true;
  loadLeaflet().then(L=>{
   if(!active||!mapRef.current)return;
   if(!mapInstance.current){
    mapInstance.current=L.map(mapRef.current,{zoomControl:true,worldCopyJump:true,attributionControl:true,minZoom:2,maxZoom:19});
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap contributors'}).addTo(mapInstance.current);
    userLayerRef.current=L.layerGroup().addTo(mapInstance.current);
    clickHandlerRef.current=e=>{
     const {lat,lng}=e.latlng;setSelected({lat,lng});
     if(mode==='mission'&&target){
      const distance=mapInstance.current.distance(e.latlng,target.position);
      const tolerance=view==='india'?90000:350000;
      if(distance<=tolerance){setMissionScore(score=>score+1);setMissionMessage(`सही! आपने ${target.name} के पास क्लिक किया।`);setShowHints(false);}
      else setMissionMessage('अभी सही स्थान नहीं। थोड़ा और zoom/pan करके फिर क्लिक करें।');
     }
    };
    mapInstance.current.on('click',clickHandlerRef.current);
   }
   mapInstance.current.setView(config.center,config.zoom);
   if(layerRef.current)layerRef.current.clearLayers();else layerRef.current=L.layerGroup().addTo(mapInstance.current);
   places.forEach(place=>L.marker(place.position).addTo(layerRef.current).bindTooltip(place.name,{direction:'top',offset:[0,-8]}));
   if(userLayerRef.current)userLayerRef.current.clearLayers();
   mapInstance.current.invalidateSize();setLoading(false);
  }).catch(()=>{if(active){setLoading(false);setError('मानचित्र लोड नहीं हो सका। इंटरनेट कनेक्शन जाँचें और फिर पुनः प्रयास करें।')}});
  return()=>{active=false};
 },[view]);

 useEffect(()=>{if(!mapInstance.current)return;const handler=e=>{const {lat,lng}=e.latlng;setSelected({lat,lng});if(mode==='mission'&&target){const distance=mapInstance.current.distance(e.latlng,target.position);const tolerance=view==='india'?90000:350000;if(distance<=tolerance){setMissionScore(score=>score+1);setMissionMessage(`सही! आपने ${target.name} के पास क्लिक किया।`);setShowHints(false)}else setMissionMessage('अभी सही स्थान नहीं। थोड़ा और zoom/pan करके फिर क्लिक करें।')}};mapInstance.current.off('click');mapInstance.current.on('click',handler);return()=>mapInstance.current?.off('click',handler)},[mode,target,view]);
 useEffect(()=>()=>{if(mapInstance.current){mapInstance.current.remove();mapInstance.current=null}},[]);

 const goToPlace=place=>{mapInstance.current?.setView(place.position,place.zoom,{animate:true});setSelected({lat:place.position[0],lng:place.position[1]})};
 const nextMission=()=>{setMissionIndex(i=>(i+1)%missions.length);setMissionMessage('');setShowHints(false);const next=missions[(missionIndex+1)%missions.length];const nextTarget=places.find(p=>p.name===next.target);if(nextTarget)mapInstance.current?.setView(nextTarget.position,Math.max(config.zoom,5),{animate:true})};
 const resetMission=()=>{setMissionIndex(0);setMissionScore(0);setMissionMessage('');setShowHints(false);mapInstance.current?.setView(config.center,config.zoom,{animate:true})};
 const zoomToWorld=()=>mapInstance.current?.setView(config.center,config.zoom,{animate:true});

 return <div className="sst-map-overlay" role="dialog" aria-modal="true" aria-label="सामाजिक विज्ञान मानचित्र प्रयोगशाला" onMouseDown={e=>{if(e.target===e.currentTarget)onClose?.()}}>
  <section className="sst-map-modal">
   <header className="sst-map-head">
    <div><span className="sst-map-eyebrow">SST MAP LAB • GEOGRAPHY SIMULATION</span><h2>विश्व एवं भारत मानचित्र</h2><p>देखें, खोजें, निर्देशांक पढ़ें और interactive map missions से भूगोल का अभ्यास करें।</p></div>
    <button type="button" className="sst-map-close" onClick={onClose} aria-label="मानचित्र बंद करें">×</button>
   </header>
   <div className="sst-map-toolbar">
    <div className="sst-map-switch" role="tablist" aria-label="मानचित्र चुनें">
     <button type="button" className={view==='world'?'active':''} onClick={()=>showView('world')}>🌍 विश्व</button>
     <button type="button" className={view==='india'?'active':''} onClick={()=>showView('india')}>🇮🇳 भारत</button>
    </div>
    <div className="sst-map-mode" role="tablist" aria-label="अभ्यास मोड">
     <button type="button" className={mode==='explore'?'active':''} onClick={()=>showMode('explore')}>🔎 Explore</button>
     <button type="button" className={mode==='mission'?'active':''} onClick={()=>showMode('mission')}>🎯 Mission</button>
    </div>
    <button type="button" className="sst-map-reset" onClick={zoomToWorld}>↺ Reset view</button>
    <div className="sst-map-quick">{places.map(place=><button type="button" key={place.name} onClick={()=>goToPlace(place)}>{place.name}</button>)}</div>
   </div>
   {mode==='mission'&&<div className="sst-map-missionbar"><div><span>🎯 मिशन {missionIndex+1}/{missions.length}</span><strong>{mission.prompt}</strong><small>{showHints?mission.hint:'Hint देखने के लिए नीचे क्लिक करें।'}</small></div><div className="sst-map-mission-actions"><button type="button" onClick={()=>setShowHints(v=>!v)}>{showHints?'Hint छिपाएँ':'Hint दिखाएँ'}</button><button type="button" onClick={nextMission}>Next →</button><b>स्कोर {missionScore}</b><button type="button" className="ghost" onClick={resetMission}>Reset</button></div></div>}
   <div className="sst-map-stage">
    <div ref={mapRef} className="sst-map-canvas" />
    {loading&&<div className="sst-map-status">मानचित्र तैयार हो रहा है…</div>}
    {error&&<div className="sst-map-error"><strong>Map unavailable</strong><span>{error}</span><button type="button" onClick={()=>showView(view)}>पुनः प्रयास करें</button></div>}
    {selected&&<div className="sst-map-coordinate-card"><span>आपका चयन</span><strong>{formatCoord(selected.lat,'N','S')}</strong><strong>{formatCoord(selected.lng,'E','W')}</strong><small>{selected.lat>=0?'उत्तरी':'दक्षिणी'} गोलार्ध • {selected.lng>=0?'पूर्वी':'पश्चिमी'} देशांतर</small></div>}
   </div>
   <div className="sst-map-info-row">
    <div><span>📚 {mode==='mission'?'Mission mode':'Explore mode'}</span><strong>{mode==='mission'?(missionMessage||'मानचित्र पर सही स्थान पर क्लिक करें।'):(selected?'निर्देशांक पढ़ें और स्थान को समझें।':'मानचित्र पर किसी भी जगह क्लिक करें।')}</strong></div>
    {selected&&<div className="sst-map-selection"><b>{formatCoord(selected.lat,'N','S')}</b><b>{formatCoord(selected.lng,'E','W')}</b></div>}
   </div>
   <footer className="sst-map-foot"><span>Drag करके map घुमाएँ • + / − से zoom करें • किसी जगह क्लिक करके coordinates देखें</span><span>{config.label} • OpenStreetMap</span></footer>
  </section>
 </div>;
}
