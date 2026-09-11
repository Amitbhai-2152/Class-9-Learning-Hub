import fs from 'node:fs';

const sourceFiles = [
  ['Phase 2 expansion', 'src/english/EnglishLanguageSkillsPhase2Expansion.jsx'],
  ['Phase 4 banks', 'src/english/EnglishGenericLanguageSkillsBanks.jsx'],
  ['Topic banks', 'src/english/EnglishGenericLanguageSkillsTopicBanks.jsx'],
  ['Timed quiz engine', 'src/english/EnglishTimedQuiz.jsx'],
  ['Generic quiz engine', 'src/english/EnglishGenericLanguageSkillsQuiz.jsx'],
  ['Root router', 'src/main2.jsx'],
];

const errors = [];
const read = path => fs.readFileSync(path, 'utf8');
const files = Object.fromEntries(sourceFiles.map(([label, path]) => [label, read(path)]));

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
    const options = [...match[3].matchAll(/(['"`])([\s\S]*?)\1/g)].map(m => m[2]);
    questions.push({ label, stem, options, answer: Number(match[4]), explanation: match[6].trim() });
  }
  return questions;
}

const questions = [
  ...extractQuestions(files['Phase 2 expansion'], 'Phase 2 expansion'),
  ...extractQuestions(files['Phase 4 banks'], 'Phase 4 banks'),
  ...extractQuestions(files['Topic banks'], 'Topic banks'),
];

if (!questions.length) errors.push('No Language & Skills question tuples were detected.');

for (const q of questions) {
  if (!q.stem) errors.push(`${q.label}: empty question stem.`);
  if (q.options.length !== 4) errors.push(`${q.label}: "${q.stem.slice(0, 80)}" must have exactly 4 options; found ${q.options.length}.`);
  if (q.answer < 0 || q.answer >= q.options.length) errors.push(`${q.label}: "${q.stem.slice(0, 80)}" has invalid answer index ${q.answer}.`);
  if (!q.explanation || q.explanation.length < 18) errors.push(`${q.label}: "${q.stem.slice(0, 80)}" has a weak or missing explanation.`);
  const seen = new Set();
  for (const option of q.options) {
    const key = normalise(option);
    if (!key) errors.push(`${q.label}: "${q.stem.slice(0, 80)}" contains an empty option.`);
    if (seen.has(key)) errors.push(`${q.label}: "${q.stem.slice(0, 80)}" contains duplicate options.`);
    seen.add(key);
  }
  if (/\.\.\.|\(truncated\)|TODO|placeholder/i.test(`${q.stem} ${q.explanation}`)) {
    errors.push(`${q.label}: incomplete/placeholder text detected in "${q.stem.slice(0, 80)}".`);
  }
}

for (const [label, source] of Object.entries({
  'Phase 2 expansion': files['Phase 2 expansion'],
  'Phase 4 banks': files['Phase 4 banks'],
})) {
  for (const mode of ['practice', 'challenge', 'test']) {
    if (!source.includes(`${mode}:[`)) errors.push(`${label}: missing ${mode} bank.`);
  }
}

if (!files['Topic banks'].includes('practice:[')) errors.push('Topic banks: no practice bank detected.');

const dedicatedTopics = [
  'composition', 'translation', 'formal-letter', 'informal-letter', 'notice',
  'report', 'speech', 'message',
];
for (const id of dedicatedTopics) {
  if (!files['Root router'].includes(`route.languageSkills&&route.topic==='${id}'`)) {
    errors.push(`Root router missing dedicated Language & Skills route: ${id}.`);
  }
}

const genericAssessmentTopics = [
  'agreement', 'narration', 'clauses', 'determiners', 'prepositions', 'idioms',
  'translation', 'formal-letter', 'informal-letter', 'notice', 'report', 'speech',
  'message', 'paragraph-essay', 'composition', 'factual-reading', 'literary-reading',
  'poetry-reading',
];
for (const id of genericAssessmentTopics) {
  if (!files['Root router'].includes(`'${id}'`)) {
    errors.push(`Root router assessment topic guard is missing: ${id}.`);
  }
}

if (!files['Timed quiz engine'].includes('stableHash')) errors.push('EnglishTimedQuiz stableHash guard is missing.');
if (!files['Timed quiz engine'].includes('setShuffleSeed(s=>s+1)')) errors.push('Quiz retry reseed guard is missing.');
if (files['Generic quiz engine'].includes('rotateForMode')) errors.push('Generic quiz contains a second option-rotation layer.');
if (!files['Generic quiz engine'].includes('dedicatedBank?.[mode]')) errors.push('Generic quiz does not select the requested dedicated mode bank.');
if (!files['Generic quiz engine'].includes('topic?.[mode]')) errors.push('Generic quiz mode lookup guard is missing.');
if (!files['Root router'].includes('const KEEP_DEDICATED=new Set(')) errors.push('Root KEEP_DEDICATED set is missing.');

if (errors.length) {
  console.error('English Phase 5 language QA failed:');
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}

console.log('English Phase 5 language QA passed.');
console.log(`Validated Language & Skills question tuples: ${questions.length}`);
console.log('Checks: four-option integrity, valid answer keys, explanation depth, duplicate/placeholder guards, mode-bank coverage, dedicated routing, and deterministic quiz safeguards.');
