import { motion } from 'framer-motion';

const DominoPiece = ({ isSelected, onClick, orientation = 'horizontal' }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`cursor-pointer ${orientation === 'horizontal' ? 'w-24 h-12' : 'w-12 h-24'} ${
        isSelected ? 'ring-4 ring-yellow-400' : ''
      }`}
    >
      <div className={`w-full h-full flex ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'}`}>
        <div className="flex-1 bg-blue-500 border-2 border-blue-600 rounded-md m-0.5"></div>
        <div className="flex-1 bg-blue-500 border-2 border-blue-600 rounded-md m-0.5"></div>
      </div>
    </motion.div>
  );
};

const TetrominoPiece = ({ isSelected, onClick, rotation }) => {
  const getRotationStyle = () => {
    const baseStyle = 'w-12 h-12 bg-purple-500 border-2 border-purple-600 rounded-md m-0.5';
    return baseStyle;
  };

  const getContainerStyle = () => {
    switch (rotation) {
      case 0: // ⊤
        return 'grid grid-cols-3 grid-rows-2 w-36 h-24';
      case 90: // ⊢
        return 'grid grid-cols-2 grid-rows-3 w-24 h-36';
      case 180: // ⊥
        return 'grid grid-cols-3 grid-rows-2 w-36 h-24';
      case 270: // ⊣
        return 'grid grid-cols-2 grid-rows-3 w-24 h-36';
      default:
        return '';
    }
  };

  const renderTetromino = () => {
    switch (rotation) {
      case 0: // ⊤
        return (
          <>
            <div className="col-start-1 col-span-1"></div>
            <div className={getRotationStyle()}></div>
            <div className="col-start-3 col-span-1"></div>
            <div className="col-start-1 col-span-1"></div>
            <div className={getRotationStyle()}></div>
            <div className="col-start-3 col-span-1"></div>
          </>
        );
      case 90: // ⊢
        return (
          <>
            <div className={getRotationStyle()}></div>
            <div className="col-start-2 col-span-1"></div>
            <div className={getRotationStyle()}></div>
            <div className={getRotationStyle()}></div>
            <div className={getRotationStyle()}></div>
            <div className="col-start-2 col-span-1"></div>
          </>
        );
      case 180: // ⊥
        return (
          <>
            <div className="col-start-1 col-span-1"></div>
            <div className={getRotationStyle()}></div>
            <div className="col-start-3 col-span-1"></div>
            <div className={getRotationStyle()}></div>
            <div className={getRotationStyle()}></div>
            <div className={getRotationStyle()}></div>
          </>
        );
      case 270: // ⊣
        return (
          <>
            <div className="col-start-1 col-span-1"></div>
            <div className={getRotationStyle()}></div>
            <div className="col-start-1 col-span-1"></div>
            <div className={getRotationStyle()}></div>
            <div className={getRotationStyle()}></div>
            <div className={getRotationStyle()}></div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`cursor-pointer ${isSelected ? 'ring-4 ring-yellow-400 rounded-lg' : ''}`}
    >
      <div className={getContainerStyle()}>
        {renderTetromino()}
      </div>
    </motion.div>
  );
};

const PuzzlePieces = ({ puzzleNumber, selectedPiece, onPieceSelect }) => {
  if (puzzleNumber <= 2) {
    return (
      <div className="flex flex-col gap-4 items-center">
        <h3 className="text-lg font-semibold text-gray-700">Available Pieces:</h3>
        <div className="flex gap-4">
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
      <div className="grid grid-cols-2 gap-4">
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