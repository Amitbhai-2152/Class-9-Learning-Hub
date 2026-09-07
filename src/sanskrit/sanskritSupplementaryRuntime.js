import {SANSKRIT_SUPPLEMENTARY_CONTENT} from './sanskritSupplementaryContent.js';
import {getSanskritSupplementaryDeepContent} from './sanskritSupplementaryDeepContent.js';

const balanceQuestions=(items,offset=0)=>items.map((item,index)=>{
  const shift=(index+offset)%4;
  const options=item.options.map((_,i)=>item.options[(i+4-shift)%4]);
  return {...item,options,answer:(item.answer+shift)%4};
});

const enrich=chapter=>{
  const deep=getSanskritSupplementaryDeepContent(chapter.id);
  return {
    ...chapter,
    deepContent:deep,
    lessons:chapter.concepts.map(([title,text])=>({
      title,
      points:[text,'उदाहरण और प्रसंग के साथ अर्थ समझें।','मुख्य शब्दों को दोहराकर वाक्य-अर्थ जाँचें।']
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
