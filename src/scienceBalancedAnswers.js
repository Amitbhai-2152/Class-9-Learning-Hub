// Strict answer-position balancing for Science assessments.
// Keeps all question content and correct answers intact while preventing obvious answer-position patterns.
function randomInt(max){return Math.floor(Math.random()*max)}

function shuffleList(list){
  const copy=[...list];
  for(let i=copy.length-1;i>0;i--){
    const j=randomInt(i+1);
    [copy[i],copy[j]]=[copy[j],copy[i]];
  }
  return copy;
}

function isSafeNext(seq,candidate,size){
  const n=seq.length;
  if(n&&seq[n-1]===candidate)return false; // no AA
  if(n>=2&&seq[n-2]===candidate)return false; // no ABA/ABAB start
  if(n>=3&&seq[n-3]===candidate&&seq[n-2]!==candidate&&seq[n-1]!==candidate)return false; // no ABC A
  if(n>=4){
    const recent=seq.slice(-3).concat(candidate).join(',');
    for(let start=0;start<=seq.length-4;start++){
      if(seq.slice(start,start+4).join(',')===recent)return false; // no repeated 4-position block
    }
  }
  if(n>=3){
    const a=seq[n-3],b=seq[n-2],c=seq[n-1];
    const step=((b-a)%size+size)%size;
    const step2=((c-b)%size+size)%size;
    const step3=((candidate-c)%size+size)%size;
    if(step!==0&&step===step2&&step===step3)return false; // no A-B-C-D / reverse / cyclic step pattern
  }
  return true;
}

function buildPatternSafePlan(length,size){
  if(length<=1||size<=1)return Array(length).fill(0);
  const base=Math.floor(length/size);
  const counts=Array(size).fill(base);
  shuffleList(Array.from({length:length%size},(_,i)=>i)).forEach(i=>{counts[i]++;});
  const plan=[];
  const search=()=>{
    if(plan.length===length)return true;
    const candidates=shuffleList(Array.from({length:size},(_,i)=>i))
      .filter(i=>counts[i]>0&&isSafeNext(plan,i,size))
      .sort(()=>Math.random()-.5);
    for(const candidate of candidates){
      counts[candidate]--;
      plan.push(candidate);
      if(search())return true;
      plan.pop();
      counts[candidate]++;
    }
    return false;
  };
  if(search())return plan;
  throw new Error('Unable to build a strict balanced answer-position plan.');
}

function readQuestionOptions(question){
  const key=Array.isArray(question?.options)?'options':Array.isArray(question?.o)?'o':null;
  return key?{key,options:question[key],answerKey:key==='options'?'answer':'a'}:{key:null,options:[],answerKey:null};
}

function placeCorrectOption(question,target){
  const meta=readQuestionOptions(question);
  const options=meta.options;
  const correctIndex=Number(question?.[meta.answerKey]);
  if(!meta.key||options.length<2||correctIndex<0||correctIndex>=options.length)return question;
  const correct=options[correctIndex];
  const distractors=options.filter((_,i)=>i!==correctIndex);
  const shuffledDistractors=shuffleList(distractors);
  const output=[];
  let d=0;
  for(let i=0;i<options.length;i++)output.push(i===target?correct:shuffledDistractors[d++]);
  return {...question,[meta.key]:output,[meta.answerKey]:target};
}

export function prepareBalancedQuestions(source,limit){
  const safeSource=Array.isArray(source)?source:[];
  const selected=shuffleList(safeSource).slice(0,Math.max(0,limit));
  const groups=new Map();
  selected.forEach((question,index)=>{
    const size=readQuestionOptions(question).options.length;
    if(size>1){
      if(!groups.has(size))groups.set(size,[]);
      groups.get(size).push(index);
    }
  });
  const targets=Array(selected.length).fill(null);
  for(const [size,indices] of groups.entries()){
    const plan=buildPatternSafePlan(indices.length,size);
    indices.forEach((questionIndex,i)=>{targets[questionIndex]=plan[i];});
  }
  return selected.map((question,index)=>targets[index]===null?question:placeCorrectOption(question,targets[index]));
}
