"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindProjectController {
  async handle(req, res) {
    try {
      const { id_project } = req.params;

      const service = new (0, _services.FindProjectService)();

      const response = await service.execute({ id_project });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        project: response.project,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindProjectController = FindProjectController;
