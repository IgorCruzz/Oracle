"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class CreateProgramController {
  async handle(req, res) {
    try {
      const service = new (0, _services.CreateProgramService)();
      const { name } = req.body;

      const response = await service.execute({ name });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        program: response.program,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.CreateProgramController = CreateProgramController;
