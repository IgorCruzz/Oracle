"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class CreateCopyProjectController {
  async handle(req, res) {
    try {
      const service = new (0, _services.CreateCopyProjectService)();
      const { id_project } = req.params;

      const response = await service.execute(id_project, req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        project: response.project,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error:
          'Não foi possível realizar a cópia do projeto. Por favor, tente mais tarde.',
      });
    }
  }
} exports.CreateCopyProjectController = CreateCopyProjectController;
