export const SST_TRACKS=[
  {
    id:'history',name:'इतिहास',icon:'◷',tag:'HISTORY',description:'घटनाएँ, कारण-परिणाम, समयरेखा और ऐतिहासिक संदर्भ',
    chapters:['भौगोलिक खोजें','अमेरिकी स्वतंत्रता संग्राम','फ्रांस की क्रांति','विश्व युद्धों का इतिहास','नाजीवाद','वन्य समाज और उपनिवेशवाद','शांति के प्रयास','कृषि और खेतीहर और समाज']
  },
  {
    id:'geography',name:'भूगोल',icon:'⌖',tag:'GEOGRAPHY',description:'भारत की भूमि, जनसंख्या, मानचित्र और आपदा प्रबंधन',
    chapters:['स्थिति एवं विस्तार','भौतिक स्वरूप : संरचना एवं उच्चावच','अपवाह स्वरूप','जलवायु','प्राकृतिक वनस्पति एवं वन्य प्राणी','जनसंख्या','भारत के पड़ोसी देश','मानचित्र अध्ययन','क्षेत्रीय अध्ययन','आपदा प्रबंधन : एक परिचय','मानवी गलतियों के कारण घटित आपदाएं : नाभिकीय, जैविक और रासायनिक','सामान्य आपदाएँ : निवारण एवं नियंत्रण','समुदाय आधारित आपदा प्रबंधन']
  },
  {
    id:'civics',name:'नागरिक शास्त्र',icon:'⚖',tag:'CIVICS',description:'लोकतंत्र, संविधान, संस्थाएँ, चुनाव और अधिकार',
    chapters:['लोकतंत्र का क्रमिक विकास','लोकतंत्र क्या और क्यों?','संविधान निर्माण','चुनावी राजनीति','संसदीय लोकतंत्र की संस्थाएं','लोकतांत्रिक अधिकार']
  },
  {
    id:'economics',name:'अर्थशास्त्र',icon:'₹',tag:'ECONOMICS',description:'संसाधन, गरीबी, रोजगार, कृषि और खाद्य सुरक्षा',
    chapters:['बिहार के एक गाँव की कहानी','मानव एक संसाधन','गरीबी','बेकारी','कृषि, खाद्यान्न सुरक्षा एवं गुणवत्ता','कृषक मजदूर']
  }
];

export const sstTotalChapters=SST_TRACKS.reduce((sum,track)=>sum+track.chapters.length,0);
export const findSSTChapter=(trackId,chapterNumber)=>{
  const track=SST_TRACKS.find(item=>item.id===trackId);
  if(!track)return null;
  const index=chapterNumber-1;
  if(index<0||index>=track.chapters.length)return null;
  return {trackId,trackName:track.name,chapterNumber,title:track.chapters[index]};
};
