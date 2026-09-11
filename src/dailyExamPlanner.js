import {SUBJECT_REGISTRY} from './subjectProgressRegistry.js';
import {getCanonicalProgress} from './engines/progress/progressStore.js';

const DAY=86400000;
const SUBJECT_META={
  math:{name:'गणित',icon:'∑'},
  science:{name:'विज्ञान',icon:'⚗'},
  hindi:{name:'हिन्दी',icon:'अ'},
  sanskrit:{name:'संस्कृत',icon:'ॐ'},
  sst:{name:'सामाजिक विज्ञान',icon:'◎'},
  english:{name:'अंग्रेज़ी',icon:'A'},
  reasoning:{name:'तर्कशक्ति',icon:'?'}
};

const testCatalog=[
  {number:1,date:'2026-09-13',stage:'Foundation',purpose:'हल्का प्रारंभ',groups:{
    math:['math-01','math-02'],science:['science-01','science-02'],hindi:['g1','g2','k1','v1'],sanskrit:['sanskrit-01','sanskrit-02'],sst:['sst-h1','sst-h2','sst-g1'],english:['english-reader-01','english-reader-02','english-prose-01','english-poetry-01'],reasoning:['reasoning-01']
  }},
  {number:2,date:'2026-09-27',stage:'Core Coverage',purpose:'मुख्य शुरुआती coverage',groups:{
    math:['math-03','math-04'],science:['science-03','science-04'],hindi:['g3','g4','k2','k3','v2','h-grammar-01'],sanskrit:['sanskrit-03','sanskrit-04'],sst:['sst-h3','sst-h4','sst-g2','sst-g3'],english:['english-reader-03','english-reader-04','english-prose-02','english-poetry-02','english-skill-01','english-skill-02'],reasoning:['reasoning-02']
  }},
  {number:3,date:'2026-10-11',stage:'Mid I',purpose:'मध्य syllabus',groups:{
    math:['math-05','math-06'],science:['science-05','science-06'],hindi:['g5','g6','k4','k5','v3','h-grammar-02','h-grammar-03'],sanskrit:['sanskrit-05','sanskrit-06'],sst:['sst-h5','sst-h6','sst-g4','sst-g5','sst-g6'],english:['english-reader-05','english-reader-06','english-prose-03','english-prose-04','english-poetry-03','english-skill-03','english-skill-04'],reasoning:['reasoning-03']
  }},
  {number:4,date:'2026-10-25',stage:'Mid II',purpose:'मध्य coverage + balance',groups:{
    math:['math-07','math-08'],science:['science-07','science-08'],hindi:['g7','g8','k6','k7','v4','h-grammar-04','h-grammar-05'],sanskrit:['sanskrit-07','sanskrit-08'],sst:['sst-h7','sst-h8','sst-g7','sst-g8','sst-c1'],english:['english-reader-07','english-reader-08','english-prose-05','english-prose-06','english-poetry-04','english-poetry-05','english-skill-05','english-skill-06'],reasoning:['reasoning-04']
  }},
  {number:5,date:'2026-11-08',stage:'Late Syllabus',purpose:'late core support',groups:{
    math:['math-09','math-10'],science:['science-09','science-10'],hindi:['g9','g10','k8','k9','v5','h-grammar-06','h-grammar-07'],sanskrit:['sanskrit-09','sanskrit-10'],sst:['sst-g9','sst-g10','sst-g11','sst-g12','sst-g13','sst-c2','sst-c3','sst-c4'],english:['english-prose-07','english-prose-08','english-poetry-06','english-skill-07','english-skill-08','english-skill-09','english-skill-10','english-skill-11'],reasoning:['reasoning-05']
  }},
  {number:6,date:'2026-11-22',stage:'Advanced Coverage',purpose:'advanced/core completion',groups:{
    math:['math-11','math-12'],science:['science-11','science-12'],hindi:['g11','g12','k10','k11','v6','h-grammar-08','h-grammar-09','h-grammar-10'],sanskrit:['sanskrit-11','sanskrit-12'],sst:['sst-c5','sst-c6','sst-e1','sst-e2','sst-e3'],english:['english-prose-09','english-poetry-07','english-skill-12','english-skill-13','english-skill-14','english-skill-15'],reasoning:['reasoning-06']
  }},
  {number:7,date:'2026-12-06',stage:'Completion Push',purpose:'remaining chapters',groups:{
    math:['math-13','math-14','math-15'],science:['science-13','science-14','science-15'],hindi:['k12','v7','h-grammar-11','h-grammar-12','h-grammar-13'],sanskrit:['sanskrit-13','sanskrit-14','sanskrit-15'],sst:['sst-e4','sst-e5','sst-e6'],english:['english-poetry-08','english-skill-16','english-skill-17','english-skill-18','english-skill-19','english-skill-20','english-skill-21'],reasoning:['reasoning-01','reasoning-02','reasoning-03','reasoning-04','reasoning-05','reasoning-06']
  }},
  {number:8,date:'2026-12-20',stage:'Full Syllabus',purpose:'100% first-pass check',fullSyllabus:true},
  {number:9,date:'2027-01-03',stage:'Full Syllabus Revision I',purpose:'mixed full syllabus revision',phase:'revision'},
  {number:10,date:'2027-01-17',stage:'Weak Area SuperTest',purpose:'previous performance determines chapter weighting',phase:'weak'},
  {number:11,date:'2027-01-31',stage:'BSEB Style Full Mock',purpose:'complete examination simulation',phase:'mock'},
  {number:12,date:'2027-02-14',stage:'Final Readiness SuperTest',purpose:'full syllabus difficult mixed questions + weak area targeting',phase:'readiness'},
  {number:'Final',date:'2027-02-28',stage:'Final Examination',purpose:'complete eligible website-built syllabus',phase:'final'}
];

const makeDate=value=>{
  const [y,m,d]=String(value).slice(0,10).split('-').map(Number);
  return new Date(Date.UTC(y,m-1,d));
};
const toKey=date=>date.toISOString().slice(0,10);
const addDays=(value,days)=>{const d=value instanceof Date?new Date(value):makeDate(value);d.setUTCDate(d.getUTCDate()+days);return d;};
const diffDays=(from,to)=>Math.round((makeDate(to)-makeDate(from))/DAY);
const formatDate=value=>new Intl.DateTimeFormat('hi-IN',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(makeDate(value));

const registryBySubject=Object.fromEntries(SUBJECT_REGISTRY.map(subject=>[subject.id,subject]));
const findTopic=(subjectId,topicId)=>registryBySubject[subjectId]?.topics.find(topic=>topic.id===topicId)||null;
const interleaveGroups=groups=>{
  const lists=Object.entries(groups).map(([subjectId,topicIds])=>topicIds.map(topicId=>({subjectId,topicId,topic:findTopic(subjectId,topicId)})).filter(item=>item.topic));
  const result=[];
  let index=0;
  while(lists.some(list=>index<list.length)){for(const list of lists){if(index<list.length)result.push(list[index]);}index++;}
  return result;
};

function previousTestFor(test){
  const index=testCatalog.indexOf(test);
  return index>0?testCatalog[index-1]:null;
}
function studyWindow(test){
  if(test.phase||test.fullSyllabus)return {start:addDays(previousTestFor(test)?.date||test.date,1),end:addDays(test.date,-1)};
  const previous=previousTestFor(test);
  const start=previous?addDays(previous.date,1):addDays(test.date,-1);
  return {start:toKey(start),end:toKey(addDays(test.date,-1))};
}
function firstPassPlan(test,dateKey){
  const window=studyWindow(test);
  const totalDays=Math.max(1,diffDays(window.start,window.end)+1);
  const dayIndex=Math.max(0,Math.min(totalDays-1,diffDays(window.start,dateKey)));
  const items=interleaveGroups(test.groups);
  const start=Math.floor(dayIndex*items.length/totalDays);
  let end=Math.floor((dayIndex+1)*items.length/totalDays);
  if(end<=start)end=Math.min(items.length,start+1);
  return items.slice(start,end);
}
function recommendedExecution(daysLeft){
  if(daysLeft<=1)return {label:'अंतिम परीक्षा तैयारी',steps:['आज के target का तेज revision','समयबद्ध mini-test','गलतियों की अंतिम review']};
  if(daysLeft<=3)return {label:'Challenge + Error Review',steps:['Target chapters revise','Challenge questions','गलतियों की notebook revise']};
  if(daysLeft<=7)return {label:'Practice Focus',steps:['Target chapters revise','Practice questions','15–20 min timed mixed check']};
  return {label:'Learn → Practice',steps:['Concept learning/revision','Practice set','कल के target की quick recall']};
}
function getPhaseDailyFocus(test,dateKey){
  const remaining=Math.max(0,diffDays(dateKey,test.date));
  if(test.phase==='revision')return {label:'Mixed Revision Day',steps:['पूरे syllabus से mixed revision','कमज़ोर/भूले हुए topics दोहराएँ','Timed mixed questions']};
  if(test.phase==='weak')return {label:'Weak Area Day',steps:['पिछले प्रदर्शन के weakest topics देखें','उनका focused revision करें','उसी कमजोर area का timed practice']};
  if(test.phase==='mock')return {label:'BSEB Mock Preparation',steps:['Complete exam-style revision','समय प्रबंधन + section strategy','एक full-length mock attempt करें']};
  if(test.phase==='readiness')return {label:'Final Readiness Day',steps:['Difficult mixed revision','Weak-area targeting','Timed final readiness set']};
  if(test.phase==='final')return {label:'Final Examination Readiness',steps:['Full eligible syllabus quick revision','Formula/fact/error recall','Exam-day readiness']};
  return recommendedExecution(remaining);
}

export function getDailyExamPlan(dateValue=new Date()){
  const dateKey=typeof dateValue==='string'?dateValue:toKey(dateValue);
  const nextIndex=testCatalog.findIndex(test=>dateKey<=test.date);
  if(nextIndex<0){
    return {date:dateKey,mode:'complete',test:null,title:'परीक्षा चरण पूरा',subtitle:'Final Examination 28 Feb 2027 के बाद planner cycle पूरा हो चुका है।',items:[],execution:null,daysLeft:0};
  }
  const test=testCatalog[nextIndex];
  const daysLeft=diffDays(dateKey,test.date);
  const execution=getPhaseDailyFocus(test,dateKey);
  const previous=previousTestFor(test);
  const isExamDay=daysLeft===0;
  const items=test.groups&&!isExamDay?firstPassPlan(test,dateKey):[];
  return {
    date:dateKey,
    mode:isExamDay?'exam-day':(test.groups?'first-pass':'phase'),
    test,
    previous,
    title:isExamDay?`आज SuperTest ${test.number === 'Final' ? 'Final Examination' : String(test.number).padStart(2,'0')} है`:'आज का Exam-Oriented Study Plan',
    subtitle:isExamDay?test.purpose:`अगला लक्ष्य: ${test.number==='Final'?'Final Examination':`SuperTest ${String(test.number).padStart(2,'0')}`} • ${formatDate(test.date)}`,
    items,
    execution,
    daysLeft
  };
}

export function openExamPlannerTopic(subjectId,topicId){
  const subject=registryBySubject[subjectId];
  const index=subject?.topics.findIndex(topic=>topic.id===topicId)??-1;
  if(index<0||typeof window==='undefined')return false;
  const params=new URLSearchParams();
  params.set('page','chapter');
  params.set('subject',subjectId);
  params.set('chapter',String(index));
  params.set('mode','learn');
  window.history.pushState({},'',`${window.location.pathname}?${params.toString()}${window.location.hash||''}`);
  window.dispatchEvent(new PopStateEvent('popstate'));
  return true;
}

export function getDailyPlannerTopicStatus(subjectId,topicId){
  const progress=getCanonicalProgress();
  const topic=progress?.topics?.[`${subjectId}::${topicId}`];
  const stages=topic?.stages||{};
  if(stages.test)return {key:'test',label:'✓ Test Complete'};
  if(stages.challenge)return {key:'challenge',label:'🔥 Challenge Complete'};
  if(stages.practice)return {key:'practice',label:'✓ Practice Complete'};
  if(stages.learn)return {key:'learn',label:'📖 Learned'};
  return {key:'todo',label:'○ Start'};
}

export function getPlannerSubjectMeta(subjectId){return SUBJECT_META[subjectId]||{name:subjectId,icon:'•'};}
