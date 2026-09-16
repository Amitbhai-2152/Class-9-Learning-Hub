import assert from 'node:assert/strict';

const {mergeXPRoutines}=await import('../src/engines/xp/xpRewards.js');
const {calculateXPLevel}=await import('../src/engines/xp/xpStore.js');

const merged=mergeXPRoutines(
  {
    currentStreak:2,
    bestStreak:2,
    lastActiveDay:'2026-09-15',
    activeDays:2,
    activeDayHistory:['2026-09-14','2026-09-15'],
    claimedLevelRewards:[5],
    claimedStreakRewards:[3],
    updatedAt:'2026-09-15T10:00:00.000Z'
  },
  {
    streak:3,
    best_streak:3,
    last_active_day:'2026-09-16',
    active_days:3,
    active_day_history:['2026-09-14','2026-09-15','2026-09-16'],
    claimed_level_rewards:[10],
    claimed_streak_rewards:[7],
    updated_at:'2026-09-16T10:00:00.000Z'
  }
);

assert.equal(merged.currentStreak,3);
assert.equal(merged.bestStreak,3);
assert.equal(merged.lastActiveDay,'2026-09-16');
assert.equal(merged.activeDays,3);
assert.deepEqual(merged.activeDayHistory,['2026-09-14','2026-09-15','2026-09-16']);
assert.deepEqual(merged.claimedLevelRewards,[5,10]);
assert.deepEqual(merged.claimedStreakRewards,[3,7]);

const level=calculateXPLevel(750);
assert.equal(level.level,4);

const broken=mergeXPRoutines(
  {currentStreak:4,bestStreak:4,lastActiveDay:'2026-09-10',activeDays:4,activeDayHistory:['2026-09-07','2026-09-08','2026-09-09','2026-09-10']},
  {streak:2,best_streak:5,last_active_day:'2026-09-12',active_days:6,active_day_history:['2026-09-11','2026-09-12']}
);
assert.equal(broken.currentStreak,6);
assert.equal(broken.bestStreak,6);
assert.equal(broken.lastActiveDay,'2026-09-12');
assert.equal(broken.activeDays,6);

console.log('Cross-device XP/streak QA passed');
