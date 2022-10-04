"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindUserController {
  async handle(req, res) {
    try {
      const { userId } = req;

      const service = new (0, _services.FindUserService)();

      const response = await service.execute({ id_user: userId });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        user: response.user,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindUserController = FindUserController;
