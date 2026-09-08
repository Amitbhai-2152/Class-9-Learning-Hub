import React,{useEffect,useRef} from 'react';
import {EnglishPanoramaPoem7} from './EnglishPanoramaPoem7.jsx';

const replacements=new Map([
 ['I am like grass … but I shall sprout again … and bounce back.','Opening comparison: the speaker likens himself to grass and says that he will regrow and recover after being cut down.'],
 ['You can obliterate my signposts … but you cannot erase my identity …','The speaker imagines visible signs and institutions being destroyed, but insists that his identity cannot be erased.'],
 ['“two years ten years” … before the green mantle covers everything again.','The poem says that recovery may take years; eventually a green covering will return over the damaged landscape.'],
 ['I shall become a vast green jungle … because I am like grass.','The closing vision is of the speaker returning so completely that the land becomes a vast green jungle, completing the grass comparison.']
]);

function replaceText(root){
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
 const nodes=[];
 let node;
 while((node=walker.nextNode()))nodes.push(node);
 for(const textNode of nodes){
  const next=replacements.get(textNode.nodeValue);
  if(next)textNode.nodeValue=next;
 }
}

export function EnglishPanoramaPoem7WithGuide(props){
 const rootRef=useRef(null);
 useEffect(()=>{if(rootRef.current)replaceText(rootRef.current)},[]);
 return <div ref={rootRef}><EnglishPanoramaPoem7 {...props}/></div>;
}
