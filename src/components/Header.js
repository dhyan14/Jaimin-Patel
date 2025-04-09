import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Bars3Icon, XMarkIcon, AcademicCapIcon, BookOpenIcon, BeakerIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import { MyGreen } from '../utils/constants';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const navigation = [
    { name: 'Home', href: '/', icon: <AcademicCapIcon className="w-5 h-5" /> },
    { name: 'Resources', href: '/resources', icon: <BookOpenIcon className="w-5 h-5" /> },
    { name: 'Olympiad', href: '/olympiad', icon: <BeakerIcon className="w-5 h-5" /> },
    { name: 'About', href: '/about', icon: <LightBulbIcon className="w-5 h-5" /> },
  ];

  const isActive = (path) => router.pathname === path;

  // Animation variants
  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        duration: 0.2
      }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Background animation elements
  const bgElements = [
    { id: 1, icon: "∫", x: "10%", y: "20%", size: "text-lg", delay: 0 },
    { id: 2, icon: "∑", x: "25%", y: "70%", size: "text-xl", delay: 0.5 },
    { id: 3, icon: "π", x: "75%", y: "30%", size: "text-lg", delay: 1 },
    { id: 4, icon: "√", x: "85%", y: "60%", size: "text-xl", delay: 1.5 },
    { id: 5, icon: "Δ", x: "50%", y: "15%", size: "text-lg", delay: 2 },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 overflow-hidden ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md text-gray-800 shadow-lg' 
          : 'bg-[#208040]/95 backdrop-blur-md text-white shadow-md'
      }`}
    >
      {/* Animated background elements - only visible when not scrolled */}
      {!scrolled && (
        <div className="absolute inset-0 overflow-hidden">
          {bgElements.map((el) => (
            <motion.div
              key={el.id}
              className={`absolute ${el.size} opacity-20 font-bold`}
              style={{ left: el.x, top: el.y }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 0.2, 
                scale: 1,
                y: [0, -10, 0],
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{ 
                delay: el.delay,
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              {el.icon}
            </motion.div>
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-between items-center py-4">
          <motion.div
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center space-x-2"
          >
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ 
                  rotate: 360,
                  scale: 1.1,
                  boxShadow: "0 0 12px rgba(255,255,255,0.6)"
                }}
                transition={{ duration: 0.6 }}
                className={`p-2 rounded-full ${
                  scrolled 
                    ? 'bg-green-100 border border-green-300' 
                    : 'bg-[#176830] border border-[#1a7035]/50'
                }`}
              >
                <span className={`text-3xl font-bold ${
                  scrolled ? 'text-green-600' : 'text-white'
                }`}>∫</span>
              </motion.div>
              <motion.span 
                className={`text-2xl font-display font-bold transition-colors ${
                  scrolled ? 'text-gray-800' : 'text-white'
                }`}
                whileHover={{ 
                  scale: 1.05,
                  textShadow: scrolled 
                    ? "0 0 2px rgba(0,0,0,0.2)" 
                    : "0 0 8px rgba(255,255,255,0.8)"
                }}
              >
                Jaimin Patel
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item, i) => (
              <motion.div
                key={item.name}
                custom={i}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <Link
                  href={item.href}
                  className={`text-lg font-medium transition-all relative px-2 py-1 flex items-center space-x-1 ${
                    isActive(item.href)
                      ? scrolled 
                          ? 'text-green-600 font-semibold' 
                          : 'text-white font-semibold'
                      : scrolled 
                          ? 'text-gray-600 hover:text-green-600' 
                          : 'text-green-50 hover:text-white'
                  }`}
                >
                  <motion.span 
                    className={`inline-block ${
                      isActive(item.href)
                        ? scrolled 
                            ? 'text-green-500' 
                            : 'text-green-200'
                        : scrolled 
                            ? 'text-green-600/70' 
                            : 'text-green-200/70'
                    }`}
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.icon}
                  </motion.span>
                  <span>{item.name}</span>
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="underline"
                      className={`absolute bottom-0 left-0 w-full h-0.5 ${
                        scrolled 
                          ? 'bg-green-600' 
                          : 'bg-white'
                      }`}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <XMarkIcon className={`h-6 w-6 ${scrolled ? 'text-gray-800' : 'text-white'}`} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Bars3Icon className={`h-6 w-6 ${scrolled ? 'text-gray-800' : 'text-white'}`} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden py-4 overflow-hidden"
            >
              <div className="flex flex-col space-y-4">
                {navigation.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={`text-lg font-medium transition-colors flex items-center space-x-2 py-2 px-4 rounded-lg ${
                        isActive(item.href)
                          ? scrolled 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-[#176830] text-white'
                          : scrolled 
                            ? 'text-gray-600 hover:bg-gray-100/70' 
                            : 'text-green-50 hover:bg-[#176830] hover:text-white'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className={isActive(item.href) ? 'text-green-500' : ''}>{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
