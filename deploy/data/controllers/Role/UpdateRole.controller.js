"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class UpdateRoleController {
  async handle(req, res) {
    try {
      const service = new (0, _services.UpdateRoleService)();

      const { id_role } = req.params;

      const response = await service.execute(id_role, req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        role: response.role,
        message: response.message,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.UpdateRoleController = UpdateRoleController;
