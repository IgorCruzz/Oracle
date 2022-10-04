"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindCoordinatesService {
  async execute({ id_project_phase }) {
    const repository = new (0, _repositories.TimelapseRepository)();

    const getCoordinates = await repository.findTimelapseByProjectPhaseId({
      id_project_phase,
    });

    const coordinates = getCoordinates.map(
      ({
        id_timelapse_coordinates,
        nu_latitude,
        nu_longitude,
        ds_coordinates,
      }) => ({
        id_timelapse_coordinates,
        nu_latitude,
        nu_longitude,
        ds_coordinates,
      })
    );

    return {
      projectPhases: coordinates,
    };
  }
} exports.FindCoordinatesService = FindCoordinatesService;
