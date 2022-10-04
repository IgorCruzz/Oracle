"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class DeleteProgramController {
  async handle(req, res) {
    try {
      const service = new (0, _services.DeleteProgramService)();
      const { id } = req.params;

      const response = await service.execute({ id });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.DeleteProgramController = DeleteProgramController;
