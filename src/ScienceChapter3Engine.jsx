import React from 'react';
import {ScienceChapter3Engine as ScienceChapter3Core} from './ScienceChapter3EngineFixed';
import {scienceChapter3Learning} from './scienceChapter3Learning';
import {ChapterContents} from './ChapterContents';
import './science-chapter-sidebar.css';

export function ScienceChapter3Engine(props){
  return <div className="science-chapter-frame">
    <ChapterContents lessons={scienceChapter3Learning.lessons} title="इस अध्याय में क्या पढ़ेंगे?" compact={false}/>
    <div className="science-chapter-main">
      <ScienceChapter3Core {...props}/>
    </div>
  </div>;
}

export default ScienceChapter3Engine;
