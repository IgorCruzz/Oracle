"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindLocationsController {
  async handle(req, res) {
    try {
      const { page, limit, id_project } = req.query;

      const service = new (0, _services.FindLocationsService)();

      const response = await service.execute({
        page,
        limit,
        id_project,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.locations;

      return res.status(200).json({
        count,
        page,
        limit,
        locations: rows,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindLocationsController = FindLocationsController;
