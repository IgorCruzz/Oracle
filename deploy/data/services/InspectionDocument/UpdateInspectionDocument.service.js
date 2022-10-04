"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class UpdateInspectionDocumentService {
  async execute(id_inspection_document, req) {

    const repository = new (0, _repositories.InspectionDocumentRepository)();
    const InspectionDocumentUpdated = await repository.updateInspectionDocument(id_inspection_document, req);

    if (InspectionDocumentUpdated.error) {
      return { error: InspectionDocumentUpdated.error };
    }
    return {
      message: 'Documento de vistoria salvo com sucesso!',
      inspection_document: InspectionDocumentUpdated,
    };
  }
} exports.UpdateInspectionDocumentService = UpdateInspectionDocumentService;
