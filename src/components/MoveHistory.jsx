import { memo } from 'react';

function MoveHistory({ history }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200/60 bg-white/70 p-3 shadow-sm backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-800/70 sm:p-4">
      <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        Move History
      </h2>

      {history.length === 0 ? (
        <p className="flex flex-1 items-center justify-center text-sm text-slate-400 dark:text-slate-500">
          No moves yet
        </p>
      ) : (
        <ul className="max-h-48 space-y-1.5 overflow-y-auto pr-1 sm:max-h-64">
          {history.map((entry) => (
            <li
              key={entry.moveNumber}
              className="animate-fade-up flex items-center justify-between rounded-lg bg-slate-50/80 px-3 py-2 text-sm dark:bg-slate-900/50"
            >
              <span className="font-medium text-slate-500 dark:text-slate-400">
                #{entry.moveNumber}
              </span>
              <span
                className={`font-bold ${
                  entry.player === 'X'
                    ? 'text-violet-600 dark:text-violet-400'
                    : 'text-cyan-600 dark:text-cyan-400'
                }`}
              >
                {entry.player}
              </span>
              <span className="text-slate-600 dark:text-slate-300">
                Cell {entry.index + 1}
              </span>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-2 text-center text-xs text-slate-400 dark:text-slate-500">
        {history.length} move{history.length !== 1 ? 's' : ''}
      </p>
    </div>
  );
}

export default memo(MoveHistory);
