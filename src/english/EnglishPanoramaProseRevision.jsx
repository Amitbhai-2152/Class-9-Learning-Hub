import React,{useState} from 'react';
import PanoramaTimedQuiz from './PanoramaTimedQuiz.jsx';
import './english-reader.css';
import './english-panorama.css';
import './EnglishPanoramaProseRevision.css';

const chapters=[
 ['1','Dharam Juddha','Arjun Dev Charan','Social customs • dignity • equality'],
 ['2','Yayati','C. Rajagopalachari','Desire • youth • restraint'],
 ['3','A Silent Revolution','Kunal Varma','SMS • IM • mobile communication'],
 ['4','Too Many People, Too Few Trees','Moti Nisani','Population • resources • environment'],
 ['5','Echo and Narcissus','Moira Kerr and John Bennett','Myth • rejection • self-absorption'],
 ['6','The Shehnai of Bismillah Khan','—','Music • tradition • cultural identity'],
 ['7','Kathmandu','Vikram Seth','Places • contrast • music'],
 ['8','My Childhood','A. P. J. Abdul Kalam','Childhood • harmony • prejudice • education'],
 ['9','The Gift of the Magi','O. Henry','Love • sacrifice • irony']
];

const misconceptions=[
 ['01','Dharam Juddha','Tradition is not automatically fair. The chapter invites the reader to question customs that deny dignity or equality.'],
 ['02','Yayati','Yayati’s problem is not simply old age; the deeper conflict is the endless pursuit of pleasure and desire.'],
 ['03','A Silent Revolution','SMS is not the same as Instant Messaging: the lesson distinguishes store-and-forward text messaging from real-time internet messaging.'],
 ['04','Too Many People, Too Few Trees','Environmental claims in the chapter belong to the lesson’s argument; do not treat its numerical examples as current statistical estimates.'],
 ['05','Echo and Narcissus','The myth’s self-absorption is not the same as healthy self-respect.'],
 ['06','The Shehnai of Bismillah Khan','The shehnai story is also about cultural continuity and shared musical traditions, not only the instrument itself.'],
 ['07','Kathmandu','The narrator’s description of two sacred places uses contrast: Pashupatinath is crowded and noisy, while Boudhanath feels comparatively peaceful.'],
 ['08','My Childhood','The chapter highlights religious harmony alongside the experience of prejudice and the power of education to challenge it.'],
 ['09','The Gift of the Magi','The ending is ironic because each gift becomes temporarily unusable, yet both sacrifices express deep love.']
];

const revisionBank=[
 {q:'Which idea is central to “Dharam Juddha”?',o:['Questioning unfair social customs and affirming dignity','Celebrating wealth and status','Avoiding all social change','Choosing a career in business'],a:0,e:'The chapter uses a social conflict to question customs and double standards and to defend dignity and equality.'},
 {q:'What does “Dharam Juddha” encourage the reader to examine?',o:['Whether a tradition is just and fair','Whether every custom is ancient','Whether people should never disagree','Whether marriage has no social meaning'],a:0,e:'The lesson encourages critical questioning of traditions when they conflict with fairness and dignity.'},
 {q:'Which contrast is important in the lesson?',o:['Social expectations placed on women can differ from those placed on men','Farmers and sailors use different tools','Cities are larger than villages','Old buildings are stronger than new ones'],a:0,e:'A key issue is the unequal social standard applied to women and men.'},
 {q:'Which theme best matches “Dharam Juddha”?',o:['Equality and dignity','Adventure at sea','Scientific discovery','Natural disasters'],a:0,e:'Equality, dignity and critical examination of social norms are central to the chapter.'},
 {q:'Which response best shows critical reading of the chapter?',o:['A custom should be examined for fairness, not accepted only because it is traditional','A custom must always be obeyed','Tradition and justice are always identical','Social questions cannot have rational answers'],a:0,e:'The chapter invites the reader to examine the justice of a practice rather than accept it blindly.'},
 {q:'What major problem drives Yayati’s story?',o:['An intense desire for youth and continued enjoyment','A shortage of food in a kingdom','A disagreement over military strategy','A journey to a foreign country'],a:0,e:'The story centers on Yayati’s premature old age and his desire to continue enjoying youth.'},
 {q:'Who gives Yayati the curse that causes premature old age?',o:['Sukracharya','Puru','Devyani','Krishna'],a:0,e:'Sukracharya is the source of the curse in the chapter’s account.'},
 {q:'Why does Puru agree to exchange his youth?',o:['He is willing to sacrifice for his father','He wants to become king immediately','He wants to escape from school','He has already become old'],a:0,e:'Puru accepts the burden of old age so his father can receive youth.'},
 {q:'What realization is important near the end of Yayati?',o:['Desire is not satisfied by endless indulgence','Youth can solve every human problem','A kingdom needs no restraint','Material pleasure always creates peace'],a:0,e:'The story turns toward restraint and the realization that indulgence does not finally satisfy desire.'},
 {q:'Which word pair best captures Yayati’s final lesson?',o:['Desire and restraint','War and victory','Travel and tourism','Silence and music'],a:0,e:'The story’s moral movement is from desire and indulgence toward restraint and understanding.'},
 {q:'What does SMS mainly allow in the chapter?',o:['Short text messages to be sent through a mobile network','Only live video conversations','Only printed letters','Only computer games'],a:0,e:'The lesson explains SMS as short-message communication delivered through a mobile system.'},
 {q:'What role does an SMSC play?',o:['It stores and forwards SMS messages','It translates every message into another language','It prints messages on paper','It blocks all incoming calls'],a:0,e:'The SMSC is presented as the service centre involved in storing and forwarding SMS messages.'},
 {q:'Why can an SMS arrive later rather than immediately?',o:['Store-and-forward delivery can wait while a destination is temporarily unavailable or congested','SMS always requires a postal worker','The sender must write the message twice','Phones can receive only one word per day'],a:0,e:'The lesson distinguishes store-and-forward delivery from a continuously connected conversation.'},
 {q:'How does Instant Messaging differ from SMS in the lesson?',o:['It is associated with real-time internet-based communication and presence','It uses only handwritten notes','It cannot send text','It works only without a network'],a:0,e:'The comparison is between mobile store-and-forward SMS and internet-based instant messaging.'},
 {q:'What development follows the spread of SMS in the lesson?',o:['Multimedia messaging and richer mobile communication','The end of mobile phones','A return to telegram-only communication','The disappearance of written language'],a:0,e:'The chapter traces the move from text messaging toward MMS and more capable mobile communication.'},
 {q:'What is the central environmental relationship highlighted in “Too Many People, Too Few Trees”?',o:['Population pressure and resource use can intensify environmental stress','More people automatically create more forests','Trees have no connection with human life','Pollution is unrelated to resources'],a:0,e:'The lesson connects population growth and resource pressure with environmental damage.'},
 {q:'Which issue is linked with loss of trees?',o:['Soil, water and ecological problems','Improved forest biodiversity in every case','Lower demand for land','A complete end to pollution'],a:0,e:'The chapter connects deforestation with wider ecological consequences.'},
 {q:'What does the chapter suggest about poverty and the environment?',o:['Poverty can push people toward resource dependence while lack of options limits choices','Poverty always improves forests','Poor communities never use natural resources','Poverty has no relation to environmental pressure'],a:0,e:'The lesson treats poverty as one factor that can shape environmental choices and resource dependence.'},
 {q:'Why is affluent consumption discussed?',o:['High consumption can also place heavy pressure on natural resources','Only poor people affect the environment','Consumption has no environmental effect','Affluence automatically restores forests'],a:0,e:'The chapter argues that environmental responsibility cannot be reduced to population numbers alone; consumption matters too.'},
 {q:'Which approach best matches the chapter’s population discussion?',o:['Combine population awareness with environmental responsibility and social development','Ignore health and education','Protect forests by stopping all economic activity','Treat environmental problems as unavoidable'],a:0,e:'The chapter connects population, poverty, development and environmental protection rather than presenting one isolated solution.'},
 {q:'Why is Echo unable to speak normally?',o:['Hera curses her to repeat the last words she hears','She has forgotten every language','She chooses complete silence','Narcissus takes away her voice'],a:0,e:'The curse limits Echo to repeating the final words she hears.'},
 {q:'What causes Narcissus to become confused when Echo replies?',o:['He interprets her repeated words as a trick or deliberate imitation','He knows her identity immediately','He cannot see her at all because of darkness','He believes the forest is speaking another language'],a:0,e:'Echo’s unusual replies make Narcissus think someone is playing a trick on him.'},
 {q:'What do the rejected people pray for?',o:['That Narcissus experience the pain he has caused others','That Echo become a queen','That the forest disappear','That the pool dry up'],a:0,e:'Their prayer asks for a reversal in which Narcissus experiences similar suffering.'},
 {q:'What does Narcissus fail to recognize in the pool?',o:['His own reflection','A hidden hunter','A golden statue','A second river'],a:0,e:'He sees his own reflected image without recognizing that it is himself.'},
 {q:'What is the clearest warning in the ending?',o:['Extreme self-absorption can become destructive','Beauty guarantees happiness','Rejection never matters','Self-respect is always harmful'],a:0,e:'The myth uses Narcissus’s fate to warn against extreme self-absorption.'},
 {q:'What transformation is described in the story of Bismillah Khan?',o:['The shehnai moves from a limited ceremonial setting into a respected classical performance tradition','The shehnai disappears from Indian music','The instrument becomes a Western piano','The musician stops performing after independence'],a:0,e:'The chapter emphasizes the shehnai’s movement from ceremonial use toward the classical music stage.'},
 {q:'Which place is especially associated with Bismillah Khan’s musical life?',o:['Benares and the Ganga','Kathmandu and Boudhanath','Delhi and Red Fort only','Mumbai and the sea'],a:0,e:'Benares and the Ganga are central to the chapter’s account of his musical identity.'},
 {q:'Who helped shape Bismillah Khan’s training?',o:['Ali Bux','Vikram Seth','Sukracharya','Puru'],a:0,e:'Ali Bux is presented as an important teacher and influence in his musical development.'},
 {q:'Why is the chapter culturally significant beyond awards?',o:['It shows a musician carrying forward shared musical and composite cultural traditions','It is mainly a lesson about business management','It rejects all religious traditions','It focuses only on foreign travel'],a:0,e:'The chapter presents music, places, traditions and shared cultural life alongside the musician’s achievements.'},
 {q:'Which statement best captures Bismillah Khan’s achievement?',o:['He brought exceptional mastery of the shehnai to prestigious classical and international stages','He invented every Indian musical instrument','He performed only in private homes','He avoided all public recognition'],a:0,e:'His achievement lies in elevating the shehnai through distinguished performance in India and abroad.'},
 {q:'Which two sacred places are contrasted in the Kathmandu account?',o:['Pashupatinath and Boudhanath','Benares and Dumraon','Rameswaram and Delhi','Agra and Patna'],a:0,e:'The travel account contrasts the crowded Pashupatinath area with the comparatively tranquil Boudhanath stupa.'},
 {q:'How is Pashupatinath presented?',o:['Crowded, noisy and full of mixed human, animal and ritual activity','Empty and silent','A modern shopping mall','A place with no religious activity'],a:0,e:'The narrator notices a busy mixture of priests, devotees, animals, tourists and everyday activity.'},
 {q:'Why does the narrator decide to fly home?',o:['Exhaustion and homesickness make the overland plan less attractive','He loses all interest in Kathmandu’s music','A river blocks every road','He is asked to leave by the king'],a:0,e:'The narrator’s fatigue and longing for home push him toward an air journey.'},
 {q:'What effect does the flute seller have on the narrator?',o:['The simple music becomes striking even amid traffic and hawkers’ noise','The seller makes the city completely silent','The narrator decides to become a professional musician','The flute is described as a useless object'],a:0,e:'The flute’s sound rises above the surrounding noise and leads the narrator to reflect on music.'},
 {q:'What makes the flute universal in the narrator’s reflection?',o:['Different cultures use related flute traditions, all based on breath','Only one country has flutes','Every flute is identical in shape','Flutes are important only in temples'],a:0,e:'The narrator notices different flute traditions while recognizing the common element of breath.'},
 {q:'What kind of childhood does Kalam describe at the beginning?',o:['A secure childhood supported by family and community in Rameswaram','A childhood spent without family','A childhood in a foreign country','A childhood devoted only to sports'],a:0,e:'The chapter begins with family, community and the comparatively secure life of Rameswaram.'},
 {q:'How does the Second World War affect Kalam’s early life?',o:['It brings changes such as the demand for newspaper bundles and his first earned money','It ends his schooling completely','It forces him to become a soldier','It moves his family overseas'],a:0,e:'The wartime context leads to newspaper-related work and Kalam’s first wages.'},
 {q:'What does the chapter show through Kalam’s friends and community?',o:['Religious harmony and shared traditions can exist across different faiths','Friends must always belong to one religion','Education separates every community','Traditions are never shared'],a:0,e:'Kalam recalls friendship and community ties that cross religious boundaries.'},
 {q:'What does the new teacher’s behavior reveal?',o:['Prejudice can be challenged by principled action and moral leadership','Teachers can never be corrected','Religion prevents all cooperation','School rules always require discrimination'],a:0,e:'The episode is followed by the corrective intervention of Lakshmana Sastry, which challenges prejudice.'},
 {q:'What is the role of Sivasubramania Iyer in Kalam’s growth?',o:['He encourages Kalam to break social barriers and pursue a broader future','He asks Kalam to leave school','He discourages higher education','He teaches only newspaper delivery'],a:0,e:'Iyer supports Kalam’s growth and encourages him to move beyond restrictive social expectations.'},
 {q:'How much money does Della have at the beginning of “The Gift of the Magi”?',o:['$1.87','$18.70','$87.00','$0.87'],a:0,e:'Della counts $1.87 as the small amount she has saved for Jim’s gift.'},
 {q:'What does Della sacrifice to buy Jim’s gift?',o:['Her long hair','Her watch','Her coat','Her wedding ring'],a:0,e:'Della sells her beautiful hair so she can buy a gift for Jim.'},
 {q:'What does Jim sell?',o:['His watch','His shoes','Della’s hair','Their apartment'],a:0,e:'Jim sells his valuable watch to obtain a gift for Della.'},
 {q:'What is the main irony of the gifts?',o:['Each person gives up the possession that makes the other person’s gift useful','Neither person buys a gift','The gifts are stolen','The gifts are exchanged before they meet'],a:0,e:'The irony is that Della’s hair and Jim’s watch are sacrificed, making the purchased gifts temporarily unusable.'},
 {q:'Why are Jim and Della compared with the Magi?',o:['Their loving sacrifices show the wisdom and generosity associated with the Magi','They are ancient kings in the literal story','They travel from Bethlehem together','They give gifts only for personal profit'],a:0,e:'The title connects their selfless giving with the generosity traditionally associated with the Magi.'}
];

export function EnglishPanoramaProseRevision({onBack,addXp,finishSession}){
 const [start,setStart]=useState(false);
 if(start)return <PanoramaTimedQuiz mode="challenge" title="Whole Prose Revision Test" bank={revisionBank} onBack={()=>setStart(false)} addXp={addXp} finishSession={finishSession}/>;
 return <main className="pg-shell prv-page">
  <div className="prv-topbar">
   <button className="pg-back prv-back" onClick={onBack}>← Back to English</button>
   <span className="prv-status"><i/>Revision Hub</span>
  </div>

  <section className="prv-hero">
   <div className="prv-hero-main">
    <div className="prv-kicker"><span>CLASS 9</span><b>•</b><span>ENGLISH</span><b>•</b><span>THE PANORAMA</span></div>
    <h1>Whole Prose<br/><em>Revision</em></h1>
    <p>One focused revision room for all nine prose chapters. Recall the big ideas, spot the common traps, then take the complete timed test.</p>
    <div className="prv-hero-chips"><span>9 chapters</span><span>45 fresh MCQs</span><span>45:00 timed</span><span>Challenge level</span></div>
   </div>
   <div className="prv-scoreboard" aria-label="Revision test overview">
    <div><strong>45</strong><span>QUESTIONS</span></div>
    <div><strong>45:00</strong><span>TIME LIMIT</span></div>
    <div><strong>9</strong><span>CHAPTERS</span></div>
   </div>
  </section>

  <section className="prv-start-card">
   <div className="prv-start-copy">
    <span className="prv-eyebrow">READY TO TEST?</span>
    <h2>Finish your prose revision in one sitting.</h2>
    <p>Every question must be answered before manual submission. When the timer ends, the test submits automatically and the result screen reviews your complete attempt.</p>
   </div>
   <button className="prv-start-btn" onClick={()=>setStart(true)}><span>Start Whole Prose Test</span><b>→</b></button>
  </section>

  <section className="prv-info-grid" aria-label="How the revision works">
   <article><span className="prv-info-icon">01</span><div><b>Mixed order</b><p>Questions move across all nine chapters, so you must identify context before answering.</p></div></article>
   <article><span className="prv-info-icon">02</span><div><b>Fresh bank</b><p>This cumulative bank is separate from the individual chapter Practice, Challenge and Final Tests.</p></div></article>
   <article><span className="prv-info-icon">03</span><div><b>Full review</b><p>Your result includes answers, correct choices, explanations, percentage and time used.</p></div></article>
  </section>

  <section className="prv-section">
   <div className="prv-section-head"><div><span className="prv-eyebrow">CHAPTER MAP</span><h2>All 9 prose chapters</h2><p>Five revision questions are drawn from each chapter.</p></div><span className="prv-section-count">9 × 5 = 45</span></div>
   <div className="prv-chapter-grid">
    {chapters.map(([n,title,author,focus])=><article className="prv-chapter-card" key={n}>
      <div className="prv-chapter-num">{n}</div>
      <div className="prv-chapter-body"><span>CHAPTER {n}</span><h3>{title}</h3><p>{focus}</p><small>{author==='—'?'Text focus':'By '+author}</small></div>
      <div className="prv-chapter-q"><b>5</b><span>Q</span></div>
    </article>)}
   </div>
  </section>

  <section className="prv-section">
   <div className="prv-section-head"><div><span className="prv-eyebrow">COMMON TRAPS</span><h2>Do not confuse these ideas</h2><p>These quick checks are here to prevent easy marks from slipping away.</p></div></div>
   <div className="prv-trap-grid">
    {misconceptions.map(([n,title,text])=><article className="prv-trap" key={title}><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
   </div>
  </section>

  <section className="prv-section prv-last-section">
   <div className="prv-section-head"><div><span className="prv-eyebrow">TEST STRATEGY</span><h2>Use the revision room properly</h2><p>Three simple moves before you press start.</p></div></div>
   <div className="prv-steps">
    <article><div>1</div><div><h3>Scan the map</h3><p>Make sure you remember the title, author, setting and central idea of every chapter.</p></div></article>
    <article><div>2</div><div><h3>Notice the traps</h3><p>Pay attention to contrasts, cause-and-effect, irony, character roles and chapter-specific concepts.</p></div></article>
    <article><div>3</div><div><h3>Then test yourself</h3><p>Choose the best answer, not the first answer that sounds familiar. The questions are deliberately mixed.</p></div></article>
   </div>
  </section>

  <section className="prv-bottom-cta">
   <div><span className="prv-eyebrow">45 QUESTIONS • 45 MINUTES</span><h2>Ready for the whole-prose test?</h2><p>Enter Challenge mode and revise all nine chapters in one timed attempt.</p></div>
   <button className="prv-start-btn light" onClick={()=>setStart(true)}><span>Start Test</span><b>→</b></button>
  </section>
 </main>;
}

export default EnglishPanoramaProseRevision;
