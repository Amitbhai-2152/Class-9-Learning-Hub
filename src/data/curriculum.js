export const curriculum = [
  { id: 'maths', name: 'गणित', nameEn: 'Mathematics', chapters: [
    { id: 'number-system', title: 'संख्या पद्धति', stages: ['learn','practice','challenge','test'] },
    { id: 'polynomials', title: 'बहुपद', stages: ['learn','practice','challenge','test'] },
  ]},
  { id: 'science', name: 'विज्ञान', nameEn: 'Science', chapters: [
    { id: 'matter-around-us', title: 'हमारे आसपास के पदार्थ', stages: ['learn','practice','challenge','test'] },
  ]},
  { id: 'hindi', name: 'हिन्दी', nameEn: 'Hindi', chapters: [
    { id: 'kahani-ke-plot-1', title: 'कहानी के प्लॉट–1', stages: ['learn','practice','challenge','test'] },
  ]},
  { id: 'sst', name: 'सामाजिक विज्ञान', nameEn: 'Social Science', chapters: [
    { id: 'geographical-discoveries-1', title: 'भौगोलिक खोजें–भाग 1', stages: ['learn','practice','challenge','test'] },
  ]},
  { id: 'sanskrit', name: 'संस्कृत', nameEn: 'Sanskrit', chapters: [
    { id: 'ishastuti', title: 'ईशस्तुति', stages: ['learn','practice','challenge','test'] },
  ]},
  { id: 'english', name: 'अंग्रेज़ी', nameEn: 'English', chapters: [
    { id: 'grammar', title: 'Grammar: Parts of Speech & Tenses', stages: ['learn','practice','challenge','test'] },
  ]},
  { id: 'reasoning', name: 'तर्कशक्ति', nameEn: 'Reasoning', chapters: [
    { id: 'advanced-reasoning', title: 'Advanced Reasoning', stages: ['learn','practice','challenge','test'] },
  ]},
];

export const stageMeta = {
  learn: { label: 'सीखें', description: 'Concept को समझें' },
  practice: { label: 'अभ्यास', description: 'अलग-अलग प्रश्न हल करें' },
  challenge: { label: 'चुनौती', description: 'Harder problems परखें' },
  test: { label: 'टेस्ट', description: 'Timed assessment दें' },
};
