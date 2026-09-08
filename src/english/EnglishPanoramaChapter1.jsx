import './english-reader.css';
import React,{useMemo,useState} from 'react';

const study={
  title:'Dharam Juddha',
  author:'Arjun Dev Charan',
  sourceNote:'Class 9 English Panorama-I • Prose Chapter 1',
  summary:'यह संवाद-प्रधान पाठ Padma नाम की शिक्षित युवती के सवालों के माध्यम से स्त्री की पहचान, विवाह, सामाजिक रूढ़ियों और समानता पर विचार करता है। Padma अपने माता-पिता से पूछती है कि क्या एक महिला की पहचान केवल पति या विवाह से तय होती है।',
  flow:[
    ['Padma का प्रश्न','Padma अपनी माँ से महिला की पहचान के बारे में सवाल करती है और जानना चाहती है कि वह दूसरों से कैसे अलग है।'],
    ['परिवार की प्रतिक्रिया','माँ और पिता परंपरागत सोच के आधार पर महिला की पहचान को परिवार और विवाह से जोड़ते हैं।'],
    ['Padma की असहमति','Padma इस विचार को स्वीकार नहीं करती कि विवाह ही महिला को पहचान देता है।'],
    ['सामाजिक विरोधाभास','Padma ऐसे दोहरे मानदंड पर प्रश्न उठाती है जिसमें अविवाहित पुरुष और अविवाहित महिला को समान दृष्टि से नहीं देखा जाता।'],
    ['मुख्य विचार','पाठ पाठक को पहचान, अधिकार, समानता और सामाजिक रूढ़ियों पर स्वतंत्र रूप से सोचने के लिए प्रेरित करता है।']
  ],
  characters:[
    ['Padma','शिक्षित, प्रश्न करने वाली और तर्कशील युवती; वह स्त्री की स्वतंत्र पहचान और समानता के प्रश्न उठाती है।'],
    ['Mother','परंपरागत सामाजिक सोच से प्रभावित पात्र; वह महिला की पहचान को पति और परिवार से जोड़ती है।'],
    ['Father','व्यावहारिक और रूढ़ सामाजिक दृष्टिकोण रखने वाला पात्र; उसका उत्तर विवाह को महिला की पहचान से जोड़ता है।']
  ],
  vocabulary:[
    ['identity','पहचान'],['orthodox','रूढ़िवादी'],['agitated','व्याकुल / बेचैन'],['uncharitable','असहानुभूतिपूर्ण / उदारता-विहीन'],['dignity','गरिमा'],['equality','समानता'],['justice','न्याय'],['double standard','दोहरा मानदंड'],['veneration','आदर / श्रद्धा'],['immoral','अनैतिक']
  ],
  themes:[
    ['Women’s identity','महिला की पहचान को केवल वैवाहिक स्थिति से जोड़ने वाली सोच पर प्रश्न उठाया गया है।'],
    ['Equality','पाठ स्त्री और पुरुष को समान मानवीय गरिमा और अधिकारों से देखने की आवश्यकता सामने रखता है।'],
    ['Questioning tradition','Padma बिना सोचे परंपरा स्वीकार करने के बजाय उसके आधार और न्यायसंगतता पर सवाल करती है।'],
    ['Social double standards','अविवाहित पुरुष और महिला के प्रति अलग सामाजिक व्यवहार की आलोचना पाठ की महत्वपूर्ण परत है।']
  ],
  examPoints:[
    'Padma के मुख्य प्रश्न और उसके तर्क को समझें।',
    'Mother और Father की परंपरागत सोच तथा Padma की दृष्टि का अंतर याद रखें।',
    '“identity”, “equality”, “justice” और “double standard” जैसे शब्दों का संदर्भगत अर्थ समझें।',
    'Long-answer में केवल कथानक नहीं, बल्कि पाठ का सामाजिक संदेश भी स्पष्ट करें।'
  ],
  subjective:[
    'What was Padma trying to understand about a woman’s identity?',
    'How does Padma challenge the traditional idea that marriage gives a woman her identity?',
    'Describe the difference between Padma’s thinking and her mother’s thinking.',
    'Why is the idea of a social double standard important in Dharam Juddha?',
    'Explain the central message of the lesson in your own words.'
  ]
};

const practice=[
 {q:'Who is the central character of “Dharam Juddha”?',o:['Padma','Sonal Mansingh','Ismat Chughtai','Bismillah Khan'],a:0,e:'The play centres on Padma and her questions about women’s identity.'},
 {q:'What does Padma mainly want to understand?',o:['A woman’s identity','A dance performance','A travel route','A musical instrument'],a:0,e:'Padma asks what a woman’s identity is and how she is different from others.'},
 {q:'The lesson is mainly presented through:',o:['dialogue','a travel diary','a scientific report','a poem'],a:0,e:'The narrative is dialogue-driven, especially through Padma’s conversations with her parents.'},
 {q:'Which quality best describes Padma?',o:['Questioning and thoughtful','Careless and indifferent','Silent and passive','Uninterested in society'],a:0,e:'Padma actively questions social assumptions and seeks a reasoned answer.'},
 {q:'According to the traditional view shown in the play, a woman’s identity is linked strongly with:',o:['marriage and husband','travel and education','wealth and books','music and art'],a:0,e:'The parents’ traditional responses connect a woman’s identity with marriage and husband.'},
 {q:'Which word means “पहचान”?',o:['identity','justice','dignity','veneration'],a:0,e:'Identity means a person’s distinguishing sense of who they are.'},
 {q:'What does “equality” mean in the context of the lesson?',o:['equal human worth and rights','complete silence','obedience to tradition','financial success'],a:0,e:'The lesson raises the issue of equal status and rights for women and men.'},
 {q:'Why does Padma question marriage as the basis of identity?',o:['She sees identity as more fundamental than marital status','She dislikes all family relationships','She wants to avoid education','She is planning a journey'],a:0,e:'Her questions suggest that a person’s identity should not depend only on marriage.'},
 {q:'What social issue is highlighted by the treatment of unmarried men and women?',o:['Double standards','Environmental pollution','Scientific progress','Travel difficulties'],a:0,e:'Padma notices different social judgements for unmarried men and women.'},
 {q:'Which theme is most central to the lesson?',o:['Women’s identity and equality','Adventure and exploration','Nature and seasons','Science and technology'],a:0,e:'Identity, equality and social attitudes form the core of the play.'},
 {q:'Why is Padma’s questioning important?',o:['It makes accepted social assumptions open to examination','It ends the need for education','It proves every tradition is wrong','It avoids all family discussion'],a:0,e:'Her questions encourage critical examination rather than blind acceptance.'},
 {q:'What does “justice” mean?',o:['fairness','wealth','silence','celebration'],a:0,e:'Justice means fairness and proper treatment.'},
 {q:'Which character largely represents conventional social thinking?',o:['Mother','Padma','the reader','a dancer'],a:0,e:'Mother’s responses reflect the conventional view of women shown in the text.'},
 {q:'What is the strongest contrast in the lesson?',o:['Padma’s independent questioning vs. traditional responses','city vs. village scenery','science vs. religion','music vs. dance'],a:0,e:'The main contrast is between Padma’s questioning mind and her parents’ conventional answers.'},
 {q:'The title “Dharam Juddha” is most closely connected with:',o:['a conflict over social values and beliefs','a sports competition','a school examination','a travel adventure'],a:0,e:'The central conflict is intellectual and social, involving ideas about identity and custom.'}
];

const challenge=[
 {q:'Why is Padma’s question about identity deeper than a question about marriage?',o:['It asks whether a person’s worth can exist independently of marital status','It asks only when a wedding should occur','It rejects every family relationship','It focuses only on money'],a:0,e:'The question challenges the assumption that marriage is the source of a woman’s identity.'},
 {q:'Which inference best follows from Padma’s reasoning?',o:['Social customs should be examined for fairness rather than accepted automatically','Tradition is always harmful','Families cannot influence values','Education has no role in social thinking'],a:0,e:'Padma’s questioning suggests critical evaluation of customs, especially their fairness.'},
 {q:'What makes the lesson’s social criticism effective?',o:['It places a difficult social question inside an ordinary family conversation','It gives a long historical lecture','It avoids disagreement among characters','It uses only abstract definitions'],a:0,e:'The family dialogue makes the larger social issue immediate and understandable.'},
 {q:'Why is the unmarried-man/unmarried-woman comparison significant?',o:['It exposes unequal standards used to judge people by gender','It compares two professions','It explains a legal procedure','It describes a festival'],a:0,e:'The comparison reveals how social judgement can differ for men and women.'},
 {q:'Which statement best distinguishes Padma from her mother?',o:['Padma asks whether the rule is just; her mother largely accepts the rule','Padma avoids questions while her mother investigates them','Both hold exactly the same view','Padma cares only about money'],a:0,e:'Their disagreement is about whether traditional expectations deserve unquestioned acceptance.'},
 {q:'If a custom gives different freedoms to men and women without a fair reason, which concept from the lesson helps critique it?',o:['Equality','Silence','Entertainment','Profit'],a:0,e:'Equality is the relevant principle for evaluating unequal treatment.'},
 {q:'Why can the lesson be read as a study of social conditioning?',o:['The parents’ responses show how social beliefs can shape ideas about women’s roles','The characters are trained as athletes','The lesson describes classroom experiments','The story is about weather'],a:0,e:'The parental responses reflect beliefs learned and reinforced by society.'},
 {q:'Which evidence most strongly supports the theme of independent thought?',o:['Padma continues asking questions even when the traditional answer is presented as normal','Padma avoids speaking to anyone','Mother asks Padma to travel','Father changes the subject to music'],a:0,e:'Her persistence in questioning accepted beliefs is the clearest evidence.'},
 {q:'What is the most balanced interpretation of the parents?',o:['They represent a conventional social viewpoint rather than simply being individual villains','They are presented as completely unrelated to the issue','They are only comic characters','They reject every family value'],a:0,e:'Their role is chiefly to represent the conventional framework against which Padma argues.'},
 {q:'Why is “double standard” stronger than simply saying “difference”?',o:['It implies an unfair difference in judgement between comparable cases','It means two identical answers','It describes a grammar rule','It only refers to two objects'],a:0,e:'A double standard specifically suggests inconsistent or unequal judgement.'},
 {q:'Which conclusion best captures the lesson’s educational value?',o:['Readers should learn to question unfair assumptions and think about dignity and equality','Readers should reject all traditions immediately','Readers should avoid difficult conversations','Readers should judge people by marital status'],a:0,e:'The lesson encourages thoughtful criticism of unfair assumptions while focusing on dignity and equality.'},
 {q:'Why does the title work as a title for the conflict?',o:['The real “battle” is between competing ideas about identity, custom and justice','The story is about a battlefield','The characters fight a physical war','It refers to a sporting match'],a:0,e:'The title can be understood as a struggle between social beliefs and a questioning search for justice.'}
];

const finalTest=[...practice.slice(0,10),...challenge.slice(0,10)].map((x,i)=>({...x,id:`panorama-final-${i}`}));
function shuffleQuestion(q,i){const shift=(i*3)%q.o.length;const o=q.o.map((_,idx)=>q.o[(idx+shift)%q.o.length]);const a=(q.a-shift+q.o.length)%q.o.length;return {...q,o,a};}

export function EnglishPanoramaChapter1({initialMode=null,onBack,addXp,finishSession}){
 const [mode,setMode]=useState(initialMode); const [idx,setIdx]=useState(0); const [selected,setSelected]=useState(null); const [score,setScore]=useState(0);
 const [result,setResult]=useState(null);
 const bank=useMemo(()=>mode==='practice'?practice:mode==='challenge'?challenge:mode==='test'?finalTest:[],[mode]);
 const current=bank[idx]?shuffleQuestion(bank[idx],idx):null;
 const choose=n=>{if(selected!==null||!current)return;setSelected(n);if(n===current.a)setScore(s=>s+1)};
 const next=()=>{if(!current)return;if(idx+1<bank.length){setIdx(i=>i+1);setSelected(null)}else{const finalScore=score+(selected===current.a?1:0);const earned=Math.max(5,Math.round((finalScore/bank.length)*10));setResult({score:finalScore,total:bank.length,mode});addXp?.(earned);finishSession?.({subject:'अंग्रेज़ी',book:'The Panorama',chapter:study.title,mode,score:finalScore,total:bank.length,at:new Date().toISOString()});setMode(null)}};
 const start=m=>{setMode(m);setResult(null);setIdx(0);setSelected(null);setScore(0)};
 if(result)return <Result result={result} restart={()=>start(result.mode)} back={onBack}/>;
 if(mode==='learn')return <Lesson onBack={()=>setMode(null)}/>;
 if(current)return <Quiz mode={mode} q={current} index={idx} total={bank.length} selected={selected} choose={choose} next={next}/>;
 return <Menu onBack={onBack} start={start}/>;
}
function Menu({onBack,start}){return <div className="english-chapter-shell"><div className="english-hero"><span>THE PANORAMA • PROSE 1</span><h1>{study.title}</h1><p>{study.author} · Chapter learning, exam support and practice</p></div><div className="english-mode-grid"><button className="english-mode" onClick={()=>start('learn')}><b>📖 Learn</b><small>Hindi explanation, story flow, characters, vocabulary and exam focus</small></button><button className="english-mode" onClick={()=>start('practice')}><b>📝 Practice</b><small>15 chapter-focused MCQs with explanations</small></button><button className="english-mode" onClick={()=>start('challenge')}><b>🔥 Challenge</b><small>12 higher-order and inference questions</small></button><button className="english-mode" onClick={()=>start('test')}><b>🎯 Final Test</b><small>20 mixed questions with score tracking</small></button></div><button className="english-back" onClick={onBack}>← Back to Panorama</button></div>}
function Lesson({onBack}){return <div className="english-chapter-shell"><div className="english-lesson-head"><button onClick={onBack}>← Modes</button><span>LEARN</span><h2>{study.title}</h2><p>{study.author}</p></div><section className="english-panel"><h3>Chapter in one view</h3><p>{study.summary}</p></section><section className="english-panel"><h3>Story / idea flow</h3><div className="english-timeline">{study.flow.map(([h,p])=><article key={h}><strong>{h}</strong><p>{p}</p></article>)}</div></section><section className="english-two-col"><div className="english-panel"><h3>Characters</h3>{study.characters.map(([w,m])=><article className="english-theme" key={w}><b>{w}</b><p>{m}</p></article>)}</div><div className="english-panel"><h3>Core themes</h3>{study.themes.map(([h,p])=><article className="english-theme" key={h}><b>{h}</b><p>{p}</p></article>)}</div></section><section className="english-panel"><h3>Vocabulary</h3>{study.vocabulary.map(([w,m])=><div className="english-vocab" key={w}><b>{w}</b><span>{m}</span></div>)}</section><section className="english-panel"><h3>Exam focus</h3>{study.examPoints.map(p=><p className="english-point" key={p}>✓ {p}</p>)}</section><section className="english-panel"><h3>Subjective answer practice</h3>{study.subjective.map((q,i)=><div className="english-theme" key={q}><b>{i+1}. {q}</b><p>उत्तर लिखते समय कथानक + तर्क + पाठ का सामाजिक संदेश स्पष्ट रखें।</p></div>)}</section><button className="english-back primary" onClick={onBack}>Back to modes</button></div>}
function Quiz({mode,q,index,total,selected,choose,next}){const letters=['A','B','C','D'];return <div className="english-chapter-shell"><div className="quiz-head"><button onClick={()=>location.reload()}>Exit</button><span>{mode.toUpperCase()}</span><strong>{index+1} / {total}</strong></div><div className="quiz-card"><p className="quiz-kicker">Question {index+1}</p><h2>{q.q}</h2>{q.o.map((text,i)=><button key={text} className={`quiz-option ${selected!==null?(i===q.a?'correct':i===selected?'wrong':''):' '}`} onClick={()=>choose(i)} disabled={selected!==null}><span>{letters[i]}</span>{text}</button>)}{selected!==null&&<div className="quiz-feedback"><b>{selected===q.a?'Correct':'Not quite'}</b><p>{q.e}</p><button className="english-back primary" onClick={next}>{index+1===total?'Finish':'Next →'}</button></div>}</div></div>}
function Result({result,restart,back}){const pct=Math.round(result.score/result.total*100);return <div className="english-chapter-shell"><div className="result-card"><span>RESULT</span><h2>{pct}%</h2><p>{result.score} correct out of {result.total}</p><div className="result-actions"><button className="english-back primary" onClick={restart}>Retry</button><button className="english-back" onClick={back}>Back</button></div></div></div>}

export const englishPanoramaChapter1Meta={title:study.title,author:study.author,sourceNote:study.sourceNote,modeCounts:{practice:practice.length,challenge:challenge.length,final:finalTest.length}};
export {study as englishPanoramaChapter1Study};
