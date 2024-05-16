import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function deleteObjectFromBucket(fileUrl: string) {
  const deleteCommand = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileUrl.split("/").reverse()[0],
  });

  const response = await s3Client.send(deleteCommand);

  if (!response.$metadata.httpStatusCode?.toString().startsWith("2")) {
    return { success: false };
  }

  return { success: true };
}
