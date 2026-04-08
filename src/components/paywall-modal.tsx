"use client";

import Link from "next/link";
import { PRICING } from "@/lib/utils";

interface PaywallModalProps {
  lessonTitle?: string;
  onClose?: () => void;
}

const proFeatures = [
  "Все 35 модулей (150+ уроков)",
  "AI-ассистент для помощи",
  "Daily Challenge каждый день",
  "Сертификат по окончании",
  "Coding Battles с другими учениками",
];

export function PaywallModal({ lessonTitle, onClose }: PaywallModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-2xl">
        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 transition-colors"
            aria-label="Закрыть"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Lock icon */}
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
          <svg className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-white text-center mb-2">
          Этот урок доступен в Pro-подписке
        </h2>

        {lessonTitle && (
          <p className="text-sm text-gray-400 text-center mb-6">
            &laquo;{lessonTitle}&raquo; и все продвинутые уроки открываются с Pro
          </p>
        )}

        {/* Features */}
        <ul className="space-y-3 mb-6">
          {proFeatures.map((feature) => (
            <li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
              <svg className="h-4 w-4 flex-shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        {/* Price */}
        <div className="text-center mb-6">
          <span className="text-3xl font-bold text-white">{PRICING.monthly} {PRICING.currency}</span>
          <span className="text-gray-400 text-sm"> / мес</span>
        </div>

        {/* CTA */}
        <Link
          href="/pricing"
          className="block w-full rounded-xl bg-emerald-500 py-3 text-center text-base font-semibold text-white hover:bg-emerald-600 transition-colors"
        >
          Оформить подписку
        </Link>

        <Link
          href="/courses"
          className="block mt-3 text-center text-sm text-gray-500 hover:text-gray-300 transition-colors"
        >
          Вернуться к бесплатным урокам
        </Link>
      </div>
    </div>
  );
}
