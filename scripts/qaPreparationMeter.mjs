import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {calculatePreparationMeter} from '../src/preparationMeter.js';
import {STAGES} from '../src/subjectProgressRegistry.js';

const base={schemaVersion:1,topics:{}};
const empty=calculatePreparationMeter(base);
assert.equal(empty.readiness,0);
assert.equal(empty.coveragePercent,0);
assert.equal(empty.performancePercent,0);
assert.equal(empty.bestPercent,0);
assert.equal(empty.completedStages,0);
assert.equal(empty.totalStages,174*STAGES.length);
assert.equal(empty.topicsStarted,0);
assert.equal(empty.totalTopics,174);
assert.equal(empty.quizAttempts,0);
assert.equal(empty.questionsAnswered,0);
assert.equal(empty.questionsTotal,0);
assert.equal(empty.correctAnswers,0);
assert.equal(empty.hasPerformanceData,false);
assert.equal(empty.label,'अभी तैयारी शुरू करें');
assert.equal(empty.subjectBreakdown.length,7);
assert.ok(empty.subjectBreakdown.every(row=>row.completedStages===0&&row.totalStages===row.totalTopics*STAGES.length&&row.topicsStarted===0&&row.quizAttempts===0&&row.hasPerformanceData===false));

const topic={subjectId:'math',topicId:'math-01',title:'संख्या पद्धति',stages:{learn:true,practice:true},analytics:{quizAttempts:2,questionsAnswered:18,questionsTotal:20,correctAnswers:15,bestPercent:90,lastPercent:80}};
const one={...base,topics:{'math::math-01':topic}};
const result=calculatePreparationMeter(one);
assert.equal(result.totalStages,174*STAGES.length);
assert.equal(result.completedStages,2);
assert.equal(result.coveragePercent,0);
assert.equal(result.performancePercent,83);
assert.equal(result.bestPercent,90);
assert.equal(result.quizAttempts,2);
assert.equal(result.questionsAnswered,18);
assert.equal(result.correctAnswers,15);
assert.equal(result.hasPerformanceData,true);
assert.equal(result.readiness,29);
assert.equal(result.label,'तैयारी बन रही है');
assert.equal(result.subjectBreakdown.length,7);
const mathRow=result.subjectBreakdown.find(row=>row.subjectId==='math');
assert.deepEqual(mathRow,{subjectId:'math',coveragePercent:3,performancePercent:83,readiness:31,completedStages:2,totalStages:60,topicsStarted:1,totalTopics:15,quizAttempts:2,questionsAnswered:18,questionsTotal:20,correctAnswers:15,hasPerformanceData:true});

const allStages={...topic,stages:{learn:true,practice:true,challenge:true,test:true},analytics:{quizAttempts:1,questionsAnswered:10,questionsTotal:10,correctAnswers:10,bestPercent:100}};
const perfect=calculatePreparationMeter({...base,topics:{'math::math-01':allStages}});
assert.equal(perfect.readiness,35);
assert.equal(perfect.coveragePercent,1);
assert.equal(perfect.performancePercent,100);
assert.equal(perfect.label,'तैयारी बन रही है');

const missingAnalytics=calculatePreparationMeter({...base,topics:{'math::math-01':{stages:{learn:true,practice:true},analytics:{}}}});
assert.equal(missingAnalytics.readiness,0);
assert.equal(missingAnalytics.hasPerformanceData,false);

const subjectIds=['math','science','hindi','sanskrit','sst','english','reasoning'];
const multiTopics={};
subjectIds.forEach((subjectId,index)=>{
  const topicId=`${subjectId}-01`;
  multiTopics[`${subjectId}::${topicId}`] = {subjectId,topicId,title:subjectId,stages:{learn:true,practice:index%2===0,challenge:false,test:false},analytics:{quizAttempts:1,questionsAnswered:10,questionsTotal:10,correctAnswers:7,bestPercent:70}};
});
const multi=calculatePreparationMeter({...base,topics:multiTopics});
assert.equal(multi.subjectBreakdown.length,7);
assert.deepEqual(multi.subjectBreakdown.map(row=>row.subjectId),subjectIds);
assert.ok(multi.subjectBreakdown.every(row=>row.topicsStarted===1&&row.performancePercent===70));

const pageSource=readFileSync(new URL('../src/PreparationMeterPage.jsx',import.meta.url),'utf8');
const responsiveSource=readFileSync(new URL('../src/preparation-meter-responsive.css',import.meta.url),'utf8');
assert.match(pageSource,/NEXT BEST ACTION/);
assert.match(pageSource,/पहले कुछ chapters में Learn और Practice पूरा करें/);
assert.match(pageSource,/primaryWeak\.subject\.name/);
assert.match(pageSource,/सबसे कम readiness अभी/);
assert.match(pageSource,/preparation-meter-page/);
assert.match(pageSource,/preparation-meter-action/);
assert.match(responsiveSource,/@media\(max-width:900px\)/);
assert.match(responsiveSource,/@media\(max-width:640px\)/);
assert.match(responsiveSource,/@media\(max-width:400px\)/);
assert.match(responsiveSource,/grid-template-columns:1fr!important/);
assert.match(responsiveSource,/overflow-x:hidden/);

console.log(`Preparation Meter QA passed: readiness=${result.readiness}, coverage=${result.coveragePercent}, performance=${result.performancePercent}, subjects=${multi.subjectBreakdown.length}`);
