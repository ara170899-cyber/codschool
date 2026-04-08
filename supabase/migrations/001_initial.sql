-- Профили пользователей (расширяет auth.users)
create table profiles (
  id uuid references auth.users primary key,
  name text not null,
  role text not null default 'student' check (role in ('student', 'teacher', 'admin')),
  avatar_url text,
  created_at timestamptz default now()
);

-- Прогресс по урокам
create table lesson_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  lesson_id text not null,
  status text not null default 'started' check (status in ('started', 'completed', 'skipped')),
  attempts int default 0,
  code text,
  completed_at timestamptz,
  created_at timestamptz default now(),
  unique(user_id, lesson_id)
);

-- Бейджи/достижения
create table badges (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  badge_type text not null,
  earned_at timestamptz default now(),
  unique(user_id, badge_type)
);

-- Группы (для B2B / преподавателей)
create table groups (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  teacher_id uuid references profiles(id),
  created_at timestamptz default now()
);

create table group_members (
  group_id uuid references groups(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  primary key (group_id, user_id)
);
