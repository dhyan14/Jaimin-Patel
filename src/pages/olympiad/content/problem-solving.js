import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Layout from '../../../components/Layout';

export default function ProblemSolvingContent() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/olympiad/question/5" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Back to Mathematical Olympiad Materials
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-8 mb-8"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Problem Solving Strategies
          </h1>
          
          <div className="p-8 text-center bg-yellow-50 rounded-lg border-2 border-dashed border-yellow-200 mb-8">
            <h2 className="text-xl font-semibold text-yellow-800 mb-3">More Content Coming Soon</h2>
            <p className="text-gray-700">We're preparing comprehensive problem-solving resources for olympiad preparation.</p>
            <p className="text-gray-700 mt-2">Check back later for strategies, techniques, and practice examples.</p>
          </div>

          {/* Sample Strategy Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Pólya's Problem Solving Framework</h3>
            <p className="text-gray-700 mb-4">
              George Pólya, a Hungarian mathematician, outlined a four-step approach to problem solving in his book "How to Solve It" (1945).
            </p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Understand the problem</strong> - Identify what you're looking for, what the givens are, and what constraints exist.</li>
              <li><strong>Devise a plan</strong> - Connect the data to the unknown, consider related problems, and determine which techniques might apply.</li>
              <li><strong>Execute the plan</strong> - Implement your solution strategy, checking each step carefully.</li>
              <li><strong>Review and extend</strong> - Check the result, consider different methods of solution, and think about how the approach might be used elsewhere.</li>
            </ol>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
} 