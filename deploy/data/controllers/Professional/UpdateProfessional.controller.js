"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class UpdateProfessionalController {
  async handle(req, res) {
    try {
      const service = new (0, _services.UpdateProfessionalService)();

      const { id_professional } = req.params;

      const response = await service.execute(id_professional, req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        professional: response.professional,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.UpdateProfessionalController = UpdateProfessionalController;
