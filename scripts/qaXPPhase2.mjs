import assert from 'node:assert/strict';
const store=new Map();
globalThis.localStorage={getItem:key=>store.has(key)?store.get(key):null,setItem:(key,value)=>store.set(key,String(value)),removeItem:key=>store.delete(key)};
globalThis.window={dispatchEvent(){}};
const {calculateStageXP,calculateMilestoneXP,buildSmartXPRequest,awardSmartXP,awardMilestoneXP}=await import('../src/engines/xp/xpRules.js');
const {getXPState,getXPLedger}=await import('../src/engines/xp/xpStore.js');

assert.deepEqual(calculateStageXP('learn',{completed:false},0).eligible,false);
assert.equal(calculateStageXP('learn',{completed:true},0).amount,10);
assert.equal(calculateStageXP('learn',{completed:true},1).amount,0);
assert.equal(calculateStageXP('practice',{completed:true,correctAnswers:0,questionsTotal:10},0).amount,5);
assert.equal(calculateStageXP('practice',{completed:true,correctAnswers:10,questionsTotal:10},0).amount,25);
assert.equal(calculateStageXP('challenge',{completed:true,correctAnswers:8,questionsTotal:10},0).amount,31);
assert.equal(calculateStageXP('test',{completed:true,correctAnswers:10,questionsTotal:10},0).amount,40);
assert.equal(calculateStageXP('test',{completed:true,correctAnswers:10,questionsTotal:10},3).amount,0);
assert.equal(calculateStageXP('bad',{completed:true},0).eligible,false);

assert.deepEqual(calculateMilestoneXP({completed:true,milestoneId:'math:chapter-1'}),{eligible:true,amount:20,reason:'milestone completed'});
assert.equal(calculateMilestoneXP({completed:true,milestoneId:''}).eligible,false);
assert.equal(buildSmartXPRequest({stage:'practice',activityId:'a1',subjectId:'math',topicId:'math-1',result:{completed:true,correctAnswers:5,questionsTotal:10}}).amount,15);
assert.equal(buildSmartXPRequest({stage:'practice',activityId:'',result:{completed:true}}).eligible,false);

const first=awardSmartXP({stage:'practice',activityId:'attempt-1',subjectId:'math',topicId:'math-1',result:{completed:true,correctAnswers:10,questionsTotal:10}});
assert.equal(first.awarded,25);
const second=awardSmartXP({stage:'practice',activityId:'attempt-1',subjectId:'math',topicId:'math-1',result:{completed:true,correctAnswers:10,questionsTotal:10}});
assert.equal(second.awarded,0);
assert.equal(second.duplicate,true);
const secondAttempt=awardSmartXP({stage:'practice',activityId:'attempt-2',subjectId:'math',topicId:'math-1',result:{completed:true,correctAnswers:10,questionsTotal:10}});
assert.equal(secondAttempt.awarded,25);
const milestone=awardMilestoneXP({milestoneId:'math:chapter-1',subjectId:'math',topicId:'math-1',completed:true});
assert.equal(milestone.awarded,20);
const milestoneReplay=awardMilestoneXP({milestoneId:'math:chapter-1',subjectId:'math',topicId:'math-1',completed:true});
assert.equal(milestoneReplay.awarded,0);
assert.equal(milestoneReplay.duplicate,true);
assert.equal(getXPState().totalXp,70);
assert.equal(getXPLedger().length,3);
assert.equal(getXPLedger().every(e=>e.metadata?.ruleVersion===1),true);
assert.equal(getXPLedger().every(e=>e.amount<=100),true);
console.log('XP Phase 2 QA passed: stage rules, performance bonuses, completion gating, repeat-attempt decay, milestone idempotency, bounded rewards, and rule-version traceability verified.');
