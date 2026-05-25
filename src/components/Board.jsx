import { memo } from 'react';
import Square from './Square';
import WinningLine from './WinningLine';

function Board({
  board,
  onCellClick,
  winningLine,
  isGameOver,
  isAiThinking,
}) {
  const winningSet = new Set(winningLine ?? []);

  return (
    <div className="relative w-full max-w-[min(100%,340px)]">
      <div className="relative rounded-3xl bg-gradient-to-br from-violet-500/20 via-transparent to-cyan-500/20 p-1 shadow-2xl shadow-violet-500/20 dark:shadow-violet-900/30">
        <div className="relative rounded-[22px] bg-white/90 p-3 backdrop-blur-sm dark:bg-slate-900/90 sm:p-4">
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {board.map((value, index) => (
              <Square
                key={index}
                index={index}
                value={value}
                onClick={onCellClick}
                isWinning={winningSet.has(index)}
                disabled={isGameOver}
                isAiThinking={isAiThinking}
              />
            ))}
          </div>
          <WinningLine line={winningLine} />
        </div>
      </div>
    </div>
  );
}

export default memo(Board);
