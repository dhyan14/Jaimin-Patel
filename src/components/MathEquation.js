import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import katex from 'katex';

export default function MathEquation({ children, animate = false }) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      katex.render(children, containerRef.current, {
        throwOnError: false,
        displayMode: true
      });
      
      // Short delay to ensure KaTeX has rendered
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [children]);

  if (animate) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          y: isVisible ? 0 : 20 
        }}
        transition={{ 
          duration: 0.7,
          ease: "easeOut"
        }}
        className="relative"
      >
        <motion.div 
          className="absolute inset-0 bg-math-100/40 rounded-lg -z-10"
          animate={{
            boxShadow: ["0 0 0px rgba(46, 138, 55, 0)", "0 0 20px rgba(46, 138, 55, 0.3)", "0 0 0px rgba(46, 138, 55, 0)"]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <div 
          ref={containerRef} 
          className="math-equation text-sm sm:text-xl md:text-2xl py-2 px-4" 
        />
      </motion.div>
    );
  }
  
  return (
    <div ref={containerRef} className="math-equation text-sm sm:text-xl md:text-2xl" />
  );
}
