import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon, ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/outline';
import Layout from '../../../components/Layout';
import imoQuestions from '../../../data/imoQuestions';

export default function QuestionDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [currentCard, setCurrentCard] = useState(0);
  const [direction, setDirection] = useState(1);
  
  // Find the question with the matching id
  const question = imoQuestions.find(q => q.id === parseInt(id));
  
  // If the question is not found or the page is still loading
  if (!question) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Loading...</h1>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Function to format the answer text with basic HTML formatting
  const formatAnswer = (text) => {
    // Split by newlines and double newlines
    const paragraphs = text.split('\n\n');
    
    return (
      <>
        {paragraphs.map((paragraph, i) => {
          // Use dangerouslySetInnerHTML for all paragraphs to properly render HTML tags
          return <p key={i} className="mb-4" dangerouslySetInnerHTML={{ __html: paragraph }} />;
        })}
      </>
    );
  };

  // Card content
  const cards = [
    {
      title: "IOQM/PRMO",
      content: question.answer
    },
    {
      title: "Regional Mathematical Olympiad (RMO)",
      content: "Top performers from IOQM (around 300-500 per region) qualify for RMO.\n\n<strong>Tentative Schedule</strong>: Typically October or November.\n\n<strong>Format</strong>: A 3-hour exam with 6-7 subjective problems, tougher than IOQM.\n\n<strong>Regions</strong>: India is divided into 20+ regions; you compete in your regional contest.\n\n<strong>Goal</strong>: Score high to move to the national level."
    },
    {
      title: "Indian National Mathematical Olympiad Training Camp (INMOTC)",
      content: "Hypothetical Addition: Since INMOTC isn't a real stage, I'll define it as a new national training camp for RMO qualifiers, bridging RMO and INMO. Imagine it as a 1-2 week program to prepare students for INMO-level problems, organized by HBCSE.\n\n<strong>When</strong>: Hypothetically December (e.g., December 2025 for IMO 2026).\n\n<strong>Format</strong>: Training sessions with mock tests, focusing on algebra, geometry, number theory, and combinatorics.\n\n<strong>Result</strong>: All participants proceed to INMO, with performance possibly influencing later selection."
    },
    {
      title: "Indian National Mathematical Olympiad (INMO)",
      content: "Top students from RMO (via INMOTC) compete.\n\n<strong>When</strong>: January or February (e.g., January 2026 for IMO 2026).\n\n<strong>Format</strong>: 4-hour exam with 6 challenging problems.\n\n<strong>Result</strong>: Top 30-40 students advance."
    },
    {
      title: "International Mathematical Olympiad Training Camp (IMOTC)",
      content: "INMO toppers attend this official month-long camp.\n\n<strong>When</strong>: April or May at HBCSE, Mumbai.\n\n<strong>Focus</strong>: IMO-level problem-solving and final team selection tests.\n\n<strong>Result</strong>: Top 6 students are chosen."
    },
    {
      title: "IMO Team Selection",
      content: "The 6-member team is finalized and prepared for the IMO.\n\n<strong>Process</strong>: HBCSE handles logistics and final preparations."
    },
    {
      title: "IMO Competition",
      content: "Held in July (e.g., July 2026 for IMO 2026).\n\n<strong>Format</strong>: Two days, 3 problems per day, 4.5 hours each, max score of 42."
    }
  ];

  const handleNext = () => {
    if (currentCard < cards.length - 1) {
      setDirection(1);
      setCurrentCard(currentCard + 1);
    }
  };

  const handlePrevious = () => {
    if (currentCard > 0) {
      setDirection(-1);
      setCurrentCard(currentCard - 1);
    }
  };

  // Animation variants
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/olympiad" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Back to Olympiad Questions
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-8 mb-8"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {question.id === 1 ? "IMO Participation Guide" : `Question ${question.id}`}
          </h1>
          <p className="text-gray-700 mb-6 font-bold">{question.question}</p>
        </motion.div>
        
        {/* Navigation buttons */}
        <div className="flex justify-between mb-4">
          <button 
            onClick={handlePrevious} 
            disabled={currentCard === 0}
            className={`flex items-center text-blue-600 ${currentCard === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-800'}`}
          >
            <ArrowLeftCircleIcon className="h-6 w-6 mr-1" />
            Previous
          </button>
          <div className="text-center text-gray-500">
            {currentCard + 1} of {cards.length}
          </div>
          <button 
            onClick={handleNext} 
            disabled={currentCard === cards.length - 1}
            className={`flex items-center text-blue-600 ${currentCard === cards.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-800'}`}
          >
            Next
            <ArrowRightCircleIcon className="h-6 w-6 ml-1" />
          </button>
        </div>

        {/* Card carousel */}
        <div className="overflow-hidden relative">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentCard}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-md p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">{cards[currentCard].title}</h2>
              <div className="text-gray-700 prose max-w-none">
                {formatAnswer(cards[currentCard].content)}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}
