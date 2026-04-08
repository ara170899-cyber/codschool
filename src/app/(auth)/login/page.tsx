"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/courses");
    router.refresh();
  }

  async function handleResetPassword() {
    if (!email) {
      setError("Введите email для восстановления пароля");
      return;
    }

    setResetLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });

    if (error) {
      setError(error.message);
      setResetLoading(false);
      return;
    }

    setResetSent(true);
    setResetLoading(false);
  }

  if (resetSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
        <div className="w-full max-w-md">
          <Link href="/" className="block text-center text-2xl font-bold text-white mb-8">
            Code<span className="text-emerald-400">School</span>
          </Link>
          <div className="p-8 rounded-xl bg-gray-900 border border-gray-800 text-center space-y-4">
            <div className="text-5xl">📧</div>
            <h1 className="text-xl font-bold text-white">Письмо отправлено</h1>
            <p className="text-gray-400 text-sm">
              Ссылка для сброса пароля отправлена на <span className="text-white font-medium">{email}</span>
            </p>
            <p className="text-gray-500 text-xs">
              Проверьте почту и перейдите по ссылке. Если письма нет — проверьте папку «Спам».
            </p>
            <button
              onClick={() => setResetSent(false)}
              className="mt-4 px-6 py-2.5 rounded-lg border border-gray-700 text-gray-300 text-sm hover:bg-gray-800 transition-colors"
            >
              Вернуться ко входу
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md">
        <Link href="/" className="block text-center text-2xl font-bold text-white mb-8">
          Code<span className="text-emerald-400">School</span>
        </Link>

        <form onSubmit={handleSubmit} className="p-8 rounded-xl bg-gray-900 border border-gray-800 space-y-4">
          <h1 className="text-xl font-bold text-white text-center">Вход</h1>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password" className="block text-sm text-gray-400">Пароль</label>
              <button
                type="button"
                onClick={handleResetPassword}
                disabled={resetLoading}
                className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors disabled:opacity-50"
              >
                {resetLoading ? "Отправка..." : "Забыли пароль?"}
              </button>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors disabled:opacity-50"
          >
            {loading ? "Вход..." : "Войти"}
          </button>

          <p className="text-center text-sm text-gray-500">
            Нет аккаунта?{" "}
            <Link href="/register" className="text-emerald-400 hover:underline">
              Зарегистрироваться
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
