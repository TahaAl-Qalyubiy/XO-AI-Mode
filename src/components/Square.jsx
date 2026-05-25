import { memo } from 'react';

function Square({ value, index, onClick, isWinning, disabled, isAiThinking }) {
  const isEmpty = value === null;

  const handleClick = () => {
    if (disabled || !isEmpty || isAiThinking) return;
    onClick(index);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || !isEmpty || isAiThinking}
      aria-label={isEmpty ? `Cell ${index + 1}, empty` : `Cell ${index + 1}, ${value}`}
      className={[
        'relative flex aspect-square w-full items-center justify-center rounded-2xl',
        'text-4xl font-black sm:text-5xl',
        'border-2 transition-all duration-300 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2',
        'dark:focus-visible:ring-offset-slate-900',
        isEmpty && !disabled
          ? 'cursor-pointer border-slate-200/80 bg-white/60 hover:scale-[1.03] hover:border-violet-300 hover:bg-violet-50/80 hover:shadow-lg hover:shadow-violet-200/50 active:scale-95 dark:border-slate-600/60 dark:bg-slate-800/60 dark:hover:border-violet-500 dark:hover:bg-violet-950/40 dark:hover:shadow-violet-900/30'
          : 'cursor-default border-transparent',
        isWinning
          ? 'animate-glow z-10 border-amber-400 bg-gradient-to-br from-amber-100 to-orange-100 shadow-lg shadow-amber-300/50 dark:from-amber-900/60 dark:to-orange-900/60 dark:shadow-amber-500/30'
          : !isEmpty
            ? 'bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900'
            : '',
        disabled && isEmpty ? 'opacity-60' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {value === 'X' && (
        <span
          className="animate-pop-in bg-gradient-to-br from-violet-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm"
          aria-hidden
        >
          X
        </span>
      )}
      {value === 'O' && (
        <span
          className="animate-pop-in bg-gradient-to-br from-cyan-500 to-teal-500 bg-clip-text text-transparent drop-shadow-sm"
          aria-hidden
        >
          O
        </span>
      )}
    </button>
  );
}

export default memo(Square);
