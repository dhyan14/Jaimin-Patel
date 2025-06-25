import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PuzzleGrid = ({ puzzleNumber, gameState, onStateChange }) => {
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [placedPieces, setPlacedPieces] = useState([]);
  const [hoveredCell, setHoveredCell] = useState(null);

  // Check if a cell is part of a placed piece
  const isPartOfPlacedPiece = (row, col) => {
    return placedPieces.some(piece => 
      piece.cells.some(cell => cell.row === row && cell.col === col)
    );
  };

  // Get cells that would be occupied by a piece at given position
  const getPieceCells = (row, col, piece) => {
    if (!piece) return [];

    if (piece.type === 'domino') {
      if (piece.orientation === 'horizontal') {
        return [
          { row, col },
          { row, col: col + 1 }
        ];
      } else {
        return [
          { row, col },
          { row: row + 1, col }
        ];
      }
    } else if (piece.type === 'tetromino') {
      switch (piece.rotation) {
        case 0: // ⊤
          return [
            { row, col },
            { row, col: col - 1 },
            { row, col: col + 1 },
            { row: row + 1, col }
          ];
        case 90: // ⊢
          return [
            { row, col },
            { row: row - 1, col },
            { row: row + 1, col },
            { row, col: col + 1 }
          ];
        case 180: // ⊥
          return [
            { row, col },
            { row, col: col - 1 },
            { row, col: col + 1 },
            { row: row - 1, col }
          ];
        case 270: // ⊣
          return [
            { row, col },
            { row: row - 1, col },
            { row: row + 1, col },
            { row, col: col - 1 }
          ];
        default:
          return [];
      }
    }
    return [];
  };

  // Check if a piece can be placed at given position
  const canPlacePiece = (row, col, piece) => {
    if (!piece) return false;
    
    const cells = getPieceCells(row, col, piece);
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
    if (!selectedPiece) return;

    if (canPlacePiece(row, col, selectedPiece)) {
      const newPiece = {
        ...selectedPiece,
        cells: getPieceCells(row, col, selectedPiece)
      };
      setPlacedPieces([...placedPieces, newPiece]);
    }
  };

  const handleCellHover = (row, col) => {
    setHoveredCell({ row, col });
  };

  const handleCellLeave = () => {
    setHoveredCell(null);
  };

  const getCellColor = (row, col) => {
    if (gameState[row][col] === 'blocked') return 'bg-gray-800';
    
    const piece = placedPieces.find(p => 
      p.cells.some(cell => cell.row === row && cell.col === col)
    );

    if (piece) {
      return piece.type === 'domino' ? 'bg-blue-500' : 'bg-purple-500';
    }

    if (hoveredCell && selectedPiece && canPlacePiece(hoveredCell.row, hoveredCell.col, selectedPiece)) {
      const wouldBeOccupied = getPieceCells(hoveredCell.row, hoveredCell.col, selectedPiece)
        .some(cell => cell.row === row && cell.col === col);
      if (wouldBeOccupied) {
        return selectedPiece.type === 'domino' ? 'bg-blue-200' : 'bg-purple-200';
      }
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
              onMouseEnter={() => handleCellHover(i, j)}
              onMouseLeave={handleCellLeave}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PuzzleGrid; 