import 'dotenv/config';
import multer from 'multer';
import multerS3 from 'multer-s3';
import crypto from 'crypto';
import { extname } from 'path';
import { s3 } from './s3';

export const storage = multer({
  storage: multerS3({
    s3,
    bucket: `${process.env.BUCKET}/product_history`,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(request, file, cb) {
      cb(
        null,
        `${crypto.randomBytes(10).toString('Hex')}${extname(file.originalname)}`
      );
    },
  }),
});
