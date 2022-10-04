"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class CreateRegionController {
  async handle(req, res) {
    try {
      const service = new (0, _services.CreateRegionService)();
      const { name } = req.body;

      const response = await service.execute({ name });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        region: response.region,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.CreateRegionController = CreateRegionController;
