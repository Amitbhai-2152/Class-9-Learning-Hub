import assert from 'node:assert/strict';
import {calculatePreparationMeter} from '../src/preparationMeter.js';
import {STAGES} from '../src/subjectProgressRegistry.js';

const base={schemaVersion:1,topics:{}};
const empty=calculatePreparationMeter(base);
assert.equal(empty.readiness,0);
assert.equal(empty.coveragePercent,0);
assert.equal(empty.performancePercent,0);
assert.equal(empty.bestPercent,0);
assert.equal(empty.completedStages,0);
assert.equal(empty.totalStages,0);
assert.equal(empty.topicsStarted,0);
assert.equal(empty.totalTopics,0);
assert.equal(empty.quizAttempts,0);
assert.equal(empty.questionsAnswered,0);
assert.equal(empty.questionsTotal,0);
assert.equal(empty.correctAnswers,0);
assert.equal(empty.hasPerformanceData,false);
assert.equal(empty.label,'अभी तैयारी शुरू करें');
assert.deepEqual(empty.subjectBreakdown,[]);

const topic={subjectId:'math',topicId:'math-01',title:'संख्या पद्धति',stages:{learn:true,practice:true},analytics:{quizAttempts:2,questionsAnswered:18,questionsTotal:20,correctAnswers:15,bestPercent:90,lastPercent:80}};
const one={...base,topics:{'math::math-01':topic}};
const result=calculatePreparationMeter(one);
assert.equal(result.totalStages,STAGES.length);
assert.equal(result.completedStages,2);
assert.equal(result.coveragePercent,50);
assert.equal(result.performancePercent,83);
assert.equal(result.bestPercent,90);
assert.equal(result.quizAttempts,2);
assert.equal(result.questionsAnswered,18);
assert.equal(result.correctAnswers,15);
assert.equal(result.hasPerformanceData,true);
assert.equal(result.readiness,62);
assert.equal(result.label,'अच्छी प्रगति');
assert.equal(result.subjectBreakdown.length,1);
assert.deepEqual(result.subjectBreakdown[0],{subjectId:'math',coveragePercent:50,performancePercent:83,readiness:62,completedStages:2,totalStages:4,topicsStarted:1,totalTopics:1,quizAttempts:2,questionsAnswered:18,questionsTotal:20,correctAnswers:15,hasPerformanceData:true});

const allStages={...topic,stages:{learn:true,practice:true,challenge:true,test:true},analytics:{quizAttempts:1,questionsAnswered:10,questionsTotal:10,correctAnswers:10,bestPercent:100}};
const perfect=calculatePreparationMeter({...base,topics:{'math::math-01':allStages}});
assert.equal(perfect.readiness,100);
assert.equal(perfect.coveragePercent,100);
assert.equal(perfect.performancePercent,100);
assert.equal(perfect.label,'परीक्षा के लिए मजबूत तैयारी');

const missingAnalytics=calculatePreparationMeter({...base,topics:{'math::math-01':{stages:{learn:true,practice:true},analytics:{}}}});
assert.equal(missingAnalytics.readiness,33);
assert.equal(missingAnalytics.hasPerformanceData,false);

const subjectIds=['math','science','hindi','sanskrit','sst','english','reasoning'];
const multiTopics={};
subjectIds.forEach((subjectId,index)=>{
  multiTopics[`${subjectId}::01`] = {subjectId,topicId:`${subjectId}-01`,title:subjectId,stages:{learn:true,practice:index%2===0,challenge:false,test:false},analytics:{quizAttempts:1,questionsAnswered:10,questionsTotal:10,correctAnswers:7,bestPercent:70}};
});
const multi=calculatePreparationMeter({...base,topics:multiTopics});
assert.equal(multi.subjectBreakdown.length,7);
assert.deepEqual(multi.subjectBreakdown.map(row=>row.subjectId),subjectIds);
assert.ok(multi.subjectBreakdown.every(row=>row.totalTopics===1&&row.topicsStarted===1&&row.performancePercent===70));

console.log(`Preparation Meter QA passed: readiness=${result.readiness}, coverage=${result.coveragePercent}, performance=${result.performancePercent}, subjects=${multi.subjectBreakdown.length}`);
