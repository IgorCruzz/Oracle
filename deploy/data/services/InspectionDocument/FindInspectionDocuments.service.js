"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindInspectionDocumentsService {
  async execute({
    page,
    limit,
    id,
    nm_original_file,
    dt_media,
    id_timelapse_coordinates
  }) {
    const repository = new (0, _repositories.InspectionDocumentRepository)();

    const findInspectionDocuments = await repository.findInspectionDocuments({
      page,
      limit,
      id,
      nm_original_file,
      dt_media,
      id_timelapse_coordinates
    });

    if (findInspectionDocuments.length === 0)
      return { error: 'Não há nenhum documento registrado.' };

    return {
      inspection_documents: findInspectionDocuments,
    };
  }
} exports.FindInspectionDocumentsService = FindInspectionDocumentsService;
