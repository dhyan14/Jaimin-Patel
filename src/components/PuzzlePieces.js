import { motion } from 'framer-motion';

const DominoPiece = ({ isSelected, onClick, orientation = 'horizontal' }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`cursor-pointer p-2 bg-white rounded-lg shadow-md ${
        isSelected ? 'ring-2 ring-yellow-400' : 'hover:ring-1 hover:ring-blue-300'
      }`}
    >
      <div className={`flex ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'} gap-1`}>
        <div className="w-8 h-8 bg-blue-500 rounded-md"></div>
        <div className="w-8 h-8 bg-blue-500 rounded-md"></div>
      </div>
    </motion.div>
  );
};

const TetrominoPiece = ({ isSelected, onClick, rotation }) => {
  const getGridStyle = () => {
    const cellSize = 'w-8 h-8';
    
    switch (rotation) {
      case 0: // T shape (top)
        return {
          layout: `
            <div class="flex flex-col items-center gap-1">
              <div class="flex gap-1">
                <div class="${cellSize} bg-purple-500 rounded-md"></div>
                <div class="${cellSize} bg-purple-500 rounded-md"></div>
                <div class="${cellSize} bg-purple-500 rounded-md"></div>
              </div>
              <div class="${cellSize} bg-purple-500 rounded-md"></div>
            </div>
          `
        };
      case 90: // T shape (right)
        return {
          layout: `
            <div class="flex gap-1">
              <div class="flex flex-col gap-1">
                <div class="${cellSize} bg-purple-500 rounded-md"></div>
                <div class="${cellSize} bg-purple-500 rounded-md"></div>
              </div>
              <div class="${cellSize} bg-purple-500 rounded-md translate-y-8"></div>
            </div>
          `
        };
      case 180: // T shape (bottom)
        return {
          layout: `
            <div class="flex flex-col gap-1">
              <div class="flex gap-1">
                <div class="${cellSize} bg-purple-500 rounded-md"></div>
                <div class="${cellSize} bg-purple-500 rounded-md"></div>
                <div class="${cellSize} bg-purple-500 rounded-md"></div>
              </div>
              <div class="${cellSize} bg-purple-500 rounded-md"></div>
            </div>
          `
        };
      case 270: // T shape (left)
        return {
          layout: `
            <div class="flex gap-1">
              <div class="${cellSize} bg-purple-500 rounded-md translate-y-8"></div>
              <div class="flex flex-col gap-1">
                <div class="${cellSize} bg-purple-500 rounded-md"></div>
                <div class="${cellSize} bg-purple-500 rounded-md"></div>
              </div>
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
      className={`flex items-center justify-center cursor-pointer bg-white rounded-lg shadow-md p-4 ${
        isSelected ? 'ring-2 ring-yellow-400' : 'hover:ring-1 hover:ring-purple-300'
      } w-[120px] h-[120px]`}
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
      <div className="grid grid-cols-2 gap-4 p-4 bg-gray-100 rounded-xl">
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