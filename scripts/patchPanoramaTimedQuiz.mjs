import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const root = process.cwd();

function patchChapter(path, component, meta, label) {
  const full = `${root}/${path}`;
  let text = fs.readFileSync(full, 'utf8');

  text = text.replace(
    /^import React,\{[^}]+\} from 'react';$/m,
    "import React,{useState} from 'react';\nimport PanoramaTimedQuiz from './PanoramaTimedQuiz.jsx';",
  );

  const withoutShuffle = text.replace(
    /\nfunction shuffleQuestion\(q\)\{[\s\S]*?\n\}\n\n(?=function StudyView)/,
    '\n',
  );
  if (withoutShuffle === text) throw new Error(`${path}: legacy shuffleQuestion helper not found`);
  text = withoutShuffle;

  const start = text.indexOf(`export function ${component}`);
  const end = text.indexOf(`export const ${meta}=`, start);
  if (start < 0 || end < 0) throw new Error(`${path}: component boundary not found`);

  const learn = `<div className="pg-shell">
    <div className="pg-hero">
      <span className="badge">CLASS 9 • THE PANORAMA • ${label}</span>
      <h1>{study.title}</h1>
      <p>{study.author} • Guided learning</p>
      <div className="pg-hero-stats">
        <span>Complete Chapter Study</span><span>15 Practice</span><span>23 Challenge</span><span>20 Final Test</span>
      </div>
    </div>
    <div className="pg-modebar">
      <button className="active" onClick={() => begin('learn')}><b>Learn</b><span>पूरा chapter समझें</span></button>
      <button onClick={() => begin('practice')}><b>Practice</b><span>15 questions • 11:15 min • Easy → Moderate</span></button>
      <button onClick={() => begin('challenge')}><b>Challenge</b><span>23 questions • 23:00 min • Moderate → Hard</span></button>
      <button onClick={() => begin('test')}><b>Final Test</b><span>20 questions • 25:00 min • Exam Level</span></button>
    </div>
    <button className="pg-back" onClick={onBack}>← English books</button>
    <StudyView />
  </div>`;

  const replacement = `export function ${component}({initialMode=null,onBack,addXp,finishSession}) {
  const [mode,setMode] = useState(initialMode || 'learn');
  const begin = nextMode => setMode(nextMode);
  if (mode === 'learn' || mode === null) return ${learn};
  const bank = mode === 'practice' ? practice : mode === 'challenge' ? challenge : mode === 'test' ? finalTest : [];
  return <PanoramaTimedQuiz
    mode={mode}
    title={study.title}
    bank={bank}
    onBack={() => begin('learn')}
    addXp={addXp}
    finishSession={payload => finishSession?.({subject:'english',book:'The Panorama',...payload})}
  />;
}

`;

  text = text.slice(0, start) + replacement + text.slice(end);
  fs.writeFileSync(full, text);
}

patchChapter('src/english/EnglishPanoramaChapter1.jsx', 'EnglishPanoramaChapter1', 'englishPanoramaChapter1Meta', 'PROSE 1');
patchChapter('src/english/EnglishPanoramaChapter2.jsx', 'EnglishPanoramaChapter2', 'englishPanoramaChapter2Meta', 'PROSE 2');

const main2 = `${root}/src/main2.jsx`;
if (fs.existsSync(main2)) {
  let text = fs.readFileSync(main2, 'utf8');
  text = text.replace("import './english/panoramaChapter1RuntimeRandomizer.js';\n", '');
  fs.writeFileSync(main2, text);
}

for (const file of [
  'src/english/panoramaChapter1RuntimeRandomizer.js',
  '.github/workflows/panorama-fix.yml',
  '.github/workflows/wire-panorama-timed-quiz.yml',
  '.github/workflows/panorama-patch-test.yml',
]) {
  const full = `${root}/${file}`;
  if (fs.existsSync(full)) fs.rmSync(full);
}

// Restore standard CI and Pages workflows to the clean pre-experiment versions.
execFileSync('git', ['checkout', '401fdae45b2643e8c5ca5947069f06060ecdfdcb', '--', '.github/workflows/build.yml', '.github/workflows/pages.yml'], { stdio: 'inherit' });

for (const path of [
  'src/english/EnglishPanoramaChapter1.jsx',
  'src/english/EnglishPanoramaChapter2.jsx',
]) {
  const t = fs.readFileSync(`${root}/${path}`, 'utf8');
  if (!t.includes("PanoramaTimedQuiz from './PanoramaTimedQuiz.jsx'")) throw new Error(`${path}: timed engine import missing`);
  if (t.includes('const [selected,setSelected]') || t.includes('pg-feedback')) throw new Error(`${path}: legacy quiz UI remains`);
}

console.log('PANORAMA_TIMED_QUIZ_MIGRATION_OK');
