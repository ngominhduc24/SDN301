// const path = require('path');
// const fs = require('fs');
// const aws = require('aws-sdk');
// require('dotenv').config();

// aws.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     endpoint: process.env.AWS_S3_ENDPOINT
// });

// const s3 = new aws.S3();

// const uploadToS3 = (file, next) => {
//     const fileStream = fs.createReadStream(file);
//     const params = {
//         Bucket: process.env.AWS_BUCKET_NAME,
//         Body: fileStream,
//         Key: path.basename(file)
//     };
//     s3.upload(params, (error, data) => {
//         if (error) {
//             console.error('Error uploading to S3:', error);
//         } else {
//             console.log('File uploaded successfully:', data);
//         }
//         next(error, data);
//     });
// };

// module.exports = {
//     uploadToS3
// };
