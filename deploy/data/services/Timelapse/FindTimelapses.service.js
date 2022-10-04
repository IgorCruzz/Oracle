"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindTimelapsesService {
  async execute({ page, limit, id_project_phase }) {
    const repository = new (0, _repositories.TimelapseRepository)();

    const findTimelapses = await repository.findTimelapses({
      page,
      limit,
      id_project_phase,
    });

    if (findTimelapses.length === 0)
      return { error: 'Não há nenhum timelapse registrado.' };

    return {
      timelapses: findTimelapses,
    };
  }
} exports.FindTimelapsesService = FindTimelapsesService;
