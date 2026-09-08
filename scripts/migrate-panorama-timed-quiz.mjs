import {readFileSync,writeFileSync,unlinkSync,existsSync} from 'node:fs';

const engineImport="import TimedPanoramaQuizEngine from './TimedPanoramaQuizEngine.jsx';\n";
const targets=[
  ['src/english/EnglishPanoramaChapter1.jsx','EnglishPanoramaChapter1','englishPanoramaChapter1Meta','  '],
  ['src/english/EnglishPanoramaChapter2.jsx','EnglishPanoramaChapter2','englishPanoramaChapter2Meta',' ']
];

for(const [filename,component,meta,indent] of targets){
  let text=readFileSync(filename,'utf8');
  if(!text.includes(engineImport)){
    const marker="import './english-panorama.css';\n";
    if(!text.includes(marker)) throw new Error(`Missing import marker: ${filename}`);
    text=text.replace(marker,marker+engineImport,1);
  }

  const sig=`export function ${component}({initialMode=null,onBack,addXp,finishSession}){`;
  const start=text.indexOf(sig);
  if(start<0) throw new Error(`Missing component signature: ${filename}`);
  const metaMarker=`\nexport const ${meta}`;
  const metaPos=text.indexOf(metaMarker,start+sig.length);
  if(metaPos<0) throw new Error(`Missing meta export: ${filename}`);

  const oldFunction=text.slice(start,metaPos+1);
  const learnMarker="if(mode==='learn'||mode===null)";
  const learnStart=oldFunction.indexOf(learnMarker);
  if(learnStart<0) throw new Error(`Missing Learn branch: ${filename}`);

  let learnPart=oldFunction.slice(learnStart);
  const quizMarkers=['\n  const progress=','\n const progress='];
  let cut=-1;
  for(const marker of quizMarkers){
    const p=learnPart.indexOf(marker);
    if(p>=0){cut=p;break;}
  }
  if(cut<0) throw new Error(`Missing old quiz branch: ${filename}`);
  learnPart=learnPart.slice(0,cut).trimEnd()+'\n';

  const defaultMode=component==='EnglishPanoramaChapter2'?"||'learn'":'';
  const newFunction=`export function ${component}({initialMode=null,onBack,addXp,finishSession}){\n${indent}const [mode,setMode]=useState(initialMode${defaultMode});\n${indent}const begin=m=>setMode(m);\n${indent}if(mode==='practice'||mode==='challenge'||mode==='test')return <TimedPanoramaQuizEngine chapterTitle={study.title} mode={mode} questionBank={mode==='practice'?practice:mode==='challenge'?challenge:finalTest} onBack={()=>setMode('learn')} addXp={addXp} finishSession={finishSession}/>;\n${learnPart}}\n`;
  text=text.slice(0,start)+newFunction+text.slice(metaPos+1);
  writeFileSync(filename,text,'utf8');
}

const mainPath='src/main2.jsx';
let main=readFileSync(mainPath,'utf8');
main=main.replace("import './english/englishChapter1OptionRandomizer.js';\n",'');
writeFileSync(mainPath,main,'utf8');

for(const obsolete of [
  'src/english/englishChapter1OptionRandomizer.js',
  '.github/workflows/fix-english-ch1-randomization.yml',
  '.github/workflows/apply-panorama-timed-engine.yml',
  '.github/workflows/repair-panorama-randomization.yml',
  '.github/workflows/migrate-panorama-timed-quizzes.yml'
]){
  if(existsSync(obsolete)) unlinkSync(obsolete);
}

for(const [filename,component] of targets){
  const text=readFileSync(filename,'utf8');
  if(!text.includes("import TimedPanoramaQuizEngine from './TimedPanoramaQuizEngine.jsx';")) throw new Error(`Engine import missing: ${filename}`);
  if(!text.includes("return <TimedPanoramaQuizEngine chapterTitle={study.title}")) throw new Error(`Engine branch missing: ${filename}`);
  if(!text.includes(`export function ${component}`)) throw new Error(`Component missing: ${filename}`);
}
if(readFileSync(mainPath,'utf8').includes('englishChapter1OptionRandomizer')) throw new Error('Obsolete randomizer import remains');
console.log('Panorama timed quiz migration completed successfully.');
