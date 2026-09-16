-- Cross-device XP/streak sync hardening.
-- Keeps the existing local-first XP architecture while persisting the full
-- streak routine in the authenticated student's XP wallet.

alter table public.xp_wallets
  add column if not exists best_streak integer not null default 1 check (best_streak >= 1),
  add column if not exists last_active_day date,
  add column if not exists active_days integer not null default 0 check (active_days >= 0),
  add column if not exists active_day_history jsonb not null default '[]'::jsonb,
  add column if not exists claimed_level_rewards jsonb not null default '[]'::jsonb,
  add column if not exists claimed_streak_rewards jsonb not null default '[]'::jsonb;

-- The existing xp_wallets self-select/insert/update policies remain in force.
-- No new policy is required because these columns live on that same protected row.
