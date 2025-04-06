import Image from 'next/image'

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Jaimin Patel</h1>
        <p className="text-xl text-gray-600">Welcome to my personal website</p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3 flex justify-center">
            <div className="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Profile Image</span>
            </div>
          </div>
          <div className="md:w-2/3">
            <p className="mb-4">
              Hello! I am Jaimin Patel, a passionate student committed to learning and 
              academic excellence. This website serves as a hub for my educational resources.
            </p>
            <p className="mb-4">
              I have created this platform to organize and share lecture notes and assignments
              from various courses I'm taking. Feel free to explore the resources section to
              access these materials.
            </p>
            <p>
              My academic interests include [Your subjects/fields of interest]. When I'm not studying,
              I enjoy [Your hobbies/activities].
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Education</h2>
        <div className="mb-4">
          <h3 className="text-xl font-medium">University/College Name</h3>
          <p className="text-gray-600">Degree Program - Year of Study</p>
        </div>
        <div>
          <h3 className="text-xl font-medium">Previous Education</h3>
          <p className="text-gray-600">School/College Name - Graduation Year</p>
        </div>
      </div>
    </div>
  )
} 