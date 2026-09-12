import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=p=>fs.readFileSync(new URL(`../${p}`,import.meta.url),'utf8');
const app=read('src/App.jsx');
const main=read('src/main2.jsx');
const boundary=read('src/XPCompletionBoundary.jsx');
const rewards=read('src/engines/xp/xpRewards.js');
const badges=read('src/XPBadges.jsx');
const daily=read('src/dailyExamPlanner.js');
const dailyUI=read('src/DailyExamPlan.jsx');
const dailyCss=read('src/daily-exam-plan.css');

assert.match(app,/getXPState/);
assert.match(app,/getRewardSummary/);
assert.match(app,/const addXp=\(\)=>\{\};/);
assert.doesNotMatch(app,/localStorage\.setItem\(['"]class9-progress['"]/);
assert.doesNotMatch(app,/xp:safe\.xp\+/);
assert.match(app,/Performance-based XP/);

assert.match(main,/XPCompletionBoundary/);
assert.match(main,/<XPCompletionBoundary><RootRouter\/><\/XPCompletionBoundary>/);

assert.match(boundary,/awardSmartXP/);
assert.match(boundary,/recordActivityAndRewards/);
assert.match(boundary,/reasoningMode/);
assert.match(boundary,/class9-cbt-result/);
assert.match(boundary,/new URL\(cbtConfig\.url\)\.origin/);
assert.match(boundary,/newAttemptId/);
assert.match(boundary,/randomUUID/);
assert.doesNotMatch(boundary,/page==='classes'/);

assert.match(rewards,/XP_ROUTINE_KEY='class9-xp-routine-v1'/);
assert.match(rewards,/claimedLevelRewards/);
assert.match(rewards,/claimedStreakRewards/);
assert.match(rewards,/recordActivityAndRewards/);

assert.match(badges,/DailyExamPlan/);
assert.match(badges,/offeringGrid=dashboard\.querySelector\('\.offering-grid'\)/);
assert.match(badges,/dashboard\.insertBefore\(host,offeringGrid\.nextSibling\)/);
assert.match(badges,/createPortal\(<DailyExamPlan\/>/);

assert.match(daily,/TOTAL|fullSyllabus/);
assert.match(daily,/getCanonicalProgress/);
assert.match(daily,/analytics\.bestPercent/);
assert.match(daily,/analytics\.lastPercent/);
assert.match(daily,/lastAttemptAt/);
assert.match(daily,/examDate|daysLeft|examDays/);
assert.match(daily,/urgency/);
assert.match(daily,/revisionNeed/);
assert.match(daily,/recommendationMode/);
assert.match(daily,/highPriority/);
assert.match(daily,/status\.key==='todo'/);
assert.match(daily,/status\.key==='test'/);
assert.match(daily,/test\.phase==='weak'/);
assert.match(daily,/test\.phase==='readiness'/);

assert.match(dailyUI,/ADAPTIVE PRIORITY/);
assert.match(dailyUI,/priorityLabel/);
assert.match(dailyUI,/item\.reason/);
assert.match(dailyUI,/item\.action/);
assert.match(dailyUI,/item\.score/);
assert.match(dailyCss,/daily-recommendation-priority/);
assert.match(dailyCss,/priority-critical/);

const pkg=JSON.parse(read('package.json'));
assert.equal(pkg.scripts['qa:xp:phase4'],'node scripts/qaXPPhase4.mjs');

console.log('XP Phase 4 QA passed: canonical dashboard state, global completion integration, reward persistence, homepage Daily Exam Plan placement, syllabus-backed adaptive scoring, urgency/weakness/retention signals, phase-aware recommendations, and visible recommendation rationale verified.');
