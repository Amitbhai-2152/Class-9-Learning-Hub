import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const subjects = [
  { id: 'math', hi: 'गणित', en: 'Mathematics', chapter: 'संख्या पद्धति और बहुपद' },
  { id: 'science', hi: 'विज्ञान', en: 'Science', chapter: 'हमारे आसपास के पदार्थ' },
  { id: 'hindi', hi: 'हिन्दी', en: 'Hindi', chapter: 'कहानी के प्लॉट–1' },
  { id: 'sst', hi: 'सामाजिक विज्ञान', en: 'Social Science', chapter: 'भौगोलिक खोजें–भाग 1' },
  { id: 'sanskrit', hi: 'संस्कृत', en: 'Sanskrit', chapter: 'ईशस्तुति' },
  { id: 'english', hi: 'अंग्रेज़ी', en: 'English', chapter: 'व्याकरण, काल और शब्दावली' },
  { id: 'reasoning', hi: 'तर्कशक्ति', en: 'Reasoning', chapter: 'उन्नत तर्कशक्ति' },
];

const modes = [
  ['learn', '📖', 'सीखें', 'अध्याय की अवधारणाएँ समझें'],
  ['practice', '📝', 'अभ्यास', 'अभ्यास प्रश्न हल करें'],
  ['challenge', '🔥', 'चुनौती', 'कठिन प्रश्नों से खुद को परखें'],
  ['test', '🎯', 'टेस्ट', 'समयबद्ध परीक्षा दें'],
];

function App() {
  const [selected, setSelected] = useState(null);
  if (selected) return <Chapter subject={selected} onBack={() => setSelected(null)} />;
  return (
    <main className="app-shell">
      <header className="hero"><div className="hero-inner">
        <div className="badge">कक्षा 9 • लर्निंग हब</div>
        <h1>पढ़ें • अभ्यास करें • चुनौती लें • टेस्ट दें</h1>
        <p>हर अध्याय के लिए सीखने से लेकर परीक्षा और पुनरावलोकन तक एक व्यवस्थित, हिन्दी-प्रथम अनुभव।</p>
      </div></header>
      <section className="dashboard">
        <div className="section-heading"><div><span className="eyebrow">आपकी सीखने की यात्रा</span><h2>विषय चुनें</h2></div><div className="progress-card"><strong>0%</strong><span>कुल प्रगति</span></div></div>
        <div className="subject-grid">{subjects.map((subject, i) => <article className="subject-card" key={subject.id}>
          <div className="subject-number">{String(i + 1).padStart(2, '0')}</div><h3>{subject.hi}</h3><p className="subject-en">{subject.en}</p><p>{subject.chapter}</p>
          <button type="button" onClick={() => setSelected(subject)}>अध्याय खोलें <span>→</span></button>
        </article>)}</div>
      </section>
    </main>
  );
}

function Chapter({ subject, onBack }) {
  return <main className="chapter-page">
    <header className="chapter-header"><button className="back-button" onClick={onBack}>← वापस विषयों पर</button><div className="badge">कक्षा 9 • {subject.hi}</div><h1>{subject.chapter}</h1><p>इस अध्याय को समझें, अभ्यास करें और फिर अपनी तैयारी जाँचें।</p></header>
    <section className="chapter-content"><div className="chapter-intro"><span className="eyebrow">अध्याय अध्ययन</span><h2>आप क्या करना चाहते हैं?</h2><p>हर चरण आपकी तैयारी को अगले स्तर तक ले जाने के लिए बनाया गया है।</p></div>
      <div className="mode-grid">{modes.map(([id, icon, title, desc]) => <button className="mode-card" key={id} type="button">
        <span className="mode-icon">{icon}</span><strong>{title}</strong><span>{desc}</span><b>→</b>
      </button>)}</div>
      <div className="coming-soon"><strong>अगला चरण</strong><span>अब इसी ढाँचे में अध्याय की वास्तविक पाठ्य-सामग्री और प्रश्न जोड़े जाएँगे।</span></div>
    </section>
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
