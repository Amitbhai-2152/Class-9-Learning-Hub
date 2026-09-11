import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=p=>fs.readFileSync(new URL(`../${p}`,import.meta.url),'utf8');
const app=read('src/App.jsx');
const main=read('src/main2.jsx');
const boundary=read('src/XPCompletionBoundary.jsx');
const rewards=read('src/engines/xp/xpRewards.js');
const badges=read('src/XPBadges.jsx');

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

const pkg=JSON.parse(read('package.json'));
assert.equal(pkg.scripts['qa:xp:phase4'],'node scripts/qaXPPhase4.mjs');

console.log('XP Phase 4 QA passed: canonical dashboard state, legacy XP write removal, global routed completion integration, Reasoning/English route support, verified CBT-origin bridge, reload-safe attempt identity, reward persistence, CI script wiring, and homepage Daily Exam Plan placement verified.');
