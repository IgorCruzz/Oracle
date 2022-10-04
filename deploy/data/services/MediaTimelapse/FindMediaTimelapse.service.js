"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindMediaTimelapseService {
  async execute({ id_media_timelapse }) {
    const repository = new (0, _repositories.MediaTimelapseRepository)();

    const findMediaTimelapse = await repository.findMediaTimelapseById({
      id_media_timelapse,
      populate: true,
    });

    if (!findMediaTimelapse)
      return {
        error: `Não há nenhuma media registrada com este ID -> ${id_media_timelapse}.`,
      };

    return {
      media_lapse: findMediaTimelapse,
    };
  }
} exports.FindMediaTimelapseService = FindMediaTimelapseService;
