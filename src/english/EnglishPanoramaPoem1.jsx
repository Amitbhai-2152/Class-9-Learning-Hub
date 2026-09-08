import React,{useState} from 'react';
import PanoramaTimedQuiz from './PanoramaTimedQuiz.jsx';
import './english-panorama-poetry.css';

const poem={
 title:'The Grandmother',
 poet:'Ray Young Bear',
 book:'The Panorama • Poetry Chapter 1',
 sourceNote:'Built from the supplied Bihar Board Class 9 Panorama pages for The Grandmother.',
 context:'Ray Young Bear (b. 1950) is presented in the textbook as a Native American poet and novelist of the Mesquaki tribe. The poem remembers his grandmother through ordinary objects, touch, smell, sound and imagined presence.',
 lines:[
  ['if I were to see','दूर से दादी की आकृति दिखाई देने पर भी कवि उन्हें पहचान लेता।'],
  ['her shape from a mile away','एक मील दूर से भी उनकी आकृति देखकर पहचान हो जाती।'],
  ["I'd know so quickly",'कवि बिना देर किए समझ जाता कि वह दादी हैं।'],
  ['that it would be her.','उसे पूरा विश्वास होता कि वह दादी ही हैं।'],
  ['the purple scarf','बैंगनी स्कार्फ दादी की एक पहचान है।'],
  ['and the plastic','प्लास्टिक की वस्तु भी दादी की पहचान से जुड़ी है।'],
  ['shopping bag.','उनका प्लास्टिक का शॉपिंग बैग भी कवि को पहचानने में मदद करता है।'],
  ['if I felt her','दादी के स्पर्श से भी कवि उन्हें पहचान सकता है।'],
  ['hands on my head','सिर पर रखे उनके हाथ का स्पर्श परिचित है।'],
  ["I'd know that those",'कवि तुरंत समझ जाता कि ये दादी के हाथ हैं।'],
  ['were her hands','कवि उन हाथों को दादी के हाथ के रूप में पहचानता है।'],
  ['warm and damp','उनके हाथ गर्म और नम महसूस होते हैं।'],
  ['with the smell','उनके हाथों में एक खास गंध भी है।'],
  ['of roots','वह गंध जड़ों की मिट्टी जैसी प्राकृतिक गंध से जुड़ी है।'],
  ['if I heard','सिर्फ आवाज सुनकर भी कवि दादी को पहचान सकता है।'],
  ['a voice','वह दादी की जानी-पहचानी आवाज की बात करता है।'],
  ['coming from','उसे लगता है कि वह आवाज कहीं से आ रही है।'],
  ['a rock','कठोर चट्टान के पास या उससे आती हुई आवाज भी उसे उनकी याद दिला सकती है।'],
  ["I'd know",'आवाज सुनते ही कवि पहचान जाएगा।'],
  ['and her words','दादी के बोले हुए शब्द उसके लिए बहुत परिचित हैं।'],
  ['would flow inside me','उनके शब्द कवि के मन के भीतर स्वाभाविक रूप से उतरते हैं।'],
  ['like the light','कवि उनकी बातों के प्रभाव की तुलना रोशनी से करता है।'],
  ['of someone','यह रोशनी किसी व्यक्ति के काम करने जैसी है।'],
  ['stirring ashes','जैसे कोई बुझी राख को हिलाता है।'],
  ['from a sleeping fire','सोई हुई आग के नीचे छिपी गर्मी फिर दिखाई देने लगती है।'],
  ['at night.','रात की शांति में यह तुलना दादी की स्मृति के गहरे प्रभाव को दिखाती है.']
 ],
 stanzas:[
  {title:'Stanza 1 • पहचान through sight',range:'Lines 1–7',summary:'कवि कहता है कि वह अपनी दादी को बहुत दूर से भी पहचान सकता है। उनकी आकृति, बैंगनी स्कार्फ और प्लास्टिक शॉपिंग बैग उनकी पहचान के संकेत हैं.',key:'Sense: sight • पहचान: shape, purple scarf, plastic shopping bag'},
  {title:'Stanza 2 • पहचान through touch and smell',range:'Lines 8–14',summary:'कवि दादी के सिर पर रखे हाथों के स्पर्श को पहचानता है। उनके हाथ गर्म और नम हैं तथा उनमें जड़ों जैसी प्राकृतिक गंध है.',key:'Senses: touch + smell • पहचान: warm, damp hands and smell of roots'},
  {title:'Stanza 3 • पहचान through sound and memory',range:'Lines 15–26',summary:'कवि दादी की आवाज और शब्दों को भी पहचान सकता है। उनके शब्द उसके भीतर ऐसे उजाला करते हैं जैसे रात में सोई आग की राख को कोई हिलाए.',key:'Sense: hearing • inner effect: words flow inside me like light'}
 ],
 words:[['shape','आकृति'],['purple','बैंगनी'],['scarf','स्कार्फ / गले का कपड़ा'],['damp','नम'],['smell','गंध'],['roots','जड़ें'],['rock','चट्टान'],['flow','बहना'],['stirring','हिलाना / कुरेदना'],['ashes','राख'],['sleeping fire','सोई हुई / बुझी-सी आग']],
 devices:[['Imagery','कवि sight, touch, smell और hearing के चित्रों से दादी को जीवित-सा उपस्थित करता है।'],['Simile','“like the light” के माध्यम से दादी के शब्दों के प्रभाव की तुलना प्रकाश से की गई है।'],['Symbolism','purple scarf और plastic shopping bag जैसी वस्तुएँ दादी की पहचान के संकेत बनती हैं।'],['Sensory appeal','दृश्य, स्पर्श, गंध और श्रवण—चारों इंद्रियों के अनुभव कविता को आत्मीय बनाते हैं।'],['Metaphorical image','words “would flow inside me” बताता है कि दादी की बातें मन में गहराई से उतरती हैं।']],
 themes:['grandmotherly love','memory and distance','identity through sensory details','family attachment','continuity of memory'],
 textbookAnswers:[
  ['From what distance does the poet recognise his grandmother?','A mile away.'],
  ["What is the colour of grandmother's scarf?",'Purple.'],
  ['What material is the shopping-bag made of?','Plastic.'],
  ['What are the two things in first eight lines which the speaker associates with his grandmother?','Her shape and her purple scarf/plastic shopping bag are the identifying objects; the strongest named personal objects are the purple scarf and plastic shopping bag.'],
  ['What helps the speaker to recognise his grandmother from a mile?','Her shape and the familiar identifying details of the purple scarf and plastic shopping bag.'],
  ['What are the two things mentioned as part of the grandmother’s hands?','They are warm and damp, and they carry the smell of roots.'],
  ['From where does the voice come in the poem?','It is imagined as coming from a rock.'],
  ['Where do the words of the grandmother flow?','They flow inside the speaker.']
 ]
};

const q=(question,options,answer,explanation,tag)=>({q:question,o:options,a:answer,e:explanation,tag});
const practice=[
 q('Who is the poet of “The Grandmother”?',['Ray Young Bear','William Blake','John Milton','Robert Frost'],0,'The supplied textbook page names Ray Young Bear as the poet.','poet'),
 q('What does the poet say he could recognise from a mile away?',["His grandmother's shape","His school","A temple","A mountain"],0,'The first section focuses on recognising the grandmother by her shape.','sight'),
 q('What colour is the grandmother’s scarf?',['Purple','Red','Blue','Green'],0,'The poem names a purple scarf as one of her identifying details.','detail'),
 q('What is the shopping bag made of?',['Plastic','Jute','Cotton','Wool'],0,'The poem specifically mentions a plastic shopping bag.','detail'),
 q('Which sense is strongest in the first stanza?',['Sight','Taste','Hearing','Smell'],0,'The poet begins with seeing the grandmother from a distance.','sense'),
 q('What part of the grandmother does the poet feel on his head?',['Her hands','Her scarf','Her hair','Her shoulder'],0,'The poet imagines her hands resting on his head.','touch'),
 q('How are the grandmother’s hands described?',['Warm and damp','Cold and dry','Rough and cold','Soft and dusty'],0,'The poem describes the hands as warm and damp.','touch'),
 q('What smell is associated with the grandmother’s hands?',['The smell of roots','The smell of flowers','The smell of rain','The smell of smoke'],0,'The line connects her hands with the smell of roots.','smell'),
 q('Where is the imagined voice coming from?',['A rock','A river','A tree','A mountain'],0,'The poem imagines a voice coming from a rock.','hearing'),
 q('What happens to the grandmother’s words inside the speaker?',['They flow inside him','They disappear immediately','They become silent','They frighten him'],0,'The poet says her words would flow inside him.','memory'),
 q('Which sense is used in “a voice”?',['Hearing','Sight','Touch','Taste'],0,'A voice is perceived through hearing.','sense'),
 q('What image is used for the grandmother’s words?',['Light','Rain','Wind','Waterfall'],0,'The words are compared with light.','device'),
 q('What does the “sleeping fire” suggest in context?',['Hidden warmth that can be awakened','A dangerous forest fire','A cold river','A loud celebration'],0,'The image suggests something quietly alive that can be stirred into brightness.','imagery'),
 q('Which idea is central to the poem?',['Deep attachment to the grandmother','Competition at school','Travel to a new city','Fear of nature'],0,'The poem is a tender memory of the grandmother and the signs through which she is recognised.','theme'),
 q('How many clear sensory routes to recognition are emphasised?',['Three: sight, touch/smell, and hearing','One: only sight','Two: taste and smell','Four: taste, sight, touch and smell'],0,'The poem is organised around seeing, feeling/smelling, and hearing.','structure')
];

const challenge=[
 q('Why does the poet mention the purple scarf and plastic shopping bag together?',['They act as familiar visual markers of the grandmother','They are expensive gifts','They belong to the poet','They describe the weather'],0,'These ordinary objects help the poet identify his grandmother even from a distance.','inference'),
 q('What does recognition “from a mile away” mainly show?',['How deeply familiar the grandmother is to the poet','How tall the grandmother is','How crowded the road is','How good the poet’s eyesight is'],0,'Distance does not weaken recognition because the grandmother is deeply familiar to him.','inference'),
 q('The first stanza is built mainly through which technique?',['Visual imagery','Dialogue','Humour','Argument'],0,'Shape, colour and the shopping bag create a visual picture.','device'),
 q('Why is the phrase “if I felt her hands on my head” emotionally important?',['Touch becomes a direct reminder of affection and care','It shows the poet dislikes physical contact','It describes an injury','It introduces a journey'],0,'The familiar touch of the grandmother’s hands carries emotional memory.','inference'),
 q('What do “warm and damp” contribute to the poem?',['A concrete tactile memory of the grandmother','A description of weather','A warning of illness','A description of the poet’s room'],0,'These words make the remembered touch specific and sensory.','touch'),
 q('Why is the “smell of roots” a striking image?',['It links the grandmother with something earthy and natural','It proves she works in a kitchen','It describes perfume','It shows fear of plants'],0,'The earthy smell creates a natural, intimate sensory association.','imagery'),
 q('Why does the poem move from physical objects to voice?',['The memory becomes increasingly inward and emotional','The poet changes the subject completely','The grandmother leaves the poem','The poem becomes a story about music'],0,'The movement from sight and touch to voice and inner memory deepens the emotional effect.','structure'),
 q('What does “her words would flow inside me” suggest?',['Her speech has become part of the poet’s inner life','Her words are literally water','The poet cannot hear her','She is speaking very loudly'],0,'“Flow inside me” is a metaphor for words becoming an internal, lasting memory.','metaphor'),
 q('Why is light a suitable image for the grandmother’s words?',['Light suggests awakening, warmth and inner clarity','Light suggests punishment','Light suggests silence','Light means the poet is outdoors'],0,'The light image suggests her words awaken and illuminate something within him.','simile'),
 q('What is suggested by “stirring ashes / from a sleeping fire”?',['A quiet memory can awaken old warmth and life','The poet is cooking dinner','A forest is burning','The grandmother is lighting a lamp'],0,'The image suggests hidden warmth returning when memory is stirred.','symbolism'),
 q('Which pair best captures the poem’s emotional movement?',['Recognition → recollection','Anger → revenge','Fear → escape','Confusion → argument'],0,'Each sensory cue leads the poet back to a living memory of his grandmother.','structure'),
 q('Which statement best explains the role of ordinary objects in the poem?',['Small objects become powerful carriers of memory','Objects are used only for decoration','Objects create a comic effect','Objects replace the grandmother completely'],0,'The scarf and shopping bag are simple objects but become emotionally meaningful signs.','memory'),
 q('Which of these is NOT one of the major sensory details in the poem?',['Taste of food','Sight of shape and colour','Touch of hands','Smell and hearing'],0,'Taste is not a major sensory route in the poem.','sense'),
 q('What does the poem suggest about distance?',['Physical distance may not weaken emotional closeness','Distance always destroys memory','Distance makes recognition impossible','Distance is more important than family'],0,'The poet insists that strong familiarity survives physical distance.','theme'),
 q('Which literary feature is most important to the poem’s structure?',['Accumulation of sensory memories','A sequence of dramatic events','A debate between characters','A historical timeline'],0,'The poem builds its portrait through a series of sensory recognitions.','structure'),
 q('What is the best simple meaning of “damp” in the poem?',['Slightly wet','Very hot','Completely dry','Very dusty'],0,'Damp means slightly wet or moist.','vocabulary'),
 q('What does “ashes” mean in the final image?',['The powdery remains left after burning','Fresh green leaves','Pieces of stone','Drops of water'],0,'Ashes are the remains left after something has burned.','vocabulary'),
 q('Why does the final image avoid describing the grandmother directly?',['It shows her presence through the effect of memory instead','The poet has forgotten her','The grandmother is not important','The poet is changing to a different story'],0,'The final image turns the grandmother into an inner presence carried through memory and words.','ending'),
 q('Which interpretation best combines all three stanzas?',['The grandmother is recognised through her visible, physical and vocal identity','The grandmother is presented only as a stranger','The poem is mainly about shopping','The poem is mainly about rocks'],0,'All three sections build a complete emotional portrait through the senses.','whole-poem'),
 q('Which phrase is closest in meaning to “flow inside me”?',['Become deeply absorbed in my inner self','Move outside the house','Fall onto the ground','Become impossible to understand'],0,'The phrase means the grandmother’s words enter and remain in the poet’s inner world.','language'),
 q('What makes the poem intimate rather than merely descriptive?',['The sensory details are tied to personal memory and affection','It gives many historical dates','It uses a large cast of characters','It focuses on geography'],0,'The details matter because they are connected with the poet’s emotional attachment.','tone'),
 q('The poem’s tone is best described as:',['Tender and reflective','Angry and mocking','Comic and playful','Formal and argumentative'],0,'The poem looks back with affection and quiet reflection.','tone'),
 q('What is the best exam-ready summary of the poem?',['Strong memory lets the poet recognise and feel close to his grandmother through sensory signs','A child learns to shop alone','A family argues about religion','A poet travels across mountains'],0,'The poem presents the grandmother as a lasting inner presence recognised through the senses.','exam')
];

const finalTest=[...practice.slice(0,10),...challenge.slice(0,10)];

function StanzaCard({stanza}){return <article className="poem-stanza-card"><div className="poem-card-kicker">{stanza.range}</div><h3>{stanza.title}</h3><p>{stanza.summary}</p><strong>{stanza.key}</strong></article>}
function Learn({onMode}){return <div className="poem-page">
 <div className="poem-hero"><span>CLASS 9 • THE PANORAMA • POETRY 1</span><h1>The Grandmother</h1><p>Ray Young Bear • A sensory poem about recognition, memory and deep attachment.</p></div>
 <section className="poem-panel poem-context"><div><span className="poem-section-label">POET &amp; CONTEXT</span><h2>Who wrote it?</h2><p>{poem.context}</p></div><div className="poem-fact-grid"><div><b>Poet</b><span>{poem.poet}</span></div><div><b>Focus</b><span>Grandmother • memory • senses</span></div><div><b>Poetry idea</b><span>Familiar signs can carry a loved person’s presence.</span></div></div></section>
 <section className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">STANZA MAP</span><h2>Understand the poem first</h2></div><span>3 stanzas</span></div><div className="poem-stanza-grid">{poem.stanzas.map(s=><StanzaCard key={s.range} stanza={s}/>)}</div></section>
 <section className="poem-panel poem-text-panel"><div className="poem-section-heading"><div><span className="poem-section-label">COMPLETE POEM</span><h2>Every line with the simplest explanation</h2></div><span>{poem.lines.length} lines</span></div><div className="poem-lines">{poem.lines.map(([line,meaning],i)=><article key={i} className="poem-line"><div className="poem-line-no">{String(i+1).padStart(2,'0')}</div><div><div className="poem-line-text">{line}</div><p>{meaning}</p></div></article>)}</div></section>
 <section className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">POETRY TOOLKIT</span><h2>Replace prose-style study with poetry skills</h2></div><span>Exam focused</span></div><div className="poem-tool-grid"><article><h3>Sensory route</h3><p>Stanza 1 = sight. Stanza 2 = touch + smell. Stanza 3 = hearing + inner memory.</p></article><article><h3>Central image</h3><p>The grandmother remains emotionally present through familiar objects, touch and voice.</p></article><article><h3>Important device</h3><p>Simile: the grandmother’s words are linked with light.</p></article><article><h3>Deepest idea</h3><p>Physical distance does not erase intimate family memory.</p></article></div></section>
 <section className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">POETIC DEVICES</span><h2>What to identify in the exam</h2></div></div><div className="poem-device-grid">{poem.devices.map(([name,desc])=><article key={name}><b>{name}</b><p>{desc}</p></article>)}</div></section>
 <section className="poem-panel poem-two-col"><div><span className="poem-section-label">WORDS TO KNOW</span><h2>Simple meanings</h2><div className="poem-word-grid">{poem.words.map(([w,m])=><div key={w}><b>{w}</b><span>{m}</span></div>)}</div></div><div><span className="poem-section-label">THEMES</span><h2>What the poem is really about</h2><div className="poem-theme-list">{poem.themes.map(t=><span key={t}>{t}</span>)}</div><div className="poem-exam-box"><b>One-line answer</b><p>The poem shows how a grandmother can remain intensely present in memory through small sensory details and familiar words.</p></div></div></section>
 <section className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">TEXTBOOK QUICK ANSWERS</span><h2>Core questions from the supplied pages</h2></div><span>{poem.textbookAnswers.length} answers</span></div><div className="poem-answer-list">{poem.textbookAnswers.map(([q,a],i)=><article key={i}><b>Q{i+1}. {q}</b><p>{a}</p></article>)}</div></section>
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
