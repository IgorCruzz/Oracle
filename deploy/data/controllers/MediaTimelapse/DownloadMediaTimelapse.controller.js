"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class DownloadMediaTimelapseController {
  async handle(req, res) {
    try {
      const nm_file = req.params.nm_file;
      const service = new (0, _services.DownloadMediaTimelapseService)();

      const response = await service.execute({ nm_file, req, res });

      return response;
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.DownloadMediaTimelapseController = DownloadMediaTimelapseController;
