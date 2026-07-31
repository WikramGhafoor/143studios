import { NextResponse } from "next/server";
import {
  PutObjectCommand,
} from "@aws-sdk/client-s3";

import {
  r2,
  R2_BUCKET,
  R2_PUBLIC_URL,
} from "@/lib/r2";

function sanitizeFileName(fileName: string) {
  const extension =
    fileName.substring(
      fileName.lastIndexOf(".")
    );

  const baseName =
    fileName.substring(
      0,
      fileName.lastIndexOf(".")
    );

  const cleanName = baseName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return `${cleanName}${extension.toLowerCase()}`;
}

export async function POST(
  request: Request
) {
  try {
    const formData =
      await request.formData();

    const file =
      formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "No File Uploaded",
        },
        {
          status: 400,
        }
      );
    }

    const fileName =
      sanitizeFileName(file.name);

    const key = `releases/${fileName}`;

    const buffer = Buffer.from(
      await file.arrayBuffer()
    );

    await r2.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      })
    );

    return NextResponse.json({
      success: true,
      url: `${R2_PUBLIC_URL}/${key}`,
      fileName,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Upload Failed",
      },
      {
        status: 500,
      }
    );
  }
}