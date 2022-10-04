"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindInspectionsService {
  async execute({
    page,
    limit,
    id,
    id_project,
    id_project_phase,
    id_professional,
  }) {
    const repository = new (0, _repositories.InspectionRepository)();

    const findInspections = await repository.findInspections({
      page,
      limit,
      id,
      id_project,
      id_project_phase,
      id_professional,
    });

    if (findInspections.length === 0)
      return { error: 'Não há nenhuma vistoria registrada.' };

    return {
      inspections: findInspections,
    };
  }
} exports.FindInspectionsService = FindInspectionsService;
