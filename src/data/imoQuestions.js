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
    answer: "<p><strong>Preparing for a Mathematical Olympiad is no easy task</strong>—even for experts. Scoring full marks in your school or college math exams doesn't automatically mean you're ready for the Olympiad. Mathematical Olympiads demand a <em>deep, conceptual understanding of mathematics</em>—not just the ability to memorize formulas or solve repetitive problems.</p>\n\n<p>Unfortunately, many school curriculums focus more on rote learning and exam preparation than on truly grasping the subject. But <strong>Olympiads are different</strong>. They test how well you understand a concept, not how well you can follow a pattern. It's not just about getting the right answer—it's about <em>how you think through the problem</em>.</p>\n\n<p>There are thousands of books available in the market that focus on Mathematical Olympiad preparation. Below, I've listed some of the most recommended ones. But here's the real question: <strong>Which book should you choose?</strong></p>\n\n<p>Take number theory as an example—there are dozens of books dedicated solely to this topic. It's simply not possible to read them all. At best, you might be able to dive deeply into one or two. So how do you decide which one or two to pick?</p>\n\n<p><strong>Here's the truth:</strong> No one else can answer that question for you—<em>only you can</em>. Sounds contradictory, right? Not really. Let me explain.</p>\n\n<p>Every brain works differently. I might grasp certain topics quickly but struggle with others. For you, it could be the exact opposite. What works for me might not work for you, and that's okay. A book that explains things in a way I find clear and intuitive might leave you confused—or vice versa.</p>\n\n<p>This means that the <strong>\"best\" book is the one that clicks with your way of thinking</strong>. So, what should you do?</p>\n\n<p>Below, I've included a list of recommended books categorized by different topics in Olympiad mathematics. For each book, I've added a short comment based on my personal experience—what I found helpful, challenging, or unique about it.</p>\n\n<p>When you're ready to start, begin by filtering the list based on the comments that feel most relevant to your learning style. If your filtered list still seems too long, narrow it down further by identifying the comments that feel least applicable to you. Ideally, you'll end up with <em>four or five books</em>.</p>\n\n<p><strong>Try to get access to these books</strong>—borrow them from friends, check your local library, or search online for legal PDFs. Once you have them, spend one day with each book. Browse through random sections and ask yourself:</p>\n\n<ul class='list-disc ml-6 mb-4'>\n<li><em>How easily do I understand the content?</em></li>\n<li><em>Does the explanation style match how I like to learn?</em></li>\n<li><em>Does the book keep me engaged and curious?</em></li>\n</ul>\n\n<p>By the end of this process, you'll have a clear sense of which book suits you best. And once you've chosen it, <strong>commit to it</strong>. Avoid hopping between books—just focus on finishing the one that works for you. <em>That consistency is what leads to real progress</em>.</p>",
    year: 2023
  }
];

export default imoQuestions;
