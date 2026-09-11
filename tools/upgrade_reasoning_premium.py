from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
TARGET = ROOT / 'src' / 'ReasoningHubPremium.jsx'
CSS = ROOT / 'src' / 'reasoning-premium.css'
MARKER = 'REASONING_PREMIUM_TIMER_RANDOM_V1'

number_extra = """
make('15, 21, 27, 33, ?',['37','38','39','40'],2,'हर बार +6।','अभ्यास'),
make('3, 6, 12, 24, 48, ?',['72','84','96','108'],2,'हर बार ×2।','चैलेंज'),
make('100, 95, 85, 70, 50, ?',['20','25','30','35'],1,'अंतर −5,−10,−15,−20; अगला −25।','चैलेंज'),
make('5, 9, 15, 23, 33, ?',['41','43','45','47'],2,'अंतर 4,6,8,10; अगला 12।','चैलेंज'),
make('2, 6, 18, 54, ?',['108','144','162','216'],2,'हर बार ×3।','कठिन'),
make('1, 4, 10, 22, 46, ?',['90','94','96','98'],1,'हर बार ×2+2।','कठिन'),
make('64, 56, 49, 43, 38, ?',['32','34','36','38'],1,'अंतर −8,−7,−6,−5; अगला −4।','कठिन'),
make('2, 5, 11, 23, 47, ?',['91','93','95','97'],2,'हर बार ×2+1।','कठिन'),
make('7, 10, 16, 25, 37, ?',['49','52','55','58'],1,'अंतर +3,+6,+9,+12; अगला +15।','कठिन'),
make('1, 3, 7, 15, 31, ?',['59','61','63','65'],2,'हर बार ×2+1।','कठिन'),
make('8, 13, 21, 34, 55, ?',['84','87','89','91'],2,'हर पद पिछले दो पदों का योग है: 34+55=89।','कठिन'),
make('20, 21, 23, 26, 30, ?',['33','34','35','36'],2,'अंतर +1,+2,+3,+4; अगला +5।','चैलेंज'),
"""

alphabet_extra = """
make('A, F, K, P, ?',['T','U','V','W'],1,'हर बार +5 positions।','अभ्यास'),
make('C, E, H, L, Q, ?',['U','V','W','X'],2,'jump +2,+3,+4,+5; अगला +6।','चैलेंज'),
make('Z, W, T, Q, ?',['M','N','O','P'],1,'हर बार −3।','अभ्यास'),
make('B, D, G, K, P, ?',['T','U','V','W'],2,'jump +2,+3,+4,+5; अगला +6।','चैलेंज'),
make('E, J, O, T, ?',['W','X','Y','Z'],2,'हर बार +5।','अभ्यास'),
make('M, N, P, S, W, ?',['A','B','C','D'],1,'jump +1,+2,+3,+4; अगला +5 और wrap होकर B।','कठिन'),
make('H, L, Q, W, ?',['B','C','D','E'],2,'jump +4,+5,+6; अगला +7 और wrap होकर D।','कठिन'),
make('Y, U, P, J, ?',['A','B','C','D'],2,'jump −4,−5,−6; अगला −7 = C।','कठिन'),
make('D, H, M, S, ?',['W','X','Y','Z'],3,'jump +4,+5,+6; अगला +7 = Z।','चैलेंज'),
make('B, G, M, T, ?',['A','B','C','D'],1,'jump +5,+6,+7; अगला +8 और wrap होकर B।','कठिन'),
make('F, I, M, R, W, ?',['A','B','C','D'],2,'jump +3,+4,+5,+6; अगला +7 और wrap होकर C।','कठिन'),
make('Q, N, J, E, ?',['W','X','Y','Z'],2,'jump −3,−4,−5; अगला −6 और wrap होकर Y।','कठिन'),
"""

analogy_extra = """
make('12 : 144 :: 8 : ?',['54','56','64','72'],2,'Square relation: 12²=144, इसलिए 8²=64।','चैलेंज'),
make('Teacher : School :: Doctor : ?',['Court','Hospital','Market','Bank'],1,'Place of work relation।','अभ्यास'),
make('Seed : Plant :: Egg : ?',['Bird','Tree','Fruit','Leaf'],0,'Seed से plant; egg से bird।','अभ्यास'),
make('Finger : Hand :: Toe : ?',['Leg','Foot','Arm','Head'],1,'Part-to-whole relation।','अभ्यास'),
make('Day : Night :: Hot : ?',['Warm','Cold','Bright','Dry'],1,'Opposite relation।','अभ्यास'),
make('4 : 64 :: 5 : ?',['100','125','150','175'],1,'Cube relation।','चैलेंज'),
make('Triangle : 3 :: Square : ?',['2','3','4','5'],2,'Number of sides।','अभ्यास'),
make('Delhi : India :: Kathmandu : ?',['Nepal','Bhutan','Japan','China'],0,'Capital-to-country relation।','अभ्यास'),
make('Author : Book :: Painter : ?',['Brush','Painting','Paper','Color'],1,'Creator-to-creation relation।','अभ्यास'),
make('Milk : Cow :: Wool : ?',['Goat','Sheep','Horse','Hen'],1,'Source relation।','चैलेंज'),
make('Smile : Happiness :: Cry : ?',['Joy','Anger','Sadness','Sleep'],2,'Expression-to-emotion relation।','अभ्यास'),
make('Clock : Time :: Calendar : ?',['Date','Weather','Money','Distance'],0,'Instrument/object indicates date/time relation।','अभ्यास'),
"""

classification_extra = """
make('अलग संख्या चुनिए।',['2','4','6','9'],3,'पहली तीन सम संख्याएँ हैं; 9 नहीं।','अभ्यास'),
make('अलग संख्या चुनिए।',['8','27','64','100'],3,'8,27,64 पूर्ण घन हैं; 100 नहीं।','चैलेंज'),
make('अलग शब्द चुनिए।',['सोमवार','मंगलवार','मार्च','शुक्रवार'],2,'मार्च महीना है; बाकी सप्ताह के दिन हैं।','अभ्यास'),
make('अलग शब्द चुनिए।',['बिल्ली','कुत्ता','शेर','गुलाब'],3,'गुलाब पौधा है; बाकी जानवर हैं।','अभ्यास'),
make('अलग संख्या चुनिए।',['12','18','24','35'],3,'पहली तीन 6 के गुणज हैं; 35 नहीं।','अभ्यास'),
make('अलग अक्षर चुनिए।',['A','E','I','B'],3,'A,E,I स्वर हैं; B नहीं।','अभ्यास'),
make('अलग संख्या चुनिए।',['3','5','7','9'],3,'3,5,7 अभाज्य हैं; 9 नहीं।','अभ्यास'),
make('अलग इकाई चुनिए।',['मीटर','सेंटीमीटर','किलोमीटर','ग्राम'],3,'ग्राम mass की unit है।','अभ्यास'),
make('अलग संख्या चुनिए।',['16','25','36','50'],3,'16,25,36 perfect squares हैं; 50 नहीं।','चैलेंज'),
make('अलग शब्द चुनिए।',['जनवरी','फरवरी','रविवार','मार्च'],2,'रविवार सप्ताह का दिन है; बाकी महीने हैं।','अभ्यास'),
make('अलग शब्द चुनिए।',['लाल','हरा','नीला','कुर्सी'],3,'कुर्सी रंग नहीं है।','अभ्यास'),
make('अलग संख्या चुनिए।',['121','144','169','180'],3,'पहली तीन perfect squares हैं; 180 नहीं।','चैलेंज'),
"""

coding_extra = """
make('FISH → GJTI, LAMP → ?',['MBNQ','LBNQ','MBMP','NBNQ'],0,'हर अक्षर +1।','अभ्यास'),
make('COLD → DPNE, BIRD → ?',['CJSE','CJTF','DJSF','CKSE'],0,'हर अक्षर +1।','चैलेंज'),
make('BAD का A=1…Z=26 योग?',['6','7','8','9'],1,'2+1+4=7।','अभ्यास'),
make('1234 → 2345, 5678 → ?',['6789','6578','6788','7890'],0,'हर digit +1।','अभ्यास'),
make('DOG → 4-15-7, CAT → ?',['3-1-20','2-1-20','3-2-20','3-1-19'],0,'Alphabet positions।','अभ्यास'),
make('CODE का reverse-position code?',['5-4-15-3','3-15-4-5','4-5-15-3','5-3-15-4'],0,'CODE के letters को उलटे क्रम में लिया गया है: E-D-O-C।','चैलेंज'),
make('A=26, B=25, ..., तो CAT = ?',['24-26-7','23-25-6','24-25-7','23-26-7'],0,'Reverse alphabet positions: C=24,A=26,T=7।','कठिन'),
make('+2 coding: HOME → ?',['JQOG','JQMG','IPOF','KQPH'],0,'H→J,O→Q,M→O,E→G।','चैलेंज'),
make('−1 coding: GAME → ?',['FZLD','FZME','GZLD','FZMC'],0,'हर अक्षर −1।','चैलेंज'),
make('+2 coding: MANGO → ?',['OCPIQ','NBMHP','ODPIQ','OCQIQ'],0,'हर अक्षर +2।','कठिन'),
make('+3 coding: BIRD → ?',['ELUG','EJUG','FJSH','ELTF'],0,'B→E,I→L,R→U,D→G।','कठिन'),
make('Reverse-position: BAD → ?',['25-26-23','26-25-23','25-25-22','24-26-23'],0,'B=25,A=26,D=23 in reverse alphabet।','कठिन'),
"""

direction_extra = """
make('उत्तर 5m, फिर दाएँ। अंतिम दिशा?',['पश्चिम','पूर्व','उत्तर','दक्षिण'],1,'उत्तर से right = पूर्व।','अभ्यास'),
make('पूर्व 4m, फिर बाएँ। अंतिम दिशा?',['उत्तर','दक्षिण','पूर्व','पश्चिम'],0,'पूर्व से left = उत्तर।','अभ्यास'),
make('दक्षिण 7m, फिर दाएँ। अंतिम दिशा?',['पूर्व','पश्चिम','उत्तर','दक्षिण'],1,'दक्षिण से right = पश्चिम।','अभ्यास'),
make('पश्चिम 6m, फिर बाएँ। अंतिम दिशा?',['पूर्व','पश्चिम','उत्तर','दक्षिण'],3,'पश्चिम से left = दक्षिण।','अभ्यास'),
make('3m उत्तर और 4m पूर्व। दिशा?',['दक्षिण-पूर्व','उत्तर-पूर्व','उत्तर-पश्चिम','दक्षिण-पश्चिम'],1,'उत्तर + पूर्व = उत्तर-पूर्व।','अभ्यास'),
make('5m दक्षिण और 5m पश्चिम। दिशा?',['दक्षिण-पश्चिम','उत्तर-पश्चिम','दक्षिण-पूर्व','उत्तर-पूर्व'],0,'दक्षिण + पश्चिम = दक्षिण-पश्चिम।','अभ्यास'),
make('A, B का पिता है और B, C की माँ है। A का C से संबंध?',['पिता','नाना','मामा','भाई'],1,'B, C की माँ है और A, B का पिता; इसलिए A, C का नाना है।','चैलेंज'),
make('P, Q की बहन है और Q, R का पिता है। P का R से संबंध?',['बहन','बुआ','माँ','दादी'],1,'पिता की बहन = बुआ।','चैलेंज'),
make('R, S की माँ है और S, T का भाई है। R का T से संबंध?',['माँ','बहन','चाची','दादी'],0,'S और T भाई-बहन हैं; R दोनों की माँ है।','अभ्यास'),
make('A, B का भाई है और B, C का पिता है। A का C से संबंध?',['भाई','चाचा','पिता','मामा'],1,'पिता का भाई = चाचा।','चैलेंज'),
make('X, Y की माँ है और Y, Z की बहन है। X का Z से संबंध?',['माँ','बुआ','दादी','बहन'],0,'Y और Z भाई-बहन हैं; X दोनों की माँ है।','अभ्यास'),
make('M, N का पुत्र है और N, P की माँ है। M का P से संबंध?',['भाई','मामा','पुत्र','चाचा'],0,'N के दो बच्चों M और P होने पर M, P का भाई है।','कठिन'),
"""

EXTRAS = {
    'numberBase': number_extra,
    'alphabetBase': alphabet_extra,
    'analogy': analogy_extra,
    'classification': classification_extra,
    'coding': coding_extra,
    'direction': direction_extra,
}


def insert_before_array_end(text: str, array_name: str, extra: str) -> str:
    marker = f'const {array_name}=['
    start = text.find(marker)
    if start < 0:
        raise SystemExit(f'missing array {array_name}')
    end = text.find('\n];', start)
    if end < 0:
        raise SystemExit(f'missing end {array_name}')
    return text[:end] + '\n' + extra.rstrip('\n') + text[end:]

text = TARGET.read_text(encoding='utf-8')
if MARKER in text:
    print('already upgraded')
    raise SystemExit(0)

for name, extra in EXTRAS.items():
    text = insert_before_array_end(text, name, extra)

old_bank = "const bankFor=(id)=>{const b=DATA[id]||[];return{practice:b.slice(0,12),challenge:b.slice(12,24),test:Array.from({length:Math.min(20,b.length)},(_,i)=>b[(i*3)%b.length])}};"
new_bank = "const bankFor=(id)=>{const b=DATA[id]||[];return{practice:b.slice(0,15),challenge:b.slice(15,30),test:Array.from({length:Math.min(25,b.length)},(_,i)=>b[(i*3+1)%b.length])}};"
if old_bank not in text:
    raise SystemExit('bankFor signature not found')
text = text.replace(old_bank, new_bank)

old_questions = "const questions=useMemo(()=>source.map((q,i)=>{const shift=(seed+i)%q.options.length;const arr=q.options.map((v,j)=>({v,j}));const rot=arr.slice(shift).concat(arr.slice(0,shift));return{...q,options:rot.map(x=>x.v),answer:rot.findIndex(x=>x.j===q.answer)}}),[source,seed]);"
new_questions = "const questions=useMemo(()=>source.map(q=>{const arr=q.options.map((v,j)=>({v,j}));for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]]}return{...q,options:arr.map(x=>x.v),answer:arr.findIndex(x=>x.j===q.answer)}}),[source,seed]);"
if old_questions not in text:
    raise SystemExit('questions shuffle signature not found')
text = text.replace(old_questions, new_questions)

old_state = "const[seed,setSeed]=useState(0),[index,setIndex]=useState(0),[selected,setSelected]=useState(null),[score,setScore]=useState(0),[done,setDone]=useState(false);"
new_state = "const[seed,setSeed]=useState(0),[index,setIndex]=useState(0),[selected,setSelected]=useState(null),[score,setScore]=useState(0),[done,setDone]=useState(false),[timedOut,setTimedOut]=useState(false),[timeLeft,setTimeLeft]=useState(mode==='test'?15*60:0);"
if old_state not in text:
    raise SystemExit('quiz state signature not found')
text = text.replace(old_state, new_state)

anchor = "const next=()=>{if(selected===null)return;"
if anchor not in text:
    raise SystemExit('next anchor not found')
# Insert timer logic immediately before next handler.
timer_logic = "const formatTime=s=>`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;useEffect(()=>{if(mode!=='test'||done)return;const timer=setInterval(()=>setTimeLeft(v=>v>0?v-1:0),1000);return()=>clearInterval(timer)},[mode,done]);useEffect(()=>{if(mode==='test'&&timeLeft===0&&!done){setTimedOut(true);addXp?.(40);finishSession?.({subject:'तर्कशक्ति',chapter:chapter.id,mode,attempted:questions.length,correct:score,completed:true,timedOut:true});setDone(true)}},[mode,timeLeft,done,score,questions.length]);"
text = text.replace(anchor, timer_logic + anchor)

old_retry = "setScore(0);setDone(false)"
new_retry = "setScore(0);setDone(false);setTimedOut(false);setTimeLeft(mode==='test'?15*60:0)"
text = text.replace(old_retry, new_retry)

old_top = "<strong>{index+1}<i>/{questions.length}</i></strong></div><div className=\"rpx-progress\">"
new_top = "<strong>{index+1}<i>/{questions.length}</i></strong>{mode==='test'&&<span className={`rpx-timer ${timeLeft<=120?'danger':''}`}>⏱️ {formatTime(timeLeft)}</span>}</div><div className=\"rpx-progress\">"
if old_top not in text:
    raise SystemExit('quiz top anchor not found')
text = text.replace(old_top, new_top)

old_result = "<p>{pct>=80?'Excellent — अब next level पर जाइए।':pct>=60?'अच्छा काम — weak patterns को फिर revise करें।':'Learn section पढ़कर फिर attempt करें।'}</p>"
new_result = "<p>{timedOut?'⏰ समय समाप्त — अब गलत/छूटे patterns को revise करके फिर attempt करें।':pct>=80?'Excellent — अब next level पर जाइए।':pct>=60?'अच्छा काम — weak patterns को फिर revise करें।':'Learn section पढ़कर फिर attempt करें।'}</p>"
if old_result not in text:
    raise SystemExit('result paragraph anchor not found')
text = text.replace(old_result, new_result)

# Add version marker at the top without changing runtime behaviour.
text = text.replace("import'./reasoning-premium.css';", "import'./reasoning-premium.css';\n\nconst REASONING_PREMIUM_TIMER_RANDOM_V1=true;")
TARGET.write_text(text, encoding='utf-8')

css = CSS.read_text(encoding='utf-8')
css_marker = '/* REASONING_PREMIUM_TIMER_RANDOM_V1 */'
if css_marker not in css:
    css += """

/* REASONING_PREMIUM_TIMER_RANDOM_V1 */
.rpx-timer{margin-left:auto;display:inline-flex;align-items:center;gap:6px;padding:8px 12px;border-radius:999px;background:#f1f5f9;color:#0f172a;font-weight:800;font-variant-numeric:tabular-nums;border:1px solid #e2e8f0;box-shadow:0 4px 12px rgba(15,23,42,.06)}
.rpx-timer.danger{background:#fff1f2;color:#be123c;border-color:#fecdd3;animation:rpxPulse 1s ease-in-out infinite alternate}
@keyframes rpxPulse{from{transform:scale(1)}to{transform:scale(1.035)}}
@media(max-width:700px){.rpx-timer{font-size:.88rem;padding:7px 10px}}
"""
    CSS.write_text(css, encoding='utf-8')

print('upgraded reasoning premium')
