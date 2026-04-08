"use client";

import { useState } from "react";

interface Section {
  id: string;
  title: string;
  icon: string;
  content: React.ReactNode;
}

function CollapseIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
      {children}
    </span>
  );
}

const sections: Section[] = [
  {
    id: "resume",
    title: "Как составить резюме",
    icon: "📄",
    content: (
      <div className="space-y-6">
        <div>
          <h4 className="text-white font-medium mb-3">Шаблон резюме Python-разработчика</h4>
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 font-mono text-sm text-gray-300 space-y-2">
            <p className="text-emerald-400 font-semibold">Иванов Иван Иванович</p>
            <p>Junior Python Developer</p>
            <p className="text-gray-500">Москва | telegram: @ivan | ivan@email.com</p>
            <hr className="border-gray-700" />
            <p className="text-yellow-400">О себе:</p>
            <p>Начинающий Python-разработчик. Изучаю Python 6 месяцев. Написал 5 pet-проектов. Знаком с основами SQL, Git, REST API. Хочу развиваться в бэкенд-разработке.</p>
            <hr className="border-gray-700" />
            <p className="text-yellow-400">Навыки:</p>
            <p>Python, Git, SQL, REST API, ООП, FastAPI, PostgreSQL</p>
            <hr className="border-gray-700" />
            <p className="text-yellow-400">Проекты:</p>
            <p>Todo API — REST API на FastAPI с CRUD операциями</p>
            <p>Telegram-бот — бот для отслеживания расходов</p>
            <hr className="border-gray-700" />
            <p className="text-yellow-400">Образование:</p>
            <p>CodeSchool — Курс &quot;Python с нуля до Junior&quot;</p>
          </div>
        </div>

        <div>
          <h4 className="text-white font-medium mb-3">Что писать, если нет опыта</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex gap-2"><span className="text-emerald-400">&#x2713;</span> Опишите свои pet-проекты как рабочий опыт</li>
            <li className="flex gap-2"><span className="text-emerald-400">&#x2713;</span> Укажите пройденные курсы и сертификаты</li>
            <li className="flex gap-2"><span className="text-emerald-400">&#x2713;</span> Добавьте ссылку на GitHub с проектами</li>
            <li className="flex gap-2"><span className="text-emerald-400">&#x2713;</span> Напишите, что готовы учиться и работать в команде</li>
            <li className="flex gap-2"><span className="text-emerald-400">&#x2713;</span> Укажите конкретные технологии, а не &quot;знаю Python&quot;</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-3">Навыки для указания</h4>
          <div className="flex flex-wrap gap-2">
            {["Python", "Git", "SQL", "REST API", "ООП", "FastAPI", "PostgreSQL", "Linux", "Docker", "JSON"].map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-medium mb-3">Примеры формулировок</h4>
          <div className="space-y-3">
            <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
              <p className="text-red-400 text-xs mb-1">&#x2717; Плохо</p>
              <p className="text-gray-400 text-sm">&quot;Знаю Python, работал с базами данных&quot;</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
              <p className="text-emerald-400 text-xs mb-1">&#x2713; Хорошо</p>
              <p className="text-gray-300 text-sm">&quot;Разработал REST API на FastAPI с авторизацией через JWT. Использовал PostgreSQL для хранения данных. Покрыл тестами 80% кода&quot;</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "interview",
    title: "Как пройти собеседование",
    icon: "🎯",
    content: (
      <div className="space-y-6">
        <div>
          <h4 className="text-white font-medium mb-3">10 типичных вопросов на Junior Python</h4>
          <div className="space-y-3">
            {[
              {
                q: "Что такое ООП?",
                a: "Объектно-ориентированное программирование — парадигма, основанная на концепции объектов, которые содержат данные (атрибуты) и код (методы). Основные принципы: инкапсуляция, наследование, полиморфизм, абстракция.",
              },
              {
                q: "В чём разница между list и tuple?",
                a: "list — изменяемая коллекция (можно добавлять, удалять элементы). tuple — неизменяемая (после создания нельзя менять). Tuple быстрее и может быть ключом словаря.",
              },
              {
                q: "Что такое декоратор?",
                a: "Функция, которая принимает другую функцию и расширяет её поведение, не меняя код исходной функции. Применяется через @decorator перед определением функции.",
              },
              {
                q: "Чем отличается == от is?",
                a: "== сравнивает значения объектов. is проверяет, ссылаются ли переменные на один и тот же объект в памяти.",
              },
              {
                q: "Что такое GIL?",
                a: "Global Interpreter Lock — механизм в CPython, который позволяет только одному потоку исполнять Python-код в каждый момент времени. Для параллелизма используют multiprocessing.",
              },
              {
                q: "Что такое виртуальное окружение?",
                a: "Изолированная среда Python, которая позволяет устанавливать пакеты для конкретного проекта, не влияя на глобальную установку. Создаётся через python -m venv.",
              },
              {
                q: "Что такое args и kwargs?",
                a: "*args позволяет передать произвольное количество позиционных аргументов (tuple). **kwargs — произвольное количество именованных аргументов (dict).",
              },
              {
                q: "Как работает try/except?",
                a: "try — блок кода, который может вызвать исключение. except — обработчик ошибки. Можно ловить конкретные типы исключений. finally выполнится в любом случае.",
              },
              {
                q: "Что такое list comprehension?",
                a: "Краткий синтаксис для создания списков: [x**2 for x in range(10) if x % 2 == 0]. Работает быстрее обычного цикла с append.",
              },
              {
                q: "Что такое REST API?",
                a: "Архитектурный стиль взаимодействия по HTTP. Использует методы GET, POST, PUT, DELETE. Данные передаются в JSON. Stateless — сервер не хранит состояние клиента.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                <p className="text-emerald-400 font-medium text-sm mb-2">
                  {i + 1}. {item.q}
                </p>
                <p className="text-gray-300 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-medium mb-3">Как готовиться к техническому интервью</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex gap-2"><span className="text-yellow-400">1.</span> Повторите основы: типы данных, структуры данных, ООП</li>
            <li className="flex gap-2"><span className="text-yellow-400">2.</span> Решайте задачи на LeetCode (Easy уровень)</li>
            <li className="flex gap-2"><span className="text-yellow-400">3.</span> Подготовьте рассказ о своих проектах (2-3 минуты)</li>
            <li className="flex gap-2"><span className="text-yellow-400">4.</span> Повторите SQL: SELECT, JOIN, GROUP BY</li>
            <li className="flex gap-2"><span className="text-yellow-400">5.</span> Разберитесь с Git: merge, rebase, cherry-pick</li>
            <li className="flex gap-2"><span className="text-yellow-400">6.</span> Почитайте про HTTP, REST, статусы ответов</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-3">Советы по live coding</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex gap-2"><span className="text-emerald-400">&#x2713;</span> Проговаривайте свои мысли вслух</li>
            <li className="flex gap-2"><span className="text-emerald-400">&#x2713;</span> Начните с простого решения, потом оптимизируйте</li>
            <li className="flex gap-2"><span className="text-emerald-400">&#x2713;</span> Задавайте уточняющие вопросы перед решением</li>
            <li className="flex gap-2"><span className="text-emerald-400">&#x2713;</span> Проверьте граничные случаи (пустой список, None)</li>
            <li className="flex gap-2"><span className="text-emerald-400">&#x2713;</span> Не молчите, даже если застряли — расскажите, что пробуете</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "jobs",
    title: "Где искать работу",
    icon: "🔍",
    content: (
      <div className="space-y-6">
        <div>
          <h4 className="text-white font-medium mb-3">Площадки для поиска</h4>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { name: "hh.ru", desc: "Главная площадка в СНГ. Фильтруйте по «без опыта» и «Junior»", color: "text-red-400" },
              { name: "Хабр Карьера", desc: "IT-вакансии. Хорошие фильтры по технологиям", color: "text-emerald-400" },
              { name: "LinkedIn", desc: "Международная сеть. Оформите профиль на английском", color: "text-blue-400" },
              { name: "Telegram-каналы", desc: "@python_vacancy, @devjobs, @remote_it — свежие вакансии каждый день", color: "text-cyan-400" },
              { name: "GitHub Jobs", desc: "Вакансии в open-source проектах. Часто remote", color: "text-purple-400" },
              { name: "Getmatch", desc: "Платформа, где компании сами находят вас по профилю", color: "text-orange-400" },
            ].map((platform) => (
              <div key={platform.name} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                <p className={`font-medium text-sm mb-1 ${platform.color}`}>{platform.name}</p>
                <p className="text-gray-400 text-xs">{platform.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-medium mb-3">Советы по откликам</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex gap-2"><span className="text-yellow-400">&#x2022;</span> Откликайтесь на 5-10 вакансий в день</li>
            <li className="flex gap-2"><span className="text-yellow-400">&#x2022;</span> Адаптируйте резюме под каждую вакансию</li>
            <li className="flex gap-2"><span className="text-yellow-400">&#x2022;</span> Пишите сопроводительное письмо — это выделяет вас</li>
            <li className="flex gap-2"><span className="text-yellow-400">&#x2022;</span> Не бойтесь откликаться, если подходите на 60% требований</li>
            <li className="flex gap-2"><span className="text-yellow-400">&#x2022;</span> Следите за новыми вакансиями — отклик в первый день повышает шансы</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-3">Шаблон сопроводительного письма</h4>
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 text-sm text-gray-300 space-y-2">
            <p>Здравствуйте!</p>
            <p>Меня зовут <span className="text-emerald-400">[Имя]</span>, я начинающий Python-разработчик. Откликаюсь на вакансию <span className="text-emerald-400">[название]</span>.</p>
            <p>Последние 6 месяцев активно изучаю Python: прошёл курс CodeSchool, написал несколько проектов — REST API на FastAPI, Telegram-бот, парсер данных. Все проекты есть на моём <span className="text-emerald-400">GitHub</span>.</p>
            <p>Из технологий знаком с: Python, SQL, Git, FastAPI, PostgreSQL. Готов быстро осваивать новые инструменты.</p>
            <p>Буду рад возможности обсудить вакансию подробнее.</p>
            <p className="text-gray-500">С уважением, [Имя]</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "portfolio",
    title: "Портфолио на GitHub",
    icon: "💼",
    content: (
      <div className="space-y-6">
        <div>
          <h4 className="text-white font-medium mb-3">Что должно быть в профиле</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex gap-2"><span className="text-emerald-400">&#x2713;</span> Аватарка (фото или стильный аватар)</li>
            <li className="flex gap-2"><span className="text-emerald-400">&#x2713;</span> Имя и краткое описание: &quot;Junior Python Developer&quot;</li>
            <li className="flex gap-2"><span className="text-emerald-400">&#x2713;</span> Ссылка на Telegram или email</li>
            <li className="flex gap-2"><span className="text-emerald-400">&#x2713;</span> Закреплённые (pinned) репозитории — 3-6 лучших проектов</li>
            <li className="flex gap-2"><span className="text-emerald-400">&#x2713;</span> Зелёный график коммитов — показывает активность</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-3">Как оформить README проекта</h4>
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 font-mono text-sm text-gray-300 space-y-1">
            <p className="text-emerald-400"># Название проекта</p>
            <p className="text-gray-500">Краткое описание: что делает, зачем нужен</p>
            <p></p>
            <p className="text-emerald-400">## Технологии</p>
            <p className="text-gray-500">Python, FastAPI, PostgreSQL, Docker</p>
            <p></p>
            <p className="text-emerald-400">## Установка</p>
            <p className="text-gray-500">git clone, pip install, .env пример</p>
            <p></p>
            <p className="text-emerald-400">## Использование</p>
            <p className="text-gray-500">Примеры запросов, скриншоты</p>
            <p></p>
            <p className="text-emerald-400">## Структура проекта</p>
            <p className="text-gray-500">Дерево файлов с пояснениями</p>
          </div>
        </div>

        <div>
          <h4 className="text-white font-medium mb-3">Какие проекты показать</h4>
          <div className="space-y-2 text-gray-300 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-yellow-400 mt-0.5">1.</span>
              <div><span className="text-white">REST API</span> — показывает знание бэкенда, HTTP, баз данных</div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-yellow-400 mt-0.5">2.</span>
              <div><span className="text-white">Telegram-бот</span> — асинхронность, работа с внешними API</div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-yellow-400 mt-0.5">3.</span>
              <div><span className="text-white">Парсер</span> — работа с данными, регулярные выражения</div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-yellow-400 mt-0.5">4.</span>
              <div><span className="text-white">CLI-утилита</span> — аргументы, файловая система</div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-yellow-400 mt-0.5">5.</span>
              <div><span className="text-white">Что-то уникальное</span> — бот для Discord, визуализация, игра</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export default function CareerPage() {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Карьерный трек</h1>
        <p className="text-gray-400">
          Всё, что нужно для старта карьеры Python-разработчика: резюме, собеседования, поиск работы и портфолио.
        </p>
      </div>

      {/* Progress hint */}
      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 flex items-start gap-3">
        <span className="text-2xl">🚀</span>
        <div>
          <p className="text-emerald-400 font-medium text-sm">Совет</p>
          <p className="text-gray-400 text-sm">
            Начните с портфолио на GitHub. Даже 2-3 хорошо оформленных проекта значат больше, чем сертификат.
          </p>
        </div>
      </div>

      {/* Collapsible sections */}
      <div className="space-y-3">
        {sections.map((section) => {
          const isOpen = openSections.has(section.id);
          return (
            <div
              key={section.id}
              className="bg-gray-900/80 border border-gray-800 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggle(section.id)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-800/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{section.icon}</span>
                  <span className="text-white font-medium">{section.title}</span>
                </div>
                <CollapseIcon open={isOpen} />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 border-t border-gray-800/50 pt-4">
                  {section.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
