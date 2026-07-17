-- ================================================================
-- Volta Heritage Dance Ensemble — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ================================================================

-- ── Enable UUID extension ─────────────────────────────────────
create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;

-- ================================================================
-- BOOKINGS
-- ================================================================
create table if not exists public.bookings (
  id               uuid primary key default uuid_generate_v4(),
  name             text not null,
  email            text not null,
  phone            text,
  enquiry_type     text not null default 'other',
  event_date       date,
  venue_location   text,
  audience_size    text,
  participant_count text,
  target_age       text,
  group_size       text,
  subject          text not null,
  message          text not null,
  status           text not null default 'pending'
                   check (status in ('pending','confirmed','completed','cancelled')),
  created_at       timestamptz not null default now()
);

-- RLS
alter table public.bookings enable row level security;

-- Drop existing policies if they exist to allow clean re-runs
drop policy if exists "Public can submit bookings" on public.bookings;
drop policy if exists "Admins can read bookings" on public.bookings;
drop policy if exists "Admins can update bookings" on public.bookings;
drop policy if exists "Admins can delete bookings" on public.bookings;

-- Recreate policies
create policy "Public can submit bookings"
  on public.bookings for insert
  with check (true);

create policy "Admins can read bookings"
  on public.bookings for select
  to authenticated
  using (true);

create policy "Admins can update bookings"
  on public.bookings for update
  to authenticated
  using (true);

create policy "Admins can delete bookings"
  on public.bookings for delete
  to authenticated
  using (true);

-- ================================================================
-- EVENTS
-- ================================================================
create table if not exists public.events (
  id           uuid primary key default uuid_generate_v4(),
  title        text not null,
  description  text not null,
  date         date not null,
  end_date     date,
  venue        text not null,
  category     text not null default 'other'
               check (category in ('festival','workshop','exhibition','performance','other')),
  image_url    text not null default '',
  is_featured  boolean not null default false,
  created_at   timestamptz not null default now()
);

alter table public.events enable row level security;

drop policy if exists "Public can read events" on public.events;
drop policy if exists "Admins can insert events" on public.events;
drop policy if exists "Admins can update events" on public.events;
drop policy if exists "Admins can delete events" on public.events;

create policy "Public can read events"
  on public.events for select
  using (true);

create policy "Admins can insert events"
  on public.events for insert
  to authenticated
  with check (true);

create policy "Admins can update events"
  on public.events for update
  to authenticated
  using (true);

create policy "Admins can delete events"
  on public.events for delete
  to authenticated
  using (true);

-- ================================================================
-- SERVICES
-- ================================================================
create table if not exists public.services (
  id          uuid primary key default uuid_generate_v4(),
  title       text not null,
  description text not null,
  icon        text not null default 'Music',
  color       text not null default 'gold'
              check (color in ('gold','red','green')),
  features    text[] not null default '{}',
  created_at  timestamptz not null default now()
);

alter table public.services enable row level security;

drop policy if exists "Public can read services" on public.services;
drop policy if exists "Admins can manage services" on public.services;

create policy "Public can read services"
  on public.services for select
  using (true);

create policy "Admins can manage services"
  on public.services for all
  to authenticated
  using (true)
  with check (true);

-- ================================================================
-- GALLERY
-- ================================================================
create table if not exists public.gallery (
  id            uuid primary key default uuid_generate_v4(),
  type          text not null default 'photo'
                check (type in ('photo','video')),
  url           text not null,
  caption       text not null default '',
  category      text,
  thumbnail_url text,
  storage_path  text,   -- Supabase Storage object path
  created_at    timestamptz not null default now()
);

alter table public.gallery enable row level security;

drop policy if exists "Public can read gallery" on public.gallery;
drop policy if exists "Admins can manage gallery" on public.gallery;

create policy "Public can read gallery"
  on public.gallery for select
  using (true);

create policy "Admins can manage gallery"
  on public.gallery for all
  to authenticated
  using (true)
  with check (true);

-- ================================================================
-- CMS SETTINGS  (single-row config table)
-- ================================================================
create table if not exists public.cms_settings (
  id                    uuid primary key default uuid_generate_v4(),
  site_title            text not null default 'Volta Heritage Dance Ensemble',
  site_description      text not null default 'Preserving and sharing Ewe cultural traditions.',
  contact_email         text not null default 'info@voltaheritage.art',
  contact_phone         text not null default '+233 24 952 7440',
  primary_color_accent  text not null default 'gold'
                        check (primary_color_accent in ('gold','red','green')),
  sections_order        text[] not null default array['hero','events','heritage','about','services','news','connect'],
  section_visibility    jsonb not null default '{"hero":true,"events":true,"heritage":true,"about":true,"services":true,"news":true,"connect":true}',
  hero_content          jsonb not null default '{
    "location": "Ho, Volta Region, Ghana",
    "title": "We Perform to Educate",
    "subtitle": "Volta Heritage Dance Ensemble preserves and shares Ewe cultural traditions through authentic dance, drumming, storytelling, and education.",
    "ctaPrimaryText": "Book Performance",
    "ctaSecondaryText": "Watch Performances",
    "stats": [
      {"value": "20+", "label": "Years Preserving Culture"},
      {"value": "8+",  "label": "Countries Performed In"},
      {"value": "24",  "label": "Active Performers"}
    ]
  }',
  updated_at            timestamptz not null default now()
);

alter table public.cms_settings enable row level security;

drop policy if exists "Public can read cms settings" on public.cms_settings;
drop policy if exists "Admins can update cms settings" on public.cms_settings;

create policy "Public can read cms settings"
  on public.cms_settings for select
  using (true);

create policy "Admins can update cms settings"
  on public.cms_settings for all
  to authenticated
  using (true)
  with check (true);

-- Insert the default row
insert into public.cms_settings (id) values (uuid_generate_v4())
on conflict do nothing;

-- ================================================================
-- ADMIN USERS  (mirrors auth.users with role metadata)
-- ================================================================
create table if not exists public.admin_users (
  id         uuid primary key references auth.users(id) on delete cascade,
  name       text not null,
  email      text not null unique,
  role       text not null default 'contributor'
             check (role in ('admin','editor','contributor')),
  status     text not null default 'active'
             check (status in ('active','invited')),
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

drop policy if exists "Admins can read admin_users" on public.admin_users;
drop policy if exists "Admins can manage admin_users" on public.admin_users;

create policy "Admins can read admin_users"
  on public.admin_users for select
  to authenticated
  using (true);

create policy "Admins can manage admin_users"
  on public.admin_users for all
  to authenticated
  using (true)
  with check (true);

-- ================================================================
-- BLOG POSTS
-- ================================================================
create table if not exists public.blog_posts (
  id            uuid primary key default uuid_generate_v4(),
  title         text not null,
  content       text not null,
  media_type    text not null default 'image' check (media_type in ('image', 'youtube', 'tiktok', 'cloudinary_video')),
  media_url     text,
  is_published  boolean not null default true,
  created_at    timestamptz not null default now()
);

alter table public.blog_posts enable row level security;

drop policy if exists "Public can read blog_posts" on public.blog_posts;
drop policy if exists "Admins can manage blog_posts" on public.blog_posts;

create policy "Public can read blog_posts"
  on public.blog_posts for select
  using (true);

create policy "Admins can manage blog_posts"
  on public.blog_posts for all
  to authenticated
  using (true)
  with check (true);

-- ================================================================
-- SEED DATA — Default Admin User
-- ================================================================

-- Insert user into auth.users (Supabase Auth)
insert into auth.users (instance_id, id, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token)
values (
  '00000000-0000-0000-0000-000000000000',
  'd0d4a96b-bf7b-4b1a-8bb7-e24b7415494a',
  'authenticated',
  'admin@voltaheritage.art',
  crypt('AdminPass123!', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Admin User"}',
  now(),
  now(),
  '',
  '',
  '',
  ''
)
on conflict (id) do nothing;

-- Link profile in public.admin_users
insert into public.admin_users (id, name, email, role, status)
values (
  'd0d4a96b-bf7b-4b1a-8bb7-e24b7415494a',
  'Admin User',
  'admin@voltaheritage.art',
  'admin',
  'active'
)
on conflict (id) do nothing;

-- ================================================================
-- SEED DATA — default events
-- ================================================================
insert into public.events (title, description, date, venue, category, image_url, is_featured) values
(
  'Hogbetsotso Cultural Showcase',
  'Join us for a spectacular evening of traditional Ewe dance and drumming commemorating the historic exodus from Notsie.',
  '2026-11-07', 'Ho Cultural Centre, Volta Region', 'festival',
  '/images/WhatsApp Image 2026-06-02 at 16.38.13.jpeg', true
),
(
  'Traditional Drumming Workshop',
  'An intensive two-day workshop on the tonal language of Ewe drums. Open to all skill levels.',
  '2026-08-20', 'Volta Heritage Rehearsal Hall, Ho', 'workshop',
  '/images/WhatsApp Image 2026-06-02 at 10.54.40.jpeg', false
),
(
  'Asogli Yam Festival Performance',
  'The Volta Heritage Dance Ensemble will perform at the grand durbar of the Asogli Yam Festival.',
  '2026-09-06', 'Ho Sports Stadium, Volta Region', 'performance',
  '/images/WhatsApp Image 2026-06-02 at 16.38.11.jpeg', true
),
(
  'Ewe Kente & Cultural Symbols Exhibition',
  'A curated exhibition of authentic Ewe Kente cloth from Agotime Kpetoe, alongside cultural symbols.',
  '2026-10-15', 'Volta Regional Museum, Ho', 'exhibition',
  '/images/WhatsApp Image 2026-06-02 at 16.38.14.jpeg', false
)
on conflict do nothing;

-- ================================================================
-- SEED DATA — default services
-- ================================================================
insert into public.services (title, description, icon, color, features) values
(
  'Stage Performances',
  'Full ensemble stage shows featuring Agbadza, Borborbor, Husago, and Atsiagbekor dances with live drumming.',
  'Music', 'gold',
  array['24-member troupe', 'Full costume & props', 'Custom setlist', 'Up to 90 minutes']
),
(
  'Cultural Workshops',
  'Immersive drumming and dance workshops for schools, universities, and corporate groups.',
  'Users', 'green',
  array['All skill levels', 'Hands-on participation', 'Certificate issued', 'Min. 2 hours']
),
(
  'Heritage Tourism',
  'Private cultural experiences for tour groups including Kente demonstrations and drum circles.',
  'MapPin', 'red',
  array['Private groups', 'Guided by elders', 'Kente weaving demo', 'Customisable itinerary']
)
on conflict do nothing;

-- ================================================================
-- HERITAGE PILLARS & ITEMS
-- ================================================================
create table if not exists public.heritage_pillars (
  id           uuid primary key default uuid_generate_v4(),
  slug         text not null unique,
  name         text not null,
  tagline      text not null,
  description  text not null,
  image_url    text not null default '',
  color        text not null default 'gold' check (color in ('gold','red','green')),
  created_at   timestamptz not null default now()
);

create table if not exists public.heritage_items (
  id           uuid primary key default uuid_generate_v4(),
  pillar_id    uuid not null references public.heritage_pillars(id) on delete cascade,
  name         text not null,
  description  text not null,
  significance text not null,
  image_url    text not null default '',
  created_at   timestamptz not null default now()
);

alter table public.heritage_pillars enable row level security;
alter table public.heritage_items enable row level security;

drop policy if exists "Public can read heritage_pillars" on public.heritage_pillars;
drop policy if exists "Admins can manage heritage_pillars" on public.heritage_pillars;
drop policy if exists "Public can read heritage_items" on public.heritage_items;
drop policy if exists "Admins can manage heritage_items" on public.heritage_items;

create policy "Public can read heritage_pillars" on public.heritage_pillars for select using (true);
create policy "Admins can manage heritage_pillars" on public.heritage_pillars for all to authenticated using (true) with check (true);

create policy "Public can read heritage_items" on public.heritage_items for select using (true);
create policy "Admins can manage heritage_items" on public.heritage_items for all to authenticated using (true) with check (true);

-- Seed pillars
insert into public.heritage_pillars (id, slug, name, tagline, description, image_url, color) values
('da000000-0000-0000-0000-000000000001', 'dance', 'Traditional Dance', 'Movement as spiritual expression', 'Ewe traditional dances are a living archive. Each dance form encodes history, social values, and spiritual communication through precise physical vocabulary developed over centuries.', '/images/WhatsApp Image 2026-06-02 at 10.54.25.jpeg', 'red'),
('da000000-0000-0000-0000-000000000002', 'music', 'Music & Drumming', 'The drum speaks what words cannot', 'Ewe drumming is a sophisticated tonal language system. The master drum can replicate spoken Ewe, allowing an ensemble to communicate narratives, instructions, and emotions entirely through percussion.', '/images/WhatsApp Image 2026-06-02 at 10.54.40.jpeg', 'gold'),
('da000000-0000-0000-0000-000000000003', 'kente', 'Ewe Kente Weaving', 'Every thread tells a story', 'Ewe Kente, woven in the historic hub of Agotime Kpetoe, is unique among Ghanaian Kente traditions for its direct incorporation of figurative symbols — animals, household utensils, and historical markers — that weave entire ancestral proverbs into cloth.', '/images/ewe_kente_loom.png', 'gold'),
('da000000-0000-0000-0000-000000000004', 'festivals', 'Traditional Festivals', 'When ancestors walk among us', 'The festival calendar of the Volta Region is one of the richest in Ghana, encompassing harvest celebrations, ancestral commemorations, and arts showcases that draw thousands of participants from across the world.', '/images/WhatsApp Image 2026-06-02 at 16.38.11.jpeg', 'red'),
('da000000-0000-0000-0000-000000000005', 'chieftaincy', 'Chieftaincy & Customs', 'Governance rooted in tradition', 'The Ewe chieftaincy system is a sophisticated governance structure built on ancestral authority, communal consensus, and spiritual legitimacy. Chiefs are not merely political leaders but custodians of cultural memory.', '/images/WhatsApp Image 2026-06-02 at 16.38.10.jpeg', 'green'),
('da000000-0000-0000-0000-000000000006', 'foods', 'Traditional Foods', 'Culture tastes like home', 'Volta Region cuisine reflects the geography and culture of the people — freshwater fish from the Volta Lake, yam from the fertile hills, and fermented foods that connect the Ewe to their agricultural heritage.', '/images/traditional_ewe_food_cover.png', 'green')
on conflict (id) do update set
  slug = excluded.slug,
  name = excluded.name,
  tagline = excluded.tagline,
  description = excluded.description,
  image_url = excluded.image_url,
  color = excluded.color;

-- Seed items
insert into public.heritage_items (id, pillar_id, name, description, significance, image_url) values
-- Dance
('da000000-0000-0000-0000-000000000101', 'da000000-0000-0000-0000-000000000001', 'Agbadza', 'The ancient war dance of the Anlo-Ewe, originating from Atrikpui. Performed at funerals, festivals, and assemblies.', 'Simulates birds taking flight; celebrates survival and community solidarity. One of the oldest known Ewe dance forms.', '/images/WhatsApp Image 2026-06-02 at 10.54.26.jpeg'),
('da000000-0000-0000-0000-000000000102', 'da000000-0000-0000-0000-000000000001', 'Borborbor', 'The defining recreational dance of the Ewe, featuring energetic hip and torso movements performed in a circle.', 'Promotes social cohesion and celebration. The circular formation represents community unity and equality.', '/images/WhatsApp Image 2026-06-02 at 10.54.27.jpeg'),
('da000000-0000-0000-0000-000000000103', 'da000000-0000-0000-0000-000000000001', 'Husago', 'A solemn ritual dance originating from the migration epoch of the Ewe from Notsie.', 'Performed at memorial rites and ancestral ceremonies. Its slow steps evoke deep reflection and respect for ancestors.', '/images/WhatsApp Image 2026-06-02 at 10.54.28.jpeg'),
('da000000-0000-0000-0000-000000000104', 'da000000-0000-0000-0000-000000000001', 'Kinka', 'A vibrant youth-centric social dance featuring playful, theatrical, and acrobatic movements.', 'Represents the adaptive creativity of Ewe youth culture. Features humorous call-and-response singing.', '/images/WhatsApp Image 2026-06-02 at 10.54.29.jpeg'),
-- Music
('da000000-0000-0000-0000-000000000201', 'da000000-0000-0000-0000-000000000002', 'Atsimevu (Master Drum)', 'The lead drum, standing nearly two metres tall. The unquestionable voice of authority in any Ewe ensemble.', 'Commands the entire ensemble. Only experienced master drummers are permitted to play it.', '/images/WhatsApp Image 2026-06-02 at 10.54.40 (1).jpeg'),
('da000000-0000-0000-0000-000000000202', 'da000000-0000-0000-0000-000000000002', 'Sogo (Response Drum)', 'The response drum that maintains constant dialogue with the Atsimevu.', 'Provides tonal counterpoint, creating the musical conversation that defines Ewe drumming.', '/images/WhatsApp Image 2026-06-02 at 10.54.40 (2).jpeg'),
('da000000-0000-0000-0000-000000000203', 'da000000-0000-0000-0000-000000000002', 'Gankogui (Iron Bell)', 'A double-ended iron bell that provides the rhythmic foundation for all Ewe ensemble music.', 'The temporal anchor of the ensemble. Its pattern never changes, giving dancers a fixed reference point.', '/images/WhatsApp Image 2026-06-02 at 10.54.42.jpeg'),
-- Kente
('da000000-0000-0000-0000-000000000301', 'da000000-0000-0000-0000-000000000003', 'Agotime Double-Weave', 'The signature technique of Agotime weavers, creating reversible cloths with entirely different patterns on each side.', 'Represents the duality of existence — what is seen and what is hidden. A cloth fit for chiefs and royal ceremonies.', '/images/ewe_double_weave.png'),
('da000000-0000-0000-0000-000000000302', 'da000000-0000-0000-0000-000000000003', 'Proverb Cloths', 'Kente strips that incorporate Ewe proverbs through symbolic figurative representations woven directly into the fabric.', 'Each cloth is an educational document. Communities could read the cloth''s proverbs as a community text.', '/images/ewe_proverb_kente.png'),
-- Festivals
('da000000-0000-0000-0000-000000000401', 'da000000-0000-0000-0000-000000000004', 'Hogbetsotso', 'The grand annual commemoration of the Ewe exodus from Notsie. Held the first Saturday of November in Anloga.', 'The most solemn Ewe festival. Reaffirms identity, resilience, and the unbreakable bond of the Anlo-Ewe community.', '/images/WhatsApp Image 2026-06-02 at 16.38.13.jpeg'),
('da000000-0000-0000-0000-000000000402', 'da000000-0000-0000-0000-000000000004', 'Asogli Yam Festival (Te Za)', 'The flagship harvest festival of the Asogli State in Ho. Celebrates the first yam of the season.', 'A thanksgiving to the land and ancestors. Features elaborate chief durbars and dance performances.', '/images/WhatsApp Image 2026-06-02 at 16.38.11 (1).jpeg'),
-- Chieftaincy
('da000000-0000-0000-0000-000000000501', 'da000000-0000-0000-0000-000000000005', 'Durbar of Chiefs', 'The ceremonial assembly of paramount chiefs and sub-chiefs, typically held at festivals in full regalia.', 'An expression of political authority and cultural pride. The Kente cloth worn signals rank, lineage, and achievement.', '/images/WhatsApp Image 2026-06-02 at 16.38.10 (1).jpeg'),
-- Foods
('da000000-0000-0000-0000-000000000601', 'da000000-0000-0000-0000-000000000006', 'Akple & Fetri Detsi', 'The iconic Ewe staple — a smooth corn dough (akple) served with a rich okra-based stew and smoked fish.', 'A meal of community. Akple is traditionally eaten communally from a shared bowl as an act of unity.', '/images/akple_and_fetri_detsi.png'),
('da000000-0000-0000-0000-000000000602', 'da000000-0000-0000-0000-000000000006', 'Volta Lake Fish (Tilapia)', 'Freshwater tilapia from the Volta Lake, grilled over open fire and served with pepper sauce.', 'Represents the Ewe''s intimate relationship with the Volta River system — their ancestral lifeblood.', '/images/grilled_volta_tilapia.png')
on conflict (id) do update set
  pillar_id = excluded.pillar_id,
  name = excluded.name,
  description = excluded.description,
  significance = excluded.significance,
  image_url = excluded.image_url;

