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

const TetrominoPiece = ({ isSelected, onClick, rotation, displayRotation }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center justify-center cursor-pointer bg-white rounded-lg shadow-md p-2 ${
        isSelected ? 'ring-2 ring-yellow-400' : 'hover:ring-1 hover:ring-purple-300'
      } w-[120px] h-[120px]`}
    >
      <div style={{ transform: `rotate(${displayRotation}deg)` }}>
        <svg width="96" height="96" viewBox="0 0 96 96">
          <g transform="translate(12, 12)">
            {/* Three blocks on top */}
            <rect x="0" y="0" width="24" height="24" fill="#9333ea" stroke="black" strokeWidth="1.5" />
            <rect x="24" y="0" width="24" height="24" fill="#9333ea" stroke="black" strokeWidth="1.5" />
            <rect x="48" y="0" width="24" height="24" fill="#9333ea" stroke="black" strokeWidth="1.5" />
            {/* One block below */}
            <rect x="24" y="24" width="24" height="24" fill="#9333ea" stroke="black" strokeWidth="1.5" />
          </g>
        </svg>
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

  // Visual order stays the same [0, 90, 180, 270]
  const displayRotations = [0, 90, 180, 270];
  // Functional rotations with 2nd and 4th swapped [0, 270, 180, 90]
  const functionalRotations = [0, 270, 180, 90];

  return (
    <div className="flex flex-col gap-4 items-center">
      <h3 className="text-lg font-semibold text-gray-700">Available Rotations:</h3>
      <div className="grid grid-cols-2 gap-4 p-4 bg-gray-100 rounded-xl">
        {displayRotations.map((displayRotation, index) => (
          <TetrominoPiece
            key={displayRotation}
            isSelected={selectedPiece?.type === 'tetromino' && selectedPiece?.rotation === functionalRotations[index]}
            onClick={() => onPieceSelect({ type: 'tetromino', rotation: functionalRotations[index] })}
            rotation={functionalRotations[index]}
            displayRotation={displayRotation}
          />
        ))}
      </div>
    </div>
  );
};

export default PuzzlePieces; 