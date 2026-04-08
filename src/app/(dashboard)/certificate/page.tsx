"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocalProgress } from "@/hooks/use-local-progress";
import Link from "next/link";

const MIN_LESSONS = 50;

export default function CertificatePage() {
  const { user, loading: authLoading } = useAuth();
  const { completedCount, level, xp } = useLocalProgress();

  const defaultName = user?.user_metadata?.name || "";
  const [studentName, setStudentName] = useState("");
  const [nameConfirmed, setNameConfirmed] = useState(false);

  const displayName = nameConfirmed
    ? studentName
    : defaultName || studentName;

  const today = new Date().toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (authLoading) {
    return (
      <div className="max-w-3xl mx-auto py-12">
        <p className="text-gray-500 text-center">Загрузка...</p>
      </div>
    );
  }

  if (completedCount < MIN_LESSONS) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-6">
        <div className="text-6xl mb-4">📜</div>
        <h1 className="text-2xl font-bold text-white">
          Сертификат пока недоступен
        </h1>
        <p className="text-gray-400 max-w-md mx-auto">
          Для получения сертификата необходимо пройти минимум{" "}
          <span className="text-emerald-400 font-semibold">{MIN_LESSONS} уроков</span>.
          Сейчас пройдено:{" "}
          <span className="text-white font-semibold">{completedCount}</span>.
        </p>
        <div className="w-full max-w-xs mx-auto bg-gray-800 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((completedCount / MIN_LESSONS) * 100, 100)}%` }}
          />
        </div>
        <p className="text-sm text-gray-500">
          Осталось ещё {MIN_LESSONS - completedCount} уроков
        </p>
        <Link
          href="/courses"
          className="inline-block px-6 py-2.5 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors"
        >
          Продолжить обучение
        </Link>
      </div>
    );
  }

  // Name entry step (if no user name from auth)
  if (!defaultName && !nameConfirmed) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-6">
        <div className="text-6xl mb-4">🎓</div>
        <h1 className="text-2xl font-bold text-white">
          Поздравляем с завершением!
        </h1>
        <p className="text-gray-400">
          Введите ваше имя для сертификата
        </p>
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Ваше имя"
          className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white text-center text-lg focus:outline-none focus:border-emerald-500 transition-colors"
        />
        <button
          onClick={() => {
            if (studentName.trim()) setNameConfirmed(true);
          }}
          disabled={!studentName.trim()}
          className="px-6 py-2.5 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Сгенерировать сертификат
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          nav, aside, .no-print {
            display: none !important;
          }
          main {
            padding: 0 !important;
          }
          .certificate-wrapper {
            background: white !important;
            padding: 0 !important;
            display: flex;
            justify-content: center;
          }
          .certificate-card {
            box-shadow: none !important;
            border: 3px solid #10b981 !important;
            max-width: 100% !important;
            margin: 0 !important;
          }
        }
      `}</style>

      <div className="certificate-wrapper max-w-4xl mx-auto py-8 space-y-6">
        {/* Action bar */}
        <div className="no-print flex items-center justify-between">
          <Link
            href="/profile"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            &larr; Назад в профиль
          </Link>
          <button
            onClick={() => window.print()}
            className="px-5 py-2.5 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Скачать PDF
          </button>
        </div>

        {/* Certificate */}
        <div className="certificate-card bg-white rounded-2xl border-[3px] border-emerald-500 p-1 shadow-2xl shadow-emerald-500/10">
          <div className="border-2 border-emerald-200 rounded-xl p-10 sm:p-14 text-center space-y-8">
            {/* Logo */}
            <div>
              <p className="text-emerald-600 font-mono text-sm tracking-[0.3em] uppercase">
                &lt;/&gt;
              </p>
              <h1 className="text-3xl font-bold text-gray-900 tracking-wide">
                CodeSchool
              </h1>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-emerald-300" />
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <div className="h-px w-16 bg-emerald-300" />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 tracking-wide">
                Сертификат об окончании
              </h2>
              <p className="text-sm text-gray-500">
                Certificate of Completion
              </p>
            </div>

            {/* Confirm text */}
            <p className="text-gray-600 text-sm">
              Настоящим подтверждается, что
            </p>

            {/* Student name */}
            <div className="py-2">
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 border-b-2 border-emerald-400 inline-block pb-2 px-8">
                {displayName}
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-600 max-w-lg mx-auto leading-relaxed">
              успешно завершил(а) курс программирования на платформе CodeSchool,
              продемонстрировав знания и навыки в области веб-разработки.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto py-4">
              <div className="space-y-1">
                <p className="text-2xl font-bold text-emerald-600">
                  {completedCount}
                </p>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Уроков
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-emerald-600">
                  {xp}
                </p>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  XP
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-lg font-bold text-emerald-600">
                  {level.icon} {level.name}
                </p>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Уровень
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-emerald-300" />
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <div className="h-px w-16 bg-emerald-300" />
            </div>

            {/* Date and signature */}
            <div className="flex items-end justify-between max-w-md mx-auto pt-4">
              <div className="text-left">
                <p className="text-sm font-medium text-gray-700">{today}</p>
                <p className="text-xs text-gray-400 mt-1">Дата выдачи</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700 font-mono">
                  CodeSchool
                </p>
                <p className="text-xs text-gray-400 mt-1">Платформа</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
