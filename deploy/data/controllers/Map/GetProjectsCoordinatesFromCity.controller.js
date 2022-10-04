"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class GetProjectsCoordinatesFromCityController {
  async handle(req, res) {
    try {
      const { id_city } = req.query;

      const service = new (0, _services.GetProjectsCoordinatesFromCityService)();

      const response = await service.execute({
        id_city,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        projects: response.projects,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.GetProjectsCoordinatesFromCityController = GetProjectsCoordinatesFromCityController;
