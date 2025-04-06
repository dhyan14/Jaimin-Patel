import { Toaster } from 'react-hot-toast';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-green-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-white border-t mt-auto fixed bottom-0 w-full">
        <div className="container mx-auto px-4 py-4 text-center text-gray-600">
          © {new Date().getFullYear()} Jaimin Patel. All rights reserved.
        </div>
      </footer>

      <Toaster position="bottom-right" />
    </div>
  );
}
