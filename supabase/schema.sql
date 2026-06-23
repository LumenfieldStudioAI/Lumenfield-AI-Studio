-- ============================================
-- Lumenfield AI Studio — Supabase Schema
-- Supabase SQL Editor'da çalıştır
-- ============================================

-- 1. Users tablosu
create table if not exists public.users (
  id              uuid primary key default gen_random_uuid(),
  clerk_user_id   text unique not null,
  email           text,
  credits         int default 50 not null,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- 2. Jobs tablosu (üretim geçmişi)
create table if not exists public.jobs (
  id              uuid primary key default gen_random_uuid(),
  clerk_user_id   text not null references public.users(clerk_user_id) on delete cascade,
  request_id      text unique not null,
  model           text not null,
  prompt          text,
  status          text default 'pending' check (status in ('pending','completed','failed')),
  output_url      text,
  thumbnail_url   text,
  credits_cost    int default 4,
  metadata        jsonb,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- 3. Credit transactions (geçmiş)
create table if not exists public.credit_transactions (
  id              uuid primary key default gen_random_uuid(),
  clerk_user_id   text not null,
  amount          int not null,   -- pozitif = ekleme, negatif = harcama
  reason          text,           -- 'purchase', 'generation', 'refund'
  job_id          uuid references public.jobs(id),
  created_at      timestamptz default now()
);

-- 4. İndeksler
create index if not exists idx_jobs_clerk_user on public.jobs(clerk_user_id);
create index if not exists idx_jobs_request on public.jobs(request_id);
create index if not exists idx_jobs_status on public.jobs(status);
create index if not exists idx_credit_tx_user on public.credit_transactions(clerk_user_id);

-- 5. spend_credits fonksiyonu (atomic)
create or replace function public.spend_credits(
  p_clerk_user_id text,
  p_amount        int
)
returns int  -- yeni bakiye döner
language plpgsql
as $$
declare
  v_current int;
  v_new     int;
begin
  select credits into v_current
  from public.users
  where clerk_user_id = p_clerk_user_id
  for update;   -- row lock

  if v_current < p_amount then
    raise exception 'Yetersiz kredi';
  end if;

  v_new := v_current - p_amount;

  update public.users
  set credits = v_new, updated_at = now()
  where clerk_user_id = p_clerk_user_id;

  insert into public.credit_transactions(clerk_user_id, amount, reason)
  values (p_clerk_user_id, -p_amount, 'generation');

  return v_new;
end;
$$;

-- 6. add_credits fonksiyonu
create or replace function public.add_credits(
  p_clerk_user_id text,
  p_amount        int,
  p_reason        text default 'purchase'
)
returns int
language plpgsql
as $$
declare
  v_new int;
begin
  update public.users
  set credits = credits + p_amount, updated_at = now()
  where clerk_user_id = p_clerk_user_id
  returning credits into v_new;

  insert into public.credit_transactions(clerk_user_id, amount, reason)
  values (p_clerk_user_id, p_amount, p_reason);

  return v_new;
end;
$$;

-- 7. RLS (Row Level Security)
alter table public.users enable row level security;
alter table public.jobs enable row level security;

-- Service role her şeyi okuyabilir (API route'lar için)
-- (service_role zaten RLS'yi bypass eder)
