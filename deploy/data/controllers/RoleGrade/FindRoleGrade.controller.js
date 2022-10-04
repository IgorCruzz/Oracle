"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindRoleGradeController {
  async handle(req, res) {
    try {
      const { id_role_grade } = req.params;

      const service = new (0, _services.FindRoleGradeService)();

      const response = await service.execute({ id_role_grade });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        coustHH: response.coustHH,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindRoleGradeController = FindRoleGradeController;
