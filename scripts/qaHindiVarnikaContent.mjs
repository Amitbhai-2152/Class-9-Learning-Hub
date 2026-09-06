import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const read=(name)=>fs.readFileSync(path.join(root,'src',name),'utf8');
const unified=read('HindiVarnikaUnifiedChapterView.jsx');
const section=read('HindiSubjectSection.jsx');
const chapterData=read('hindiChapterData.js');
const progress=read('hindiChapterProgress.js');
const chapter3=read('HindiVarnikaChapter3View.jsx');
const chapter4=read('HindiVarnikaChapter4View.jsx');
const chapter5=read('HindiVarnikaChapter5View.jsx');

const failures=[];
const assert=(ok,msg)=>{if(!ok)failures.push(msg)};
const titleEsc=t=>t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const has=(source,...terms)=>terms.every(term=>source.includes(term));
const countFacts=(source,title)=>{const re=new RegExp(`'${titleEsc(title)}':\\{`);const m=re.exec(source);if(!m)return 0;const rest=source.slice(m.index+m[0].length);const next=rest.search(/\n'/);const block=rest.slice(0,next>=0?next:rest.length);return (block.match(/\['[^']+','/g)||[]).length};

const chapters=['बिहार का लोकगायन','बिहार की संगीत साधना','बिहार में नृत्यकला','बिहार की चित्रकला','मधुबनी की चित्रकला','बिहार में नाट्यकला','बिहार का सिनेमा संसार'];
// Registry truth lives in hindiChapterData, while HindiSubjectSection only contains routing branches.
assert(has(chapterData,...chapters),'all 7 Varnika chapter titles must remain present in the chapter registry');
assert(section.includes("book==='वर्णिका · पूरक'"),'Varnika support-group routing must remain present');

const unifiedTitles=['बिहार का लोकगायन','बिहार की संगीत साधना','बिहार में नाट्यकला','बिहार का सिनेमा संसार'];
for(const title of unifiedTitles)assert(countFacts(unified,title)>=20,`${title}: needs at least 20 reviewed study facts`);

assert(has(unified,'भोजपुरी','छठगीत','श्रम गीत','ऋतु गीत'),'Chapter 1 core coverage missing');
assert(has(unified,'संगीत मार्तण्ड','वीणा','वाणभट्ट','चाणक्य','बिस्मिल्ला खाँ'),'Chapter 2 core historical/person facts missing');
assert(has(unified,'केशवराम भट्ट','बिहार बंधु','1876 ई.','पटना नाटक मंडली','भिखारी ठाकुर','बिदेसिया'),'Chapter 6 theatre-history facts missing');
assert(has(unified,'छउमेला','पुनर्जन्म','आलम आरा','रतन टॉकीज','गंगा मईया तोहे पियरी चढ़इबो','शत्रुघ्न सिन्हा'),'Chapter 7 cinema-history facts missing');
assert(has(chapter3,'जट-जटिन','झिझिया','करिया-झूमर','हरि उप्पल','नगेन्द्र मोहिनी','गुँडिया','भिखारी ठाकुर'),'Chapter 3 key textbook topics are missing');
assert(has(chapter4,'पटना कलम','उपेन्द्र महारथी','वेणुशिल्प','श्याम शर्मा','डब्ल्यू. जी. आर्चर'),'Chapter 4 canonical facts are missing');
assert(!chapter4.includes('1760 ई. से 1947 ई.'),'Chapter 4 contains the outdated 1947 Patna Kalam end date');
assert(chapter4.includes('1760 ई. से 1986 ई.'),'Chapter 4 must state the reviewed Patna Kalam date 1760–1986');
assert(has(chapter5,'मधुबनी चित्रकला','भूमि आकल्पन','अरिपन','कोहबर','पट-चित्रण','प्राकृतिक रंग','गंगा देवी','दलित शैली'),'Chapter 5 key textbook topics are missing');

const rangePattern=/practice:\{label:'अभ्यास',count:15,start:0,end:15\}[\s\S]*challenge:\{label:'चुनौती',count:12,start:15,end:27\}[\s\S]*test:\{label:'अंतिम टेस्ट',count:20,start:27,end:47\}/;
assert(rangePattern.test(unified),'Unified learner must expose non-overlapping 15/12/20 ranges');
assert(/questions\.slice\(\s*MODES\[mode\]\.start\s*,\s*MODES\[mode\]\.end\s*\)/.test(unified),'Unified learner must use the configured non-overlapping slices');
assert(/facts\.forEach\(\(\[h,e\],i\)=>/.test(unified),'Unified learner must derive direct assessment questions from reviewed facts');
assert(/facts\.slice\(0,20\)\.forEach\(\(\[h,e\],i\)=>/.test(unified),'Unified learner must derive identification assessment questions from reviewed facts');
assert(/for\(let i=0;i<7;i\+\+\)/.test(unified),'Unified learner must include the additional pair-question layer');
assert(/return questions\}/.test(unified),'Unified learner must return the generated question bank');
assert(/QUESTIONS\.slice\(cfg\.start\s*,\s*Math\.min\(cfg\.end,QUESTIONS\.length\)\)/.test(chapter5),'Chapter 5 must use bounded mode slicing');

const duplicateHeadings=(source,title)=>{const re=new RegExp(`'${titleEsc(title)}':\\{`);const m=re.exec(source);if(!m)return [];const rest=source.slice(m.index+m[0].length);const next=rest.search(/\n'/);const block=rest.slice(0,next>=0?next:rest.length);const hs=[...block.matchAll(/\['([^']+)','/g)].map(x=>x[1]);return hs.filter((h,i)=>hs.indexOf(h)!==i)};
for(const title of unifiedTitles)assert(duplicateHeadings(unified,title).length===0,`${title}: duplicate study headings found`);

assert(progress.includes("const REQUIRED_MODES=['learn','practice','challenge','test']"),'Chapter completion must require all four modes');
assert(progress.includes('hasAllRequiredModes(p.modes[id])'),'Completion check must validate all four mode flags');
assert(!unified.includes('const pair=[]')&&!unified.includes('return [...direct,...pair]'),'Legacy 30-question architecture must not return');

if(failures.length){console.error('Varnika quality QA failed:');failures.forEach(f=>console.error(`- ${f}`));process.exit(1)}
console.log('Varnika quality QA passed: 7 chapter registry entries, reviewed study facts, core textbook coverage, non-overlapping 15/12/20 assessment architecture, duplicate-heading guard, legacy-architecture guard, and four-mode completion semantics verified.');
