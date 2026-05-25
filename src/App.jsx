import Board from "./components/Board";
import Controls from "./components/Controls";
import DifficultySelector from "./components/DifficultySelector";
import GameStatus from "./components/GameStatus";
import MoveHistory from "./components/MoveHistory";
import ScoreBoard from "./components/ScoreBoard";
import { useGame } from "./hooks/useGame";
import { useSound } from "./hooks/useSound";
import { useTheme } from "./hooks/useTheme";

function App() {
	const { isDark, toggleTheme } = useTheme();
	const sound = useSound(true);

	const {
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
	} = useGame(sound);

	return (
		<div className="min-h-svh bg-gradient-to-br from-slate-100 via-violet-50/40 to-cyan-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-violet-950/30">
			<div className="pointer-events-none fixed inset-0 overflow-hidden">
				<div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-600/10" />
				<div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-600/10" />
			</div>

			<div className="relative mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
				<header className="mb-6 text-center sm:mb-8">
					<h1 className="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl">
						XO Arena
					</h1>
					<p className="mt-2 text-sm text-slate-600 dark:text-slate-400 sm:text-base">
						Modern Tic Tac Toe ·
					</p>
				</header>

				<div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:gap-8">
					<main className="flex flex-col items-center gap-5">
						<ScoreBoard scores={scores} gameMode={gameMode} />

						<GameStatus
							winner={winner}
							isDraw={isDraw}
							currentPlayer={currentPlayer}
							isGameOver={isGameOver}
							isAiThinking={isAiThinking}
							gameMode={gameMode}
						/>

						<Board
							board={board}
							onCellClick={handleCellClick}
							winningLine={winningLine}
							isGameOver={isGameOver}
							isAiThinking={isAiThinking}
						/>

						<DifficultySelector
							difficulty={difficulty}
							onChange={changeDifficulty}
							visible={gameMode === "ai"}
						/>

						<Controls
							gameMode={gameMode}
							onGameModeChange={changeGameMode}
							onRestart={restartGame}
							onResetScores={resetScores}
							soundEnabled={soundEnabled}
							onSoundToggle={() => setSoundEnabled((v) => !v)}
							isDark={isDark}
							onThemeToggle={toggleTheme}
						/>
					</main>

					<aside className="lg:sticky lg:top-8 lg:self-start">
						<MoveHistory history={history} />
					</aside>
				</div>

				<footer className="mt-8 text-center text-xs text-slate-400 dark:text-slate-500">
					Hard mode uses pure Minimax — the AI cannot be beaten.
				</footer>
			</div>
		</div>
	);
}

export default App;
