"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "codeschool_onboarding_done";

export function Onboarding() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const done = localStorage.getItem(STORAGE_KEY);
      if (!done) setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const finish = (path?: string) => {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
    if (path) router.push(path);
  };

  const goNext = () => {
    setTransitioning(true);
    setTimeout(() => {
      setStep((s) => s + 1);
      setTransitioning(false);
    }, 200);
  };

  const dots = (
    <div className="flex items-center justify-center gap-2 mt-8">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
            i <= step ? "bg-emerald-400" : "bg-gray-700"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/80 backdrop-blur-sm">
      <div
        className={`w-full max-w-[500px] mx-4 rounded-2xl border border-gray-800 bg-gray-900 p-8 transition-opacity duration-200 ${
          transitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Step 1 */}
        {step === 0 && (
          <div className="text-center space-y-6">
            <div className="text-7xl">🚀</div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                Добро пожаловать в CodeSchool! 👋
              </h2>
              <p className="text-gray-400 mt-3 leading-relaxed">
                Здесь вы научитесь программировать на Python и подготовитесь к
                ЕГЭ по математике.
              </p>
            </div>
            <button
              onClick={goNext}
              className="px-8 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-colors"
            >
              Далее
            </button>
            {dots}
          </div>
        )}

        {/* Step 2 */}
        {step === 1 && (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-white">
              Как это работает
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: "📖", label: "Читайте теорию" },
                { icon: "✏️", label: "Решайте задачи" },
                { icon: "🤖", label: "ИИ поможет" },
              ].map((card) => (
                <div
                  key={card.label}
                  className="rounded-xl border border-gray-800 bg-gray-950 p-4 space-y-2"
                >
                  <div className="text-3xl">{card.icon}</div>
                  <p className="text-sm font-medium text-gray-300">
                    {card.label}
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={goNext}
              className="px-8 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-colors"
            >
              Далее
            </button>
            {dots}
          </div>
        )}

        {/* Step 3 */}
        {step === 2 && (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-white">Выберите курс</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => finish("/courses")}
                className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 text-left hover:border-emerald-500/40 transition-colors group"
              >
                <div className="text-4xl mb-2">🐍</div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                  Python
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  С нуля до Junior
                </p>
              </button>
              <button
                onClick={() => finish("/course/ege-math")}
                className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5 text-left hover:border-blue-500/40 transition-colors group"
              >
                <div className="text-4xl mb-2">📐</div>
                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                  ЕГЭ Математика
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Профильный уровень
                </p>
              </button>
            </div>
            <button
              onClick={() => finish()}
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              Пропустить
            </button>
            {dots}
          </div>
        )}
      </div>
    </div>
  );
}
