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

  // Alternative cards for Material For Mathematical Olympiad FAQ
  const materialCards = [
    {
      title: "Recommended Books",
      content: "<strong>Fundamental Texts</strong>:\n• <em>Problem-Solving Strategies</em> by Arthur Engel – The bible of olympiad problem-solving techniques\n• <em>Mathematical Olympiad Challenges</em> by Titu Andreescu & Razvan Gelca – Carefully scaffolded problems\n• <em>Principles and Techniques in Combinatorics</em> by Chen Chuan-Chong & Koh Khee-Meng – Must-have for combinatorics\n\n<strong>Topic-Specific Books</strong>:\n• <em>104 Number Theory Problems</em> by Titu Andreescu – From the USA IMO team's training\n• <em>Euclidean Geometry in Mathematical Olympiads</em> by Evan Chen – Modern approach to geometry\n• <em>Functional Equations and How to Solve Them</em> by Christopher Small – Specialized but important"
    },
    {
      title: "Online Resources",
      content: "<strong>Problem Archives</strong>:\n• <a href='https://artofproblemsolving.com' target='_blank'>Art of Problem Solving</a> – Forums, resources and community\n• <a href='https://brilliant.org' target='_blank'>Brilliant.org</a> – Interactive learning platform\n• <a href='https://imo-official.org' target='_blank'>IMO Official Website</a> – Past problems and solutions\n\n<strong>Training Platforms</strong>:\n• <a href='https://codeforces.com/gym' target='_blank'>Codeforces Gym</a> – Math contests with automated judging\n• <a href='https://www.cheenta.com' target='_blank'>Cheenta</a> – Indian olympiad training platform\n• <a href='https://aops.com/community/classrooms' target='_blank'>AoPS Online Classes</a> – Structured courses taught by experts"
    },
    {
      title: "Previous Year Papers",
      content: "<strong>Indian Contests</strong>:\n• IOQM/PRMO papers (2015-2023) are available on the <a href='https://olympiads.hbcse.tifr.res.in/how-to-prepare/past-papers/' target='_blank'>HBCSE website</a>\n• RMO and INMO papers are also archived there\n\n<strong>International Contests</strong>:\n• IMO papers from all years are available on multiple platforms\n• Regional olympiads like APMO (Asia Pacific), Balkan MO, etc. provide additional practice\n\n<strong>Tip</strong>: Study the solutions carefully, not just the problems. Understanding the approach is more important than the final answer."
    },
    {
      title: "Number Theory",
      content: "<strong>Core Topics</strong>:\n• Divisibility and prime factorization\n• Modular arithmetic and congruences\n• Fermat's Little Theorem and Euler's Theorem\n• Diophantine equations\n\n<strong>Recommended Sequence</strong>:\n1. Start with elementary number theory from NCERT texts\n2. Progress to A.L.T. Papadopoulos's <em>Invitation to Number Theory</em>\n3. Move to Victor Shoup's <em>A Computational Introduction to Number Theory</em>\n4. Practice with previous RMO/INMO number theory problems"
    },
    {
      title: "Algebra & Combinatorics",
      content: "<strong>Key Areas</strong>:\n• Inequalities (AM-GM, Cauchy-Schwarz, etc.)\n• Functional equations\n• Sequences and series\n• Counting techniques and probability\n\n<strong>Progression Path</strong>:\n1. Begin with <em>Introductory Combinatorics</em> by Richard Brualdi\n2. Practice with <em>Secrets in Inequalities</em> by Pham Kim Hung\n3. Study <em>Functional Equations</em> by Christopher Small\n4. Challenge yourself with IMO algebra problems from recent years"
    },
    {
      title: "Geometry",
      content: "<strong>Essential Concepts</strong>:\n• Euclidean geometry (angles, triangles, circles)\n• Coordinate geometry\n• Transformations and vectors\n• Projective and inversive geometry\n\n<strong>Study Plan</strong>:\n1. Master basic theorems using <em>Geometry Revisited</em> by Coxeter & Greitzer\n2. Practice with <em>Lemmas in Olympiad Geometry</em> by Titu Andreescu\n3. Advanced students should study <em>Euclidean Geometry in Mathematical Olympiads</em> by Evan Chen\n4. Regularly solve geometric construction problems"
    },
    {
      title: "Practice Strategies",
      content: "<strong>Effective Approach</strong>:\n• Start with easier problems and gradually increase difficulty\n• Time yourself to simulate competition conditions\n• Analyze solutions deeply, even for problems you solve\n• Keep a notebook of techniques and useful lemmas\n• Join study groups or find a mentor\n\n<strong>Problem-Solving Process</strong>:\n1. Understand the problem completely\n2. Try special cases and examples\n3. Look for patterns and structures\n4. Formulate a solution strategy\n5. Write clear, rigorous proofs\n6. Review and refine your solution"
    }
  ];

  // Use the appropriate cards based on the question ID
  const activeCards = question.id === 5 ? materialCards : cards;

  const handleNext = () => {
    if (currentCard < activeCards.length - 1) {
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
            {question.id === 1 ? "IMO Participation Guide" : question.id === 5 ? "Preparation Guide" : `Question ${question.id}`}
          </h1>
          <p className="text-gray-700 mb-6 font-bold">{question.question}</p>
        </motion.div>
        
        {/* Check if it's Material For Mathematical Olympiad */}
        {question.id === 5 ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Preparation Guide</h2>
              <div className="text-gray-700 prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: question.answer }} />
              </div>
            </motion.div>

            {/* First row: Number Theory, Problem Solving, Geometry */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Number Theory Card */}
              <Link href="/olympiad/content/number-theory">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white rounded-xl shadow-md p-6 cursor-pointer transition-all hover:shadow-lg"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <span className="text-blue-600 text-2xl font-semibold">NT</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Number Theory</h3>
                    <p className="text-sm text-gray-600 text-center">More content coming soon</p>
                  </div>
                </motion.div>
              </Link>

              {/* Problem Solving Card */}
              <Link href="/olympiad/content/problem-solving">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white rounded-xl shadow-md p-6 cursor-pointer transition-all hover:shadow-lg"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="h-16 w-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-yellow-600 w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Problem Solving</h3>
                    <p className="text-sm text-gray-600 text-center">More Content Coming Soon</p>
                  </div>
                </motion.div>
              </Link>

              {/* Geometry Card */}
              <Link href="/olympiad/content/geometry">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white rounded-xl shadow-md p-6 cursor-pointer transition-all hover:shadow-lg"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <span className="text-green-600 text-2xl font-semibold">G</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Geometry</h3>
                    <p className="text-sm text-gray-600 text-center">More content coming soon</p>
                  </div>
                </motion.div>
              </Link>
            </div>

            {/* Second row: Algebra, Combinatorics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Algebra Card */}
              <Link href="/olympiad/content/algebra">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white rounded-xl shadow-md p-6 cursor-pointer transition-all hover:shadow-lg"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                      <span className="text-red-600 text-2xl font-semibold">A</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Algebra</h3>
                    <p className="text-sm text-gray-600 text-center">More content coming soon</p>
                  </div>
                </motion.div>
              </Link>

              {/* Combinatorics Card */}
              <Link href="/olympiad/content/combinatorics">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white rounded-xl shadow-md p-6 cursor-pointer transition-all hover:shadow-lg"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                      <span className="text-purple-600 text-2xl font-semibold">C</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Combinatorics</h3>
                    <p className="text-sm text-gray-600 text-center">More content coming soon</p>
                  </div>
                </motion.div>
              </Link>
            </div>
          </>
        ) : (
          <>
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
                {currentCard + 1} of {activeCards.length}
              </div>
              <button 
                onClick={handleNext} 
                disabled={currentCard === activeCards.length - 1}
                className={`flex items-center text-blue-600 ${currentCard === activeCards.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-800'}`}
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">{activeCards[currentCard].title}</h2>
                  <div className="text-gray-700 prose max-w-none">
                    {formatAnswer(activeCards[currentCard].content)}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
