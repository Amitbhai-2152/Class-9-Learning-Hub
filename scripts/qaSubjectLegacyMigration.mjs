import assert from 'node:assert/strict';

const store=new Map();
globalThis.localStorage={
  getItem:key=>store.has(key)?store.get(key):null,
  setItem:(key,value)=>store.set(key,String(value)),
  removeItem:key=>store.delete(key)
};
globalThis.window={dispatchEvent:()=>{}};
globalThis.CustomEvent=class CustomEvent{constructor(type){this.type=type;}};

localStorage.setItem('class9-learning-progress',JSON.stringify({
  'math::1':{learn:true,practice:true},
  'math::2':{challenge:true},
  'unknown::404':{test:true},
}));
const mirrored={completed:true,subject:'गणित',chapter:'1',mode:'practice',correct:12,total:15,attempted:15,at:'2026-09-11T14:00:00.000Z'};
localStorage.setItem('class9-progress',JSON.stringify({sessions:[mirrored]}));
localStorage.setItem('class9-sessions',JSON.stringify([mirrored,{completed:true,subject:'गणित',chapter:'2',mode:'test',correct:10,total:15,attempted:15,at:'2026-09-11T14:05:00.000Z'}]));
localStorage.setItem('class9-hindi-chapter-progress-v1',JSON.stringify({modes:{g1:{learn:true,practice:true,challenge:true,test:true}}}));

const mod=await import('../src/engines/progress/progressStore.js?legacy-qa=1');
const first=mod.getCanonicalProgress();
assert.equal(first.migrations.legacyV1,true,'Legacy migration must be marked complete');
assert(Object.keys(first.topics).length>=3,'Legacy stage/session/Hindi records should migrate');
assert.deepEqual(first.topics['math::math-01'].stages,{learn:true,practice:true});
assert.equal(first.topics['math::math-01'].analytics.quizAttempts,1,'Mirrored app/engine session must not double count');
assert.equal(first.topics['math::math-01'].analytics.questionsAnswered,15);
assert.equal(first.topics['math::math-02'].stages.challenge,true);
assert.equal(first.topics['hindi::g1'].stages.learn,true);
assert.equal(first.topics['hindi::g1'].stages.test,true);
assert.equal(first.topics['unknown::unknown']??null,null,'Unresolvable legacy records must not invent canonical topics');

const before=JSON.stringify(first);
mod.migrateLegacyProgressNow();
const after=JSON.stringify(mod.getCanonicalProgress());
assert.equal(after,before,'Repeated migration must be idempotent once legacyV1 is marked');

console.log(`Subject legacy migration QA passed: legacy stores migrate safely, mirrored quiz sessions dedupe, malformed/unresolvable entries do not create phantom topics, and repeated migration is idempotent.`);
