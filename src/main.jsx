import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const subjects = [
  ['Mathematics', 'गणित', 'संख्या पद्धति और बहुपद'],
  ['Science', 'विज्ञान', 'हमारे आसपास के पदार्थ'],
  ['Hindi', 'हिन्दी', 'कहानी के प्लॉट–1'],
  ['Social Science', 'सामाजिक विज्ञान', 'भौगोलिक खोजें–भाग 1'],
  ['Sanskrit', 'संस्कृत', 'ईशस्तुति'],
  ['English', 'अंग्रेज़ी', 'Grammar, Tenses & Vocabulary'],
  ['Reasoning', 'तर्कशक्ति', 'Advanced Reasoning'],
];

function App() {
  return (
    <main className="app-shell">
      <header className="hero">
        <div className="badge">CLASS 9 • LEARNING HUB</div>
        <h1>पढ़ो • अभ्यास करो • चुनौती लो • टेस्ट दो</h1>
        <p>एक व्यवस्थित learning hub जहाँ हर chapter से सीखना, practice, challenge और test एक ही flow में मिलेगा।</p>
      </header>

      <section className="dashboard">
        <div className="section-heading">
          <div>
            <span className="eyebrow">YOUR LEARNING DASHBOARD</span>
            <h2>विषय चुनें</h2>
          </div>
          <div className="progress-card"><strong>0%</strong><span>Progress</span></div>
        </div>

        <div className="subject-grid">
          {subjects.map(([en, hi, chapter], i) => (
            <article className="subject-card" key={en}>
              <div className="subject-number">0{i + 1}</div>
              <h3>{hi}</h3>
              <p className="subject-en">{en}</p>
              <p>{chapter}</p>
              <button type="button">Open Chapter <span>→</span></button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
