import React from 'react';

const list=value=>Array.isArray(value)?value.filter(Boolean):[];
const pairs=value=>list(value).filter(item=>Array.isArray(item)&&item.length>=2);
const peopleOf=lesson=>list(lesson.characters||lesson.people);

export function HindiGadhyaLearn({lesson,onBack,onModeComplete}){
  if(!lesson)return null;
  const sections=list(lesson.sections);
  const themes=list(lesson.themes);
  const literaryTools=pairs(lesson.literaryTools);
  const glossary=pairs(lesson.glossary);
  const frameworks=pairs(lesson.answerFrameworks);
  const checklist=list(lesson.examChecklist);
  const people=peopleOf(lesson);
  const mapPairs=pairs(lesson.timeline||lesson.storyMap||lesson.waterWisdom||lesson.thesis);
  const comparison=pairs(lesson.comparison);
  const authorNote=lesson.authorNote||'इस पाठ को लेखक की दृष्टि, पात्रों की भूमिका, सामाजिक संदर्भ और मुख्य संदेश के साथ पढ़ें।';
  const fallbackChecklist=['पाठ का केंद्रीय विचार अपने शब्दों में बताइए।','मुख्य पात्र/प्रसंग और उनके महत्व को जोड़कर उत्तर दीजिए।','उत्तर में कारण, प्रभाव और लेखक की दृष्टि स्पष्ट रखिए।','लंबे उत्तर के अंत में संक्षिप्त निष्कर्ष लिखिए।'];
  const sectionCount=sections.length;
  return <div className="hindi-learn hindi-chapter1-learn hindi-gadhya-learn">
    <div className="hindi-learn-banner">
      <span>{lesson.eyebrow||'गोधूली भाग 1 · गद्य'}</span>
      <h2>{lesson.title}</h2>
      <p>{lesson.intro||lesson.overview}</p>
      {lesson.author&&<div className="hindi-topic-author">✦ {lesson.author}</div>}
    </div>

    <section className="hindi-gadhya-roadmap" aria-label="अध्याय सीखने का क्रम">
      <article><b>01</b><strong>समझें</strong><span>केंद्रीय विचार और लेखक की दृष्टि</span></article>
      <article><b>02</b><strong>{sectionCount||'—'} पड़ाव</strong><span>पाठ को क्रम से गहराई में पढ़ें</span></article>
      <article><b>03</b><strong>तैयार हों</strong><span>शब्द, शैली और उत्तर-लेखन</span></article>
    </section>

    <section className="hindi-ch1-callout">
      <strong>💡 केंद्रीय बात</strong>
      <p>{lesson.overview||'इस पाठ के मुख्य विचार, प्रसंग और संदेश को क्रम से समझें।'}</p>
    </section>

    <section className="hindi-ch1-panel">
      <div className="hindi-ch1-panel-head"><h3>👤 लेखक परिचय</h3><span>लेखक की दृष्टि समझें</span></div>
      <p>{authorNote}</p>
    </section>

    <section className="hindi-ch1-panel hindi-gadhya-sections-panel">
      <div className="hindi-ch1-panel-head"><h3>📖 पाठ को क्रम से समझें</h3><span>{sectionCount} महत्वपूर्ण पड़ाव</span></div>
      <div className="hindi-learn-grid hindi-gadhya-section-grid">
        {sections.map((item,index)=><section id={`hindi-gadhya-section-${index}`} className="hindi-gadhya-learning-card" key={`${item.title}-${index}`}>
          <div className="hindi-gadhya-card-number">{String(index+1).padStart(2,'0')}</div>
          <div className="hindi-gadhya-card-body">
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            {item.deep&&<div className="hindi-ch1-callout"><strong>🔎 गहराई</strong><p>{item.deep}</p></div>}
            {item.example&&<div className="hindi-ch1-callout"><strong>🌍 उदाहरण</strong><p>{item.example}</p></div>}
            {item.exam&&<div className="hindi-ch1-callout"><strong>🎯 परीक्षा संकेत</strong><p>{item.exam}</p></div>}
          </div>
        </section>)}
      </div>
    </section>

    {mapPairs.length>0&&<section className="hindi-ch1-panel">
      <div className="hindi-ch1-panel-head"><h3>🧭 विचार-क्रम</h3><span>मुख्य बात कैसे आगे बढ़ती है?</span></div>
      <div className="hindi-ch1-story-map">{mapPairs.map(([title,body],index)=><article key={`${title}-${index}`}><b>{index+1}</b><div><strong>{title}</strong><p>{body}</p></div></article>)}</div>
    </section>}

    {people.length>0&&<section className="hindi-ch1-panel">
      <div className="hindi-ch1-panel-head"><h3>👥 प्रमुख व्यक्ति और संदर्भ</h3><span>कौन · भूमिका · महत्व</span></div>
      <div className="hindi-ch1-characters">{people.map((item,index)=>{const name=item?.name??item?.[0];const role=item?.role??item?.[1];const note=item?.note??item?.[2];return <article key={`${name}-${index}`}><strong>{name}</strong>{role&&<span>{role}</span>}{note&&<p>{note}</p>}</article>})}</div>
    </section>}

    {comparison.length>0&&<section className="hindi-ch1-panel">
      <div className="hindi-ch1-panel-head"><h3>⚖️ तुलना से समझें</h3><span>मुख्य अंतर और संबंध</span></div>
      <div className="hindi-ch1-two-col">{comparison.map(([title,a,b,c],index)=><article key={`${title}-${index}`}><strong>{title}</strong><p>{a}</p>{b&&<p><b>अर्थ:</b> {b}</p>}{c&&<p><b>प्रभाव:</b> {c}</p>}</article>)}</div>
    </section>}

    <section className="hindi-ch1-panel">
      <div className="hindi-ch1-panel-head"><h3>🎯 मुख्य विचार</h3><span>उत्तर में प्रयोग करें</span></div>
      <div className="hindi-ch1-chip-grid">{(themes.length?themes:sections.slice(0,6).map(item=>item.title)).map((item,index)=><span key={`${item}-${index}`}>{item}</span>)}</div>
    </section>

    <section className="hindi-ch1-panel">
      <div className="hindi-ch1-panel-head"><h3>🖊️ भाषा और शैली</h3><span>लेखक बात कैसे प्रभावी बनाते हैं?</span></div>
      {literaryTools.length>0?<div className="hindi-ch1-two-col">{literaryTools.map(([title,body],index)=><article key={`${title}-${index}`}><strong>{title}</strong><p>{body}</p></article>)}</div>:<p>पाठ की भाषा, वर्णन, संवाद, व्यंग्य या भाव-प्रस्तुति को उसके संदर्भ के साथ पहचानें और उत्तर में उदाहरण सहित समझाएँ।</p>}
    </section>

    <section className="hindi-ch1-panel">
      <div className="hindi-ch1-panel-head"><h3>📚 शब्द-संग्रह</h3><span>महत्वपूर्ण शब्द</span></div>
      {glossary.length>0?<div className="hindi-ch1-glossary">{glossary.map(([word,meaning],index)=><article key={`${word}-${index}`}><strong>{word}</strong><p>{meaning}</p></article>)}</div>:<p>नए या कठिन शब्दों का अर्थ उनके वाक्य-संदर्भ से समझें और अपनी कॉपी में एक-पंक्ति अर्थ लिखकर दोहराएँ।</p>}
    </section>

    <section className="hindi-ch1-panel">
      <div className="hindi-ch1-panel-head"><h3>✍️ उत्तर बनाने के ढाँचे</h3><span>लघु और दीर्घ उत्तर की दिशा</span></div>
      {frameworks.length>0?<div className="hindi-ch1-frameworks">{frameworks.map(([question,template],index)=><article key={`${question}-${index}`}><strong>{question}</strong><p>{template}</p></article>)}</div>:<div className="hindi-ch1-frameworks"><article><strong>पाठ का मुख्य संदेश क्या है?</strong><p>मुख्य विचार + संबंधित प्रसंग + लेखक की दृष्टि + छोटा निष्कर्ष।</p></article><article><strong>मुख्य पात्र/घटना का महत्व बताइए।</strong><p>पहचान + भूमिका + व्यवहार/घटना + पाठ पर प्रभाव।</p></article></div>}
    </section>

    <section className="hindi-ch1-panel">
      <div className="hindi-ch1-panel-head"><h3>✅ परीक्षा checklist</h3><span>टेस्ट से पहले</span></div>
      <ul>{(checklist.length?checklist:fallbackChecklist).map((item,index)=><li key={`${item}-${index}`}>{item}</li>)}</ul>
    </section>

    <div className="hindi-actions">
      <button type="button" className="secondary-btn pressable" onClick={onBack}>← पीछे</button>
      <button type="button" className="primary-btn pressable" onClick={()=>onModeComplete?.('learn')}>✓ सीखना पूरा करें • +20 XP</button>
    </div>
  </div>;
}
