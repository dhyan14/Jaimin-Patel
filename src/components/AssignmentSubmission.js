import { useState, useRef, useEffect } from 'react';
import { students } from '../data/students';
import toast from 'react-hot-toast';
import { googleConfig } from '../config/google';
import { format } from 'date-fns';

export default function AssignmentSubmission({ assignmentUrl, dueDate }) {
  const [enrollmentNo, setEnrollmentNo] = useState('');
  const [studentName, setStudentName] = useState('');
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleEnrollmentChange = (e) => {
    const value = e.target.value;
    setEnrollmentNo(value);
    const student = students.find(s => s.enrollmentNo === value);
    setStudentName(student ? student.name : '');
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        toast.error('Please upload a PDF file');
        fileInputRef.current.value = '';
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB
        toast.error('File size must be less than 10MB');
        fileInputRef.current.value = '';
        return;
      }
      setFile(selectedFile);
    }
  };

  const [isOverdue, setIsOverdue] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const now = new Date();
    const dueDateObj = new Date(dueDate);
    setIsOverdue(now > dueDateObj);
  }, [dueDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadProgress(0);

    if (!enrollmentNo || !studentName || !file) {
      toast.error('Please fill all the required fields');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB
      toast.error('File size must be less than 10MB');
      return;
    }

    if (isOverdue) {
      toast.error('Assignment submission is closed as the due date has passed.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('enrollmentNo', enrollmentNo);
      formData.append('studentName', studentName);

      setUploadProgress(10);
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      setUploadProgress(90);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.details || 'Upload failed');
      }
      const data = await response.json();

      toast.success('Assignment submitted successfully!');
      setUploadProgress(0);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload assignment. Please try again.');
      setUploadProgress(0);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-8 flex space-x-4">
        <a
          href={assignmentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg text-center hover:bg-green-700 transition-colors"
        >
          Download Assignment
        </a>
        <button
          onClick={() => document.getElementById('assignmentForm').scrollIntoView({ behavior: 'smooth' })}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit Assignment
        </button>
      </div>

      {isOverdue ? (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          <strong className="font-bold">Submission Closed!</strong>
          <p>The due date ({format(new Date(dueDate), 'MMMM d, yyyy h:mm a')}) has passed.</p>
        </div>
      ) : null}

      <form id="assignmentForm" onSubmit={handleSubmit} className="space-y-6">
        {uploadProgress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}
        <div>
          <label htmlFor="enrollmentNo" className="block text-sm font-medium text-gray-700">
            Enrollment Number
          </label>
          <input
            type="text"
            id="enrollmentNo"
            value={enrollmentNo}
            onChange={handleEnrollmentChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Student Name
          </label>
          <div className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
            {studentName || 'Student name will appear here'}
          </div>
        </div>

        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">
            Upload Assignment (PDF only, max 10MB)
          </label>
          <input
            type="file"
            id="file"
            ref={fileInputRef}
            accept="application/pdf"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
        >
          Submit Assignment
        </button>
      </form>
    </div>
  );
}
