import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const subjects = [
  ['गणित', 'संख्या पद्धति और बहुपद'], ['विज्ञान', 'हमारे आसपास के पदार्थ'], ['हिन्दी', 'कहानी के प्लॉट–1'],
  ['सामाजिक विज्ञान', 'भौगोलिक खोजें–भाग 1'], ['संस्कृत', 'ईशस्तुति'], ['अंग्रेज़ी', 'व्याकरण, काल और शब्दावली'], ['तर्कशक्ति', 'उन्नत तर्कशक्ति']
];
const tests = ['अध्याय टेस्ट', 'मासिक टेस्ट', 'मिश्रित अभ्यास टेस्ट', 'मॉडल टेस्ट'];
const XP_PER_LEVEL = 250;

function loadProgress() {
  try { return JSON.parse(localStorage.getItem('class9-progress')) || { xp: 0, streak: 1, dailyXp: 0, goal: 100 }; }
  catch { return { xp: 0, streak: 1, dailyXp: 0, goal: 100 }; }
}

function App() {
  const [page, setPage] = useState('home');
  const [progress, setProgress] = useState(loadProgress);
  const [tutorOpen, setTutorOpen] = useState(false);
  const [xpToast, setXpToast] = useState(null);
  useEffect(() => localStorage.setItem('class9-progress', JSON.stringify(progress)), [progress]);

  const addXp = amount => {
    setProgress(p => ({ ...p, xp: p.xp + amount, dailyXp: Math.min(p.goal, p.dailyXp + amount) }));
    setXpToast(`+${amount} XP`);
    window.clearTimeout(addXp.timer);
    addXp.timer = window.setTimeout(() => setXpToast(null), 1500);
  };

  if (page === 'classes') return <SimplePage title="सभी कक्षाएँ" onBack={() => setPage('home')}><div className="class-list">{subjects.map(([name, chapter], i) => <button className="list-card pressable" key={name} onClick={() => setPage('chapter')}><span>0{i + 1}</span><div><strong>{name}</strong><small>{chapter}</small></div><b>→</b></button>)}</div></SimplePage>;
  if (page === 'tests') return <SimplePage title="सभी टेस्ट" onBack={() => setPage('home')}><div className="class-list">{tests.map((test, i) => <button className="list-card pressable" key={test} onClick={() => addXp(10)}><span>0{i + 1}</span><div><strong>{test}</strong><small>टेस्ट चुनें • +10 XP</small></div><b>→</b></button>)}</div></SimplePage>;
  if (page === 'meter') return <PreparationMeter progress={progress} onBack={() => setPage('home')} />;
  if (page === 'chapter') return <SimplePage title="अध्याय" onBack={() => setPage('classes')}><div className="chapter-placeholder"><span className="mini-icon">📚</span><h2>अध्याय अध्ययन</h2><p>यहाँ से सीखना, अभ्यास और टेस्ट आगे जोड़े जाएँगे।</p><button className="primary-btn pressable" onClick={() => addXp(25)}>अध्ययन शुरू करें <span>+25 XP</span></button></div></SimplePage>;
  return <Home progress={progress} setPage={setPage} addXp={addXp} tutorOpen={tutorOpen} setTutorOpen={setTutorOpen} xpToast={xpToast} />;
}

function Home({ progress, setPage, addXp, tutorOpen, setTutorOpen, xpToast }) {
  const level = Math.floor(progress.xp / XP_PER_LEVEL) + 1;
  const currentLevelXp = progress.xp % XP_PER_LEVEL;
  const levelPercent = Math.round((currentLevelXp / XP_PER_LEVEL) * 100);
  const dailyPercent = Math.min(100, Math.round((progress.dailyXp / progress.goal) * 100));
  const cards = [
    ['classes', '▣', 'सभी कक्षाएँ', 'सभी विषय और अध्याय देखें'],
    ['tests', '✎', 'सभी टेस्ट', 'परीक्षा और अभ्यास टेस्ट दें'],
    ['meter', '◔', 'तैयारी मीटर', 'अपनी तैयारी और प्रगति देखें']
  ];

  return <main className="app-shell">
    <nav className="topbar">
      <strong className="brand">पढ़ाई</strong><span className="nav-class">कक्षा 9</span>
      <div className="top-stats"><span className="streak">🔥 {progress.streak} दिन</span><span className="xp-pill">⚡ {progress.xp} XP</span><span className="level-pill">LVL {level}</span></div>
      <button className="tutor-mini pressable" onClick={() => setTutorOpen(true)}>✦ <span>Smart Tutor</span></button>
    </nav>

    <header className="hero"><div className="hero-glow glow-one" /><div className="hero-glow glow-two" /><div className="hero-inner"><div className="welcome-row"><div><div className="badge">कक्षा 9 • STUDY SPACE</div><h1>आज की पढ़ाई शुरू करें।</h1><p>छोटा लक्ष्य चुनें, ध्यान से पढ़ें और हर कदम पर XP कमाएँ।</p></div><div className="focus-orb" aria-hidden="true">✦</div></div></div></header>

    <section className="dashboard">
      <div className="progress-strip">
        <div className="level-badge"><span>LVL</span><strong>{level}</strong></div>
        <div className="level-copy"><div className="level-title"><strong>आपकी सीखने की ऊर्जा</strong><span>{currentLevelXp} / {XP_PER_LEVEL} XP</span></div><div className="progress-track"><span style={{ width: `${levelPercent}%` }} /></div><small>हर सही अभ्यास आपको अगले लेवल के करीब ले जाता है।</small></div>
        <div className="daily-goal"><strong>{progress.dailyXp} XP</strong><span>आज का लक्ष्य {progress.goal}</span><div className="tiny-track"><span style={{ width: `${dailyPercent}%` }} /></div></div>
      </div>

      <div className="section-heading"><div><span className="eyebrow">कक्षा 9</span><h2>अध्ययन सुविधाएँ</h2></div><span className="focus-label">🎯 Focus Mode</span></div>
      <div className="offering-grid">{cards.map(([id, icon, title, desc], index) => <button className={`offering-card pressable card-${index + 1}`} key={id} onClick={() => setPage(id)}><span className="offering-icon">{icon}</span><span className="offering-copy"><strong>{title}</strong><small>{desc}</small></span><span className="card-arrow">›</span></button>)}</div>

      <section className="study-nudge"><div><span className="nudge-icon">⚡</span><div><strong>आज का छोटा मिशन</strong><p>25 XP कमाएँ और अपना focused study session शुरू करें।</p></div></div><button className="secondary-btn pressable" onClick={() => addXp(25)}>+25 XP <span>अभी शुरू करें →</span></button></section>
      <button className="tutor-banner pressable" onClick={() => setTutorOpen(true)}><span>🤖</span><div><strong>स्मार्ट ट्यूटर AI</strong><small>किसी भी विषय को समझने, सवाल पूछने या study plan बनाने में मदद लें।</small></div><b>पूछें →</b></button>
      <div className="study-footer"><span>🎯 फोकस मोड</span><span>⭐ हर सही प्रयास आपकी प्रगति बढ़ाता है</span><span>🔥 streak बनाए रखें</span></div>
    </section>
    {xpToast && <div className="xp-toast">⚡ {xpToast}</div>}
    {tutorOpen && <Tutor onClose={() => setTutorOpen(false)} onEarn={() => addXp(5)} />}
  </main>;
}

function PreparationMeter({ progress, onBack }) { const score = Math.min(100, Math.round((progress.xp / 4000) * 100)); return <main className="page"><header className="page-header"><button className="pressable" onClick={onBack}>← वापस</button><div className="badge">कक्षा 9 • लर्निंग हब</div><h1>तैयारी मीटर</h1></header><section className="page-content"><div className="meter-box"><div className="meter-ring" style={{ '--meter': `${score * 3.6}deg` }}><span>{score}%</span></div><h2>आपकी तैयारी प्रगति पर है</h2><p>XP, अभ्यास और टेस्ट पूरे होने के साथ यह स्कोर बेहतर होगा। अभी कुल <strong>{progress.xp} XP</strong> जमा हैं।</p><div className="meter-stats"><span>🔥 {progress.streak} दिन streak</span><span>⚡ {progress.xp} XP</span></div></div></section></main>; }

function Tutor({ onClose, onEarn }) { const [message, setMessage] = useState(''); const [answer, setAnswer] = useState(''); const suggestions = ['मुझे आज क्या पढ़ना चाहिए?', 'गणित समझाओ', 'मेरा टेस्ट प्लान बनाओ']; const reply = text => { if (!text.trim()) return; setMessage(text); onEarn(); if (text.includes('गणित')) setAnswer('गणित में पहले वह अध्याय चुनें जिसमें आपका confidence कम है। फिर 15 मिनट concept और 10 मिनट practice का cycle रखें।'); else if (text.includes('टेस्ट')) setAnswer('आज एक छोटा chapter test दें, गलत प्रश्नों को review करें और फिर उसी topic के 5 practice questions हल करें।'); else setAnswer('आज 25 मिनट का focused session करें: 15 मिनट सीखें, 10 मिनट practice करें। अंत में अपनी गलतियाँ review करें।'); }; return <div className="tutor-backdrop" onClick={onClose}><aside className="tutor-panel" onClick={e => e.stopPropagation()}><div className="tutor-head"><div><span className="ai-dot">✦</span><div><strong>Smart Tutor AI</strong><small>आपकी पढ़ाई का साथी</small></div></div><button onClick={onClose}>×</button></div><div className="tutor-body"><div className="tutor-message"><strong>नमस्ते! 👋</strong><p>मैं आपकी study planning और concepts समझने में मदद कर सकता हूँ।</p></div>{answer && <div className="tutor-answer">{answer}</div>}<div className="suggestions">{suggestions.map(s => <button className="suggestion pressable" key={s} onClick={() => reply(s)}>{s}</button>)}</div></div><div className="tutor-foot"><input value={message} onChange={e => setMessage(e.target.value)} placeholder="अपना सवाल लिखें..." onKeyDown={e => e.key === 'Enter' && reply(message)} /><button className="send-btn pressable" onClick={() => reply(message)}>→</button></div></aside></div>; }

function SimplePage({ title, onBack, children }) { return <main className="page"><header className="page-header"><button className="pressable" onClick={onBack}>← वापस</button><div className="badge">कक्षा 9 • लर्निंग हब</div><h1>{title}</h1></header><section className="page-content">{children}</section></main>; }

createRoot(document.getElementById('root')).render(<App />);
