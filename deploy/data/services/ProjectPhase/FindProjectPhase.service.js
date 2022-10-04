"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindProjectPhaseService {
  async execute({ id_project_phase }) {
    const repository = new (0, _repositories.ProjectPhaseRepository)();

    const findProjectPhase = await repository.findProjectPhaseById({
      id_project_phase,
      populate: true,
    });

    if (!findProjectPhase)
      return {
        error: `Não há nenhuma Fase de projeto registrada com este ID -> ${id_project_phase}.`,
      };

    return {
      projectPhase: findProjectPhase,
    };
  }
} exports.FindProjectPhaseService = FindProjectPhaseService;
