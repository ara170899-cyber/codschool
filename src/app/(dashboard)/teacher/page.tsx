"use client";

import { useAuth } from "@/hooks/use-auth";

export default function TeacherPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <p className="text-gray-500 text-center">Загрузка...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Dashboard преподавателя</h1>
        <p className="text-gray-400">Войдите как преподаватель для доступа</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white">Dashboard преподавателя</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Учеников" value="—" />
        <StatCard label="Уроков пройдено" value="—" />
        <StatCard label="Средний прогресс" value="—" />
      </div>

      <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Ученики группы</h2>
        <p className="text-sm text-gray-500">
          Создайте группу и добавьте учеников для отслеживания их прогресса.
        </p>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-white mt-1">{value}</p>
    </div>
  );
}
