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
  while(lessons.length<15)lessons.push({...supplement.lesson});
  while(practice.length<15)practice.push({...supplement.practice});
  while(finalTest.length<20)finalTest.push({...supplement.finalTest});
  return {...base,lessons,practice,finalTest};
};

const cloneQuestion=x=>({q:String(x?.q||'').trim(),marks:Number(x?.marks)||2,answer:String(x?.answer||'').trim()});
const makeSubjectiveLevel=(source,fallback,count=5)=>{
  const items=Array.isArray(source)?source.map(cloneQuestion).filter(x=>x.q):[];
  const out=items.slice(0,count);
  for(let i=out.length;i<count;i++)out.push(cloneQuestion(fallback));
  return out;
};

export const getCivicsSubjective=chapterNumber=>{
  const base=CIVICS_SUBJECTIVE_CHAPTERS[chapterNumber];
  if(!base)return null;
  const chapter=getCivicsChapter(chapterNumber);
  const supplement=chapterNumber===3?CIVICS_CHAPTER_3_SUPPLEMENT:makeSynthesisSupplement(chapter);
  const source=base.questions||{};
  const questions={
    easy:makeSubjectiveLevel(source.easy,supplement.subjective,5),
    hard:makeSubjectiveLevel(source.hard,supplement.subjective,5),
    challenger:makeSubjectiveLevel(source.challenger,supplement.subjective,5)
  };
  return {...base,questions};
};
