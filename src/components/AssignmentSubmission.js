import { useState, useRef, useEffect } from 'react';
import { students } from '../data/students';
import toast from 'react-hot-toast';
import Script from 'next/script';
import { format } from 'date-fns';

// Google Drive API configuration
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const FOLDER_ID = '1P7baVeMDMG85B9GRZK6Ugb6i6pHEehcF'; // Folder ID for assignment storage
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];

// Log environment variables
console.log('Environment Variables:', {
  API_KEY,
  FOLDER_ID,
});

export default function AssignmentSubmission({ assignmentUrl, dueDate, assignmentId }) {
  console.log('AssignmentSubmission props:', { assignmentUrl, dueDate, assignmentId });
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [gapiInited, setGapiInited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize Google APIs after scripts are loaded
  useEffect(() => {
    console.log('Environment variables:', {
      API_KEY,
      FOLDER_ID
    });

    const initializeGoogleAPIs = async () => {
      if (!window.gapi) {
        console.log('Google APIs not yet available');
        return;
      }

      try {
        console.log('Initializing Google APIs...');
        await new Promise((resolve, reject) => {
          window.gapi.load('client', {
            callback: resolve,
            onerror: reject
          });
        });

        await window.gapi.client.init({
          apiKey: API_KEY,
          discoveryDocs: DISCOVERY_DOCS,
        });
        console.log('GAPI client initialized');
        setGapiInited(true);
      } catch (error) {
        console.error('Error in GAPI initialization:', error);
        toast.error('Failed to initialize Google Drive integration');
      }
    };

    if (scriptsLoaded) {
      initializeGoogleAPIs();
    }
  }, [scriptsLoaded]);

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
    setIsLoading(true);

    if (!enrollmentNo || !studentName || !file) {
      toast.error('Please fill all the required fields');
      setIsLoading(false);
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB
      toast.error('File size must be less than 10MB');
      setIsLoading(false);
      return;
    }

    if (isOverdue) {
      toast.error('Assignment submission is closed as the due date has passed.');
      setIsLoading(false);
      return;
    }

    try {
      setUploadProgress(10);

      // Generate a unique filename
      const currentDate = format(new Date(), 'yyyyMMdd');
      const timestamp = format(new Date(), 'HHmmss');
      const filename = `Assignment_${assignmentId}_${enrollmentNo}_${studentName.replace(/\s+/g, '_')}_${currentDate}_${timestamp}.pdf`;

      // Read file as base64
      const content = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result.split(',')[1]); // Get base64 content without MIME prefix
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(file);
      });

      setUploadProgress(30);

      console.log('Preparing to upload file to Google Drive...');
      console.log('Folder ID:', FOLDER_ID);
      
      if (!FOLDER_ID) {
        throw new Error('Google Drive folder ID is not configured');
      }

      // Call the server-side API endpoint to upload the file using service account
      const response = await fetch('/api/upload-assignment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename,
          mimeType: 'application/pdf',
          folderId: FOLDER_ID,
          content, // base64 encoded file content
          metadata: {
            assignmentId,
            enrollmentNo,
            studentName
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload file');
      }

      const fileData = await response.json();
      setUploadProgress(90);

      // Store submission details
      const submissionDetails = {
        id: fileData.id,
        assignmentId,
        enrollmentNo,
        studentName,
        fileName: filename,
        timestamp: new Date().toISOString(),
        status: 'success',
        webViewLink: fileData.webViewLink
      };

      // Save to local storage
      const submissions = JSON.parse(localStorage.getItem('assignmentSubmissions') || '[]');
      submissions.push(submissionDetails);
      localStorage.setItem('assignmentSubmissions', JSON.stringify(submissions));
      
      setUploadProgress(100);
      toast.success('Assignment submitted successfully! 🎉', {
        duration: 5000,
        icon: '✅'
      });

      // Reset form
      setFile(null);
      setEnrollmentNo('');
      setStudentName('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setUploadProgress(0);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(`Failed to upload assignment: ${error.message}`);
      setUploadProgress(0);
    } finally {
      setIsLoading(false);
    }
  };

  // Track script loading state
  const [gapiLoaded, setGapiLoaded] = useState(false);

  // Update scriptsLoaded when script is ready
  useEffect(() => {
    if (gapiLoaded) {
      console.log('Google API script is loaded');
      setScriptsLoaded(true);
    }
  }, [gapiLoaded]);

  return (
    <>
      <Script
        src="https://apis.google.com/js/api.js"
        strategy="afterInteractive"
        onReady={() => {
          console.log('Google API script loaded');
          if (window.gapi) setGapiLoaded(true);
        }}
      />
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md relative">
      {(!gapiInited || isLoading) && (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
            <p>{isLoading ? 'Uploading your assignment...' : 'Loading Google Drive integration...'}</p>
          </div>
        </div>
      )}
      <div className="mb-8 flex flex-col space-y-4">
        <a
          href={assignmentId === "3.3" ? "https://drive.google.com/uc?export=view&id=1Kgjy9L_NHEjLHI4B4AsMcA0SbCzpC2JK" : assignmentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg text-center hover:bg-green-700 transition-colors"
        >
          Download Assignment
        </a>
        {assignmentId === "3.3" && (
          <a
            href="https://drive.google.com/uc?export=view&id=1Kgjy9L_NHEjLHI4B4AsMcA0SbCzpC2JK"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg text-center hover:bg-blue-700 transition-colors"
          >
            Assignment 3.3 Download PDF
          </a>
        )}
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
          <div className="relative mt-1">
            <input
              type="file"
              id="file"
              ref={fileInputRef}
              accept="application/pdf"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              required
            />
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-500 bg-white">
              {file ? file.name : 'Choose file...'}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          disabled={!gapiInited || isLoading}
        >
          Submit Assignment
        </button>
      </form>
    </div>
    </>
  );
}
