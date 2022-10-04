"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class GetProjectsCoordinatesController {
  async handle(req, res) {
    try {
      const { id_city, nm_project, id_category, tp_project_phase } = req.query;

      const service = new (0, _services.GetProjectsCoordinatesService)();

      const response = await service.execute({
        id_city,
        nm_project,
        id_category,
        tp_project_phase,
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
} exports.GetProjectsCoordinatesController = GetProjectsCoordinatesController;
