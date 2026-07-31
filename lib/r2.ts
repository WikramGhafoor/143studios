import { S3Client } from "@aws-sdk/client-s3";

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey =
  process.env.R2_SECRET_ACCESS_KEY;

if (
  !accountId ||
  !accessKeyId ||
  !secretAccessKey
) {
  throw new Error(
    "R2 Environment Variables Are Missing."
  );
}

export const r2 = new S3Client({
  region: "auto",

  endpoint:
    `https://${accountId}.r2.cloudflarestorage.com`,

  credentials: {
    accessKeyId,
    secretAccessKey,
  },

  forcePathStyle: true,
});

export const R2_BUCKET =
  process.env.R2_BUCKET_NAME ||
  "143studios-audio";

export const R2_PUBLIC_URL =
  (
    process.env.R2_PUBLIC_URL ||
    "https://audio.143studios.online"
  ).replace(/\/+$/, "");