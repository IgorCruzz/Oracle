"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindProjectsController {
  async handle(req, res) {
    try {
      const {
        page,
        limit,
        id_city,
        id_category,
        id_program,
        id_agency,
        cd_sei,
        nm_project,
      } = req.query;

      const service = new (0, _services.FindProjectsService)();

      const response = await service.execute({
        page,
        limit,
        id_city,
        id_category,
        id_program,
        id_agency,
        cd_sei,
        nm_project,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.projects;

      return res.status(200).json({
        count,
        page,
        limit,
        projects: rows,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindProjectsController = FindProjectsController;
