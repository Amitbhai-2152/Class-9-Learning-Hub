export const lessonData = {
  default: {
    lessons: [
      {
        type: 'intro',
        title: 'अध्याय की शुरुआत',
        body: 'इस स्क्रीन पर अध्याय की वास्तविक पुस्तक-आधारित सामग्री क्रम से दिखाई जाएगी। पहले लक्ष्य समझें, फिर अवधारणा पढ़ें और अंत में quick check करें।',
      },
      {
        type: 'concept',
        title: 'मुख्य अवधारणा',
        body: 'हर अध्याय को छोटे learning blocks में बाँटा जाएगा ताकि विद्यार्थी एक साथ बहुत अधिक सामग्री पढ़ने के बजाय एक-एक concept पर ध्यान दे सके।',
        points: ['सरल भाषा में परिभाषा', 'जरूरी सूत्र या तथ्य', 'उदाहरण और व्याख्या', 'याद रखने योग्य बिंदु'],
      },
      {
        type: 'example',
        title: 'उदाहरण से समझें',
        body: 'वास्तविक textbook content जुड़ने पर यहाँ solved example, step-by-step explanation और common mistake दिखेगी।',
      },
      {
        type: 'check',
        title: 'Quick Check',
        question: 'क्या आपने इस भाग की मुख्य अवधारणा समझ ली?',
        options: ['हाँ, आगे बढ़ें', 'थोड़ा और समझना है'],
      },
    ],
  },
};
