-- Medejoni partner referral tracking.
-- Run once in Supabase: SQL Editor -> New query -> paste this whole file -> Run.
-- Safe to run again (it does not delete data).

-- 1) Partners. A new partner = a new row here (no code change). is_active = false stops new visits being counted.
create table if not exists public.referral_partners (
  id uuid primary key default gen_random_uuid(),
  code text not null unique check (code ~ '^[a-z0-9_-]{1,40}$'),
  name text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

insert into public.referral_partners (code, name) values ('agal', 'Agal')
on conflict (code) do nothing;

-- 2) Visits: one row per visit that arrived through a partner link (refreshes and page changes are not counted again).
create table if not exists public.referral_visits (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.referral_partners(id),
  visitor_id uuid not null,          -- anonymous random id per browser (no personal details, no IP)
  landing_page text,
  referrer_url text,
  device_type text,                  -- mobile / tablet / desktop
  visited_at timestamptz not null default now()
);
create index if not exists referral_visits_partner_idx on public.referral_visits (partner_id, visited_at);
create index if not exists referral_visits_visitor_idx on public.referral_visits (visitor_id);

-- 3) Security: nobody can read or write these tables from a browser. Only the site's server
--    (with the secret service_role key) writes, and you see the data in the Table Editor.
alter table public.referral_partners enable row level security;
alter table public.referral_visits enable row level security;

-- 4) The site's server calls this. It only saves visits for partners that exist and are active.
create or replace function public.log_referral_visit(
  p_code text, p_visitor_id uuid, p_landing_page text, p_referrer text, p_device text
) returns void
language sql
security definer
set search_path = public
as $$
  insert into referral_visits (partner_id, visitor_id, landing_page, referrer_url, device_type)
  select id, p_visitor_id, left(p_landing_page, 300), left(p_referrer, 500), left(p_device, 10)
  from referral_partners
  where code = lower(p_code) and is_active;
$$;
revoke all on function public.log_referral_visit(text, uuid, text, text, text) from public, anon, authenticated;
grant execute on function public.log_referral_visit(text, uuid, text, text, text) to service_role;

-- 5) Ready-made reports (Table Editor shows them, or: select * from referral_report;)
create or replace view public.referral_daily with (security_invoker = true) as
select (v.visited_at at time zone 'America/Bogota')::date as day,
       p.name as partner,
       count(*) as visits,
         count(distinct v.visitor_id) as unique_visitors
from referral_visits v join referral_partners p on p.id = v.partner_id
group by 1, 2
order by 1 desc, 2;

-- 6) WhatsApp clicks: every tap on a WhatsApp button on the site (from any visitor).
--    partner_id is filled when the visitor came through a partner link in the last 30 days.
--    A click only means the visitor opened WhatsApp, not that they sent a message or booked.
create table if not exists public.whatsapp_clicks (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid references public.referral_partners(id),
  visitor_id uuid,
  page text,
  device_type text,
  clicked_at timestamptz not null default now()
);
create index if not exists whatsapp_clicks_partner_idx on public.whatsapp_clicks (partner_id, clicked_at);
alter table public.whatsapp_clicks enable row level security;

create or replace function public.log_whatsapp_click(
  p_visitor_id uuid, p_page text, p_partner_code text, p_device text
) returns void
language sql
security definer
set search_path = public
as $$
  insert into whatsapp_clicks (partner_id, visitor_id, page, device_type)
  values (
    (select id from referral_partners where code = lower(p_partner_code) and is_active),
    p_visitor_id, left(p_page, 300), left(p_device, 10)
  );
$$;
revoke all on function public.log_whatsapp_click(uuid, text, text, text) from public, anon, authenticated;
grant execute on function public.log_whatsapp_click(uuid, text, text, text) to service_role;

-- Partner report with WhatsApp clicks (counted separately, so nothing is double counted).
create or replace view public.referral_report with (security_invoker = true) as
select p.name as partner,
       coalesce(v.visits, 0) as visits,
       coalesce(v.unique_visitors, 0) as unique_visitors,
       coalesce(v.returning_visitors, 0) as returning_visitors,
       coalesce(w.clicks, 0) as whatsapp_clicks,
       v.last_visit
from referral_partners p
left join (
  select partner_id, sum(n)::bigint as visits, count(*) as unique_visitors,
         count(*) filter (where n > 1) as returning_visitors, max(last_visit) as last_visit
  from (select partner_id, visitor_id, count(*) as n, max(visited_at) as last_visit
        from referral_visits group by partner_id, visitor_id) per_visitor
  group by partner_id
) v on v.partner_id = p.id
left join (select partner_id, count(*) as clicks from whatsapp_clicks group by partner_id) w on w.partner_id = p.id;
