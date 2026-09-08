import {SANSKRIT_PRIMARY_CONTENT} from './sanskritPrimaryContent.js';

const ch4=SANSKRIT_PRIMARY_CONTENT[4];
if(ch4&&Array.isArray(ch4.practice)&&ch4.practice.length===14){
  ch4.practice.push({
    q:'“वेदाङ्ग” शब्द से किसका बोध होता है?',
    options:['वेद-अध्ययन के सहायक छह अंगों का','चार वेदों की संख्या का','सामवेद के गान का','अथर्ववेद के काण्डों का'],
    answer:0,
    explain:'वेदाङ्ग वेदों के अध्ययन और समझ में सहायक छह अंगों की परंपरा है—शिक्षा, कल्प, व्याकरण, निरुक्त, छन्द और ज्योतिष।'
  });
}
