const CONTAINER_SELECTOR='.pg-quiz-wrap .pg-options';
const BUTTON_SELECTOR='.pg-option';

function signature(container){
  return [...container.querySelectorAll(BUTTON_SELECTOR)].map(button=>button.textContent?.trim()||'').join('¦');
}

function randomize(container){
  const buttons=[...container.querySelectorAll(BUTTON_SELECTOR)];
  if(buttons.length<2)return;
  const sig=signature(container);
  if(!sig||container.dataset.panoramaRandomSignature===sig)return;

  const order=buttons.map((_,i)=>i);
  for(let i=order.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [order[i],order[j]]=[order[j],order[i]];
  }
  if(order.every((value,index)=>value===index)){
    [order[0],order[1]]=[order[1],order[0]];
  }

  buttons.forEach((button,index)=>{
    button.style.order=String(order.indexOf(index)+1);
  });
  container.dataset.panoramaRandomSignature=sig;
}

function scan(){
  document.querySelectorAll(CONTAINER_SELECTOR).forEach(randomize);
}

let observer;
export function installPanoramaChapter1RuntimeRandomizer(){
  if(observer)return;
  scan();
  observer=new MutationObserver(scan);
  observer.observe(document.body,{subtree:true,childList:true,characterData:true});
}

if(typeof document!=='undefined'){
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',installPanoramaChapter1RuntimeRandomizer,{once:true});
  else installPanoramaChapter1RuntimeRandomizer();
}