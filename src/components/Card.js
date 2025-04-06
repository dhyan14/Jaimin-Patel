import { motion } from 'framer-motion';

export default function Card({ title, subtitle, onClick, icon: Icon }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className="w-full p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-left group"
    >
      <div className="flex items-start space-x-4">
        {Icon && (
          <div className="p-2 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
            <Icon className="w-6 h-6 text-primary-600" />
          </div>
        )}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-2 text-gray-600">{subtitle}</p>
          )}
        </div>
      </div>
    </motion.button>
  );
}
