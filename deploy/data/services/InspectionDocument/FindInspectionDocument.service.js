"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindInspectionDocumentService {
  async execute({ id_inspection_document }) {
    const repository = new (0, _repositories.InspectionDocumentRepository)();

    const findInspection = await repository.findInspectionDocumentById({
      id_inspection_document,
      populate: true,
    });

    if (!findInspectionDocument)
      return {
        error: `Não há nenhuma documento registrado com este ID -> ${id_inspection_document}.`,
      };

    return {
      inspection_document: findInspectionDocument,
    };
  }
} exports.FindInspectionDocumentService = FindInspectionDocumentService;
