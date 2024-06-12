import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "daedstouj",
  api_key: "115112679484443",
  api_secret: "kqeD5O8S-axegNREqSfFHXlJAhE",
  secure: true,
});

export const UploadImage = async (file: File) => {
  console.log("file", file);
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
