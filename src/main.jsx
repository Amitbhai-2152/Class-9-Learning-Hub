import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const subjects = [
  ['गणित', 'संख्या पद्धति और बहुपद'], ['विज्ञान', 'हमारे आसपास के पदार्थ'], ['हिन्दी', 'कहानी के प्लॉट–1'],
  ['सामाजिक विज्ञान', 'भौगोलिक खोजें–भाग 1'], ['संस्कृत', 'ईशस्तुति'], ['अंग्रेज़ी', 'व्याकरण, काल और शब्दावली'], ['तर्कशक्ति', 'उन्नत तर्कशक्ति']
];

const tests = ['अध्याय टेस्ट', 'मासिक टेस्ट', 'मिश्रित अभ्यास टेस्ट', 'मॉडल टेस्ट'];

function App() {
  const [page, setPage] = useState('home');
  if (page === 'classes') return <SimplePage title="सभी कक्षाएँ" onBack={() => setPage('home')}><div className="class-list">{subjects.map(([name, chapter], i) => <button className="list-card" key={name} onClick={() => setPage('chapter')}><span>0{i + 1}</span><div><strong>{name}</strong><small>{chapter}</small></div><b>→</b></button>)}</div></SimplePage>;
  if (page === 'tests') return <SimplePage title="सभी टेस्ट" onBack={() => setPage('home')}><div className="class-list">{tests.map((test, i) => <button className="list-card" key={test}><span>0{i + 1}</span><div><strong>{test}</strong><small>जल्द ही उपलब्ध</small></div><b>→</b></button>)}</div></SimplePage>;
  if (page === 'meter') return <SimplePage title="तैयारी मीटर" onBack={() => setPage('home')}><div className="meter-box"><div className="meter-ring">0%</div><h2>अभी आपकी तैयारी शुरू नहीं हुई है</h2><p>अध्याय पढ़ने, अभ्यास और टेस्ट पूरा करने के साथ आपकी प्रगति यहाँ दिखाई जाएगी।</p></div></SimplePage>;
  return <Home setPage={setPage} />;
}

function Home({ setPage }) {
  const cards = [
    ['classes', '▣', 'सभी कक्षाएँ', 'सभी विषय और अध्याय देखें'],
    ['tests', '✎', 'सभी टेस्ट', 'उपलब्ध परीक्षाएँ और अभ्यास टेस्ट'],
    ['meter', '◔', 'तैयारी मीटर', 'अपनी तैयारी और प्रगति देखें']
  ];
  return <main className="app-shell">
    <nav className="topbar"><strong>पढ़ाई</strong><span className="nav-class">कक्षा 9</span><span className="nav-dot">●</span></nav>
    <header className="hero"><div className="hero-inner"><div className="badge">कक्षा 9</div><h1>आपकी पढ़ाई, एक जगह</h1><p>विषय पढ़ें, टेस्ट दें और अपनी तैयारी पर नज़र रखें।</p></div></header>
    <section className="dashboard"><div className="section-heading"><div><span className="eyebrow">कक्षा 9</span><h2>अध्ययन सुविधाएँ</h2></div></div>
      <div className="offering-grid">{cards.map(([id, icon, title, desc]) => <button className="offering-card" key={id} onClick={() => setPage(id)}><span className="offering-icon">{icon}</span><span className="offering-copy"><strong>{title}</strong><small>{desc}</small></span><b>›</b></button>)}</div>
    </section>
  </main>;
}

function SimplePage({ title, onBack, children }) { return <main className="page"><header className="page-header"><button onClick={onBack}>← वापस</button><div className="badge">कक्षा 9 • लर्निंग हब</div><h1>{title}</h1></header><section className="page-content">{children}</section></main>; }

createRoot(document.getElementById('root')).render(<App />);
