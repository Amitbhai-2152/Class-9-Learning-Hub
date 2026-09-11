import React,{useEffect,useState}from'react';
import'./reasoning-lab-v2.css';

const shuffle=(arr)=>{const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const make=(question,correct,distractors,explanation,difficulty='अभ्यास')=>({question,correct:String(correct),options:[String(correct),...distractors.map(String)],explanation,difficulty});
const wrap26=n=>((n-1)%26+26)%26+1;
const letter=n=>String.fromCharCode(64+wrap26(n));
const wordShift=(word,step)=>word.split('').map(c=>letter(c.toUpperCase().charCodeAt(0)-64+step)).join('');
const positions=(word)=>word.toUpperCase().split('').map(c=>c.charCodeAt(0)-64).join('-');

const numberBank=[
...Array.from({length:10},(_,i)=>{const s=3+i;const a=7+i*3;return make(`${a}, ${a+s}, ${a+s*2}, ${a+s*3}, ?`,a+s*4,[a+s*4-1,a+s*4+1,a+s*4+2],`हर बार +${s}।`)}),
...Array.from({length:10},(_,i)=>{const a=2+i;const k=2+(i%3);const c=a*Math.pow(k,4);return make(`${a}, ${a*k}, ${a*k*k}, ${a*k*k*k}, ?`,c,[c-k,c+k,c+2*k],`हर बार ×${k}।`)}),
...Array.from({length:10},(_,i)=>{const a=2+i;const d=2+i;const vals=[a,a+d,a+d*3,a+d*6,a+d*10];const ans=a+d*15;return make(`${vals.join(', ')}, ?`,ans,[ans-2,ans+2,ans+5],`अंतर ${d}, ${2*d}, ${3*d}, ${4*d}; अगला ${5*d}।`,'चैलेंज')}),
...Array.from({length:10},(_,i)=>{const n=5+i;const ans=(n+1)*(n+1);return make(`${n*n}, ${(n+1)*(n+1)}, ${(n+2)*(n+2)}, ?`,ans,[ans+1,ans+2,ans+4],`क्रमिक पूर्ण वर्ग हैं; अगला ${n+1}²=${ans}।`,'चैलेंज')}),
...Array.from({length:10},(_,i)=>{const a=2+i;const vals=[a, a+2, a+6, a+12, a+20];const ans=a+30;return make(`${vals.join(', ')}, ?`,ans,[ans-3,ans+3,ans+6],`अंतर +2,+4,+6,+8; अगला +10।`,'कठिन')}),
...Array.from({length:10},(_,i)=>{const a=4+i;const vals=[a,2*a,2*a-2,4*a-4,4*a-6];const ans=8*a-20;return make(`${vals.join(', ')}, ?`,ans,[ans-2,ans+2,ans+4],`×2, −2, ×2, −2 के alternating rule से अगला ${ans}।`,'कठिन')})
];

const alphabetBank=[
...Array.from({length:10},(_,i)=>{const step=2+i%4;const a=1+i;const seq=[a,a+step,a+2*step,a+3*step].map(letter);return make(`${seq.join(', ')}, ?`,letter(a+4*step),[letter(a+4*step+1),letter(a+4*step+2),letter(a+4*step-1)],`हर बार +${step} positions।`)}),
...Array.from({length:10},(_,i)=>{const step=2+i%4;const a=25-i;const seq=[a,a-step,a-2*step,a-3*step].map(letter);return make(`${seq.join(', ')}, ?`,letter(a-4*step),[letter(a-4*step+1),letter(a-4*step+2),letter(a-4*step-1)],`हर बार −${step} positions।`)}),
...Array.from({length:10},(_,i)=>{const a=1+i;const seq=[a,a+1,a+3,a+6,a+10].map(letter);return make(`${seq.join(', ')}, ?`,letter(a+15),[letter(a+14),letter(a+16),letter(a+17)],'Jump +1,+2,+3,+4; अगला +5।','चैलेंज')}),
...Array.from({length:10},(_,i)=>{const a=2+i;const seq=[a,a+3,a+7,a+12].map(letter);return make(`${seq.join(', ')}, ?`,letter(a+18),[letter(a+17),letter(a+19),letter(a+20)],'Jump +3,+4,+5; अगला +6।','चैलेंज')}),
...Array.from({length:10},(_,i)=>{const a=20-i;const seq=[a,a-2,a-5,a-9].map(letter);return make(`${seq.join(', ')}, ?`,letter(a-14),[letter(a-13),letter(a-15),letter(a-16)],'Jump −2,−3,−4; अगला −5।','कठिन')}),
...Array.from({length:10},(_,i)=>{const a=1+i;const seq=[a,a+4,a+3,a+7,a+6].map(letter);return make(`${seq.join(', ')}, ?`,letter(a+10),[letter(a+9),letter(a+11),letter(a+12)],'Alternating +4,−1 pattern।','कठिन')})
];

const analogyBank=[
make('Doctor : Hospital :: Teacher : ?','School',['Court','Market','Farm'],'काम करने का स्थान।'),
make('Bird : Nest :: Bee : ?','Hive',['Cage','Hole','Pond'],'जीव : निवास।'),
make('Book : Read :: Food : ?','Eat',['Cook','Sell','Wash'],'वस्तु से जुड़ी क्रिया।'),
make('Day : Night :: Hot : ?','Cold',['Warm','Dry','Bright'],'विपरीत संबंध।'),
make('Hand : Finger :: Foot : ?','Toe',['Leg','Knee','Arm'],'भाग : पूर्ण।'),
make('Author : Book :: Painter : ?','Painting',['Brush','Paper','Color'],'सृजनकर्ता : सृजन।'),
make('Seed : Plant :: Egg : ?','Bird',['Fruit','Tree','Leaf'],'विकास/उत्पत्ति संबंध।'),
make('Triangle : 3 :: Square : ?','4',['5','6','8'],'भुजाओं की संख्या।'),
make('2 : 4 :: 7 : ?','49',['14','21','28'],'वर्ग संबंध।'),
make('3 : 27 :: 5 : ?','125',['25','75','150'],'घन संबंध।'),
make('Clock : Time :: Thermometer : ?','Temperature',['Weather','Distance','Speed'],'मापने वाला उपकरण : मात्रा।'),
make('Puppy : Dog :: Calf : ?','Cow',['Goat','Horse','Sheep'],'शिशु : वयस्क।'),
make('India : New Delhi :: Nepal : ?','Kathmandu',['Thimphu','Dhaka','Colombo'],'देश : राजधानी।'),
make('Knife : Cut :: Pen : ?','Write',['Read','Draw','Erase'],'उपकरण : कार्य।'),
make('Milk : Cow :: Wool : ?','Sheep',['Hen','Horse','Dog'],'स्रोत संबंध।'),
make('Eye : See :: Ear : ?','Hear',['Speak','Smell','Touch'],'इंद्रिय : कार्य।'),
make('Fish : Water :: Bird : ?','Air',['Soil','Road','Cave'],'जीव : वातावरण।'),
make('6 : 36 :: 9 : ?','81',['54','72','99'],'वर्ग संबंध।'),
make('4 : 64 :: 6 : ?','216',['36','144','256'],'घन संबंध।'),
make('Month : Year :: Day : ?','Week',['Hour','Season','Minute'],'इकाई : बड़ी इकाई।'),
...Array.from({length:40},(_,i)=>{const a=3+i;const b=a*a;return make(`${a} : ${b} :: ${a+1} : ?`,(a+1)*(a+1),[(a+1)*2,(a+1)*3,(a+1)*4],`वर्ग संबंध: ${a}²=${b}।`,i<20?'चैलेंज':'कठिन')})
];

const classificationBank=[
make('अलग चुनिए: 2, 4, 6, 9','9',['8','10','12'],'पहली तीन सम हैं।'),
make('अलग चुनिए: 3, 5, 7, 9','9',['11','13','15'],'पहली तीन अभाज्य हैं।'),
make('अलग शब्द: आम, केला, संतरा, गाजर','गाजर',['सेब','अमरूद','पपीता'],'गाजर सब्जी है।'),
make('अलग इकाई: मीटर, सेंटीमीटर, किलोमीटर, किलोग्राम','किलोग्राम',['मिलीमीटर','डेसीमीटर','मीटर'],'किलोग्राम द्रव्यमान की इकाई है।'),
make('अलग: सोमवार, मंगलवार, मार्च, शुक्रवार','मार्च',['बुधवार','गुरुवार','शनिवार'],'मार्च महीना है।'),
make('अलग: 16, 25, 36, 45','45',['49','64','81'],'45 पूर्ण वर्ग नहीं है।'),
make('अलग: 8, 27, 64, 100','100',['125','216','343'],'पहले तीन पूर्ण घन हैं।'),
make('अलग अक्षर: A, E, I, B','B',['O','U','E'],'B स्वर नहीं है।'),
make('अलग: गंगा, यमुना, नर्मदा, हिमालय','हिमालय',['गोदावरी','कावेरी','सोन'],'हिमालय नदी नहीं है।'),
make('अलग: बस, ट्रेन, कार, आम','आम',['साइकिल','ट्रक','रिक्शा'],'आम वाहन नहीं है।'),
make('अलग संख्या: 11, 13, 17, 21','21',['19','23','29'],'21 अभाज्य नहीं है।'),
make('अलग माप: लीटर, मिलीलीटर, गैलन, किलोग्राम','किलोग्राम',['मीटर','सेमी','किमी'],'किलोग्राम आयतन की इकाई नहीं है।'),
...Array.from({length:48},(_,i)=>{const base=4+i;const nums=[base*2,base*4,base*6,base*7];return make(`अलग संख्या: ${nums.join(', ')}`,String(nums[3]),[String(base*8),String(base*10),String(base*12)],`पहली तीन ${base} के सम गुणज हैं; ${nums[3]} नहीं।`,i<20?'अभ्यास':i<36?'चैलेंज':'कठिन')})
];

const codingWords=['CAT','DOG','PEN','SUN','BOX','HEN','MAP','FISH','BIRD','LAMP','TREE','HOME','GAME','ROAD','BOOK','MANGO','GRAPE','BLUE','GOLD','FIRE'];
const codingBank=[];
codingWords.forEach((word,i)=>{const step=(i%5)+1;const c=wordShift(word,step);codingBank.push(make(`${word} → ${c}, फिर ${word} → ?`,c,[wordShift(word,step-1),wordShift(word,step+1),word],`हर अक्षर +${step} shift किया गया है।`,i<10?'अभ्यास':i<15?'चैलेंज':'कठिन'))});
Array.from({length:40},(_,i)=>{const word=codingWords[i%codingWords.length];const step=i%2?2:-2;const c=wordShift(word,step);codingBank.push(make(`${step>0?'+2':'−2'} coding: ${word} → ?`,c,[wordShift(word,step+1),wordShift(word,step-1),word],`हर अक्षर ${step>0?'+2':'−2'} position move करता है।`,i<15?'चैलेंज':'कठिन'))});
codingWords.slice(0,10).forEach(word=>codingBank.push(make(`A=1…Z=26: ${word} का code?`,positions(word),[positions(word.split('').reverse().join('')),positions(word).replace(/-/g,','),String(word.length)],'हर अक्षर का alphabet position लिया गया है।','चैलेंज')));

const directionBank=[
make('उत्तर की ओर हैं, 90° दाएँ मुड़ें। दिशा?','पूर्व',['पश्चिम','उत्तर','दक्षिण'],'उत्तर से right = पूर्व।'),
make('पूर्व की ओर हैं, 90° बाएँ मुड़ें। दिशा?','उत्तर',['दक्षिण','पूर्व','पश्चिम'],'पूर्व से left = उत्तर।'),
make('दक्षिण की ओर हैं, 90° दाएँ मुड़ें। दिशा?','पश्चिम',['पूर्व','उत्तर','दक्षिण'],'दक्षिण से right = पश्चिम।'),
make('पश्चिम की ओर हैं, 90° बाएँ मुड़ें। दिशा?','दक्षिण',['उत्तर','पूर्व','पश्चिम'],'पश्चिम से left = दक्षिण।'),
make('5m उत्तर और 5m पूर्व। अंतिम दिशा?','उत्तर-पूर्व',['उत्तर-पश्चिम','दक्षिण-पूर्व','दक्षिण-पश्चिम'],'उत्तर + पूर्व = उत्तर-पूर्व।'),
make('5m दक्षिण और 5m पश्चिम। अंतिम दिशा?','दक्षिण-पश्चिम',['उत्तर-पश्चिम','दक्षिण-पूर्व','उत्तर-पूर्व'],'दक्षिण + पश्चिम = दक्षिण-पश्चिम।'),
make('P, Q का पिता है और Q, R की बहन है। P का R से संबंध?','पिता',['भाई','चाचा','दादा'],'P दोनों का पिता है।'),
make('R, S की माँ है और S, T का भाई है। R का T से संबंध?','माँ',['बहन','दादी','चाची'],'S और T भाई-बहन हैं।'),
make('A, B का पिता है और B, C की माँ है। A का C से संबंध?','नाना',['पिता','मामा','चाचा'],'माँ का पिता = नाना।'),
make('P, Q की बहन है और Q, R का पिता है। P का R से संबंध?','बुआ',['माँ','दादी','बहन'],'पिता की बहन = बुआ।'),
make('A, B का भाई है और B, C का पिता है। A का C से संबंध?','चाचा',['मामा','भाई','पिता'],'पिता का भाई = चाचा।'),
make('M, N का पुत्र है और N, P की माँ है। M का P से संबंध?','भाई',['मामा','पुत्र','चाचा'],'एक ही माँ के बच्चे भाई-बहन हैं।'),
...Array.from({length:48},(_,i)=>{const dirs=['उत्तर','पूर्व','दक्षिण','पश्चिम'];const d=dirs[i%4];const map={उत्तर:'दक्षिण',पूर्व:'पश्चिम',दक्षिण:'उत्तर',पश्चिम:'पूर्व'};return make(`${d} के विपरीत दिशा क्या है?`,map[d],[d,dirs[(i+1)%4],dirs[(i+2)%4]],'विपरीत दिशा का नियम।',i<20?'अभ्यास':i<36?'चैलेंज':'कठिन')})
];

const chapters=[
{id:'number-series',title:'संख्या श्रृंखला',icon:'🔢',kicker:'PATTERN DETECTION',desc:'संख्याओं के बीच छिपा rule पहचानें और अगला पद निकालें।',skills:['समान अंतर','गुणा–भाग','बढ़ते अंतर','वर्ग / घन','मिश्रित नियम'],learn:{headline:'पहले अंतर, फिर operation, फिर pattern',example:'2, 6, 12, 20, 30, ?',answer:'42',why:'अंतर 4,6,8,10 हैं; अगला 12 → 30+12=42।',trap:'सिर्फ आखिरी दो numbers देखकर rule तय न करें।',steps:['Consecutive differences निकालें।','×, ÷, +, − और ratios देखें।','Square, cube, alternating या second difference जाँचें।','Rule को पूरे sequence पर verify करें।'],tip:'कम-से-कम 3 transitions verify करके answer चुनें।'},
{id:'alphabet-series',title:'अक्षर श्रृंखला',icon:'🔤',kicker:'LETTER PATTERNS',desc:'A=1…Z=26 की मदद से jump और sequence समझें।',skills:['Position','Forward jump','Backward jump','Increasing jump','Mixed'],learn:{headline:'Letters को positions में बदलकर rule पढ़ें',example:'A, D, G, J, ?',answer:'M',why:'हर बार +3 positions: J+3=M।',trap:'Letter देखकर guess करने की बजाय position check करें।',steps:['A=1…Z=26 लिखें।','हर transition का jump निकालें।','Forward / backward movement पहचानें।','पूरे sequence में logic verify करें।'],tip:'Position लिखने से mixed jump जल्दी पकड़ में आता है।'}},
{id:'analogy',title:'समानता (Analogy)',icon:'🔗',kicker:'RELATION MAPPING',desc:'पहली जोड़ी का exact relation पहचानकर दूसरी जोड़ी पर लगाएँ।',skills:['कार्य','विपरीत','भाग–पूर्ण','संख्या relation'],learn:{headline:'Relation को एक छोटे rule में बदलें',example:'2 : 4 :: 7 : ?',answer:'49',why:'पहली जोड़ी में square relation है; 7²=49।',trap:'सिर्फ शब्द समान दिखने पर नहीं, relation पर ध्यान दें।',steps:['पहली जोड़ी का relation बोलें।','Relation type तय करें।','वही rule दूसरी जोड़ी पर लागू करें।','Options से verify करें।'],tip:'Relation को एक वाक्य में बोल पाने पर answer लगभग तय हो जाता है।'}},
{id:'classification',title:'वर्गीकरण / Odd One Out',icon:'🧩',kicker:'ODD ONE OUT',desc:'Common property खोजकर अलग element चुनें।',skills:['संख्या','शब्द','अक्षर','इकाई'],learn:{headline:'पहले common property, फिर odd item',example:'4, 9, 16, 18',answer:'18',why:'4,9,16 पूर्ण वर्ग हैं; 18 नहीं।',trap:'एक से अधिक possible properties दिखें तो strongest common rule चुनें।',steps:['तीनों/अधिक elements की common property खोजें।','संख्या, unit, category या spelling देखें।','Odd item को isolate करें।','Explanation से rule verify करें।'],tip:'हर option को एक ही rule से test करें।'}},
{id:'coding-decoding',title:'Coding–Decoding',icon:'🔐',kicker:'CODE BREAKING',desc:'Letter, number या reverse rule पकड़कर नया code बनाएँ।',skills:['Letter shift','Position code','Reverse','Number code'],learn:{headline:'Code को छोटे transformation में तोड़ें',example:'CAT → DBU, HEN → ?',answer:'IFO',why:'हर अक्षर +1: H→I, E→F, N→O।',trap:'Rule हर letter पर समान लागू हो रहा है या नहीं, verify करें।',steps:['दिए गए pair में बदलाव निकालें।','हर letter/digit पर rule लगाएँ।','Reverse या position coding जाँचें।','नए code को options से verify करें।'],tip:'एक अक्षर नहीं, पूरे code पर transformation check करें।'}},
{id:'direction-blood',title:'दिशा एवं रक्त संबंध',icon:'🧭',kicker:'LOGICAL RELATIONS',desc:'Compass, turns और family relations को logical map में हल करें।',skills:['दिशा','दूरी','Family tree','Combined'],learn:{headline:'Direction और relation को map की तरह सोचें',example:'उत्तर 5m, फिर दाएँ।',answer:'पूर्व',why:'उत्तर से right turn = पूर्व।',trap:'Turn को अपने facing direction के हिसाब से calculate करें।',steps:['Starting direction तय करें।','हर turn का effect निकालें।','Family relation में छोटा tree बनाएँ।','Final relation/direction verify करें।'],tip:'90°, 180°, 270° turns को mentally map करें।'}}
];

const banks={'number-series':numberBank,'alphabet-series':alphabetBank,'analogy':analogyBank,'classification':classificationBank,'coding-decoding':codingBank,'direction-blood':directionBank};

const prepare=(bank,count)=>shuffle(bank).slice(0,count).map((q)=>{const opts=shuffle(q.options.map((text)=>({text:String(text),correct:String(text)===q.correct})));return {...q,options:opts}});

export default function ReasoningLabV2({initialChapter=null,initialMode=null,onExit=()=>{},addXp=()=>{},finishSession=()=>{}}){
 const [chapterId,setChapterId]=useState(()=>chapters.some(c=>c.id===initialChapter)?initialChapter:chapters[0].id);
 const [mode,setMode]=useState(()=>['learn','practice','challenge','test'].includes(initialMode)?initialMode:'learn');
 const [session,setSession]=useState(null);const [answers,setAnswers]=useState({});const [score,setScore]=useState(0);const [completed,setCompleted]=useState(false);const [testStarted,setTestStarted]=useState(false);const [timeLeft,setTimeLeft]=useState(15*60);
 const active=chapters.find(c=>c.id===chapterId)||chapters[0];const bank=banks[active.id];
 const counts={practice:15,challenge:15,test:25};
 const begin=(nextMode)=>{setMode(nextMode);setAnswers({});setScore(0);setCompleted(false);if(nextMode==='test'){setSession(prepare(bank,counts.test));setTimeLeft(15*60);setTestStarted(false)}else{setSession(prepare(bank,counts[nextMode]));setTestStarted(true)}};
 const startTest=()=>{setAnswers({});setScore(0);setCompleted(false);setSession(prepare(bank,25));setTimeLeft(15*60);setTestStarted(true)};
 const finish=(timedOut=false)=>{if(!session)return;const correct=session.reduce((n,q,i)=>n+(answers[i]?.correct?1:0),0);setScore(correct);setCompleted(true);finishSession({subject:'reasoning',chapter:active.id,mode,correct,total:session.length,timedOut,at:new Date().toISOString()});addXp(correct);setTestStarted(false);if(timedOut)window.setTimeout(()=>{},0)};
 useEffect(()=>{if(mode!=='test'||!testStarted||!session)return;const id=setInterval(()=>setTimeLeft(t=>{if(t<=1){clearInterval(id);finish(true);return 0}return t-1}),1000);return()=>clearInterval(id)},[mode,testStarted,session,answers]);
 useEffect(()=>{setSession(null);setTestStarted(false);setAnswers({});setScore(0);setCompleted(false)},[chapterId]);
 const mm=String(Math.floor(timeLeft/60)).padStart(2,'0'),ss=String(timeLeft%60).padStart(2,'0');
 const choose=(i,opt)=>{if(mode==='test'&&!testStarted)return;setAnswers(a=>({...a,[i]:opt}));};
 return <div className="rlab-shell">
  <header className="rlab-header"><button type="button" className="rlab-back" onClick={onExit}>← Reasoning Lab</button><div className="rlab-brand"><span>REASONING LAB</span><small>Class 9 • तर्कशक्ति</small></div></header>
  <div className="rlab-content">
   <aside className="rlab-sidebar"><div className="rlab-sidebar-title">CHAPTERS</div>{chapters.map(c=><button type="button" key={c.id} className={`rlab-chapter ${c.id===active.id?'active':''}`} onClick={()=>setChapterId(c.id)}><span>{c.icon}</span><div><b>{c.title}</b><small>{c.skills.slice(0,2).join(' • ')}</small></div></button>)}</aside>
   <main className="rlab-main">
    <section className="rlab-hero"><div className="rlab-icon">{active.icon}</div><div><div className="rlab-kicker">CHAPTER • {active.kicker}</div><h1>{active.title}</h1><p>{active.desc}</p></div></section>
    <section className="rlab-stats"><div><strong>{bank.length}+</strong><span>QUESTION BANK</span></div><div><strong>15</strong><span>PRACTICE</span></div><div><strong>15</strong><span>CHALLENGE</span></div><div><strong>25</strong><span>FINAL TEST</span></div></section>
    <div className="rlab-skills">{active.skills.map(s=><span key={s}>✓ {s}</span>)}</div>
    <nav className="rlab-tabs">{[['learn','📖 Learn'],['practice','✍️ Practice'],['challenge','🔥 Challenge'],['test','🎯 Final Test']].map(([id,label])=><button type="button" key={id} className={mode===id?'active':''} onClick={()=>{setMode(id);setSession(null);setAnswers({});setScore(0);setTestStarted(id!=='test')}}>{label}</button>)}</nav>
    {mode==='learn'&&<section className="rlab-learn"><div className="smart-head"><span>SMART LEARNING PATH</span><h2>{active.learn.headline}</h2><p>एक fixed process follow करके speed और accuracy दोनों बढ़ाएँ।</p></div><div className="smart-steps">{active.learn.steps.map((s,i)=><article key={s}><b>0{i+1}</b><span>{s}</span></article>)}</div><div className="worked"><div><span>WORKED EXAMPLE</span><h3>{active.learn.example}</h3></div><div className="worked-answer">ANSWER <strong>{active.learn.answer}</strong></div><p>{active.learn.why}</p></div><div className="tip"><b>⚠️ Common Trap</b><span>{active.learn.trap}</span></div><div className="ready"><div><small>READY?</small><h3>Guided Practice से शुरुआत करें</h3><p>{active.learn.tip}</p></div><button type="button" onClick={()=>begin('practice')}>Practice शुरू करें →</button></div></section>}
    {(mode==='practice'||mode==='challenge')&&!session&&<section className="rlab-start"><div className="start-icon">{mode==='practice'?'✍️':'🔥'}</div><h2>{mode==='practice'?'Guided Practice':'Challenge Mode'}</h2><p>{mode==='practice'?'हर गलत answer के बाद explanation मिलेगा।':'Higher difficulty और mixed patterns के साथ speed test करें।'}</p><button type="button" onClick={()=>begin(mode)}>Start {mode==='practice'?'Practice':'Challenge'} →</button></section>}
    {mode==='test'&&!testStarted&&<section className="rlab-start test-start"><div className="start-icon">🎯</div><div className="timer-preview">15:00</div><h2>Final Test</h2><p>25 प्रश्न • 15 मिनट • प्रत्येक attempt में options randomised होंगे।</p><div className="test-rules"><span>⏱️ Auto-submit on timeout</span><span>🔀 Random options</span><span>📊 Final score</span></div><button type="button" onClick={startTest}>Test शुरू करें →</button></section>}
    {session&&testStarted&&<section className="rlab-quiz"><div className="quiz-top"><div><b>{mode==='test'?'FINAL TEST':mode==='practice'?'PRACTICE':'CHALLENGE'}</b><span>Question {Object.keys(answers).length+1} / {session.length}</span></div>{mode==='test'&&<div className={`countdown ${timeLeft<=60?'danger':''}`}>⏱️ {mm}:{ss}</div>}</div><div className="progressbar"><span style={{width:`${Math.min(100,((Object.keys(answers).length)/session.length)*100)}%`}}/></div>{session.map((q,i)=>{const picked=answers[i];if(picked===undefined)return <div className="question-card" key={i}><div className="q-meta">Q{i+1} <span>{q.difficulty}</span></div><h3>{q.question}</h3><div className="options">{q.options.map((o,j)=><button type="button" key={j} className={picked===o?'selected':''} onClick={()=>choose(i,o)}><span>{String.fromCharCode(65+j)}</span>{o.text}</button>)}</div></div>;return null})}<div className="quiz-fallback-list">{session.every((_,i)=>answers[i]!==undefined)&&<div className="all-answered"><b>All questions answered.</b><button type="button" onClick={()=>finish(false)}>{mode==='test'?'Submit Final Test':'Finish & See Results'} →</button></div>}{mode!=='test'&&Object.entries(answers).map(([i,p])=><div className="answered-mini" key={i}><b>Q{Number(i)+1}</b><span>{p.text}</span><em>{p.correct?'✓ Correct':'✕ Review'}</em><small>{session[i].explanation}</small></div>)}</div></section>}
    {completed?<section className="rlab-result"><div className="result-score"><span>SCORE</span><strong>{score} / {mode==='test'?25:score}</strong><p>{score>=Math.ceil((mode==='test'?25:15)*0.8)?'Excellent! तुम्हारी reasoning speed strong है.':score>=Math.ceil((mode==='test'?25:15)*0.6)?'Good work! थोड़ी और practice से accuracy बढ़ेगी.':'Practice जारी रखो और rules को step-by-step verify करो.'}</p></div><button type="button" onClick={()=>begin(mode==='test'?'test':mode)}>Retake →</button></section>:null}
   </main>
  </div>
 </div>
}