import { memo } from 'react';

function Controls({
  gameMode,
  onGameModeChange,
  onRestart,
  onResetScores,
  soundEnabled,
  onSoundToggle,
  isDark,
  onThemeToggle,
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-2">
        <ModeButton
          active={gameMode === 'pvp'}
          onClick={() => onGameModeChange('pvp')}
          label="PvP"
          sub="2 Players"
        />
        <ModeButton
          active={gameMode === 'ai'}
          onClick={() => onGameModeChange('ai')}
          label="vs AI"
          sub="Minimax"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <ActionButton onClick={onRestart} variant="primary">
          Restart
        </ActionButton>
        <ActionButton onClick={onResetScores} variant="secondary">
          Reset Scores
        </ActionButton>
        <ActionButton onClick={onSoundToggle} variant="ghost">
          {soundEnabled ? '🔊 Sound' : '🔇 Muted'}
        </ActionButton>
        <ActionButton onClick={onThemeToggle} variant="ghost">
          {isDark ? '☀️ Light' : '🌙 Dark'}
        </ActionButton>
      </div>
    </div>
  );
}

function ModeButton({ active, onClick, label, sub }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'rounded-xl border-2 px-3 py-2.5 transition-all duration-200 sm:py-3',
        active
          ? 'border-violet-500 bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-500/40'
          : 'border-slate-200/80 bg-white/60 text-slate-700 hover:border-violet-300 hover:shadow-md dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-200 dark:hover:border-violet-500',
      ].join(' ')}
      aria-pressed={active}
    >
      <span className="block text-sm font-bold sm:text-base">{label}</span>
      <span
        className={`block text-xs ${active ? 'text-violet-100' : 'text-slate-500 dark:text-slate-400'}`}
      >
        {sub}
      </span>
    </button>
  );
}

function ActionButton({ children, onClick, variant }) {
  const variants = {
    primary:
      'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/30 hover:shadow-lg hover:shadow-violet-500/40 active:scale-95',
    secondary:
      'border-2 border-slate-200 bg-white/70 text-slate-700 hover:border-violet-300 hover:bg-violet-50 dark:border-slate-600 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:border-violet-500 active:scale-95',
    ghost:
      'border-2 border-slate-200/80 bg-white/50 text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-700/50 active:scale-95',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 sm:py-3 ${variants[variant]}`}
    >
      {children}
    </button>
  );
}

export default memo(Controls);
