"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class DeleteDocumentService {
  async execute({ id_document }) {
    const repository = new (0, _repositories.DocumentRepository)();

    const verifyDocumentExists = await repository.findDocumentById({
      id_document,
    });

    if (
      !verifyDocumentExists ||
      (verifyDocumentExists &&
        !verifyDocumentExists.dataValues.product.dataValues.project_phase)
    )
      return {
        error: `Não existe um Documento com este ID -> ${id_document}.`,
      };

    await repository.deleteDocument({
      id_document,
    });

    return {
      message: 'Documento excluído com sucesso!',
    };
  }
} exports.DeleteDocumentService = DeleteDocumentService;
