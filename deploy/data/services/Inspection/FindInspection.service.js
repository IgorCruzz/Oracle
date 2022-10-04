"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindInspectionService {
  async execute({ id_inspection }) {
    const repository = new (0, _repositories.InspectionRepository)();

    const findInspection = await repository.findInspectionById({
      id_inspection,
      populate: true,
    });

    if (!findInspection)
      return {
        error: `Não há nenhuma vistoria registrada com este ID -> ${id_inspection}.`,
      };

    return {
      inspection: findInspection,
    };
  }
} exports.FindInspectionService = FindInspectionService;
