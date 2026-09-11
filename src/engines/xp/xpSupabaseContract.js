export const XP_SUPABASE_SCHEMA_VERSION=1;
export const XP_SUPABASE_TABLES=Object.freeze({wallets:'xp_wallets',events:'xp_events'});
export const XP_SUPABASE_SOURCES=Object.freeze(['learn','practice','challenge','test','bonus','system','migration']);
export const XP_SUPABASE_STAGES=Object.freeze(['learn','practice','challenge','test']);

const safeObject=v=>v&&typeof v==='object'&&!Array.isArray(v)?v:{};
const safeInt=v=>Number.isSafeInteger(Number(v))?Number(v):0;

export function xpStateToSupabaseRows(state,studentId){
 const safe=safeObject(state);const sid=String(studentId||safe.studentId||'anonymous');
 const events=Array.isArray(safe.events)?safe.events:[];
 return {
  schemaVersion:XP_SUPABASE_SCHEMA_VERSION,
  wallet:{student_id:sid,total_xp:Math.max(0,safeInt(safe.totalXp)),lifetime_xp:Math.max(0,safeInt(safe.lifetimeXp)),daily_xp:Math.max(0,safeInt(safe.dailyXp)),daily_goal:Math.max(1,safeInt(safe.dailyGoal)||100),day:String(safe.day||''),streak:Math.max(1,safeInt(safe.streak)||1)},
  events:events.map(event=>({student_id:sid,event_id:String(event.eventId),amount:safeInt(event.amount),source:String(event.source),subject_id:event.subjectId||null,topic_id:event.topicId||null,stage:event.stage||null,awarded_at:event.awardedAt||null,metadata:safeObject(event.metadata)}))
 };
}

export function validateXPSupabaseContract(){
 return {schemaVersion:XP_SUPABASE_SCHEMA_VERSION,walletTable:XP_SUPABASE_TABLES.wallets,eventTable:XP_SUPABASE_TABLES.events,sources:XP_SUPABASE_SOURCES.length,stages:XP_SUPABASE_STAGES.length,valid:XP_SUPABASE_SCHEMA_VERSION===1&&XP_SUPABASE_SOURCES.length===7&&XP_SUPABASE_STAGES.length===4};
}
