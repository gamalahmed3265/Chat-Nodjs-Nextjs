import cloudinary from "../lib/cloudinary.js";

export const uploadImage = async (folderName, req) => {
  const uploadResponse = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: folderName },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    stream.end(req.file.buffer);
  });
  return uploadResponse.secure_url;
};
