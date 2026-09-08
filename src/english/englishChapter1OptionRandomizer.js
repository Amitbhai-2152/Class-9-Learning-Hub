const stripChoiceLabel=text=>text.replace(/^[A-D]\.\s*/,'').trim();

function shuffleInPlace(items){
  for(let i=items.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [items[i],items[j]]=[items[j],items[i]];
  }
  return items;
}

function randomizeOptionGroup(group){
  const buttons=[...group.querySelectorAll('button.pg-option')];
  if(buttons.length!==4||buttons.some(button=>button.disabled))return;

  const signature=buttons.map(button=>stripChoiceLabel(button.textContent||'')).join('\u241f');
  if(group.dataset.randomizedSignature===signature)return;

  shuffleInPlace(buttons);
  buttons.forEach((button,index)=>{
    const label=button.querySelector('span');
    if(label)label.textContent=String.fromCharCode(65+index);
  });
  group.append(...buttons);
  group.dataset.randomizedSignature=signature;
}

function isChapter1(root){
  const title=root.querySelector('.pg-hero h1');
  return title?.textContent?.trim()==='Dharam Juddha';
}

function apply(){
  const shells=[...document.querySelectorAll('.pg-shell')];
  shells.filter(isChapter1).forEach(shell=>{
    shell.querySelectorAll('.pg-options').forEach(randomizeOptionGroup);
  });
}

if(typeof document!=='undefined'){
  const observer=new MutationObserver(()=>apply());
  const start=()=>{
    apply();
    observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['disabled']});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
}
