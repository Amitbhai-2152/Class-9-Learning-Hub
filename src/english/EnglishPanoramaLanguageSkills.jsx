import React,{useState} from 'react';
import PanoramaTimedQuiz from './PanoramaTimedQuiz.jsx';
import './english-reader.css';
import './english-panorama.css';
import './EnglishPanoramaLanguageSkills.css';

const grammar=[
 ['01','Tenses','Present forms and their extensions in context.','T'],
 ['02','Modals','have to / had to, must, should, need, ought to.','M'],
 ['03','Active & Passive Voice','Change focus between doer and receiver while preserving tense and meaning.','V'],
 ['04','Reporting','Statements, questions, commands and requests.','R'],
 ['05','Subject–Verb Agreement','Choose the verb that agrees with the real subject.','S'],
 ['06','Clauses','Noun clauses, condition/time adverb clauses, and relative clauses.','C'],
 ['07','Determiners','Use articles, quantifiers and other determiners appropriately.','D'],
 ['08','Prepositions','Select prepositions by meaning and context.','P']
];

const writing=[
 ['Formal Letter','Headmaster, municipal corporation, BSNL, Editor and Vidyut Board situations.','Plan → address → subject → salutation → clear request/complaint → closing.'],
 ['Informal Letter','To father, friend or uncle: invitation, thanks, holidays, congratulations, permission or life aims.','Keep a warm personal tone while maintaining a clear beginning, body and closing.'],
 ['Notice','Short school/community information requiring date, heading, details and issuing authority.','Make the key information scannable: what, when, where and who.'],
 ['Report','Describe an event or incident with relevant factual details.','Use a clear heading, factual sequence and concise formal language.'],
 ['Speech','Present a topic to an audience in an organised spoken form.','Open with an address, develop 2–3 clear points and finish with a strong conclusion.'],
 ['Message','Pass on essential information accurately and briefly.','Record who, what, when and any action required without unnecessary detail.'],
 ['Paragraph / Essay','Topics include people, television, games, matches, seasons and memorable experiences.','Use one central idea, logical order, supporting details and a clean conclusion.'],
 ['Composition','Describe a situation or event in a focused piece of writing.','Select only details that support the situation; avoid turning description into a loose list.']
];

const reading=[
 ['Factual passage','Read for facts, relationships, sequence and supporting details.','Do not choose an option merely because it repeats a word from the passage.'],
 ['Literary passage','Read for character, mood, event, inference and central idea.','Separate what the passage states from what it only suggests.'],
 ['Poetry passage','Interpret image, tone, meaning and the poet’s idea.','Use the surrounding lines to resolve the meaning of a difficult word or image.']
];

const quiz=[
 {q:'Choose the correct form: “She ___ here since Monday.”',o:['has been working','is working','worked','has worked yesterday'],a:0,e:'The present perfect continuous form fits an activity that began in the past and continues up to now.'},
 {q:'Choose the correct form: “When he arrived, we ___ dinner.”',o:['were having','have','are having','will have'],a:0,e:'The background action was in progress when he arrived, so past continuous is appropriate.'},
 {q:'“You ___ wear a helmet on this road.” Which modal best expresses obligation?',o:['must','might','could','needn’t'],a:0,e:'Must expresses strong obligation.'},
 {q:'Which sentence best expresses past obligation?',o:['We had to leave early.','We must left early.','We should to leave early.','We need leaving early.'],a:0,e:'Had to is used for an obligation that existed in the past.'},
 {q:'Change to passive: “The teacher praised the student.”',o:['The student was praised by the teacher.','The student is praised by the teacher.','The teacher was praised by the student.','The student praised the teacher.'],a:0,e:'The simple past passive uses was/were + past participle.'},
 {q:'Which is the correct passive form of “They will complete the work.”?',o:['The work will be completed by them.','The work was completed by them.','The work is completed by them.','The work will complete them.'],a:0,e:'Future passive uses will be + past participle.'},
 {q:'Report: Rina said, “I am busy.” Choose the correct form.',o:['Rina said that she was busy.','Rina said that I am busy.','Rina says that she was busy yesterday.','Rina said she is busy tomorrow.'],a:0,e:'In standard backshifted reporting, am becomes was and the pronoun changes from I to she.'},
 {q:'Report the question: He said, “Where do you live?”',o:['He asked where I lived.','He asked where did I live.','He said where I live?','He asked where do I lived.'],a:0,e:'An embedded reported question uses statement word order: where + subject + verb.'},
 {q:'Which sentence has correct subject–verb agreement?',o:['The list of names is on the table.','The list of names are on the table.','The names in the list is on the table.','The list are on the table.'],a:0,e:'The head subject is list, which is singular.'},
 {q:'Choose the correct form: “Neither of the boys ___ absent.”',o:['is','are','were','have'],a:0,e:'Neither is treated as singular in this construction.'},
 {q:'Which clause is a noun clause?',o:['I know what he wants.','I stayed because it rained.','The boy who won smiled.','When the bell rang, we left.'],a:0,e:'What he wants functions as the object of know, so it is a noun clause.'},
 {q:'Which sentence contains a relative clause?',o:['The girl who won the race is my sister.','I stayed because it rained.','Tell me what you need.','When he arrived, we ate.'],a:0,e:'Who won the race qualifies the noun girl, making it a relative clause.'},
 {q:'Which sentence uses a determiner correctly?',o:['I have some useful books.','I have much books.','I have a useful books.','I have every books.'],a:0,e:'Some can modify the plural countable noun books.'},
 {q:'Choose the correct preposition: “He is good ___ mathematics.”',o:['at','on','for','with'],a:0,e:'Good at is the standard collocation for ability in a subject.'},
 {q:'Hindi → English: “वह रोज़ स्कूल जाता है।”',o:['He goes to school every day.','He go school every day.','He is go to school every day.','He went to school every day.'],a:0,e:'The sentence expresses a regular present action, so the simple present form goes is correct.'},
 {q:'Hindi → English: “मैंने उसे कल देखा।”',o:['I saw him yesterday.','I see him yesterday.','I have seen him yesterday.','I am seeing him yesterday.'],a:0,e:'A completed action at a definite past time uses simple past: saw.'},
 {q:'Which formal letter opening is most appropriate to a Headmaster?',o:['Respected Sir/Madam,','Hi buddy!','Dear best friend,','Hello everyone!'],a:0,e:'A respectful formal salutation is appropriate for a letter to the Headmaster.'},
 {q:'Which subject line is clearest for a complaint about dirty drains?',o:['Subject: Request for proper cleaning of drains in our locality','Subject: My favourite game','Subject: A birthday message','Subject: Holiday plans'],a:0,e:'A formal subject line states the exact purpose of the letter.'},
 {q:'Which feature is most important in a notice?',o:['Clear essential details such as event, date, time and place','A long personal story','Informal jokes','A dialogue between two friends'],a:0,e:'Notices are concise public information pieces and need quickly scannable essentials.'},
 {q:'Which is most suitable for a report?',o:['Factual description of an event in an organised sequence','A private message to a friend','A list of unrelated opinions','A fictional conversation with no context'],a:0,e:'A report should present relevant facts about an event or incident.'},
 {q:'Which opening best suits a school speech?',o:['Good morning respected teachers and dear friends,','Dear customer, please pay the bill.','Hey, what’s up?','Once upon a time, there was a king.'],a:0,e:'A school speech needs an audience-appropriate address and formal spoken tone.'},
 {q:'A message is most effective when it records:',o:['Who, what, when and any required action','Every detail of the sender’s life','Several unrelated opinions','Only the writer’s feelings'],a:0,e:'A message must transmit the actionable information accurately and briefly.'},
 {q:'Which paragraph plan is strongest for “My Favourite Game”?',o:['Opening idea → reasons/details → personal experience → conclusion','Only a title and repeated sentences','A list of unrelated games','A dialogue with no central idea'],a:0,e:'A focused paragraph develops one central topic in a logical order.'},
 {q:'Which writing choice improves a composition describing an event?',o:['Select details that make the situation clear and vivid','Include every minor detail you can remember','Change topic every sentence','Avoid a clear sequence'],a:0,e:'Selective, relevant details create a focused composition.'},
 {q:'In an unseen factual passage, an answer is strongest when it is:',o:['Supported by information and relationships in the passage','Based only on a familiar word in the options','A guess from the title alone','Chosen because it is the longest'],a:0,e:'Factual comprehension requires evidence from the passage.'},
 {q:'In a literary passage, an inference is:',o:['A reasonable conclusion drawn from clues in the text','A fact copied from an unrelated story','A guess with no textual support','The title repeated as an answer'],a:0,e:'An inference goes beyond the exact words but remains supported by textual clues.'},
 {q:'When a poem contains an unfamiliar word, the safest first step is to:',o:['Use the surrounding lines and imagery for context','Assume the rarest dictionary meaning','Ignore the whole stanza','Choose the option with the most difficult word'],a:0,e:'Context, imagery and surrounding lines help determine meaning in poetry.'},
 {q:'Which reading skill is being tested when a question asks for the main idea?',o:['Identifying the central message or point','Counting the number of sentences','Finding the longest word','Copying the first line'],a:0,e:'The main idea is the central point that organises the passage.'},
 {q:'Which reading habit is best for supporting-detail questions?',o:['Return to the relevant lines and verify the evidence','Answer from memory before reading the passage','Choose the first option that sounds familiar','Ignore qualifiers such as “not” or “except”'],a:0,e:'Supporting-detail answers should be checked against the exact evidence in the passage.'},
 {q:'Which pair correctly distinguishes fact and inference?',o:['Fact = directly stated; inference = logically concluded from clues','Fact = personal opinion; inference = dictionary definition','Fact = title; inference = first sentence','Fact = guess; inference = exact quotation'],a:0,e:'A fact is directly supported by the text, while an inference is reasoned from textual clues.'},
 {q:'Which sentence is correctly reported as a command?',o:['The teacher told the students to sit down.','The teacher said the students sit down.','The teacher asked that the students sat down.','The teacher told, “sit down” to students.'],a:0,e:'Reported commands commonly use told + object + to-infinitive.'},
 {q:'Choose the best clause: “I will call you ___ I reach home.”',o:['when','who','what','whose'],a:0,e:'When introduces an adverb clause of time.'},
 {q:'Choose the best clause: “We will stay inside ___ it rains.”',o:['if','who','which','whose'],a:0,e:'If introduces an adverb clause of condition.'},
 {q:'Which determiner fits: “___ students in the class were present.”',o:['All','Much','Every of','A'],a:0,e:'All correctly modifies the plural noun students to express the whole group.'},
 {q:'Which preposition fits: “The train arrived ___ time.”',o:['on','in','at','by'],a:0,e:'On time means punctual or not late.'},
 {q:'Which revision best improves this sentence: “He did not went there.”',o:['He did not go there.','He did not went there.','He does not went there.','He did not going there.'],a:0,e:'After did not, use the base form go.'}
];

function jump(id){document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});}
function openSubject(onBack){onBack();}

export function EnglishPanoramaLanguageSkills({onBack,addXp,finishSession}){
 const [start,setStart]=useState(false);
 if(start)return <PanoramaTimedQuiz mode="challenge" title="Language Skills Final Check" bank={quiz} onBack={()=>setStart(false)} addXp={addXp} finishSession={finishSession}/>;
 return <main className="pg-shell els-page">
  <div className="els-top"><button className="pg-back" onClick={onBack}>← Back to English</button><span className="els-badge"><i/>PHASE 5 • LANGUAGE SKILLS</span></div>
  <section className="els-hero">
   <div><div className="els-kicker">CLASS 9 <b>•</b> ENGLISH <b>•</b> BSEB PREPARATION</div><h1>English Language<br/><em>&amp; Skills Hub</em></h1><p>One organised place for Grammar, Writing, Translation and Unseen Reading — separate from chapter-specific prose exercises.</p><div className="els-chips"><span>8 Grammar areas</span><span>8 Writing formats</span><span>3 Reading types</span><span>36-question final check</span></div></div>
   <div className="els-hero-side"><strong>36</strong><span>Questions</span><strong>36:00</strong><span>Challenge timer</span></div>
  </section>
  <section className="els-start"><div><span>PHASE 5 FINAL CHECK</span><h2>Test the language section as one skill set</h2><p>Grammar, writing conventions, translation and unseen-passage skills are mixed intentionally so you practise switching between question types.</p></div><button onClick={()=>setStart(true)}>Start Final Check <b>→</b></button></section>
  <div className="els-quick"><button onClick={()=>jump('els-grammar')}><b>01</b><span>Grammar Lab</span><small>8 core areas</small></button><button onClick={()=>jump('els-writing')}><b>02</b><span>Writing Studio</span><small>Formats + exam rules</small></button><button onClick={()=>jump('els-reading')}><b>03</b><span>Reading Lab</span><small>3 unseen types</small></button></div>
  <section id="els-grammar" className="els-section"><div className="els-head"><div><span>01 • GRAMMAR LAB</span><h2>Build accuracy, not just answers</h2><p>Use the chapter pages for chapter-linked grammar; use this hub for the central syllabus map.</p></div><em>8 areas</em></div><div className="els-grid els-grammar-grid">{grammar.map(([n,title,desc,mark])=><article key={n}><div className="els-num">{mark}</div><div><small>AREA {n}</small><h3>{title}</h3><p>{desc}</p></div></article>)}</div><div className="els-translation"><div><b>Translation focus</b><span>Hindi → English • the exam passage is a short prose passage; preserve tense, subject, meaning and natural English.</span></div><div><b>Exam rule</b><span>Do not translate word-for-word when that produces unnatural English. Translate the intended meaning using correct grammar.</span></div></div></section>
  <section id="els-writing" className="els-section"><div className="els-head"><div><span>02 • WRITING STUDIO</span><h2>Choose the right format before writing</h2><p>Format selection is part of the skill: formal and informal communication should not look the same.</p></div><em>8 formats</em></div><div className="els-writing-grid">{writing.map(([title,scope,rule],i)=><article key={title}><div className="els-writing-top"><span>{String(i+1).padStart(2,'0')}</span><h3>{title}</h3></div><p>{scope}</p><div><b>Use this rule</b><small>{rule}</small></div></article>)}</div></section>
  <section id="els-reading" className="els-section"><div className="els-head"><div><span>03 • READING LAB</span><h2>Read for evidence, not guesswork</h2><p>The unseen section rewards careful reading, inference and vocabulary-in-context.</p></div><em>3 types</em></div><div className="els-reading-grid">{reading.map(([title,focus,trap],i)=><article key={title}><div className="els-reading-icon">0{i+1}</div><div><h3>{title}</h3><p><b>Focus:</b> {focus}</p><p><b>Avoid:</b> {trap}</p></div></article>)}</div><div className="els-reading-note"><b>Three-step reading habit</b><span>Read the whole passage → identify the exact evidence → eliminate options that overstate, distort or contradict the passage.</span></div></section>
  <section className="els-readiness"><div><span>RELEASE READINESS</span><h2>Language coverage is now separated cleanly from literature.</h2><p>Chapter-specific grammar stays inside the prose lessons. Central grammar, writing, translation and unseen-reading practice now have a dedicated Phase-5 home.</p></div><button onClick={()=>setStart(true)}>Take the 36-question check →</button></section>
 </main>;
}
export default EnglishPanoramaLanguageSkills;
