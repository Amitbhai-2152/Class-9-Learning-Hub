import React,{useEffect,useMemo,useState}from'react';
import EnglishTimedQuiz from './EnglishTimedQuiz.jsx';
import {PHASE4_BANKS} from './EnglishGenericLanguageSkillsBanks.jsx';
import DETERMINERS_BANKS from './EnglishDeterminersQuestionBank.jsx';
import {GENERIC_TOPIC_BANKS} from './EnglishGenericLanguageSkillsTopicBanks.jsx';

const rotateForMode=(questions,mode)=>{const shift=mode==='challenge'?1:mode==='test'?2:0;return questions.map((item,qi)=>{const[q,opts,a,e]=item;const move=(a+shift+qi)%opts.length;const next=Array(opts.length);for(let i=0;i<opts.length;i++)next[(i+move-a+opts.length)%opts.length]=opts[i];return[q,next,move,e]})};
const readMode=()=>{if(typeof window==='undefined')return'practice';const m=new URLSearchParams(window.location.search).get('mode');return['practice','challenge','test'].includes(m)?m:'practice'};

export default function EnglishGenericLanguageSkillsQuiz({topicId='agreement',onBack,addXp,finishSession}){
 const topic=GENERIC_TOPIC_BANKS[topicId]||GENERIC_TOPIC_BANKS.agreement;
 const [currentMode,setCurrentMode]=useState(readMode);
 useEffect(()=>{const sync=()=>setCurrentMode(readMode());window.addEventListener('popstate',sync);const timer=setInterval(sync,250);return()=>{window.removeEventListener('popstate',sync);clearInterval(timer)}},[]);
 const dedicatedBank=topicId==='determiners'?DETERMINERS_BANKS:PHASE4_BANKS[topicId];
 const getBank=useMemo(()=>mode=>{if(topicId==='determiners')return rotateForMode(dedicatedBank?.[mode]||[],mode);return dedicatedBank?.[mode]?rotateForMode(dedicatedBank[mode],mode):rotateForMode(topic.practice||[],mode)},[topic,topicId,dedicatedBank]);
 const changeMode=mode=>{const p=new URLSearchParams(window.location.search);p.set('mode',mode);p.set('topic',topicId);p.set('languageSkills','1');p.set('subject','english');window.history.pushState({},'',`${window.location.pathname}?${p}`);window.dispatchEvent(new PopStateEvent('popstate'))};
 const returnToLearn=()=>{const p=new URLSearchParams(window.location.search);p.delete('mode');p.set('languageSkills','1');p.set('topic',topicId);p.set('subject','english');window.history.pushState({},'',`${window.location.pathname}?${p}`);window.dispatchEvent(new PopStateEvent('popstate'));onBack?.()};
 const nextLevel=mode=>changeMode(mode==='practice'?'challenge':mode==='challenge'?'test':'practice');
 const secondsPerQuestion=topicId==='determiners'?(currentMode==='practice'?50:60):undefined;
 return <EnglishTimedQuiz title={topic.title} mode={currentMode} getBank={getBank} onModeChange={changeMode} onBack={returnToLearn} addXp={addXp} finishSession={finishSession} onNextLevel={nextLevel} secondsPerQuestion={secondsPerQuestion}/>;
}