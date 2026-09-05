import React from 'react';
import {HindiGenericLearn} from './HindiGenericLearn';

export function HindiPoetryGenericLearn({lesson,onBack,onModeComplete}){
  if(!lesson)return null;
  return <HindiGenericLearn lesson={lesson} onBack={onBack} onModeComplete={onModeComplete}/>;
}
