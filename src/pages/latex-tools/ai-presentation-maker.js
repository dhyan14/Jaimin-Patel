import React from 'react';
import Head from 'next/head';

const AIPresentation = () => {
  return (
    <>
      <Head>
        <title>AI Presentation Maker - LaTeX Tools</title>
        <meta name="description" content="AI Presentation Maker using LaTeX Beamer" />
      </Head>
      <div className="w-full h-screen">
        <iframe
          src="https://latex-beamer.vercel.app/"
          className="w-full h-full border-none"
          title="AI Presentation Maker"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </>
  );
};

export default AIPresentation; 