import { diskStorage } from 'multer';
import { resolve, extname } from 'path';
import crypto from 'crypto';

export const folder = resolve(
  __dirname,
  '..',
  '..',
  'tmp',
  'inspection_documents'
);

export const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${crypto.randomBytes(10).toString('Hex')}${extname(file.originalname)}`
    );
  },
});
