import Link from 'next/link'

const assignmentData = [
  {
    id: 'course1',
    name: 'Mathematics',
    assignments: [
      { id: 'assignment1', name: 'Assignment 1: Calculus Problems', driveLink: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { id: 'assignment2', name: 'Assignment 2: Algebra Practice', driveLink: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { id: 'assignment3', name: 'Assignment 3: Statistics Project', driveLink: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
    ]
  },
  {
    id: 'course2',
    name: 'Computer Science',
    assignments: [
      { id: 'assignment1', name: 'Assignment 1: Programming Exercise', driveLink: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { id: 'assignment2', name: 'Assignment 2: Data Structures Implementation', driveLink: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { id: 'assignment3', name: 'Assignment 3: Algorithm Analysis', driveLink: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
    ]
  },
  {
    id: 'course3',
    name: 'Physics',
    assignments: [
      { id: 'assignment1', name: 'Assignment 1: Mechanics Problems', driveLink: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { id: 'assignment2', name: 'Assignment 2: Wave Analysis', driveLink: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { id: 'assignment3', name: 'Assignment 3: Thermodynamics Experiment', driveLink: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
    ]
  }
]

export default function Assignments() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/resources" className="text-blue-600 hover:underline">
          ← Back to Resources
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">Assignments</h1>
      
      <div className="space-y-8">
        {assignmentData.map((course) => (
          <div key={course.id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">{course.name}</h2>
            <div className="space-y-4">
              {course.assignments.map((assignment) => (
                <div key={assignment.id} className="border-l-4 border-green-500 pl-4 py-2">
                  <h3 className="text-lg font-medium mb-2">{assignment.name}</h3>
                  <a 
                    href={assignment.driveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
                  >
                    View Assignment
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 