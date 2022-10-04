"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class AcceptController {
  async handle(req, res) {
    try {
      const service = new (0, _services.AcceptService)();
      const { userId } = req;

      const response = await service.execute(req.body, userId);

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
} exports.AcceptController = AcceptController;
