import {hindiChapters} from './hindiChapterData';
import {recordCanonicalStage} from './engines/progress/progressStore';

const STORAGE_KEY='class9-hindi-chapter-progress-v1';
const EMPTY={completed:{},modes:{}};
const REQUIRED_MODES=['learn','practice','challenge','test'];

function normalizeProgress(raw){
  const completed=raw?.completed&&typeof raw.completed==='object'?{...raw.completed}:{};
  const modes=raw?.modes&&typeof raw.modes==='object'?{...raw.modes}:{};
  hindiChapters.forEach(topic=>{
    if(topic.title&&completed[topic.title]&&!completed[topic.id])completed[topic.id]=completed[topic.title];
    if(topic.title&&modes[topic.title]&&!modes[topic.id])modes[topic.id]={...modes[topic.title]};
  });
  return {completed,modes};
}
function read(){try{const raw=JSON.parse(localStorage.getItem(STORAGE_KEY));if(!raw||typeof raw!=='object')return {...EMPTY,completed:{},modes:{}};return normalizeProgress(raw);}catch{return {...EMPTY,completed:{},modes:{}};}}
function write(value){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(value));}catch{}try{window.dispatchEvent(new CustomEvent('hindi-progress-updated'));}catch{}return value;}
function hasAllRequiredModes(modes){return REQUIRED_MODES.every(mode=>Boolean(modes?.[mode]));}
function topicTitle(id){return hindiChapters.find(topic=>topic.id===id)?.title||id;}

export function getHindiProgress(){return read();}
export function isHindiChapterCompleted(id){if(!id)return false;const p=read();return Boolean(p.completed[id]&&hasAllRequiredModes(p.modes[id]));}
export function isHindiModeCompleted(id,mode){return Boolean(id&&mode&&read().modes[id]?.[mode]);}
export function markHindiModeCompleted(id,mode){
  if(!id||!REQUIRED_MODES.includes(mode))return read();
  const p=read();
  p.modes[id]={...(p.modes[id]||{}),[mode]:true};
  if(hasAllRequiredModes(p.modes[id]))p.completed[id]=p.completed[id]||new Date().toISOString();else delete p.completed[id];
  const result=write(p);
  recordCanonicalStage({subject:'हिन्दी',chapter:topicTitle(id),stage:mode,at:new Date().toISOString()});
  return result;
}
export function markHindiChapterCompleted(id){
  if(!id)return read();
  const p=read();
  p.modes[id]={...(p.modes[id]||{}),learn:true,practice:true,challenge:true,test:true};
  p.completed[id]=new Date().toISOString();
  const result=write(p);
  const title=topicTitle(id);const at=new Date().toISOString();
  REQUIRED_MODES.forEach(stage=>recordCanonicalStage({subject:'हिन्दी',chapter:title,stage,at}));
  return result;
}
