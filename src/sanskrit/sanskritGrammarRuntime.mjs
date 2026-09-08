import {SANSKRIT_GRAMMAR_UNITS as RAW_UNITS} from './sanskritGrammarSyllabus.mjs';

const normalizeUnit=(unit)=>{
  const pool=Array.from(new Set(unit.questions.flatMap(q=>q.options||[]).filter(Boolean)));
  const questions=unit.questions.map(q=>{
    const answer=Number.isInteger(q.answer)?q.answer:0;
    const options=new Array(4);
    const seen=new Set();
    options[answer]=q.options?.[answer];
    seen.add(options[answer]);
    let cursor=0;
    for(let i=0;i<4;i++){
      if(i===answer) continue;
      let candidate=q.options?.[i];
      if(!candidate||seen.has(candidate)){
        while(cursor<pool.length && seen.has(pool[cursor])) cursor++;
        candidate=pool[cursor++];
      }
      if(!candidate) throw new Error(`Unable to normalize grammar options for ${unit.id}`);
      options[i]=candidate;
      seen.add(candidate);
    }
    return {...q,options,answer};
  });
  return {...unit,questions};
};

export const SANSKRIT_GRAMMAR_UNITS=RAW_UNITS.map(normalizeUnit);
