"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class UploadDocumentController {
  async handle(req, res) {
    try {
      const service = new (0, _services.UploadDocumentService)();

      const { id_document } = req.body;

      const { filename, size, mimetype, originalname } = req.file;

      const response = await service.execute(id_document, {
        filename,
        size,
        mimetype,
        originalname,
      });

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
} exports.UploadDocumentController = UploadDocumentController;
