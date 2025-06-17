import { useEffect } from 'react';
import Layout from '../components/Layout';

export default function AIPresentationMaker() {
  useEffect(() => {
    // Redirect to LaTeX editor when this page loads
    window.location.href = 'https://latex-beamer.vercel.app/';
  }, []);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Redirecting to LaTeX Editor...</h1>
          <p className="mt-4 text-gray-600">Please wait while we redirect you to the LaTeX editor.</p>
        </div>
      </div>
    </Layout>
  );
} 