"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class UpdateProjectController {
  async handle(req, res) {
    try {
      const service = new (0, _services.UpdateProjectService)();

      const { id_project } = req.params;

      const response = await service.execute(id_project, req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        project: response.project,
        message: response.message,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.UpdateProjectController = UpdateProjectController;
