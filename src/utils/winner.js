/** All eight winning line combinations on a 3×3 board (row, column, diagonal). */
export const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/**
 * Returns the winner and winning cell indices, or null if no winner yet.
 * @param {(string|null)[]} board - Flat array of 9 cells
 */
export function calculateWinner(board) {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  return null;
}

/** True when every cell is occupied. */
export function isBoardFull(board) {
  return board.every((cell) => cell !== null);
}

/** Indices of empty cells — used by AI and Minimax. */
export function getAvailableMoves(board) {
  return board.reduce((moves, cell, index) => {
    if (cell === null) moves.push(index);
    return moves;
  }, []);
}

/** Immutable empty board. */
export function createEmptyBoard() {
  return Array(9).fill(null);
}
