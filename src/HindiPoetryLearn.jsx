import React from 'react';

const list=value=>Array.isArray(value)?value.filter(Boolean):[];
const pairs=value=>list(value).filter(item=>Array.isArray(item)&&item.length>=2);

export function HindiPoetryLearn({lesson,onBack,onModeComplete}){
  if(!lesson)return null;
  const sections=list(lesson.sections);
  const themes=list(lesson.themes);
  const glossary=pairs(lesson.glossary);
  const frameworks=pairs(lesson.answerFrameworks);
  const literaryTools=pairs(lesson.literaryTools);
  const checklist=list(lesson.examChecklist);
  const examples=pairs(lesson.poetryDevices||lesson.examples);
  const authorNote=lesson.authorNote||'कवि की रचनात्मक दृष्टि, भाषा, भाव और मुख्य संदेश को साथ रखकर कविता समझें।';
  const fallbackChecklist=['कविता का केंद्रीय भाव अपने शब्दों में लिखिए।','कवि की भावना और उसके कारण को जोड़कर उत्तर दीजिए।','भाषा, बिंब, प्रतीक या प्रश्नात्मक शैली जैसे काव्य-तत्व पहचानिए।','दीर्घ उत्तर के अंत में संक्षिप्त निष्कर्ष अवश्य दीजिए।'];
  return <div className="hindi-learn hindi-poetry-learn">
    <div className="hindi-learn-banner">
      <span>{lesson.eyebrow||'गोधूली भाग 1 · काव्य'}</span>
      <h2>{lesson.title}</h2>
      {lesson.author&&<div className="hindi-topic-author">✦ {lesson.author}</div>}
      <p>{lesson.intro||lesson.overview}</p>
    </div>

    <section className="hindi-gadhya-roadmap hindi-gadhya-roadmap-wide" aria-label="कविता सीखने का क्रम">
      <article><b>01</b><div><strong>भाव समझें</strong><span>केंद्रीय भाव और कवि की दृष्टि</span></div></article>
      <article><b>02</b><div><strong>{sections.length||'—'} पड़ाव</strong><span>कविता के विचारों को क्रम से जोड़ें</span></div></article>
      <article><b>03</b><div><strong>काव्य-भाषा पहचानें</strong><span>बिंब, प्रतीक, शैली और शब्द-संकेत</span></div></article>
      <article><b>04</b><div><strong>परखें</strong><span>अभ्यास → चुनौती → टेस्ट</span></div></article>
    </section>

    <section className="hindi-gadhya-focus-strip" aria-label="कविता अध्ययन सहायता">
      <div><span>काव्य डैशबोर्ड</span><strong>हर पड़ाव को पढ़कर मुख्य भाव अपने शब्दों में बोलें</strong></div>
      <div className="hindi-gadhya-focus-stats"><span><b>{sections.length}</b> सीखने के पड़ाव</span><span><b>{themes.length}</b> मुख्य भाव</span><span><b>{literaryTools.length}</b> काव्य-तत्व</span></div>
    </section>

    <section className="hindi-ch1-callout hindi-gadhya-primary-callout">
      <strong>💡 केंद्रीय भाव</strong>
      <p>{lesson.overview||'कविता के भाव, विचार और कवि की दृष्टि को एक साथ समझें।'}</p>
    </section>

    <section className="hindi-ch1-panel hindi-gadhya-author-panel">
      <div className="hindi-ch1-panel-head"><h3>👤 कवि परिचय</h3><span>रचना के पीछे की दृष्टि</span></div>
      <p>{authorNote}</p>
    </section>

    <section className="hindi-ch1-panel hindi-gadhya-sections-panel">
      <div className="hindi-ch1-panel-head"><div><span className="hindi-gadhya-section-kicker">मुख्य अध्ययन</span><h3>📖 कविता को क्रम से समझें</h3></div><span>{sections.length} महत्वपूर्ण पड़ाव</span></div>
      <div className="hindi-learn-grid hindi-gadhya-section-grid">
        {sections.map((item,index)=><section id={`hindi-poetry-section-${index}`} className="hindi-gadhya-learning-card" key={`${item.title}-${index}`}>
          <div className="hindi-gadhya-card-number">{String(index+1).padStart(2,'0')}</div>
          <div className="hindi-gadhya-card-body">
            <div className="hindi-gadhya-card-kicker">पड़ाव {index+1}</div>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            {item.deep&&<div className="hindi-ch1-callout"><strong>🔎 गहराई</strong><p>{item.deep}</p></div>}
            {item.example&&<div className="hindi-ch1-callout"><strong>🧩 उदाहरण</strong><p>{item.example}</p></div>}
            {item.exam&&<div className="hindi-ch1-callout"><strong>🎯 परीक्षा संकेत</strong><p>{item.exam}</p></div>}
          </div>
        </section>)}
      </div>
    </section>

    {examples.length>0&&<section className="hindi-ch1-panel hindi-gadhya-knowledge-panel">
      <div className="hindi-ch1-panel-head"><h3>🎨 काव्य-तत्व से समझें</h3><span>कविता की भाषा क्या करती है?</span></div>
      <div className="hindi-ch1-two-col">{examples.map(([title,body],index)=><article key={`${title}-${index}`}><strong>{title}</strong><p>{body}</p></article>)}</div>
    </section>}

    <section className="hindi-ch1-panel hindi-gadhya-knowledge-panel">
      <div className="hindi-ch1-panel-head"><h3>🎯 मुख्य विचार</h3><span>उत्तर में प्रयोग करें</span></div>
      <div className="hindi-ch1-chip-grid">{(themes.length?themes:sections.slice(0,8).map(item=>item.title)).map((item,index)=><span key={`${item}-${index}`}>{item}</span>)}</div>
    </section>

    <section className="hindi-ch1-panel hindi-gadhya-knowledge-panel">
      <div className="hindi-ch1-panel-head"><h3>🖊️ भाषा और काव्य-शैली</h3><span>अभिव्यक्ति का तरीका</span></div>
      {literaryTools.length>0?<div className="hindi-ch1-two-col">{literaryTools.map(([title,body],index)=><article key={`${title}-${index}`}><strong>{title}</strong><p>{body}</p></article>)}</div>:<p>कविता में प्रयुक्त बिंब, प्रतीक, प्रश्न, संबोधन, पुनरावृत्ति या अन्य शैलीगत संकेतों को प्रसंग के साथ पहचानें।</p>}
    </section>

    <section className="hindi-ch1-panel hindi-gadhya-knowledge-panel">
      <div className="hindi-ch1-panel-head"><h3>📚 शब्द-संग्रह</h3><span>कठिन शब्द और अर्थ</span></div>
      {glossary.length>0?<div className="hindi-ch1-glossary">{glossary.map(([word,meaning],index)=><article key={`${word}-${index}`}><strong>{word}</strong><p>{meaning}</p></article>)}</div>:<p>कठिन शब्दों का अर्थ संदर्भ से समझें और उन्हें एक-पंक्ति अर्थ के साथ दोहराएँ।</p>}
    </section>

    <section className="hindi-ch1-panel hindi-gadhya-knowledge-panel">
      <div className="hindi-ch1-panel-head"><h3>✍️ उत्तर बनाने के ढाँचे</h3><span>लघु और दीर्घ उत्तर</span></div>
      {frameworks.length>0?<div className="hindi-ch1-frameworks">{frameworks.map(([question,template],index)=><article key={`${question}-${index}`}><strong>{question}</strong><p>{template}</p></article>)}</div>:<div className="hindi-ch1-frameworks"><article><strong>कविता का मुख्य भाव क्या है?</strong><p>केंद्रीय भाव + संबंधित पंक्ति/प्रसंग का सार + कवि की दृष्टि + निष्कर्ष।</p></article><article><strong>कवि ने ऐसा क्यों कहा?</strong><p>संदर्भ + भावना/विचार + भाषा-संकेत + पाठ पर प्रभाव।</p></article></div>}
    </section>

    <section className="hindi-ch1-panel hindi-gadhya-knowledge-panel hindi-gadhya-final-check">
      <div className="hindi-ch1-panel-head"><h3>✅ परीक्षा checklist</h3><span>टेस्ट से पहले</span></div>
      <ul>{(checklist.length?checklist:fallbackChecklist).map((item,index)=><li key={`${item}-${index}`}>{item}</li>)}</ul>
    </section>

    <div className="hindi-gadhya-end-note"><span>काव्य अध्याय तैयार है</span><strong>अब अभ्यास में अपने शब्दों से समझ दिखाएँ।</strong></div>

    <div className="hindi-actions">
      <button type="button" className="secondary-btn pressable" onClick={onBack}>← पीछे</button>
      <button type="button" className="primary-btn pressable" onClick={()=>onModeComplete?.('learn')}>✓ सीखना पूरा करें</button>
    </div>
  </div>;
}
