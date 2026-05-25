import { memo, useMemo } from 'react';

const CELL_CENTERS = [
  { x: 16.67, y: 16.67 },
  { x: 50, y: 16.67 },
  { x: 83.33, y: 16.67 },
  { x: 16.67, y: 50 },
  { x: 50, y: 50 },
  { x: 83.33, y: 50 },
  { x: 16.67, y: 83.33 },
  { x: 50, y: 83.33 },
  { x: 83.33, y: 83.33 },
];

function WinningLine({ line }) {
  const { x1, y1, x2, y2 } = useMemo(() => {
    if (!line || line.length !== 3) return { x1: 0, y1: 0, x2: 0, y2: 0 };
    const start = CELL_CENTERS[line[0]];
    const end = CELL_CENTERS[line[2]];
    return { x1: start.x, y1: start.y, x2: end.x, y2: end.y };
  }, [line]);

  if (!line) return null;

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="url(#winGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="200"
        className="animate-line-draw"
        style={{ filter: 'drop-shadow(0 0 6px rgba(251,191,36,0.8))' }}
      />
      <defs>
        <linearGradient id="winGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default memo(WinningLine);
