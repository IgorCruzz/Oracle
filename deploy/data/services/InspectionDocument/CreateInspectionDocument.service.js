"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _repositories = require('../../database/repositories');

 class CreateInspectionDocumentService {
  async execute(req) {
    const repository = new (0, _repositories.InspectionDocumentRepository)();
    const inspectionRepository = new (0, _repositories.InspectionRepository)();

    const inspectionExists = await inspectionRepository.findInspectionById({
      id_inspection: req.body.id_inspection, 
      populate: false
    });
    if (!inspectionExists) {
      return {
        error: `Não há nenhuma vistoria registrada com este ID -> ${req.body.id_inspection}.`,
      };
    }
    const inspection_document = await repository.createInspectionDocument(req);

    if (inspection_document.error) {
      return { error: inspection_document.error };
    }

    return {
      message: 'Documento adicionada com sucesso!',
      inspection_document,
    };
  }
} exports.CreateInspectionDocumentService = CreateInspectionDocumentService;
