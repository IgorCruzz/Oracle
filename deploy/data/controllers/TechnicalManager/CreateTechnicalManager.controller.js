"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class CreateTechnicalManagerController {
  async handle(req, res) {
    try {
      const service = new (0, _services.CreateTechnicalManagerService)();

      const response = await service.execute(req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        technicalManager: response.technicalManager,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.CreateTechnicalManagerController = CreateTechnicalManagerController;
