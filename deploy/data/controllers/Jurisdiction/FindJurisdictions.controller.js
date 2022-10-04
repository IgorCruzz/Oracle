"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindJurisdictionsController {
  async handle(req, res) {
    try {
      const { page, limit, nm_jurisdiction } = req.query;

      const service = new (0, _services.FindJurisdictionsService)();

      const response = await service.execute({ page, limit, nm_jurisdiction });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.jurisdictions;

      return res.status(200).json({
        count,
        page,
        limit,
        jurisdictions: rows,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindJurisdictionsController = FindJurisdictionsController;
