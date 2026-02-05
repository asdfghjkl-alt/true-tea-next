import { cloudinary } from "./cloudinary";
import { IImage } from "@/database/product.model";

export async function uploadImages(files: File[]): Promise<IImage[]> {
  const uploadPromises = files.map(async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise<IImage>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: "True Tea",
            transformation: [{ quality: "auto", fetch_format: "auto" }],
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

  return Promise.all(uploadPromises);
}
