import { motion } from 'framer-motion';
import { BookOpenIcon, ClipboardDocumentIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

export default function Navigation({ onSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelect('lectures')}
        className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 group"
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="p-3 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
            <BookOpenIcon className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
            Lecture Notes
          </h3>
        </div>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelect('assignments')}
        className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 group"
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="p-3 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
            <ClipboardDocumentIcon className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
            Assignments
          </h3>
        </div>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelect('olympiad')}
        className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 group"
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="p-3 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
            <AcademicCapIcon className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
            Olympiad
          </h3>
        </div>
      </motion.button>
    </div>
  );
}
