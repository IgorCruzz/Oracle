"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindProjectPhasesService {
  async execute({ page, limit, id_project }) {
    const repository = new (0, _repositories.ProjectPhaseRepository)();

    const findProjectPhases = await repository.findProjectPhases({
      limit,
      page,
      id_project,
    });

    if (findProjectPhases.length === 0)
      return { error: 'Não há nenhuma Fase de projeto registrada.' };

    return {
      projectPhases: findProjectPhases,
    };
  }
} exports.FindProjectPhasesService = FindProjectPhasesService;
