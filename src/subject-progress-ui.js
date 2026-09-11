const SUBJECTS=[
 {id:'math',name:'गणित',total:15,icon:'∑'},
 {id:'science',name:'विज्ञान',total:15,icon:'⚗'},
 {id:'hindi',name:'हिन्दी',total:44,icon:'अ'},
 {id:'sanskrit',name:'संस्कृत',total:15,icon:'ॐ'},
 {id:'sst',name:'सामाजिक विज्ञान',total:33,icon:'◎'},
 {id:'english',name:'अंग्रेज़ी',total:46,icon:'A'},
 {id:'reasoning',name:'तर्कशक्ति',total:6,icon:'?'}
];
const STAGES=['learn','practice','challenge','test'];
const MODEL_KEY='class9-progress-v2';
const ANON_ID_KEY='class9-anonymous-student-id';
const EVENTS_KEY='class9-progress-events-v1';

const readJson=(key,fallback)=>{try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw):fallback}catch{return fallback}};
const writeJson=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));return true}catch{return false}};
const safeObj=value=>value&&typeof value==='object'&&!Array.isArray(value)?value:{};
const safeNum=(value,fallback=0)=>Number.isFinite(Number(value))?Number(value):fallback;

function getAnonStudentId(){
 let id='';try{id=localStorage.getItem(ANON_ID_KEY)||''}catch{}
 if(!id){try{id=crypto.randomUUID()}catch{id=`anon-${Date.now()}-${Math.random().toString(36).slice(2,10)}`};try{localStorage.setItem(ANON_ID_KEY,id)}catch{}}
 return id;
}

function newChapter(){return {learn:false,practice:false,challenge:false,test:false,attempts:0,correct:0,lastActivityAt:null};}
function normalizeChapter(value){const source=safeObj(value);return {learn:Boolean(source.learn),practice:Boolean(source.practice),challenge:Boolean(source.challenge),test:Boolean(source.test),attempts:safeNum(source.attempts),correct:safeNum(source.correct),lastActivityAt:source.lastActivityAt||null};}

function ensureSubjectBucket(subjects,id,name,total,icon){
 const current=safeObj(subjects[id]);
 return {...subjects,[id]:{id,name,total,icon,chapters:safeObj(current.chapters),updatedAt:current.updatedAt||null}};
}

function classifySubject(name){
 if(!name)return null;
 const exact=SUBJECTS.find(s=>s.name===name);if(exact)return exact;
 const normalized=String(name).trim().toLowerCase();
 return SUBJECTS.find(s=>s.name.toLowerCase()===normalized)||null;
}

function applyChapterStage(subjectBucket,chapter,stage,attempts=0,correct=0,at=Date.now()){
 if(!subjectBucket||!chapter||!STAGES.includes(stage))return subjectBucket;
 const chapters={...subjectBucket.chapters};
 const prev=normalizeChapter(chapters[chapter]);
 chapters[chapter]={...prev,[stage]:true,attempts:Math.max(prev.attempts,attempts),correct:Math.max(prev.correct,correct),lastActivityAt:at};
 return {...subjectBucket,chapters,updatedAt:at};
}

export function buildSubjectSnapshot(){
 const subjectState={};
 SUBJECTS.forEach(s=>{subjectState[s.id]={...s,chapters:{},updatedAt:null}});
 const touch=(subjectName,chapter,stage,attempts=0,correct=0,at=Date.now())=>{
  const subject=classifySubject(subjectName);if(!subject||!chapter||!STAGES.includes(stage))return;
  subjectState[subject.id]=applyChapterStage(subjectState[subject.id],chapter,stage,attempts,correct,at);
 };

 const generic=readJson('class9-learning-progress',{});
 Object.entries(safeObj(generic)).forEach(([key,value])=>{
  if(key.startsWith('__')||!key.includes('::'))return;
  const parts=key.split('::');const subjectName=parts.shift();const chapter=parts.join('::');const row=normalizeChapter(value);
  STAGES.forEach(stage=>{if(row[stage])touch(subjectName,chapter,stage,row.attempts,row.correct,row.lastActivityAt||Date.now())});
 });

 const sessions=[];
 const app=readJson('class9-progress',{});if(Array.isArray(app?.sessions))sessions.push(...app.sessions);
 const engine=readJson('class9-sessions',[]);if(Array.isArray(engine))sessions.push(...engine);
 sessions.forEach(session=>{
  if(!session?.completed||!session?.subject||!session?.chapter)return;
  const stage=STAGES.includes(session.mode)?session.mode:null;
  if(stage)touch(session.subject,session.chapter,stage,safeNum(session.attempted),safeNum(session.correct),session.at||Date.now());
 });

 const hindi=readJson('class9-hindi-chapter-progress-v1',{});
 Object.entries(safeObj(hindi?.modes)).forEach(([id,modes])=>{
  const completed=safeObj(modes);
  Object.entries(completed).forEach(([stage,done])=>{if(done)touch('हिन्दी',id,stage,0,0,Date.now())});
 });

 const subjects=Object.fromEntries(SUBJECTS.map(s=>{
  const source=subjectState[s.id];
  const entries=Object.entries(safeObj(source.chapters)).map(([chapter,value])=>[chapter,normalizeChapter(value)]);
  const completedStages=entries.reduce((n,[,v])=>n+STAGES.filter(stage=>v[stage]).length,0);
  const chapterStarted=entries.filter(([,v])=>STAGES.some(stage=>v[stage])).length;
  const fullyCompleted=entries.filter(([,v])=>STAGES.every(stage=>v[stage])).length;
  const attempts=entries.reduce((n,[,v])=>n+v.attempts,0);
  const correct=entries.reduce((n,[,v])=>n+v.correct,0);
  const percent=Math.round((completedStages/Math.max(1,s.total*STAGES.length))*100);
  return [s.id,{...s,chapters:Object.fromEntries(entries),completedStages,chapterStarted,fullyCompleted,attempts,correct,percent,updatedAt:source.updatedAt||null}];
 }));
 return {schemaVersion:2,studentId:getAnonStudentId(),updatedAt:new Date().toISOString(),subjects};
}

export function persistSubjectSnapshot(){
 const snapshot=buildSubjectSnapshot();
 writeJson(MODEL_KEY,snapshot);
 return snapshot;
}

export function getSubjectProgress(){
 const stored=readJson(MODEL_KEY,null);
 if(stored?.schemaVersion===2&&stored?.subjects)return stored.subjects;
 return persistSubjectSnapshot().subjects;
}

function collectEvents(){return Array.isArray(readJson(EVENTS_KEY,[]))?readJson(EVENTS_KEY,[]):[];}
export function appendProgressEvent(event){
 const safe={eventId:event?.eventId||`evt-${Date.now()}-${Math.random().toString(36).slice(2,9)}`,studentId:getAnonStudentId(),createdAt:event?.createdAt||new Date().toISOString(),...safeObj(event)};
 const next=[safe,...collectEvents()].slice(0,1000);writeJson(EVENTS_KEY,next);persistSubjectSnapshot();try{window.dispatchEvent(new CustomEvent('class9-progress-updated'))}catch{};return safe;
}

function captureExistingSources(){
 const snapshot=buildSubjectSnapshot();
 const previous=readJson(MODEL_KEY,null);
 const previousUpdated=previous?.updatedAt||'';
 if(previousUpdated!==snapshot.updatedAt||!previous?.subjects)writeJson(MODEL_KEY,snapshot);
}

function render(){
 if(!location.search.includes('page=home')&&location.search&&!location.search.endsWith('page=home'))return;
 const dashboard=document.querySelector('.app-shell .dashboard');
 const offering=document.querySelector('.app-shell .offering-grid');
 if(!dashboard||!offering)return;
 let panel=document.getElementById('class9-subject-progress');
 if(!panel){
  panel=document.createElement('section');panel.id='class9-subject-progress';panel.className='spui-panel';
  offering.insertAdjacentElement('afterend',panel);
 }
 const subjects=getSubjectProgress();
 panel.innerHTML=`<div class="spui-head"><div><span class="spui-eyebrow">YOUR PREPARATION</span><h2>विषयवार प्रगति</h2><p>हर विषय में सीखने, अभ्यास, चुनौती और टेस्ट की प्रगति एक जगह देखें।</p></div><span class="spui-live">● LIVE</span></div><div class="spui-grid">${SUBJECTS.map(subject=>{const row=subjects[subject.id]||{...subject,percent:0,chapterStarted:0,fullyCompleted:0};return `<button type="button" class="spui-card" data-subject="${subject.id}" aria-label="${subject.name} progress ${row.percent}%"><span class="spui-icon">${subject.icon}</span><span class="spui-main"><span class="spui-title"><strong>${subject.name}</strong><b>${row.percent}%</b></span><span class="spui-bar"><i style="width:${row.percent}%"></i></span><span class="spui-meta">${row.chapterStarted}/${subject.total} topics started <em>${row.fullyCompleted} complete</em></span></span><span class="spui-arrow">→</span></button>`}).join('')}</div><div class="spui-footer"><span>📊 Tracked from your learning activity</span><span>Ready for Supabase sync</span></div>`;
 panel.querySelectorAll('[data-subject]').forEach(button=>button.addEventListener('click',()=>{const id=button.getAttribute('data-subject');history.pushState({},'',`${location.pathname}?page=subject&subject=${encodeURIComponent(id)}`);window.dispatchEvent(new PopStateEvent('popstate'))}));
 panel.querySelectorAll('.spui-bar i').forEach((el,index)=>{el.style.setProperty('--spui-delay',`${index*60}ms`);});
}

function refresh(){captureExistingSources();render();}

let scheduled=false;
function scheduleRefresh(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;refresh()});}

function install(){
 refresh();
 const observer=new MutationObserver(scheduleRefresh);observer.observe(document.body,{childList:true,subtree:true});
 const nativeSetItem=Storage.prototype.setItem;
 if(!Storage.prototype.__class9ProgressPatched){
  Storage.prototype.setItem=function(key,value){const result=nativeSetItem.apply(this,arguments);if(['class9-progress','class9-sessions','class9-learning-progress','class9-hindi-chapter-progress-v1'].includes(String(key)))setTimeout(scheduleRefresh,0);return result};
  Storage.prototype.__class9ProgressPatched=true;
 }
 window.addEventListener('class9-progress-updated',scheduleRefresh);
 window.addEventListener('hindi-progress-updated',scheduleRefresh);
 window.addEventListener('storage',event=>{if(['class9-progress','class9-sessions','class9-learning-progress','class9-hindi-chapter-progress-v1'].includes(event.key))scheduleRefresh()});
}

if(typeof window!=='undefined'){
 try{captureExistingSources()}catch{}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
}

export {SUBJECTS,MODEL_KEY,EVENTS_KEY};
