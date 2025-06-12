import React from 'react';
import Head from 'next/head';

const AIPresentation = () => {
  return (
    <>
      <Head>
        <title>LaTeX Editor - AI Presentation Maker</title>
        <meta name="description" content="LaTeX Beamer Editor" />
      </Head>
      <div className="w-full h-screen">
        <iframe
          src="https://latex-beamer.vercel.app/"
          className="w-full h-full border-none"
          title="LaTeX Editor"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </>
  );
};

export default AIPresentation; 