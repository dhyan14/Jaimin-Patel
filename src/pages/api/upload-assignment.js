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
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
    const projectId = process.env.GOOGLE_SERVICE_ACCOUNT_PROJECT_ID;

    // Log environment variables (without exposing full private key)
    console.log('Service Account Email:', serviceAccountEmail);
    console.log('Project ID:', projectId);
    console.log('Private Key available:', !!privateKey);
    console.log('Private Key length:', privateKey?.length);
    console.log('Folder ID:', folderId);

    if (!serviceAccountEmail || !privateKey) {
      console.error('Missing service account credentials');
      return res.status(500).json({ 
        message: 'Server configuration error: Missing service account credentials',
        details: {
          emailAvailable: !!serviceAccountEmail,
          keyAvailable: !!privateKey,
          projectIdAvailable: !!projectId
        }
      });
    }

    // Process the private key - try different formats to handle Vercel environment variable issues
    let processedPrivateKey = privateKey;
    
    // If the key doesn't contain newlines, try to replace escaped newlines
    if (!privateKey.includes('\n')) {
      processedPrivateKey = privateKey
        .replace(/\\n/g, '\n')  // Replace \n with actual newlines
        .replace(/["']/g, '');  // Remove any quotes that might be part of the environment variable
    }

    console.log('Private key processed, contains newlines:', processedPrivateKey.includes('\n'));

    // Create auth client
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: serviceAccountEmail,
        private_key: processedPrivateKey,
        project_id: projectId
      },
      scopes: ['https://www.googleapis.com/auth/drive']
    });

    console.log('Auth client created, creating drive client...');

    // Create Drive client
    const drive = google.drive({ version: 'v3', auth });
    console.log('Drive client created');

    console.log('Attempting to create file in Google Drive...');

    try {
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
      
      console.log('File created successfully:', file.data.id);

      try {
        // Make the file viewable by anyone with the link
        await drive.permissions.create({
          fileId: file.data.id,
          requestBody: {
            role: 'reader',
            type: 'anyone'
          }
        });
        
        console.log('File permissions updated');
      } catch (permissionError) {
        console.error('Permission update error:', permissionError);
        // Continue anyway since the file was created
      }

      // Return the file data
      return res.status(200).json({
        id: file.data.id,
        name: file.data.name,
        webViewLink: file.data.webViewLink
      });
    } catch (fileError) {
      console.error('File creation error:', fileError);
      
      // Log detailed error information
      if (fileError.response) {
        console.error('Error response:', fileError.response.data);
      }
      
      return res.status(500).json({ 
        message: 'Failed to create file in Google Drive',
        error: fileError.message,
        details: fileError.response?.data || 'No detailed error information available'
      });
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ 
      message: 'Error uploading file to Google Drive', 
      error: error.message,
      stack: process.env.NODE_ENV !== 'production' ? error.stack : undefined
    });
  }
}
