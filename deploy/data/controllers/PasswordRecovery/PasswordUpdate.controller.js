"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class PasswordUpdateController {
  async handle(req, res) {
    try {
      const service = new (0, _services.PasswordUpdateService)();

      const response = await service.execute(req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.PasswordUpdateController = PasswordUpdateController;
