import Link from "next/link";

interface LessonCardProps {
  id: string;
  title: string;
  module: string;
}

export function LessonCard({ id, title, module }: LessonCardProps) {
  return (
    <Link
      href={`/lesson/${id}`}
      className="block p-4 rounded-lg border border-gray-800 bg-gray-900 hover:border-emerald-500/50 transition-colors"
    >
      <p className="text-xs text-gray-500 mb-1">{module}</p>
      <h3 className="text-white font-medium">{title}</h3>
    </Link>
  );
}
