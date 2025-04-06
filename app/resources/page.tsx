import Link from 'next/link'

export default function Resources() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Academic Resources</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Lecture Notes</h2>
          <p className="mb-4 text-gray-600">Access lecture notes from various courses</p>
          <Link 
            href="/resources/lecture-notes"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            View Lecture Notes
          </Link>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Assignments</h2>
          <p className="mb-4 text-gray-600">Access assignments from various courses</p>
          <Link 
            href="/resources/assignments"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            View Assignments
          </Link>
        </div>
      </div>
    </div>
  )
} 