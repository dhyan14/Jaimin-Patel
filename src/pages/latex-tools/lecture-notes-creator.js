import React from 'react';
import Head from 'next/head';

const LectureNotesCreator = () => {
  return (
    <>
      <Head>
        <title>Interactive Lecture Notes Creator - LaTeX Tools</title>
        <meta name="description" content="Create Interactive Lecture Notes" />
      </Head>
      <div className="w-full h-screen">
        <iframe
          src="https://interactive-lecture-notes-creator.vercel.app/"
          className="w-full h-full border-none"
          title="Interactive Lecture Notes Creator"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </>
  );
};

export default LectureNotesCreator; 