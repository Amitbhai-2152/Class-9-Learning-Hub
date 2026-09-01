import React from 'react';

export function ScienceChapter3Visual2({kind='परमाणु'}){
  const common={fill:'none',stroke:'#5d8ea5',strokeWidth:3};
  return <div style={{margin:'0 0 22px',padding:'16px',border:'1px solid #dce8ed',borderRadius:20,background:'linear-gradient(180deg,#fbfeff,#f1f8fb)',overflow:'hidden'}}>
    <div style={{display:'flex',justifyContent:'space-between',fontWeight:800,color:'#496d7b'}}><span>अध्याय दृश्य</span><span>{kind}</span></div>
    <svg viewBox="0 0 300 190" style={{width:'100%',display:'block'}} role="img" aria-label={`परमाणु एवं अणु ${kind}`}>
      {kind==='परमाणु'&&<g>
        <circle cx="150" cy="95" r="28" fill="#efb25d" stroke="#b9792d" strokeWidth="3"/>
        <circle cx="150" cy="95" r="55" {...common}/><circle cx="150" cy="95" r="82" {...common} strokeDasharray="7 7"/>
        <circle cx="205" cy="95" r="7" fill="#4d88aa"><animateTransform attributeName="transform" type="rotate" from="0 150 95" to="360 150 95" dur="3s" repeatCount="indefinite"/></circle>
        <text x="150" y="100" textAnchor="middle" fill="#514331" fontWeight="800">नाभिक</text>
      </g>}
      {kind==='अणु'&&<g>
        <circle cx="95" cy="95" r="30" fill="#dceef5" stroke="#5d8ea5" strokeWidth="3"/><circle cx="155" cy="95" r="30" fill="#e9f3dc" stroke="#6f9b61" strokeWidth="3"/><circle cx="215" cy="95" r="30" fill="#f4e3d2" stroke="#ad7c52" strokeWidth="3"/>
        <line x1="125" y1="95" x2="125" y2="95" stroke="#5d8ea5" strokeWidth="5"><animate attributeName="x2" values="125;155;125" dur="2.2s" repeatCount="indefinite"/></line>
        <line x1="185" y1="95" x2="185" y2="95" stroke="#5d8ea5" strokeWidth="5"><animate attributeName="x2" values="185;215;185" dur="2.2s" repeatCount="indefinite"/></line>
        <text x="150" y="155" textAnchor="middle" fill="#58717d" fontWeight="800">परमाणु जुड़ते हैं → अणु</text>
      </g>}
      {kind==='सूत्र'&&<g>
        <text x="150" y="115" textAnchor="middle" fill="#355462" fontSize="42" fontWeight="900">H₂O</text>
        <circle cx="92" cy="58" r="7" fill="#efb25d"><animate attributeName="cy" values="58;48;58" dur="1.8s" repeatCount="indefinite"/></circle>
        <circle cx="208" cy="58" r="7" fill="#efb25d"><animate attributeName="cy" values="58;48;58" dur="1.8s" begin=".3s" repeatCount="indefinite"/></circle>
        <text x="150" y="155" textAnchor="middle" fill="#58717d" fontWeight="800">दो H + एक O</text>
      </g>}
      {kind==='द्रव्यमान'&&<g>
        <line x1="65" y1="70" x2="235" y2="70" stroke="#64818c" strokeWidth="5"/><line x1="150" y1="70" x2="150" y2="145" stroke="#64818c" strokeWidth="4"/>
        <line x1="60" y1="98" x2="110" y2="98" stroke="#64818c" strokeWidth="4"/><line x1="190" y1="98" x2="240" y2="98" stroke="#64818c" strokeWidth="4"/>
        <circle cx="85" cy="82" r="12" fill="#e8b365"/><circle cx="215" cy="82" r="12" fill="#e8b365"/>
        <text x="150" y="170" textAnchor="middle" fill="#58717d" fontWeight="800">पहले और बाद का कुल द्रव्यमान समान</text>
      </g>}
      {kind==='संकेत'&&<g>{['Na','O','Fe'].map((s,i)=><g key={s}><circle cx={80+i*70} cy="90" r="34" fill="#eef6fa" stroke="#6d99aa" strokeWidth="3"><animate attributeName="r" values="30;35;30" dur="2.4s" begin={`${i*.3}s`} repeatCount="indefinite"/></circle><text x={80+i*70} y="101" textAnchor="middle" fill="#416a80" fontSize="25" fontWeight="900">{s}</text></g>)}</g>}
      {kind==='संयोजन'&&<g>
        <circle cx="100" cy="95" r="28" fill="#dceef5" stroke="#5d8ea5" strokeWidth="3"/><circle cx="200" cy="95" r="42" fill="#e9f3dc" stroke="#6f9b61" strokeWidth="3"/>
        <line x1="130" y1="95" x2="170" y2="95" stroke="#6a8f9f" strokeWidth="5" strokeDasharray="10 7"><animate attributeName="stroke-dashoffset" values="0;-34" dur="1.8s" repeatCount="indefinite"/></line>
        <text x="150" y="158" textAnchor="middle" fill="#58717d" fontWeight="800">सरल पूर्णांक अनुपात</text>
      </g>}
      {kind==='गिनती'&&<g>{[0,1,2,3,4].map(i=><circle key={i} cx={70+i*40} cy="90" r="13" fill="#e8f1f6" stroke="#6c91a1" strokeWidth="3"><animate attributeName="r" values="5;13" dur=".5s" begin={`${i*.18}s`} fill="freeze"/></circle>)}<text x="150" y="145" textAnchor="middle" fill="#58717d" fontWeight="800">परमाणु गिनकर सूत्र समझें</text></g>}
    </svg>
  </div>;
}