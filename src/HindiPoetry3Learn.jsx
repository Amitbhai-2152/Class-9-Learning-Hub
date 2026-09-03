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
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>🌱 आसान भाषा में पूरे पाठ की सरल व्याख्या</h3><span>पहले पूरे पाठ को समझें, फिर गहराई में जाएँ</span></div>
   <div className="hindi-ch1-two-col">
    <article><strong>📖 पाठ का मुख्य अर्थ</strong><p>गुरु गोविंद सिंह के पदों में ईश्वर के प्रति गहरी श्रद्धा के साथ मनुष्य के भीतर साहस, आत्मबल और अच्छे कर्मों की भावना दिखाई देती है। कवि ऐसे जीवन की प्रेरणा देते हैं जिसमें व्यक्ति कठिन परिस्थितियों से घबराए नहीं, अपने कर्तव्य से पीछे न हटे और सही रास्ते पर दृढ़ बना रहे।</p></article>
    <article><strong>🧒 बिल्कुल आसान शब्दों में</strong><p>इस पाठ को सरल रूप में ऐसे समझें—ईश्वर महान और व्यापक हैं। हमें उन पर विश्वास रखते हुए अच्छे काम करने चाहिए। जीवन में डर या परेशानी आए तो हिम्मत नहीं हारनी चाहिए। अपने मन को मजबूत रखना चाहिए और सही काम करते रहना चाहिए।</p></article>
    <article><strong>🙏 भक्ति का सरल अर्थ</strong><p>यहाँ भक्ति केवल ईश्वर को याद करने तक सीमित नहीं है। सच्ची श्रद्धा मनुष्य के व्यवहार को भी बेहतर बनाती है। जब व्यक्ति अपने भीतर विश्वास और अनुशासन पैदा करता है, तो वह कठिन समय में भी विवेक से निर्णय ले सकता है और अच्छे कर्मों पर टिक सकता है।</p></article>
    <article><strong>🛡️ वीरता का सरल अर्थ</strong><p>पाठ में वीरता को केवल बाहरी शक्ति के रूप में नहीं समझना चाहिए। असली साहस तब दिखाई देता है जब व्यक्ति डर, कठिनाई या दबाव के बावजूद सही काम चुनता है। इसलिए आत्मबल, धैर्य, आत्मसंयम और कर्तव्यनिष्ठा भी वीरता के महत्वपूर्ण रूप हैं।</p></article>
    <article><strong>🌌 ईश्वर की व्यापकता</strong><p>पदों का एक महत्वपूर्ण भाव यह है कि ईश्वर को किसी एक सीमित रूप, नाम या पहचान में पूरी तरह बाँधा नहीं जा सकता। उनकी सत्ता व्यापक मानी गई है। यह विचार मनुष्य में श्रद्धा के साथ विनम्रता भी पैदा करता है और उसे समझाता है कि उसकी अपनी समझ सीमित हो सकती है।</p></article>
    <article><strong>💪 आत्मबल और दृढ़ निश्चय</strong><p>कठिन समय में केवल समस्या को देखना पर्याप्त नहीं है; व्यक्ति को अपने भीतर से शक्ति जुटानी होती है। पाठ हमें बताता है कि अच्छे उद्देश्य को स्वीकार करने के बाद कठिनाइयों से डरकर पीछे हटना नहीं चाहिए। धैर्य और लगातार सही प्रयास ही दृढ़ निश्चय को मजबूत करते हैं।</p></article>
    <article><strong>🌱 विद्यार्थी जीवन से संबंध</strong><p>मान लो परीक्षा कठिन है, किसी विषय में बार-बार गलती हो रही है या परिणाम उम्मीद के अनुसार नहीं आया। ऐसे समय में पढ़ाई छोड़ देना आसान है, लेकिन गलती पहचानकर दोबारा अभ्यास करना आत्मबल है। इसी तरह गलत काम के लिए साथियों के दबाव में न आना नैतिक साहस का उदाहरण है।</p></article>
    <article><strong>🎯 पूरे पाठ का संदेश</strong><p>पाठ का व्यापक संदेश है कि श्रद्धा, अच्छे कर्म, आत्मसंयम, साहस और कर्तव्यनिष्ठा को जीवन में साथ लेकर चलना चाहिए। केवल शक्ति का प्रदर्शन महत्वपूर्ण नहीं है; शक्ति का सही और नैतिक उपयोग तथा कठिन परिस्थितियों में सही रास्ते पर टिके रहना अधिक महत्वपूर्ण है।</p></article>
   </div>
  </section>
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>🔎 सरल समझ की कुंजी</h3><span>एक नज़र में पूरे पाठ का flow</span></div><div className="hindi-ch1-two-col"><article><strong>श्रद्धा → आत्मबल</strong><p>ईश्वर में विश्वास मन को स्थिर और आशावान रखने में मदद करता है।</p></article><article><strong>आत्मबल → साहस</strong><p>मजबूत मन कठिन परिस्थितियों में घबराने के बजाय सोच-समझकर निर्णय लेने में सक्षम होता है।</p></article><article><strong>साहस → अच्छे कर्म</strong><p>सच्चा साहस व्यक्ति को सही काम करने और गलत दबाव से बचने की शक्ति देता है।</p></article><article><strong>अच्छे कर्म → कर्तव्यनिष्ठ जीवन</strong><p>जब व्यक्ति लगातार सही कार्य करता है, तो उसके जीवन में अनुशासन और नैतिक दृढ़ता विकसित होती है।</p></article></div></section>
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>🧠 पाठ को एक कहानी की तरह समझें</h3><span>याद रखने का आसान तरीका</span></div><p>कल्पना कीजिए कि एक विद्यार्थी किसी कठिन परिस्थिति में है। उसे डर लगता है, लेकिन वह पहले अपने मन को शांत करता है। फिर सोचता है कि सही काम क्या है। वह कठिनाई के कारण अपना कर्तव्य नहीं छोड़ता और लगातार प्रयास करता है। यही क्रम—<strong>विश्वास → मन की दृढ़ता → सही निर्णय → अच्छे कर्म → साहस</strong>—इस पाठ की मूल जीवन-दृष्टि को सरल तरीके से समझने में मदद करता है।</p></section>
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
