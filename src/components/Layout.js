import { Toaster } from 'react-hot-toast';
import Header from './Header';
import { motion } from 'framer-motion';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-math-50 relative overflow-hidden">
      {/* Background math symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => {
          const symbols = ['∫', '∑', 'π', '√', 'Δ', '∂', 'θ', 'λ', '∞', 'φ'];
          const sizes = ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl'];
          const delays = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
          const rotations = [0, 15, 30, 45, 60, 75, 90];
          
          return (
            <motion.div
              key={i}
              className={`absolute font-math ${sizes[i % sizes.length]} text-math-400 opacity-[0.07]`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                rotate: `${rotations[i % rotations.length]}deg`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0.04, 0.08, 0.04],
                scale: [0.8, 1.1, 0.8],
                y: [0, Math.random() * 10 - 5, 0],
                x: [0, Math.random() * 10 - 5, 0],
              }}
              transition={{ 
                delay: delays[i % delays.length],
                duration: 7 + Math.random() * 5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              {symbols[i % symbols.length]}
            </motion.div>
          );
        })}
      </div>
      
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        {children}
      </main>

      <footer className="bg-white/80 backdrop-blur-sm border-t border-green-200 mt-auto w-full z-40">
        <div className="container mx-auto px-4 py-4 text-center text-slate-600">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            &copy; {new Date().getFullYear()} Jaimin Patel. All rights reserved.
          </motion.div>
        </div>
      </footer>

      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#ffffff',
            color: '#1e293b',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            borderRadius: '0.5rem',
            padding: '1rem',
          },
        }}  
      />
    </div>
  );
}
