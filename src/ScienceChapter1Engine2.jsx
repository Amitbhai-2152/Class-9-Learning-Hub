import React from 'react';
import {ScienceChapter1Engine2 as ScienceChapter1Core} from './ScienceChapter1EngineCore';
import {scienceChapter1Learning} from './scienceChapter1Learning';
import {ScienceChapterShell} from './ScienceChapterShell';

export function ScienceChapter1Engine2(props){
  return <ScienceChapterShell lessons={scienceChapter1Learning.lessons} title="अध्याय सूची">
    <ScienceChapter1Core {...props}/>
  </ScienceChapterShell>;
}

export default ScienceChapter1Engine2;
