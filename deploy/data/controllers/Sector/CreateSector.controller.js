"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class CreateSectorController {
  async handle(req, res) {
    try {
      const service = new (0, _services.CreateSectorService)();
      const { nm_sector } = req.body;

      const response = await service.execute({ nm_sector });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        sector: response.sector,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.CreateSectorController = CreateSectorController;
