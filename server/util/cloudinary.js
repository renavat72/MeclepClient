const uuid =require ('uuid');
const cloudinary =require ('cloudinary');
const {} = require('dotenv/config');


cloudinary.config({
  cloud_name: "dpwdmmyl8",
  api_key: "159261177612768",
  api_secret:"lZX7LB_Z3zRJGPF8OZ0Ec0876qE",
});

const uploadToCloudinary = async (stream, folder, imagePublicId) => {
  const options = imagePublicId ? { public_id: imagePublicId, overwrite: true } : { public_id: `${folder}/${uuid()}` };

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

const deleteFromCloudinary = async (publicId) => {
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
module.exports={
  uploadToCloudinary,
  deleteFromCloudinary,
}