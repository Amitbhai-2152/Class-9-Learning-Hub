import React,{useState} from 'react';
import PanoramaTimedQuiz from './PanoramaTimedQuiz.jsx';
import './english-panorama-poetry.css';

const poem={
 title:'I Am Like Grass',poet:'Pash',book:'The Panorama • Poetry Chapter 7',
 context:'The speaker compares himself with grass: it can be cut down, yet it grows again. The image becomes a statement of resilience, identity, survival and renewal after destruction.',
 stanzas:[
  {title:'Stanza 1 — Resilience',range:'Lines 1–5',poemLines:[
   'I am like grass',
   'you can chop me or mow me down',
   'but I shall sprout again',
   'grow',
   'and bounce back'
  ],explanation:'वक्ता अपने अस्तित्व की तुलना घास से करता है। घास को काटा या नीचे दबाया जा सकता है, लेकिन वह फिर अंकुरित होकर बढ़ती है। इसलिए घास यहाँ हार न मानने और फिर से उठ खड़े होने का प्रतीक है।',vocab:[['chop','काटना'],['mow','घास काटना'],['sprout','अंकुरित होना'],['bounce back','झटके के बाद फिर संभलना']]},
  {title:'Stanza 2 — Identity survives destruction',range:'Lines 6–13',poemLines:[
   'you can obliterate my signposts',
   'you can bomb the Universities',
   'reduce the hostels to rubble',
   'you may scorch the slums',
   'but you cannot erase my identity',
   'because I am like grass',
   'I will sprout again',
   'and my mantle shall cover everything'
  ],explanation:'दूसरे भाग में विनाश की तीव्र छवियाँ आती हैं—signposts, Universities, hostels और slums को नष्ट करने की कल्पना। फिर भी वक्ता स्पष्ट करता है कि बाहरी विनाश उसकी पहचान मिटा नहीं सकता। घास की तरह वह फिर उगेगा और हरियाली का आवरण फैलाएगा।',vocab:[['obliterate','पूरी तरह नष्ट करना'],['signposts','दिशा बताने वाले चिन्ह'],['rubble','मलबा'],['scorch','झुलसा देना'],['identity','पहचान'],['mantle','आवरण / चादर']]},
  {title:'Stanza 3 — Recovery takes time',range:'Lines 14–20',poemLines:[
   'you may bomb Bangla',
   'you may destroy Sangrur',
   'and reduce the whole district of Ludhiana',
   'to ashes',
   'but it will be only a matter of time',
   'two years ten years',
   'before my green mantle covers everything again'
  ],explanation:'तीसरे भाग में विनाश का दायरा अलग-अलग स्थानों तक फैलता है। लेकिन वक्ता का विश्वास यही रहता है कि विनाश अंतिम नहीं है। दो या दस वर्षों जैसे समय के बाद हरियाली फिर लौटेगी और उजड़ा हुआ दृश्य ढक जाएगा।',vocab:[['Bangla','बंगला'],['Sangrur','संगरूर'],['ashes','राख'],['matter of time','समय की बात'],['green mantle','हरियाली का आवरण']]},
  {title:'Stanza 4 — Regeneration becomes a jungle',range:'Lines 21–29',poemLines:[
   'I shall become a vast green jungle',
   'the green jungle of Bangala',
   'where tourists will visit me',
   'visit my green jungle',
   'because I am like grass',
   'you can chop me',
   'you can mow down',
   'but I will sprout again',
   'and cover everything'
  ],explanation:'अंतिम भाग में पुनरुत्थान का दृश्य विशाल हो जाता है। वक्ता स्वयं को एक विशाल हरे जंगल के रूप में देखता है। कविता फिर घास की मूल छवि पर लौटती है: काटा जा सकता है, लेकिन फिर अंकुरित होकर सब कुछ ढक लेने की शक्ति बनी रहती है।',vocab:[['vast','विशाल'],['jungle','घना वन'],['tourists','पर्यटक'],['sprout again','फिर से अंकुरित होना']]}
 ],
 words:[['chop','cut by the blow of an axe'],['mow','cut grass with a scythe or machine'],['sprout','put forth or begin to grow'],['bounce back','recover after a setback'],['obliterate','wipe out or destroy'],['rubble','rough fragments from a demolished building'],['scorch','burn or discolour with dry heat'],['slum','house unit for human habitation'],['mantle','loose covering'],['vast','immense or huge']],
 devices:[['Simile','The speaker explicitly compares himself to grass, making natural regrowth the central image of resilience.'],['Metaphor','The green mantle becomes a metaphor for renewal covering damaged places.'],['Repetition','The recurring grass image strengthens the theme of survival and return.'],['Imagery','Grass, rubble, ashes and a green jungle create a movement from destruction to regeneration.'],['Contrast','Violent destruction is set against growth, recovery and greenery.'],['Symbolism','Grass symbolises resilience, identity, continuity and recovery.']],
 themes:['resilience','identity','survival','renewal','nature','hope','recovery after destruction','national integration'],
 textbookAnswers:[
  ['Why does the poet say that he is like grass?','Because grass can be chopped or mown yet it grows again. The comparison expresses the speaker’s resilience.'],
  ['Why will the speaker sprout again?','The speaker borrows the natural power of grass to represent his own return after destruction.'],
  ['What cannot be erased?','The speaker says that his identity cannot be erased by destroying external signs and structures.'],
  ['What will the green mantle cover?','It represents renewed greenery covering the places that have been damaged.'],
  ['What do the references to Bangla, Sangrur and Ludhiana suggest?','They extend the poem from individual survival to the survival and recovery of places and communities.'],
  ['How long will recovery take?','The poem allows a broad period of two years to ten years, showing that recovery may take time but will come.'],
  ['Why will tourists visit the green jungle?','The regenerated landscape will become a living, attractive green place worth visiting.']
 ],
 longAnswers:[
  ['Why does the poet compare himself to grass?','Grass is repeatedly cut and still regrows. The poet uses this natural quality as a symbol of his own endurance, identity and ability to recover.'],
  ['What are the important features of grass in the poem?','Grass is easy to cut, can be mown down and can apparently be destroyed, yet it sprouts, grows and returns. Its regenerative power makes it a strong image of persistence.'],
  ['Why is grass used as a symbol of strength even though it is soft?','The poem shows that visible softness does not equal weakness. The crucial strength is the ability to return after being cut, so grass becomes a symbol of lasting resilience.'],
  ['What does the poem say about identity?','It says that physical destruction cannot automatically erase identity. The speaker’s identity survives through the same regenerative force symbolised by grass.'],
  ['What circumstances are reflected in the poem?','The references to bombings, destroyed institutions, Bangla, Sangrur and Ludhiana create a background of violence and destruction, while the repeated return of grass expresses recovery and hope.'],
  ['Summarise the poem in your own words.','The speaker compares himself with grass. Even when places and visible structures are destroyed, his identity survives. Time brings regrowth, and the final image expands this renewal into a vast green jungle.'],
  ['What does the poem teach through nature?','Nature teaches that destruction is not always final. Grass demonstrates patience, regeneration and the capacity to return after repeated disturbance.'],
  ['How does the final jungle image strengthen the poem?','It enlarges the idea of survival into a complete transformation. The speaker does not merely survive; renewal spreads until the damaged landscape becomes green again.']
 ],
 groupDiscussion:['Nature is our best teacher. Discuss how natural cycles teach resilience and patience.','We can always get inspiration from Nature. Give examples from everyday life.'],
 composition:['Write a paragraph of about 100 words on National Integration.','Write a paragraph of about 100 words on why love for the country is the need of the hour.','Write a short condolence letter to a friend who has lost his parents in a violent attack. Offer emotional support and encourage him to face the situation with courage.'],
 wordStudy:[
  {title:'Correct spelling',text:'Practise the chapter spellings: signpost, university, rubble, mantle, matter and sprout.'},
  {title:'Match words with meanings',text:'Match chop, mow, vast, mantle, bounce back and sprout with the correct dictionary meanings.'},
  {title:'Adjective formation with -y',text:'Form adjectives from air, anger, grass, hunger, ice, fog, chilli, cloud, dirt and juice. Remember that spelling may change when the suffix is added.'}
 ],
 grammar:[
  {title:'Simile',text:'A simile compares two different things using “like” or “as”. Create ten original sentences with these markers.'},
  {title:'Metaphor',text:'A metaphor directly describes one thing in terms of another to express a shared quality. Create ten original metaphorical sentences.'}
 ],
 activity:'With the help of your teacher, research different varieties of grass, where they grow, how they grow and their uses.',
 translation:'Translate the poem into Hindi or your mother tongue.'
};

const q=(question,options,answer,explanation)=>({q:question,o:options,a:answer,e:explanation});
const practice=[
 q("Who wrote 'I Am Like Grass'?",['Pash','Neerada Suresh','Rajani Parulekar','Robert Herrick'],0,'The chapter credits Pash.'),
 q('What is the speaker compared to?',['Grass','A tree','A river','A mountain'],0,'Grass is the controlling comparison.'),
 q('What happens after the speaker is mown down?',['He sprouts again','He disappears forever','He becomes a building','He turns into water'],0,'The poem connects mowing with later regrowth.'),
 q('What does “sprout” mean?',['Begin to grow','Break down','Become silent','Travel away'],0,'Sprout means to put forth or begin to grow.'),
 q('What does “bounce back” mean?',['Recover after a setback','Fall permanently','Change location','Become invisible'],0,'The glossary meaning is recovery after a setback.'),
 q('What can the speaker not allow to be erased?',['His identity','His signposts','His hostels','His rubble'],0,'Identity remains beyond physical destruction.'),
 q('What can be reduced to rubble in the poem?',['Hostels','Grass','The wind','Tourists'],0,'The poem mentions hostels being reduced to rubble.'),
 q('What can be scorched?',['The slums','The green mantle','The tourists','The grass seed'],0,'The poem uses scorching imagery for the slums.'),
 q('What does “rubble” mean?',['Broken building fragments','Fresh grass','A signpost','A green covering'],0,'Rubble is material left after demolition.'),
 q('What is the “green mantle”?',['Renewed greenery','A road sign','A school uniform','A cloud of smoke'],0,'It is the image of greenery covering the damaged land.'),
 q('What is meant by “a matter of time”?',['Something expected to happen after some time','Something impossible','A change of place','A school timetable'],0,'The phrase expresses eventual recovery.'),
 q('Which period is named before the green mantle returns?',['Two years to ten years','Two days to ten days','Ten minutes','One hundred years'],0,'The poem says “two years ten years”.'),
 q('What does “vast” mean?',['Very large','Very small','Very old','Very quiet'],0,'Vast means immense or huge.'),
 q('What final landscape does the speaker imagine?',['A vast green jungle','A desert','A city of rubble','A frozen lake'],0,'The closing image is a vast green jungle.'),
 q('What is the central message of the poem?',['Resilience and survival after destruction','The importance of cities','The danger of rain','The value of buildings'],0,'The grass image symbolises persistence and renewal.')
];
const challenge=[
 q('Why is grass an effective symbol of resilience?',['It can be cut and still return','It never changes','It is made of stone','It cannot be damaged'],0,'Regrowth after cutting gives the symbol its power.'),
 q('Why does the poem mention signposts?',['They represent visible markers that can be destroyed without erasing deeper identity','They are needed for growing grass','They describe the weather','They are tourist attractions'],0,'The contrast is between external markers and lasting identity.'),
 q('What is the effect of the bombing imagery?',['It creates a sharp contrast with the later promise of renewal','It makes the poem purely comic','It removes the nature theme','It describes a science experiment'],0,'Destruction makes the later regrowth more powerful.'),
 q('What does the phrase about Universities suggest?',['Even major institutions are vulnerable to destruction','Universities always become forests','Education is unnecessary','Grass grows only on campuses'],0,'Institutions are included in the wider destructive imagery.'),
 q('Why are slums mentioned?',['The destructive vision includes vulnerable human settlements','They are described as beautiful gardens','They are tourist sites','They are kinds of grass'],0,'The poem includes slums among places that may be scorched.'),
 q('What does the speaker’s repeated return to grass achieve?',['It reinforces the theme of survival','It changes the subject to farming','It creates a historical date','It removes all imagery'],0,'Repetition keeps the controlling comparison active.'),
 q('What is the significance of the places named in the poem?',['They broaden the poem from personal identity to collective and geographical recovery','They are only examples of weather','They are all types of grass','They explain grammar'],0,'The references expand the scale of destruction and recovery.'),
 q('Why is “ashes” important?',['It represents complete visible destruction before renewal','It means fresh green grass','It indicates celebration','It means a tourist'],0,'Ashes intensify the destructive image.'),
 q('How does time function in the poem?',['Time is presented as allowing recovery and regrowth','Time stops the growth of grass','Time destroys identity permanently','Time has no relation to the ending'],0,'The poem says recovery is a matter of time.'),
 q('What does the green mantle symbolise?',['Nature’s regenerative power','A military uniform','A school building','A signpost'],0,'Greenery symbolises the return of life.'),
 q('Why does the final jungle image feel larger than the opening grass image?',['It shows renewal expanding from a small resilient plant into a vast landscape','It makes the speaker weaker','It removes the grass comparison','It describes a different poet'],0,'The scale of renewal grows dramatically.'),
 q('How is the title connected to the poem?',['The grass comparison explains the speaker’s ability to survive and return','The poem is about gardening only','The title refers to a school subject','The title describes a building'],0,'The title names the central metaphorical comparison.'),
 q('Which poetic device is central to “I am like grass”?',['Simile','Irony','Pun','Alliteration only'],0,'The comparison uses “like”.'),
 q('Which idea is suggested by “you cannot erase my identity”?',['Inner identity can survive external destruction','Buildings cannot be damaged','Grass is a signpost','Tourists erase history'],0,'The line draws a distinction between physical damage and identity.'),
 q('What does “bounce back” add to the grass image?',['It turns regrowth into an idea of recovery after hardship','It describes a game','It refers to tourism','It means destruction'],0,'It directly states the idea of recovery.'),
 q('What is the best interpretation of the named geographical places?',['They connect personal survival with broader social and regional experience','They are random sightseeing destinations','They are scientific locations for grass','They are grammar examples'],0,'The poem links identity and recovery to real places.'),
 q('How does contrast operate in the poem?',['Destruction is placed against future greenery and growth','Summer is placed against winter only','School is placed against music','Rain is placed against snow'],0,'The strongest contrast is destruction versus regeneration.'),
 q('Why is nature presented as a teacher in the chapter extension?',['The natural cycle of grass demonstrates patience and resilience','Nature only provides vocabulary','Nature prevents all change','Nature is unrelated to the poem'],0,'The discussion section explicitly asks learners to learn from nature.'),
 q('What is the purpose of the green jungle in the ending?',['It imagines complete regeneration after devastation','It describes a military campaign','It ends the poem in despair','It explains a dictionary word'],0,'The ending transforms survival into renewed life.'),
 q('Which word means “immense or huge”?',['Vast','Scorch','Rubble','Chop'],0,'Vast means immense or huge.'),
 q('Which word means “recover after a setback”?',['Bounce back','Mow','Obliterate','Mantle'],0,'Bounce back means recover after a setback.'),
 q('Which language topic is taught through “air + y”?',['Adjective formation','Direct speech','Passive voice','Articles'],0,'The chapter asks learners to form adjectives with the suffix -y.'),
 q('Which figure of speech is taught explicitly in the source chapter?',['Simile and metaphor','Oxymoron and pun','Irony and satire','Sonnet and ode'],0,'The grammar/figure-of-speech section teaches simile and metaphor.'),
 q('What is the chapter’s main emotional movement?',['Destruction → persistence → renewal','Celebration → sleep → silence','Travel → school → examination','Winter → summer → monsoon'],0,'The poem moves from threat and destruction toward recovery.'),
 q('What does the activity about grass ask students to explore?',['Different varieties, growth and uses of grass','How to write a sonnet','How to build a hostel','How to predict rainfall'],0,'The source activity focuses on varieties, growth and uses of grass.')
];
const finalTest=[...practice.slice(0,10),...challenge.slice(0,10)];

function Learn({onMode,onBack}){
 return <div className="poem-shell">
  <button className="poem-exit" onClick={onBack}>← Exit Poetry</button>
  <div className="poem-hero"><span>THE PANORAMA • POETRY CHAPTER 7</span><h1>{poem.title}</h1><p>{poem.poet}</p><p>{poem.context}</p></div>
  <div className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">THE COMPLETE POEM</span><h2>Read the poem</h2></div><span>28 source lines</span></div><div className="poem-stanza-grid">{poem.stanzas.map(stanza=><article className="poem-stanza-card" key={stanza.title}><span className="poem-card-kicker">{stanza.range}</span><h3>{stanza.title}</h3><div className="poem-actual-stanza">{stanza.poemLines.map((line,i)=><div key={`${stanza.title}-${i}`}>{line}</div>)}</div><span className="poem-simple-label">SIMPLE EXPLANATION</span><p className="poem-stanza-explanation">{stanza.explanation}</p><div className="poem-vocab-block"><span className="poem-simple-label">VOCABULARY</span><div className="poem-word-grid">{stanza.vocab.map(([w,m])=><div key={w}><b>{w}</b><span>{m}</span></div>)}</div></div></article>)}</div></div>
  <div className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">POETRY TOOLKIT</span><h2>Devices and meaning</h2></div></div><div className="poem-device-grid">{poem.devices.map(([d,e])=><article key={d}><b>{d}</b><p>{e}</p></article>)}</div></div>
  <div className="poem-panel poem-two-col"><div><span className="poem-section-label">WORDS TO KNOW</span><h2>Glossary</h2><div className="poem-word-grid">{poem.words.map(([w,m])=><div key={w}><b>{w}</b><span>{m}</span></div>)}</div></div><div><span className="poem-section-label">THEMES</span><h2>Core themes</h2><div className="poem-theme-list">{poem.themes.map(t=><span key={t}>{t}</span>)}</div></div></div>
  <div className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">TEXTBOOK PREPARATION</span><h2>Very brief + long answers</h2></div></div><div className="poem-answer-list">{poem.textbookAnswers.map(([q,a])=><article key={q}><b>{q}</b><p>{a}</p></article>)}</div><h2 style={{marginTop:20}}>Long Answers</h2><div className="poem-answer-list">{poem.longAnswers.map(([q,a])=><article key={q}><b>{q}</b><p>{a}</p></article>)}</div><h2 style={{marginTop:20}}>Group Discussion</h2>{poem.groupDiscussion.map(x=><div className="poem-exam-box" key={x}><p>{x}</p></div>)}<h2 style={{marginTop:20}}>Composition</h2>{poem.composition.map(x=><div className="poem-exam-box" key={x}><p>{x}</p></div>)}</div>
  <div className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">WORD STUDY</span><h2>Vocabulary and word formation</h2></div></div>{poem.wordStudy.map(x=><div className="poem-exam-box" key={x.title}><b>{x.title}</b><p>{x.text}</p></div>)}</div>
  <div className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">GRAMMAR • FIGURE OF SPEECH</span><h2>Simile and metaphor</h2></div></div>{poem.grammar.map(x=><div className="poem-exam-box" key={x.title}><b>{x.title}</b><p>{x.text}</p></div>)}</div>
  <div className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">ACTIVITY • TRANSLATION</span><h2>Apply the learning</h2></div></div><div className="poem-exam-box"><p>{poem.activity}</p></div><div className="poem-exam-box"><b>TRANSLATION</b><p>{poem.translation}</p></div></div>
  <div className="poem-modebar"><div><span className="poem-section-label">ASSESSMENT</span><h2>Test what you learned</h2><p>15 Practice • 25 Challenge • 20-question Final Test • timed shared engine</p></div><div className="poem-mode-buttons"><button className="primary" onClick={()=>onMode('practice')}>Practice →</button><button onClick={()=>onMode('challenge')}>Challenge →</button><button onClick={()=>onMode('test')}>Final Test →</button></div></div>
 </div>;
}

export function EnglishPanoramaPoem7({initialMode='learn',onBack,addXp,finishSession}){
 const [mode,setMode]=useState(initialMode==='learn'?'':initialMode);
 if(mode)return <PanoramaTimedQuiz mode={mode} title={poem.title} bank={mode==='practice'?practice:mode==='challenge'?challenge:finalTest} onBack={()=>setMode('')} addXp={addXp} finishSession={finishSession}/>;
 return <Learn onMode={setMode} onBack={onBack}/>;
}
