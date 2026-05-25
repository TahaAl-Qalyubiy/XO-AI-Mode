import { getBestMove, getRankedMoves } from "./minimax";
import { getAvailableMoves } from "./winner";

export const DIFFICULTIES = {
	EASY: "easy",
	MEDIUM: "medium",
	HARD: "hard",
};

const pickRandom = (moves) => moves[Math.floor(Math.random() * moves.length)];

export function getAIMove(
	board,
	difficulty,
	aiPlayer = "O",
	humanPlayer = "X",
) {
	const moves = getAvailableMoves(board);
	if (moves.length === 0) return null;

	switch (difficulty) {
		case DIFFICULTIES.HARD:
			return getBestMove(board, aiPlayer, humanPlayer);

		case DIFFICULTIES.MEDIUM: {
			const roll = Math.random();

			if (roll < 0.3) {
				return pickRandom(moves);
			}

			if (roll < 0.55) {
				const ranked = getRankedMoves(board, aiPlayer, humanPlayer);
				const mistakeIndex = Math.min(
					ranked.length - 1,
					1 + Math.floor(Math.random() * Math.min(2, ranked.length - 1)),
				);
				return ranked[mistakeIndex].move;
			}

			return getBestMove(board, aiPlayer, humanPlayer);
		}

		case DIFFICULTIES.EASY:
		default:
			if (Math.random() < 0.75) {
				return pickRandom(moves);
			}
			return getBestMove(board, aiPlayer, humanPlayer);
	}
}
