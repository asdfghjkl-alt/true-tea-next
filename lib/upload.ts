import { cloudinary } from "./cloudinary";
import { IImage } from "@/database";

// Uploads an array of files to Cloudinary and returns the uploaded image data
export async function uploadImages(
  files: File[],
  folder: string = "True Tea",
): Promise<IImage[]> {
  const uploadPromises = files.map(async (file) => {
    // Converts the file to a buffer for upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Returns a promise that resolves with the uploaded image data
    return new Promise<IImage>((resolve, reject) => {
      // Uses Cloudinary's upload_stream to upload the file
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: folder, // Specifies the folder in Cloudinary
            transformation: [{ quality: "auto", fetch_format: "auto" }], // Optimizes image quality and format
          },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }
            if (!result) {
              reject(new Error("Upload failed"));
              return;
            }
            // Resolves with the image URL, filename, and size
            resolve({
              url: result.secure_url,
              filename: result.public_id,
              size: result.bytes,
            });
          },
        )
        .end(buffer);
    });
  });

  // Waits for all uploads to complete
  return Promise.all(uploadPromises);
}

// Deletes images from Cloudinary
export async function deleteImages(publicIds: string[]): Promise<void> {
  if (!publicIds || publicIds.length === 0) return;

  const deletePromises = publicIds.map((publicId) => {
    return new Promise<void>((resolve) => {
      cloudinary.uploader.destroy(
        publicId,
        { resource_type: "image", invalidate: true },
        (error) => {
          if (error) {
            console.error(`Failed to delete image ${publicId}:`, error);
            // We resolve anyway to not block other deletions or the main process
            resolve();
          } else {
            resolve();
          }
        },
      );
    });
  });

  await Promise.all(deletePromises);
}
