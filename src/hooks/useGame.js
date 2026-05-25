import { useCallback, useEffect, useMemo, useState } from 'react';
import { getAIMove, DIFFICULTIES } from '../utils/ai';
import { calculateWinner, createEmptyBoard, isBoardFull } from '../utils/winner';

const HUMAN = 'X';
const AI = 'O';

const INITIAL_SCORES = { x: 0, o: 0, draws: 0 };

export function useGame(sound) {
  const [gameMode, setGameMode] = useState('pvp');
  const [difficulty, setDifficulty] = useState(DIFFICULTIES.MEDIUM);
  const [board, setBoard] = useState(createEmptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState(HUMAN);
  const [scores, setScores] = useState(INITIAL_SCORES);
  const [history, setHistory] = useState([]);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const result = useMemo(() => calculateWinner(board), [board]);
  const isDraw = useMemo(
    () => !result && isBoardFull(board),
    [result, board],
  );
  const isGameOver = Boolean(result) || isDraw;
  const winningLine = result?.line ?? null;
  const winner = result?.winner ?? (isDraw ? 'draw' : null);

  const applyMove = useCallback(
    (index, player) => {
      setBoard((prev) => {
        const next = [...prev];
        next[index] = player;
        return next;
      });

      setHistory((prev) => [
        ...prev,
        { index, player, moveNumber: prev.length + 1 },
      ]);

      if (soundEnabled) sound.playMove();
    },
    [sound, soundEnabled],
  );

  const endRound = useCallback(
    (boardSnapshot) => {
      const winResult = calculateWinner(boardSnapshot);
      const draw = !winResult && isBoardFull(boardSnapshot);

      if (winResult) {
        setScores((prev) => ({
          ...prev,
          [winResult.winner === HUMAN ? 'x' : 'o']:
            prev[winResult.winner === HUMAN ? 'x' : 'o'] + 1,
        }));
        if (soundEnabled) sound.playWin();
      } else if (draw) {
        setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
        if (soundEnabled) sound.playDraw();
      }
    },
    [sound, soundEnabled],
  );

  const handleCellClick = useCallback(
    (index) => {
      if (board[index] !== null || isGameOver || isAiThinking) return;
      if (gameMode === 'ai' && currentPlayer === AI) return;

      const player = currentPlayer;
      const nextBoard = [...board];
      nextBoard[index] = player;

      applyMove(index, player);

      const winResult = calculateWinner(nextBoard);
      const draw = !winResult && isBoardFull(nextBoard);

      if (winResult || draw) {
        endRound(nextBoard);
        return;
      }

      setCurrentPlayer(player === HUMAN ? AI : HUMAN);
    },
    [
      board,
      currentPlayer,
      gameMode,
      isGameOver,
      isAiThinking,
      applyMove,
      endRound,
    ],
  );

  useEffect(() => {
    if (gameMode !== 'ai' || currentPlayer !== AI || isGameOver) return;

    setIsAiThinking(true);

    const timer = setTimeout(() => {
      const move = getAIMove(board, difficulty, AI, HUMAN);
      if (move === null) {
        setIsAiThinking(false);
        return;
      }

      const nextBoard = [...board];
      nextBoard[move] = AI;

      applyMove(move, AI);

      const winResult = calculateWinner(nextBoard);
      const draw = !winResult && isBoardFull(nextBoard);

      if (winResult || draw) {
        endRound(nextBoard);
      } else {
        setCurrentPlayer(HUMAN);
      }

      setIsAiThinking(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [gameMode, currentPlayer, board, isGameOver, difficulty, applyMove, endRound]);

  const restartGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setCurrentPlayer(HUMAN);
    setHistory([]);
    setIsAiThinking(false);
    if (soundEnabled) sound.playClick();
  }, [sound, soundEnabled]);

  const resetScores = useCallback(() => {
    setScores(INITIAL_SCORES);
    if (soundEnabled) sound.playClick();
  }, [sound, soundEnabled]);

  const changeGameMode = useCallback(
    (mode) => {
      setGameMode(mode);
      restartGame();
    },
    [restartGame],
  );

  const changeDifficulty = useCallback(
    (level) => {
      setDifficulty(level);
      if (gameMode === 'ai') restartGame();
    },
    [gameMode, restartGame],
  );

  return {
    board,
    currentPlayer,
    scores,
    history,
    gameMode,
    difficulty,
    isGameOver,
    isDraw,
    winner,
    winningLine,
    isAiThinking,
    soundEnabled,
    setSoundEnabled,
    handleCellClick,
    restartGame,
    resetScores,
    changeGameMode,
    changeDifficulty,
    HUMAN,
    AI,
  };
}
