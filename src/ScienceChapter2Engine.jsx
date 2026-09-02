import React from 'react';
import {ScienceChapter2Engine as ScienceChapter2Core} from './ScienceChapter2EngineCore';
import {scienceChapter2Learning} from './scienceChapter2Learning';
import {ScienceChapterShell} from './ScienceChapterShell';

export function ScienceChapter2Engine(props){
  return <ScienceChapterShell lessons={scienceChapter2Learning.lessons} title="अध्याय सूची">
    <ScienceChapter2Core {...props}/>
  </ScienceChapterShell>;
}

export default ScienceChapter2Engine;
