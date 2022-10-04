"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class CreateGradeController {
  async handle(req, res) {
    try {
      const service = new (0, _services.CreateGradeService)();
      const { nm_grade } = req.body;

      const response = await service.execute({ nm_grade });

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
} exports.CreateGradeController = CreateGradeController;
