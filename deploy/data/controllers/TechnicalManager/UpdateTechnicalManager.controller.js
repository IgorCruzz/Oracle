"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class UpdateTechnicalManagerController {
  async handle(req, res) {
    try {
      const service = new (0, _services.UpdateTechnicalManagerService)();

      const { id_technical_manager } = req.params;

      const response = await service.execute(id_technical_manager, req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        technicalManager: response.technicalManager,
        message: response.message,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.UpdateTechnicalManagerController = UpdateTechnicalManagerController;
