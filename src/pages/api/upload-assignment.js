import { google } from 'googleapis';

// This function will handle the assignment upload using a service account
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { filename, mimeType, folderId, content, metadata } = req.body;

    if (!filename || !mimeType || !folderId || !content) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Get service account credentials from environment variables
    const serviceAccountCredentials = {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      project_id: process.env.GOOGLE_SERVICE_ACCOUNT_PROJECT_ID,
    };

    if (!serviceAccountCredentials.client_email || !serviceAccountCredentials.private_key) {
      console.error('Missing service account credentials');
      return res.status(500).json({ message: 'Server configuration error: Missing service account credentials' });
    }

    // Create a JWT client using the service account credentials
    const jwtClient = new google.auth.JWT(
      serviceAccountCredentials.client_email,
      null,
      serviceAccountCredentials.private_key,
      ['https://www.googleapis.com/auth/drive']
    );

    // Authorize the client
    await jwtClient.authorize();

    // Create Drive client
    const drive = google.drive({ version: 'v3', auth: jwtClient });

    // Create file metadata
    const fileMetadata = {
      name: filename,
      mimeType: mimeType,
      parents: [folderId],
      properties: metadata // Store additional metadata as custom properties
    };

    // Create the file
    const file = await drive.files.create({
      requestBody: fileMetadata,
      media: {
        mimeType: mimeType,
        body: Buffer.from(content, 'base64')
      },
      fields: 'id, name, webViewLink'
    });

    // Make the file viewable by anyone with the link
    await drive.permissions.create({
      fileId: file.data.id,
      requestBody: {
        role: 'reader',
        type: 'anyone'
      }
    });

    // Return the file data
    return res.status(200).json({
      id: file.data.id,
      name: file.data.name,
      webViewLink: file.data.webViewLink
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ 
      message: 'Error uploading file to Google Drive', 
      error: error.message 
    });
  }
}
