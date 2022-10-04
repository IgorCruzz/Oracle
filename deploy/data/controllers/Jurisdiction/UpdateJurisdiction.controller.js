"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class UpdateJurisdictionController {
  async handle(req, res) {
    try {
      const service = new (0, _services.UpdateJurisdictionService)();

      const { id } = req.params;
      const { name } = req.body;

      const response = await service.execute({ name, id });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        jurisdiction: response.jurisdiction,
        message: response.message,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.UpdateJurisdictionController = UpdateJurisdictionController;
