import React from 'react';
import Head from 'next/head';

const PuzzleGame = () => {
  return (
    <>
      <Head>
        <title>Tiling and Coloring Puzzles</title>
        <meta name="description" content="Interactive Tiling and Coloring Puzzles" />
      </Head>
      <div className="w-full h-screen">
        <iframe
          src="https://tiling-and-coloring-puzzles.vercel.app/"
          className="w-full h-full border-none"
          title="Tiling and Coloring Puzzles"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </>
  );
};

export default PuzzleGame; 