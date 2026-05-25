import { memo } from 'react';

function GameStatus({
  winner,
  isDraw,
  currentPlayer,
  isGameOver,
  isAiThinking,
  gameMode,
}) {
  let message = '';
  let subtext = '';
  let variant = 'default';

  if (isAiThinking) {
    message = 'AI is thinking…';
    subtext = 'Minimax at work';
    variant = 'thinking';
  } else if (winner && winner !== 'draw') {
    const isAiWin = gameMode === 'ai' && winner === 'O';
    const isHumanWin = gameMode === 'ai' && winner === 'X';
    message = isAiWin
      ? 'AI wins!'
      : isHumanWin
        ? 'You win!'
        : `Player ${winner} wins!`;
    subtext = 'Great game';
    variant = 'win';
  } else if (isDraw || winner === 'draw') {
    message = "It's a draw!";
    subtext = 'Well played both sides';
    variant = 'draw';
  } else {
    const turn = currentPlayer;
    message =
      gameMode === 'ai'
        ? turn === 'X'
          ? 'Your turn'
          : "AI's turn"
        : `Player ${turn}'s turn`;
    subtext = gameMode === 'ai' ? 'You are X' : 'Tap a cell to play';
    variant = 'turn';
  }

  const styles = {
    default:
      'border-slate-200/60 bg-white/70 dark:border-slate-700/60 dark:bg-slate-800/70',
    turn: 'border-violet-300/60 bg-violet-50/80 dark:border-violet-600/40 dark:bg-violet-950/40',
    thinking:
      'border-cyan-300/60 bg-cyan-50/80 dark:border-cyan-600/40 dark:bg-cyan-950/40',
    win: 'border-amber-300/60 bg-amber-50/80 dark:border-amber-600/40 dark:bg-amber-950/40',
    draw: 'border-slate-300/60 bg-slate-50/80 dark:border-slate-600/40 dark:bg-slate-800/80',
  };

  return (
    <div
      className={`animate-fade-up rounded-2xl border px-4 py-3 text-center shadow-sm backdrop-blur-sm transition-colors duration-300 sm:px-6 sm:py-4 ${styles[variant]}`}
      role="status"
      aria-live="polite"
    >
      <p className="text-lg font-bold text-slate-800 dark:text-slate-100 sm:text-xl">
        {message}
      </p>
      <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{subtext}</p>
      {!isGameOver && !isAiThinking && (
        <div className="mt-2 flex justify-center gap-1">
          <TurnDot active={currentPlayer === 'X'} player="X" />
          <TurnDot active={currentPlayer === 'O'} player="O" />
        </div>
      )}
    </div>
  );
}

function TurnDot({ active, player }) {
  const color =
    player === 'X'
      ? 'bg-violet-500 shadow-violet-400/60'
      : 'bg-cyan-500 shadow-cyan-400/60';

  return (
    <span
      className={`h-2 w-2 rounded-full transition-all duration-300 ${
        active ? `${color} scale-125 shadow-md` : 'bg-slate-300 dark:bg-slate-600'
      }`}
      aria-hidden
    />
  );
}

export default memo(GameStatus);
