"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _repositories = require('../../database/repositories');

 class DeleteInspectionDocumentService {
  async execute({ id_inspection_document }) {
    const repository = new (0, _repositories.InspectionDocumentRepository)();

    const verifyInspectionDocumentExists = await repository.findInspectionDocumentById({
      id_inspection_document,
    });

    if (!verifyInspectionDocumentExists)
      return {
        error: `Não há nenhum documento registrado com este ID -> ${id_inspection_document}.`,
      };


    await repository.deleteInspectionDocument({
      id_inspection_document,
    });

    return {
      message: 'Documento excluído com sucesso!',
    };
  }
} exports.DeleteInspectionDocumentService = DeleteInspectionDocumentService;
