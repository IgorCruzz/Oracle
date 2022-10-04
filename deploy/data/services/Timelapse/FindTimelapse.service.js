"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindTimelapseService {
  async execute({ id_timelapse_coordinates }) {
    const repository = new (0, _repositories.TimelapseRepository)();

    const findTimelapse = await repository.findTimelapseById({
      id_timelapse_coordinates,
      populate: true,
    });

    if (!findTimelapse)
      return {
        error: `Não há nenhuma coordenada registrada com este ID -> ${id_timelapse_coordinates}.`,
      };

    return {
      timelapse: findTimelapse,
    };
  }
} exports.FindTimelapseService = FindTimelapseService;
