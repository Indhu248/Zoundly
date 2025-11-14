// AWS S3 Configuration (Optional)
// This file is only needed if you want to upload files to AWS S3
// For now, we're using image URLs stored directly in MongoDB

// If you want to use AWS S3 for file uploads, uncomment the code below
// and make sure to install: npm install aws-sdk multer multer-s3

/*
import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const uploadToS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    acl: 'public-read',
    key: function (req, file, cb) {
      const fileName = `products/${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
});

export const deleteFromS3 = async (key) => {
  try {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    };

    await s3.deleteObject(params).promise();
    return true;
  } catch (error) {
    console.error('Error deleting from S3: ', error);
    return false;
  }
};

export const getS3Url = (key) => {
  return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};

export default s3;
*/

// For now, we're storing image URLs directly in MongoDB
// You can host images on:
// - Your frontend public folder
// - Cloudinary (free tier available)
// - ImgBB or similar free image hosting
// - Or any CDN

export const uploadToS3 = null;
export const deleteFromS3 = null;
export const getS3Url = null;

