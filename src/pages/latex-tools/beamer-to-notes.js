import React from 'react';
import Head from 'next/head';

const BeamerToNotes = () => {
  return (
    <>
      <Head>
        <title>Beamer to Notes Converter - LaTeX Tools</title>
        <meta name="description" content="Convert LaTeX Beamer to Notes" />
      </Head>
      <div className="w-full h-screen">
        <iframe
          src="https://latex-beamer-to-notes-converter.vercel.app/"
          className="w-full h-full border-none"
          title="Beamer to Notes Converter"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </>
  );
};

export default BeamerToNotes; 