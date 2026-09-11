import React,{useEffect,useMemo,useState}from'react';
import'./reasoning-lab-v2.css';

const shuffle=arr=>{const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const make=(question,correct,distractors,explanation,difficulty='अभ्यास')=>({question,correct:String(correct),options:[String(correct),...distractors.map(String)],explanation,difficulty});
const TIMER_CONFIG={practice:{minutes:15,perQuestion:45},challenge:{minutes:20,perQuestion:60},test:{minutes:30,perQuestion:60}};
const wrap26=n=>((n-1)%26+26)%26+1;
const letter=n=>String.fromCharCode(64+wrap26(n));
const wordShift=(word,step)=>word.split('').map(c=>letter(c.toUpperCase().charCodeAt(0)-64+step)).join('');

const numberBank=[
 ...Array.from({length:20},(_,i)=>{const d=2+(i%9),a=5+i;const seq=[a,a+d,a+2*d,a+3*d];const ans=a+4*d;return make(`${seq.join(', ')}, ?`,ans,[ans-d,ans+d,ans+2*d],`समान अंतर +${d}।`,'अभ्यास')}),
 ...Array.from({length:20},(_,i)=>{const k=2+(i%3),a=2+i%8;const seq=[a,a*k,a*k*k,a*k*k*k];const ans=a*k**4;return make(`${seq.join(', ')}, ?`,ans,[ans-k,ans+k,ans+2*k],`हर बार ×${k}।`,'अभ्यास')}),
 ...Array.from({length:20},(_,i)=>{const d=2+(i%5),a=3+i;const ds=[d,2*d,3*d,4*d];const vals=[a,a+ds[0],a+ds[0]+ds[1],a+ds[0]+ds[1]+ds[2]];const ans=vals[3]+ds[3];return make(`${vals.join(', ')}, ?`,ans,[ans-d,ans+d,ans+2*d],`अंतर +${d}, +${2*d}, +${3*d}, +${4*d}।`,'चैलेंज')}),
 ...Array.from({length:20},(_,i)=>{const n=4+i;const type=i%2;if(type===0){const vals=[n*n,(n+1)**2,(n+2)**2];const ans=(n+3)**2;return make(`${vals.join(', ')}, ?`,ans,[ans+1,ans+2,ans+4],'क्रमिक पूर्ण वर्ग।','चैलेंज')}const vals=[n,n*2,n*2-1,n*4-2];const ans=n*4-3;return make(`${vals.join(', ')}, ?`,ans,[ans-1,ans+1,ans+3],'×2, −1, ×2, −1 का alternating rule।','कठिन')}),
 ...Array.from({length:20},(_,i)=>{const a=2+i;const vals=[a,a+3,a+8,a+15];const ans=a+24;return make(`${vals.join(', ')}, ?`,ans,[ans-2,ans+2,ans+4],'अंतर +3,+5,+7; अगला +9।','कठिन')})
];

const alphabetBank=[
 ...Array.from({length:20},(_,i)=>{const step=2+(i%6),a=1+(i%10);const seq=[a,a+step,a+2*step,a+3*step].map(letter);return make(`${seq.join(', ')}, ?`,letter(a+4*step),[letter(a+4*step+1),letter(a+4*step-1),letter(a+4*step+2)],`हर बार +${step} position।`,'अभ्यास')}),
 ...Array.from({length:20},(_,i)=>{const step=2+(i%5),a=26-(i%10);const seq=[a,a-step,a-2*step,a-3*step].map(letter);return make(`${seq.join(', ')}, ?`,letter(a-4*step),[letter(a-4*step+1),letter(a-4*step-1),letter(a-4*step+2)],`हर बार −${step} position।`,'अभ्यास')}),
 ...Array.from({length:20},(_,i)=>{const a=1+(i%8);const seq=[a,a+1,a+3,a+6,a+10].map(letter);return make(`${seq.join(', ')}, ?`,letter(a+15),[letter(a+14),letter(a+16),letter(a+17)],'Jump +1,+2,+3,+4; अगला +5।','चैलेंज')}),
 ...Array.from({length:20},(_,i)=>{const a=2+(i%8);const seq=[a,a+3,a+7,a+12].map(letter);return make(`${seq.join(', ')}, ?`,letter(a+18),[letter(a+17),letter(a+19),letter(a+20)],'Jump +3,+4,+5; अगला +6।','चैलेंज')}),
 ...Array.from({length:20},(_,i)=>{const a=1+(i%12);const seq=[a,a+4,a+3,a+7,a+6].map(letter);return make(`${seq.join(', ')}, ?`,letter(a+10),[letter(a+9),letter(a+11),letter(a+12)],'Alternating +4,−1।','कठिन')})
];

const analogyBank=[
 ...[
  ['Doctor : Hospital :: Teacher : ?','School',['Court','Market','Farm'],'काम का स्थान।'],
  ['Bird : Nest :: Bee : ?','Hive',['Cage','Hole','Pond'],'जीव : निवास।'],
  ['Book : Read :: Food : ?','Eat',['Cook','Sell','Wash'],'वस्तु : क्रिया।'],
  ['Day : Night :: Hot : ?','Cold',['Warm','Dry','Bright'],'विलोम संबंध।'],
  ['Hand : Finger :: Foot : ?','Toe',['Leg','Knee','Arm'],'भाग : पूर्ण।'],
  ['Author : Book :: Painter : ?','Painting',['Brush','Paper','Color'],'सृजनकर्ता : सृजन।'],
  ['Seed : Plant :: Egg : ?','Bird',['Fruit','Tree','Leaf'],'उत्पत्ति संबंध।'],
  ['Triangle : 3 :: Square : ?','4',['5','6','8'],'भुजाओं की संख्या।'],
  ['Clock : Time :: Thermometer : ?','Temperature',['Weather','Distance','Speed'],'उपकरण : माप।'],
  ['Puppy : Dog :: Calf : ?','Cow',['Goat','Horse','Sheep'],'शिशु : वयस्क।'],
  ['India : New Delhi :: Nepal : ?','Kathmandu',['Thimphu','Dhaka','Colombo'],'देश : राजधानी।'],
  ['Knife : Cut :: Pen : ?','Write',['Read','Draw','Erase'],'उपकरण : कार्य।'],
  ['Milk : Cow :: Wool : ?','Sheep',['Hen','Horse','Dog'],'स्रोत संबंध।'],
  ['Eye : See :: Ear : ?','Hear',['Speak','Smell','Touch'],'इंद्रिय : कार्य।'],
  ['Fish : Water :: Bird : ?','Air',['Soil','Road','Cave'],'जीव : वातावरण।'],
  ['Month : Year :: Day : ?','Week',['Hour','Season','Minute'],'इकाई : बड़ी इकाई।'],
  ['2 : 4 :: 7 : ?','49',['14','21','28'],'वर्ग संबंध।'],
  ['3 : 27 :: 5 : ?','125',['25','75','150'],'घन संबंध।'],
  ['6 : 36 :: 9 : ?','81',['54','72','99'],'वर्ग संबंध।'],
  ['4 : 64 :: 6 : ?','216',['36','144','256'],'घन संबंध।']
 ].map(x=>make(...x)),
 ...Array.from({length:80},(_,i)=>{const a=10+i;const type=i%4;if(type===0)return make(`${a} : ${a*a} :: ${a+2} : ?`,(a+2)**2,[(a+2)*2,(a+2)*3,(a+2)*4],`${a} का square relation है।`,'चैलेंज');if(type===1)return make(`${a} : ${a**3} :: ${a+1} : ?`,(a+1)**3,[(a+1)**2,(a+1)*2,(a+1)*4],`${a} का cube relation है।`,'कठिन');if(type===2)return make(`${a} : ${a+5} :: ${a+10} : ?`,a+15,[a+12,a+20,a+25],'दोनों में +5।','चैलेंज');return make(`${a} : ${a-3} :: ${a+7} : ?`,a+4,[a+1,a+10,a+14],'दोनों में −3।','चैलेंज')})
];

const classificationBank=[
 ...[
  ['अलग चुनिए: 2, 4, 6, 9','9',['8','10','12'],'पहली तीन सम हैं।'],
  ['अलग चुनिए: 3, 5, 7, 9','9',['11','13','15'],'पहली तीन अभाज्य हैं।'],
  ['अलग शब्द: आम, केला, संतरा, गाजर','गाजर',['सेब','अमरूद','पपीता'],'गाजर सब्जी है।'],
  ['अलग इकाई: मीटर, सेंटीमीटर, किलोमीटर, किलोग्राम','किलोग्राम',['मिलीमीटर','डेसीमीटर','मीटर'],'किलोग्राम द्रव्यमान की इकाई है।'],
  ['अलग: सोमवार, मंगलवार, मार्च, शुक्रवार','मार्च',['बुधवार','गुरुवार','शनिवार'],'मार्च महीना है।'],
  ['अलग: 16, 25, 36, 45','45',['49','64','81'],'45 पूर्ण वर्ग नहीं है।'],
  ['अलग: 8, 27, 64, 100','100',['125','216','343'],'पहले तीन पूर्ण घन हैं।'],
  ['अलग अक्षर: A, E, I, B','B',['O','U','E'],'B स्वर नहीं है।'],
  ['अलग: गंगा, यमुना, नर्मदा, हिमालय','हिमालय',['गोदावरी','कावेरी','सोन'],'हिमालय नदी नहीं है।'],
  ['अलग: बस, ट्रेन, कार, आम','आम',['साइकिल','ट्रक','रिक्शा'],'आम वाहन नहीं है।'],
  ['अलग संख्या: 11, 13, 17, 21','21',['19','23','29'],'21 अभाज्य नहीं है।'],
  ['अलग माप: लीटर, मिलीलीटर, गैलन, किलोग्राम','किलोग्राम',['मीटर','सेमी','किमी'],'किलोग्राम आयतन की इकाई नहीं है।']
 ].map(x=>make(...x)),
 ...Array.from({length:88},(_,i)=>{const b=5+i;const type=i%4;if(type===0){const n=[b*2,b*4,b*6,b*7+1];return make(`अलग संख्या: ${n.join(', ')}`,String(n[3]),[String(b*8),String(b*10),String(b*12)],`पहली तीन ${b} के सम गुणज हैं।`,'चैलेंज')}if(type===1){const n=[b*b,(b+1)**2,(b+2)**2,b*b+2];return make(`अलग संख्या: ${n.join(', ')}`,String(n[3]),[String((b+3)**2),String((b+4)**2),String((b+5)**2)],'बाकी पूर्ण वर्ग हैं।','कठिन')}if(type===2){const names=['आम','सेब','केला','कुर्सी'];return make(`अलग शब्द: ${names.join(', ')}`,names[3],['टेबल','पुस्तक','कलम'],'कुर्सी फल नहीं है।','अभ्यास')}const n=[b*3,b*5,b*7,b*8+1];return make(`अलग संख्या: ${n.join(', ')}`,String(n[3]),[String(b*9),String(b*11),String(b*13)],`पहली तीन ${b} के विषम गुणज हैं।`,'कठिन')})
];

const codingWords=['CAT','DOG','PEN','SUN','BOX','HEN','MAP','FISH','BIRD','LAMP','TREE','HOME','GAME','ROAD','BOOK','MANGO','GRAPE','BLUE','GOLD','FIRE','APPLE','TRAIN','SCHOOL','CHAIR','MUSIC'];
const codingBank=[];
codingWords.forEach((word,i)=>{const step=(i%5)+1;const c=wordShift(word,step);codingBank.push(make(`${word} → ${c}; उसी rule से ${word} → ?`,c,[wordShift(word,step-1),wordShift(word,step+1),word],`हर अक्षर +${step} shift।`,i<12?'अभ्यास':i<20?'चैलेंज':'कठिन'))});
Array.from({length:75},(_,i)=>{const word=codingWords[i%codingWords.length];const step=(i%6)-2;const c=wordShift(word,step);codingBank.push(make(`${step>=0?'+':''}${step} coding: ${word} → ?`,c,[wordShift(word,step+1),wordShift(word,step-1),word],`हर अक्षर ${step>=0?'+':''}${step} position move करता है।`,i<25?'चैलेंज':'कठिन'))});

const directionBank=[
 ...[
  ['उत्तर की ओर हैं, 90° दाएँ मुड़ें। दिशा?','पूर्व',['पश्चिम','उत्तर','दक्षिण'],'उत्तर से right = पूर्व।'],
  ['पूर्व की ओर हैं, 90° बाएँ मुड़ें। दिशा?','उत्तर',['दक्षिण','पूर्व','पश्चिम'],'पूर्व से left = उत्तर।'],
  ['दक्षिण की ओर हैं, 90° दाएँ मुड़ें। दिशा?','पश्चिम',['पूर्व','उत्तर','दक्षिण'],'दक्षिण से right = पश्चिम।'],
  ['पश्चिम की ओर हैं, 90° बाएँ मुड़ें। दिशा?','दक्षिण',['उत्तर','पूर्व','पश्चिम'],'पश्चिम से left = दक्षिण।'],
  ['5m उत्तर और 5m पूर्व। अंतिम दिशा?','उत्तर-पूर्व',['उत्तर-पश्चिम','दक्षिण-पूर्व','दक्षिण-पश्चिम'],'उत्तर + पूर्व = उत्तर-पूर्व।'],
  ['5m दक्षिण और 5m पश्चिम। अंतिम दिशा?','दक्षिण-पश्चिम',['उत्तर-पश्चिम','दक्षिण-पूर्व','उत्तर-पूर्व'],'दक्षिण + पश्चिम = दक्षिण-पश्चिम।'],
  ['P, Q का पिता है और Q, R की बहन है। P का R से संबंध?','पिता',['भाई','चाचा','दादा'],'P दोनों का पिता है।'],
  ['R, S की माँ है और S, T का भाई है। R का T से संबंध?','माँ',['बहन','दादी','चाची'],'S और T भाई-बहन हैं।'],
  ['A, B का पिता है और B, C की माँ है। A का C से संबंध?','नाना',['पिता','मामा','चाचा'],'माँ का पिता = नाना।'],
  ['P, Q की बहन है और Q, R का पिता है। P का R से संबंध?','बुआ',['माँ','दादी','बहन'],'पिता की बहन = बुआ।'],
  ['A, B का भाई है और B, C का पिता है। A का C से संबंध?','चाचा',['मामा','भाई','पिता'],'पिता का भाई = चाचा।'],
  ['M, N का पुत्र है और N, P की माँ है। M का P से संबंध?','भाई',['मामा','पुत्र','चाचा'],'एक ही माँ के बच्चे भाई-बहन हैं।']
 ].map(x=>make(...x)),
 ...Array.from({length:88},(_,i)=>{const dirs=['उत्तर','पूर्व','दक्षिण','पश्चिम'];const d=dirs[i%4];const turns=[90,180,270][i%3];const order={उत्तर:0,पूर्व:1,दक्षिण:2,पश्चिम:3};const ans=dirs[(order[d]+turns/90)%4];return make(`${d} की ओर मुख है; ${turns}° दाएँ मुड़ने पर दिशा?`,ans,dirs.filter(x=>x!==ans).slice(0,3),`${d} से ${turns}° clockwise turn = ${ans}।`,i<30?'अभ्यास':i<60?'चैलेंज':'कठिन')})
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
const prepare=(bank,count)=>shuffle(bank).slice(0,Math.min(count,bank.length)).map(q=>({...q,options:shuffle(q.options.map(text=>({text:String(text),correct:String(text)===q.correct})))}));

export default function ReasoningLabV2({initialChapter=null,initialMode=null,onExit=()=>{},addXp=()=>{},finishSession=()=>{}}){
 const chapterInitial=chapters.some(c=>c.id===initialChapter)?initialChapter:chapters[0].id;
 const modeInitial=['learn','practice','challenge','test'].includes(initialMode)?initialMode:'learn';
 const[chapterId,setChapterId]=useState(chapterInitial);const[mode,setMode]=useState(modeInitial);const[session,setSession]=useState(null);const[answers,setAnswers]=useState({});const[score,setScore]=useState(0);const[completed,setCompleted]=useState(false);const[testStarted,setTestStarted]=useState(false);const[timeLeft,setTimeLeft]=useState(timedSeconds(modeInitial,20));
 const active=chapters.find(c=>c.id===chapterId)||chapters[0];const bank=banks[active.id];
 const counts=useMemo(()=>({practice:20,challenge:20}),[]);
 const timedSeconds=(kind,total)=>Math.max(1,(total||1)*(TIMER_CONFIG[kind]?.perQuestion||60));
 const resetQuiz=()=>{setSession(null);setAnswers({});setScore(0);setCompleted(false);setTestStarted(false)};
 const begin=nextMode=>{setMode(nextMode);setAnswers({});setScore(0);setCompleted(false);if(nextMode==='test'){setSession(null);setTimeLeft(nextMode==='test'?TIMER_CONFIG.test.minutes*60:timedSeconds(nextMode,counts[nextMode]));setTestStarted(false)}else{setSession(prepare(bank,counts[nextMode]));setTestStarted(true)}};
 const startTest=()=>{setAnswers({});setScore(0);setCompleted(false);setSession(prepare(bank,30));setTimeLeft(TIMER_CONFIG.test.minutes*60);setTestStarted(true)};
 const finish=timedOut=>{if(!session)return;const correct=session.reduce((n,q,i)=>n+(answers[i]?.correct?1:0),0);setScore(correct);setCompleted(true);finishSession({subject:'reasoning',chapter:active.id,mode,correct,total:session.length,timedOut:Boolean(timedOut),at:new Date().toISOString()});addXp(correct);setTestStarted(false)};
 useEffect(()=>{if(!testStarted||!session)return;const id=setInterval(()=>{setTimeLeft(t=>{if(t<=1){clearInterval(id);finish(true);return 0}return t-1})},1000);return()=>clearInterval(id)},[mode,testStarted,session]);
 useEffect(()=>{resetQuiz()},[chapterId]);
 const mm=String(Math.floor(timeLeft/60)).padStart(2,'0'),ss=String(timeLeft%60).padStart(2,'0');
 const choose=(i,opt)=>setAnswers(a=>({...a,[i]:opt}));
 return <div className="rlab-shell">
  <header className="rlab-header"><button type="button" className="rlab-back" onClick={onExit}>← Reasoning Lab</button><div className="rlab-brand"><span>REASONING LAB</span><small>Class 9 • तर्कशक्ति</small></div></header>
  <div className="rlab-content">
   <aside className="rlab-sidebar"><div className="rlab-sidebar-title">CHAPTERS</div>{chapters.map(c=><button type="button" key={c.id} className={`rlab-chapter ${c.id===active.id?'active':''}`} onClick={()=>setChapterId(c.id)}><span>{c.icon}</span><div><b>{c.title}</b><small>{c.skills.slice(0,2).join(' • ')}</small></div></button>)}</aside>
   <main className="rlab-main">
    <section className="rlab-hero"><div className="rlab-icon">{active.icon}</div><div><div className="rlab-kicker">CHAPTER • {active.kicker}</div><h1>{active.title}</h1><p>{active.desc}</p></div></section>
    <section className="rlab-stats"><div><strong>{bank.length}+</strong><span>QUESTION BANK</span></div><div><strong>20</strong><span>PRACTICE</span></div><div><strong>20</strong><span>CHALLENGE</span></div><div><strong>30</strong><span>FINAL TEST</span></div></section>
    <div className="rlab-skills">{active.skills.map(s=><span key={s}>✓ {s}</span>)}</div>
    <nav className="rlab-tabs">{[['learn','📖 Learn'],['practice','✍️ Practice'],['challenge','🔥 Challenge'],['test','🎯 Final Test']].map(([id,label])=><button type="button" key={id} className={mode===id?'active':''} onClick={()=>begin(id)}>{label}</button>)}</nav>
    {mode==='learn'&&<section className="rlab-learn"><div className="smart-head"><span>SMART LEARNING PATH</span><h2>{active.learn.headline}</h2><p>एक fixed process follow करके speed और accuracy दोनों बढ़ाएँ।</p></div><div className="smart-steps">{active.learn.steps.map((st,i)=><article key={st}><b>0{i+1}</b><span>{st}</span></article>)}</div><div className="worked"><div><span>WORKED EXAMPLE</span><h3>{active.learn.example}</h3></div><div className="worked-answer">ANSWER <strong>{active.learn.answer}</strong></div><p>{active.learn.why}</p></div><div className="tip"><b>⚠️ Common Trap</b><span>{active.learn.trap}</span></div><div style={{marginTop:18,padding:'18px 20px',border:'1px solid #dbe5ef',borderRadius:16,background:'#f8fbff'}}><div style={{fontSize:12,fontWeight:800,letterSpacing:'.08em',color:'#287a9f'}}>DEEP DIVE • EXTRA CONTENT</div><p style={{margin:'8px 0 0',lineHeight:1.65}}>{deepDive[active.id]}</p></div><div className="ready"><div><small>READY?</small><h3>Guided Practice से शुरुआत करें</h3><p>{active.learn.tip}</p></div><button type="button" onClick={()=>begin('practice')}>Practice शुरू करें →</button></div></section>}
    {(mode==='practice'||mode==='challenge')&&!session&&<section className="rlab-start"><div className="start-icon">{mode==='practice'?'✍️':'🔥'}</div><h2>{mode==='practice'?'Guided Practice':'Challenge Mode'}</h2><p>{mode==='practice'?'20 questions • answers and explanations at the end.':'20 higher-difficulty questions with mixed patterns.'}</p><button type="button" onClick={()=>begin(mode)}>Start {mode==='practice'?'Practice':'Challenge'} →</button></section>}
    {mode==='test'&&!testStarted&&<section className="rlab-start test-start"><div className="start-icon">🎯</div><div className="timer-preview">30:00</div><h2>Final Test</h2><p>30 प्रश्न • 30 मिनट • प्रत्येक attempt में options randomised होंगे।</p><div className="test-rules"><span>⏱️ Auto-submit on timeout</span><span>🔀 Random options</span><span>📊 Final score</span></div><button type="button" onClick={startTest}>Test शुरू करें →</button></section>}
    {session&&testStarted&&<section className="rlab-quiz"><div className="quiz-top"><div><b>{mode==='test'?'FINAL TEST':mode==='practice'?'PRACTICE':'CHALLENGE'}</b><span>{Object.keys(answers).length} / {session.length} answered</span></div>{testStarted&&<div className={`countdown ${timeLeft<=60?'danger':''}`}>⏱️ {mm}:{ss}</div>}</div><div className="progressbar"><span style={{width:`${Math.min(100,Object.keys(answers).length/session.length*100)}%`}}/></div>{session.map((q,i)=><div className="question-card" key={`${q.question}-${i}`}><div className="q-meta">Q{i+1} <span>{q.difficulty}</span></div><h3>{q.question}</h3><div className="options">{q.options.map((o,j)=><button type="button" key={j} className={answers[i]?.text===o.text?'selected':''} onClick={()=>choose(i,o)}><span>{String.fromCharCode(65+j)}</span>{o.text}</button>)}</div>{mode!=='test'&&answers[i]&&<div style={{marginTop:12,padding:'10px 12px',borderRadius:12,background:'#f7fafc'}}><b>{answers[i].correct?'✓ Correct':'✕ Review'}</b><div style={{marginTop:4}}>{q.explanation}</div></div>}</div>)}<div className="quiz-fallback-list">{session.every((_,i)=>answers[i]!==undefined)&&<div className="all-answered"><b>All questions answered.</b><button type="button" onClick={()=>finish(false)}>{mode==='test'?'Submit Final Test':'Finish & See Results'} →</button></div>}</div></section>}
    {completed&&<section className="rlab-result"><div className="result-score"><span>SCORE</span><strong>{score} / {mode==='test'?30:session?.length||20}</strong><p>{score>=Math.ceil((mode==='test'?30:20)*0.8)?'Excellent! तुम्हारी reasoning speed strong है.':score>=Math.ceil((mode==='test'?30:20)*0.6)?'Good work! थोड़ी और practice से accuracy बढ़ेगी.':'Practice जारी रखो और rules को step-by-step verify करो.'}</p></div><button type="button" onClick={()=>begin(mode==='test'?'test':mode)}>Retake →</button></section>}
   </main>
  </div>
 </div>
}
