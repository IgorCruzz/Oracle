"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindCitiesController {
  async handle(req, res) {
    try {
      const { page, limit, regionId, nm_city } = req.query;

      const service = new (0, _services.FindCitiesService)();

      const response = await service.execute({
        page,
        limit,
        regionId,
        nm_city,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.cities;

      return res.status(200).json({
        count,
        page,
        limit,
        cities: rows,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindCitiesController = FindCitiesController;
