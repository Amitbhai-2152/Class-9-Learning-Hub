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
  const lessons=[...base.lessons],practice=[...base.practice],finalTest=[...base.finalTest];
  const supplement=chapterNumber===3?CIVICS_CHAPTER_3_SUPPLEMENT:makeSynthesisSupplement(base);
  while(lessons.length<15)lessons.push(supplement.lesson);
  while(practice.length<15)practice.push(supplement.practice);
  while(finalTest.length<20)finalTest.push(supplement.finalTest);
  return {...base,lessons,practice,finalTest};
};

export const getCivicsSubjective=chapterNumber=>{
  const base=CIVICS_SUBJECTIVE_CHAPTERS[chapterNumber];
  if(!base)return null;
  const questions={...base.questions};
  const chapter=getCivicsChapter(chapterNumber);
  const supplement=chapterNumber===3?CIVICS_CHAPTER_3_SUPPLEMENT:makeSynthesisSupplement(chapter);
  while(Object.values(questions).reduce((n,items)=>n+items.length,0)<15)questions.challenger=[...(questions.challenger||[]),supplement.subjective];
  return {...base,questions};
};
