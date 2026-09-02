const MODE_KEYS={
  '📖 सीखें':'learn',
  '📝 अभ्यास':'practice',
  '🔥 चुनौती':'challenge',
  '🎯 टेस्ट':'test'
};
const MODE_LABELS={learn:'सीखें',practice:'अभ्यास',challenge:'चुनौती',test:'टेस्ट'};
const STORAGE_KEY='class9-requested-science-mode';

function isScienceSubjectPage(){
  const header=document.querySelector('.page-header h1');
  return header?.textContent?.trim()==='विज्ञान' && Boolean(document.querySelector('.subject-section .chapter-grid'));
}

function launchRequestedMode(){
  const mode=sessionStorage.getItem(STORAGE_KEY);
  if(!mode)return;
  const label=MODE_LABELS[mode];
  if(!label)return;
  const buttons=[...document.querySelectorAll('button')];
  const target=buttons.find(button=>button.textContent.replace(/\s+/g,' ').includes(label));
  if(!target)return false;
  sessionStorage.removeItem(STORAGE_KEY);
  target.click();
  return true;
}

document.addEventListener('click',event=>{
  const action=event.target?.closest?.('.subject-section .chapter-card .chapter-actions span');
  if(!action||!isScienceSubjectPage())return;
  const raw=action.textContent.replace(/\s+/g,' ').trim();
  const mode=MODE_KEYS[raw]||Object.entries(MODE_LABELS).find(([,label])=>raw.includes(label))?.[0];
  if(!mode)return;
  sessionStorage.setItem(STORAGE_KEY,mode);
  window.setTimeout(()=>{
    if(launchRequestedMode())return;
    const observer=new MutationObserver(()=>{
      if(launchRequestedMode())observer.disconnect();
    });
    observer.observe(document.body,{childList:true,subtree:true});
    window.setTimeout(()=>observer.disconnect(),3000);
  },30);
},{capture:true});
