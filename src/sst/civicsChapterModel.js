import {CIVICS_CHAPTERS,CIVICS_SUBJECTIVE_CHAPTERS} from './civicsData.js';
import {CIVICS_CHAPTER_3_SUPPLEMENT} from './civicsChapter3Supplement.js';

export const getCivicsChapter=chapterNumber=>{
  const base=CIVICS_CHAPTERS[chapterNumber];
  if(!base)return null;
  if(chapterNumber!==3)return base;
  return {
    ...base,
    lessons:[...base.lessons,CIVICS_CHAPTER_3_SUPPLEMENT.lesson],
    practice:[...base.practice,CIVICS_CHAPTER_3_SUPPLEMENT.practice],
    finalTest:[...base.finalTest,CIVICS_CHAPTER_3_SUPPLEMENT.finalTest]
  };
};

export const getCivicsSubjective=chapterNumber=>{
  const base=CIVICS_SUBJECTIVE_CHAPTERS[chapterNumber];
  if(!base)return null;
  if(chapterNumber!==3)return base;
  return {
    ...base,
    questions:{
      ...base.questions,
      challenger:[...base.questions.challenger,CIVICS_CHAPTER_3_SUPPLEMENT.subjective]
    }
  };
};
