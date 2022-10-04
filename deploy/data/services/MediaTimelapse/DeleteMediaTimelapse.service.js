"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class DeleteMediaTimelapseService {
  async execute({ id_media_timelapse }) {
    const repository = new (0, _repositories.MediaTimelapseRepository)();

    const verifyMediaTimelapseExists = await repository.findMediaTimelapseById({
      id_media_timelapse,
    });

    if (!verifyMediaTimelapseExists)
      return {
        error: `Não há nenhuma coordenadas registrado com este ID -> ${id_media_timelapse}.`,
      };

    await repository.deleteMediaTimelapse({
      id_media_timelapse,
    });

    return {
      message: 'Media excluída com sucesso!',
    };
  }
} exports.DeleteMediaTimelapseService = DeleteMediaTimelapseService;
