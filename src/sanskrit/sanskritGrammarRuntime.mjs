import {SANSKRIT_GRAMMAR_UNITS as RAW_UNITS} from './sanskritGrammarSyllabus.mjs';

const unitProfiles={
  shabdarupa:{forward:f=>`“${f.term}” किस विभक्ति-वचन का रूप है?`,reverse:f=>`किस पद का सही विभक्ति-वचन “${f.value}” है?`,context:f=>`“${f.example}” में “${f.term}” की सही व्याकरणिक पहचान क्या है?`,compare:()=>`निम्न में से शब्दरूप का सही मिलान कौन-सा है?`},
  sarvanama:{forward:f=>`“${f.term}” की सही सर्वनाम-पहचान क्या है?`,reverse:f=>`“${f.value}” के लिए सही सर्वनाम-रूप कौन-सा है?`,context:f=>`“${f.example}” में “${f.term}” का सही पुरुष/लिंग-वचन सम्बन्ध क्या है?`,compare:()=>`निम्न में से सर्वनामों का सही मिलान कौन-सा है?`},
  dhaturupa:{forward:f=>`“${f.term}” किस पुरुष-वचन का लट् रूप है?`,reverse:f=>`“${f.value}” के लिए कौन-सा धातुरूप सही है?`,context:f=>`“${f.example}” में कर्ता के अनुसार कौन-सा लट्-रूप उचित है?`,compare:()=>`किस विकल्प में लट् धातुरूप का सही मिलान है?`},
  lakar:{forward:f=>`“${f.term}” किस लकार/भाव से सम्बन्धित है?`,reverse:f=>`“${f.value}” को दर्शाने वाला सही रूप कौन-सा है?`,context:f=>`“${f.example}” में क्रिया का सही लकार/भाव क्या है?`,compare:()=>`किस विकल्प में लोट् और विधिलिङ् का सही भेद है?`},
  karaka:{forward:f=>`“${f.term}” की कारक-सम्बन्धी सही पहचान क्या है?`,reverse:f=>`“${f.value}” किस कारक/विभक्ति-प्रयोग से सम्बन्धित है?`,context:f=>`“${f.example}” में “${f.term}” की वाक्यगत भूमिका क्या है?`,compare:()=>`किस विकल्प में कारक और विभक्ति का सही मेल है?`},
  upasarga:{forward:f=>`“${f.term}” में उपसर्ग और उसका मुख्य अर्थ कौन-सा है?`,reverse:f=>`किस पद में “${f.term.split(' + ')[0]}” उपसर्ग का यही प्रयोग मिलता है?`,context:f=>`“${f.example}” में उपसर्ग कौन-सा है और धातु के अर्थ पर उसका क्या प्रभाव है?`,compare:()=>`किस विकल्प में उपसर्ग और धातु का सही मेल है?`},
  pratyaya:{forward:f=>`“${f.term}” में कौन-सा प्रत्यय/अर्थ-सूत्र है?`,reverse:f=>`“${f.value.split(';')[0]}” से सम्बन्धित सही रूप कौन-सा है?`,context:f=>`“${f.example}” में प्रत्यय कौन-सा अर्थ व्यक्त कर रहा है?`,compare:()=>`किस विकल्प में प्रत्यय और बने रूप का सही मिलान है?`},
  sandhi:{forward:f=>`“${f.term}” से प्राप्त सही सन्धि-रूप/नियम क्या है?`,reverse:f=>`“${f.term}” का सही सन्धि-विच्छेद क्या है?`,context:f=>`“${f.example}” किस प्रकार की सन्धि को दर्शाता है?`,compare:()=>`किस विकल्प में सन्धि और विच्छेद दोनों सही हैं?`},
  samas:{forward:f=>`“${f.term}” का सही समास-प्रकार/विग्रह क्या है?`,reverse:f=>`किस समस्तपद से “${f.value.split(';')[0]}” का सम्बन्ध बनता है?`,context:f=>`“${f.example}” में कौन-सा समास-सम्बन्ध पहचाना जा रहा है?`,compare:()=>`किस विकल्प में समास-प्रकार और विग्रह सही हैं?`},
  avyaya:{forward:f=>`“${f.term}” का सही अर्थ और प्रयोग क्या है?`,reverse:f=>`“${f.value.split(';')[0]}” के लिए सही अव्यय कौन-सा है?`,context:f=>`“${f.example}” में “${f.term}” कौन-सा कार्य कर रहा है?`,compare:()=>`किस विकल्प में अव्यय और उसका कार्य सही है?`},
  prayoga:{forward:f=>`“${f.term}” किस भाषा-प्रयोग तथ्य को दर्शाता है?`,reverse:f=>`“${f.value.split(';')[0]}” से सम्बन्धित सही उदाहरण कौन-सा है?`,context:f=>`“${f.example}” से किस भाषा-अभ्यास-बिन्दु की पुष्टि होती है?`,compare:()=>`किस विकल्प में भाषा-प्रयोग का सही मिलान है?`}
};

const uniquePool=(items)=>Array.from(new Set(items.filter(Boolean)));
const placeAnswer=(correct,distractors,answerIndex)=>{
  const pool=uniquePool(distractors).filter(x=>x!==correct).slice(0,3);
  while(pool.length<3) pool.push(`विकल्प ${pool.length+2}`);
  const base=[correct,...pool];
  const options=new Array(4);
  for(let i=0;i<4;i++) options[i]=base[(i-answerIndex+4)%4];
  return {options,answer:answerIndex};
};

const buildQuestions=(unit)=>{
  const facts=unit.facts||[];
  const p=unitProfiles[unit.id]||unitProfiles.shabdarupa;
  const levels=['आसान','आसान','आसान','मध्यम','मध्यम','मध्यम','मध्यम','कठिन','कठिन','कठिन','कठिन','चुनौती','चुनौती','चुनौती','चुनौती'];
  const positions=[0,1,2,3,1,2,3,0,2,3,1,2,0,3,1];
  const out=[];
  for(let i=0;i<9;i++){
    const f=facts[i%facts.length];
    const mode=i%3;
    const candidates=mode===1?facts.filter(x=>x.term!==f.term).map(x=>x.term):facts.filter(x=>x.value!==f.value).map(x=>x.value);
    const {options,answer}=placeAnswer(mode===1?f.term:f.value,candidates,positions[i]);
    const q=mode===0?p.forward(f):mode===1?p.reverse(f):p.context(f);
    const explain=mode===2?`“${f.example||f.term}” में “${f.term}” का सम्बन्ध “${f.value}” से है।`:`सही मिलान “${f.term}” — ${f.value} है।`;
    out.push({level:levels[i],type:mode===0?'पहचान':mode===1?'उलटा-पहचान':'सन्दर्भ',q,options,answer,explain});
  }
  for(let i=0;i<4;i++){
    const f=facts[(i+2)%facts.length];
    const candidates=facts.filter(x=>x.term!==f.term).map(x=>x.term);
    const {options,answer}=placeAnswer(f.term,candidates,positions[9+i]);
    const q=i%2===0?`दिए गए संकेत “${f.value}” के लिए सही पद चुनिए।`:`निम्न संकेत “${f.value}” किस सही रूप से मेल खाता है?`;
    out.push({level:levels[9+i],type:'रूप-चयन',q,options,answer,explain:`“${f.term}” ही “${f.value}” से सम्बद्ध सही पद है।`});
  }
  for(let i=0;i<2;i++){
    const a=facts[i],b=facts[i+1],c=facts[i+2],d=facts[i+3];
    const correct=`${a.term} — ${a.value}`;
    const distractors=[`${b.term} — ${c.value}`,`${c.term} — ${d.value}`,`${d.term} — ${b.value}`];
    const {options,answer}=placeAnswer(correct,distractors,positions[13+i]);
    const q=i===0?p.compare(a,b):`दिए गए विकल्पों में ${unit.title} का सही जोड़ा पहचानिए।`;
    out.push({level:'चुनौती',type:'तुलना',q,options,answer,explain:`सही मिलान “${correct}” है। शब्द और उसके व्याकरणिक अर्थ/रूप दोनों का मिलान आवश्यक है।`});
  }
  return out;
};

const normalizeUnit=(unit)=>({...unit,questions:buildQuestions(unit)});
export const SANSKRIT_GRAMMAR_UNITS=RAW_UNITS.map(normalizeUnit);
