const MODE_KEYS={
  '📖 सीखें':'learn',
  '📝 अभ्यास':'practice',
  '🔥 चुनौती':'challenge',
  '🎯 टेस्ट':'test'
};
const MODE_LABELS={learn:'सीखें',practice:'अभ्यास',challenge:'चुनौती',test:'टेस्ट'};
const STORAGE_KEY='class9-requested-science-mode';
let launchGeneration=0;
let launchTimer=0;
let launchObserver=null;

function clearPendingLaunch(){
  launchGeneration+=1;
  if(launchTimer)window.clearTimeout(launchTimer);
  launchTimer=0;
  if(launchObserver){launchObserver.disconnect();launchObserver=null;}
  try{sessionStorage.removeItem(STORAGE_KEY)}catch{}
}

function isScienceSubjectPage(){
  const header=document.querySelector('.page-header h1');
  return header?.textContent?.trim()==='विज्ञान'&&Boolean(document.querySelector('.subject-section .chapter-grid'));
}

function isScienceChapterLaunch(){
  return Boolean(document.querySelector('.science-chapter-page .science-mode-grid'));
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

function prepareScienceModeActions(){
  if(!isScienceSubjectPage())return;
  document.querySelectorAll('.subject-section .chapter-card .chapter-actions span').forEach((action,index)=>{
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
  const action=event.target?.closest?.('.subject-section .chapter-card .chapter-actions span');
  if(action&&isScienceSubjectPage()){
    event.preventDefault();
    event.stopImmediatePropagation();
    activateScienceModeAction(action);
    return;
  }

  if(!isScienceChapterLaunch()&&!isScienceSubjectPage())clearPendingLaunch();
},{capture:true});

document.addEventListener('keydown',event=>{
  if((event.key!=='Enter'&&event.key!==' ')||!isScienceSubjectPage())return;
  const action=event.target?.closest?.('.subject-section .chapter-card .chapter-actions span');
  if(!action||!action.dataset.scienceMode)return;
  event.preventDefault();
  event.stopImmediatePropagation();
  activateScienceModeAction(action);
},{capture:true});

new MutationObserver(()=>prepareScienceModeActions()).observe(document.body,{childList:true,subtree:true});
