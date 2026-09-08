import './english-reader.css';
import React,{useMemo,useState} from 'react';

const study={
  title:'Dharam Juddha',
  author:'Arjun Dev Charan',
  sourceNote:'Class 9 English Panorama-I • Prose Chapter 1',
  intro:'यह एक dialogue-based social play है। Padma अपनी माँ और पिता से महिला की पहचान, विवाह, अधिकार और समाज के दोहरे मानदंडों पर सवाल करती है। नीचे दिया गया study guide PDF के पूरे chapter structure को आसान भाषा में समझाता है।',
  sections:[
    {title:'1. शुरुआत — Padma का मुख्य सवाल',
      source:'Padma begins by asking her mother a basic but difficult question: what gives a woman her identity? She also asks how she is different from other people. Her questions are not about money or status; they are about a person’s place and dignity. The conversation quickly moves from the family to a wider social issue.',
      explanation:'Padma का पहला सवाल पूरे पाठ की दिशा तय करता है। वह जानना चाहती है कि किसी महिला की पहचान आखिर किस चीज़ से बनती है। यह केवल व्यक्तिगत सवाल नहीं है; इसके पीछे समाज की सोच पर सवाल छिपा है।',
      vocabulary:[['identity','पहचान'],['dignity','गरिमा / सम्मान'],['status','सामाजिक स्थिति'],['issue','मुद्दा'],['wider','व्यापक']]
    },
    {title:'2. माँ का उत्तर — परिवार और पिता से जुड़ी पहचान',
      source:'The mother answers from the traditional family viewpoint. She explains that Padma is her daughter and her father’s beloved child. She says that her own identity is closely connected with her husband and family. For her, this bond is natural and valuable.',
      explanation:'माँ का विचार परंपरागत है। वह अपनी पहचान को पति और परिवार से जोड़कर देखती है। उसे यह संबंध बहुत स्वाभाविक लगता है, इसलिए Padma का सवाल उसे असामान्य और परेशान करने वाला लगता है।',
      vocabulary:[['traditional','परंपरागत'],['bond','रिश्ता / जुड़ाव'],['closely','बहुत निकट रूप से'],['beloved','प्रिय'],['viewpoint','दृष्टिकोण']]
    },
    {title:'3. Padma का तर्क — “क्या विवाह पहचान देता है?”',
      source:'When her father joins the conversation, Padma repeats her question. The traditional answer says that a woman will understand her identity when she gets married. Padma immediately tests that idea: if marriage gives identity, what happens to a woman who never marries? She refuses to accept an answer simply because it is socially common.',
      explanation:'यहीं से Padma का तर्क और मजबूत होता है। वह सीधे पूछती है कि अगर विवाह ही पहचान देता है, तो अविवाहित महिला की पहचान क्या होगी। वह केवल उत्तर सुनना नहीं चाहती; वह उत्तर की logic को जाँचती है।',
      vocabulary:[['marriage','विवाह'],['unmarried','अविवाहित'],['logic','तर्क'],['common','प्रचलित / सामान्य'],['accept','स्वीकार करना']]
    },
    {title:'4. “सही” और “गलत” की बात — Padma का विरोध',
      source:'Padma becomes unhappy when she feels that an unfair rule is being treated as normal. Her mother warns her that some questions are not welcomed by women in their social setting. Padma asks why women should lose the right to question. This changes the conversation from family advice into a discussion of rights and justice.',
      explanation:'Padma को लगता है कि समाज में केवल इसलिए किसी नियम को सही नहीं मान लेना चाहिए क्योंकि वह पुराना है। वह पूछती है कि महिलाओं को सवाल करने का अधिकार क्यों नहीं होना चाहिए। इस हिस्से में “rights” और “justice” महत्वपूर्ण विचार बन जाते हैं।',
      vocabulary:[['unfair','अन्यायपूर्ण'],['welcomed','स्वीकार किया गया'],['right','अधिकार'],['justice','न्याय'],['warn','चेतावनी देना']]
    },
    {title:'5. घर या “बाज़ार”? — विवाह पर तीखा सवाल',
      source:'Padma questions the idea that a woman’s home can be treated like a place for negotiation or bargaining. Her point is that marriage should not reduce a woman to an object of exchange. The question makes the social problem sharper and forces the reader to think about dignity.',
      explanation:'यहाँ Padma विवाह के उस रूप पर सवाल करती है जिसमें लड़की को किसी सौदे की चीज़ की तरह देखा जाता है। उसका तर्क है कि घर सम्मान और समानता का स्थान होना चाहिए, bargaining का नहीं। यही बात पाठ के title के सामाजिक conflict को मजबूत करती है।',
      vocabulary:[['bargaining','सौदेबाज़ी'],['object','वस्तु'],['exchange','लेन-देन / अदला-बदली'],['reduce','कम करके देखना'],['negotiation','बातचीत / सौदे की प्रक्रिया']]
    },
    {title:'6. सबसे मजबूत उदाहरण — अविवाहित पुरुष और महिला',
      source:'Padma gives a sharp comparison between an unmarried man and an unmarried woman. Society may respect or even praise the unmarried man, while an unmarried woman may be judged with insulting labels. Padma sees this difference as evidence of a double standard. The comparison turns her personal question into a social criticism.',
      explanation:'यह chapter का सबसे important reasoning point है। Padma दिखाती है कि एक ही स्थिति में पुरुष और महिला को अलग-अलग नज़र से देखा जाता है। वह इसे double standard कहकर सामाजिक असमानता को सामने लाती है।',
      vocabulary:[['comparison','तुलना'],['judge','निर्णय करना / आकलन करना'],['insulting','अपमानजनक'],['double standard','दोहरा मानदंड'],['evidence','प्रमाण / संकेत']]
    },
    {title:'7. Padma बनाम परंपरागत सोच — असली conflict',
      source:'The parents mostly repeat what society has taught them about women and marriage. Padma keeps asking whether those beliefs are fair. The conflict is mainly a conflict of ideas, not a physical fight. That is why the title can be understood as a struggle over values, beliefs and justice.',
      explanation:'Padma का संघर्ष अपने माता-पिता से व्यक्तिगत दुश्मनी नहीं है। असली conflict पुरानी सोच और तर्कपूर्ण सवाल के बीच है। इसी कारण title को विचारों की लड़ाई के रूप में समझना useful है।',
      vocabulary:[['belief','विश्वास / धारणा'],['conflict','संघर्ष'],['value','मूल्य'],['struggle','संघर्ष / जद्दोजहद'],['fair','न्यायपूर्ण']]
    },
    {title:'8. Chapter का social message',
      source:'The lesson asks readers to think about identity as something connected with human worth, not only with marriage. It also asks whether customs treat men and women fairly. The play does not simply tell the reader what to think; it creates questions so the reader can examine society critically.',
      explanation:'पाठ का main message है कि किसी व्यक्ति की पहचान को केवल विवाह से नहीं बाँधना चाहिए। स्त्री और पुरुष दोनों की human dignity और equality को समझना जरूरी है। साथ ही, परंपराओं को बिना सोचे मानने के बजाय यह देखना चाहिए कि वे न्यायपूर्ण हैं या नहीं।',
      vocabulary:[['human worth','मानवीय मूल्य'],['custom','परंपरा / प्रथा'],['critically','आलोचनात्मक रूप से'],['dignity','गरिमा'],['equality','समानता']]
    }
  ],
  characters:[
    ['Padma','शिक्षित, जिज्ञासु और तर्कशील युवती। वह परंपरागत उत्तरों से संतुष्ट नहीं होती और स्त्री की स्वतंत्र पहचान, अधिकार और समानता पर सवाल करती है।'],
    ['Mother','परंपरागत सामाजिक सोच का प्रतिनिधित्व करती हैं। उनके विचार में महिला की पहचान परिवार और पति के संबंध से गहराई से जुड़ी है।'],
    ['Father','व्यावहारिक लेकिन पारंपरिक सामाजिक दृष्टिकोण रखते हैं। वे विवाह को महिला की पहचान से जोड़ते हैं, जिससे Padma और अधिक प्रश्न करती है।']
  ],
  themes:[
    ['Women’s identity','महिला की पहचान केवल वैवाहिक स्थिति से तय नहीं होनी चाहिए।'],
    ['Equality and dignity','स्त्री और पुरुष दोनों समान मानवीय सम्मान और अधिकार के योग्य हैं।'],
    ['Questioning traditions','हर पुरानी बात केवल पुरानी होने से सही नहीं हो जाती; उसके आधार और न्याय को समझना चाहिए।'],
    ['Double standards','समान स्थिति में पुरुष और महिला के लिए अलग सामाजिक judgement को पाठ चुनौती देता है।']
  ],
  glossary:[
    ['identity','पहचान'],['darling','बहुत प्रिय व्यक्ति / प्यारा'],['bestow','प्रदान करना / देना'],['cherish','बहुत प्यार से रखना'],['senseless','बेतुका / बिना अर्थ का'],['son','पुत्र'],['venerate','सम्मान / श्रद्धा देना'],['saint','संत'],['immoral','अनैतिक'],['wanton','अनियंत्रित / उच्छृंखल'],['orthodox','रूढ़िवादी'],['agitated','व्याकुल / बेचैन'],['uncharitable','असहानुभूतिपूर्ण / उदारता-विहीन']
  ],
  wordStudy:[
    ['identiti','identity'],['defferent','different'],['bestowe','bestow'],['sensless','senseless'],['bargen','bargain'],['socity','society'],['doughter','daughter'],['injustive','injustice'],['mariag','marriage']
  ],
  multiMeanings:[
    ['money','धन','पैसा'],['save','बचाना','सुरक्षित रखना'],['child','बच्चा','संतान'],['husband','पति','कुशलता से सँभालना (verb usage in general English)'],['hell','नरक','बहुत खराब स्थिति'],['venerate','पूजना / सम्मान करना','गहरा आदर करना'],['saint','संत','बहुत अच्छे / आदर्श व्यक्ति के लिए सामान्य प्रयोग'],['wanton','उच्छृंखल','नियंत्रणहीन / मनमाना']
  ],
  lessWords:[['sense','senseless'],['care','careless'],['flaw','flawless'],['harm','harmless'],['hope','hopeless'],['use','useless'],['fear','fearless'],['help','helpless'],['home','homeless'],['end','endless']],
  wordMeaning:[['person of great holiness','saint'],['unchaste','immoral'],['treated with respect','venerated'],['to hold as dear','cherish'],['individuality','identity'],['unreasonable','senseless']],
  phrases:[['care for','देखभाल करना / परवाह करना'],['for one’s sake','किसी की भलाई/खातिर'],['in any way','किसी भी तरह'],['what if','अगर ऐसा हो तो?'],['for equals','समान लोगों के लिए / बराबरी के लिए'],['a place for bargaining','सौदेबाज़ी की जगह']]
};

const grammar={
 title:'Infinitives — पूरी grammar revision',
 intro:'PDF के grammar section में “to + verb” और bare infinitive यानी बिना “to” वाले verb forms समझाए गए हैं। इसे examples के साथ याद करना आसान है।',
 uses:[
  ['1. Subject','To swim is a good exercise. → यहाँ “to swim” sentence का subject है।'],
  ['2. Object','We eat to live. / He gave me a book to read. → infinitive purpose या verb-complement के रूप में आ सकता है।'],
  ['3. Adjective-like use','I have a stick to walk on. → “to walk on” noun को qualify करता है।'],
  ['4. Adverb-like use','The students work hard to pass the examination. → यहाँ purpose बताता है।']
 ],
 kinds:[['Infinitive with to','to read, to write, to eat, to go, to buy'],['Infinitive without to','read, write, eat, go, buy']],
 special:[
  ['After certain adjectives','angry, astonished, delighted, disappointed, glad, surprised, horrified + to-infinitive. Example: “I was horrified to see the scene.”'],
  ['Know + how/what + infinitive','know how to play, know how to drive, know how to swim; also know what to do.'],
  ['make / let / hear / see etc.','Active voice में कई verbs के बाद bare infinitive आता है: make, feel, find, let, bid, see, smell, hear, watch.'],
  ['Passive voice','Active “I watched him cross...” के passive में “He was watched to cross...” जैसा to-infinitive आता है।'],
  ['let','Active: “I let them do it.” Passive: “They were let to do it.”'],
  ['had better / would rather','इनके बाद सामान्यतः bare infinitive: You had better go. / She would rather attend.'],
  ['had sooner / would sooner','इनके बाद भी bare infinitive: He had sooner take care of his health.'],
  ['had rather / would rather','Bare infinitive: They would rather go by bus.'],
  ['but / than after do','जब पहले “do” आता है, but/than के बाद bare infinitive: She did nothing but read. / You did no more than cut a joke.']
 ]
};

const practice=[
 {q:'Who is the central character of “Dharam Juddha”?',o:['Padma','Sonal Mansingh','Ismat Chughtai','Bismillah Khan'],a:0,e:'Padma drives the central discussion about women’s identity.'},
 {q:'What is Padma mainly trying to understand?',o:["A woman’s identity",'A dance performance','A travel route','A musical instrument'],a:0,e:'Her repeated question is about the identity of a woman.'},
 {q:'The lesson is mainly presented through:',o:['dialogue','a travel diary','a scientific report','a poem'],a:0,e:'The chapter is a social play built around conversation.'},
 {q:'Which quality best describes Padma?',o:['Questioning and thoughtful','Careless and indifferent','Silent and passive','Uninterested in society'],a:0,e:'She keeps testing the traditional answers with questions.'},
 {q:'According to the traditional view shown in the play, a woman’s identity is strongly linked with:',o:['marriage and husband','travel and education','wealth and books','music and art'],a:0,e:'The parents connect the woman’s identity with marriage and husband.'},
 {q:'Which word means “पहचान”?',o:['identity','justice','dignity','veneration'],a:0,e:'Identity means the distinct sense of who a person is.'},
 {q:'What does “equality” mean here?',o:['equal human worth and rights','complete silence','obedience to tradition','financial success'],a:0,e:'Equality means fair and equal status or rights.'},
 {q:'Why does Padma question marriage as the basis of identity?',o:['She sees identity as more fundamental than marital status','She dislikes all family relationships','She wants to avoid education','She is planning a journey'],a:0,e:'She asks what identity would mean for an unmarried woman.'},
 {q:'Which social issue is highlighted by the different treatment of unmarried men and women?',o:['Double standards','Environmental pollution','Scientific progress','Travel difficulties'],a:0,e:'The same social condition is judged differently because of gender.'},
 {q:'Which theme is most central to the lesson?',o:["Women’s identity and equality",'Adventure and exploration','Nature and seasons','Science and technology'],a:0,e:'Identity, dignity, equality and social attitudes are central.'},
 {q:'Why is Padma’s questioning important?',o:['It makes accepted assumptions open to examination','It ends the need for education','It proves every tradition is wrong','It avoids all family discussion'],a:0,e:'Her questions encourage critical thinking.'},
 {q:'What does “justice” mean?',o:['fairness','wealth','silence','celebration'],a:0,e:'Justice means fairness and right treatment.'},
 {q:'Which character mainly represents conventional social thinking?',o:['Mother','Padma','the reader','a dancer'],a:0,e:'Mother reflects the conventional view described in the dialogue.'},
 {q:'What is the strongest contrast in the lesson?',o:["Padma’s independent questioning vs. traditional responses",'city vs. village scenery','science vs. religion','music vs. dance'],a:0,e:'The main conflict is between a questioning mind and inherited social beliefs.'},
 {q:'The title “Dharam Juddha” is most closely connected with:',o:['a conflict over social values and beliefs','a sports competition','a school examination','a travel adventure'],a:0,e:'The “battle” is mainly a struggle of ideas.'}
];

const challenge=[
 {q:'Why is Padma’s question about identity deeper than a question about marriage?',o:['It asks whether a person’s worth can exist independently of marital status','It asks only when a wedding should occur','It rejects every family relationship','It focuses only on money'],a:0,e:'She is testing whether marriage should define a woman’s basic identity.'},
 {q:'Which inference best follows from Padma’s reasoning?',o:['Social customs should be examined for fairness rather than accepted automatically','Tradition is always harmful','Families cannot influence values','Education has no role in social thinking'],a:0,e:'Her method is to question and test, not simply reject everything.'},
 {q:'What makes the social criticism effective?',o:['A difficult social question is placed inside an ordinary family conversation','It gives a long historical lecture','It avoids disagreement among characters','It uses only abstract definitions'],a:0,e:'The family setting makes the larger issue easy to connect with.'},
 {q:'Why is the unmarried-man/unmarried-woman comparison significant?',o:['It exposes unequal standards used to judge people by gender','It compares two professions','It explains a legal procedure','It describes a festival'],a:0,e:'The comparison shows a gender-based double standard.'},
 {q:'Which statement best distinguishes Padma from her mother?',o:['Padma asks whether the rule is just; her mother largely accepts the rule','Padma avoids questions while her mother investigates them','Both hold exactly the same view','Padma cares only about money'],a:0,e:'The key difference is critical questioning versus acceptance of convention.'},
 {q:'If a custom gives different freedoms to men and women without a fair reason, which concept helps critique it?',o:['Equality','Silence','Entertainment','Profit'],a:0,e:'Equality is the relevant principle.'},
 {q:'Why can the lesson be read as a study of social conditioning?',o:['The parents’ responses show how social beliefs shape ideas about women’s roles','The characters are trained as athletes','The lesson describes classroom experiments','The story is about weather'],a:0,e:'The parents reproduce ideas learned from the surrounding society.'},
 {q:'Which evidence most strongly supports the theme of independent thought?',o:['Padma keeps asking questions even when the traditional answer is presented as normal','Padma avoids speaking to anyone','Mother asks Padma to travel','Father changes the subject to music'],a:0,e:'Her persistence is evidence of independent reasoning.'},
 {q:'What is the most balanced interpretation of the parents?',o:['They represent a conventional social viewpoint rather than simply being individual villains','They are completely unrelated to the issue','They are only comic characters','They reject every family value'],a:0,e:'Their dramatic function is to voice conventional beliefs.'},
 {q:'Why is “double standard” stronger than simply saying “difference”?',o:['It implies an unfair difference in judgement between comparable cases','It means two identical answers','It describes a grammar rule','It only refers to two objects'],a:0,e:'A double standard suggests unfairly different judgement.'},
 {q:'Which conclusion best captures the educational value of the lesson?',o:['Readers should question unfair assumptions and think about dignity and equality','Readers should reject all traditions immediately','Readers should avoid difficult conversations','Readers should judge people by marital status'],a:0,e:'The lesson encourages reasoned questioning of unfair assumptions.'},
 {q:'Why does the title work as a title for the conflict?',o:['The real “battle” is between ideas about identity, custom and justice','The story is about a battlefield','The characters fight a physical war','It refers to a sporting match'],a:0,e:'The central struggle is between competing social ideas.'}
];

const finalExtras=[
 {q:'Which word from the chapter means “treated with respect”?',o:['venerated','senseless','wanton','bestow'],a:0,e:'Venerated means treated with deep respect.'},
 {q:'Which is the correct spelling?',o:['marriage','mariage','marraige','marrige'],a:0,e:'The correct spelling is marriage.'},
 {q:'Which word is formed by adding -less to “care”?',o:['careless','careful','caring','cared'],a:0,e:'care + less = careless.'},
 {q:'Choose the best completion: “To swim ___ a good exercise.”',o:['is','are','be','being'],a:0,e:'The infinitive phrase acts as the subject, so the singular verb is is.'},
 {q:'In “The students work hard to pass the examination”, the infinitive mainly expresses:',o:['purpose','person','place','possession'],a:0,e:'“to pass” tells why the students work hard.'},
 {q:'Which sentence correctly uses a bare infinitive after would rather?',o:['They would rather go by bus.','They would rather to go by bus.','They rather would to go by bus.','They would rather going by bus.'],a:0,e:'Would rather is followed by the base form of the verb.'},
 {q:'Which sentence correctly uses the passive pattern with watch?',o:['He was watched to cross the river.','He was watched cross the river.','He watched to cross the river.','He was to watched cross the river.'],a:0,e:'The chapter explains the shift to to-infinitive in the passive pattern.'},
 {q:'Which sentence correctly uses “let”?',o:['I let them do it.','I let them to do it.','I let to them do it.','I letting them to do it.'],a:0,e:'Let is followed by the object + bare infinitive in active voice.'},
 {q:'Which phrase means “किसी की खातिर”?',o:["for one’s sake",'in any way','care for','for equals'],a:0,e:'For one’s sake means for someone’s benefit or reason.'},
 {q:'Which point is closest to the main message of the play?',o:['A person’s identity should not be reduced to social labels','Marriage alone gives every person identity','Traditions never need examination','Only parents can define identity'],a:0,e:'The play challenges the idea of reducing identity to social labels.'}
];

const finalTest=[...practice.slice(0,10),...challenge.slice(0,8),...finalExtras.slice(0,2)].map((x,i)=>({...x,id:`panorama-final-${i}`}));
function shuffleQuestion(q,i){const shift=(i*3)%q.o.length;const o=q.o.map((_,idx)=>q.o[(idx+shift)%q.o.length]);const a=(q.a-shift+q.o.length)%q.o.length;return {...q,o,a};}

function Pill({children}){return <span className="lesson-pill">{children}</span>}

function Lesson({onBack}){
 const [showGrammar,setShowGrammar]=useState(true);
 return <div className="lesson-wrap">
  <div className="lesson-head">
   <button className="back-btn" onClick={onBack}>← Back</button>
   <div><Pill>Panorama • Prose 1</Pill><h1>{study.title}</h1><p className="lesson-sub">{study.author} • Hindi guided study + exam preparation</p></div>
  </div>

  <section className="lesson-card highlight"><h2>Chapter Snapshot</h2><p>{study.intro}</p></section>

  <section className="lesson-card">
   <h2>खंड-दर-खंड समझिए</h2>
   <p className="muted">नीचे English gist 3–5 sentences के छोटे study blocks में है। यह पूरा textbook text copy नहीं करता; इसके बाद सरल हिन्दी explanation दिया गया है।</p>
   <div className="lesson-stack">{study.sections.map((s,i)=><article className="study-block" key={s.title}>
    <div className="study-number">{i+1}</div>
    <div className="study-content"><h3>{s.title}</h3><div className="source-box"><strong>English gist</strong><p>{s.source}</p></div><div className="explain-box"><strong>आसान हिन्दी में समझें</strong><p>{s.explanation}</p></div><div className="vocab-row">{s.vocabulary.map(([w,m])=><span className="vocab-chip" key={w}><b>{w}</b> — {m}</span>)}</div></div>
   </article>)}</div>
  </section>

  <section className="lesson-grid">
   <div className="lesson-card"><h2>Characters</h2>{study.characters.map(([n,d])=><div className="mini-item" key={n}><b>{n}</b><p>{d}</p></div>)}</div>
   <div className="lesson-card"><h2>Main Themes</h2>{study.themes.map(([n,d])=><div className="mini-item" key={n}><b>{n}</b><p>{d}</p></div>)}</div>
  </section>

  <section className="lesson-card"><h2>Glossary — textbook words</h2><div className="vocab-grid">{study.glossary.map(([w,m])=><div className="vocab-card" key={w}><b>{w}</b><span>{m}</span></div>)}</div></section>

  <section className="lesson-grid">
   <div className="lesson-card"><h2>D.1 Dictionary / Spelling Practice</h2><p className="muted">PDF के spelling exercise के corrected forms:</p>{study.wordStudy.map(([wrong,right])=><div className="row-pair" key={wrong}><span>{wrong}</span><b>→ {right}</b></div>)}</div>
   <div className="lesson-card"><h2>D.2 Word Formation: -less</h2>{study.lessWords.map(([a,b])=><div className="row-pair" key={a}><span>{a} + less</span><b>→ {b}</b></div>)}</div>
  </section>

  <section className="lesson-grid">
   <div className="lesson-card"><h2>D.3 Word Meaning</h2>{study.wordMeaning.map(([q,a])=><div className="row-pair" key={q}><span>{q}</span><b>{a}</b></div>)}</div>
   <div className="lesson-card"><h2>D.4 Important Phrases</h2>{study.phrases.map(([p,m])=><div className="row-pair" key={p}><span>{p}</span><b>{m}</b></div>)}</div>
  </section>

  <section className="lesson-card"><h2>Grammar Lab — Infinitives</h2><p>{grammar.intro}</p><button className="mode-btn" onClick={()=>setShowGrammar(v=>!v)}>{showGrammar?'Hide grammar notes':'Show grammar notes'}</button>{showGrammar&&<div className="lesson-stack compact">
    {grammar.uses.map(([t,d])=><div className="mini-item" key={t}><b>{t}</b><p>{d}</p></div>)}
    <div className="lesson-grid">{grammar.kinds.map(([t,d])=><div className="grammar-card" key={t}><b>{t}</b><p>{d}</p></div>)}</div>
    {grammar.special.map(([t,d])=><div className="mini-item" key={t}><b>{t}</b><p>{d}</p></div>)}
   </div>}
  </section>

  <section className="lesson-card highlight"><h2>Exam Booster</h2><div className="exam-grid">
    <div><b>Remember</b><p>Padma → questioning mind; Mother → traditional view; Father → conventional marriage-based answer.</p></div>
    <div><b>Long answer idea</b><p>उत्तर में identity + marriage + double standard + equality + dignity को जोड़कर लिखें।</p></div>
    <div><b>Grammar trap</b><p>Would rather / had better / had sooner के बाद bare infinitive आता है। Passive structures के साथ pattern बदल सकता है।</p></div>
    <div><b>Curiosity</b><p>पाठ का conflict केवल परिवार का disagreement नहीं है; यह society के rules को जाँचने की कोशिश है।</p></div>
  </div></section>

  <section className="lesson-card"><h2>Chapter Quick Revision</h2><div className="quick-lines">
   <p><b>Central question:</b> क्या महिला की पहचान केवल विवाह से तय होती है?</p>
   <p><b>Core conflict:</b> Padma की critical thinking बनाम traditional social beliefs.</p>
   <p><b>Most important concept:</b> Double standard — समान स्थिति में अलग सामाजिक judgement.</p>
   <p><b>Core values:</b> Equality, dignity, justice, independent thought.</p>
  </div></section>

  <section className="lesson-card"><h2>Book Activities — तैयारी</h2><p>PDF में Constitution द्वारा women safeguards और women’s condition reform करने वाले लोगों पर research activity दी गई है। इसे answer करते समय नाम + एक-line contribution लिखना useful रहेगा।</p><p>Translation practice के लिए छोटे Hindi sentences को पहले subject + verb + object क्रम में सोचें, फिर tense और infinitive rule check करें।</p></section>
 </div>
}

export const englishPanoramaChapter1Study=study;
export const englishPanoramaChapter1Meta={title:study.title,author:study.author,book:'The Panorama',type:'Prose',chapter:1};

export function EnglishPanoramaChapter1({initialMode=null,onBack,addXp,finishSession}){
 const [mode,setMode]=useState(initialMode); const [idx,setIdx]=useState(0); const [selected,setSelected]=useState(null); const [score,setScore]=useState(0); const [result,setResult]=useState(null);
 const bank=useMemo(()=>mode==='practice'?practice:mode==='challenge'?challenge:mode==='test'?finalTest:[],[mode]);
 const current=bank[idx]?shuffleQuestion(bank[idx],idx):null;
 const choose=n=>{if(selected!==null||!current)return; setSelected(n); if(n===current.a)setScore(s=>s+1);};
 const next=()=>{if(idx<bank.length-1){setIdx(i=>i+1);setSelected(null);}else{const final=score+(selected===current?.a?1:0);setResult({score:final,total:bank.length});if(addXp) addXp(Math.max(5,final*2));if(finishSession) finishSession({score:final,total:bank.length,mode});}};
 const start=m=>{setMode(m);setIdx(0);setSelected(null);setScore(0);setResult(null);};
 if(mode===null)return <Lesson onBack={onBack}/>;
 if(mode==='learn')return <Lesson onBack={()=>setMode(null)}/>;
 if(result)return <div className="lesson-wrap"><section className="result-card"><Pill>{mode.toUpperCase()}</Pill><h1>Test complete 🎉</h1><div className="result-score">{result.score} / {result.total}</div><p>{result.score===result.total?'Excellent! Chapter mastery is strong.':result.score>=Math.ceil(result.total*.7)?'Good work. Revise the marked concepts once more.':'Revise Learn notes and try the Challenge again.'}</p><div className="result-actions"><button className="mode-btn" onClick={()=>start(mode)}>Retry</button><button className="mode-btn" onClick={()=>setMode(null)}>Back to Learn</button></div></section></div>;
 return <div className="lesson-wrap"><div className="lesson-head"><button className="back-btn" onClick={()=>setMode(null)}>← Learn</button><div><Pill>{mode==='practice'?'Practice':'Challenge'}</Pill><h1>Dharam Juddha</h1><p className="lesson-sub">Question {idx+1} of {bank.length}</p></div></div><section className="quiz-card"><div className="progress-track"><span style={{width:`${((idx+1)/bank.length)*100}%`}}/></div><h2>{current?.q}</h2><div className="option-list">{current?.o.map((opt,i)=><button key={opt} className={`option-btn ${selected!==null?(i===current.a?'correct':i===selected?'wrong':''):''}`} onClick={()=>choose(i)} disabled={selected!==null}>{String.fromCharCode(65+i)}. {opt}</button>)}</div>{selected!==null&&<div className="feedback"><b>{selected===current.a?'Correct ✅':'Not quite ❌'}</b><p>{current.e}</p><button className="mode-btn" onClick={next}>{idx===bank.length-1?'Finish':'Next →'}</button></div>}</section></div>;
}
