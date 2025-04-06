import Link from 'next/link'

const courses = [
  { id: 'course1', name: 'Course 1: Mathematics', semesters: ['Semester 1', 'Semester 2'] },
  { id: 'course2', name: 'Course 2: Computer Science', semesters: ['Semester 1', 'Semester 2'] },
  { id: 'course3', name: 'Course 3: Physics', semesters: ['Semester 1', 'Semester 2'] },
]

export default function LectureNotes() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/resources" className="text-blue-600 hover:underline">
          ← Back to Resources
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">Lecture Notes</h1>
      
      <div className="space-y-8">
        {courses.map((course) => (
          <div key={course.id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">{course.name}</h2>
            <div className="space-y-4">
              {course.semesters.map((semester, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-medium mb-2">{semester}</h3>
                  <Link 
                    href={`/resources/lecture-notes/${course.id}/${index + 1}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Units
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 