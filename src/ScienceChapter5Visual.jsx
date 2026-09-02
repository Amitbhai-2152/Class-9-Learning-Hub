import React from 'react';

const scenes={
  cell:{title:'कोशिका की मूल योजना',label:'झिल्ली के भीतर कोशिकाद्रव्य और केंद्रक को योजनात्मक रूप में देखें',kind:'cell',items:['कोशिका झिल्ली','कोशिकाद्रव्य','केंद्रक']},
  singleMulti:{title:'एककोशिकीय और बहुकोशिकीय',label:'एक कोशिका बनाम अनेक कोशिकाओं का कार्य-विभाजन',kind:'compare',items:['एककोशिकीय: एक कोशिका','बहुकोशिकीय: अनेक कोशिकाएँ','विशेषीकृत कार्य-विभाजन']},
  plantAnimal:{title:'पादप और जन्तु कोशिका',label:'साझा भाग और पादप कोशिका की प्रमुख विशिष्ट संरचनाएँ',kind:'compareCell',items:['दोनों में: झिल्ली, कोशिकाद्रव्य, केंद्रक','पादप में: कोशिका भित्ति','पादप में: हरितलवक व बड़ी रिक्तिका']},
  membrane:{title:'चयनात्मक पारगम्य कोशिका झिल्ली',label:'झिल्ली पदार्थों के आवागमन को नियंत्रित करती है',kind:'flow',items:['बाहरी वातावरण','चयनात्मक झिल्ली','कोशिका का आंतरिक भाग']},
  wall:{title:'कोशिका भित्ति और झिल्ली',label:'पादप कोशिका की बाहरी मजबूत परत और उसके भीतर झिल्ली',kind:'layers',items:['कोशिका भित्ति — सहारा','कोशिका झिल्ली — नियंत्रण','कोशिकाद्रव्य — आंतरिक भाग']},
  nucleus:{title:'केंद्रक',label:'आनुवंशिक पदार्थ और कोशिकीय नियंत्रण से जुड़ी संरचना',kind:'nucleus',items:['गुणसूत्र','आनुवंशिक पदार्थ','नियंत्रण में भूमिका']},
  mitochondria:{title:'माइटोकॉन्ड्रिया',label:'कोशिकीय श्वसन से उपयोगी ऊर्जा उपलब्ध कराने में प्रमुख भूमिका',kind:'organelle',symbol:'ऊर्जा',items:['कोशिकीय श्वसन','एटीपी निर्माण','ऊर्जा की उपलब्धता']},
  chloroplast:{title:'हरितलवक',label:'हरितलवक में क्लोरोफिल होता है और प्रकाश संश्लेषण में भूमिका होती है',kind:'organelle',symbol:'प्रकाश',items:['क्लोरोफिल','प्रकाश संश्लेषण','पादप कोशिका']},
  vacuole:{title:'रिक्तिकाय',label:'भंडारण और पादप कोशिका में तुर्गता बनाए रखने में सहायक',kind:'vacuole',items:['जल व घुले पदार्थों का भंडारण','बड़ी केंद्रीय रिक्तिका','आंतरिक दाब में सहायता']},
  er:{title:'अंतर्द्रव्यी जालिका',label:'झिल्लीदार जालिका — निर्माण और आंतरिक परिवहन से जुड़ी',kind:'er',items:['खुरदरी जालिका + राइबोसोम','चिकनी जालिका','आंतरिक परिवहन']},
  golgi:{title:'गॉल्जी तंत्र',label:'पदार्थों के संशोधन, छँटाई और पैकेजिंग में सहायता',kind:'golgi',items:['संशोधन','छँटाई','पैकेजिंग']},
  lysosome:{title:'लाइसोसोम',label:'पाचनकारी एंजाइमों से अवांछित पदार्थों के अपघटन में सहायता',kind:'organelle',symbol:'अपघटन',items:['पाचनकारी एंजाइम','अवांछित पदार्थ','अपघटन']},
  osmosis:{title:'परासरण',label:'अर्धपारगम्य झिल्ली के पार जल का संचरण',kind:'flow',items:['अधिक जल-सांद्रता','अर्धपारगम्य झिल्ली','कम जल-सांद्रता की ओर']},
  compareCells:{title:'पादप बनाम जन्तु कोशिका',label:'दोनों के साझा भाग और पादप कोशिका की प्रमुख अतिरिक्त संरचनाएँ',kind:'compareCell',items:['साझा: झिल्ली, कोशिकाद्रव्य, केंद्रक','पादप: कोशिका भित्ति','पादप: हरितलवक व बड़ी रिक्तिका']},
  factory:{title:'कोशिका = व्यवस्थित प्रणाली',label:'अलग कोशिकांग अलग कार्य करके पूरी कोशिका को व्यवस्थित रखते हैं',kind:'factory',items:['निर्देश','निर्माण','ऊर्जा','पैकेजिंग']},
  division:{title:'कोशिका विभाजन',label:'वृद्धि और नई कोशिकाओं के निर्माण में विभाजन की भूमिका',kind:'division',items:['मूल कोशिका','आनुवंशिक पदार्थ का वितरण','नई कोशिकाएँ']},
  prokaryote:{title:'प्रोकैरियोटिक कोशिका',label:'सुस्पष्ट झिल्ली-बद्ध केंद्रक के बिना कोशिकीय संगठन',kind:'prokaryote',items:['झिल्ली-बद्ध केंद्रक नहीं','सरल आंतरिक संगठन','उदाहरण: जीवाणु']},
  eukaryote:{title:'यूकैरियोटिक कोशिका',label:'झिल्ली-बद्ध केंद्रक और अनेक कोशिकांगों वाला संगठन',kind:'eukaryote',items:['सुस्पष्ट केंद्रक','झिल्ली-बद्ध कोशिकांग','पौधे और जन्तु']}
};

const box=(label,extra={})=><div style={{padding:'12px 14px',border:'1px solid #d3e5e1',borderRadius:14,background:'#fff',color:'#34534f',fontWeight:850,textAlign:'center',...extra}}>{label}</div>;

function CellDiagram(){return <div style={styles.stage}><div style={styles.cellOuter}><div style={styles.cytoplasm}><div style={styles.nucleus}>केंद्रक<small>आनुवंशिक पदार्थ</small></div><span style={styles.labelTop}>कोशिकाद्रव्य</span></div><span style={styles.labelBottom}>कोशिका झिल्ली</span></div></div>}
function CompareDiagram(){return <div style={{...styles.stage,display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}><div>{box('जन्तु कोशिका',{marginBottom:8})}<div style={styles.miniList}>झिल्ली<br/>कोशिकाद्रव्य<br/>केंद्रक</div></div><div>{box('पादप कोशिका',{marginBottom:8})}<div style={styles.miniList}>झिल्ली + भित्ति<br/>कोशिकाद्रव्य + केंद्रक<br/>हरितलवक + बड़ी रिक्तिका</div></div></div>}
function FlowDiagram({osmosis=false}){return <div style={styles.flow}><div style={styles.flowRow}>{box(osmosis?'अधिक जल-सांद्रता':'बाहरी वातावरण')}<span style={styles.arrow}>→</span>{box(osmosis?'अर्धपारगम्य झिल्ली':'चयनात्मक झिल्ली',{background:'#eaf6f3'})}<span style={styles.arrow}>→</span>{box(osmosis?'कम जल-सांद्रता':'आंतरिक भाग')}</div><p style={styles.note}>{osmosis?'परासरण में जल का संचरण झिल्ली के पार होता है।':'झिल्ली पदार्थों के आवागमन को चयनात्मक रूप से नियंत्रित करती है।'}</p></div>}
function LayersDiagram(){return <div style={styles.layers}>{box('कोशिका भित्ति',{background:'#eef7e9'})}<div style={{padding:4}}>{box('कोशिका झिल्ली',{background:'#eaf6f3'})}<div style={{padding:12,textAlign:'center',color:'#58716d'}}>कोशिकाद्रव्य</div></div></div>}
function NucleusDiagram(){return <div style={styles.stage}><div style={{width:150,height:150,borderRadius:'50%',border:'9px solid #9ccfc3',display:'grid',placeItems:'center',background:'#edf8f5',textAlign:'center',fontWeight:900,color:'#235d56'}}>केंद्रक<small style={{display:'block',fontWeight:700}}>गुणसूत्र<br/>आनुवंशिक पदार्थ</small></div></div>}
function OrganelleDiagram({symbol}){return <div style={styles.stage}><div style={{width:'min(240px,82vw)',minHeight:105,borderRadius:40,border:'3px solid #8fc4ba',display:'grid',placeItems:'center',background:'#eff9f7',textAlign:'center',fontWeight:900,color:'#2f6e67',padding:16,boxSizing:'border-box'}}>{symbol}<small style={{display:'block',fontWeight:700,marginTop:4}}>कार्य-केंद्रित संकेत</small></div></div>}
function ERDiagram(){return <div style={styles.stage}><div style={{display:'grid',gap:7,width:'min(100%,420px)'}}>{['राइबोसोमयुक्त खुरदरी जालिका','झिल्लीदार नलिकाएँ','चिकनी अंतर्द्रव्यी जालिका'].map((x,i)=><div key={x} style={{padding:'9px 12px',border:'2px solid #9bcfc6',borderRadius:20,background:i===0?'#e9f6f3':'#f6fbfa',color:'#3d625d',fontWeight:850,textAlign:'center'}}>{x}</div>)}</div></div>}
function GolgiDiagram(){return <div style={{...styles.stage,display:'grid',gap:6}}>{['प्राप्त सामग्री','संशोधन','छँटाई','पैकेजिंग'].map((x,i)=><React.Fragment key={x}><div style={{padding:'9px 15px',borderRadius:20,border:'1px solid #cfe3df',background:i===3?'#e8f5f1':'#fff',fontWeight:850,color:'#3d5f5a',textAlign:'center'}}>{x}</div>{i<3&&<div style={{textAlign:'center',color:'#43847c',fontSize:20}}>↓</div>}</React.Fragment>)}</div>}
function VacuoleDiagram(){return <div style={styles.stage}><div style={{width:'min(280px,85vw)',height:135,borderRadius:28,border:'3px solid #91c6bc',background:'#eaf7f4',display:'grid',placeItems:'center',textAlign:'center',color:'#39706a',fontWeight:900}}>केंद्रीय रिक्तिका<small>जल + घुले पदार्थ</small></div></div>}
function DivisionDiagram(){return <div style={styles.flow}><div style={styles.flowRow}>{box('मूल कोशिका')}<span style={styles.arrow}>→</span>{box('विभाजन',{background:'#eaf6f3'})}<span style={styles.arrow}>→</span>{box('नई कोशिकाएँ')}</div><p style={styles.note}>नई कोशिकाओं के निर्माण में कोशिका विभाजन महत्वपूर्ण है।</p></div>}
function FactoryDiagram(){return <div style={{...styles.stage,display:'grid',gridTemplateColumns:'repeat(4,minmax(0,1fr))',gap:8}}>{[['निर्देश','केंद्रक'],['निर्माण','राइबोसोम'],['ऊर्जा','माइटोकॉन्ड्रिया'],['पैकेजिंग','गॉल्जी']].map(([a,b])=><div key={a} style={{padding:'12px 8px',border:'1px solid #d5e7e3',borderRadius:13,background:'#fff',textAlign:'center'}}><b style={{display:'block',color:'#2f6e67',fontSize:12}}>{a}</b><span style={{display:'block',marginTop:5,color:'#5e716d',fontSize:11}}>{b}</span></div>)}</div>}
function ProkEukDiagram(){return <div style={{...styles.stage,display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}><div>{box('प्रोकैरियोटिक',{marginBottom:8})}<div style={styles.miniList}>झिल्ली-बद्ध केंद्रक नहीं<br/>सरल संगठन<br/>जीवाणु</div></div><div>{box('यूकैरियोटिक',{marginBottom:8})}<div style={styles.miniList}>सुस्पष्ट केंद्रक<br/>अनेक कोशिकांग<br/>पौधे और जन्तु</div></div></div>}

const styles={stage:{minHeight:165,display:'grid',placeItems:'center',padding:16,border:'1px solid #d9e9e6',borderRadius:16,background:'#f7fcfb'},cellOuter:{width:'min(330px,82vw)',height:170,borderRadius:40,border:'5px solid #76afa6',background:'#f0f9f7',padding:10,boxSizing:'border-box',position:'relative'},cytoplasm:{width:'100%',height:'100%',borderRadius:32,background:'#e3f4ef',position:'relative',display:'grid',placeItems:'center'},nucleus:{width:90,height:90,borderRadius:'50%',background:'#c5e4dc',border:'3px solid #66a79e',display:'grid',placeItems:'center',textAlign:'center',fontWeight:900,color:'#285f58'},labelTop:{position:'absolute',left:12,top:12,fontSize:12,fontWeight:800,color:'#4f756f'},labelBottom:{position:'absolute',bottom:-24,left:0,right:0,textAlign:'center',fontSize:12,fontWeight:850,color:'#3f6d66'},miniList:{padding:12,border:'1px solid #dbe9e6',borderRadius:12,background:'#fbfefd',lineHeight:1.8,color:'#58716d',fontSize:13,fontWeight:750,textAlign:'center'},flow:{width:'100%',textAlign:'center'},flowRow:{display:'grid',gridTemplateColumns:'minmax(80px,1fr) 28px minmax(90px,1fr) 28px minmax(80px,1fr)',alignItems:'center',gap:6},arrow:{fontSize:22,fontWeight:900,color:'#43847c'},note:{margin:'13px 0 0',color:'#617873',fontSize:13,lineHeight:1.6},layers:{width:'min(360px,90vw)',padding:14,border:'2px solid #99c7be',borderRadius:20,background:'#f0f8ed',textAlign:'center'}};

export function ScienceChapter5Visual({kind='cell'}){
 const scene=scenes[kind]||scenes.cell;
 let diagram=<CellDiagram/>;
 if(scene.kind==='compare'||scene.kind==='compareCell')diagram=<CompareDiagram/>;
 if(scene.kind==='flow')diagram=<FlowDiagram osmosis={kind==='osmosis'}/>;
 if(scene.kind==='layers')diagram=<LayersDiagram/>;
 if(scene.kind==='nucleus')diagram=<NucleusDiagram/>;
 if(scene.kind==='organelle')diagram=<OrganelleDiagram symbol={scene.symbol}/>;
 if(scene.kind==='er')diagram=<ERDiagram/>;
 if(scene.kind==='golgi')diagram=<GolgiDiagram/>;
 if(scene.kind==='vacuole')diagram=<VacuoleDiagram/>;
 if(scene.kind==='division')diagram=<DivisionDiagram/>;
 if(scene.kind==='factory')diagram=<FactoryDiagram/>;
 if(scene.kind==='prokaryote'||scene.kind==='eukaryote')diagram=<ProkEukDiagram/>;
 return <div style={{margin:'18px 0 4px',padding:16,borderRadius:17,border:'1px solid #dcebe8',background:'linear-gradient(180deg,#fbffff,#eef7f5)'}} aria-label={`अवधारणा का दृश्य: ${scene.title}`}>
   <div style={{display:'grid',gap:6,marginBottom:12}}><span style={{fontSize:10,fontWeight:900,color:'#3d827c',letterSpacing:'.08em'}}>अध्याय दृश्य</span><strong style={{fontSize:16,color:'#284744'}}>{scene.title}</strong><span style={{fontSize:13,color:'#5d736f',lineHeight:1.55}}>{scene.label}</span></div>
   {diagram}
   <div style={{display:'grid',gap:7,marginTop:13}}><b style={{fontSize:12,color:'#3a6f68'}}>मुख्य बातें</b>{scene.items.map((item,i)=><div key={`${item}-${i}`} style={{display:'flex',gap:7,alignItems:'center',padding:'8px 10px',border:'1px solid #dceae7',borderRadius:10,background:'#fff',color:'#4f6864',fontSize:12,fontWeight:750}}><span style={{width:21,height:21,borderRadius:7,display:'grid',placeItems:'center',background:'#e6f4f1',color:'#31756e',fontSize:10,fontWeight:900}}>{i+1}</span>{item}</div>)}</div>
 </div>;
}

export default ScienceChapter5Visual;
