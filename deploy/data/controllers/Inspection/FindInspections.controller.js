"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindInspectionsController {
  async handle(req, res) {
    try {
      const {
        page,
        limit,
        id,
        id_project,
        id_project_phase,
        id_professional
      } = req.query;

      const service = new (0, _services.FindInspectionsService)();

      const response = await service.execute({
        page,
        limit,
        id,
        id_project,
        id_project_phase,
        id_professional
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.inspections;

      return res.status(200).json({
        count,
        page,
        limit,
        inspections: rows,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindInspectionsController = FindInspectionsController;
