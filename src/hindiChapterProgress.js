import {hindiChapters} from './hindiChapterData';

const STORAGE_KEY='class9-hindi-chapter-progress-v1';
const EMPTY={completed:{},modes:{}};

function normalizeProgress(raw){
  const completed=raw?.completed&&typeof raw.completed==='object'?{...raw.completed}:{ };
  const modes=raw?.modes&&typeof raw.modes==='object'?{...raw.modes}:{ };
  hindiChapters.forEach(topic=>{
    if(topic.title&&completed[topic.title]&&!completed[topic.id])completed[topic.id]=completed[topic.title];
    if(topic.title&&modes[topic.title]&&!modes[topic.id])modes[topic.id]={...modes[topic.title]};
  });
  return {completed,modes};
}

function read(){
  try{
    const raw=JSON.parse(localStorage.getItem(STORAGE_KEY));
    if(!raw||typeof raw!=='object')return {...EMPTY,completed:{},modes:{}};
    return normalizeProgress(raw);
  }catch{return {...EMPTY,completed:{},modes:{}};}
}

function write(value){
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify(value));}catch{}
  try{window.dispatchEvent(new CustomEvent('hindi-progress-updated'));}catch{}
  return value;
}

export function getHindiProgress(){return read();}
export function isHindiChapterCompleted(id){
  if(!id)return false;
  const p=read();
  return Boolean(p.completed[id]||(p.modes[id]?.learn&&p.modes[id]?.test));
}
export function isHindiModeCompleted(id,mode){return Boolean(id&&mode&&read().modes[id]?.[mode]);}
export function markHindiModeCompleted(id,mode){
  if(!id||!mode)return read();
  const p=read();
  p.modes[id]={...(p.modes[id]||{}),[mode]:true};
  if(p.modes[id].learn&&p.modes[id].test&&!p.completed[id])p.completed[id]=new Date().toISOString();
  return write(p);
}
export function markHindiChapterCompleted(id){
  if(!id)return read();
  const p=read();
  p.completed[id]=new Date().toISOString();
  return write(p);
}
