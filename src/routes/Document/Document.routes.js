import { Router } from 'express';
import aws from 'aws-sdk';
import {
  FindDocumentController,
  FindDocumentsController,
  CreateDocumentController,
  DeleteDocumentController,
  UpdateDocumentController,
  UploadDocumentController,
  RemoveUploadDocumentController,
} from '../../data/controllers';
import {
  findDocumentValidator,
  findDocumentsValidator,
  createDocumentValidator,
  deleteDocumentValidator,
  updateDocumentValidator,
  uploadDocumentValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';
// import { roleAuthenticator } from '../../data/authenticator/role.authenticator';
import { storage } from '../../config/multer';

const path = require('path');
const fs = require('fs').promises;
const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);

// const upload = multer({ storage });

const routes = Router();

const spacesEndpoint = new aws.Endpoint('sfo3.digitaloceanspaces.com');

aws.config.update({
  accessKeyId: 'DO0098U9A8D6HJZNNT6R',
  secretAccessKey: '83GJZKHnCH57T3obii3FW6qFcGTKS2a3FgumIM7GcZs',
});

const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});

routes.get('/visualizer/:filename', async (req, res) => {
  const { filename } = req.params;

  // const replaceName = filename.split('.xlsx')[0];

  s3.getObject(
    {
      Bucket: 'gerobras-development',
      Key: `documents/${filename}`,
    },
    async (err, data) => {
      if (err) return console.log(err);

      const pdfBuf = await libre.convertAsync(data.Body, '.pdf', undefined);

      const test = Buffer.from(pdfBuf).toString('base64');

      return res.status(200).json({ pdfBuf: test });
    }
  );
});

routes.get('/documents/download/:nm_file', async (req, res) => {
  const { nm_file } = req.params;

  s3.getObject(
    {
      Bucket: 'gerobras-development',
      Key: `documents/${nm_file}`,
    },
    (err, data) => {
      if (err) return console.log(err);

      res.end(data.Body);
    }
  );
});

routes.delete(
  '/documents/upload/:id_document',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  new RemoveUploadDocumentController().handle
);

routes.post(
  '/documents/upload',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  storage.single('file'),
  uploadDocumentValidator,
  new UploadDocumentController().handle
);

routes.post(
  '/documents',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  createDocumentValidator,
  new CreateDocumentController().handle
);

routes.delete(
  '/documents/:id_document',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  deleteDocumentValidator,
  new DeleteDocumentController().handle
);

routes.patch(
  '/documents/:id_document',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  updateDocumentValidator,
  new UpdateDocumentController().handle
);

routes.get(
  '/documents',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  findDocumentsValidator,
  new FindDocumentsController().handle
);

routes.get(
  '/document/:id_document',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  findDocumentValidator,
  new FindDocumentController().handle
);

export default routes;
