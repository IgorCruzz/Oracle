"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class UpdateProjectPhaseController {
  async handle(req, res) {
    try {
      const service = new (0, _services.UpdateProjectPhaseService)();

      const { id_project_phase } = req.params;

      const response = await service.execute(id_project_phase, req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        projectPhase: response.projectPhase,
        message: response.message,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.UpdateProjectPhaseController = UpdateProjectPhaseController;
