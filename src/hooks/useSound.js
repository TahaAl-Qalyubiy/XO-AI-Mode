import { useCallback, useRef } from 'react';

export function useSound(enabled = true) {
  const ctxRef = useRef(null);

  const getContext = useCallback(() => {
    if (!enabled) return null;
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, [enabled]);

  const playTone = useCallback(
    (frequency, duration = 0.12, type = 'sine', volume = 0.08) => {
      const ctx = getContext();
      if (!ctx) return;

      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      oscillator.connect(gain);
      gain.connect(ctx.destination);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    },
    [getContext],
  );

  const playMove = useCallback(() => playTone(520, 0.1), [playTone]);
  const playWin = useCallback(() => {
    playTone(523, 0.12);
    setTimeout(() => playTone(659, 0.12), 100);
    setTimeout(() => playTone(784, 0.18), 200);
  }, [playTone]);
  const playDraw = useCallback(() => playTone(330, 0.2, 'triangle'), [playTone]);
  const playClick = useCallback(() => playTone(400, 0.06, 'square', 0.05), [playTone]);

  return { playMove, playWin, playDraw, playClick };
}
