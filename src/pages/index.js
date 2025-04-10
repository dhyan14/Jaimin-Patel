import { motion } from 'framer-motion';
import { ArrowRightIcon, BookOpenIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Layout from '../components/Layout';
import MathEquation from '../components/MathEquation';
import 'katex/dist/katex.min.css';

export default function Home() {
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
            Welcome To My Math World
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto font-math overflow-x-auto px-2"
          >
            <div className="min-w-[250px] sm:min-w-[300px] inline-block">
              <MathEquation>
                {'\\text{Where } f(\\text{passion}) = \\int_{\\text{knowledge}}^{\\text{innovation}} \\text{creativity} \\, \\mathrm{d}x'}
              </MathEquation>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Resources Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <BookOpenIcon className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Educational Resources</h3>
              <p className="text-gray-600 mb-4 sm:mb-6">
                Access course materials, lecture notes, and study resources for all semesters.
              </p>
              <Link
                href="/resources"
                className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
              >
                Browse Resources <ArrowRightIcon className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>
          </motion.div>

          {/* Olympiad Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Mathematical Olympiad</h3>
              <p className="text-gray-600 mb-4 sm:mb-6">
                Explore resources, practice problems, and preparation materials for mathematics competitions.
              </p>
              <Link
                href="/olympiad"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                Explore Olympiad <ArrowRightIcon className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>
          </motion.div>

          {/* About Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <UserGroupIcon className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">About Me</h3>
              <p className="text-gray-600 mb-4 sm:mb-6">
                Learn more about my academic background, teaching philosophy, and expertise.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
              >
                Learn More <ArrowRightIcon className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
