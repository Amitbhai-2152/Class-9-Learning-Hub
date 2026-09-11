import assert from 'node:assert/strict';
import {recordCanonicalStage,recordCanonicalQuizAttempt,getCanonicalProgress,CANONICAL_KEY} from '../src/engines/progress/progressStore.js';

const store=new Map();
globalThis.localStorage={
  getItem:key=>store.has(key)?store.get(key):null,
  setItem:(key,value)=>store.set(key,String(value)),
  removeItem:key=>store.delete(key)
};
globalThis.window={dispatchEvent:()=>{}};
globalThis.CustomEvent=class CustomEvent{constructor(type){this.type=type;}};

const fixedAt='2026-09-11T14:21:12.000Z';
recordCanonicalStage({subject:'गणित',chapter:'1',stage:'learn',at:fixedAt});
const first=recordCanonicalQuizAttempt({subject:'गणित',chapter:'1',stage:'practice',attemptId:'attempt-1',questionsAnswered:12,questionsTotal:15,correctAnswers:9,percent:75,at:fixedAt});
assert.equal(first?.stages?.practice,true,'Quiz attempt must complete its stage');
assert.equal(first?.analytics?.quizAttempts,1);
assert.equal(first?.analytics?.questionsAnswered,12);
assert.equal(first?.analytics?.questionsTotal,15);
assert.equal(first?.analytics?.correctAnswers,9);
assert.equal(first?.analytics?.bestPercent,75);

const duplicate=recordCanonicalQuizAttempt({subject:'गणित',chapter:'1',stage:'practice',attemptId:'attempt-1',questionsAnswered:12,questionsTotal:15,correctAnswers:9,percent:75,at:fixedAt});
assert.equal(duplicate?.analytics?.quizAttempts,1,'Duplicate session sync must be idempotent');
assert.equal(duplicate?.analytics?.questionsAnswered,12);

recordCanonicalQuizAttempt({subject:'गणित',chapter:'1',stage:'practice',attemptId:'attempt-2',questionsAnswered:15,questionsTotal:15,correctAnswers:12,percent:80,at:'2026-09-11T14:25:12.000Z'});
const topic=getCanonicalProgress().topics['math::math-01'];
assert(topic,'Canonical topic must exist');
assert.deepEqual(topic.stages,{learn:true,practice:true});
assert.equal(topic.analytics.quizAttempts,2);
assert.equal(topic.analytics.questionsAnswered,27);
assert.equal(topic.analytics.questionsTotal,30);
assert.equal(topic.analytics.correctAnswers,21);
assert.equal(topic.analytics.bestPercent,80);
assert.equal(topic.analytics.lastPercent,80);
assert.equal(topic.analytics.lastAttemptAt,'2026-09-11T14:25:12.000Z');

const bad=recordCanonicalQuizAttempt({subject:'गणित',chapter:'1',stage:'not-a-stage',attemptId:'bad'});
assert.equal(bad,null,'Invalid stages must be rejected');

console.log(`Subject analytics QA passed: idempotent quiz attempts, aggregate accuracy, stage preservation, and invalid-stage guards. Store key: ${CANONICAL_KEY}`);
