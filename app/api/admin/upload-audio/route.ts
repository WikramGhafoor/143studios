import { createHmac } from "node:crypto";
import { NextResponse } from "next/server";

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
    const workerUrl =
      process.env.R2_WORKER_URL?.replace(/\/+$/, "");

    const uploadSecret =
      process.env.R2_UPLOAD_SECRET;

    const publicUrl =
      (
        process.env.R2_PUBLIC_URL ||
        "https://audio.143studios.online"
      ).replace(/\/+$/, "");

    if (!workerUrl || !uploadSecret) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Worker Upload Environment Variables Are Missing.",
        },
        {
          status: 500,
        }
      );
    }

    const body = (await request.json()) as {
      fileName?: string;
      fileType?: string;
      fileSize?: number;
    };

    const fileName = body.fileName?.trim();
    const fileType = body.fileType?.trim();
    const fileSize = Number(body.fileSize);

    if (
      !fileName ||
      !fileType ||
      !Number.isFinite(fileSize) ||
      fileSize <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Audio File Details Are Missing.",
        },
        {
          status: 400,
        }
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
        {
          status: 400,
        }
      );
    }

    const maximumSize = 100 * 1024 * 1024;

    if (fileSize > maximumSize) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Audio File Must Be Smaller Than 100 MB.",
        },
        {
          status: 400,
        }
      );
    }

    const cleanFileName =
      sanitizeFileName(fileName);

    const uniqueName =
      `${Date.now()}-${cleanFileName}`;

    const key = `releases/${uniqueName}`;

    const expires = Date.now() + 10 * 60 * 1000;

    const signaturePayload =
      `${key}|${fileType}|${fileSize}|${expires}`;

    const signature = createHmac(
      "sha256",
      uploadSecret
    )
      .update(signaturePayload)
      .digest("hex");

    return NextResponse.json({
      success: true,
      workerUrl,
      key,
      expires,
      signature,
      publicUrl: `${publicUrl}/${key}`,
    });
  } catch (error) {
    console.error(
      "Worker Upload Preparation Error:",
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
      {
        status: 500,
      }
    );
  }
}