import React,{useMemo,useState} from 'react';
import './english-reader.css';
import './english-panorama.css';

const study={
  title:'Dharam Juddha',
  author:'Arjun Dev Charan',
  sourceNote:'Class 9 English • The Panorama • Prose Chapter 1',
  intro:'यह chapter एक dialogue-based social play है। Padma अपने माता-पिता से महिला की पहचान, विवाह, अधिकार और समाज के अलग-अलग मानदंडों पर लगातार सवाल करती है। इस guided lesson को इस तरह बनाया गया है कि student को कहानी समझने, शब्द सीखने, grammar करने और exam की तैयारी के लिए बार-बार textbook खोलने की जरूरत न पड़े।',
  authorNote:'पुस्तक के परिचय के अनुसार Arjun Dev Charan teacher और poet रहे हैं। उनके नाटकों में social issues, contemporary ideas और लोक तथा historical themes दिखाई देते हैं। “Dharam Juddha” भी social thinking और human dignity जैसे मुद्दों पर प्रश्न खड़ा करता है।',
  sections:[
    {title:'Part 1 — Padma का पहला सवाल',
      flow:'Padma बातचीत की शुरुआत अपनी माँ से महिला की पहचान के बारे में पूछकर करती है। वह यह भी जानना चाहती है कि वह दूसरों से किस तरह अलग है। उसका सवाल बहुत simple लगता है, लेकिन उसके पीछे एक बड़ा social question है। वह जानना चाहती है कि किसी महिला की पहचान आखिर किस आधार पर तय की जाती है।',
      explanation:'Padma सीधे उस बात पर जाती है जिसे समाज अक्सर बिना सोचे स्वीकार कर लेता है। वह पूछती है कि “woman” होना सिर्फ किसी रिश्ते का नाम है या उसकी अपनी भी अलग पहचान है। यही छोटा सवाल पूरे play का central issue बन जाता है।',
      vocabulary:[['identity','पहचान'],['individuality','व्यक्तिगत पहचान / अलग अस्तित्व'],['dignity','गरिमा / सम्मान'],['issue','मुद्दा'],['different','अलग']],
      exam:'Exam focus: Padma का opening question chapter के main idea की शुरुआत करता है।',
      think:'Think: क्या किसी व्यक्ति की पहचान केवल उसके रिश्तों से तय होनी चाहिए?'
    },
    {title:'Part 2 — माँ का जवाब और परिवार से जुड़ी पहचान',
      flow:'माँ Padma को अपनी बेटी और अपने पिता की प्रिय child के रूप में देखती है। बातचीत में father के स्नेह और family bond की बात आती है। माँ अपनी identity को husband और family से बहुत closely जुड़ा हुआ मानती है। उसके लिए यह रिश्ता natural और valuable है।',
      explanation:'यहाँ Mother traditional family thinking को represent करती हैं। वह अपने व्यक्तित्व को family role से अलग करके नहीं देखतीं। Padma इसी सोच को आगे question करती है, क्योंकि वह personal identity को सिर्फ relationship से जोड़ना ठीक नहीं मानती।',
      vocabulary:[['darling','बहुत प्रिय व्यक्ति'],['cherish','बहुत प्यार से रखना / प्रिय मानना'],['bond','रिश्ता / जुड़ाव'],['closely','बहुत निकट रूप से'],['traditional','परंपरागत']],
      exam:'Exam focus: Mother और Padma की thinking का difference long answer में पूछा जा सकता है।',
      think:'Think: family हमें identity दे सकता है, लेकिन क्या वही identity की पूरी सीमा है?'
    },
    {title:'Part 3 — Father और marriage वाला उत्तर',
      flow:'Father बातचीत में आते हैं और Padma के सवाल का traditional answer देते हैं। उनके अनुसार एक लड़की को अपनी identity का पूरा अर्थ marriage के बाद समझ में आता है। Padma इस answer को तुरंत test करती है। वह पूछती है कि अगर marriage ही identity देता है तो unmarried woman की identity क्या होगी।',
      explanation:'यह chapter का सबसे important reasoning turn है। Padma सिर्फ answer याद नहीं करना चाहती; वह पूछती है कि answer हर case में सच है या नहीं। यही critical thinking उसे बाकी characters से अलग बनाती है।',
      vocabulary:[['marriage','विवाह'],['married','विवाहित'],['unmarried','अविवाहित'],['reasoning','तर्क के आधार पर सोच'],['accept','स्वीकार करना']],
      exam:'Exam focus: “Does marriage lend identity to a woman?” इस question का answer reasoning के साथ लिखें।',
      think:'Think: अगर कोई rule हर व्यक्ति पर लागू नहीं होता, तो क्या वह complete rule कहलाएगा?'
    },
    {title:'Part 4 — Unmarried woman और widow के बारे में सवाल',
      flow:'Padma आगे पूछती है कि उस woman का क्या जिसे marriage नहीं मिला। बातचीत में widow की difficult life की बात भी सामने आती है। Padma इस तरह की inequality को unjust मानती है। उसके questions धीरे-धीरे family talk से social justice की discussion बन जाते हैं।',
      explanation:'Padma के लिए किसी woman की value उसकी marital status से कम नहीं होनी चाहिए। वह दिखाती है कि social labels और expectations किसी person की dignity को नुकसान पहुँचा सकते हैं। यही कारण है कि वह “injustice” को openly challenge करती है।',
      vocabulary:[['widow','विधवा'],['injustice','अन्याय'],['unjust','अन्यायपूर्ण'],['status','स्थिति / सामाजिक दर्जा'],['difficult','कठिन']],
      exam:'Exam focus: Padma किस बात को injustice मानती है, यह लिखते समय “unequal social judgement” जरूर समझाएँ।',
      think:'Think: क्या किसी व्यक्ति को उसके personal status से judge करना fair है?'
    },
    {title:'Part 5 — क्या महिलाओं को सवाल करने का अधिकार है?',
      flow:'Mother Padma को समझाती हैं कि उनके social setting में women ऐसे questions नहीं करतीं। Padma इस बात को accept नहीं करती। वह पूछती है कि अगर women human beings हैं तो questions पूछने का right क्यों नहीं होना चाहिए। इस point पर conversation rights और justice तक पहुँच जाती है।',
      explanation:'यहाँ play सिर्फ marriage की बात नहीं करता। यह freedom to think, ask and speak की बात करता है। Padma का character इसलिए strong है क्योंकि वह “ऐसा ही होता है” को final answer नहीं मानती।',
      vocabulary:[['right','अधिकार'],['question','प्रश्न करना'],['justice','न्याय'],['social setting','सामाजिक वातावरण'],['freedom','स्वतंत्रता']],
      exam:'Exam focus: Padma के character sketch में “questioning”, “bold” और “thoughtful” qualities लिखें।',
      think:'Think: respectful questioning किसी society को कैसे बेहतर बना सकता है?'
    },
    {title:'Part 6 — घर को bargaining place क्यों माना जाए?',
      flow:'Padma marriage और home की उस सोच पर भी सवाल करती है जिसमें घर bargaining या negotiation की जगह जैसा लग सकता है। उसके लिए घर सम्मान और सुरक्षा का स्थान होना चाहिए। वह नहीं चाहती कि किसी woman को exchange की object की तरह देखा जाए। यह सवाल social custom पर सीधा attack है।',
      explanation:'यहाँ “bargaining” केवल खरीद-बिक्री नहीं, बल्कि उस mental attitude का संकेत है जिसमें रिश्ते में equality कम और transaction ज्यादा दिखाई देता है। Padma dignity को central value बनाती है। इसलिए उसका सवाल सिर्फ घर के बारे में नहीं, पूरे social attitude के बारे में है।',
      vocabulary:[['bargaining','सौदेबाज़ी'],['negotiation','सौदे या शर्तों पर बातचीत'],['object','वस्तु'],['exchange','लेन-देन / अदला-बदली'],['dignity','गरिमा']],
      exam:'Exam focus: “a place for bargaining” phrase का context समझकर answer दें।',
      think:'Think: healthy relationship और unfair bargain में क्या फर्क है?'
    },
    {title:'Part 7 — Equal rights की बात',
      flow:'Padma को बताया जाता है कि समाज में women के लिए अलग expectations हैं। Father एक जगह equal rights की बात स्वीकार करते हैं। Padma का सवाल फिर भी जारी रहता है, क्योंकि वह words और actual social behaviour के बीच difference देखती है। वह चाहती है कि equality केवल idea न रहे, बल्कि व्यवहार में भी दिखाई दे।',
      explanation:'यही chapter का deeper point है: equality बोलना और equality practice करना अलग बातें हो सकती हैं। Padma इस gap को पहचानती है। वह rights को real life treatment से जोड़ती है।',
      vocabulary:[['equal','समान'],['equality','समानता'],['expectation','अपेक्षा'],['behaviour','व्यवहार'],['gap','अंतर']],
      exam:'Exam focus: “Men and women are equally important” पर group discussion के लिए points तैयार रखें।',
      think:'Think: क्या equal rights का मतलब बिल्कुल same life होना है, या equal respect और opportunity?'
    },
    {title:'Part 8 — Unmarried man बनाम unmarried woman',
      flow:'Padma एक sharp comparison देती है। वह बताती है कि unmarried man के लिए society respectful label use कर सकती है। उसी तरह की स्थिति में unmarried woman को insulting label मिल सकता है। Padma इस unequal judgement को double standard के रूप में देखती है।',
      explanation:'यह chapter का सबसे memorable example है। दो लोगों की स्थिति समान है, लेकिन gender बदलते ही social judgement बदल जाता है। Padma इसी inconsistency को challenge करती है और reader को सोचने पर मजबूर करती है।',
      vocabulary:[['comparison','तुलना'],['venerate','आदर करना / सम्मान देना'],['saint','महान धार्मिक या पवित्र व्यक्ति'],['wanton','चरित्रहीन / असंयमी कहा जाना'],['double standard','दोहरा मानदंड']],
      exam:'Exam focus: unmarried man और unmarried woman के treatment का comparison बहुत important है।',
      think:'Think: दो समान situations के लिए अलग judgement को हम fair कैसे कह सकते हैं?'
    },
    {title:'Part 9 — “Identity of the human race” का विचार',
      flow:'Padma discussion को individual woman से आगे ले जाती है। उसके लिए woman की identity human race की identity से जुड़ी है। वह यह दिखाना चाहती है कि society women को छोटा करके वास्तव में अपने ही human values को कमजोर करती है। इसलिए equality केवल women का issue नहीं, human issue है।',
      explanation:'Padma का argument universal हो जाता है। वह कहती है कि woman कोई अलग कमतर category नहीं है; वह human society का पूरा हिस्सा है। इसीलिए dignity और identity दोनों को universal principles की तरह देखना चाहिए।',
      vocabulary:[['human race','मानव जाति'],['universal','सार्वभौमिक'],['value','मूल्य'],['respect','सम्मान'],['identity','पहचान']],
      exam:'Exam focus: “According to Padma, what is the identity of the human race?” विचार को अपने words में समझाएँ।',
      think:'Think: किसी group की dignity की रक्षा पूरी society की dignity से कैसे जुड़ती है?'
    },
    {title:'Part 10 — असली conflict: व्यक्ति बनाम social conditioning',
      flow:'Play में parents के answers largely society से मिली traditional beliefs को दिखाते हैं। Padma उन्हीं beliefs को questions के through test करती है। Conflict कोई physical fight नहीं है। असली संघर्ष ideas, values और fairness के बीच है।',
      explanation:'यही reason है कि title “Dharam Juddha” को ideas की लड़ाई की तरह पढ़ा जा सकता है। Padma किसी व्यक्ति को हराना नहीं चाहती; वह एक belief system को examine करना चाहती है। यह reading chapter को simple family conversation से meaningful social drama में बदल देती है।',
      vocabulary:[['conditioning','समाज से सीखी हुई सोच'],['belief','विश्वास / धारणा'],['conflict','संघर्ष'],['value','मूल्य'],['fairness','न्यायपूर्ण व्यवहार']],
      exam:'Exam focus: title explanation में “conflict of ideas” और social values को जोड़ें।',
      think:'Think: क्या हर पुरानी tradition गलत होती है? बेहतर सवाल शायद यह है कि वह fair है या नहीं।'
    },
    {title:'Part 11 — Padma का character और chapter का message',
      flow:'Padma educated, curious and fearless दिखाई देती है। वह अपने parents के answers को blindly accept नहीं करती। वह logic, equality and dignity के आधार पर questions करती है। इसी वजह से उसका character पूरे play का thinking centre बन जाता है।',
      explanation:'Padma को rebel कहना आसान है, लेकिन उसकी सबसे important quality “reasoned questioning” है। वह केवल विरोध नहीं करती; वह reasons मांगती है। यही quality Class 9 student के लिए भी important है—किसी बात को सिर्फ इसलिए सही न मानें कि वह पुरानी या popular है।',
      vocabulary:[['curious','जिज्ञासु'],['fearless','निडर'],['reasoned','तर्क पर आधारित'],['blindly','बिना सोचे-समझे'],['central','मुख्य']],
      exam:'Exam focus: Padma का character sketch लिखते समय 4 qualities + 2 examples दें।',
      think:'Think: पढ़ाई में questioning habit आपको better learner कैसे बना सकती है?'
    },
    {title:'Part 12 — One-page revision: पूरा chapter एक साथ',
      flow:'The play begins with a question about a woman’s identity and gradually expands into a discussion of marriage, rights and social judgement. Padma compares the treatment of unmarried men and women to expose a double standard. She also questions the idea that a woman’s worth starts only after marriage. The lesson finally pushes the reader to think about dignity, equality and fairness.',
      explanation:'पूरा chapter याद करने के लिए 5 words पकड़ें: Identity → Marriage → Rights → Double Standard → Equality. यही पाँच ideas लगभग पूरी discussion को जोड़ते हैं। Exam में story, character, title, theme और social message—सबके answers इन्हीं ideas से बन सकते हैं।',
      vocabulary:[['worth','मूल्य / महत्व'],['marital status','वैवाहिक स्थिति'],['double standard','दोहरा मानदंड'],['theme','मुख्य विचार'],['message','संदेश']],
      exam:'Exam focus: long answers में plot + argument + social message—तीनों का balance रखें।',
      think:'Final thought: “Questioning” का मतलब disrespect नहीं; सही reason की तलाश भी हो सकता है।'
    }
  ],
  glossary:[
    ['identity','पहचान / individuality'],['darling','प्रिय बच्चा / प्यारा व्यक्ति'],['bestow','प्रदान करना / confer'],['cherish','बहुत प्रिय मानना'],['senseless','बेतुका / unreasonable'],['sans','बिना'],['venerated','आदर से देखा गया'],['saint','पवित्र या महान धार्मिक व्यक्ति'],['immoral','अनैतिक'],['wanton','चरित्रहीन / असंयमी कहा जाने वाला'],['orthodox','रूढ़िवादी'],['agitated','व्याकुल / परेशान'],['injustice','अन्याय'],['bargaining','सौदेबाज़ी'],['equality','समानता'],['dignity','गरिमा']
  ],
  wordStudy:{
    spellings:[['identiti','identity'],['deferent','different'],['daughter','daughter'],['bestowe','bestow'],['sensless','senseless'],['injustive','injustice'],['bargen','bargain'],['socity','society'],['marriag','marriage']],
    less:[['careless','care + less = बिना care के'],['fearless','fear + less = बिना fear के'],['hopeless','hope + less = बिना hope के'],['harmless','harm + less = बिना harm के'],['flawless','flaw + less = बिना flaw के'],['meaningless','meaning + less = बिना meaning के'],['useless','use + less = बिना use के'],['helpless','help + less = बिना help के'],['powerless','power + less = बिना power के'],['homeless','home + less = बिना home के']],
    meanings:[['a person of great holiness','saint'],['unchaste','wanton'],['treated with respect','venerated'],['to hold as dear','cherish'],['individuality','identity'],['unreasonable','senseless']],
    phrases:[['care for','देखभाल करना / परवाह करना'],['in any way','किसी भी तरह'],['for equals','समान लोगों के लिए / समान रूप से'],['for one’s sake','किसी के हित के लिए'],['what if','अगर ऐसा हो तो?'],['a place for bargaining','सौदेबाज़ी की जगह']]
  },
  grammar:{
    title:'Infinitive Lab',
    intro:'Infinitive verb का non-finite form है। आम तौर पर “to + verb” इसका common pattern है, लेकिन कुछ structures में “to” हट जाता है। इस chapter में यही special uses detail में दिए गए हैं।',
    uses:[
      ['1. Subject के रूप में','To read is useful. • To exercise is good for health.','यहाँ पूरा infinitive phrase sentence का subject है।'],
      ['2. Verb के object / purpose के रूप में','We study to learn. • She went to the market to buy fruits.','यहाँ infinitive action या purpose बता रहा है।'],
      ['3. Noun को qualify करने के लिए','I have a book to read. • He needs a chair to sit on.','यह बताता है कि noun का उपयोग किस काम के लिए होगा।'],
      ['4. Verb/adjective को qualify करने के लिए','They worked hard to finish early. • English is easy to learn.','यह purpose या description देता है।']
    ],
    kinds:[['Infinitive with to','to read, to write, to eat, to go, to buy'],['Infinitive without to','read, write, eat, go, buy'] ],
    special:[
      ['Certain adjectives','angry, astonished, delighted, disappointed, glad, surprised, horrified जैसे adjectives के बाद “to + verb” common है।','I was surprised to meet him.'],
      ['know + how/what + infinitive','know के बाद सीधे infinitive की जगह how to / what to structure useful है।','He knows how to swim. • I know what to do.'],
      ['Bare infinitive after make, feel, find, let, bid, see, smell, hear, watch','Active voice में इन verbs के बाद object के साथ verb का base form आ सकता है।','We watched the players cross the road. • I heard her sing.'],
      ['Passive change','उसी idea के passive structure में “to” आ सकता है।','He was watched to cross the road.'],
      ['let','Active: let + object + base verb. Passive में “to” वाला pattern मिलता है।','They let us leave. • They were allowed to leave.'],
      ['had better / would rather','इन expressions के बाद base verb use करें।','You had better study. • She would rather stay.'],
      ['had sooner / would sooner','Preference बताने वाले इन forms के बाद भी base verb आता है।','He would sooner wait.'],
      ['had rather / would rather','Preference के लिए bare infinitive common है।','They would rather travel by train.'],
      ['but / than after do','अगर पहले do verb हो, तो but/than के बाद bare infinitive आ सकता है।','She did nothing but smile. • He did more than ask.']
    ]
  },
  examPrep:{
    veryShort:['What was Padma trying to know?','How many brothers or sisters did Padma have?','Why was Padma unhappy with her father?','For whom was life described as difficult in the discussion?','According to Padma, how is woman’s identity connected with human identity?'],
    long:['Why does Padma question the idea that marriage gives a woman identity?','How is Padma different from her mother?','Which social situation does Padma call unjust?','Write a character sketch of Padma.','Explain why the mother can be seen as a traditional woman.','Discuss the main idea of the lesson.','Explain the title “Dharam Juddha”.','Discuss the double standard shown between unmarried men and women.'],
    discussion:['Is it justified to praise an unmarried man while insulting an unmarried woman? Give reasons.','Why are men and women equally important in society?'],
    composition:['Write a paragraph of about 100 words on the status of women in society.','Write a letter to a friend explaining why equality between men and women matters.']
  },
  activities:[
    'Research the safeguards available to women in the Constitution of India and note 5–6 important points in simple English.',
    'Find five people who worked to improve the condition of women in India and write one line about each.'
  ],
  translationPractice:[
    ['चोरी करना गलत है।','Stealing is wrong.'],
    ['बिना टिकट यात्रा करना दंडनीय है।','Travelling without a ticket is punishable.'],
    ['गलती करना मानवीय है; क्षमा करना महानता है।','To make a mistake is human; to forgive is noble.'],
    ['हर दिन फल खाना स्वास्थ्य के लिए अच्छा है।','To eat fruit every day is good for health.'],
    ['सुबह टहलना स्वास्थ्य के लिए लाभदायक है।','To walk in the morning is good for health.'],
    ['बड़ों का सम्मान करना हमारा कर्तव्य है।','To respect elders is our duty.'],
    ['धूम्रपान स्वास्थ्य के लिए हानिकारक है।','Smoking is harmful to health.'],
    ['गणित सीखना कठिन नहीं है।','To learn mathematics is not difficult.'],
    ['दूसरों की सहायता करना हमारा कर्तव्य है।','To help others is our duty.'],
    ['बिना हेलमेट वाहन चलाना खतरनाक है।','To ride without a helmet is dangerous.']
  ]
};

const practice=[
 {q:'Who is at the centre of “Dharam Juddha”?',o:['Padma','The narrator','Bismillah Khan','Narcissus'],a:0,e:'Padma drives the main conversation and raises the central questions.'},
 {q:'What does Padma mainly question?',o:['A woman’s identity','A train journey','A musical performance','A natural disaster'],a:0,e:'Identity is the starting point and central issue of the play.'},
 {q:'The lesson is mainly developed through:',o:['dialogue','a travel diary','a scientific report','a poem'],a:0,e:'The supplied chapter is presented as a dialogue-based play.'},
 {q:'Which quality best describes Padma?',o:['Questioning and thoughtful','Careless and silent','Uninterested in society','Confused about everything'],a:0,e:'Padma repeatedly asks for reasons and challenges accepted assumptions.'},
 {q:'According to the traditional view shown in the lesson, a woman’s identity is linked strongly with:',o:['marriage','travel','weather','music'],a:0,e:'The traditional responses connect identity with marriage and husband.'},
 {q:'What is the meaning of “identity”?',o:['पहचान','सौदेबाज़ी','अन्याय','संत'],a:0,e:'Identity means a person’s sense of who they are or their individuality.'},
 {q:'What does “equality” mean in the lesson?',o:['equal worth and rights','silence','obedience','wealth'],a:0,e:'The lesson raises the idea of equal human value and rights.'},
 {q:'Why does Padma test the idea that marriage gives identity?',o:['She asks what happens to a woman who never marries','She wants to travel','She dislikes education','She wants a new house'],a:0,e:'Her question exposes a case that the traditional rule does not explain fairly.'},
 {q:'Which social issue is highlighted by different judgements of unmarried men and women?',o:['double standard','pollution','migration','technology'],a:0,e:'Padma points to unequal standards based on gender.'},
 {q:'What is the most central theme?',o:['women’s identity and equality','adventure','sports','climate'],a:0,e:'Identity, dignity, equality and social judgement form the core of the play.'},
 {q:'Why is Padma’s questioning important?',o:['It examines social assumptions','It avoids all discussion','It ends education','It proves every tradition is wrong'],a:0,e:'Her questions encourage critical examination of social rules.'},
 {q:'What does “justice” mean?',o:['fairness','celebration','wealth','silence'],a:0,e:'Justice means fair and proper treatment.'},
 {q:'Which character mainly represents conventional social thinking?',o:['Mother','Padma','the reader','a traveller'],a:0,e:'Mother’s responses mainly reflect the traditional viewpoint shown in the lesson.'},
 {q:'What is the strongest contrast in the play?',o:['Padma’s reasoning and traditional responses','city and village','music and dance','science and art'],a:0,e:'The main contrast is between questioning thought and inherited social belief.'},
 {q:'The title can be connected most closely with:',o:['a conflict of values and ideas','a sports match','a physical battle','a school competition'],a:0,e:'The conflict is mainly about beliefs, identity, fairness and social values.'}
];

const challenge=[
 {q:'Why is Padma’s identity question deeper than a marriage question?',o:['It asks whether a person’s worth exists independently of marital status','It only asks about wedding dates','It rejects family life','It is about money'],a:0,e:'Padma is testing the idea that marriage is the source of identity.'},
 {q:'Which inference best matches Padma’s method?',o:['Social rules should be examined for fairness','All old customs are harmful','Education is unnecessary','Families never shape beliefs'],a:0,e:'She does not blindly reject everything; she tests whether the belief is fair.'},
 {q:'Why is the family dialogue effective for the social issue?',o:['A large social problem becomes visible through an ordinary conversation','It avoids all disagreement','It uses only definitions','It focuses on travel'],a:0,e:'The family setting makes the social question immediate.'},
 {q:'Why is the unmarried-man/unmarried-woman comparison important?',o:['It shows unequal judgement in similar situations','It compares two jobs','It explains grammar','It describes a festival'],a:0,e:'The comparison exposes a double standard.'},
 {q:'Which statement best distinguishes Padma from her mother?',o:['Padma asks whether a rule is just; Mother largely accepts the traditional rule','Padma avoids all questions','They hold identical views','Mother rejects family values'],a:0,e:'Their difference is mainly in how they treat tradition and questioning.'},
 {q:'Which principle best helps evaluate a custom that gives unequal rights without a fair reason?',o:['Equality','Silence','Profit','Entertainment'],a:0,e:'Equality is the relevant principle for unequal treatment.'},
 {q:'Why can the lesson be read as a study of social conditioning?',o:['The parents repeat ideas shaped by society','It describes laboratory training','It is about sports practice','It explains weather'],a:0,e:'Their answers show how social beliefs can shape personal thinking.'},
 {q:'Which evidence best supports Padma as an independent thinker?',o:['She keeps asking for reasons even after a traditional answer is given','She avoids speaking','She changes the topic','She only talks about money'],a:0,e:'Persistence in questioning accepted ideas shows independent thought.'},
 {q:'What is the most balanced view of the parents?',o:['They mainly represent a conventional viewpoint','They are simply villains','They are comic characters','They have no role in the issue'],a:0,e:'Their role is to represent the social framework that Padma questions.'},
 {q:'Why is “double standard” stronger than simply “difference”?',o:['It suggests an unfair difference in judgement','It means two identical answers','It is a grammar rule','It refers only to objects'],a:0,e:'Double standard carries the idea of inconsistent or unequal judgement.'},
 {q:'What makes the lesson useful for a student beyond the exam?',o:['It teaches careful thinking about identity, fairness and assumptions','It teaches only spelling','It teaches a travel route','It avoids difficult ideas'],a:0,e:'The play develops critical thinking as well as exam knowledge.'},
 {q:'Why does the title fit the central conflict?',o:['The main battle is between competing ideas about values and justice','The story is about war','The characters fight physically','It is a sports match'],a:0,e:'The conflict is an intellectual and social struggle.'},
 {q:'If a social rule cannot explain the case of an unmarried woman fairly, what does Padma’s reasoning suggest?',o:['The rule needs to be questioned','The woman has no identity','Marriage must be compulsory','Questions should stop'],a:0,e:'Her reasoning tests whether the rule is logically and morally fair.'},
 {q:'Which concept links identity and dignity most strongly in the play?',o:['human worth','profit','speed','competition'],a:0,e:'Padma connects identity with human value and respect.'},
 {q:'What is the key danger of accepting a custom only because it is old?',o:['Its fairness may never be examined','It becomes scientific','It always becomes popular','It improves grammar'],a:0,e:'Age alone does not prove that a custom is fair.'},
 {q:'Why does Padma move from personal questions to society-wide questions?',o:['She sees her issue as part of a larger social pattern','She loses interest in family','She wants to change schools','She wants money'],a:0,e:'Her reasoning expands the discussion from herself to society.'},
 {q:'What does “human race” add to Padma’s argument?',o:['It makes the issue universal rather than limited to one person','It changes the topic to geography','It means only men','It ends the discussion'],a:0,e:'She connects women’s identity with the dignity of humanity as a whole.'},
 {q:'Which approach would be closest to Padma’s style of thinking?',o:['Ask, compare, test and then judge','Accept first and never question','Judge by rumours','Choose the easiest answer'],a:0,e:'Her method is based on questions and comparison.'},
 {q:'Why can “home” become a sensitive idea in the play?',o:['Because a home should represent dignity, not unequal bargaining','Because homes are always expensive','Because homes are only for men','Because travel is difficult'],a:0,e:'Padma connects home with respect and fairness.'},
 {q:'What is the best long-answer strategy for this chapter?',o:['State the point, explain Padma’s reasoning, and connect it to the social message','Only retell the dialogue','Only define one word','Write unrelated examples'],a:0,e:'A strong answer combines content, reasoning and theme.'},
 {q:'Which student habit is most encouraged by the chapter?',o:['Critical thinking','Blind memorisation','Avoiding questions','Copying others'],a:0,e:'The lesson strongly rewards reasoned questioning.'},
 {q:'What should a student do when tradition and fairness seem to conflict?',o:['Examine the reason and consequences carefully','Accept tradition without thinking','Reject everything immediately','Ignore the issue'],a:0,e:'The lesson encourages thoughtful evaluation, not blind acceptance or automatic rejection.'},
 {q:'Why is Padma’s conflict not mainly a physical fight?',o:['The struggle happens through questions and competing social ideas','The characters use no language','The story is about sports','There is no disagreement'],a:0,e:'The drama centres on an intellectual and social conflict.'}
];

const finalTest=[...practice.slice(0,10),...challenge.slice(0,10)].map((x,i)=>({...x,id:`panorama-final-${i}`}));

function shuffleQuestion(q,i){
  const shift=(i*3)%q.o.length;
  const o=q.o.map((_,idx)=>q.o[(idx+shift)%q.o.length]);
  const a=(q.a-shift+q.o.length)%q.o.length;
  return {...q,o,a};
}

function StudyView(){
  const [openGrammar,setOpenGrammar]=useState(null);
  return <div className="pg-learn">
    <div className="pg-callout pg-no-book"><b>📘 Complete Guided Study</b><span>इस page में chapter flow, आसान हिन्दी explanation, vocabulary, word study, grammar और exam preparation एक ही जगह है।</span></div>
    <section className="pg-panel"><div className="pg-panel-title"><span>ABOUT THE LESSON</span><h2>Chapter का basic idea</h2></div><p>{study.intro}</p><div className="pg-author"><b>लेखक परिचय</b><p>{study.authorNote}</p></div></section>

    <div className="pg-anchorbar"><a href="#guided">Guided Reading</a><a href="#words">Word Study</a><a href="#grammar">Grammar</a><a href="#exam">Exam Prep</a></div>

    <section id="guided" className="pg-section-heading"><span>01</span><div><small>READ • UNDERSTAND • REMEMBER</small><h2>Guided Reading</h2><p>हर block chapter के flow को 3–5 आसान English sentences में बताता है, फिर हिन्दी में समझाता है।</p></div></section>

    <div className="pg-reading-stack">
      {study.sections.map((s,i)=><article className="pg-reading-card" key={s.title}>
        <div className="pg-card-top"><div className="pg-num">{String(i+1).padStart(2,'0')}</div><div><span>CHAPTER FLOW</span><h3>{s.title}</h3></div></div>
        <div className="pg-flow"><div className="pg-flow-label">सरल English में पढ़ें</div><p>{s.flow}</p></div>
        <div className="pg-hindi"><div className="pg-flow-label">हिन्दी में समझें</div><p>{s.explanation}</p></div>
        <div className="pg-vocab-head">Vocabulary</div><div className="pg-vocab-grid">{s.vocabulary.map(([w,m])=><div className="pg-vocab" key={w}><b>{w}</b><span>{m}</span></div>)}</div>
        <div className="pg-bottom-grid"><div className="pg-exam"><b>🎯 Exam Point</b><span>{s.exam}</span></div><div className="pg-think"><b>💡 Think</b><span>{s.think}</span></div></div>
      </article>)}
    </div>

    <section id="words" className="pg-section-heading compact"><span>02</span><div><small>LANGUAGE BUILDING</small><h2>Word Study</h2><p>Chapter के important words, spelling, suffix और phrases को एक साथ revise करें।</p></div></section>
    <div className="pg-tool-grid">
      <section className="pg-panel"><h3>Glossary</h3><div className="pg-glossary">{study.glossary.map(([w,m])=><div key={w}><b>{w}</b><span>{m}</span></div>)}</div></section>
      <section className="pg-panel"><h3>Correct the spelling</h3><div className="pg-spelling">{study.wordStudy.spellings.map(([bad,good])=><div key={bad}><del>{bad}</del><b>→ {good}</b></div>)}</div></section>
    </div>
    <div className="pg-tool-grid">
      <section className="pg-panel"><h3>-less Word Formation</h3><p className="pg-muted">“-less” का अर्थ होता है “बिना”. नीचे 10 useful examples हैं।</p><div className="pg-pillgrid">{study.wordStudy.less.map(([w,m])=><div key={w}><b>{w}</b><span>{m}</span></div>)}</div></section>
      <section className="pg-panel"><h3>Meaning Match</h3><div className="pg-match">{study.wordStudy.meanings.map(([q,a])=><div key={q}><span>{q}</span><b>{a}</b></div>)}</div></section>
    </div>
    <section className="pg-panel"><h3>Important Phrases</h3><div className="pg-phrasegrid">{study.wordStudy.phrases.map(([p,m])=><div key={p}><b>{p}</b><span>{m}</span></div>)}</div></section>

    <section id="grammar" className="pg-section-heading compact"><span>03</span><div><small>GRAMMAR LAB</small><h2>{study.grammar.title}</h2><p>{study.grammar.intro}</p></div></section>
    <section className="pg-panel">
      <h3>Uses of infinitive</h3><div className="pg-grammar-grid">{study.grammar.uses.map(([t,e,x])=><div key={t}><b>{t}</b><code>{e}</code><span>{x}</span></div>)}</div>
      <div className="pg-two-col"><div><h3>Kinds</h3>{study.grammar.kinds.map(([t,e])=><div className="pg-kind" key={t}><b>{t}</b><span>{e}</span></div>)}</div><div className="pg-rulebox"><b>Golden Rule</b><span>पहले “to + verb” पहचानें। फिर देखें कि sentence किसी special structure में है या नहीं। Special verbs/expressions में bare infinitive आ सकता है।</span></div></div>
    </section>
    <section className="pg-panel"><h3>Special cases</h3><div className="pg-accordion">{study.grammar.special.map(([t,d,e],i)=><div key={t} className={`pg-acc ${openGrammar===i?'open':''}`}><button onClick={()=>setOpenGrammar(openGrammar===i?null:i)}><span>{String(i+1).padStart(2,'0')}</span><b>{t}</b><strong>{openGrammar===i?'−':'+'}</strong></button>{openGrammar===i&&<div className="pg-acc-body"><p>{d}</p><code>{e}</code></div>}</div>)}</div></section>

    <section id="exam" className="pg-section-heading compact"><span>04</span><div><small>BSEB-STYLE PREPARATION</small><h2>Exam Booster</h2><p>Very short, long answer, discussion, composition और translation practice—सब एक जगह।</p></div></section>
    <div className="pg-exam-grid">
      <section className="pg-panel"><h3>Very Short Answer</h3><ol>{study.examPrep.veryShort.map(q=><li key={q}>{q}</li>)}</ol></section>
      <section className="pg-panel"><h3>Long Answer</h3><ol>{study.examPrep.long.map(q=><li key={q}>{q}</li>)}</ol></section>
    </div>
    <div className="pg-exam-grid">
      <section className="pg-panel"><h3>Group Discussion</h3><ol>{study.examPrep.discussion.map(q=><li key={q}>{q}</li>)}</ol></section>
      <section className="pg-panel"><h3>Composition Practice</h3><ol>{study.examPrep.composition.map(q=><li key={q}>{q}</li>)}</ol></section>
    </div>
    <section className="pg-panel"><h3>Activities — curiosity + research</h3><div className="pg-activitygrid">{study.activities.map((x,i)=><div key={x}><span>{i+1}</span><p>{x}</p></div>)}</div></section>
    <section className="pg-panel"><h3>Translation Practice</h3><p className="pg-muted">पहले खुद translate करें, फिर answer देखकर check करें। ये sentences chapter के infinitive idea और daily-life English से जुड़े हैं।</p><div className="pg-translation">{study.translationPractice.map(([hi,en],i)=><div key={hi}><span>{i+1}</span><b>{hi}</b><em>{en}</em></div>)}</div></section>
    <section className="pg-panel pg-revision"><h3>⚡ 30-second Revision</h3><div className="pg-revision-grid"><div><b>Identity</b><span>किसी woman की पहचान किससे बनती है?</span></div><div><b>Marriage</b><span>क्या marriage ही identity का source है?</span></div><div><b>Rights</b><span>Questions पूछने और बराबरी का अधिकार।</span></div><div><b>Double Standard</b><span>Same situation, अलग social judgement.</span></div><div><b>Dignity</b><span>रिश्ते में respect और human worth.</span></div><div><b>Critical Thinking</b><span>Rule को reason और fairness से test करना।</span></div></div></section>
  </div>;
}

export function EnglishPanoramaChapter1({initialMode=null,onBack,addXp,finishSession}){
  const [mode,setMode]=useState(initialMode);
  const [idx,setIdx]=useState(0);
  const [selected,setSelected]=useState(null);
  const [score,setScore]=useState(0);
  const [result,setResult]=useState(null);
  const bank=useMemo(()=>mode==='practice'?practice:mode==='challenge'?challenge:mode==='test'?finalTest:[],[mode]);
  const current=bank[idx]?shuffleQuestion(bank[idx],idx):null;
  const begin=m=>{setMode(m);setIdx(0);setSelected(null);setScore(0);setResult(null)};
  const choose=n=>{
    if(selected!==null||!current)return;
    setSelected(n);
    const nextScore=score+(n===current.a?1:0);
    if(idx===bank.length-1){
      const finalScore=nextScore;
      const pct=Math.round((finalScore/bank.length)*100);
      setResult({score:finalScore,total:bank.length,pct});
      if(addXp)addXp(finalScore*2+(mode==='challenge'?4:2));
      if(finishSession)finishSession({subject:'english',book:'The Panorama',chapter:'Dharam Juddha',mode,score:finalScore,total:bank.length,pct,completedAt:new Date().toISOString()});
    }else{
      setScore(nextScore);
    }
  };
  const next=()=>{if(selected===null)return;setIdx(i=>i+1);setSelected(null)};
  if(result)return <div className="pg-shell"><div className="pg-result"><span>TEST COMPLETE</span><h2>{result.score}/{result.total}</h2><p>{result.pct}% score</p><div className="pg-result-message">{result.pct>=80?'बहुत बढ़िया! अब chapter को exam point से एक बार revise कर लो।':result.pct>=60?'अच्छा प्रयास! गलत answers की explanation पढ़कर फिर कोशिश करो।':'Basics से दुबारा start करो और Guided Reading के blocks revise करो।'}</div><div className="pg-result-actions"><button onClick={()=>begin(mode)}>Try Again</button><button className="primary" onClick={()=>begin('practice')}>Practice Again</button><button onClick={onBack}>Back to English</button></div></div></div>;
  if(mode==='learn'||mode===null)return <div className="pg-shell">
    <header className="pg-hero"><div className="pg-kicker">THE PANORAMA • PROSE 1</div><h1>{study.title}</h1><p>{study.author} · Complete guided study</p><div className="pg-hero-stats"><span>12 Guided Parts</span><span>60+ Vocabulary</span><span>Infinitive Lab</span><span>15 + 23 + 20 Questions</span></div></header>
    <div className="pg-modebar"><button className={mode==='learn'?'active':''} onClick={()=>begin('learn')}><b>Learn</b><span>पूरा chapter समझें</span></button><button onClick={()=>begin('practice')}><b>Practice</b><span>15 questions</span></button><button onClick={()=>begin('challenge')}><b>Challenge</b><span>23 thinking questions</span></button><button onClick={()=>begin('test')}><b>Final Test</b><span>20 mixed questions</span></button></div>
    <button className="pg-back" onClick={onBack}>← English books</button><StudyView/>
  </div>;

  const progress=Math.round(((idx+(selected!==null?1:0))/bank.length)*100);
  return <div className="pg-shell"><div className="pg-quiz-wrap"><button className="pg-back" onClick={()=>begin('learn')}>← Back to Learn</button><div className="pg-quiz-head"><div><span>{mode==='practice'?'PRACTICE':mode==='challenge'?'CHALLENGE':'FINAL TEST'}</span><h2>{study.title}</h2></div><b>{idx+1}/{bank.length}</b></div><div className="pg-progress"><i style={{width:`${progress}%`}}/></div><div className="pg-question-card"><span className="pg-qtag">Question {idx+1}</span><h3>{current.q}</h3><div className="pg-options">{current.o.map((o,i)=>{const cls=selected===null?'':i===current.a?'correct':i===selected?'wrong':'';return <button key={o} className={`pg-option ${cls}`} onClick={()=>choose(i)} disabled={selected!==null}><span>{String.fromCharCode(65+i)}</span><b>{o}</b></button>})}</div>{selected!==null&&<div className={`pg-feedback ${selected===current.a?'good':'bad'}`}><b>{selected===current.a?'✓ Correct':'✗ Not quite'}</b><p>{current.e}</p><button className="pg-next" onClick={idx===bank.length-1?()=>setResult({score:score+(selected===current.a?1:0),total:bank.length,pct:Math.round(((score+(selected===current.a?1:0))/bank.length)*100)}):next}>{idx===bank.length-1?'View Result':'Next Question →'}</button></div>}</div></div></div>;
}

export const englishPanoramaChapter1Meta={title:study.title,author:study.author,book:'The Panorama',type:'Prose'};
export const englishPanoramaChapter1Study=study;
