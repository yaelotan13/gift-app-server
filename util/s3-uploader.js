const multer  = require('multer');
const multers3 = require('multer-s3');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: null,
    secretAccessKey: null
});

const uploadS3 = multer({
    storage: multers3({
      s3: s3,
      acl: 'public-read',
      bucket: 'gift-app-images',
      metadata: (req, file, cb) => {
        cb(null, {fieldName: file.fieldname})
      },
      key: (req, file, cb) => {
        cb(null, Date.now().toString() + '-' + file.originalname)
      }
    })
});

module.exports = {
    uploadS3
};
