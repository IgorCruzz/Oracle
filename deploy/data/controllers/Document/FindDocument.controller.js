"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindDocumentController {
  async handle(req, res) {
    try {
      const { id_document } = req.params;

      const service = new (0, _services.FindDocumentService)();

      const response = await service.execute({ id_document });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        document: response.document,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindDocumentController = FindDocumentController;
