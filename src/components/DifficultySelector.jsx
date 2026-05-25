import { memo } from 'react';
import { DIFFICULTIES } from '../utils/ai';

const LEVELS = [
  {
    id: DIFFICULTIES.EASY,
    label: 'Easy',
    desc: 'Mostly random',
    icon: '🌱',
  },
  {
    id: DIFFICULTIES.MEDIUM,
    label: 'Medium',
    desc: 'Mixed strategy',
    icon: '⚡',
  },
  {
    id: DIFFICULTIES.HARD,
    label: 'Hard',
    desc: 'Unbeatable',
    icon: '🔥',
  },
];

function DifficultySelector({ difficulty, onChange, visible }) {
  if (!visible) return null;

  return (
    <div className="animate-fade-up space-y-2">
      <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        AI Difficulty
      </p>
      <div className="grid grid-cols-3 gap-2">
        {LEVELS.map((level) => (
          <button
            key={level.id}
            type="button"
            onClick={() => onChange(level.id)}
            className={[
              'flex flex-col items-center rounded-xl border-2 px-2 py-2.5 transition-all duration-200 sm:px-3 sm:py-3',
              difficulty === level.id
                ? 'scale-[1.02] border-violet-500 bg-violet-500/15 shadow-lg shadow-violet-500/25 dark:border-violet-400 dark:bg-violet-500/20'
                : 'border-slate-200/80 bg-white/50 hover:border-violet-300 hover:bg-violet-50/50 dark:border-slate-600 dark:bg-slate-800/50 dark:hover:border-violet-500',
            ].join(' ')}
            aria-pressed={difficulty === level.id}
          >
            <span className="text-lg" aria-hidden>
              {level.icon}
            </span>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
              {level.label}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 sm:text-xs">
              {level.desc}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default memo(DifficultySelector);
