import React from 'react';
import {ScienceChapter4Engine as ScienceChapter4Core} from './ScienceChapter4EngineCore';
import {scienceChapter4Learning} from './scienceChapter4Learning';
import {ScienceChapterShell} from './ScienceChapterShell';
import './scienceChapter4-shell.css';

export function ScienceChapter4Engine(props){
  return <ScienceChapterShell lessons={scienceChapter4Learning.lessons} title="अध्याय सूची">
    <ScienceChapter4Core {...props}/>
  </ScienceChapterShell>;
}

export default ScienceChapter4Engine;
