import React,{useState} from 'react';
import './hindi-grammar-topic.css';

const PARAGRAPH_FORMAT=[
 ['1. विषय की पहचान','दिए गए विषय का केंद्रीय विचार पहले स्पष्ट करें। विषय से बाहर की जानकारी न जोड़ें।'],
 ['2. आरंभिक वाक्य','पहले 1–2 वाक्यों में विषय की भूमिका या मुख्य विचार बताकर अनुच्छेद की दिशा तय करें।'],
 ['3. क्रमबद्ध विचार','विचारों को कारण, उदाहरण, प्रभाव, समस्या या उपाय जैसे स्वाभाविक क्रम में रखें।'],
 ['4. एकता और सुसंगति','पूरा अनुच्छेद एक ही मुख्य विचार से जुड़ा रहे। अनावश्यक उप-विषय और दोहराव से बचें।'],
 ['5. भाषा और शैली','सरल, शुद्ध और प्रभावी हिंदी लिखें। छोटे–मध्यम वाक्यों तथा उचित विराम-चिह्नों का प्रयोग करें।'],
 ['6. निष्कर्ष','अंतिम 1–2 वाक्यों में मुख्य विचार को संक्षेप में समेटें या उचित संदेश दें।'],
];

const PARAGRAPH_EXAMPLES=[
 {title:'उदाहरण 1 — समय का सदुपयोग',body:'समय मनुष्य के जीवन की अमूल्य संपत्ति है। बीता हुआ समय कभी वापस नहीं आता, इसलिए उसका सदुपयोग करना आवश्यक है। विद्यार्थी जीवन में समय का महत्व और बढ़ जाता है। यदि विद्यार्थी पढ़ाई, खेल, विश्राम और अन्य कार्यों के लिए एक उचित समय-सारणी बनाकर चले, तो वह अपने कार्य समय पर पूरा कर सकता है। समय को टालने की आदत से काम बढ़ता जाता है और परीक्षा के समय अनावश्यक दबाव उत्पन्न होता है। इसलिए हमें आवश्यक और अनावश्यक कार्यों में अंतर समझना चाहिए तथा प्रत्येक काम के लिए उचित समय निर्धारित करना चाहिए। समय का सही उपयोग अनुशासन, आत्मविश्वास और सफलता की ओर ले जाता है।'},
 {title:'उदाहरण 2 — स्वच्छ विद्यालय',body:'स्वच्छ विद्यालय विद्यार्थियों के स्वस्थ और सुखद वातावरण के लिए आवश्यक है। साफ कक्षाएँ, स्वच्छ शौचालय, शुद्ध पेयजल और कूड़ेदान की उचित व्यवस्था विद्यालय को व्यवस्थित बनाती है। स्वच्छता केवल सफाई कर्मचारियों की जिम्मेदारी नहीं, बल्कि प्रत्येक विद्यार्थी और शिक्षक की साझा जिम्मेदारी है। विद्यार्थियों को कूड़ा इधर-उधर नहीं फेंकना चाहिए और विद्यालय परिसर में पौधों की देखभाल भी करनी चाहिए। समय-समय पर स्वच्छता अभियान चलाकर सभी को इसके महत्व के प्रति जागरूक किया जा सकता है। स्वच्छ वातावरण से पढ़ाई में रुचि बढ़ती है और विद्यालय में अनुशासन की भावना भी मजबूत होती है।'},
];

const PARAGRAPH_QUESTIONS=[
 '“परिश्रम का महत्व” विषय पर एक सुसंगत अनुच्छेद लिखिए।',
 '“प्रकृति और मानव” विषय पर अनुच्छेद लिखिए तथा दोनों के संबंध को स्पष्ट कीजिए।',
 '“पुस्तकालय का महत्व” विषय पर अनुच्छेद लिखिए।',
 '“विद्यार्थी जीवन में अनुशासन” विषय पर लगभग 120–150 शब्दों का अनुच्छेद लिखिए।',
 '“जल संरक्षण” विषय पर अनुच्छेद लिखिए और कम-से-कम तीन उपाय बताइए।',
 '“पेड़-पौधों का महत्व” विषय पर अनुच्छेद लिखिए और उनकी रक्षा में विद्यार्थी की भूमिका बताइए।',
 '“समय की बर्बादी कैसे रोकें?” विषय पर अनुच्छेद लिखिए। कारण और समाधान दोनों शामिल करें।',
 '“स्वच्छता का महत्व” विषय पर अनुच्छेद लिखिए और व्यक्तिगत तथा सार्वजनिक स्वच्छता में अंतर स्पष्ट कीजिए।',
 '“मोबाइल फोन और विद्यार्थी जीवन” विषय पर संतुलित अनुच्छेद लिखिए।',
 '“मेरा विद्यालय” विषय पर अनुच्छेद लिखिए जिसमें विद्यालय का वातावरण, शिक्षक, गतिविधियाँ और अपनी पसंद का उल्लेख हो।',
];

export function HindiParagraphTopicPage({onBack}){
 const [section,setSection]=useState('learn');
 return <main className="hgt-page"><header className="hgt-hero"><div className="hgt-hero-inner"><button type="button" className="hgt-back" onClick={onBack}>← वापस Byakaran</button><span className="hgt-kicker">कक्षा 9 • व्याकरण एवं रचना</span><h1>अनुच्छेद लेखन</h1><p>एक विचार को संक्षिप्त, क्रमबद्ध और सुसंगत ढंग से प्रस्तुत करना सीखें।</p><div className="hgt-stat-row"><span>📝 format guide</span><span>📚 2 उदाहरण</span><span>✍️ 10 subjective प्रश्न</span></div></div></header>
 <div className="hgt-tabs" role="tablist" aria-label="अनुच्छेद लेखन"><button className={section==='learn'?'active':''} onClick={()=>setSection('learn')}>📖 समझें</button><button className={section==='questions'?'active':''} onClick={()=>setSection('questions')}>✍️ अभ्यास</button></div>
 <div className="hgt-content">{section==='learn'?<>
  <section className="hgt-panel hgt-strategy"><div className="hgt-section-label">PARAGRAPH FORMAT</div><h2>एक नज़र में — अनुच्छेद का सही प्रारूप</h2><p className="hgt-muted">अनुच्छेद में एक केंद्रीय विचार होना चाहिए और सभी वाक्य उसी विचार को आगे बढ़ाएँ।</p><div className="hgt-points">{PARAGRAPH_FORMAT.map(([label,text])=><article key={label}><b>{label}</b><p>{text}</p></article>)}</div><div className="hgt-tip-box"><b>याद रखने का क्रम</b><p>विषय → भूमिका → मुख्य विचार → कारण/उदाहरण → प्रभाव/उपाय → निष्कर्ष</p></div></section>
  <section className="hgt-panel"><div className="hgt-section-label">MODEL EXAMPLES</div><h2>2 उदाहरण — अनुच्छेद की बनावट समझें</h2><p className="hgt-muted">दोनों उदाहरणों में एक केंद्रीय विचार, क्रमबद्ध विस्तार और संक्षिप्त निष्कर्ष पर ध्यान दें।</p><div className="hgt-example-grid">{PARAGRAPH_EXAMPLES.map(example=><article key={example.title}><span>{example.title}</span><p>{example.body}</p></article>)}</div></section>
  <section className="hgt-panel hgt-question-cta"><h2>अब स्वयं लिखकर अभ्यास करें</h2><p>ऊपर का format और दोनों examples समझने के बाद 10 subjective questions में स्वयं अनुच्छेद लिखें।</p><button type="button" onClick={()=>setSection('questions')}>10 प्रश्न शुरू करें →</button></section>
 </>:<section className="hgt-panel"><div className="hgt-section-label">SUBJECTIVE PRACTICE</div><h2>10 अनुच्छेद-लेखन अभ्यास प्रश्न</h2><p className="hgt-muted">हर प्रश्न का उत्तर कॉपी/उत्तर-पुस्तिका में स्वयं लिखें। विषय से जुड़े रहें, विचारों का क्रम बनाए रखें और अंत में निष्कर्ष दें।</p><div className="hgt-essay-question-list">{PARAGRAPH_QUESTIONS.map((q,i)=><article className="hgt-essay-question" key={q}><div className="hgt-question-head"><span>प्रश्न {i+1}</span><b>{q}</b></div></article>)}</div></section>}</div>
 <footer className="hgt-footer"><span>विषय पेज</span><div><span className="current">अनुच्छेद लेखन</span></div></footer>
 </main>;
}
