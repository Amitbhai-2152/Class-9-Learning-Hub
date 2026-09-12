const STYLE_ID='class9-mobile-nav-style';
const MENU_ID='class9-mobile-nav';

function go(page){
  const url=new URL(window.location.href);
  url.search='';
  if(page)url.searchParams.set('page',page);
  window.history.pushState({},'',url.toString());
  window.dispatchEvent(new PopStateEvent('popstate'));
}

function closeMenu(){
  const menu=document.getElementById(MENU_ID);
  const button=document.getElementById('class9-mobile-nav-button');
  menu?.classList.remove('open');
  button?.setAttribute('aria-expanded','false');
}

function buildMenu(){
  const topbar=document.querySelector('.topbar');
  if(!topbar)return false;
  if(!document.getElementById('class9-mobile-nav-button')){
    const button=document.createElement('button');
    button.id='class9-mobile-nav-button';
    button.className='class9-mobile-nav-button';
    button.type='button';
    button.setAttribute('aria-label','Open navigation menu');
    button.setAttribute('aria-expanded','false');
    button.innerHTML='<span></span><span></span><span></span>';
    button.addEventListener('click',()=>{
      const menu=document.getElementById(MENU_ID);
      const open=!menu?.classList.contains('open');
      menu?.classList.toggle('open',open);
      button.setAttribute('aria-expanded',String(open));
    });
    topbar.appendChild(button);
  }
  if(!document.getElementById(MENU_ID)){
    const menu=document.createElement('div');
    menu.id=MENU_ID;
    menu.className='class9-mobile-nav-panel';
    menu.innerHTML=`
      <div class="class9-mobile-nav-head"><strong>कक्षा 9</strong><span>Navigation</span></div>
      <div class="class9-mobile-nav-stats"></div>
      <button data-nav="classes"><span>▣</span><span><b>सभी कक्षाएँ</b><small>सभी विषय और अध्याय</small></span><i>›</i></button>
      <button data-nav="cbt"><span>✎</span><span><b>Test Centre</b><small>अभ्यास और BSEB CBT</small></span><i>›</i></button>
      <button data-nav="meter"><span>◔</span><span><b>तैयारी मीटर</b><small>अपनी तैयारी की स्थिति देखें</small></span><i>›</i></button>
      <button data-nav="account"><span>◎</span><span><b>Account</b><small>Login, profile और security</small></span><i>›</i></button>`;
    menu.addEventListener('click',event=>{
      const item=event.target.closest('[data-nav]');
      if(!item)return;
      closeMenu();
      go(item.dataset.nav);
    });
    topbar.appendChild(menu);
  }
  refreshStats();
  return true;
}

function refreshStats(){
  const stats=document.querySelector('.top-stats');
  const target=document.querySelector('.class9-mobile-nav-stats');
  if(!stats||!target)return;
  const next=[...stats.children].map(node=>node.textContent.trim()).join('|');
  if(target.dataset.source===next)return;
  target.dataset.source=next;
  target.replaceChildren(...[...stats.children].map(node=>{
    const chip=document.createElement('span');
    chip.textContent=node.textContent.trim();
    return chip;
  }));
}

function injectStyle(){
  if(document.getElementById(STYLE_ID))return;
  const style=document.createElement('style');
  style.id=STYLE_ID;
  style.textContent=`
    .class9-mobile-nav-button{display:none;position:relative;width:44px;height:44px;margin-left:auto;border:1px solid rgba(99,102,241,.13);border-radius:13px;background:rgba(255,255,255,.9);box-shadow:0 8px 22px rgba(30,41,59,.08);cursor:pointer;padding:10px;z-index:95}
    .class9-mobile-nav-button span{display:block;height:2px;width:22px;margin:4px auto;border-radius:99px;background:#39445a;transition:transform .22s ease,opacity .22s ease}
    .class9-mobile-nav-button[aria-expanded="true"] span:nth-child(1){transform:translateY(6px) rotate(45deg)}
    .class9-mobile-nav-button[aria-expanded="true"] span:nth-child(2){opacity:0}
    .class9-mobile-nav-button[aria-expanded="true"] span:nth-child(3){transform:translateY(-6px) rotate(-45deg)}
    .class9-mobile-nav-panel{display:none;position:absolute;top:calc(100% + 9px);right:12px;width:min(330px,calc(100vw - 24px));padding:12px;border:1px solid rgba(99,102,241,.12);border-radius:20px;background:rgba(255,255,255,.97);box-shadow:0 22px 60px rgba(20,30,50,.18);backdrop-filter:blur(20px);transform-origin:top right;z-index:94}
    .class9-mobile-nav-panel.open{display:block;animation:class9MobileMenuIn .2s ease both}
    .class9-mobile-nav-head{display:flex;justify-content:space-between;align-items:center;padding:5px 6px 10px;border-bottom:1px solid #eef0f5}.class9-mobile-nav-head strong{font-size:15px}.class9-mobile-nav-head span{font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:#8992a2;font-weight:800}
    .class9-mobile-nav-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;padding:10px 2px}.class9-mobile-nav-stats span{padding:8px 6px;text-align:center;border-radius:11px;background:#f5f6fa;color:#5a6578;font-size:10px;font-weight:800}
    .class9-mobile-nav-panel>button{width:100%;display:flex;align-items:center;gap:11px;padding:12px 9px;border:0;background:transparent;border-radius:13px;text-align:left;color:#202a3b;cursor:pointer}.class9-mobile-nav-panel>button:hover{background:#f5f7ff}.class9-mobile-nav-panel>button>span:first-child{width:36px;height:36px;display:grid;place-items:center;border-radius:11px;background:#eef2ff;color:#5563df;font-size:17px;flex:0 0 auto}.class9-mobile-nav-panel>button>span:nth-child(2){display:flex;flex-direction:column;gap:2px;min-width:0}.class9-mobile-nav-panel b{font-size:12px}.class9-mobile-nav-panel small{font-size:9px;color:#7a8495}.class9-mobile-nav-panel i{margin-left:auto;font-style:normal;color:#9aa2b0;font-size:21px}
    .auth-nav-chip>span:last-child{font-size:0}.auth-nav-chip>span:last-child:after{content:'Account';font-size:12px}
    .auth-page .auth-card{width:100%;max-width:480px}.auth-page .auth-primary-button,.auth-page .auth-link-button,.auth-page .auth-tabs button,.auth-page .auth-danger-button{min-height:46px}.auth-page .auth-tabs button{display:flex;align-items:center;justify-content:center}.auth-page .password-wrap button{min-height:34px}
    @media(max-width:900px){.auth-shell{grid-template-columns:minmax(0,1fr) minmax(320px,.78fr);gap:28px}.auth-showcase h1{font-size:clamp(34px,6vw,52px)}.auth-visual-card{margin-top:32px}}
    @media(max-width:760px){
      .topbar{height:60px;padding:0 12px 0 16px;gap:10px}.topbar .top-stats{display:none}.auth-global-entry{display:none!important}.class9-mobile-nav-button{display:block}.topbar .nav-class{font-size:12px;margin-right:2px}.topbar .brand{font-size:17px}
      .auth-page{padding:12px}.auth-shell{display:block;min-height:auto;width:min(620px,100%);padding-top:44px}.auth-shell:after{inset:3% 0 0;border-radius:25px}.auth-showcase{padding:18px 3px 12px}.auth-showcase h1{font-size:clamp(34px,10vw,48px)}.auth-showcase>p{font-size:14px;line-height:1.6}.auth-feature-row{margin-top:16px}.auth-feature-row span{font-size:10px;padding:7px 9px}.auth-visual-card{display:none}.auth-card{padding:22px 18px;border-radius:24px}.auth-card h2{font-size:24px}.auth-tabs{margin:17px 0 18px}.auth-card label{margin:12px 0}.auth-card input{min-height:46px}.auth-primary-button{padding:12px 14px;font-size:14px}.auth-back{top:0}.account-hero{padding:20px;gap:12px;align-items:flex-start}.account-avatar{width:54px;height:54px;font-size:23px}.account-hero h1{font-size:24px}.account-grid{grid-template-columns:1fr}.account-card-primary{grid-column:auto}.verified-pill{font-size:9px;padding:6px 8px}
    }
    @media(max-width:430px){.auth-page{padding:9px}.auth-card{padding:18px 14px}.auth-showcase h1{font-size:32px}.auth-feature-row{gap:6px}.auth-feature-row span{font-size:9px}.auth-tabs{gap:3px}.auth-tabs button{font-size:12px;padding:9px 7px}.auth-primary-button{font-size:13px}.class9-mobile-nav-panel{right:7px}.class9-mobile-nav-stats span{font-size:9px;padding:7px 3px}}
    @keyframes class9MobileMenuIn{from{opacity:0;transform:translateY(-7px) scale(.98)}to{opacity:1;transform:none}}
    @media(prefers-reduced-motion:reduce){.class9-mobile-nav-panel.open{animation:none}.class9-mobile-nav-button span{transition:none}}
  `;
  document.head.appendChild(style);
}

function boot(){
  injectStyle();
  if(buildMenu())return true;
  return false;
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',()=>{
    if(!boot())window.setTimeout(boot,0);
  },{once:true});
}else{
  boot();
}
