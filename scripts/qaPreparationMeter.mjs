import assert from 'node:assert/strict';
import {calculatePreparationMeter} from '../src/preparationMeter.js';
import {STAGES} from '../src/subjectProgressRegistry.js';

const base={schemaVersion:1,topics:{}};
assert.deepEqual(calculatePreparationMeter(base),{
  readiness:0,coveragePercent:0,performancePercent:0,bestPercent:0,
  completedStages:0,totalStages:0,topicsStarted:0,totalTopics:0,
  quizAttempts:0,questionsAnswered:0,questionsTotal:0,correctAnswers:0,
  hasPerformanceData:false,label:'अभी तैयारी शुरू करें'
});

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

const allStages={...topic,stages:{learn:true,practice:true,challenge:true,test:true},analytics:{quizAttempts:1,questionsAnswered:10,questionsTotal:10,correctAnswers:10,bestPercent:100}};
const perfect=calculatePreparationMeter({...base,topics:{'math::math-01':allStages}});
assert.equal(perfect.readiness,100);
assert.equal(perfect.coveragePercent,100);
assert.equal(perfect.performancePercent,100);
assert.equal(perfect.label,'परीक्षा के लिए मजबूत तैयारी');

const missingAnalytics=calculatePreparationMeter({...base,topics:{'math::math-01':{stages:{learn:true,practice:true},analytics:{}}}});
assert.equal(missingAnalytics.readiness,33);
assert.equal(missingAnalytics.hasPerformanceData,false);

console.log(`Preparation Meter QA passed: readiness=${result.readiness}, coverage=${result.coveragePercent}, performance=${result.performancePercent}`);
