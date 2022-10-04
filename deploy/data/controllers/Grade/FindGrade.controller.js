"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindGradeController {
  async handle(req, res) {
    try {
      const { id_grade } = req.params;

      const service = new (0, _services.FindGradeService)();

      const response = await service.execute({ id_grade });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        grade: response.grade,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindGradeController = FindGradeController;
