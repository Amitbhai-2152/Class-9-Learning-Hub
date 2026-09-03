import React,{useState} from 'react';
import {ChapterContents} from './ChapterContents';
import {hindiPoetry3Lesson} from './hindiPoetry3Engine';

export function HindiPoetry3Learn({onBack,onModeComplete}){
 const [activeIndex,setActiveIndex]=useState(0);
 const active=hindiPoetry3Lesson.sections[activeIndex];
 return <div className="hindi-learn hindi-chapter1-learn">
  <div className="hindi-learn-banner"><span>{hindiPoetry3Lesson.eyebrow}</span><h2>{hindiPoetry3Lesson.title}</h2><p>{hindiPoetry3Lesson.intro}</p><div className="hindi-topic-author">✦ {hindiPoetry3Lesson.author}</div></div>
  <div className="hindi-ch1-callout"><strong>केंद्रीय बात</strong><p>{hindiPoetry3Lesson.overview}</p></div>
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>👤 कवि परिचय</h3><span>पाठ की पृष्ठभूमि</span></div><p>{hindiPoetry3Lesson.authorNote}</p></section>
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>🌱 आसान भाषा में गहराई</h3><span>कठिन विचारों को सरल उदाहरण से समझें</span></div><div className="hindi-ch1-two-col"><article><strong>मुख्य सूत्र</strong><p>श्रद्धा मन को स्थिर करती है → स्थिर मन सही निर्णय लेता है → सही निर्णय अच्छे कर्म बनते हैं → अच्छे कर्मों पर टिके रहना सच्चे साहस को मजबूत करता है।</p></article><article><strong>दोनों भाव-खंड</strong><p>पहले भाव-खंड में अच्छे कर्म, निर्भयता और आत्मबल की प्रार्थना है। दूसरे में ईश्वर की असीम और व्यापक सत्ता पर चिंतन है। दोनों मिलकर मूल्य-आधारित जीवन की दृष्टि देते हैं।</p></article><article><strong>निर्भयता बनाम लापरवाही</strong><p>निर्भय व्यक्ति डर के बावजूद विवेकपूर्ण सही कार्य करता है। लापरवाही में व्यक्ति परिणाम और उचित-अनुचित की परवाह किए बिना जोखिम ले सकता है। पाठ पहले गुण को महत्व देता है।</p></article><article><strong>शक्ति का अर्थ</strong><p>यहाँ शक्ति को केवल बाहरी सामर्थ्य न समझें। आत्मबल, संयम, अच्छे कर्म करने की क्षमता और कठिन समय में टिके रहने की शक्ति पाठ के गहरे अर्थ हैं।</p></article></div></section>
  <div style={{display:'grid',gridTemplateColumns:'minmax(210px,.34fr) minmax(0,1fr)',gap:'1rem',alignItems:'start'}}>
   <div style={{position:'sticky',top:'1rem'}}><ChapterContents lessons={hindiPoetry3Lesson.sections} title="गुरु गोविंद सिंह के पद · अध्ययन क्रम" compact activeIndex={activeIndex} onSelect={setActiveIndex}/></div>
   <div className="hindi-learn-grid">
    <section><h3>{active.title}</h3><p>{active.body}</p></section>
    <section><h3>🌱 आसान भाषा में गहराई</h3><p>{active.deep}</p></section>
    <section><h3>💡 सरल उदाहरण</h3><p>{active.example}</p></section>
    <section><h3>📝 परीक्षा-सूत्र</h3><p>{active.exam}</p></section>
    <section><h3>🧠 सोचकर समझें</h3><p>इस विचार को अपने विद्यार्थी जीवन से जोड़कर सोचें: कठिन परिस्थिति में सही काम चुनने के लिए कौन-सा गुण सबसे अधिक जरूरी है और क्यों?</p></section>
   </div>
  </div>
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>⚖️ प्रमुख विचार और अर्थ</h3><span>विचार → अर्थ → जीवन-संदेश</span></div><div className="hindi-ch1-two-col">{hindiPoetry3Lesson.comparison.map(([title,nature,origin,style])=><article key={title}><strong>{title}</strong><p><b>विचार:</b> {nature}</p><p><b>अर्थ:</b> {origin}</p><p><b>संदेश:</b> {style}</p></article>)}</div></section>
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>🎯 मुख्य भाव</h3><span>दीर्घ उत्तरों में उपयोगी बिंदु</span></div><div className="hindi-ch1-chip-grid">{hindiPoetry3Lesson.themes.map(x=><span key={x}>{x}</span>)}</div></section>
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>🖊️ काव्य-शिल्प</h3><span>कवि भाव को प्रभावी कैसे बनाते हैं?</span></div><div className="hindi-ch1-two-col">{hindiPoetry3Lesson.literaryTools.map(([title,body])=><article key={title}><strong>{title}</strong><p>{body}</p></article>)}</div></section>
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>📚 शब्द-संग्रह</h3><span>कठिन शब्दों का सरल अर्थ</span></div><div className="hindi-ch1-glossary">{hindiPoetry3Lesson.glossary.map(([word,meaning])=><article key={word}><strong>{word}</strong><p>{meaning}</p></article>)}</div></section>
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>✍️ उत्तर बनाने के ढाँचे</h3><span>लघु और दीर्घ उत्तर</span></div><div className="hindi-ch1-frameworks">{hindiPoetry3Lesson.answerFrameworks.map(([q,template])=><article key={q}><strong>{q}</strong><p>{template}</p></article>)}</div></section>
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>⚠️ परीक्षा में होने वाली सामान्य गलतियाँ</h3><span>इनसे बचें</span></div><ul><li>निर्भयता को लापरवाही न लिखें।</li><li>शक्ति का अर्थ केवल बाहरी बल न मानें; आत्मबल और अच्छे कर्म से जोड़ें।</li><li>‘नेति-नेति’ को केवल नकार न समझें; इसे ईश्वर की असीमता का संकेत लिखें।</li><li>वीर रस लिखकर उत्तर छोड़ न दें; साहस और नैतिक दृढ़ता भी समझाएँ।</li><li>दीर्घ उत्तर में केवल तथ्य न लिखें—भावार्थ और जीवन-संदेश भी जोड़ें।</li></ul></section>
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>🏆 10 महारत-बिंदु</h3><span>अंतिम पुनरावृत्ति</span></div><div className="hindi-ch1-glossary">{hindiPoetry3Lesson.examChecklist.map((x,i)=><article key={x}><strong>{i+1}</strong><p>{x}</p></article>)}</div></section>
  <div className="hindi-actions"><button type="button" className="secondary-btn pressable" onClick={onBack}>← पीछे</button><button type="button" className="primary-btn pressable" onClick={()=>onModeComplete?.('learn')}>✓ सीखना पूरा करें • +20 XP</button></div>
 </div>;
}
