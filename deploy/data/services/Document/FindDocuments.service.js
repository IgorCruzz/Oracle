"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindDocumentsService {
  async execute({ page, limit, id_product }) {
    const repository = new (0, _repositories.DocumentRepository)();

    const findDocuments = await repository.findDocuments({
      limit,
      page,
      id_product,
    });

    if (findDocuments.length === 0) {
      return { error: 'Não há Documentos registrados.' };
    }

    return {
      documents: findDocuments,
    };
  }
} exports.FindDocumentsService = FindDocumentsService;
