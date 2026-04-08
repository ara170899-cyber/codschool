"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const quickLinks = [
  { href: "/course/ege-math", icon: "🏠", label: "Обзор" },
  { href: "/course/ege-math/variants", icon: "📝", label: "Пробный экзамен" },
  { href: "/course/ege-math/daily", icon: "⚡", label: "Задание дня" },
  { href: "/course/ege-math/stats", icon: "📊", label: "Мой прогресс" },
  { href: "/course/ege-math/achievements", icon: "🏆", label: "Достижения" },
  { href: "/course/ege-math/formulas", icon: "📋", label: "Формулы" },
];

const tasks = [
  { n: 1, title: "Планиметрия" },
  { n: 2, title: "Векторы" },
  { n: 3, title: "Стереометрия" },
  { n: 4, title: "Вероятность" },
  { n: 5, title: "Уравнения" },
  { n: 6, title: "Окружности" },
  { n: 7, title: "Производная" },
  { n: 8, title: "Прикладная" },
  { n: 9, title: "Вычисления" },
  { n: 10, title: "Текстовые" },
  { n: 11, title: "Графики" },
  { n: 12, title: "Макс/Мин" },
  { n: 13, title: "Уравнения ②" },
  { n: 14, title: "Стереометрия ②" },
  { n: 15, title: "Неравенства" },
  { n: 16, title: "Финансовая" },
  { n: 17, title: "Планиметрия ②" },
  { n: 18, title: "Теория чисел" },
];

export function EgeSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 border-r border-gray-800 bg-gray-900/50 h-[calc(100vh-3.5rem)] hidden md:block overflow-y-auto sticky top-14">
      <div className="p-3 space-y-3">
        {/* Quick links */}
        <div className="space-y-0.5">
          {quickLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-sm transition-colors ${
                  isActive ? "bg-blue-500/10 text-blue-400" : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}>
                <span className="text-sm">{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="border-t border-gray-800" />

        {/* Tasks 1-18 */}
        <p className="text-[10px] text-gray-600 uppercase tracking-wider px-2 font-semibold">Задания</p>
        <div className="space-y-0.5">
          {tasks.map((task) => {
            const href = `/course/ege-math/task/${task.n}`;
            const isActive = pathname === href;
            const isPart2 = task.n >= 13;
            return (
              <Link key={task.n} href={href}
                className={`flex items-center gap-2 px-2.5 py-1 rounded-md text-sm transition-colors ${
                  isActive
                    ? isPart2 ? "bg-red-500/10 text-red-400" : "bg-emerald-500/10 text-emerald-400"
                    : "text-gray-500 hover:text-gray-300 hover:bg-gray-800"
                }`}>
                <span className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center ${
                  isActive
                    ? isPart2 ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"
                    : "bg-gray-800/50 text-gray-600"
                }`}>
                  {task.n}
                </span>
                <span className="truncate text-xs">{task.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
