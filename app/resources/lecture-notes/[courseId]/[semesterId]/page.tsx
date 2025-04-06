import Link from 'next/link'

// This would normally come from a database or API
const courseData = {
  course1: {
    name: 'Mathematics',
    semesters: [
      {
        name: 'Semester 1',
        units: [
          { id: 'unit1', name: 'Unit 1: Calculus', driveLink: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
          { id: 'unit2', name: 'Unit 2: Algebra', driveLink: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
          { id: 'unit3', name: 'Unit 3: Statistics', driveLink: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
        ]
      },
      {
        name: 'Semester 2',
        units: [
          { id: 'unit1', name: 'Unit 1: Advanced Calculus', driveLink: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
          { id: 'unit2', name: 'Unit 2: Linear Algebra', driveLink: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
          { id: 'unit3', name: 'Unit 3: Probability', driveLink: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
        ]
      }
    ]
  },
  course2: {
    name: 'Computer Science',
    semesters: [
      {
        name: 'Semester 1',
        units: [
          { id: 'unit1', name: 'Unit 1: Programming Basics', driveLink: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
          { id: 'unit2', name: 'Unit 2: Data Structures', driveLink: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
          { id: 'unit3', name: 'Unit 3: Algorithms', driveLink: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
        ]
      },
      {
        name: 'Semester 2',
        units: [
          { id: 'unit1', name: 'Unit 1: Web Development', driveLink: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
          { id: 'unit2', name: 'Unit 2: Database Systems', driveLink: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
          { id: 'unit3', name: 'Unit 3: AI Fundamentals', driveLink: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
        ]
      }
    ]
  },
  course3: {
    name: 'Physics',
    semesters: [
      {
        name: 'Semester 1',
        units: [
          { id: 'unit1', name: 'Unit 1: Mechanics', driveLink: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
          { id: 'unit2', name: 'Unit 2: Waves', driveLink: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
          { id: 'unit3', name: 'Unit 3: Thermodynamics', driveLink: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
        ]
      },
      {
        name: 'Semester 2',
        units: [
          { id: 'unit1', name: 'Unit 1: Electricity & Magnetism', driveLink: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
          { id: 'unit2', name: 'Unit 2: Optics', driveLink: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
          { id: 'unit3', name: 'Unit 3: Modern Physics', driveLink: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
        ]
      }
    ]
  }
}

export default function CourseUnits({ params }: { params: { courseId: string; semesterId: string } }) {
  const { courseId, semesterId } = params
  const courseIndex = parseInt(semesterId, 10) - 1
  
  // Get course data or return not found
  const course = courseData[courseId as keyof typeof courseData]
  
  if (!course || !course.semesters[courseIndex]) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-3xl font-bold text-red-500">Course or Semester Not Found</h1>
        <p className="mt-4">
          <Link href="/resources/lecture-notes" className="text-blue-600 hover:underline">
            Return to Lecture Notes
          </Link>
        </p>
      </div>
    )
  }
  
  const semester = course.semesters[courseIndex]
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/resources/lecture-notes" className="text-blue-600 hover:underline">
          ← Back to Lecture Notes
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-2">{course.name}</h1>
      <h2 className="text-2xl font-semibold mb-6">{semester.name}</h2>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-medium mb-4">Course Units</h3>
        <ul className="space-y-4">
          {semester.units.map((unit) => (
            <li key={unit.id} className="border-b pb-4 last:border-b-0 last:pb-0">
              <h4 className="text-lg font-medium mb-2">{unit.name}</h4>
              <a 
                href={unit.driveLink} 
                target="_blank" 
                rel="noreferrer"
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
              >
                View PDF
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
} 