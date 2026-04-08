"use client";

interface Project {
  title: string;
  description: string;
  learns: string;
  difficulty: number;
  technologies: string[];
  icon: string;
}

const projects: Project[] = [
  {
    title: "Todo API",
    description:
      "REST API для управления задачами. CRUD операции, авторизация через JWT, хранение данных в PostgreSQL. Документация через Swagger.",
    learns:
      "Работа с HTTP-методами, базами данных, валидацией данных и аутентификацией. Основы построения бэкенд-сервисов.",
    difficulty: 2,
    technologies: ["Python", "FastAPI", "PostgreSQL", "JWT", "Pydantic"],
    icon: "📋",
  },
  {
    title: "Telegram-бот",
    description:
      "Бот с командами для отслеживания расходов. Пользователь вводит сумму и категорию, бот сохраняет данные и показывает статистику по дням и категориям.",
    learns:
      "Асинхронное программирование, работа с Telegram API, хранение данных, обработка команд и состояний.",
    difficulty: 2,
    technologies: ["Python", "aiogram", "SQLite", "asyncio"],
    icon: "🤖",
  },
  {
    title: "Парсер сайтов",
    description:
      "Скрипт для сбора данных с сайтов объявлений. Парсит название, цену, ссылку. Сохраняет результаты в CSV и отправляет уведомления при появлении новых объявлений.",
    learns:
      "Работа с HTML, HTTP-запросами, регулярными выражениями, сохранение данных в файлы.",
    difficulty: 3,
    technologies: ["Python", "BeautifulSoup", "requests", "CSV", "re"],
    icon: "🕷️",
  },
  {
    title: "Дашборд с графиками",
    description:
      "Веб-приложение для визуализации данных. Загрузка CSV-файлов, построение графиков продаж, фильтрация по датам и категориям.",
    learns:
      "Визуализация данных, работа с библиотеками для графиков, обработка файлов, веб-интерфейс.",
    difficulty: 3,
    technologies: ["Python", "Streamlit", "Pandas", "Plotly", "CSV"],
    icon: "📊",
  },
  {
    title: "CLI-утилита",
    description:
      "Утилита командной строки для управления заметками. Создание, поиск, редактирование и удаление заметок. Хранение в JSON-файле. Цветной вывод в терминал.",
    learns:
      "Работа с аргументами командной строки, файловой системой, JSON, форматирование вывода.",
    difficulty: 1,
    technologies: ["Python", "argparse", "JSON", "colorama"],
    icon: "⌨️",
  },
];

function DifficultyStars({ level }: { level: number }) {
  return (
    <span className="text-sm" title={`Сложность: ${level}/3`}>
      {Array.from({ length: 3 }, (_, i) => (
        <span key={i} className={i < level ? "text-yellow-400" : "text-gray-700"}>
          &#x2B50;
        </span>
      ))}
    </span>
  );
}

function TechBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700">
      {children}
    </span>
  );
}

export default function ProjectsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Проекты для портфолио</h1>
        <p className="text-gray-400">
          5 реальных проектов, которые покажут работодателю ваши навыки. Каждый проект можно добавить на GitHub.
        </p>
      </div>

      {/* Info banner */}
      <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 flex items-start gap-3">
        <span className="text-2xl">💡</span>
        <div>
          <p className="text-blue-400 font-medium text-sm">Зачем нужны проекты?</p>
          <p className="text-gray-400 text-sm">
            Работодатели хотят видеть код, а не только дипломы. 3-5 проектов на GitHub — это лучшее доказательство ваших навыков.
          </p>
        </div>
      </div>

      {/* Project cards */}
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-gray-900/80 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{project.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-semibold">{project.title}</h3>
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 uppercase tracking-wider">
                      Скоро
                    </span>
                  </div>
                  <DifficultyStars level={project.difficulty} />
                </div>
              </div>
            </div>

            <p className="text-gray-300 text-sm mb-3">{project.description}</p>

            <div className="bg-gray-800/40 rounded-lg p-3 mb-4 border border-gray-700/30">
              <p className="text-xs text-emerald-400 font-medium mb-1">Чему научитесь:</p>
              <p className="text-gray-400 text-sm">{project.learns}</p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <TechBadge key={tech}>{tech}</TechBadge>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-6 text-center">
        <p className="text-gray-400 text-sm mb-2">
          Проекты с пошаговыми инструкциями появятся в ближайших обновлениях.
        </p>
        <p className="text-emerald-400 text-sm font-medium">
          А пока — пройдите все модули курса, чтобы быть готовым!
        </p>
      </div>
    </div>
  );
}
