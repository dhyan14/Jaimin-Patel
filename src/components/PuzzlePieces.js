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
    switch (rotation) {
      case 0: // T
        return {
          gridTemplate: `
            "a b c"
            ". d ."
          `,
          width: '156px',
          height: '104px'
        };
      case 90: // ⊢
        return {
          gridTemplate: `
            ". b ."
            "a b ."
            ". b ."
          `,
          width: '104px',
          height: '156px'
        };
      case 180: // ⊥
        return {
          gridTemplate: `
            ". b ."
            "a b c"
          `,
          width: '156px',
          height: '104px'
        };
      case 270: // ⊣
        return {
          gridTemplate: `
            ". b ."
            ". b a"
            ". b ."
          `,
          width: '104px',
          height: '156px'
        };
      default:
        return {};
    }
  };

  const style = getGridStyle();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`cursor-pointer p-4 bg-white rounded-lg shadow-md ${
        isSelected ? 'ring-4 ring-yellow-400' : 'hover:ring-2 hover:ring-purple-300'
      }`}
    >
      <div
        style={{
          display: 'grid',
          gap: '4px',
          ...style
        }}
      >
        {Array(4).fill(null).map((_, i) => (
          <div
            key={i}
            className="w-12 h-12 bg-purple-500 rounded-md border-2 border-purple-600"
            style={{
              gridArea: String.fromCharCode(97 + i) // 'a', 'b', 'c', 'd'
            }}
          />
        ))}
      </div>
    </motion.div>
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