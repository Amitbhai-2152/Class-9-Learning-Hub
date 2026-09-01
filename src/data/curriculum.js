export const LEARNING_STAGES = ['learn', 'practice', 'challenge', 'test'];

export const curriculum = [
  {
    id: 'maths', name: 'गणित', nameEn: 'Mathematics',
    chapters: [
      { id: 'number-system', title: 'संख्या पद्धति', stages: LEARNING_STAGES, contentKey: 'number-system', status: 'content-ready' },
      { id: 'polynomials', title: 'बहुपद', stages: LEARNING_STAGES, contentKey: 'polynomials', status: 'content-ready' },
    ],
  },
  {
    id: 'science', name: 'विज्ञान', nameEn: 'Science',
    chapters: [{ id: 'matter-around-us', title: 'हमारे आसपास के पदार्थ', stages: LEARNING_STAGES, contentKey: 'matter-around-us', status: 'outline-ready' }],
  },
  {
    id: 'hindi', name: 'हिन्दी', nameEn: 'Hindi',
    chapters: [{ id: 'kahani-ke-plot-1', title: 'कहानी के प्लॉट–1', stages: LEARNING_STAGES, contentKey: 'kahani-ke-plot-1', status: 'outline-ready' }],
  },
  {
    id: 'sst', name: 'सामाजिक विज्ञान', nameEn: 'Social Science',
    chapters: [{ id: 'geographical-discoveries-1', title: 'भौगोलिक खोजें–भाग 1', stages: LEARNING_STAGES, contentKey: 'geographical-discoveries-1', status: 'outline-ready' }],
  },
  {
    id: 'sanskrit', name: 'संस्कृत', nameEn: 'Sanskrit',
    chapters: [{ id: 'ishastuti', title: 'ईशस्तुति', stages: LEARNING_STAGES, contentKey: 'ishastuti', status: 'outline-ready' }],
  },
  {
    id: 'english', name: 'अंग्रेज़ी', nameEn: 'English',
    chapters: [{ id: 'grammar', title: 'व्याकरण, काल और शब्दावली', stages: LEARNING_STAGES, contentKey: 'grammar', status: 'outline-ready' }],
  },
  {
    id: 'reasoning', name: 'तर्कशक्ति', nameEn: 'Reasoning',
    chapters: [{ id: 'advanced-reasoning', title: 'उन्नत तर्कशक्ति', stages: LEARNING_STAGES, contentKey: 'advanced-reasoning', status: 'outline-ready' }],
  },
];

export const stageMeta = {
  learn: { label: 'सीखें', description: 'अवधारणा को सरल हिन्दी में समझें' },
  practice: { label: 'अभ्यास', description: 'अलग-अलग प्रश्न हल करें' },
  challenge: { label: 'चुनौती', description: 'कठिन प्रश्नों से समझ जाँचें' },
  test: { label: 'टेस्ट', description: 'समयबद्ध मूल्यांकन दें' },
};
