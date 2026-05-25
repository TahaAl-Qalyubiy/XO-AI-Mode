import { memo } from 'react';

function ScoreBoard({ scores, gameMode }) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      <ScoreCard
        label={gameMode === 'ai' ? 'You (X)' : 'Player X'}
        value={scores.x}
        color="violet"
        symbol="X"
      />
      <ScoreCard label="Draws" value={scores.draws} color="slate" symbol="=" />
      <ScoreCard
        label={gameMode === 'ai' ? 'AI (O)' : 'Player O'}
        value={scores.o}
        color="cyan"
        symbol="O"
      />
    </div>
  );
}

function ScoreCard({ label, value, color, symbol }) {
  const gradients = {
    violet:
      'from-violet-500/20 to-indigo-500/20 border-violet-300/50 dark:border-violet-600/40',
    cyan: 'from-cyan-500/20 to-teal-500/20 border-cyan-300/50 dark:border-cyan-600/40',
    slate:
      'from-slate-400/20 to-slate-500/20 border-slate-300/50 dark:border-slate-600/40',
  };

  const textColors = {
    violet: 'text-violet-600 dark:text-violet-400',
    cyan: 'text-cyan-600 dark:text-cyan-400',
    slate: 'text-slate-600 dark:text-slate-400',
  };

  return (
    <div
      className={`flex flex-col items-center rounded-2xl border bg-gradient-to-br px-3 py-3 transition-transform hover:scale-[1.02] sm:px-4 sm:py-4 ${gradients[color]}`}
    >
      <span className={`text-2xl font-black sm:text-3xl ${textColors[color]}`}>
        {symbol}
      </span>
      <span className="mt-1 text-2xl font-bold tabular-nums text-slate-800 dark:text-slate-100 sm:text-3xl">
        {value}
      </span>
      <span className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400 sm:text-sm">
        {label}
      </span>
    </div>
  );
}

export default memo(ScoreBoard);
