create extension if not exists "pgcrypto";

create table if not exists public.portfolio_data (
  id boolean primary key default true check (id),
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.owl_post_messages (
  id uuid primary key default gen_random_uuid(),
  sender_name text not null check (char_length(sender_name) between 2 and 100),
  sender_email text not null check (char_length(sender_email) between 3 and 254),
  subject text not null default 'Inquiry from GM Mercullo Portfolio',
  message text not null check (char_length(message) between 10 and 5000),
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade
);

alter table public.portfolio_data enable row level security;
alter table public.owl_post_messages enable row level security;

create policy "Public can read portfolio data"
  on public.portfolio_data for select using (true);

create policy "Admins can write portfolio data"
  on public.portfolio_data for all to authenticated
  using (exists (select 1 from public.admin_users where user_id = auth.uid()))
  with check (exists (select 1 from public.admin_users where user_id = auth.uid()));

create policy "Anyone can submit an owl post"
  on public.owl_post_messages for insert with check (true);

create policy "Admins can read owl posts"
  on public.owl_post_messages for select to authenticated
  using (exists (select 1 from public.admin_users where user_id = auth.uid()));

create policy "Admins can update owl posts"
  on public.owl_post_messages for update to authenticated
  using (exists (select 1 from public.admin_users where user_id = auth.uid()))
  with check (exists (select 1 from public.admin_users where user_id = auth.uid()));

create policy "Admins can delete owl posts"
  on public.owl_post_messages for delete to authenticated
  using (exists (select 1 from public.admin_users where user_id = auth.uid()));
