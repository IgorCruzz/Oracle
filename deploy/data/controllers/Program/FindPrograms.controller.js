"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindProgramsController {
  async handle(req, res) {
    try {
      const { page, limit, nm_program } = req.query;

      const service = new (0, _services.FindProgramsService)();

      const response = await service.execute({ page, limit, nm_program });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.programs;

      return res.status(200).json({
        count,
        page,
        limit,
        programs: rows,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindProgramsController = FindProgramsController;
