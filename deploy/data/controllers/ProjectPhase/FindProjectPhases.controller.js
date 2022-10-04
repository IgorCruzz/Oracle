"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindProjectPhasesController {
  async handle(req, res) {
    try {
      const { page, limit, id_project, nm_project_phase } = req.query;

      const service = new (0, _services.FindProjectPhasesService)();

      const response = await service.execute({
        page,
        limit,
        id_project,
        nm_project_phase,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.projectPhases;

      return res.status(200).json({
        count,
        page,
        limit,
        projectPhases: rows,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindProjectPhasesController = FindProjectPhasesController;
