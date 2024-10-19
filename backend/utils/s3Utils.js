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
    return { Location: `https://${bucketName}.s3.amazonaws.com/${key}` };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

// Download a file from S3 using a signed URL
const downloadFileFromS3 = async (bucketName, key) => {
  const downloadParams = {
    Bucket: bucketName,
    Key: key,
  };

  try {
    const command = new GetObjectCommand(downloadParams);
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1-hour expiry
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

module.exports = {
  uploadFileToS3,
  downloadFileFromS3,
  deleteFileFromS3,
  getSignedUrlForS3,
};
