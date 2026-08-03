import { cleanSlug } from "@/lib/text-format";

export async function uploadToCloudinary(
  file: File,
  publicName?: string
) {
  const maximumFileSize = 10 * 1024 * 1024;

  if (!file.type.startsWith("image/")) {
    throw new Error("Please Select A Valid Image File");
  }

  if (file.size > maximumFileSize) {
    throw new Error("Image Must Be Smaller Than 10 MB");
  }

  const data = new FormData();

  data.append("file", file);
  data.append("upload_preset", "143studios");
  data.append("folder", "143studios/images");

  const cleanPublicName = cleanSlug(publicName || file.name.replace(/\.[^.]+$/, ""));
  if (cleanPublicName) {
    data.append("public_id", cleanPublicName);
  }

  const cloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!cloudName) {
    throw new Error(
      "Cloudinary Cloud Name Is Missing"
    );
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 60_000);

  let response: Response;

  try {
    response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: data,
        signal: controller.signal,
      }
    );
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("Cloudinary Upload Timed Out. Please Try Again");
    }

    throw error;
  } finally {
    window.clearTimeout(timeout);
  }

  const result = await response.json();

  if (!response.ok || !result.secure_url) {
    throw new Error(
      result.error?.message ||
        "Cloudinary Upload Failed"
    );
  }

  return result.secure_url as string;
}
