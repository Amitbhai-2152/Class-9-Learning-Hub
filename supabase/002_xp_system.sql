-- XP Phase 1: server-ready ledger + wallet contract.
-- The browser may use local-first XP today; Supabase can become authoritative later through award_xp().

create table if not exists public.xp_wallets (
  student_id uuid primary key references public.students(id) on delete cascade,
  total_xp bigint not null default 0 check (total_xp >= 0),
  lifetime_xp bigint not null default 0 check (lifetime_xp >= total_xp),
  daily_xp integer not null default 0 check (daily_xp >= 0),
  daily_goal integer not null default 100 check (daily_goal > 0),
  day date not null default current_date,
  streak integer not null default 1 check (streak >= 1),
  updated_at timestamptz not null default now()
);

create table if not exists public.xp_events (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  event_id text not null,
  amount integer not null check (amount between 1 and 100),
  source text not null check (source in ('learn','practice','challenge','test','bonus','system','migration')),
  subject_id text,
  topic_id text,
  stage text check (stage is null or stage in ('learn','practice','challenge','test')),
  awarded_at timestamptz not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (student_id, event_id)
);

create index if not exists xp_events_student_time_idx on public.xp_events(student_id, awarded_at desc);
create index if not exists xp_events_topic_idx on public.xp_events(student_id, subject_id, topic_id, awarded_at desc);

alter table public.xp_wallets enable row level security;
alter table public.xp_events enable row level security;

drop policy if exists xp_wallets_self_select on public.xp_wallets;
create policy xp_wallets_self_select on public.xp_wallets
  for select using (exists (select 1 from public.students s where s.id = student_id and s.auth_user_id = auth.uid()));

drop policy if exists xp_events_self_select on public.xp_events;
create policy xp_events_self_select on public.xp_events
  for select using (exists (select 1 from public.students s where s.id = student_id and s.auth_user_id = auth.uid()));

-- No direct client INSERT/UPDATE policy is provided for XP.
-- The RPC is the future authoritative write path: one idempotent event + one wallet mutation.
create or replace function public.award_xp(
  p_event_id text,
  p_amount integer,
  p_source text,
  p_subject_id text default null,
  p_topic_id text default null,
  p_stage text default null,
  p_awarded_at timestamptz default now(),
  p_metadata jsonb default '{}'::jsonb
) returns public.xp_wallets
language plpgsql
security definer
set search_path = public
as $$
declare
  v_student_id uuid;
  v_wallet public.xp_wallets;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  if p_event_id is null or length(trim(p_event_id)) < 8 or length(p_event_id) > 160 then raise exception 'Invalid event_id'; end if;
  if p_amount is null or p_amount < 1 or p_amount > 100 then raise exception 'XP amount must be between 1 and 100'; end if;
  if p_source is null or p_source not in ('learn','practice','challenge','test','bonus','system','migration') then raise exception 'Invalid XP source'; end if;
  if p_stage is not null and p_stage not in ('learn','practice','challenge','test') then raise exception 'Invalid XP stage'; end if;
  select id into v_student_id from public.students where auth_user_id = auth.uid() limit 1;
  if v_student_id is null then raise exception 'Student profile not found'; end if;

  insert into public.xp_wallets(student_id) values (v_student_id) on conflict (student_id) do nothing;
  select * into v_wallet from public.xp_wallets where student_id = v_student_id for update;

  if exists (select 1 from public.xp_events where student_id = v_student_id and event_id = trim(p_event_id)) then
    return v_wallet;
  end if;

  insert into public.xp_events(student_id,event_id,amount,source,subject_id,topic_id,stage,awarded_at,metadata)
  values(v_student_id,trim(p_event_id),p_amount,p_source,p_subject_id,p_topic_id,p_stage,p_awarded_at,coalesce(p_metadata,'{}'::jsonb));

  update public.xp_wallets
     set total_xp = total_xp + p_amount,
         lifetime_xp = lifetime_xp + p_amount,
         daily_xp = case when day = (p_awarded_at at time zone 'UTC')::date then daily_xp + p_amount else p_amount end,
         day = (p_awarded_at at time zone 'UTC')::date,
         updated_at = now()
   where student_id = v_student_id
   returning * into v_wallet;

  return v_wallet;
end;
$$;

revoke all on function public.award_xp(text,integer,text,text,text,text,timestamptz,jsonb) from public;
grant execute on function public.award_xp(text,integer,text,text,text,text,timestamptz,jsonb) to authenticated;
