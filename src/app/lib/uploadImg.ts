import { v2 as cloudinary } from "cloudinary";
import { error } from "console";

cloudinary.config({
  cloud_name: "daedstouj",
  api_key: "115112679484443",
  api_secret: "kqeD5O8S-axegNREqSfFHXlJAhE",
  secure: true,
});

export const UploadImage = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer: any = Buffer.from(arrayBuffer);

  return await new Promise(async (resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        upload_preset: "BookStore",
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          console.error("Callback Error:", error); // Ghi nhật ký lỗi từ callback
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    uploadStream.on("error", (err) => {
      console.error("Stream Error:", err); // Ghi nhật ký lỗi từ stream
      reject(err);
    });

    uploadStream.end(buffer);
  });
};

export const DeleteImg = async (id: string) => {
  return await new Promise(async (resolve, reject) => {
    try {
      const del = await cloudinary.uploader.destroy(id);
      return resolve(del);
    } catch (error: any) {
      reject(error.message);
    }
  });
};

export const UpdateImg = async (id: string, file: File) => {
  try {
    await DeleteImg(id); // Delete the old image
    const uploadResult = await UploadImage(file); // Upload the new image
    return uploadResult;
  } catch (error: any) {
    throw new Error(`Error updating image: ${error.message}`);
  }
};
