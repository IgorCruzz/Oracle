"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class UpdateMediaTimelapseService {
  async execute(id_media_timelapse, req) {
    const repository = new (0, _repositories.MediaTimelapseRepository)();
    const MediaTimelapseUpdated = await repository.updateMediaTimelapse(
      id_media_timelapse,
      req
    );

    if (MediaTimelapseUpdated.error) {
      return { error: MediaTimelapseUpdated.error };
    }
    return {
      message: 'Media salvo com sucesso!',
      media_timelapse: MediaTimelapseUpdated,
    };
  }
} exports.UpdateMediaTimelapseService = UpdateMediaTimelapseService;
