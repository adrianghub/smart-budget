import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const maxFileSize = 1024 * 1024 * 5; // 5MB
const acceptedFileTypes = ["application/pdf", "image/png"];

export async function getBucketSignedUrl(
  type: string,
  fileSize: number,
  checksum: string
) {
  if (fileSize > maxFileSize) {
    return { failure: "File size exceeds limit (5MB)" };
  }

  if (!acceptedFileTypes.includes(type)) {
    return { failure: "File type not supported" };
  }

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `FV-${Date.now()}-${generateFileName}.pdf`,
    ContentType: type,
    ContentLength: fileSize,
    ChecksumSHA256: checksum,
    Metadata: {},
  });

  const signedUrl = await getSignedUrl(s3Client, putObjectCommand, {
    expiresIn: 60,
  });

  return { success: true, url: signedUrl };
}
