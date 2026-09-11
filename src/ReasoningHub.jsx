import React,{useMemo,useState}from'react';
import'./reasoning-section.css';

const REASONING_BUILD_MARKER='reasoning-chapters-1-2-live-2026-09-10';
const chapters=[
{id:'number-series',title:'संख्या श्रृंखला',icon:'🔢',desc:'संख्याओं के बीच नियम पहचानें और अगला पद निकालें',lessons:['समान अंतर','गुणा–भाग','बढ़ते अंतर','वर्ग और संयुक्त पैटर्न']},
{id:'alphabet-series',title:'अक्षर श्रृंखला',icon:'🔤',desc:'अक्षरों की स्थिति और क्रम के आधार पर पैटर्न खोजें',lessons:['Alphabet position','Forward jumps','Backward jumps','Mixed patterns']},
{id:'analogy',title:'समानता (Analogy)',icon:'🔗',desc:'दो वस्तुओं या संख्याओं के संबंध से नया संबंध निकालें',lessons:['शब्द संबंध','संख्या संबंध','अक्षर संबंध','कार्य–वस्तु संबंध']},
{id:'classification',title:'वर्गीकरण / Odd One Out',icon:'🧩',desc:'समूह में दिए नियम से असंगत तत्व पहचानें',lessons:['शब्द समूह','संख्या समूह','अक्षर समूह','आकृति/माप वर्गीकरण']},
{id:'coding-decoding',title:'Coding–Decoding',icon:'🔐',desc:'कोड बनाने के नियम को पहचानकर नया कोड बनाइए',lessons:['Letter shift','Number coding','Position coding','Reverse coding']},
{id:'direction-blood',title:'दिशा ज्ञान एवं रक्त संबंध',icon:'🧭',desc:'दिशा, दूरी और पारिवारिक संबंधों पर तर्क लगाएँ',lessons:['दिशा परिवर्तन','दूरी','Family tree','Combined reasoning']}
];
const make=(s,o,a,e,d='अभ्यास')=>({question:s,options:o,answer:a,explanation:e,difficulty:d});
const data={
'number-series':[
make('2, 5, 8, 11, ?',['13','14','15','16'],1,'हर बार 3 जोड़ा गया है: 11 + 3 = 14.'),
make('4, 8, 16, 32, ?',['48','56','64','72'],2,'हर पद पिछले पद का 2 गुना है: 32 × 2 = 64.'),
make('81, 27, 9, 3, ?',['0','1','2','6'],1,'हर पद को 3 से भाग दिया गया है: 3 ÷ 3 = 1.'),
make('1, 4, 9, 16, ?',['20','24','25','36'],2,'पद 1², 2², 3², 4² हैं; अगला 5² = 25.'),
make('7, 12, 17, 22, ?',['26','27','28','29'],1,'हर बार 5 की वृद्धि है; 22 + 5 = 27.'),
make('30, 27, 24, 21, ?',['16','17','18','19'],2,'हर बार 3 घटता है; 21 − 3 = 18.'),
make('3, 6, 12, 24, ?',['36','42','48','54'],2,'हर बार ×2: 24 × 2 = 48.'),
make('10, 13, 17, 22, 28, ?',['34','35','36','37'],1,'अंतर 3,4,5,6 हैं; अगला अंतर 7, इसलिए 28 + 7 = 35.'),
make('5, 10, 20, 40, ?',['60','70','80','90'],2,'हर पद ×2 है: 40 × 2 = 80.','चैलेंज'),
make('100, 90, 81, 72.9, ?',['65.61','66.9','67.41','68.1'],0,'हर पद 0.9 से गुणा होता है: 72.9 × 0.9 = 65.61.','चैलेंज'),
make('1, 3, 6, 10, 15, ?',['20','21','22','23'],1,'अंतर 2,3,4,5 हैं; अगला अंतर 6, इसलिए 15 + 6 = 21.','चैलेंज'),
make('2, 6, 12, 20, 30, ?',['40','42','44','46'],1,'पद 1×2, 2×3, 3×4, 4×5, 5×6 हैं; अगला 6×7 = 42.','चैलेंज'),
make('1, 2, 4, 7, 11, 16, ?',['21','22','23','24'],1,'अंतर 1,2,3,4,5 हैं; अगला अंतर 6, इसलिए 16 + 6 = 22.','चैलेंज'),
make('2, 3, 5, 8, 13, ?',['18','19','20','21'],3,'हर पद पिछले दो पदों का योग है: 8 + 13 = 21.','चैलेंज'),
make('50, 45, 40, 35, 30, ?',['20','25','28','32'],1,'हर बार 5 घटता है: 30 − 5 = 25.','चैलेंज'),
make('3, 9, 27, 81, ?',['162','189','216','243'],3,'हर बार ×3: 81 × 3 = 243.','चैलेंज'),
make('2, 4, 8, 16, 32, ?',['48','56','64','72'],2,'यह doubling pattern है: 32 × 2 = 64.','कठिन'),
make('1, 8, 27, 64, ?',['100','121','125','144'],2,'पद 1³, 2³, 3³, 4³ हैं; अगला 5³ = 125.','कठिन'),
make('2, 5, 10, 17, 26, ?',['35','36','37','38'],2,'अंतर 3,5,7,9 हैं; अगला 11, इसलिए 26 + 11 = 37.','कठिन'),
make('7, 14, 12, 24, 22, 44, ?',['40','42','46','48'],1,'क्रमशः ×2, −2 दोहराया जा रहा है: 44 − 2 = 42.','कठिन'),
make('3, 7, 15, 31, 63, ?',['95','111','127','129'],2,'हर बार ×2 + 1: 63×2 + 1 = 127.','कठिन'),
make('4, 9, 19, 39, ?',['77','79','81','89'],1,'हर बार ×2 + 1: 39×2 + 1 = 79.','कठिन'),
make('121, 144, 169, 196, ?',['210','215','225','256'],2,'ये 11², 12², 13², 14² हैं; अगला 15² = 225.','कठिन'),
make('2, 12, 36, 80, 150, ?',['216','240','252','264'],2,'अंतर 10, 24, 44, 70 हैं; इन अंतरों का अंतर 14, 20, 26 है, इसलिए अगला 32 होगा। अगला अंतर 102 और उत्तर 150 + 102 = 252.','कठिन'),
make('96, 48, 24, 12, 6, ?',['2','3','4','5'],1,'हर बार 2 से भाग: 6 ÷ 2 = 3.','कठिन'),
make('6, 11, 18, 27, 38, ?',['49','50','51','52'],2,'अंतर 5,7,9,11 हैं; अगला 13, इसलिए 38 + 13 = 51.','कठिन'),
make('4, 7, 13, 25, 49, ?',['96','97','98','99'],1,'हर बार ×2 −1: 49×2−1 = 97.','कठिन'),
make('1, 5, 14, 30, 55, ?',['85','88','91','93'],2,'अंतर 4,9,16,25 यानी 2²,3²,4²,5²; अगला 36, इसलिए 55+36=91.','कठिन'),
make('12, 24, 21, 42, 39, ?',['72','75','78','81'],2,'×2, −3 का क्रम: 39×2 = 78.','कठिन'),
make('2, 4, 12, 48, 240, ?',['720','960','1200','1440'],3,'×2, ×3, ×4, ×5; अगला ×6: 240×6 = 1440.','कठिन'),
make('9, 16, 25, 36, 49, ?',['56','60','64','81'],2,'ये 3²,4²,5²,6²,7² हैं; अगला 8² = 64.','चैलेंज'),
make('64, 32, 16, 8, 4, ?',['1','2','3','4'],1,'हर बार आधा: 4÷2 = 2.','चैलेंज'),
make('2, 7, 17, 32, 52, ?',['72','77','82','87'],1,'अंतर 5,10,15,20 हैं; अगला 25, इसलिए 52+25=77.','चैलेंज'),
make('11, 22, 44, 88, ?',['132','154','176','180'],2,'हर बार ×2: 88×2 = 176.','चैलेंज'),
make('5, 6, 8, 11, 15, ?',['18','19','20','21'],2,'अंतर 1,2,3,4 हैं; अगला 5, इसलिए 15+5 = 20.','चैलेंज'),
make('1, 2, 6, 24, 120, ?',['240','360','720','840'],2,'ये factorial pattern है: 1!,2!,3!,4!,5!; अगला 6! = 720.','कठिन'),
make('20, 18, 15, 11, 6, ?',['0','1','2','3'],0,'अंतर −2,−3,−4,−5 हैं; अगला −6, इसलिए 0.','कठिन')
],
'alphabet-series':[
make('A, C, E, G, ?',['H','I','J','K'],1,'हर बार 2 स्थान आगे बढ़ रहे हैं: A→C→E→G, इसलिए अगला I.'),
make('B, E, H, K, ?',['M','N','O','P'],1,'हर बार 3 स्थान आगे: B→E→H→K→N.'),
make('Z, X, V, T, ?',['R','S','Q','P'],0,'हर बार 2 स्थान पीछे: Z→X→V→T→R.'),
make('A, D, G, J, ?',['K','L','M','N'],2,'हर बार 3 स्थान आगे: A→D→G→J→M.'),
make('M, K, I, G, ?',['E','F','D','C'],0,'हर बार 2 स्थान पीछे: M→K→I→G→E.'),
make('A, B, D, G, K, ?',['O','P','Q','R'],1,'अंतर 1,2,3,4 हैं; अगला अंतर 5, इसलिए K के बाद P.'),
make('Y, V, S, P, ?',['M','N','O','L'],0,'हर बार 3 स्थान पीछे: Y→V→S→P→M.'),
make('C, F, I, L, ?',['M','N','O','P'],2,'हर बार 3 स्थान आगे: C→F→I→L→O.'),
make('D, G, J, M, ?',['N','P','Q','R'],1,'हर बार 3 स्थान आगे: D→G→J→M→P.','चैलेंज'),
make('H, K, N, Q, ?',['S','T','U','V'],1,'हर बार 3 स्थान आगे: Q के बाद T.','चैलेंज'),
make('X, U, R, O, ?',['L','M','N','K'],0,'हर बार 3 स्थान पीछे: O के बाद L.','चैलेंज'),
make('B, F, J, N, ?',['Q','R','S','T'],1,'हर बार 4 स्थान आगे: N के बाद R.','चैलेंज'),
make('C, D, F, I, M, ?',['Q','R','S','T'],1,'अंतर 1,2,3,4 हैं; अगला 5, इसलिए M के बाद R.','चैलेंज'),
make('A, Z, B, Y, C, ?',['X','W','V','U'],0,'आगे और पीछे के अक्षर बारी-बारी से हैं: A,Z,B,Y,C,X.','चैलेंज'),
make('P, N, K, G, ?',['A','B','C','D'],1,'अंतर −2,−3,−4 हैं; अगला −5: G से B.','चैलेंज'),
make('E, J, O, T, ?',['V','W','Y','Z'],2,'हर बार 5 स्थान आगे: E→J→O→T→Y.','चैलेंज'),
make('C, H, M, R, ?',['V','W','X','Y'],1,'हर बार 5 स्थान आगे: R के बाद W.','कठिन'),
make('A, D, I, P, ?',['Y','Z','X','W'],0,'स्थान 1,4,9,16 यानी 1²,2²,3²,4²; अगला 5²=25=Y.','कठिन'),
make('Z, W, S, N, ?',['H','I','J','K'],0,'अंतर −3,−4,−5 हैं; अगला −6: N से H.','कठिन'),
make('B, D, H, P, ?',['F','X','Z','B'],0,'स्थान 2,4,8,16 हैं; अगला 32. 26 के बाद चक्रीय रूप से 32वाँ अक्षर F होगा.','कठिन'),
make('F, G, I, L, P, ?',['T','U','V','W'],1,'अंतर 1,2,3,4 हैं; अगला 5, इसलिए P के बाद U.','कठिन'),
make('A, E, F, J, K, O, ?',['P','Q','R','S'],0,'+4,+1 का चक्र दोहर रहा है: O के बाद P.','कठिन'),
make('A, C, F, J, O, ?',['T','U','V','W'],1,'अंतर +2,+3,+4,+5 हैं; अगला +6, इसलिए O के बाद U.','कठिन'),
make('C, G, L, R, ?',['W','Y','X','Z'],1,'अंतर +4,+5,+6 हैं; अगला +7, इसलिए R के बाद Y.','कठिन'),
make('D, F, H, J, ?',['K','L','M','N'],1,'हर बार +2: D→F→H→J→L.','अभ्यास'),
make('Q, N, K, H, ?',['E','F','G','D'],0,'हर बार −3: Q→N→K→H→E.','अभ्यास'),
make('A, C, F, J, ?',['N','O','P','Q'],1,'अंतर +2,+3,+4 हैं; अगला +5, इसलिए O.','अभ्यास'),
make('T, R, O, K, ?',['G','F','H','I'],1,'अंतर −2,−3,−4 हैं; अगला −5, इसलिए K→F.','अभ्यास'),
make('B, G, L, Q, ?',['V','W','X','Y'],0,'हर बार +5: Q के बाद V.','चैलेंज'),
make('W, T, Q, N, ?',['J','K','L','M'],1,'हर बार −3: W→T→Q→N→K.','चैलेंज'),
make('A, B, E, F, I, J, ?',['M','N','O','P'],0,'+1,+3 का दोहराव: J के बाद M.','चैलेंज'),
make('Z, Y, W, T, P, ?',['K','J','L','M'],0,'अंतर −1,−2,−3,−4 हैं; अगला −5: P से K.','चैलेंज'),
make('C, G, K, O, ?',['R','S','T','U'],1,'हर बार +4: O के बाद S.','चैलेंज'),
make('F, J, O, U, ?',['A','B','C','D'],1,'अंतर +4,+5,+6 हैं; अगला +7: U(21)+7=28 → B.','कठिन'),
make('B, E, J, Q, ?',['X','Y','Z','W'],2,'स्थान 2,5,10,17 = n²+1; अगला 26 → Z.','कठिन'),
make('H, M, S, Z, ?',['H','I','J','K'],0,'अंतर +5,+6,+7 हैं; अगला +8: Z(26)+8 को wrap करने पर H.','कठिन'),
make('A, F, K, P, U, ?',['X','Y','Z','A'],2,'हर बार +5: U के बाद Z.','कठिन')
],
'analogy':[
make('पुस्तक : पढ़ना :: भोजन : ?',['पीना','खाना','देखना','लिखना'],1,'पुस्तक को पढ़ते हैं; भोजन को खाते हैं.'),
make('कलम : लिखना :: चाकू : ?',['काटना','चलना','बांधना','धोना'],0,'कलम का काम लिखना; चाकू का काम काटना.'),
make('पक्षी : घोंसला :: मधुमक्खी : ?',['बिल','छत्ता','तालाब','गुफा'],1,'पक्षी घोंसले में और मधुमक्खी छत्ते में रहती है.'),
make('दिन : रात :: प्रकाश : ?',['सूर्य','अंधकार','दीपक','आकाश'],1,'दिन का विपरीत रात; प्रकाश का विपरीत अंधकार.'),
make('3 : 9 :: 5 : ?',['10','15','20','25'],3,'3² = 9; उसी नियम से 5² = 25.'),
make('4 : 16 :: 7 : ?',['21','28','42','49'],3,'4² = 16; 7² = 49.'),
make('A : C :: D : ?',['E','F','G','H'],1,'A से C दो स्थान आगे; D से F भी दो स्थान आगे.'),
make('पैर : चलना :: पंख : ?',['तैरना','उड़ना','बैठना','दौड़ना'],1,'पैर चलने में और पंख उड़ने में सहायक हैं.'),
make('भारत : नई दिल्ली :: बिहार : ?',['गया','पटना','मुजफ्फरपुर','भागलपुर'],1,'भारत की राजधानी नई दिल्ली है; बिहार की राजधानी पटना है.','अभ्यास'),
make('Doctor : Hospital :: Teacher : ?',['Market','Office','School','Court'],2,'Doctor का कार्यस्थल Hospital; Teacher का School.','अभ्यास'),
make('2 : 8 :: 3 : ?',['9','18','24','27'],3,'2³ = 8; इसलिए 3³ = 27.','अभ्यास'),
make('Book : Author :: Painting : ?',['Reader','Painter','Seller','Teacher'],1,'Book का creator Author; Painting का creator Painter.','अभ्यास'),
make('Bird : Fly :: Fish : ?',['Walk','Jump','Swim','Run'],2,'Bird उड़ता है; Fish तैरती है.','चैलेंज'),
make('Eye : See :: Ear : ?',['Touch','Hear','Taste','Smell'],1,'Eye से देखते हैं; Ear से सुनते हैं.','चैलेंज'),
make('6 : 36 :: 9 : ?',['54','63','72','81'],3,'6²=36; इसलिए 9²=81.','चैलेंज'),
make('Monday : Week :: January : ?',['Month','Day','Season','Hour'],0,'Monday week का day है; January year का month है.','कठिन')
],
'classification':[
make('अलग शब्द चुनिए।',['सेब','आम','केला','गाजर'],3,'गाजर सब्जी है; बाकी फल हैं.'),
make('अलग संख्या चुनिए।',['4','9','16','18'],3,'4, 9 और 16 पूर्ण वर्ग हैं; 18 पूर्ण वर्ग नहीं.'),
make('अलग शब्द चुनिए।',['सोमवार','मंगलवार','जनवरी','शुक्रवार'],2,'जनवरी महीना है; बाकी सप्ताह के दिन हैं.'),
make('अलग शब्द चुनिए।',['कुत्ता','बिल्ली','गाय','गुलाब'],3,'गुलाब पौधा है; बाकी पशु हैं.'),
make('अलग संख्या चुनिए।',['6','12','18','25'],3,'6, 12 और 18, 6 के गुणज हैं; 25 नहीं.'),
make('अलग अक्षर चुनिए।',['A','E','I','K'],3,'A, E और I स्वर हैं; K व्यंजन है.'),
make('अलग संख्या चुनिए।',['2','3','5','9'],3,'2, 3 और 5 अभाज्य हैं; 9 भाज्य है.'),
make('अलग इकाई चुनिए।',['मीटर','किलोमीटर','सेंटीमीटर','किलोग्राम'],3,'किलोग्राम द्रव्यमान की इकाई है; बाकी लंबाई की इकाइयाँ हैं.'),
make('अलग संख्या चुनिए।',['8','27','64','100'],3,'8=2³, 27=3³, 64=4³; 100 पूर्ण घन नहीं.','अभ्यास'),
make('अलग शब्द चुनिए।',['लाल','नीला','हरा','आम'],3,'आम फल/वस्तु है; बाकी रंग हैं.','अभ्यास'),
make('अलग संख्या चुनिए।',['11','13','17','21'],3,'11,13,17 अभाज्य हैं; 21 भाज्य है.','अभ्यास'),
make('अलग शब्द चुनिए।',['गंगा','यमुना','गोदावरी','हिमालय'],3,'हिमालय नदी नहीं, पर्वत श्रृंखला है.','अभ्यास'),
make('अलग संख्या चुनिए।',['12','18','24','31'],3,'12,18,24 सम संख्याएँ हैं; 31 विषम है.','चैलेंज'),
make('अलग अक्षर चुनिए।',['B','D','F','G'],3,'B,D,F समान even-position pattern में हैं; G नहीं.','चैलेंज'),
make('अलग शब्द चुनिए।',['मीटर','लीटर','किलोमीटर','सेंटीमीटर'],1,'लीटर आयतन की इकाई है; बाकी लंबाई की इकाइयाँ हैं.','चैलेंज'),
make('अलग संख्या चुनिए।',['16','25','36','45'],3,'16,25,36 पूर्ण वर्ग हैं; 45 नहीं.','कठिन')
],
'coding-decoding':[
make('यदि CAT को DBU लिखा जाए, तो DOG कैसे लिखा जाएगा?',['EPH','EOG','FPH','DPH'],0,'हर अक्षर में 1 जोड़ा गया है: D→E, O→P, G→H.'),
make('यदि PEN को QFO लिखा जाए, तो MAP कैसे लिखा जाएगा?',['NBQ','MBQ','NCP','OBQ'],0,'हर अक्षर में 1 जोड़ें: M→N, A→B, P→Q.'),
make('यदि A=1, B=2, C=3 ... तो CAB का मान क्या होगा?',['5','6','7','8'],1,'C=3, A=1, B=2; कुल 6.'),
make('यदि SUN को TVO लिखा जाए, तो BOX कैसे लिखा जाएगा?',['CPY','CQY','BPX','COY'],0,'हर अक्षर में 1 जोड़ने पर BOX → CPY.'),
make('यदि RAM को QZL लिखा जाए, तो PEN कैसे लिखा जाएगा?',['ODM','QFO','ODN','NCM'],0,'हर अक्षर में 1 घटाएँ: P→O, E→D, N→M.'),
make('यदि 123 को 234 लिखा जाता है, तो 567 को ?',['678','657','456','789'],0,'हर अंक में 1 जोड़ने पर 567 → 678.'),
make('यदि CODE को 3-15-4-5 लिखा जाए, तो BAD कैसे लिखेंगे?',['2-1-4','1-2-4','2-1-3','3-1-4'],0,'B=2, A=1, D=4.'),
make('यदि ROAD को URDG लिखा जाए, तो BOOK कैसे लिखेंगे?',['ERRN','CPPL','BQQM','CQQN'],0,'हर अक्षर में 3 जोड़ें: B→E, O→R, O→R, K→N.'),
make('यदि CAT → DBU, तो HEN → ?',['IFO','IFN','HFO','JFO'],0,'हर अक्षर में +1: H→I, E→F, N→O.','अभ्यास'),
make('यदि ROAD → SPBE, तो TREE → ?',['USFF','USGG','TRFF','TSFF'],0,'हर अक्षर में +1: TREE→USFF.','अभ्यास'),
make('यदि A=1…Z=26, तो BAD का योग?',['6','7','8','9'],1,'B=2, A=1, D=4; योग 2+1+4 = 7.','अभ्यास'),
make('यदि 246 को 357 लिखा जाए, तो 813 को ?',['924','903','814','713'],0,'हर अंक में +1: 813→924.','अभ्यास'),
make('यदि MANGO को NBOHP लिखा जाए, तो GRAPE को ?',['HSBQF','HSBPF','GRAPE','HTBQF'],0,'हर अक्षर में +1: GRAPE→HSBQF.','चैलेंज'),
make('यदि DELHI को 4-5-12-8-9 लिखा जाए, तो PATNA?',['16-1-20-14-1','15-1-20-14-1','16-2-20-14-1','16-1-19-14-1'],0,'P=16,A=1,T=20,N=14,A=1.','चैलेंज'),
make('यदि SUN = 19-21-14, तो MOON = ?',['13-15-15-14','12-15-15-14','13-14-15-14','14-15-15-13'],0,'M=13,O=15,O=15,N=14.','कठिन'),
make('यदि BLUE को EOXH लिखा जाए, तो GOLD को ?',['JROG','JQOG','HPQG','GOLD'],0,'हर अक्षर में +3: G→J,O→R,L→O,D→G.','कठिन')
],
'direction-blood':[
make('सीमा उत्तर की ओर 5 m गई, फिर दाएँ मुड़ी। अब वह किस दिशा में जा रही है?',['पश्चिम','पूर्व','उत्तर','दक्षिण'],1,'उत्तर से दाएँ मुड़ने पर पूर्व दिशा होती है.'),
make('मोहन दक्षिण की ओर 8 m चला, फिर बाएँ मुड़ा। अब दिशा क्या होगी?',['पूर्व','पश्चिम','उत्तर','दक्षिण'],0,'दक्षिण से बाएँ मुड़ने पर पूर्व होता है.'),
make('राज 6 m उत्तर और 8 m पूर्व गया। प्रारंभ बिंदु से उसकी दिशा क्या है?',['दक्षिण-पूर्व','उत्तर-पूर्व','उत्तर-पश्चिम','दक्षिण-पश्चिम'],1,'वह उत्तर और पूर्व दोनों की ओर गया, इसलिए दिशा उत्तर-पूर्व.'),
make('अजय की बहन विजय की माँ है। अजय का विजय से संबंध क्या है?',['मामा','भाई','पिता','चाचा'],0,'विजय की माँ अजय की बहन है; माँ का भाई मामा होता है.'),
make('रीना सीमा की माँ है। सीमा अमित की बहन है। रीना का अमित से संबंध?',['बहन','माँ','चाची','दादी'],1,'सीमा और अमित भाई-बहन हैं; उनकी माँ रीना, अमित की भी माँ है.'),
make('सूरज आपके सामने है और वह पूर्व में है। आपकी पीठ किस दिशा में होगी?',['उत्तर','दक्षिण','पूर्व','पश्चिम'],3,'पूर्व के विपरीत दिशा पश्चिम है.'),
make('नेहा पश्चिम 4 m और फिर दक्षिण 3 m गई। प्रारंभ बिंदु से दिशा?',['उत्तर-पश्चिम','दक्षिण-पश्चिम','दक्षिण-पूर्व','उत्तर-पूर्व'],1,'पश्चिम + दक्षिण = दक्षिण-पश्चिम.'),
make('P, Q का पिता है और Q, R की बहन है। P का R से संबंध?',['पिता','मामा','भाई','दादा'],0,'Q और R भाई-बहन हैं और P, Q का पिता है; इसलिए P, R का भी पिता है.')
]};

function buildQuestions(chapterId){const base=data[chapterId]||[];if(chapterId==='number-series'||chapterId==='alphabet-series'){const practice=base.slice(0,10);const challenge=base.slice(10,20);const test=[0,2,4,6,8,10,12,14,16,18,20,22,24,26,28].filter(i=>i<base.length).map(i=>base[i]);return{practice,challenge,test}}const challenge=base.filter((_,i)=>i%2===1).map(x=>({...x,difficulty:'चैलेंज'}));const practice=base.filter((_,i)=>i%2===0);const test=base.slice(0,Math.min(12,base.length));return{practice,challenge,test}}

function Quiz({chapterId,mode,onBack,addXp,finishSession}){const bank=useMemo(()=>buildQuestions(chapterId),[chapterId]);const source=bank[mode]||bank.practice;const[seed,setSeed]=useState(0),[index,setIndex]=useState(0),[selected,setSelected]=useState(null),[score,setScore]=useState(0),[done,setDone]=useState(false);const questions=useMemo(()=>source.map((q,i)=>{const shift=(seed+i)%q.options.length;const opts=q.options.map((text,oi)=>({text,oi}));const rotated=opts.slice(shift).concat(opts.slice(0,shift));return{...q,options:rotated.map(v=>v.text),answer:rotated.findIndex(v=>v.oi===q.answer)}}),[source,seed]);const cur=questions[index];const pct=questions.length?Math.round((index+1)/questions.length*100):0;if(done){const percent=questions.length?Math.round(score/questions.length*100):0;return <div className="reasoning-result"><div className="result-icon">🏆</div><h3>{mode==='challenge'?'Challenge complete!':mode==='test'?'Final Test complete!':'Practice complete!'}</h3><p>{score} / {questions.length} सही • {percent}%</p><div className="result-bar"><span style={{width:`${percent}%`}}/></div><div className="result-actions"><button type="button" onClick={()=>{setSeed(s=>s+1);setIndex(0);setSelected(null);setScore(0);setDone(false)}}>फिर से करें</button><button type="button" onClick={onBack}>अध्याय पर लौटें</button></div></div>};const choose=i=>{if(selected!==null)return;setSelected(i);if(i===cur.answer)setScore(s=>s+1)};const next=()=>{if(selected===null)return;const finalCorrect=selected===cur.answer;if(index===questions.length-1){const finalScore=score+(finalCorrect?1:0);const gained=mode==='challenge'?20:mode==='test'?30:10;addXp?.(gained);finishSession?.({subject:'तर्कशक्ति',chapter:chapterId,mode,attempted:questions.length,correct:Math.min(finalScore,questions.length),completed:true});setDone(true)}else{setIndex(i=>i+1);setSelected(null)}};return <div className="reasoning-quiz"><div className="quiz-head"><button type="button" className="quiz-back" onClick={onBack}>← वापस</button><span>{mode==='test'?'🎯 Final Test':mode==='challenge'?'🔥 Challenge':'📝 Practice'}</span><em>{index+1}/{questions.length}</em></div><div className="quiz-track"><span style={{width:`${pct}%`}}/></div><article className="quiz-card"><small>{cur.difficulty}</small><h3>{cur.question}</h3><div className="quiz-options">{cur.options.map((opt,i)=><button type="button" key={`${i}-${opt}`} className={`quiz-option ${selected!==null?(i===cur.answer?'correct':i===selected?'wrong':''):''}`} onClick={()=>choose(i)}>{String.fromCharCode(65+i)}. {opt}</button>)}</div>{selected!==null&&<div className="reasoning-explain"><b>{selected===cur.answer?'✅ सही उत्तर':'❌ सही उत्तर देखें'}</b><p>{cur.explanation}</p></div>}<button type="button" className="quiz-next" disabled={selected===null} onClick={next}>{index===questions.length-1?'परिणाम देखें':'अगला प्रश्न →'}</button></article></div>}

export default function ReasoningHub({initialChapter=null,initialMode=null,onExit,addXp,finishSession}){const[chapterId,setChapterId]=useState(initialChapter),[mode,setMode]=useState(initialMode);const active=chapters.find(c=>c.id===chapterId);const back=()=>{if(mode){setMode(null);return}if(active){setChapterId(null);return}onExit?.()};if(active&&mode&&['practice','challenge','test'].includes(mode))return <Quiz chapterId={active.id} mode={mode} onBack={back} addXp={addXp} finishSession={finishSession}/>;if(active)return <div className="reasoning-chapter"><button type="button" className="reasoning-exit" onClick={back}>← तर्कशक्ति पर वापस</button><div className="chapter-hero"><span>{active.icon}</span><div><span>अध्याय {chapters.findIndex(c=>c.id===active.id)+1}</span><h2>{active.title}</h2><p>{active.desc}</p></div></div><div className="lesson-box"><h3>📚 Learn</h3>{active.id==='number-series'?<><p><b>संख्या श्रृंखला कैसे हल करें:</b> सबसे पहले लगातार पदों का अंतर देखें। अंतर समान हो तो जोड़/घटाव, अनुपात समान हो तो गुणा/भाग, और बदलता अंतर हो तो differences की अगली कड़ी खोजें। फिर squares, cubes, alternating rules और दोहराए जाने वाले नियम जाँचें।</p><div className="lesson-pills"><span>1. समान अंतर: +3, +5, −4</span><span>2. गुणा/भाग: ×2, ×3, ÷2</span><span>3. बढ़ता अंतर: +2,+3,+4…</span><span>4. वर्ग/घन: n², n³</span><span>5. मिश्रित नियम: ×2+1, ×2−2</span></div></>:active.id==='alphabet-series'?<><p><b>अक्षर श्रृंखला कैसे हल करें:</b> पहले हर अक्षर की alphabetical position (A=1 … Z=26) लिखें। फिर आगे/पीछे का jump देखें। jump समान हो तो simple pattern, और jump बदल रहा हो तो +1,+2,+3 जैसे second-level pattern खोजें। अंत में alternating और wrap-around patterns जाँचें।</p><div className="lesson-pills"><span>1. Alphabet position: A=1 … Z=26</span><span>2. Forward jump: +2,+3,+4…</span><span>3. Backward jump: −2,−3,−4…</span><span>4. Alternating: A,Z,B,Y…</span><span>5. Mixed pattern: +4,+1 दोहराव</span></div></>:<><p>प्रश्न हल करने से पहले नियम पहचानें। अंतर, क्रम, संबंध, दिशा या code का pattern तय करें; फिर उत्तर विकल्पों में मिलाएँ.</p><div className="lesson-pills">{active.lessons.map((x,i)=><span key={x}>{i+1}. {x}</span>)}</div></>}</div><section className="reasoning-smart-panel reasoning-v2-learning-path">
          <div className="smart-head">
            <span className="smart-badge">REASONING LAB • STEP BY STEP</span>
            <h3>{active.id==='number-series'?'संख्या श्रृंखला — Pattern Detective Mode':'अक्षर श्रृंखला — Position Detective Mode'}</h3>
            <p>{active.id==='number-series'?'Pattern की family पहचानें → rule verify करें → answer चुनें।':'Position निकालें → jump देखें → pattern को verify करें → answer चुनें।'}</p>
          </div>
          <div className="reasoning-flow">
            <div className="flow-step"><span>01</span><b>Observe</b><small>Sequence को ध्यान से पढ़ें</small></div><div className="flow-arrow">→</div>
            <div className="flow-step"><span>02</span><b>Detect</b><small>{active.id==='number-series'?'Difference / Ratio':'Position / Jump'} खोजें</small></div><div className="flow-arrow">→</div>
            <div className="flow-step"><span>03</span><b>Verify</b><small>कम-से-कम 3 transitions जाँचें</small></div><div className="flow-arrow">→</div>
            <div className="flow-step"><span>04</span><b>Answer</b><small>तभी सही option चुनें</small></div>
          </div>
          <div className="smart-grid">
            {active.id==='number-series'?<>
              <article><b>🔎 Difference First</b><span>पहले +/− अंतर निकालें।</span><strong>2, 5, 8, 11 → +3 → 14</strong></article>
              <article><b>📈 Ratio Check</b><span>फिर ×/÷ pattern देखें।</span><strong>4, 8, 16, 32 → ×2 → 64</strong></article>
              <article><b>🧠 Hidden Rule</b><span>Squares, cubes, growing differences और mixed rules.</span><strong>1, 4, 9, 16 → 5² → 25</strong></article>
            </>:<>
              <article><b>🔤 Position</b><span>A=1 … Z=26 में बदलें।</span><strong>A, C, E, G → 1,3,5,7 → I</strong></article>
              <article><b>↗️ Jump</b><span>Forward / backward jump की size निकालें।</span><strong>B, E, H, K → +3 → N</strong></article>
              <article><b>🧩 Advanced</b><span>Increasing, alternating और wrap-around patterns.</span><strong>A, B, D, G, K → +1,+2,+3,+4 → P</strong></article>
            </>}
          </div>
          <div className="smart-tip"><b>🎯 Exam Rule:</b> एक rule को पूरे sequence पर verify किए बिना answer mark न करें।</div>
        </section><div className="mode-grid"><button type="button" onClick={()=>setMode('practice')}><span>📝</span><b>Practice</b><small>{active.id==='number-series'||active.id==='alphabet-series'?'10 guided questions':'6 guided questions'}</small></button><button type="button" onClick={()=>setMode('challenge')}><span>🔥</span><b>Challenge</b><small>{active.id==='number-series'||active.id==='alphabet-series'?'10 higher-order questions':'6 higher-order questions'}</small></button><button type="button" onClick={()=>setMode('test')}><span>🎯</span><b>Final Test</b><small>{active.id==='number-series'||active.id==='alphabet-series'?'15 adaptive questions':'12 mixed questions'}</small></button></div></div>;return <div className="reasoning-wrap" data-reasoning-build={REASONING_BUILD_MARKER}><div className="reasoning-hero"><span className="reasoning-hero-icon">🧠</span><div><span className="reasoning-eyebrow">CLASS 9 • REASONING</span><h2>तर्कशक्ति — सोचिए, जोड़िए, हल कीजिए</h2><p>मुख्य reasoning patterns पर focused practice, challenge और self-test.</p></div></div><div className="reasoning-stats"><span><b>6</b> मुख्य अध्याय</span><span><b>3</b> learning modes</span><span><b>120+</b> question attempts</span></div><div className="reasoning-grid">{chapters.map((c,i)=><button type="button" className="reasoning-card" key={c.id} onClick={()=>setChapterId(c.id)}><span className="reasoning-card-top"><i>{c.icon}</i><em>{String(i+1).padStart(2,'0')}</em></span><strong>{c.title}</strong><small>{c.desc}</small><span className="reasoning-lessons">{c.lessons.map(x=><span key={x}>• {x}</span>)}</span><b className="reasoning-open">अध्याय खोलें →</b></button>)}</div></div>}
