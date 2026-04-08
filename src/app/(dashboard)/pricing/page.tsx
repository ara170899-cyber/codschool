import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "0",
    period: "",
    description: "Начните учиться бесплатно",
    cta: "Начать бесплатно",
    ctaHref: "/courses",
    highlighted: false,
    features: [
      { label: "Модули 0-8 (30 уроков)", included: true },
      { label: "Код в браузере", included: true },
      { label: "Автопроверка задач", included: true },
      { label: "Модули 9-34 (120+ уроков)", included: false },
      { label: "AI-ассистент", included: false },
      { label: "Daily Challenge", included: false },
      { label: "Сертификат", included: false },
      { label: "Coding Battles", included: false },
    ],
  },
  {
    name: "Pro",
    price: "990",
    period: "/ мес",
    description: "Полный доступ ко всему",
    cta: "Оформить подписку",
    ctaHref: "#",
    highlighted: true,
    badge: "Рекомендуем",
    features: [
      { label: "Модули 0-8 (30 уроков)", included: true },
      { label: "Код в браузере", included: true },
      { label: "Автопроверка задач", included: true },
      { label: "Модули 9-34 (120+ уроков)", included: true },
      { label: "AI-ассистент", included: true },
      { label: "Daily Challenge", included: true },
      { label: "Сертификат", included: true },
      { label: "Coding Battles", included: true },
    ],
  },
  {
    name: "Lifetime",
    price: "6 990",
    period: "навсегда",
    description: "Одна оплата — доступ навсегда",
    cta: "Оформить подписку",
    ctaHref: "#",
    highlighted: false,
    features: [
      { label: "Модули 0-8 (30 уроков)", included: true },
      { label: "Код в браузере", included: true },
      { label: "Автопроверка задач", included: true },
      { label: "Модули 9-34 (120+ уроков)", included: true },
      { label: "AI-ассистент", included: true },
      { label: "Daily Challenge", included: true },
      { label: "Сертификат", included: true },
      { label: "Coding Battles", included: true },
    ],
  },
];

const comparisonRows = [
  { feature: "Уроки 0-8", free: true, pro: true },
  { feature: "Уроки 9-34", free: false, pro: true },
  { feature: "AI-ассистент", free: false, pro: true },
  { feature: "Daily Challenge", free: false, pro: true },
  { feature: "Сертификат", free: false, pro: true },
  { feature: "Coding Battles", free: false, pro: true },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-950 py-12 sm:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            Выберите свой <span className="text-emerald-400">план</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Начните бесплатно, перейдите на Pro когда будете готовы к продвинутым темам
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-8 flex flex-col ${
                plan.highlighted
                  ? "border-emerald-500 bg-gray-900 shadow-lg shadow-emerald-500/10"
                  : "border-gray-800 bg-gray-900/50"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-4 py-1 text-xs font-semibold text-white">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {(plan as Record<string, unknown>).badge as string}
                </span>
              )}

              <h3 className="text-lg font-semibold text-white mb-1">{plan.name}</h3>
              <p className="text-sm text-gray-400 mb-6">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-white">{plan.price} &#8381;</span>
                {plan.period && (
                  <span className="text-gray-400 text-sm ml-1">{plan.period}</span>
                )}
              </div>

              <Link
                href={plan.ctaHref}
                className={`block rounded-xl py-3 text-center text-sm font-semibold transition-colors mb-8 ${
                  plan.highlighted
                    ? "bg-emerald-500 text-white hover:bg-emerald-600"
                    : "border border-gray-700 text-gray-300 hover:bg-gray-800"
                }`}
              >
                {plan.cta}
              </Link>

              <ul className="space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f.label} className="flex items-center gap-3 text-sm">
                    {f.included ? (
                      <svg className="h-4 w-4 flex-shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4 flex-shrink-0 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    <span className={f.included ? "text-gray-300" : "text-gray-600"}>
                      {f.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Сравнение планов
          </h2>
          <div className="rounded-xl border border-gray-800 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-900/80">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Функция</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Бесплатно</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-emerald-400">Pro</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="border-b border-gray-800/50 last:border-0">
                    <td className="py-3 px-4 text-sm text-gray-300">{row.feature}</td>
                    <td className="py-3 px-4 text-center">
                      {row.free ? (
                        <span className="text-emerald-400 text-lg">&#10003;</span>
                      ) : (
                        <span className="text-gray-600 text-lg">&#10007;</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.pro ? (
                        <span className="text-emerald-400 text-lg">&#10003;</span>
                      ) : (
                        <span className="text-gray-600 text-lg">&#10007;</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ-like bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm">
            Есть вопросы? Напишите нам в{" "}
            <a href="#" className="text-emerald-400 hover:underline">
              Telegram
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
