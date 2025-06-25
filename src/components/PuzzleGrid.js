import { useState } from 'react';
import { motion } from 'framer-motion';

const PuzzleGrid = ({ puzzleNumber, gameState, onStateChange, selectedPiece, placedPieces }) => {
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
        if (col >= gameState[0].length - 1) return [];
        return [
          { row, col },
          { row, col: col + 1 }
        ];
      } else {
        if (row >= gameState.length - 1) return [];
        return [
          { row, col },
          { row: row + 1, col }
        ];
      }
    } else if (piece.type === 'tetromino') {
      const size = gameState.length;
      switch (piece.rotation) {
        case 0: // T
          if (row >= size - 1 || col <= 0 || col >= size - 1) return [];
          return [
            { row, col }, // center
            { row, col: col - 1 }, // left
            { row, col: col + 1 }, // right
            { row: row + 1, col } // bottom
          ];
        case 90: // ⊢
          if (row <= 0 || row >= size - 1 || col >= size - 1) return [];
          return [
            { row, col }, // center
            { row: row - 1, col }, // top
            { row: row + 1, col }, // bottom
            { row, col: col + 1 } // right
          ];
        case 180: // ⊥
          if (row <= 0 || col <= 0 || col >= size - 1) return [];
          return [
            { row, col }, // center
            { row, col: col - 1 }, // left
            { row, col: col + 1 }, // right
            { row: row - 1, col } // top
          ];
        case 270: // ⊣
          if (row <= 0 || row >= size - 1 || col <= 0) return [];
          return [
            { row, col }, // center
            { row: row - 1, col }, // top
            { row: row + 1, col }, // bottom
            { row, col: col - 1 } // left
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
    if (cells.length === 0) return false;

    return cells.every(cell => {
      if (cell.row < 0 || cell.row >= gameState.length || 
          cell.col < 0 || cell.col >= gameState[0].length) return false;
      if (gameState[cell.row][cell.col] === 'blocked') return false;
      return !isPartOfPlacedPiece(cell.row, cell.col);
    });
  };

  const handleCellClick = (row, col) => {
    if (!selectedPiece || gameState[row][col] === 'blocked') return;

    if (canPlacePiece(row, col, selectedPiece)) {
      const cells = getPieceCells(row, col, selectedPiece);
      const newPiece = {
        ...selectedPiece,
        cells
      };
      const newPlacedPieces = [...placedPieces, newPiece];
      
      // Update game state
      const newGameState = gameState.map((r, i) => 
        r.map((cell, j) => {
          if (cells.some(c => c.row === i && c.col === j)) return 'piece';
          return cell;
        })
      );
      onStateChange(newGameState, newPlacedPieces);
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