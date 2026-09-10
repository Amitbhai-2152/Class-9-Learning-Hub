import React,{useMemo,useState,useEffect}from'react';
import EnglishTimedQuiz from './EnglishTimedQuiz.jsx';
import './EnglishParagraphEssayTopic.css';

const LESSONS=[
['01','What is a paragraph?','A paragraph is a focused group of sentences developing one central idea. In an exam answer, every sentence should contribute to the same topic.'],
['02','What is an essay?','An essay develops a broader topic through an introduction, logically organised body paragraphs and a purposeful conclusion.'],
['03','Topic + controlling idea','The topic tells what you are writing about; the controlling idea tells the specific point you will develop. Example: “Trees in our town” is a topic, while “Trees improve health and the local environment” gives a controlling direction.'],
['04','Topic sentence','A strong paragraph commonly begins with a topic sentence that signals its main idea. Avoid opening with an unrelated fact or a conclusion before the reader knows the subject.'],
['05','Supporting sentences','Support the main idea with explanations, reasons, facts, examples, comparisons or relevant details. Strong support answers questions such as how, why, when, where or with what effect.'],
['06','Unity','Unity means every sentence serves the same central idea. Remove attractive but unrelated facts instead of forcing them into the paragraph.'],
['07','Coherence','Coherence means ideas connect in a logical sequence. Use clear sentence order, pronouns and suitable connectors so the reader can follow the thought without guessing.'],
['08','Cohesive devices','Use connectors according to meaning: first/next for sequence, because/since for reason, however for contrast, therefore/thus for result, for example for illustration and finally/in conclusion for closure.'],
['09','Paragraph development patterns','Common patterns include description, narration, cause–effect, problem–solution, comparison and argument. Choose the pattern that fits the task rather than using the same structure every time.'],
['10','Writing an introduction','An effective essay introduction establishes the topic, gives context when needed and states the direction or central position. Do not waste the opening on dictionary definitions unless they help the task.'],
['11','Body paragraph control','One body paragraph should usually have one main function. Begin with its controlling sentence, develop it with evidence or explanation and connect it back to the essay topic.'],
['12','Examples and evidence','Examples should clarify the point, not replace reasoning. Prefer specific, relevant illustrations over invented statistics or exaggerated claims.'],
['13','Argument writing','For an opinion or argument, state a clear position, give reasons, support those reasons and address an important counterpoint when appropriate. Keep the tone respectful and evidence-focused.'],
['14','Cause and effect','Distinguish cause from effect. Useful signals include because, due to, since and as a result. Do not assume that two events occurring together automatically prove causation.'],
['15','Problem–solution writing','State the problem clearly, explain why it matters, propose practical solutions and show how those solutions address the causes or effects.'],
['16','Conclusion writing','A conclusion should synthesise the developed idea and provide closure. It may restate the central position in fresh words, summarise the main insight or end with a relevant implication.'],
['17','Language and editing','Prefer precise vocabulary, complete sentences and consistent tense. Check articles, subject–verb agreement, punctuation, spelling, repetition and sentence boundaries.'],
['18','Length, layout and exam audit','Follow the task’s expected length. Use readable paragraphs, a clear title when requested and a logical beginning–middle–end structure. Final audit: task → purpose → unity → coherence → support → grammar → spelling → punctuation → conclusion.']
];

const EXAMPLES=[
['Topic','Importance of Reading','Use a clear central idea: “Regular reading improves vocabulary, knowledge and concentration.”'],
['Topic','Cleanliness in School','Narrow the focus: “A clean school creates a healthier and more pleasant learning environment.”'],
['Opening','Trees and Our Future','“Trees are not merely part of the landscape; they are essential to a healthy future.”'],
['Support','Why trees matter','“They provide shade, absorb carbon dioxide and create habitats for living organisms.”'],
['Connector','Cause → result','“The road was flooded; therefore, the buses were delayed.”'],
['Connector','Contrast','“Online learning is convenient; however, it cannot always replace direct classroom interaction.”'],
['Conclusion','Saving Water','“Therefore, careful use of water is not a small personal habit but a shared responsibility.”'],
['Argument','School Library','“A well-used library supports independent learning because students can explore material beyond the textbook.”'],
['Problem–solution','Plastic waste','“Schools can reduce plastic waste by encouraging reusable bottles and organising regular awareness drives.”'],
['Descriptive paragraph','A Morning Walk','“The early road was quiet, the air felt fresh and the trees were alive with birdsong.”']
];

const TRAPS=[
'One paragraph should not drift into several unrelated ideas.',
'Do not use connectors merely for decoration; the connector must match the relationship between ideas.',
'A long sentence is not automatically a good sentence. Split overloaded ideas when clarity suffers.',
'Do not invent precise statistics just to make an essay sound impressive.',
'A conclusion should close the discussion, not introduce a completely new major argument.',
'Repetition of the same sentence or idea does not count as development.',
'Keep the requested purpose and audience in mind: a school essay is not written like a text message.',
'Check word choice, tense, articles, agreement, punctuation and spelling after the ideas are organised.'
];

const WRITING_TASKS=[
'Write a 100–120 word paragraph on “The Value of Time”.',
'Write a 120–150 word paragraph on “A Responsible Student”.',
'Write an essay on “Clean and Green School”.',
'Write an argumentative essay on “Should students have limited homework on weekends?”',
'Write a cause-and-effect essay on “How excessive screen time can affect study habits”.',
'Write a problem–solution essay on “Reducing plastic waste in the local community”.',
'Write a descriptive paragraph on “A Rainy Morning”.',
'Write a narrative paragraph beginning with: “When the electricity went out, the whole classroom became silent…”'
];

const BANKS={
practice:[
['The best opening for a focused paragraph usually gives…',['the main idea','a random fact','a signature','a new unrelated topic'],0,'The opening should orient the reader toward the paragraph’s central idea.'],
['Supporting sentences should mainly…',['develop the main idea','change the subject','repeat the title','end the paragraph immediately'],0,'Support explains, illustrates or strengthens the main idea.'],
['Unity means…',['all sentences serve the same central idea','all sentences have the same length','every sentence is a question','the paragraph has no examples'],0,'Unity keeps the paragraph focused.'],
['Coherence mainly concerns…',['logical connection and flow of ideas','handwriting size','number of quotations','page decoration'],0,'Coherence lets the reader follow ideas in a sensible sequence.'],
['“However” normally signals…',['contrast','result','sequence','example'],0,'However introduces a contrast or qualification.'],
['“Therefore” normally signals…',['result or conclusion','place','description','permission'],0,'Therefore signals a result or conclusion.'],
['Which detail best supports a paragraph about reading?',['Regular reading can build vocabulary.','My shoes are blue.','The classroom has four windows.','I ate lunch at noon.'],0,'The detail directly supports the topic of reading.'],
['A good conclusion should usually…',['close the developed idea','start an unrelated topic','repeat every sentence word for word','remove the main idea'],0,'A conclusion gives purposeful closure.'],
['Which is the best essay order?',['Introduction → Body → Conclusion','Conclusion → Title → Introduction','Examples → Signature → Introduction','Body → Random facts → Conclusion'],0,'This is the standard broad structure for a school essay.'],
['A problem–solution paragraph should first make the…',['problem clear','signature decorative','title very long','conclusion unrelated'],0,'The reader needs to understand the problem before evaluating solutions.'],
['A useful final editing check includes…',['grammar, spelling and punctuation','only handwriting','only word count','only the title'],0,'Editing should check accuracy as well as content and organisation.'],
['An example in an essay should be…',['relevant to the point it supports','as unrelated as possible','invented as a precise statistic','a replacement for every explanation'],0,'Examples are useful when they directly clarify the point.']
],
challenge:[
['Which topic sentence gives the clearest controlling idea for “School Garden”?',['A school garden can make learning practical and improve the campus environment.','Our school is located near a road.','Gardens are found in many countries.','I like green colour.'],0,'It states both the topic and the specific direction to be developed.'],
['Choose the best connector: “The road was flooded; ___, buses were delayed.”',['therefore','however','for example','first'],0,'A delayed bus is a result of flooding, so therefore fits.'],
['Which sentence breaks unity in a paragraph about saving water?',['Turning off taps while brushing reduces waste.','Fixing leaking taps saves water.','Rainwater can be collected for some uses.','My favourite sport is cricket.'],3,'The cricket sentence does not develop the water-saving idea.'],
['Which pair has the strongest logical relationship?',['It rained heavily; as a result, the match was cancelled.','It rained heavily; however, therefore the match was cancelled.','It rained heavily; for example, the match was cancelled.','It rained heavily; first, the match was cancelled.'],0,'The second clause is a result, so as a result expresses the relationship clearly.'],
['Which introduction is strongest for an essay on “Value of Time”?',['Time is a resource everyone receives equally, so using it wisely affects study, work and personal growth.','Time is a word in the dictionary.','I will now write an essay.','Yesterday was Monday.'],0,'It gives context and a clear controlling direction.'],
['Which evidence is most responsible in an argumentative school essay?',['a relevant real-life example','an invented exact national percentage','an unrelated personal insult','a claim with no connection to the topic'],0,'A relevant example supports reasoning without pretending to provide unsupported precision.'],
['Which sentence best develops a problem–solution essay on plastic waste?',['Schools can reduce single-use plastic by providing refill stations and encouraging reusable bottles.','Plastic is a word with seven letters.','My friend likes blue bags.','The weather was warm yesterday.'],0,'It proposes a practical solution linked directly to the stated problem.'],
['Which revision improves coherence?',['First, we identify the problem. Next, we consider possible solutions. Finally, we choose the most practical one.','Problem. Solution. Things. Good.','The first sentence is long and the last is unrelated.','Add three unrelated quotations.'],0,'Explicit sequencing helps the reader track the argument.'],
['Which conclusion is most effective for an essay on school cleanliness?',['Therefore, maintaining cleanliness is a daily responsibility shared by students, staff and the wider school community.','Cleanliness was discussed in the introduction.','Now I will begin another topic about sports.','This essay has five paragraphs because I said so.'],0,'It synthesises the main idea and gives a clear sense of closure.'],
['A paragraph is 160 words long but the task asks for about 100–120 words. The best response is to…',['remove repetition and less relevant details while preserving the central idea','add more examples','delete the topic sentence','ignore the instruction'],0,'Editing for relevance and concision keeps the task focused.'],
['Which sequence best develops cause and effect?',['Cause → explanation → effects → implication','Conclusion → unrelated story → cause','Example → signature → effect','Effect → title only → unrelated fact'],0,'The sequence makes the causal relationship explicit and understandable.'],
['Which sentence shows the strongest academic control?',['Although online learning is convenient, students still need structured guidance to maintain focus.','Online learning is sooo good!!!','Online learning is good. Good. Good.','Online learning, you know, like, whatever.'],0,'It is precise, balanced and appropriately formal.'],
['Which paragraph plan best fits comparison?',['Point A → Point B → key similarity/difference → judgement','Random facts about A → conclusion → new topic','Only one side → unrelated story','Title → examples without comparison'],0,'Comparison needs clearly paired features and an overall judgement or synthesis.'],
['What is the best reason to revise a first draft?',['to improve meaning, organisation and correctness','to make it longer at any cost','to add difficult words everywhere','to replace every simple sentence with a long one'],0,'Revision improves the quality of the communication, not merely its length.'],
['Which statement best reflects advanced exam control?',['Follow task, audience and purpose while maintaining unity, coherence, support and accurate language.','Use as many connectors as possible.','Write the longest answer possible.','Memorise one essay and use it for every topic.'],0,'Strong writing is task-specific, organised and accurate.']
],
test:[
['A paragraph about “Morning Exercise” begins with “Exercise keeps us healthy” and then explains physical, mental and routine benefits. The first sentence is the…',['topic sentence','signature','conclusion','counterpoint'],0,'It states the central idea developed by the supporting sentences.'],
['Which sentence is irrelevant in a paragraph about reducing electricity use at home?',['Switch off lights when leaving a room.','Use energy-efficient appliances where practical.','My cousin won a drawing competition.','Unplug devices that need not remain on.'],2,'The drawing competition does not support electricity conservation.'],
['Choose the best completion: “The library was closed; ___, we studied in the classroom.”',['therefore','however','for example','firstly'],0,'The second action follows as a consequence of the first situation.'],
['Which sentence uses a connector incorrectly?',['It was raining; however, we stayed indoors.','The plan was expensive; therefore, we revised it.','She practised daily; as a result, her fluency improved.','He missed the bus; for example, he reached late.'],3,'For example introduces an illustration, not a cause-and-result relationship.'],
['Which topic sentence is most precise for a paragraph on a school library?',['A well-managed school library supports independent learning by giving students access to varied resources.','Libraries are places.','I once visited a library.','Books are interesting.'],0,'It states a focused claim that the paragraph can develop.'],
['A conclusion that introduces a major new argument is weak mainly because it…',['fails to provide proper closure to the developed discussion','uses too many commas','has a title','contains a verb'],0,'Major new material belongs in the body, not as an unexpected final point.'],
['Which is the strongest support for “public transport can reduce traffic”?',['When more commuters share buses or trains, fewer individual vehicles may be needed on busy routes.','Public transport is two words.','My favourite bus is green.','Traffic is a word used in cities.'],0,'The sentence explains a mechanism connecting transport use to traffic reduction.'],
['Which essay structure best fits an opinion essay?',['Position in introduction → reasons/evidence → response to an important counterpoint → conclusion','Three unrelated examples → signature → title','Conclusion first → random facts → no position','Only questions without an argument'],0,'The structure develops and supports an identifiable position.'],
['Which is the best edit? “Because the road was blocked. We arrived late.”',['Because the road was blocked, we arrived late.','Because the road was blocked, and. We arrived late.','Because road blocked we late.','Because the road was blocked.'],0,'The dependent clause must be connected to the main clause.'],
['In a problem–solution essay, the solution is strongest when it…',['addresses the stated problem and explains how it can help','sounds impressive but is impossible','changes the topic','only repeats the problem'],0,'A solution should be relevant and linked to the problem.'],
['Which sentence best maintains formal school-writing tone?',['Students should evaluate information carefully before accepting claims found online.','Kids should totally believe whatever they see online.','Online stuff is kinda crazy.','Just trust the internet, bro.'],0,'It is clear, neutral and appropriately formal.'],
['What should an editor do first when a paragraph contains repetition?',['identify repeated ideas and keep the clearest version','add another repeated sentence','delete every supporting detail','change all verbs to future tense'],0,'Editing starts by identifying redundancy and preserving the strongest expression.'],
['Which transition best completes a sequence? “First, collect the information. Next, organise it. ___, write the final draft.”',['Finally','However','Because','For example'],0,'Finally marks the last step in a sequence.'],
['Which statement about examples is correct?',['Examples should be specific and relevant to the point they illustrate.','Examples should always be invented statistics.','Examples should replace the main idea.','Examples must introduce unrelated topics.'],0,'Relevant examples make an explanation clearer and more convincing.'],
['Which plan best fits a descriptive paragraph about a market?',['overall scene → notable sights/sounds → specific details → closing impression','argument → counterargument → statistics → signature','unrelated memories → conclusion → definition','only a list of objects'],0,'A descriptive paragraph moves from the broad scene to vivid, relevant details.'],
['Which plan best fits a narrative paragraph?',['setting → sequence of events → turning point → outcome/reflection','topic sentence → random facts → statistics','definition → counterclaim → evidence','title → unrelated description → signature'],0,'Narrative writing depends on a clear event sequence and outcome.'],
['Which sentence demonstrates cause rather than mere sequence?',['Heavy rain caused water to collect on the road, slowing traffic.','It rained and the road was wet.','The road was wet, and I wore blue shoes.','Rain exists in many places.'],0,'It explicitly states the causal relationship.'],
['Which is the most effective final audit question?',['Does every part answer the task and communicate the intended idea clearly and accurately?','Did I use the hardest words I know?','Is my essay the longest in the class?','Did I add at least ten connectors?'],0,'The final audit should check task fulfilment, clarity and accuracy.'],
['A 120-word paragraph has excellent ideas but many comma splices and spelling errors. The best judgement is…',['Content is strong, but language accuracy needs revision before submission.','It is perfect because the ideas are good.','It should be made twice as long.','Grammar does not matter in writing tasks.'],0,'Exam-quality writing requires both ideas and accurate expression.'],
['Which overall formula best represents strong paragraph/essay writing?',['Purpose + clear idea + organised development + relevant support + controlled language + closure','Length + difficult vocabulary + many connectors','Title + repeated idea + no conclusion','Memorised text + unrelated examples'],0,'Strong writing combines purpose, organisation, development and language control.']
]};

const rotate=(questions,mode)=>{const shift=mode==='challenge'?1:mode==='test'?2:0;return questions.map((item,i)=>{const[q,opts,a,e]=item;const next=[...opts];const move=(a+shift+i)%next.length;const correct=next[a];next.splice(a,1);next.splice(move,0,correct);return[q,next,move,e]})};
const readMode=()=>{if(typeof window==='undefined')return'practice';const m=new URLSearchParams(window.location.search).get('mode');return['practice','challenge','test'].includes(m)?m:'practice'};

export default function EnglishParagraphEssayTopic({onBack=()=>{},addXp=()=>{},finishSession=()=>{}}){
 const [mode,setMode]=useState(readMode);const [lesson,setLesson]=useState(0);const [section,setSection]=useState('learn');
 useEffect(()=>{const sync=()=>{setMode(readMode());const p=new URLSearchParams(window.location.search);if(p.get('mode'))setSection('assessment')};window.addEventListener('popstate',sync);sync();return()=>window.removeEventListener('popstate',sync)},[]);
 const bank=useMemo(()=>rotate(BANKS[mode]||BANKS.practice,mode),[mode]);
 const changeMode=m=>{const p=new URLSearchParams(window.location.search);p.set('subject','english');p.set('languageSkills','1');p.set('topic','paragraph-essay');p.set('mode',m);window.history.pushState({},'',`${window.location.pathname}?${p}`);window.dispatchEvent(new PopStateEvent('popstate'));setSection('assessment')};
 const learn=()=>{const p=new URLSearchParams(window.location.search);p.set('subject','english');p.set('languageSkills','1');p.set('topic','paragraph-essay');p.delete('mode');window.history.pushState({},'',`${window.location.pathname}?${p}`);window.dispatchEvent(new PopStateEvent('popstate'));setSection('learn')};
 const next=()=>{if(mode==='practice')changeMode('challenge');else if(mode==='challenge')changeMode('test');else changeMode('practice')};
 if(section==='assessment')return <EnglishTimedQuiz title="Paragraph / Essay" mode={mode} getBank={()=>bank} onModeChange={changeMode} onBack={learn} addXp={addXp} finishSession={finishSession} onNextLevel={next} secondsPerQuestion={mode==='test'?55:50}/>;
 const [num,title,body]=LESSONS[lesson];
 return <main className="pe-topic"><header className="pe-hero"><button type="button" className="pe-back" onClick={onBack}>← Language & Skills</button><div className="pe-kicker">ENGLISH • LANGUAGE & SKILLS</div><h1>Paragraph / Essay</h1><p>Build focused paragraphs, structured essays and exam-ready writing control.</p></header>
 <nav className="pe-tabs"><button className={section==='learn'?'active':''} onClick={()=>setSection('learn')}>Learn</button><button onClick={()=>changeMode('practice')}>Practice</button><button onClick={()=>changeMode('challenge')}>Challenge</button><button onClick={()=>changeMode('test')}>Final Test</button></nav>
 <section className="pe-progress"><span>Lesson {lesson+1} of {LESSONS.length}</span><div className="pe-bar"><i style={{width:`${((lesson+1)/LESSONS.length)*100}%`}}/></div></section>
 <article className="pe-card"><div className="pe-number">{num}</div><div><h2>{title}</h2><p>{body}</p></div></article>
 {lesson===3&&<aside className="pe-callout"><strong>Topic-sentence test:</strong> Can the rest of the paragraph directly explain, illustrate or justify the first sentence? If not, the opening is probably too vague.</aside>}
 {lesson===7&&<aside className="pe-callout"><strong>Connector audit:</strong> replace a connector with its plain meaning. If “therefore” does not mean “as a result” in that sentence, choose a different connector.</aside>}
 <div className="pe-nav"><button disabled={lesson===0} onClick={()=>setLesson(v=>Math.max(0,v-1))}>← Previous</button><span>{lesson+1} / {LESSONS.length}</span><button onClick={()=>setLesson(v=>Math.min(LESSONS.length-1,v+1))}>{lesson===LESSONS.length-1?'Review final audit':'Next lesson →'}</button></div>
 <section className="pe-section"><h2>Model examples</h2><div className="pe-grid">{EXAMPLES.slice(Math.floor(lesson/2),Math.floor(lesson/2)+4).map(([kind,example,note])=><div className="pe-mini" key={`${kind}-${example}`}><small>{kind}</small><h3>{example}</h3><p>{note}</p></div>)}</div></section>
 <section className="pe-section"><h2>Common errors</h2><ul>{TRAPS.slice(0,4).map(x=><li key={x}>{x}</li>)}</ul></section>
 <section className="pe-section pe-writing"><h2>Write it yourself</h2><p>Writing practice is not just choosing an answer. Use the checklist while producing your own paragraph or essay.</p><div className="pe-task">{WRITING_TASKS[lesson%WRITING_TASKS.length]}</div><div className="pe-checks"><span>☐ Clear central idea</span><span>☐ Relevant development</span><span>☐ Logical flow</span><span>☐ Accurate grammar</span><span>☐ Spelling & punctuation</span><span>☐ Purposeful conclusion</span></div></section>
 <section className="pe-section"><h2>Exam audit</h2><div className="pe-audit"><div>1. Read the exact task.</div><div>2. Identify purpose and audience.</div><div>3. Plan the central idea and paragraph order.</div><div>4. Develop each point with relevant support.</div><div>5. Check unity, coherence and transitions.</div><div>6. Edit grammar, spelling and punctuation.</div><div>7. Confirm length and conclusion.</div></div></section>
 </main>;
}
