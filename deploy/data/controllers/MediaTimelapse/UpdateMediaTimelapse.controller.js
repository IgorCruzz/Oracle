"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class UpdateMediaTimelapseController {
  async handle(req, res) {
    try {
      const service = new (0, _services.UpdateMediaTimelapseService)();
      const { id_media_timelapse } = req.params;

      const response = await service.execute(id_media_timelapse, req);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        media_timelapse: response.media_timelapse,
        message: response.message,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.UpdateMediaTimelapseController = UpdateMediaTimelapseController;
