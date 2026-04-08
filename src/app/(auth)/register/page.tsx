"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // If email confirmation is required, user won't have a session yet
    if (data.user && !data.session) {
      setSuccess(true);
      setLoading(false);
      return;
    }

    // If auto-confirmed (confirmation disabled in Supabase)
    router.push("/courses");
    router.refresh();
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
        <div className="w-full max-w-md">
          <Link href="/" className="block text-center text-2xl font-bold text-white mb-8">
            Code<span className="text-emerald-400">School</span>
          </Link>
          <div className="p-8 rounded-xl bg-gray-900 border border-gray-800 text-center space-y-4">
            <div className="text-5xl">📧</div>
            <h1 className="text-xl font-bold text-white">Проверьте почту!</h1>
            <p className="text-gray-400 text-sm">
              Мы отправили ссылку для подтверждения на <span className="text-white font-medium">{email}</span>
            </p>
            <p className="text-gray-500 text-xs">
              Нажмите на ссылку в письме, чтобы активировать аккаунт. После этого вы сможете войти.
            </p>
            <Link
              href="/login"
              className="inline-block mt-4 px-6 py-2.5 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors"
            >
              Перейти ко входу
            </Link>
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
          <h1 className="text-xl font-bold text-white text-center">Регистрация</h1>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm text-gray-400 mb-1">Имя</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
              placeholder="Как вас зовут"
            />
          </div>

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
            <label htmlFor="password" className="block text-sm text-gray-400 mb-1">Пароль</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
              placeholder="Минимум 6 символов"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors disabled:opacity-50"
          >
            {loading ? "Регистрация..." : "Создать аккаунт"}
          </button>

          <p className="text-center text-sm text-gray-500">
            Уже есть аккаунт?{" "}
            <Link href="/login" className="text-emerald-400 hover:underline">
              Войти
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
