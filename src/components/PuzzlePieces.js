import { motion } from 'framer-motion';

const DominoPiece = ({ isSelected, onClick, orientation = 'horizontal' }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`cursor-pointer p-2 bg-white rounded-lg shadow-md ${
        isSelected ? 'ring-4 ring-yellow-400' : 'hover:ring-2 hover:ring-blue-300'
      }`}
    >
      <div className={`flex ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'} gap-1`}>
        <div className="w-12 h-12 bg-blue-500 rounded-md border-2 border-blue-600"></div>
        <div className="w-12 h-12 bg-blue-500 rounded-md border-2 border-blue-600"></div>
      </div>
    </motion.div>
  );
};

const TetrominoPiece = ({ isSelected, onClick, rotation }) => {
  const getGridStyle = () => {
    const baseSize = 'w-[200px] h-[200px]';
    const cellSize = 'w-14 h-14';
    
    switch (rotation) {
      case 0: // T shape (top)
        return {
          layout: `
            <div class="absolute left-1/2 -translate-x-1/2 top-4 flex gap-2">
              <div class="${cellSize} bg-purple-500 rounded-lg"></div>
              <div class="${cellSize} bg-purple-500 rounded-lg"></div>
              <div class="${cellSize} bg-purple-500 rounded-lg"></div>
            </div>
            <div class="absolute left-1/2 -translate-x-1/2 top-24">
              <div class="${cellSize} bg-purple-500 rounded-lg"></div>
            </div>
          `
        };
      case 90: // T shape (right)
        return {
          layout: `
            <div class="absolute left-8 top-4 flex gap-2">
              <div class="${cellSize} bg-purple-500 rounded-lg"></div>
              <div class="${cellSize} bg-purple-500 rounded-lg"></div>
            </div>
            <div class="absolute left-[7.5rem] top-[5.5rem]">
              <div class="${cellSize} bg-purple-500 rounded-lg"></div>
            </div>
          `
        };
      case 180: // T shape (bottom)
        return {
          layout: `
            <div class="absolute left-1/2 -translate-x-1/2 top-4 flex gap-2">
              <div class="${cellSize} bg-purple-500 rounded-lg"></div>
              <div class="${cellSize} bg-purple-500 rounded-lg"></div>
              <div class="${cellSize} bg-purple-500 rounded-lg"></div>
            </div>
            <div class="absolute left-4 top-[4.5rem]">
              <div class="${cellSize} bg-purple-500 rounded-lg"></div>
            </div>
          `
        };
      case 270: // T shape (left)
        return {
          layout: `
            <div class="absolute left-8 top-4 flex gap-2">
              <div class="${cellSize} bg-purple-500 rounded-lg"></div>
              <div class="${cellSize} bg-purple-500 rounded-lg"></div>
            </div>
            <div class="absolute left-8 top-[5.5rem]">
              <div class="${cellSize} bg-purple-500 rounded-lg"></div>
            </div>
          `
        };
      default:
        return { layout: '' };
    }
  };

  const { layout } = getGridStyle();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative cursor-pointer bg-white rounded-xl shadow-md ${
        isSelected ? 'ring-4 ring-yellow-400' : 'hover:ring-2 hover:ring-purple-300'
      } w-[200px] h-[200px]`}
      dangerouslySetInnerHTML={{ __html: layout }}
    />
  );
};

const PuzzlePieces = ({ puzzleNumber, selectedPiece, onPieceSelect }) => {
  if (puzzleNumber <= 2) {
    return (
      <div className="flex flex-col gap-4 items-center">
        <h3 className="text-lg font-semibold text-gray-700">Available Pieces:</h3>
        <div className="flex gap-4 p-4 bg-gray-100 rounded-xl">
          <DominoPiece
            isSelected={selectedPiece?.type === 'domino' && selectedPiece?.orientation === 'horizontal'}
            onClick={() => onPieceSelect({ type: 'domino', orientation: 'horizontal' })}
            orientation="horizontal"
          />
          <DominoPiece
            isSelected={selectedPiece?.type === 'domino' && selectedPiece?.orientation === 'vertical'}
            onClick={() => onPieceSelect({ type: 'domino', orientation: 'vertical' })}
            orientation="vertical"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <h3 className="text-lg font-semibold text-gray-700">Available Rotations:</h3>
      <div className="grid grid-cols-2 gap-6 p-6 bg-gray-100 rounded-xl">
        {[0, 90, 180, 270].map((rotation) => (
          <TetrominoPiece
            key={rotation}
            isSelected={selectedPiece?.type === 'tetromino' && selectedPiece?.rotation === rotation}
            onClick={() => onPieceSelect({ type: 'tetromino', rotation })}
            rotation={rotation}
          />
        ))}
      </div>
    </div>
  );
};

export default PuzzlePieces; 