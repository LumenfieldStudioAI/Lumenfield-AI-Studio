import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export const BUCKET = process.env.R2_BUCKET_NAME || "lumenfield-media";

// Upload a file from URL to R2
export async function uploadFromUrl(url: string, key: string, contentType: string): Promise<string> {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();

  await r2.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: Buffer.from(buffer),
    ContentType: contentType,
  }));

  // Return public URL (after enabling public access) or signed URL
  return `${process.env.R2_PUBLIC_URL || process.env.R2_ENDPOINT}/${BUCKET}/${key}`;
}

// Get a signed URL for private access
export async function getSignedDownloadUrl(key: string, expiresIn = 3600): Promise<string> {
  const command = new GetObjectCommand({ Bucket: BUCKET, Key: key });
  return getSignedUrl(r2, command, { expiresIn });
}

// Generate a unique key for a generation
export function generateKey(userId: string, type: "video" | "image", ext: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${userId}/${type}/${timestamp}-${random}.${ext}`;
}
