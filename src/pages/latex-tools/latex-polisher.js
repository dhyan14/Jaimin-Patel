import React from 'react';
import Head from 'next/head';

const LatexPolisher = () => {
  return (
    <>
      <Head>
        <title>LaTeX Polisher - LaTeX Tools</title>
        <meta name="description" content="LaTeX Code Polisher Tool" />
      </Head>
      <div className="w-full h-screen">
        <iframe
          src="https://latex-polisher-ai.vercel.app/"
          className="w-full h-full border-none"
          title="LaTeX Polisher"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </>
  );
};

export default LatexPolisher; 