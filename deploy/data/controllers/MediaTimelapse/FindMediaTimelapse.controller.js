"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindMediaTimelapseController {
  async handle(req, res) {
    try {
      const { id_media_timelapse } = req.params;

      const service = new (0, _services.FindMediaTimelapseService)();

      const response = await service.execute({ id_media_timelapse });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        media_timelapse: response.media_timelapse,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindMediaTimelapseController = FindMediaTimelapseController;
