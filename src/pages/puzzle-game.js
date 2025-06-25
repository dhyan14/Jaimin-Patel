import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import PuzzleGrid from '../components/PuzzleGrid';

const PuzzleGame = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState(1);
  const [gameState, setGameState] = useState([]);
  const [placedPieces, setPlacedPieces] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Initialize game states for different puzzles
  const initializePuzzle = (puzzleNumber) => {
    switch (puzzleNumber) {
      case 1:
        return Array(6).fill().map(() => Array(6).fill(null));
      case 2: {
        const grid = Array(6).fill().map(() => Array(6).fill(null));
        grid[0][0] = 'blocked';
        grid[5][5] = 'blocked';
        return grid;
      }
      case 3:
        return Array(8).fill().map(() => Array(8).fill(null));
      case 4:
        return Array(6).fill().map(() => Array(6).fill(null));
      default:
        return Array(6).fill().map(() => Array(6).fill(null));
    }
  };

  useEffect(() => {
    const initialState = initializePuzzle(currentPuzzle);
    setGameState(initialState);
    setPlacedPieces([]);
    setHistory([{ grid: initialState, pieces: [] }]);
    setHistoryIndex(0);
  }, [currentPuzzle]);

  const handleStateChange = (newGameState, newPlacedPieces) => {
    setGameState(newGameState);
    setPlacedPieces(newPlacedPieces);
    
    // Add to history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ grid: newGameState, pieces: newPlacedPieces });
    setHistory(newHistory);
    setHistoryIndex(historyIndex + 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const { grid, pieces } = history[newIndex];
      setGameState(grid);
      setPlacedPieces(pieces);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const { grid, pieces } = history[newIndex];
      setGameState(grid);
      setPlacedPieces(pieces);
    }
  };

  const handleReset = () => {
    const initialState = initializePuzzle(currentPuzzle);
    setGameState(initialState);
    setPlacedPieces([]);
    setHistory([{ grid: initialState, pieces: [] }]);
    setHistoryIndex(0);
  };

  const handlePreviousPuzzle = () => {
    if (currentPuzzle > 1) {
      setCurrentPuzzle(currentPuzzle - 1);
    }
  };

  const handleNextPuzzle = () => {
    if (currentPuzzle < 4) {
      setCurrentPuzzle(currentPuzzle + 1);
    }
  };

  const getPuzzleDescription = () => {
    switch (currentPuzzle) {
      case 1:
        return "Place 18 dominoes on a 6x6 grid";
      case 2:
        return "Place 17 dominoes on a 6x6 grid with blocked first and last squares";
      case 3:
        return "Place 16 T-shaped tetromino pieces on an 8x8 grid";
      case 4:
        return "Place 9 T-shaped tetromino pieces on a 6x6 grid";
      default:
        return "";
    }
  };

  const getPuzzleProgress = () => {
    const targetPieces = {
      1: 18, // 18 dominoes
      2: 17, // 17 dominoes
      3: 16, // 16 T-tetrominos
      4: 9,  // 9 T-tetrominos
    }[currentPuzzle] || 0;

    return `${placedPieces.length} / ${targetPieces} pieces placed`;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl p-8"
          >
            <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
              Puzzle Game - Level {currentPuzzle}
            </h1>
            
            <div className="text-lg text-gray-600 mb-4 text-center">
              {getPuzzleDescription()}
            </div>

            <div className="text-md text-gray-500 mb-8 text-center">
              {getPuzzleProgress()}
            </div>

            {/* Game Grid */}
            <div className="flex justify-center mb-8">
              <PuzzleGrid
                puzzleNumber={currentPuzzle}
                gameState={gameState}
                onStateChange={handleStateChange}
              />
            </div>

            {/* Control Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
                onClick={handleUndo}
                disabled={historyIndex <= 0}
              >
                Undo
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
                onClick={handleRedo}
                disabled={historyIndex >= history.length - 1}
              >
                Redo
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                onClick={handleReset}
              >
                Reset
              </motion.button>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 ${
                  currentPuzzle === 1
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-purple-500 hover:bg-purple-600'
                } text-white rounded-full shadow-lg transition-colors`}
                onClick={handlePreviousPuzzle}
                disabled={currentPuzzle === 1}
              >
                Previous Puzzle
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 ${
                  currentPuzzle === 4
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-purple-500 hover:bg-purple-600'
                } text-white rounded-full shadow-lg transition-colors`}
                onClick={handleNextPuzzle}
                disabled={currentPuzzle === 4}
              >
                Next Puzzle
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default PuzzleGame; 