import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { DocumentTextIcon, PresentationChartBarIcon, SparklesIcon, BookOpenIcon } from '@heroicons/react/24/outline';

const LatexTools = () => {
  const tools = [
    {
      name: 'AI Presentation Maker',
      description: 'Create beautiful LaTeX Beamer presentations with AI assistance',
      href: '/latex-tools/ai-presentation-maker',
      icon: <PresentationChartBarIcon className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'LaTeX Polisher',
      description: 'Polish and improve your LaTeX code automatically',
      href: '/latex-tools/latex-polisher',
      icon: <SparklesIcon className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Beamer to Notes Converter',
      description: 'Convert LaTeX Beamer presentations to detailed notes',
      href: '/latex-tools/beamer-to-notes',
      icon: <DocumentTextIcon className="w-8 h-8" />,
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Interactive Lecture Notes Creator',
      description: 'Create engaging interactive lecture notes',
      href: '/latex-tools/lecture-notes-creator',
      icon: <BookOpenIcon className="w-8 h-8" />,
      color: 'from-red-500 to-red-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <>
      <Head>
        <title>LaTeX Tools - Your Mathematical Document Creation Suite</title>
        <meta name="description" content="A collection of powerful LaTeX tools for creating presentations, notes, and more" />
      </Head>
      
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              LaTeX Tools
            </motion.h1>
            <motion.p 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600"
            >
              Create professional mathematical documents with our suite of tools
            </motion.p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {tools.map((tool) => (
              <motion.div
                key={tool.name}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href={tool.href}>
                  <div className={`bg-gradient-to-r ${tool.color} rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-200`}>
                    <div className="px-6 py-8">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-white/20 rounded-lg p-3">
                          {tool.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {tool.name}
                      </h3>
                      <p className="text-white/80">
                        {tool.description}
                      </p>
                    </div>
                    <div className="px-6 py-4 bg-black/10">
                      <span className="text-white/90 text-sm font-medium flex items-center">
                        Launch Tool
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default LatexTools; 