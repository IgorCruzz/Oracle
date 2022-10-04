"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class DeleteTimelapseController {
  async handle(req, res) {
    try {
      const service = new (0, _services.DeleteTimelapseService)();
      const { id_timelapse_coordinates } = req.params;

      const response = await service.execute({ id_timelapse_coordinates });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.DeleteTimelapseController = DeleteTimelapseController;
