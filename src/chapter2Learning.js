const quickChecks = [
  {type:'check',title:'त्वरित जाँच 1',body:'',question:'3x² − 5x + 2 में कुल कितने पद हैं?',options:['1','2','3','4'],answer:2,explain:'3x², −5x और 2 तीन अलग-अलग पद हैं।'},
  {type:'check',title:'त्वरित जाँच 2',body:'',question:'5x³ − 2x + 7 में x³ का गुणांक क्या है?',options:['5','−2','7','3'],answer:0,explain:'x³ के साथ 5 गुणा हो रहा है, इसलिए उसका गुणांक 5 है।'},
  {type:'check',title:'त्वरित जाँच 3',body:'',question:'7x⁴ − 3x + 1 की degree क्या है?',options:['1','3','4','7'],answer:2,explain:'सबसे बड़ी चर-घात 4 है, इसलिए degree 4 है।'},
  {type:'check',title:'त्वरित जाँच 4',body:'',question:'p(x)=x−6 का zero कौन है?',options:['−6','0','6','12'],answer:2,explain:'p(6)=6−6=0, इसलिए 6 zero है।'},
  {type:'check',title:'त्वरित जाँच 5',body:'',question:'यदि x−3 किसी polynomial p(x) का factor है, तो क्या निश्चित है?',options:['p(3)=0','p(−3)=0','p(0)=3','p(1)=0'],answer:0,explain:'Factor theorem के अनुसार x−a factor होने पर p(a)=0।'},
  {type:'check',title:'त्वरित जाँच 6',body:'',question:'0 को polynomial माना जाए तो उसका degree क्या होता है?',options:['0','1','परिभाषित नहीं है','असंगत'],answer:2,explain:'Zero polynomial की degree सामान्य convention में defined नहीं मानी जाती।'}
];

export const chapter2Learning = {
  title:'अध्याय 2: बहुपद',
  goal:'बहुपद को पहचानना, पद और गुणांक पढ़ना, degree समझना, मान निकालना, zeroes और factors का संबंध समझना और वास्तविक जीवन के patterns में polynomial का उपयोग करना।',
  hooks:{
    start:'सोचिए आपके पास एक input-output machine है। आप x डालते हैं और machine एक नियम से नया मान देती है। बहुपद इसी तरह का गणितीय rule लिखने की भाषा है।',
    why:'बहुपद आगे के factorisation, equations, graphs और algebraic reasoning की मजबूत नींव हैं।',
    think:'3x²−5x+2 देखकर बिना calculation किए बताइए: terms कितने हैं, x का coefficient क्या है और degree कितनी है?'
  },
  sections:[
    {type:'intro',title:'अध्याय का नक्शा',body:'बहुपद को समझने का सबसे अच्छा तरीका है expression को छोटे हिस्सों में पढ़ना। पहले variable और terms पहचानेंगे, फिर coefficients और degree, उसके बाद value, zeroes और factors।',points:['Expression को ध्यान से पढ़ें।','हर term को अलग पहचानें।','फिर highest power से degree तय करें।'],visual:{type:'flow',title:'सीखने का रास्ता',items:['Expression','Terms','Coefficient','Degree','Value','Zero','Factor']}},
    {type:'concept',title:'बीजीय व्यंजक क्या है?',body:'संख्या, चर और गणितीय संक्रियाओं से बना व्यंजक algebraic expression कहलाता है। जैसे 4x+3, x²−5x+1 और 2y−7।',points:['चर बदल सकता है।','संख्याएँ fixed होती हैं।','+ और − से अलग हुए हिस्से terms बनाते हैं।'],visual:{type:'compare',title:'Expression के उदाहरण',items:['4x+3','x²−5x+1','2y−7']}},
    {type:'concept',title:'बहुपद की पहचान',body:'एक चर वाले polynomial में variable की powers 0 या धनात्मक पूर्णांक होती हैं। variable denominator में होना, जैसे 1/x, या fractional/negative power होना polynomial की सामान्य परिभाषा के अनुकूल नहीं है।',points:['x²+3x+1 ✓','5x−4 ✓','1/x ✗','√x+1 ✗'],visual:{type:'compare',title:'Polynomial या नहीं?',items:['x²+3x+1 → polynomial','5x−4 → polynomial','1/x → polynomial नहीं','√x+1 → polynomial नहीं']}},
    {type:'concept',title:'Terms को पहचानिए',body:'जोड़ या घटाव के संकेत से अलग होने वाले हिस्से terms कहलाते हैं। 5x³−2x+7 में 5x³, −2x और 7 तीन terms हैं।',visual:{type:'steps',title:'Expression को तोड़ें',items:['5x³','−2x','7','कुल = 3 terms']}},
    {type:'concept',title:'Coefficient क्या होता है?',body:'किसी term में variable के साथ गुणा होने वाली संख्या उसका coefficient कहलाती है। −7x में coefficient −7 है। अगर x अकेला है, उसका coefficient 1 माना जाता है।',points:['5x → coefficient 5','−3x² → coefficient −3','x → coefficient 1','−x → coefficient −1']},
    {type:'concept',title:'Constant term',body:'जिस term में variable नहीं होता वह constant term है। 4x²−7x+9 में 9 constant term है।',visual:{type:'highlight',title:'Constant को पहचानें',items:['4x² → variable term','−7x → variable term','9 → constant term']}},
    {type:'concept',title:'Degree का अर्थ',body:'Polynomial में variable की सबसे बड़ी power उसकी degree होती है। Terms की संख्या और degree एक ही चीज़ नहीं हैं।',examples:['2x+1 → degree 1','3x²−x+5 → degree 2','7x⁴+2 → degree 4'],visual:{type:'compare',title:'Degree की तुलना',items:['2x+1 → 1','3x²−x+5 → 2','7x⁴+2 → 4']}},
    {type:'concept',title:'Degree और नाम',body:'Degree 1 को linear, degree 2 को quadratic और degree 3 को cubic polynomial कहा जाता है। शून्य से अलग constant polynomial की degree 0 होती है।',points:['Linear → degree 1','Quadratic → degree 2','Cubic → degree 3','Constant → degree 0']},
    {type:'example',title:'किसी polynomial को पूरी तरह पढ़ें',body:'2x³−7x+4 लें। Terms हैं 2x³, −7x और 4; x³ का coefficient 2 है; x का coefficient −7 है; constant 4 है और degree 3 है।',visual:{type:'steps',title:'एक expression, पाँच पहचान',items:['Terms → 2x³, −7x, 4','x³ coefficient → 2','x coefficient → −7','Constant → 4','Degree → 3']}},
    {type:'concept',title:'Polynomial का मान निकालना',body:'जब x का कोई मान दिया जाता है, तो x की जगह वह मान रखकर expression simplify करते हैं। यही evaluation है।',example:'p(x)=x²−3x+2 और x=2 हो तो p(2)=4−6+2=0।',visual:{type:'equation',title:'Input → Output',items:['Input: x=2','Rule: x²−3x+2','Output: 0']}},
    {type:'concept',title:'Polynomial एक input-output machine की तरह',body:'p(x) को एक machine मान सकते हैं: input x डालो, rule लागू करो और output p(x) पाओ। इससे value और zero की idea बहुत आसान हो जाती है।',visual:{type:'flow',title:'Polynomial machine',items:['x','→ rule p(x)','→ output p(x)']}},
    {type:'concept',title:'Zero क्या होता है?',body:'जिस value a के लिए p(a)=0 हो, a polynomial का zero कहलाता है।',example:'p(x)=x−4 में p(4)=0, इसलिए 4 इसका zero है।',visual:{type:'equation',title:'Zero की जाँच',items:['p(x)=x−4','x=4 डालें','p(4)=0','अतः zero = 4']}},
    {type:'concept',title:'Zero और graph का connection',body:'जब polynomial को graph के रूप में देखा जाता है, उसका zero वह x-value होती है जहाँ graph x-axis को काटता या छूता है। यह algebra और geometry के बीच महत्वपूर्ण connection है।',visual:{type:'graph',title:'Zero कहाँ दिखता है?',items:['y = p(x)','x-axis पर intersection','उस x-value पर p(x)=0']}},
    {type:'concept',title:'Factor और zero का संबंध',body:'यदि x−a polynomial p(x) का factor है, तो p(a)=0। उलटे, यदि p(a)=0, तो x−a factor होता है। यही factor theorem का मूल विचार है।',example:'x²−5x+6=(x−2)(x−3), इसलिए 2 और 3 zeroes हैं।',visual:{type:'nested',title:'Factor ↔ Zero',items:['p(a)=0','⇔','x−a factor']}},
    {type:'concept',title:'Linear polynomial और real life',body:'Linear polynomial केवल algebra में नहीं आता। fixed charge + प्रति unit charge, समान दूरी पर बढ़ती संख्या, या एक quantity का constant rate से बढ़ना/घटना जैसे patterns को linear expression से लिखा जा सकता है।',example:'एक club ₹200 joining fee और हर match के लिए ₹50 लेता है। m matches पर cost = 200+50m।',visual:{type:'steps',title:'Real-life pattern',items:['Fixed = ₹200','Per match = ₹50','m matches → 200+50m']}},
    {type:'concept',title:'Linear pattern',body:'जब successive values का difference constant रहता है, तो pattern linear हो सकता है। जैसे 1, 3, 5, 7, 9 में हर बार +2 जुड़ रहा है। इसका nth term 2n−1 है।',visual:{type:'compare',title:'Growing pattern',items:['1 → 3','3 → 5','5 → 7','हर बार +2']}},
    {type:'concept',title:'Growth और decay',body:'Linear expression किसी quantity के constant rate से बढ़ने या घटने को model कर सकता है।',examples:['C(d)=100+60d → दूरी बढ़ने पर cost बढ़ती है','h(t)=3−0.5t → समय बढ़ने पर height घटती है'],visual:{type:'steps',title:'दो दिशाएँ',items:['+ constant → growth','− constant → decay']}},
    {type:'concept',title:'Expression और equation में अंतर',body:'Polynomial केवल expression हो सकता है, जैसे 2x+5। जब इसे किसी value के बराबर रख देते हैं, जैसे 2x+5=17, तो linear equation बनती है।',visual:{type:'compare',title:'Expression → Equation',items:['2x+5 → expression','2x+5=17 → equation']}},
    {type:'concept',title:'सामान्य गलतियाँ',body:'Degree को terms की संख्या न समझें। coefficient में sign न भूलें। zero और factor के संबंध में x−a ↔ a का sign ध्यान रखें।',points:['3x²−5x+2 में 3 terms हैं, लेकिन degree 2 है।','−4x का coefficient −4 है।','x−5 factor होने पर zero 5 है, −5 नहीं।','Polynomial और equation एक ही चीज़ नहीं हैं।']},
    {type:'concept',title:'अध्याय का master checklist',body:'किसी भी नए polynomial को देखकर यह क्रम अपनाइए: terms → coefficient → constant → degree → value → zero/factor। यही क्रम परीक्षा में समय बचाता है।',visual:{type:'flow',title:'5-second checklist',items:['Terms','Coefficient','Constant','Degree','Zero / Value']}},
    ...quickChecks
  ],
  worked:{
    classify:{title:'2x³−7x+4 का पूरा analysis',steps:['Expression लिखें: 2x³−7x+4।','Terms: 2x³, −7x, 4।','Coefficients: 2 और −7; constant = 4।','Highest power = 3।','इसलिए यह cubic polynomial है, degree 3।']},
    evaluate:{title:'p(−2) ध्यान से निकालें',steps:['p(x)=x²+3x−4।','x=−2 substitute करें: p(−2)=(−2)²+3(−2)−4।','अब 4−6−4 लिखें।','अंतिम मान = −6।','Minus sign को square करते समय ध्यान रखें: (−2)² = +4।']},
    zero:{title:'x²−7x+12 के zeroes',steps:['ऐसे दो numbers खोजें जिनका product 12 और sum 7 हो।','वे 3 और 4 हैं।','x²−7x+12=(x−3)(x−4)।','इसलिए zeroes 3 और 4 हैं।','Check: p(3)=0 और p(4)=0।']}
  }
};
