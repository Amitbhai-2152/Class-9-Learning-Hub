import React from 'react';
import './EnglishFormalLetterExtras.css';

const SUBJECTIVE_QUESTIONS=[
 'Write a formal letter to the Principal requesting clean drinking-water facilities in your school. Mention the present problem and two specific improvements you suggest.',
 'Write a formal letter to the District Magistrate complaining about irregular garbage collection in your locality. Include the effects on residents and a clear request for action.',
 'Write a letter to the Editor of a local newspaper about increasing road accidents near your school. Suggest practical safety measures.',
 'Write a formal application to your Principal requesting permission to organise a science exhibition. Include the purpose, proposed activities and expected benefits.',
 'Write a formal letter to the Municipal Commissioner requesting repair of damaged streetlights in your area. Give relevant locations and explain the safety problem.',
 'Write a formal letter to the Principal requesting an additional weekly library period for Class 9 students. Give at least two reasons for the request.',
 'Write a formal letter to the concerned authority about excessive noise near your school during school hours. Explain how it affects students and request suitable action.',
 'Draft a formal letter of enquiry to a school-related institution asking for details about an educational programme, including dates, eligibility, fees and registration procedure.'
];

const EXAMPLES=[
 {title:'Example 1 — Complaint to the Principal',prompt:'Write a letter to the Principal complaining about the shortage of clean drinking water in the school.',letter:[
  '45, Shivaji Nagar\nPatna, Bihar – 800001',
  '15 September 2026',
  'The Principal\nABC High School\nPatna, Bihar',
  'Subject: Complaint regarding shortage of clean drinking water',
  'Respected Sir/Madam,',
  'I am writing to draw your attention to the shortage of clean drinking water in our school. At present, some drinking-water taps are not working properly and the available water points become crowded during recess.',
  'This creates difficulty for students, especially during hot weather. Some students have to wait for a long time to get drinking water. The problem also affects regular classroom attendance after the break.',
  'I therefore request you to arrange an inspection of the water facilities and repair the damaged taps at the earliest. Kindly also consider installing an additional drinking-water point in a suitable location.',
  'I hope the matter will be considered promptly for the convenience and well-being of the students.',
  'Yours faithfully,\nAmit Raj\nClass 9'
 ]},
 {title:'Example 2 — Letter to the Editor',prompt:'Write a letter to the Editor about irregular garbage collection in your locality.',letter:[
  '21, Ashok Nagar\nPatna, Bihar – 800023',
  '15 September 2026',
  'The Editor\nThe Daily Herald\nPatna, Bihar',
  'Subject: Irregular garbage collection in Ashok Nagar',
  'Sir/Madam,',
  'Through this letter, I wish to draw attention to the irregular garbage collection in Ashok Nagar. Waste often remains on roadside collection points for several days, particularly after weekends.',
  'The accumulated waste creates an unpleasant environment and causes inconvenience to residents and pedestrians. It also makes the area less hygienic and may attract stray animals.',
  'I request the concerned municipal authority to ensure regular collection, provide sufficient covered bins and inspect the affected streets periodically. Public awareness about proper waste disposal should also be encouraged.',
  'I hope your newspaper will highlight this civic issue so that timely action can be taken.',
  'Yours faithfully,\nAmit Raj\nA Resident'
 ]}
];

export default function EnglishFormalLetterExtras(){
 return <section className="eflextras">
  <header className="eflextras-head"><span>LEARN • MODEL WRITING</span><h2>Two complete formal-letter examples</h2><p>Study the structure, paragraph purpose, tone and requested action before writing your own answer.</p></header>
  <div className="eflextras-examples">{EXAMPLES.map((item,i)=><article className="eflextras-example" key={item.title}><div className="eflextras-example-head"><span>EXAMPLE {i+1}</span><h3>{item.title}</h3><p>{item.prompt}</p></div><div className="eflextras-letter">{item.letter.map((part,j)=><p key={j} className={j===3?'eflextras-subject':j===4?'eflextras-salutation':j===item.letter.length-1?'eflextras-close':''}>{part}</p>)}</div></article>)}</div>
  <section className="eflextras-subjective"><div className="eflextras-subjective-head"><span>WRITE YOUR OWN</span><h2>8 Subjective Practice Questions</h2><p>These are independent writing tasks. They are not included in Practice, Challenge or Final Test scoring.</p></div><div className="eflextras-question-grid">{SUBJECTIVE_QUESTIONS.map((q,i)=><article key={q}><span>Q{i+1}</span><p>{q}</p><small>Focus: format • relevance • formal tone • clear action</small></article>)}</div></section>
 </section>
}
