import assert from 'node:assert/strict';
import fs from 'node:fs';
import {SUBJECT_REGISTRY,STAGES,TOTAL_TOPICS} from '../src/subjectProgressRegistry.js';
import {SUPABASE_SCHEMA_VERSION,SUPABASE_TABLES,getSupabaseCatalogRows,canonicalToSupabaseSnapshot,validateSupabaseContract} from '../src/engines/progress/supabaseContract.js';

const sql=fs.readFileSync(new URL('../supabase/001_learning_progress.sql',import.meta.url),'utf8');
for(const table of Object.values(SUPABASE_TABLES))assert(sql.includes(`public.${table}`),`Supabase SQL must define ${table}`);
assert.equal(SUPABASE_SCHEMA_VERSION,1);
assert.deepEqual(STAGES,['learn','practice','challenge','test']);
assert.equal(TOTAL_TOPICS,174);
const rows=getSupabaseCatalogRows();
assert.equal(rows.length,174,'Catalog must contain every canonical topic');
assert.equal(new Set(rows.map(r=>`${r.subject_id}::${r.topic_id}`)).size,174,'Catalog keys must be unique');
assert(sql.includes('foreign key (subject_id, topic_id) references public.subject_topics(subject_id, topic_id)'),'Progress/attempt rows must reference the canonical topic catalog');
assert(sql.includes('unique (student_id, attempt_key)'),'Quiz attempts need idempotent student+attempt keys');
assert(sql.includes("stage in ('practice','challenge','test')"),'Quiz stage constraint must match runtime stages');
assert(sql.includes('enable row level security'),'Supabase tables must enable RLS');
assert(sql.includes('auth.uid() = auth_user_id'),'Student ownership policy must be tied to Supabase Auth');

const canonical={schemaVersion:1,studentId:'anon-test',updatedAt:'2026-09-11T15:00:00.000Z',topics:{
 'math::math-01':{subjectId:'math',topicId:'math-01',title:'संख्या पद्धति',stages:{learn:true,practice:true,challenge:false,test:false},attempts:2,correct:11,analytics:{quizAttempts:2,questionsAnswered:27,questionsTotal:30,correctAnswers:21,bestPercent:80,lastPercent:80,lastAttemptAt:'2026-09-11T14:25:12.000Z',attemptIds:['a1','a2']},lastActivityAt:'2026-09-11T15:00:00.000Z'}
}};
const mapped=canonicalToSupabaseSnapshot(canonical,'anon-test');
assert.equal(mapped.schemaVersion,1);
assert.equal(mapped.catalogRows.length,174);
assert.equal(mapped.topicProgressRows.length,1);
assert.equal(mapped.topicProgressRows[0].learn_complete,true);
assert.equal(mapped.topicProgressRows[0].practice_complete,true);
assert.equal(mapped.topicProgressRows[0].quiz_attempts,2);
assert.equal(mapped.quizAttemptIndex.length,2);
assert.deepEqual(validateSupabaseContract(),{schemaVersion:1,totalTopics:174,stageCount:4,catalogRows:174,uniqueCatalogKeys:174,valid:true});
console.log('Supabase contract QA passed: schema, RLS, canonical catalog mapping, stage/analytics columns, and idempotent attempt-key contract verified.');
