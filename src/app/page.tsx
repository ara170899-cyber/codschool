import Link from "next/link";

const stats = [
  { value: "150+", label: "уроков Python" },
  { value: "340+", label: "задач ЕГЭ" },
  { value: "50", label: "вариантов" },
  { value: "24/7", label: "ИИ-репетитор" },
];

const courses = [
  {
    icon: "🐍",
    title: "Python с нуля до Junior",
    desc: "35 модулей · 150+ уроков · ООП, алгоритмы, SQL, Git",
    color: "emerald",
    href: "/courses",
    tag: "Программирование",
  },
  {
    icon: "📐",
    title: "ЕГЭ Математика 2026",
    desc: "18 заданий · 340+ задач · 50 вариантов · AI-репетитор",
    color: "blue",
    href: "/course/ege-math",
    tag: "Подготовка к экзамену",
  },
  {
    icon: "🧩",
    title: "Алгоритмические задачи",
    desc: "70+ задач в стиле LeetCode · Easy/Medium/Hard · Python",
    color: "amber",
    href: "/register",
    tag: "Алгоритмы",
  },
];

const features = [
  {
    icon: "💻",
    title: "Код прямо в браузере",
    desc: "Ничего не нужно устанавливать. Открыл — пишешь — запускаешь. Python работает прямо на странице.",
    gradient: "from-emerald-500/10 to-emerald-500/0",
  },
  {
    icon: "🤖",
    title: "ИИ-репетитор",
    desc: "Персональный помощник на базе Claude AI. Не даёт готовых ответов — учит думать и разбираться.",
    gradient: "from-purple-500/10 to-purple-500/0",
  },
  {
    icon: "✅",
    title: "Мгновенная проверка",
    desc: "Написал код — нажал «Проверить». Через секунду знаешь результат. Если ошибся — подсказки помогут.",
    gradient: "from-blue-500/10 to-blue-500/0",
  },
  {
    icon: "📊",
    title: "Прогресс и геймификация",
    desc: "XP, уровни, стрики, достижения. Как в игре — только в конце получаешь навыки и работу.",
    gradient: "from-yellow-500/10 to-yellow-500/0",
  },
  {
    icon: "📝",
    title: "50 вариантов ЕГЭ",
    desc: "Реальный формат экзамена. Таймер 3:55. Баллы. Тепловая карта слабых мест. Прогноз результата.",
    gradient: "from-red-500/10 to-red-500/0",
  },
  {
    icon: "🎓",
    title: "Карьерный трек",
    desc: "Резюме, собеседование, портфолио. Всё что нужно чтобы найти первую работу в IT.",
    gradient: "from-cyan-500/10 to-cyan-500/0",
  },
];

const testimonials = [
  {
    name: "Анна К., 28 лет",
    role: "Junior Python Developer",
    result: "Нашла работу за 4 месяца",
    text: "Пришла с полного нуля — даже не знала что такое переменная. Начала с print('Hello'), а через 4 месяца прошла собеседование и устроилась в IT-компанию. ИИ-ассистент — это как личный репетитор, который доступен в 3 ночи и никогда не устаёт объяснять.",
    detail: "Прошла 130 уроков, решила 200+ задач",
    avatar: "А",
    gradient: "from-emerald-500 to-cyan-500",
    tag: "Python",
  },
  {
    name: "Максим Д., 17 лет",
    role: "Выпускник 2025",
    result: "Сдал ЕГЭ на 94 балла",
    text: "Готовился 3 месяца, решал по варианту в день. Тепловая карта показала, что я плохо знаю стереометрию и вероятность — целенаправленно подтянул именно эти темы. На экзамене не было ни одной задачи, которую я не видел в похожем формате.",
    detail: "Решил 42 варианта, 750+ задач",
    avatar: "М",
    gradient: "from-blue-500 to-purple-500",
    tag: "ЕГЭ",
  },
  {
    name: "Елена С., 34 года",
    role: "Бывший бухгалтер → Python",
    result: "Перешла в IT за 5 месяцев",
    text: "Мне 34, и я думала что программирование — это не для меня, это для молодых гиков. Но здесь всё объяснено настолько просто — как будто для пятилетнего ребёнка. Геймификация затягивает: не хочешь терять стрик, решаешь каждый день. Сейчас работаю junior-аналитиком.",
    detail: "Стрик 47 дней подряд, 27 достижений",
    avatar: "Е",
    gradient: "from-pink-500 to-rose-500",
    tag: "Python",
  },
  {
    name: "Дмитрий П., 16 лет",
    role: "Ученик 10 класса",
    result: "С 45 до 82 баллов за 2 месяца",
    text: "На пробнике было 45 баллов — полный провал. Репетитор стоил 3000₽/час, а тут за 990₽ в месяц получил доступ ко всему. AI-репетитор объясняет даже лучше — можно спрашивать одно и то же 10 раз и он не злится. Формулы всегда под рукой.",
    detail: "Рост с 45 до 82 баллов, 30 вариантов",
    avatar: "Д",
    gradient: "from-yellow-500 to-orange-500",
    tag: "ЕГЭ",
  },
  {
    name: "Мария В., 22 года",
    role: "Студентка → фриланс",
    result: "Первый заказ через 2 месяца",
    text: "Учусь на филфаке, но поняла что хочу зарабатывать больше. Начала учить Python вечерами. Через 2 месяца написала парсер для знакомого — он заплатил 15 000₽. Теперь беру заказы на фрилансе по 30-50 тысяч. Карьерный трек помог составить портфолио.",
    detail: "Заработала 120 000₽ на фрилансе",
    avatar: "М",
    gradient: "from-violet-500 to-indigo-500",
    tag: "Python",
  },
  {
    name: "Артём Н., 17 лет",
    role: "Олимпиадник",
    result: "Сдал ЕГЭ на 98 баллов",
    text: "Мне нужен был тренажёр для скорости — решать часть 1 за 30 минут. Мини-вариант дня идеально подходит: 5 задач за 15 минут каждый день. На экзамене часть 1 сделал за 25 минут и спокойно разобрался с частью 2.",
    detail: "Решил все 50 вариантов, стрик 90 дней",
    avatar: "А",
    gradient: "from-teal-500 to-emerald-500",
    tag: "ЕГЭ",
  },
];

const comparison = [
  { feature: "Интерактивные уроки", us: true, others: "Частично" },
  { feature: "Код в браузере", us: true, others: "Нет" },
  { feature: "ИИ-репетитор", us: true, others: "Нет" },
  { feature: "ЕГЭ Математика", us: true, others: "Отдельный сервис" },
  { feature: "Пробные экзамены с таймером", us: true, others: "Нет" },
  { feature: "Геймификация", us: true, others: "Нет" },
  { feature: "Карьерный трек", us: true, others: "Нет" },
  { feature: "Цена", us: "от 990₽/мес", others: "от 3000₽/мес" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white font-[family-name:var(--font-geist-sans)]">
      {/* ===== HEADER ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white">
            Code<span className="text-emerald-400">School</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-8">
            <Link href="/register" className="text-sm text-gray-400 hover:text-white transition-colors">Курсы</Link>
            <Link href="/register" className="text-sm text-gray-400 hover:text-white transition-colors">ЕГЭ</Link>
            <Link href="/pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Тарифы</Link>
            <Link href="/community" className="text-sm text-gray-400 hover:text-white transition-colors">Сообщество</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors hidden sm:block">Войти</Link>
            <Link href="/register" className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors">
              Начать бесплатно
            </Link>
          </div>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden pt-16">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute top-60 left-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 pt-16 pb-20 sm:pt-24 sm:pb-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-emerald-400">Бесплатный доступ к первым 30 урокам</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl leading-tight">
            Учись{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              программировать
            </span>
            <br />
            и сдавай{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ЕГЭ на 100
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Интерактивная платформа с ИИ-репетитором. Python с нуля до трудоустройства.
            ЕГЭ по математике с 340+ задачами и 50 вариантами.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register"
              className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-4 text-lg font-bold text-white hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg shadow-emerald-500/20">
              Начать бесплатно →
            </Link>
            <Link href="/course/ege-math"
              className="w-full sm:w-auto rounded-xl border border-gray-700 px-8 py-4 text-lg font-semibold text-gray-300 hover:bg-gray-900 hover:border-gray-600 transition-all">
              ЕГЭ Математика 2026
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                  {s.value}
                </div>
                <div className="text-sm text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DEMO: Python IDE ===== */}
      <section className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
        <h2 className="text-2xl sm:text-4xl font-bold text-center mb-4">
          Всё прямо в браузере
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
          Никаких установок. Открыл — пишешь код — запускаешь. Вот как это выглядит:
        </p>

        {/* Python IDE mockup */}
        <div className="rounded-2xl border border-gray-800 overflow-hidden shadow-2xl shadow-emerald-500/5">
          {/* Window chrome */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
              </div>
              <span className="text-xs text-gray-500 ml-2">Урок 1: Hello, World!</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-medium">Новичок · 0 XP</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Left: Theory */}
            <div className="border-r border-gray-800 bg-gray-950 p-5 lg:col-span-1">
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-emerald-400">📝 Теория</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Функция <code className="px-1 py-0.5 rounded bg-gray-800 text-emerald-400 text-xs">print()</code> выводит текст на экран.
                </p>
                <div className="rounded-lg bg-gray-900 border border-gray-800 p-3">
                  <code className="text-sm text-emerald-300">print(&quot;Hello, World!&quot;)</code>
                </div>
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                  <p className="text-xs font-semibold text-emerald-400 mb-1">Задание</p>
                  <p className="text-sm text-gray-300">Выведите на экран: Hello, World!</p>
                </div>
              </div>
            </div>

            {/* Center: Code editor */}
            <div className="lg:col-span-2 flex flex-col">
              <div className="flex-1 bg-[#1e1e1e] p-4 font-mono text-sm min-h-[200px]">
                <div className="flex gap-3">
                  <span className="text-gray-600 select-none w-6 text-right">1</span>
                  <span><span className="text-gray-500"># Ваша первая программа</span></span>
                </div>
                <div className="flex gap-3">
                  <span className="text-gray-600 select-none w-6 text-right">2</span>
                  <span><span className="text-[#dcdcaa]">print</span><span className="text-gray-300">(</span><span className="text-[#ce9178]">&quot;Hello, World!&quot;</span><span className="text-gray-300">)</span></span>
                </div>
                <div className="flex gap-3">
                  <span className="text-gray-600 select-none w-6 text-right">3</span>
                  <span className="inline-block w-2 h-4 bg-gray-400 animate-pulse" />
                </div>
              </div>

              {/* Action bar */}
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 border-t border-gray-800">
                <div className="px-3 py-1 rounded bg-gray-700 text-white text-xs font-medium">▶ Run</div>
                <div className="px-3 py-1 rounded bg-emerald-600 text-white text-xs font-medium">✓ Check</div>
                <div className="px-3 py-1 rounded bg-yellow-600/20 text-yellow-400 text-xs font-medium">💡 Hint</div>
                <div className="px-3 py-1 rounded bg-purple-600/20 text-purple-400 text-xs font-medium">🤖 AI</div>
              </div>

              {/* Terminal output */}
              <div className="bg-gray-950 border-t border-gray-800 p-4 font-mono text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] text-gray-600 uppercase tracking-wider">Вывод</span>
                  <span className="text-[10px] text-emerald-500 uppercase tracking-wider">✓ Тест пройден</span>
                </div>
                <div className="text-emerald-400">Hello, World!</div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          Реальный интерфейс платформы. <Link href="/lesson/hello" className="text-emerald-400 hover:text-emerald-300">Попробовать →</Link>
        </p>
      </section>

      {/* ===== DEMO: EGE Math ===== */}
      <section className="max-w-6xl mx-auto px-4 pb-16 sm:pb-24">
        <div className="rounded-2xl border border-gray-800 overflow-hidden shadow-2xl shadow-blue-500/5">
          {/* Window chrome */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
              </div>
              <span className="text-xs text-gray-500 ml-2">ЕГЭ Математика · Задание 4: Вероятность</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">⏱ 3:42:15</span>
              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-medium">Вариант 12</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Theory */}
            <div className="border-r border-gray-800 bg-gray-950 p-5">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold">4</span>
                  <span className="text-sm font-bold text-white">Теория вероятностей</span>
                  <span className="text-yellow-400 text-xs">★☆☆</span>
                </div>
                <div className="rounded-lg bg-gray-900 border border-gray-800 p-3 text-sm text-gray-300">
                  <p className="mb-2">P = m / n</p>
                  <p className="text-xs text-gray-500">m — благоприятные исходы</p>
                  <p className="text-xs text-gray-500">n — все возможные исходы</p>
                </div>
              </div>
            </div>

            {/* Right: Practice */}
            <div className="bg-gray-950 p-5">
              <div className="space-y-4">
                <div className="rounded-lg bg-gray-900 border border-gray-800 p-4">
                  <p className="text-sm text-gray-300 leading-relaxed">
                    В урне 4 белых и 6 чёрных шаров. Наугад достают один шар. Найдите вероятность того, что он будет белым.
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1.5">Ваш ответ:</p>
                  <div className="flex gap-2">
                    <div className="flex-1 px-3 py-2.5 rounded-lg bg-gray-800 border border-emerald-500 text-emerald-400 font-mono">0.4</div>
                  </div>
                  <div className="flex gap-1.5 mt-2">
                    {["√", "π", "²", "³", "±", "÷", "×", "(", ")"].map((s) => (
                      <div key={s} className="w-7 h-7 rounded bg-gray-800 border border-gray-700 text-gray-400 text-xs flex items-center justify-center">{s}</div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-emerald-400 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-sm">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>
                  <span className="font-medium">Верно! +10 XP</span>
                </div>

                <div className="flex gap-3 text-xs">
                  <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-purple-500/10 text-purple-400 font-medium">🤖 Помощь</div>
                  <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 font-medium">📋 Формулы</div>
                </div>

                {/* Progress dots */}
                <div className="flex gap-1 pt-2">
                  {[1,2,3,4,5,6].map((i) => (
                    <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= 3 ? "bg-emerald-500/50" : i === 4 ? "bg-emerald-400" : "bg-gray-700"}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          Реальный интерфейс подготовки к ЕГЭ. <Link href="/course/ege-math/task/4" className="text-blue-400 hover:text-blue-300">Попробовать →</Link>
        </p>
      </section>

      {/* ===== AI TUTOR SHOWCASE ===== */}
      <section className="py-16 sm:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/[0.03] via-transparent to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/5 px-4 py-1.5 mb-6">
              <span className="text-sm">🤖</span>
              <span className="text-sm text-purple-400">Работает на Claude AI от Anthropic</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold mb-4">
              ИИ-репетитор, который{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">учит думать</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Не просто даёт ответы — задаёт правильные вопросы. Как лучший репетитор, только доступен 24/7 и бесконечно терпелив.
            </p>
          </div>

          {/* 3 scenarios side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-12">
            {/* Scenario 1: Student stuck */}
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-gray-800 bg-gray-900">
                <p className="text-xs text-gray-500">Сценарий 1</p>
                <p className="text-sm font-semibold text-white">Ученик застрял</p>
              </div>
              <div className="p-4 space-y-3">
                {/* Student */}
                <div className="ml-6 rounded-xl bg-blue-500/10 border border-blue-500/20 p-3">
                  <p className="text-xs text-blue-400 mb-1 font-medium">Ученик</p>
                  <p className="text-sm text-gray-300">Не понимаю как решить. Что делать?</p>
                </div>
                {/* AI */}
                <div className="mr-6 rounded-xl bg-purple-500/10 border border-purple-500/20 p-3">
                  <p className="text-xs text-purple-400 mb-1 font-medium">ИИ-репетитор</p>
                  <p className="text-sm text-gray-300">Давай разберёмся по шагам. Какие данные даны в задаче? Попробуй выписать их отдельно.</p>
                </div>
                {/* Student */}
                <div className="ml-6 rounded-xl bg-blue-500/10 border border-blue-500/20 p-3">
                  <p className="text-xs text-blue-400 mb-1 font-medium">Ученик</p>
                  <p className="text-sm text-gray-300">Катеты 5 и 12, нужна гипотенуза</p>
                </div>
                {/* AI */}
                <div className="mr-6 rounded-xl bg-purple-500/10 border border-purple-500/20 p-3">
                  <p className="text-xs text-purple-400 mb-1 font-medium">ИИ-репетитор</p>
                  <p className="text-sm text-gray-300">Отлично! Ты уже на верном пути. Какую теорему используют, когда известны два катета прямоугольного треугольника?</p>
                </div>
                <div className="text-center">
                  <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">Ученик вспомнил теорему Пифагора и решил сам ✓</span>
                </div>
              </div>
            </div>

            {/* Scenario 2: Wrong answer */}
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-gray-800 bg-gray-900">
                <p className="text-xs text-gray-500">Сценарий 2</p>
                <p className="text-sm font-semibold text-white">Ошибка в коде</p>
              </div>
              <div className="p-4 space-y-3">
                {/* Code block */}
                <div className="rounded-lg bg-[#1e1e1e] p-3 font-mono text-sm">
                  <div><span className="text-gray-500">1</span> <span className="text-[#dcdcaa]">print</span><span className="text-gray-300">(</span><span className="text-[#ce9178]">&quot;Привет &quot;</span> <span className="text-gray-300">+ name)</span></div>
                  <div className="text-red-400 text-xs mt-1">NameError: name is not defined</div>
                </div>
                {/* Student */}
                <div className="ml-6 rounded-xl bg-blue-500/10 border border-blue-500/20 p-3">
                  <p className="text-xs text-blue-400 mb-1 font-medium">Ученик</p>
                  <p className="text-sm text-gray-300">Почему ошибка? Я же написал name!</p>
                </div>
                {/* AI */}
                <div className="mr-6 rounded-xl bg-purple-500/10 border border-purple-500/20 p-3">
                  <p className="text-xs text-purple-400 mb-1 font-medium">ИИ-репетитор</p>
                  <p className="text-sm text-gray-300">Хороший вопрос! Ошибка говорит: &ldquo;name не определена&rdquo;. Это значит, что Python не знает что такое <code className="px-1 py-0.5 rounded bg-gray-800 text-purple-300 text-xs">name</code>. Как ты думаешь, что нужно сделать перед print, чтобы переменная появилась?</p>
                </div>
                {/* Student */}
                <div className="ml-6 rounded-xl bg-blue-500/10 border border-blue-500/20 p-3">
                  <p className="text-xs text-blue-400 mb-1 font-medium">Ученик</p>
                  <p className="text-sm text-gray-300">А, надо сначала name = input()!</p>
                </div>
                <div className="text-center">
                  <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">Ученик понял концепцию переменных ✓</span>
                </div>
              </div>
            </div>

            {/* Scenario 3: Wants answer */}
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-gray-800 bg-gray-900">
                <p className="text-xs text-gray-500">Сценарий 3</p>
                <p className="text-sm font-semibold text-white">Просит ответ</p>
              </div>
              <div className="p-4 space-y-3">
                {/* Student */}
                <div className="ml-6 rounded-xl bg-blue-500/10 border border-blue-500/20 p-3">
                  <p className="text-xs text-blue-400 mb-1 font-medium">Ученик</p>
                  <p className="text-sm text-gray-300">Просто скажи ответ, мне надо быстро</p>
                </div>
                {/* AI */}
                <div className="mr-6 rounded-xl bg-purple-500/10 border border-purple-500/20 p-3">
                  <p className="text-xs text-purple-400 mb-1 font-medium">ИИ-репетитор</p>
                  <p className="text-sm text-gray-300">Я понимаю, что хочется быстрее. Но если я дам ответ — ты его завтра забудешь. Давай лучше я дам подсказку, и ты сам дойдёшь до решения. Так ты запомнишь навсегда.</p>
                </div>
                {/* Student */}
                <div className="ml-6 rounded-xl bg-blue-500/10 border border-blue-500/20 p-3">
                  <p className="text-xs text-blue-400 mb-1 font-medium">Ученик</p>
                  <p className="text-sm text-gray-300">Ладно, давай подсказку</p>
                </div>
                {/* AI */}
                <div className="mr-6 rounded-xl bg-purple-500/10 border border-purple-500/20 p-3">
                  <p className="text-xs text-purple-400 mb-1 font-medium">ИИ-репетитор</p>
                  <p className="text-sm text-gray-300">Вспомни формулу площади треугольника. Она начинается с дроби... S = ?</p>
                </div>
                <div className="text-center">
                  <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">Ученик вспомнил S = ½·a·h и решил ✓</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key differences */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { icon: "🧠", title: "Учит думать", desc: "Не даёт готовых ответов — направляет к решению через вопросы" },
              { icon: "🕐", title: "Доступен 24/7", desc: "В 3 ночи, в выходные, в каникулы — всегда на связи" },
              { icon: "♾️", title: "Бесконечно терпелив", desc: "Можно спрашивать одно и то же 100 раз — объяснит снова" },
              { icon: "🎯", title: "Знает ваш уровень", desc: "Адаптирует объяснения под пройденные темы и частые ошибки" },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-gray-800 bg-gray-900/50 p-4 text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h4 className="font-bold text-white text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Comparison with real tutor */}
          <div className="rounded-2xl border border-gray-800 bg-gray-900/50 overflow-hidden">
            <div className="grid grid-cols-3 px-6 py-3 bg-gray-900 border-b border-gray-800">
              <span className="text-sm text-gray-500"></span>
              <span className="text-sm font-bold text-purple-400 text-center">ИИ-репетитор</span>
              <span className="text-sm text-gray-500 text-center">Обычный репетитор</span>
            </div>
            {[
              { f: "Стоимость", ai: "от 990₽/мес", tutor: "от 2000₽/час" },
              { f: "Доступность", ai: "24/7, без выходных", tutor: "2-3 раза в неделю" },
              { f: "Терпение", ai: "Бесконечное", tutor: "Ограниченное" },
              { f: "Знает ваши слабости", ai: "Анализирует автоматически", tutor: "Если запомнит" },
              { f: "Скорость ответа", ai: "Мгновенно", tutor: "Ждать до следующего урока" },
              { f: "Адаптация под уровень", ai: "Автоматически", tutor: "Зависит от репетитора" },
            ].map((row) => (
              <div key={row.f} className="grid grid-cols-3 px-6 py-2.5 border-b border-gray-800/50 hover:bg-gray-900/30">
                <span className="text-sm text-gray-300">{row.f}</span>
                <span className="text-sm text-purple-400 text-center font-medium">{row.ai}</span>
                <span className="text-sm text-gray-500 text-center">{row.tutor}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            ИИ-репетитор не заменяет учителя — он дополняет. Доступен всегда, когда учитель недоступен.
          </p>
        </div>
      </section>

      {/* ===== COURSES ===== */}
      <section className="max-w-5xl mx-auto px-4 py-16 sm:py-24">
        <h2 className="text-2xl sm:text-4xl font-bold text-center mb-4">
          Три направления — одна платформа
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
          Для школьников и взрослых. Python для карьеры в IT. ЕГЭ для поступления в вуз. Алгоритмы для собеседований.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {courses.map((c) => {
            const colorMap: Record<string, { border: string; bg: string; hoverBorder: string; text: string }> = {
              emerald: { border: "border-emerald-500/20", bg: "from-emerald-500/5", hoverBorder: "hover:border-emerald-500/40", text: "text-emerald-400" },
              blue: { border: "border-blue-500/20", bg: "from-blue-500/5", hoverBorder: "hover:border-blue-500/40", text: "text-blue-400" },
              amber: { border: "border-amber-500/20", bg: "from-amber-500/5", hoverBorder: "hover:border-amber-500/40", text: "text-amber-400" },
            };
            const colors = colorMap[c.color] || colorMap.emerald;
            return (
            <Link key={c.title} href={c.href}
              className={`rounded-2xl border p-8 transition-all hover:scale-[1.02] group ${colors.border} bg-gradient-to-br ${colors.bg} to-transparent ${colors.hoverBorder}`}>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{c.tag}</span>
              <div className="text-4xl mt-3 mb-4">{c.icon}</div>
              <h3 className="text-2xl font-bold mb-2 transition-colors">
                {c.title}
              </h3>
              <p className="text-gray-400">{c.desc}</p>
              <div className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${colors.text}`}>
                Начать обучение
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
              </div>
            </Link>
            );
          })}
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl sm:text-4xl font-bold text-center mb-4">
            Почему выбирают нас
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
            Всё что нужно для обучения — в одном месте. Без скучных видео и бесконечных лекций.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title}
                className={`rounded-2xl border border-gray-800 bg-gradient-to-br ${f.gradient} p-6 hover:border-gray-700 transition-all`}>
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-16 sm:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-4xl font-bold text-center mb-16">
            Как это работает
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Читай теорию", desc: "Короткое объяснение с примерами. Как учебник, только понятный.", icon: "📖" },
              { step: "02", title: "Решай задачи", desc: "Пиши код или вводи ответ. Проверка — мгновенно.", icon: "✏️" },
              { step: "03", title: "Получай помощь", desc: "ИИ-репетитор подскажет. Не ответ — а направление.", icon: "🤖" },
              { step: "04", title: "Расти", desc: "XP, уровни, достижения. Видишь прогресс каждый день.", icon: "📈" },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="text-4xl mb-4">{s.icon}</div>
                <div className="text-xs text-emerald-400 font-bold mb-2">{s.step}</div>
                <h3 className="font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMPARISON ===== */}
      <section className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
        <h2 className="text-2xl sm:text-4xl font-bold text-center mb-4">
          CodeSchool vs другие платформы
        </h2>
        <p className="text-gray-400 text-center mb-12">Честное сравнение</p>
        <div className="rounded-2xl border border-gray-800 overflow-hidden">
          <div className="grid grid-cols-3 bg-gray-900 px-6 py-3 border-b border-gray-800">
            <span className="text-sm text-gray-500">Функция</span>
            <span className="text-sm font-bold text-emerald-400 text-center">CodeSchool</span>
            <span className="text-sm text-gray-500 text-center">Другие</span>
          </div>
          {comparison.map((row) => (
            <div key={row.feature} className="grid grid-cols-3 px-6 py-3 border-b border-gray-800/50 hover:bg-gray-900/50">
              <span className="text-sm text-gray-300">{row.feature}</span>
              <span className="text-sm text-center">
                {row.us === true ? <span className="text-emerald-400 font-bold">✓</span> : <span className="text-emerald-400 font-semibold">{row.us}</span>}
              </span>
              <span className="text-sm text-center text-gray-500">{row.others}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl sm:text-4xl font-bold text-center mb-4">
            Истории учеников
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-lg mx-auto">
            Каждый из них начинал с нуля. Вот что получилось.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 flex flex-col hover:border-gray-700 transition-colors">
                {/* Tag */}
                <span className={`self-start text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-4 ${
                  t.tag === "Python" ? "bg-emerald-500/10 text-emerald-400" : "bg-blue-500/10 text-blue-400"
                }`}>
                  {t.tag}
                </span>

                {/* Result highlight */}
                <p className="text-lg font-bold text-white mb-3">{t.result}</p>

                {/* Quote */}
                <p className="text-sm text-gray-400 leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>

                {/* Stats */}
                <p className="text-xs text-gray-600 mt-4 mb-4 border-t border-gray-800 pt-4">
                  {t.detail}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING TEASER ===== */}
      <section className="py-16 sm:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.03] to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4">
          <div className="rounded-3xl border border-gray-800 bg-gray-900/50 p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500" />
            <h2 className="text-2xl sm:text-4xl font-bold mb-4 mt-2">
              Начните бесплатно. Прокачайтесь до Pro.
            </h2>
            <p className="text-gray-400 mb-3 max-w-lg mx-auto">
              30 уроков Python бесплатно. Полный доступ ко всему — от 990₽/мес.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              Lifetime-доступ навсегда — 6 990₽
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/courses"
                className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-4 text-lg font-bold text-white hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg shadow-emerald-500/20">
                Начать бесплатно →
              </Link>
              <Link href="/pricing"
                className="w-full sm:w-auto rounded-xl border border-gray-700 px-8 py-4 text-lg font-semibold text-gray-300 hover:bg-gray-900 transition-all">
                Все тарифы
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        <h2 className="text-2xl sm:text-4xl font-bold text-center mb-12">
          Частые вопросы
        </h2>
        <div className="space-y-4">
          {[
            { q: "Я полный ноль в программировании. Смогу?", a: "Да! Курс начинается с print(\"Hello\"). Объясняем каждый шаг на пальцах. 90% наших учеников начинали с нуля." },
            { q: "Подойдёт ли для подготовки к ЕГЭ?", a: "Да. 18 типов заданий, 340+ задач в стиле ФИПИ, 50 тренировочных вариантов с таймером и подсчётом баллов." },
            { q: "Чем вы лучше бесплатных курсов на YouTube?", a: "Интерактивность. Вы пишете код и решаете задачи прямо в браузере. ИИ-репетитор помогает 24/7. YouTube — это пассивное смотрение." },
            { q: "Сколько времени нужно?", a: "30 минут в день достаточно. Курс Python — 3-4 месяца. ЕГЭ — 2-3 месяца при ежедневных занятиях." },
            { q: "Можно ли вернуть деньги?", a: "Да. 14 дней — полный возврат, без вопросов." },
          ].map((faq) => (
            <details key={faq.q} className="group rounded-xl border border-gray-800 bg-gray-900/50">
              <summary className="flex items-center justify-between cursor-pointer p-5 text-white font-medium">
                {faq.q}
                <span className="text-gray-500 group-open:rotate-45 transition-transform text-xl">+</span>
              </summary>
              <p className="px-5 pb-5 text-sm text-gray-400 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-16 sm:py-24 text-center px-4">
        <h2 className="text-3xl sm:text-5xl font-extrabold mb-6">
          Готовы{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            изменить
          </span>
          {" "}свою жизнь?
        </h2>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          Первая программа через 2 минуты. Первая задача ЕГЭ — прямо сейчас.
        </p>
        <Link href="/register"
          className="inline-block rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-10 py-4 text-xl font-bold text-white hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-xl shadow-emerald-500/20">
          Начать бесплатно →
        </Link>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-gray-800 bg-gray-900/30">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-1">
              <Link href="/" className="text-xl font-bold text-white">
                Code<span className="text-emerald-400">School</span>
              </Link>
              <p className="text-sm text-gray-500 mt-2">
                Онлайн-школа программирования и подготовки к ЕГЭ
              </p>
            </div>

            {/* Курсы */}
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Курсы</h4>
              <div className="space-y-2">
                <Link href="/courses" className="block text-sm text-gray-500 hover:text-gray-300 transition-colors">Python с нуля</Link>
                <Link href="/course/ege-math" className="block text-sm text-gray-500 hover:text-gray-300 transition-colors">ЕГЭ Математика</Link>
                <Link href="/daily" className="block text-sm text-gray-500 hover:text-gray-300 transition-colors">Задача дня</Link>
                <Link href="/projects" className="block text-sm text-gray-500 hover:text-gray-300 transition-colors">Проекты</Link>
              </div>
            </div>

            {/* Платформа */}
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Платформа</h4>
              <div className="space-y-2">
                <Link href="/pricing" className="block text-sm text-gray-500 hover:text-gray-300 transition-colors">Тарифы</Link>
                <Link href="/career" className="block text-sm text-gray-500 hover:text-gray-300 transition-colors">Карьера</Link>
                <Link href="/community" className="block text-sm text-gray-500 hover:text-gray-300 transition-colors">Сообщество</Link>
                <Link href="/leaderboard" className="block text-sm text-gray-500 hover:text-gray-300 transition-colors">Лидерборд</Link>
              </div>
            </div>

            {/* Помощь */}
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Помощь</h4>
              <div className="space-y-2">
                <Link href="/login" className="block text-sm text-gray-500 hover:text-gray-300 transition-colors">Войти</Link>
                <Link href="/register" className="block text-sm text-gray-500 hover:text-gray-300 transition-colors">Регистрация</Link>
                <Link href="/certificate" className="block text-sm text-gray-500 hover:text-gray-300 transition-colors">Сертификат</Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              &copy; 2025-2026 CodeSchool. Все права защищены.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span>Оплата: Visa, MasterCard, МИР, СБП</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
