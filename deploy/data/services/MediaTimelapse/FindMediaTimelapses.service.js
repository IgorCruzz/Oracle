"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindMediaTimelapsesService {
  async execute({
    page,
    limit,
    id,
    nm_original_file,
    dt_media,
    id_timelapse_coordinates,
  }) {
    const repository = new (0, _repositories.MediaTimelapseRepository)();

    const findMediaTimelapses = await repository.findMediaTimelapses({
      page,
      limit,
      id,
      nm_original_file,
      dt_media,
      id_timelapse_coordinates,
    });

    if (findMediaTimelapses.length === 0)
      return { error: 'Não há nenhuma media registrada.' };

    return {
      media_timelapses: findMediaTimelapses,
    };
  }
} exports.FindMediaTimelapsesService = FindMediaTimelapsesService;
