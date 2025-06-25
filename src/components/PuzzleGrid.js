import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PuzzleGrid = ({ puzzleNumber, gameState, onStateChange }) => {
  const [selectedCell, setSelectedCell] = useState(null);
  const [placedPieces, setPlacedPieces] = useState([]);
  const [rotation, setRotation] = useState(0); // For T-shaped tetrominos

  // Check if a cell is part of a placed piece
  const isPartOfPlacedPiece = (row, col) => {
    return placedPieces.some(piece => 
      piece.cells.some(cell => cell.row === row && cell.col === col)
    );
  };

  // Check if a domino can be placed horizontally
  const canPlaceDominoHorizontal = (row, col) => {
    if (col >= gameState[0].length - 1) return false;
    if (gameState[row][col] === 'blocked' || gameState[row][col + 1] === 'blocked') return false;
    return !isPartOfPlacedPiece(row, col) && !isPartOfPlacedPiece(row, col + 1);
  };

  // Check if a domino can be placed vertically
  const canPlaceDominoVertical = (row, col) => {
    if (row >= gameState.length - 1) return false;
    if (gameState[row][col] === 'blocked' || gameState[row + 1][col] === 'blocked') return false;
    return !isPartOfPlacedPiece(row, col) && !isPartOfPlacedPiece(row + 1, col);
  };

  // Get T-tetromino cells based on rotation
  const getTTetrominoCells = (row, col) => {
    switch (rotation) {
      case 0: // ⊤
        return [
          { row: row, col: col },
          { row: row, col: col - 1 },
          { row: row, col: col + 1 },
          { row: row + 1, col: col }
        ];
      case 90: // ⊢
        return [
          { row: row, col: col },
          { row: row - 1, col: col },
          { row: row + 1, col: col },
          { row: row, col: col + 1 }
        ];
      case 180: // ⊥
        return [
          { row: row, col: col },
          { row: row, col: col - 1 },
          { row: row, col: col + 1 },
          { row: row - 1, col: col }
        ];
      case 270: // ⊣
        return [
          { row: row, col: col },
          { row: row - 1, col: col },
          { row: row + 1, col: col },
          { row: row, col: col - 1 }
        ];
      default:
        return [];
    }
  };

  // Check if a T-tetromino can be placed
  const canPlaceTTetromino = (row, col) => {
    const cells = getTTetrominoCells(row, col);
    return cells.every(cell => {
      const isValid = cell.row >= 0 && 
                     cell.row < gameState.length && 
                     cell.col >= 0 && 
                     cell.col < gameState[0].length;
      if (!isValid) return false;
      if (gameState[cell.row][cell.col] === 'blocked') return false;
      return !isPartOfPlacedPiece(cell.row, cell.col);
    });
  };

  const handleCellClick = (row, col) => {
    if (gameState[row][col] === 'blocked') return;

    if (puzzleNumber <= 2) { // Domino puzzles
      if (selectedCell) {
        // Try to place a domino
        const selectedRow = selectedCell.row;
        const selectedCol = selectedCell.col;

        if ((Math.abs(row - selectedRow) === 1 && col === selectedCol) ||
            (Math.abs(col - selectedCol) === 1 && row === selectedRow)) {
          // Valid domino placement
          const newPiece = {
            type: 'domino',
            cells: [
              { row: selectedRow, col: selectedCol },
              { row, col }
            ]
          };
          setPlacedPieces([...placedPieces, newPiece]);
          setSelectedCell(null);
        } else {
          setSelectedCell({ row, col });
        }
      } else {
        setSelectedCell({ row, col });
      }
    } else { // T-tetromino puzzles
      if (canPlaceTTetromino(row, col)) {
        const newPiece = {
          type: 'tetromino',
          cells: getTTetrominoCells(row, col),
          rotation
        };
        setPlacedPieces([...placedPieces, newPiece]);
      }
    }
  };

  const handleRotate = () => {
    if (puzzleNumber > 2) { // Only for T-tetromino puzzles
      setRotation((rotation + 90) % 360);
    }
  };

  const getCellColor = (row, col) => {
    if (gameState[row][col] === 'blocked') return 'bg-gray-800';
    
    const piece = placedPieces.find(p => 
      p.cells.some(cell => cell.row === row && cell.col === col)
    );

    if (piece) {
      return piece.type === 'domino' ? 'bg-blue-500' : 'bg-purple-500';
    }

    if (selectedCell?.row === row && selectedCell?.col === col) {
      return 'bg-yellow-300';
    }

    return 'bg-white';
  };

  useEffect(() => {
    // Update parent component's state
    const newGameState = gameState.map((row, i) => 
      row.map((cell, j) => {
        if (isPartOfPlacedPiece(i, j)) return 'piece';
        return cell;
      })
    );
    onStateChange(newGameState, placedPieces);
  }, [placedPieces]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="grid gap-1 bg-gray-200 p-4 rounded-lg">
        {gameState.map((row, i) => (
          <div key={i} className="flex gap-1">
            {row.map((_, j) => (
              <motion.div
                key={`${i}-${j}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`w-12 h-12 ${getCellColor(i, j)} 
                  border-2 border-gray-300 rounded-md cursor-pointer 
                  transition-colors duration-200`}
                onClick={() => handleCellClick(i, j)}
              />
            ))}
          </div>
        ))}
      </div>

      {puzzleNumber > 2 && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRotate}
          className="px-6 py-2 bg-indigo-500 text-white rounded-full shadow-lg hover:bg-indigo-600 transition-colors"
        >
          Rotate T-Piece ({rotation}°)
        </motion.button>
      )}
    </div>
  );
};

export default PuzzleGrid; 