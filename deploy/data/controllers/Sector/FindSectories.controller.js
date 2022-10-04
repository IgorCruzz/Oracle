"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindSectoriesController {
  async handle(req, res) {
    try {
      const { page, limit, nm_sector } = req.query;

      const service = new (0, _services.FindSectoriesService)();

      const response = await service.execute({ page, limit, nm_sector });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.sectories;

      return res.status(200).json({
        count,
        page,
        limit,
        sectories: rows,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindSectoriesController = FindSectoriesController;
