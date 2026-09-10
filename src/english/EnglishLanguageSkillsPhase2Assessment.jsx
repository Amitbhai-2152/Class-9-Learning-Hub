import React,{useMemo,useState}from'react';
import EnglishTimedQuiz from './EnglishTimedQuiz.jsx';
import {PHASE4_BANKS} from './EnglishGenericLanguageSkillsBanks.jsx';
import DETERMINERS_BANKS from './EnglishDeterminersQuestionBank.jsx';
import {GENERIC_TOPIC_BANKS} from './EnglishGenericLanguageSkillsTopicBanks.jsx';
import {PHASE2_LANGUAGE_SKILLS_EXPANSION} from './EnglishLanguageSkillsPhase2Expansion.jsx';
import {FINAL_STANDARD_BANKS} from './EnglishLanguageSkillsFinalStandardBanks.jsx';

const SUPPORTED=new Set(['agreement','determiners','prepositions','idioms']);
const readMode=()=>{if(typeof window==='undefined')return'practice';const m=new URLSearchParams(window.location.search).get('mode');return['practice','challenge','test'].includes(m)?m:'practice'};

export default function EnglishLanguageSkillsPhase2Assessment({topicId='agreement',onBack,addXp,finishSession}){
 const [mode,setMode]=useState(readMode);
 const base=useMemo(()=>topicId==='determiners'?DETERMINERS_BANKS:PHASE4_BANKS[topicId]||[],[topicId]);
 const bank=useMemo(()=>[...(base[mode]||[]),...(PHASE2_LANGUAGE_SKILLS_EXPANSION[topicId]?.[mode]||[]),...(FINAL_STANDARD_BANKS[topicId]?.[mode]||[])],[base,mode,topicId]);
 const topic=GENERIC_TOPIC_BANKS[topicId]||{title:topicId};
 const changeMode=m=>{const p=new URLSearchParams(window.location.search);p.set('mode',m);p.set('topic',topicId);p.set('languageSkills','1');p.set('subject','english');window.history.pushState({},'',`${window.location.pathname}?${p}`);window.dispatchEvent(new PopStateEvent('popstate'));setMode(m)};
 const returnToLearn=()=>{const p=new URLSearchParams(window.location.search);p.delete('mode');p.set('languageSkills','1');p.set('topic',topicId);p.set('subject','english');window.history.pushState({},'',`${window.location.pathname}?${p}`);window.dispatchEvent(new PopStateEvent('popstate'));onBack?.()};
 const nextLevel=m=>changeMode(m==='practice'?'challenge':m==='challenge'?'test':'practice');
 if(!SUPPORTED.has(topicId))return null;
 return <EnglishTimedQuiz title={topic.title} mode={mode} getBank={()=>bank} onModeChange={changeMode} onBack={returnToLearn} addXp={addXp} finishSession={finishSession} onNextLevel={nextLevel} secondsPerQuestion={topicId==='determiners'?(mode==='practice'?50:60):undefined}/>;
}