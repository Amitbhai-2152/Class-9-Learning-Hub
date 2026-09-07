import {readFileSync,existsSync} from 'node:fs';

const registry=readFileSync('src/sanskrit/sanskritChapterRegistry.js','utf8');
const section=readFileSync('src/sanskrit/SanskritSubjectSection.jsx','utf8');
const app=readFileSync('src/App.jsx','utf8');
const css=readFileSync('src/sanskrit/sanskrit-section.css','utf8');

const fail=[];
const expect=(ok,msg)=>{if(!ok)fail.push(msg)};
expect(existsSync('src/sanskrit/SanskritSubjectSection.jsx'),'Sanskrit subject component is missing');
expect(existsSync('src/sanskrit/sanskrit-section.css'),'Sanskrit stylesheet is missing');
expect((registry.match(/\{number:/g)||[]).length===36,'Primary + supplementary chapter registry should contain exactly 36 chapter records');
expect(/SANSKRIT_PRIMARY_CHAPTERS/.test(registry),'Primary chapter registry export is missing');
expect(/SANSKRIT_SUPPLEMENTARY_CHAPTERS/.test(registry),'Supplementary chapter registry export is missing');
expect(/title:'ईशस्तुति:'/.test(registry),'Primary Chapter 1 title is missing');
expect(/SanskritSubjectSection/.test(app),'Sanskrit subject section is not wired into App.jsx');
expect(/SanskritChapterEngine/.test(app),'Sanskrit Chapter 1 engine is not wired into App.jsx');
expect(/chapters:\['ईशस्तुति:','लोभविष्टः चक्रधरः'/.test(app),'Sanskrit primary chapter list is not exposed in subject navigation');
expect(/label="अभ्यास"/.test(section)&&/label="चुनौती"/.test(section)&&/label="फाइनल टेस्ट"/.test(section),'Practice, Challenge, and Final Test flows are missing');
expect(/subjective/.test(section),'Subjective question content is missing');
expect(/is-correct/.test(section)&&/is-wrong/.test(section),'Quiz result states are missing');
expect(/@media\(max-width:480px\)/.test(css),'Mobile Sanskrit responsive breakpoint is missing');

if(fail.length){console.error('Sanskrit QA failed:');for(const item of fail)console.error(`- ${item}`);process.exit(1)}
console.log('Sanskrit QA passed: registry, subject wiring, Chapter 1 modes, subjective practice, and responsive styles are present.');
