(function(){
  var STYLE_ID='reasoning-visible-upgrade-style';
  var PANEL_CLASS='reasoning-enhanced-panel';
  var css='.'+PANEL_CLASS+'{margin:16px 0;border:1px solid #d8e6ef;border-radius:20px;padding:18px;background:linear-gradient(135deg,#f8fcff,#eef8f7);box-shadow:0 12px 30px rgba(19,34,56,.06)}.'+PANEL_CLASS+' .reu-head{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}.'+PANEL_CLASS+' .reu-title{font-weight:900;color:#132238;font-size:18px}.'+PANEL_CLASS+' .reu-badge{font-size:11px;font-weight:900;letter-spacing:.06em;padding:6px 9px;border-radius:999px;background:#132238;color:#fff}.'+PANEL_CLASS+' .reu-sub{margin:6px 0 14px;color:#586b80;line-height:1.6;font-size:13px}.'+PANEL_CLASS+' .reu-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.'+PANEL_CLASS+' .reu-card{padding:12px;background:#fff;border:1px solid #e0e8ef;border-radius:15px}.'+PANEL_CLASS+' .reu-card b{display:block;color:#132238;font-size:13px;margin-bottom:5px}.'+PANEL_CLASS+' .reu-card span{color:#64758a;font-size:12px;line-height:1.5}.'+PANEL_CLASS+' .reu-example{margin-top:13px;padding:12px 13px;border-radius:14px;background:#132238;color:#fff;line-height:1.6;font-size:13px}.'+PANEL_CLASS+' .reu-example strong{color:#fff}.'+PANEL_CLASS+' .reu-check{display:flex;flex-wrap:wrap;gap:7px;margin-top:12px}.'+PANEL_CLASS+' .reu-check span{font-size:11px;font-weight:800;padding:6px 8px;border-radius:999px;background:#fff;border:1px solid #dfe8ef;color:#40556a}@media(max-width:800px){.'+PANEL_CLASS+' .reu-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:520px){.'+PANEL_CLASS+' .reu-grid{grid-template-columns:1fr}}';
  function addStyle(){if(document.getElementById(STYLE_ID))return;var s=document.createElement('style');s.id=STYLE_ID;s.textContent=css;document.head.appendChild(s)}
  function enhance(){
    var chapter=document.querySelector('.reasoning-chapter');
    if(!chapter)return;
    var heading=chapter.querySelector('.chapter-hero h2');
    var title=(heading&&heading.textContent||'').trim();
    if(title!=='संख्या श्रृंखला'&&title!=='अक्षर श्रृंखला')return;
    if(chapter.querySelector('.'+PANEL_CLASS))return;
    var lesson=chapter.querySelector('.lesson-box');
    if(!lesson)return;
    var panel=document.createElement('section');panel.className=PANEL_CLASS;
    var number=title==='संख्या श्रृंखला';
    var cards=number?[
      ['① Pattern scan','पहले + / −, फिर × / ÷ का नियम जाँचें।'],
      ['② Difference','अंतर समान न हो तो differences की नई श्रृंखला देखें।'],
      ['③ Special rules','n², n³, ×2+1 और alternating pattern जाँचें।'],
      ['④ Verify','नियम को कम-से-कम 2–3 पदों पर लगाकर उत्तर पक्का करें।']
    ]:[
      ['① Position','A=1, B=2 … Z=26 लिखकर काम आसान करें।'],
      ['② Jump','हर अक्षर के बीच + या − jump निकालें।'],
      ['③ Changing jump','+1,+2,+3 या −2,−3,−4 जैसे pattern खोजें।'],
      ['④ Special pattern','A,Z,B,Y या wrap-around जैसे patterns देखें।']
    ];
    panel.innerHTML='<div class="reu-head"><span class="reu-title">🚀 Smart Solve Method</span><span class="reu-badge">ENHANCED</span></div><p class="reu-sub">'+(number?'हर श्रृंखला के लिए यही 4-step checklist इस्तेमाल करें — इससे guesswork कम होगा और rule जल्दी पकड़ेगा।':'अक्षरों को सीधे guess करने के बजाय position और jump method अपनाएँ — कठिन series भी व्यवस्थित तरीके से हल होगी।')+'</p><div class="reu-grid">'+cards.map(function(c){return '<div class="reu-card"><b>'+c[0]+'</b><span>'+c[1]+'</span></div>'}).join('')+'</div><div class="reu-example"><strong>Worked example:</strong> '+(number?'3, 7, 15, 31, 63, ? → ×2+1 → 127':'A, D, I, P, ? → positions 1,4,9,16 → 25 = Y')+'</div><div class="reu-check"><span>✓ Rule पहचानें</span><span>✓ दोबारा verify करें</span><span>✓ विकल्प eliminate करें</span><span>✓ फिर final answer</span></div>';
    lesson.insertAdjacentElement('afterend',panel);
    var modes=chapter.querySelectorAll('.mode-grid button');
    if(modes.length>=3){
      var labels=number?['8 Core Practice','8 Challenge','12 Final Test']:['8 Core Practice','8 Challenge','12 Final Test'];
      modes.forEach(function(btn,i){if(labels[i]){var small=btn.querySelector('small');if(small)small.textContent=labels[i]}})
    }
  }
  addStyle();
  var observer=new MutationObserver(enhance);observer.observe(document.body,{childList:true,subtree:true});
  enhance();
})();