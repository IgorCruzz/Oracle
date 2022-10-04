"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class CreateDeliveryController {
  async handle(req, res) {
    try {
      const service = new (0, _services.CreateDeliveryService)();

      const response = await service.execute({ ...req.body, ...req.file });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        result: response.result,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.CreateDeliveryController = CreateDeliveryController;
