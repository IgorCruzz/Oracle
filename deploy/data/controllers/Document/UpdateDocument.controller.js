"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class UpdateDocumentController {
  async handle(req, res) {
    try {
      const service = new (0, _services.UpdateDocumentService)();

      const { id_document } = req.params;

      const response = await service.execute(id_document, req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        document: response.document,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.UpdateDocumentController = UpdateDocumentController;
