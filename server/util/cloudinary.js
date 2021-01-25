const {v4} =require ('uuid');
const cloudinary =require ('cloudinary');
const {} = require('dotenv/config');
const { CLOUD_NAME,API_KEY,API_SECRET } = require('../../config');

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret:API_SECRET,
});

module.exports.uploadToCloudinary = async (stream, folder, imagePublicId) => {
  const options = imagePublicId ? { public_id: imagePublicId, overwrite: true } : { public_id: `${folder}/${v4()}` };
  return new Promise((resolve, reject) => {
    const streamLoad = cloudinary.v2.uploader.upload_stream(options, (error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });

    stream.pipe(streamLoad);
  });
};
module.exports.deleteFromCloudinary = async (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.destroy(publicId, (error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};
