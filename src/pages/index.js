import { motion } from 'framer-motion';
import { ArrowRightIcon, BookOpenIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6"
          >
            Welcome to Jaimin Patel's Portal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Access educational resources, assignments, and more for B.Tech and MCA courses.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Resources Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-8">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <BookOpenIcon className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Educational Resources</h3>
              <p className="text-gray-600 mb-6">
                Access course materials, lecture notes, and study resources for all semesters.
              </p>
              <Link
                href="/resources"
                className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
              >
                Browse Resources <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>

          {/* About Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-8">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <UserGroupIcon className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">About Me</h3>
              <p className="text-gray-600 mb-6">
                Learn more about my academic background, teaching philosophy, and expertise.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
              >
                Learn More <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick Links</h2>
          <div className="inline-flex space-x-4">
            <Link
              href="/resources"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              View Resources
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 bg-white text-green-600 rounded-lg border border-green-600 hover:bg-green-50 transition-colors"
            >
              About Me
            </Link>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
