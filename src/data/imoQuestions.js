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
  }
];

export default imoQuestions;
