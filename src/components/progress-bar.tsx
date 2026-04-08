// TODO: Sprint 3 — Course progress bar
export function ProgressBar({ progress = 0 }: { progress?: number }) {
  return (
    <div className="w-full bg-gray-800 rounded-full h-2">
      <div
        className="bg-emerald-500 h-2 rounded-full transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
