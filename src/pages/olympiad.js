import { motion } from 'framer-motion';
import { AcademicCapIcon, TrophyIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import Layout from '../components/Layout';
import Link from 'next/link';
import imoQuestions from '../data/imoQuestions';

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
              src="/output-onlinegiftools.gif" 
              alt="Olympiad Logo" 
              className="w-full h-auto"
            />
          </motion.div>
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

        {/* International Mathematical Olympiad (IMO) Section */}
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">International Mathematical Olympiad (IMO)</h2>
          <p className="text-gray-600">
            The International Mathematical Olympiad (IMO) is the world's most prestigious mathematics competition for high school students. It was first held in 1959 in Romania and has since become an annual event, attracting participants from over 100 countries.
          </p>
          <p className="text-gray-600 mt-4">
            Each participating country sends a team of up to six students, along with two leaders. The competition consists of two days of exams, with each day featuring three challenging math problems to be solved in 4.5 hours. The problems cover a range of topics, including algebra, geometry, number theory, and combinatorics—but without requiring calculus or advanced university-level math.
          </p>
          <p className="text-gray-600 mt-4">
            The IMO promotes mathematical creativity, problem-solving skills, and international friendship among young mathematicians.
          </p>
        </div>

        {/* Question Boxes Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 gap-6">
            <Link href={`/olympiad/question/1`}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-xl shadow-md p-6 cursor-pointer transition-all hover:shadow-lg"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">IMO Participation Guide</h3>
                </div>
                <p className="text-gray-700 font-bold">{imoQuestions[0].question}</p>
                <div className="mt-4 text-blue-600 text-sm font-medium">Click to view detailed guide →</div>
              </motion.div>
            </Link>
            <Link href={`/olympiad/question/5`}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-xl shadow-md p-6 cursor-pointer transition-all hover:shadow-lg"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Material For Mathematical Olympiad</h3>
                </div>
                <p className="text-gray-700 font-bold">{imoQuestions[4].question}</p>
                <div className="mt-4 text-blue-600 text-sm font-medium">Click to view detailed guide →</div>
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
