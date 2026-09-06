import React,{useMemo,useState} from 'react';
import {HINDI_GRAMMAR_CONTENT} from './hindiGrammarContent';
import {HINDI_GRAMMAR_ENRICHMENT} from './hindiGrammarEnrichment';
import {HINDI_GRAMMAR_TOPIC_META,HINDI_GRAMMAR_TOPIC_EXAMPLES} from './hindiGrammarTopicData';
import {HINDI_UNSEEN_PASSAGES} from './hindiUnseenPassages';
import './hindi-grammar-topic.css';

const topicOrder=Object.keys(HINDI_GRAMMAR_TOPIC_META);

function QuestionCard({item,index}){
 const [show,setShow]=useState(false);
 return <article className="hgt-question"><div className="hgt-question-head"><span>प्रश्न {index+1}</span><b>{item.q}</b></div><div className="hgt-options">{item.options.map((option,i)=><button key={`${index}-${i}`} type="button" className={show&&i===item.answer?'hgt-correct':''} onClick={()=>show||setShow(true)}><span>{String.fromCharCode(65+i)}</span>{option}</button>)}</div>{show&&<div className="hgt-answer"><strong>उत्तर:</strong> {item.options[item.answer]}<p>{item.explain}</p></div>}<div className="hgt-question-foot">{show?'उत्तर देख लिया — अब कारण समझकर दोबारा सोचें।':'विकल्प चुनें; उत्तर नीचे खुलेगा।'}</div></article>
}

function Passage({data,startIndex}){
 const [revealed,setRevealed]=useState({});
 return <section className="hgt-passage"><div className="hgt-passage-title"><span>पठन-अभ्यास</span><h3>{data.title}</h3></div><p className="hgt-passage-text">{data.passage}</p><div className="hgt-passage-tip"><b>कैसे हल करें:</b> पहले पूरा गद्यांश पढ़ें, फिर प्रश्न के संकेत-शब्द को संबंधित पंक्ति/विचार से मिलाएँ। उत्तर passage से ही प्रमाणित होना चाहिए।</div><div className="hgt-passage-questions">{data.questions.map((q,i)=>{const key=`${startIndex+i}`;return <article className="hgt-question" key={key}><div className="hgt-question-head"><span>प्रश्न {startIndex+i+1}</span><b>{q.q}</b></div><div className="hgt-options">{q.options.map((option,j)=><button key={`${key}-${j}`} type="button" className={revealed[key]&&j===q.answer?'hgt-correct':''} onClick={()=>setRevealed(s=>({...s,[key]:true}))}><span>{String.fromCharCode(65+j)}</span>{option}</button>)}</div>{revealed[key]&&<div className="hgt-answer"><strong>उत्तर:</strong> {q.options[q.answer]}<p>{q.explain}</p></div>}<div className="hgt-question-foot">{revealed[key]?'उत्तर जाँचें और देखें कि गद्यांश की कौन-सी पंक्ति/बात प्रमाण देती है।':'एक विकल्प चुनकर स्वयं जाँचें।'}</div></article>})}</div></section>
}

const ESSAY_EXAMPLES=[
 {title:'उदाहरण 1 — समय का महत्व',outline:'भूमिका → समय का मूल्य → विद्यार्थी जीवन में उपयोग → समय नष्ट करने के नुकसान → निष्कर्ष',essay:'समय मनुष्य के जीवन की सबसे मूल्यवान संपत्तियों में से एक है। बीता हुआ समय वापस नहीं आता, इसलिए उसका सही उपयोग करना आवश्यक है। विद्यार्थी जीवन में समय का महत्व और बढ़ जाता है, क्योंकि इसी समय पढ़ाई, खेल, विश्राम और अन्य गतिविधियों के लिए संतुलन बनाना पड़ता है। जो विद्यार्थी नियमित दिनचर्या बनाकर काम करता है, वह परीक्षा के समय अनावश्यक तनाव से बच सकता है। इसके विपरीत, काम को टालते रहने से पढ़ाई का बोझ बढ़ जाता है और उपलब्ध समय कम पड़ने लगता है। इसलिए हमें समय की कीमत समझकर प्रत्येक कार्य के लिए उचित समय तय करना चाहिए। समय का सदुपयोग अनुशासन, आत्मविश्वास और सफलता की दिशा में ले जाता है।'},
 {title:'उदाहरण 2 — पर्यावरण संरक्षण',outline:'भूमिका → पर्यावरण का महत्व → प्रदूषण की समस्या → संरक्षण के उपाय → विद्यार्थी की भूमिका → निष्कर्ष',essay:'पर्यावरण हमारे जीवन का आधार है। हमें वायु, जल, मिट्टी, पेड़-पौधों और जीव-जंतुओं से प्रत्यक्ष या अप्रत्यक्ष रूप से जीवन-उपयोगी संसाधन मिलते हैं। आज बढ़ता प्रदूषण, पेड़ों की कटाई और संसाधनों का अनुचित उपयोग पर्यावरण के लिए गंभीर चुनौती बन रहे हैं। इस समस्या को कम करने के लिए अधिक से अधिक पेड़ लगाना, जल की बचत करना, प्लास्टिक का कम उपयोग करना और आसपास स्वच्छता बनाए रखना आवश्यक है। विद्यार्थी भी इस कार्य में महत्वपूर्ण भूमिका निभा सकते हैं। विद्यालय में स्वच्छता अभियान चलाना, पौधों की देखभाल करना और दूसरों को पर्यावरण के प्रति जागरूक करना छोटे लेकिन प्रभावी कदम हैं। यदि हम प्रकृति के साथ जिम्मेदारी से व्यवहार करेंगे, तो आने वाली पीढ़ियों के लिए स्वस्थ और सुरक्षित वातावरण बना सकेंगे।'}
];

const ESSAY_QUESTIONS=[
 '“मेहनत का महत्व” विषय पर लगभग 180–220 शब्दों का निबंध लिखिए।',
 '“पुस्तकें हमारी सच्ची मित्र हैं” विषय पर भूमिका, मुख्य भाग और उपसंहार सहित निबंध लिखिए।',
 '“जल संरक्षण” विषय पर निबंध लिखिए और घर तथा विद्यालय में किए जा सकने वाले कम-से-कम तीन उपाय बताइए।',
 '“विद्यार्थी जीवन में अनुशासन” विषय पर निबंध लिखिए। अपने विचारों के समर्थन में दैनिक जीवन के उदाहरण दीजिए।',
 '“स्वच्छ विद्यालय, स्वस्थ विद्यार्थी” विषय पर लगभग 180–220 शब्दों का निबंध लिखिए।',
 '“मोबाइल फोन: उपयोगिता और सावधानियाँ” विषय पर संतुलित निबंध लिखिए। लाभ और सावधानियाँ दोनों शामिल करें।',
 '“खेलों का महत्व” विषय पर निबंध लिखिए और बताइए कि खेल विद्यार्थी के व्यक्तित्व-विकास में कैसे सहायक हैं।',
 '“पेड़ हमारे साथी” विषय पर निबंध लिखिए। भूमिका, पर्यावरणीय लाभ, हमारी जिम्मेदारी और निष्कर्ष को क्रम से रखें।',
 '“समय का सदुपयोग” विषय पर निबंध लिखिए और समय की बर्बादी के दो कारण तथा उसे रोकने के उपाय बताइए।',
 '“मेरा आदर्श विद्यालय” विषय पर निबंध लिखिए। विद्यालय की सुविधाएँ, शिक्षक, अनुशासन, गतिविधियाँ और अपने सपनों का वर्णन कीजिए।'
];

const LETTER_FORMAT=[
 ['1. प्रेषक का पता','पत्र लिखने वाले का पता ऊपर लिखा जाता है। अनौपचारिक पत्र में अपना पता और औपचारिक पत्र में प्रेषक का पता दिया जाता है।'],
 ['2. दिनांक','पता के नीचे दिनांक लिखें; एक ही शैली पूरे पत्र में रखें।'],
 ['3. प्रापक / संबोधन','औपचारिक पत्र में “सेवा में” के साथ पदनाम; अनौपचारिक पत्र में “प्रिय मित्र”, “पूज्य पिताजी” आदि।'],
 ['4. विषय','औपचारिक पत्र में विषय एक स्पष्ट पंक्ति में लिखें; अनौपचारिक पत्र में सामान्यतः अलग विषय-पंक्ति आवश्यक नहीं होती।'],
 ['5. अभिवादन','संबंध और पत्र के उद्देश्य के अनुसार विनम्र अभिवादन लिखें।'],
 ['6. मुख्य भाग','पहले उद्देश्य/कारण, फिर आवश्यक विवरण और अंत में अपेक्षा, शुभकामना या निष्कर्ष लिखें।'],
 ['7. समापन','औपचारिक: “भवदीय/सधन्यवाद”; अनौपचारिक: “तुम्हारा मित्र/स्नेह सहित” आदि।'],
 ['8. नाम / हस्ताक्षर','अंत में पत्र लेखक का नाम लिखें।'],
];

const LETTER_EXAMPLES=[
 {type:'अनौपचारिक',title:'1. मित्र को परीक्षा की तैयारी के बारे में पत्र',body:'स्थान: पटना\nदिनांक: 6 सितंबर 2026\n\nप्रिय मित्र राहुल,\nसप्रेम नमस्कार!\n\nआशा है तुम स्वस्थ हो। मेरी वार्षिक परीक्षा निकट है, इसलिए मैंने सभी विषयों की तैयारी के लिए समय-सारणी बना ली है। मैं प्रतिदिन कठिन विषयों की पुनरावृत्ति करता हूँ और शाम को एक घंटे लिखित अभ्यास करता हूँ। तुम भी केवल याद करने के बजाय प्रश्न लिखकर हल करने का अभ्यास करना। इससे समय-प्रबंधन और उत्तर लिखने की गति दोनों अच्छी होंगी।\n\nअपने माता-पिता को मेरा प्रणाम कहना। परीक्षा के बाद मिलकर तैयारी के अनुभव साझा करेंगे।\n\nतुम्हारा मित्र\nअमित'},
 {type:'अनौपचारिक',title:'2. पिता जी को छात्रावास के जीवन का वर्णन',body:'छात्रावास, गया\nदिनांक: 6 सितंबर 2026\n\nपूज्य पिताजी,\nसादर चरण स्पर्श!\n\nमैं यहाँ स्वस्थ और प्रसन्न हूँ। छात्रावास की दिनचर्या व्यवस्थित है। सुबह प्रार्थना के बाद पढ़ाई होती है और विद्यालय से लौटने के बाद हमें खेल तथा स्वाध्याय का समय मिलता है। मैंने अपनी पढ़ाई के लिए दैनिक समय-सारणी बनाई है। शिक्षक कठिन प्रश्नों को समझाने में भी सहायता करते हैं। भोजन और रहने की व्यवस्था भी ठीक है।\n\nआप मेरी चिंता न करें। मैं मन लगाकर पढ़ रहा हूँ। माताजी को मेरा प्रणाम कहिए।\n\nआपका पुत्र\nअमित'},
 {type:'अनौपचारिक',title:'3. छोटे भाई को नियमित अध्ययन के लिए प्रेरित करने वाला पत्र',body:'पटना\nदिनांक: 6 सितंबर 2026\n\nप्रिय रोहन,\nस्नेह!\n\nतुम्हारे विद्यालय की परीक्षा आने वाली है, इसलिए मैं तुम्हें नियमित पढ़ाई की सलाह देना चाहता हूँ। हर दिन थोड़ा-थोड़ा पढ़ने से पाठ लंबे समय तक याद रहता है। कठिन विषय को टालने के बजाय पहले उसके छोटे भाग बनाकर समझो। पढ़ाई के बीच थोड़ी विश्राम-ावधि रखो और लिखकर अभ्यास भी करो। मोबाइल या अन्य ध्यान भटकाने वाली चीज़ों से पढ़ते समय दूरी बनाए रखना उपयोगी रहेगा।\n\nमुझे विश्वास है कि नियमित मेहनत से तुम अच्छा प्रदर्शन करोगे।\n\nतुम्हारा भैया\nअमित'},
 {type:'अनौपचारिक',title:'4. मित्र को प्रतियोगिता में सफलता पर बधाई पत्र',body:'आरा\nदिनांक: 6 सितंबर 2026\n\nप्रिय सुमित,\nसप्रेम नमस्कार!\n\nविद्यालय की भाषण-प्रतियोगिता में प्रथम स्थान प्राप्त करने पर तुम्हें बहुत-बहुत बधाई। तुम्हारी सफलता की खबर सुनकर मुझे बहुत खुशी हुई। तुमने नियमित अभ्यास और आत्मविश्वास से यह उपलब्धि हासिल की है। यह सफलता केवल पुरस्कार नहीं, बल्कि तुम्हारी मेहनत का परिणाम है। आशा है कि आगे भी इसी उत्साह से अन्य प्रतियोगिताओं में भाग लोगे।\n\nमेरी ओर से अंकल-आंटी को भी बधाई देना।\n\nतुम्हारा मित्र\nअमित'},
 {type:'अनौपचारिक',title:'5. मित्र को विद्यालय के वार्षिकोत्सव में आमंत्रित करने वाला पत्र',body:'मुजफ्फरपुर\nदिनांक: 6 सितंबर 2026\n\nप्रिय नेहा,\nसप्रेम नमस्कार!\n\nहमारे विद्यालय का वार्षिकोत्सव 20 सितंबर को विद्यालय के सभागार में आयोजित किया जा रहा है। कार्यक्रम में सांस्कृतिक प्रस्तुतियाँ, भाषण और पुरस्कार-वितरण होगा। तुम इस अवसर पर अवश्य आना। कार्यक्रम शाम चार बजे शुरू होगा और मैं तुम्हारे आने की प्रतीक्षा करूँगा।\n\nअपने माता-पिता से अनुमति लेकर आना। तुम्हारे साथ यह कार्यक्रम देखना बहुत अच्छा लगेगा।\n\nस्नेह सहित\nअमित'},
 {type:'औपचारिक',title:'6. प्रधानाचार्य को अवकाश के लिए आवेदन',body:'सेवा में,\nप्रधानाचार्य महोदय,\nआदर्श उच्च विद्यालय, पटना\n\nविषय: दो दिनों के अवकाश हेतु आवेदन।\n\nमहोदय,\nसविनय निवेदन है कि मैं कक्षा 9 का छात्र हूँ। मुझे तेज ज्वर होने के कारण 7 सितंबर से 8 सितंबर तक विद्यालय आने में असमर्थता रहेगी। चिकित्सक ने मुझे दो दिन विश्राम की सलाह दी है। अतः कृपया मुझे दो दिनों का अवकाश प्रदान करने की कृपा करें। मैं स्वस्थ होने के बाद छूटी हुई पढ़ाई पूरी कर लूँगा।\n\nधन्यवाद।\n\nभवदीय\nअमित कुमार\nकक्षा 9'},
 {type:'औपचारिक',title:'7. संपादक को नगर में जलजमाव की समस्या पर पत्र',body:'सेवा में,\nसंपादक महोदय,\nदैनिक जनवाणी, पटना\n\nविषय: नगर में जलजमाव की समस्या की ओर ध्यान आकर्षित करने के संबंध में।\n\nमहोदय,\nमैं आपके लोकप्रिय समाचार-पत्र के माध्यम से नगर के एक महत्वपूर्ण जनसमस्या की ओर संबंधित विभाग का ध्यान आकर्षित करना चाहता हूँ। वर्षा के बाद कई मोहल्लों में सड़कों पर लंबे समय तक पानी जमा रहता है। इससे विद्यार्थियों, बुजुर्गों और राहगीरों को आने-जाने में कठिनाई होती है तथा गंदगी और मच्छरों की समस्या भी बढ़ती है।\n\nअतः कृपया अपने समाचार-पत्र में इस समस्या को प्रमुखता से प्रकाशित करें, ताकि नालियों की सफाई और जल-निकासी की उचित व्यवस्था शीघ्र की जा सके।\n\nभवदीय\nअमित कुमार\nपटना'},
 {type:'औपचारिक',title:'8. नगर निकाय अधिकारी को खराब स्ट्रीट लाइट की शिकायत',body:'सेवा में,\nनगर परिषद के कार्यपालक पदाधिकारी,\nनगर परिषद, गया\n\nविषय: मोहल्ले की खराब स्ट्रीट लाइटों की मरम्मत हेतु अनुरोध।\n\nमहोदय,\nहमारे मोहल्ले की मुख्य सड़क पर पिछले कई दिनों से अधिकांश स्ट्रीट लाइटें बंद हैं। शाम के बाद मार्ग पर अँधेरा रहता है, जिससे विद्यालय से लौटने वाले विद्यार्थियों तथा अन्य राहगीरों को असुविधा होती है। स्थानीय लोगों ने इस समस्या की ओर ध्यान भी दिलाया है, परंतु अभी तक मरम्मत नहीं हुई है।\n\nअतः निवेदन है कि संबंधित कर्मचारियों को भेजकर स्ट्रीट लाइटों की शीघ्र जाँच और मरम्मत कराने की कृपा करें।\n\nसधन्यवाद\nअमित कुमार\nगया'},
];

const LETTER_QUESTIONS=[
 'अपने मित्र को पत्र लिखकर बताइए कि आपने वार्षिक परीक्षा की तैयारी के लिए कौन-सी योजना बनाई है।',
 'अपने पिता जी को पत्र लिखकर छात्रावास में अपने विद्यालय और दिनचर्या का वर्णन कीजिए।',
 'अपने छोटे भाई/बहन को पत्र लिखकर नियमित अध्ययन और समय-प्रबंधन के लिए प्रेरित कीजिए।',
 'अपने मित्र को उसकी किसी शैक्षणिक या सांस्कृतिक प्रतियोगिता में सफलता पर बधाई देते हुए पत्र लिखिए।',
 'अपने मित्र को विद्यालय के वार्षिकोत्सव में आमंत्रित करते हुए लगभग 100–120 शब्दों का पत्र लिखिए।',
 'अपने मित्र को ग्रीष्मावकाश की अपनी योजना बताते हुए पत्र लिखिए और उसे भी साथ आने के लिए आमंत्रित कीजिए।',
 'प्रधानाचार्य को तीन दिनों के आकस्मिक अवकाश के लिए आवेदन-पत्र लिखिए।',
 'प्रधानाचार्य को विद्यालय पुस्तकालय में नई हिंदी पुस्तकों की व्यवस्था कराने हेतु आवेदन-पत्र लिखिए।',
 'प्रधानाचार्य को विद्यालय में स्वच्छ पेयजल की उचित व्यवस्था कराने के लिए पत्र लिखिए।',
 'नगर परिषद के अधिकारी को आपके मोहल्ले में कूड़ा उठाने की अनियमित व्यवस्था की शिकायत करते हुए पत्र लिखिए।',
 'संपादक को पत्र लिखकर अपने क्षेत्र में बढ़ती यातायात-अव्यवस्था और उसके समाधान की ओर ध्यान आकर्षित कीजिए।',
 'संपादक को पत्र लिखकर पेड़ लगाने और उनकी देखभाल के लिए जन-जागरूकता बढ़ाने का सुझाव दीजिए।',
 'अपने मित्र को पत्र लिखकर मोबाइल और पढ़ाई के बीच संतुलन बनाए रखने के लिए उपयोगी सुझाव दीजिए।',
 'अपने मित्र को पत्र लिखकर किसी शैक्षणिक भ्रमण के अनुभव का वर्णन कीजिए।',
 'किसी स्थानीय अधिकारी को पत्र लिखकर सड़क पर लगी खराब स्ट्रीट लाइटों की मरम्मत कराने का अनुरोध कीजिए।'
];

function EssaySection(){
 return <>
  <section className="hgt-panel"><div className="hgt-section-label">MODEL ESSAYS</div><h2>2 उदाहरण — अच्छे निबंध की बनावट समझें</h2><p className="hgt-muted">उदाहरण याद करने के लिए नहीं, बल्कि भूमिका, विचार-विस्तार, उदाहरण और उपसंहार की संरचना समझने के लिए हैं।</p><div className="hgt-example-grid">{ESSAY_EXAMPLES.map(example=><article key={example.title}><span>{example.title}</span><p><b>रूपरेखा:</b> {example.outline}</p><p>{example.essay}</p></article>)}</div></section>
  <section className="hgt-panel"><div className="hgt-section-label">SUBJECTIVE PRACTICE</div><h2>10 निबंध-लेखन अभ्यास प्रश्न</h2><p className="hgt-muted">हर प्रश्न को कॉपी/उत्तर-पुस्तिका में स्वयं लिखकर अभ्यास करें। पहले 2–3 मिनट में रूपरेखा बनाइए, फिर अनुच्छेदों को क्रम से विकसित करें।</p><div className="hgt-essay-question-list">{ESSAY_QUESTIONS.map((q,i)=><article className="hgt-essay-question" key={q}><div className="hgt-question-head"><span>प्रश्न {i+1}</span><b>{q}</b></div></article>)}</div></section>
 </>;
}

function LetterSection(){
 return <>
  <section className="hgt-panel"><div className="hgt-section-label">LETTER FORMAT</div><h2>एक नज़र में — पत्र का सही प्रारूप</h2><p className="hgt-muted">पहले पत्र का प्रकार पहचानें। फिर नीचे दिए क्रम में आवश्यक भाग लिखें। औपचारिक और अनौपचारिक पत्र में भाषा तथा संबोधन बदलता है, लेकिन प्रस्तुति हमेशा साफ़ और क्रमबद्ध रखें।</p><div className="hgt-points">{LETTER_FORMAT.map(([label,text])=><article key={label}><b>{label}</b><p>{text}</p></article>)}</div><div className="hgt-tip-box"><b>याद रखने का क्रम</b><p>पता → दिनांक → प्राप्तकर्ता/संबोधन → विषय (औपचारिक) → अभिवादन → मुख्य भाग → समापन → नाम</p></div></section>
  <section className="hgt-panel"><div className="hgt-section-label">TYPES &amp; MODELS</div><h2>{LETTER_EXAMPLES.length} प्रकारवार उदाहरण</h2><p className="hgt-muted">हर उदाहरण को format model की तरह पढ़ें। विषय बदल सकता है, लेकिन पत्र का ढाँचा, संबोधन, भाषा और समापन उद्देश्य के अनुसार बनाए रखें।</p><div className="hgt-example-grid">{LETTER_EXAMPLES.map(example=><article key={example.title}><span>{example.type} • {example.title}</span><p style={{whiteSpace:'pre-line'}}>{example.body}</p></article>)}</div></section>
  <section className="hgt-panel"><div className="hgt-section-label">SUBJECTIVE PRACTICE</div><h2>15 पत्र-लेखन अभ्यास प्रश्न</h2><p className="hgt-muted">सभी प्रश्न subjective हैं। पत्र स्वयं लिखें और अंत में प्रारूप, भाषा, विषय-वस्तु तथा समापन की जाँच करें।</p><div className="hgt-essay-question-list">{LETTER_QUESTIONS.map((q,i)=><article className="hgt-essay-question" key={q}><div className="hgt-question-head"><span>प्रश्न {i+1}</span><b>{q}</b></div></article>)}</div></section>
 </>;
}

export function HindiGrammarTopicPage({topic,onBack}){
 const content=HINDI_GRAMMAR_CONTENT[topic.id];
 const meta=HINDI_GRAMMAR_TOPIC_META[topic.id];
 const enrichment=HINDI_GRAMMAR_ENRICHMENT[topic.id];
 const extraExamples=HINDI_GRAMMAR_TOPIC_EXAMPLES[topic.id]||[];
 const isPassage=topic.id==='grammar-gr1';
 const isEssay=topic.id==='grammar-gr2';
 const isLetter=topic.id==='grammar-gr3';
 const testQuestions=useMemo(()=>content?.questions?.slice(27,47)||[],[content]);
 const [section,setSection]=useState('learn');
 if(!content||!meta)return null;
 const steps=meta.steps||[];
 return <main className="hgt-page"><header className="hgt-hero"><div className="hgt-hero-inner"><button type="button" className="hgt-back" onClick={onBack}>← वापस Byakaran</button><span className="hgt-kicker">कक्षा 9 • व्याकरण एवं रचना</span><h1>{meta.title}</h1><p>{content.summary}</p><div className="hgt-stat-row"><span>{isPassage?'📚 10 उदाहरण':isEssay?'✍️ 2 उदाहरण':isLetter?`✉️ ${LETTER_EXAMPLES.length} उदाहरण`:'📚 5+ उदाहरण'}</span><span>{isPassage?'📝 10 गद्यांश • 50 प्रश्न':isEssay?'✍️ 10 subjective प्रश्न':isLetter?'✍️ 15 subjective प्रश्न':'📝 20 प्रश्न'}</span><span>🎯 परीक्षा-केंद्रित तैयारी</span></div></div></header>
 <div className="hgt-tabs" role="tablist" aria-label="विषय सामग्री"><button className={section==='learn'?'active':''} onClick={()=>setSection('learn')}>📖 समझें</button><button className={section==='questions'?'active':''} onClick={()=>setSection('questions')}>{isEssay?'✍️ अभ्यास':isLetter?'✉️ अभ्यास':'📝 20 प्रश्न'}</button></div>
 <div className="hgt-content">
 {section==='learn'?<>
   <section className="hgt-panel hgt-strategy"><div className="hgt-section-label">STEP-BY-STEP</div><h2>{meta.subtitle}</h2><div className="hgt-step-grid">{steps.map((step,i)=><div key={step}><span>{i+1}</span><p>{step}</p></div>)}</div></section>
   <section className="hgt-panel"><div className="hgt-section-label">CONCEPT NOTES</div><h2>मुख्य बातें</h2><div className="hgt-points">{content.points.map((point,i)=><article key={`${point[0]}-${i}`}><b>{point[0]}</b><p>{point[1]}</p></article>)}</div></section>
   {isPassage?<section className="hgt-panel"><div className="hgt-section-label">10 PASSAGE EXAMPLES</div><h2>10 अलग-अलग अपठित गद्यांश</h2><p className="hgt-muted">हर गद्यांश नया है। प्रत्येक के साथ 5 प्रश्न हैं, यानी कुल 50 passage-based questions। सही उत्तर passage की जानकारी और उसके तार्किक निष्कर्ष से तय होते हैं।</p>{HINDI_UNSEEN_PASSAGES.map((p,i)=><Passage key={p.title} data={p} startIndex={i*5}/>)}</section>:isEssay?<EssaySection/>:isLetter?<LetterSection/>:<section className="hgt-panel"><div className="hgt-section-label">EXAMPLES</div><h2>उदाहरणों से समझें</h2><div className="hgt-example-grid">{(extraExamples.length?extraExamples:enrichment?.examples||[]).map(([label,text])=><article key={label}><span>{label}</span><p>{text}</p></article>)}</div></section>}
   {!isPassage&&!isEssay&&!isLetter&&<section className="hgt-panel"><div className="hgt-section-label">COMMON ERRORS</div><h2>कहाँ गलती होती है?</h2><div className="hgt-error-grid">{(enrichment?.mistakes||[]).map(item=><article key={item}><span>⚠️</span><p>{item}</p></article>)}</div><div className="hgt-tip-box"><b>Exam strategy</b><ul>{(enrichment?.tips||[]).map(t=><li key={t}>{t}</li>)}</ul></div></section>}
   {isPassage&&<section className="hgt-panel"><div className="hgt-section-label">COMMON ERRORS</div><h2>गद्यांश में ये गलतियाँ न करें</h2><div className="hgt-error-grid">{(enrichment?.mistakes||[]).map(item=><article key={item}><span>⚠️</span><p>{item}</p></article>)}</div></section>}
   <section className="hgt-panel hgt-question-cta"><h2>{isEssay?'अब निबंध लिखकर अभ्यास करें':isLetter?'अब पत्र लिखकर अभ्यास करें':'अब अपनी समझ जाँचें'}</h2><p>{isEssay?'ऊपर दिए 2 उदाहरणों की संरचना समझकर 10 subjective questions में स्वयं लिखें।':isLetter?'पहले format समझें, फिर 8 model letters देखें और अंत में 15 subjective questions में अलग-अलग परिस्थितियों पर पत्र लिखें।':'ऊपर की तैयारी के बाद 20 प्रश्न हल करें और हर उत्तर के पीछे का कारण भी देखें।'}</p><button type="button" onClick={()=>setSection('questions')}>{isEssay?'10 प्रश्न शुरू करें →':isLetter?'15 प्रश्न शुरू करें →':'20 प्रश्न शुरू करें →'}</button></section>
 </>:isEssay?<EssaySection/>:isLetter?<LetterSection/>:<section className="hgt-panel"><div className="hgt-section-label">EXAM PRACTICE</div><h2>20 प्रश्न — {meta.title}</h2><p className="hgt-muted">ये प्रश्न मौजूदा व्याकरण अभ्यास बैंक के अंतिम 20 प्रश्नों से लिए गए हैं और इस dedicated page पर अलग से अभ्यास के लिए दिखाए जा रहे हैं।</p><div className="hgt-question-list">{testQuestions.map((item,i)=><QuestionCard key={`${i}-${item.q}`} item={item} index={i}/>)}</div></section>}
 </div>
 <footer className="hgt-footer"><span>विषय पेज</span><div>{topicOrder.map(id=>{const m=HINDI_GRAMMAR_TOPIC_META[id];return <span key={id} className={id===topic.id?'current':''}>{m.title}</span>})}</div></footer>
 </main>
}
