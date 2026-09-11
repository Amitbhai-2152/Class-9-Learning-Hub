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
assert.deepEqual(initial.activeDayHistory,[]);

const day1=recordXPActivity({at:'2026-09-01T10:00:00'});
assert.equal(day1.updated,true);
assert.equal(day1.routine.currentStreak,1);
assert.deepEqual(day1.routine.activeDayHistory,['2026-09-01']);
const sameDay=recordXPActivity({at:'2026-09-01T20:00:00'});
assert.equal(sameDay.duplicate,true);
assert.equal(sameDay.routine.currentStreak,1);
const rollback=recordXPActivity({at:'2026-08-31T20:00:00'});
assert.equal(rollback.rejected,true);
assert.equal(rollback.routine.lastActiveDay,'2026-09-01');
const day2=recordXPActivity({at:'2026-09-02T10:00:00'});
assert.equal(day2.routine.currentStreak,2);
const day4=recordXPActivity({at:'2026-09-04T10:00:00'});
assert.equal(day4.routine.currentStreak,1);
assert.equal(day4.routine.bestStreak,2);
assert.equal(day4.routine.activeDays,3);
assert.deepEqual(day4.routine.activeDayHistory,['2026-09-01','2026-09-02','2026-09-04']);

const calendar=calculateStreakCalendar({days:7,at:'2026-09-04T12:00:00'});
assert.equal(calendar.days.length,7);
assert.equal(calendar.days.find(x=>x.date==='2026-09-04').active,true);
assert.equal(calendar.days.find(x=>x.date==='2026-09-03').active,false);
assert.equal(calendar.days.find(x=>x.isToday).date,'2026-09-04');

const summaryBefore=getStreakSummary({at:'2026-09-04T12:00:00'});
assert.equal(summaryBefore.current,1);
assert.equal(summaryBefore.best,2);
assert.equal(summaryBefore.activeToday,true);
assert.equal(summaryBefore.nextMilestone,3);
assert.equal(summaryBefore.nextMilestoneIn,2);

const before=getXPState().totalXp;
const levelAwardBase=awardXP({amount:1000,eventId:'xp:test:levelbase',source:'system'});
assert.equal(levelAwardBase.awarded,1000);
const levelRewards=awardLevelRewards({previousXp:before,currentXp:1000});
assert.deepEqual(levelRewards.rewards.map(x=>x.level),[5]);
assert.equal(levelRewards.rewards[0].amount,25);
const levelReplay=awardLevelRewards({previousXp:before,currentXp:1000});
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
const streakReplay=recordActivityAndRewards({at:'2026-09-12T20:00:00',previousXp:getXPState().totalXp,currentXp:getXPState().totalXp,subjectId:'math'});
assert.equal(streakReplay.activity.duplicate,true);
assert.equal(streakReplay.streakReward.awarded,0);
assert.equal(getXPRoutine().currentStreak,3);

const summary=getRewardSummary();
assert.equal(summary.schemaVersion,2);
assert.equal(summary.levelProgress.level>=1,true);
assert.equal(summary.streak.best>=3,true);
assert.equal(summary.streak.activeDays>=6,true);
assert.equal(summary.streak.calendar7.days.length,7);
assert.equal(summary.claimedLevelRewards.includes(5),true);
assert.equal(summary.claimedStreakRewards.includes(3),true);
assert.equal(getXPLedger().filter(e=>e.source==='bonus').every(e=>e.metadata?.rewardVersion===2),true);
assert.equal(getXPLedger().every(e=>e.amount<=100),true);
console.log('XP Phase 3 QA passed: level progression, level reward idempotency, streak deduplication, clock-rollback rejection, missed-day reset, active-day history, calendar view, milestone progress, persistent best streak, streak rewards, and bounded bonus XP verified.');
