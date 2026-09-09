import React,{useEffect,useMemo,useState}from'react';
import EnglishTimedQuiz from './EnglishTimedQuiz.jsx';
import {PHASE4_BANKS} from './EnglishGenericLanguageSkillsBanks.jsx';
import DETERMINERS_BANKS from './EnglishDeterminersQuestionBank.jsx';
import {GENERIC_TOPIC_BANKS} from './EnglishGenericLanguageSkillsTopicBanks.jsx';

const LOCAL_TOPIC_BANKS={
 narration:{title:'Reported Speech / Narration',practice:[
  ['He said, "I am tired." The reported form is…',['He said that he was tired.','He said that I am tired.','He said that he is tired.','He told that he tired.'],0,'A past reporting verb commonly backshifts am to was and adjusts the pronoun.'],
  ['"Where do you live?" →',['He asked where I lived.','He asked where did I live.','He asked where do I live.','He said where I lived.'],0,'Reported questions use statement word order.'],
  ['"Open the door," the teacher said.',['The teacher told the student to open the door.','The teacher told to open the door the student.','The teacher said the student opened.','The teacher asked the student opened.'],0,'Commands commonly use told/asked + object + to-infinitive.'],
  ['She said, "I have finished my work."',['She said that she had finished her work.','She said that she has finish her work.','She says that she had finished.','She told that I finished.'],0,'Present perfect commonly backshifts to past perfect after a past reporting verb.'],
  ['The reporting verb is in the past. "I will help you" becomes…',['He said that he would help me.','He said that he will help me.','He told he would helps me.','He asked that I would help.'],0,'Will commonly changes to would and pronouns adjust to the reporting context.'],
  ['A timeless scientific fact in reported speech may…',['remain in the present','always become past perfect','always become future','lose its verb'],0,'Universal or timeless facts may remain in the present.']
 ],challenge:[
  ['"Do you know the answer?" she asked me.',['She asked me if I knew the answer.','She asked me did I know the answer.','She said if I know the answer.','She asked that I know answer.'],0,'Yes/no reported questions commonly use if/whether plus statement order.'],
  ['"Please help me," Riya said to Amit.',['Riya requested Amit to help her.','Riya told Amit helping her.','Riya said Amit help me.','Riya asked that Amit helped.'],0,'A polite request can be reported with requested + object + to-infinitive.'],
  ['"Why are you late?" the teacher asked.',['The teacher asked why I was late.','The teacher asked why was I late.','The teacher said why I am late.','The teacher asked that why late.'],0,'Wh-questions retain the wh-word but change to statement order.'],
  ['"Do not waste water," the coach said.',['The coach advised us not to waste water.','The coach said us do not waste water.','The coach asked that we not wasted water.','The coach told not waste water us.'],0,'Negative commands use not to + base verb after the object.'],
  ['"I can solve it," Neha said.',['Neha said that she could solve it.','Neha said that she can solved it.','Neha told she can solve.','Neha asked she could solve.'],0,'Can commonly backshifts to could after a past reporting verb.'],
  ['Which is correctly reported?',['He said that he had seen the film.','He said that he has saw the film.','He asked that he had seen the film.','He told that he see the film.'],0,'The reporting structure and perfect tense must both be grammatical.']
 ],test:[
  ['"I am reading now," Ravi said.',['Ravi said that he was reading then.','Ravi said that he is reading now.','Ravi asked that he was reading then.','Ravi told he reading now.'],0,'Pronouns, tense and the time expression change appropriately in reported speech.'],
  ['"Will you attend the meeting tomorrow?" she asked me.',['She asked me whether I would attend the meeting the next day.','She asked me whether would I attend tomorrow.','She said I will attend the meeting next day.','She told me whether I attend tomorrow.'],0,'Use whether/if, statement order, would and an appropriate time-word shift.'],
  ['"Let us start the work," the leader said.',['The leader suggested that we should start the work.','The leader told us to started the work.','The leader asked that we start yesterday.','The leader said us starting the work.'],0,'“Let us” commonly becomes a suggestion structure.'],
  ['"Alas! I have lost my purse," she said.',['She exclaimed with sorrow that she had lost her purse.','She asked that she lost her purse.','She said alas that I lost my purse.','She told that she has lost it.'],0,'Exclamatory sentences need a suitable reporting verb and backshift.'],
  ['Choose the correct form: “He said, \"I must leave now.\"”',['He said that he had to leave then.','He said that he must leave now.','He asked that he had left then.','He told he has to leave now.'],0,'Must for obligation commonly becomes had to in school-style reported speech.'],
  ['Which reported question is correct?',['The teacher asked where the students had gone.','The teacher asked where had the students gone.','The teacher said where the students had gone?','The teacher asked that where had students gone.'],0,'Reported questions use statement order without the question inversion.']
 ]},
 clauses:{title:'Clauses',practice:[
  ['Which is a noun clause?',['What he wants is unclear.','Because it rained, we stayed in.','The boy who won smiled.','When he arrived, we ate.'],0,'“What he wants” functions as the subject of the sentence.'],
  ['Which word commonly introduces a condition clause?',['if','who','which','whose'],0,'“If” commonly introduces a conditional clause.'],
  ['Which sentence contains a relative clause?',['The girl who won smiled.','We stayed because it rained.','Tell me what you need.','When he arrived, we ate.'],0,'“Who won” describes the noun “girl”.'],
  ['Which clause tells the reason?',['because he was ill','who won the match','what she wanted','when the bus arrived'],0,'“Because he was ill” gives the reason for an action.'],
  ['Which clause tells time?',['when the bell rings','what he bought','who called','because she was late'],0,'“When the bell rings” expresses time.'],
  ['In “I know where she lives,” the underlined-type clause “where she lives” is a…',['noun clause','adjective clause','adverb clause of reason','main clause'],0,'It functions as the object of “know”, so it is a noun clause.']
 ],challenge:[
  ['In “The book that you gave me is useful,” “that you gave me” is a…',['relative/adjective clause','noun clause','condition clause','main clause'],0,'It modifies the noun “book”.'],
  ['Which sentence contains an adverb clause of condition?',['If you work hard, you will improve.','The boy who worked smiled.','I know what he wants.','The place where we met is nearby.'],0,'“If you work hard” states a condition.'],
  ['Which clause functions as the subject?',['What she said was true.','I stayed because it rained.','The boy who won is my friend.','We met when the class ended.'],0,'“What she said” is the subject of “was true”.'],
  ['Choose the sentence with an adjective clause.',['The house which stands there is old.','I stayed because it rained.','Tell me what you know.','When he came, we left.'],0,'“Which stands there” modifies “house”.'],
  ['Which is an adverb clause of time?',['When the teacher arrived, the class became silent.','The teacher who arrived smiled.','I know what the teacher wants.','The place where he stood was crowded.'],0,'“When the teacher arrived” tells when the main action happened.'],
  ['Choose the complex sentence.',['Although it was raining, we played.','Ravi opened the door and entered.','Ravi opened the door.','Open the door.'],0,'A complex sentence contains an independent clause plus a dependent clause.']
 ],test:[
  ['Which sentence contains a noun clause as object?',['She knows what I mean.','The boy who won smiled.','We left after the bell rang.','Because it rained, they stayed.'],0,'“What I mean” is the object of “knows”.'],
  ['Which is a relative clause?',['who lives next door','because she was tired','when the rain stopped','what he explained'],0,'“Who lives next door” modifies an implied noun/person.'],
  ['Which sentence contains an adverb clause of concession?',['Although he was tired, he continued working.','The boy who was tired slept.','I know what he needs.','The place where he rested was quiet.'],0,'“Although” introduces a concession/contrast relationship.'],
  ['Choose the correctly classified clause in “I will call you when I arrive.”',['adverb clause of time','noun clause','relative clause','main clause'],0,'“When I arrive” modifies the verb phrase by telling when the call will happen.'],
  ['Which sentence has both a relative clause and a main clause?',['The student who studied passed the test.','Because he studied, he passed.','I know what he studied.','When he studied, he was tired.'],0,'“Who studied” is a relative clause modifying “student”; the rest is the main clause.'],
  ['Which sentence is complex?',['I stayed home because I was ill.','I stayed home and rested.','I stayed home.','Rest!'],0,'The sentence has one independent clause and one dependent reason clause.']
 ]}
};

const rotateForMode=(questions,mode)=>{const shift=mode==='challenge'?1:mode==='test'?2:0;return questions.map((item,qi)=>{const[q,opts,a,e]=item;const move=(a+shift+qi)%opts.length;const next=Array(opts.length);for(let i=0;i<opts.length;i++)next[(i+move-a+opts.length)%opts.length]=opts[i];return[q,next,move,e]})};
const readMode=()=>{if(typeof window==='undefined')return'practice';const m=new URLSearchParams(window.location.search).get('mode');return['practice','challenge','test'].includes(m)?m:'practice'};

export default function EnglishGenericLanguageSkillsQuiz({topicId='agreement',onBack,addXp,finishSession}){
 const topic=GENERIC_TOPIC_BANKS[topicId]||LOCAL_TOPIC_BANKS[topicId]||GENERIC_TOPIC_BANKS.agreement;
 const [currentMode,setCurrentMode]=useState(readMode);
 useEffect(()=>{const sync=()=>setCurrentMode(readMode());window.addEventListener('popstate',sync);const timer=setInterval(sync,250);return()=>{window.removeEventListener('popstate',sync);clearInterval(timer)}},[]);
 const dedicatedBank=topicId==='determiners'?DETERMINERS_BANKS:PHASE4_BANKS[topicId]||LOCAL_TOPIC_BANKS[topicId];
 const getBank=useMemo(()=>mode=>{if(topicId==='determiners')return rotateForMode(dedicatedBank?.[mode]||[],mode);return dedicatedBank?.[mode]?rotateForMode(dedicatedBank[mode],mode):rotateForMode(topic.practice||[],mode)},[topic,topicId,dedicatedBank]);
 const changeMode=mode=>{const p=new URLSearchParams(window.location.search);p.set('mode',mode);p.set('topic',topicId);p.set('languageSkills','1');p.set('subject','english');window.history.pushState({},'',`${window.location.pathname}?${p}`);window.dispatchEvent(new PopStateEvent('popstate'))};
 const returnToLearn=()=>{const p=new URLSearchParams(window.location.search);p.delete('mode');p.set('languageSkills','1');p.set('topic',topicId);p.set('subject','english');window.history.pushState({},'',`${window.location.pathname}?${p}`);window.dispatchEvent(new PopStateEvent('popstate'));onBack?.()};
 const nextLevel=mode=>changeMode(mode==='practice'?'challenge':mode==='challenge'?'test':'practice');
 const secondsPerQuestion=topicId==='determiners'?(currentMode==='practice'?50:60):undefined;
 return <EnglishTimedQuiz title={topic.title} mode={currentMode} getBank={getBank} onModeChange={changeMode} onBack={returnToLearn} addXp={addXp} finishSession={finishSession} onNextLevel={nextLevel} secondsPerQuestion={secondsPerQuestion}/>;
}