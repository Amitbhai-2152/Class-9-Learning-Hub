import fs from 'node:fs';

const read=p=>fs.readFileSync(p,'utf8');
const skills=read('src/english/EnglishPanoramaLanguageSkills.jsx');
const timedQuiz=read('src/english/EnglishTimedQuiz.jsx');
const generic=read('src/english/EnglishGenericLanguageSkillsQuiz.jsx');
const genericBanks=read('src/english/EnglishGenericLanguageSkillsBanks.jsx');
const genericTopicBanks=read('src/english/EnglishGenericLanguageSkillsTopicBanks.jsx');
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
if(!generic.includes('dedicatedBank?.[mode]'))errors.push('Generic quiz does not select the requested mode bank directly');
if(!generic.includes('topic?.[mode]'))errors.push('Generic topic-mode bank lookup missing');
if(!generic.includes('topic?.practice||[]'))warnings.push('Some generic topics may still fall back to their practice bank when challenge/test banks are absent');

const dedicatedWriting=['formal-letter','informal-letter','notice','report','speech','message'];
for(const id of dedicatedWriting)if(!main2.includes(`route.topic==='${id}'`))errors.push(`Dedicated ${id} route missing from root router`);
if(!main2.includes(`const KEEP_DEDICATED=new Set(['tenses','modals','voice','paragraph-essay','composition','translation','formal-letter','informal-letter','notice','report','speech','message'])`))errors.push('Dedicated Language & Skills topic set is incomplete');
if(main2.includes("genericTopic==='speech'"))warnings.push('Legacy AppWithChapter5 speech route remains in the fallback app; root router now owns the Language & Skills speech route');

for(const id of ['agreement','determiners','prepositions','idioms','translation'])if(!genericBanks.includes(`${id}:{`))errors.push(`Phase 4 bank missing: ${id}`);
for(const id of ['narration','clauses'])if(!generic.includes(`${id}:{title:`)||!generic.includes(`${id}:{title:'`))warnings.push(`Local bank marker for ${id} should remain easy to audit`);
for(const id of ['formal-letter','informal-letter','notice','report','speech','message','factual-reading','literary-reading','poetry-reading'])if(!genericTopicBanks.includes(`'${id}':`)&&!genericTopicBanks.includes(`${id}:{`))warnings.push(`Generic topic metadata missing: ${id}`);

const countMode=(source,mode,nextMode)=>{const start=source.indexOf(`${mode}:[`);if(start<0)return 0;const end=nextMode?source.indexOf(`${nextMode}:[`,start):source.length;const block=source.slice(start,end<0?source.length:end);return (block.match(/^\s*\[/gm)||[]).length-1};
const phase4Topics=['agreement','determiners','prepositions','idioms','translation'];
for(const id of phase4Topics){const start=genericBanks.indexOf(`${id}:`);if(start>=0){const end=genericBanks.indexOf('\n},',start);const block=genericBanks.slice(start,end<0?genericBanks.length:end);for(const [mode,next] of [['practice',' challenge:'],['challenge',' test:'],['test',null]]){const c=countMode(block,mode,next);if(c&&c<6)warnings.push(`${id} ${mode} bank has only ${c} questions`);}}}

if(errors.length){console.error('English Phase 5 Language & Skills QA failed:');for(const e of errors)console.error(`- ${e}`);for(const w of warnings)console.warn(`WARN: ${w}`);process.exit(1)}
console.log('English Phase 5 Language & Skills QA passed.');
console.log(`Registry topics: ${req.length}`);
console.log(`Base lesson markers: ${lessonMarkers}`);
console.log('Shared timed engine: deterministic/stable option randomization, retry reseed, score/review/timer guards OK');
console.log('Root router: dedicated writing assessments separated from generic fallback routes OK');
if(warnings.length){console.log(`Quality warnings: ${warnings.length}`);warnings.forEach(w=>console.log(`- ${w}`))}else console.log('Quality warnings: 0');
