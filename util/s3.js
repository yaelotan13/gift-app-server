const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

AWS.config.update({
    accessKeyId: "AKIAJHM37JTGAZHQNJGQ",
    secretAccessKey: "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"
});

const s3 = new AWS.S3();

const getParams = (filePath) => {
   return {
    Bucket: 'gift-app-images',
    Body: fs.createReadStream(filePath),
    Key: "folder/"+ Date.now()+ "_" + path.basename(filePath)
   } 
}

export const upload = (filePath) => {
    const params = getParams(filePath);

    s3.upload(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    }
  
    if (data) {
      console.log("Uploaded in:", data.Location);
      return data;
    }
})};