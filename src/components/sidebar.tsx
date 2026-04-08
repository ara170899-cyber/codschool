"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocalProgress } from "@/hooks/use-local-progress";

const modules = [
  { id: 0, title: "Первый запуск", icon: "🚀", lessons: [
    { id: "hello", title: "Hello, World!" },
    { id: "input", title: "Ввод данных" },
    { id: "exam0", title: "Экзамен: Визитка" },
  ]},
  { id: 1, title: "Переменные и типы", icon: "📦", lessons: [
    { id: "variables", title: "Числа" },
    { id: "strings", title: "Строки" },
    { id: "exam1", title: "Экзамен: Калькулятор" },
  ]},
  { id: 2, title: "Условия", icon: "🔀", lessons: [
    { id: "ifelse", title: "if/else" },
    { id: "logic", title: "Логика" },
    { id: "exam2", title: "Экзамен: Оценки" },
  ]},
  { id: 3, title: "Циклы и списки", icon: "🔄", lessons: [
    { id: "while", title: "while" },
    { id: "forloop", title: "for и range" },
    { id: "lists", title: "Списки" },
    { id: "exam3", title: "Экзамен: Среднее" },
  ]},
  { id: 4, title: "Функции", icon: "⚙️", lessons: [
    { id: "functions", title: "Функции" },
    { id: "exam4", title: "Экзамен: Площадь" },
  ]},
  { id: 5, title: "Строки подробнее", icon: "✂️", lessons: [
    { id: "slicing", title: "Срезы" },
    { id: "string_methods", title: "Методы строк" },
    { id: "string_reverse", title: "Переворот" },
    { id: "exam5", title: "Экзамен: Текст" },
  ]},
  { id: 6, title: "Словари", icon: "📖", lessons: [
    { id: "dict_basics", title: "Основы" },
    { id: "dict_count", title: "Подсчёт" },
    { id: "dict_lookup", title: "Поиск" },
    { id: "exam6", title: "Экзамен: Слова" },
  ]},
  { id: 7, title: "Функции 2", icon: "🔧", lessons: [
    { id: "func_args", title: "Аргументы" },
    { id: "func_multiple", title: "Несколько функций" },
    { id: "func_list", title: "Функции и списки" },
    { id: "exam7", title: "Экзамен: Калькулятор" },
  ]},
  { id: 8, title: "Мини-проекты", icon: "🏆", lessons: [
    { id: "project_counter", title: "Счётчик цифр" },
    { id: "project_reverse_words", title: "Переворот слов" },
    { id: "project_password", title: "Пароль" },
    { id: "exam8", title: "Финальный экзамен" },
  ]},
  { id: 9, title: "Вложенные циклы", icon: "🔲", lessons: [
    { id: "nested_loops", title: "Вложенные циклы" },
    { id: "triangle", title: "Треугольник" },
    { id: "multiplication_table", title: "Таблица умножения" },
    { id: "exam9", title: "Экзамен: Рамка" },
  ]},
  { id: 10, title: "Кортежи и множества", icon: "🎯", lessons: [
    { id: "tuples", title: "Кортежи" },
    { id: "sets", title: "Множества" },
    { id: "set_operations", title: "Операции" },
    { id: "exam10", title: "Экзамен: Слова" },
  ]},
  { id: 11, title: "Генераторы списков", icon: "⚡", lessons: [
    { id: "list_comp_basic", title: "Генераторы" },
    { id: "list_comp_filter", title: "Фильтрация" },
    { id: "list_comp_strings", title: "Строки" },
    { id: "exam11", title: "Экзамен: Трансформация" },
  ]},
  { id: 12, title: "Работа с текстом", icon: "📝", lessons: [
    { id: "text_analysis", title: "Анализ текста" },
    { id: "text_replace", title: "Замена" },
    { id: "text_format", title: "Форматирование" },
    { id: "exam12", title: "Экзамен: Slug" },
  ]},
  { id: 13, title: "Обработка ошибок", icon: "🛡️", lessons: [
    { id: "try_except", title: "try/except" },
    { id: "safe_division", title: "Безопасное деление" },
    { id: "input_validation", title: "Валидация" },
    { id: "exam13", title: "Экзамен: Ввод" },
  ]},
  { id: 14, title: "Финальные проекты", icon: "🎓", lessons: [
    { id: "project_quiz", title: "Викторина" },
    { id: "project_stats", title: "Статистика" },
    { id: "project_cipher", title: "Шифр Цезаря" },
    { id: "project_todo", title: "Список дел" },
    { id: "exam14", title: "Выпускной экзамен" },
  ]},
  { id: 15, title: "Первый класс", icon: "🏗️", lessons: [
    { id: "class_intro", title: "Что такое класс" },
    { id: "class_attributes", title: "Атрибуты и методы" },
    { id: "class_str", title: "__str__" },
    { id: "exam15", title: "Экзамен: Банк" },
  ]},
  { id: 16, title: "Наследование", icon: "🧬", lessons: [
    { id: "inheritance_basic", title: "Наследование" },
    { id: "inheritance_super", title: "super()" },
    { id: "inheritance_practice", title: "Иерархия" },
    { id: "exam16", title: "Экзамен: Фигуры" },
  ]},
  { id: 17, title: "Инкапсуляция", icon: "🔒", lessons: [
    { id: "encapsulation", title: "Приватные атрибуты" },
    { id: "property_decorator", title: "@property" },
    { id: "exam17", title: "Экзамен: Корзина" },
  ]},
  { id: 18, title: "Методы класса", icon: "🔧", lessons: [
    { id: "static_methods", title: "@staticmethod" },
    { id: "class_methods", title: "@classmethod" },
    { id: "exam18", title: "Экзамен: Утилиты" },
  ]},
  { id: 19, title: "ООП на практике", icon: "🎮", lessons: [
    { id: "oop_list_class", title: "Свой список" },
    { id: "oop_student", title: "Журнал оценок" },
    { id: "oop_game", title: "Персонаж игры" },
    { id: "exam19", title: "Экзамен: Библиотека" },
  ]},
  { id: 20, title: "Рекурсия", icon: "🔁", lessons: [
    { id: "recursion_intro", title: "Факториал" },
    { id: "recursion_sum", title: "Степень" },
    { id: "recursion_fibonacci", title: "Фибоначчи" },
    { id: "exam20", title: "Экзамен: Палиндром" },
  ]},
  { id: 21, title: "JSON", icon: "📋", lessons: [
    { id: "json_basics", title: "Парсинг" },
    { id: "json_create", title: "Создание" },
    { id: "json_nested", title: "Вложенные" },
    { id: "exam21", title: "Экзамен: Отчёт" },
  ]},
  { id: 22, title: "Регулярные выражения", icon: "🔍", lessons: [
    { id: "regex_intro", title: "Основы" },
    { id: "regex_validate", title: "Валидация" },
    { id: "regex_replace", title: "Замена" },
    { id: "exam22", title: "Экзамен: Извлечение" },
  ]},
  { id: 23, title: "Декораторы", icon: "🎀", lessons: [
    { id: "decorator_intro", title: "Что такое" },
    { id: "decorator_timer", title: "Практика" },
    { id: "exam23", title: "Экзамен: Свой" },
  ]},
  { id: 24, title: "Генераторы yield", icon: "🌊", lessons: [
    { id: "yield_intro", title: "yield" },
    { id: "yield_filter", title: "Фильтр" },
    { id: "exam24", title: "Экзамен: range" },
  ]},
  { id: 25, title: "Сортировка", icon: "📊", lessons: [
    { id: "bubble_sort", title: "Пузырьковая" },
    { id: "selection_sort", title: "Выбором" },
    { id: "sort_key", title: "sorted(key)" },
    { id: "exam25", title: "Экзамен: Топ-3" },
  ]},
  { id: 26, title: "Поиск", icon: "🔎", lessons: [
    { id: "linear_search", title: "Линейный" },
    { id: "binary_search", title: "Бинарный" },
    { id: "exam26", title: "Экзамен: Ближайшее" },
  ]},
  { id: 27, title: "Структуры данных", icon: "🧱", lessons: [
    { id: "ds_stack_queue", title: "Стек и очередь" },
    { id: "ds_linked_concept", title: "Хеш-таблица" },
    { id: "exam27", title: "Экзамен: Скобки" },
  ]},
  { id: 28, title: "Лямбды", icon: "λ", lessons: [
    { id: "lambda_basics", title: "lambda" },
    { id: "map_filter", title: "map и filter" },
    { id: "exam28", title: "Экзамен: Конвейер" },
  ]},
  { id: 29, title: "Дата и время", icon: "📅", lessons: [
    { id: "datetime_basics", title: "datetime" },
    { id: "datetime_calc", title: "Вычисления" },
    { id: "exam29", title: "Экзамен: Возраст" },
  ]},
  { id: 30, title: "SQL основы", icon: "🗄️", lessons: [
    { id: "sql_select", title: "SELECT" },
    { id: "sql_insert", title: "INSERT/UPDATE" },
    { id: "exam30", title: "Экзамен: SQL" },
  ]},
  { id: 31, title: "HTTP и API", icon: "🌐", lessons: [
    { id: "http_basics", title: "HTTP" },
    { id: "api_parse", title: "Парсинг API" },
    { id: "exam31", title: "Экзамен: REST" },
  ]},
  { id: 32, title: "Тестирование", icon: "✅", lessons: [
    { id: "assert_basics", title: "assert" },
    { id: "test_functions", title: "Тесты функций" },
    { id: "exam32", title: "Экзамен: TDD" },
  ]},
  { id: 33, title: "Git", icon: "🔀", lessons: [
    { id: "git_basics", title: "Основы Git" },
    { id: "exam33", title: "Экзамен: Коммит" },
  ]},
  { id: 34, title: "Выпускные проекты", icon: "🎓", lessons: [
    { id: "grad_contact_book", title: "Контакты" },
    { id: "grad_calculator", title: "Калькулятор" },
    { id: "grad_text_analyzer", title: "Анализатор" },
    { id: "exam_final", title: "Выпускной экзамен" },
  ]},
];

export function Sidebar() {
  const pathname = usePathname();
  const { isCompleted } = useLocalProgress();

  return (
    <aside className="w-64 border-r border-gray-800 bg-gray-900/50 h-[calc(100vh-3.5rem)] hidden md:block overflow-y-auto sticky top-14">
      <div className="p-4 space-y-4">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2">
          Модули
        </h2>
        {modules.map((mod) => (
          <div key={mod.id}>
            <p className="text-sm text-gray-400 px-2 mb-1">
              {mod.icon} {mod.title}
            </p>
            <div className="space-y-0.5">
              {mod.lessons.map((lesson) => {
                const isActive = pathname === `/lesson/${lesson.id}`;
                const done = isCompleted(lesson.id);
                const isExam = lesson.id.startsWith("exam");
                return (
                  <Link
                    key={lesson.id}
                    href={`/lesson/${lesson.id}`}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                      isActive
                        ? "bg-emerald-500/10 text-emerald-400"
                        : done
                          ? "text-gray-400 hover:text-gray-300 hover:bg-gray-800"
                          : "text-gray-500 hover:text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    <span className={`text-xs ${done ? "text-emerald-400" : isExam ? "text-yellow-500" : "text-gray-600"}`}>
                      {done ? "✅" : isExam ? "📝" : "○"}
                    </span>
                    <span className={isExam && !done ? "text-yellow-500/70" : ""}>{lesson.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
