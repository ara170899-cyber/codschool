interface TaskPanelProps {
  task: string;
}

export function TaskPanel({ task }: TaskPanelProps) {
  return (
    <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
      <h3 className="text-sm font-semibold text-emerald-400 mb-2">Задание</h3>
      <div className="text-sm text-gray-300 space-y-1 whitespace-pre-line">
        {task}
      </div>
      <p className="mt-3 text-xs text-gray-600">
        Проверка мягкая: регистр букв и знаки препинания не важны. Главное — правильные слова и числа.
      </p>
    </div>
  );
}
