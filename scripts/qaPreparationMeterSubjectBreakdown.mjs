import assert from 'node:assert/strict';
import {calculateSubjectPreparation,calculatePreparationMeter} from '../src/preparationMeter.js';

const subjects=['math','science','hindi','sanskrit','sst','english','reasoning'];
const topics={};
subjects.forEach((subjectId,index)=>{
  topics[`${subjectId}::${subjectId}-01`]={subjectId,topicId:`${subjectId}-01`,title:`${subjectId} 01`,stages:{learn:true,practice:index%2===0,challenge:false,test:false},analytics:{quizAttempts:1,questionsAnswered:10,questionsTotal:10,correctAnswers:7,bestPercent:70,lastPercent:70}};
  topics[`${subjectId}::${subjectId}-02`]={subjectId,topicId:`${subjectId}-02`,title:`${subjectId} 02`,stages:{learn:true,practice:true,challenge:true,test:true},analytics:{quizAttempts:2,questionsAnswered:20,questionsTotal:20,correctAnswers:18,bestPercent:90,lastPercent:90}};
});

const canonical={schemaVersion:1,topics};
const breakdown=calculateSubjectPreparation(canonical);
assert.equal(breakdown.length,7,'breakdown must contain all seven represented subjects');
assert.deepEqual(breakdown.map(row=>row.subjectId),subjects,'subject order must be deterministic');
for(const row of breakdown){
  assert.equal(row.totalTopics,2);
  assert.equal(row.totalStages,8);
  assert.ok(row.completedStages>=5&&row.completedStages<=8);
  assert.ok(row.coveragePercent>=0&&row.coveragePercent<=100);
  assert.ok(row.performancePercent>=0&&row.performancePercent<=100);
  assert.ok(row.readiness>=0&&row.readiness<=100);
  assert.equal(row.quizAttempts,3);
  assert.equal(row.questionsAnswered,30);
  assert.equal(row.questionsTotal,30);
  assert.equal(row.correctAnswers,25);
  assert.equal(row.topicsStarted,2);
}

const overall=calculatePreparationMeter(canonical);
assert.equal(overall.subjectBreakdown.length,7);
assert.deepEqual(overall.subjectBreakdown,breakdown);
assert.equal(calculateSubjectPreparation({}).length,0);

console.log('✓ Preparation Meter subject breakdown QA passed: 7 subjects, deterministic aggregation, quiz analytics, and readiness bounds.');
