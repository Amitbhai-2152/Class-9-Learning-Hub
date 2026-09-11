import fs from 'node:fs';

const files = {
  expansion: fs.readFileSync('src/english/EnglishLanguageSkillsPhase2Expansion.jsx', 'utf8'),
  phase4: fs.readFileSync('src/english/EnglishGenericLanguageSkillsBanks.jsx', 'utf8'),
  topics: fs.readFileSync('src/english/EnglishGenericLanguageSkillsTopicBanks.jsx', 'utf8'),
  quiz: fs.readFileSync('src/english/EnglishTimedQuiz.jsx', 'utf8'),
  generic: fs.readFileSync('src/english/EnglishGenericLanguageSkillsQuiz.jsx', 'utf8'),
  router: fs.readFileSync('src/main2.jsx', 'utf8'),
};

const errors = [];
const warnings = [];
const targetFiles = [files.expansion, files.phase4, files.topics];

function normalise(value) {
  return String(value ?? '')
    .toLowerCase()
    .replace(/[“”‘’"'`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractQuestions(source, label) {
  const questions = [];
  const re = /\[\s*(['"`])([\s\S]*?)\1\s*,\s*\[([\s\S]*?)\]\s*,\s*(-?\d+)\s*,\s*(['"`])([\s\S]*?)\5\s*\]/g;
  let match;
  while ((match = re.exec(source))) {
    const stem = match[2].trim();
    const optionText = match[3];
    const answer = Number(match[4]);
    const explanation = match[6].trim();
    const options = [...optionText.matchAll(/(['"`])([\s\S]*?)\1/g)].map(m => m[2]);
    questions.push({ label, stem, options, answer, explanation });
  }
  return questions;
}

const questions = targetFiles.flatMap((source, i) => extractQuestions(source, Object.keys(files)[i]));
if (!questions.length) errors.push('No question tuples were detected in Language & Skills banks');

for (const q of questions) {
  if (!q.stem) errors.push(`${q.label}: empty question stem`);
  if (q.options.length !== 4) errors.push(`${q.label}: "${q.stem.slice(0, 70)}" must have exactly 4 options; found ${q.options.length}`);
  if (q.answer < 0 || q.answer >= q.options.length) errors.push(`${q.label}: "${q.stem.slice(0, 70)}" has invalid answer index ${q.answer}`);
  if (!q.explanation || q.explanation.length < 18) errors.push(`${q.label}: "${q.stem.slice(0, 70)}" has missing/weak explanation`);
  const seen = new Set();
  for (const option of q.options) {
    const key = normalise(option);
    if (!key) errors.push(`${q.label}: "${q.stem.slice(0, 70)}" contains an empty option`);
    if (seen.has(key)) errors.push(`${q.label}: "${q.stem.slice(0, 70)}" contains duplicate options`);
    seen.add(key);
  }
  if (/\.\.\.|\(truncated\)|TODO|placeholder/i.test(`${q.stem} ${q.explanation}`)) {
    errors.push(`${q.label}: incomplete/placeholder text detected in "${q.stem.slice(0, 70)}"`);
  }
}

for (const label of ['expansion', 'phase4']) {
  const qs = questions.filter(q => q.label === label);
  const seen = new Set();
  for (const q of qs) {
    const key = `${normalise(q.stem)}|${q.options.map(normalise).join('|')}`;
    if (seen.has(key)) errors.push(`${label}: duplicate question/options tuple detected: "${q.stem.slice(0, 90)}"`);
    seen.add(key);
  }
}

const byLabel = Object.groupBy(questions, q => q.label);
for (const [label, qs] of Object.entries(byLabel)) {
  const distribution = [0, 0, 0, 0];
  qs.forEach(q => distribution[q.answer]++);
  const nonZero = distribution.filter(Boolean).length;
  if (nonZero < 3) warnings.push(`${label}: source answer-key distribution uses fewer than 3 of A/B/C/D (${distribution.join('/')}); runtime shuffling still protects learner-facing position bias`);
}

const requiredModes = ['practice:[', 'challenge:[', 'test:['];
for (const marker of requiredModes) {
  if (!files.expansion.includes(marker)) errors.push(`Phase 2 expansion missing ${marker.replace(':[', '')} bank`);
  if (!files.phase4.includes(marker)) errors.push(`Phase 4 bank missing ${marker.replace(':[', '')} bank`);
}

if (files.quiz.includes('Math.random')) errors.push('EnglishTimedQuiz still contains Math.random');
if (!files.quiz.includes('stableHash')) errors.push('EnglishTimedQuiz stableHash guard missing');
if (!files.quiz.includes('setShuffleSeed(s=>s+1)')) errors.push('Quiz retry reseed guard missing');
if (files.generic.includes('rotateForMode')) errors.push('Generic quiz still contains a second option rotation layer');
if (!files.generic.includes('dedicatedBank?.[mode]')) errors.push('Generic quiz does not select the requested dedicated mode bank');
if (!files.generic.includes('topic?.[mode]')) errors.push('Generic quiz mode lookup guard missing');

const dedicated = ['formal-letter','informal-letter','notice','report','speech','message','paragraph-essay','composition','translation'];
for (const id of dedicated) {
  if (id === 'paragraph-essay') {
    if (!files.router.includes("route.languageSkills&&route.topic==='paragraph-essay'")) errors.push('Root router missing dedicated Language & Skills route: paragraph-essay');
  } else if (!files.router.includes(`route.languageSkills&&route.topic==='${id}'`)) {
    errors.push(`Root router missing dedicated Language & Skills route: ${id}`);
  }
}

if (!files.router.includes("const KEEP_DEDICATED=new Set(")) errors.push('Root KEEP_DEDICATED set missing');
if (files.router.includes('nth-child') || files.quiz.includes('nth-child')) errors.push('Positional nth-child selector detected in audited Language & Skills routing/quiz files');

if (errors.length) {
  console.error('English Language & Skills quality QA failed:');
  errors.forEach(e => console.error(`- ${e}`));
  warnings.forEach(w => console.warn(`WARN: ${w}`));
  process.exit(1);
}

console.log('English Language & Skills quality QA passed.');
console.log(`Validated bank question tuples: ${questions.length}`);
console.log('Checks: 4-option integrity, valid answer keys, explanation depth, duplicate question/options tuples, placeholder guard, source answer-position distribution, deterministic quiz safeguards, dedicated routing, and positional-selector guard.');
if (warnings.length) {
  console.log(`Quality warnings: ${warnings.length}`);
  warnings.forEach(w => console.log(`- ${w}`));
} else console.log('Quality warnings: 0');
