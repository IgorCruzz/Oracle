"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _path = require('path');









var _controllers = require('../../data/controllers');







var _validators = require('../../data/validators');
var _jwtauthenticator = require('../../data/authenticator/jwt.authenticator'); var _jwtauthenticator2 = _interopRequireDefault(_jwtauthenticator);
var _roleauthenticator = require('../../data/authenticator/role.authenticator');
var _multer3 = require('../../config/multer');
var _models = require('../../data/database/models');

const profiles = [0, 1, 2];

const path = require('path');
const fs = require('fs').promises;
const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);

const upload = _multer2.default.call(void 0, { storage: _multer3.storage });

const routes = _express.Router.call(void 0, );

routes.get('/visualizer/:filename', async (req, res) => {
  const { filename } = req.params;
  let replaceName;

  if (filename.includes('.pptx')) {
    replaceName = filename.split('.pptx')[0];

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

  if (filename.includes('.xlsx')) {
    replaceName = filename.split('.xlsx')[0];

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

  return res
    .status(200)
    .sendFile(
      path.join(__dirname, '..', '..', '..', 'tmp', 'documents', `${filename}`)
    );
});

routes.get('/documents/download/:filename', async (req, res) => {
  const { filename } = req.params;
  const file = _path.resolve.call(void 0, 
    __dirname,
    '..',
    '..',
    '..',
    'tmp',
    'documents',
    filename
  );

  const getFilename = await _models.Document.findOne({
    where: { nm_file: filename },
  });

  const { nm_original_file } = getFilename;

  return res.download(file, nm_original_file);
});

routes.delete(
  '/documents/upload/:id_document',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  new (0, _controllers.RemoveUploadDocumentController)().handle
);

routes.post(
  '/documents/upload',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  upload.single('file'),
  _validators.uploadDocumentValidator,
  new (0, _controllers.UploadDocumentController)().handle
);

routes.post(
  '/documents',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.createDocumentValidator,
  new (0, _controllers.CreateDocumentController)().handle
);

routes.delete(
  '/documents/:id_document',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.deleteDocumentValidator,
  new (0, _controllers.DeleteDocumentController)().handle
);

routes.patch(
  '/documents/:id_document',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.updateDocumentValidator,
  new (0, _controllers.UpdateDocumentController)().handle
);

routes.get(
  '/documents',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.findDocumentsValidator,
  new (0, _controllers.FindDocumentsController)().handle
);

routes.get(
  '/document/:id_document',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.findDocumentValidator,
  new (0, _controllers.FindDocumentController)().handle
);

exports. default = routes;
