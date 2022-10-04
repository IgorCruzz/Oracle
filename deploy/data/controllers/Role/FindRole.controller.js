"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindRoleController {
  async handle(req, res) {
    try {
      const { id_role } = req.params;

      const service = new (0, _services.FindRoleService)();

      const response = await service.execute({ id_role });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        role: response.role,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindRoleController = FindRoleController;
