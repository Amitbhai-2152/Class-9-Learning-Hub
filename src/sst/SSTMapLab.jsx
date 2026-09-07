import React,{useEffect,useRef,useState} from 'react';
import './sst-map-lab.css';

const MAP_LIBRARY='https://unpkg.com/leaflet@1.9.4/dist/';
const WORLD={label:'विश्व मानचित्र',center:[20,0],zoom:2};
const INDIA={label:'भारत मानचित्र',center:[22.5,79],zoom:5};
const INDIA_PLACES=[
 {name:'नई दिल्ली',position:[28.6139,77.209],zoom:6},
 {name:'मुंबई',position:[19.076,72.8777],zoom:6},
 {name:'कोलकाता',position:[22.5726,88.3639],zoom:6},
 {name:'चेन्नई',position:[13.0827,80.2707],zoom:6},
 {name:'पटना',position:[25.5941,85.1376],zoom:7},
 {name:'जयपुर',position:[26.9124,75.7873],zoom:7},
 {name:'गुवाहाटी',position:[26.1445,91.7362],zoom:7},
];
const WORLD_PLACES=[
 {name:'एशिया',position:[34,100],zoom:3},
 {name:'यूरोप',position:[52,15],zoom:4},
 {name:'अफ्रीका',position:[5,20],zoom:3},
 {name:'उत्तरी अमेरिका',position:[40,-100],zoom:3},
 {name:'दक्षिणी अमेरिका',position:[-15,-60],zoom:3},
 {name:'ऑस्ट्रेलिया',position:[-25,135],zoom:4},
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

export function SSTMapLab({onClose}){
 const mapRef=useRef(null);const mapInstance=useRef(null);const layerRef=useRef(null);const [view,setView]=useState('world');const [loading,setLoading]=useState(true);const [error,setError]=useState('');
 const config=view==='india'?INDIA:WORLD;
 const places=view==='india'?INDIA_PLACES:WORLD_PLACES;
 const showView=(next)=>{setView(next);setError('');setLoading(true)};
 useEffect(()=>{
  let active=true;
  loadLeaflet().then(L=>{
   if(!active||!mapRef.current)return;
   if(!mapInstance.current){
    mapInstance.current=L.map(mapRef.current,{zoomControl:true,worldCopyJump:true,attributionControl:true});
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap contributors'}).addTo(mapInstance.current);
   }
   mapInstance.current.setView(config.center,config.zoom);
   if(layerRef.current){layerRef.current.clearLayers();}else{layerRef.current=L.layerGroup().addTo(mapInstance.current)}
   places.forEach(place=>L.marker(place.position).addTo(layerRef.current).bindTooltip(place.name,{direction:'top',offset:[0,-8]}));
   mapInstance.current.invalidateSize();setLoading(false);
  }).catch(()=>{if(active){setLoading(false);setError('मानचित्र लोड नहीं हो सका। इंटरनेट कनेक्शन जाँचें और फिर पुनः प्रयास करें।')}});
  return()=>{active=false};
 },[view]);
 useEffect(()=>()=>{if(mapInstance.current){mapInstance.current.remove();mapInstance.current=null}},[]);
 const goToPlace=(place)=>mapInstance.current?.setView(place.position,place.zoom,{animate:true});
 return <div className="sst-map-overlay" role="dialog" aria-modal="true" aria-label="सामाजिक विज्ञान मानचित्र प्रयोगशाला" onMouseDown={e=>{if(e.target===e.currentTarget)onClose?.()}}>
  <section className="sst-map-modal">
   <header className="sst-map-head">
    <div><span className="sst-map-eyebrow">SST MAP LAB</span><h2>विश्व एवं भारत मानचित्र</h2><p>मानचित्र को zoom, pan और प्रमुख स्थानों पर jump करके भूगोल का अभ्यास करें।</p></div>
    <button type="button" className="sst-map-close" onClick={onClose} aria-label="मानचित्र बंद करें">×</button>
   </header>
   <div className="sst-map-toolbar">
    <div className="sst-map-switch" role="tablist" aria-label="मानचित्र चुनें">
     <button type="button" className={view==='world'?'active':''} onClick={()=>showView('world')}>🌍 विश्व</button>
     <button type="button" className={view==='india'?'active':''} onClick={()=>showView('india')}>🇮🇳 भारत</button>
    </div>
    <div className="sst-map-quick">
     {places.map(place=><button type="button" key={place.name} onClick={()=>goToPlace(place)}>{place.name}</button>)}
    </div>
   </div>
   <div className="sst-map-stage">
    <div ref={mapRef} className="sst-map-canvas" />
    {loading&&<div className="sst-map-status">मानचित्र तैयार हो रहा है…</div>}
    {error&&<div className="sst-map-error"><strong>Map unavailable</strong><span>{error}</span><button type="button" onClick={()=>showView(view)}>पुनः प्रयास करें</button></div>}
   </div>
   <footer className="sst-map-foot"><span>Drag करके map घुमाएँ • + / − से zoom करें</span><span>{config.label} • OpenStreetMap</span></footer>
  </section>
 </div>;
}
