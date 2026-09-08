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
  const topic=deep?.label||chapter.title||`पूरक अध्याय ${chapter.id}`;
  const wrap=(prefix,value,suffix)=>`${prefix}${value}${suffix}`;
  return {
    ...chapter,
    deepContent:deep,
    studyModule:{...study,typeReading:toolkit.reading||'',answerMethod:toolkit.answerMethod||''},
    lessons:chapter.concepts.map(([title,text],index)=>({
      title,
      points:[
        wrap(`${topic} में इस concept का मुख्य आधार है: `,text,'। इसे पाठ के उदाहरण और प्रश्न के संदर्भ से जोड़कर समझें।'),
        wrap(`पाठ के क्रम में अगला महत्त्वपूर्ण अध्ययन-बिंदु है: `,sequence[index%Math.max(sequence.length,1)]||'मुख्य प्रसंग और उसके परिणाम को क्रम से समझना','। घटना, विचार या संदेश के बीच संबंध स्पष्ट रखें।'),
        wrap(`परीक्षा की तैयारी में ध्यान दें: `,examFocus[index%Math.max(examFocus.length,1)]||'अध्याय के मुख्य तथ्य और संदेश को अपने शब्दों में स्पष्ट करना','। उत्तर में प्रसंग और निष्कर्ष दोनों शामिल करें।'),
        wrap(`भाषा एवं high-score अभ्यास के लिए: `,language[index%Math.max(language.length,1)]||highScore[index%Math.max(highScore.length,1)]||'शब्दार्थ, वाक्य-अर्थ और पाठ-संदेश को एक साथ दोहराना','। केवल शब्द याद करने के बजाय उनका पाठ-संदर्भ भी पहचानें।')
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
