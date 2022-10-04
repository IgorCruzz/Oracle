"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class UpdateTimelapseService {
  async execute(id_timelapse_coordinates, data) {
    const timelapseRepository = new (0, _repositories.TimelapseRepository)();

    const timelapseExists = await timelapseRepository.findTimelapseById({
      id_timelapse_coordinates,
      populate: false,
    });

    if (!timelapseExists) {
      return {
        error: `Não há nenhuma coordenadas registrada com este ID -> ${id_timelapse_coordinates}.`,
      };
    }

    const timelapse = await timelapseRepository.updateTimelapse(
      id_timelapse_coordinates,
      data
    );

    if (timelapse.error) {
      return { error: timelapse.error };
    }

    return {
      message: 'Coordenada atualizada com sucesso!',
      timelapse,
    };
  }
} exports.UpdateTimelapseService = UpdateTimelapseService;
