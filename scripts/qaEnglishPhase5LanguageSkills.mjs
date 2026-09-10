import fs from 'node:fs';

const read=p=>fs.readFileSync(p,'utf8');
const skills=read('src/english/EnglishPanoramaLanguageSkills.jsx');
const timedQuiz=read('src/english/EnglishTimedQuiz.jsx');
const generic=read('src/english/EnglishGenericLanguageSkillsQuiz.jsx');
const genericBanks=read('src/english/EnglishGenericLanguageSkillsBanks.jsx');
const genericTopicBanks=read('src/english/EnglishGenericLanguageSkillsTopicBanks.jsx');
const phase2=read('src/english/EnglishLanguageSkillsPhase2Expansion.jsx');
const finalStandard=read('src/english/EnglishLanguageSkillsFinalStandardBanks.jsx');
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
if(!generic.includes('topic?.[mode]'))errors.push('Generic topic-mode bank lookup missing');

const dedicatedWriting=['formal-letter','informal-letter','notice','report','speech','message'];
for(const id of dedicatedWriting)if(!main2.includes(`route.languageSkills&&route.topic==='${id}'`))errors.push(`Dedicated ${id} route missing from root router`);
if(!main2.includes(`const KEEP_DEDICATED=new Set(['tenses','modals','voice','paragraph-essay','composition','translation','formal-letter','informal-letter','notice','report','speech','message'])`))errors.push('Dedicated Language & Skills topic set is incomplete');

const standardTopics=['agreement','determiners','prepositions','idioms'];
for(const id of standardTopics){
  if(!genericBanks.includes(`${id}:`))errors.push(`Base bank missing: ${id}`);
  if(!phase2.includes(`${id}:{`))errors.push(`Phase 2 expansion bank missing: ${id}`);
  if(!finalStandard.includes(`${id}:{`))errors.push(`Final standard bank missing: ${id}`);
}

const countMode=(block,mode,nextMode)=>{
  const start=block.indexOf(`${mode}:[`);
  if(start<0)return 0;
  const end=nextMode?block.indexOf(`${nextMode}[`,start):block.length;
  const segment=block.slice(start,end<0?block.length:end);
  return (segment.match(/^\s*\[\s*['"`]/gm)||[]).length;
};
const getBlock=(source,id)=>{
  const start=source.indexOf(`${id}:{`);
  if(start<0)return'';
  const nextPositions=standardTopics
    .map(topic=>source.indexOf(`${topic}:{`,start+1))
    .filter(pos=>pos>=0);
  const end=nextPositions.length?Math.min(...nextPositions):source.length;
  return source.slice(start,end);
};
const modeEnd=(mode)=>mode==='practice'?'challenge:':mode==='challenge'?'test:':null;

for(const id of standardTopics){
  const merged={};
  for(const mode of ['practice','challenge','test']){
    const b=getBlock(genericBanks,id),p=getBlock(phase2,id),f=getBlock(finalStandard,id);
    const c=countMode(b,mode,modeEnd(mode))+countMode(p,mode,modeEnd(mode))+countMode(f,mode,modeEnd(mode));
    merged[mode]=c;
    const target={practice:15,challenge:12,test:20}[mode];
    if(c!==target)errors.push(`${id} ${mode} total bank must equal ${target}; found ${c}`);
  }
  if(merged.practice+merged.challenge+merged.test!==47)errors.push(`${id} total assessment bank must equal 47; found ${merged.practice+merged.challenge+merged.test}`);
}

for(const id of standardTopics){
  const b=getBlock(finalStandard,id);
  for(const mode of ['practice','challenge','test']){
    const start=b.indexOf(`${mode}:[`);
    if(start<0){errors.push(`Final standard ${id} ${mode} block missing`);continue;}
    const next=modeEnd(mode);
    const end=next?b.indexOf(`${next}[`,start):b.length;
    const segment=b.slice(start,end<0?b.length:end);
    const options=(segment.match(/\['[^\n]+?\'/g)||[]).length;
    if(options===0)warnings.push(`${id} ${mode} final-standard bank could not be structurally counted by fallback parser`);
  }
}

if(!phase2Assessment.includes('PHASE2_LANGUAGE_SKILLS_EXPANSION')||!phase2Assessment.includes('FINAL_STANDARD_BANKS'))errors.push('Expanded/final-standard assessment banks are not both wired to the assessment component');
if(!phase2Assessment.includes('...(FINAL_STANDARD_BANKS[topicId]?.[mode]||[])'))errors.push('Final-standard bank is not appended to the selected mode');
for(const id of ['formal-letter','informal-letter','notice','report','speech','message','factual-reading','literary-reading','poetry-reading'])if(!genericTopicBanks.includes(`'${id}':`)&&!genericTopicBanks.includes(`${id}:{`))warnings.push(`Generic topic metadata missing: ${id}`);

if(errors.length){console.error('English Language & Skills Phase 5 QA failed:');for(const e of errors)console.error(`- ${e}`);for(const w of warnings)console.warn(`WARN: ${w}`);process.exit(1)}
console.log('English Language & Skills Phase 5 QA passed.');
console.log(`Registry topics: ${req.length}`);
console.log(`Base lesson markers: ${lessonMarkers}`);
console.log('Shared timed engine: deterministic/stable option randomization, retry reseed, score/review/timer guards OK');
console.log('Assessment architecture: one runtime option-randomization layer; no generic pre-rotation');
console.log('Standardised assessment banks: 4 topics × (15 practice + 12 challenge + 20 test) = 188 questions');
console.log('Topics standardised:',standardTopics.join(', '));
console.log('Quality warnings:',warnings.length);
if(warnings.length)warnings.forEach(w=>console.log(`- ${w}`));
