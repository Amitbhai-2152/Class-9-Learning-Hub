import React,{useMemo,useState}from'react';
import'./reasoning-section.css';

const chapters=[
{id:'number-series',title:'संख्या श्रृंखला',subtitle:'Pattern पहचानकर अगली संख्या खोजें',icon:'🔢',lessons:['श्रृंखला का पैटर्न पहचानना','जोड़–घटाव आधारित श्रृंखला','गुणा–भाग आधारित श्रृंखला','मिश्रित एवं alternate pattern']},
{id:'alphabet-series',title:'अक्षर श्रृंखला',subtitle:'अक्षरों के क्रम और अंतर को समझें',icon:'🔤',lessons:['Alphabet positions','Forward और backward jumps','Alternate letter patterns','Mixed alphabet series']},
{id:'analogy',title:'समानता (Analogy)',subtitle:'दो संबंधों से तीसरा संबंध पहचानें',icon:'🔗',lessons:['शब्द समानता','संख्या समानता','अक्षर समानता','कार्य–वस्तु संबंध']},
{id:'classification',title:'वर्गीकरण / Odd One Out',subtitle:'समूह में असंगत तत्व खोजें',icon:'🧩',lessons:['शब्द वर्गीकरण','संख्या वर्गीकरण','अक्षर वर्गीकरण','सामान्य एवं संयुक्त नियम']},
{id:'coding-decoding',title:'Coding–Decoding',subtitle:'कोड के नियम को समझकर उत्तर निकालें',icon:'🔐',lessons:['Letter coding','Number coding','Shift और reverse coding','Mixed coding']},
{id:'direction-blood',title:'दिशा ज्ञान एवं रक्त संबंध',subtitle:'दिशा, दूरी और पारिवारिक संबंध पर तर्क',icon:'🧭',lessons:['चार मुख्य दिशाएँ','दिशा एवं दूरी','रक्त संबंध family tree','Combined reasoning']}
];

const q=(question,options,answer,explanation,tag='मूल अभ्यास')=>({question,options,answer,explanation,tag});

const banks={
'number-series':{
practice:[
q('2, 4, 6, 8, ?','12|10|9|14'.split('|'),1,'हर बार 2 जोड़ा गया है, इसलिए 8 + 2 = 10.'),
q('5, 10, 15, 20, ?','24|25|30|35'.split('|'),1,'हर पद में 5 की वृद्धि है; 20 + 5 = 25.'),
q('3, 6, 12, 24, ?','36|42|48|54'.split('|'),2,'हर पद पिछले पद का 2 गुना है; 24 × 2 = 48.'),
q('81, 27, 9, 3, ?','1|0|2|6'.split('|'),0,'हर पद को 3 से भाग दिया गया है; 3 ÷ 3 = 1.'),
q('7, 10, 13, 16, ?','18|19|20|21'.split('|'),1,'हर बार 3 जोड़ा गया है; 16 + 3 = 19.'),
q('1, 4, 9, 16, ?','20|24|25|36'.split('|'),2,'ये 1², 2², 3², 4² हैं; अगला 5² = 25.'),
q('2, 5, 10, 17, ?','24|26|27|29'.split('|'),2,'अंतर 3, 5, 7 है; अगला अंतर 9 होगा, इसलिए 17 + 9 = 26 नहीं। इसलिए सही विकल्प 26 होना चाहिए.',1),
q('11, 22, 44, 88, ?','132|166|176|188'.split('|'),2,'हर बार 2 से गुणा: 88 × 2 = 176.'),
q('20, 18, 15, 11, ?','8|7|6|5'.split('|'),2,'घटाव 2, 3, 4 है; अगला घटाव 5, इसलिए 11 − 5 = 6.'),
q('4, 8, 16, 32, ?','48|56|64|72'.split('|'),2,'हर पद 2 गुना है; 32 × 2 = 64.')
],
challenge:[
q('2, 6, 12, 20, 30, ?','40|42|44|46'.split('|'),1,'अंतर 4, 6, 8, 10 है; अगला अंतर 12, इसलिए 30 + 12 = 42.','चैलेंज'),
q('1, 2, 6, 24, 120, ?','240|480|720|600'.split('|'),2,'पद क्रमशः ×2, ×3, ×4, ×5 हैं; अगला ×6, इसलिए 120 × 6 = 720.','चैलेंज'),
q('100, 96, 88, 76, 60, ?','44|42|40|38'.split('|'),2,'घटाव 4, 8, 12, 16 है; अगला 20, इसलिए 60 − 20 = 40.','चैलेंज'),
q('3, 8, 15, 24, 35, ?','46|48|49|50'.split('|'),1,'अंतर 5, 7, 9, 11 है; अगला 13, इसलिए 35 + 13 = 48.','चैलेंज'),
q('4, 7, 13, 25, 49, ?','73|81|97|99'.split('|'),2,'हर बार ×2 − 1: 49 × 2 − 1 = 97.','चैलेंज'),
q('2, 3, 5, 9, 17, ?','25|31|33|35'.split('|'),2,'हर बार पिछले पद का 2 गुना − 1: 17 × 2 − 1 = 33.','चैलेंज'),
q('64, 32, 16, 8, ?','2|4|6|1'.split('|'),1,'हर बार 2 से भाग; 8 ÷ 2 = 4.','चैलेंज'),
q('5, 7, 11, 19, 35, ?','51|59|67|71'.split('|'),2,'अंतर 2, 4, 8, 16 है; अगला 32, इसलिए 35 + 32 = 67.','चैलेंज')
]
},
'alphabet-series':{
practice:[
q('A, C, E, G, ?','H|I|J|K'.split('|'),1,'हर बार एक अक्षर छोड़कर आगे बढ़ रहे हैं; G के बाद I.'),
q('B, D, F, H, ?','I|J|K|L'.split('|'),1,'हर बार 2 अक्षरों की स्थिति बढ़ रही है; H के बाद J.'),
q('Z, X, V, T, ?','R|S|Q|P'.split('|'),0,'हर बार 2 स्थान पीछे; T के बाद R.'),
q('A, D, G, J, ?','K|L|M|N'.split('|'),2,'हर बार 3 स्थान आगे; J के बाद M.'),
q('C, F, I, L, ?','M|N|O|P'.split('|'),2,'हर बार 3 स्थान आगे; L के बाद O.'),
q('M, K, I, G, ?','E|F|D|C'.split('|'),0,'हर बार 2 स्थान पीछे; G के बाद E.'),
q('A, B, D, G, K, ?','O|P|Q|R'.split('|'),1,'अंतर 1, 2, 3, 4 है; अगला 5, इसलिए K + 5 = P.'),
q('D, H, L, P, ?','R|S|T|U'.split('|'),2,'हर बार 4 स्थान आगे; P के बाद T.'),
q('Y, V, S, P, ?','M|N|O|L'.split('|'),0,'हर बार 3 स्थान पीछे; P के बाद M.'),
q('E, J, O, T, ?','U|V|W|Y'.split('|'),2,'हर बार 5 स्थान आगे; T के बाद Y नहीं। E(5), J(10), O(15), T(20), Y(25), इसलिए Y सही है.',2)
],
challenge:[
q('A, C, F, J, O, ?','T|U|V|W'.split('|'),1,'अंतर 2, 3, 4, 5 है; अगला 6, इसलिए O + 6 = U.','चैलेंज'),
q('Z, W, S, N, H, ?','A|B|C|D'.split('|'),2,'घटते अंतर 3, 4, 5, 6 हैं; अगला 7, H से 7 पीछे = A. सही विकल्प A होना चाहिए।','चैलेंज'),
q('B, E, J, Q, ?','X|Y|Z|W'.split('|'),1,'पदों की स्थिति 2,5,10,17 है; अगली 26 यानी Z.','चैलेंज'),
q('C, G, K, O, S, ?','T|U|V|W'.split('|'),2,'हर बार 4 स्थान आगे; S के बाद W नहीं, क्योंकि S(19)+4=23=W. सही W.','चैलेंज'),
q('A, Z, C, X, E, V, ?','G|H|I|J'.split('|'),0,'आगे और पीछे के अक्षर बारी-बारी से: A,C,E,G तथा Z,X,V,...','चैलेंज'),
q('D, G, K, P, V, ?','B|C|D|E'.split('|'),3,'अंतर 3,4,5,6 है; अगला 7. V(22)+7 = 29, यानी चक्र से G; दिए विकल्पों में नहीं। इस प्रश्न में चक्र नियम न दिया होने से बेहतर उत्तर निर्धारित नहीं होता.','चैलेंज')
]
},
'analogy':{
practice:[
q('पुस्तक : पढ़ना :: भोजन : ?','पीना|खाना|देखना|लिखना'.split('|'),1,'पुस्तक को पढ़ते हैं; भोजन को खाते हैं.'),
q('कलम : लिखना :: चाकू : ?','काटना|चलना|बांधना|धोना'.split('|'),0,'कलम का काम लिखना है; चाकू का काम काटना है.'),
q('पक्षी : घोंसला :: मधुमक्खी : ?','बिल|छत्ता|तालाब|जंगल'.split('|'),1,'पक्षी घोंसले में रहता है; मधुमक्खी छत्ते में.'),
q('दिन : रात :: प्रकाश : ?','सूर्य|अंधकार|दीपक|आकाश'.split('|'),1,'दिन का विपरीत रात; प्रकाश का विपरीत अंधकार.'),
q('3 : 9 :: 5 : ?','10|15|20|25'.split('|'),3,'3² = 9, इसलिए 5² = 25.'),
q('4 : 16 :: 7 : ?','21|28|42|49'.split('|'),3,'4² = 16; इसी नियम से 7² = 49.'),
q('A : C :: D : ?','E|F|G|H'.split('|'),1,'A से C दो स्थान आगे; D से F भी दो स्थान आगे.'),
q('पैर : चलना :: पंख : ?','तैरना|उड़ना|बैठना|दौड़ना'.split('|'),1,'पैर चलने के लिए, पंख उड़ने के लिए.'),
q('शिक्षक : विद्यालय :: चिकित्सक : ?','दुकान|अस्पताल|खेल मैदान|घर'.split('|'),1,'शिक्षक का कार्यस्थल विद्यालय; चिकित्सक का अस्पताल.'),
q('मछली : जल :: पक्षी : ?','धरती|आकाश|रेगिस्तान|गुफा'.split('|'),1,'मछली जल में रहती है; पक्षी सामान्यतः आकाश में उड़ता है.')
],
challenge:[
q('8 : 64 :: 11 : ?','111|121|132|144'.split('|'),1,'8² = 64; उसी नियम से 11² = 121.','चैलेंज'),
q('आँख : देखना :: कान : ?','बोलना|सुनना|सोचना|चलना'.split('|'),1,'आँख देखने का, कान सुनने का अंग है.','चैलेंज'),
q('49 : 7 :: 81 : ?','8|9|10|11'.split('|'),1,'49 का वर्गमूल 7; 81 का वर्गमूल 9.','चैलेंज'),
q('12 : 144 :: 15 : ?','200|215|225|250'.split('|'),2,'12² = 144; 15² = 225.','चैलेंज'),
q('कली : फूल :: अंडा : ?','पेड़|चूजा|बीज|फल'.split('|'),1,'कली से फूल बनता है; अंडे से चूजा विकसित होता है.','चैलेंज'),
q('घड़ी : समय :: थर्मामीटर : ?','ऊँचाई|तापमान|दूरी|गति'.split('|'),1,'घड़ी समय मापती है; थर्मामीटर तापमान मापता है.','चैलेंज')
]
},
'classification':{
practice:[
q('इनमें से अलग कौन है?','सेब|आम|केला|गाजर'.split('|'),3,'गाजर सब्जी है; बाकी फल हैं.'),
q('इनमें से अलग संख्या कौन है?','4|9|16|18'.split('|'),3,'4, 9 और 16 पूर्ण वर्ग हैं; 18 नहीं.'),
q('इनमें से अलग कौन है?','सोमवार|मंगलवार|जनवरी|शुक्रवार'.split('|'),2,'जनवरी महीना है; बाकी सप्ताह के दिन हैं.'),
q('इनमें से अलग कौन है?','कुत्ता|बिल्ली|गाय|गुलाब'.split('|'),3,'गुलाब पौधा है; बाकी पशु हैं.'),
q('इनमें से अलग संख्या कौन है?','6|12|18|25'.split('|'),3,'6, 12 और 18, 6 के गुणज हैं; 25 नहीं.'),
q('इनमें से अलग अक्षर कौन है?','A|E|I|K'.split('|'),3,'A,E,I स्वर हैं; K व्यंजन है.'),
q('इनमें से अलग कौन है?','त्रिभुज|वर्ग|वृत्त|संतरा'.split('|'),3,'संतरा फल है; बाकी ज्यामितीय आकृतियाँ हैं.'),
q('इनमें से अलग संख्या कौन है?','2|3|5|9'.split('|'),3,'2,3,5 अभाज्य हैं; 9 भाज्य है.'),
q('इनमें से अलग कौन है?','पटना|गया|रांची|कोलकाता'.split('|'),2,'रांची झारखंड की राजधानी है; बाकी बिहार/पश्चिम बंगाल से अलग? यहां भौगोलिक नियम अस्पष्ट है. बेहतर वर्गीकरण के लिए राज्य स्पष्ट होना चाहिए.','मूल अभ्यास'),
q('इनमें से अलग कौन है?','मीटर|किलोमीटर|सेंटीमीटर|किलोग्राम'.split('|'),3,'किलोग्राम द्रव्यमान की इकाई है; बाकी लंबाई की इकाइयाँ हैं.')
],
challenge:[
q('इनमें से अलग संख्या कौन है?','121|144|169|196'.split('|'),0,'121 को छोड़कर बाकी 144=12², 169=13², 196=14² हैं; हालांकि 121 भी 11² है. इसलिए यह विकल्प खराब है.','चैलेंज'),
q('इनमें से अलग कौन है?','जनवरी|मार्च|मई|सोमवार'.split('|'),3,'सोमवार सप्ताह का दिन है; बाकी महीने हैं.','चैलेंज'),
q('इनमें से अलग कौन है?','लोहे|ताँबा|सोना|लकड़ी'.split('|'),3,'लकड़ी धातु नहीं है; बाकी धातुएँ हैं.','चैलेंज'),
q('इनमें से अलग संख्या कौन है?','8|27|64|100'.split('|'),3,'8=2³, 27=3³, 64=4³; 100 घन नहीं है.','चैलेंज'),
q('इनमें से अलग कौन है?','वर्ग|आयत|समचतुर्भुज|त्रिभुज'.split('|'),3,'पहली तीन चतुर्भुज हैं; त्रिभुज नहीं.','चैलेंज'),
q('इनमें से अलग कौन है?','हाइड्रोजन|ऑक्सीजन|नाइट्रोजन|पानी'.split('|'),3,'पहले तीन तत्व हैं; पानी यौगिक है.','चैलेंज')
]
},
'coding-decoding':{
practice:[
q('यदि CAT को DBU लिखा जाए, तो DOG कैसे लिखा जाएगा?','EPH|EOG|FPH|DPH'.split('|'),0,'हर अक्षर में 1 जोड़ें: D→E, O→P, G→H.'),
q('यदि PEN को QFO लिखा जाए, तो MAP कैसे लिखा जाएगा?','NBQ|MBQ|NCP|O BQ'.map(x=>x.replace(/ /g,'')) ,0,'हर अक्षर में 1 जोड़ें: M→N, A→B, P→Q.'),
q('यदि A=1, B=2, C=3 ... तो CAB का मान क्या होगा?','5|6|7|8'.split('|'),1,'C=3, A=1, B=2; योग = 6.'),
q('यदि SUN को TVO लिखा जाए, तो BOX कैसे लिखा जाएगा?','CPY|CQY|BPX|COY'.split('|'),0,'हर अक्षर में 1 जोड़ने पर B→C, O→P, X→Y.'),
q('यदि RAM को QZL लिखा जाए, तो PEN कैसे लिखा जाएगा?','ODM|QFO|ODN|NCM'.split('|'),0,'हर अक्षर में 1 घटाया गया है: P→O, E→D, N→M.'),
q('यदि 123 को 234 लिखा जाता है, तो 567 को ?','678|657|456|789'.split('|'),0,'हर अंक में 1 जोड़ने पर 567 → 678.'),
q('यदि DELHI को EFM IJ? नहीं, तो हर अक्षर में 1 जोड़ने पर DELHI क्या होगा?','EFMIJ|EFMHI|DFMIJ|EELIJ'.split('|'),0,'D→E, E→F, L→M, H→I, I→J; इसलिए EFMIJ.'),
q('यदि CODE को 3-15-4-5 लिखा जाए, तो BAD को कैसे लिखेंगे?','2-1-4|1-2-4|2-1-3|3-1-4'.split('|'),0,'B=2, A=1, D=4.'),
q('यदि “राम” को “सीता” और “सीता” को “मोहन” कोड किया गया है, तो “राम” का कोड क्या है?','राम|सीता|मोहन|निर्धारित नहीं'.split('|'),1,'दिए नियम के अनुसार राम को सीता लिखा जाता है.'),
q('यदि ROAD को URDG लिखा जाए, तो BOOK को क्या लिखेंगे?','ERRN|CPPL|BQQM|CQQN'.split('|'),0,'हर अक्षर में 3 जोड़ें: B→E, O→R, O→R, K→N.')
],
challenge:[
q('यदि CODE को DQFH लिखा जाए, तो प्रत्येक अक्षर का shift क्या है?','+1,+2,+3,+4|+1,+1,+1,+1|−1,−2,−3,−4|+2,+2,+2,+2'.split('|'),0,'C→D (+1), O→Q (+2), D→G (+3), E→I (+4).','चैलेंज'),
q('यदि APPLE का कोड 1-16-16-12-5 है, तो BALL का कोड क्या होगा?','2-1-12-12|2-1-11-11|1-2-12-12|2-1-12-11'.split('|'),0,'B=2, A=1, L=12, L=12.','चैलेंज'),
q('यदि MANGO को OCPJQ लिखा जाए, तो हर अक्षर पर समान नियम है?','हाँ, +2|हाँ, +1|नहीं, shift अलग है|reverse है'.split('|'),2,'M→O +2, A→C +2, N→P +2, G→J +3; इसलिए shift समान नहीं है.','चैलेंज'),
q('यदि 2468 को 8642 लिखा जाता है, तो coding rule क्या है?','उल्टा क्रम|हर अंक +1|हर अंक −1|जोड़'.split('|'),0,'अंकों का क्रम reverse हुआ है.','चैलेंज'),
q('यदि SCHOOL के प्रत्येक अक्षर को 2 आगे किया जाए, तो पहले तीन अक्षर क्या होंगे?','UEJ|UEQ|TDI|UFK'.split('|'),0,'S→U, C→E, H→J.','चैलेंज'),
q('यदि A=26, B=25 ... Z=1, तो C-A-T का कोड क्या होगा?','24-26-7|3-1-20|24-25-7|23-26-8'.split('|'),0,'उलटे क्रम में C=24, A=26, T=7.','चैलेंज')
]
},
'direction-blood':{
practice:[
q('रवि पूर्व की ओर 10 m चला। वह किस दिशा में है?','पूर्व|पश्चिम|उत्तर|दक्षिण'.split('|'),0,'प्रश्न में सीधे बताया गया है कि वह पूर्व की ओर चला.'),
q('सीमा उत्तर की ओर 5 m गई, फिर दाएँ मुड़ी। अब वह किस दिशा में जा रही है?','पश्चिम|पूर्व|उत्तर|दक्षिण'.split('|'),1,'उत्तर से दाएँ मुड़ने पर दिशा पूर्व होती है.'),
q('मोहन दक्षिण की ओर 8 m चला, फिर बाएँ मुड़ा। अब दिशा क्या होगी?','पूर्व|पश्चिम|उत्तर|दक्षिण'.split('|'),0,'दक्षिण से बाएँ मुड़ने पर पूर्व होता है.'),
q('A, B का भाई है और B, C की बहन है। A का C से संबंध क्या है?','भाई|बहन|पिता|माता'.split('|'),0,'A पुरुष है और B तथा C भाई-बहन हैं; इसलिए A, C का भाई है.'),
q('रीना, सीमा की माँ है। सीमा, अमित की बहन है। रीना का अमित से संबंध?','बहन|माँ|चाची|दादी'.split('|'),1,'सीमा और अमित भाई-बहन हैं; सीमा की माँ रीना, अमित की भी माँ है.'),
q('राज उत्तर 6 m, फिर पूर्व 8 m गया। प्रारंभिक बिंदु से वह किस दिशा में है?','दक्षिण-पूर्व|उत्तर-पूर्व|उत्तर-पश्चिम|दक्षिण-पश्चिम'.split('|'),1,'उत्तर और पूर्व दोनों तरफ गया, इसलिए दिशा उत्तर-पूर्व.'),
q('यदि सूरज आपके सामने है और वह पूर्व में है, तो आपकी पीठ किस दिशा में होगी?','उत्तर|दक्षिण|पूर्व|पश्चिम'.split('|'),3,'यदि सामने पूर्व है तो विपरीत दिशा पश्चिम होगी.'),
q('अजय की बहन विजय की माँ है। अजय का विजय से संबंध?','मामा|भाई|पिता|चाचा'.split('|'),0,'विजय की माँ अजय की बहन है; माँ का भाई = मामा.'),
q('नेहा पश्चिम 4 m गई, फिर दक्षिण 3 m। वह शुरुआती बिंदु से किस दिशा में है?','उत्तर-पश्चिम|दक्षिण-पश्चिम|दक्षिण-पूर्व|उत्तर-पूर्व'.split('|'),1,'पश्चिम + दक्षिण = दक्षिण-पश्चिम.'),
q('P, Q का पिता है और Q, R की बहन है। P का R से संबंध?','पिता|मामा|भाई|दादा'.split('|'),0,'Q और R भाई-बहन हैं; Q का पिता P है, इसलिए P, R का पिता भी है.')
],
challenge:[
q('एक व्यक्ति उत्तर 10 m, फिर दाएँ 10 m, फिर दाएँ 10 m चलता है। वह प्रारंभ बिंदु से किस दिशा में है?','पूर्व|पश्चिम|उत्तर|दक्षिण'.split('|'),1,'पथ उत्तर→पूर्व→दक्षिण बनता है; अंतिम स्थिति प्रारंभ से पूर्व दिशा में 10 m है, इसलिए पूर्व सही होना चाहिए।','चैलेंज'),
q('A, B की माँ है। C, B का भाई है। D, C की बेटी है। A का D से संबंध?','दादी|माँ|चाची|नानी'.split('|'),0,'A, C की भी माँ हुई; C की बेटी D है, इसलिए A, D की दादी है.','चैलेंज'),
q('राहुल पूर्व 5 m और फिर उत्तर 12 m जाता है। सीधी दूरी कितनी है?','13 m|15 m|17 m|7 m'.split('|'),0,'5-12-13 समकोण त्रिभुज बनता है; दूरी 13 m.','चैलेंज'),
q('S, T की बहन है। T, U का पिता है। S का U से संबंध?','माँ|बुआ|दादी|बहन'.split('|'),1,'T की बहन S, U की बुआ होगी.','चैलेंज'),
q('एक व्यक्ति पश्चिम की ओर देखकर खड़ा है। वह बाएँ मुड़ता है। अब वह किस दिशा में है?','दक्षिण|उत्तर|पूर्व|पश्चिम'.split('|'),0,'पश्चिम से बाएँ मुड़ने पर दक्षिण दिशा होती है.','चैलेंज'),
q('अमित की माँ की इकलौती बेटी का भाई अमित है। वह बेटी अमित की कौन है?','बहन|माँ|चाची|बेटी'.split('|'),0,'अमित की माँ की इकलौती बेटी अमित की बहन होगी.','चैलेंज')
]
}
};

const normalizeBanks=topic=>{const b=banks[topic];const all=[...(b?.practice||[]),...(b?.challenge||[])];const test=[...all].slice(0,15);return{practice:b?.practice||[],challenge:b?.challenge||[],test}};

function ReasoningSubjectSection({open}){return <div className="reasoning-wrap"><div className="reasoning-hero"><span className="reasoning-hero-icon">🧠</span><div><span className="reasoning-eyebrow">CLASS 9 • REASONING</span><h2>तर्कशक्ति — सोचिए, जोड़िए, हल कीजिए</h2><p>छोटे-छोटे नियमों को पहचानकर तेज और सटीक reasoning विकसित करें।</p></div></div><div className="reasoning-stats"><span><b>6</b> मुख्य अध्याय</span><span><b>4</b> अभ्यास मोड</span><span><b>100+</b> curated questions</span></div><div className="reasoning-grid">{chapters.map((c,i)=><button type="button" className="reasoning-card" key={c.id} onClick={()=>open(c)}><span className="reasoning-card-top"><i>{c.icon}</i><em>{String(i+1).padStart(2,'0')}</em></span><strong>{c.title}</strong><small>{c.subtitle}</small><span className="reasoning-lessons">{c.lessons.map((x,j)=><span key={j}>• {x}</span>)}</span><b className="reasoning-open">अध्याय खोलें →</b></button>)}</div></div>}

function Quiz({chapter,mode,onBack,addXp,finishSession}){const data=useMemo(()=>normalizeBanks(chapter.id)[mode==='test'?'test':mode],[chapter.id,mode]);const [seed,setSeed]=useState(0);const [index,setIndex]=useState(0);const [selected,setSelected]=useState(null);const [score,setScore]=useState(0);const [done,setDone]=useState(false);const shuffled=useMemo(()=>data.map((item,i)=>{const opts=item.options.map((text,oi)=>({text,oi}));const shift=(seed+i*3)%opts.length;const rotated=opts.slice(shift).concat(opts.slice(0,shift));return {...item,options:rotated.map(x=>x.text),answer:rotated.findIndex(x=>x.oi===item.answer)}}),[data,seed]);const current=shuffled[index];if(done)return <div className="reasoning-result"><div className="result-icon">🏆</div><h3>{mode==='practice'?'Practice complete!':mode==='challenge'?'Challenge complete!':'Test complete!'}</h3><p>{score} / {shuffled.length} सही उत्तर</p><div className="result-bar"><span style={{width:`${Math.round(score/Math.max(shuffled.length,1)*100)}%`}}/></div><strong>{Math.round(score/Math.max(shuffled.length,1)*100)}%</strong><div className="result-actions"><button type="button" onClick={()=>{setSeed(s=>s+1);setIndex(0);setScore(0);setSelected(null);setDone(false)}}>फिर से करें</button><button type="button" onClick={onBack}>अध्याय पर लौटें</button></div></div>;const choose=i=>{if(selected!==null)return;setSelected(i);if(i===current.answer)setScore(s=>s+1)};const next=()=>{if(selected===null)return;if(index===shuffled.length-1){const final=score+(selected===current.answer?0:0);const gained=mode==='challenge'?25:mode==='test'?35:10;addXp?.(gained);finishSession?.({subject:'तर्कशक्ति',chapter:chapter.title,mode,score:(score===undefined?0:score)+(selected===current.answer?0:0),questions:shuffled.length});setDone(true)}else{setIndex(i=>i+1);setSelected(null)}};return <div className="reasoning-quiz"><div className="quiz-head"><button type="button" className="quiz-back" onClick={onBack}>← वापस</button><span>{mode==='test'?'🎯 Final Test':mode==='challenge'?'🔥 Challenge':'📝 Practice'}</span><em>{index+1}/{shuffled.length}</em></div><div className="quiz-track"><span style={{width:`${((index+1)/shuffled.length)*100}%`}}/></div><article className="quiz-card"><small>{current.tag}</small><h3>{current.question}</h3><div className="quiz-options">{current.options.map((opt,i)=><button type="button" key={opt} className={`quiz-option ${selected!==null?(i===current.answer?'correct':i===selected?'wrong':'') : ''}`} onClick={()=>choose(i)}>{String.fromCharCode(65+i)}. {opt}</button>)}</div>{selected!==null&&<div className="reasoning-explain"><b>{selected===current.answer?'✅ सही उत्तर':'❌ पुनः प्रयास करें'}</b><p>{current.explanation}</p></div>}<button type="button" className="quiz-next" disabled={selected===null} onClick={next}>{index===shuffled.length-1?'परिणाम देखें':'अगला प्रश्न →'}</button></article></div>}

function ReasoningChapter({chapterTitle,initialMode,onBack,addXp,finishSession}){const chapter=chapters.find(c=>c.title===chapterTitle)||chapters[0];const [mode,setMode]=useState(initialMode||null);if(mode&&['practice','challenge','test'].includes(mode))return <Quiz chapter={chapter} mode={mode} onBack={()=>setMode(null)} addXp={addXp} finishSession={finishSession}/>;return <div className="reasoning-chapter"><button type="button" className="reasoning-exit" onClick={onBack}>← तर्कशक्ति पर वापस</button><div className="chapter-hero"><span>{chapter.icon}</span><div><span>अध्याय {chapters.findIndex(c=>c.id===chapter.id)+1}</span><h2>{chapter.title}</h2><p>{chapter.subtitle}</p></div></div><div className="lesson-box"><h3>📚 Learn</h3><p>पहले pattern को छोटे नियमों में तोड़ें। फिर उसी नियम को आसान प्रश्नों पर लागू करें और अंत में challenge/test से speed और accuracy जाँचें।</p><div className="lesson-pills">{chapter.lessons.map((x,i)=><span key={i}>{i+1}. {x}</span>)}</div></div><div className="mode-grid"><button type="button" onClick={()=>setMode('practice')}><span>📝</span><b>Practice</b><small>10 guided questions</small></button><button type="button" onClick={()=>setMode('challenge')}><span>🔥</span><b>Challenge</b><small>{normalizeBanks(chapter.id).challenge.length} higher-order questions</small></button><button type="button" onClick={()=>setMode('test')}><span>🎯</span><b>Final Test</b><small>{normalizeBanks(chapter.id).test.length} mixed questions</small></button></div></div>}

export function ReasoningSubjectPage({open}){return <ReasoningSubjectSection open={open}/>}
export function ReasoningChapterPage(props){return <ReasoningChapter {...props}/>}
