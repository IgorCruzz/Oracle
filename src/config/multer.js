import { diskStorage } from 'multer';
import { resolve, extname } from 'path';
import fs from 'fs';
import crypto from 'crypto';

import { DocumentRepository } from '../data/database/repositories';

export const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, resolve(__dirname, '..', '..', 'tmp', 'documents'));
  },
  filename: async (req, file, cb) => {
    if (req.body.id_document) {
      const documentRepository = new DocumentRepository();

      const findDocument = await documentRepository.findDocumentById({
        id_document: req.body.id_document,
      });

      if (findDocument) {
        const { nm_file } = findDocument;

        if (nm_file) {
          fs.unlinkSync(
            resolve(__dirname, '..', '..', 'tmp', 'documents', nm_file),
            () => {}
          );
        }
      }

      cb(
        null,
        `${crypto.randomBytes(10).toString('Hex')}${extname(file.originalname)}`
      );
      return;
    }
    cb(
      null,
      `${crypto.randomBytes(10).toString('Hex')}${extname(file.originalname)}`
    );
  },
});
