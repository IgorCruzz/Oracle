import { Router } from 'express';
import multer from 'multer';
import { resolve } from 'path';

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
import { roleAuthenticator } from '../../data/authenticator/role.authenticator';
import { storage } from '../../config/multer';
import { Document } from '../../data/database/models';

const profiles = [0, 1, 2];

const path = require('path');
const fs = require('fs').promises;
const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);

const upload = multer({ storage });

const routes = Router();

routes.get('/visualizer/:filename', async (req, res) => {
  const { filename } = req.params;
  let replaceName;

  if (filename.includes('.docx')) {
    replaceName = filename.split('.docx')[0];

    const inputPath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'tmp',
      'documents',
      filename
    );
    const outputPath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'tmp',
      'documents',
      `${replaceName}.pdf`
    );

    const docxBuf = await fs.readFile(inputPath);

    const pdfBuf = await libre.convertAsync(docxBuf, '.pdf', undefined);

    await fs.writeFile(outputPath, pdfBuf);

    return res
      .status(200)
      .sendFile(
        path.join(
          __dirname,
          '..',
          '..',
          '..',
          'tmp',
          'documents',
          `${replaceName}.pdf`
        )
      );
  }

  if (filename.includes('.pdf')) {
    return res
      .status(200)
      .sendFile(
        path.join(
          __dirname,
          '..',
          '..',
          '..',
          'tmp',
          'documents',
          `${filename}`
        )
      );
  }
});

routes.get('/documents/download/:filename', async (req, res) => {
  const { filename } = req.params;
  const file = resolve(
    __dirname,
    '..',
    '..',
    '..',
    'tmp',
    'documents',
    filename
  );

  const getFilename = await Document.findOne({
    where: { nm_file: filename },
  });

  const { nm_original_file } = getFilename;

  return res.download(file, nm_original_file);
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
  upload.single('file'),
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
