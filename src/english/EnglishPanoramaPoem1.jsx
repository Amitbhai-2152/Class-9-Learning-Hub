import React,{useState} from 'react';
import PanoramaTimedQuiz from './PanoramaTimedQuiz.jsx';
import './english-panorama-poetry.css';

const poem={
 title:'The Grandmother',
 poet:'Ray Young Bear',
 book:'The Panorama • Poetry Chapter 1',
 sourceNote:'Built from the supplied Bihar Board Class 9 Panorama source and the stanza text supplied for this implementation.',
 context:'The poem remembers the grandmother through familiar signs and senses. The speaker can recognise her through sight, touch, smell and hearing, showing how deeply memory and affection are connected.',
 lines:[
  ['If I were to see her shape','कवि कहता है कि दादी की आकृति दिखाई दे तो वह उन्हें पहचान लेगा।'],
  ['from a mile away','एक मील दूर से भी वह उनकी आकृति पहचान सकता है।'],
  ['I’d know so quickly','वह बहुत जल्दी समझ जाएगा कि वह कौन हैं।'],
  ['that it would be her.','उसे पता चल जाएगा कि वह दादी ही हैं।'],
  ['The purple scarf','बैंगनी स्कार्फ दादी की एक खास पहचान है।'],
  ['and the plastic shopping bag','प्लास्टिक का शॉपिंग बैग भी उन्हें पहचानने का संकेत है।'],
  ['If I felt','अगर कवि स्पर्श महसूस करे, तब भी वह दादी को पहचान सकता है।'],
  ['hands on my head','सिर पर रखे हाथों का स्पर्श उसे परिचित है।'],
  ['I’d know so quickly','वह तुरंत पहचान जाएगा कि ये दादी के हाथ हैं।'],
  ['that those were her hands.','उसे पूरा विश्वास होगा कि वे दादी के ही हाथ हैं।'],
  ['Warm and damp','वे हाथ गर्म और नम महसूस होते हैं।'],
  ['with the smell of roots.','उनसे जड़ों जैसी प्राकृतिक गंध जुड़ी हुई है।'],
  ['If I heard','अगर वह आवाज सुने, तब भी दादी को पहचान सकता है।'],
  ['a voice coming from a rock','कवि कल्पना करता है कि आवाज किसी चट्टान से आ रही है।'],
  ['I’d know and I’d know','आवाज से पहचान की उसकी भावना और मजबूत हो जाती है।'],
  ['her words would flow inside me','दादी के शब्द उसके भीतर गहराई से उतरने लगेंगे।'],
  ['like the light','उन शब्दों की तुलना रोशनी से की गई है।'],
  ['of someone stirring ashes','यह ऐसा चित्र बनाता है जैसे कोई राख को हिला रहा हो।'],
  ['from a sleeping fire at night','रात में सोई हुई आग की राख से छिपी गर्मी फिर जागती हुई महसूस होती है।']
 ],
 stanzas:[
  {title:'Stanza 1 — देखकर पहचान',range:'Lines 1–6',start:0,end:6,summary:'कवि कहता है कि वह अपनी दादी को बहुत दूर से भी पहचान सकता है। उनकी आकृति, बैंगनी स्कार्फ और प्लास्टिक का शॉपिंग बैग उसके लिए पहचान के स्पष्ट संकेत हैं।',exam:'याद रखें: एक मील की दूरी, shape, purple scarf, plastic shopping bag.',key:'Sense = Sight | भाव = दादी की गहरी पहचान और अपनापन',vocab:[['shape','आकृति'],['mile away','एक मील दूर'],['purple scarf','बैंगनी स्कार्फ'],['shopping bag','शॉपिंग बैग / खरीदारी का थैला']]},
  {title:'Stanza 2 — स्पर्श और गंध से पहचान',range:'Lines 7–12',start:6,end:12,summary:'दूसरे stanza में कवि बताता है कि दादी के हाथों का स्पर्श भी उसे पहचानने में मदद करेगा। हाथ warm और damp हैं और उनमें roots जैसी प्राकृतिक गंध है।',exam:'याद रखें: hands on my head, warm and damp, smell of roots.',key:'Senses = Touch + Smell | भाव = स्नेह और परिचितता',vocab:[['felt','महसूस किया'],['hands on my head','सिर पर रखे हाथ'],['warm','गर्म'],['damp','नम / हल्का गीला'],['roots','जड़ें'],['smell of roots','जड़ों जैसी गंध']]},
  {title:'Stanza 3 — आवाज और भीतर की स्मृति',range:'Lines 13–19',start:12,end:19,summary:'तीसरे stanza में पहचान आवाज और शब्दों तक पहुँचती है। दादी की आवाज और उनके शब्द कवि के भीतर ऐसे प्रकाश और गर्मी का एहसास जगाते हैं जैसे रात में सोई आग की राख को हिलाने पर अंगार फिर जीवित हो उठे।',exam:'याद रखें: voice, rock, words flow inside me, light, stirring ashes, sleeping fire at night.',key:'Sense = Hearing | प्रभाव = दादी की स्मृति भीतर तक जीवित रहती है',vocab:[['heard','सुना'],['voice','आवाज'],['rock','चट्टान'],['words would flow inside me','शब्द मेरे भीतर उतरेंगे'],['light','रोशनी'],['stirring ashes','राख को हिलाना / कुरेदना'],['sleeping fire','सोई हुई आग'],['at night','रात में']]}
 ],
 devices:[['Imagery','आकृति, रंग, स्पर्श, गंध, आवाज और आग की छवि कविता को जीवंत बनाते हैं।'],['Sensory appeal','कविता sight, touch, smell और hearing—चार इंद्रिय अनुभवों का उपयोग करती है।'],['Simile','अंत में दादी के शब्दों की तुलना light से की गई है।'],['Metaphorical image','शब्दों का “flow inside me” होना बताता है कि उनकी बातों का प्रभाव भीतर तक जाता है।'],['Symbolic image','sleeping fire की छवि यादों में छिपी गर्मी और जीवन का संकेत देती है।']],
 themes:['grandmotherly love','memory and distance','identity through senses','family attachment','lasting memory'],
 textbookAnswers:[
  ['Recognition distance','The speaker can recognise his grandmother from a mile away.'],
  ['Visual signs','Her shape, purple scarf and plastic shopping bag help the speaker recognise her.'],
  ['Grandmother’s hands','They are warm and damp and are linked with the smell of roots.'],
  ['Voice location','The imagined voice comes from a rock.'],
  ['Effect of the words','Her words would flow inside the speaker and feel like light.'],
  ['Central idea','Deep love and memory keep the grandmother emotionally present.']
 ]
};

const q=(question,options,answer,explanation)=>({q:question,o:options,a:answer,e:explanation});
const practice=[
 q('Who is the poet of “The Grandmother”?',['Ray Young Bear','William Blake','John Milton','Robert Frost'],0,'The supplied source identifies Ray Young Bear as the poet.'),
 q('From what distance can the speaker recognise the grandmother?',['A mile away','Two miles away','Ten miles away','Across a river'],0,'The speaker says he can recognise her from a mile away.'),
 q('What colour is the grandmother’s scarf?',['Purple','Red','Blue','Green'],0,'The scarf is described as purple.'),
 q('What is mentioned with the scarf?',['A plastic shopping bag','A wooden basket','A woollen coat','A leather purse'],0,'The poem places the purple scarf with the plastic shopping bag.'),
 q('Which sense is central in Stanza 1?',['Sight','Taste','Hearing','Smell'],0,'The speaker first recognises the grandmother through her shape and visible objects.'),
 q('What does the speaker imagine on his head?',['Her hands','Her scarf','Her hair','A hat'],0,'He imagines the grandmother’s hands on his head.'),
 q('How are the grandmother’s hands described?',['Warm and damp','Cold and dry','Hard and cold','Dusty and rough'],0,'The hands are described as warm and damp.'),
 q('What smell is linked with the grandmother?',['The smell of roots','The smell of flowers','The smell of smoke','The smell of rain'],0,'The poem connects her hands with the smell of roots.'),
 q('Which sense is central in Stanza 2?',['Touch and smell','Sight only','Taste only','Hearing only'],0,'The stanza uses the feeling of hands and the smell of roots.'),
 q('Where is the imagined voice coming from?',['A rock','A river','A tree','A house'],0,'The speaker imagines the voice coming from a rock.'),
 q('Which sense is central in Stanza 3?',['Hearing','Sight','Taste','Touch'],0,'The stanza begins with hearing a voice.'),
 q('Where would the grandmother’s words flow?',['Inside the speaker','Into a river','Across a mountain','Outside the house'],0,'The speaker says her words would flow inside him.'),
 q('What is the key comparison near the end?',['Words and light','Words and rain','Words and stone','Words and smoke'],0,'The words are compared with light.'),
 q('What does the sleeping fire image mainly suggest?',['Hidden warmth and living memory','A storm','A river','A loud celebration'],0,'The image suggests warmth and memory that can still awaken.'),
 q('What is the central theme of the poem?',['Love and lasting memory of the grandmother','School competition','Travel','Fear of nature'],0,'The poem centres on affection, recognition and memory.')
];

const challenge=[
 q('Why are the purple scarf and plastic shopping bag important?',['They are familiar visual signs of the grandmother','They are valuable possessions','They belong to the speaker','They describe the weather'],0,'Ordinary objects become memorable because they are associated with the grandmother.'),
 q('What does recognition from a mile away show?',['Deep familiarity despite distance','Only strong eyesight','Fear of crowds','Dislike of travel'],0,'Emotional familiarity makes the grandmother recognisable even at a distance.'),
 q('Why does the poem begin with shape and colour?',['It creates a visual memory first','It gives a scientific description','It changes the subject','It creates a joke'],0,'Shape and colour immediately create a clear visual picture.'),
 q('What is the emotional value of the hands on the head?',['They suggest affection and care','They show anger','They describe an accident','They begin a journey'],0,'The remembered touch carries tenderness and care.'),
 q('What do “warm and damp” contribute to the poem?',['A precise physical memory','A weather forecast','A historical fact','A warning'],0,'These details make the remembered touch concrete and vivid.'),
 q('Why is the smell of roots significant?',['It gives an earthy natural association','It names a perfume','It describes a meal','It proves the speaker is gardening'],0,'Roots connect the memory with earth and nature.'),
 q('How does Stanza 2 deepen Stanza 1?',['It moves recognition from sight to touch and smell','It removes the grandmother','It changes to a travel story','It focuses on taste'],0,'The poem broadens recognition to physical and sensory memory.'),
 q('Why is the voice imagined as coming from a rock?',['It creates a powerful natural image for remembered presence','It proves the grandmother lives inside a rock','It describes a real announcement','It changes the poem into a play'],0,'The rock creates an unusual, memorable setting for the imagined voice.'),
 q('What happens to recognition in Stanza 3?',['It becomes more inward and emotional','It becomes purely visual','It disappears completely','It becomes humorous'],0,'Voice and words lead the speaker from external signs to inner memory.'),
 q('What does “her words would flow inside me” suggest?',['Her words become part of the speaker’s inner memory','The words are written in water','The speaker is physically drinking them','The words are spoken to a crowd'],0,'The phrase presents the grandmother’s words as deeply absorbed by the speaker.'),
 q('Why is light used near the end?',['It suggests warmth, clarity and living memory','It suggests danger','It describes a lamp in a room','It shows daytime weather'],0,'Light makes the remembered effect of her words feel warm and alive.'),
 q('What is the function of “stirring ashes”?',['It evokes the awakening of hidden warmth','It gives a cooking instruction','It describes a sports activity','It introduces a storm'],0,'Moving ashes can reveal the warmth of a fire that seemed quiet or asleep.'),
 q('What does the “sleeping fire” image suggest about memory?',['A quiet memory can still hold warmth','Memory always disappears','Memory is only visual','Memory is dangerous'],0,'The image suggests that memory can remain alive even when it seems quiet.'),
 q('How do the four senses work together?',['They create a fuller and more intimate memory','They create a scientific experiment','They describe four different people','They make the poem comic'],0,'Sight, touch, smell and hearing combine to make recognition deeply personal.'),
 q('Which sequence best describes the poem?',['Sight → touch/smell → hearing → inner memory','Hearing → taste → sight → travel','Taste → sight → touch → humour','Only sight throughout'],0,'The speaker moves through several senses and ends with the inner effect of memory.'),
 q('What tone best fits the poem?',['Tender and reflective','Angry and mocking','Comic and playful','Formal and argumentative'],0,'The speaker remembers the grandmother with affection and reflection.'),
 q('Why are ordinary objects effective in the poem?',['They make the grandmother’s memory specific and personal','They make the poem scientific','They prove the speaker is wealthy','They describe a marketplace'],0,'Simple objects become powerful because they are attached to personal memory.'),
 q('What is the strongest idea in the poem?',['Love can keep a person emotionally present through memory','Money creates family bonds','Nature is always dangerous','Objects are more important than people'],0,'The grandmother remains emotionally present through the speaker’s memory.'),
 q('What is meant by identity through sensory details?',['The speaker knows the grandmother through familiar sights, touches, smells and sounds','The speaker learns her name from a book','The speaker identifies her through mathematics','The speaker recognises her by a photograph only'],0,'Different sensory memories together create a unique sense of recognition.'),
 q('Why does the poem use very simple everyday details?',['They make the memory believable and intimate','They make the poem unrelated to family','They create a historical timeline','They explain a scientific law'],0,'Everyday details make the grandmother feel personally remembered rather than abstract.'),
 q('Which statement best connects Stanza 1 and Stanza 3?',['Outer signs become an inner emotional memory','The two stanzas discuss unrelated people','The first stanza is about school and the third about travel','Both stanzas focus only on taste'],0,'The poem begins with visible signs and ends with an inward emotional response.'),
 q('Which poetic device is clearly present in the comparison with light?',['Simile','Alliteration','Pun','Irony'],0,'The words are explicitly compared with light.'),
 q('What does the final fire image leave the reader with?',['A sense of memory remaining warm and alive','A sense of fear','A description of a kitchen','A travel plan'],0,'The ending leaves a quiet image of warmth and continuing memory.')
];

const finalTest=[...practice.slice(0,10),...challenge.slice(0,10)];

function StanzaCard({stanza}){
 const lines=poem.lines.slice(stanza.start,stanza.end);
 return <article className="poem-stanza-card">
  <div className="poem-card-kicker">{stanza.range}</div>
  <h3>{stanza.title}</h3>
  <p>{stanza.summary}</p>
  <div className="poem-stanza-lines">{lines.map(([line,meaning],j)=><div key={`${stanza.range}-${j}`}><span>L{stanza.start+j+1}</span><div><b>{line}</b><p>{meaning}</p></div></div>)}</div>
  <strong>{stanza.key}</strong>
  <div className="poem-exam-box"><b>Exam focus</b><p>{stanza.exam}</p></div>
  <div className="poem-stanza-vocab"><b>Vocabulary</b><div className="poem-word-grid">{stanza.vocab.map(([word,meaning])=><div key={word}><b>{word}</b><span>{meaning}</span></div>)}</div></div>
 </article>
}

function Learn({onMode}){return <div className="poem-page">
 <div className="poem-hero"><span>CLASS 9 • THE PANORAMA • POETRY 1</span><h1>The Grandmother</h1><p>Ray Young Bear • stanza-by-stanza study, simple explanations, vocabulary and exam practice</p></div>
 <section className="poem-panel poem-context"><div><span className="poem-section-label">POET &amp; CONTEXT</span><h2>Who wrote it?</h2><p>{poem.context}</p></div><div className="poem-fact-grid"><div><b>Poet</b><span>{poem.poet}</span></div><div><b>Structure</b><span>{poem.stanzas.length} stanzas • {poem.lines.length} lines</span></div><div><b>Main senses</b><span>Sight • Touch • Smell • Hearing</span></div></div></section>
 <section className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">STANZA-BY-STANZA</span><h2>Every stanza, simply explained</h2></div><span>{poem.stanzas.length} stanzas</span></div><div className="poem-stanza-grid">{poem.stanzas.map(stanza=><StanzaCard key={stanza.range} stanza={stanza}/>)}</div></section>
 <section className="poem-panel poem-text-panel"><div className="poem-section-heading"><div><span className="poem-section-label">COMPLETE POEM</span><h2>Every line with the simplest explanation</h2></div><span>{poem.lines.length} lines</span></div><div className="poem-lines">{poem.lines.map(([line,meaning],i)=><article className="poem-line" key={`${i}-${line}`}><span className="poem-line-no">L{i+1}</span><div><div className="poem-line-text">{line}</div><p>{meaning}</p></div></article>)}</div></section>
 <section className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">POETRY TOOLKIT</span><h2>How to read this poem</h2></div><span>4 key senses</span></div><div className="poem-tool-grid"><article><h3>Sight</h3><p>Shape, purple scarf and plastic shopping bag help the speaker recognise the grandmother.</p></article><article><h3>Touch</h3><p>Hands on the head create a strong memory of physical closeness and care.</p></article><article><h3>Smell</h3><p>The smell of roots adds an earthy, natural quality to the memory.</p></article><article><h3>Hearing</h3><p>The imagined voice and words carry the memory from the outside world into the speaker’s inner self.</p></article></div></section>
 <section className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">POETIC DEVICES</span><h2>What the poem is doing</h2></div></div><div className="poem-device-grid">{poem.devices.map(([name,meaning])=><article key={name}><b>{name}</b><p>{meaning}</p></article>)}</div></section>
 <section className="poem-panel poem-two-col"><div><span className="poem-section-label">WORDS TO KNOW</span><h2>Simple meanings</h2><div className="poem-word-grid">{poem.stanzas.flatMap(s=>s.vocab).filter((item,i,array)=>array.findIndex(x=>x[0]===item[0])===i).map(([word,meaning])=><div key={word}><b>{word}</b><span>{meaning}</span></div>)}</div></div><div><span className="poem-section-label">THEMES</span><h2>What the poem says</h2><div className="poem-theme-list">{poem.themes.map(theme=><span key={theme}>{theme}</span>)}</div><div className="poem-exam-box"><b>One-line answer</b><p>The poem shows that deep love and sensory memory can keep the grandmother emotionally present even across distance.</p></div></div></section>
 <section className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">TEXTBOOK QUICK ANSWERS</span><h2>Core answers</h2></div><span>{poem.textbookAnswers.length} answers</span></div><div className="poem-answer-list">{poem.textbookAnswers.map(([question,answer],i)=><article key={i}><b>Q{i+1}. {question}</b><p>{answer}</p></article>)}</div></section>
 <section className="poem-modebar"><div><span>READY FOR PRACTICE?</span><h2>Test your poetry understanding</h2><p>Timed Practice • Challenge • Final Test</p></div><div className="poem-mode-buttons"><button onClick={()=>onMode('practice')}>Practice</button><button onClick={()=>onMode('challenge')}>Challenge</button><button className="primary" onClick={()=>onMode('test')}>Final Test</button></div></section>
 </div>}

export function EnglishPanoramaPoem1({initialMode='learn',onBack,addXp,finishSession}){
 const [mode,setMode]=useState(initialMode||'learn');
 if(mode!=='learn'){
  const bank=mode==='practice'?practice:mode==='challenge'?challenge:mode==='test'?finalTest:null;
  return <PanoramaTimedQuiz mode={mode} title={poem.title} bank={bank} onBack={()=>setMode('learn')} addXp={addXp} finishSession={finishSession}/>;
 }
 return <div className="poem-shell"><button className="poem-exit" onClick={onBack}>← Exit Poetry</button><Learn onMode={setMode}/></div>;
}

export default EnglishPanoramaPoem1;
