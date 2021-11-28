import AWS from 'aws-sdk'
const NAME_OF_BUCKET = "somecoinpleasebucket";

const multer =  require('multer')

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });


export const singlePublicFileUpload = async (file:any) => {
  const { originalname, mimetype, buffer } = await file;
  const path = require("path");
  const Key = new Date().getTime().toString() + path.extname(originalname);
  const uploadParams = {
    Bucket: NAME_OF_BUCKET,
    Key,
    Body: buffer,
    ACL: "public-read",
  };
  const result = await s3.upload(uploadParams).promise();

  return result.Location;
};

export const multiplePublicFileUpload = async (files:any) => {
  return await Promise.all(
    files.map((file:any) => {
      return singlePublicFileUpload(file);
    })
  );
};


export const singlePrivateFileUpload = async (file:any) => {
  const { originalname, mimetype, buffer } = await file;
  const path = require("path");
  const Key = new Date().getTime().toString() + path.extname(originalname);
  const uploadParams = {
    Bucket: NAME_OF_BUCKET,
    Key,
    Body: buffer,
  };
  const result = await s3.upload(uploadParams).promise();

  return result.Key;
};

export const multiplePrivateFileUpload = async (files:any) => {
  return await Promise.all(
    files.map((file:any) => {
      return singlePrivateFileUpload(file);
    })
  );
};

export const retrievePrivateFile = (key:any) => {
  let fileUrl;
  if (key) {
    fileUrl = s3.getSignedUrl("getObject", {
      Bucket: NAME_OF_BUCKET,
      Key: key,
    });
  }
  return fileUrl || key;
};


export const storage = multer.memoryStorage({
  destination: function (req:any, file:any, callback:any) {
    callback(null, "");
  },
});

export const singleMulterUpload = (nameOfKey:any) =>
  multer({ storage: storage }).single(nameOfKey);
export const multipleMulterUpload = (nameOfKey:any) =>
  multer({ storage: storage }).array(nameOfKey);

  

