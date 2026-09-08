import {SANSKRIT_SUPPLEMENTARY_CONTENT} from './sanskritSupplementaryContent.js';
import {getSanskritSupplementaryDeepContent} from './sanskritSupplementaryDeepContent.js';
import {getSanskritSupplementaryStudyModule,getSanskritSupplementaryTypeToolkit} from './sanskritSupplementaryStudyModules.js';

const balanceQuestions=(items,offset=0)=>items.map((item,index)=>{
  const shift=(index+offset)%4;
  const options=item.options.map((_,i)=>item.options[(i+4-shift)%4]);
  return {...item,options,answer:(item.answer+shift)%4};
});

const enrich=chapter=>{
  const deep=getSanskritSupplementaryDeepContent(chapter.id);
  const study=getSanskritSupplementaryStudyModule(chapter.id)||{};
  const toolkit=getSanskritSupplementaryTypeToolkit(deep?.type)||{};
  const sequence=Array.isArray(deep?.sequence)?deep.sequence:[];
  const examFocus=Array.isArray(deep?.examFocus)?deep.examFocus:[];
  const language=Array.isArray(study.language)?study.language:[];
  const highScore=Array.isArray(study.highScore)?study.highScore:[];
  return {
    ...chapter,
    deepContent:deep,
    studyModule:{...study,typeReading:toolkit.reading||'',answerMethod:toolkit.answerMethod||''},
    lessons:chapter.concepts.map(([title,text],index)=>({
      title,
      points:[
        text,
        sequence[index%Math.max(sequence.length,1)]||'अध्याय के मुख्य प्रसंग को क्रम से समझें।',
        examFocus[index%Math.max(examFocus.length,1)]||'परीक्षा-उपयोगी तथ्य को अपने शब्दों में दोहराएँ।',
        language[index%Math.max(language.length,1)]||highScore[index%Math.max(highScore.length,1)]||'शब्दार्थ और वाक्य-अर्थ की जाँच करें।'
      ]
    })),
    practice:balanceQuestions(chapter.practice,0),
    challenge:balanceQuestions(chapter.challenge,1),
    finalTest:balanceQuestions(chapter.finalTest,2)
  };
};

export const SANSKRIT_SUPPLEMENTARY_RUNTIME_CONTENT=Object.fromEntries(
  Object.entries(SANSKRIT_SUPPLEMENTARY_CONTENT).map(([key,value])=>[key,enrich(value)])
);

export const getSanskritSupplementaryContent=chapterNumber=>
  SANSKRIT_SUPPLEMENTARY_RUNTIME_CONTENT[chapterNumber]||null;
