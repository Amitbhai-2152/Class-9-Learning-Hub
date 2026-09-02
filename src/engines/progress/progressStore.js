const KEY = 'class9-learning-progress';
const APP_KEY = 'class9-progress';

const safeObject=value=>value&&typeof value==='object'&&!Array.isArray(value)?value:{};

export function loadProgress(){
  try{return safeObject(JSON.parse(localStorage.getItem(KEY))||{});}catch{return {};}
}

export function saveProgress(progress){
  try{localStorage.setItem(KEY,JSON.stringify(safeObject(progress)));return true;}catch{return false;}
}

function migrateAppProgress(){
  try{
    const raw=JSON.parse(localStorage.getItem(APP_KEY));
    const source=safeObject(raw);
    const repaired={
      xp:Number.isFinite(source.xp)?source.xp:0,
      streak:Number.isFinite(source.streak)?source.streak:1,
      dailyXp:Number.isFinite(source.dailyXp)?source.dailyXp:0,
      goal:Number.isFinite(source.goal)&&source.goal>0?source.goal:100,
      sessions:Array.isArray(source.sessions)?source.sessions:[]
    };
    localStorage.setItem(APP_KEY,JSON.stringify({...source,...repaired}));
  }catch{}
}

migrateAppProgress();

export function markStageComplete(chapterId,stage){
  const progress=loadProgress();
  progress[chapterId]={...safeObject(progress[chapterId]),[stage]:true};
  saveProgress(progress);
  return progress;
}

export function getChapterProgress(chapterId){
  const progress=loadProgress();
  const completed=['learn','practice','challenge','test'].filter(stage=>progress[chapterId]?.[stage]).length;
  return Math.round((completed/4)*100);
}
