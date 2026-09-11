import {SUBJECT_REGISTRY} from './subjectProgressRegistry';

const meta={
 math:{name:'गणित',icon:'∑',desc:'संख्या, बीजगणित, ज्यामिति और तर्क'},
 science:{name:'विज्ञान',icon:'⚗',desc:'भौतिकी, रसायन और जीव विज्ञान'},
 hindi:{name:'हिन्दी',icon:'अ',desc:'गद्य, पद्य, भाषा और लेखन'},
 sanskrit:{name:'संस्कृत',icon:'ॐ',desc:'पाठ, व्याकरण और परीक्षा अभ्यास'},
 sst:{name:'सामाजिक विज्ञान',icon:'◎',desc:'इतिहास, भूगोल, नागरिक शास्त्र और अर्थशास्त्र'},
 english:{name:'अंग्रेज़ी',icon:'A',desc:'The Panorama + English Reader • Literature, language and exam practice'},
 reasoning:{name:'तर्कशक्ति',icon:'?',desc:'तर्क, पैटर्न और समस्या समाधान'}
};

const englishReaderRouteNames=['I’m going to dance again','Scaling Great Heights','Saint Kabir','The eyes are not here','Ismat Chughtai: A Lady With a Difference','The Accidental Tourist','Saint Ravidas','Bharathipura'];

function routeChapters(subject){
 if(subject.id!=='english')return subject.topics.map(topic=>topic.title);
 return subject.topics.map((topic,index)=>{
  if(index<8)return `Reader • ${index+1} ${englishReaderRouteNames[index]}`;
  if(index<17)return `Panorama • Prose ${index-7} ${topic.title}`;
  if(index<25)return `Panorama • Poetry ${index-16} ${topic.title}`;
  return topic.title;
 });
}

export const subjects=SUBJECT_REGISTRY.map(subject=>({
 id:subject.id,
 name:meta[subject.id]?.name||subject.name,
 icon:meta[subject.id]?.icon||'•',
 desc:meta[subject.id]?.desc||'',
 chapters:routeChapters(subject)
}));

export const subjectById=Object.fromEntries(subjects.map(subject=>[subject.id,subject]));
