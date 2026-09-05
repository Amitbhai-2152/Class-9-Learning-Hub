const KEY='class9-reload-route-v1';
const clean=s=>String(s||'').replace(/\s+/g,' ').trim();
const save=route=>{try{sessionStorage.setItem(KEY,JSON.stringify(route));}catch{}};
const load=()=>{try{const v=JSON.parse(sessionStorage.getItem(KEY)||'null');return Array.isArray(v)?v:[]}catch{return[]}};
const signature=button=>clean(button?.innerText||button?.textContent);
const isForwardButton=button=>button?.tagName==='BUTTON'&&!button.disabled;
const isOffering=button=>button.matches('.offering-card');
const isSubject=button=>button.matches('.subject-tile');
const isMode=button=>button.matches('.hindi-mode-tab');
const isBack=button=>/←|वापस|लौटें|होम/.test(signature(button));
let route=load();
function track(button){
  if(!isForwardButton(button))return;
  const text=signature(button);
  if(!text||isBack(button))return;
  if(isOffering(button)){
    if(/सभी\s*कक्षाएँ/.test(text))route=['सभी कक्षाएँ'];
    else if(/सभी\s*टेस्ट/.test(text))route=['सभी टेस्ट'];
    else if(/तैयारी\s*मीटर/.test(text))route=['तैयारी मीटर'];
    save(route);return;
  }
  if(isSubject(button)){
    route=route[0]==='सभी कक्षाएँ'?[route[0],text]:[text];
    save(route);return;
  }
  if(isMode(button)){
    if(route.length>=3)route=[...route.slice(0,3),text];
    save(route);return;
  }
  if(route.length===2){
    route=[...route,text];
    save(route);
  }
}
document.addEventListener('click',e=>track(e.target.closest('button')),true);
function findButton(text){
  const target=clean(text);
  return [...document.querySelectorAll('button')].find(b=>clean(b.innerText||b.textContent)===target&&!b.disabled);
}
function replay(){
  const saved=load();
  if(!saved.length)return;
  let index=0;
  const tick=()=>{
    if(index>=saved.length)return;
    const button=findButton(saved[index]);
    if(!button){setTimeout(tick,100);return;}
    index+=1;
    button.click();
    setTimeout(tick,150);
  };
  setTimeout(tick,100);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',replay,{once:true});
else replay();
