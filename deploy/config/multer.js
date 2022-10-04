"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer');
var _path = require('path');
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var _crypto = require('crypto'); var _crypto2 = _interopRequireDefault(_crypto);

var _repositories = require('../data/database/repositories');

 const storage = _multer.diskStorage.call(void 0, {
  destination: (req, file, cb) => {
    cb(null, _path.resolve.call(void 0, __dirname, '..', '..', 'tmp', 'documents'));
  },
  filename: async (req, file, cb) => {
    if (req.body.id_document) {
      const documentRepository = new (0, _repositories.DocumentRepository)();

      const findDocument = await documentRepository.findDocumentById({
        id_document: req.body.id_document,
      });

      if (findDocument) {
        const { nm_file } = findDocument;

        if (nm_file) {
          _fs2.default.unlinkSync(
            _path.resolve.call(void 0, __dirname, '..', '..', 'tmp', 'documents', nm_file),
            () => {}
          );
        }
      }

      cb(
        null,
        `${_crypto2.default.randomBytes(10).toString('Hex')}${_path.extname.call(void 0, file.originalname)}`
      );
      return;
    }
    cb(
      null,
      `${_crypto2.default.randomBytes(10).toString('Hex')}${_path.extname.call(void 0, file.originalname)}`
    );
  },
}); exports.storage = storage;
