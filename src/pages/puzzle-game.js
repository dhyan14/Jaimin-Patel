import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import PuzzleGrid from '../components/PuzzleGrid';
import PuzzlePieces from '../components/PuzzlePieces';

const MathSymbol = ({ symbol, className }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 0.1, scale: 1 }}
    transition={{ duration: 1 }}
    className={`absolute text-white font-serif select-none pointer-events-none ${className}`}
  >
    {symbol}
  </motion.div>
);

const PuzzleGame = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState(1);
  const [gameState, setGameState] = useState([]);
  const [placedPieces, setPlacedPieces] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);
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

  // Initialize or reset puzzle when currentPuzzle changes
  useEffect(() => {
    const initialState = initializePuzzle(currentPuzzle);
    setGameState(initialState);
    setPlacedPieces([]);
    setSelectedPiece(null);
    setHistory([{ grid: initialState, pieces: [] }]);
    setHistoryIndex(0);
  }, [currentPuzzle]);

  const handleStateChange = (newGameState, newPlacedPieces) => {
    // Add to history, truncating any future states if we're not at the end
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ grid: newGameState, pieces: newPlacedPieces });
    
    setGameState(newGameState);
    setPlacedPieces(newPlacedPieces);
    setHistory(newHistory);
    setHistoryIndex(historyIndex + 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const { grid, pieces } = history[newIndex];
      setHistoryIndex(newIndex);
      setGameState(grid);
      setPlacedPieces(pieces);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const { grid, pieces } = history[newIndex];
      setHistoryIndex(newIndex);
      setGameState(grid);
      setPlacedPieces(pieces);
    }
  };

  const handleReset = () => {
    const initialState = initializePuzzle(currentPuzzle);
    setGameState(initialState);
    setPlacedPieces([]);
    setSelectedPiece(null);
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 py-12 px-4 relative overflow-hidden">
        {/* Mathematical Background Symbols */}
        <MathSymbol symbol="∫" className="text-8xl top-20 left-[10%] transform -rotate-12" />
        <MathSymbol symbol="Σ" className="text-7xl top-40 right-[15%] transform rotate-6" />
        <MathSymbol symbol="π" className="text-6xl bottom-32 left-[20%] transform rotate-12" />
        <MathSymbol symbol="∞" className="text-8xl bottom-24 right-[25%] transform -rotate-6" />
        <MathSymbol symbol="θ" className="text-7xl top-1/3 left-[5%] transform rotate-45" />
        <MathSymbol symbol="√" className="text-6xl top-1/4 right-[8%] transform -rotate-12" />
        <MathSymbol symbol="∂" className="text-7xl bottom-1/4 left-[12%] transform rotate-12" />
        <MathSymbol symbol="λ" className="text-6xl bottom-1/3 right-[10%] transform -rotate-45" />

        <div className="max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-purple-200"
          >
            <div className="relative">
              <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Mathematical Puzzle Game
              </h1>
              <h2 className="text-2xl font-semibold text-center mb-6 text-gray-600">
                Level {currentPuzzle}
              </h2>
            </div>
            
            <div className="text-lg font-medium text-gray-700 mb-4 text-center p-3 bg-purple-50 rounded-lg border border-purple-100">
              {getPuzzleDescription()}
            </div>

            <div className="text-md font-medium text-gray-600 mb-8 text-center bg-blue-50 p-2 rounded-lg border border-blue-100">
              {getPuzzleProgress()}
            </div>

            {/* Piece Selection */}
            <div className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-xl border border-purple-100">
              <PuzzlePieces
                puzzleNumber={currentPuzzle}
                selectedPiece={selectedPiece}
                onPieceSelect={setSelectedPiece}
              />
            </div>

            {/* Game Grid */}
            <div className="flex justify-center mb-8">
              <div className="p-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                <PuzzleGrid
                  puzzleNumber={currentPuzzle}
                  gameState={gameState}
                  onStateChange={handleStateChange}
                  selectedPiece={selectedPiece}
                  placedPieces={placedPieces}
                />
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex justify-center gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2.5 rounded-full shadow-lg transition-all duration-200 ${
                  historyIndex <= 0 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
                }`}
                onClick={handleUndo}
                disabled={historyIndex <= 0}
              >
                Undo
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2.5 rounded-full shadow-lg transition-all duration-200 ${
                  historyIndex >= history.length - 1
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                }`}
                onClick={handleRedo}
                disabled={historyIndex >= history.length - 1}
              >
                Redo
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full shadow-lg transition-all duration-200"
                onClick={handleReset}
              >
                Reset
              </motion.button>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-2.5 rounded-full shadow-lg transition-all duration-200 ${
                  currentPuzzle === 1
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white'
                }`}
                onClick={handlePreviousPuzzle}
                disabled={currentPuzzle === 1}
              >
                Previous Puzzle
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-2.5 rounded-full shadow-lg transition-all duration-200 ${
                  currentPuzzle === 4
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 text-white'
                }`}
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