import { useState, useRef, useEffect } from 'react';
import { students } from '../data/students';
import toast from 'react-hot-toast';
import Script from 'next/script';
import { format } from 'date-fns';

// Hardcode the client ID temporarily for testing
const CLIENT_ID = '530516674684-hco6pk5okr298eaulh3uobv67vfsnogh.apps.googleusercontent.com';
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const FOLDER_ID = process.env.NEXT_PUBLIC_GOOGLE_FOLDER_ID;
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

console.log('Using Client ID:', CLIENT_ID);

// Log environment variables
console.log('Environment Variables:', {
  NEXT_PUBLIC_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  CLIENT_ID,
  API_KEY,
  FOLDER_ID,
});

export default function AssignmentSubmission({ assignmentUrl, dueDate, assignmentId }) {
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [gapiInited, setGapiInited] = useState(false);
  const [gisInited, setGisInited] = useState(false);
  const [tokenClient, setTokenClient] = useState(null);

  // Initialize Google APIs after scripts are loaded
  useEffect(() => {
    console.log('Environment variables:', {
      CLIENT_ID,
      API_KEY,
      FOLDER_ID
    });

    const initializeGoogleAPIs = async () => {
      if (!window.gapi || !window.google) {
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

        // Get the current origin
        const origin = window.location.origin;
        console.log('Current origin:', origin);

        // Initialize token client with minimal configuration
        const tokenClientConfig = {
          client_id: CLIENT_ID,
          scope: SCOPES,
          callback: '', // Will be set later
          error_callback: (error) => {
            console.error('OAuth error:', error);
            console.log('Error details:', JSON.stringify(error, null, 2));
            toast.error(`Authentication error: ${error.error || 'Unknown error'}`);
          }
        };

        console.log('Initializing token client with config:', tokenClientConfig);
        const client = window.google.accounts.oauth2.initTokenClient(tokenClientConfig);
        console.log('Token client initialized');
        setTokenClient(client);
        setGisInited(true);
      } catch (error) {
        console.error('Error in GAPI initialization:', error);
        if (error.details?.includes('oauth2')) {
          toast.error('OAuth configuration error. Please check your Google Cloud Console settings.');
        } else {
          toast.error('Failed to initialize Google Drive integration');
        }
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

  // Track script loading state
  const [gapiLoaded, setGapiLoaded] = useState(false);
  const [gisLoaded, setGisLoaded] = useState(false);

  // Update scriptsLoaded when both scripts are ready
  useEffect(() => {
    if (gapiLoaded && gisLoaded) {
      console.log('Both scripts are loaded');
      setScriptsLoaded(true);
    }
  }, [gapiLoaded, gisLoaded]);

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
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onReady={() => {
          console.log('Google Identity Services script loaded');
          if (window.google) setGisLoaded(true);
        }}
      />
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
    </>
  );
}
