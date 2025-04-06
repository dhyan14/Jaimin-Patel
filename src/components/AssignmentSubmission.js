import { useState, useRef, useEffect } from 'react';
import { students } from '../data/students';
import toast from 'react-hot-toast';
import Script from 'next/script';

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const FOLDER_ID = process.env.NEXT_PUBLIC_GOOGLE_FOLDER_ID;

const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

export default function AssignmentSubmission({ assignmentUrl, dueDate, assignmentId }) {
  // Add Google API scripts
  useEffect(() => {
    // Add Google API script
    const script1 = document.createElement('script');
    script1.src = 'https://apis.google.com/js/api.js';
    script1.async = true;
    script1.defer = true;
    document.body.appendChild(script1);

    // Add Google Identity Services script
    const script2 = document.createElement('script');
    script2.src = 'https://accounts.google.com/gsi/client';
    script2.async = true;
    script2.defer = true;
    document.body.appendChild(script2);

    return () => {
      // Cleanup scripts when component unmounts
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);
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

  const [tokenClient, setTokenClient] = useState(null);
  const [gapiInited, setGapiInited] = useState(false);
  const [gisInited, setGisInited] = useState(false);

  useEffect(() => {
    // Initialize the Google API client
    const initializeGapiClient = async () => {
      await window.gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: DISCOVERY_DOCS,
      });
      setGapiInited(true);
    };

    // Load the Google API client
    if (window.gapi) {
      window.gapi.load('client', initializeGapiClient);
    }

    // Initialize the token client
    if (window.google) {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '', // Will be set later
      });
      setTokenClient(client);
      setGisInited(true);
    }
  }, []);

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
      setUploadProgress(10);

      // Check if we need to get access token
      if (!window.gapi.client.getToken()) {
        await new Promise((resolve, reject) => {
          tokenClient.callback = (resp) => {
            if (resp.error) {
              reject(resp);
            } else {
              resolve(resp);
            }
          };
          tokenClient.requestAccessToken({ prompt: 'consent' });
        });
      }

      // Generate a unique filename
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `Assignment_${assignmentId}_${enrollmentNo}_${studentName.replace(/\s+/g, '_')}_${timestamp}.pdf`;

      // Create file metadata
      const metadata = {
        name: filename,
        mimeType: 'application/pdf',
        parents: [FOLDER_ID]
      };

      // Read file as ArrayBuffer
      const content = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsArrayBuffer(file);
      });

      setUploadProgress(30);

      // Upload to Google Drive
      const form = new FormData();
      form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
      form.append('file', new Blob([content], { type: 'application/pdf' }));

      const accessToken = window.gapi.client.getToken().access_token;
      const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        body: form
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setUploadProgress(100);
      toast.success('Assignment submitted successfully!');

      // Store submission locally
      const submissions = JSON.parse(localStorage.getItem('assignmentSubmissions') || '[]');
      submissions.push({
        id: data.id,
        assignmentId,
        enrollmentNo,
        studentName,
        fileName: filename,
        timestamp: new Date().toISOString(),
        status: 'success'
      });
      localStorage.setItem('assignmentSubmissions', JSON.stringify(submissions));

      // Reset form
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setUploadProgress(0);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload assignment. Please try again.');
      setUploadProgress(0);
    }
  };

  const isReady = gapiInited && gisInited && tokenClient;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md relative">
      {!isReady && (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
            <p>Loading Google Drive integration...</p>
          </div>
        </div>
      )}
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
