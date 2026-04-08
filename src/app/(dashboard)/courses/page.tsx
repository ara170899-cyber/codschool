"use client";

import Link from "next/link";
import { useLocalProgress } from "@/hooks/use-local-progress";
// lessons imported for future use
import { ProgressBar } from "@/components/progress-bar";
import { Onboarding } from "@/components/onboarding";

const modules = [
  { id: 0, title: "Первый запуск", icon: "🚀", desc: "Вывод текста и ввод данных", lessons: [
    { id: "hello", title: "Hello, World!" }, { id: "input", title: "Ввод данных" },
    { id: "exam0", title: "Экзамен: Визитка", exam: true },
  ]},
  { id: 1, title: "Переменные и типы", icon: "📦", desc: "Числа, строки, преобразование", lessons: [
    { id: "variables", title: "Переменные и числа" }, { id: "strings", title: "Строки" },
    { id: "exam1", title: "Экзамен: Калькулятор", exam: true },
  ]},
  { id: 2, title: "Условия", icon: "🔀", desc: "if/else, логические выражения", lessons: [
    { id: "ifelse", title: "Условия if/else" }, { id: "logic", title: "Логика" },
    { id: "exam2", title: "Экзамен: Оценки", exam: true },
  ]},
  { id: 3, title: "Циклы и списки", icon: "🔄", desc: "while, for, range, списки", lessons: [
    { id: "while", title: "Цикл while" }, { id: "forloop", title: "for и range" }, { id: "lists", title: "Списки" },
    { id: "exam3", title: "Экзамен: Среднее", exam: true },
  ]},
  { id: 4, title: "Функции", icon: "⚙️", desc: "def, return, параметры", lessons: [
    { id: "functions", title: "Функции" },
    { id: "exam4", title: "Экзамен: Площадь", exam: true },
  ]},
  { id: 5, title: "Строки подробнее", icon: "✂️", desc: "Срезы, методы, переворот", lessons: [
    { id: "slicing", title: "Срезы строк" }, { id: "string_methods", title: "Методы строк" }, { id: "string_reverse", title: "Переворот строки" },
    { id: "exam5", title: "Экзамен: Обработка текста", exam: true },
  ]},
  { id: 6, title: "Словари", icon: "📖", desc: "Ключ-значение, подсчёт, поиск", lessons: [
    { id: "dict_basics", title: "Основы словарей" }, { id: "dict_count", title: "Подсчёт элементов" }, { id: "dict_lookup", title: "Поиск в словаре" },
    { id: "exam6", title: "Экзамен: Частота слов", exam: true },
  ]},
  { id: 7, title: "Продвинутые функции", icon: "🔧", desc: "Аргументы, декомпозиция", lessons: [
    { id: "func_args", title: "Аргументы по умолчанию" }, { id: "func_multiple", title: "Несколько функций" }, { id: "func_list", title: "Функции и списки" },
    { id: "exam7", title: "Экзамен: Мини-калькулятор", exam: true },
  ]},
  { id: 8, title: "Мини-проекты", icon: "🏆", desc: "Применяем всё вместе", lessons: [
    { id: "project_counter", title: "Счётчик цифр" }, { id: "project_reverse_words", title: "Переворот слов" }, { id: "project_password", title: "Проверка пароля" },
    { id: "exam8", title: "Финальный экзамен", exam: true },
  ]},
  { id: 9, title: "Вложенные циклы", icon: "🔲", desc: "Фигуры, таблицы, паттерны", lessons: [
    { id: "nested_loops", title: "Вложенные циклы" }, { id: "triangle", title: "Треугольник" }, { id: "multiplication_table", title: "Таблица умножения" },
    { id: "exam9", title: "Экзамен: Рамка", exam: true },
  ]},
  { id: 10, title: "Кортежи и множества", icon: "🎯", desc: "tuple, set, уникальность", lessons: [
    { id: "tuples", title: "Кортежи" }, { id: "sets", title: "Множества" }, { id: "set_operations", title: "Операции с множествами" },
    { id: "exam10", title: "Экзамен: Уникальные слова", exam: true },
  ]},
  { id: 11, title: "Генераторы списков", icon: "⚡", desc: "List comprehensions", lessons: [
    { id: "list_comp_basic", title: "Генераторы списков" }, { id: "list_comp_filter", title: "Фильтрация" }, { id: "list_comp_strings", title: "Генераторы и строки" },
    { id: "exam11", title: "Экзамен: Трансформация", exam: true },
  ]},
  { id: 12, title: "Работа с текстом", icon: "📝", desc: "Анализ, замена, форматирование", lessons: [
    { id: "text_analysis", title: "Анализ текста" }, { id: "text_replace", title: "Замена и очистка" }, { id: "text_format", title: "Форматирование" },
    { id: "exam12", title: "Экзамен: Slug-генератор", exam: true },
  ]},
  { id: 13, title: "Обработка ошибок", icon: "🛡️", desc: "try/except, валидация", lessons: [
    { id: "try_except", title: "try/except" }, { id: "safe_division", title: "Безопасное деление" }, { id: "input_validation", title: "Валидация ввода" },
    { id: "exam13", title: "Экзамен: Надёжный ввод", exam: true },
  ]},
  { id: 14, title: "Финальные проекты", icon: "🎓", desc: "Большие задачи на всё сразу", lessons: [
    { id: "project_quiz", title: "Викторина" }, { id: "project_stats", title: "Статистика" }, { id: "project_cipher", title: "Шифр Цезаря" }, { id: "project_todo", title: "Список дел" },
    { id: "exam14", title: "Выпускной экзамен", exam: true },
  ]},
  { id: 15, title: "Первый класс", icon: "🏗️", desc: "Классы, объекты, __init__, __str__", lessons: [
    { id: "class_intro", title: "Что такое класс" }, { id: "class_attributes", title: "Атрибуты и методы" }, { id: "class_str", title: "__str__ и представление" },
    { id: "exam15", title: "Экзамен: Банковский счёт", exam: true },
  ]},
  { id: 16, title: "Наследование", icon: "🧬", desc: "Наследование, super(), полиморфизм", lessons: [
    { id: "inheritance_basic", title: "Наследование" }, { id: "inheritance_super", title: "super() и расширение" }, { id: "inheritance_practice", title: "Иерархия классов" },
    { id: "exam16", title: "Экзамен: Фигуры", exam: true },
  ]},
  { id: 17, title: "Инкапсуляция", icon: "🔒", desc: "Приватные атрибуты, @property", lessons: [
    { id: "encapsulation", title: "Приватные атрибуты" }, { id: "property_decorator", title: "Свойства @property" },
    { id: "exam17", title: "Экзамен: Корзина покупок", exam: true },
  ]},
  { id: 18, title: "Методы класса", icon: "⚡", desc: "@staticmethod, @classmethod", lessons: [
    { id: "static_methods", title: "Статические методы" }, { id: "class_methods", title: "Методы класса" },
    { id: "exam18", title: "Экзамен: Утилиты", exam: true },
  ]},
  { id: 19, title: "ООП на практике", icon: "🎮", desc: "Стек, журнал, игровой персонаж", lessons: [
    { id: "oop_list_class", title: "Свой список (Stack)" }, { id: "oop_student", title: "Журнал оценок" }, { id: "oop_game", title: "Персонаж игры" },
    { id: "exam19", title: "Экзамен: Библиотека", exam: true },
  ]},
  { id: 20, title: "Рекурсия", icon: "🔁", desc: "Факториал, Фибоначчи, рекурсивный подход", lessons: [
    { id: "recursion_intro", title: "Факториал" }, { id: "recursion_sum", title: "Рекурсивная степень" }, { id: "recursion_fibonacci", title: "Фибоначчи" },
    { id: "exam20", title: "Экзамен: Палиндром", exam: true },
  ]},
  { id: 21, title: "JSON", icon: "📋", desc: "Парсинг, создание, вложенные данные", lessons: [
    { id: "json_basics", title: "Парсинг JSON" }, { id: "json_create", title: "Создание JSON" }, { id: "json_nested", title: "Вложенные данные" },
    { id: "exam21", title: "Экзамен: JSON-отчёт", exam: true },
  ]},
  { id: 22, title: "Регулярные выражения", icon: "🔍", desc: "Поиск, валидация, замена", lessons: [
    { id: "regex_intro", title: "Основы regex" }, { id: "regex_validate", title: "Валидация" }, { id: "regex_replace", title: "Замена" },
    { id: "exam22", title: "Экзамен: Извлечение", exam: true },
  ]},
  { id: 23, title: "Декораторы", icon: "🎀", desc: "Обёртки функций, паттерны", lessons: [
    { id: "decorator_intro", title: "Что такое декоратор" }, { id: "decorator_timer", title: "Практика" },
    { id: "exam23", title: "Экзамен: Свой декоратор", exam: true },
  ]},
  { id: 24, title: "Генераторы yield", icon: "🌊", desc: "yield, бесконечные последовательности", lessons: [
    { id: "yield_intro", title: "Генераторы с yield" }, { id: "yield_filter", title: "Генератор-фильтр" },
    { id: "exam24", title: "Экзамен: Свой range", exam: true },
  ]},
  { id: 25, title: "Алгоритмы сортировки", icon: "📊", desc: "Пузырьковая, выбором, sorted()", lessons: [
    { id: "bubble_sort", title: "Пузырьковая" }, { id: "selection_sort", title: "Выбором" }, { id: "sort_key", title: "sorted() и key" },
    { id: "exam25", title: "Экзамен: Топ-3", exam: true },
  ]},
  { id: 26, title: "Алгоритмы поиска", icon: "🔎", desc: "Линейный, бинарный поиск", lessons: [
    { id: "linear_search", title: "Линейный поиск" }, { id: "binary_search", title: "Бинарный поиск" },
    { id: "exam26", title: "Экзамен: Ближайшее", exam: true },
  ]},
  { id: 27, title: "Структуры данных", icon: "🧱", desc: "Стек, очередь, хеш-таблица", lessons: [
    { id: "ds_stack_queue", title: "Стек и очередь" }, { id: "ds_linked_concept", title: "Хеш-таблица" },
    { id: "exam27", title: "Экзамен: Скобки", exam: true },
  ]},
  { id: 28, title: "Лямбды и ФП", icon: "λ", desc: "lambda, map, filter", lessons: [
    { id: "lambda_basics", title: "Лямбда-функции" }, { id: "map_filter", title: "map и filter" },
    { id: "exam28", title: "Экзамен: Конвейер", exam: true },
  ]},
  { id: 29, title: "Дата и время", icon: "📅", desc: "datetime, timedelta, форматы", lessons: [
    { id: "datetime_basics", title: "Модуль datetime" }, { id: "datetime_calc", title: "Вычисления с датами" },
    { id: "exam29", title: "Экзамен: Возраст", exam: true },
  ]},
  { id: 30, title: "SQL основы", icon: "🗄️", desc: "SELECT, INSERT, запросы", lessons: [
    { id: "sql_select", title: "SELECT" }, { id: "sql_insert", title: "INSERT/UPDATE" },
    { id: "exam30", title: "Экзамен: SQL-конструктор", exam: true },
  ]},
  { id: 31, title: "HTTP и API", icon: "🌐", desc: "HTTP-методы, статус-коды, REST", lessons: [
    { id: "http_basics", title: "Как работает HTTP" }, { id: "api_parse", title: "Парсинг API-ответа" },
    { id: "exam31", title: "Экзамен: REST URL", exam: true },
  ]},
  { id: 32, title: "Тестирование", icon: "✅", desc: "assert, TDD, покрытие", lessons: [
    { id: "assert_basics", title: "assert и тесты" }, { id: "test_functions", title: "Тестирование функций" },
    { id: "exam32", title: "Экзамен: TDD", exam: true },
  ]},
  { id: 33, title: "Git", icon: "🔀", desc: "Версионирование, коммиты, ветки", lessons: [
    { id: "git_basics", title: "Основы Git" },
    { id: "exam33", title: "Экзамен: Коммит", exam: true },
  ]},
  { id: 34, title: "Выпускные проекты", icon: "🎓", desc: "Контакты, калькулятор, анализатор", lessons: [
    { id: "grad_contact_book", title: "Контакты" }, { id: "grad_calculator", title: "Калькулятор" }, { id: "grad_text_analyzer", title: "Анализатор текста" },
    { id: "exam_final", title: "Выпускной экзамен", exam: true },
  ]},
];

// Flatten all lesson IDs in order for finding the first incomplete one
const allLessonIds = modules.flatMap((mod) => mod.lessons.map((l) => l.id));

export default function CoursesPage() {
  const { isCompleted } = useLocalProgress();

  // Find first incomplete lesson
  const firstIncompleteLessonId = allLessonIds.find((id) => !isCompleted(id)) ?? allLessonIds[0];

  // Calculate total progress
  const totalLessons = allLessonIds.length;
  const totalCompleted = allLessonIds.filter((id) => isCompleted(id)).length;
  const totalProgress = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  let counter = 0;

  return (
    <div className="max-w-4xl mx-auto">
      <Onboarding />
      {/* Course selection */}
      <h1 className="text-3xl font-bold text-white mb-6">Курсы</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
          <span className="text-3xl">🐍</span>
          <h2 className="text-xl font-bold text-white mt-2">Python с нуля</h2>
          <p className="text-sm text-gray-400 mt-1">35 модулей · 130+ уроков · от новичка до Junior</p>
          <span className="inline-block mt-3 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">Текущий курс ↓</span>
        </div>
        <Link href="/course/ege-math" className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5 hover:border-blue-500/40 transition-colors group">
          <span className="text-3xl">📐</span>
          <h2 className="text-xl font-bold text-white mt-2 group-hover:text-blue-400 transition-colors">ЕГЭ Математика 2026</h2>
          <p className="text-sm text-gray-400 mt-1">18 заданий · 100+ задач · Профильный уровень</p>
          <span className="inline-block mt-3 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium">Открыть →</span>
        </Link>
      </div>

      {/* Python course hero */}
      <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">🐍 Python с нуля</h2>
        <p className="text-gray-400 mb-4">150+ уроков и экзаменов — от Hello World до трудоустройства</p>

        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-400">Общий прогресс</span>
            <span className="text-emerald-400 font-medium">{totalCompleted}/{totalLessons} уроков</span>
          </div>
          <ProgressBar progress={totalProgress} />
        </div>

        <Link
          href={`/lesson/${firstIncompleteLessonId}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors"
        >
          Продолжить обучение
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </Link>
      </div>

      <div className="space-y-6">
        {modules.map((mod) => {
          const modTotal = mod.lessons.length;
          const modCompleted = mod.lessons.filter((l) => isCompleted(l.id)).length;
          const modProgress = modTotal > 0 ? Math.round((modCompleted / modTotal) * 100) : 0;

          return (
            <div key={mod.id} className="rounded-xl border border-gray-800 bg-gray-900 overflow-hidden">
              <div className="p-5 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{mod.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-white">Модуль {mod.id}: {mod.title}</h2>
                    <p className="text-sm text-gray-500">{mod.desc}</p>
                  </div>
                  <span className="text-sm text-emerald-400 font-medium whitespace-nowrap">
                    {modCompleted}/{modTotal}
                  </span>
                </div>
                <div className="mt-3">
                  <ProgressBar progress={modProgress} />
                </div>
              </div>
              <div className="divide-y divide-gray-800">
                {mod.lessons.map((lesson) => {
                  counter++;
                  const isExam = "exam" in lesson;
                  const done = isCompleted(lesson.id);
                  return (
                    <Link key={lesson.id} href={`/lesson/${lesson.id}`}
                      className="flex items-center gap-4 p-4 hover:bg-gray-800/50 transition-colors group">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors ${
                        done
                          ? "bg-emerald-500/20 text-emerald-400"
                          : isExam
                            ? "bg-yellow-500/10 text-yellow-400 group-hover:bg-yellow-500/20"
                            : "bg-gray-800 text-gray-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-400"
                      }`}>
                        {done ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                        ) : isExam ? "📝" : counter}
                      </span>
                      <span className={`transition-colors ${
                        done
                          ? "text-emerald-400"
                          : isExam
                            ? "text-yellow-400/80 group-hover:text-white"
                            : "text-gray-300 group-hover:text-white"
                      }`}>
                        {lesson.title}
                      </span>
                      {done && (
                        <span className="ml-auto text-xs text-emerald-400/60 font-medium">Пройдено</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
