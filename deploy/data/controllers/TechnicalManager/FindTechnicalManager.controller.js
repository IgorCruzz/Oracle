"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindTechnicalManagerController {
  async handle(req, res) {
    try {
      const { id_technical_manager } = req.params;

      const service = new (0, _services.FindTechnicalManagerService)();

      const response = await service.execute({ id_technical_manager });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        technicalManager: response.technicalManager,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindTechnicalManagerController = FindTechnicalManagerController;
