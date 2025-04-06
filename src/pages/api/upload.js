import { google } from 'googleapis';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import { googleConfig } from '../../config/google';

export const config = {
  api: {
    bodyParser: false,
  },
};

const oauth2Client = new google.auth.OAuth2(
  googleConfig.clientId,
  googleConfig.clientSecret,
  googleConfig.redirectUri
);

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
    const form = new IncomingForm();
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const file = files.file[0];
    const { enrollmentNo, studentName } = fields;

    const fileMetadata = {
      name: `${enrollmentNo}_${file.originalFilename}`,
      parents: [googleConfig.folderId]
    };

    const media = {
      mimeType: file.mimetype,
      body: fs.createReadStream(file.filepath),
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id',
    });

    // Clean up the temporary file
    fs.unlinkSync(file.filepath);

    res.status(200).json({
      message: 'File uploaded successfully',
      fileId: response.data.id,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
}
