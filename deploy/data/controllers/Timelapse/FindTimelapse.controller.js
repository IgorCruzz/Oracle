"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindTimelapseController {
  async handle(req, res) {
    try {
      const { id_timelapse } = req.params;

      const service = new (0, _services.FindTimelapseService)();

      const response = await service.execute({ id_timelapse });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        timelapse: response.timelapse,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindTimelapseController = FindTimelapseController;
