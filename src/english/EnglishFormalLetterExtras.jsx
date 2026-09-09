import React from 'react';
import './EnglishFormalLetterExtras.css';

const SUBJECTIVE_QUESTIONS=[
 'Write a formal letter to the Principal asking for clean drinking water in your school. Mention the problem and two solutions.',
 'Write a formal letter to the District Magistrate about irregular garbage collection in your locality. Explain the problem and ask for action.',
 'Write a letter to the Editor about road accidents near your school. Give two safety suggestions.',
 'Write an application to your Principal asking for permission to organise a science exhibition. Mention its purpose and benefits.',
 'Write a formal letter to the Municipal Commissioner asking for repair of broken streetlights in your area. Mention the safety problem.',
 'Write a formal letter to the Principal asking for one extra library period every week. Give two reasons.',
 'Write a formal letter to the concerned authority about loud noise near your school during school hours. Explain its effect on students and ask for action.',
 'Write a formal enquiry letter to an educational institution asking about an educational programme. Ask about dates, eligibility, fees and registration.'
];

const EXAMPLES=[
 {title:'Example 1 — Complaint to the Principal',prompt:'Topic: Shortage of clean drinking water in school.',letter:[
  '45, Shivaji Nagar\nPatna, Bihar – 800001',
  '15 September 2026',
  'The Principal\nABC High School\nPatna, Bihar',
  'Subject: Complaint about shortage of clean drinking water',
  'Respected Sir/Madam,',
  'I am writing to draw your attention to the shortage of clean drinking water in our school. Some taps are not working and the available water points are crowded during recess.',
  'This causes difficulty for students, especially in hot weather. Students have to wait for a long time to get water.',
  'I request you to arrange an inspection, repair the damaged taps and provide one more drinking-water point.',
  'I hope the matter will be solved soon for the benefit of the students.',
  'Yours faithfully,\nAmit Raj\nClass 9'
 ]},
 {title:'Example 2 — Letter to the Editor',prompt:'Topic: Irregular garbage collection in a locality.',letter:[
  '21, Ashok Nagar\nPatna, Bihar – 800023',
  '15 September 2026',
  'The Editor\nThe Daily Herald\nPatna, Bihar',
  'Subject: Irregular garbage collection in Ashok Nagar',
  'Sir/Madam,',
  'Through this letter, I wish to draw attention to irregular garbage collection in Ashok Nagar. Waste often remains on the roads for several days.',
  'This makes the area dirty and causes trouble for residents and pedestrians. It also creates an unhealthy environment.',
  'I request the concerned authority to arrange regular collection, provide enough covered bins and inspect the area regularly.',
  'I hope your newspaper will highlight this problem so that proper action can be taken.',
  'Yours faithfully,\nAmit Raj\nA Resident'
 ]},
 {title:'Example 3 — Permission to the Principal',prompt:'Topic: Asking permission to organise a science exhibition.',letter:[
  '45, Shivaji Nagar\nPatna, Bihar – 800001',
  '15 September 2026',
  'The Principal\nABC High School\nPatna, Bihar',
  'Subject: Request for permission to organise a science exhibition',
  'Respected Sir/Madam,',
  'I am writing to request permission to organise a science exhibition in our school. Students of Class 9 would like to display simple working models and charts.',
  'The exhibition will help students improve their scientific knowledge, creativity and confidence. It will also encourage interest in practical learning.',
  'I therefore request you to grant us permission to organise the exhibition on a suitable date under the guidance of our teachers.',
  'I shall be grateful for your kind consideration.',
  'Yours faithfully,\nAmit Raj\nClass 9'
 ]}
];

export default function EnglishFormalLetterExtras(){
 return <section className="eflextras">
  <header className="eflextras-head">
   <span>LEARN • MODEL WRITING</span>
   <h2>Easy Formal Letter Examples</h2>
   <p>Read these models. Notice the order: address → date → receiver → subject → salutation → body → closing.</p>
  </header>

  <div className="eflextras-examples">
   {EXAMPLES.map((item,i)=><article className="eflextras-example" key={item.title}>
    <div className="eflextras-example-head">
     <span>EXAMPLE {i+1}</span>
     <h3>{item.title}</h3>
     <p>{item.prompt}</p>
    </div>
    <div className="eflextras-letter">
     {item.letter.map((part,j)=><p key={j} className={j===3?'eflextras-subject':j===4?'eflextras-salutation':j===item.letter.length-1?'eflextras-close':''}>{part}</p>)}
    </div>
   </article>)}
  </div>

  <section className="eflextras-subjective">
   <div className="eflextras-subjective-head">
    <span>WRITE YOUR OWN</span>
    <h2>8 Subjective Practice Questions</h2>
    <p>These questions are for writing practice only. They are separate from Practice, Challenge and Final Test.</p>
   </div>
   <div className="eflextras-question-grid">
    {SUBJECTIVE_QUESTIONS.map((q,i)=><article key={q}>
     <span>Q{i+1}</span>
     <p>{q}</p>
     <small>Check: format • content • formal tone • clear request</small>
    </article>)}
   </div>
  </section>
 </section>;
}
