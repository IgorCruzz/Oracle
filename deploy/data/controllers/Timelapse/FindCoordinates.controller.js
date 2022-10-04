"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindCoordenatesController {
  async handle(req, res) {
    try {
      const { id_project_phase } = req.params;

      const service = new (0, _services.FindCoordinatesService)();

      const response = await service.execute({
        id_project_phase,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        projectPhases: response.projectPhases,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindCoordenatesController = FindCoordenatesController;
