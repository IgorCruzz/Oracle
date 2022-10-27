// import aws from 'aws-sdk';
// import multer from 'multer';
// import multerS3 from 'multer-s3';
// import crypto from 'crypto';
// import { extname } from 'path';

// const spacesEndpoint = new aws.Endpoint('sfo3.digitaloceanspaces.com');

// aws.config.update({
//   accessKeyId: 'DO0098U9A8D6HJZNNT6R',
//   secretAccessKey: '83GJZKHnCH57T3obii3FW6qFcGTKS2a3FgumIM7GcZs',
// });

// const s3 = new aws.S3({
//   endpoint: spacesEndpoint,
// });

// export const storage = multer({
//   storage: multerS3({
//     s3,
//     bucket: 'gerobras-development/media_timelapses',
//     acl: 'public-read',
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     key(request, file, cb) {
//       cb(
//         null,
//         `${crypto.randomBytes(10).toString('Hex')}${extname(file.originalname)}`
//       );
//     },
//   }),
// });
