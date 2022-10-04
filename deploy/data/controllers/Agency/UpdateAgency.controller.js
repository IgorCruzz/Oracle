"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class UpdateAgencyController {
  async handle(req, res) {
    try {
      const service = new (0, _services.UpdateAgencyService)();

      const { id } = req.params;
      const { name, jurisdictionId } = req.body;

      const response = await service.execute({ name, id, jurisdictionId });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        agency: response.agency,
        message: response.message,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.UpdateAgencyController = UpdateAgencyController;
