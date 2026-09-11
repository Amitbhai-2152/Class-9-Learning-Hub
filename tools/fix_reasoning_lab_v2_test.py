from pathlib import Path

p=Path('src/ReasoningLabV2.jsx')
s=p.read_text(encoding='utf-8')

# Track completion independently so a 0-score test still shows its result panel.
old="const [session,setSession]=useState(null);const [answers,setAnswers]=useState({});const [score,setScore]=useState(0);const [testStarted,setTestStarted]=useState(false);const [timeLeft,setTimeLeft]=useState(15*60);"
new="const [session,setSession]=useState(null);const [answers,setAnswers]=useState({});const [score,setScore]=useState(0);const [completed,setCompleted]=useState(false);const [testStarted,setTestStarted]=useState(false);const [timeLeft,setTimeLeft]=useState(15*60);"
if old not in s: raise SystemExit('state pattern missing')
s=s.replace(old,new,1)

old="const begin=(nextMode)=>{setMode(nextMode);setAnswers({});setScore(0);"
new="const begin=(nextMode)=>{setMode(nextMode);setAnswers({});setScore(0);setCompleted(false);"
if old not in s: raise SystemExit('begin pattern missing')
s=s.replace(old,new,1)

old="const startTest=()=>{setAnswers({});setScore(0);setSession(prepare(bank,25));"
new="const startTest=()=>{setAnswers({});setScore(0);setCompleted(false);setSession(prepare(bank,25));"
if old not in s: raise SystemExit('startTest pattern missing')
s=s.replace(old,new,1)

old="setScore(correct);finishSession({subject:'reasoning'"
new="setScore(correct);setCompleted(true);finishSession({subject:'reasoning'"
if old not in s: raise SystemExit('finish pattern missing')
s=s.replace(old,new,1)

old="useEffect(()=>{setSession(null);setTestStarted(false);setAnswers({});setScore(0)},[chapterId]);"
new="useEffect(()=>{setSession(null);setTestStarted(false);setAnswers({});setScore(0);setCompleted(false)},[chapterId]);"
if old not in s: raise SystemExit('chapter reset pattern missing')
s=s.replace(old,new,1)

old="{score>0||((session===null)&&answers&&Object.keys(answers).length===0&&mode==='test'&&timeLeft===0)?<section className=\"rlab-result\">"
new="{completed?<section className=\"rlab-result\">"
if old not in s: raise SystemExit('result condition pattern missing')
s=s.replace(old,new,1)

p.write_text(s,encoding='utf-8')
print('ReasoningLabV2 test completion state fixed')
