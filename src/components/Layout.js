import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-display font-bold text-primary-600"
          >
            Jaimin Patel
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-2 text-gray-600"
          >
            Educational Resources Portal
          </motion.p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          © {new Date().getFullYear()} Jaimin Patel. All rights reserved.
        </div>
      </footer>

      <Toaster position="bottom-right" />
    </div>
  );
}
