"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindSectorController {
  async handle(req, res) {
    try {
      const { id_sector } = req.params;

      const service = new (0, _services.FindSectorService)();

      const response = await service.execute({ id_sector });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        sector: response.sector,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindSectorController = FindSectorController;
