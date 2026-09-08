import React,{useMemo,useState} from 'react';

const study={
  title:"I'm going to dance again",
  author:'Najmul Hasan',
  sourceNote:'Class 9 English Reader (Panorama English Reader)',
  summary:'This chapter profiles Sonal Mansingh and her return to dance after a serious accident. The focus is not only on recovery, but on determination, discipline, artistic commitment and the decision to return to the stage.',
  timeline:[
    ['Before the accident','Sonal Mansingh had already established herself as a respected classical dancer and performer.'],
    ['After the accident','She faced a long period of physical recovery and was told that dancing again would be extremely difficult.'],
    ['Her response','Instead of accepting defeat, she worked towards recovery and kept her artistic goal in sight.'],
    ['Return to the stage','The chapter presents her comeback as a symbol of courage, sustained effort and faith in one’s vocation.']
  ],
  vocabulary:[
    ['performance','a public presentation by an artist'],
    ['recovery','the process of becoming well or strong again'],
    ['determination','firmness of purpose; the decision to continue despite difficulty'],
    ['commitment','a strong sense of duty or dedication to something'],
    ['accident','an unexpected event that causes harm or damage'],
    ['stage','the place where a public performance takes place'],
    ['physician','a medical doctor'],
    ['perseverance','continued effort despite obstacles'],
    ['classical','related to a recognized traditional artistic form'],
    ['confidence','belief in one’s own ability or judgment']
  ],
  themes:[
    ['Determination','A difficult setback does not have to end a meaningful goal.'],
    ['Discipline','A return to demanding art requires regular, patient effort.'],
    ['Resilience','The chapter shows how a person can respond constructively to a major setback.'],
    ['Identity and art','Dance is presented as an important part of the protagonist’s identity and purpose.']
  ],
  examPoints:[
    'Know the central situation: a noted dancer preparing to return to performance after a serious accident.',
    'Connect the comeback with determination, perseverance, discipline and confidence.',
    'Distinguish factual details from the chapter’s broader message about resilience.',
    'For inferential questions, use evidence from the sequence of setback → recovery → renewed performance.'
  ]
};

const practice=[
 {q:'Who is the central personality discussed in the chapter?',o:['Sonal Mansingh','Ismat Chughtai','Ray Young Bear','Bismillah Khan'],a:0,e:'The chapter focuses on dancer Sonal Mansingh and her return to performance.'},
 {q:'What is the main situation around which the chapter is built?',o:['A dancer returning to the stage after a serious accident','A singer preparing for a first concert','A tourist describing a journey','A writer recalling childhood'],a:0,e:'Its central narrative is a dancer’s comeback after a major setback.'},
 {q:'Which quality best explains the decision to work towards dancing again?',o:['Determination','Carelessness','Indifference','Hesitation'],a:0,e:'Determination means firm purpose despite difficulty, which matches the comeback.'},
 {q:'In the chapter, “recovery” most nearly means:',o:['becoming strong or well again','avoiding all work','winning a competition','changing a profession'],a:0,e:'Recovery refers to the process of regaining health or strength.'},
 {q:'What does the comeback primarily symbolize?',o:['Resilience and sustained effort','Fame without preparation','Luck alone','Avoidance of responsibility'],a:0,e:'The comeback is used to highlight resilience, discipline and perseverance.'},
 {q:'Which word is closest in meaning to “perseverance”?',o:['persistence','confusion','silence','surprise'],a:0,e:'Perseverance is continued effort despite obstacles; persistence is its closest option.'},
 {q:'Why is discipline important in the context of the chapter?',o:['A demanding return to performance needs regular effort','It makes accidents impossible','It removes the need for practice','It guarantees immediate success'],a:0,e:'A difficult artistic comeback requires patient and regular preparation.'},
 {q:'Which statement is the best thematic reading?',o:['A setback can be answered with courage and purposeful effort','Every problem disappears quickly','Talent never needs practice','Success depends only on other people'],a:0,e:'The chapter links setback with a constructive response based on effort and purpose.'},
 {q:'What does “commitment” mean in this chapter?',o:['strong dedication to one’s work','fear of public performance','a temporary change of plan','lack of confidence'],a:0,e:'Commitment means serious dedication to a goal or responsibility.'},
 {q:'Which sequence best represents the chapter?',o:['established dancer → accident → recovery effort → return to performance','unknown artist → prize → accident → retirement','journey → school → examination → concert','childhood → travel → interview → retirement'],a:0,e:'This is the chapter’s broad narrative sequence.'},
 {q:'The chapter encourages readers mainly to:',o:['keep working toward meaningful goals after setbacks','avoid difficult goals','depend only on luck','give up when progress is slow'],a:0,e:'Its message supports purposeful persistence after hardship.'},
 {q:'“Stage” in the chapter refers to:',o:['the place for a public performance','a hospital room','a railway platform','a classroom'],a:0,e:'Here stage has its performance-related meaning.'},
 {q:'Which quality is least consistent with the protagonist’s comeback?',o:['indifference','determination','discipline','confidence'],a:0,e:'Indifference means lack of concern, which conflicts with a committed comeback.'},
 {q:'Why is the accident important to the structure of the chapter?',o:['It creates the major obstacle that makes the comeback meaningful','It introduces a new city','It explains a dance form','It ends the narrative before recovery'],a:0,e:'The obstacle gives the later return its significance.'},
 {q:'What is a strong inference from the chapter?',o:['Artistic identity can motivate sustained effort during recovery','Artists never face setbacks','Medical advice is always irrelevant','Public recognition is the only goal'],a:0,e:'The chapter connects a strong sense of purpose with sustained effort.'}
];

const challenge=[
 {q:'Which interpretation most accurately distinguishes resilience from simple optimism?',o:['Resilience involves continuing purposeful effort after difficulty','Resilience means assuming nothing can go wrong','Resilience means avoiding all challenges','Resilience means waiting for others to solve a problem'],a:0,e:'Resilience is active adaptation and continued effort, not merely positive expectation.'},
 {q:'Why is the comeback more powerful as a narrative than a first performance would be?',o:['It places achievement after a major obstacle and sustained effort','First performances are never important','A comeback needs no preparation','The audience automatically prefers accidents'],a:0,e:'The obstacle creates contrast and makes the later achievement meaningful.'},
 {q:'Which pair best captures the relationship between talent and discipline in the chapter?',o:['Talent gives ability; discipline sustains improvement','Talent replaces all practice','Discipline removes the need for ability','They are presented as opposites'],a:0,e:'The chapter values ability together with sustained preparation.'},
 {q:'If the protagonist had abandoned dance immediately after the accident, which major theme would weaken most?',o:['Perseverance','Vocabulary','Setting','Humour'],a:0,e:'Her continued effort is essential to the theme of perseverance.'},
 {q:'What can a reader infer from the return to the stage beyond the physical act itself?',o:['It represents the recovery of purpose and artistic identity','It proves that accidents are unimportant','It shows that preparation has no value','It proves all difficulties vanish quickly'],a:0,e:'The comeback has symbolic value as well as practical value.'},
 {q:'Which evidence-to-conclusion link is strongest?',o:['A serious setback followed by sustained effort → resilience','A public stage → medical training','A famous dancer → no need for discipline','An accident → guaranteed success'],a:0,e:'The strongest supported inference connects the obstacle and continued effort to resilience.'},
 {q:'Which statement best explains why “commitment” is more precise than “interest” here?',o:['Commitment suggests sustained responsibility and dedication, not casual curiosity','Interest always means fear','Commitment means avoiding work','Interest and commitment have exactly the same force in every context'],a:0,e:'The comeback requires deep, sustained dedication rather than casual interest.'},
 {q:'The chapter can be read as a lesson in goal-setting because the protagonist:',o:['keeps a meaningful goal visible while adapting to a setback','changes goals whenever work becomes difficult','depends entirely on external praise','avoids long-term planning'],a:0,e:'Keeping a meaningful goal while adapting is central to effective goal pursuit.'},
 {q:'Which is the most defensible conclusion about the role of difficulty in the story?',o:['Difficulty increases the significance of the eventual return','Difficulty has no effect on meaning','Difficulty makes success impossible','Difficulty is included only as decoration'],a:0,e:'The challenge gives the comeback its emotional and thematic weight.'},
 {q:'A reader calls the chapter “a story of recovery through purpose.” Why is that reasonable?',o:['The return is linked to a strong artistic purpose rather than recovery alone','The chapter is mainly about hospital procedures','Purpose is never connected to the comeback','Recovery happens without effort'],a:0,e:'The artistic goal provides direction to the recovery process.'},
 {q:'Which option best separates the chapter’s fact pattern from its message?',o:['The accident and later return are events; resilience and perseverance are themes','The themes are dates while events are vocabulary words','Both are identical lists of people','Facts and themes are interchangeable'],a:0,e:'Events are concrete narrative elements; themes are the ideas drawn from them.'},
 {q:'Which exam answer would be strongest for “What do you learn from the chapter?”',o:['Meaningful goals can require patience, discipline and persistence after setbacks','Success is always immediate','Difficulties should simply be ignored','Public recognition solves every problem'],a:0,e:'This answer captures the chapter’s central lesson without overclaiming.'}
];

const finalTest=[...practice.slice(0,10),...challenge.slice(0,10)].map((x,i)=>({...x,id:`final-${i}`}));

function shuffleQuestion(q,i){
 const shift=(i*3)%q.o.length;
 const o=q.o.map((_,idx)=>q.o[(idx+shift)%q.o.length]);
 const original=q.a;
 const a=(original-shift+q.o.length)%q.o.length;
 return {...q,o,a};
}

export function EnglishReaderChapter1({initialMode=null,onBack,addXp,finishSession}){
 const [mode,setMode]=useState(initialMode);
 const [idx,setIdx]=useState(0);
 const [selected,setSelected]=useState(null);
 const [score,setScore]=useState(0);
 const bank=useMemo(()=>mode==='practice'?practice:mode==='challenge'?challenge:mode==='test'?finalTest:[],[mode]);
 const current=bank[idx]?shuffleQuestion(bank[idx],idx):null;
 const choose=(n)=>{if(selected!==null||!current)return;setSelected(n);if(n===current.a)setScore(s=>s+1)};
 const next=()=>{if(!current)return; if(idx+1<bank.length){setIdx(i=>i+1);setSelected(null)}else{const earned=Math.round(score/bank.length*100);addXp?.(Math.max(5,Math.round(earned/10)));finishSession?.({subject:'अंग्रेज़ी',chapter:study.title,mode,score,total:bank.length,at:new Date().toISOString()});setMode('result')}};
 const start=(m)=>{setMode(m);setIdx(0);setSelected(null);setScore(0)};
 if(mode==='learn')return <Lesson onBack={()=>setMode(null)}/>;
 if(mode==='result')return <Result score={score} total={bank.length} mode={initialMode||'test'} restart={()=>start(initialMode||'test')} back={onBack}/>;
 if(current)return <Quiz mode={mode} q={current} index={idx} total={bank.length} selected={selected} choose={choose} next={next}/>;
 return <Menu onBack={onBack} start={start}/>;
}

function Menu({onBack,start}){return <div className="english-chapter-shell"><div className="english-hero"><span>ENGLISH READER • CHAPTER 1</span><h1>{study.title}</h1><p>{study.author} · Learn the chapter, then test your understanding.</p></div><div className="english-mode-grid"><button className="english-mode" onClick={()=>start('learn')}><b>📖 Learn</b><small>Summary, timeline, vocabulary, themes and exam points</small></button><button className="english-mode" onClick={()=>start('practice')}><b>📝 Practice</b><small>15 chapter-focused MCQs with explanations</small></button><button className="english-mode" onClick={()=>start('challenge')}><b>🔥 Challenge</b><small>12 higher-order and inference questions</small></button><button className="english-mode" onClick={()=>start('test')}><b>🎯 Final Test</b><small>20 mixed questions with score tracking</small></button></div><button className="english-back" onClick={onBack}>← Back to English Reader</button></div>}

function Lesson({onBack}){return <div className="english-chapter-shell"><div className="english-lesson-head"><button onClick={onBack}>← Modes</button><span>LEARN</span><h2>{study.title}</h2><p>{study.author}</p></div><section className="english-panel"><h3>Chapter in one view</h3><p>{study.summary}</p></section><section className="english-panel"><h3>Story / idea flow</h3><div className="english-timeline">{study.timeline.map(([h,p])=><article key={h}><strong>{h}</strong><p>{p}</p></article>)}</div></section><section className="english-two-col"><div className="english-panel"><h3>Vocabulary</h3>{study.vocabulary.map(([w,m])=><div className="english-vocab" key={w}><b>{w}</b><span>{m}</span></div>)}</div><div className="english-panel"><h3>Core themes</h3>{study.themes.map(([h,p])=><article className="english-theme" key={h}><b>{h}</b><p>{p}</p></article>)}</div></section><section className="english-panel"><h3>Exam focus</h3>{study.examPoints.map(p=><p className="english-point" key={p}>✓ {p}</p>)}</section><button className="english-back primary" onClick={onBack}>Back to modes</button></div>}

function Quiz({mode,q,index,total,selected,choose,next}){const letters=['A','B','C','D'];return <div className="english-chapter-shell"><div className="quiz-head"><button onClick={()=>location.reload()}>Exit</button><span>{mode.toUpperCase()}</span><strong>{index+1} / {total}</strong></div><div className="quiz-card"><p className="quiz-kicker">Question {index+1}</p><h2>{q.q}</h2>{q.o.map((text,i)=><button key={text} className={`quiz-option ${selected!==null?(i===q.a?'correct':i===selected?'wrong':''):' '}`} onClick={()=>choose(i)} disabled={selected!==null}><span>{letters[i]}</span>{text}</button>)}{selected!==null&&<div className="quiz-feedback"><b>{selected===q.a?'Correct':'Not quite'}</b><p>{q.e}</p><button className="english-back primary" onClick={next}>{index+1===total?'Finish':'Next →'}</button></div>}</div></div>}

function Result({score,total,mode,restart,back}){const pct=Math.round(score/total*100);return <div className="english-chapter-shell"><div className="result-card"><span>RESULT</span><h2>{pct}%</h2><p>{score} correct out of {total}</p><div className="result-actions"><button className="english-back primary" onClick={restart}>Retry</button><button className="english-back" onClick={back}>Back</button></div></div></div>}

export const englishReaderChapter1Meta={title:study.title,author:study.author,sourceNote:study.sourceNote,modeCounts:{practice:practice.length,challenge:challenge.length,final:finalTest.length}};
export {study as englishReaderChapter1Study};
