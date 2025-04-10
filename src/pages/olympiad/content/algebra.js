import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Layout from '../../../components/Layout';

export default function AlgebraContent() {
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
            Algebra
          </h1>
          
          <div className="p-8 text-center bg-red-50 rounded-lg border-2 border-dashed border-red-200">
            <h2 className="text-xl font-semibold text-red-800 mb-3">More Content Coming Soon</h2>
            <p className="text-gray-700">We're preparing comprehensive algebra materials for olympiad preparation.</p>
            <p className="text-gray-700 mt-2">Check back later for problem sets, theory notes, and practice exercises.</p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
} 