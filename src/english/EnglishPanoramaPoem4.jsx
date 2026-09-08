import React,{useState} from 'react';
import PanoramaTimedQuiz from './PanoramaTimedQuiz.jsx';
import './english-panorama-poetry.css';

const poem={
 title:'To Daffodils',poet:'Robert Herrick',book:'The Panorama • Poetry Chapter 4',
 sourceNote:'Built from the supplied Bihar Board Class 9 Panorama pages 102–105. The poem text, glossary, textbook questions, Word Study, Grammar, Activities and Translation prompts follow the supplied source pages.',
 context:'The poet looks at fair daffodils and compares their short flowering time with the short span of human life. The poem is reflective rather than purely sad: flowers and people both grow quickly, fade, and disappear.',
 structure:'Two ten-line stanzas. The first asks the daffodils to stay until the day has passed; the second uses the short spring of flowers to reflect on the short duration of human life.',
 stanzas:[
  {title:'Stanza 1 — The flowers pass quickly',range:'Lines 1–10',poemLines:['Fair Daffodils, we weep to see',"You haste away so soon;",'As yet the early-rising Sun',"Has not attain'd his noon.",'Stay, stay,','Until the hasting day','Has run','But to the even-song;',"And, having pray'd together, we",'Will go with you along.'],explanation:'कवि सुंदर डैफोडिल फूलों को जल्दी मुरझाते देखकर दुखी होता है। वह कहता है कि अभी सूरज भी दोपहर तक नहीं पहुँचा है, फिर भी फूलों का समय तेजी से बीत रहा है। वह चाहता है कि वे दिन के ढलने और evening prayer (even-song) तक ठहरें। अंत में कवि और डैफोडिल के समय के साथ-साथ आगे जाने की कल्पना करता है।',vocab:[['fair','सुंदर'],['daffodils','वसंत में खिलने वाला पीला फूल'],['haste away','शीघ्र/जल्दी चले जाना'],['attain’d','प्राप्त किया / पहुँचा'],['hasting','तेजी से बीतता हुआ'],['even-song','संध्या की प्रार्थना की सेवा']],exam:'मुख्य विचार: फूलों का अल्प जीवन, समय का तेजी से बीतना और उन्हें थोड़ी देर और देखने की इच्छा।',key:'Mood = भावुकता और क्षणभंगुरता | Focus = flowers + passing day'},
  {title:'Stanza 2 — Flowers and human life',range:'Lines 11–20',poemLines:['We have short time to stay, as you,','We have a short Spring;','As quick a growth to meet decay','As you, or any thing.','We die,','As your hours do, and dry','Away',"Like to the Summer's rain;",'Or as the pearls of morning’s dew,',"Ne'er to be found again."],explanation:'दूसरे stanza में कवि डैफोडिलों के छोटे जीवन की तुलना मनुष्य के छोटे जीवन से करता है। फूलों की तरह मनुष्य के पास भी थोड़े समय के लिए जीवन और अपना “Spring” है। तेजी से विकास के बाद decay आता है। कवि मृत्यु और नश्वरता को गर्मियों की वर्षा तथा सुबह की ओस की बूंदों के मिट जाने से समझाता है।',vocab:[['short Spring','जीवन/यौवन का छोटा समय'],['growth','विकास'],['decay','सड़ना / नष्ट होना'],['dry away','सूखकर समाप्त हो जाना'],['Summer’s rain','गर्मियों की वर्षा'],['pearls of morning’s dew','सुबह की ओस की मोती जैसी बूंदें'],['ne’er','never / फिर कभी नहीं']],exam:'मुख्य विचार: मानव जीवन और फूलों का जीवन दोनों अल्पकालिक हैं; वृद्धि के बाद decay और अंत आता है।',key:'Comparison = flowers ↔ human life | Message = life is brief and passing'}
 ],
 words:[['daffodil','वसंत में खिलने वाला पीला trumpet-shaped फूल'],['fair','beautiful / सुंदर'],['haste away','जल्दी चले जाना'],['attain’d','gained / reached'],['even-song','संध्या की प्रार्थना की सेवा'],['decay','rot / decompose; नष्ट होना'],['ne’er','never / कभी नहीं'],['dew','रात/सुबह सतह पर बनने वाली जल-बूंद']],
 devices:[['Personification','डैफोडिलों को सीधे संबोधित किया गया है और उनसे रुकने की विनती की गई है।'],['Simile','मानव जीवन और फूलों के जीवन की तुलना “Like to the Summer’s rain” तथा सुबह की ओस से की गई है।'],['Imagery','सुबह की धूप, गर्मियों की बारिश और मोती जैसी ओस की दृश्य छवियाँ बनती हैं।'],['Repetition','“Stay, stay” फूलों को रोकने की तीव्र इच्छा को उभारता है।'],['Contrast','खूबसूरत फूलों की ताजगी के सामने उनका जल्दी समाप्त होना और decay रखा गया है।'],['Symbolism','Spring जीवन/यौवन की अवधि का और flowers मनुष्य की नश्वरता का प्रतीक बनते हैं।']],
 themes:['transience of life','beauty and decay','human mortality','nature and time','fleeting youth','reflection on death'],
 textbookAnswers:[['To whom does the speaker address the poem?','The speaker addresses the fair daffodils.'],['Why does the speaker weep to see the daffodils?','He is sad because the daffodils pass away so quickly.'],['What does the speaker want the daffodils to do?','He wants them to stay a little longer, until the day has reached the evening prayer.'],['What time of day does the speaker say it is?','It is still before noon because the early-rising Sun has not attained his noon.'],['Name three things that “die away”.','The poem mentions the daffodils/flowers, human hours and the temporary images of summer rain and morning dew; the central idea is that all these pass away.'],['Why does the speaker repeat the word “stay”?','The repetition shows his strong emotional wish that the beautiful flowers should remain longer.'],['What does the summer’s rain symbolise?','It symbolises something brief and quickly disappearing, like human life.'],['Why is the title suggestive and evocative?','The title names the flowers that trigger the poet’s reflection on beauty, time and mortality.'],['How has human life been compared to the life of daffodils?','Both have a short period of growth and a short time to remain before decline and disappearance.'],['Who are “we”? What do “we” and the daffodils have in common?','“We” refers to human beings/the poet and people like him. Both humans and daffodils have a brief span of growth and life.']],
 wordStudy:[
  {title:'Ex. 1 — Phrasal verbs with “away”',text:'Use the given expressions meaningfully: run away, take away, give away, put away, fade away. The textbook model sentence is “The Headmaster gave away prizes to the students.”'},
  {title:'Ex. 2 — Present participle + Noun',text:'Examples in the book include rising sun and hasting day. Present participle + noun can work as an adjective phrase. Fill with: rolling, rising, crying, running, sleeping.'},
  {title:'Ex. 3 — Match the words',text:'hasting → leaving the place hastily; attained → gained/accomplished; spring → the season between winter and summer; decay → rot/decompose; dry → free from moisture; dew → condensed water vapour.'},
  {title:'Ex. 4 — Correct the spelling',text:'Correct these source forms: hesting → hasting; decey → decay; due → dew; grouth → growth; sumer → summer.'}
 ],
 grammar:[
  {title:'Sub + Verb + Infinitive',text:'Source pattern: “He wants to sleep.” / “We eat to live.” Make more sentences on the same pattern.'},
  {title:'“as” as a conjunction',text:'The book gives “Do as you like.” and “Do as I do.” Make five more sentences using “as” in the same manner.'},
  {title:'Prepositions',text:'Fill blanks using until, with, from, to, on, of, in, along. The source exercise covers time, place and relation through these prepositions.'}
 ],
 activities:['Find the kinds of flowers in your locality, write their names and draw their pictures with named parts.','Plan how you will prepare your school garden if you want to grow flowers there.'],
 translation:'Translate the poem into Hindi or any other language that you know.'
};

const q=(question,options,answer,explanation)=>({q:question,o:options,a:answer,e:explanation});
const practice=[
 q('Who wrote “To Daffodils”?',['Robert Herrick','William Shakespeare','John Milton','Robert Frost'],0,'The source page identifies Robert Herrick as the poet.'),
 q('To whom does the speaker address the poem?',['The fair daffodils','The early-rising Sun','A school teacher','The summer rain'],0,'The poem directly addresses the fair daffodils.'),
 q('Why does the speaker weep to see the daffodils?',['They go away very soon','They are not beautiful','They bloom only at noon','They grow in winter'],0,'The speaker is sad because their flowering life is brief.'),
 q('What does “haste away” mean?',['Leave quickly','Sleep peacefully','Grow slowly','Shine brightly'],0,'The glossary explains haste away as leaving hastily, quickly or hurriedly.'),
 q('What has not yet attained noon?',['The early-rising Sun','The moon','The summer rain','The evening-song'],0,'The speaker says the early-rising Sun has not attained his noon.'),
 q('What does the speaker ask the flowers to do?',['Stay for a little longer','Change their colour','Move to another garden','Wait until spring'],0,'“Stay, stay” expresses his wish that the flowers remain.'),
 q('What is “even-song”?',['An evening prayer service','A morning race','A flower festival','A summer shower'],0,'The glossary defines even-song as an evening prayer service in the Church of England.'),
 q('What does “attain’d” mean?',['Reached or gained','Forgotten','Dried out','Hidden'],0,'Attain’d means gained or reached.'),
 q('What does the second stanza mainly compare?',['Human life with the life of flowers','Winter with summer','Rain with sunlight','A garden with a school'],0,'The second stanza explicitly compares the short life of humans and daffodils.'),
 q('What does “We have a short Spring” suggest?',['Human life or youth is short','Spring lasts forever','People never change','Flowers do not grow'],0,'Spring is used as an image for a short period of life or youth.'),
 q('What does “decay” mean?',['Rot or decompose','Become brighter','Travel away','Bloom again'],0,'The glossary gives decay as rot or decompose.'),
 q('What are the pearls of morning’s dew?',['Small drops of water like pearls','Daffodil petals','Summer clouds','Evening prayers'],0,'Dew consists of small water drops and is described poetically as pearls.'),
 q('What does “ne’er” mean?',['Never','Early','Together','Slowly'],0,'Ne’er is a poetic shortened form of never.'),
 q('What is the central idea of “To Daffodils”?',['Life and beauty are brief','Flowers are dangerous','Rain destroys gardens','Spring never ends'],0,'The poem uses flowers to reflect on the short duration of life.'),
 q('Which mood best fits the poem?',['Reflective and slightly sorrowful','Comic and noisy','Angry and violent','Purely celebratory'],0,'The poem is reflective and marked by sadness at passing beauty and life.')
];

const challenge=[
 q('Why is the title “To Daffodils” suggestive?',['The flowers lead the poet into a reflection on time and mortality','It promises a gardening manual','It describes the weather only','It names a historical battle'],0,'The daffodils are the immediate subject and the starting point for the larger reflection.'),
 q('What is implied by the Sun not having attained noon?',['The day is still early, yet the flowers are already passing','Night has already begun','Winter has returned','The flowers bloom at midnight'],0,'The speaker finds their disappearance early and therefore especially poignant.'),
 q('What does “Stay, stay” express most strongly?',['A desperate wish to prolong beauty','A command to the Sun','A warning about rain','A description of decay'],0,'Repetition intensifies the speaker’s emotional appeal to the flowers.'),
 q('Why does the poet say he and the flowers will “go … along”?',['Human time and the flowers’ time are imagined as sharing a common passing journey','He is literally carrying the flowers home','The flowers become people','The Sun guides them to a garden'],0,'The phrase connects the poet’s life with the temporary life of the flowers.'),
 q('How does the second stanza deepen the first?',['It moves from the flowers’ short life to the brevity of human life','It changes from poetry to a weather report','It introduces a new speaker who dislikes spring','It stops discussing time'],0,'The poem broadens its reflection from daffodils to human mortality.'),
 q('What does “a short Spring” most naturally symbolise?',['A short period of youth or flourishing life','A long winter season','A school holiday','A permanent state of happiness'],0,'Spring stands for the brief flourishing stage of life.'),
 q('What is the force of “As quick a growth to meet decay”?',['Growth and decline can follow one another rapidly','Growth prevents decay forever','Decay occurs before growth','Flowers never grow quickly'],0,'The line joins rapid growth with equally certain decline.'),
 q('Why are summer rain and morning dew effective images?',['They appear briefly and then disappear','They are examples of permanent things','They are difficult to see in all seasons','They are larger than flowers'],0,'Both images emphasise transience.'),
 q('What does the comparison with dew suggest about life?',['Life may be beautiful but is temporary and easily lost','Life is heavy like stone','Life becomes stronger with age','Life never changes'],0,'Morning dew is beautiful and delicate but does not last.'),
 q('Which statement best captures the poem’s philosophy?',['Beauty and life should be understood as fleeting','Only flowers die','People can stop time','Spring defeats death'],0,'The poem reflects on the unavoidable passing of beauty and life.'),
 q('What poetic device is central in directly speaking to the daffodils?',['Personification','Pun','Onomatopoeia','Irony'],0,'The flowers are addressed as if they can hear and respond.'),
 q('Which line most clearly shows repetition?',['“Stay, stay,”','“We have a short Spring;”','“We die,”','“Ne’er to be found again.”'],0,'“Stay, stay” repeats the same word for emotional emphasis.'),
 q('Which image is visual and delicate?',['The pearls of morning’s dew','The school garden plan','The evening class','The glossary definition'],0,'Morning dew is presented as pearl-like visual imagery.'),
 q('How does the word “fair” affect the opening?',['It highlights the beauty that makes the coming loss painful','It suggests the flowers are weak','It tells us the weather is fair','It proves the flowers are permanent'],0,'Their beauty makes their short duration more emotionally significant.'),
 q('What does the glossary’s meaning of “dew” add to understanding?',['It explains that dew is formed as small drops of water on outdoor surfaces','It defines dew as rainfall in summer','It says dew is a flower','It says dew is evening prayer'],0,'The glossary gives the physical meaning of dew as small water drops.'),
 q('Why is “decay” an important word in the poem?',['It names the movement from growth toward decline','It means celebration','It means the beginning of spring','It describes prayer'],0,'Decay is the necessary opposite stage to the rapid growth discussed by the poet.'),
 q('What does the phrase “short time to stay” reinforce?',['The limited duration available to both flowers and people','That the flowers are waiting for a train','That winter lasts only one hour','That the poet wants to travel'],0,'The phrase introduces the central idea of limited time.'),
 q('How is human life compared to the daffodils?',['Both grow quickly and then pass away','Humans live forever while flowers do not','Humans are more beautiful than flowers','Flowers have no growth period'],0,'The second stanza directly aligns the two life cycles.'),
 q('What kind of contrast appears throughout the poem?',['Beauty and brevity','School and examination','Rain and fire','Day and geography'],0,'The lovely flowers are presented alongside their quick disappearance.'),
 q('Why is the rain comparison philosophically effective?',['Rain is visible for a short time and then is gone, like life','Rain is permanent','Rain grows flowers forever','Rain cannot be seen'],0,'Its short-lived nature reinforces the poem’s meditation on transience.'),
 q('What is the likely meaning of “we” in “having pray’d together, we”?',['The speaker and companions, imagined alongside the flowers','Only the flowers','Only the Sun','The glossary writers'],0,'The line uses “we” for the human speaker and companions, linking their time with the flowers.'),
 q('What is the effect of the evening-song reference?',['It marks the passing of the day and gives a natural time limit','It changes the poem into a prayer book','It makes the flowers immortal','It begins a new season'],0,'Even-song supplies a concrete point in the day up to which the speaker wants the flowers to stay.'),
 q('Which word from the poem most directly means “never again”?',['Ne’er','Fair','Hasting','Attain’d'],0,'Ne’er means never, not ever.'),
 q('Which theme connects the two stanzas most clearly?',['The passage of time','School discipline','Travel by road','Flower classification'],0,'Both stanzas are controlled by the idea that time passes quickly.'),
 q('What is the final effect of “Ne’er to be found again”?',['It gives the ending a strong sense of finality and loss','It promises that the flowers will return tomorrow','It makes the speaker comic','It changes the poem into a celebration'],0,'The phrase stresses disappearance that cannot be reversed.')
];

const finalTest=[...practice.slice(0,10),...challenge.slice(0,10)];

function Learn({onMode}){
 const modes=[['practice','Practice'],['challenge','Challenge'],['test','Final Test']];
 return <div className="poem-shell">
  <button className="poem-exit" onClick={()=>onMode(null)}>← Exit Poetry</button>
  <div className="poem-hero"><span>{poem.book}</span><h1>{poem.title}</h1><p>Robert Herrick • A reflective poem on flowers, time and the brevity of life.</p></div>
  <div className="poem-panel poem-context"><div><span className="poem-section-label">ABOUT THE POEM</span><h2>Context &amp; Structure</h2><p>{poem.context}</p><p>{poem.structure}</p></div><div className="poem-fact-grid"><div><b>Poet</b><span>{poem.poet}</span></div><div><b>Source</b><span>{poem.sourceNote}</span></div><div><b>Form</b><span>Two ten-line stanzas</span></div></div></div>

  <section className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">STANZA-BY-STANZA</span><h2>Actual stanza → simple explanation → vocabulary</h2></div><span>{poem.stanzas.length} stanzas</span></div><div className="poem-stanza-grid">{poem.stanzas.map(stanza=><article className="poem-stanza-card" key={stanza.range}><div className="poem-card-kicker">{stanza.range}</div><h3>{stanza.title}</h3><span className="poem-actual-label">ACTUAL STANZA</span><div className="poem-actual-stanza"><div>{stanza.poemLines.map((line,i)=><div key={i}>{line}</div>)}</div></div><span className="poem-simple-label">SIMPLE EXPLANATION</span><p className="poem-stanza-explanation">{stanza.explanation}</p><div className="poem-vocab-block"><span className="poem-simple-label">VOCABULARY</span><div className="poem-word-grid">{stanza.vocab.map(([w,m])=><div key={w}><b>{w}</b><span>{m}</span></div>)}</div></div><div className="poem-stanza-key"><b>Exam lens:</b> {stanza.exam}<br/><b>Key:</b> {stanza.key}</div></article>)}</div></section>

  <section className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">POETRY TOOLKIT</span><h2>POETIC DEVICES</h2></div></div><div className="poem-device-grid">{poem.devices.map(([name,detail])=><article key={name}><b>{name}</b><p>{detail}</p></article>)}</div></section>

  <section className="poem-panel"><div className="poem-two-col"><div><span className="poem-section-label">WORDS TO KNOW</span><h2>Quick vocabulary</h2><div className="poem-word-grid">{poem.words.map(([w,m])=><div key={w}><b>{w}</b><span>{m}</span></div>)}</div></div><div><span className="poem-section-label">THEMES</span><h2>What to remember</h2><div className="poem-theme-list">{poem.themes.map(t=><span key={t}>{t}</span>)}</div><div className="poem-exam-box"><b>Central message</b><p>The poem uses the short life of daffodils to make us reflect on the shortness of human life and the passing of beauty.</p></div></div></div></section>

  <section className="poem-panel"><span className="poem-section-label">TEXTBOOK QUICK ANSWERS</span><h2>Important book questions</h2><div className="poem-answer-list">{poem.textbookAnswers.map(([question,answer],i)=><article key={i}><b>{i+1}. {question}</b><p>{answer}</p></article>)}</div></section>

  <section className="poem-panel"><span className="poem-section-label">WORD STUDY</span><h2>Book exercises</h2><div className="poem-tool-grid">{poem.wordStudy.map(item=><article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>

  <section className="poem-panel"><span className="poem-section-label">GRAMMAR</span><h2>Book grammar focus</h2><div className="poem-tool-grid">{poem.grammar.map(item=><article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>

  <section className="poem-panel"><span className="poem-section-label">ACTIVITIES</span><h2>Think &amp; do</h2><div className="poem-answer-list">{poem.activities.map((item,i)=><article key={i}><b>{i+1}. {item}</b></article>)}</div><div className="poem-exam-box"><b>TRANSLATION</b><p>{poem.translation}</p></div></section>

  <div className="poem-modebar"><div><span className="poem-section-label">ASSESSMENT</span><h2>Test what you learned</h2><p>15 Practice • 25 Challenge • 20-question Final Test • timed shared engine</p></div><div className="poem-mode-buttons">{modes.map(([mode,label])=><button className={mode==='test'?'primary':''} key={mode} onClick={()=>onMode(mode)}>{label} →</button>)}</div></div>
 </div>;
}

export function EnglishPanoramaPoem4({initialMode='learn',onBack,addXp,finishSession}){
 const [mode,setMode]=useState(initialMode);
 if(mode) return <PanoramaTimedQuiz mode={mode} title={poem.title} bank={mode==='practice'?practice:mode==='challenge'?challenge:finalTest} onBack={()=>setMode('learn')} addXp={addXp} finishSession={finishSession}/>;
 return <Learn onMode={value=>value?setMode(value):onBack}/>;
}
