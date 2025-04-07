import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AdminPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    courseType: '',
    semester: '',
    unit: '',
    pdfLink: '',
    assignmentTitle: '',
    assignmentDescription: ''
  });
  const [message, setMessage] = useState('');
  const [content, setContent] = useState({ units: [], assignments: [] });
  const [activeTab, setActiveTab] = useState('add'); // 'add' or 'view'
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchContent();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/check');
      if (!res.ok) {
        router.push('/login');
      }
      setIsLoading(false);
    } catch (error) {
      router.push('/login');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const fetchContent = async () => {
    try {
      const [unitsRes, assignmentsRes] = await Promise.all([
        fetch('/api/admin/content?type=units'),
        fetch('/api/admin/content?type=assignments')
      ]);
      
      const units = await unitsRes.json();
      const assignments = await assignmentsRes.json();
      
      setContent({ units, assignments });
    } catch (error) {
      console.error('Error fetching content:', error);
      setMessage('Failed to load content');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMessage('Content added successfully!');
        setFormData({
          courseType: '',
          semester: '',
          unit: '',
          pdfLink: '',
          assignmentTitle: '',
          assignmentDescription: ''
        });
        fetchContent(); // Refresh content list
      } else {
        setMessage('Failed to add content. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col sm:py-12">
      <div className="relative py-3 sm:max-w-3xl sm:mx-auto w-full px-4">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Admin Dashboard</h2>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            </div>
            
            <div className="flex mb-6 border-b">
              <button
                className={`px-4 py-2 ${activeTab === 'add' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('add')}
              >
                Add Content
              </button>
              <button
                className={`px-4 py-2 ${activeTab === 'view' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('view')}
              >
                View Content
              </button>
            </div>

            {message && (
              <div className={`p-4 rounded-md mb-4 ${
                message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {message}
              </div>
            )}

            {activeTab === 'add' ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Course Type</label>
                  <select
                    name="courseType"
                    value={formData.courseType}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Select Course</option>
                    <option value="btech">B.Tech</option>
                    <option value="mca">MCA</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Semester</label>
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Select Semester</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                      <option key={sem} value={sem}>Semester {sem}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Unit</label>
                  <input
                    type="text"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter unit name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">PDF Link</label>
                  <input
                    type="url"
                    name="pdfLink"
                    value={formData.pdfLink}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter Google Drive PDF link"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Assignment Title (Optional)</label>
                  <input
                    type="text"
                    name="assignmentTitle"
                    value={formData.assignmentTitle}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter assignment title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Assignment Description (Optional)</label>
                  <textarea
                    name="assignmentDescription"
                    value={formData.assignmentDescription}
                    onChange={handleChange}
                    rows="4"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter assignment description"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Content
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Units</h3>
                  <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                      {content.units.map((unit, index) => (
                        <li key={index} className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-indigo-600">{unit.unit}</h4>
                              <p className="mt-1 text-sm text-gray-500">
                                {unit.courseType.toUpperCase()} - Semester {unit.semester}
                              </p>
                              <a href={unit.pdfLink} target="_blank" rel="noopener noreferrer" 
                                className="text-sm text-blue-500 hover:text-blue-700">
                                View PDF
                              </a>
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(unit.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Assignments</h3>
                  <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                      {content.assignments.map((assignment, index) => (
                        <li key={index} className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-indigo-600">{assignment.assignmentTitle}</h4>
                              <p className="mt-1 text-sm text-gray-500">
                                {assignment.courseType.toUpperCase()} - Semester {assignment.semester} - {assignment.unit}
                              </p>
                              <p className="mt-2 text-sm text-gray-600">{assignment.assignmentDescription}</p>
                              <a href={assignment.pdfLink} target="_blank" rel="noopener noreferrer" 
                                className="text-sm text-blue-500 hover:text-blue-700">
                                View PDF
                              </a>
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(assignment.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
