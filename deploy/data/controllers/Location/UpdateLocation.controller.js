"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class UpdateLocationController {
  async handle(req, res) {
    try {
      const service = new (0, _services.UpdateLocationService)();

      const { id_location } = req.params;

      const response = await service.execute(id_location, req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        location: response.location,
        message: response.message,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.UpdateLocationController = UpdateLocationController;
