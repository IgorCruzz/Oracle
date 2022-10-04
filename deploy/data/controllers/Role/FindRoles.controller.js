"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindRolesController {
  async handle(req, res) {
    try {
      const { page, limit, nm_role } = req.query;

      const service = new (0, _services.FindRolesService)();

      const response = await service.execute({ page, limit, nm_role });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.roles;

      return res.status(200).json({
        count,
        page,
        limit,
        roles: rows,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindRolesController = FindRolesController;
