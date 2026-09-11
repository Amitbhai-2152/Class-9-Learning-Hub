import assert from 'node:assert/strict';
const store=new Map();
globalThis.localStorage={getItem:key=>store.has(key)?store.get(key):null,setItem:(key,value)=>store.set(key,String(value)),removeItem:key=>store.delete(key)};
globalThis.window={dispatchEvent(){}};
const {calculateLevelProgress,calculateLevelRewards,calculateStreakReward,getXPRoutine,recordXPActivity,calculateStreakCalendar,getStreakSummary,awardLevelRewards,recordActivityAndRewards,getRewardSummary}=await import('../src/engines/xp/xpRewards.js');
const {awardXP,getXPState,getXPLedger}=await import('../src/engines/xp/xpStore.js');

assert.deepEqual(calculateLevelProgress(0),{totalXp:0,level:1,currentLevelXp:0,nextLevelXp:250,percent:0,nextThreshold:250});
assert.equal(calculateLevelProgress(249).level,1);
assert.equal(calculateLevelProgress(250).level,2);
assert.equal(calculateLevelProgress(499).percent,100);
assert.equal(calculateLevelProgress(500).level,3);
assert.deepEqual(calculateLevelRewards(1,10).map(x=>x.level),[5,10]);
assert.deepEqual(calculateLevelRewards(5,5),[]);
assert.deepEqual(calculateStreakReward(3),{eligible:true,streak:3,amount:10,reason:'streak milestone'});
assert.equal(calculateStreakReward(4).eligible,false);

const initial=getXPRoutine();
assert.equal(initial.schemaVersion,2);
assert.equal(initial.currentStreak,0);
assert.equal(initial.bestStreak,0);
assert.deepEqual(initial.activeDayHistory,[]);

assert.equal(recordXPActivity({at:'2026-09-01T10:00:00'}).updated,true);
assert.equal(recordXPActivity({at:'2026-09-01T12:00:00'}).duplicate,true);
assert.equal(recordXPActivity({at:'2026-09-02T10:00:00'}).routine.currentStreak,2);
assert.equal(recordXPActivity({at:'2026-09-04T10:00:00'}).routine.currentStreak,1);
assert.equal(recordXPActivity({at:'2026-09-03T10:00:00'}).rejected,true);

const calendar=calculateStreakCalendar({days:7,at:'2026-09-04T10:00:00'});
assert.equal(calendar.days.length,7);
assert.equal(calendar.days.find(x=>x.isToday).date,'2026-09-04');

const summaryBefore=getStreakSummary({at:'2026-09-04T12:00:00'});
assert.equal(summaryBefore.current,1);
assert.equal(summaryBefore.best,2);
assert.equal(summaryBefore.activeToday,true);
assert.equal(summaryBefore.nextMilestone,3);
assert.equal(summaryBefore.nextMilestoneIn,2);

const before=getXPState().totalXp;
for(let i=0;i<10;i++){
 const result=awardXP({amount:100,eventId:`xp:test:levelbase:${i}`,source:'system'});
 assert.equal(result.awarded,100);
}
const targetXp=before+1000;
const levelRewards=awardLevelRewards({previousXp:before,currentXp:targetXp});
assert.deepEqual(levelRewards.rewards.map(x=>x.level),[5]);
assert.equal(levelRewards.rewards[0].amount,25);
const levelReplay=awardLevelRewards({previousXp:before,currentXp:targetXp});
assert.deepEqual(levelReplay.rewards,[]);

const streakRun1=recordActivityAndRewards({at:'2026-09-10T10:00:00',previousXp:getXPState().totalXp,currentXp:getXPState().totalXp,subjectId:'math'});
assert.equal(streakRun1.activity.updated,true);
assert.equal(streakRun1.streakReward.awarded,0);
const streakRun2=recordActivityAndRewards({at:'2026-09-11T10:00:00',previousXp:getXPState().totalXp,currentXp:getXPState().totalXp,subjectId:'math'});
assert.equal(streakRun2.activity.routine.currentStreak,2);
assert.equal(streakRun2.streakReward.awarded,0);
const streakRun3=recordActivityAndRewards({at:'2026-09-12T10:00:00',previousXp:getXPState().totalXp,currentXp:getXPState().totalXp,subjectId:'math'});
assert.equal(streakRun3.activity.routine.currentStreak,3);
assert.equal(streakRun3.streakReward.awarded,10);
assert.equal(getRewardSummary().streak.current,3);
assert.equal(getRewardSummary().streak.best,3);
assert.equal(getXPLedger().every(e=>e.amount<=100),true);
console.log('XP Phase 3 QA passed: level progress, bounded XP events, level reward idempotency, streak history, duplicate/rollback/reset handling, calendars, summaries, and streak rewards verified.');
