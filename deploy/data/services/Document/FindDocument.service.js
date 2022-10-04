"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindDocumentService {
  async execute({ id_document }) {
    const repository = new (0, _repositories.DocumentRepository)();

    const findDocument = await repository.findDocumentById({
      id_document,
      populate: true,
    });

    if (
      !findDocument ||
      (findDocument &&
        !findDocument.dataValues.product.dataValues.project_phase)
    )
      return {
        error: `Não existe um Documento com este ID -> ${id_document}.`,
      };

    return {
      document: findDocument,
    };
  }
} exports.FindDocumentService = FindDocumentService;
