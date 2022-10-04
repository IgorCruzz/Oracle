"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindAgencyController {
  async handle(req, res) {
    try {
      const { id } = req.params;

      const service = new (0, _services.FindAgencyService)();

      const response = await service.execute({ id });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        agency: response.agency,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindAgencyController = FindAgencyController;
