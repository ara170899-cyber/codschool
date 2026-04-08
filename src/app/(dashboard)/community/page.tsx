"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "Я полный ноль, смогу ли я?",
    answer:
      "Абсолютно! Наш курс создан именно для начинающих с нуля. Мы начинаем с самых основ — что такое переменная, как написать первую строку кода. ИИ-ассистент всегда рядом и поможет разобраться. 90% наших учеников начинали без какого-либо опыта в программировании.",
  },
  {
    question: "Сколько времени нужно чтобы найти работу?",
    answer:
      "В среднем наши ученики выходят на уровень Junior Python-разработчика за 4-6 месяцев при занятиях 1-2 часа в день. Но всё индивидуально — кто-то быстрее, кто-то медленнее. Главное — регулярность. Даже 30 минут каждый день лучше, чем 5 часов раз в неделю.",
  },
  {
    question: "Нужно ли знать математику?",
    answer:
      "Для начала — нет. Базовая арифметика (сложение, умножение) — это всё, что нужно на старте. Продвинутая математика может понадобиться позже, если вы выберете направление Data Science или Machine Learning, но для веб-разработки и автоматизации она не обязательна.",
  },
  {
    question: "Какой компьютер нужен?",
    answer:
      "Подойдёт любой компьютер — Windows, Mac или Linux. Python работает везде. Наша платформа работает прямо в браузере, так что вам даже не нужно ничего устанавливать для начала обучения. Для комфортной работы достаточно 4 ГБ оперативной памяти.",
  },
  {
    question: "Можно ли учиться с телефона?",
    answer:
      "Теорию и некоторые задания можно проходить с телефона — наша платформа адаптирована для мобильных устройств. Но для полноценной практики рекомендуем использовать компьютер — писать код на клавиатуре значительно удобнее.",
  },
];

const TESTIMONIALS = [
  {
    name: "Анна",
    age: 28,
    initials: "АН",
    color: "bg-emerald-600",
    quote:
      "Я работала менеджером и думала, что программирование — это что-то запредельно сложное. Оказалось, что с правильным подходом и ИИ-помощником всё понятно. Через 4 месяца я уже прошла собеседование и получила оффер Junior Python-разработчика.",
    result: "За 4 месяца нашла работу Junior Python",
  },
  {
    name: "Пётр",
    age: 35,
    initials: "ПТ",
    color: "bg-blue-600",
    quote:
      "В 35 лет уйти из бухгалтерии в IT — звучит безумно, но я это сделал. Ключевым было то, что я мог учиться в своём темпе, а ИИ-ментор терпеливо объяснял всё по десятому разу. Сейчас автоматизирую бизнес-процессы на Python и зарабатываю в 2 раза больше.",
    result: "Перешёл из бухгалтерии в IT",
  },
  {
    name: "Мария",
    age: 22,
    initials: "МР",
    color: "bg-purple-600",
    quote:
      "Начала учиться просто из интереса, а через 2 месяца уже взяла первый заказ на фрилансе — написала парсер для интернет-магазина. Заказчик был доволен, а я поняла, что нашла своё дело. Сейчас у меня стабильный поток заказов.",
    result: "Первый фриланс-заказ через 2 месяца",
  },
];

export default function CommunityPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Сообщество</h1>
        <p className="text-gray-400 mt-2">
          Учитесь вместе — это эффективнее и веселее
        </p>
      </div>

      {/* Section 1: Telegram */}
      <section>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0 w-20 h-20 bg-sky-500/20 rounded-2xl flex items-center justify-center">
            <svg
              className="w-10 h-10 text-sky-400"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-2">
              Telegram-сообщество
            </h2>
            <p className="text-lg text-gray-300 mb-4">
              Присоединяйтесь к{" "}
              <span className="text-emerald-400 font-semibold">500+</span>{" "}
              ученикам, которые уже учатся вместе
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
              <Chip icon="💬" text="Помощь с задачами" />
              <Chip icon="👥" text="Общение с единомышленниками" />
              <Chip icon="🔥" text="Мотивация и поддержка" />
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-medium px-6 py-3 rounded-xl transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
              Присоединиться к чату
            </a>
          </div>
        </div>
      </section>

      {/* Section 2: Weekly Streams */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">
          Еженедельные стримы
        </h2>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-14 h-14 bg-red-500/20 rounded-xl flex items-center justify-center">
              <svg
                className="w-7 h-7 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-semibold text-white">
                  Каждую субботу в 15:00 МСК
                </h3>
                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-semibold rounded-full uppercase tracking-wide">
                  Скоро
                </span>
              </div>
              <p className="text-gray-400 mt-1">
                Живые эфиры с разбором задач и ответами на вопросы
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <StreamTopic
              icon="🧩"
              title="Разбор задач"
              description="Решаем сложные задачи вместе, объясняем подходы"
            />
            <StreamTopic
              icon="💻"
              title="Live Coding"
              description="Пишем реальные проекты в прямом эфире"
            />
            <StreamTopic
              icon="❓"
              title="Q&A сессии"
              description="Отвечаем на любые вопросы по Python и карьере"
            />
          </div>
        </div>
      </section>

      {/* Section 3: FAQ */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">
          Помощь сообщества
        </h2>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem key={i} question={item.question} answer={item.answer} />
          ))}
        </div>
      </section>

      {/* Section 4: Success Stories */}
      <section className="pb-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          Истории успеха
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-12 h-12 ${t.color} rounded-full flex items-center justify-center text-white font-bold text-sm`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-white font-semibold">
                    {t.name}, {t.age} лет
                  </p>
                  <p className="text-emerald-400 text-sm">{t.result}</p>
                </div>
              </div>
              <blockquote className="text-gray-300 text-sm leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Chip({ icon, text }: { icon: string; text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-gray-800 text-gray-300 text-sm px-3 py-1.5 rounded-full">
      <span>{icon}</span>
      {text}
    </span>
  );
}

function StreamTopic({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
      <div className="text-2xl mb-2">{icon}</div>
      <h4 className="text-white font-medium mb-1">{title}</h4>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-800/50 transition-colors"
      >
        <span className="text-white font-medium pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}
