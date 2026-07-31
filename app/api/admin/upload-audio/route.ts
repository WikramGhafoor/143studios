import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  r2,
  R2_BUCKET,
  R2_PUBLIC_URL,
} from "@/lib/r2";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const allowedTypes = [
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/x-wav",
  "audio/ogg",
  "audio/flac",
  "audio/x-flac",
  "audio/mp4",
  "audio/aac",
];

function sanitizeFileName(fileName: string) {
  const lastDot = fileName.lastIndexOf(".");

  const baseName =
    lastDot > 0
      ? fileName.slice(0, lastDot)
      : fileName;

  const extension =
    lastDot > 0
      ? fileName.slice(lastDot).toLowerCase()
      : ".mp3";

  const cleanName = baseName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return `${cleanName || "audio-file"}${extension}`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      fileName?: string;
      fileType?: string;
      fileSize?: number;
    };

    const fileName = body.fileName?.trim();
    const fileType = body.fileType?.trim();
    const fileSize = Number(body.fileSize);

    if (!fileName || !fileType || !fileSize) {
      return NextResponse.json(
        {
          success: false,
          message: "Audio File Details Are Missing.",
        },
        { status: 400 }
      );
    }

    if (
      !allowedTypes.includes(fileType) &&
      !fileType.startsWith("audio/")
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Unsupported Audio File Type.",
        },
        { status: 400 }
      );
    }

    const maximumSize = 100 * 1024 * 1024;

    if (fileSize > maximumSize) {
      return NextResponse.json(
        {
          success: false,
          message: "Audio File Must Be Smaller Than 100 MB.",
        },
        { status: 400 }
      );
    }

    const cleanFileName = sanitizeFileName(fileName);

    const uniqueName =
      `${Date.now()}-${cleanFileName}`;

    const key = `releases/${uniqueName}`;

    const command = new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(
      r2,
      command,
      {
        expiresIn: 600,
      }
    );

    const publicUrl =
      `${R2_PUBLIC_URL}/${key}`;

    return NextResponse.json({
      success: true,
      uploadUrl,
      publicUrl,
      fileName: uniqueName,
    });
  } catch (error) {
    console.error(
      "R2 Signed Upload Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Upload Preparation Failed.",
      },
      { status: 500 }
    );
  }
}