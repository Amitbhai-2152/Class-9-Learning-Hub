import React,{useState} from 'react';
import PanoramaTimedQuiz from './PanoramaTimedQuiz.jsx';
import './english-panorama-poetry.css';

const poem={
 title:'The Grandmother',
 poet:'Ray Young Bear',
 book:'The Panorama • Poetry Chapter 1',
 sourceNote:'Built from the supplied Bihar Board Class 9 Panorama pages for The Grandmother.',
 context:'The textbook introduces Ray Young Bear as a Native American poet and novelist of the Mesquaki tribe. This poem remembers the grandmother through sight, touch, smell, hearing and the inner life of memory.',
 lines:[
  ['if I were to see','कवि कहता है कि अगर वह दादी को देखे, तो वह उन्हें पहचान लेगा।'],
  ['her shape from a mile away','एक मील दूर से उनकी आकृति देखकर भी वह उन्हें पहचान सकता है।'],
  ["I'd know so quickly",'वह बिना देर किए पहचान जाएगा।'],
  ['that it would be her.','उसे पता होगा कि वह दादी ही हैं।'],
  ['the purple scarf','बैंगनी स्कार्फ दादी की पहचान का एक खास संकेत है।'],
  ['and the plastic','प्लास्टिक की चीज भी उनकी पहचान से जुड़ी है।'],
  ['shopping bag.','उनका प्लास्टिक का शॉपिंग बैग उन्हें पहचानने में मदद करता है।'],
  ['if I felt','अगर कवि दादी का स्पर्श महसूस करे, तब भी पहचान सकता है।'],
  ['hands on my head','सिर पर रखे दादी के हाथ का स्पर्श उसे परिचित है।'],
  ["I'd know that those",'वह तुरंत समझ जाएगा कि ये वही परिचित हाथ हैं।'],
  ['were her hands','वे दादी के हाथ होंगे।'],
  ['warm and damp','दादी के हाथ गर्म और नम महसूस होते हैं।'],
  ['with the smell','उन हाथों के साथ एक परिचित गंध जुड़ी है।'],
  ['of roots','वह गंध जड़ों जैसी मिट्टी और प्रकृति की गंध है।'],
  ['if I heard','अगर वह आवाज सुने, तब भी दादी को पहचान सकता है।'],
  ['a voice','यह दादी की परिचित आवाज है।'],
  ['coming from','आवाज कहीं से आती हुई सुनाई देती है।'],
  ['a rock','कवि कल्पना करता है कि आवाज किसी चट्टान से आ रही है।'],
  ["I'd know",'आवाज सुनकर भी वह पहचान जाएगा।'],
  ['that her words','दादी के शब्द उसके लिए बहुत परिचित हैं।'],
  ['would flow inside me','उनके शब्द उसके मन के भीतर गहराई से उतरेंगे।'],
  ['like the light','उन शब्दों के प्रभाव की तुलना रोशनी से की गई है।'],
  ['of someone','यह रोशनी किसी ऐसे व्यक्ति की याद दिलाती है जो कुछ कर रहा है।'],
  ['stirring ashes','जैसे कोई राख को हिलाता या कुरेदता है।'],
  ['from a sleeping fire','ऐसा लगता है जैसे बुझी-सी आग के भीतर छिपी गर्मी फिर जाग रही हो।'],
  ['at night.','रात की शांति में यह गहरी और जीवित स्मृति की भावना पैदा करता है।']
 ],
 stanzas:[
  {title:'Stanza 1 — पहचान केवल देखकर',start:0,end:7,range:'Lines 1–7',summary:'पहले stanza में कवि बताता है कि वह दादी को बहुत दूर से भी पहचान सकता है। उनकी आकृति, बैंगनी स्कार्फ और प्लास्टिक शॉपिंग बैग जैसे छोटे संकेत उसके लिए पर्याप्त हैं।',exam:'मुख्य बिंदु: एक मील की दूरी, आकृति, purple scarf, plastic shopping bag.',key:'Sense = Sight | भाव = गहरी पहचान और अपनापन'},
  {title:'Stanza 2 — स्पर्श और गंध से पहचान',start:7,end:14,range:'Lines 8–14',summary:'दूसरे stanza में पहचान देखने से आगे बढ़कर स्पर्श और गंध तक पहुँचती है। दादी के हाथ सिर पर महसूस होते हैं और वे warm, damp तथा roots की smell से जुड़े हैं।',exam:'मुख्य बिंदु: hands on the head, warm and damp, smell of roots.',key:'Senses = Touch + Smell | भाव = स्नेह और परिचितता'},
  {title:'Stanza 3 — आवाज और भीतर की स्मृति',start:14,end:26,range:'Lines 15–26',summary:'तीसरे stanza में कवि दादी की आवाज और उनके शब्दों को याद करता है। उनके शब्द उसके भीतर ऐसे प्रकाश पैदा करते हैं जैसे रात में सोई आग की राख को हिलाने से छिपी गर्मी जाग उठे।',exam:'मुख्य बिंदु: voice from a rock, words flow inside me, light, sleeping fire.',key:'Sense = Hearing | प्रभाव = स्मृति का भीतर तक जीवित रहना'}
 ],
 words:[['shape','आकृति'],['purple scarf','बैंगनी स्कार्फ'],['shopping bag','खरीदारी का बैग'],['damp','नम'],['smell','गंध'],['roots','जड़ें'],['voice','आवाज'],['rock','चट्टान'],['flow','बहना'],['ashes','राख'],['sleeping fire','सोई हुई / बुझी-सी आग']],
 devices:[['Imagery','आकृति, रंग, स्पर्श, गंध और आवाज के चित्र कविता को बहुत जीवंत बनाते हैं।'],['Sensory appeal','कविता sight, touch, smell और hearing—चार इंद्रिय अनुभवों का प्रयोग करती है।'],['Simile','अंत में दादी के शब्दों की तुलना light से की गई है।'],['Metaphorical image','“flow inside me” बताता है कि दादी की बातें कवि के भीतर गहराई से रहती हैं।'],['Symbolic image','sleeping fire भीतर छिपी गर्मी और जीवित स्मृति का प्रभाव देता है।']],
 themes:['grandmotherly love','memory and distance','identity through sensory details','family attachment','continuity of memory'],
 textbookAnswers:[
  ['Recognition distance','The poet can recognise his grandmother from a mile away.'],
  ['Scarf colour','Purple.'],
  ['Shopping-bag material','Plastic.'],
  ['First-section identifying details','Her shape, purple scarf and plastic shopping bag are the main identifying signs.'],
  ['Grandmother’s hands','They are warm and damp and are associated with the smell of roots.'],
  ['Voice location','The imagined voice comes from a rock.'],
  ['Words location','Her words would flow inside the speaker.']
 ]
};

const q=(question,options,answer,explanation)=>({q:question,o:options,a:answer,e:explanation});
const practice=[
 q('Who is the poet of “The Grandmother”?',['Ray Young Bear','William Blake','John Milton','Robert Frost'],0,'The supplied textbook page names Ray Young Bear.'),
 q('From what distance can the poet recognise his grandmother?',['A mile away','Two miles away','Ten miles away','Across a river'],0,'The poem explicitly gives a distance of one mile.'),
 q('What colour is the grandmother’s scarf?',['Purple','Red','Blue','Green'],0,'The scarf is described as purple.'),
 q('What is the shopping bag made of?',['Plastic','Jute','Cotton','Wool'],0,'The poem names a plastic shopping bag.'),
 q('Which sense dominates Stanza 1?',['Sight','Taste','Hearing','Smell'],0,'The poet begins by recognising the grandmother through her visible shape and objects.'),
 q('What does the poet imagine on his head?',['Her hands','Her scarf','Her hair','A hat'],0,'He imagines the grandmother’s hands on his head.'),
 q('How are the grandmother’s hands described?',['Warm and damp','Cold and dry','Hard and cold','Dusty and rough'],0,'Warm and damp are the exact descriptive ideas in the poem.'),
 q('What smell is linked with the grandmother?',['The smell of roots','The smell of flowers','The smell of smoke','The smell of rain'],0,'The poem links her hands with the smell of roots.'),
 q('Where is the imagined voice coming from?',['A rock','A river','A tree','A house'],0,'The poet imagines the voice coming from a rock.'),
 q('Where would the grandmother’s words flow?',['Inside the speaker','Into a river','Across a mountain','Outside the house'],0,'The words are imagined as flowing inside the speaker.'),
 q('Which sense is used by the phrase “a voice”?',['Hearing','Sight','Touch','Taste'],0,'A voice is perceived through hearing.'),
 q('What is the central comparison near the end?',['Words and light','Words and rain','Words and stone','Words and smoke'],0,'The grandmother’s words are linked with light.'),
 q('What does the sleeping fire suggest?',['Hidden warmth that can awaken','A storm','A river','A loud celebration'],0,'The image suggests quiet life and warmth remaining beneath ashes.'),
 q('What is the central theme?',['Love and lasting memory of the grandmother','School competition','Travel','Fear of nature'],0,'The poem centres on intimate memory and attachment.'),
 q('How does the poem build recognition?',['Sight → touch/smell → hearing','Hearing → taste → sight','Taste → touch → smell','Only through sight'],0,'The poem moves through several senses and ends in inner memory.')
];

const challenge=[
 q('Why are the scarf and shopping bag important?',['They are familiar visual signs of the grandmother','They are expensive possessions','They belong to the speaker','They describe the weather'],0,'Ordinary objects become identifying signs because they are closely associated with her.'),
 q('What does recognising someone from a mile away suggest?',['Strong familiarity despite distance','Excellent eyesight only','A crowded road','Fear of separation'],0,'The poem shows that emotional familiarity survives physical distance.'),
 q('What poetic method is strongest in Stanza 1?',['Visual imagery','Dialogue','Humour','Argument'],0,'Shape, colour and objects create a clear visual image.'),
 q('Why is the touch of hands emotionally important?',['It recalls affection and care','It shows anger','It describes an accident','It begins a journey'],0,'The remembered touch carries the emotional presence of the grandmother.'),
 q('What does “warm and damp” add?',['A concrete touch-memory','A weather report','A historical fact','A warning'],0,'The details make the remembered physical experience specific.'),
 q('Why is the smell of roots memorable?',['It creates an earthy natural association','It identifies a perfume brand','It describes food','It proves the poet is gardening'],0,'The smell links the grandmother with earth and nature.'),
 q('Why does the poem move from objects to voice?',['Recognition becomes more inward and emotional','The grandmother disappears from the poem','The poet changes the subject','The poem becomes a song'],0,'The poem gradually moves from visible signs to inner memory.'),
 q('What does “words would flow inside me” mean?',['Her words become part of the poet’s inner memory','Her words become water','He cannot hear her','She is shouting'],0,'It is a metaphor for the lasting effect of her words.'),
 q('Why is light an effective image for the grandmother’s words?',['Light suggests warmth and awakening','Light suggests punishment','Light means silence','Light represents money'],0,'The image suggests that her words illuminate and awaken something inside.'),
 q('What does stirring ashes from a sleeping fire suggest?',['Hidden warmth can be awakened by memory','A forest fire is starting','Someone is cooking','The poet is travelling'],0,'The final image suggests a quiet inner warmth becoming active again.'),
 q('Which pair best describes the poem’s movement?',['Recognition → memory','Anger → revenge','Fear → escape','Confusion → argument'],0,'Every sensory detail leads back to the remembered grandmother.'),
 q('Which is NOT a major sense used in the poem?',['Taste','Sight','Touch','Hearing'],0,'Taste is not a major sensory route in this poem.'),
 q('What does the poem say about emotional distance?',['Physical distance need not destroy closeness','Distance always destroys love','Distance makes recognition impossible','Distance is more important than memory'],0,'The grandmother is recognised even from far away.'),
 q('Which feature makes the poem intimate?',['Personal sensory memories','Many historical dates','A large cast','A geographical survey'],0,'The poem uses personal sensory details rather than public events.'),
 q('Which word means “slightly wet”?',['Damp','Purple','Root','Ash'],0,'Damp means slightly wet or moist.'),
 q('What are ashes?',['The remains left after burning','Fresh leaves','Pieces of glass','Drops of water'],0,'Ashes are the powdery remains after something burns.'),
 q('Why is the grandmother not described only by appearance?',['The poet knows her through many senses','He has never seen her','Appearance is unimportant to the poem','He wants to hide her identity'],0,'Sight is only the first of several ways through which memory works.'),
 q('What does the final image add to the poem?',['It turns memory into an image of inner warmth and life','It changes the poem into a travel story','It removes emotion','It introduces a new character'],0,'The sleeping fire gives a deeper image for memory continuing inside the speaker.'),
 q('What is the best whole-poem interpretation?',['A loved grandmother remains alive in memory through familiar sensory signs','The poem mainly describes shopping','The poem is about a dangerous rock','The poem is a family argument'],0,'The poem presents the grandmother as a lasting presence in memory.'),
 q('Why are ordinary objects effective poetic details?',['Small objects can carry strong personal memories','Objects are always symbolic','Objects are expensive','Objects replace people'],0,'A simple scarf or bag becomes powerful because of its personal association.'),
 q('How do sight, touch and hearing work together?',['They build a complete sensory memory','They create a scientific explanation','They describe different people','They produce a comic effect'],0,'The poem uses several senses to make the remembered grandmother vivid.'),
 q('What is the tone of the poem?',['Tender and reflective','Angry and mocking','Comic and playful','Formal and argumentative'],0,'The speaker looks back with affection and quiet reflection.'),
 q('What is the strongest exam message?',['Love and memory can overcome physical distance','Wealth creates family bonds','Nature is dangerous','Objects are more important than people'],0,'The poem’s central emotional idea is lasting attachment through memory.')
];

const finalTest=[...practice.slice(0,10),...challenge.slice(0,10)];

function StanzaCard({stanza}){const lines=poem.lines.slice(stanza.start,stanza.end);return <article className="poem-stanza-card"><div className="poem-card-kicker">{stanza.range}</div><h3>{stanza.title}</h3><p>{stanza.summary}</p><div className="poem-stanza-lines">{lines.map(([line,meaning],j)=><div key={line}><span>L{stanza.start+j+1}</span><div><b>{line}</b><p>{meaning}</p></div></div>)}</div><strong>{stanza.key}</strong><div className="poem-exam-box"><b>Exam focus</b><p>{stanza.exam}</p></div></article>}
function Learn({onMode}){return <div className="poem-page">
 <div className="poem-hero"><span>CLASS 9 • THE PANORAMA • POETRY 1</span><h1>The Grandmother</h1><p>Ray Young Bear • recognition, senses, memory and grandmotherly love</p></div>
 <section className="poem-panel poem-context"><div><span className="poem-section-label">POET &amp; CONTEXT</span><h2>Who wrote it?</h2><p>{poem.context}</p></div><div className="poem-fact-grid"><div><b>Poet</b><span>{poem.poet}</span></div><div><b>Structure</b><span>3 stanzas • 26 lines</span></div><div><b>Main senses</b><span>Sight • Touch • Smell • Hearing</span></div></div></section>
 <section className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">STANZA-BY-STANZA</span><h2>Read each stanza as a complete unit</h2></div><span>3 stanzas</span></div><div className="poem-stanza-grid">{poem.stanzas.map(s=><StanzaCard key={s.range} stanza={s}/>)}</div></section>
 <section className="poem-panel poem-text-panel"><div className="poem-section-heading"><div><span className="poem-section-label">COMPLETE POEM</span><h2>Every line with the simplest explanation</h2></div><span>{poem.lines.length} lines</span></div><div className="poem-lines">{poem.lines.map(([line,meaning],i)=><article key={i} className="poem-line"><div className="poem-line-no">{String(i+1).padStart(2,'0')}</div><div><div className="poem-line-text">{line}</div><p>{meaning}</p></div></article>)}</div></section>
 <section className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">POETRY TOOLKIT</span><h2>What replaces prose-style study?</h2></div><span>Poetry focused</span></div><div className="poem-tool-grid"><article><h3>Sensory progression</h3><p>Stanza 1: sight. Stanza 2: touch + smell. Stanza 3: hearing + inner memory.</p></article><article><h3>Central image</h3><p>The grandmother is carried in memory through ordinary familiar signs.</p></article><article><h3>Poetic comparison</h3><p>The grandmother’s words are connected with light.</p></article><article><h3>Final image</h3><p>The sleeping fire suggests hidden warmth that memory can awaken.</p></article></div></section>
 <section className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">POETIC DEVICES</span><h2>Identify and explain</h2></div></div><div className="poem-device-grid">{poem.devices.map(([name,desc])=><article key={name}><b>{name}</b><p>{desc}</p></article>)}</div></section>
 <section className="poem-panel poem-two-col"><div><span className="poem-section-label">WORDS TO KNOW</span><h2>Simple meanings</h2><div className="poem-word-grid">{poem.words.map(([w,m])=><div key={w}><b>{w}</b><span>{m}</span></div>)}</div></div><div><span className="poem-section-label">THEMES</span><h2>What the poem says</h2><div className="poem-theme-list">{poem.themes.map(t=><span key={t}>{t}</span>)}</div><div className="poem-exam-box"><b>One-line answer</b><p>The poem shows that deep love and memory can keep a grandmother emotionally present even across physical distance.</p></div></div></section>
 <section className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">TEXTBOOK QUICK ANSWERS</span><h2>Core answers from the supplied pages</h2></div><span>{poem.textbookAnswers.length} answers</span></div><div className="poem-answer-list">{poem.textbookAnswers.map(([q,a],i)=><article key={i}><b>Q{i+1}. {q}</b><p>{a}</p></article>)}</div></section>
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