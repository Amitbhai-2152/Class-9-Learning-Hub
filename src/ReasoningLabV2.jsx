import React,{useEffect,useMemo,useState}from'react';
import'./reasoning-lab-v2.css';

const shuffle=arr=>{const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const make=(question,correct,distractors,explanation,difficulty='अभ्यास')=>({question,correct:String(correct),options:[String(correct),...distractors.map(String)],explanation,difficulty});
const TIMER_CONFIG={practice:{minutes:15,perQuestion:45},challenge:{minutes:20,perQuestion:60},test:{minutes:30,perQuestion:60}};
const wrap26=n=>((n-1)%26+26)%26+1;
const letter=n=>String.fromCharCode(64+wrap26(n));
const wordShift=(word,step)=>word.split('').map(c=>letter(c.toUpperCase().charCodeAt(0)-64+step)).join('');

const numberBank=[
 ...Array.from({length:20},(_,i)=>{const d=2+(i%9),a=5+i,v=[a,a+d,a+2*d,a+3*d],ans=a+4*d;return make(`${v.join(', ')}, ?`,ans,[ans-d,ans+d,ans+2*d],`समान अंतर +${d}।`,'अभ्यास')}),
 ...Array.from({length:20},(_,i)=>{const k=2+(i%3),a=2+i%8,v=[a,a*k,a*k*k,a*k*k*k],ans=a*k**4;return make(`${v.join(', ')}, ?`,ans,[ans-k,ans+k,ans+2*k],`हर बार ×${k}।`,'अभ्यास')}),
 ...Array.from({length:20},(_,i)=>{const d=2+(i%5),a=3+i,v=[a,a+d,a+3*d,a+6*d],ans=a+10*d;return make(`${v.join(', ')}, ?`,ans,[ans-d,ans+d,ans+2*d],`अंतर +${d}, +${2*d}, +${3*d}; अगला +${4*d}।`,'चैलेंज')}),
 ...Array.from({length:20},(_,i)=>{const a=3+i,v=[a,a*2,a*2+3,(a*2+3)*2],ans=(a*2+3)*2+3;return make(`${v.join(', ')}, ?`,ans,[ans-3,ans+2,ans+5],'×2, +3 का alternating rule।','चैलेंज')}),
 ...Array.from({length:20},(_,i)=>{const n=4+i,v=i%2===0?[n*n,(n+1)**2,(n+2)**2]:[n,n+2,n+6,n+12],ans=i%2===0?(n+3)**2:n+20;return make(`${v.join(', ')}, ?`,ans,[ans-1,ans+1,ans+4],i%2===0?'क्रमिक पूर्ण वर्ग।':'अंतर +2,+4,+6; अगला +8।','कठिन')})
];

const alphabetBank=[
 ...Array.from({length:20},(_,i)=>{const step=2+i%6,a=1+i%10,v=[a,a+step,a+2*step,a+3*step].map(letter),ans=letter(a+4*step);return make(`${v.join(', ')}, ?`,ans,[letter(a+4*step+1),letter(a+4*step-1),letter(a+4*step+2)],`हर बार +${step} position।`,'अभ्यास')}),
 ...Array.from({length:20},(_,i)=>{const step=2+i%5,a=26-i%10,v=[a,a-step,a-2*step,a-3*step].map(letter),ans=letter(a-4*step);return make(`${v.join(', ')}, ?`,ans,[letter(a-4*step+1),letter(a-4*step-1),letter(a-4*step+2)],`हर बार −${step} position।`,'अभ्यास')}),
 ...Array.from({length:20},(_,i)=>{const a=1+i%8,v=[a,a+1,a+3,a+6,a+10].map(letter),ans=letter(a+15);return make(`${v.join(', ')}, ?`,ans,[letter(a+14),letter(a+16),letter(a+17)],'Jump +1,+2,+3,+4; अगला +5।','चैलेंज')}),
 ...Array.from({length:20},(_,i)=>{const a=2+i%8,v=[a,a+3,a+7,a+12].map(letter),ans=letter(a+18);return make(`${v.join(', ')}, ?`,ans,[letter(a+17),letter(a+19),letter(a+20)],'Jump +3,+4,+5; अगला +6।','चैलेंज')}),
 ...Array.from({length:20},(_,i)=>{const a=1+i%12,v=[a,a+4,a+3,a+7,a+6].map(letter),ans=letter(a+10);return make(`${v.join(', ')}, ?`,ans,[letter(a+9),letter(a+11),letter(a+12)],'Alternating +4, −1।','कठिन')})
];

const analogySeeds=[
 ['Doctor : Hospital :: Teacher : ?','School',['Court','Market','Farm'],'काम का स्थान।'],
 ['Bird : Nest :: Bee : ?','Hive',['Cage','Hole','Pond'],'जीव : निवास।'],
 ['Book : Read :: Food : ?','Eat',['Cook','Sell','Wash'],'वस्तु : क्रिया।'],
 ['Day : Night :: Hot : ?','Cold',['Warm','Dry','Bright'],'विलोम संबंध।'],
 ['Hand : Finger :: Foot : ?','Toe',['Leg','Knee','Arm'],'भाग : पूर्ण।'],
 ['Author : Book :: Painter : ?','Painting',['Brush','Paper','Color'],'सृजनकर्ता : सृजन।'],
 ['Seed : Plant :: Egg : ?','Bird',['Fruit','Tree','Leaf'],'उत्पत्ति संबंध।'],
 ['Clock : Time :: Thermometer : ?','Temperature',['Weather','Distance','Speed'],'उपकरण : माप।'],
 ['Puppy : Dog :: Calf : ?','Cow',['Goat','Horse','Sheep'],'शिशु : वयस्क।'],
 ['India : New Delhi :: Nepal : ?','Kathmandu',['Thimphu','Dhaka','Colombo'],'देश : राजधानी।'],
 ['Knife : Cut :: Pen : ?','Write',['Read','Draw','Erase'],'उपकरण : कार्य।'],
 ['Milk : Cow :: Wool : ?','Sheep',['Hen','Horse','Dog'],'स्रोत संबंध।'],
 ['Eye : See :: Ear : ?','Hear',['Speak','Smell','Touch'],'इंद्रिय : कार्य।'],
 ['Fish : Water :: Bird : ?','Air',['Soil','Road','Cave'],'जीव : वातावरण।'],
 ['Triangle : 3 :: Square : ?','4',['5','6','8'],'भुजाओं की संख्या।'],
 ['Gold : Metal :: Rose : ?','Flower',['Fruit','Tree','Seed'],'वर्ग : सदस्य।'],
 ['Car : Road :: Ship : ?','Water',['Air','Rail','Garage'],'वाहन : माध्यम।'],
 ['Smile : Happiness :: Tears : ?','Sadness',['Anger','Sleep','Hunger'],'भाव : संकेत।'],
 ['Morning : Sunrise :: Evening : ?','Sunset',['Noon','Rain','Midnight'],'समय : प्रमुख घटना।'],
 ['Tailor : Cloth :: Carpenter : ?','Wood',['Iron','Glass','Paper'],'कारीगर : सामग्री।']
];
const analogyBank=[
 ...analogySeeds.map(x=>make(...x)),
 ...Array.from({length:80},(_,i)=>{const a=6+i,t=i%8;if(t===0)return make(`${a} : ${a+4} :: ${a+10} : ?`,a+14,[a+12,a+15,a+18],'दोनों में +4।','अभ्यास');if(t===1)return make(`${a} : ${a*2} :: ${a+3} : ?`,(a+3)*2,[(a+3)+2,(a+3)*3,(a+3)*4],'दोनों में ×2।','चैलेंज');if(t===2)return make(`${a} : ${a*a} :: ${a+2} : ?`,(a+2)**2,[(a+2)*2,(a+2)*3,(a+2)**3],'वर्ग संबंध।','चैलेंज');if(t===3)return make(`${a} : ${a**3} :: ${a+1} : ?`,(a+1)**3,[(a+1)**2,(a+1)*2,(a+1)*4],'घन संबंध।','कठिन');if(t===4){const z=[['Writer','Book'],['Singer','Song'],['Sculptor','Statue'],['Chef','Food']][i%4];return make(`Creator : Work :: ${z[0]} : ?`,z[1],['Brush','Paper','Stage'],'सृजनकर्ता : सृजन।','चैलेंज')}if(t===5){const z=[['Teeth','Chew'],['Eyes','See'],['Ears','Hear'],['Nose','Smell']][i%4];return make(`Body part : Function :: ${z[0]} : ?`,z[1],['Walk','Speak','Sleep'],'अंग : कार्य।','चैलेंज')}if(t===6){const z=[['Gold','Metal'],['Rose','Flower'],['Mango','Fruit'],['Tiger','Animal']][i%4];return make(`Member : Category :: ${z[0]} : ?`,z[1],['Color','Place','Action'],'सदस्य : वर्ग।','अभ्यास')}const z=[['Day','24'],['Week','7'],['Year','12'],['Dozen','12']][i%4];return make(`${z[0]} : ${z[1]} :: ${a} : ?`,z[1],[String(a+1),String(a+2),String(a+3)],'मानक इकाई/संख्या संबंध।','कठिन')})
];

const classificationBank=[
 ...[
  ['अलग चुनिए: 2, 4, 6, 9','9',['8','10','12'],'पहली तीन सम हैं।'],
  ['अलग चुनिए: 3, 5, 7, 9','9',['11','13','15'],'9 अभाज्य नहीं है।'],
  ['अलग शब्द: आम, केला, संतरा, गाजर','गाजर',['सेब','अमरूद','पपीता'],'गाजर सब्जी है।'],
  ['अलग इकाई: मीटर, सेंटीमीटर, किलोमीटर, किलोग्राम','किलोग्राम',['मिलीमीटर','डेसीमीटर','मीटर'],'किलोग्राम द्रव्यमान की इकाई है।'],
  ['अलग: सोमवार, मंगलवार, मार्च, शुक्रवार','मार्च',['बुधवार','गुरुवार','शनिवार'],'मार्च महीना है।'],
  ['अलग: 16, 25, 36, 45','45',['49','64','81'],'45 पूर्ण वर्ग नहीं है।'],
  ['अलग: 8, 27, 64, 100','100',['125','216','343'],'100 पूर्ण घन नहीं है।'],
  ['अलग अक्षर: A, E, I, B','B',['O','U','E'],'B स्वर नहीं है।'],
  ['अलग: गंगा, यमुना, नर्मदा, हिमालय','हिमालय',['गोदावरी','कावेरी','सोन'],'हिमालय नदी नहीं है।'],
  ['अलग: बस, ट्रेन, कार, आम','आम',['साइकिल','ट्रक','रिक्शा'],'आम वाहन नहीं है।'],
  ['अलग संख्या: 11, 13, 17, 21','21',['19','23','29'],'21 अभाज्य नहीं है।'],
  ['अलग माप: लीटर, मिलीलीटर, गैलन, किलोग्राम','किलोग्राम',['सेकंड','मीटर','किमी'],'किलोग्राम आयतन की इकाई नहीं है।']
 ].map(x=>make(...x)),
 ...Array.from({length:88},(_,i)=>{const b=5+i,t=i%8;if(t===0){const n=[b*2,b*4,b*6,b*7+1];return make(`अलग संख्या: ${n.join(', ')}`,n[3],[b*8,b*10,b*12],`पहली तीन ${b} के सम गुणज हैं।`,'चैलेंज')}if(t===1){const n=[b*b,(b+1)**2,(b+2)**2,b*b+3];return make(`अलग संख्या: ${n.join(', ')}`,n[3],[(b+3)**2,(b+4)**2,(b+5)**2],'बाकी पूर्ण वर्ग हैं।','कठिन')}if(t===2){const n=[b*3,b*5,b*7,b*8+1];return make(`अलग संख्या: ${n.join(', ')}`,n[3],[b*9,b*11,b*13],`पहली तीन ${b} के विषम गुणज हैं।`,'चैलेंज')}if(t===3){const w=[['सेब','आम','केला','कुर्सी'],['गाय','बकरी','घोड़ा','किताब'],['लाल','नीला','हरा','सात'],['दिल्ली','पटना','मुंबई','जनवरी']][i%4];return make(`अलग शब्द: ${w.join(', ')}`,w[3],[w[0],w[1],'फल'],'पहले तीन एक ही category में हैं।','अभ्यास')}if(t===4){const n=[b+2,b+3,b+5,b+9];return make(`अलग संख्या: ${n.join(', ')}`,n[3],[b+11,b+13,b+15],'पहले तीन दिए गए prime-offset pattern को follow करते हैं।','चैलेंज')}if(t===5){const w=[['A','E','I','O','B'],['B','C','D','F','A'],['Z','X','V','T','R']][i%3];const ans=w[3];return make(`अलग अक्षर: ${w.join(', ')}`,ans,w.filter(x=>x!==ans).slice(0,3),'दिए समूह में अंतिम अक्षर अलग property रखता है।','अभ्यास')}if(t===6){const w=[['मीटर','सेमी','किमी','किलोग्राम'],['लीटर','मिलीलीटर','गैलन','किलोमीटर'],['सेकंड','मिनट','घंटा','मीटर']][i%3];const ans=w[3];return make(`अलग इकाई: ${w.join(', ')}`,ans,w.filter(x=>x!==ans).slice(0,3),'बाकी तीन समान प्रकार की माप इकाइयाँ हैं।','अभ्यास')}const w=[['जनवरी','मार्च','जुलाई','सोमवार'],['सोमवार','बुधवार','शुक्रवार','अप्रैल'],['उत्तर','दक्षिण','पूर्व','अगस्त']][i%3];const ans=w[3];return make(`अलग चुनिए: ${w.join(', ')}`,ans,w.filter(x=>x!==ans).slice(0,3),'तीन items एक ही प्रकार के हैं; एक अलग है।','अभ्यास')})
];

const codingWords=['CAT','DOG','PEN','SUN','BOX','HEN','MAP','FISH','BIRD','LAMP','TREE','HOME','GAME','ROAD','BOOK','MANGO','GRAPE','BLUE','GOLD','FIRE','APPLE','TRAIN','SCHOOL','CHAIR','MUSIC','STAR','RING','NOTE','BALL','KING'];
const codingBank=[
 ...Array.from({length:50},(_,i)=>{const ref=codingWords[i%codingWords.length],target=codingWords[(i+7)%codingWords.length],step=1+i%5,code=wordShift(ref,step),ans=wordShift(target,step);const opts=[wordShift(target,step-1),wordShift(target,step+1),wordShift(target,-step)];return make(`यदि ${ref} को ${code} लिखा जाए, तो ${target} को उसी नियम से कैसे लिखेंगे?`,ans,opts,`हर अक्षर में ${step} position का shift है।`,'अभ्यास')}),
 ...Array.from({length:25},(_,i)=>{const ref=codingWords[(i+3)%codingWords.length],target=codingWords[(i+13)%codingWords.length],step=2+i%4,code=wordShift(ref,step),ans=wordShift(target,step);return make(`यदि ${ref} → ${code}, तो ${target} → ?`,ans,[wordShift(target,step-1),wordShift(target,step+1),wordShift(target,-step)],`उसी उदाहरण के अनुसार प्रत्येक अक्षर +${step}।`,'चैलेंज')}),
 ...Array.from({length:25},(_,i)=>{const ref=codingWords[(i+5)%codingWords.length],target=codingWords[(i+17)%codingWords.length],step=-2-(i%4),code=wordShift(ref,step),ans=wordShift(target,step);return make(`यदि ${ref} → ${code}, तो ${target} → ?`,ans,[wordShift(target,step+1),wordShift(target,step-1),wordShift(target,-step)],`उसी उदाहरण के अनुसार प्रत्येक अक्षर ${step} position move करता है।`,'कठिन')})
];

const relationSets=[
 ['पिता','माँ','भाई','बहन','चाचा','मौसी','दादा','दादी','नाना','नानी','बुआ','मामा'],
 ['चाचा','मौसी','दादा','दादी','नाना','नानी','बुआ','मामा','भाई','बहन','पिता','माँ']
];
const directionBank=[
 ...[
  ['उत्तर की ओर हैं, 90° दाएँ मुड़ें। दिशा?','पूर्व',['पश्चिम','उत्तर','दक्षिण'],'उत्तर से right = पूर्व।'],
  ['पूर्व की ओर हैं, 90° बाएँ मुड़ें। दिशा?','उत्तर',['दक्षिण','पूर्व','पश्चिम'],'पूर्व से left = उत्तर।'],
  ['दक्षिण की ओर हैं, 90° दाएँ मुड़ें। दिशा?','पश्चिम',['पूर्व','उत्तर','दक्षिण'],'दक्षिण से right = पश्चिम।'],
  ['पश्चिम की ओर हैं, 90° बाएँ मुड़ें। दिशा?','दक्षिण',['उत्तर','पूर्व','पश्चिम'],'पश्चिम से left = दक्षिण।'],
  ['5m उत्तर और 5m पूर्व जाएँ। प्रारम्भिक बिंदु से दिशा?','उत्तर-पूर्व',['उत्तर-पश्चिम','दक्षिण-पूर्व','दक्षिण-पश्चिम'],'उत्तर + पूर्व = उत्तर-पूर्व।'],
  ['8m उत्तर, 5m पूर्व, 8m दक्षिण। प्रारम्भिक बिंदु से दिशा?','पूर्व',['पश्चिम','उत्तर','दक्षिण'],'उत्तर और दक्षिण cancel; पूर्व बचता है।'],
  ['P, Q का पिता है और Q, R की बहन है। P का R से संबंध?','पिता',['भाई','चाचा','दादा'],'P दोनों का पिता है।'],
  ['R, S की माँ है और S, T का भाई है। R का T से संबंध?','माँ',['बहन','दादी','चाची'],'S और T भाई-बहन हैं।'],
  ['A, B का पिता है और B, C की माँ है। A का C से संबंध?','नाना',['पिता','मामा','चाचा'],'माँ का पिता = नाना।'],
  ['P, Q की बहन है और Q, R का पिता है। P का R से संबंध?','बुआ',['माँ','दादी','बहन'],'पिता की बहन = बुआ।'],
  ['A, B का भाई है और B, C का पिता है। A का C से संबंध?','चाचा',['मामा','भाई','पिता'],'पिता का भाई = चाचा।'],
  ['M, N का पुत्र है और N, P की माँ है। M का P से संबंध?','भाई',['मामा','पुत्र','चाचा'],'एक ही माँ के बच्चे भाई-बहन हैं।']
 ].map(x=>make(...x)),
 ...Array.from({length:44},(_,i)=>{const dirs=['उत्तर','पूर्व','दक्षिण','पश्चिम'];const d=dirs[i%4];const turns=[[90,90],[90,180],[180,90],[270,90],[90,90,90],[180,90,270],[90,270,180],[270,180,90]][i%8];const order={उत्तर:0,पूर्व:1,दक्षिण:2,पश्चिम:3};let pos=order[d],parts=[];turns.forEach(t=>{pos=(pos+t/90)%4;parts.push(`${t}° दाएँ`)});const ans=dirs[pos];return make(`${d} की ओर मुख है; ${parts.join(', ')} मुड़ने के बाद दिशा?`,ans,dirs.filter(x=>x!==ans).slice(0,3),'हर turn के बाद current facing direction बदलकर अंतिम दिशा निकाली जाती है।',i<15?'अभ्यास':i<30?'चैलेंज':'कठिन')}),
 ...Array.from({length:44},(_,i)=>{const g=[['A','B','C'],['P','Q','R'],['M','N','O'],['X','Y','Z']][i%4],t=i%8;let q,ans,exp;if(t===0){q=`${g[0]}, ${g[1]} का भाई है और ${g[1]}, ${g[2]} का पिता है। ${g[0]} का ${g[2]} से संबंध?`;ans='चाचा';exp='पिता का भाई = चाचा।'}else if(t===1){q=`${g[0]}, ${g[1]} की बहन है और ${g[1]}, ${g[2]} की माँ है। ${g[0]} का ${g[2]} से संबंध?`;ans='मौसी';exp='माँ की बहन = मौसी।'}else if(t===2){q=`${g[0]}, ${g[1]} का पिता है और ${g[1]}, ${g[2]} का भाई है। ${g[0]} का ${g[2]} से संबंध?`;ans='पिता';exp='दोनों का पिता समान है।'}else if(t===3){q=`${g[0]}, ${g[1]} की माँ है और ${g[1]}, ${g[2]} का पिता है। ${g[0]} का ${g[2]} से संबंध?`;ans='दादी';exp='पिता की माँ = दादी।'}else if(t===4){q=`${g[0]}, ${g[1]} की बहन है; ${g[1]}, ${g[2]} का पिता है। ${g[0]} का ${g[2]} से संबंध?`;ans='बुआ';exp='पिता की बहन = बुआ।'}else if(t===5){q=`${g[0]}, ${g[1]} का पुत्र है और ${g[1]}, ${g[2]} का भाई है। ${g[0]} का ${g[2]} से संबंध?`;ans='भतीजा';exp='भाई का पुत्र = भतीजा।'}else if(t===6){q=`${g[0]}, ${g[1]} की पुत्री है और ${g[1]}, ${g[2]} की बहन है। ${g[0]} का ${g[2]} से संबंध?`;ans='भांजी';exp='बहन की पुत्री = भांजी।'}else{q=`${g[0]}, ${g[1]} की माँ है; ${g[1]}, ${g[2]} की बहन है। ${g[0]} का ${g[2]} से संबंध?`;ans='माँ';exp='दोनों भाई-बहन हैं, इसलिए उनकी माँ दोनों की माँ है।'}const pool=relationSets[i%2].filter(x=>x!==ans);return make(q,ans,pool.slice(0,3),exp,i<15?'अभ्यास':i<30?'चैलेंज':'कठिन')})
];

const chapters=[
{id:'number-series',title:'संख्या श्रृंखला',icon:'🔢',kicker:'PATTERN DETECTION',desc:'समान अंतर, गुणा–भाग, बढ़ते अंतर और mixed rules से sequence solve करें।',skills:['समान अंतर','गुणा–भाग','बढ़ते अंतर','वर्ग / घन','Second difference'],learn:{headline:'पहले difference, फिर operation, फिर pattern',example:'2, 6, 12, 20, 30, ?',answer:'42',why:'अंतर 4, 6, 8, 10 हैं; अगला +12 → 42।',trap:'सिर्फ अंतिम दो पद देखकर rule तय मत करें।',steps:['Consecutive differences निकालें।','Ratio और ×/÷ देखें।','Increasing difference या second difference जाँचें।','पूरे sequence पर rule verify करें।'],tip:'कम-से-कम 3 transitions verify करके answer चुनें।'}},
{id:'alphabet-series',title:'अक्षर श्रृंखला',icon:'🔤',kicker:'LETTER PATTERNS',desc:'A=1…Z=26 से forward, backward और mixed jumps पकड़ें।',skills:['Position','Forward jump','Backward jump','Increasing jump','Mixed'],learn:{headline:'Letters को positions में बदलकर rule पढ़ें',example:'A, D, G, J, ?',answer:'M',why:'हर बार +3 positions: J+3=M।',trap:'Letter देखकर guess करने की बजाय position check करें।',steps:['A=1…Z=26 लिखें।','हर transition का jump निकालें।','Forward/backward movement पहचानें।','पूरे sequence में pattern verify करें।'],tip:'Mixed sequence में positions लिखना सबसे तेज तरीका है।'}},
{id:'analogy',title:'समानता (Analogy)',icon:'🔗',kicker:'RELATION MAPPING',desc:'पहली जोड़ी का exact relation दूसरी जोड़ी पर लागू करें।',skills:['कार्य','विलोम','भाग–पूर्ण','Power relation','Category'],learn:{headline:'Relation को एक छोटे rule में बदलें',example:'2 : 4 :: 7 : ?',answer:'49',why:'पहली जोड़ी में square relation है; 7²=49।',trap:'सिर्फ शब्द समान दिखने पर नहीं, relation पर ध्यान दें।',steps:['पहली जोड़ी का relation बोलें।','Function या operation पहचानें।','वही rule दूसरी जोड़ी पर लगाएँ।','Options से verify करें।'],tip:'Relation को एक वाक्य में बोल पाना strong clue है।'}},
{id:'classification',title:'वर्गीकरण / Odd One Out',icon:'🧩',kicker:'ODD ONE OUT',desc:'सभी elements की common property खोजकर अलग item चुनें।',skills:['संख्या','शब्द','अक्षर','इकाई','Category'],learn:{headline:'पहले common property, फिर odd item',example:'4, 9, 16, 18',answer:'18',why:'4, 9, 16 पूर्ण वर्ग हैं; 18 नहीं।',trap:'एक से अधिक properties दिखें तो strongest common rule चुनें।',steps:['Common property खोजें।','Category, unit या numerical rule देखें।','Odd item isolate करें।','बाकी items पर rule verify करें।'],tip:'हर option को एक ही rule से test करें।'}},
{id:'coding-decoding',title:'Coding–Decoding',icon:'🔐',kicker:'CODE BREAKING',desc:'Letter shift, position, reverse और number code को व्यवस्थित ढंग से हल करें।',skills:['Letter shift','Position code','Reverse','Number code','Mixed coding'],learn:{headline:'Code को छोटे transformation में तोड़ें',example:'CAT → DBU, HEN → ?',answer:'IFO',why:'हर अक्षर +1: H→I, E→F, N→O।',trap:'एक letter नहीं, पूरे code पर transformation verify करें।',steps:['दिए pair में बदलाव निकालें।','हर character पर rule लगाएँ।','Reverse/position coding जाँचें।','Final code को options से verify करें।'],tip:'पहले 2–3 characters पर rule confirm करो।'}},
{id:'direction-blood',title:'दिशा एवं रक्त संबंध',icon:'🧭',kicker:'LOGICAL RELATIONS',desc:'Compass turns और family tree को mental map से solve करें।',skills:['दिशा','दूरी','Family tree','Turns','Combined'],learn:{headline:'Direction और relation को map की तरह सोचें',example:'उत्तर 5m, फिर दाएँ।',answer:'पूर्व',why:'उत्तर से right turn = पूर्व।',trap:'Turn को अपनी current facing direction के हिसाब से calculate करें।',steps:['Starting direction तय करें।','हर turn का effect लिखें।','Family relation में छोटा tree बनाएँ।','Final relation verify करें।'],tip:'90°, 180°, 270° को compass पर mentally map करें।'}}
];
const banks={'number-series':numberBank,'alphabet-series':alphabetBank,'analogy':analogyBank,'classification':classificationBank,'coding-decoding':codingBank,'direction-blood':directionBank};
const deepDive={'number-series':'Advanced focus: second difference, ratio pattern, alternating operation और hidden square/cube sequence को भी test करें।','alphabet-series':'Advanced focus: positions को arithmetic sequence की तरह पढ़ें; mixed forward/backward jumps में पूरा cycle verify करें।','analogy':'Advanced focus: function, category, part-whole, power और opposite relations को exact rule में बदलें।','classification':'Advanced focus: common mathematical/category property सभी candidates पर समान लगनी चाहिए।','coding-decoding':'Advanced focus: shift + reverse + position जैसे combined transformations को चरणों में तोड़ें।','direction-blood':'Advanced focus: current facing direction track करें; family relations में generation-by-generation map बनाएँ।'};
const prepare=(bank,count,mode='practice')=>{const rank={अभ्यास:0,चैलेंज:1,कठिन:2};const predicate=mode==='practice'?q=>rank[q.difficulty]<2:mode==='challenge'?q=>rank[q.difficulty]>=1:q=>true;const pool=bank.filter(predicate);return shuffle(pool.length>=count?pool:bank).slice(0,Math.min(count,bank.length)).map(q=>({...q,options:shuffle(q.options.map(text=>({text:String(text),correct:String(text)===q.correct})))}))};

export default function ReasoningLabV2({initialChapter=null,initialMode=null,onExit=()=>{},addXp=()=>{},finishSession=()=>{}}){
 const chapterInitial=chapters.some(c=>c.id===initialChapter)?initialChapter:chapters[0].id;
 const modeInitial=['learn','practice','challenge','test'].includes(initialMode)?initialMode:'learn';
 const[chapterId,setChapterId]=useState(chapterInitial);const[mode,setMode]=useState(modeInitial);const[session,setSession]=useState(null);const[answers,setAnswers]=useState({});const[score,setScore]=useState(0);const[completed,setCompleted]=useState(false);const[testStarted,setTestStarted]=useState(false);const[timeLeft,setTimeLeft]=useState(TIMER_CONFIG.practice.minutes*60);
 const active=chapters.find(c=>c.id===chapterId)||chapters[0];const bank=banks[active.id];const counts=useMemo(()=>({practice:20,challenge:20}),[]);
 const resetQuiz=()=>{setSession(null);setAnswers({});setScore(0);setCompleted(false);setTestStarted(false)};
 const begin=nextMode=>{setMode(nextMode);setAnswers({});setScore(0);setCompleted(false);if(nextMode==='test'){setSession(null);setTimeLeft(TIMER_CONFIG.test.minutes*60);setTestStarted(false)}else{setSession(prepare(bank,counts[nextMode],nextMode));setTimeLeft(TIMER_CONFIG[nextMode].minutes*60);setTestStarted(true)}};
 const startTest=()=>{setAnswers({});setScore(0);setCompleted(false);setSession(prepare(bank,30,'test'));setTimeLeft(TIMER_CONFIG.test.minutes*60);setTestStarted(true)};
 const finish=timedOut=>{if(!session)return;const correct=session.reduce((n,q,i)=>n+(answers[i]?.correct?1:0),0);setScore(correct);setCompleted(true);finishSession({subject:'reasoning',chapter:active.id,mode,correct,total:session.length,timedOut:Boolean(timedOut),at:new Date().toISOString()});addXp(correct);setTestStarted(false)};
 useEffect(()=>{if(!testStarted||!session)return;const id=setInterval(()=>{setTimeLeft(t=>{if(t<=1){clearInterval(id);finish(true);return 0}return t-1})},1000);return()=>clearInterval(id)},[mode,testStarted,session]);
 useEffect(()=>{resetQuiz()},[chapterId]);
 const mm=String(Math.floor(timeLeft/60)).padStart(2,'0'),ss=String(timeLeft%60).padStart(2,'0');
 const choose=(i,opt)=>setAnswers(a=>({...a,[i]:opt}));
 return <div className="rlab-shell">
  <header className="rlab-header"><button type="button" className="rlab-back" onClick={onExit}>← Reasoning Lab</button><div className="rlab-brand"><span>REASONING LAB</span><small>Class 9 • तर्कशक्ति</small></div></header>
  <div className="rlab-content">
   <aside className="rlab-sidebar"><div className="rlab-sidebar-title">CHAPTERS</div>{chapters.map(c=><button type="button" key={c.id} className={`rlab-chapter ${c.id===active.id?'active':''}`} onClick={()=>{setChapterId(c.id);setMode('learn')}}><span>{c.icon}</span><div><b>{c.title}</b><small>{c.skills.slice(0,2).join(' • ')}</small></div></button>)}</aside>
   <main className="rlab-main">
    <section className="rlab-hero"><div className="rlab-icon">{active.icon}</div><div><div className="rlab-kicker">CHAPTER • {active.kicker}</div><h1>{active.title}</h1><p>{active.desc}</p></div></section>
    <section className="rlab-stats"><div><strong>{bank.length}+</strong><span>QUESTION BANK</span></div><div><strong>20</strong><span>PRACTICE</span></div><div><strong>20</strong><span>CHALLENGE</span></div><div><strong>30</strong><span>FINAL TEST</span></div></section>
    <div className="rlab-skills">{active.skills.map(s=><span key={s}>✓ {s}</span>)}</div>
    <nav className="rlab-tabs">{[['learn','📖 Learn'],['practice','✍️ Practice'],['challenge','🔥 Challenge'],['test','🎯 Final Test']].map(([id,label])=><button type="button" key={id} className={mode===id?'active':''} onClick={()=>id==='test'?begin(id):begin(id)}>{label}</button>)}</nav>
    {mode==='learn'&&<section className="rlab-learn"><div className="smart-head"><span>SMART LEARNING PATH</span><h2>{active.learn.headline}</h2><p>एक fixed process follow करके speed और accuracy दोनों बढ़ाएँ।</p></div><div className="smart-steps">{active.learn.steps.map((st,i)=><article key={st}><b>0{i+1}</b><span>{st}</span></article>)}</div><div className="worked"><div><span>WORKED EXAMPLE</span><h3>{active.learn.example}</h3></div><div className="worked-answer">ANSWER <strong>{active.learn.answer}</strong></div><p>{active.learn.why}</p></div><div className="tip"><b>⚠️ Common Trap</b><span>{active.learn.trap}</span></div><div style={{marginTop:18,padding:'18px 20px',border:'1px solid #dbe5ef',borderRadius:16,background:'#f8fbff'}}><div style={{fontSize:12,fontWeight:800,letterSpacing:'.08em',color:'#287a9f'}}>DEEP DIVE • EXTRA CONTENT</div><p style={{margin:'8px 0 0',lineHeight:1.65}}>{deepDive[active.id]}</p></div><div className="ready"><div><small>READY?</small><h3>Guided Practice से शुरुआत करें</h3><p>{active.learn.tip}</p></div><button type="button" onClick={()=>begin('practice')}>Practice शुरू करें →</button></div></section>}
    {(mode==='practice'||mode==='challenge')&&!session&&<section className="rlab-start"><div className="start-icon">{mode==='practice'?'✍️':'🔥'}</div><h2>{mode==='practice'?'Guided Practice':'Challenge Mode'}</h2><p>{mode==='practice'?'20 questions • 15 minutes • answers and marks at the end.':'20 higher-difficulty questions • 20 minutes • answers and marks at the end.'}</p><button type="button" onClick={()=>begin(mode)}>Start {mode==='practice'?'Practice':'Challenge'} →</button></section>}
    {mode==='test'&&!testStarted&&<section className="rlab-start test-start"><div className="start-icon">🎯</div><div className="timer-preview">30:00</div><h2>Final Test</h2><p>30 प्रश्न • 30 मिनट • प्रत्येक attempt में options randomised होंगे।</p><div className="test-rules"><span>⏱️ Auto-submit on timeout</span><span>🔀 Random options</span><span>📊 Final score</span></div><button type="button" onClick={startTest}>Test शुरू करें →</button></section>}
    {session&&testStarted&&<section className="rlab-quiz"><div className="quiz-top"><div><b>{mode==='test'?'FINAL TEST':mode==='practice'?'PRACTICE':'CHALLENGE'}</b><span>{Object.keys(answers).length} / {session.length} answered</span></div><div className={`countdown ${timeLeft<=60?'danger':''}`}>⏱️ {mm}:{ss}</div></div><div className="progressbar"><span style={{width:`${Math.min(100,Object.keys(answers).length/session.length*100)}%`}}/></div>{session.map((q,i)=><div className="question-card" key={`${q.question}-${i}`}><div className="q-meta">Q{i+1} <span>{q.difficulty}</span></div><h3>{q.question}</h3><div className="options">{q.options.map((o,j)=><button type="button" key={j} className={answers[i]?.text===o.text?'selected':''} onClick={()=>choose(i,o)}><span>{String.fromCharCode(65+j)}</span>{o.text}</button>)}</div>{answers[i]&&<div style={{marginTop:12,padding:'10px 12px',borderRadius:12,background:'#f7fafc'}}><b>✓ Answer recorded</b><div style={{marginTop:4}}>सही उत्तर, अंक और explanation results के अंत में दिखेंगे।</div></div>}</div>)}<div className="quiz-fallback-list">{session.every((_,i)=>answers[i]!==undefined)&&<div className="all-answered"><b>All questions answered.</b><button type="button" onClick={()=>finish(false)}>{mode==='test'?'Submit Final Test':'Finish & See Results'} →</button></div>}</div></section>}
    {completed&&<section className="rlab-result"><div className="result-score"><span>SCORE</span><strong>{score} / {mode==='test'?30:session?.length||20}</strong><p>{score>=Math.ceil((mode==='test'?30:20)*0.8)?'Excellent! तुम्हारी reasoning speed strong है.':score>=Math.ceil((mode==='test'?30:20)*0.6)?'Good work! थोड़ी और practice से accuracy बढ़ेगी.':'Practice जारी रखो और rules को step-by-step verify करो.'}</p></div><section className="answer-key" style={{marginTop:20}}><h3>📋 Answer Review</h3>{session.map((q,i)=>{const picked=answers[i];const ok=Boolean(picked&&picked.correct);return <article key={`${q.question}-${i}`} className="answer-key-item" style={{textAlign:'left',marginTop:10}}><strong>Q{i+1}</strong><div style={{marginTop:5}}>{q.question}</div><div style={{marginTop:5}}>Your answer: {picked?picked.text:'—'} {picked?(ok?'✓':'✗'):''}</div><div style={{marginTop:4}}>Correct answer: {q.correct}</div>{q.explanation&&<p style={{marginTop:5}}>💡 {q.explanation}</p>}</article>})}</section><button type="button" onClick={()=>{resetQuiz();setMode('learn')}}>अध्याय पर लौटें</button></section>}
   </main>
  </div>
 </div>
}
