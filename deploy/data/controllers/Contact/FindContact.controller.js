"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindContactController {
  async handle(req, res) {
    try {
      const { id_contact } = req.params;

      const service = new (0, _services.FindContactService)();

      const response = await service.execute({ id_contact });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        contact: response.contact,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindContactController = FindContactController;
