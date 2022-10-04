"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _repositories = require('../../database/repositories');

 class CreateMediaTimelapseService {
  async execute(req) {
    const repository = new (0, _repositories.MediaTimelapseRepository)();
    const timelapseRepository = new (0, _repositories.TimelapseRepository)();

    const timelapseCoordinatesExists = await timelapseRepository.findTimelapseById(
      {
        id_timelapse_coordinates: req.body.id,
        populate: false,
      }
    );
    if (!timelapseCoordinatesExists) {
      return {
        error: `Não há nenhuma coordenada registrada com este ID -> ${id_timelapse_coordinates}.`,
      };
    }
    const media_timelapse = await repository.createMediaTimelapse(req);

    if (media_timelapse.error) {
      return { error: media_timelapse.error };
    }

    return {
      message: 'Media adicionada com sucesso!',
      media_timelapse,
    };
  }
} exports.CreateMediaTimelapseService = CreateMediaTimelapseService;
