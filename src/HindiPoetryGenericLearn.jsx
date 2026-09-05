import React from 'react';
import {HindiGenericLearn} from './HindiGenericLearn';

export function HindiPoetryGenericLearn({lesson,onBack,onModeComplete}){
  if(!lesson)return null;
  return <div className="hindi-poetry-generic-learn"><HindiGenericLearn lesson={{...lesson,eyebrow:lesson.eyebrow||'गोधूली भाग 1 · काव्य'}} onBack={onBack} onModeComplete={onModeComplete}/></div>;
}
