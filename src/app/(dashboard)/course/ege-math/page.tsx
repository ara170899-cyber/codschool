import Link from "next/link";

const part1 = [
  { n: 1, title: "Планиметрия", desc: "Площади, теорема Пифагора", diff: 1 },
  { n: 2, title: "Векторы", desc: "Расстояние, середина, скалярное", diff: 1 },
  { n: 3, title: "Стереометрия", desc: "Объёмы, площади поверхностей", diff: 1 },
  { n: 4, title: "Вероятность", desc: "Классическая, сложение, умножение", diff: 1 },
  { n: 5, title: "Уравнения", desc: "Квадратные, показательные, лог.", diff: 2 },
  { n: 6, title: "Окружности", desc: "Вписанные, теорема синусов", diff: 2 },
  { n: 7, title: "Производная", desc: "Касательная, экстремумы", diff: 2 },
  { n: 8, title: "Прикладная", desc: "Проценты, графики", diff: 1 },
  { n: 9, title: "Вычисления", desc: "Степени, корни, логарифмы", diff: 2 },
  { n: 10, title: "Текстовые", desc: "Движение, работа, смеси", diff: 2 },
  { n: 11, title: "Графики", desc: "Линейная, парабола", diff: 2 },
  { n: 12, title: "Макс/Мин", desc: "Экстремумы на отрезке", diff: 2 },
];

const part2 = [
  { n: 13, title: "Уравнения", desc: "Тригонометрические, отбор", diff: 3 },
  { n: 14, title: "Стереометрия", desc: "Углы, расстояния", diff: 3 },
  { n: 15, title: "Неравенства", desc: "Метод интервалов", diff: 3 },
  { n: 16, title: "Финансовая", desc: "Кредиты, вклады", diff: 2 },
  { n: 17, title: "Планиметрия", desc: "Доказательства", diff: 3 },
  { n: 18, title: "Теория чисел", desc: "Делимость, остатки", diff: 3 },
];

export default function EgeMathPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">📐 ЕГЭ Математика 2026</h1>
        <p className="text-gray-400">Профильный уровень · 18 заданий · 340+ задач с решениями</p>
      </div>

      {/* ===== 3 ГЛАВНЫХ ДЕЙСТВИЯ ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <Link href="/course/ege-math/variants"
          className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5 hover:border-blue-500/40 transition-colors text-center group">
          <div className="text-3xl mb-2">📝</div>
          <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">Пробный экзамен</h3>
          <p className="text-xs text-gray-500 mt-1">50 вариантов · Таймер 3:55 · Баллы</p>
        </Link>

        <Link href="/course/ege-math/daily"
          className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5 hover:border-yellow-500/40 transition-colors text-center group">
          <div className="text-3xl mb-2">⚡</div>
          <h3 className="font-bold text-white group-hover:text-yellow-400 transition-colors">Задание дня</h3>
          <p className="text-xs text-gray-500 mt-1">5 задач · 15 минут · Стрик</p>
        </Link>

        <Link href="/course/ege-math/stats"
          className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 hover:border-emerald-500/40 transition-colors text-center group">
          <div className="text-3xl mb-2">📊</div>
          <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors">Мой прогресс</h3>
          <p className="text-xs text-gray-500 mt-1">Прогноз балла · Тепловая карта</p>
        </Link>
      </div>

      {/* ===== ТЕОРИЯ ПО ЗАДАНИЯМ ===== */}
      <h2 className="text-xl font-bold text-white mb-1">Теория и практика по заданиям</h2>
      <p className="text-sm text-gray-500 mb-4">Изучайте теорию и решайте задачи по каждому типу отдельно</p>

      {/* Часть 1 */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-emerald-400 mb-3 px-1">Часть 1 — задания 1-12 (по 1 баллу)</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {part1.map((t) => (
            <Link key={t.n} href={`/course/ege-math/task/${t.n}`}
              className="rounded-lg border border-gray-800 bg-gray-900 p-3 hover:border-emerald-500/30 transition-colors group">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-bold">{t.n}</span>
                <span className="text-xs text-gray-600">{"★".repeat(t.diff)}{"☆".repeat(3 - t.diff)}</span>
              </div>
              <p className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">{t.title}</p>
              <p className="text-[11px] text-gray-600 mt-0.5">{t.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Часть 2 */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-red-400 mb-3 px-1">Часть 2 — задания 13-18 (2-4 балла)</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {part2.map((t) => (
            <Link key={t.n} href={`/course/ege-math/task/${t.n}`}
              className="rounded-lg border border-gray-800 bg-gray-900 p-3 hover:border-red-500/30 transition-colors group">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-6 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center text-xs font-bold">{t.n}</span>
                <span className="text-xs text-gray-600">{"★".repeat(t.diff)}{"☆".repeat(3 - t.diff)}</span>
              </div>
              <p className="text-sm font-medium text-white group-hover:text-red-400 transition-colors">{t.title}</p>
              <p className="text-[11px] text-gray-600 mt-0.5">{t.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Достижения */}
      <Link href="/course/ege-math/achievements"
        className="block rounded-xl border border-gray-800 bg-gray-900 p-4 hover:border-yellow-500/30 transition-colors text-center">
        <span className="text-xl">🏆</span>
        <p className="text-sm text-gray-400 mt-1">Достижения — отслеживайте свой прогресс</p>
      </Link>
    </div>
  );
}
