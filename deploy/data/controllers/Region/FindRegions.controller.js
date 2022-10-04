"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindRegionsController {
  async handle(req, res) {
    try {
      const { page, limit, nm_region } = req.query;

      const service = new (0, _services.FindRegionsService)();

      const response = await service.execute({ page, limit, nm_region });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.regions;

      return res.status(200).json({
        count,
        page,
        limit,
        regions: rows,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindRegionsController = FindRegionsController;
