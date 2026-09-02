const MODE_KEYS={
  '📖 सीखें':'learn',
  '📝 अभ्यास':'practice',
  '🔥 चुनौती':'challenge',
  '🎯 टेस्ट':'test'
};
const MODE_LABELS={learn:'सीखें',practice:'अभ्यास',challenge:'चुनौती',test:'टेस्ट'};
const STORAGE_KEY='class9-requested-science-mode';
const MATH_STORAGE_KEY='class9-requested-math-mode';
let launchGeneration=0;
let launchTimer=0;
let launchObserver=null;
let mathLaunchGeneration=0;
let mathLaunchTimer=0;
let mathLaunchObserver=null;

function clearPendingLaunch(){
  launchGeneration+=1;
  if(launchTimer)window.clearTimeout(launchTimer);
  launchTimer=0;
  if(launchObserver){launchObserver.disconnect();launchObserver=null;}
  try{sessionStorage.removeItem(STORAGE_KEY)}catch{}
}

function clearPendingMathLaunch(){
  mathLaunchGeneration+=1;
  if(mathLaunchTimer)window.clearTimeout(mathLaunchTimer);
  mathLaunchTimer=0;
  if(mathLaunchObserver){mathLaunchObserver.disconnect();mathLaunchObserver=null;}
  try{sessionStorage.removeItem(MATH_STORAGE_KEY)}catch{}
}

function isScienceSubjectPage(){
  const header=document.querySelector('.page-header h1');
  return header?.textContent?.trim()==='विज्ञान'&&Boolean(document.querySelector('.subject-section .chapter-grid'));
}

function isMathSubjectPage(){
  const header=document.querySelector('.page-header h1');
  return header?.textContent?.trim()==='गणित'&&Boolean(document.querySelector('.math-section-wrap .chapter-grid'));
}

function isScienceChapterLaunch(){
  return Boolean(document.querySelector('.science-chapter-page .science-mode-grid'));
}

function isMathChapterLaunch(){
  return Boolean(document.querySelector('.chapter-hero-card')&&document.querySelector('.mode-grid'))&&!isScienceChapterLaunch();
}

function findModeButton(mode){
  const label=MODE_LABELS[mode];
  if(!label)return null;
  return [...document.querySelectorAll('.science-mode-grid button,.c7-mode-list button,.mode-grid button')]
    .find(button=>button.textContent.replace(/\s+/g,' ').includes(label))||null;
}

function launchRequestedMode(generation){
  if(generation!==launchGeneration||!isScienceChapterLaunch())return false;
  let mode=null;
  try{mode=sessionStorage.getItem(STORAGE_KEY)}catch{}
  if(!mode)return false;
  const target=findModeButton(mode);
  if(!target)return false;
  clearPendingLaunch();
  target.click();
  return true;
}

function launchRequestedMathMode(generation){
  if(generation!==mathLaunchGeneration||!isMathChapterLaunch())return false;
  let mode=null;
  try{mode=sessionStorage.getItem(MATH_STORAGE_KEY)}catch{}
  if(!mode)return false;
  const target=findModeButton(mode);
  if(!target)return false;
  clearPendingMathLaunch();
  target.click();
  return true;
}

function scheduleRequestedModeLaunch(){
  const generation=launchGeneration;
  launchTimer=window.setTimeout(()=>{
    launchTimer=0;
    if(launchRequestedMode(generation))return;
    if(generation!==launchGeneration||!isScienceChapterLaunch())return;
    launchObserver=new MutationObserver(()=>{
      if(launchRequestedMode(generation)&&launchObserver){launchObserver.disconnect();launchObserver=null;}
    });
    launchObserver.observe(document.body,{childList:true,subtree:true});
    window.setTimeout(()=>{
      if(generation===launchGeneration&&launchObserver){launchObserver.disconnect();launchObserver=null;}
    },3000);
  },30);
}

function scheduleRequestedMathModeLaunch(){
  const generation=mathLaunchGeneration;
  mathLaunchTimer=window.setTimeout(()=>{
    mathLaunchTimer=0;
    if(launchRequestedMathMode(generation))return;
    if(generation!==mathLaunchGeneration||!isMathChapterLaunch())return;
    mathLaunchObserver=new MutationObserver(()=>{
      if(launchRequestedMathMode(generation)&&mathLaunchObserver){mathLaunchObserver.disconnect();mathLaunchObserver=null;}
    });
    mathLaunchObserver.observe(document.body,{childList:true,subtree:true});
    window.setTimeout(()=>{
      if(generation===mathLaunchGeneration&&mathLaunchObserver){mathLaunchObserver.disconnect();mathLaunchObserver=null;}
    },3000);
  },30);
}

function prepareScienceModeActions(){
  if(!isScienceSubjectPage())return;
  document.querySelectorAll('.subject-section .chapter-card .chapter-actions span').forEach(action=>{
    if(action.dataset.scienceActionPrepared==='1')return;
    const raw=action.textContent.replace(/\s+/g,' ').trim();
    const mode=MODE_KEYS[raw]||Object.entries(MODE_LABELS).find(([,label])=>raw.includes(label))?.[0];
    if(!mode)return;
    action.dataset.scienceActionPrepared='1';
    action.dataset.scienceMode=mode;
    action.setAttribute('role','button');
    action.setAttribute('tabindex','0');
    action.setAttribute('aria-label',`${MODE_LABELS[mode]} शुरू करें`);
  });
}

function prepareMathModeActions(){
  if(!isMathSubjectPage())return;
  document.querySelectorAll('.math-section-wrap .chapter-card .chapter-actions span').forEach(action=>{
    if(action.dataset.mathActionPrepared==='1')return;
    const raw=action.textContent.replace(/\s+/g,' ').trim();
    const mode=MODE_KEYS[raw]||Object.entries(MODE_LABELS).find(([,label])=>raw.includes(label))?.[0];
    if(!mode)return;
    action.dataset.mathActionPrepared='1';
    action.dataset.mathMode=mode;
    action.setAttribute('role','button');
    action.setAttribute('tabindex','0');
    action.setAttribute('aria-label',`${MODE_LABELS[mode]} शुरू करें`);
  });
}

function activateScienceModeAction(action){
  if(!action)return;
  const card=action.closest('.chapter-card');
  if(!card||!isScienceSubjectPage())return;
  const mode=action.dataset.scienceMode;
  if(!mode)return;
  clearPendingLaunch();
  try{sessionStorage.setItem(STORAGE_KEY,mode)}catch{}
  action.classList.remove('science-action-pressed');
  void action.offsetWidth;
  action.classList.add('science-action-pressed');
  scheduleRequestedModeLaunch();
  card.click();
}

function activateMathModeAction(action){
  if(!action)return;
  const card=action.closest('.chapter-card');
  if(!card||!isMathSubjectPage())return;
  const mode=action.dataset.mathMode;
  if(!mode)return;
  clearPendingMathLaunch();
  try{sessionStorage.setItem(MATH_STORAGE_KEY,mode)}catch{}
  action.classList.remove('science-action-pressed');
  void action.offsetWidth;
  action.classList.add('science-action-pressed');
  scheduleRequestedMathModeLaunch();
  card.click();
}

document.addEventListener('click',event=>{
  const target=event.target?.closest?.('button');
  if(!target)return;

  const completedLearnAction=target.textContent.replace(/\s+/g,' ').trim();
  if(completedLearnAction==='अभ्यास पर जाएँ →'&&document.querySelector('.science-learn-page')&&document.querySelector('.science-learn-page h1')?.textContent.includes('अध्याय पूरा हुआ')){
    event.preventDefault();
    event.stopImmediatePropagation();
    const chapterButton=[...document.querySelectorAll('.science-learn-page button')]
      .find(button=>button.textContent.replace(/\s+/g,' ').trim()==='← अध्याय');
    chapterButton?.click();
    return;
  }

  prepareScienceModeActions();
  prepareMathModeActions();

  const scienceAction=event.target?.closest?.('.subject-section .chapter-card .chapter-actions span');
  if(scienceAction&&isScienceSubjectPage()){
    event.preventDefault();
    event.stopImmediatePropagation();
    activateScienceModeAction(scienceAction);
    return;
  }

  const mathAction=event.target?.closest?.('.math-section-wrap .chapter-card .chapter-actions span');
  if(mathAction&&isMathSubjectPage()){
    event.preventDefault();
    event.stopImmediatePropagation();
    activateMathModeAction(mathAction);
    return;
  }

  if(!isScienceChapterLaunch()&&!isScienceSubjectPage())clearPendingLaunch();
  if(!isMathChapterLaunch()&&!isMathSubjectPage())clearPendingMathLaunch();
},{capture:true});

document.addEventListener('keydown',event=>{
  if(event.key!=='Enter'&&event.key!==' ')return;

  if(isScienceSubjectPage()){
    const scienceAction=event.target?.closest?.('.subject-section .chapter-card .chapter-actions span');
    if(scienceAction&&scienceAction.dataset.scienceMode){
      event.preventDefault();
      event.stopImmediatePropagation();
      activateScienceModeAction(scienceAction);
      return;
    }
  }

  if(isMathSubjectPage()){
    const mathAction=event.target?.closest?.('.math-section-wrap .chapter-card .chapter-actions span');
    if(mathAction&&mathAction.dataset.mathMode){
      event.preventDefault();
      event.stopImmediatePropagation();
      activateMathModeAction(mathAction);
    }
  }
},{capture:true});

new MutationObserver(()=>{prepareScienceModeActions();prepareMathModeActions();}).observe(document.body,{childList:true,subtree:true});
