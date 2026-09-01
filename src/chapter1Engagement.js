import {chapter6Learning} from './chapter6Learning';
import {chapter7Learning} from './chapter7Learning';

// Keep the learning engine compatible with chapters that use `sections`.
chapter6Learning.lessons = chapter6Learning.lessons || chapter6Learning.sections || [];
chapter7Learning.lessons = chapter7Learning.lessons || chapter7Learning.sections || [];

export const chapter1Engagement = {
  'संख्या पद्धति': [
    {
      hook:'🚀 Warm-up: मोबाइल, कैलेंडर और पैसे—इन सबमें संख्याएँ हमारा hidden language हैं।',
      why:'आज का लक्ष्य: संख्या देखकर सिर्फ नाम याद करना नहीं, बल्कि यह समझना कि वह किस family में कहाँ बैठती है।',
      think:'सोचिए: 0 को हटाने पर कितने रोज़मर्रा के काम मुश्किल हो जाएँगे?'
    },
    {
      hook:'🎯 Quick story: अगर आपकी कक्षा में 27 विद्यार्थी हैं, तो आप किस तरह की संख्या इस्तेमाल कर रहे हैं?',
      why:'गिनती वाली संख्याएँ सबसे पहला number family बनाती हैं; यहीं से बाकी families को समझना आसान होता है।',
      think:'क्या 0 को गिनती में रखना है या नहीं—इस सवाल का उत्तर definition पर निर्भर क्यों हो सकता है?'
    },
    {
      hook:'🧩 Number detective: पार्किंग में 0 गाड़ियाँ भी हो सकती हैं—इसलिए 0 को समझना जरूरी है।',
      why:'पूर्ण संख्याएँ 0 सहित counting numbers का विस्तार हैं।',
      think:'0, 1, 2, 3… और 1, 2, 3… में conceptual फर्क क्या है?'
    },
    {
      hook:'🌡️ Real life: तापमान −3°C हो सकता है। ऋणात्मक संख्याएँ सिर्फ maths की चीज़ नहीं हैं।',
      why:'पूर्णांक हमें शून्य के दोनों ओर स्थित मानों को एक ही system में समझने देते हैं।',
      think:'संख्या रेखा पर −5 और −2 में कौन बड़ा है? दिशा से कैसे पता चलेगा?'
    },
    {
      hook:'🍕 Sharing problem: 3 pizzas को 5 बच्चों में बराबर बाँटने पर 3/5 जैसा number मिलता है।',
      why:'परिमेय संख्या की ताकत यही है कि वह हिस्सों, अनुपात और exact quantities को व्यक्त कर सकती है।',
      think:'p/q में q = 0 क्यों allowed नहीं है?'
    },
    {
      hook:'🔄 Decimal detective: 0.125 देखकर क्या आप तुरंत बता सकते हैं कि यह fraction हो सकता है?',
      why:'दशमलव को fraction में बदलने से हमें संख्या का असली structure दिखाई देता है।',
      think:'0.125 को denominator 1000 वाली fraction में लिखकर फिर simplify कीजिए।'
    },
    {
      hook:'🕵️ Mystery number: √2 calculator पर खत्म क्यों नहीं होता?',
      why:'अपरिमेय संख्याएँ वही values हैं जिन्हें किसी exact p/q रूप में नहीं लिख सकते।',
      think:'क्या हर लंबा या अनंत decimal irrational होता है? 0.333… को याद कीजिए।'
    },
    {
      hook:'🏠 Big picture: Natural → Whole → Integer → Rational—हर अगली family पिछली को अपने अंदर रखती है।',
      why:'Number families को nested boxes की तरह सोचेंगे तो classification questions बहुत आसान हो जाते हैं।',
      think:'क्या कोई संख्या एक साथ natural, integer और rational हो सकती है? उदाहरण दें।'
    },
    {
      hook:'🔁 Pattern hunt: 1/3 = 0.333… और यह pattern रुकता नहीं, लेकिन दोहराता रहता है।',
      why:'Terminating और recurring decimals को अलग करना rational-number questions की key skill है।',
      think:'किसी decimal में repeated block दिखे तो आप कौन-सा label देंगे?'
    },
    {
      hook:'📍 GPS for numbers: number line को numbers का map समझिए—हर real number का एक स्थान है।',
      why:'Number line comparison, ordering और fractions/irrationals की position समझने का सबसे visual tool है।',
      think:'−1/2, 0 और 3/4 में सबसे बाएँ और सबसे दाएँ कौन होगा?'
    },
    {
      hook:'🧠 Root clue: √9 का मतलब “कौन-सी positive संख्या खुद से गुणा होकर 9 देती है?”',
      why:'Square root को सिर्फ symbol की तरह नहीं, reverse-square operation की तरह समझना आगे बहुत मदद करेगा।',
      think:'√16 = 4 क्यों है, जबकि (−4)² भी 16 है?'
    },
    {
      hook:'⚡ Power pattern: 2¹, 2², 2³… में संख्या तेजी से बढ़ती है क्योंकि exponent repeated multiplication बताता है।',
      why:'घातों की यह छोटी foundation आगे algebra और polynomials में बार-बार काम आएगी।',
      think:'2² × 2³ को repeated multiplication से verify कीजिए।'
    },
    {
      hook:'🚧 Common trap: “अनंत decimal = irrational” सुनने में सही लगता है, लेकिन यह अधूरा rule है।',
      why:'आवर्ती decimal rational हो सकता है; इसलिए pattern को पहचानना definition से भी महत्वपूर्ण है।',
      think:'0.666… को fraction के रूप में लिखने की कोशिश कीजिए।'
    },
    {
      hook:'🎓 Exam smart: √4, √9, √16 जैसे perfect squares को पहचानना classification questions को तेज़ करता है।',
      why:'हर square root irrational नहीं होता—पहले exact value जाँचें, फिर classification करें।',
      think:'क्या √25 और √26 का number type एक जैसा होगा? कारण दें।'
    },
    {
      hook:'🏆 Final mission: अब आपको किसी भी दी गई संख्या को family में place करना है—definition, evidence और rule के साथ।',
      why:'Chapter 1 का असली skill “label याद करना” नहीं, बल्कि सही reasoning से number classify करना है।',
      think:'√25 को सबसे छोटे स्पष्ट family से शुरू करके real numbers तक classify कीजिए।'
    }
  ]
};
