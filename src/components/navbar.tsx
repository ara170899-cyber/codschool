"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";

const navLinks = [
  { href: "/courses", label: "Курсы" },
  { href: "/problems", label: "Задачи" },
  { href: "/course/ege-math", label: "ЕГЭ" },
  { href: "/daily", label: "Задача дня" },
  { href: "/leaderboard", label: "Лидеры" },
  { href: "/career", label: "Карьера" },
  { href: "/projects", label: "Проекты" },
  { href: "/pricing", label: "Тарифы" },
  { href: "/profile", label: "Профиль" },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="border-b border-gray-800 bg-gray-900/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-white">
          Code<span className="text-emerald-400">School</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href
                  ? "text-emerald-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <button
              onClick={signOut}
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              Выйти
            </button>
          ) : (
            <Link
              href="/login"
              className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Войти
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="sm:hidden text-gray-400 hover:text-white p-1"
          aria-label="Меню"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="sm:hidden border-t border-gray-800 bg-gray-900 px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block py-2 text-sm ${
                pathname === link.href ? "text-emerald-400" : "text-gray-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <button
              onClick={() => { signOut(); setMobileOpen(false); }}
              className="block py-2 text-sm text-gray-500"
            >
              Выйти
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm text-emerald-400"
            >
              Войти
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
