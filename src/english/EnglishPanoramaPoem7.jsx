import React,{useState} from 'react';
import PanoramaTimedQuiz from './PanoramaTimedQuiz.jsx';
import './english-panorama-poetry.css';

const poem={
 title:'I Am Like Grass',poet:'Pash',book:'The Panorama • Poetry Chapter 7',
 sourceNote:'Built from the supplied Bihar Board Class 9 Panorama pages 117–121. The page uses brief source excerpts and original explanations while covering the chapter’s learning extensions.',
 context:'The speaker compares himself with grass: grass can be cut, burned or crushed, yet it returns. The poem uses this resilience to express recovery, identity, survival and the power to return after destruction.',
 structure:'Five short movements. The opening establishes the grass comparison; the middle sections imagine violent destruction of places and identity; the closing returns to renewal, a green mantle, and a future jungle visited because the speaker is like grass.',
 sourceExcerpts:[
  '“I am like grass” — the controlling comparison.',
  '“but I shall sprout again” — resilience after being cut down.',
  '“you cannot erase my identity” — survival of identity.',
  '“it will be only a matter of time” — renewal is inevitable.',
  '“my green mantle covers everything again” — the final image of regeneration.'
 ],
 stanzas:[
  {title:'Movement 1 — Grass as resilience',range:'Opening',excerpt:'I am like grass … but I shall sprout again … and bounce back.',explanation:'पहले भाग में वक्ता अपने अस्तित्व की तुलना घास से करता है। घास को काटा या दबाया जा सकता है, लेकिन वह फिर उग आती है। यही तुलना वक्ता के साहस, पुनरुत्थान और दृढ़ता का आधार बनती है।',vocab:[['chop','काटना'],['mow','घास काटना'],['sprout','अंकुरित होकर निकलना'],['bounce back','झटके के बाद फिर संभलना']],exam:'मुख्य विचार: विनाश अस्थायी है; जीवन और पहचान लौट सकते हैं।'},
  {title:'Movement 2 — Destruction cannot erase identity',range:'Middle I',excerpt:'You can obliterate my signposts … but you cannot erase my identity …',explanation:'वक्ता बताता है कि हिंसा किसी स्थान, संस्था या संकेत को नष्ट कर सकती है, लेकिन इससे उसकी पहचान समाप्त नहीं होती। “grass” यहाँ ऐसी सामुदायिक और व्यक्तिगत पहचान का प्रतीक है जो दबाव में भी बनी रहती है।',vocab:[['obliterate','पूरी तरह नष्ट करना'],['signpost','दिशा बताने वाला चिन्ह'],['rubble','टूटी हुई इमारतों का मलबा'],['identity','पहचान']],exam:'मुख्य विचार: बाहरी विनाश के बावजूद पहचान का जीवित रहना।'},
  {title:'Movement 3 — Places may fall, but renewal follows',range:'Middle II',excerpt:'A brief source moment names Bangla, Sangrur and the district of Ludhiana before imagining return.',explanation:'इस हिस्से में भौगोलिक स्थानों के विनाश की कल्पना आती है। लेकिन कविता विनाश को अंतिम नहीं मानती; राख और मलबे के बाद भी समय के साथ हरियाली लौटने की संभावना बनी रहती है।',vocab:[['scorch','झुलसा देना'],['ashes','राख'],['district','जिला'],['matter of time','समय का प्रश्न / कुछ समय लगना']],exam:'मुख्य विचार: स्थानों का विनाश भी पुनर्निर्माण और पुनर्जीवन की संभावना को नहीं मिटाता।'},
  {title:'Movement 4 — The green mantle',range:'Renewal',excerpt:'“two years ten years” … before the green mantle covers everything again.',explanation:'वक्ता समय की दूरी बताकर आश्वस्त करता है कि वापसी निश्चित है। “green mantle” प्रकृति की ऐसी चादर है जो उजड़े हुए दृश्य को फिर ढक देती है।',vocab:[['mantle','चादर/आवरण'],['green mantle','हरियाली का आवरण'],['renewal','पुनर्नवीकरण / फिर से जीवित होना']],exam:'मुख्य विचार: समय और प्रकृति विनाश के बाद नया आवरण रचते हैं।'},
  {title:'Movement 5 — From grass to green jungle',range:'Closing',excerpt:'I shall become a vast green jungle … because I am like grass.',explanation:'अंत में छोटी घास की तुलना विशाल हरित जंगल से जुड़ जाती है। वक्ता की वापसी इतनी बड़ी हो सकती है कि वही धरती फिर आकर्षक बन जाए और लोग उसे देखने आएँ। अंतिम लौटना grass की अविनाशी शक्ति को स्थापित करता है।',vocab:[['vast','विशाल'],['jungle','घना वन'],['tourist','पर्यटक'],['cover everything','सबको/सब जगह को ढक लेना']],exam:'मुख्य विचार: पुनरुत्थान व्यक्तिगत स्तर से बढ़कर व्यापक सामाजिक और प्राकृतिक पुनर्जीवन का रूप लेता है।'}
 ],
 words:[['chop','cut by blow of an axe'],['mow','cut grass/hay with a scythe or machine'],['sprout','put forth or begin to grow'],['bounce back','recover after a setback'],['obliterate','wipe out or destroy'],['rubble','rough fragments of a demolished building'],['scorch','burn or discolour with dry heat'],['slum','house unit for human habitation'],['mantle','loose sleeveless covering'],['vast','immense or huge']],
 devices:[['Simile','The speaker explicitly compares himself to grass, creating a sustained image of resilience.'],['Metaphor','The green mantle becomes a metaphor for nature and renewal covering damaged places.'],['Repetition','The return to the grass comparison reinforces the message of survival.'],['Imagery','Grass, ashes, rubble and a future green jungle create a visual movement from destruction to regeneration.'],['Contrast','Violence and destruction are set against regrowth and a future green landscape.'],['Symbolism','Grass symbolises resilience, identity, continuity and recovery.']],
 themes:['resilience','identity','survival','renewal','nature','hope','recovery after destruction','national integration'],
 textbookAnswers:[
 ['Why does the poet say he is like grass?','Because grass can be cut or mown and still returns; the comparison expresses resilience.'],
 ['Why will the speaker sprout again?','The speaker uses the natural regenerative power of grass as a symbol for his own recovery.'],
 ['What prevents identity from being erased?','The speaker’s identity is deeper than external signs and physical destruction.'],
 ['What will the green mantle cover?','It represents renewed vegetation covering the damaged landscape.'],
 ['What is suggested by references to places in Punjab and Bangla?','They widen the poem from personal survival to the fate, memory and recovery of places and communities.'],
 ['What does destruction by bombing symbolise?','It represents extreme violence and the attempt to destroy places, institutions and visible signs of identity.'],
 ['How long before the green mantle returns?','The poem gives a deliberately broad span—“two years ten years”—to stress that recovery may take time but is expected.'],
 ['Why will tourists visit the green jungle?','The future landscape becomes a symbol of successful renewal and a place worth seeing.'],
 ['What does the grass image finally stand for?','It stands for an identity and life force that can be suppressed temporarily but not permanently destroyed.']
 ],
 longAnswers:[
 ['Why does the poet compare himself to grass?','Grass is a powerful image because it is easily cut yet naturally returns. By adopting this comparison, the speaker presents himself as resilient, recoverable and impossible to erase permanently.'],
 ['Explain the features of grass that support the comparison.','Grass can be chopped or mown, but it can sprout, grow and spread again. It survives repeated disturbance, making it an apt symbol of persistence.'],
 ['Grass is soft and easily cut. Why use it as a symbol of strength?','The poem turns apparent weakness into strength. Being cut does not mean permanent defeat; the ability to return makes grass a stronger symbol of endurance than a rigid object would be.'],
 ['How does the poem suggest resilience of the poet?','The speaker repeatedly predicts his return after destructive acts. The language of sprouting, growth and covering the landscape makes resilience a process rather than a single moment.'],
 ['What circumstances may have led to the poem?','The supplied chapter connects the poem with destruction, identity and places named in Punjab and Bangla. These references support a reading concerned with violence, survival and recovery.'],
 ['Write a summary in your own words.','The poem compares a resilient speaker with grass. Although people can destroy visible structures and attempt to erase identity, life returns. Over time a green covering spreads again and grows into a vast jungle, turning survival into a vision of renewal.'],
 ['What larger social idea lies behind the grass image?','The image can represent communities whose identity survives violence or suppression. Renewal becomes collective as the green landscape expands beyond the individual speaker.'],
 ['How is nature used as a source of inspiration?','Nature provides the poem’s model for recovery. Grass does not argue with destruction; it regrows, so the natural cycle becomes a lesson in persistence and hope.'],
 ['What is the message of the closing jungle image?','The final jungle suggests that recovery can exceed what existed before. The speaker’s return is not merely survival; it becomes a new landscape full of life and possibility.']
 ],
 groupDiscussion:['Nature is our best teacher. Discuss how natural cycles teach resilience and patience.','We can always get inspiration from Nature. Give examples from everyday life.'],
 composition:['Write about National Integration in about 100 words.','Write about why love for the country is important today in about 100 words.','Write a short letter of condolence to a friend who has lost family members in a violent attack, offering support and encouraging constructive recovery.'],
 wordStudy:[
  {title:'Spelling practice',text:'Correct the chapter spellings for words such as signpost, university, rubble, mantle, matter and sprout.'},
  {title:'Meaning matching',text:'Match chop, mow, vast, mantle, bounce back and sprout with their appropriate dictionary meanings.'},
  {title:'Adjective formation with -y',text:'Build adjectives from words including air, anger, grass, hunger, ice, fog, chilli, cloud, dirt and juice. Spelling changes may be needed.'}
 ],
 grammar:[
  {title:'Simile',text:'The chapter explains comparison through “like” and “as”. Create ten original sentences using these markers.'},
  {title:'Metaphor',text:'A metaphor describes something by saying it is another thing that shares the intended quality. Create ten original metaphorical sentences.'}
 ],
 activity:'With your teacher, research varieties of grass, where they grow, how they grow and their uses.',
 translation:'Translate the supplied chapter poem into Hindi or your mother tongue.'
};

const q=(question,options,answer,explanation)=>({q:question,o:options,a:answer,e:explanation});
const practice=[
q("Who wrote 'I Am Like Grass'?",['Pash','Neerada Suresh','Rajani Parulekar','Robert Herrick'],0,'The supplied chapter credits Pash.'),
q('What is the speaker compared with?',['Grass','A tree','Rain','A river'],0,'Grass is the controlling comparison.'),
q('What can happen to the speaker like grass?',['He may be cut down but can return','He becomes stone','He disappears forever','He stops growing'],0,'Cutting does not prevent regrowth.'),
q('What does “sprout” mean?',['Begin to grow','Become silent','Break into pieces','Travel away'],0,'Sprout means to put forth or begin to grow.'),
q('What does “bounce back” express?',['Recovery after a setback','Permanent defeat','Physical travel','A change of colour'],0,'The glossary defines it as recovering after a setback.'),
q('What can be erased least easily in the poem?',['Identity','A signpost','A building','A road'],0,'The speaker says identity cannot be erased by destruction.'),
q('What can happen to universities or hostels in the poem’s violent imagery?',['They may be destroyed','They become gardens','They move underground','They become rivers'],0,'The poem uses destructive imagery to contrast with later renewal.'),
q('What does “rubble” mean?',['Broken fragments from a demolished building','Fresh grass','A signpost','A kind of rain'],0,'Rubble is the rough broken material left after demolition.'),
q('What is meant by “green mantle”?',['A covering of renewed greenery','A dark cloud','A school uniform','A road sign'],0,'The phrase symbolises vegetation returning over the damaged landscape.'),
q('Which time span is mentioned before the green mantle returns?',['Two years to ten years','Two hours to ten hours','One day','A century'],0,'The poem gives a flexible period of two years to ten years.'),
q('What future does the speaker imagine?',['A vast green jungle','A ruined city forever','A dry desert','A silent classroom'],0,'The closing vision is a vast green jungle.'),
q('Why would tourists visit the future landscape?',['Because the green jungle would be worth seeing','Because there is no vegetation','Because the place is empty','Because they are forced to go'],0,'The future jungle becomes a renewed attraction.'),
q('What does grass symbolise most strongly?',['Resilience and recovery','Fear only','Luxury','Isolation'],0,'The whole comparison rests on regrowth after damage.'),
q('Which poetic device is explicit in “I am like grass”?',['Simile','Irony','Pun','Alliteration only'],0,'The comparison uses “like”, a standard simile marker.'),
q('What is a major theme of the poem?',['Identity surviving destruction','School discipline','Family celebration','Seasonal weather only'],0,'The poem links destruction with the survival of identity and renewal.')
];

const challenge=[
q('Why is grass an effective symbol despite being easy to cut?',['Its power lies in its ability to regenerate','It is hard like metal','It never changes','It cannot be seen'],0,'The poem treats recovery after damage as the real strength.'),
q('What transformation occurs in the grass image?',['It grows from a small resilient plant into a vast jungle image','It changes into stone','It disappears into the sky','It becomes a building'],0,'The closing jungle expands the opening image.'),
q('How does the poem turn weakness into strength?',['Being cut becomes proof of the ability to return','Softness becomes violence','Silence becomes wealth','Rubble becomes a school'],0,'The apparent vulnerability of grass becomes the source of its resilience.'),
q('What is the function of destruction imagery?',['To create a powerful contrast with later renewal','To celebrate violence','To teach geography only','To describe gardening techniques'],0,'Bombing, rubble and ashes sharpen the impact of regrowth.'),
q('Why is identity central to the poem?',['Physical destruction cannot automatically destroy belonging or selfhood','Identity is shown as a road sign','Identity is a type of grass','Identity disappears with buildings'],0,'The speaker separates identity from visible structures.'),
q('How does time work in the poem?',['Time is the interval through which renewal becomes visible','Time stops after destruction','Time has no role','Time causes permanent decay only'],0,'“Two years ten years” frames recovery as a process.'),
q('What does the green mantle imply beyond literal grass?',['Nature can cover and heal a damaged landscape','A cloth factory will be built','The sky becomes green','Buildings become transparent'],0,'The phrase metaphorically represents broad renewal.'),
q('How do place names broaden the poem?',['They connect personal resilience with the fate of real landscapes and communities','They provide a list of tourist hotels','They teach spelling only','They introduce fictional characters'],0,'The named places widen the poem’s scope beyond the speaker.'),
q('What is the effect of repeating the grass comparison near the end?',['It closes the poem by confirming the central promise of return','It changes the speaker’s identity','It cancels the first stanza','It introduces a new season'],0,'The repetition reinforces the governing metaphor.'),
q('Which contrast is most important?',['Destruction versus regeneration','Summer versus winter','School versus home','City versus village'],0,'The poem is structured around loss followed by return.'),
q('How does nature act as a teacher in the poem?',['Grass demonstrates persistence through its natural growth cycle','Nature gives a literal classroom lesson','Trees teach grammar','Rain teaches arithmetic'],0,'The plant cycle becomes the model of resilience.'),
q('What is the most convincing reading of the future jungle?',['It represents recovery becoming greater and more visible than before','It represents permanent death','It rejects nature','It is only a weather report'],0,'The final image turns survival into expansion and renewal.'),
q('What does “obliterate” mean in context?',['Destroy completely','Repair carefully','Decorate beautifully','Measure accurately'],0,'The glossary gives the sense of wiping out or destroying.'),
q('Why is “bounce back” important to the poem’s tone?',['It makes recovery active and energetic rather than passive','It makes the poem comic only','It rejects hope','It describes a ball game'],0,'The phrase gives resilience a dynamic quality.'),
q('How does symbolism strengthen the poem?',['One simple natural image carries ideas of identity, hope and continuity','It removes all meaning from the poem','It limits the poem to botany','It turns every line into a fact'],0,'Grass becomes a compact symbol for several connected ideas.'),
q('Why can the poem be read as a poem of hope?',['It predicts return even after severe destruction','It says nothing will grow again','It ends only in ashes','It rejects recovery'],0,'The poem repeatedly looks beyond the present damage.'),
q('What does the phrase “only a matter of time” suggest?',['Recovery is delayed, not denied','Recovery is impossible','Time is irrelevant','Destruction is permanent'],0,'The phrase establishes patience and confidence in return.'),
q('What role does the green colour play in the poem?',['It visualises renewed life and growth','It symbolises darkness only','It describes rubble','It represents silence'],0,'Green is associated with the return of vegetation.'),
q('Why might the closing image attract tourists?',['The transformed landscape symbolises successful renewal and vitality','Tourists dislike nature','The jungle is empty','There is no change in the landscape'],0,'The tourist image demonstrates how complete the renewal becomes.'),
q('Which device best describes “green mantle”?',['Metaphor','Simile','Pun','Rhyme'],0,'The vegetation is imagined as a covering mantle.'),
q('Which device best describes “I am like grass”?',['Simile','Metaphor','Oxymoron','Irony'],0,'The comparison is explicitly signalled by “like”.'),
q('What is the relationship between individual and collective identity?',['The speaker’s survival grows into a wider vision of community and place','They are always unrelated','Only individual identity matters','Only geography matters'],0,'The poem expands from “I” to landscapes and communities.'),
q('How does the word “sprout” differ from simply “return”?',['It evokes organic growth and makes recovery vivid','It means to disappear','It removes the nature image','It refers to buildings'],0,'Sprout keeps the central botanical metaphor alive.'),
q('What is the poem’s strongest emotional movement?',['Suppression/destruction to confidence and renewal','Joy to fear only','Calm to comedy','Anger to silence without hope'],0,'The overall arc moves toward a confident future.'),
q('Which chapter extension asks learners to write on national integration?',['Composition','Dictionary Use','Grammar','Activity'],0,'The supplied composition section includes National Integration.')
];

const finalTest=[...practice.slice(0,10),...challenge.slice(0,10)];

function Learn({onMode,onBack}){
 return <div className="poem-shell">
  <button className="poem-exit" onClick={onBack}>← Exit Poetry</button>
  <div className="poem-hero"><span>THE PANORAMA • POETRY CHAPTER 7</span><h1>{poem.title}</h1><p>{poem.poet}</p><p>{poem.context}</p></div>
  <div className="poem-panel poem-context"><div><span className="poem-section-label">ABOUT THE POEM</span><h2>What to understand</h2><p>{poem.structure}</p></div><div className="poem-fact-grid"><div><b>Poet</b><span>{poem.poet}</span></div><div><b>Focus</b><span>Resilience • identity • recovery • nature</span></div></div></div>
  <div className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">SOURCE EXCERPTS</span><h2>Key lines to anchor the reading</h2></div><span>Brief source excerpts</span></div>{poem.sourceExcerpts.map(x=><div className="poem-exam-box" key={x}><p>{x}</p></div>)}</div>
  <div className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">STANZA-BY-STANZA</span><h2>Idea → simple explanation → vocabulary</h2></div><span>{poem.stanzas.length} movements</span></div><div className="poem-stanza-grid">{poem.stanzas.map(s=><article className="poem-stanza-card" key={s.title}><span className="poem-card-kicker">{s.range}</span><h3>{s.title}</h3><span className="poem-actual-label">SOURCE EXCERPT</span><div className="poem-actual-stanza"><div>{s.excerpt}</div></div><span className="poem-simple-label">SIMPLE EXPLANATION</span><p className="poem-stanza-explanation">{s.explanation}</p><div className="poem-vocab-block"><span className="poem-simple-label">VOCABULARY</span><div className="poem-word-grid">{s.vocab.map(([w,m])=><div key={w}><b>{w}</b><span>{m}</span></div>)}</div></div><div className="poem-stanza-key"><b>Exam focus:</b> {s.exam}</div></article>)}</div></div>
  <div className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">POETRY TOOLKIT</span><h2>Devices and meaning</h2></div></div><div className="poem-device-grid">{poem.devices.map(([d,e])=><article key={d}><b>{d}</b><p>{e}</p></article>)}</div></div>
  <div className="poem-panel poem-two-col"><div><span className="poem-section-label">WORDS TO KNOW</span><h2>Glossary</h2><div className="poem-word-grid">{poem.words.map(([w,m])=><div key={w}><b>{w}</b><span>{m}</span></div>)}</div></div><div><span className="poem-section-label">THEMES</span><h2>Core themes</h2><div className="poem-theme-list">{poem.themes.map(t=><span key={t}>{t}</span>)}</div></div></div>
  <div className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">TEXTBOOK PREPARATION</span><h2>Very brief + long-answer support</h2></div></div><div className="poem-answer-list">{poem.textbookAnswers.map(([q,a])=><article key={q}><b>{q}</b><p>{a}</p></article>)}</div><h2 style={{marginTop:20}}>Long Answers</h2><div className="poem-answer-list">{poem.longAnswers.map(([q,a])=><article key={q}><b>{q}</b><p>{a}</p></article>)}</div></div>
  <div className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">DISCUSSION • COMPOSITION</span><h2>Writing practice</h2></div></div>{poem.groupDiscussion.map(x=><div className="poem-exam-box" key={x}><b>GROUP DISCUSSION</b><p>{x}</p></div>)}{poem.composition.map(x=><div className="poem-exam-box" key={x}><b>COMPOSITION</b><p>{x}</p></div>)}</div>
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
