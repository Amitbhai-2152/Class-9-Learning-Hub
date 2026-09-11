import assert from 'node:assert/strict';

const store=new Map();
globalThis.localStorage={getItem:key=>store.has(key)?store.get(key):null,setItem:(key,value)=>store.set(key,String(value)),removeItem:key=>store.delete(key)};

const {XP_SCHEMA_VERSION,XP_KEY,XP_LEDGER_KEY,XP_MAX_EVENT,awardXP,getXPState,getXPLedger,validateXPRequest,makeXPEventId,calculateXPLevel,xpStateToSupabaseSnapshot}=await import('../src/engines/xp/xpStore.js');
const {validateXPSupabaseContract}=await import('../src/engines/xp/xpSupabaseContract.js');

assert.equal(XP_SCHEMA_VERSION,1);
assert.equal(XP_MAX_EVENT,100);
assert.equal(validateXPRequest({amount:25,eventId:'xp:math:topic:practice:a1',source:'practice',stage:'practice'}).valid,true);
assert.equal(validateXPRequest({amount:0,eventId:'xp:math:a1',source:'practice',stage:'practice'}).valid,false);
assert.equal(validateXPRequest({amount:101,eventId:'xp:math:a1',source:'practice',stage:'practice'}).valid,false);
assert.equal(validateXPRequest({amount:5,eventId:'bad id',source:'practice',stage:'practice'}).valid,false);
assert.equal(validateXPRequest({amount:5,eventId:'xp:math:a1',source:'unknown'}).valid,false);

store.set('class9-progress',JSON.stringify({xp:275,dailyXp:40,goal:100,streak:3}));
const migrated=getXPState();
assert.equal(migrated.totalXp,275);
assert.equal(migrated.lifetimeXp,275);
assert.equal(migrated.dailyXp,40);
assert.equal(migrated.openingBalance,275);

const eventId=makeXPEventId({activityId:'attempt-001',subjectId:'math',topicId:'math-01',stage:'practice'});
assert.equal(eventId,'xp:math:math-01:practice:attempt-001');
const first=awardXP({amount:25,eventId,source:'practice',subjectId:'math',topicId:'math-01',stage:'practice',metadata:{questions:10}});
assert.equal(first.awarded,25);
assert.equal(first.duplicate,false);
assert.equal(first.state.totalXp,300);
assert.equal(first.state.dailyXp,65);
assert.equal(getXPLedger().length,1);

const replay=awardXP({amount:25,eventId,source:'practice',subjectId:'math',topicId:'math-01',stage:'practice'});
assert.equal(replay.awarded,0);
assert.equal(replay.duplicate,true);
assert.equal(replay.conflict,false);
assert.equal(getXPState().totalXp,300);

const conflict=awardXP({amount:20,eventId,source:'practice',subjectId:'math',topicId:'math-01',stage:'practice'});
assert.equal(conflict.awarded,0);
assert.equal(conflict.duplicate,true);
assert.equal(conflict.conflict,true);
assert.equal(getXPState().totalXp,300);

const rejected=awardXP({amount:125,eventId:'xp:math:math-01:practice:attempt-002',source:'practice',subjectId:'math',topicId:'math-01',stage:'practice'});
assert.equal(rejected.rejected,true);
assert.equal(getXPState().totalXp,300);

assert.deepEqual(calculateXPLevel(0),{level:1,inLevel:0,nextLevelXp:250,percent:0});
assert.deepEqual(calculateXPLevel(250),{level:2,inLevel:0,nextLevelXp:250,percent:0});
assert.equal(calculateXPLevel(375).level,2);
const snapshot=xpStateToSupabaseSnapshot({...getXPState(),events:getXPLedger()},'student-1');
assert.equal(snapshot.schemaVersion,1);
assert.equal(snapshot.wallet.total_xp,300);
assert.equal(snapshot.events.length,1);
assert.equal(snapshot.events[0].event_id,eventId);
assert.equal(localStorage.getItem(XP_KEY)!==null,true);
assert.equal(localStorage.getItem(XP_LEDGER_KEY)!==null,true);

assert.deepEqual(validateXPSupabaseContract(),{schemaVersion:1,walletTable:'xp_wallets',eventTable:'xp_events',sources:7,stages:4,valid:true});

console.log('XP Phase 1 QA passed: migration, strict validation, idempotent replay protection, conflict detection, bounded awards, level helper, and Supabase contract mapping verified.');
