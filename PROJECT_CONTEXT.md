# CodeSchool — Школа программирования с ИИ-ассистентом

## Что это
SaaS-платформа для обучения программированию с встроенным web-IDE, автопроверкой кода и ИИ-помощником.
Целевая аудитория MVP: взрослые 18-35, "войти в IT", франкоязычная Европа (FR).

## Техстек (утверждён)
- **Frontend**: Next.js 14 (App Router) + React 18 + Tailwind CSS 3
- **Редактор кода**: Monaco Editor (@monaco-editor/react)
- **Backend/API**: Next.js API Routes (serverless)
- **База данных**: Supabase (PostgreSQL + Auth + Storage)
- **Запуск кода учеников**: Piston API (emkc.org) → позже свой Judge0
- **ИИ-ассистент**: Anthropic Claude API (claude-sonnet-4-20250514)
- **Оплата**: Stripe Checkout + Billing (позже)
- **Хостинг**: Vercel (бесплатный тариф)
- **Домен**: TBD

## Структура проекта

```
codeschool/
├── .env.local                  # Секреты (Supabase, Anthropic, Stripe)
├── next.config.js
├── tailwind.config.js
├── package.json
├── PROJECT_CONTEXT.md          # Этот файл
├── LESSONS.md                  # Контент уроков
│
├── public/
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (шрифты, metadata)
│   │   ├── page.tsx            # Landing page
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx      # Dashboard layout (sidebar, nav)
│   │   │   ├── courses/page.tsx        # Каталог курсов
│   │   │   ├── lesson/[id]/page.tsx    # Плеер урока (ГЛАВНЫЙ ЭКРАН)
│   │   │   ├── profile/page.tsx        # Профиль + прогресс + бейджи
│   │   │   └── teacher/page.tsx        # Dashboard преподавателя
│   │   └── api/
│   │       ├── run-code/route.ts       # Прокси к Piston API
│   │       ├── check-code/route.ts     # Автопроверка (тесты)
│   │       └── ai-assistant/route.ts   # Прокси к Anthropic API
│   │
│   ├── components/
│   │   ├── ui/                 # Базовые UI компоненты (кнопки, карточки)
│   │   ├── CodeEditor.tsx      # Monaco Editor обёртка
│   │   ├── Terminal.tsx        # Панель вывода
│   │   ├── TheoryPanel.tsx     # Рендер теории (markdown)
│   │   ├── TaskPanel.tsx       # Блок задания
│   │   ├── AIChat.tsx          # Чат с ИИ-ассистентом
│   │   ├── ProgressBar.tsx     # Прогресс по курсу
│   │   ├── LessonCard.tsx      # Карточка урока в каталоге
│   │   └── Navbar.tsx          # Навигация
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts       # Supabase browser client
│   │   │   ├── server.ts       # Supabase server client
│   │   │   └── middleware.ts   # Auth middleware
│   │   ├── piston.ts           # Piston API client (запуск кода)
│   │   ├── anthropic.ts        # Anthropic API client
│   │   ├── lessons.ts          # Загрузка/парсинг уроков
│   │   └── grader.ts           # Логика автопроверки
│   │
│   ├── hooks/
│   │   ├── useAuth.ts          # Хук авторизации
│   │   ├── useProgress.ts      # Хук прогресса ученика
│   │   └── useLessons.ts       # Хук загрузки уроков
│   │
│   └── types/
│       └── index.ts            # TypeScript типы
│
└── supabase/
    └── migrations/
        └── 001_initial.sql     # Схема базы данных
```

## Схема базы данных (Supabase/PostgreSQL)

```sql
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
  code text,                    -- последний код ученика
  completed_at timestamptz,
  created_at timestamptz default now(),
  unique(user_id, lesson_id)
);

-- Бейджи/достижения
create table badges (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  badge_type text not null,     -- 'first_program', 'loops_master', etc.
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
```

## Главный экран: Плеер урока

Layout: три колонки
```
┌──────────────┬─────────────────────┬──────────────┐
│              │  ┌───────────────┐  │              │
│   ТЕОРИЯ     │  │ Monaco Editor │  │  ИИ-ЧАТБОТ  │
│   (markdown) │  │  (code)       │  │  (опционально│
│              │  └───────────────┘  │   скрыт)     │
│   ЗАДАНИЕ    │  ┌───────────────┐  │              │
│   (карточка) │  │ Terminal      │  │              │
│              │  │ (output)      │  │              │
└──────────────┴─────────────────────┴──────────────┘
         [▶ Run]  [✓ Check]  [💡 Hint]  [🤖 AI]
```

## Продуктовая петля (core loop)
1. Ученик видит теорию (левая панель)
2. Читает задание (карточка под теорией)
3. Пишет код в Monaco Editor (центр)
4. Нажимает ▶ Run → код выполняется через Piston API → вывод в Terminal
5. Нажимает ✓ Check → автопроверка (unit-тесты) → результаты в Terminal
6. Если застрял → 💡 Hint (пошаговые подсказки) или 🤖 AI (Claude отвечает не давая ответ)
7. Все тесты ✅ → урок отмечен → прогресс → следующий урок

## ИИ-ассистент: правила

System prompt для Claude API:
```
Ты ИИ-ассистент школы программирования Python.
Урок: "{lesson.title}"
Задание: {lesson.task}
Код ученика:
```python
{user_code}
```
Результат проверки: {test_results}

ПРАВИЛА:
- НИКОГДА не давай полное решение
- Объясняй концепции и направляй к ответу
- Если ошибка — объясни что она значит и как проверить гипотезу
- Давай подсказки постепенно: сначала наводку, потом конкретнее
- Отвечай кратко (3-5 предложений)
- Отвечай на русском языке
- Если ученик просит "дай ответ" — откажи мягко и предложи подсказку
```

## Запуск кода через Piston API

```typescript
// POST https://emkc.org/api/v2/piston/execute
const response = await fetch('https://emkc.org/api/v2/piston/execute', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    language: 'python',
    version: '3.10',
    files: [{ content: userCode }],
    stdin: testInput,
    run_timeout: 5000,      // 5 секунд максимум
    compile_timeout: 5000,
  })
});
// response.run.stdout — вывод программы
// response.run.stderr — ошибки
```

## Автопроверка (grader)

```typescript
interface Test {
  input: string;        // stdin для программы
  expected: string;     // ожидаемый stdout (trimmed)
  hidden?: boolean;     // скрытый тест (не показывать данные)
}

// Логика:
// 1. Для каждого теста: запустить код через Piston с test.input
// 2. Сравнить stdout.trim() === test.expected.trim()
// 3. Вернуть результаты: { passed, failed, details[] }
// 4. Если все passed → отметить lesson_progress.status = 'completed'
```

## Переменные окружения (.env.local)

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
ANTHROPIC_API_KEY=sk-ant-...
STRIPE_SECRET_KEY=sk_test_...         # позже
STRIPE_WEBHOOK_SECRET=whsec_...       # позже
```

## Порядок разработки (приоритеты)

### Sprint 1 (неделя 1): Каркас
- [x] Инициализация Next.js + Tailwind + TypeScript
- [ ] Настройка Supabase (проект + таблицы)
- [ ] Auth: регистрация/вход (email)
- [ ] Layout: навигация + sidebar
- [ ] Страница каталога курсов (статический список)

### Sprint 2 (неделя 2): Core Experience
- [ ] Monaco Editor компонент
- [ ] Piston API интеграция (запуск кода)
- [ ] Плеер урока (split view: теория + код + терминал)
- [ ] 10 уроков Python (контент из LESSONS.md)
- [ ] Автопроверка (grader)

### Sprint 3 (неделя 3): ИИ + Прогресс
- [ ] ИИ-ассистент (Anthropic API, стриминг)
- [ ] Система подсказок (hints)
- [ ] Трекер прогресса (Supabase)
- [ ] Профиль с навыками и бейджами
- [ ] Dashboard преподавателя

### Sprint 4 (неделя 4): Polish + Deploy
- [ ] Landing page
- [ ] Responsive design (мобильные)
- [ ] SEO (meta tags, OG)
- [ ] Deploy на Vercel + домен
- [ ] Stripe (если готовы к монетизации)

## Стиль кода
- TypeScript strict mode
- Tailwind для стилей (никакого CSS-in-JS)
- Именование: camelCase для переменных, PascalCase для компонентов
- Файлы: kebab-case (code-editor.tsx)
- Server Components по умолчанию, 'use client' только где нужен state/effects
