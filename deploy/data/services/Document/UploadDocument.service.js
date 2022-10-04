"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }require('dotenv/config');
var _utf8 = require('utf8'); var _utf82 = _interopRequireDefault(_utf8);
var _repositories = require('../../database/repositories');

 class UploadDocumentService {
  async execute(id_document, { filename, size, originalname }) {
    const repository = new (0, _repositories.DocumentRepository)();

    const findDocument = await repository.findDocumentById({
      id_document,
    });

    if (size > 200000000) {
      return {
        error: `O limíte máximo para upload é 200MB.`,
      };
    }

    if (!findDocument) {
      return {
        error: `Não há um Documento com este ID -> ${id_document}.`,
      };
    }

    await repository.updateDocument(id_document, {
      dt_upload: new Date(Date.now()).toISOString(),
      nm_file: filename,
      nm_original_file: _utf82.default.decode(originalname),
    });

    return {
      message: 'Upload realizado com sucesso!',
      document: `${process.env.HOST}/documents/${filename}`,
    };
  }
} exports.UploadDocumentService = UploadDocumentService;
