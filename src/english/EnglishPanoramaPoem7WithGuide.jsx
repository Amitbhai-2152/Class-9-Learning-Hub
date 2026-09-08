import React from 'react';
import {EnglishPanoramaPoem7} from './EnglishPanoramaPoem7.jsx';
import {EnglishPanoramaPoem7LineGuide} from './EnglishPanoramaPoem7LineGuide.jsx';

export function EnglishPanoramaPoem7WithGuide(props){
 const mode=props.initialMode;
 if(mode&&mode!=='learn')return <EnglishPanoramaPoem7 {...props}/>;
 return <>
  <EnglishPanoramaPoem7LineGuide/>
  <EnglishPanoramaPoem7 {...props}/>
 </>;
}
