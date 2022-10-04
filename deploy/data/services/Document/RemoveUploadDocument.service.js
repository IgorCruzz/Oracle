"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var _path = require('path');
var _repositories = require('../../database/repositories');

 class RemoveUploadDocumentService {
  async execute(id_document) {
    const repository = new (0, _repositories.DocumentRepository)();

    const findDocument = await repository.findDocumentById({
      id_document,
    });

    if (!findDocument) {
      return {
        error: `Não há um Documento com este ID -> ${id_document}`,
      };
    }

    const { nm_file } = findDocument;

    if (!nm_file) {
      return {
        error: 'Não há arquivo para ser removido!’',
      };
    }

    _fs2.default.unlinkSync(
      _path.resolve.call(void 0, __dirname, '..', '..', '..', '..', 'tmp', 'documents', nm_file),
      () => {}
    );

    await repository.updateDocument(id_document, {
      dt_upload: null,
      nm_file: null,
      nm_original_file: null,
    });

    return {
      message: 'Arquivo removido com sucesso!',
    };
  }
} exports.RemoveUploadDocumentService = RemoveUploadDocumentService;
