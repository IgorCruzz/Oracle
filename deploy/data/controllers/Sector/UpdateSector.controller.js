"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class UpdateSectorController {
  async handle(req, res) {
    try {
      const service = new (0, _services.UpdateSectorService)();

      const { id_sector } = req.params;

      const response = await service.execute(id_sector, req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        sector: response.sector,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.UpdateSectorController = UpdateSectorController;
