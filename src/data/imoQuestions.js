// Sample IMO questions and answers
const imoQuestions = [
  {
    id: 1,
    question: "How to participate in the International Mathematical Olympiad?",
    answer: "The entry point is the Indian Olympiad Qualifier in Mathematics, which replaced Pre-Regional Mathematical Olympiad in recent years as the first screening stage.\n\n<strong>Examination Schedule</strong>: Usually held in August or September (e.g., for IMO 2025, expect it around August 2024).\n\n<strong>Format</strong>: A 3-hour exam with multiple-choice and integer-answer questions testing basic math skills (algebra, geometry, number theory, combinatorics).\n\n<strong>Registration</strong>: Schools typically register students, or you can register individually through the HBCSE website (<a href='https://hbcse.tifr.res.in' target='_blank'>hbcse.tifr.res.in</a>) or the Mathematical Olympiad website (<a href='https://olympiads.hbcse.tifr.res.in' target='_blank'>olympiads.hbcse.tifr.res.in</a>) when open. Check for updates in mid-2024.",
    year: 2023
  },
  {
    id: 2,
    question: "Find all functions f: R → R such that f(x + f(y)) = y + f(x) for all real x and y.",
    answer: "This functional equation from IMO 2015 has the solution f(x) = -x + c for any constant c. We can verify this works by substituting: f(x + f(y)) = -x - f(y) + c = -x - (-y + c) + c = -x + y + c - c + c = -x + y + c. And y + f(x) = y + (-x + c) = y - x + c. Since these are equal, f(x) = -x + c is indeed a solution.",
    year: 2015
  },
  {
    id: 3,
    question: "Let ABC be a triangle with integer sides. A point P is inside the triangle such that the angles PAB, PBC, and PCA are all equal. Prove that the distances from P to the three sides are all rational numbers.",
    answer: "This geometry problem requires knowledge of angle bisectors and the properties of incenters. Since P makes equal angles with all sides, P is the incenter of the triangle. For a triangle with integer sides, we can use the formula for the distance from the incenter to any side: r = Area/(Semi-perimeter). Since both the area (by Heron's formula) and semi-perimeter are rational for integer-sided triangles, the distances must be rational.",
    year: 2009
  },
  {
    id: 4,
    question: "Determine all pairs of positive integers (a, b) such that a^b - b^a = 1.",
    answer: "This number theory problem has only one solution: (a,b) = (1,2). We can prove this by examining different cases based on the relative sizes of a and b, and using properties of exponential growth to show that a^b - b^a = 1 is impossible for other pairs of positive integers.",
    year: 2005
  },
  {
    id: 5,
    question: "What materials are recommended for Mathematical Olympiad preparation?",
    answer: "Successful Olympiad preparation requires structured study materials across key areas of mathematics. Below is a comprehensive guide to the best resources:\n\n<h3 class='text-xl font-semibold text-gray-900 mb-3 mt-6'>Recommended Books</h3>\n\n<strong>General Problem Solving</strong>\n<ul class='list-disc ml-6 mb-4'>\n<li><em>Problem-Solving Strategies</em> by Arthur Engel – The definitive guide for olympiad problem-solving techniques</li>\n<li><em>Mathematical Olympiad Challenges</em> by Titu Andreescu & Razvan Gelca – Carefully structured problems of progressive difficulty</li>\n</ul>\n\n<strong>Number Theory</strong>\n<ul class='list-disc ml-6 mb-4'>\n<li><em>104 Number Theory Problems</em> by Titu Andreescu – From the USA IMO team's training program</li>\n<li><em>Elementary Number Theory</em> by David Burton – Solid foundation for number theory concepts</li>\n</ul>\n\n<strong>Geometry</strong>\n<ul class='list-disc ml-6 mb-4'>\n<li><em>Euclidean Geometry in Mathematical Olympiads</em> by Evan Chen – The gold standard for olympiad geometry</li>\n<li><em>Geometry Revisited</em> by H.S.M. Coxeter & S.L. Greitzer – Classic text on advanced euclidean geometry</li>\n</ul>\n\n<strong>Algebra and Combinatorics</strong>\n<ul class='list-disc ml-6 mb-4'>\n<li><em>Principles and Techniques in Combinatorics</em> by Chen Chuan-Chong & Koh Khee-Meng – Essential for combinatorial problems</li>\n<li><em>Inequalities: A Mathematical Olympiad Approach</em> by Radmila Bulajich Manfrino – Focused approach to inequalities</li>\n</ul>\n\n<h3 class='text-xl font-semibold text-gray-900 mb-3 mt-6'>Online Resources</h3>\n\n<ul class='list-disc ml-6 mb-4'>\n<li><a href='https://artofproblemsolving.com' target='_blank' class='text-blue-600 hover:underline'>Art of Problem Solving</a> – Forums, classes, and practice materials for olympiad preparation</li>\n<li><a href='https://brilliant.org' target='_blank' class='text-blue-600 hover:underline'>Brilliant.org</a> – Interactive problem-solving modules with progressive difficulty</li>\n<li><a href='https://imo-official.org' target='_blank' class='text-blue-600 hover:underline'>IMO Official Website</a> – Archive of past papers and solutions from all IMO competitions</li>\n<li><a href='https://olympiads.hbcse.tifr.res.in' target='_blank' class='text-blue-600 hover:underline'>HBCSE Olympiad Site</a> – Official website with Indian olympiad resources and past papers</li>\n</ul>\n\n<h3 class='text-xl font-semibold text-gray-900 mb-3 mt-6'>Practice Approach</h3>\n\n<ol class='list-decimal ml-6 mb-4'>\n<li>Begin with introductory olympiad books in each topic area</li>\n<li>Solve previous years' IOQM/PRMO, RMO, and INMO papers</li>\n<li>Join a study group or find a mentor if possible</li>\n<li>Spend significant time on each problem before looking at solutions</li>\n<li>Maintain a notebook of important techniques and problem patterns</li>\n<li>Gradually increase the difficulty level as you improve</li>\n</ol>\n\n<h3 class='text-xl font-semibold text-gray-900 mb-3 mt-6'>Study Schedule</h3>\n\n<p>For serious olympiad aspirants, a consistent study schedule is recommended:</p>\n<ul class='list-disc ml-6'>\n<li>Daily problem-solving practice: At least 1-2 hours</li>\n<li>Weekly review of techniques and concepts</li>\n<li>Monthly mock tests under examination conditions</li>\n<li>Regular reading of solution methods, even for problems you solve correctly</li>\n</ul>",
    year: 2023
  }
];

export default imoQuestions;
