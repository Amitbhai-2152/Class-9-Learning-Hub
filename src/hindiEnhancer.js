import React from 'react';
import {createRoot} from 'react-dom/client';
import {HindiHubEngine} from './HindiHubEngine';
import {hindiAllTopics} from './hindiChapterData';

const STORAGE_KEY='class9-selected-hindi-topic';
let subjectHost=null;
let engineRoot=null;
let engineMount=null;
let lastPage='';

function readSelection(){try{const raw=sessionStorage.getItem(STORAGE_KEY);return raw?JSON.parse(raw):null}catch{return null}}
function writeSelection(chapter,mode=null){try{sessionStorage.setItem(STORAGE_KEY,JSON.stringify({chapter,mode}))}catch{}}
function clearSelection(){try{sessionStorage.removeItem(STORAGE_KEY)}catch{}}
function isHindiSubject(){return document.querySelector('.page-header h1')?.textContent?.trim()==='हिन्दी'&&Boolean(document.querySelector('.subject-section .chapter-grid'))}
function isChapterPage(){return Boolean(document.querySelector('.chapter-hero-card'))&&Boolean(document.querySelector('.mode-grid'))}

function localProgressUpdate(kind,value){
  try{
    const key='class9-progress';
    const current=JSON.parse(localStorage.getItem(key)||'{}');
    const safe={xp:Number.isFinite(current.xp)?current.xp:0,streak:Number.isFinite(current.streak)?current.streak:1,dailyXp:Number.isFinite(current.dailyXp)?current.dailyXp:0,goal:Number.isFinite(current.goal)&&current.goal>0?current.goal:100,sessions:Array.isArray(current.sessions)?current.sessions:[]};
    if(kind==='xp'){safe.xp+=value;safe.dailyXp=Math.min(safe.goal,safe.dailyXp+value)}
    else safe.sessions=[...safe.sessions,value].slice(-100);
    localStorage.setItem(key,JSON.stringify(safe));
  }catch{}
}

function topicGroups(){
  const groups=[
    ['गोधूली · गद्य','गद्य खंड',hindiAllTopics.filter(x=>x.book==='गोधूली · गद्य')],
    ['गोधूली · काव्य','काव्य खंड',hindiAllTopics.filter(x=>x.book==='गोधूली · काव्य')],
    ['वर्णिका · पूरक','वर्णिका भाग 1',hindiAllTopics.filter(x=>x.book==='वर्णिका · पूरक')],
    ['व्याकरण एवं रचना','व्याकरण एवं रचना',hindiAllTopics.filter(x=>x.book==='व्याकरण एवं रचना')]
  ];
  return groups.filter(([,title,items])=>items.length);
}

function openOriginalChapter(){
  const target=document.querySelector('.subject-section .chapter-grid .chapter-card');
  target?.click();
}

function actionButton(label,mode,topic){
  const button=document.createElement('button');
  button.className='hindi-topic-action pressable';
  button.type='button';
  button.textContent=`${label}`;
  button.addEventListener('click',event=>{
    event.preventDefault();
    event.stopPropagation();
    writeSelection(topic.title,mode);
    openOriginalChapter();
  });
  return button;
}

function createTopicCard(topic,index,bookTitle){
  const card=document.createElement('article');
  card.className='chapter-card hindi-enhanced-card';
  card.dataset.topic=topic.title;
  card.innerHTML=`<div class="hindi-card-top"><span class="hindi-book-pill">${bookTitle}</span><span class="hindi-type-pill">${topic.type||'पाठ'}</span><span class="hindi-card-number">${String(index+1).padStart(2,'0')}</span></div><strong>${topic.title}</strong><small>${topic.theme||topic.summary||'अध्याय अध्ययन सामग्री'}</small><div class="hindi-card-tags"></div><div class="hindi-topic-actions"></div>`;
  const tags=card.querySelector('.hindi-card-tags');
  (topic.focus||topic.skills||[]).slice(0,3).forEach(item=>{const span=document.createElement('span');span.textContent=item;tags.appendChild(span)});
  const actions=card.querySelector('.hindi-topic-actions');
  [['📖 सीखें','learn'],['📝 अभ्यास','practice'],['🔥 चुनौती','challenge'],['🎯 टेस्ट','test']].forEach(([label,mode])=>actions.appendChild(actionButton(label,mode,topic)));
  const open=()=>{writeSelection(topic.title,null);openOriginalChapter()};
  card.addEventListener('dblclick',open);
  card.title='किसी mode को चुनकर सीधे शुरू करें';
  return card;
}

function enhanceSubject(){
  if(!isHindiSubject())return false;
  const grid=document.querySelector('.subject-section .chapter-grid');
  if(!grid)return false;
  if(!grid.dataset.hindiOriginalHidden){grid.dataset.hindiOriginalHidden='1';grid.style.display='none'}
  if(subjectHost&&document.body.contains(subjectHost))return true;
  subjectHost=document.createElement('div');
  subjectHost.className='hindi-enhanced-section';
  const intro=document.createElement('div');
  intro.className='hindi-section-intro';
  intro.innerHTML='<small>कक्षा 9 • बिहार बोर्ड हिन्दी</small><h2>गोधूली, वर्णिका और व्याकरण</h2><p>पाठ समझें, प्रश्न हल करें और टेस्ट के बाद हर उत्तर की समीक्षा करें। किसी भी पाठ के सामने mode चुनें।</p>';
  subjectHost.appendChild(intro);
  topicGroups().forEach(([,title,items])=>{
    const heading=document.createElement('div');heading.className='hindi-group-heading';heading.innerHTML=`<span>${title}</span><b>${items.length} पाठ</b>`;subjectHost.appendChild(heading);
    const cards=document.createElement('div');cards.className='hindi-enhanced-grid';items.forEach((topic,i)=>cards.appendChild(createTopicCard(topic,i,title)));subjectHost.appendChild(cards);
  });
  grid.parentElement.insertBefore(subjectHost,grid.nextSibling);
  return true;
}

function cleanupEngine(){
  if(engineRoot){try{engineRoot.unmount()}catch{}engineRoot=null}
  if(engineMount?.parentNode)engineMount.parentNode.removeChild(engineMount);
  engineMount=null;clearSelection();
}

function enhanceChapter(){
  if(!isChapterPage())return false;
  const selection=readSelection();
  if(!selection?.chapter)return false;
  const content=document.querySelector('.page-content');
  if(!content)return false;
  if(engineMount&&document.body.contains(engineMount))return true;
  const header=document.querySelector('.page-header h1');
  if(header)header.textContent=selection.chapter;
  const hidden=document.querySelector('.page-content > .chapter-hero-card');
  if(hidden)hidden.style.display='none';
  const existingMode=document.querySelector('.page-content > .mode-grid');
  if(existingMode)existingMode.style.display='none';
  engineMount=document.createElement('div');engineMount.className='hindi-engine-mount';content.innerHTML='';content.appendChild(engineMount);
  const addXp=value=>localProgressUpdate('xp',value);
  const finishSession=value=>localProgressUpdate('session',value);
  engineRoot=createRoot(engineMount);
  engineRoot.render(<HindiHubEngine chapter={selection.chapter} initialMode={selection.mode} onBack={()=>{cleanupEngine();document.querySelector('.page-header button')?.click()}} addXp={addXp} finishSession={finishSession}/>);
  return true;
}

function tick(){
  const page=document.querySelector('.page-header h1')?.textContent?.trim()||'';
  if(page!==lastPage){
    if(page!=='हिन्दी')cleanupEngine();
    if(page==='हिन्दी'&&subjectHost&&!document.body.contains(subjectHost))subjectHost=null;
    lastPage=page;
  }
  if(isHindiSubject()){enhanceSubject();return}
  enhanceChapter();
}

document.addEventListener('click',()=>window.setTimeout(tick,20),{capture:true});
window.setInterval(tick,250);
new MutationObserver(()=>window.setTimeout(tick,0)).observe(document.body,{childList:true,subtree:true});
window.setTimeout(tick,0);
