"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindProjectPhasesWithTimelapseService {
  async execute({ id_project }) {
    const repository = new (0, _repositories.TimelapseRepository)();

    const getTimelapses = await repository.findTimelapseByProjectId({
      id_project,
    });

    const getCoordinates = getTimelapses.map(item => {
      return {
        id_project_phase:
          item.dataValues.project_phase.dataValues.id_project_phase,
        nm_project_phase:
          item.dataValues.project_phase.dataValues.nm_project_phase,
      };
    });

    const uniqueAddresses = Array.from(
      new Set(getCoordinates.map(a => a.nm_project_phase))
    ).map(id => {
      return getCoordinates.find(a => a.nm_project_phase === id);
    });

    return {
      projectPhases: uniqueAddresses,
    };
  }
} exports.FindProjectPhasesWithTimelapseService = FindProjectPhasesWithTimelapseService;
