import React,{useState} from 'react';
import {ChapterContents} from './ChapterContents';
import {hindiPoetry4Lesson} from './hindiPoetry4Engine';

export function HindiPoetry4Learn({onBack,onModeComplete}){
 const [activeIndex,setActiveIndex]=useState(0);
 const active=hindiPoetry4Lesson.sections[activeIndex];
 return <div className="hindi-learn hindi-chapter1-learn">
  <div className="hindi-learn-banner"><span>{hindiPoetry4Lesson.eyebrow}</span><h2>{hindiPoetry4Lesson.title}</h2><p>{hindiPoetry4Lesson.intro}</p><div className="hindi-topic-author">✦ {hindiPoetry4Lesson.author}</div></div>
  <div className="hindi-ch1-callout"><strong>केंद्रीय बात</strong><p>{hindiPoetry4Lesson.overview}</p></div>
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>👤 कवि परिचय</h3><span>पाठ की पृष्ठभूमि</span></div><p>{hindiPoetry4Lesson.authorNote}</p></section>
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>🌱 आसान भाषा में पूरे पाठ की सरल व्याख्या</h3><span>पहले पूरी कविता समझें, फिर पंक्ति-भाव की गहराई में जाएँ</span></div>
   <div className="hindi-ch1-two-col">
    <article><strong>📖 कविता का मुख्य अर्थ</strong><p>‘पलक पाँवड़े’ में कवि प्रातःकाल के समय प्रकृति के अत्यंत सुंदर रूप को देखते हैं। आकाश में लालिमा है, सूर्य की किरणें फैल रही हैं, फूल और लताएँ मन मोह रहे हैं, जल चमक रहा है और हवा वातावरण को ताजगी से भर रही है। ऐसा लगता है जैसे पूरी प्रकृति किसी बहुत प्रिय और शुभ आगमन के स्वागत के लिए सज गई हो।</p></article>
    <article><strong>🧒 बिल्कुल आसान शब्दों में</strong><p>इस कविता को ऐसे समझिए—सुबह हो रही है और सूरज निकल रहा है। चारों ओर सुंदर रोशनी, हरियाली, फूल, हवा और चमकता पानी दिखाई दे रहा है। कवि को यह सुबह साधारण सुबह नहीं लगती। उन्हें लगता है कि कोई बहुत बड़ा और अच्छा बदलाव आने वाला है, इसलिए प्रकृति भी खुशी से उसका स्वागत कर रही है।</p></article>
    <article><strong>🌅 भोर केवल सुबह नहीं</strong><p>कविता की भोर का एक बाहरी अर्थ है—रात के बाद आने वाली सुबह। लेकिन इसका एक गहरा अर्थ भी है—अंधकार के बाद प्रकाश, निराशा के बाद आशा और पुराने समय के बाद नए समय का आना। इसी कारण उगता सूर्य कविता में नए आरंभ और नवचेतना का संकेत बन जाता है।</p></article>
    <article><strong>🌿 प्रकृति क्यों सजती हुई लगती है?</strong><p>फूलों, लताओं, हरियाली, हवा और जल का सुंदर रूप देखकर कवि को लगता है कि प्रकृति स्वयं किसी विशेष अतिथि का स्वागत कर रही है। वास्तव में प्रकृति मनुष्य की तरह सचमुच तैयारी नहीं करती, लेकिन कवि कल्पना के माध्यम से उसे मानवीय रूप देते हैं। इससे कविता का दृश्य अधिक जीवंत और भावपूर्ण बन जाता है।</p></article>
    <article><strong>✨ प्रकाश और रंगों का भाव</strong><p>उगते सूर्य की लालिमा और जल पर पड़ती चमक पूरे दृश्य को उत्सव जैसा बना देती है। रंग और प्रकाश केवल सुंदरता नहीं बढ़ाते, बल्कि मन में ऊर्जा और आशा भी पैदा करते हैं। इसलिए कविता में प्राकृतिक रंग कवि के आनंद और नए भविष्य की उम्मीद से जुड़ जाते हैं।</p></article>
    <article><strong>💨 हवा, फूल और जल मिलकर क्या करते हैं?</strong><p>हल्की हवा वातावरण में ताजगी और सुगंध का अनुभव कराती है। फूल और लताएँ दृश्य को कोमल और रंगीन बनाती हैं। जल पर सूर्य की किरणें चमक पैदा करती हैं। इन सभी तत्वों को साथ देखने पर पाठक के मन में एक ऐसा शांत लेकिन उत्सवपूर्ण दृश्य बनता है जिसमें प्रकृति जीवित और स्वागत करती हुई लगती है।</p></article>
    <article><strong>👀 कवि की प्रतीक्षा</strong><p>कवि की आँखें किसी ऐसे आगमन की राह देखते-देखते थक गई हैं जिसका उन्हें बहुत समय से इंतजार है। यहाँ प्रतीक्षा की तीव्रता दिखाई देती है। यह केवल किसी व्यक्ति के आने की प्रतीक्षा नहीं, बल्कि उस शुभ परिवर्तन की उत्कंठा है जो जीवन और देश के लिए नए प्रभात का संकेत बन सकता है।</p></article>
    <article><strong>🕊️ स्वतंत्रता और नवजागरण का गहरा संकेत</strong><p>कविता के गहरे भावार्थ में नया प्रभात स्वतंत्रता और नई राष्ट्रीय चेतना से जुड़ता है। अंधकार से प्रकाश की ओर बढ़ना गुलामी या निराशा से मुक्ति और नए युग की ओर बढ़ने का प्रतीकात्मक अर्थ दे सकता है। इसी कारण प्रकृति का सुंदर परिवर्तन एक बड़े ऐतिहासिक और मानवीय परिवर्तन की आहट जैसा लगता है।</p></article>
    <article><strong>🙌 “पलक पाँवड़े” का सरल अर्थ</strong><p>किसी बहुत प्रिय या शुभ आगमन का अत्यंत सम्मान और उत्साह से स्वागत करना—यही शीर्षक का मूल भाव है। पलकों को सचमुच रास्ते में नहीं बिछाया जाता; यह अतिशयोक्तिपूर्ण कल्पना है जो बताती है कि प्रतीक्षा करने वाला स्वागत के लिए कितना आतुर है।</p></article>
    <article><strong>🎯 पूरे पाठ का संदेश</strong><p>कविता हमें बताती है कि सुंदर प्रकृति कभी-कभी हमारे भीतर छिपी आशाओं को भी व्यक्त कर सकती है। यहाँ भोर का सौंदर्य, प्रकृति की सजावट, कवि की प्रतीक्षा और शुभ आगमन की भावना मिलकर नए जीवन, नई चेतना और बेहतर भविष्य की आशा पैदा करते हैं। इसलिए कविता को केवल सुबह का वर्णन मानना अधूरा होगा।</p></article>
   </div>
  </section>
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>🧩 पूरे पाठ को एक आसान क्रम में समझें</h3><span>दृश्य → भावना → गहरा अर्थ</span></div><div className="hindi-ch1-two-col"><article><strong>1. भोर आती है</strong><p>अंधकार हटता है और प्रकाश फैलने लगता है।</p></article><article><strong>2. प्रकृति निखरती है</strong><p>आकाश, फूल, लताएँ, हवा और जल सुंदर रूप धारण करते हैं।</p></article><article><strong>3. वातावरण उत्सव जैसा लगता है</strong><p>प्रकृति के परिवर्तन से चहल-पहल और स्वागत का भाव पैदा होता है।</p></article><article><strong>4. कवि प्रतीक्षा करता है</strong><p>थकी आँखें बताती हैं कि प्रतीक्षित आगमन बहुत महत्वपूर्ण है।</p></article><article><strong>5. गहरा अर्थ सामने आता है</strong><p>नया प्रभात नए युग, स्वतंत्रता और नवचेतना की आशा का संकेत बनता है।</p></article></div></section>
  <div style={{display:'grid',gridTemplateColumns:'minmax(210px,.34fr) minmax(0,1fr)',gap:'1rem',alignItems:'start'}}>
   <div style={{position:'sticky',top:'1rem'}}><ChapterContents lessons={hindiPoetry4Lesson.sections} title="पलक पाँवड़े · अध्ययन क्रम" compact activeIndex={activeIndex} onSelect={setActiveIndex}/></div>
   <div className="hindi-learn-grid">
    <section><h3>{active.title}</h3><p>{active.body}</p></section>
    <section><h3>🌱 आसान भाषा में गहराई</h3><p>{active.deep}</p></section>
    <section><h3>💡 सरल उदाहरण</h3><p>{active.example}</p></section>
    <section><h3>📝 परीक्षा-सूत्र</h3><p>{active.exam}</p></section>
    <section><h3>🧠 सोचकर समझें</h3><p>इस विचार को अपने जीवन से जोड़कर सोचें: किसी नई शुरुआत से पहले आपको कौन-से संकेत आशा और उत्साह देते हैं?</p></section>
   </div>
  </div>
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>⚖️ प्रमुख विचार और अर्थ</h3><span>दृश्य → अर्थ → संदेश</span></div><div className="hindi-ch1-two-col">{hindiPoetry4Lesson.comparison.map(([title,nature,origin,style])=><article key={title}><strong>{title}</strong><p><b>दृश्य:</b> {nature}</p><p><b>अर्थ:</b> {origin}</p><p><b>संदेश:</b> {style}</p></article>)}</div></section>
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>🎯 मुख्य भाव</h3><span>दीर्घ उत्तरों में उपयोगी बिंदु</span></div><div className="hindi-ch1-chip-grid">{hindiPoetry4Lesson.themes.map(x=><span key={x}>{x}</span>)}</div></section>
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>🖊️ काव्य-शिल्प</h3><span>कवि भाव को प्रभावी कैसे बनाते हैं?</span></div><div className="hindi-ch1-two-col">{hindiPoetry4Lesson.literaryTools.map(([title,body])=><article key={title}><strong>{title}</strong><p>{body}</p></article>)}</div></section>
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>📚 शब्द-संग्रह</h3><span>कठिन शब्दों का सरल अर्थ</span></div><div className="hindi-ch1-glossary">{hindiPoetry4Lesson.glossary.map(([word,meaning])=><article key={word}><strong>{word}</strong><p>{meaning}</p></article>)}</div></section>
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>✍️ उत्तर बनाने के ढाँचे</h3><span>लघु और दीर्घ उत्तर</span></div><div className="hindi-ch1-frameworks">{hindiPoetry4Lesson.answerFrameworks.map(([q,template])=><article key={q}><strong>{q}</strong><p>{template}</p></article>)}</div></section>
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>⚠️ परीक्षा में होने वाली सामान्य गलतियाँ</h3><span>इनसे बचें</span></div><ul><li>कविता को केवल प्रकृति-वर्णन न मानें; प्रतीक्षा और नए प्रभात का गहरा भाव भी लिखें।</li><li>“पलक पाँवड़े” का अर्थ शाब्दिक रूप से न लें; यह अत्यंत आतुर स्वागत की कल्पना है।</li><li>भोर को केवल समय न लिखें; उसे आशा, प्रकाश और नए आरंभ से जोड़ें।</li><li>हवा के कार्यों में ताजगी, सुगंध और मंद गति जैसे संकेत याद रखें।</li><li>दीर्घ उत्तर में प्रकृति के उदाहरण देकर फिर उनके प्रतीकात्मक अर्थ तक पहुँचें।</li></ul></section>
  <section className="hindi-ch1-panel"><div className="hindi-ch1-panel-head"><h3>🏆 10 महारत-बिंदु</h3><span>अंतिम पुनरावृत्ति</span></div><div className="hindi-ch1-glossary">{hindiPoetry4Lesson.examChecklist.map((x,i)=><article key={x}><strong>{i+1}</strong><p>{x}</p></article>)}</div></section>
  <div className="hindi-actions"><button type="button" className="secondary-btn pressable" onClick={onBack}>← पीछे</button><button type="button" className="primary-btn pressable" onClick={()=>onModeComplete?.('learn')}>✓ सीखना पूरा करें • +20 XP</button></div>
 </div>;
}
