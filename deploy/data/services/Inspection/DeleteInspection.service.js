"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class DeleteInspectionService {
  async execute({ id_inspection }) {
    const repository = new (0, _repositories.InspectionRepository)();

    const verifyInspectionExists = await repository.findInspectionById({
      id_inspection,
    });

    if (!verifyInspectionExists)
      return {
        error: `Não há nenhuma vistoria registrada com este ID -> ${id_inspection}.`,
      };

    await repository.deleteInspection({
      id_inspection,
    });

    return {
      message: 'Vistoria excluída com sucesso!',
    };
  }
} exports.DeleteInspectionService = DeleteInspectionService;
