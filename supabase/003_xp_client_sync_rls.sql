-- XP Phase 1 follow-up: allow the authenticated learner to persist
-- their own local-first XP snapshot and ledger during cloud sync.
-- This policy is scoped strictly through the student's auth.uid().

alter table public.xp_wallets enable row level security;
alter table public.xp_events enable row level security;

drop policy if exists xp_wallets_self_insert on public.xp_wallets;
create policy xp_wallets_self_insert on public.xp_wallets
  for insert with check (
    exists (
      select 1 from public.students s
      where s.id = student_id
        and s.auth_user_id = auth.uid()
    )
  );

drop policy if exists xp_wallets_self_update on public.xp_wallets;
create policy xp_wallets_self_update on public.xp_wallets
  for update using (
    exists (
      select 1 from public.students s
      where s.id = student_id
        and s.auth_user_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.students s
      where s.id = student_id
        and s.auth_user_id = auth.uid()
    )
  );

drop policy if exists xp_events_self_insert on public.xp_events;
create policy xp_events_self_insert on public.xp_events
  for insert with check (
    exists (
      select 1 from public.students s
      where s.id = student_id
        and s.auth_user_id = auth.uid()
    )
  );
