import React,{useState}from'react';
import PanoramaTimedQuiz from'./PanoramaTimedQuiz.jsx';
import'./english-panorama-poetry.css';
import{poem8SourceLines,poem8Sections,poem8Glossary,poem8Oral,poem8TrueFalse,poem8Complete,poem8Long,poem8Group,poem8Composition,poem8WordStudy,poem8Grammar,poem8Activity,poem8Translation}from'./EnglishPanoramaPoem8Content.js';
import{poem8Practice1}from'./EnglishPanoramaPoem8Practice1.js';
import{poem8Practice2}from'./EnglishPanoramaPoem8Practice2.js';
import{poem8Challenge1}from'./EnglishPanoramaPoem8Challenge1.js';
import{poem8Challenge2}from'./EnglishPanoramaPoem8Challenge2.js';
import{poem8Challenge3}from'./EnglishPanoramaPoem8Challenge3.js';
import{poem8Challenge4}from'./EnglishPanoramaPoem8Challenge4.js';
import{poem8Challenge5}from'./EnglishPanoramaPoem8Challenge5.js';

const q=r=>({q:r[0],o:r[1],a:r[2],e:r[3]});
const practice=[...poem8Practice1,...poem8Practice2].map(q);
const challenge=[...poem8Challenge1,...poem8Challenge2,...poem8Challenge3,...poem8Challenge4,...poem8Challenge5].map(q);
const finalTest=[...practice.slice(0,10),...challenge.slice(0,10)];
const title="Abraham Lincoln’s Letter to His Son’s Teacher";

function Learn({onMode}){
 const sourceNodes=poem8SourceLines.map((line,index)=><div key={index}>{line}</div>);
 const groups=[];
 for(let i=0;i<sourceNodes.length;i+=10)groups.push({nodes:sourceNodes.slice(i,i+10),index:i/10});
 return <div className="poem-shell">
  <button className="poem-exit" onClick={()=>onMode(null)}>← Exit Poetry</button>
  <div className="poem-hero"><span>THE PANORAMA • POETRY CHAPTER 8</span><h1>{title}</h1><p>Abraham Lincoln • A father’s request for an education based on character, courage, honesty, independent thought, kindness and faith in humanity.</p></div>
  <div className="poem-panel poem-context"><div><span className="poem-section-label">ABOUT THE TEXT</span><h2>Context &amp; Structure</h2><p>यह letter-poem एक पिता की अपने बेटे के शिक्षक से की गई विस्तृत अपेक्षाओं को सामने रखता है। इसमें honesty, courage, independent thought, kindness, resilience, books, nature और humanity पर faith जैसे character values को शिक्षा का आधार माना गया है।</p></div><div className="poem-fact-grid"><div><b>Poet</b><span>Abraham Lincoln</span></div><div><b>Source</b><span>Complete supplied source text</span></div><div><b>Focus</b><span>Character • courage • honesty • independent thought</span></div></div></div>
  <div className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">STANZA-BY-STANZA</span><span className="poem-source-note">COMPLETE SOURCE TEXT</span><h2>Actual source → simple explanation → vocabulary</h2></div><span>{poem8SourceLines.length} source lines</span></div><div className="poem-stanza-grid">{groups.map(({nodes,index:i})=>{const section=poem8Sections[i]||['Continued source text','यह पूरा supplied source text अगले section में जारी रहता है।'];const vocab=poem8Glossary.slice(i*2,i*2+3);return <article className="poem-stanza-card" key={i}><span className="poem-card-kicker">Lines {i*10+1}–{i*10+nodes.length}</span><h3>{section[0]}</h3><span className="poem-actual-label">ACTUAL POEM</span><div className="poem-actual-stanza">{nodes}</div><span className="poem-simple-label">SIMPLE EXPLANATION</span><p className="poem-stanza-explanation">{section[1]}</p><div className="poem-vocab-block"><span className="poem-simple-label">VOCABULARY</span><div className="poem-word-grid">{vocab.map(([w,m])=><div key={w}><b>{w}</b><span>{m}</span></div>)}</div></div></article>})}</div></div>
  <div className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">ORAL QUESTIONS</span><h2>Think before reading deeply</h2></div></div>{poem8Oral.map((x,i)=><p key={i}><b>{i+1}.</b> {x}</p>)}</div>
  <div className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">TRUE / FALSE</span><h2>Check your reading</h2></div></div>{poem8TrueFalse.map(([x,a],i)=><p key={i}><b>{i+1}. {x}</b> <span>Answer: {a}</span></p>)}</div>
  <div className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">TEXTBOOK COMPLETION</span><h2>Recall the source</h2></div></div>{poem8Complete.map((x,i)=><p key={i}>{i+1}. {x}</p>)}</div>
  <div className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">WORDS TO KNOW</span><h2>Glossary and notes</h2></div></div><div className="poem-word-grid">{poem8Glossary.map(([w,m])=><div key={w}><b>{w}</b><span>{m}</span></div>)}</div></div>
  <div className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">TEXTBOOK QUICK ANSWERS</span><h2>Long-answer support</h2></div></div>{poem8Long.map(([qq,a])=><article className="poem-answer-card" key={qq}><b>{qq}</b><p>{a}</p></article>)}</div>
  <div className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">WRITING &amp; DISCUSSION</span><h2>Group discussion and composition</h2></div></div>{poem8Group.map(x=><div className="poem-exam-box" key={x}><b>GROUP DISCUSSION</b><p>{x}</p></div>)}{poem8Composition.map(x=><div className="poem-exam-box" key={x}><b>COMPOSITION</b><p>{x}</p></div>)}</div>
  <div className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">WORD STUDY</span><h2>Spelling and synonyms</h2></div></div>{poem8WordStudy.map(([h,x])=><div className="poem-exam-box" key={h}><b>{h}</b><p>{x}</p></div>)}</div>
  <div className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">GRAMMAR</span><h2>{poem8Grammar.title}</h2></div></div><p>{poem8Grammar.text}</p></div>
  <div className="poem-panel"><div className="poem-section-heading"><div><span className="poem-section-label">ACTIVITY • TRANSLATION</span><h2>Apply the learning</h2></div></div><div className="poem-exam-box"><b>ACTIVITY</b><p>{poem8Activity}</p></div><div className="poem-exam-box"><b>TRANSLATION</b>{poem8Translation.map((x,i)=><p key={i}>{i+1}. {x}</p>)}</div></div>
  <div className="poem-modebar"><div><span className="poem-section-label">ASSESSMENT</span><h2>Test what you learned</h2><p>15 Practice • 25 Challenge • 20-question Final Test</p></div><div className="poem-mode-buttons"><button className="primary" onClick={()=>onMode('practice')}>Practice →</button><button onClick={()=>onMode('challenge')}>Challenge →</button><button onClick={()=>onMode('test')}>Final Test →</button></div></div>
 </div>;
}

export function EnglishPanoramaPoem8({initialMode='learn',onBack,addXp,finishSession}){
 const[mode,setMode]=useState(initialMode==='learn'?'':initialMode);
 if(mode)return <PanoramaTimedQuiz mode={mode} title={title} bank={mode==='practice'?practice:mode==='challenge'?challenge:finalTest} onBack={()=>setMode('')} addXp={addXp} finishSession={finishSession}/>;
 return <Learn onMode={setMode}/>;
}
