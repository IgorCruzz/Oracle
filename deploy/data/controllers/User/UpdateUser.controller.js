"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class UpdateUserController {
  async handle(req, res) {
    try {
      const service = new (0, _services.UpdateUserService)();

      const { id_user } = req.params;

      const response = await service.execute(id_user, req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        user: response.user,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.UpdateUserController = UpdateUserController;
