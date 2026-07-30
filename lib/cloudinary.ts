export async function uploadToCloudinary(file: File) {
  const data = new FormData();

  data.append("file", file);
  data.append("upload_preset", "143studios");

  const cloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!cloudName) {
    throw new Error(
      "Cloudinary Cloud Name Is Missing"
    );
  }

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: data,
    }
  );

  const result = await response.json();

  if (!response.ok || !result.secure_url) {
    throw new Error(
      result.error?.message ||
        "Cloudinary Upload Failed"
    );
  }

  return result.secure_url as string;
}