# Google Drive Service Account Setup

This document explains how to set up a Google Service Account for the assignment submission feature.

## Why Use a Service Account?

A service account allows the application to upload files to Google Drive without requiring users to authenticate. This is more secure and provides a better user experience for students submitting assignments.

## Setup Instructions

### 1. Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note your Project ID for later use

### 2. Enable the Google Drive API

1. In your Google Cloud project, go to "APIs & Services" > "Library"
2. Search for "Google Drive API" and enable it

### 3. Create a Service Account

1. Go to "IAM & Admin" > "Service Accounts"
2. Click "Create Service Account"
3. Enter a name and description for your service account
4. Click "Create and Continue"
5. For the role, select "Basic" > "Editor" (or a more restrictive role if preferred)
6. Click "Continue" and then "Done"

### 4. Create Service Account Keys

1. From the Service Accounts list, find your newly created service account
2. Click the three dots menu (⋮) and select "Manage keys"
3. Click "Add Key" > "Create new key"
4. Select "JSON" format and click "Create"
5. The key file will be downloaded to your computer - keep this secure!

### 5. Create a Folder in Google Drive

1. Go to [Google Drive](https://drive.google.com/)
2. Create a new folder for assignment submissions
3. Right-click on the folder and select "Share"
4. Add your service account email with "Editor" permissions
5. Note the Folder ID from the URL (the long string after /folders/ in the URL)

### 6. Configure Environment Variables in Vercel

Add the following environment variables to your Vercel project:

```
NEXT_PUBLIC_GOOGLE_API_KEY=your_api_key
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email@your-project-id.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key Here\n-----END PRIVATE KEY-----\n"
GOOGLE_SERVICE_ACCOUNT_PROJECT_ID=your-project-id
```

Note: For the private key, make sure to replace all newlines with `\n` characters.

### 7. Update the Folder ID in the Code

In the `AssignmentSubmission.js` file, update the `FOLDER_ID` constant with your Google Drive folder ID.

## Testing

After setting up the service account and deploying to Vercel, test the assignment submission feature to ensure files are being uploaded correctly to the specified Google Drive folder.

## Troubleshooting

- If you encounter permission errors, make sure the service account has been granted access to the Google Drive folder
- Check that all environment variables are correctly set in Vercel
- Verify that the Google Drive API is enabled in your Google Cloud project
