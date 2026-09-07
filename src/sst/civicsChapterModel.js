import {CIVICS_CHAPTERS,CIVICS_SUBJECTIVE_CHAPTERS} from './civicsData.js';
import {CIVICS_CHAPTER_3_SUPPLEMENT} from './civicsChapter3Supplement.js';

const makeSynthesisSupplement=(base)=>({
  lesson:{title:`समेकन: ${base.title}`,summary:base.goal,points:[`${base.title} की मुख्य अवधारणाओं को एक साथ जोड़ें।`,'अध्याय के प्रमुख लोकतांत्रिक विचारों के बीच संबंध समझें।','परीक्षा में तथ्य, कारण और अनुप्रयोग को एक साथ प्रस्तुत करें।']},
  practice:{q:`अध्याय “${base.title}” की केंद्रीय सीख क्या है?`,options:[base.goal,'केवल एक प्रशासनिक प्रक्रिया','केवल एक ऐतिहासिक तारीख','केवल चुनावी प्रचार'],answer:0,explanation:base.goal},
  finalTest:{q:`अध्याय “${base.title}” के अध्ययन का सबसे व्यापक उद्देश्य क्या है?`,options:[base.goal,'केवल एक तथ्य याद करना','केवल एक संस्था का नाम जानना','केवल एक चुनाव प्रक्रिया दोहराना'],answer:0,explanation:base.goal},
  subjective:{q:`“${base.title}” की मुख्य अवधारणाओं को एक क्रमबद्ध उत्तर में समझाइए।`,marks:5,answer:base.goal}
});

export const getCivicsChapter=chapterNumber=>{
  const base=CIVICS_CHAPTERS[chapterNumber];
  if(!base)return null;
  if(base.lessons.length>=15)return base;
  const supplement=chapterNumber===3?CIVICS_CHAPTER_3_SUPPLEMENT:makeSynthesisSupplement(base);
  return {
    ...base,
    lessons:[...base.lessons,supplement.lesson],
    practice:[...base.practice,supplement.practice],
    finalTest:[...base.finalTest,supplement.finalTest]
  };
};

export const getCivicsSubjective=chapterNumber=>{
  const base=CIVICS_SUBJECTIVE_CHAPTERS[chapterNumber];
  if(!base)return null;
  const chapter=getCivicsChapter(chapterNumber);
  if(Object.values(base.questions).reduce((n,items)=>n+items.length,0)>=15)return base;
  const supplement=chapterNumber===3?CIVICS_CHAPTER_3_SUPPLEMENT:makeSynthesisSupplement(chapter);
  return {
    ...base,
    questions:{
      ...base.questions,
      challenger:[...base.questions.challenger,supplement.subjective]
    }
  };
};
