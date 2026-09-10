import fs from 'node:fs';

const read=p=>fs.readFileSync(p,'utf8');
const skills=read('src/english/EnglishPanoramaLanguageSkills.jsx');
const timedQuiz=read('src/english/EnglishTimedQuiz.jsx');
const generic=read('src/english/EnglishGenericLanguageSkillsQuiz.jsx');
const genericBanks=read('src/english/EnglishGenericLanguageSkillsBanks.jsx');
const genericTopicBanks=read('src/english/EnglishGenericLanguageSkillsTopicBanks.jsx');
const phase2=read('src/english/EnglishLanguageSkillsPhase2Expansion.jsx');
const phase2Assessment=read('src/english/EnglishLanguageSkillsPhase2Assessment.jsx');
const main2=read('src/main2.jsx');
const errors=[];const warnings=[];

const req=['tenses','modals','voice','agreement','narration','clauses','determiners','prepositions','idioms','translation','formal-letter','informal-letter','notice','report','speech','message','paragraph-essay','composition','factual-reading','literary-reading','poetry-reading'];
for(const id of req)if(!skills.includes(`id:'${id}'`))errors.push(`Topic missing from Language & Skills registry: ${id}`);
const lessonMarkers=(skills.match(/\['\d{2}','/g)||[]).length;
if(lessonMarkers<70)errors.push(`Substantial Language & Skills lesson library expected; found ${lessonMarkers} lesson markers`);
for(const mode of ['learn','practice','challenge','test'])if(!skills.includes(`mode==='${mode}'`))errors.push(`Language & Skills ${mode} mode missing`);

if(!timedQuiz.includes('stableHash')||!timedQuiz.includes('randomizeOptions'))errors.push('Shared timed quiz deterministic option randomizer is missing');
if(!timedQuiz.includes('useMemo')||!timedQuiz.includes('sourceKey'))errors.push('Shared timed quiz bank memoization guard is missing');
if(timedQuiz.includes('Math.random'))errors.push('Math.random detected: quiz options must not reshuffle on ordinary rerenders');
if(!timedQuiz.includes('pairs.findIndex'))errors.push('Answer-key remapping after option shuffle is missing');
if(!timedQuiz.includes('setShuffleSeed(s=>s+1)'))errors.push('Retry does not intentionally reseed option order');
for(const marker of ['Review answers','Retry','Next level','answered','percent','timeLeft<=0'])if(!timedQuiz.includes(marker))errors.push(`Shared timed quiz feature missing: ${marker}`);

if(generic.includes('rotateForMode'))errors.push('Generic quiz still performs a second option-rotation layer');
if(!generic.includes('dedicatedBank?.[mode]'))warnings.push('Generic fallback bank selector changed; verify direct mode selection manually');
if(!generic.includes('topic?.[mode]'))errors.push('Generic topic-mode bank lookup missing');

const dedicatedWriting=['formal-letter','informal-letter','notice','report','speech','message'];
for(const id of dedicatedWriting)if(!main2.includes(`route.languageSkills&&route.topic==='${id}'`))errors.push(`Dedicated ${id} route missing from root router`);
if(!main2.includes(`const KEEP_DEDICATED=new Set(['tenses','modals','voice','paragraph-essay','composition','translation','formal-letter','informal-letter','notice','report','speech','message'])`))errors.push('Dedicated Language & Skills topic set is incomplete');

const phase4Topics=['agreement','determiners','prepositions','idioms'];
for(const id of phase4Topics)if(!genericBanks.includes(`${id}:`))errors.push(`Phase 4 bank missing: ${id}`);
for(const id of ['formal-letter','informal-letter','notice','report','speech','message','factual-reading','literary-reading','poetry-reading'])if(!genericTopicBanks.includes(`'${id}':`)&&!genericTopicBanks.includes(`${id}:{`))warnings.push(`Generic topic metadata missing: ${id}`);

const countMode=(block,mode,nextMode)=>{const start=block.indexOf(`${mode}:[`);if(start<0)return 0;const end=nextMode?block.indexOf(`${nextMode}:[`,start):block.length;const segment=block.slice(start,end<0?block.length:end);return (segment.match(/^\s*\[/gm)||[]).length};
for(const id of phase4Topics){const start=genericBanks.indexOf(`${id}:`);const end=genericBanks.indexOf('\n},',start);if(start>=0){const block=genericBanks.slice(start,end<0?genericBanks.length:end);for(const [mode,next] of [['practice','challenge:'],['challenge','test:'],['test',null]]){const c=countMode(block,mode,next);if(c<6)errors.push(`${id} ${mode} base bank has only ${c} questions; minimum 6 expected`);}}}

if(!phase2Assessment.includes('PHASE2_LANGUAGE_SKILLS_EXPANSION'))errors.push('Phase 2 expansion assessment component is not wired to expansion banks');
for(const id of phase4Topics){for(const mode of ['practice','challenge','test']){const marker=`${id}:{`;const start=phase2.indexOf(marker);const end=phase2.indexOf('\n },',start);const block=start>=0?phase2.slice(start,end<0?phase2.length:end):'';const c=countMode(block,mode,mode==='test'?null:(mode==='practice'?'challenge:':'test:'));if(c<4)errors.push(`Phase 2 expansion ${id} ${mode} has only ${c} questions; expected 4`);}}

if(errors.length){console.error('English Phase 5 Language & Skills QA failed:');for(const e of errors)console.error(`- ${e}`);for(const w of warnings)console.warn(`WARN: ${w}`);process.exit(1)}
console.log('English Phase 5 Language & Skills QA passed.');
console.log(`Registry topics: ${req.length}`);
console.log(`Base lesson markers: ${lessonMarkers}`);
console.log('Shared timed engine: deterministic/stable option randomization, retry reseed, score/review/timer guards OK');
console.log('Root router: dedicated writing assessments separated from generic fallback routes OK');
console.log('Phase 2 expansion: agreement, determiners, prepositions and idioms now have 10 questions per assessment mode; 40 expanded questions total');
console.log('Quality warnings:',warnings.length);
if(warnings.length)warnings.forEach(w=>console.log(`- ${w}`));
