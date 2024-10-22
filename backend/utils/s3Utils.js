const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const fs = require('fs');

// Create an S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Upload a file to S3
const uploadFileToS3 = async (filePath, bucketName, key) => {
  const fileStream = fs.createReadStream(filePath);

  const uploadParams = {
    Bucket: bucketName,
    Key: key,
    Body: fileStream,
  };

  try {
    const command = new PutObjectCommand(uploadParams);
    const data = await s3Client.send(command);
    console.log('Upload Success', data);
    return { Location: `https://${bucketName}.s3.amazonaws.com/${key}` }; // Correctly returns the file URL
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

const parseS3Url = (s3Url) => {
  const url = new URL(s3Url);
  const bucketName = url.hostname.split('.')[0]; // Extract the bucket name (e.g., 'prod-facefusion')
  const objectKey = decodeURIComponent(url.pathname.slice(1)); // Extract the object key without leading slash (e.g., 'users/...')

  return { bucketName, objectKey };
};

// Download a file from S3 using a signed URL
const downloadFileFromS3 = async (s3Url) => {
  try {
    // Parse the S3 URL
    const { bucketName, objectKey } = parseS3Url(s3Url);

    // Define the download parameters
    const downloadParams = {
      Bucket: bucketName, // Now correctly passes the bucket name
      Key: objectKey,     // Now correctly passes the object key
    };

    // Create a command for getting the object
    const command = new GetObjectCommand(downloadParams);

    // Generate the signed URL with 1-hour expiry
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    // Return the signed URL
    return signedUrl;
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw error;
  }
};

// Delete a file from S3
const deleteFileFromS3 = async (bucketName, key) => {
  const deleteParams = {
    Bucket: bucketName,
    Key: key,
  };

  try {
    const command = new DeleteObjectCommand(deleteParams);
    const response = await s3Client.send(command);
    console.log('Delete Success', response);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

const getSignedUrlForS3 = async (bucketName, key) => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 hour expiration
  return signedUrl;
};

const getSignedUrlForFullS3Url = async (s3Url) => {
  const { bucketName, objectKey } = parseS3Url(s3Url); // Parsing the full S3 URL

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
  });

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1-hour expiration
  return signedUrl;
};

module.exports = {
  uploadFileToS3,
  downloadFileFromS3,
  deleteFileFromS3,
  getSignedUrlForS3,
  parseS3Url,
  getSignedUrlForFullS3Url,
};
