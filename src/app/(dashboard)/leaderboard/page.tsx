"use client";

import { useState, useEffect } from "react";

interface LeaderboardUser {
  rank: number;
  name: string;
  xp: number;
  level: number;
  streak: number;
  isCurrentUser?: boolean;
}

const USERNAME_KEY = "codeschool_username";
const DAILY_KEY = "codeschool_daily_results";
const PROGRESS_KEY = "codeschool_progress";

function getStoredUsername(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(USERNAME_KEY);
}

function calculateUserXP(): number {
  if (typeof window === "undefined") return 0;
  try {
    const stored = localStorage.getItem(PROGRESS_KEY);
    const completedLessons = stored ? JSON.parse(stored).length : 0;
    const dailyResults = localStorage.getItem(DAILY_KEY);
    const dailySolved = dailyResults
      ? JSON.parse(dailyResults).filter((r: { passed: boolean }) => r.passed).length
      : 0;
    return completedLessons * 100 + dailySolved * 50;
  } catch {
    return 0;
  }
}

function getUserLevel(xp: number): number {
  return Math.floor(xp / 500) + 1;
}

function getUserStreak(): number {
  if (typeof window === "undefined") return 0;
  try {
    const dailyResults = localStorage.getItem(DAILY_KEY);
    if (!dailyResults) return 0;
    const results = JSON.parse(dailyResults).filter((r: { passed: boolean }) => r.passed);
    if (results.length === 0) return 0;
    const passedDates = new Set(results.map((r: { date: string }) => r.date));
    let streak = 0;
    const d = new Date();
    const today = d.toISOString().split("T")[0];
    if (!passedDates.has(today)) {
      d.setDate(d.getDate() - 1);
    }
    while (true) {
      const dateStr = d.toISOString().split("T")[0];
      if (passedDates.has(dateStr)) {
        streak++;
        d.setDate(d.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  } catch {
    return 0;
  }
}

const MOCK_USERS: Omit<LeaderboardUser, "rank">[] = [
  { name: "Алексей К.", xp: 4850, level: 10, streak: 14 },
  { name: "Мария С.", xp: 4200, level: 9, streak: 7 },
  { name: "Дмитрий В.", xp: 3800, level: 8, streak: 21 },
  { name: "Елена П.", xp: 3500, level: 8, streak: 5 },
  { name: "Иван Г.", xp: 3100, level: 7, streak: 12 },
  { name: "Анна Л.", xp: 2900, level: 6, streak: 3 },
  { name: "Сергей М.", xp: 2600, level: 6, streak: 9 },
  { name: "Ольга Н.", xp: 2300, level: 5, streak: 2 },
  { name: "Павел Р.", xp: 2000, level: 5, streak: 6 },
  { name: "Наталья Ф.", xp: 1750, level: 4, streak: 1 },
  { name: "Артём Б.", xp: 1500, level: 4, streak: 4 },
  { name: "Юлия Д.", xp: 1200, level: 3, streak: 0 },
  { name: "Максим Т.", xp: 900, level: 2, streak: 0 },
  { name: "Кристина З.", xp: 600, level: 2, streak: 1 },
  { name: "Роман Х.", xp: 350, level: 1, streak: 0 },
];

export default function LeaderboardPage() {
  const [username, setUsername] = useState<string | null>(null);
  const [inputName, setInputName] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [users, setUsers] = useState<LeaderboardUser[]>([]);

  useEffect(() => {
    const stored = getStoredUsername();
    if (stored) {
      setUsername(stored);
    } else {
      setShowPrompt(true);
    }
  }, []);

  useEffect(() => {
    if (!username) return;

    const userXP = calculateUserXP();
    const userLevel = getUserLevel(userXP);
    const userStreak = getUserStreak();

    const currentUser: Omit<LeaderboardUser, "rank"> = {
      name: username,
      xp: userXP,
      level: userLevel,
      streak: userStreak,
      isCurrentUser: true,
    };

    const allUsers = [...MOCK_USERS, currentUser]
      .sort((a, b) => b.xp - a.xp)
      .map((u, i) => ({ ...u, rank: i + 1 }));

    setUsers(allUsers);
  }, [username]);

  function handleSaveName() {
    const name = inputName.trim();
    if (!name) return;
    localStorage.setItem(USERNAME_KEY, name);
    setUsername(name);
    setShowPrompt(false);
  }

  if (showPrompt) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-8 max-w-sm w-full text-center">
          <h2 className="text-xl font-bold text-white mb-2">Как вас зовут?</h2>
          <p className="text-gray-400 text-sm mb-6">Это имя будет видно в таблице лидеров</p>
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
            placeholder="Ваше имя"
            className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500 mb-4"
            autoFocus
          />
          <button
            onClick={handleSaveName}
            disabled={!inputName.trim()}
            className="w-full px-4 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-500 disabled:opacity-50 transition-colors"
          >
            Продолжить
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Таблица лидеров</h1>
          <p className="text-gray-400 text-sm">Топ учеников по опыту (XP)</p>
        </div>

        {/* Top 3 podium */}
        {users.length >= 3 && (
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[users[1], users[0], users[2]].map((user, i) => {
              const podiumColors = [
                "border-gray-500 bg-gray-500/5",
                "border-yellow-500 bg-yellow-500/5",
                "border-amber-700 bg-amber-700/5",
              ];
              const medals = ["🥈", "🥇", "🥉"];
              return (
                <div
                  key={user.name}
                  className={`rounded-xl border p-4 text-center ${podiumColors[i]} ${
                    user.isCurrentUser ? "ring-2 ring-emerald-400" : ""
                  } ${i === 1 ? "transform -translate-y-2" : ""}`}
                >
                  <div className="text-3xl mb-2">{medals[i]}</div>
                  <p className={`font-semibold text-sm ${user.isCurrentUser ? "text-emerald-400" : "text-white"}`}>
                    {user.name}
                  </p>
                  <p className="text-emerald-400 font-bold text-lg mt-1">{user.xp.toLocaleString()} XP</p>
                  <p className="text-gray-400 text-xs mt-1">Уровень {user.level}</p>
                  {user.streak > 0 && (
                    <p className="text-orange-400 text-xs mt-1">{user.streak} дн. 🔥</p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Full table */}
        <div className="rounded-xl border border-gray-800 bg-gray-900 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wider">
                <th className="px-4 py-3 text-left w-16">#</th>
                <th className="px-4 py-3 text-left">Имя</th>
                <th className="px-4 py-3 text-right">XP</th>
                <th className="px-4 py-3 text-center hidden sm:table-cell">Уровень</th>
                <th className="px-4 py-3 text-center hidden sm:table-cell">Серия</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.name}
                  className={`border-b border-gray-800/50 transition-colors ${
                    user.isCurrentUser
                      ? "bg-emerald-500/5 hover:bg-emerald-500/10"
                      : "hover:bg-gray-800/50"
                  }`}
                >
                  <td className="px-4 py-3 text-sm">
                    <span className={user.rank <= 3 ? "text-yellow-400 font-bold" : "text-gray-500"}>
                      {user.rank}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-medium ${user.isCurrentUser ? "text-emerald-400" : "text-white"}`}>
                      {user.name}
                      {user.isCurrentUser && (
                        <span className="ml-2 text-xs text-emerald-400/60">(вы)</span>
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-sm text-emerald-400 font-semibold">
                      {user.xp.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center hidden sm:table-cell">
                    <span className="text-sm text-gray-300">{user.level}</span>
                  </td>
                  <td className="px-4 py-3 text-center hidden sm:table-cell">
                    {user.streak > 0 ? (
                      <span className="text-sm text-orange-400">{user.streak} 🔥</span>
                    ) : (
                      <span className="text-sm text-gray-600">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Change name */}
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              const newName = prompt("Введите новое имя:");
              if (newName?.trim()) {
                localStorage.setItem(USERNAME_KEY, newName.trim());
                setUsername(newName.trim());
              }
            }}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            Изменить имя
          </button>
        </div>
      </div>
    </div>
  );
}
