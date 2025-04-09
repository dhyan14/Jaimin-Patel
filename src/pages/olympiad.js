import { motion } from 'framer-motion';
import { AcademicCapIcon, TrophyIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import Layout from '../components/Layout';

export default function Olympiad() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4 sm:mb-6"
          >
            Mathematics Olympiad
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-xs mx-auto mb-6"
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/IMO_logo.svg/1280px-IMO_logo.svg.png" 
              alt="IMO Logo" 
              className="w-full h-auto"
            />          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Explore resources, practice problems, and preparation materials for various mathematics competitions and olympiads.
          </motion.p>
        </div>

        {/* Straight line replacing the three cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full h-1 bg-gray-300 rounded-full my-12 sm:my-16"
        />

        {/* Coming Soon Section */}
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">More Content Coming Soon!</h2>
          <p className="text-gray-600">
            We're currently working on adding more olympiad resources, past papers, and interactive problem-solving sessions.
            Check back soon for updates!
          </p>
        </div>
      </div>
    </Layout>
  );
}
