import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import crypto from 'crypto';
import { extname } from 'path';
import { DocumentRepository } from '../data/database/repositories';

const spacesEndpoint = new aws.Endpoint('sfo3.digitaloceanspaces.com');

aws.config.update({
  accessKeyId: 'DO0098U9A8D6HJZNNT6R',
  secretAccessKey: '83GJZKHnCH57T3obii3FW6qFcGTKS2a3FgumIM7GcZs',
});

const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});

export const storage = multer({
  storage: multerS3({
    s3,
    bucket: 'gerobras-development/documents',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: async (req, file, cb) => {
      if (req.body.id_document) {
        const documentRepository = new DocumentRepository();

        const findDocument = await documentRepository.findDocumentById({
          id_document: req.body.id_document,
        });

        if (findDocument) {
          const { nm_file } = findDocument;

          if (nm_file) {
            s3.deleteObject(
              {
                Bucket: 'gerobras-development',
                Key: `documents/${nm_file}`,
              },
              (err, data) => {
                if (err) return console.log(err);

                console.log(data);
              }
            );
          }
        }

        cb(
          null,
          `${crypto.randomBytes(10).toString('Hex')}${extname(
            file.originalname
          )}`
        );
        return;
      }
      cb(
        null,
        `${crypto.randomBytes(10).toString('Hex')}${extname(file.originalname)}`
      );
    },
  }),
});
