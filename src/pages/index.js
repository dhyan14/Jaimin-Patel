import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRightIcon, BookOpenIcon, UserGroupIcon, AcademicCapIcon, BeakerIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRef } from 'react';
import Layout from '../components/Layout';
import MathEquation from '../components/MathEquation';
import 'katex/dist/katex.min.css';

export default function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({ 
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 * i,
        duration: 0.7,
        ease: "easeOut"
      }
    }),
    hover: { 
      y: -8,
      boxShadow: "0 15px 30px rgba(9, 94, 161, 0.15)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <Layout>
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section with Parallax Effect */}
        <motion.div 
          className="relative text-center mb-16 sm:mb-20"
          style={{ y, opacity }}
        >
          {/* Decorative math symbols */}
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            {['∫', '∑', 'π', '√', 'Δ', '∞', 'φ', '∂'].map((symbol, i) => (
              <motion.div
                key={i}
                className="absolute text-math-300 opacity-10 font-math"
                style={{
                  fontSize: `${Math.random() * 4 + 2}rem`,
                  left: `${Math.random() * 90 + 5}%`,
                  top: `${Math.random() * 90}%`,
                  rotate: `${Math.random() * 30 - 15}deg`
                }}
                animate={{
                  y: [0, -15, 0],
                  rotate: [`${Math.random() * 10 - 5}deg`, `${Math.random() * 10 - 5}deg`],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{
                  duration: 5 + Math.random() * 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.5
                }}
              >
                {symbol}
              </motion.div>
            ))}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-slate-900 mb-6 sm:mb-8 tracking-tight"
          >
            Welcome To My <span className="text-math-700">Math</span> World
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto font-math overflow-x-auto px-2"
          >
            <div className="min-w-[250px] sm:min-w-[300px] inline-block">
              <MathEquation>
                {'\\text{Where } f(\\text{passion}) = \\int_{\\text{knowledge}}^{\\text{innovation}} \\text{creativity} \\, dx'}
              </MathEquation>
            </div>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 mb-16"
        >
          {/* Resources Card */}
          <motion.div
            custom={0}
            variants={cardVariants}
            whileHover="hover"
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100 transition-all"
          >
            <div className="p-6 sm:p-8">
              <motion.div 
                className="flex items-center mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <div className="p-3 bg-math-100 rounded-xl">
                  <BookOpenIcon className="h-8 w-8 sm:h-10 sm:w-10 text-math-600" />
                </div>
              </motion.div>
              <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-4">Educational Resources</h3>
              <p className="text-slate-600 mb-6">
                Access course materials, lecture notes, problem sets, and comprehensive study resources for mathematics at all levels.
              </p>
              <Link
                href="/resources"
                className="inline-flex items-center text-math-600 hover:text-math-700 font-medium group"
              >
                Browse Resources 
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  className="ml-2"
                >
                  <ArrowRightIcon className="h-5 w-5" />
                </motion.span>
              </Link>
            </div>
          </motion.div>

          {/* Olympiad Card */}
          <motion.div
            custom={1}
            variants={cardVariants}
            whileHover="hover"
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100 transition-all"
          >
            <div className="p-6 sm:p-8">
              <motion.div 
                className="flex items-center mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <div className="p-3 bg-math-100 rounded-xl">
                  <BeakerIcon className="h-8 w-8 sm:h-10 sm:w-10 text-math-600" />
                </div>
              </motion.div>
              <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-4">Mathematical Olympiad</h3>
              <p className="text-slate-600 mb-6">
                Explore advanced problem-solving techniques, practice problems, and comprehensive preparation materials for mathematics competitions.
              </p>
              <Link
                href="/olympiad"
                className="inline-flex items-center text-math-600 hover:text-math-700 font-medium group"
              >
                Explore Olympiad 
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  className="ml-2"
                >
                  <ArrowRightIcon className="h-5 w-5" />
                </motion.span>
              </Link>
            </div>
          </motion.div>

          {/* About Card */}
          <motion.div
            custom={2}
            variants={cardVariants}
            whileHover="hover"
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100 transition-all"
          >
            <div className="p-6 sm:p-8">
              <motion.div 
                className="flex items-center mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <div className="p-3 bg-math-100 rounded-xl">
                  <AcademicCapIcon className="h-8 w-8 sm:h-10 sm:w-10 text-math-600" />
                </div>
              </motion.div>
              <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-4">About Me</h3>
              <p className="text-slate-600 mb-6">
                Learn more about my academic background, research interests, teaching philosophy, and professional expertise in mathematics.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center text-math-600 hover:text-math-700 font-medium group"
              >
                Learn More 
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  className="ml-2"
                >
                  <ArrowRightIcon className="h-5 w-5" />
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-math-50 rounded-2xl p-8 sm:p-10 border border-math-100 shadow-equation"
        >
          <blockquote className="text-lg sm:text-xl md:text-2xl font-math text-slate-700 text-center italic">
            "Mathematics is not about numbers, equations, computations, or algorithms: it is about understanding."
          </blockquote>
          <div className="text-right mt-4 text-slate-500">— William Paul Thurston</div>
        </motion.div>
      </div>
    </Layout>
  );
}
