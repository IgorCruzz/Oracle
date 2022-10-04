"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');
 class FindInspectionDocumentController {
  async handle(req, res) {
    try {
      const { id_inspection_document } = req.params;

      const service = new (0, _services.FindInspectionDocumentService)();

      const response = await service.execute({ id_inspection_document });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        inspection_document: response.inspection,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindInspectionDocumentController = FindInspectionDocumentController;
