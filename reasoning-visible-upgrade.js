(function(){
  'use strict';

  var STYLE_ID='reasoning-visible-upgrade-style';
  var PANEL_ID='reasoning-smart-solve-panel';

  function addStyles(){
    if(document.getElementById(STYLE_ID)) return;
    var s=document.createElement('style');
    s.id=STYLE_ID;
    s.textContent=`
      .rvs-panel{margin:16px 0 18px;border:1px solid #dbe6ef;border-radius:22px;background:linear-gradient(135deg,#f8fbfd,#eef7f8);padding:20px;box-shadow:0 10px 30px rgba(19,34,56,.06)}
      .rvs-head{display:flex;align-items:center;gap:10px;margin-bottom:14px}.rvs-badge{font-size:11px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;color:#176b87;background:#e4f3f5;padding:6px 9px;border-radius:999px}.rvs-title{margin:0;color:#132238;font-size:20px}
      .rvs-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.rvs-card{background:#fff;border:1px solid #e0e8ef;border-radius:16px;padding:13px}.rvs-card b{display:block;color:#132238;font-size:13px;margin-bottom:5px}.rvs-card span{display:block;color:#5f7185;font-size:12px;line-height:1.55}.rvs-example{margin-top:12px;padding:13px 14px;background:#132238;color:#fff;border-radius:15px;font-size:13px;line-height:1.6}.rvs-example strong{color:#d5f4f2}.rvs-check{margin-top:12px;color:#53657a;font-size:12px;line-height:1.6}
      @media(max-width:800px){.rvs-grid{grid-template-columns:1fr}.rvs-title{font-size:18px}}
    `;
    document.head.appendChild(s);
  }

  function chapterKey(root){
    var h=root.querySelector('.chapter-hero h2');
    return h ? (h.textContent||'').trim() : '';
  }

  function makePanel(kind){
    var panel=document.createElement('section');
    panel.className='rvs-panel';
    panel.id=PANEL_ID;

    if(kind==='number'){
      panel.innerHTML=`
        <div class="rvs-head"><span class="rvs-badge">Smart Solve</span><h3 class="rvs-title">संख्या श्रृंखला को 30 सेकंड में पढ़ने की रणनीति</h3></div>
        <div class="rvs-grid">
          <div class="rvs-card"><b>① Difference</b><span>पहले लगातार पदों का अंतर निकालें। +3, +5, −2 जैसे pattern देखें।</span></div>
          <div class="rvs-card"><b>② Ratio</b><span>अंतर साफ न हो तो ×2, ×3, ÷2 जैसे गुणा–भाग संबंध जाँचें।</span></div>
          <div class="rvs-card"><b>③ Higher pattern</b><span>फिर squares, cubes, बढ़ते differences और alternating rules जाँचें।</span></div>
        </div>
        <div class="rvs-example">✅ <strong>Worked example:</strong> 2, 5, 8, 11, ? → differences = +3, +3, +3 → अगला पद = <strong>14</strong></div>
        <div class="rvs-check"><strong>Exam check:</strong> उत्तर चुनने से पहले पूरे sequence पर वही rule दोबारा verify करें; केवल आखिरी दो पद देखकर अनुमान न लगाएँ।</div>`;
    }else{
      panel.innerHTML=`
        <div class="rvs-head"><span class="rvs-badge">Smart Solve</span><h3 class="rvs-title">अक्षर श्रृंखला को जल्दी पहचानने की रणनीति</h3></div>
        <div class="rvs-grid">
          <div class="rvs-card"><b>① Position</b><span>A=1, B=2 … Z=26 लिखकर अक्षरों को numbers में बदलें।</span></div>
          <div class="rvs-card"><b>② Jump</b><span>हर दो अक्षरों के बीच +2, +3, −2 जैसे jumps देखें।</span></div>
          <div class="rvs-card"><b>③ Advanced</b><span>फिर +1,+2,+3…, alternating और wrap-around patterns जाँचें।</span></div>
        </div>
        <div class="rvs-example">✅ <strong>Worked example:</strong> A, C, E, G, ? → positions 1,3,5,7 → हर बार +2 → अगला = <strong>I</strong></div>
        <div class="rvs-check"><strong>Exam check:</strong> jump की दिशा और size दोनों verify करें; एक ही pattern कम-से-कम 3 transitions पर लागू होना चाहिए।</div>`;
    }
    return panel;
  }

  function enhance(){
    addStyles();
    var root=document.querySelector('.reasoning-chapter');
    if(!root) return;
    var title=chapterKey(root);
    var kind=title.indexOf('संख्या श्रृंखला')!==-1?'number':title.indexOf('अक्षर श्रृंखला')!==-1?'alphabet':null;
    if(!kind) return;
    if(root.querySelector('#'+PANEL_ID)) return;
    var modes=root.querySelector('.mode-grid');
    var panel=makePanel(kind);
    if(modes) root.insertBefore(panel,modes);
    else root.appendChild(panel);
  }

  var last='';
  function run(){
    var root=document.querySelector('.reasoning-chapter');
    var title=root?chapterKey(root):'';
    var sig=title+'|'+!!root;
    if(sig!==last){last=sig;enhance();}
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run);
  else run();
  new MutationObserver(run).observe(document.documentElement,{subtree:true,childList:true});
})();
