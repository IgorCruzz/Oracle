"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class GetMediaByCoordinatesService {
  async execute({ id_timelapse_coordinates }) {
    const repository = new (0, _repositories.MediaTimelapseRepository)();

    const medias = await repository.findMediaByTimelapseCoordinatesId({
      id_timelapse_coordinates,
    });

    return {
      projectPhases: medias,
    };
  }
} exports.GetMediaByCoordinatesService = GetMediaByCoordinatesService;
