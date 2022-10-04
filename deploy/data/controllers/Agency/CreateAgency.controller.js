"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class CreateAgencyController {
  async handle(req, res) {
    try {
      const service = new (0, _services.CreateAgencyService)();

      const { name, jurisdictionId } = req.body;

      const response = await service.execute({ name, jurisdictionId });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        agency: response.agency,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.CreateAgencyController = CreateAgencyController;
