import { useState } from 'react';
import { coursesData } from '../data/courses';

export default function Home() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);

  const handleReset = () => {
    setSelectedCourse(null);
    setSelectedSemester(null);
    setSelectedUnit(null);
  };

  const getEmbedUrl = (url) => {
    const fileId = url.match(/\/d\/(.*?)\/view/)[1];
    return `https://drive.google.com/file/d/${fileId}/preview`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Educational Resources</h1>
          {(selectedCourse || selectedSemester || selectedUnit) && (
            <button
              onClick={handleReset}
              className="mt-2 px-4 py-1 bg-blue-500 hover:bg-blue-400 rounded-lg text-sm"
            >
              Back to Courses
            </button>
          )}
        </div>
      </nav>

      <main className="container mx-auto p-6">
        <div className="max-w-4xl mx-auto">
          {!selectedCourse ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.keys(coursesData).map((course) => (
                <button
                  key={course}
                  onClick={() => setSelectedCourse(course)}
                  className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow text-center"
                >
                  <h2 className="text-xl font-semibold text-blue-600">{course}</h2>
                  <p className="mt-2 text-gray-600">Click to view semesters</p>
                </button>
              ))}
            </div>
          ) : !selectedSemester ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.keys(coursesData[selectedCourse]).map((semester) => (
                <button
                  key={semester}
                  onClick={() => setSelectedSemester(semester)}
                  className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow text-center"
                >
                  <h2 className="text-xl font-semibold text-blue-600">{semester}</h2>
                  <p className="mt-2 text-gray-600">Click to view units</p>
                </button>
              ))}
            </div>
          ) : !selectedUnit ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.keys(coursesData[selectedCourse][selectedSemester]).map((unit) => (
                <button
                  key={unit}
                  onClick={() => setSelectedUnit(unit)}
                  className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow text-center"
                >
                  <h2 className="text-xl font-semibold text-blue-600">{unit}</h2>
                  <p className="mt-2 text-gray-600">Click to view PDF</p>
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-4">
              <h2 className="text-xl font-semibold text-blue-600 mb-4">
                {selectedCourse} - {selectedSemester} - {selectedUnit}
              </h2>
              <div className="aspect-[16/9] w-full">
                <iframe
                  src={getEmbedUrl(coursesData[selectedCourse][selectedSemester][selectedUnit])}
                  className="w-full h-full rounded-lg"
                  allow="autoplay"
                  frameBorder="0"
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
