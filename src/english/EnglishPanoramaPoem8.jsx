import React,{useState} from 'react';
import PanoramaTimedQuiz from './PanoramaTimedQuiz.jsx';
import './english-panorama-poetry.css';

const poem={
 title:"Abraham Lincoln’s Letter to His Son’s Teacher",poet:'Abraham Lincoln',book:'The Panorama • Poetry Chapter 8',
 context:'A father asks a teacher to give his son a balanced education: understand injustice without losing faith in goodness, value honest work, learn from defeat, think independently, listen critically, respect kindness, resist envy and cynicism, and develop courage, patience and faith in humanity.',
 stanzas:[
  {title:'Part 1 — Truth, goodness and honest value',range:'Lines 1–13',poemLines:[
   'He will have to learn, I know,','that all men are not just,','all men are not true.','But teach him also that','for every scoundrel there is a hero;','that for every selfish Politician,','there is a dedicated leader...','Teach him for every enemy there is','a friend.','It will take time, I know;','but teach him if you can,','that a dollar earned is of far more value than five','pound...'
  ],explanation:'पिता चाहते हैं कि बेटा दुनिया की बुराइयों को समझे, लेकिन अच्छाई में विश्वास खोए नहीं। उसे ईमानदार कमाई, समर्पित नेतृत्व और मित्रता का मूल्य भी समझना चाहिए। यह शिक्षा यथार्थ और आशा दोनों को साथ रखती है।',vocab:[['scoundrel','दुष्ट व्यक्ति'],['dedicated','समर्पित'],['enemy','शत्रु'],['earned','कमाया हुआ']]},
  {title:'Part 2 — Learning to lose, laughing quietly and resisting envy',range:'Lines 14–23',poemLines:[
   'Teach him to learn to lose...','and also to enjoy winning.','Steer him away from envy,','if you can,','teach him the secret of','quiet laughter.','Let him learn early that','the bullies are the easiest to lick...','Teach him, if you can,','the wonder of books...'
  ],explanation:'यह भाग हार और जीत के बीच संतुलन सिखाता है। बच्चे को ईर्ष्या से दूर रहना, शांत हँसी सीखना और दबंगों का सामना करना चाहिए। किताबों के प्रति आश्चर्य और प्रेम भी शिक्षा का महत्त्वपूर्ण हिस्सा है।',vocab:[['lose','हारना'],['winning','विजय'],['envy','ईर्ष्या'],['bully','दबंग व्यक्ति']]},
  {title:'Part 3 — Books, nature and honest character',range:'Lines 24–30',poemLines:[
   'But also give him quiet time','to ponder the eternal mystery of birds in the sky,','bees in the sun,','and the flowers on a green hillside.','In the school teach him','it is far more honourable to fail','than to cheat.','Teach him to have faith','in his own ideas,','even if everyone tells him','they