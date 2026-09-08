import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const files = [
  'src/english/EnglishPanoramaChapter1.jsx',
  'src/english/EnglishPanoramaChapter2.jsx',
  'src/english/EnglishPanoramaChapter3.jsx',
  'src/english/EnglishPanoramaChapter4.jsx',
  'src/english/EnglishPanoramaChapter5.jsx',
  'src/english/EnglishPanoramaChapter6Final.jsx',
  'src/english/EnglishPanoramaChapter7Final.jsx',
  'src/english/EnglishPanoramaChapter8.jsx',
  'src/english/EnglishPanoramaChapter9.jsx',
  'src/english/EnglishPanoramaProseRevision.jsx',
];

const replacements = [
  { label: 'Ch5 natural gerund example', from: 'I know swimming.', to: 'I know how to swim.' },
  { label: 'Ch7 natural relative-clause example', from: 'This is the man who he is talking about.', to: 'This is the man whom he is talking about.' },
  { label: 'Ch5 natural Hindi translation', from: 'मैं एक प्यासे हुए आदमी को कहीं देखा।', to: 'मैंने कहीं एक प्यासे आदमी को देखा।' },
];

const changed = [];
const missing = [];
for (const rel of replacements) {
  let found = false;
  for (const file of files) {
    const full = path.join(root, file);
    if (!fs.existsSync(full)) continue;
    const before = fs.readFileSync(full, 'utf8');
    if (!before.includes(rel.from)) continue;
    const after = before.split(rel.from).join(rel.to);
    fs.writeFileSync(full, after);
    changed.push(`${rel.label}: ${file}`);
    found = true;
  }
  if (!found) missing.push(rel.label);
}

if (missing.length) {
  console.log('Phase 4 note: source wording was not found for:', missing.join(', '));
}
console.log('Phase 4 changed files:', changed.length ? changed.join(' | ') : 'none');
