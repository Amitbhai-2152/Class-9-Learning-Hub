create extension if not exists pgcrypto;

-- Phase 6: backend-ready, local-first learning progress schema.
-- The browser remains the source of truth until a Supabase client is configured.
create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users(id) on delete set null,
  anonymous_student_id text unique not null,
  schema_version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subject_topics (
  subject_id text not null,
  topic_id text not null,
  title text not null,
  topic_order integer not null,
  created_at timestamptz not null default now(),
  primary key (subject_id, topic_id),
  unique (subject_id, topic_order)
);

create table if not exists public.topic_progress (
  student_id uuid not null references public.students(id) on delete cascade,
  subject_id text not null,
  topic_id text not null,
  learn_complete boolean not null default false,
  practice_complete boolean not null default false,
  challenge_complete boolean not null default false,
  test_complete boolean not null default false,
  attempts integer not null default 0 check (attempts >= 0),
  correct integer not null default 0 check (correct >= 0),
  quiz_attempts integer not null default 0 check (quiz_attempts >= 0),
  questions_answered integer not null default 0 check (questions_answered >= 0),
  questions_total integer not null default 0 check (questions_total >= 0),
  correct_answers integer not null default 0 check (correct_answers >= 0),
  best_percent numeric(5,2) not null default 0 check (best_percent between 0 and 100),
  last_percent numeric(5,2) not null default 0 check (last_percent between 0 and 100),
  last_attempt_at timestamptz,
  last_activity_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (student_id, subject_id, topic_id),
  foreign key (subject_id, topic_id) references public.subject_topics(subject_id, topic_id) on delete restrict
);

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  subject_id text not null,
  topic_id text not null,
  stage text not null check (stage in ('practice','challenge','test')),
  attempt_key text not null,
  questions_answered integer not null default 0 check (questions_answered >= 0),
  questions_total integer not null default 0 check (questions_total >= questions_answered),
  correct_answers integer not null default 0 check (correct_answers >= 0 and correct_answers <= questions_answered),
  percent numeric(5,2) not null default 0 check (percent between 0 and 100),
  attempted_at timestamptz not null,
  created_at timestamptz not null default now(),
  unique (student_id, attempt_key),
  foreign key (subject_id, topic_id) references public.subject_topics(subject_id, topic_id) on delete restrict
);

create index if not exists topic_progress_subject_idx on public.topic_progress(student_id, subject_id);
create index if not exists quiz_attempts_topic_idx on public.quiz_attempts(student_id, subject_id, topic_id, attempted_at desc);

-- Supabase RLS template: authenticated users may access only their own student row.
alter table public.students enable row level security;
alter table public.topic_progress enable row level security;
alter table public.quiz_attempts enable row level security;

 drop policy if exists students_self_select on public.students;
create policy students_self_select on public.students for select using (auth.uid() = auth_user_id);
drop policy if exists students_self_insert on public.students;
create policy students_self_insert on public.students for insert with check (auth.uid() = auth_user_id);
drop policy if exists students_self_update on public.students;
create policy students_self_update on public.students for update using (auth.uid() = auth_user_id) with check (auth.uid() = auth_user_id);

drop policy if exists progress_self_select on public.topic_progress;
create policy progress_self_select on public.topic_progress for select using (exists (select 1 from public.students s where s.id = student_id and s.auth_user_id = auth.uid()));
drop policy if exists progress_self_insert on public.topic_progress;
create policy progress_self_insert on public.topic_progress for insert with check (exists (select 1 from public.students s where s.id = student_id and s.auth_user_id = auth.uid()));
drop policy if exists progress_self_update on public.topic_progress;
create policy progress_self_update on public.topic_progress for update using (exists (select 1 from public.students s where s.id = student_id and s.auth_user_id = auth.uid())) with check (exists (select 1 from public.students s where s.id = student_id and s.auth_user_id = auth.uid()));

drop policy if exists attempts_self_select on public.quiz_attempts;
create policy attempts_self_select on public.quiz_attempts for select using (exists (select 1 from public.students s where s.id = student_id and s.auth_user_id = auth.uid()));
drop policy if exists attempts_self_insert on public.quiz_attempts;
create policy attempts_self_insert on public.quiz_attempts for insert with check (exists (select 1 from public.students s where s.id = student_id and s.auth_user_id = auth.uid()));

-- subject_topics is a public catalog; it is intentionally read-only from the app.
alter table public.subject_topics enable row level security;
drop policy if exists subject_topics_public_read on public.subject_topics;
create policy subject_topics_public_read on public.subject_topics for select using (true);
