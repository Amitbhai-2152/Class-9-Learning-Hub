import React,{useMemo,useState} from 'react';
import './sanskrit-grammar.css';

const topics=[
 {id:'vachan',icon:'🔢',title:'वचन एवं रूप',tag:'रूप-अभ्यास',lesson:'एकवचन, द्विवचन और बहुवचन में शब्द-रूपों का प्रयोग पहचानना और बनाना सीखें।',questions:[
  {q:'“बालकौ” किस वचन का रूप है?',options:['एकवचन','द्विवचन','बहुवचन','अव्यय'],answer:1,explain:'“बालकौ” में दो बालकों का बोध होता है, इसलिए यह द्विवचन है।'},
  {q:'“बालकाः” किस वचन का रूप है?',options:['एकवचन','द्विवचन','बहुवचन','कोई नहीं'],answer:2,explain:'अन्त में “आः” वाला यह रूप अनेक बालकों के लिए प्रयुक्त होता है।'}]},
 {id:'karaka',icon:'🧩',title:'कारक-विभक्ति',tag:'वाक्य-विश्लेषण',lesson:'कर्ता, कर्म, करण, सम्प्रदान, अपादान, सम्बन्ध, अधिकरण और सम्बोधन का प्रयोग समझें।',questions:[
  {q:'“रामः पुस्तकं पठति” में “पुस्तकम्” कौन-सा कारक है?',options:['कर्ता','कर्म','करण','अधिकरण'],answer:1,explain:'जिस पर क्रिया का प्रभाव पड़ता है, वह कर्म कारक होता है।'},
  {q:'“रामेण पत्रं लिख्यते” में “रामेण” किस कारक का संकेत है?',options:['कर्म','करण','सम्बन्ध','अधिकरण'],answer:1,explain:'“रामेण” तृतीया विभक्ति में है और करण का बोध कराता है।'}]},
 {id:'upasarga',icon:'➕',title:'उपसर्ग',tag:'शब्द-निर्माण',lesson:'प्र, परा, अप, सम्, अनु, अव, नि, उप आदि उपसर्गों से अर्थ में होने वाले परिवर्तन को पहचानें।',questions:[
  {q:'उपसर्ग का मुख्य कार्य क्या है?',options:['शब्द का अर्थ बदलना या विशेष बनाना','केवल वचन बदलना','केवल लिंग बदलना','वाक्य समाप्त करना'],answer:0,explain:'उपसर्ग मूल शब्द के अर्थ में परिवर्तन, विशेषता या दिशा का संकेत दे सकता है।'},
  {q:'“उपगच्छति” में उपसर्ग कौन-सा है?',options:['उप','गच्छ','ति','उपग'],answer:0,explain:'“उप” उपसर्ग है और “गम्” धातु से बने रूप के अर्थ को प्रभावित करता है।'}]},
 {id:'pratyaya',icon:'🧱',title:'प्रत्यय',tag:'रूप-निर्माण',lesson:'मूल शब्द या धातु के साथ प्रत्यय जुड़ने पर बनने वाले नए रूप और अर्थ को समझें।',questions:[
  {q:'प्रत्यय सामान्यतः कहाँ जुड़ता है?',options:['शब्द के आरम्भ में','शब्द के अन्त में','केवल वाक्य के बीच','केवल सर्वनाम के साथ'],answer:1,explain:'प्रत्यय सामान्यतः मूल शब्द या धातु के बाद जुड़कर नया रूप बनाता है।'},
  {q:'प्रत्यय-अध्ययन का सबसे उपयोगी लाभ क्या है?',options:['शब्द-निर्माण समझना','केवल विराम-चिह्न सीखना','केवल पठन गति बढ़ाना','केवल संख्याएँ याद करना'],answer:0,explain:'प्रत्यय से शब्दों के निर्माण और अर्थ-संबंध को समझना आसान होता है।'}]},
 {id:'sandhi',icon:'🔗',title:'संधि',tag:'ध्वनि-परिवर्तन',lesson:'दो वर्णों या शब्द-खंडों के मेल से होने वाले ध्वनि-परिवर्तन को पहचानें और संधि-विच्छेद का अभ्यास करें।',questions:[
  {q:'संधि का मूल अर्थ क्या है?',options:['मेल','वियोग','संख्या','वर्णक्रम'],answer:0,explain:'संधि का अर्थ है दो ध्वनियों/वर्णों के मिलने पर होने वाला परिवर्तन।'},
  {q:'संधि-विच्छेद में क्या किया जाता है?',options:['मिले हुए रूप को मूल घटकों में अलग किया जाता है','शब्द का अर्थ मिटाया जाता है','वचन बदला जाता है','लिंग हटाया जाता है'],answer:0,explain:'संधि-विच्छेद में संयुक्त रूप के मूल शब्द या वर्ण-घटक पहचाने जाते हैं।'}]},
 {id:'samas',icon:'🧠',title:'समास',tag:'संक्षिप्त पद-रचना',lesson:'दो या अधिक पदों के संक्षिप्त रूप से बने समस्त पद और उसके विग्रह को पहचानें।',questions:[
  {q:'समास का प्रमुख उद्देश्य क्या है?',options:['संक्षिप्त एवं सारगर्भित पद बनाना','वाक्य को अनिवार्यतः लंबा करना','केवल क्रिया बदलना','केवल संख्या लिखना'],answer:0,explain:'समास से अनेक पदों के स्थान पर संक्षिप्त समस्त पद बनाया जाता है।'},
  {q:'समास-विग्रह में क्या किया जाता है?',options:['समस्त पद का विस्तृत अर्थ/वाक्यांश बताया जाता है','शब्द को उल्टा पढ़ा जाता है','वचन मिटाया जाता है','केवल उच्चारण बदला जाता है'],answer:0,explain:'विग्रह समस्त पद के भीतर छिपे संबंध को स्पष्ट करता है।'}]},
];

function TopicQuiz({topic}){
 const [picked,setPicked]=useState({}); const [checked,setChecked]=useState(false);
 const score=useMemo(()=>topic.questions.reduce((n,q,i)=>n+(picked[i]===q.answer?1:0),0),[picked,topic]);
 return <div className="sg-topic-panel"><div className="sg-panel-head"><div><span>{topic.tag}</span><h3>{topic.title}</h3></div><strong>{checked?`${score}/${topic.questions.length}`:'2 प्रश्न'}</strong></div><p className="sg-lesson">{topic.lesson}</p>{topic.questions.map((q,i)=><article className="sg-question" key={q.q}><h4>{i+1}. {q.q}</h4><div className="sg-options">{q.options.map((o,j)=><button type="button" key={o} disabled={checked} className={`sg-option ${picked[i]===j?'picked':''} ${checked&&j===q.answer?'correct':''} ${checked&&picked[i]===j&&j!==q.answer?'wrong':''}`} onClick={()=>setPicked(v=>({...v,[i]:j}))}>{String.fromCharCode(65+j)}. {o}</button>)}</div>{checked&&<p className="sg-explain">{q.explain}</p>}</article>)}<button type="button" className="primary-btn pressable" disabled={Object.keys(picked).length!==topic.questions.length||checked} onClick={()=>setChecked(true)}>{checked?'अभ्यास पूरा ✓':'उत्तर जाँचें'}</button></div>;
}

export function SanskritGrammarLab(){
 const [active,setActive]=useState('vachan'); const topic=topics.find(t=>t.id===active)||topics[0];
 return <section className="sanskrit-grammar-lab"><div className="sg-hero"><div><span className="sanskrit-kicker">Grammar Lab</span><h2>संस्कृत व्याकरण प्रयोगशाला</h2><p>छह core grammar topics को छोटे lesson + immediate practice के साथ पढ़ें।</p></div><div className="sg-hero-stat"><b>6</b><span>मुख्य topics</span></div></div><div className="sg-topic-tabs">{topics.map(t=><button type="button" key={t.id} className={active===t.id?'active':''} onClick={()=>setActive(t.id)}><span>{t.icon}</span>{t.title}</button>)}</div><TopicQuiz topic={topic}/><div className="sg-checklist"><strong>Exam checklist</strong><span>रूप → कारक → उपसर्ग/प्रत्यय → संधि → समास</span></div></section>;
}
