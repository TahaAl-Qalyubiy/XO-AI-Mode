import { calculateWinner, isBoardFull, getAvailableMoves } from "./winner";

const SCORE_WIN = 10;
const SCORE_DRAW = 0;

function evaluateTerminal(board, depth, aiPlayer, humanPlayer) {
	const result = calculateWinner(board);

	if (result?.winner === aiPlayer) {
		return depth - SCORE_WIN;
	}
	if (result?.winner === humanPlayer) {
		return SCORE_WIN - depth;
	}
	if (isBoardFull(board)) {
		return SCORE_DRAW;
	}

	return null;
}

export function minimax(board, depth, isMaximizing, aiPlayer, humanPlayer) {
	const terminalScore = evaluateTerminal(board, depth, aiPlayer, humanPlayer);

	if (terminalScore !== null) {
		return terminalScore;
	}

	const moves = getAvailableMoves(board);

	if (isMaximizing) {
		let maxEval = -Infinity;

		for (const move of moves) {
			board[move] = humanPlayer;
			const score = minimax(board, depth + 1, false, aiPlayer, humanPlayer);
			board[move] = null;
			maxEval = Math.max(maxEval, score);
		}

		return maxEval;
	}

	let minEval = Infinity;

	for (const move of moves) {
		board[move] = aiPlayer;
		const score = minimax(board, depth + 1, true, aiPlayer, humanPlayer);
		board[move] = null;
		minEval = Math.min(minEval, score);
	}

	return minEval;
}

export function getBestMove(board, aiPlayer = "O", humanPlayer = "X") {
	const moves = getAvailableMoves(board);
	if (moves.length === 0) return null;

	let bestMove = moves[0];
	let bestScore = Infinity;

	for (const move of moves) {
		board[move] = aiPlayer;
		const score = minimax(board, 0, true, aiPlayer, humanPlayer);
		board[move] = null;

		if (score < bestScore) {
			bestScore = score;
			bestMove = move;
		}
	}

	return bestMove;
}

export function getRankedMoves(board, aiPlayer = "O", humanPlayer = "X") {
	const moves = getAvailableMoves(board);

	const ranked = moves.map((move) => {
		board[move] = aiPlayer;
		const score = minimax(board, 0, true, aiPlayer, humanPlayer);
		board[move] = null;
		return { move, score };
	});

	ranked.sort((a, b) => a.score - b.score);
	return ranked;
}
