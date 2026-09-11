import assert from 'node:assert/strict';
import {SUBJECT_REGISTRY,TOTAL_TOPICS,STAGES,resolveSubject,resolveTopic} from '../src/subjectProgressRegistry.js';

const store=new Map();
globalThis.localStorage={getItem:key=>store.has(key)?store.get(key):null,setItem:(key,value)=>store.set(key,String(value)),removeItem:key=>store.delete(key)};
globalThis.window={dispatchEvent:()=>{}};
globalThis.CustomEvent=class CustomEvent{constructor(type){this.type=type;}};

const {recordCanonicalStage,recordCanonicalQuizAttempt,getCanonicalProgress}=await import('../src/engines/progress/progressStore.js');
assert.equal(SUBJECT_REGISTRY.length,7,'Expected 7 subjects');
assert.equal(TOTAL_TOPICS,174,'Expected 174 canonical topics');
assert.deepEqual(STAGES,['learn','practice','challenge','test']);

let stagePaths=0;
let quizPaths=0;
const expectedQuizStages=new Set(['practice','challenge','test']);

for(const subject of SUBJECT_REGISTRY){
  assert(subject.id&&subject.name,'Every subject must have an id and name');
  assert(subject.topics.length>0,`${subject.id} has no topics`);
  for(const topic of subject.topics){
    assert.equal(resolveSubject(subject.id)?.id,subject.id,`Subject resolver failed for ${subject.id}`);
    assert.equal(resolveTopic(subject,topic.id)?.id,topic.id,`Topic resolver failed for ${subject.id}/${topic.id}`);
    for(const stage of STAGES){
      const at=`2026-09-11T20:${String(stagePaths%60).padStart(2,'0')}:00.000Z`;
      const result=recordCanonicalStage({subject:subject.id,chapter:topic.id,stage,at});
      assert.equal(result?.subjectId,subject.id,`Stage write failed subject for ${subject.id}/${topic.id}/${stage}`);
      assert.equal(result?.topicId,topic.id,`Stage write failed topic for ${subject.id}/${topic.id}/${stage}`);
      assert.equal(result?.stages?.[stage],true,`Stage was not persisted: ${subject.id}/${topic.id}/${stage}`);
      stagePaths++;
      if(expectedQuizStages.has(stage)){
        const before=recordCanonicalStage({subject:subject.id,chapter:topic.id,stage,at});
        const beforeAttempts=before?.analytics?.quizAttempts||0;
        const attemptId=`runtime-${subject.id}-${topic.id}-${stage}`;
        const quiz=recordCanonicalQuizAttempt({subject:subject.id,chapter:topic.id,stage,attemptId,questionsAnswered:15,questionsTotal:15,correctAnswers:stage==='practice'?9:stage==='challenge'?11:12,percent:stage==='practice'?60:stage==='challenge'?73:80,at});
        assert.equal(quiz?.analytics?.quizAttempts,beforeAttempts+1,`Quiz analytics increment failed: ${subject.id}/${topic.id}/${stage}`);
        assert.equal(quiz?.analytics?.questionsAnswered,before?.analytics?.questionsAnswered||0+15);
        quizPaths++;
      }
    }
  }
}

const canonical=getCanonicalProgress();
assert.equal(Object.keys(canonical.topics).length,TOTAL_TOPICS,'Canonical topic count mismatch after runtime audit');
for(const subject of SUBJECT_REGISTRY){
  for(const topic of subject.topics){
    const row=canonical.topics[`${subject.id}::${topic.id}`];
    assert(row,`Missing canonical record: ${subject.id}/${topic.id}`);
    assert.deepEqual(row.stages,{learn:true,practice:true,challenge:true,test:true},`Incomplete stages: ${subject.id}/${topic.id}`);
    assert.equal(row.analytics.quizAttempts,3,`Expected three quiz analytics records: ${subject.id}/${topic.id}`);
    assert.equal(row.analytics.questionsAnswered,45);
    assert.equal(row.analytics.questionsTotal,45);
    assert.equal(row.analytics.correctAnswers,32);
    assert.equal(row.analytics.bestPercent,80);
    assert.equal(row.analytics.lastPercent,80);
  }
}

assert.equal(stagePaths,TOTAL_TOPICS*STAGES.length,'Runtime stage-path total must be 696');
assert.equal(quizPaths,TOTAL_TOPICS*3,'Runtime quiz-path total must be 522');
console.log(`Subject runtime QA passed: ${stagePaths} canonical stage paths (${TOTAL_TOPICS} topics × ${STAGES.length} stages), ${quizPaths} quiz analytics paths, all persisted and fully resolvable.`);
