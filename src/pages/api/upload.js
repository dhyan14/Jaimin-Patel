import { google } from 'googleapis';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import { googleConfig } from '../../config/google';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Set credentials directly if you have a refresh token
if (process.env.GOOGLE_REFRESH_TOKEN) {
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
  });
}

// Get access token using client credentials
async function getAccessToken() {
  try {
    const { tokens } = await oauth2Client.getAccessToken();
    return tokens.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}

const drive = google.drive({ version: 'v3', auth: oauth2Client });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Ensure required environment variables are set
    const requiredEnvVars = ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_REDIRECT_URI', 'GOOGLE_REFRESH_TOKEN', 'GOOGLE_FOLDER_ID'];
    const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingEnvVars.length > 0) {
      console.error('Missing environment variables:', missingEnvVars);
      return res.status(500).json({ 
        message: 'Server configuration error', 
        details: 'Missing required environment variables' 
      });
    }

    // Create tmp directory if it doesn't exist
    const tmpDir = path.join(process.cwd(), 'tmp');
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }

    // Parse the multipart form data
    const form = new IncomingForm({
      uploadDir: tmpDir,
      keepExtensions: true,
      multiples: true
    });
    
    console.log('Parsing form data...');
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.error('Form parsing error:', err);
          reject(err);
        }
        resolve([fields, files]);
      });
    });
    console.log('Form data parsed successfully');

    if (!files || !files.file || !files.file[0]) {
      console.error('No file received in request');
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = files.file[0];
    const { enrollmentNo, studentName } = fields;

    if (!enrollmentNo || !studentName) {
      console.error('Missing required fields:', { enrollmentNo, studentName });
      return res.status(400).json({ message: 'Missing required fields' });
    }

    console.log('Preparing file upload to Google Drive...');
    const fileMetadata = {
      name: `${enrollmentNo}_${file.originalFilename}`,
      parents: [process.env.GOOGLE_FOLDER_ID]
    };

    const media = {
      mimeType: file.mimetype,
      body: fs.createReadStream(file.filepath),
    };

    try {
      console.log('Uploading file to Google Drive...');
      const response = await drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id',
      });
      console.log('File uploaded successfully to Google Drive');

      // Clean up the temporary file
      fs.unlinkSync(file.filepath);

      res.status(200).json({
        message: 'File uploaded successfully',
        fileId: response.data.id,
      });
    } catch (driveError) {
      console.error('Google Drive upload error:', driveError);
      res.status(500).json({
        message: 'Error uploading to Google Drive',
        details: driveError.message
      });
    }
  } catch (error) {
    console.error('Upload handler error:', error);
    // Ensure we don't send internal error details to client
    res.status(500).json({ 
      message: 'Error uploading file',
      details: error.message
    });
  }
}
