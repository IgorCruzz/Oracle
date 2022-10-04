"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class UpdateGradeController {
  async handle(req, res) {
    try {
      const service = new (0, _services.UpdateGradeService)();

      const { id_grade } = req.params;

      const response = await service.execute(id_grade, req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        grade: response.grade,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.UpdateGradeController = UpdateGradeController;
