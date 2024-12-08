// lib/aws-config.ts
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const signedUrlCache: Record<string, { url: string; expiry: number }> = {};

export const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
  }
});

export async function getCachedSignedMediaUrl(key: string): Promise<string> {
  const currentTime = Date.now() / 1000; 
  const cached = signedUrlCache[key];
  if (cached && cached.expiry > currentTime) {
    return cached.url;
  }

  const command = new GetObjectCommand({
    Bucket: import.meta.env.VITE_AWS_BUCKET,
    Key: key,
    ResponseCacheControl: "max-age=3600",
  });

  try {
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    signedUrlCache[key] = { url: signedUrl, expiry: currentTime + 3600 };
    return signedUrl;
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw error;
  }
}