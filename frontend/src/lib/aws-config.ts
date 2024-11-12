// lib/aws-config.ts
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
  }
});

export async function getSignedMediaUrl(key: string) {
  const command = new GetObjectCommand({
    Bucket: import.meta.env.VITE_AWS_BUCKET,
    Key: key,
  });

  try {
    const signedUrl = await getSignedUrl(s3Client, command, { 
      expiresIn: 3600 
    });
    return signedUrl;
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw error;
  }
}