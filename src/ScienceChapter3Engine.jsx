import React from 'react';
import {ScienceChapter3Engine as ScienceChapter3Core} from './ScienceChapter3EngineFixed';
import {scienceChapter3Learning} from './scienceChapter3Learning';
import {ScienceChapterShell} from './ScienceChapterShell';

export function ScienceChapter3Engine(props){
  return <ScienceChapterShell lessons={scienceChapter3Learning.lessons} title="अध्याय सूची">
    <ScienceChapter3Core {...props}/>
  </ScienceChapterShell>;
}

export default ScienceChapter3Engine;
