import {SUBJECT_REGISTRY,STAGES,resolveSubject,resolveTopic} from './subjectProgressRegistry';
import {getCanonicalProgress,recordCanonicalStage,recordCanonicalQuizAttempt,CANONICAL_KEY} from './engines/progress/progressStore';

const ANON_ID_KEY='class9-anonymous-student-id';
const STYLE_ID='class9-subject-progress-styles';
const readJson=(key,fallback)=>{try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw):fallback}catch{return fallback}};
const safeObject=value=>value&&typeof value==='object'&&!Array.isArray(value)?value:{};
const safeNum=(value,fallback=0)=>Number.isFinite(Number(value))?Number(value):fallback;

function getStudentId(){try{return localStorage.getItem(ANON_ID_KEY)||''}catch{return ''}}
function canonicalTopicKey(subjectId,topicId){return `${subjectId}::${topicId}`;}
function readCanonicalTopics(){return safeObject(getCanonicalProgress()?.topics);}
function alreadyRecorded(subject,chapter,stage){const topic=resolveTopic(subject,chapter);const subjectRecord=resolveSubject(subject);if(!subjectRecord||!topic)return true;return Boolean(readCanonicalTopics()[canonicalTopicKey(subjectRecord.id,topic.id)]?.stages?.[stage]);}
function sessionIdentity(session){return [session?.at??'',session?.subject??'',session?.chapter??'',session?.mode??'',session?.score??session?.correct??'',session?.total??'',session?.percent??'',session?.attempted??''].join('|');}

function syncLegacyProgress(){
 const generic=readJson('class9-learning-progress',{});
 Object.entries(safeObject(generic)).forEach(([key,value])=>{
  const parts=String(key).split('::');
  const subject=parts.shift()||'';const chapter=parts.join('::');const row=safeObject(value);
  STAGES.forEach(stage=>{if(row[stage]&&!alreadyRecorded(subject,chapter,stage))recordCanonicalStage({subject,chapter,stage,attempts:safeNum(row.attempts),correct:safeNum(row.correct),at:row.lastActivityAt||new Date().toISOString()});});
 });
 const allSessions=[];const app=readJson('class9-progress',{});if(Array.isArray(app?.sessions))allSessions.push(...app.sessions);const engine=readJson('class9-sessions',[]);if(Array.isArray(engine))allSessions.push(...engine);
 const seen=new Set();
 allSessions.forEach(session=>{
  if(!session?.completed)return;
  const stage=STAGES.includes(session.mode)?session.mode:null;if(!stage||!session.subject||session.chapter==null)return;
  const identity=sessionIdentity(session);if(seen.has(identity))return;seen.add(identity);
  const correctAnswers=safeNum(session.correct??session.score);
  const questionsTotal=Math.max(safeNum(session.total),correctAnswers);
  const questionsAnswered=Math.max(0,Math.min(questionsTotal,safeNum(session.attempted??session.total)));
  const percent=questionsAnswered?Math.round((correctAnswers/questionsAnswered)*100):safeNum(session.percent);
  recordCanonicalQuizAttempt({subject:session.subject,chapter:session.chapter,stage,attemptId:identity,questionsAnswered,questionsTotal,correctAnswers,percent,at:session.at?new Date(session.at).toISOString():new Date().toISOString()});
 });
 const hindi=readJson('class9-hindi-chapter-progress-v1',{});
 Object.entries(safeObject(hindi?.modes)).forEach(([id,modes])=>Object.entries(safeObject(modes)).forEach(([stage,done])=>{if(done&&!alreadyRecorded('हिन्दी',id,stage)&&!alreadyRecorded('हिन्दी',hindi?.completed?.[id]||id,stage))recordCanonicalStage({subject:'हिन्दी',chapter:id,stage,at:new Date().toISOString()});}));
 return getCanonicalProgress();
}

export function getSubjectProgress(){
 syncLegacyProgress();
 const topics=readCanonicalTopics();
 return Object.fromEntries(SUBJECT_REGISTRY.map(subject=>{
  const rows=subject.topics.map(topic=>topics[canonicalTopicKey(subject.id,topic.id)]||null);
  const completedStages=rows.reduce((sum,row)=>sum+STAGES.filter(stage=>row?.stages?.[stage]).length,0);
  const chapterStarted=rows.filter(row=>STAGES.some(stage=>row?.stages?.[stage])).length;
  const fullyCompleted=rows.filter(row=>STAGES.every(stage=>row?.stages?.[stage])).length;
  const attempts=rows.reduce((sum,row)=>sum+safeNum(row?.attempts),0);
  const correct=rows.reduce((sum,row)=>sum+safeNum(row?.correct),0);
  const analytics=rows.map(row=>safeObject(row?.analytics));
  const quizAttempts=analytics.reduce((sum,a)=>sum+safeNum(a.quizAttempts),0);
  const questionsAnswered=analytics.reduce((sum,a)=>sum+safeNum(a.questionsAnswered),0);
  const correctAnswers=analytics.reduce((sum,a)=>sum+safeNum(a.correctAnswers),0);
  const accuracy=questionsAnswered?Math.round((correctAnswers/questionsAnswered)*100):0;
  const percent=Math.round((completedStages/(subject.topics.length*STAGES.length))*100);
  const updatedAt=rows.reduce((latest,row)=>row?.lastActivityAt&&(!latest||row.lastActivityAt>latest)?row.lastActivityAt:latest,null);
  return [subject.id,{id:subject.id,name:subject.name,total:subject.topics.length,completedStages,chapterStarted,fullyCompleted,attempts,correct,quizAttempts,questionsAnswered,correctAnswers,accuracy,percent,updatedAt,topics:subject.topics.map(topic=>({id:topic.id,title:topic.title,order:topic.order,progress:Math.round((STAGES.filter(stage=>topics[canonicalTopicKey(subject.id,topic.id)]?.stages?.[stage]).length/STAGES.length)*100)}))}];
 }));
}

function installStyles(){
 if(document.getElementById(STYLE_ID))return;
 const style=document.createElement('style');style.id=STYLE_ID;style.textContent=`
 .spui-panel{margin-top:26px;padding:22px;border:1px solid #e4e8ef;border-radius:24px;background:linear-gradient(145deg,rgba(255,255,255,.96),rgba(248,250,255,.96));box-shadow:0 12px 34px rgba(22,32,48,.075);animation:spuiEnter .5s ease both}.spui-head{display:flex;justify-content:space-between;align-items:flex-start;gap:18px;margin-bottom:17px}.spui-eyebrow{display:block;color:#7a8496;font-size:.66rem;font-weight:950;letter-spacing:.15em}.spui-head h2{margin:6px 0 4px;font-size:1.55rem;letter-spacing:-.03em;color:#1c2739}.spui-head p{margin:0;color:#728095;font-size:.8rem;line-height:1.5}.spui-live{flex:0 0 auto;padding:7px 9px;border-radius:999px;background:#ecf9f4;border:1px solid #d4eee4;color:#208666;font-size:.62rem;font-weight:950;letter-spacing:.08em;box-shadow:0 4px 12px rgba(32,134,102,.06);animation:spuiPulse 2.6s ease-in-out infinite}.spui-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px}.spui-card{display:flex;align-items:center;gap:12px;width:100%;padding:14px;border:1px solid #e6eaf1;border-radius:17px;background:#fff;color:#1c2739;text-align:left;cursor:pointer;box-shadow:0 5px 16px rgba(20,30,45,.045);transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease}.spui-card:hover{transform:translateY(-3px);border-color:#d7ddef;box-shadow:0 11px 24px rgba(20,30,45,.09)}.spui-card:active{transform:scale(.99)}.spui-icon{width:42px;height:42px;border-radius:13px;display:grid;place-items:center;background:#eef0ff;color:#5967e8;font-weight:950;font-size:20px;flex:0 0 auto;box-shadow:inset 0 1px 0 rgba(255,255,255,.8)}.spui-card:nth-child(2) .spui-icon{background:#eaf5ff;color:#1878c6}.spui-card:nth-child(3) .spui-icon{background:#fff1e6;color:#d56d22}.spui-card:nth-child(4) .spui-icon{background:#ffebf1;color:#c94b70}.spui-card:nth-child(5) .spui-icon{background:#eaf8f0;color:#198450}.spui-card:nth-child(6) .spui-icon{background:#e7f8ff;color:#157b9a}.spui-card:nth-child(7) .spui-icon{background:#fff5dc;color:#a26f08}.spui-main{min-width:0;flex:1}.spui-title{display:flex;justify-content:space-between;gap:10px;align-items:center}.spui-title strong{font-size:.94rem}.spui-title b{font-size:.84rem;color:#5664df}.spui-bar{display:block;height:7px;margin:8px 0 6px;background:#edf0f5;border-radius:999px;overflow:hidden}.spui-bar i{display:block;height:100%;width:0;border-radius:inherit;background:linear-gradient(90deg,#6271ea,#8b81f4,#54bfd5);box-shadow:0 0 12px rgba(91,108,226,.2);transition:width .55s cubic-bezier(.2,.75,.25,1)}.spui-meta{display:flex;justify-content:space-between;gap:8px;color:#7b8698;font-size:.66rem;line-height:1.3}.spui-meta em{font-style:normal;color:#27825f;font-weight:800}.spui-arrow{font-size:18px;color:#9aa3af;transition:transform .2s ease,color .2s ease}.spui-card:hover .spui-arrow{transform:translateX(4px);color:#5664df}.spui-footer{display:flex;justify-content:space-between;gap:12px;margin-top:14px;padding-top:13px;border-top:1px solid #edf0f4;color:#8791a0;font-size:.62rem}.spui-footer span:last-child{color:#5d6bde;font-weight:800}@keyframes spuiEnter{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}@keyframes spuiPulse{0%,100%{opacity:.72;transform:scale(1)}50%{opacity:1;transform:scale(1.035)}}@media(max-width:780px){.spui-panel{padding:17px;border-radius:20px}.spui-grid{grid-template-columns:1fr}.spui-head h2{font-size:1.35rem}.spui-footer{flex-direction:column;gap:4px}}@media(prefers-reduced-motion:reduce){.spui-panel,.spui-live{animation:none!important}.spui-card{transition:none!important}}
 `;document.head.appendChild(style);
}

function render(){
 if(location.search&&!location.search.includes('page=home'))return;
 const dashboard=document.querySelector('.app-shell .dashboard');const offering=document.querySelector('.app-shell .offering-grid');if(!dashboard||!offering)return;
 installStyles();let panel=document.getElementById('class9-subject-progress');if(!panel){panel=document.createElement('section');panel.id='class9-subject-progress';panel.className='spui-panel';offering.insertAdjacentElement('afterend',panel)}
 const subjects=getSubjectProgress();
 const html=`<div class="spui-head"><div><span class="spui-eyebrow">YOUR PREPARATION</span><h2>विषयवार प्रगति</h2><p>हर विषय में सीखने, अभ्यास, चुनौती और टेस्ट की प्रगति एक जगह देखें।</p></div><span class="spui-live">● LIVE</span></div><div class="spui-grid">${SUBJECT_REGISTRY.map(subject=>{const row=subjects[subject.id];const analyticsLabel=row.quizAttempts?`${row.quizAttempts} quiz attempts • ${row.accuracy}% accuracy`:`${row.chapterStarted}/${row.total} topics started`;return `<button type="button" class="spui-card" data-subject="${subject.id}" aria-label="${subject.name} progress ${row.percent}%"><span class="spui-icon">${subject.id==='math'?'∑':subject.id==='science'?'⚗':subject.id==='hindi'?'अ':subject.id==='sanskrit'?'ॐ':subject.id==='sst'?'◎':subject.id==='english'?'A':'?'}</span><span class="spui-main"><span class="spui-title"><strong>${subject.name}</strong><b>${row.percent}%</b></span><span class="spui-bar"><i style="width:${row.percent}%"></i></span><span class="spui-meta"><span>${analyticsLabel}</span><em>${row.fullyCompleted} complete</em></span></span><span class="spui-arrow">→</span></button>`}).join('')}</div><div class="spui-footer"><span>📊 Live from saved learning activity</span><span>Progress + quiz analytics • Canonical</span></div>`;
 if(panel.innerHTML!==html)panel.innerHTML=html;
 panel.querySelectorAll('[data-subject]').forEach(button=>button.onclick=()=>{const id=button.getAttribute('data-subject');history.pushState({},'',`${location.pathname}?page=subject&subject=${encodeURIComponent(id)}`);window.dispatchEvent(new PopStateEvent('popstate'))});
}

let scheduled=false;function scheduleRefresh(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;render()})}
function install(){render();const observer=new MutationObserver(scheduleRefresh);observer.observe(document.body,{childList:true,subtree:true});window.addEventListener('class9-progress-updated',scheduleRefresh);window.addEventListener('hindi-progress-updated',scheduleRefresh);window.addEventListener('storage',event=>{if(['class9-progress','class9-sessions','class9-learning-progress','class9-hindi-chapter-progress-v1',CANONICAL_KEY].includes(event.key))scheduleRefresh()})}

export {SUBJECT_REGISTRY,CANONICAL_KEY,getStudentId};
if(typeof window!=='undefined'){try{syncLegacyProgress()}catch{};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install()}
