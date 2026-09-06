import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const read=name=>fs.readFileSync(path.join(root,'src',name),'utf8');
const unified=read('HindiVarnikaUnifiedChapterView.jsx');
const section=read('HindiSubjectSection.jsx');
const progress=read('hindiChapterProgress.js');
const chapter3=read('HindiVarnikaChapter3View.jsx');
const chapter4=read('HindiVarnikaChapter4View.jsx');
const chapter5=read('HindiVarnikaChapter5View.jsx');
const chapters=['बिहार का लोकगायन','बिहार की संगीत साधना','बिहार में नृत्यकला','बिहार की चित्रकला','मधुबनी की चित्रकला','बिहार में नाट्यकला','बिहार का सिनेमा संसार'];
const failures=[];

const assert=(ok,msg)=>{if(!ok)failures.push(msg)};
const countFacts=(source,title)=>{const start=source.indexOf(`'${title}':{`);if(start<0)return 0;const next=source.indexOf("\n'",start+10);const block=source.slice(start,next>start?next:source.length);return (block.match(/\['[^']+','/g)||[]).length};
const has=(_source,...terms)=>terms.every(term=>_source.includes(term));

assert(has(section,...chapters), 'all 7 Varnika chapter titles must remain present in the subject registry');

const unifiedTitles=['बिहार का लोकगायन','बिहार की संगीत साधना','बिहार में नाट्यकला','बिहार का सिनेमा संसार'];
for(const title of unifiedTitles){
  const facts=countFacts(unified,title);
  assert(facts>=20,`${title}: needs at least 20 study facts; found ${facts}`);
}

assert(has(unified,'भोजपुरी','पाँच प्रमुख भेद','छठगीत','श्रम गीत','ऋतु गीत'),'Chapter 1 must cover core textbook categories and examples');
assert(has(unified,'संगीत मार्तण्ड','वीणा','वाणभट्ट','चाणक्य','बिस्मिल्ला खाँ','रामचतुर मलिक','शारदा सिन्हा'),'Chapter 2 must cover the core historical/person-specific exam facts');
assert(has(unified,'केशवराम भट्ट','बिहार बंधु','1876 ई.','पटना नाटक मंडली','भिखारी ठाकुर','बिदेसिया'),'Chapter 6 must cover the core theatre-history facts');
assert(has(unified,'छउमेला','पुनर्जन्म','आलम आरा','1931 ई.','रतन टॉकीज','गंगा मईया तोहे पियरी चढ़इबो','शत्रुघ्न सिन्हा'),'Chapter 7 must cover the core cinema-history facts');

assert(has(chapter3,'जट-जटिन','झिझिया','करिया-झूमर','हरि उप्पल','नगेन्द्र मोहिनी','गुड़िया नृत्य','भिखारी ठाकुर'),'Chapter 3 key textbook topics are missing');
assert(has(chapter4,'पटना कलम','1760 ई. से 1986 ई.','उपेन्द्र महारथी','वेणुशिल्प','श्याम शर्मा','डब्ल्यू. जी. आर्चर'),'Chapter 4 canonical facts are missing or the Patna Kalam date is wrong');
assert(!chapter4.includes('1760 ई. से 1947 ई.'),'Chapter 4 contains the outdated 1947 Patna Kalam end date');
assert(has(chapter5,'मधुबनी चित्रकला','तीन प्रमुख रूप','अरिपन','कोहबर','पट-चित्रण','प्राकृतिक रंग','गंगा देवी','दलित शैली'),'Chapter 5 key textbook topics are missing');

const rangeMarkers=["practice:{label:'अभ्यास',count:15,start:0,end:15}","challenge:{label:'चुनौती',count:12,start:15,end:27}","test:{label:'अंतिम टेस्ट',count:20,start:27,end:47}"];
for(const marker of rangeMarkers)assert(unified.includes(marker),`Unified learner missing range marker: ${marker}`);
for(const marker of rangeMarkers)assert(chapter4.includes(marker),`Chapter 4 missing range marker: ${marker}`);
for(const marker of rangeMarkers)assert(chapter5.includes(marker),`Chapter 5 missing range marker: ${marker}`);

assert(unified.includes('questions.slice(cfg.start,cfg.end)'),'Unified learner must use non-overlapping mode slices');
assert(chapter4.includes('questions.slice(cfg.start,cfg.end)'),'Chapter 4 must use non-overlapping mode slices');
assert(chapter5.includes('QUESTIONS.slice(cfg.start,Math.min(cfg.end,QUESTIONS.length))'),'Chapter 5 must use non-overlapping mode slices');
assert(unified.includes('facts.forEach(([heading,explanation],i)=>'),'Unified learner must derive questions from reviewed study facts');
assert(unified.includes('for(let i=0;i<7;i++)'),'Unified learner must include the additional pair-question layer');
assert(chapter4.includes('for(let i=0;i<7;i++)'),'Chapter 4 must include the additional pair-question layer');

const duplicateHeadings=(source,title)=>{const start=source.indexOf(`'${title}':{`);if(start<0)return [];const next=source.indexOf("\n'",start+10);const block=source.slice(start,next>start?next:source.length);const hs=[...block.matchAll(/\['([^']+)','/g)].map(m=>m[1]);return hs.filter((h,i)=>hs.indexOf(h)!==i)};
for(const title of unifiedTitles)assert(duplicateHeadings(unified,title).length===0,`${title}: duplicate study headings found`);

assert(progress.includes("const REQUIRED_MODES=['learn','practice','challenge','test']"),'Chapter completion must require all four modes');
assert(progress.includes('hasAllRequiredModes(p.modes[id])'),'Completion check must validate all four mode flags');

// Guard against the old generic assessment architecture accidentally returning.
assert(!unified.includes('const pair=[]'),'Old generic pair-array architecture must not return');
assert(!unified.includes('return [...direct,...pair]'),'Old 30-question assembly must not return');

if(failures.length){
  console.error('Varnika quality QA failed:');
  for(const f of failures)console.error(`- ${f}`);
  process.exit(1);
}
console.log('Varnika quality QA passed: 7 chapters identified; Chapters 1/2/6/7 include core textbook facts; Chapters 3/4/5 retain key topic coverage; assessment ranges are 15/12/20 without overlap; duplicate study headings and legacy 30-question architecture are rejected; completion requires Learn+Practice+Challenge+Test.');
